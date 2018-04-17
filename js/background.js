var storage = chrome.storage.local;
var browserAction = chrome.browserAction;

storage.get('enabled', function(items) {
    isEnabled = items.enabled;
    if (isEnabled || isEnabled == undefined)
        browserAction.setIcon({ 'path': './icons/icon-32.png' });
    else
        browserAction.setIcon({ 'path': './icons/icon-32-disabled.png' });
});

chrome.extension.onMessage.addListener(function(request) {
    if (request == "enabled")
        browserAction.setIcon({ 'path': './icons/icon-32.png' });
    else if (request == "disabled")
        browserAction.setIcon({ 'path': './icons/icon-32-disabled.png' });
});