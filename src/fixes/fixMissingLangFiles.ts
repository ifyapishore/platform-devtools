import fs from "fs";
import {ENVT} from "src/env";
import {LangProject} from "src/project";
import {LangProjectReport} from "src/report";

export function fixMissingLangFiles(project: LangProject, report: LangProjectReport) {
    const langs = ENVT.supportedLanguages;
    langs.forEach((lang) => {
        fixMissingLangFile(project, lang, report);
    });
}

function fixMissingLangFile(project: LangProject, lang: string, report: LangProjectReport) {
    const langFile = project.getLangFile(lang);
    if(fs.existsSync(langFile)) return;

    report.fix(`Creating missing [${langFile}] file in the project ${project.name}.`);
}

