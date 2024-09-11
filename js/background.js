// Cria a opção de menu de contexto
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "generateShopeeLink",  // Identificador único para o item de menu
        title: "Gerar Link Shopee",
        contexts: ["page"],  // Exibe a opção ao clicar com o botão direito na página
    });
});

// Função para exibir uma notificação
function showNotification(message) {
    chrome.notifications.create({
        type: "basic",
        iconUrl: "../assets/icons/icon48.png",  // Caminho relativo da raiz do projeto
        title: "Descontovip Extensão",
        message: message
    });
}

// Gerencia o clique no item de menu de contexto
chrome.contextMenus.onClicked.addListener((info, tab) => {
    const url = tab.url;

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

    // Verifica se a URL é de uma página da Shopee antes de enviar a mensagem
    if (url.includes("shopee.com.br")) {
        const cleanLink = getCleanShopeeLink(url);

        if (cleanLink) {
            // Envia a mensagem para o content.js para copiar o link da Shopee
            chrome.tabs.sendMessage(tab.id, { action: "copyShopeeLink", link: cleanLink }, (response) => {
                if (chrome.runtime.lastError) {
                    console.error('Erro ao enviar mensagem:', chrome.runtime.lastError.message);
                } else {
                    console.log('Resposta do content script:', response);
                }
            });
        } else {
            // Caso o link não seja válido, envia uma mensagem de link inválido
            chrome.tabs.sendMessage(tab.id, { action: "invalidLink" }, (response) => {
                if (chrome.runtime.lastError) {
                    console.error('Erro ao enviar mensagem:', chrome.runtime.lastError.message);
                } else {
                    console.log('Resposta do content script:', response);
                }
            });
        }
    } else {
        console.error("Este não é um site da Shopee. Ação não permitida.");
        showNotification("Você só pode usar essa função em páginas da Shopee.");
    }
});
