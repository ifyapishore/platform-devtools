import fs from 'fs';
import path from 'path';

const rootDir = "../platform"

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

    for(const file of files) {
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
                        out.push(fullPath);
                    }
                }
            }
            findLangProjects(fullPath, out);
        }
    }
}

function main() {
    console.info("i18n")
    const projects: string[] = [];
    findLangProjects(rootDir, projects);
    console.info("Found i18n projects:");
    projects.forEach((project) => {
        console.info(project);
    });
}

main()
