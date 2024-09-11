import { loadSettings } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
    loadSettings((settings) => {
        const magaluBaseUrl = settings.magaluBaseUrl || 'https://www.magazinevoce.com.br/casadapromocoes/p/';
        const showProductName = settings.showProductName || false;

        async function getProductName(code) {
            if (!showProductName) {
                return { productName: '', link: `${magaluBaseUrl}${code}/` };
            }

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

        // Abrir a página de opções
        document.getElementById('openOptions').addEventListener('click', () => {
            chrome.runtime.openOptionsPage();
        });

        // Mostrar a entrada de links da Magalu
        const showMagaluButton = document.getElementById('showMagaluInput');
        if (showMagaluButton) {
            showMagaluButton.addEventListener('click', () => {
                document.getElementById('magaluSection').style.display = 'block';
                showMagaluButton.style.display = 'none';
            });
        } else {
            console.error("O botão 'showMagaluInput' não foi encontrado.");
        }

        // Gerar links da Magalu
        document.getElementById('generateMagaluLinks').addEventListener('click', async () => {
            const inputCodes = document.getElementById('magaluCodes').value;
            if (inputCodes.trim() === "") {
                alert('Por favor, insira os códigos de produtos.');
                return;
            }

            const codes = inputCodes.split(/[\s\n]+/);
            let result = "";

            for (let code of codes) {
                const { productName, link } = await getProductName(code);
                result += `${productName ? productName + '\n' : ''}${link}\n\n`;
            }

            document.getElementById('magaluResult').value = result;
            document.getElementById('magaluResult').style.display = 'block';
            document.getElementById('copyMagaluLinks').style.display = 'block';
        });

        // Copiar os links da Magalu gerados
        document.getElementById('copyMagaluLinks').addEventListener('click', () => {
            const resultText = document.getElementById('magaluResult');
            resultText.select();
            document.execCommand('copy');
            alert('Links copiados para a área de transferência!');
        });

        // Evento de clique para gerar o link limpo da Shopee
        document.getElementById('generateShopeeLink').addEventListener('click', () => {
            // Obtém a URL da aba ativa somente quando o botão é clicado
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                const tab = tabs[0];
                const url = tab.url;

                console.log("URL da aba ativa: ", url); // Verifique se a URL correta é capturada

                // Função para limpar o link da Shopee
                function getCleanShopeeLink(url) {
                    const regex = /^https:\/\/shopee.com.br\/product\/\d+\/\d+/;
                    const match = url.match(regex);

                    if (match) {
                        return match[0];
                    } else {
                        return null;
                    }
                }

                // Limpa o link da Shopee e copia para a área de transferência
                const cleanLink = getCleanShopeeLink(url);
                if (cleanLink) {
                    navigator.clipboard.writeText(cleanLink).then(() => {
                        alert(`Link Shopee Limpo copiado: ${cleanLink}`);
                    }).catch(err => {
                        console.error('Falha ao copiar o link: ', err);
                    });
                } else {
                    alert('Link inválido ou não é da Shopee');
                }
            });
        });

    });

    // Escutar mensagens do background.js (como no caso do menu de contexto)
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === "copyShopeeLink") {
            // Copia o link para a área de transferência
            navigator.clipboard.writeText(message.link).then(() => {
                alert(`Link Shopee Limpo copiado: ${message.link}`);
            }).catch(err => {
                console.error('Erro ao copiar o link: ', err);
            });
        } else if (message.action === "invalidLink") {
            alert('Link inválido ou não é da Shopee');
        }else if (message.action === "showAlert") {
            alert(message.message);
        }
    });

});
