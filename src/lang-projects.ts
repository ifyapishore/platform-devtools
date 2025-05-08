export interface LangProjectInfo {
    path: string
}

export interface LangProjectsSnapshot {
    projects: LangProjectInfo[]
}

export function loadLangProjectsFile(file: string): LangProjectsSnapshot {
    const data = JSON.parse(file);
    return data;
}
