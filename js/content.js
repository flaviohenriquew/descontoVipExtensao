chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Mensagem recebida no content.js:", message);

    if (message.action === "copyShopeeLink") {
        navigator.clipboard.writeText(message.link).then(() => {
            alert(`Link Shopee Limpo copiado: ${message.link}`);
            sendResponse({ success: true });  // Responde ao background.js que a ação foi concluída
        }).catch(err => {
            console.error('Erro ao copiar o link:', err);
            sendResponse({ success: false, error: err });  // Envia uma resposta com o erro
        });
    } else if (message.action === "invalidLink") {
        alert('Link inválido ou não é da Shopee');
        sendResponse({ success: false });
    }

    return true;  // Retorna true para garantir que a resposta assíncrona será enviada
});
