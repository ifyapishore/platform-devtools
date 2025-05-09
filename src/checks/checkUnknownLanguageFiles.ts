import fs from "fs";
import path from "path";
import {ENVT} from "src/env";
import {LangProject} from "src/project";

export function checkUnknownLanguageFiles(project: LangProject) {
    const root = project.langDir;
    const langDir = path.join(root, "lang");

    const files = fs.readdirSync(langDir);
    files.forEach((file) => {
        const fileName = file.split(".")[0]
        const fileExt = file.split(".")[1]
        // skip non-json files
        if (fileExt !== "json") return;
        // skip auto.json
        if (fileName === "auto") return;

        if (!ENVT.supportedLanguages.includes(fileName)) {
            console.warn(`❌ - ${file} - Unknown language file`);
        }
    });
}
