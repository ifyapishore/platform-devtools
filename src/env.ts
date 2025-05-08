import path from 'path';

/**
 * Use .env later
 */
export const ENVT = {
    rootDir: "../platform",
    projectRoot: path.resolve(__dirname, '..'),
    skipDirs: ["node_modules", "dist", "build", "out", "lib", "test"]
}
