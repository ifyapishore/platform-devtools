export interface AutoRule {
    id: string
    text: string
    description: string
    version: string
    prompts: Record<string, string>
}

export interface AutoFile {
    strings: AutoRule[]
}
