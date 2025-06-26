// Importar funções do Supabase
import {
    listBuckets,
    listFilesInBucket,
    getPublicUrl,
    getSignedUrl,
    downloadFile,
    bucketExists,
    isAuthenticated
} from '../config/supabase.js';

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
                console.log('Debug - Buckets:', buckets);
                return buckets;
            } catch (error) {
                console.error('Debug - Erro ao listar buckets:', error);
                return null;
            }
        },
        listFiles: async (bucketName) => {
            try {
                const files = await listFilesInBucket(bucketName);
                console.log(`Debug - Arquivos no bucket ${bucketName}:`, files);
                return files;
            } catch (error) {
                console.error(`Debug - Erro ao listar arquivos do bucket ${bucketName}:`, error);
                return null;
            }
        }, testDownload: async (bucketName, fileName) => {
            try {
                console.log(`🧪 Testando download: ${bucketName}/${fileName}`);

                // Testar URL pública
                try {
                    const publicUrl = getPublicUrl(bucketName, fileName);
                    console.log('📍 URL Pública:', publicUrl);
                } catch (error) {
                    console.log('❌ URL Pública falhou:', error.message);
                }

                // Testar URL assinada
                try {
                    const signedUrl = await getSignedUrl(bucketName, fileName, 60);
                    console.log('📍 URL Assinada:', signedUrl);
                } catch (error) {
                    console.log('❌ URL Assinada falhou:', error.message);
                }

                // Testar download direto
                try {
                    const fileBlob = await downloadFile(bucketName, fileName);
                    console.log('📍 Download direto:', fileBlob);
                } catch (error) {
                    console.log('❌ Download direto falhou:', error.message);
                }

            } catch (error) {
                console.error('Debug - Erro no teste de download:', error);
            }
        },
        forceDownload: async (bucketName, fileName) => {
            try {
                console.log(`💾 Forçando download: ${bucketName}/${fileName}`);

                // Usar download direto via blob
                const fileBlob = await downloadFile(bucketName, fileName);
                const blobUrl = URL.createObjectURL(fileBlob);

                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = fileName;
                link.style.display = 'none';

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);

                console.log('✅ Download forçado executado!');
                return true;
            } catch (error) {
                console.error('❌ Erro no download forçado:', error);
                return false;
            }
        }
    };

    // Variável para armazenar os dados dos buckets
    let bucketsData = {};

    // Função para mostrar erros
    function showError(message) {
        if (loadingIndicator) {
            loadingIndicator.innerHTML = `
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <strong>Erro:</strong> ${message}
                </div>
            `;
        }
    }    // Função para carregar buckets do Supabase
    async function loadBucketsFromSupabase() {
        try {
            loadingIndicator.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando buckets...';

            // Primeiro, vamos testar a autenticação
            console.log('🔍 Verificando autenticação...');
            const userIsAuth = await isAuthenticated();
            console.log('✅ Usuário autenticado:', userIsAuth);

            if (!userIsAuth) {
                throw new Error('Usuário não está autenticado');
            }

            console.log('🔍 Tentando listar buckets...');
            const buckets = await listBuckets();
            console.log('✅ Buckets encontrados:', buckets);

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

            // Para cada bucket, carregar os arquivos
            for (const bucket of buckets) {
                try {
                    loadingIndicator.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Carregando arquivos do bucket: ${bucket.name}...`;
                    console.log(`🔍 Carregando arquivos do bucket: ${bucket.name}`);
                    const files = await listFilesInBucket(bucket.name);
                    console.log(`✅ Arquivos encontrados no bucket ${bucket.name}:`, files);

                    // Debug: mostrar cada item em detalhes
                    files.forEach((item, index) => {
                        console.log(`Item ${index}:`, {
                            name: item.name,
                            id: item.id,
                            size: item.metadata?.size,
                            isFile: item.id !== null,
                            metadata: item.metadata
                        });
                    });

                    // Primeiro, vamos tentar sem filtro para ver todos os itens
                    const allItems = files.map(file => ({
                        name: file.name,
                        type: file.id !== null ? 'file' : 'folder',
                        size: file.metadata?.size || 0,
                        lastModified: file.updated_at || file.created_at,
                        bucketName: bucket.name,
                        fullPath: file.name,
                        originalId: file.id
                    }));

                    console.log(`📁 Todos os itens do bucket ${bucket.name}:`, allItems);

                    // Filtrar apenas arquivos (diferentes critérios)
                    const fileItems = files.filter(item => {
                        // Testar diferentes condições
                        const hasId = item.id !== null;
                        const notFolder = !item.name.endsWith('/');
                        const hasSize = item.metadata && item.metadata.size > 0;

                        console.log(`Filtro para ${item.name}:`, {
                            hasId,
                            notFolder,
                            hasSize,
                            shouldInclude: hasId && notFolder
                        });

                        return hasId && notFolder; // Arquivo deve ter ID e não terminar com /
                    }).map(file => ({
                        name: file.name,
                        type: 'file',
                        size: file.metadata?.size || 0,
                        lastModified: file.updated_at || file.created_at,
                        bucketName: bucket.name,
                        fullPath: file.name
                    })); console.log(`📁 Arquivos processados do bucket ${bucket.name}:`, fileItems);

                    // Sempre incluir o bucket, mesmo se parecer vazio
                    // Isso permite que o usuário explore buckets que podem ter subpastas
                    if (fileItems.length > 0) {
                        bucketsData[bucket.name] = fileItems;
                    } else {
                        // Incluir bucket "vazio" com placeholder para exploração
                        bucketsData[bucket.name] = [];
                        console.warn(`⚠️ Bucket ${bucket.name} tem ${files.length} itens, mas nenhum passou no filtro de arquivos`);

                        // Se há itens mas nenhum passou no filtro, mostrar detalhes
                        if (files.length > 0) {
                            console.log(`🔍 Itens que não passaram no filtro:`, files);
                        }
                    }
                } catch (error) {
                    console.error(`❌ Erro ao carregar arquivos do bucket ${bucket.name}:`, error);

                    // Mostrar erro específico para este bucket
                    loadingIndicator.innerHTML = `
                        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            <strong>Erro no bucket "${bucket.name}":</strong> ${error.message}
                        </div>
                    `;

                    // Continua com os outros buckets mesmo se um falhar
                }
            }

            console.log('📊 Dados finais dos buckets:', bucketsData);
            return bucketsData;
        } catch (error) {
            console.error('❌ Erro ao carregar buckets:', error);
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
            }

            console.log(`📁 Bucket encontrado: ${bucket.name} (público: ${bucket.public})`);

            let downloadUrl = null;

            // Estratégia 1: Se for bucket público, usar URL pública
            if (bucket.public) {
                try {
                    console.log('🌐 Tentando URL pública...');
                    downloadUrl = getPublicUrl(file.bucketName, file.fullPath);
                    console.log('✅ URL pública obtida:', downloadUrl);
                } catch (error) {
                    console.warn('⚠️ Erro ao obter URL pública:', error);
                }
            }

            // Estratégia 2: Se não conseguiu URL pública ou bucket é privado, usar URL assinada
            if (!downloadUrl) {
                try {
                    console.log('🔐 Tentando URL assinada...');
                    downloadUrl = await getSignedUrl(file.bucketName, file.fullPath, 3600);
                    console.log('✅ URL assinada obtida:', downloadUrl);
                } catch (error) {
                    console.error('❌ Erro ao obter URL assinada:', error);
                    throw new Error(`Não foi possível obter URL de download: ${error.message}`);
                }
            }

            // Estratégia 3: Se tudo falhar, tentar download direto
            if (!downloadUrl) {
                try {
                    console.log('📦 Tentando download direto...');
                    const fileBlob = await downloadFile(file.bucketName, file.fullPath);

                    // Criar URL do blob
                    downloadUrl = URL.createObjectURL(fileBlob);
                    console.log('✅ Download direto obtido');
                } catch (error) {
                    console.error('❌ Erro no download direto:', error);
                    throw new Error(`Falha em todas as estratégias de download: ${error.message}`);
                }
            }
            // Executar o download
            if (downloadUrl) {
                console.log('🚀 Executando download com URL:', downloadUrl);

                // Para forçar download ao invés de abrir em nova aba
                try {
                    // Método 1: Tentar fetch + blob para forçar download
                    const response = await fetch(downloadUrl);
                    if (response.ok) {
                        const blob = await response.blob();
                        const blobUrl = URL.createObjectURL(blob);

                        const link = document.createElement('a');
                        link.href = blobUrl;
                        link.download = file.name;
                        link.style.display = 'none';

                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);

                        // Limpar o blob URL após um tempo
                        setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);

                        console.log(`✅ Download forçado iniciado para: ${file.name}`);
                    } else {
                        throw new Error('Falha na resposta fetch');
                    }
                } catch (fetchError) {
                    console.warn('⚠️ Fetch falhou, tentando método alternativo:', fetchError);

                    // Método 2: Link direto com headers para forçar download
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

                    console.log(`✅ Download alternativo iniciado para: ${file.name}`);
                }

                // Se foi criado um blob URL original, limpar
                if (downloadUrl.startsWith('blob:') && !downloadUrl.includes('blob:http')) {
                    setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
                }

                loadingIndicator.innerHTML = '<i class="fas fa-check text-green-500"></i> Download iniciado!';

                setTimeout(() => {
                    loadingIndicator.style.display = 'none';
                }, 2000);
            }

        } catch (error) {
            console.error('❌ Erro no download:', error);
            showError(`Erro ao fazer download do arquivo "${file.name}": ${error.message}`);

            loadingIndicator.innerHTML = `
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <strong>Erro no download:</strong> ${error.message}
                </div>
            `;
        }
    } async function openModal(folderName, files) {
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
    } function renderBrowser(data) {
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

    // Carregar e renderizar dados dos buckets
    try {
        await loadBucketsFromSupabase();
        renderBrowser(bucketsData);
    } catch (error) {
        console.error('Erro ao carregar documentos:', error);
        // renderBrowser será chamado com dados vazios se houver erro
        renderBrowser({});
    }
});
