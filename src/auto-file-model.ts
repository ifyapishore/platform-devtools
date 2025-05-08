export interface AutoRule {
    text: string
}

export interface AutoFile {
    texts: AutoRule[]
}

function loadAutoFile(file: string): AutoFile {
    const data = JSON.parse(file);
    return data;
}