var storage = chrome.storage.local;

storage.get('enabled', function(items) {
    isEnabled = items.enabled;
    if (isEnabled || isEnabled == undefined)
        storage.set({ 'enabled': false }, updateExtensionStatus("disabled"));
    else
        storage.set({ 'enabled': true }, updateExtensionStatus("enabled"));
});

function updateExtensionStatus(status) {
    chrome.extension.sendMessage(status);
    window.close();
}