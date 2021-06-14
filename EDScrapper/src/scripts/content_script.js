try {
    window.addEventListener('load', (event) => {
        if (document.getElementById("vimeo-player") != undefined) {
            chrome.runtime.sendMessage("getMyInfo", tabId => {
                console.log(tabId);
            });
        }
    })
}
catch (err) {
    console.log(err);
}