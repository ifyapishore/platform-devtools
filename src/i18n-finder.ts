import fs from 'fs';
import path from 'path';
import {saveLangProjectsFileModel} from "./files/lang-projects-file";
import {LangProjectsFile} from "./project";
import {ENVT} from "./env";

/**
 * Recursively iterate projects structure and return folders with i18n files
 * Folder considered as i18 root if and only if:
 * - name ends with "-assets"
 * - there is a subfolder with "lang" name
 * - "lang" subfolder contains "en.json" file
 * @param dir
 * @param out
 */
function findLangProjects(dir: string, out: string[]) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            if (ENVT.skipDirs.includes(file)) {
                continue;
            }

            if (file.endsWith("-assets")) {
                const langDir = path.join(fullPath, "lang");
                if (fs.existsSync(langDir) && fs.statSync(langDir).isDirectory()) {
                    const enFile = path.join(langDir, "en.json");
                    if (fs.existsSync(enFile)) {
                        // change to relative path
                        const relativePath = path.relative(ENVT.platformDir, fullPath);
                        out.push(relativePath);
                    }
                }
            }
            findLangProjects(fullPath, out);
        }
    }
}

/**
 * Save lang projects to file
 * Use LangProjectsSnapshot as json format
 * @param file file to store
 * @param out - relative paths to lang projects
 */
function storeLangProjects(file: string, out: string[]) {
    const data: LangProjectsFile = {
        projects: out.map((project) => ({path: project}))
    };
    saveLangProjectsFileModel(file, data);
}

function main() {
    const start = new Date().getTime();
    console.info(`platform-devtool: i18n-finder

Finds i18n projects in the ../platform repository and store paths to file
./src/lang-projects.json

Platform project is big and this step allows to significantly reduce dev time during i18n tasks. 

BEST PRACTICES:
- This script should be run from the root of the repository.
- Push [./src/lang-projects.json] changes to platform-devtool repository to save your team mates time.

    `)
    console.info("🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢");
    console.info(`Working... Around 3-15 seconds...`);

    const projects: string[] = [];
    findLangProjects(ENVT.platformDir, projects);
    console.info("🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢");
    console.info(`Found ${projects.length} i18n projects:\n`);
    projects.forEach((project) => {
        console.info(project);
    });
    console.info("🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢");
    console.info("Storing lang projects to the [src/lang-projects.json] file...");
    storeLangProjects(ENVT.langProjectsFile, projects);
    console.info("[src/lang-projects.json] file is modified");

    console.info(`

🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖

`);
    const end = new Date().getTime();
    console.info("DONE. Execution time: " + (end - start) + "ms");
}

main()
