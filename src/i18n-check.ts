import {checkLangFiles} from "src/checks/checkLangFiles";
import {LangProject} from "src/project";
import {LangProjectReport} from "src/report";
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
            // project.load()
            // startTask()
            checkLangFiles(project, report);
            // checkUnknownLanguageFiles(project);
            // const rep = findMissingAndNotUsedTranslations(project);
            // if (rep) {
            //     // console.info("Missing or not used translations:");
            //     // console.info(JSON.stringify(rep));
            // } else {
            //     // console.info("All translations are used");
            // }
        } finally {
            // endTask()
        }
        return report;
    });

    reports.forEach((report) => {
      if(report.hasReport) {
          console.info("=====================================");
          console.info(report.project.path);
          report.errors.forEach((error) => {
              console.info(`❌ - ${error}`);
          });
          report.warnings.forEach((warning) => {
              console.info(`⚠️ - ${warning}`);
          });
      }
    })

    console.info(`

🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖

`);
    const end = new Date().getTime();
    console.info("DONE. Execution time: " + (end - start) + "ms");
}

main()
