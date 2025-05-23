# platform-devtools
Set of tools to help with development of platform project.

## i18n workflow
During UX experiments and work on i18n issue there are some repetitive tasks that can be automated.

- Differentiate automatic and manual translations.
- Give a visual representation of the translation status in the UI (simplify work with translation).
- Max width of translation strings in the UI. In different languages the direct/A.I. translation can be longer than the original string. This can lead to overflow of the UI elements. The tool will help to find such strings and provide a way to fix them.
- Give a foundation for the i18n process.

**IMPORTANT:**
- Automatically translated strings are post fixed with "<⚠️>" char sequence. 
- It is unlikely that this sequence will be used in the original strings. So it is safe to use it for marks automatic translations.
- If you have a doubts - check platform source code for "<⚠️>" char sequence.
- If you need "<⚠️>" char sequence in te translations - it is subject for discussion.

### i18n-finder
Look up for the i18n subprojects/plugins in the platform project.

Platform project is big and this step allows to significantly reduce dev time during i18n tasks.

Check the project structure and find the i18n subprojects/plugins.

Folder considered as i18 root if and only if:
- folder name ends with "-assets"
- there is a subfolder with "lang" name
- "lang" subfolder contains "en.json" file (minimal requirement)

Execution:
```bash
npm run i18n-finder
```

RESULT NOTES:
- Results are stored in the "./src/lang-projects.json" file.
- Push ```./src/lang-projects.json]``` changes to platform-devtool repository to save your team's mates time.

### i18n-check
This tool uses the results of the i18n-finder tool to check the translation status of the i18n subprojects/plugins in the platform project.

For each i18n subproject/plugin the tool will:
- Use lang/auto.json file as a source of automatic translations.
- Check if all languages are supported by platform subproject/plugin.
- Use auto.json and en.json files as the source of text keys.
- Check if the translation is missing in the {lang}.json file.
- Check if the UNKNOWN translation is found in the {lang}.json file.
- Check if the translation is automatic or manual.

Execution:
```bash
npm run i18n-check
```

### i18n-fixes (in progress)

Fix some common issues

#### Rename sp.json to es.json

SAMPLE RESULT:

![Sample](./assets/fixRenameSample.png)

### i18n-update (in progress)

Update all lang files according auto.json file content.

STEP #1: Check if translation service is required and update auto.lock:
- Read last translation from the auto.lock JSON file
- Use translate service only if the original english string in the auto.json is different/missing in the auto.lock file. 
- Translate only missing/changed strings in auto.json.
- Store new translations in the auto.lock file.

STEP #2: Update all lang files:
- Use the auto.lock file as a source of translations.
- Update all lang files with the translations from the auto.lock file if {lang}.json file has entry with postfix  "<⚠️>".
- Keep the original translations in the {lang}.json file.
- Keep the original translations order in the {lang}.json file.
- Do not remove unused translations from the {lang}.json file.

### i18n-cleanup (in progress)

Cleanup the i18n subprojects/plugins in the platform project.

- Go thought the i18n-update process
- Remove unused translations from the {lang}.json files.

### i18n-export (in progress)

Extract language files and upload as google spreadsheet.

Translation verification workflow:
- Use i18n-export tool to extract language files from the platform project.
- Native speakers manually validate translations in the google spreadsheet (with comments from auto.json)
- Use i18n-import tool to import translations from the google spreadsheet to the platform project.
- Check build correctness.
- Merge PR

### i18n-import (in progress)

Import translations from the google spreadsheet to the platform project.




