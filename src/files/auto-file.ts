import fs from "fs";
import {LangProjectsFile} from "src/files/lang-projects-file";

export interface AutoRule {
    id: string
    text: string
    description: string
    version: string
    prompts: Record<string, string>
}

export interface AutoFile {
    strings: AutoRule[]
}

export function loadAutoFile(file: string): AutoFile {
    const content = fs.readFileSync(file, 'utf-8');
    const data = JSON.parse(content);
    return data;
}

// export function saveAutoFile(file: string, data: AutoFile) {
//     fs.writeFileSync(file, JSON.stringify(data, null, 2));
// }