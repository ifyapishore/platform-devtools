import fs from "fs";

export interface LangProjectRef {
    path: string
}

export interface LangProjectsFile {
    projects: LangProjectRef[]
}

export function loadLangProjectsFileModel(file: string): LangProjectsFile {
    const content = fs.readFileSync(file, 'utf-8');
    const data = JSON.parse(content);
    return data;
}

export function saveLangProjectsFileModel(file: string, data: LangProjectsFile) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}