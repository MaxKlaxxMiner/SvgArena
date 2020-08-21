var PathType;
(function (PathType) {
    PathType[PathType["Unknown"] = 0] = "Unknown";
    PathType[PathType["Move"] = 1] = "Move";
    PathType[PathType["Move_Rel"] = 2] = "Move_Rel";
    PathType[PathType["Line"] = 3] = "Line";
    PathType[PathType["Line_Rel"] = 4] = "Line_Rel";
    PathType[PathType["HorizontalLine"] = 5] = "HorizontalLine";
    PathType[PathType["HorizontalLine_Rel"] = 6] = "HorizontalLine_Rel";
    PathType[PathType["VerticalLine"] = 7] = "VerticalLine";
    PathType[PathType["VerticalLine_Rel"] = 8] = "VerticalLine_Rel";
    PathType[PathType["Cubic"] = 9] = "Cubic";
    PathType[PathType["Cubic_Rel"] = 10] = "Cubic_Rel";
    PathType[PathType["SmoothCubic"] = 11] = "SmoothCubic";
    PathType[PathType["SmoothCubic_Rel"] = 12] = "SmoothCubic_Rel";
    PathType[PathType["Quadratic"] = 13] = "Quadratic";
    PathType[PathType["Quadratic_Rel"] = 14] = "Quadratic_Rel";
    PathType[PathType["SmoothQuadratic"] = 15] = "SmoothQuadratic";
    PathType[PathType["SmoothQuadratic_Rel"] = 16] = "SmoothQuadratic_Rel";
    PathType[PathType["Arc"] = 17] = "Arc";
    PathType[PathType["Arc_Rel"] = 18] = "Arc_Rel";
    PathType[PathType["Close"] = 19] = "Close";
    PathType[PathType["Close_Rel"] = 20] = "Close_Rel";
})(PathType || (PathType = {}));
//# sourceMappingURL=interfaces.js.map