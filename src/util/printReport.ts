import {LangProjectReport} from "src/report";

export function printReport(report: LangProjectReport) {
    if (report.hasReport) {
        console.info("=====================================");
        console.info(report.project.name);
        report.errors.forEach((message) => {
            console.info(`❌ - ${message}`);
        });
        report.warnings.forEach((message) => {
            console.info(`⚠️ - ${message}`);
        });
        report.fixes.forEach((message) => {
            console.info(`🧰️ - ${message}`);
        });
    }
}

