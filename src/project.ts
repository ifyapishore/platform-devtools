import path from "path";
import {ENVT} from "src/env";

export interface LangFileSnapshot {
    strings: Record<string, string>
}

export interface LangProjectFile {
    path: string
}

export class LangProject {
    private path: string
    readonly root: string;

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
}

export interface LangProjectsFile {
    projects: LangProjectFile[]
}