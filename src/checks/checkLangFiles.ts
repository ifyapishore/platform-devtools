import fs from "fs";
import {ENVT} from "src/env";
import {LangProject} from "src/project";
import {LangProjectReport} from "src/report";

export function checkLangFiles(project: LangProject, report: LangProjectReport) {
    const langs = ENVT.supportedLanguages;
    langs.forEach((lang) => {
        checkLangFile(project.langDir, lang, report);
    });
}

function checkLangFile(langDir: string, lang: string, report: LangProjectReport) {
    const langFile = `${langDir}/${lang}.json`;
    if (fs.existsSync(langFile)) {
        // console.info(`✅ - ${lang}.json exists`);
    } else {
        report.error(`${lang}.json is missing`);
    }
}
