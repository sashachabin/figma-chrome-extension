var storage = chrome.storage.local;

storage.get('enabled', function(items) {
    var isEnabled = items.enabled;
    if (isEnabled || isEnabled == undefined) {
        var url = window.location.href,
            // Files
            figmaFileURL = 'https://www.figma.com/file',
            isFigmaFile = url.indexOf(figmaFileURL) == 0,
            // Protos
            figmaProtoURL = 'https://www.figma.com/proto',
            isFigmaProto = url.indexOf(figmaProtoURL) == 0;

        if (isFigmaFile || isFigmaProto) {
            window.stop();
            document.title = 'Opening in Figma...'
            var figmaLink = url.replace('https://www.figma.com', 'figma://');

            window.location.replace(figmaLink);
            setTimeout(function() {
                window.close();
            }, 50);
        }
    }
})