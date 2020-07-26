const {ncp} = require("ncp");
const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");

console.log("Start deploy...");

const staticDir = path.resolve(process.cwd(), "..", "backend", "static");

if (fs.existsSync(staticDir)) {
    fse.emptyDirSync(staticDir)
} else {
    fs.mkdirSync(staticDir);
}

ncp("build", "../backend/static", {}, function (err) {
    if (err) {
        console.error("Error:", err);
        process.exit(1);
        return;
    }
    console.log("Success");
})