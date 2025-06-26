// Configuração do ProjectSend
// Configure estas variáveis com os dados do seu ProjectSend
const PROJECTSEND_URL = 'https://seu-dominio.com/projectsend'; // Substitua pela URL do seu ProjectSend
const PROJECTSEND_API_KEY = 'sua-api-key-aqui'; // Substitua pela sua API key do ProjectSend

// Verificar se as credenciais foram configuradas
const isConfigured = PROJECTSEND_URL !== 'https://seu-dominio.com/projectsend' && PROJECTSEND_API_KEY !== 'sua-api-key-aqui';

if (!isConfigured) {
    console.warn('⚠️ ProjectSend não configurado. Configure as credenciais em src/config/projectsend.js');
}

// Classe para gerenciar API do ProjectSend
class ProjectSendAPI {
    constructor(baseUrl, apiKey) {
        this.baseUrl = baseUrl.replace(/\/$/, '');
        this.apiKey = apiKey;
        this.headers = {
            'Content-Type': 'application/json',
            'X-API-KEY': this.apiKey
        };
    }

    async makeRequest(endpoint, options = {}) {
        if (!isConfigured) {
            throw new Error('ProjectSend não configurado. Configure as credenciais em src/config/projectsend.js');
        }

        const url = `${this.baseUrl}/api/${endpoint}`;

        const config = {
            headers: this.headers,
            ...options
        };

        // Para uploads de arquivos, não definir Content-Type (o browser fará automaticamente)
        if (options.body instanceof FormData) {
            config.headers = {
                'X-API-KEY': this.apiKey
            };
        }

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('ProjectSend API Error:', error);
            throw error;
        }
    }

    // Autenticação
    async authenticate(username, password) {
        return this.makeRequest('auth/login', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            })
        });
    }

    // Verificar se usuário está autenticado
    async checkAuth() {
        try {
            return this.makeRequest('auth/check', {
                method: 'GET'
            });
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Listar arquivos
    async getFiles(userId = null) {
        const endpoint = userId ? `files?user_id=${userId}` : 'files';
        return this.makeRequest(endpoint);
    }

    // Listar por categoria/grupo
    async getFilesByCategory(category) {
        return this.makeRequest(`files?category=${encodeURIComponent(category)}`);
    }

    // Upload de arquivo
    async uploadFile(file, description = '', clientId = null, category = null) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('description', description);
        if (clientId) formData.append('client_id', clientId);
        if (category) formData.append('category', category);

        return this.makeRequest('files/upload', {
            method: 'POST',
            body: formData
        });
    }

    // Download de arquivo - retorna URL para download
    getDownloadUrl(fileId) {
        return `${this.baseUrl}/api/files/${fileId}/download?api_key=${this.apiKey}`;
    }

    // Deletar arquivo
    async deleteFile(fileId) {
        return this.makeRequest(`files/${fileId}`, {
            method: 'DELETE'
        });
    }

    // Gerenciar usuários/clientes
    async getClients() {
        return this.makeRequest('clients');
    }

    async createClient(clientData) {
        return this.makeRequest('clients', {
            method: 'POST',
            body: JSON.stringify(clientData)
        });
    }

    async getClientById(clientId) {
        return this.makeRequest(`clients/${clientId}`);
    }

    // Obter informações do arquivo
    async getFileInfo(fileId) {
        return this.makeRequest(`files/${fileId}`);
    }

    // Listar grupos/categorias disponíveis
    async getCategories() {
        return this.makeRequest('categories');
    }
}

// Instância da API
const projectSendAPI = new ProjectSendAPI(PROJECTSEND_URL, PROJECTSEND_API_KEY);

// Serviço de Autenticação
class AuthService {
    constructor() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.loadStoredSession();
    }

    // Carregar sessão armazenada
    loadStoredSession() {
        const storedUser = localStorage.getItem('projectsend_user');
        const storedToken = localStorage.getItem('projectsend_token');

        if (storedUser && storedToken) {
            this.currentUser = JSON.parse(storedUser);
            this.isAuthenticated = true;
        }
    }

    async login(username, password) {
        try {
            const response = await projectSendAPI.authenticate(username, password);

            if (response.success) {
                this.currentUser = response.user;
                this.isAuthenticated = true;

                // Salvar dados de sessão
                localStorage.setItem('projectsend_user', JSON.stringify(response.user));
                localStorage.setItem('projectsend_token', response.token || 'authenticated');

                return { success: true, user: response.user };
            } else {
                throw new Error(response.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: error.message };
        }
    }

    logout() {
        this.currentUser = null;
        this.isAuthenticated = false;
        localStorage.removeItem('projectsend_user');
        localStorage.removeItem('projectsend_token');
    }

    getCurrentUser() {
        return this.currentUser;
    }

    async isUserAuthenticated() {
        // Verificar se há dados de sessão
        if (!this.isAuthenticated || !this.currentUser) {
            return false;
        }

        // Verificar com o servidor se a sessão ainda é válida
        try {
            const response = await projectSendAPI.checkAuth();
            return response.success;
        } catch (error) {
            console.error('Auth check error:', error);
            // Se houver erro na verificação, limpar sessão
            this.logout();
            return false;
        }
    }

    // Verificar se o usuário tem permissão específica
    hasPermission(permission) {
        if (!this.currentUser) return false;

        // Implementar lógica de permissões baseada no ProjectSend
        // Admin tem todas as permissões
        if (this.currentUser.role === 'admin') return true;

        // Verificar permissões específicas
        return this.currentUser.permissions?.includes(permission) || false;
    }

    // Listener para mudanças de autenticação (simular o comportamento do Supabase)
    onAuthStateChange(callback) {
        // Como ProjectSend não tem listeners nativos, vamos simular
        const checkInterval = setInterval(async () => {
            const wasAuthenticated = this.isAuthenticated;
            const isNowAuthenticated = await this.isUserAuthenticated();

            if (wasAuthenticated && !isNowAuthenticated) {
                callback('SIGNED_OUT', null);
            } else if (!wasAuthenticated && isNowAuthenticated) {
                callback('SIGNED_IN', { user: this.currentUser });
            }
        }, 30000); // Verificar a cada 30 segundos

        // Retornar função para limpar o interval
        return () => clearInterval(checkInterval);
    }
}

// Serviço de Arquivos
class FileService {
    async uploadFile(file, description = '', clientId = null, category = null) {
        if (!authService.isAuthenticated) {
            throw new Error('User not authenticated');
        }

        try {
            const response = await projectSendAPI.uploadFile(file, description, clientId, category);
            return response;
        } catch (error) {
            console.error('File upload error:', error);
            throw error;
        }
    }

    async getFiles(userId = null) {
        if (!authService.isAuthenticated) {
            throw new Error('User not authenticated');
        }

        try {
            const response = await projectSendAPI.getFiles(userId);
            return response.files || response.data || [];
        } catch (error) {
            console.error('Get files error:', error);
            throw error;
        }
    }

    async getFilesByCategory(category) {
        if (!authService.isAuthenticated) {
            throw new Error('User not authenticated');
        }

        try {
            const response = await projectSendAPI.getFilesByCategory(category);
            return response.files || response.data || [];
        } catch (error) {
            console.error('Get files by category error:', error);
            throw error;
        }
    }

    getDownloadUrl(fileId) {
        return projectSendAPI.getDownloadUrl(fileId);
    }

    async deleteFile(fileId) {
        if (!authService.hasPermission('delete_files')) {
            throw new Error('Permission denied');
        }

        try {
            const response = await projectSendAPI.deleteFile(fileId);
            return response;
        } catch (error) {
            console.error('Delete file error:', error);
            throw error;
        }
    }

    async getFileInfo(fileId) {
        try {
            const response = await projectSendAPI.getFileInfo(fileId);
            return response;
        } catch (error) {
            console.error('Get file info error:', error);
            throw error;
        }
    }

    // Filtrar arquivos por tipo ou categoria
    filterFiles(files, filters = {}) {
        let filteredFiles = [...files];

        if (filters.type) {
            filteredFiles = filteredFiles.filter(file =>
                file.type?.includes(filters.type) || file.mime_type?.includes(filters.type)
            );
        }

        if (filters.category) {
            filteredFiles = filteredFiles.filter(file =>
                file.category === filters.category
            );
        }

        if (filters.dateFrom) {
            filteredFiles = filteredFiles.filter(file =>
                new Date(file.upload_date || file.created_at) >= new Date(filters.dateFrom)
            );
        }

        if (filters.dateTo) {
            filteredFiles = filteredFiles.filter(file =>
                new Date(file.upload_date || file.created_at) <= new Date(filters.dateTo)
            );
        }

        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            filteredFiles = filteredFiles.filter(file =>
                file.name?.toLowerCase().includes(searchTerm) ||
                file.description?.toLowerCase().includes(searchTerm)
            );
        }

        return filteredFiles;
    }

    async getCategories() {
        try {
            const response = await projectSendAPI.getCategories();
            return response.categories || response.data || [];
        } catch (error) {
            console.error('Get categories error:', error);
            return [];
        }
    }
}

// Instâncias dos serviços
const authService = new AuthService();
const fileService = new FileService();

// Exportar para compatibilidade com código existente
export const projectSend = projectSendAPI;

// Funções de compatibilidade com a API do Supabase
export const isAuthenticated = () => authService.isUserAuthenticated();
export const signIn = (email, password) => authService.login(email, password);
export const signOut = () => authService.logout();
export const getCurrentUser = () => authService.getCurrentUser();
export const onAuthStateChange = (callback) => authService.onAuthStateChange(callback);

// Funções de compatibilidade para storage (simulando buckets como categorias)
export const listBuckets = () => fileService.getCategories();
export const listFilesInBucket = (bucketName, path = '') => fileService.getFilesByCategory(bucketName);
export const getPublicUrl = (bucketName, filePath) => fileService.getDownloadUrl(filePath);
export const getSignedUrl = (bucketName, filePath, expiresIn = 3600) => fileService.getDownloadUrl(filePath);
export const downloadFile = (bucketName, filePath) => fileService.getFileInfo(filePath);
export const bucketExists = async (bucketName) => {
    try {
        const categories = await fileService.getCategories();
        return categories.some(cat => cat.name === bucketName || cat.id === bucketName);
    } catch (error) {
        return false;
    }
};

// Exportar serviços
export { authService, fileService };
