// Upload de arquivos para ProjectSend
import { fileService, authService } from '../../config/projectsend.js';

// Componente de upload de arquivos
export class FileUploader {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.init();
    }

    init() {
        if (!this.container) {
            console.error('Container para upload não encontrado');
            return;
        }

        this.render();
        this.setupEventListeners();
    }

    render() {
        this.container.innerHTML = `
            <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h3 class="text-xl font-bold text-gray-800 mb-4">
                    <i class="fas fa-upload text-blue-500 mr-2"></i>
                    Upload de Documentos
                </h3>
                
                <div id="upload-area" class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors duration-200 cursor-pointer">
                    <i class="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
                    <p class="text-gray-600 mb-2">Arraste arquivos aqui ou clique para selecionar</p>
                    <p class="text-sm text-gray-500">Suporte para PDF, DOC, XLS, PPT e imagens</p>
                    <input type="file" id="file-input" multiple class="hidden" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif">
                </div>

                <div class="mt-4">
                    <label for="file-description" class="block text-sm font-medium text-gray-700 mb-2">Descrição (opcional)</label>
                    <textarea id="file-description" rows="3" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Descreva o conteúdo dos arquivos..."></textarea>
                </div>

                <div class="mt-4">
                    <label for="category-select" class="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                    <select id="category-select" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="">Selecione uma categoria...</option>
                    </select>
                </div>

                <div class="mt-6">
                    <button id="upload-btn" disabled class="w-full bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 cursor-not-allowed">
                        <i class="fas fa-upload mr-2"></i>
                        Selecione arquivos para upload
                    </button>
                </div>

                <div id="upload-progress" class="mt-4 hidden">
                    <div class="bg-gray-200 rounded-full h-3">
                        <div id="progress-bar" class="bg-blue-500 h-3 rounded-full transition-all duration-300" style="width: 0%"></div>
                    </div>
                    <p id="upload-status" class="text-sm text-gray-600 mt-2">Preparando upload...</p>
                </div>

                <div id="upload-results" class="mt-4 hidden">
                    <!-- Resultados do upload aparecerão aqui -->
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        const uploadArea = this.container.querySelector('#upload-area');
        const fileInput = this.container.querySelector('#file-input');
        const uploadBtn = this.container.querySelector('#upload-btn');
        const categorySelect = this.container.querySelector('#category-select');

        // Load categories
        this.loadCategories();

        // Click na área de upload
        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });

        // Drag and drop
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('border-blue-400', 'bg-blue-50');
        });

        uploadArea.addEventListener('dragleave', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('border-blue-400', 'bg-blue-50');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('border-blue-400', 'bg-blue-50');

            const files = Array.from(e.dataTransfer.files);
            this.handleFiles(files);
        });

        // Seleção de arquivos
        fileInput.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            this.handleFiles(files);
        });

        // Botão de upload
        uploadBtn.addEventListener('click', () => {
            this.uploadFiles();
        });
    }

    async loadCategories() {
        try {
            const categories = await fileService.getCategories();
            const categorySelect = this.container.querySelector('#category-select');

            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id || category.name;
                option.textContent = category.name || category.label;
                categorySelect.appendChild(option);
            });
        } catch (error) {
            console.error('Erro ao carregar categorias:', error);
        }
    }

    handleFiles(files) {
        if (files.length === 0) return;

        this.selectedFiles = files;
        const uploadBtn = this.container.querySelector('#upload-btn');

        uploadBtn.disabled = false;
        uploadBtn.className = 'w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 cursor-pointer';
        uploadBtn.innerHTML = `<i class="fas fa-upload mr-2"></i>Upload ${files.length} arquivo${files.length > 1 ? 's' : ''}`;

        // Mostrar lista de arquivos selecionados
        this.showSelectedFiles(files);
    }

    showSelectedFiles(files) {
        const uploadArea = this.container.querySelector('#upload-area');
        const fileList = document.createElement('div');
        fileList.className = 'mt-4 space-y-2';
        fileList.id = 'selected-files';

        // Remover lista anterior se existir
        const existingList = this.container.querySelector('#selected-files');
        if (existingList) {
            existingList.remove();
        }

        files.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'flex items-center justify-between bg-gray-50 p-3 rounded-lg';

            fileItem.innerHTML = `
                <div class="flex items-center">
                    <i class="${this.getFileIcon(file.name)} text-lg mr-3"></i>
                    <div>
                        <p class="text-sm font-medium text-gray-800">${file.name}</p>
                        <p class="text-xs text-gray-500">${this.formatFileSize(file.size)}</p>
                    </div>
                </div>
                <button onclick="this.parentElement.remove()" class="text-red-500 hover:text-red-700">
                    <i class="fas fa-times"></i>
                </button>
            `;

            fileList.appendChild(fileItem);
        });

        uploadArea.insertAdjacentElement('afterend', fileList);
    }

    async uploadFiles() {
        if (!this.selectedFiles || this.selectedFiles.length === 0) return;

        const uploadBtn = this.container.querySelector('#upload-btn');
        const progressContainer = this.container.querySelector('#upload-progress');
        const progressBar = this.container.querySelector('#progress-bar');
        const statusText = this.container.querySelector('#upload-status');
        const resultsContainer = this.container.querySelector('#upload-results');

        // Desabilitar botão e mostrar progresso
        uploadBtn.disabled = true;
        uploadBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Uploading...';
        progressContainer.classList.remove('hidden');
        resultsContainer.classList.add('hidden');

        const description = this.container.querySelector('#file-description').value;
        const categoryId = this.container.querySelector('#category-select').value;

        const totalFiles = this.selectedFiles.length;
        let completedFiles = 0;
        const results = [];

        try {
            for (let i = 0; i < this.selectedFiles.length; i++) {
                const file = this.selectedFiles[i];

                statusText.textContent = `Uploading ${file.name}... (${i + 1}/${totalFiles})`;

                try {
                    const result = await fileService.uploadFile(file, description, null, categoryId);
                    results.push({ file: file.name, success: true, result });
                    completedFiles++;
                } catch (error) {
                    console.error(`Erro ao fazer upload de ${file.name}:`, error);
                    results.push({ file: file.name, success: false, error: error.message });
                }

                // Atualizar progresso
                const progress = ((i + 1) / totalFiles) * 100;
                progressBar.style.width = `${progress}%`;
            }

            // Mostrar resultados
            this.showResults(results);

            // Reset form
            this.resetForm();

        } catch (error) {
            console.error('Erro geral no upload:', error);
            statusText.textContent = `Erro: ${error.message}`;
        }
    }

    showResults(results) {
        const resultsContainer = this.container.querySelector('#upload-results');
        resultsContainer.classList.remove('hidden');

        const successCount = results.filter(r => r.success).length;
        const errorCount = results.filter(r => !r.success).length;

        let html = `
            <div class="space-y-3">
                <div class="flex items-center justify-between">
                    <h4 class="font-semibold text-gray-800">Resultados do Upload</h4>
                    <div class="text-sm">
                        <span class="text-green-600">${successCount} sucesso</span>
                        ${errorCount > 0 ? `<span class="text-red-600 ml-2">${errorCount} erro(s)</span>` : ''}
                    </div>
                </div>
        `;

        results.forEach(result => {
            const iconClass = result.success ? 'fas fa-check-circle text-green-500' : 'fas fa-times-circle text-red-500';
            const bgClass = result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200';

            html += `
                <div class="${bgClass} border rounded-lg p-3">
                    <div class="flex items-center">
                        <i class="${iconClass} mr-3"></i>
                        <div class="flex-1">
                            <p class="text-sm font-medium">${result.file}</p>
                            ${!result.success ? `<p class="text-xs text-red-600">${result.error}</p>` : ''}
                        </div>
                    </div>
                </div>
            `;
        });

        html += '</div>';
        resultsContainer.innerHTML = html;

        // Auto-hide resultados após alguns segundos se tudo deu certo
        if (errorCount === 0) {
            setTimeout(() => {
                resultsContainer.classList.add('hidden');
            }, 5000);
        }
    }

    resetForm() {
        const fileInput = this.container.querySelector('#file-input');
        const uploadBtn = this.container.querySelector('#upload-btn');
        const progressContainer = this.container.querySelector('#upload-progress');
        const selectedFiles = this.container.querySelector('#selected-files');
        const description = this.container.querySelector('#file-description');

        fileInput.value = '';
        description.value = '';
        this.selectedFiles = null;

        uploadBtn.disabled = true;
        uploadBtn.className = 'w-full bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 cursor-not-allowed';
        uploadBtn.innerHTML = '<i class="fas fa-upload mr-2"></i>Selecione arquivos para upload';

        progressContainer.classList.add('hidden');

        if (selectedFiles) {
            selectedFiles.remove();
        }
    }

    getFileIcon(fileName) {
        const extension = fileName.split('.').pop().toLowerCase();
        switch (extension) {
            case 'pdf': return 'fas fa-file-pdf text-red-500';
            case 'doc':
            case 'docx': return 'fas fa-file-word text-blue-500';
            case 'xls':
            case 'xlsx': return 'fas fa-file-excel text-green-500';
            case 'ppt':
            case 'pptx': return 'fas fa-file-powerpoint text-orange-500';
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif': return 'fas fa-file-image text-purple-500';
            default: return 'fas fa-file text-gray-500';
        }
    }

    formatFileSize(bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        if (bytes === 0) return '0 Bytes';
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    }
}

// Função para inicializar o uploader
export function initFileUploader(containerId = 'file-uploader') {
    if (!authService.isAuthenticated) {
        console.warn('Usuário não autenticado - uploader não será inicializado');
        return null;
    }

    return new FileUploader(containerId);
}

// Exportar para uso global
window.FileUploader = FileUploader;
window.initFileUploader = initFileUploader;
