import { initFiliaisMap } from './mapa-filiais.js';
import { generateClientCards } from './clientes.js';
import { initPresentation } from './presentation.js';
import { initContact } from './contact.js';
import './login.js';

document.addEventListener('DOMContentLoaded', () => {
    initFiliaisMap();
    generateClientCards();
    initPresentation();
    initContact();
});
