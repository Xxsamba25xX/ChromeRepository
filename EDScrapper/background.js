try {

    chrome.runtime.onConnect.addListener(function (port) {
        if (port.name !== "devtools") return;
        port.onMessage.addListener(function (msg) {
            // Received message from devtools. Do something:
            console.log(msg);
        });
    })
} catch (error) {
    console.log(error)
}