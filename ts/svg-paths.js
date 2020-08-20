class SvgPaths {
    static run() {
        const defaultPaths = "M  30 5\r\n" +
            "H  70\r\n" +
            "C  90  5  90  45   70  45\r\n" +
            "C  50 45  50  15   30  35\r\n" +
            "C  10 55  20   5   30   5\r\n" +
            "\r\n" +
            "M  30 55\r\n" +
            "h  40\r\n" +
            "c  20  0  20  40    0  40\r\n" +
            "s        -20 -30  -40 -10\r\n" +
            "         -10 -30    0 -30\r\n" +
            "\r\n";
        const el = document.getElementById("txt");
        if (!el)
            return;
        el.innerHTML = defaultPaths;
        const prev = document.getElementById("preview");
        if (!prev)
            return;
        var known = "";
        setInterval(() => {
            const txt = el.value;
            if (txt === known)
                return;
            const size = 400;
            prev.innerHTML =
                "<svg width='" + size + "' viewBox='0 0 100 100' style='background:url(/img/test-a.png);background-repeat:no-repeat;background-size:" + size + "px;fill:#8cf8;stroke:#0488;stroke-width:.5px'>" +
                    "<path d='" + (known = txt).replace(/[&'"<>]/g, "") + "' />" +
                    "</svg>";
        }, 100);
    }
}
document.addEventListener("DOMContentLoaded", SvgPaths.run);
//# sourceMappingURL=svg-paths.js.map