import fs from "fs";
import {ENVT} from "./env";
import {checkLanguageFiles, checkUnknownLanguageFiles, loadLangProjectsFileModel} from "./lang-projects-model";

function main() {
    const start = new Date().getTime();
    console.info(`platform-devtool: i18n-check

Loads i18n projects from the ./src/lang-projects.json file and perform sanity check

    `)
    console.info("🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢");
    console.info(`Working...`);

    const projects = loadLangProjectsFileModel(ENVT.langProjectsFile);
    console.info(`Loaded ${projects.projects.length} i18n projects from the [${ENVT.langProjectsFile}] file:\n`);

    projects.projects.forEach((project) => {
        console.info("=====================================");
        console.info(project.path);
        checkLanguageFiles(project);
        checkUnknownLanguageFiles(project);
    });

    console.info(`

🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖

`);
    const end = new Date().getTime();
    console.info("DONE. Execution time: " + (end - start) + "ms");
}

main()
