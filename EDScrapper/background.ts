var chrome: any;

try {
    var asad: asda;
    asad.nn = "asda";
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        var response = [];
        if (request == "getMyInfo") {
            response.push(getMyInfo(sender));
        }
        if (request == "injectMe") {
            response.push(injectMe(sender));
        }
        sendResponse(response);
    });
} catch (error) {
    console.log(error)
}

function getMyInfo(sender) {
    return sender;
}

function injectMe(sender) {
    try {
        chrome.scripting.executeScript({
            target: { tabId: sender.tab.id, allFrames: true },
            function: executeOnVimeoFrame,
        });
        return null;
    } catch (err) {
        return err;
    }
}


function executeOnVimeoFrame() {
    try {
        chrome.runtime.sendMessage({}, myInfo => {
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



class asda {
    nn: string;
}