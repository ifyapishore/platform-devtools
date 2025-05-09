import {LangProjectReport} from "src/report";

export function printEndReport(reports: LangProjectReport[], start: number) {

    console.info(`

🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖🥖

`);
    const errorsCounts = reports.reduce((acc, report) => {
        acc += report.errors.length;
        return acc;
    }, 0)

    const warningsCounts = reports.reduce((acc, report) => {
        acc += report.warnings.length;
        return acc;
    }, 0)

    const fixesCounts = reports.reduce((acc, report) => {
        acc += report.fixes.length;
        return acc;
    }, 0)

    const end = new Date().getTime();
    console.info("DONE. Execution time: " + (end - start) + "ms");
    if (errorsCounts > 0) {
        console.info(`ERRORS: ${errorsCounts}`);
    }
    if (warningsCounts > 0) {
        console.info(`WARNINGS: ${warningsCounts}`);
    }
    if (fixesCounts > 0) {
        console.info(`FIXES: ${fixesCounts}`);
    }
}