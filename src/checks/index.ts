import fs from "fs";
import path from "path";
import {ENVT} from "src/env";
import {LangProject} from "src/project";


export function findMissingAndNotUsedTranslations(info: LangProjectInfo, report: LangProjectReport) {
    const root = path.join(ENVT.platformDir, info.path);
    const langDir = path.join(root, "lang");
    const files = fs.readdirSync(langDir);

    ENVT.supportedLanguages.forEach((lang) => {

    })

    files.forEach((file) => {
        const fileName = file.split(".")[0]
        const fileExt = file.split(".")[1]
        // skip non-json files
        if (fileExt !== "json") return;
        // skip auto.json
        if (fileName === "auto") return;

        if (!ENVT.supportedLanguages.includes(fileName)) {
            report.vars[file] = "not-found";
        }
    });
    return report;
}