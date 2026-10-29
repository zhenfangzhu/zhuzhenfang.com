(() => {
    function loadStatistics() {
        // Start in a later task so neither the library nor its JSONP request
        // can hold the page's load event open when the stats service is slow.
        window.setTimeout(() => {
            const script = document.createElement("script");
            script.async = true;
            script.src = "https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js";
            document.head.appendChild(script);
        }, 0);
    }

    if (document.readyState === "complete") {
        loadStatistics();
    } else {
        window.addEventListener("load", loadStatistics, { once: true });
    }
})();
