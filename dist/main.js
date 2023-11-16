var r={id:"bajrangcoder.react.snippets",name:"Acode ES7+ React/Redux snippets",main:"dist/main.js",version:"1.0.0",readme:"readme.md",icon:"icon.png",files:[],minVersionCode:290,price:0,author:{name:"Raunak Raj",email:"bajrangcoders@gmail.com",github:"bajrangCoder"}};function m(i){let t=i.getMode().$id.split("/");return t[t.length-1]}var u=[{prefix:"rcc",snippet:`import React, { Component } from 'react'

export default class \${FILE_NAME} extends Component {
  render() {
    return (
    <div>$1</div>
  )
}
`,type:"Components",description:"Creates a <strong>React component</strong> class with ES7 module system",fileTypes:["jsx","tsx"]},{prefix:"useEffectSnippet",snippet:`useEffect(() => {
  \${1}
  return () => {
    \${2}
  }
}, [\${3}])
`,type:"Hooks",fileTypes:["jsx","tsx"]}];var{snippetManager:y}=ace.require("ace/snippets"),{editor:a}=editorManager,p=class{constructor(){this.setVariables()}setVariables(){let{variables:e}=y;e.FILE_NAME=()=>{let t=editorManager.activeFile.filename,o=t.lastIndexOf(".");return t.slice(0,o)}}initializeAutocompletion(e){this.reactCompleter={getCompletions:(t,o,s,x,c)=>{let g=m(o),l=e.filter(n=>n.fileTypes.includes(g));l.length>0?c(null,l.map(n=>{let d={caption:n.prefix,snippet:n.snippet,meta:n.type,value:n.snippet,type:"snippet",docHTML:n.description||""};return extraSyntaxHighlightsInstalled?{...d,icon:"icon react-snippet-icon"}:d})):c(null,[])}},a.completers.unshift(this.reactCompleter)}async init(e,t,o){let s=document.createElement("style");s.innerHTML=`
        .ace_tooltip.ace_doc-tooltip {
            display: flex !important;
            background-color: var(--secondary-color);
            color: var(--secondary-text-color);
            max-width: 68%;
            white-space: pre-wrap;
        }
        `,document.head.append(s),setTimeout(()=>{document.querySelector(".ace_tooltip").style.display="block !important"},5e3),acode.addIcon("react-snippet-icon",this.baseUrl+"icon.png"),this.initializeAutocompletion(u)}async destroy(){a.completers.splice(a.completers.indexOf(this.reactCompleter),1)}};if(window.acode){let i=new p;acode.setPluginInit(r.id,async(e,t,{cacheFileUrl:o,cacheFile:s})=>{e.endsWith("/")||(e+="/"),i.baseUrl=e,await i.init(t,s,o)}),acode.setPluginUnmount(r.id,()=>{i.destroy()})}
