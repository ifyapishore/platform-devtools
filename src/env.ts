import path from 'path';

const platformDir = "../platform"
const projectRoot = path.resolve(__dirname, '..')
const skipDirs = [
    "node_modules",
    "dist", "build", "out", "lib", "test",
    ".rush", ".validate", "rush-logs",
    ".github", ".vscode",
    "tests", "qms-tests",
    ".idea", ".git"]
const langProjectsFileName = "src/lang-projects.json"
const langProjectsFile = path.join(projectRoot, langProjectsFileName)
const supportedLanguages = [
    'en',
    'cs',
    'de',
    'es',
    'fr', 
    'it', 
    'ja', 
    'pt', 
    'ru', 
    'zh'
]

/**
 * Use .env later
 */
export const ENVT = {
    platformDir: platformDir,
    projectRoot,
    skipDirs,
    langProjectsFile,
    supportedLanguages
}
