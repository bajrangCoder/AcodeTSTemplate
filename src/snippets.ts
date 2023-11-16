export interface Snippet {
    prefix: string;
    snippet: string;
    type: string;
    description?: string;
    fileTypes: string[];
}

export const snippets: Snippet[] = [
    // components snippets
    {
        prefix: "rcc",
        snippet:
            "import React, { Component } from 'react'\n\nexport default class ${FILE_NAME} extends Component {\n  render() {\n    return (\n    <div>$1</div>\n  )\n}\n",
        type: "Components",
        description: 'Creates a <strong>React component</strong> class with ES7 module system',
        fileTypes: ["jsx", "tsx"]
    },
    // hooks snippets 
    {
        prefix: "useEffectSnippet",
        snippet:
            "useEffect(() => {\n  ${1}\n  return () => {\n    ${2}\n  }\n}, [${3}])\n",
        type: "Hooks",
        fileTypes: ["jsx", "tsx"]
    }
];
