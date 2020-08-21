class SvgPath {
    constructor(path) {
        this.path = SvgPath.decodePath(path);
    }
    static getTypeChar(pathType) {
        switch (pathType) {
            case PathType.SmoothQuadratic: return "T";
            case PathType.SmoothQuadratic_Rel: return "t";
            case PathType.Unknown: return "?";
            case PathType.Close: return "Z";
            case PathType.Close_Rel: return "z";
            default: {
                const v = PathType[pathType];
                if (typeof v !== "string" || v.length < 1)
                    return "?";
                return v.indexOf("_Rel") > 0 ? v.substr(0, 1).toLowerCase() : v.substr(0, 1);
            }
        }
    }
    static decodePath(path) {
        const result = [];
        if (typeof path === "string") {
            let pos = 0;
            let currentElement = PathType.Unknown;
            let currentNumber = "";
            let currentNumbers = [];
            const pushElement = (mustEnd) => {
                if (currentNumber.length > 0) {
                    const val = parseFloat(currentNumber);
                    if (isNaN(val)) {
                        console.error("Path[" + pos + "]: invalid number: \"" + currentNumber + "\"");
                        return;
                    }
                    currentNumbers.push(val);
                    currentNumber = "";
                }
                switch (currentElement) {
                    case PathType.Move:
                    case PathType.Move_Rel:
                        {
                            if (currentNumbers.length === 2) {
                                const [x, y] = currentNumbers;
                                currentNumbers.length = 0;
                                const el = { type: currentElement, x, y };
                                result.push(el);
                            }
                        }
                        break;
                    case PathType.HorizontalLine:
                    case PathType.HorizontalLine_Rel:
                        {
                            if (currentNumbers.length === 1) {
                                const [x] = currentNumbers;
                                currentNumbers.length = 0;
                                const el = { type: currentElement, x };
                                result.push(el);
                            }
                        }
                        break;
                    case PathType.Cubic:
                    case PathType.Cubic_Rel:
                        {
                            if (currentNumbers.length === 6) {
                                const [cx1, cy1, cx2, cy2, x, y] = currentNumbers;
                                currentNumbers.length = 0;
                                const el = { type: currentElement, cx1, cy1, cx2, cy2, x, y };
                                result.push(el);
                            }
                        }
                        break;
                    case PathType.SmoothCubic:
                    case PathType.SmoothCubic_Rel:
                        {
                            if (currentNumbers.length === 4) {
                                const [cx2, cy2, x, y] = currentNumbers;
                                currentNumbers.length = 0;
                                const el = { type: currentElement, cx2, cy2, x, y };
                                result.push(el);
                            }
                        }
                        break;
                    case PathType.Unknown: break;
                    default: {
                        console.error("Path[" + pos + "]: unknown PathType: " + PathType[currentElement] + " (" + currentElement + ")");
                        return;
                    }
                }
                if (mustEnd && currentNumbers.length > 0) {
                    console.error("Path[" + pos + "]: incomplete values for " + currentElement + ": " + currentNumbers.join(", "));
                }
            };
            for (; pos < path.length;) {
                const c = path.charAt(pos);
                switch (c) {
                    case "M":
                    case "m":
                        {
                            pushElement(true);
                            pos++;
                            currentElement = c === "m" ? PathType.Move_Rel : PathType.Move;
                        }
                        break;
                    case "H":
                    case "h":
                        {
                            pushElement(true);
                            pos++;
                            currentElement = c === "h" ? PathType.HorizontalLine_Rel : PathType.HorizontalLine;
                        }
                        break;
                    case "C":
                    case "c":
                        {
                            pushElement(true);
                            pos++;
                            currentElement = c === "c" ? PathType.Cubic_Rel : PathType.Cubic;
                        }
                        break;
                    case "S":
                    case "s":
                        {
                            pushElement(true);
                            pos++;
                            currentElement = c === "s" ? PathType.SmoothCubic_Rel : PathType.SmoothCubic;
                        }
                        break;
                    case ",":
                    case "\r":
                    case "\n":
                    case "\t":
                    case " ":
                        {
                            pushElement();
                        }
                        break;
                    case "0":
                    case "1":
                    case "2":
                    case "3":
                    case "4":
                    case "5":
                    case "6":
                    case "7":
                    case "8":
                    case "9":
                        {
                            currentNumber += c;
                        }
                        break;
                    case ".":
                        {
                            if (currentNumber.indexOf(c) >= 0) {
                                console.error("Path[" + pos + "]: invalid value: \"" + currentNumber + c + "\"");
                                return result;
                            }
                            currentNumber += c;
                        }
                        break;
                    case "-":
                        {
                            if (currentNumber.indexOf(c) >= 0) {
                                pushElement();
                            }
                        }
                        break;
                    default: {
                        console.error("Path[" + pos + "]: unknown char: \"" + c + "\"");
                        return result;
                    }
                }
                pos++;
            }
            pushElement();
        }
        return result;
    }
}
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
        const lol = new SvgPath(defaultPaths);
        console.log(lol);
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
            try {
                prev.innerHTML =
                    "<svg width='" + size + "' viewBox='0 0 100 100' style='background:url(/img/test-a.png);background-repeat:no-repeat;background-size:" + size + "px;fill:#8cf8;stroke:#0488;stroke-width:.5px'>" +
                        "<path d='" + (known = txt).replace(/[&'"<>]/g, "") + "' />" +
                        "</svg>";
            }
            catch (e) {
                prev.innerHTML = "";
            }
        }, 100);
    }
}
document.addEventListener("DOMContentLoaded", SvgPaths.run);
//# sourceMappingURL=svg-paths.js.map