import fs from "fs";
import {LangProject} from "src/project";

export interface LangLockFileRaw {
    string: Record<string, string>
}

export function loadLangLockFile(project: LangProject, langId: string): LangLockFileRaw {
    const filePath = project.getLangFile(langId);
    const content = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(content);
    return data as LangLockFileRaw;
}

export function saveLangLockFile(project: LangProject, langId: string, raw: LangLockFileRaw) {
    const file = project.getLangLockFile(langId);
    fs.writeFileSync(file, JSON.stringify(raw, null, 2));
}