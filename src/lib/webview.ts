import * as vscode from 'vscode';
import * as http from 'http';
export function openWebview(title:string,hostname:string,path:string,cookie:string[]){
    return new Promise((resolve,reject)=>{
        let doShowInActive = vscode.workspace.getConfiguration().get("faiojSubmittor.doShowWebviewInActiveEditor") as boolean;
        http.get({hostname,path,headers:{cookie}},(res)=>{
            let html = '';
            res.on('data',(chunk)=>{
                html+=chunk.toString();
            }).on('end',()=>{
                let panel = vscode.window.createWebviewPanel(
                    'submissionWebview',
                    title,
                    doShowInActive?vscode.ViewColumn.Active:vscode.ViewColumn.Beside,
                    {
                        enableScripts:true,
                        enableFindWidget:true,
                    }
                );
                panel.webview.html = html;
                resolve(panel);
            });
        }).on('error',(err)=>{
            reject(err);
        });
    })
}