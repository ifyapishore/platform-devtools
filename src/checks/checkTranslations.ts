import fs from "fs";
import path from "path";
import {ENVT} from "src/env";
import {LangFile} from "src/files/lang-file";
import {LangProject} from "src/project";
import {LangProjectReport} from "src/report";

export function checkProjectTranslations(project: LangProject, report: LangProjectReport) {
    const requiredIds = project.translationIds
    ENVT.supportedLanguages.forEach((langId) => {
        const lang = project.langs[langId];
        if(lang) {
            checkLangTranslations(requiredIds, lang, report);
        }
    })
}

function checkLangTranslations(requiredIds: Set<string>, lang: LangFile, report: LangProjectReport) {
    const existingIds = lang.translationIds;
    const missingIds = new Set<string>([...requiredIds].filter((id) => !existingIds.has(id)));
    const unknownIds = new Set<string>([...existingIds].filter((id) => !requiredIds.has(id)));

    if(missingIds.size > 0) {
        report.error(`Missing translations in ${lang.langId}: ${[...missingIds].join(", ")}`);
    }
    if(unknownIds.size > 0) {
        report.warn(`Unknown translations in ${lang.langId}: ${[...unknownIds].join(", ")}`);
    }
}