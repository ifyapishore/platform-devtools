import {ENVT} from "./env";
import {
    checkLanguageFiles,
    checkUnknownLanguageFiles,
    findMissingAndNotUsedTranslations,
    LangProjectReport,
    loadLangProjectsFileModel
} from "./lang-projects-model";

function main() {
    const start = new Date().getTime();
    console.info(`platform-devtool: i18n-check

Loads i18n projects from the ./src/lang-projects.json file and perform sanity check

    `)
    console.info("🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢");
    console.info(`Working...`);

    const projects = loadLangProjectsFileModel(ENVT.langProjectsFile);
    console.info(`Loaded ${projects.projects.length} i18n projects from the [${ENVT.langProjectsFile}] file:\n`);

    const reports = projects.projects.map((project) => {
        const report = new LangProjectReport(project)
        try {
            // startTask()
            checkLanguageFiles(project, report);
            checkUnknownLanguageFiles(project);
            const rep = findMissingAndNotUsedTranslations(project);
            if (rep) {
                // console.info("Missing or not used translations:");
                // console.info(JSON.stringify(rep));
            } else {
                // console.info("All translations are used");
            }
        } finally {
            // endTask()
        }
        return report;
    });

    reports.forEach((report) => {
      if(report.hasReport) {
          console.info("=====================================");
          console.info(report.info.path);
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
