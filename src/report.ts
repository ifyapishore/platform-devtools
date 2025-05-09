import {LangProject} from "./project";

export class LangProjectReport {
    readonly project: LangProject
    readonly errors: string[] = []
    readonly warnings: string[] = []
    readonly fixes: string[] = []

    get hasReport(): boolean {
        return this.errors.length > 0 || this.warnings.length > 0 || this.fixes.length > 0;
    }

    constructor(project: LangProject) {
        this.project = project;
    }

    warn(s: string) {
        this.warnings.push(s);
    }

    error(s: string) {
        this.errors.push(s);
    }

    fix(s: string) {
        this.fixes.push(s);
    }
}