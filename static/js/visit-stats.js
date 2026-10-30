(() => {
    const status = document.querySelector("[data-visit-stats-status]");
    let failStatistics = () => {};

    if (status) {
        const values = ["site_pv", "site_uv"].map((name) =>
            document.getElementById(`busuanzi_value_${name}`)
        );
        let complete = false;
        let timeout;
        failStatistics = () => {
            if (complete) return;
            status.querySelector("[data-visit-stats-loading]").hidden = true;
            status.querySelector("[data-visit-stats-error]").hidden = false;
        };

        // Keep observing after a timeout: a late response should still replace
        // the fallback with the real counts.
        const observer = new MutationObserver(() => {
            if (!values.every((value) => value && /^\d+$/.test(value.textContent.trim()))) return;
            complete = true;
            window.clearTimeout(timeout);
            status.hidden = true;
            observer.disconnect();
        });
        values.forEach((value) => {
            if (value) observer.observe(value, { childList: true, characterData: true, subtree: true });
        });
        timeout = window.setTimeout(failStatistics, 8000);
    }

    function loadStatistics() {
        // Start in a later task so neither the library nor its JSONP request
        // can hold the page's load event open when the stats service is slow.
        window.setTimeout(() => {
            const script = document.createElement("script");
            script.async = true;
            script.src = "https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js";
            script.onerror = failStatistics;
            document.head.appendChild(script);
        }, 0);
    }

    if (document.readyState === "complete") {
        loadStatistics();
    } else {
        window.addEventListener("load", loadStatistics, { once: true });
    }
})();
