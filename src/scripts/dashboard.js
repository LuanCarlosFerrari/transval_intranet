document.addEventListener('DOMContentLoaded', () => {
    console.log('Dashboard script loaded successfully!');
    
    const fileBrowser = document.getElementById('file-browser');
    const folderModal = document.getElementById('folder-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const closeModalBtn = document.getElementById('close-folder-modal-btn');

    // Verificar se os elementos existem
    if (!fileBrowser) {
        console.error('Element with ID "file-browser" not found');
        return;
    }
    if (!folderModal) {
        console.error('Element with ID "folder-modal" not found');
        return;
    }

    // Esta é uma estrutura de exemplo. Em um aplicativo real, 
    // você buscaria esses dados de um servidor.
    const fileData = {
        'Diretoria': [
            { name: 'planejamento.pdf', type: 'file' },
            { name: 'resultados.docx', type: 'file' },
        ],
        'Financeiro': [
            { name: 'balanco.xlsx', type: 'file' },
            { name: 'contas-a-pagar.pdf', type: 'file' },
        ],
        'Marketing': [
            { name: 'campanha-natal.jpg', type: 'file' },
            { name: 'novo-logo.png', type: 'file' },
        ],
        'RH': [
            { name: 'ferias.pdf', type: 'file' },
            { name: 'vagas.docx', type: 'file' },
        ]
    };

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

    function openModal(folderName, files) {
        modalTitle.textContent = folderName;
        modalContent.innerHTML = ''; // Limpa o conteúdo anterior

        const fileListContainer = document.createElement('div');
        fileListContainer.className = 'space-y-3';

        files.forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.className = 'bg-white p-4 rounded-lg shadow-sm flex items-center space-x-4 hover:bg-blue-50 transition-colors duration-200 cursor-pointer';

            const icon = document.createElement('i');
            icon.className = `${getFileIconClass(file.name)} fa-2x`; // Aumenta o tamanho do ícone

            const fileName = document.createElement('span');
            fileName.className = 'text-gray-800 font-medium';
            fileName.textContent = file.name;

            fileItem.appendChild(icon);
            fileItem.appendChild(fileName);
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
        const loadingIndicator = document.getElementById('loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
        }
        
        fileBrowser.innerHTML = '';
        for (const folder in data) {
            const folderEl = document.createElement('div');
            // Adicionando classes flex para centralizar o conteúdo
            folderEl.className = 'bg-white p-6 rounded-lg shadow-md mb-6 flex flex-col items-center';

            const folderTitle = document.createElement('h2');
            folderTitle.className = 'text-xl font-bold text-gray-800 mb-4';
            folderTitle.textContent = folder;
            folderEl.appendChild(folderTitle);

            const openButton = document.createElement('button');
            // Alterando a cor do botão para azul e garantindo que ele seja exibido
            openButton.className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300';
            openButton.textContent = 'Abrir Pasta';
            openButton.addEventListener('click', () => {
                openModal(folder, data[folder]);
            });

            folderEl.appendChild(openButton);
            fileBrowser.appendChild(folderEl);
        }
        
        console.log('Cards rendered successfully!');
    }

    closeModalBtn.addEventListener('click', closeModal);
    folderModal.addEventListener('click', (e) => {
        if (e.target === folderModal) {
            closeModal();
        }
    });

    renderBrowser(fileData);
});
