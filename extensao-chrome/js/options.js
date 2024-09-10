import { saveSettings, loadSettings } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
    // Carrega as configurações ao abrir a página de opções
    loadSettings((settings) => {
        document.getElementById('magaluBaseUrl').value = settings.magaluBaseUrl || 'https://www.magazinevoce.com.br/casadapromocoes/p/';
        document.getElementById('showProductName').checked = settings.showProductName || false;
    });
});

// Salvar configurações quando o usuário clicar em "Salvar"
document.getElementById('saveSettings').addEventListener('click', () => {
    const magaluBaseUrl = document.getElementById('magaluBaseUrl').value;
    const showProductName = document.getElementById('showProductName').checked;

    chrome.storage.sync.set({
        magaluBaseUrl: magaluBaseUrl,
        showProductName: showProductName
    }, () => {
        alert('Configurações salvas com sucesso!');
    });
});