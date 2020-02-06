import * as vscode from 'vscode';
import { searchProblem, SearchResult } from './submit';
import { LanguageDefinition, ContestNode, ContestProblemNode } from './xml_parsers';

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
export function selectContest(contestList:ContestNode[]){
    return new Promise<string|undefined>((resolve,reject)=>{
        let compilerBox = vscode.window.createQuickPick();
        compilerBox.placeholder = 'Contest';
        compilerBox.canSelectMany = false;
        compilerBox.items = contestList.map((contest)=>{
            return {
                label:contest.name,
                description:contest.status,
                detail:contest.path,
            }
        });
        compilerBox.onDidAccept(()=>{
            resolve(compilerBox.selectedItems[0].detail);
            compilerBox.dispose();
        });
        compilerBox.show();
    });
}
export function selectContestProblem(contestList:ContestProblemNode[]){
    return new Promise((resolve,reject)=>{
        let compilerBox = vscode.window.createQuickPick<vscode.QuickPickItem&{index:number}>();
        compilerBox.placeholder = 'Problem';
        compilerBox.canSelectMany = false;
        compilerBox.items = contestList.map((contest)=>{
            return {
                label:contest.name,
                description:contest.score,
                detail:contest.submissions,
                index:contest.index,
            }
        });
        compilerBox.onDidAccept(()=>{
            resolve(compilerBox.selectedItems[0].index);
            compilerBox.dispose();
        });
        compilerBox.show();
    });
}