import { signOut, isAuthenticated, getCurrentUser, onAuthStateChange } from '../config/supabase.js';

// Verificar autenticação ao carregar a página
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const authenticated = await isAuthenticated();

        if (!authenticated) {
            // Se não estiver autenticado, redirecionar para a página inicial
            console.log('Usuário não autenticado, redirecionando...');
            window.location.href = '../index.html';
            return;
        }

        // Obter dados do usuário atual
        const user = await getCurrentUser();
        console.log('Usuário autenticado:', user);

        // Atualizar a interface com os dados do usuário
        updateUserInterface(user);

        // Configurar o botão de logout
        setupLogoutButton();

    } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        window.location.href = '../index.html';
    }

    // Listener para mudanças no estado de autenticação
    onAuthStateChange((event, session) => {
        if (event === 'SIGNED_OUT') {
            console.log('Usuário deslogado, redirecionando...');
            window.location.href = '../index.html';
        }
    });
});

// Função para atualizar a interface com dados do usuário
function updateUserInterface(user) {
    // Procurar por elementos que podem exibir informações do usuário
    const userEmailElements = document.querySelectorAll('[data-user-email]');
    const userNameElements = document.querySelectorAll('[data-user-name]');

    userEmailElements.forEach(element => {
        element.textContent = user.email;
    });

    // Se houver nome no metadata do usuário
    const userName = user.user_metadata?.full_name || user.email.split('@')[0];
    userNameElements.forEach(element => {
        element.textContent = userName;
    });
}

// Função para configurar o botão de logout
function setupLogoutButton() {
    // Procurar por botões de logout existentes
    const logoutButtons = document.querySelectorAll('[data-logout], #logout-btn, .logout-btn');

    logoutButtons.forEach(button => {
        button.addEventListener('click', handleLogout);
    });
}
// Função para lidar com o logout
async function handleLogout(event) {
    event.preventDefault();

    try {
        await signOut();
        console.log('Logout realizado com sucesso');
        // O redirecionamento será feito pelo listener onAuthStateChange
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
        alert('Erro ao fazer logout. Tente novamente.');
    }
}

// Exportar funções para uso em outras partes do código
export { updateUserInterface, setupLogoutButton, handleLogout };
