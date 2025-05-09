import fs from "fs";
import path from "path";
import {ENVT} from "src/env";
import {LangProject} from "src/project";
import {LangProjectReport} from "src/report";

export function checkTsDeclaration(project: LangProject, report: LangProjectReport) {
    const name = project.name
    const postfix = "-assets"
    if(!name.endsWith(postfix)) return
    const plugin = name.substring(0, name.length - postfix.length)

    const pluginDir = path.join(ENVT.platformDir, plugin)
    if(!fs.existsSync(pluginDir)) return

    const tsDeclarationFile = path.join(ENVT.platformDir, plugin, "src/index.ts")
    const content = fs.readFileSync(tsDeclarationFile, "utf-8")

    for(const [key, value] of Object.entries(project.translations)) {
        const fragment = `${key}: '' as IntlString`
        if(content.indexOf(fragment) === -1) {
            report.error(`Missing declaration of "${key}: '' as IntlString" in the ${plugin}/src/index.ts file`)
        }
    }
}
