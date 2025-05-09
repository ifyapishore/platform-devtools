import fs from "fs";
import {LangProject} from "src/project";
import {translateBatch, translateText} from "src/translation-service/google-translate";

interface LangFileTranslation {
    id: string
    text: string
}

export class LangFile {
    readonly strings: LangFileTranslation[] = []
    private raw: LangFileRaw;
    readonly langId: string;
    private project: LangProject;

    constructor(langId: string, raw: LangFileRaw, project: LangProject) {
        this.project = project
        this.langId = langId
        this.raw = raw;
        for (const [key, value] of Object.entries(raw.string)) {
            this.strings.push({id: key, text: value});
        }
    }

    get translationIds(): Set<string> {
        const ids = new Set<string>();
        this.strings.forEach((s) => {
            ids.add(s.id);
        });
        return ids;
    };

    async translateMissingStrings(originals: Record<string, string>): Promise<string[]> {
        console.info(`Translating missing strings for [${this.langId}] in the ${this.project.name} project...`);
        const originalsToTranslate: [string, string][] =
            Object.entries(originals).map((s) => [s[0], s[1]]);

        for(const [id, text] of Object.entries(originals)) {
            const res = await translateText(text, this.langId)
            this.strings.push({id, text: res})
        }
        // Check if the original string is missing in the current language file
        // translate it using
        // export async function translateBatch(pairs: [string, string][], targetLang: string): Promise<Record<string, string>>
        return [];
    }

    save() {
        const arr: [string, string][] = this.strings.map(src => [src.id, src.text])

        const orderedObj = Object.fromEntries(arr);
        const json: LangFileRaw = {
            string: orderedObj
        }
        const raw = JSON.stringify(json, null, 2);
        fs.writeFileSync(this.project.getLangFile(this.langId), raw);
    }
}

export interface LangFileRaw {
    string: Record<string, string>
}

export function loadLangFile(file: string, project: LangProject): LangFile {
    const content = fs.readFileSync(file, 'utf-8');
    const data = JSON.parse(content);
    const langId = file.split("/").pop()?.split(".")[0] || "unknown";
    return new LangFile(langId, data, project);
}

export function saveLangFile(file: string, data: LangFile) {
    const strings =Object.fromEntries(data.strings.map((s) => [s.id, s.text]))
    const raw: LangFileRaw = { "string": strings }
    fs.writeFileSync(file, JSON.stringify(raw, null, 2));
}