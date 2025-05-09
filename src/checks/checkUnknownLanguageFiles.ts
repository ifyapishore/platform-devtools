import fs from "fs";
import path from "path";
import {ENVT} from "src/env";
import {LangProject} from "src/project";
import {LangProjectReport} from "src/report";

export function checkUnknownLanguageFiles(project: LangProject, report: LangProjectReport) {
    const files = fs.readdirSync(project.langDir);
    files.forEach((file) => {
        const fileName = file.split(".")[0]
        const fileExt = file.split(".")[1]
        // skip non-json files
        if (fileExt !== "json") return;
        // skip auto.json
        if (fileName === "auto") return;

        if (!ENVT.supportedLanguages.includes(fileName)) {
            report.error(`${file} - Unknown language file`);
        }
    });
}
