import path from 'path';

const platformDir = "../platform"
const projectRoot = path.resolve(__dirname, '..')
const skipDirs = ["node_modules", "dist", "build", "out", "lib", "test"]
const langProjectsFileName = "src/lang-projects.json"
const langProjectsFile = path.join(projectRoot, langProjectsFileName)
/**
 * Use .env later
 */
export const ENVT = {
    platformDir: platformDir,
    projectRoot,
    skipDirs,
    langProjectsFile
}
