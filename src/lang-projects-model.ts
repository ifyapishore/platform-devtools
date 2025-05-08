import fs from "fs";

export interface LangProjectInfo {
    path: string
}

export interface LangProjectsSnapshot {
    projects: LangProjectInfo[]
}

export function loadLangProjectsFileModel(file: string): LangProjectsSnapshot {
    const content = fs.readFileSync(file, 'utf-8');
    const data = JSON.parse(content);
    return data;
}
