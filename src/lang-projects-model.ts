import fs from "fs";
import path from "path";
import {ENVT} from "src/env";

export interface LangProjectInfo {
    path: string
}

export interface LangProjectsSnapshot {
    projects: LangProjectInfo[]
}

export function loadLangProjectsFileModel(file: string): LangProjectsSnapshot {
    const content = fs.readFileSync(file, 'utf-8');
    const data = JSON.parse(content);
    return data;
}

function checkLangFile(langDir: string, lang: string) {
    const langFile = `${langDir}/${lang}.json`;
    if(fs.existsSync(langFile)) {
        console.info(`✅ - ${lang}.json exists`);
    } else {
        console.warn(`❌ - ${lang}.json does not exist`);
    }
}
//
function checkAutoLangFile(langDir: string) {
    const langFile = `${langDir}/auto.json`;
    if(fs.existsSync(langFile)) {
        console.info(`⚠️ - auto.json exists - Some auto translation`);
    } else {
        console.warn(`✅ - auto.json does not exist - All translations are manual`);
    }
}

export function checkLanguageFiles(info: LangProjectInfo) {
    const root = path.join(ENVT.platformDir, info.path);
    const langDir = path.join(root, "lang");

    checkAutoLangFile(langDir);
    checkLangFile(langDir, "en");
}