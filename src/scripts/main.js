import { initFiliaisMap } from './mapa-filiais.js';
import { generateClientCards } from './clientes.js';
import { initPresentation } from './presentation.js';
import { initContact } from './contact.js';
import './login.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado, iniciando scripts...');

    try {
        initFiliaisMap();
        console.log('Mapa de filiais inicializado');
    } catch (error) {
        console.error('Erro ao inicializar mapa de filiais:', error);
    }

    try {
        generateClientCards();
        console.log('Cards de clientes inicializados');
    } catch (error) {
        console.error('Erro ao gerar cards de clientes:', error);
    }

    try {
        initPresentation();
        console.log('Apresentação inicializada');
    } catch (error) {
        console.error('Erro ao inicializar apresentação:', error);
    }

    try {
        initContact();
        console.log('Contato inicializado');
    } catch (error) {
        console.error('Erro ao inicializar contato:', error);
    }
});
