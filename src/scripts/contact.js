export const contactContent = {
    title: "Vamos acelerar sua logística?",
    description: "Converse com nossos especialistas e descubra a solução ideal para o seu negócio.",
    buttonTextOpen: "Solicitar Cotação",
    buttonTextClose: "Fechar Formulário",
    formHtml: `
        <form id="cotacao-form" class="mt-8 text-left max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h3 class="text-2xl font-bold mb-6 text-gray-800 text-center">Formulário de Cotação</h3>
            <div class="mb-4">
                <label for="nome" class="block text-gray-700 text-sm font-bold mb-2">Nome Completo:</label>
                <input type="text" id="nome" name="nome" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <div class="mb-4">
                <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                <input type="email" id="email" name="email" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <div class="mb-4">
                <label for="telefone" class="block text-gray-700 text-sm font-bold mb-2">Telefone:</label>
                <input type="tel" id="telefone" name="telefone" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <div class="mb-6">
                <label for="mensagem" class="block text-gray-700 text-sm font-bold mb-2">Mensagem:</label>
                <textarea id="mensagem" name="mensagem" rows="4" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
            </div>
            <div class="flex items-center justify-center">
                <button type="submit" class="bg-[#ff5d29] hover:bg-[#e04a1a] text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline">
                    Enviar Solicitação
                </button>
            </div>
        </form>
    `
};
