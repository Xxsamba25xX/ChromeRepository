try {

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        // 2. A page requested user data, respond with a copy of `user`
        console.log(message);
        if (message === 'get-user-data') {
            sendResponse("user");
        }
    });
    console.log("listo.")
} catch (error) {
    console.log(error)
}