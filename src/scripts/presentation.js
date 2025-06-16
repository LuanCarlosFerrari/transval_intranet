// Define a base URL dependendo do ambiente
const baseUrl = window.location.hostname === 'luancarlosferrari.github.io'
    ? '/transval-intranet-New'
    : '';

export const aboutContent = {
    presentation: `
        <div class="flex flex-col items-center text-center">
            <img src="${baseUrl}/Assets/logo-branca-transval.png" alt="Logo Transval" class="mx-auto block max-w-[200px] h-auto mb-4">
            <p class="text-lg font-bold mb-2">NOSSA HISTÓRIA:</p>
            <p class="text-gray-700 mb-6 text-left md:text-center">
                Desde 1987, construímos uma trajetória pautada na solidez e na evolução contínua. Sediados em Rinópolis (SP), expandimos de forma estruturada, incorporando unidades operacionais em Rondonópolis (MT) e Sumaré (SP) para aprimorar a cobertura nacional e otimizar o fluxo de cargas.<br><br> A constituição de frota própria e a oferta de serviços de agenciamento reforçam nosso controle sobre os processos logísticos, assegurando maior agilidade, segurança e eficiência. Guiados pelos valores que originaram a companhia, mantemos o propósito de oferecer soluções completas e personalizadas, preservando a confiança de nossos clientes e o comprometimento com a excelência que norteia cada etapa de nossas operações.
            </p>
            
            <!-- Nova Linha do Tempo Horizontal -->
            <div class="text-lg font-bold mb-8 text-center">NOSSA HISTÓRIA:</div>
            <div class="container mx-auto px-2 py-4 sm:px-4">
                <div class="relative">
                    <!-- Linha Horizontal Central -->
                    <div class="hidden sm:block absolute top-1/2 left-0 right-0 h-1 bg-blue-500 transform -translate-y-1/2"></div>

                    <!-- Container de Eventos (Flex para Desktop, Bloco para Mobile) -->
                    <div class="flex flex-col sm:flex-row sm:justify-center items-stretch text-center relative space-y-8 sm:space-y-0 sm:space-x-6 md:space-x-8">

                        <!-- Evento 1: 1987 (Conteúdo Acima no Desktop) -->
                        <div class="flex-1 timeline-event-horizontal group sm:text-center">
                            <div class="sm:event-content-wrapper sm:mb-2 sm:relative sm:pt-4">
                                <div class="event-details bg-blue-100 p-3 rounded-lg shadow-lg w-full sm:w-44 md:w-48 mx-auto">
                                    <h3 class="text-md sm:text-lg font-semibold text-blue-700">Fundação</h3>
                                    <p class="text-xs text-gray-700 mt-1">Criação da empresa familiar por Onevaldo e Valmir, em Rinópolis – SP.</p>
                                </div>
                                <div class="hidden sm:block absolute bottom-0 left-1/2 w-px h-4 bg-blue-500 transform -translate-x-1/2 translate-y-full"></div>
                            </div>
                            <div class="hidden sm:block w-4 h-4 bg-blue-600 rounded-full mx-auto relative z-10 border-2 border-white my-2"></div>
                            <div class="year-label sm:mt-2">
                                <p class="text-xl font-bold text-blue-700">1987</p>
                            </div>
                        </div>

                        <!-- Evento 2: 2000 (Conteúdo Abaixo no Desktop) -->
                        <div class="flex-1 timeline-event-horizontal group sm:text-center">
                            <div class="year-label sm:mb-2">
                                <p class="text-xl font-bold text-gray-700">2000</p>
                            </div>
                            <div class="hidden sm:block w-4 h-4 bg-gray-600 rounded-full mx-auto relative z-10 border-2 border-white my-2"></div>
                            <div class="sm:event-content-wrapper sm:mt-2 sm:relative sm:pb-4">
                                <div class="hidden sm:block absolute top-0 left-1/2 w-px h-4 bg-gray-500 transform -translate-x-1/2 -translate-y-full"></div>
                                <div class="event-details bg-gray-100 p-3 rounded-lg shadow-lg w-full sm:w-44 md:w-48 mx-auto">
                                    <h3 class="text-md sm:text-lg font-semibold text-gray-800">Frota própria</h3>
                                    <p class="text-xs text-gray-700 mt-1">Consolidação de frota própria, garantindo agilidade, controle e segurança.</p>
                                </div>
                            </div>
                        </div>

                        <!-- Evento 3: 2010 (Conteúdo Acima no Desktop) -->
                        <div class="flex-1 timeline-event-horizontal group sm:text-center">
                            <div class="sm:event-content-wrapper sm:mb-2 sm:relative sm:pt-4">
                                <div class="event-details bg-blue-100 p-3 rounded-lg shadow-lg w-full sm:w-44 md:w-48 mx-auto">
                                    <h3 class="text-md sm:text-lg font-semibold text-blue-700">Unidade Rondonópolis</h3>
                                    <p class="text-xs text-gray-700 mt-1">Abertura da unidade em Rondonópolis – MT para apoiar nossa operação no Centro-Oeste.</p>
                                </div>
                                <div class="hidden sm:block absolute bottom-0 left-1/2 w-px h-4 bg-blue-500 transform -translate-x-1/2 translate-y-full"></div>
                            </div>
                            <div class="hidden sm:block w-4 h-4 bg-blue-600 rounded-full mx-auto relative z-10 border-2 border-white my-2"></div>
                            <div class="year-label sm:mt-2">
                                <p class="text-xl font-bold text-blue-700">2010</p>
                            </div>
                        </div>

                        <!-- Evento 4: 2014 (Conteúdo Abaixo no Desktop) -->
                        <div class="flex-1 timeline-event-horizontal group sm:text-center">
                            <div class="year-label sm:mb-2">
                                <p class="text-xl font-bold text-gray-700">2014</p>
                            </div>
                            <div class="hidden sm:block w-4 h-4 bg-gray-600 rounded-full mx-auto relative z-10 border-2 border-white my-2"></div>
                            <div class="sm:event-content-wrapper sm:mt-2 sm:relative sm:pb-4">
                                <div class="hidden sm:block absolute top-0 left-1/2 w-px h-4 bg-gray-500 transform -translate-x-1/2 -translate-y-full"></div>
                                <div class="event-details bg-gray-100 p-3 rounded-lg shadow-lg w-full sm:w-44 md:w-48 mx-auto">
                                    <h3 class="text-md sm:text-lg font-semibold text-gray-800">Agenciamento de Cargas</h3>
                                    <p class="text-xs text-gray-700 mt-1">Início do serviço de agenciamento, conectando soluções logísticas em todo o Brasil.</p>
                                </div>
                            </div>
                        </div>

                        <!-- Evento 5: 2018 (Conteúdo Acima no Desktop) -->
                        <div class="flex-1 timeline-event-horizontal group sm:text-center">
                            <div class="sm:event-content-wrapper sm:mb-2 sm:relative sm:pt-4">
                                <div class="event-details bg-blue-100 p-3 rounded-lg shadow-lg w-full sm:w-44 md:w-48 mx-auto">
                                    <h3 class="text-md sm:text-lg font-semibold text-blue-700">Unidade Sumaré</h3>
                                    <p class="text-xs text-gray-700 mt-1">Implantação da unidade em Sumaré – SP, reforçando a presença no Sudeste.</p>
                                </div>
                                <div class="hidden sm:block absolute bottom-0 left-1/2 w-px h-4 bg-blue-500 transform -translate-x-1/2 translate-y-full"></div>
                            </div>
                            <div class="hidden sm:block w-4 h-4 bg-blue-600 rounded-full mx-auto relative z-10 border-2 border-white my-2"></div>
                            <div class="year-label sm:mt-2">
                                <p class="text-xl font-bold text-blue-700">2018</p>
                            </div>
                        </div>

                        <!-- Evento 6: Hoje (Conteúdo Abaixo no Desktop) -->
                        <div class="flex-1 timeline-event-horizontal group sm:text-center">
                            <div class="year-label sm:mb-2">
                                <p class="text-xl font-bold text-gray-700">Hoje</p>
                            </div>
                            <div class="hidden sm:block w-4 h-4 bg-gray-600 rounded-full mx-auto relative z-10 border-2 border-white my-2"></div>
                            <div class="sm:event-content-wrapper sm:mt-2 sm:relative sm:pb-4">
                                <div class="hidden sm:block absolute top-0 left-1/2 w-px h-4 bg-gray-500 transform -translate-x-1/2 -translate-y-full"></div>
                                <div class="event-details bg-gray-100 p-3 rounded-lg shadow-lg w-full sm:w-44 md:w-48 mx-auto">
                                    <h3 class="text-md sm:text-lg font-semibold text-gray-800">Excelência Contínua</h3>
                                    <p class="text-xs text-gray-700 mt-1">Seguimos evoluindo para oferecer as melhores soluções em transporte e logística.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <!-- Fim da Nova Linha do Tempo Horizontal -->

            <p class="text-lg font-bold mb-2 mt-8">NOSSO PROPÓSITO:</p>
            <p class="text-gray-700 mb-6 text-left md:text-center">Ser um parceiro estratégico dos nossos clientes e transformar a logística nacional com soluções eficientes, transparentes e seguras. Nosso compromisso é entregar qualidade, pontualidade e inovação, atender às necessidades específicas de cada cliente e promover a sustentabilidade, contribuindo ativamente para o avanço do agronegócio e da indústria.</p>
            
            <p class="text-lg font-bold mb-2">NOSSOS PRINCÍPIOS:</p>
            <ul class="list-none p-0 space-y-4 text-left md:text-center">
                <li class="mb-2">
                    <strong class="block text-md font-semibold text-gray-800">FOCO NO CLIENTE E NOS RESULTADOS</strong>
                    <span class="block text-gray-600">Priorizar as necessidades dos clientes, buscando sempre entregar soluções ágeis, eficazes e com resultados positivos.</span>
                </li>
                <li class="mb-2">
                    <strong class="block text-md font-semibold text-gray-800">AGILIDADE E RAPIDEZ</strong>
                    <span class="block text-gray-600">Responder de forma célere e eficiente, reconhecendo a importância do tempo na construção de relações de sucesso.</span>
                </li>
                <li class="mb-2">
                    <strong class="block text-md font-semibold text-gray-800">QUALIDADE E EXCELÊNCIA</strong>
                    <span class="block text-gray-600">Garantir processos e entregas de alta qualidade, desenvolvendo com precisão o que foi proposto.</span>
                </li>
                <li class="mb-2">
                    <strong class="block text-md font-semibold text-gray-800">RESPONSABILIDADE E COMPROMISSO</strong>
                    <span class="block text-gray-600">Assumir responsabilidades, agir com ética, transparência e dedicação em todas as ações e decisões.</span>
                </li>
                <li class="mb-2">
                    <strong class="block text-md font-semibold text-gray-800">COMUNICAÇÃO E COLABORAÇÃO</strong>
                    <span class="block text-gray-600">Promover integração entre as áreas, garantindo uma comunicação clara e eficaz para alcançar objetivos comuns.</span>
                </li>
                <li class="mb-2">
                    <strong class="block text-md font-semibold text-gray-800">SEGURANÇA E CONFIABILIDADE</strong>
                    <span class="block text-gray-600">Assegurar a execução segura de todas as atividades, conectando pessoas e negócios com confiança.</span>
                </li>
                <li class="mb-2">
                    <strong class="block text-md font-semibold text-gray-800">TRABALHO EM EQUIPE E INTEGRAÇÃO</strong>
                    <span class="block text-gray-600">Valorizar o espírito colaborativo, unindo esforços para superar desafios e alcançar metas com eficiência.</span>
                </li>
            </ul>
        </div>
    `
};

document.addEventListener('DOMContentLoaded', () => {
    // Código para inicializar outras partes da página pode ir aqui, se necessário.
    // Por exemplo, o código que carrega o aboutContent na div #about-transval
    // Se o seu script principal (main.js ou similar) já faz isso, pode não ser necessário aqui.

    // Verifique se a função para carregar o conteúdo da apresentação ainda é necessária
    // e se está sendo chamada corretamente em seu arquivo HTML principal ou main.js.
    // Exemplo: if (typeof loadAboutContent === 'function') { loadAboutContent(); }
});
