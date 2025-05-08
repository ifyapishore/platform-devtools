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
- Check if the translation is missing in the lang/auto.json file.

- Do not touch translations without "<⚠️>" char sequence.
- Do not change the original strings.
- Do not change the order of JSON keys.

