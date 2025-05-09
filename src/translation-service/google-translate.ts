// src/i18n/translate.ts
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY!;
const BASE_URL = 'https://translation.googleapis.com/language/translate/v2';
const CACHE_FILE = path.resolve(process.cwd(), 'google-translate-cache.json');

type Cache = Record<string, Record<string, string>>; // { text: { lang: translation } }

let cache: Cache = {};
if (fs.existsSync(CACHE_FILE)) {
    try {
        cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
    } catch {
        cache = {};
    }
}

function saveCache() {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
}

function getFromCache(text: string, lang: string): string | undefined {
    return cache[text]?.[lang];
}

function storeInCache(text: string, lang: string, translation: string) {
    if (!cache[text]) cache[text] = {};
    cache[text][lang] = translation;
    saveCache();
}

export async function translateText(text: string, targetLang: string): Promise<string> {
    const cached = getFromCache(text, targetLang);
    if (cached) return cached;

    const params = new URLSearchParams({
        key: API_KEY,
        q: text,
        target: targetLang,
        format: 'text',
    });

    const res = await fetch(`${BASE_URL}?${params.toString()}`);
    const data = await res.json();

    const translated = data.data.translations[0].translatedText;
    storeInCache(text, targetLang, translated);
    return translated;
}

export async function translateBatch(pairs: [string, string][], targetLang: string): Promise<Record<string, string>> {
    const result: Record<string, string> = {};
    const toTranslate: [string, string][] = [];

    for (const [id, text] of pairs) {
        const cached = getFromCache(text, targetLang);
        if (cached) {
            result[id] = cached;
        } else {
            toTranslate.push([id, text]);
        }
    }

    if (toTranslate.length > 0) {
        const texts = toTranslate.map(([_, text]) => text);
        const params = new URLSearchParams({
            key: API_KEY,
            target: targetLang,
            format: 'text'
        });
        texts.forEach(t => params.append('q', t));

        const res = await fetch(`${BASE_URL}?${params.toString()}`);
        const data = await res.json();
        if(!data.data?.translations) {
            debugger;
        }
        const translations = data.data.translations;

        toTranslate.forEach(([id, original], i) => {
            const translated = translations[i].translatedText;
            storeInCache(original, targetLang, translated);
            result[id] = translated;
        });
    }

    return result;
}

translateBatch([
    ["id1", "Hello, world!"],
    ["id2", "Conference room ${number}"]
], "es")