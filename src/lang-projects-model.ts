import fs from "fs";
import path from "path";
import {ENVT} from "src/env";


export interface LangProjectInfo {
    path: string
}

export interface LangProjectsSnapshot {
    projects: LangProjectInfo[]
}

export class LangProjectReport {
    readonly info: LangProjectInfo
    readonly errors: string[] = []
    readonly warnings: string[] = []

    get hasReport(): boolean {
        return this.errors.length > 0 || this.warnings.length > 0;
    }

    constructor(info: LangProjectInfo) {
        this.info = info;
    }

    warn(s: string) {
        this.warnings.push(s);
    }

    error(s: string) {
        this.errors.push(s);
    }
}

export type LangVarsError = "ok" | "missing" | "not-used" | "not-found" | "error";

export interface LangVarsErrorReport {
    vars: Record<string, LangVarsError>
}

export function loadLangProjectsFileModel(file: string): LangProjectsSnapshot {
    const content = fs.readFileSync(file, 'utf-8');
    const data = JSON.parse(content);
    return data;
}

function checkLangFiles(langDir: string, report: LangProjectReport) {
    const langs = ENVT.supportedLanguages;
    langs.forEach((lang) => {
        checkLangFile(langDir, lang, report);
    });
}

function checkLangFile(langDir: string, lang: string, report: LangProjectReport) {
    const langFile = `${langDir}/${lang}.json`;
    if (fs.existsSync(langFile)) {
        // console.info(`✅ - ${lang}.json exists`);
    } else {
        report.error(`${lang}.json is missing`);
    }
}

//
function checkAutoLangFile(langDir: string, report: LangProjectReport) {
    const langFile = `${langDir}/auto.json`;
    if (fs.existsSync(langFile)) {
        report.warn(`⚠️ - auto.json exists - Some auto translation`);
    }
}

export function checkLanguageFiles(info: LangProjectInfo, report: LangProjectReport) {
    const root = path.join(ENVT.platformDir, info.path);
    const langDir = path.join(root, "lang");

    checkAutoLangFile(langDir, report);
    checkLangFiles(langDir, report);
}

export function checkUnknownLanguageFiles(info: LangProjectInfo) {
    const root = path.join(ENVT.platformDir, info.path);
    const langDir = path.join(root, "lang");

    const files = fs.readdirSync(langDir);
    files.forEach((file) => {
        const fileName = file.split(".")[0]
        const fileExt = file.split(".")[1]
        // skip non-json files
        if (fileExt !== "json") return;
        // skip auto.json
        if (fileName === "auto") return;

        if (!ENVT.supportedLanguages.includes(fileName)) {
            console.warn(`❌ - ${file} - Unknown language file`);
        }
    });
}

export function findMissingAndNotUsedTranslations(info: LangProjectInfo): LangVarsErrorReport {
    const root = path.join(ENVT.platformDir, info.path);
    const langDir = path.join(root, "lang");
    const files = fs.readdirSync(langDir);
    const report: LangVarsErrorReport = {
        vars: {}
    }
    files.forEach((file) => {
        const fileName = file.split(".")[0]
        const fileExt = file.split(".")[1]
        // skip non-json files
        if (fileExt !== "json") return;
        // skip auto.json
        if (fileName === "auto") return;

        if (!ENVT.supportedLanguages.includes(fileName)) {
            report.vars[file] = "not-found";
        }
    });
    return report;
}