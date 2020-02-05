import * as xpath from 'xpath'
import {DOMParser} from 'xmldom'
import * as fs from 'fs'
export interface LanguageDefinition{
    name:string;
    displayName:string;
    detail:string;
}
function parseTextContent(raw:string){
    let tmp = raw.trim().split('\n');
    for(let i=0;i<tmp.length;i++){
        tmp[i]=tmp[i].trim();
    }
    return {
        displayName:tmp[0],
        detail:tmp[1]
    }
}
export function parseCompilers(xmlStr:string){
    fs.writeFileSync('./test.xml',xmlStr);
    let xmlDoc = new DOMParser().parseFromString(xmlStr);
    let compilerSelectList = xpath.select('//*[@id="languages-menu"]',xmlDoc) as HTMLDivElement[];
    let languages:LanguageDefinition[] = [];
    for(let i=0;i<compilerSelectList[0].childNodes.length;i++){
        let elem = compilerSelectList[0].childNodes[i];
        if((elem as {tagName?:string}).tagName == 'a'){
            languages.push({
                name:(elem as HTMLAnchorElement).getAttribute('data-value') as string,
                ...parseTextContent(elem.textContent as string),
            });
        }
    }
    return languages;
}