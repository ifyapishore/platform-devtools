import {fixMissingLangFiles} from "src/fixes/fixMissingLangFiles";
import {fixSpainFiles} from "src/fixes/fixSpainFiles";
import {LangProject} from "src/project";
import {LangProjectReport} from "src/report";
import {printEndReport} from "src/util/printEndReport";
import {printReport} from "src/util/printReport";
import {ENVT} from "./env";
import {loadLangProjectsFileModel} from "./files/lang-projects-file";

const fixSpainFilesOn = true

function main() {
    const start = new Date().getTime();
    console.info(`platform-devtool: i18n-fixes
- Correct i18n filenames sp.json => es.json

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
            if (fixSpainFilesOn) {
                fixSpainFiles(project, report);
            }
            fixMissingLangFiles(project, report);
        } finally {
            // endTask()
        }
        return report;
    });

    reports.forEach(printReport);

    printEndReport(reports, start);
}

main()
