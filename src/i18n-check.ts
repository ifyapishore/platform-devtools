import fs from "fs";
import {ENVT} from "./env";
import {checkLanguageFiles, loadLangProjectsFileModel} from "./lang-projects-model";

function main() {
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
    });


    console.info("DONE!!!");
}

main()
