var storage = chrome.storage.local,
    browserAction = chrome.browserAction,
    windows = chrome.windows,
    tabs = chrome.tabs;

storage.get('enabled', function (items) {
    isEnabled = items.enabled;
    if (isEnabled || isEnabled == undefined)
        browserAction.setIcon({ 'path': './icons/icon-32.png' });
    else
        browserAction.setIcon({ 'path': './icons/icon-32-disabled.png' });
});

chrome.extension.onMessage.addListener(function (request) {
    if (request == "enabled")
        browserAction.setIcon({ 'path': './icons/icon-32.png' });
    else if (request == "disabled")
        browserAction.setIcon({ 'path': './icons/icon-32-disabled.png' });
});

tabs.onCreated.addListener(function (createdTab) {
    tabs.query({ windowId: windows.WINDOW_ID_CURRENT }, function (openTabs) {
        openTabs.forEach(tab => {
            if (tab.id === createdTab.id) {
                let url = tab.url,
                    // Files
                    figmaFileURL = 'https://www.figma.com/file',
                    isFigmaFile = url.indexOf(figmaFileURL) == 0,
                    // Protos
                    figmaProtoURL = 'https://www.figma.com/proto',
                    isFigmaProto = url.indexOf(figmaProtoURL) == 0;

                if (isFigmaFile || isFigmaProto) {
                    tabs.update(tab.id, { active: true });
                }
            }
        });
    });
})