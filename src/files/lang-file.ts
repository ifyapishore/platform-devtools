import fs from "fs";
import {LangProject} from "src/project";

interface LangFileTranslation {
    id: string
    text: string
}

export class LangFile {
    readonly strings: LangFileTranslation[] = []
    private raw: LangFileRaw;
    readonly langId: string;

    constructor(langId: string, raw: LangFileRaw, project: LangProject) {
        this.langId = langId
        this.raw = raw;
        for (const [key, value] of Object.entries(raw.strings)) {
            this.strings.push({id: key, text: value});
        }
    }
}

export interface LangFileRaw {
    strings: Record<string, string>
}

export function loadLangFile(file: string, project: LangProject): LangFile {
    const content = fs.readFileSync(file, 'utf-8');
    const data = JSON.parse(content);
    const langId = file.split("/").pop()?.split(".")[0] || "unknown";
    return new LangFile(langId, data, project);
}

export function saveLangFile(file: string, data: LangFile) {
    const strings =Object.fromEntries(data.strings.map((s) => [s.id, s.text]))
    const raw: LangFileRaw = { strings }
    fs.writeFileSync(file, JSON.stringify(raw, null, 2));
}