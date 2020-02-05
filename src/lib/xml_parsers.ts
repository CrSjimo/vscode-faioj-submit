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
    //fs.writeFileSync('./test.xml',xmlStr);
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
export function parseContestPagesAmount(xmlStr:string){
    let xmlDoc = new DOMParser().parseFromString(xmlStr);
    let pageListPrev = xpath.select('//*[@id="page_prev"]',xmlDoc)[0];
    if(!pageListPrev)return 1;
    let pageList = (pageListPrev as Element).parentNode!;
    let pagesTextRaw = pageList.textContent!;
    let pageNumberList = pagesTextRaw.split(/\s*/);
    for(let i = pageNumberList.length-1;i>=0;i--){
        if(pageNumberList[i]!=''){
            return Number(pageNumberList[i]);
        }
    }
    throw new Error('Unavailable to parse document.');
}

export interface ContestNode{
    path:string;
    name:string;
    status:string;
}

export function parseContestList(...xmlStrList:string[]){
    let contests:ContestNode[] = [];
    for(let xmlStr of xmlStrList){
        let xmlDoc = new DOMParser().parseFromString(xmlStr);
        let table = xpath.select('//table/tbody',xmlDoc)[0] as Element;
        for(let i=0,k=0;i<table.childNodes.length;i++){
            let child = table.childNodes[i];
            if((child as any).tagName!='tr')continue;
            let hyperlink = xpath.select(`//tbody/tr[${++k}]/td/a`,xmlDoc)[0] as Element;
            let path = hyperlink.getAttribute('href') as string;
            let name = hyperlink.childNodes[0].textContent?.trim() as string;
            let status = hyperlink.childNodes[1].textContent?.trim() as string;
            contests.push({path,status,name});
        }
    }
    return contests;
}