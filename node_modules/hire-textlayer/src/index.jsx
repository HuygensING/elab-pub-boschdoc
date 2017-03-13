import TextLayer from "./text-layer";
let fs = require("fs");

import insertCss from "insert-css";
let css = fs.readFileSync(__dirname + "/index.css");
insertCss(css, {prepend: true});

export default TextLayer;