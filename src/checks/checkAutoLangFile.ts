import fs from "fs";
import {LangProjectReport} from "src/report";

export function checkAutoLangFile(langDir: string, report: LangProjectReport) {
    const langFile = `${langDir}/auto.json`;
    if (fs.existsSync(langFile)) {
        report.warn(`⚠️ - auto.json exists - Some auto translation`);
    }
}
