import fs from "fs";
import {ENVT} from "./env";
import {loadLangProjectsFileModel} from "./lang-projects-model";

function main() {
    console.info(`platform-devtool: i18n-check

Loads i18n projects from the ./src/lang-projects.json file and perform sanity check

    `)
    console.info("🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢");
    console.info(`Working...`);

    const content = fs.readFileSync(ENVT.langProjectsFile, 'utf-8');
    const projects = JSON.parse(content);
    console.log(loadLangProjectsFileModel);
    loadLangProjectsFileModel(ENVT.langProjectsFile);
    console.info(`Loaded ${projects.projects.length} i18n projects from the [${ENVT.langProjectsFile}] file:\n`);

    console.info("🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢");
    console.info("DONE!!!");
}

main()
