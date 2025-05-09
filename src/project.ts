import fs from "fs";
import path from "path";
import {ENVT} from "src/env";
import {LangFile, LangFileRaw, loadLangFile} from "src/files/lang-file";

export interface LangProjectFile {
    path: string
}

export class Translation {
    auto: boolean
    readonly id: string;

    constructor(id: string) {
        this.id = id;
        this.auto = false;
    }
}

export class LangProject {
    private path: string
    readonly root: string;
    readonly langs: Record<string, LangFile> = {};
    readonly translations: Record<string, Translation> = {};

    get name(): string {
        return this.path
    }

    get translationIds(): Set<string> {
        const ids = new Set<string>();
        Object.values(this.translations).forEach((s) => {
            ids.add(s.id);
        });
        return ids;
    };

    constructor(dir: string) {
        this.path = dir;
        this.root = path.join(ENVT.platformDir, dir)
    }

    get langDir(): string {
        return path.join(this.root, "lang");
    }

    load() {
        ENVT.supportedLanguages.forEach((lang) => {
            const langFile = path.join(this.langDir, `${lang}.json`);
            if (fs.existsSync(langFile)) {
                const file = loadLangFile(langFile, this);
                this.langs[lang] = file
                if (lang === "en") {
                    file.strings.forEach((s) => {
                        this.translations[s.id] = new Translation(s.id)
                    })
                }
            }
        })
    }

    getLangFile(langId: string) {
        return path.join(this.langDir, `${langId}.json`);
    }

    createLangFile(langId: string) {
        if(this.langs[langId]) throw new Error(`Lang file [${langId}] already exists.`);
        const data: LangFileRaw = { string: {} };
        return new LangFile(langId, data, this);
    }

    get originals(): Record<string, string> {
        const enFile = this.langs["en"];
        if(!enFile) throw new Error(`Lang file [en] not found.`);

        return Object.fromEntries(enFile.strings.map((s) => [s.id, s.text]))
    }
}

export interface LangProjectsFile {
    projects: LangProjectFile[]
}