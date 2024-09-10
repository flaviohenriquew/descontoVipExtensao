export function loadSettings(callback) {
    chrome.storage.sync.get(['magaluBaseUrl', 'showProductName'], callback);
}

export function saveSettings(magaluBaseUrl, showProductName, callback) {
    chrome.storage.sync.set({
        magaluBaseUrl,
        showProductName
    }, callback);
}
