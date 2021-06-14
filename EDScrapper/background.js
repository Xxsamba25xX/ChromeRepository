try {

    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request == "getMyInfo") {
            getMyInfo(sender, sendResponse);
        } else if (request == "injectMe") {
            console.log(chrome.scripting.ScriptInjection);
            chrome.scripting.executeScript({
                target: { tabId: sender.tab.id, allFrames: true },
                function: executeOnVimeoFrame,
            });
        }
    });
} catch (error) {
    console.log(error)
}

function getMyInfo(sender, sendResponse) {
    sendResponse(sender);
}

function executeOnVimeoFrame() {
    try {
        chrome.runtime.sendMessage("getMyInfo", myInfo => {
            var url = myInfo.url
            var regX = /^(https?)[:]\/\/player[.]vimeo[.]com\/video/
            if (regX.test(url)) {
                //ACA TE QUEDASTE!!!
                console.log(myInfo);
                console.log(document);
            }
        });
    }
    catch (err) {
        console.log(err);
    }
}