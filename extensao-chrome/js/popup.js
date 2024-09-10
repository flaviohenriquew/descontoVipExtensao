import { loadSettings } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
    // Carregar as configurações salvas usando chrome.storage
    loadSettings((settings) => {
        const magaluBaseUrl = settings.magaluBaseUrl || 'https://www.magazinevoce.com.br/casadapromocoes/p/';
        const showProductName = settings.showProductName || false;

        // Função para buscar o nome do produto da Magalu
        async function getProductName(code) {
            // Se a opção de exibir o nome do produto estiver desabilitada, retorna apenas o link
            if (!showProductName) {
                return { productName: '', link: `${magaluBaseUrl}${code}/` };
            }

            // Caso o nome do produto seja necessário, faz a requisição ao servidor backend
            const url = `http://poseidonserver.ddns.net:3100/produto/${code}`;
            try {
                const response = await fetch(url);
                const data = await response.json();

                return { productName: data.productName, link: data.link };
            } catch (error) {
                console.error('Erro ao buscar o nome do produto:', error);
                return { productName: `Produto ${code}`, link: `${magaluBaseUrl}${code}/` };
            }
        }

        document.getElementById('openOptions').addEventListener('click', () => {
            chrome.runtime.openOptionsPage();
        });
        
        // Mostrar a área de geração de links Magalu
        document.getElementById('showMagaluInput').addEventListener('click', () => {
            document.getElementById('magaluSection').style.display = 'block';
            document.getElementById('showMagaluInput').style.display = 'none';
        });

        // Evento de clique para gerar os links da Magalu
        document.getElementById('generateMagaluLinks').addEventListener('click', async () => {
            const inputCodes = document.getElementById('magaluCodes').value;
            if (inputCodes.trim() === "") {
                alert('Por favor, insira os códigos de produtos.');
                return;
            }

            const codes = inputCodes.split(/[\s\n]+/);  // Divide os códigos por espaços ou quebras de linha
            let result = "";

            // Buscar o nome de cada produto (se necessário) e gerar o link correspondente
            for (let code of codes) {
                const { productName, link } = await getProductName(code);
                result += `${productName ? productName + '\n' : ''}${link}\n\n`;
            }

            // Exibir os links gerados na área de texto
            document.getElementById('magaluResult').value = result;
            document.getElementById('magaluResult').style.display = 'block';
            document.getElementById('copyMagaluLinks').style.display = 'block';  // Exibir botão de copiar
        });

        // Função para copiar os links gerados
        document.getElementById('copyMagaluLinks').addEventListener('click', () => {
            const resultText = document.getElementById('magaluResult');
            resultText.select();
            document.execCommand('copy');
            alert('Links copiados para a área de transferência!');
        });
    });
});
