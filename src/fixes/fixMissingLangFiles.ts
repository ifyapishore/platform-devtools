import fs from "fs";
import {ENVT} from "src/env";
import {LangProject} from "src/project";
import {LangProjectReport} from "src/report";

export async function fixMissingLangFiles(project: LangProject, report: LangProjectReport) {
    const langs = ENVT.supportedLanguages;

    const originals = project.originals;
    for (const lang of langs) {
        await fixMissingLangFile(project, lang, originals, report);
    }
}

async function fixMissingLangFile(project: LangProject, lang: string, originals: Record<string, string>, report: LangProjectReport) {
    const langFilePath = project.getLangFile(lang);
    if (fs.existsSync(langFilePath)) return;

    report.fix(`Creating missing [${langFilePath}] file in the project ${project.name}.`);

    const langFile = project.createLangFile(lang);

    const ids: string[] = await langFile.translateMissingStrings(originals);
}

