import {checkLangFiles} from "src/checks/checkLangFiles";
import {checkProjectTranslations} from "src/checks/checkTranslations";
import {checkTsDeclaration} from "src/checks/checkTsDeclaration";
import {checkUnknownLanguageFiles} from "src/checks/checkUnknownLanguageFiles";
import {LangProject} from "src/project";
import {LangProjectReport} from "src/report";
import {printEndReport} from "src/util/printEndReport";
import {printReport} from "src/util/printReport";
import {ENVT} from "./env";
import { loadLangProjectsFileModel } from "./files/lang-projects-file";

function main() {
    const start = new Date().getTime();
    console.info(`platform-devtool: i18n-check

Loads i18n projects from the ./src/lang-projects.json file and perform sanity check

    `)
    console.info("🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢");
    console.info(`Working...`);

    const projects = loadLangProjectsFileModel(ENVT.langProjectsFile);
    console.info(`Loaded ${projects.projects.length} i18n projects from the [${ENVT.langProjectsFile}] file:\n`);

    const reports = projects.projects.map((ref) => {
        const path = ref.path;
        const project = new LangProject(path)
        const report = new LangProjectReport(project)
        try {
            project.load()
            // checkTsDeclaration(project, report);
            checkLangFiles(project, report);
            checkUnknownLanguageFiles(project, report);
            checkProjectTranslations(project, report);
        } finally {
            // endTask()
        }
        return report;
    });

    reports.forEach(printReport);

    printEndReport(reports, start);
}

main()
