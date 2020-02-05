import * as vscode from 'vscode';
import { searchProblem, SearchResult } from './submit';
import { LanguageDefinition } from './xml_parsers';

export function selectProblem(host:string):Promise<string|undefined>{
    return new Promise((resolve,reject)=>{
        let probSelectBox = vscode.window.createQuickPick();
        probSelectBox.placeholder = 'Problem ID/title';
        probSelectBox.canSelectMany = false;
        probSelectBox.onDidChangeValue(async (query)=>{
            let res = await searchProblem(host,query);
            probSelectBox.items = res.map((resObj)=>{
                return {
                    label:resObj.name,
                    detail:resObj.url,
                }
            })
        });
        probSelectBox.onDidAccept(()=>{
            resolve(probSelectBox.selectedItems[0].detail);
            probSelectBox.dispose();
        });
        probSelectBox.show();
    })
}
export function selectCompiler(langs:LanguageDefinition[]):Promise<string|undefined>{
    return new Promise((resolve,reject)=>{
        let compilerBox = vscode.window.createQuickPick();
        compilerBox.placeholder = 'Compiler';
        compilerBox.canSelectMany = false;
        compilerBox.items = langs.map((lang)=>{
            return {
                label:lang.displayName,
                description:lang.name,
                detail:lang.detail,
            }
        });
        compilerBox.onDidAccept(()=>{
            resolve(compilerBox.selectedItems[0].description);
            compilerBox.dispose();
        });
        compilerBox.show();
    });
}