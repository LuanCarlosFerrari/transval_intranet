// Função para criar o modal de login dinamicamente
function createLoginModal() {
    const modalHTML = `
        <div id="login-modal" class="fixed inset-0 bg-black bg-opacity-75 z-[800] hidden items-center justify-center p-4">
            <div class="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-2xl w-full max-w-md mx-auto border border-gray-200">
                <div class="flex justify-between items-center mb-8">
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                            <i class="fas fa-lock text-white text-sm"></i>
                        </div>
                        <h2 class="text-2xl font-bold text-gray-800">Acesso Restrito</h2>
                    </div>
                    <button id="close-modal-btn" class="w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors duration-200">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <form id="login-form" class="space-y-6">
                    <div>
                        <label for="username" class="block text-gray-700 text-sm font-semibold mb-2">Usuário</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="fas fa-user text-gray-400"></i>
                            </div>
                            <input type="text" id="username" name="username"
                                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                                placeholder="Digite seu usuário">
                        </div>
                    </div>
                    <div>
                        <label for="password" class="block text-gray-700 text-sm font-semibold mb-2">Senha</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="fas fa-lock text-gray-400"></i>
                            </div>
                            <input type="password" id="password" name="password"
                                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                                placeholder="Digite sua senha">
                        </div>
                    </div>
                    <button type="submit"
                        class="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                        <i class="fas fa-sign-in-alt mr-2"></i>
                        Entrar
                    </button>
                </form>
                <div class="mt-6 text-center">
                    <p class="text-xs text-gray-500">Acesso exclusivo para funcionários autorizados</p>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Criar o modal quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    createLoginModal();

    // Agora que o modal foi criado, podemos selecionar os elementos
    const loginBtnDesktop = document.getElementById('login-btn-desktop');
    const loginBtnMobile = document.getElementById('login-btn-mobile');
    const loginModal = document.getElementById('login-modal');
    const closeModalBtn = document.getElementById('close-modal-btn'); const loginForm = document.getElementById('login-form');

    const openModal = () => {
        loginModal.classList.remove('hidden');
        loginModal.classList.add('flex');
    };

    const closeModal = () => {
        loginModal.classList.add('hidden');
        loginModal.classList.remove('flex');
    };

    loginBtnDesktop.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });

    loginBtnMobile.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });

    closeModalBtn.addEventListener('click', () => {
        closeModal();
    });

    // Optional: Close modal by clicking outside of it
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            closeModal();
        }
    });

    // Handle login form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o envio padrão do formulário
        console.log('Redirecionando para documents.html');
        // Adicione aqui a lógica de validação de usuário e senha, se necessário
        window.location.href = 'documents.html'; // Redireciona para a página de documentos
    });
});
