try {
    window.addEventListener('load', (event) => {
        console.log(document.getElementById("vimeo-player").innerHTML)
        console.log(document.getElementsByTagName("iframe").length)
    })

}
catch (err) {
    console.log(err);
}