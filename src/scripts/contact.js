export const contactContent = {
    title: "Vamos acelerar sua logística?",
    description: "Juntos, encontramos a rota ideal para o seu sucesso. Fale com nossos especialistas!",
    buttonTextOpen: "Solicitar Cotação",
    buttonTextClose: "Fechar Formulário",
    formHtml: `
        <form id="cotacao-form" class="mt-8 text-left max-w-xl mx-auto bg-blue-950 p-8 rounded-lg shadow-xl border border-blue-800">
            <h3 class="text-3xl font-bold mb-8 text-white text-center">Formulário de Cotação</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">                <div>
                    <label for="nome" class="block text-gray-300 text-sm font-semibold mb-2">Nome Completo:</label>
                    <input type="text" id="nome" name="nome" required placeholder="Digite seu nome completo" class="w-full py-3 px-4 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400 transition-colors">
                </div>
                <div>
                    <label for="email" class="block text-gray-300 text-sm font-semibold mb-2">Email:</label>
                    <input type="email" id="email" name="email" required placeholder="email@email.com" class="w-full py-3 px-4 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400 transition-colors">
                </div>
            </div>            <div class="mb-6">
                <label for="telefone" class="block text-gray-300 text-sm font-semibold mb-2">Telefone:</label>
                <input type="tel" id="telefone" name="telefone" placeholder="(00) 00000-0000" class="w-full py-3 px-4 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400 transition-colors">
            </div>            <div class="mb-8">
                <label for="mensagem" class="block text-gray-300 text-sm font-semibold mb-2">Mensagem:</label>
                <textarea id="mensagem" name="mensagem" rows="5" required placeholder="Descreva detalhes sobre sua necessidade de transporte..." class="w-full py-3 px-4 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400 transition-colors resize-none"></textarea>
            </div>
            <div class="text-center">
                <button type="submit" class="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-10 py-4 rounded-full text-lg shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-950 focus:ring-orange-500">
                    Enviar Solicitação
                </button>
            </div>
        </form>
    `
};

export function initContact() {
    const titleEl = document.getElementById('contact-title');
    const descriptionEl = document.getElementById('contact-description');
    const buttonEl = document.getElementById('contact-button');
    const formContainerEl = document.getElementById('contact-form-container');

    if (!titleEl || !descriptionEl || !buttonEl || !formContainerEl) {
        return;
    }

    titleEl.textContent = contactContent.title;
    descriptionEl.textContent = contactContent.description;
    buttonEl.textContent = contactContent.buttonTextOpen; buttonEl.addEventListener('click', () => {
        const isHidden = formContainerEl.classList.contains('hidden');
        if (isHidden) {
            formContainerEl.innerHTML = contactContent.formHtml;
            formContainerEl.classList.remove('hidden');            // Adicionar event listener para o formulário
            const form = document.getElementById('cotacao-form');
            if (form) {
                form.addEventListener('submit', handleFormSubmit);

                // Aplicar máscaras aos campos
                applyMasks();
            }
        } else {
            formContainerEl.innerHTML = '';
            formContainerEl.classList.add('hidden');
        }
        buttonEl.textContent = isHidden ? contactContent.buttonTextClose : contactContent.buttonTextOpen;
    });
}

function handleFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const nome = formData.get('nome');
    const email = formData.get('email');
    const telefone = formData.get('telefone');
    const mensagem = formData.get('mensagem');

    // Criar mensagem para WhatsApp
    const whatsappMessage = `*Solicitação de Cotação - Transval*

*Nome:* ${nome}
*Email:* ${email}
*Telefone:* ${telefone || 'Não informado'}

*Mensagem:*
${mensagem}`;

    // Número do WhatsApp da Transval
    const whatsappNumber = '+55 18 98185-0214';

    // Encode da mensagem para URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Criar URL do WhatsApp
    const whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

    // Abrir WhatsApp
    window.open(whatsappURL, '_blank');

    // Limpar formulário
    e.target.reset();    // Fechar formulário
    const formContainer = document.getElementById('contact-form-container');
    const button = document.getElementById('contact-button');
    if (formContainer && button) {
        formContainer.innerHTML = '';
        formContainer.classList.add('hidden');
        button.textContent = contactContent.buttonTextOpen;
    }
}

// Função para aplicar máscaras nos campos
function applyMasks() {
    const telefoneInput = document.getElementById('telefone');

    if (telefoneInput) {
        telefoneInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');

            if (value.length >= 11) {
                // Celular: (00) 00000-0000
                value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
            } else if (value.length >= 10) {
                // Fixo: (00) 0000-0000
                value = value.replace(/^(\d{2})(\d{4})(\d{4}).*/, '($1) $2-$3');
            } else if (value.length >= 6) {
                value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
            } else if (value.length >= 2) {
                value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
            } else if (value.length > 0) {
                value = value.replace(/^(\d*)/, '($1');
            }

            e.target.value = value;
        });

        // Permitir apenas números e caracteres especiais da máscara
        telefoneInput.addEventListener('keypress', function (e) {
            const char = String.fromCharCode(e.which);
            if (!/[\d\(\)\s\-]/.test(char) && e.which !== 8 && e.which !== 0) {
                e.preventDefault();
            }
        });
    }
}
