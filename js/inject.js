var storage = chrome.storage.local;

storage.get('enabled', items => {
    let isEnabled = items.enabled;
    if (isEnabled || isEnabled == undefined) {
        let url = window.location.href,
            // Files
            figmaFileURL = 'https://www.figma.com/file',
            isFigmaFile = url.indexOf(figmaFileURL) == 0,
            // Protos
            figmaProtoURL = 'https://www.figma.com/proto',
            isFigmaProto = url.indexOf(figmaProtoURL) == 0;

        if (isFigmaFile || isFigmaProto) {
            window.stop();
            document.title = 'Opening in Figma...'
            let figmaLink = url.replace('https://www.figma.com', 'figma://');
            window.location.replace(figmaLink);
            createDialogChecker();
            dialogChecker.focus();

            setTimeout(() => {
                // If the dialog is open, #dialogChecker:focus doesn't work
                let isDialogOpen = window.getComputedStyle(dialogChecker)['padding'] != '42px';
                if (!isDialogOpen) {
                    window.close();
                } else {
                    createNotice();
                }
            }, 500);
        }
    }

    function createDialogChecker() {
        let checkerElement = `<input id="dialogChecker"></input>`,
            checkerStyles =
            `<style>
                #dialogChecker {position: absolute; top: -9999px; left: -9999px;}
                #dialogChecker:focus {padding: 42px;}
            </style>`;
        document.body.innerHTML += checkerElement + checkerStyles;
    }

    function createNotice() {
        let notice = `
            <div style='font-family: "Segoe UI", "Helvetica Neue", Roboto, sans-serif; text-align: center; max-width: 800px;'>
                <br>
                1. Please <a href="https://www.figma.com/downloads/">install Figma</a>
                <br>
                <img src="https://www.tryimg.com/u/2018/07/09/download.png" alt="">
                <br>
                <br>
                <br>
                2. Select "Always open these links associated with this app" and open Figma
                <br>
                <img src="https://www.tryimg.com/u/2018/07/09/open.png" alt="">
                <br>
                <br>
                <br>
                <br>
                <small>Please <a href="mailto:alex.chabin@gmail.com">let me know</a> if you have any question</small>
                <br>
            </div>
        `;
        document.body.innerHTML = notice;
    }
})