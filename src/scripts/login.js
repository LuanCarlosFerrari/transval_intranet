import { signIn, signOut, isAuthenticated, getCurrentUser, onAuthStateChange } from '../config/supabase.js';

console.log('Login script carregado');

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
                <form id="login-form" class="space-y-6">                    <div>
                        <label for="email" class="block text-gray-700 text-sm font-semibold mb-2">E-mail</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="fas fa-envelope text-gray-400"></i>
                            </div>
                            <input type="email" id="email" name="email" required
                                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                                placeholder="Digite seu e-mail">
                        </div>
                    </div>
                    <div>
                        <label for="password" class="block text-gray-700 text-sm font-semibold mb-2">Senha</label>                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="fas fa-lock text-gray-400"></i>
                            </div>
                            <input type="password" id="password" name="password" required
                                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                                placeholder="Digite sua senha">
                        </div>
                    </div>                    <button type="submit" id="login-submit-btn"
                        class="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                        <span id="login-button-text">
                            <i class="fas fa-sign-in-alt mr-2"></i>
                            Entrar
                        </span>
                        <span id="login-button-loading" class="hidden">
                            <i class="fas fa-spinner fa-spin mr-2"></i>
                            Entrando...
                        </span>
                    </button>
                    <div id="login-error" class="hidden mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                        <!-- Mensagens de erro aparecerão aqui -->
                    </div>
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
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM carregado, iniciando sistema de login');

    try {
        createLoginModal();
        console.log('Modal de login criado');

        // Verificar se o usuário já está autenticado
        try {
            const authenticated = await isAuthenticated();
            if (authenticated) {
                console.log('Usuário já está autenticado');
                // Opcional: redirecionar automaticamente para o dashboard
                // window.location.href = 'dashboard.html';
            }
        } catch (error) {
            console.log('Erro ao verificar autenticação (pode ser normal se Supabase não estiver configurado):', error);
        }        // Listener para mudanças no estado de autenticação
        try {
            const authListener = await onAuthStateChange((event, session) => {
                console.log('Mudança no estado de autenticação:', event);
                if (event === 'SIGNED_IN') {
                    console.log('Usuário logado:', session.user);
                    closeModal();
                    window.location.href = 'dashboard.html';
                } else if (event === 'SIGNED_OUT') {
                    console.log('Usuário deslogado');
                }
            });
        } catch (error) {
            console.log('Erro ao configurar listener de autenticação:', error);
        }

        // Agora que o modal foi criado, podemos selecionar os elementos
        const loginBtnDesktop = document.getElementById('login-btn-desktop');
        const loginBtnMobile = document.getElementById('login-btn-mobile');
        const loginModal = document.getElementById('login-modal');
        const closeModalBtn = document.getElementById('close-modal-btn');
        const loginForm = document.getElementById('login-form');
        const loginSubmitBtn = document.getElementById('login-submit-btn');
        const loginButtonText = document.getElementById('login-button-text');
        const loginButtonLoading = document.getElementById('login-button-loading');
        const loginError = document.getElementById('login-error'); const openModal = () => {
            loginModal.classList.remove('hidden');
            loginModal.classList.add('flex');
            // Limpar erros anteriores
            hideError();
        };

        const closeModal = () => {
            loginModal.classList.add('hidden');
            loginModal.classList.remove('flex');
            // Limpar formulário
            loginForm.reset();
            hideError();
        };

        const showError = (message) => {
            loginError.textContent = message;
            loginError.classList.remove('hidden');
        };

        const hideError = () => {
            loginError.classList.add('hidden');
        };

        const setLoading = (isLoading) => {
            if (isLoading) {
                loginSubmitBtn.disabled = true;
                loginButtonText.classList.add('hidden');
                loginButtonLoading.classList.remove('hidden');
            } else {
                loginSubmitBtn.disabled = false;
                loginButtonText.classList.remove('hidden');
                loginButtonLoading.classList.add('hidden');
            }
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
        });    // Handle login form submission
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (!email || !password) {
                showError('Por favor, preencha todos os campos.');
                return;
            }

            setLoading(true);
            hideError();

            try {
                const { user } = await signIn(email, password);
                console.log('Login realizado com sucesso:', user);
                // O redirecionamento será feito pelo listener onAuthStateChange
            } catch (error) {
                console.error('Erro no login:', error);

                let errorMessage = 'Erro ao fazer login. Tente novamente.';

                if (error.message.includes('Invalid login credentials')) {
                    errorMessage = 'E-mail ou senha incorretos.';
                } else if (error.message.includes('Email not confirmed')) {
                    errorMessage = 'Por favor, confirme seu e-mail antes de fazer login.';
                } else if (error.message.includes('Too many requests')) {
                    errorMessage = 'Muitas tentativas de login. Tente novamente mais tarde.';
                }

                showError(errorMessage);
            } finally {
                setLoading(false);
            }
        });

    } catch (error) {
        console.error('Erro ao inicializar sistema de login:', error);
        // Se houver erro na inicialização, ainda assim criar um sistema básico
        alert('Erro ao carregar sistema de autenticação. Verifique a configuração do Supabase.');
    }
});
