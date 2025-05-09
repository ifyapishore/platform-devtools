import fs from "fs";
import path from "path";
import {ENVT} from "src/env";
import {LangFile, loadLangFile} from "src/files/lang-file";

export interface LangFileSnapshot {
    strings: Record<string, string>
}

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
}

export interface LangProjectsFile {
    projects: LangProjectFile[]
}