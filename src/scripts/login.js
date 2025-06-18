const loginBtnDesktop = document.getElementById('login-btn-desktop');
const loginBtnMobile = document.getElementById('login-btn-mobile');
const loginModal = document.getElementById('login-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const loginForm = document.getElementById('login-form');

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
    // Adicione aqui a lógica de validação de usuário e senha, se necessário
    window.location.href = 'dashboard.html'; // Redireciona para a página de documentos
});
