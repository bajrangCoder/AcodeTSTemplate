import plugin from "../plugin.json";
import { getCurrentFileType } from "./helpers";
import { snippets, Snippet } from "./snippets";
const { snippetManager } = ace.require("ace/snippets");
const { editor } = editorManager;

declare var extraSyntaxHighlightsInstalled: boolean;

class ReactSnippet {
    public baseUrl: string | undefined;
    private reactCompleter: any;

    constructor() {
        this.setVariables();
    }

    private setVariables() {
        const { variables } = snippetManager;
        variables.FILE_NAME = () => {
            const fileNameWithExtension = editorManager.activeFile.filename;
            const lastDotIndex = fileNameWithExtension.lastIndexOf(".");
            const fileNameWithoutExtension = fileNameWithExtension.slice(
                0,
                lastDotIndex
            );
            return fileNameWithoutExtension;
        };
    }

    private initializeAutocompletion(snippets: Snippet[] | []): void {
        this.reactCompleter = {
            getCompletions: (
                editor: AceAjax.Editor,
                session: any,
                pos: AceAjax.Position,
                prefix: string,
                callback: (err: any, results: AceAjax.Completion[]) => void
            ) => {
                const currentFileType = getCurrentFileType(session);

                const relevantSnippets = snippets.filter(s =>
                    s.fileTypes.includes(currentFileType)
                );

                if (relevantSnippets.length > 0) {
                    callback(
                        null,
                        relevantSnippets.map(snippet => {
                            const baseSnippet = {
                                caption: snippet.prefix,
                                snippet: snippet.snippet,
                                meta: snippet.type,
                                value: snippet.snippet,
                                type: "snippet",
                                docHTML: snippet.description || ""
                            };

                            return extraSyntaxHighlightsInstalled
                                ? { ...baseSnippet, icon: "icon react-snippet-icon" }
                                : baseSnippet;
                        })
                    );
                } else {
                    callback(null, []);
                }
            }
        };

        editor.completers.unshift(this.reactCompleter);
    }

    async init(
        $page: WCPage,
        cacheFile: any,
        cacheFileUrl: string
    ): Promise<void> {
        const styling = document.createElement("style");
        styling.innerHTML = `
        .ace_tooltip.ace_doc-tooltip {
            display: flex !important;
            background-color: var(--secondary-color);
            color: var(--secondary-text-color);
            max-width: 68%;
            white-space: pre-wrap;
        }
        `;
        document.head.append(styling);
        acode.addIcon('react-snippet-icon', this.baseUrl+"icon.png");
        this.initializeAutocompletion(snippets || []);
    }

    async destroy() {
        editor.completers.splice(
            editor.completers.indexOf(this.reactCompleter),
            1
        );
    }
}

if (window.acode) {
    const acodePlugin = new ReactSnippet();
    acode.setPluginInit(
        plugin.id,
        async (
            baseUrl: string,
            $page: WCPage,
            { cacheFileUrl, cacheFile }: any
        ) => {
            if (!baseUrl.endsWith("/")) {
                baseUrl += "/";
            }
            acodePlugin.baseUrl = baseUrl;
            await acodePlugin.init($page, cacheFile, cacheFileUrl);
        }
    );
    acode.setPluginUnmount(plugin.id, () => {
        acodePlugin.destroy();
    });
}
