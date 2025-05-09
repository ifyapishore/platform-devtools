import fs from "fs";
import {LangProject} from "src/project";
import {LangProjectReport} from "src/report";

export function fixSpainFiles(project: LangProject, report: LangProjectReport) {
    const esFile = project.getLangFile("es");
    const esFileExists = fs.existsSync(esFile);
    const spFile = project.getLangFile("sp");
    const spFileExists = fs.existsSync(spFile);

    // if(project.name.includes("github")) {
    //     debugger
    // }
    if (!spFileExists) return
    if (esFileExists) {
        report.error(`Both [${spFile}] and [${esFile}] files exist. Removing [${spFile}] file manually.`);
        return;
    }
    report.fix(`Renaming [${spFile}] to [${esFile}]`);
}