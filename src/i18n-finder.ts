import fs from 'fs';
import path from 'path';
import {LangProjectsSnapshot} from "src/lang-projects";

const rootDir = "../platform"
const projectRoot = path.resolve(__dirname, '..');
const skipDirs = ["node_modules", "dist", "build", "out", "lib", "test"];

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
            if (skipDirs.includes(file)) {
                continue;
            }

            if (file.endsWith("-assets")) {
                const langDir = path.join(fullPath, "lang");
                if (fs.existsSync(langDir) && fs.statSync(langDir).isDirectory()) {
                    const enFile = path.join(langDir, "en.json");
                    if (fs.existsSync(enFile)) {
                        // change to relative path
                        const relativePath = path.relative(rootDir, fullPath);
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
    const data: LangProjectsSnapshot = {
        projects: out.map((project) => ({path: project}))
    };
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function main() {
    console.info(`platform-devtool: i18n-finder

Finds i18n projects in the ../platform repository and store paths to file
./src/lang-projects.json

Platform project is big and this step allows to reduce dev time during i18n jobs. 

This script should be run from the root of the repository.

    `)

    const projects: string[] = [];
    findLangProjects(rootDir, projects);
    console.info("Found i18n projects:");
    projects.forEach((project) => {
        console.info(project);
    });
    console.info("Storing lang projects to file...");
    storeLangProjects(path.join(projectRoot, "src/lang-projects.json"), projects);
}

main()
