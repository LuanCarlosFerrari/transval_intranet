// Modal.js - Controle global de modais reutilizáveis

// Função para abrir o modal com conteúdo dinâmico
export function openModal(contentHtml) {
    const modal = document.getElementById('global-modal');
    const content = document.getElementById('modal-content');
    if (modal && content) {
        content.innerHTML = contentHtml;
        modal.classList.remove('hidden');
    }
}

// Função para fechar o modal
export function closeModal() {
    const modal = document.getElementById('global-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Evento para fechar ao clicar no botão X
window.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('close-modal-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    // Fechar ao clicar fora do conteúdo
    const modal = document.getElementById('global-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
});
