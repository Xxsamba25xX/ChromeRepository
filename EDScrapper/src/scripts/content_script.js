try {
    chrome.runtime.sendMessage('get-user-data', (response) => {
        // 3. Got an asynchronous response with the data from the background
        console.log('received user data', response);
        initializeUI(response);
    });
    // var s = document.createElement('script');
    // s.src = chrome.extension.getURL('src/scripts/injected.js');
    // s.onload = function () {
    //     this.remove();
    // };
    // (document.head || document.documentElement).appendChild(s);
}
catch (err) {
    console.log(err);
}