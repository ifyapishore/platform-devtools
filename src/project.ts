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

export class LangProject {
    private path: string
    readonly root: string;
    readonly langs: Record<string, LangFile> = {};

    get name(): string {
        return this.path
    }

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
            }
        })

    }
}

export interface LangProjectsFile {
    projects: LangProjectFile[]
}