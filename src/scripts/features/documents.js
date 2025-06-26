// Importar funções do ProjectSend
import {
    listBuckets,
    listFilesInBucket,
    getPublicUrl,
    getSignedUrl,
    downloadFile,
    bucketExists,
    isAuthenticated,
    fileService
} from '../../config/projectsend.js';

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Documents script loaded successfully!');

    const fileBrowser = document.getElementById('file-browser');
    const folderModal = document.getElementById('folder-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const closeModalBtn = document.getElementById('close-folder-modal-btn');
    const loadingIndicator = document.getElementById('loading-indicator');

    // Verificar se os elementos existem
    if (!fileBrowser) {
        console.error('Element with ID "file-browser" not found');
        return;
    }
    if (!folderModal) {
        console.error('Element with ID "folder-modal" not found');
        return;
    }

    // Verificar se o usuário está autenticado
    const userIsAuthenticated = await isAuthenticated();
    if (!userIsAuthenticated) {
        showError('Usuário não autenticado. Redirecionando para login...');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
        return;
    }    // Função de debug - exposer no window para teste manual
    window.debugStorage = {
        listBuckets: async () => {
            try {
                const buckets = await listBuckets();
                console.log('Debug - Categorias:', buckets);
                return buckets;
            } catch (error) {
                console.error('Debug - Erro ao listar categorias:', error);
                return null;
            }
        },
        listFiles: async (categoryName) => {
            try {
                const files = await listFilesInBucket(categoryName);
                console.log(`Debug - Arquivos na categoria ${categoryName}:`, files);
                return files;
            } catch (error) {
                console.error(`Debug - Erro ao listar arquivos da categoria ${categoryName}:`, error);
                return null;
            }
        }, testDownload: async (categoryName, fileName) => {
            try {
                console.log(`🧪 Testando download: ${categoryName}/${fileName}`);

                // Para ProjectSend, usar o ID do arquivo diretamente
                const downloadUrl = fileService.getDownloadUrl(fileName);
                console.log('📍 URL de Download:', downloadUrl);

                // Testar se a URL funciona
                try {
                    const response = await fetch(downloadUrl, { method: 'HEAD' });
                    console.log('✅ URL válida, status:', response.status);
                } catch (error) {
                    console.log('❌ URL inválida:', error.message);
                }

            } catch (error) {
                console.error('Debug - Erro no teste de download:', error);
            }
        },
        forceDownload: async (categoryName, fileId) => {
            try {
                console.log(`💾 Forçando download: ${categoryName}/${fileId}`);

                // Para ProjectSend, usar a URL direta de download
                const downloadUrl = fileService.getDownloadUrl(fileId);

                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = ''; // O servidor definirá o nome
                link.style.display = 'none';

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                console.log('✅ Download iniciado!');
                return true;
            } catch (error) {
                console.error('❌ Erro no download:', error);
                return false;
            }
        }
    };

    // Variável para armazenar os dados das categorias
    let categoriesData = {};

    // Função para mostrar erros
    function showError(message) {
        if (loadingIndicator) {
            loadingIndicator.innerHTML = `
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <strong>Erro:</strong> ${message}
                </div>
            `;
        }
    }    // Função para carregar categorias do ProjectSend
    async function loadCategoriesFromProjectSend() {
        try {
            loadingIndicator.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando categorias...';

            // Primeiro, vamos testar a autenticação
            console.log('🔍 Verificando autenticação...');
            const userIsAuth = await isAuthenticated();
            console.log('✅ Usuário autenticado:', userIsAuth);

            if (!userIsAuth) {
                throw new Error('Usuário não está autenticado');
            }

            console.log('🔍 Tentando listar categorias...');
            const categories = await listBuckets();
            console.log('✅ Categorias encontradas:', categories);

            // Limpar dados anteriores
            bucketsData = {};

            if (!buckets || buckets.length === 0) {
                console.warn('⚠️ Nenhum bucket encontrado');
                loadingIndicator.innerHTML = `
                    <div class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                        <strong>Aviso:</strong> Nenhum bucket encontrado no Supabase Storage.
                        <br>Crie buckets no painel do Supabase para começar.
                    </div>
                `;
                return bucketsData;
            }

            // Para cada categoria, carregar os arquivos
            for (const category of categories) {
                try {
                    loadingIndicator.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Carregando arquivos da categoria: ${category.name}...`;
                    console.log(`🔍 Carregando arquivos da categoria: ${category.name}`);
                    const files = await listFilesInBucket(category.name);
                    console.log(`✅ Arquivos encontrados na categoria ${category.name}:`, files);

                    // Debug: mostrar cada item em detalhes
                    files.forEach((item, index) => {
                        console.log(`Item ${index}:`, {
                            name: item.name,
                            id: item.id,
                            size: item.size,
                            isFile: item.id !== null,
                            metadata: item
                        });
                    });

                    // Processar arquivos do ProjectSend
                    const fileItems = files.map(file => ({
                        name: file.name || file.filename,
                        type: 'file',
                        size: file.size || 0,
                        lastModified: file.upload_date || file.created_at,
                        categoryName: category.name,
                        fullPath: file.name || file.filename,
                        originalId: file.id,
                        description: file.description || '',
                        downloadUrl: fileService.getDownloadUrl(file.id)
                    }));

                    console.log(`📁 Arquivos processados da categoria ${category.name}:`, fileItems);

                    // Sempre incluir a categoria
                    if (fileItems.length > 0) {
                        categoriesData[category.name] = fileItems;
                    } else {
                        // Incluir categoria "vazia"
                        categoriesData[category.name] = [];
                        console.warn(`⚠️ Categoria ${category.name} está vazia`);
                    }
                } catch (error) {
                    console.error(`❌ Erro ao carregar arquivos da categoria ${category.name}:`, error);

                    // Mostrar erro específico para esta categoria
                    loadingIndicator.innerHTML = `
                        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            <strong>Erro na categoria "${category.name}":</strong> ${error.message}
                        </div>
                    `;

                    // Continua com as outras categorias mesmo se uma falhar
                }
            }

            console.log('📊 Dados finais das categorias:', categoriesData);
            return categoriesData;
        } catch (error) {
            console.error('❌ Erro ao carregar categorias:', error);
            showError(`Erro ao carregar documentos: ${error.message}`);
            throw error;
        }
    }

    function getFileIconClass(fileName) {
        const extension = fileName.split('.').pop().toLowerCase();
        switch (extension) {
            case 'pdf': return 'fas fa-file-pdf text-red-500';
            case 'docx':
            case 'doc': return 'fas fa-file-word text-blue-500';
            case 'xlsx':
            case 'xls': return 'fas fa-file-excel text-green-500';
            case 'png':
            case 'jpg':
            case 'jpeg':
            case 'gif': return 'fas fa-file-image text-purple-500';
            case 'txt': return 'fas fa-file-alt text-gray-500';
            default: return 'fas fa-file text-gray-500';
        }
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    } async function handleFileDownload(file) {
        try {
            console.log('🔽 Iniciando download:', file);
            loadingIndicator.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Preparando download de ${file.name}...`;

            // Primeiro, verificar se o bucket existe e qual é o seu tipo
            const buckets = await listBuckets();
            const bucket = buckets.find(b => b.name === file.bucketName);

            if (!bucket) {
                throw new Error(`Bucket "${file.bucketName}" não encontrado`);
                // Função para download de arquivo do ProjectSend
                async function downloadFileFromProjectSend(file) {
                    try {
                        console.log('� Iniciando download de arquivo:', file.name);

                        // Para ProjectSend, usar a URL direta de download
                        const downloadUrl = file.downloadUrl || fileService.getDownloadUrl(file.originalId);

                        console.log('🔗 URL de download:', downloadUrl);

                        // Executar o download
                        const link = document.createElement('a');
                        link.href = downloadUrl;
                        link.download = file.name;
                        link.style.display = 'none';

                        // Adicionar atributos para forçar download
                        link.setAttribute('target', '_blank');
                        link.setAttribute('rel', 'noopener noreferrer');

                        document.body.appendChild(link);

                        // Simular clique do usuário
                        const clickEvent = new MouseEvent('click', {
                            bubbles: true,
                            cancelable: true,
                            view: window
                        });
                        link.dispatchEvent(clickEvent);

                        document.body.removeChild(link);

                        console.log(`✅ Download iniciado para: ${file.name}`);

                    } catch (error) {
                        console.error('❌ Erro no download:', error);
                        alert(`Erro ao fazer download do arquivo: ${error.message}`);
                    }
                }
                setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
            }

            loadingIndicator.innerHTML = '<i class="fas fa-check text-green-500"></i> Download iniciado!';

            setTimeout(() => {
                loadingIndicator.style.display = 'none';
            }, 2000);
        }

        } catch (error) {
        console.error('❌ Erro no download:', error);
        alert(`Erro ao fazer download do arquivo: ${error.message}`);
    }
}

    // Função para lidar com download de arquivo (compatibilidade)
    async function handleFileDownload(file) {
        await downloadFileFromProjectSend(file);
    }

    async function openModal(folderName, files) {
        modalTitle.textContent = `${folderName.toUpperCase()} (${files.length} arquivo${files.length !== 1 ? 's' : ''})`;
        modalContent.innerHTML = ''; // Limpa o conteúdo anterior

        const fileListContainer = document.createElement('div');
        fileListContainer.className = 'space-y-3';

        files.forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.className = 'bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between hover:bg-blue-50 hover:shadow-md transition-all duration-200';

            const fileInfo = document.createElement('div');
            fileInfo.className = 'flex items-center space-x-4 flex-1';

            const icon = document.createElement('i');
            icon.className = `${getFileIconClass(file.name)} fa-2x`;

            const fileDetails = document.createElement('div');
            fileDetails.className = 'flex-1';

            const fileName = document.createElement('div');
            fileName.className = 'text-gray-800 font-medium text-sm';
            fileName.textContent = file.name;

            const fileMetadata = document.createElement('div');
            fileMetadata.className = 'text-gray-500 text-xs mt-1';
            const sizeText = file.size ? formatFileSize(file.size) : 'Tamanho desconhecido';
            const dateText = file.lastModified ? new Date(file.lastModified).toLocaleDateString('pt-BR') : '';
            fileMetadata.textContent = `${sizeText}${dateText ? ' • ' + dateText : ''}`;

            const downloadBtn = document.createElement('button');
            downloadBtn.className = 'bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-1';
            downloadBtn.innerHTML = '<i class="fas fa-download"></i><span>Download</span>';
            downloadBtn.addEventListener('click', async (e) => {
                e.stopPropagation();
                await handleFileDownload(file);
            });

            fileDetails.appendChild(fileName);
            fileDetails.appendChild(fileMetadata);
            fileInfo.appendChild(icon);
            fileInfo.appendChild(fileDetails);
            fileItem.appendChild(fileInfo);
            fileItem.appendChild(downloadBtn);
            fileListContainer.appendChild(fileItem);
        });

        modalContent.appendChild(fileListContainer);
        folderModal.classList.remove('hidden');
        folderModal.classList.add('flex');
    }

    function closeModal() {
        folderModal.classList.add('hidden');
        folderModal.classList.remove('flex');
    }

    function renderBrowser(data) {
        // Remove o indicador de carregamento
        if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
        }

        fileBrowser.innerHTML = '';

        if (Object.keys(data).length === 0) {
            const emptyMessage = document.createElement('div');
            emptyMessage.className = 'text-center text-white py-8';
            emptyMessage.innerHTML = `
                <i class="fas fa-folder-open fa-3x mb-4 opacity-50"></i>
                <h3 class="text-xl font-bold mb-2">Nenhum documento encontrado</h3>
                <p class="text-gray-300">Não há buckets com arquivos disponíveis no momento.</p>
            `;
            fileBrowser.appendChild(emptyMessage);
            return;
        }

        // Criar container para grid de duas colunas
        const gridContainer = document.createElement('div');
        gridContainer.className = 'grid grid-cols-1 md:grid-cols-2 gap-6'; for (const folder in data) {
            const folderEl = document.createElement('div');
            folderEl.className = 'bg-white p-6 rounded-xl shadow-lg border border-gray-200 flex flex-col items-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group';

            const folderIcon = document.createElement('div');
            folderIcon.className = 'mb-4 group-hover:scale-110 transition-transform duration-300';
            folderIcon.innerHTML = '<i class="fas fa-folder text-blue-500 text-4xl"></i>';
            folderEl.appendChild(folderIcon); const folderTitle = document.createElement('h2');
            folderTitle.className = 'text-xl font-bold text-gray-800 mb-2 text-center';
            folderTitle.textContent = folder.toUpperCase();
            folderEl.appendChild(folderTitle); const fileCount = document.createElement('p');
            fileCount.className = 'text-gray-600 text-sm mb-4 text-center';
            const count = data[folder].length;
            if (count === 0) {
                fileCount.textContent = 'Explorar pasta';
            } else {
                fileCount.textContent = `${count} arquivo${count !== 1 ? 's' : ''}`;
            }
            folderEl.appendChild(fileCount);

            const openButton = document.createElement('button');
            openButton.className = 'bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 w-full max-w-xs shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2';
            openButton.innerHTML = '<i class="fas fa-folder-open mr-2"></i>Abrir Pasta';
            openButton.addEventListener('click', () => {
                openModal(folder, data[folder]);
            });

            folderEl.appendChild(openButton);
            gridContainer.appendChild(folderEl);
        }

        fileBrowser.appendChild(gridContainer);
        console.log('Cards rendered successfully!');
    }

    // Event listeners
    closeModalBtn.addEventListener('click', closeModal);
folderModal.addEventListener('click', (e) => {
    if (e.target === folderModal) {
        closeModal();
    }
});

// Carregar e renderizar dados das categorias
try {
    await loadCategoriesFromProjectSend();
    renderBrowser(categoriesData);
} catch (error) {
    console.error('Erro ao carregar documentos:', error);
    // renderBrowser será chamado com dados vazios se houver erro
    renderBrowser({});
}
});
