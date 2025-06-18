const loginBtnDesktop = document.getElementById('login-btn-desktop');
const loginBtnMobile = document.getElementById('login-btn-mobile');
const loginModal = document.getElementById('login-modal');
const closeModalBtn = document.getElementById('close-modal-btn');

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
