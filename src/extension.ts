// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { login } from './lib/login';
import { getCompilers, submitCode, getContests, getContestProblemList, getContestProblemSubmitPath } from './lib/submit';
import { selectProblem, selectCompiler, selectContest, selectContestProblem } from './lib/submit_interact';
import * as fs from 'fs';
import { openWebview } from './lib/webview';
//import sleep from 'yuankui-sleep';
function sleep(ms:number){
	return new Promise((resolve,reject)=>{
		setTimeout(()=>{
			resolve();
		},ms);
	});
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "faioj-submittor" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	context.subscriptions.push(
		vscode.commands.registerCommand('extension.login', async() => {
			// The code you place here will be executed every time your command is executed
			// Display a message box to the user
			let username = await vscode.window.showInputBox({
				placeHolder:"Username",
			});
			if(!username)return;

			let password = await vscode.window.showInputBox({
				placeHolder:"Password",
				password:true,
			});
			if(!password)return;

			let scope = await vscode.window.showQuickPick(["Global","Workspace"],{
				canPickMany:false,
				placeHolder:'Scope',
			});
			if(!scope)return;

			let hostname = vscode.workspace.getConfiguration().get('faiojSubmittor.hostname') as string;

			try{
				let cookie = await login(username,password,hostname);
				vscode.workspace.getConfiguration().update('faiojSubmittor.cookie',cookie,scope=='Global');
				vscode.window.showInformationMessage(`Successfully logged in as ${username}.`);
			}catch(err){
				vscode.window.showErrorMessage(err.message);
			}
		}),
		vscode.commands.registerCommand("extension.logout",async ()=>{
			let scope = await vscode.window.showQuickPick(["Global","Workspace"],{
				canPickMany:false,
				placeHolder:'Scope',
			});
			if(!scope)return;

			vscode.workspace.getConfiguration().update('faiojSubmittor.cookie',[],scope=='Global');
		}),
		vscode.commands.registerCommand("extension.submitProblem",async ()=>{
			let hostname = vscode.workspace.getConfiguration().get('faiojSubmittor.hostname') as string;
			let cookie = vscode.workspace.getConfiguration().get('faiojSubmittor.cookie') as string[];
			let doAutoOpen = vscode.workspace.getConfiguration().get('faiojSubmittor.doAutoShowSubmission') as boolean;
			try{
				let code = vscode.window.visibleTextEditors[0]?.document.getText();
				if(!code){
					throw new Error("Please open source code file.");
				}
				let probPath = await selectProblem(hostname);
				if(!probPath)return;
				let langs = await getCompilers(hostname,probPath)
				let compiler = await selectCompiler(langs);
				if(!compiler)return;
				let submissionPath = await submitCode(hostname,probPath,compiler,code,cookie);
				//console.log(submissionPath);
				if(doAutoOpen){
					vscode.window.showInformationMessage(`Code submitted at '${submissionPath}' successfully. Submission will be shown automatically in 3s.`,'Show submission (in default browser)').then((val)=>{
						if(val=='Show submission (in default browser)'){
							vscode.env.openExternal(vscode.Uri.parse(`http://${hostname}${submissionPath}`));
						}
					});
					await sleep(3000);
					openWebview('Submission',hostname,submissionPath,cookie);
				}else{
					let res = await vscode.window.showInformationMessage(`Code submitted at '${submissionPath}' successfully.`,'Show submission (in default browser)','Show submission');
					if(res == 'Show submission (in default browser)'){
						vscode.env.openExternal(vscode.Uri.parse(`http://${hostname}${submissionPath}`));
					}else if(res == 'Show submission'){
						openWebview('Submission',hostname,submissionPath,cookie);
					}
				}

			}catch(err){
				vscode.window.showErrorMessage(err.message);
			}
			
		}),
		vscode.commands.registerCommand('extension.submitProblemContest',async ()=>{
			let hostname = vscode.workspace.getConfiguration().get('faiojSubmittor.hostname') as string;
			let cookie = vscode.workspace.getConfiguration().get('faiojSubmittor.cookie') as string[];
			let doAutoOpen = vscode.workspace.getConfiguration().get('faiojSubmittor.doAutoShowSubmission') as boolean;
			try{
				let code = vscode.window.visibleTextEditors[0]?.document.getText();
				if(!code){
					throw new Error("Please open source code file.");
				}
				let contests = await getContests(hostname,cookie);
				let contestPath = await selectContest(contests);
				if(!contestPath)return;
				let contestProblemsList = await getContestProblemList(hostname,contestPath,cookie);
				let contestProblemID = await selectContestProblem(contestProblemsList);
				if(!contestProblemID)return;
				let contestProblemPath = `${contestPath}/problem/${contestProblemID}`;
				let contestProblemSubmitPath = await getContestProblemSubmitPath(hostname,contestProblemPath,cookie);
				let langs = await getCompilers(hostname,contestProblemPath)
				let compiler = await selectCompiler(langs);
				if(!compiler)return;
				let submissionPath = await submitCode(hostname,contestProblemSubmitPath,compiler,code,cookie);
				if(doAutoOpen){
					vscode.window.showInformationMessage(`Code submitted at '${submissionPath}' successfully. Submission will be shown automatically in 3s.`,'Show submission (in default browser)').then((val)=>{
						if(val=='Show submission (in default browser)'){
							vscode.env.openExternal(vscode.Uri.parse(`http://${hostname}${submissionPath}`));
						}
					});
					await sleep(3000);
					openWebview('Submission',hostname,submissionPath,cookie);
				}else{
					let res = await vscode.window.showInformationMessage(`Code submitted at '${submissionPath}' successfully.`,'Show submission (in default browser)','Show submission');
					if(res == 'Show submission (in default browser)'){
						vscode.env.openExternal(vscode.Uri.parse(`http://${hostname}${submissionPath}`));
					}else if(res == 'Show submission'){
						openWebview('Submission',hostname,submissionPath,cookie);
					}
				}
			}catch(err){
				vscode.window.showErrorMessage(err.message);
			}
		}),
		vscode.commands.registerCommand('extension.showProblem',async ()=>{
			try{
				let hostname = vscode.workspace.getConfiguration().get('faiojSubmittor.hostname') as string;
				let cookie = vscode.workspace.getConfiguration().get('faiojSubmittor.cookie') as string[];
				let probPath = await selectProblem(hostname);
				if(!probPath)return;
				openWebview('Show Problem',hostname,probPath,cookie);
			}catch(err){
				vscode.window.showErrorMessage(err.message);
			}
		}),
		vscode.commands.registerCommand('extension.showContestProblem',async ()=>{
			try{
				let hostname = vscode.workspace.getConfiguration().get('faiojSubmittor.hostname') as string;
				let cookie = vscode.workspace.getConfiguration().get('faiojSubmittor.cookie') as string[];
				let contests = await getContests(hostname,cookie);
				let contestPath = await selectContest(contests);
				if(!contestPath)return;
				let contestProblemsList = await getContestProblemList(hostname,contestPath,cookie);
				let contestProblemID = await selectContestProblem(contestProblemsList);
				if(!contestProblemID)return;
				let contestProblemPath = `${contestPath}/problem/${contestProblemID}`;
				openWebview('Show Problem',hostname,contestProblemPath,cookie);
			}catch(err){
				vscode.window.showErrorMessage(err.message);
			}
		})
	)
}

// this method is called when your extension is deactivated
export function deactivate() {}