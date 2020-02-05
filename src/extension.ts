// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { login } from './lib/login';
import { getCompilers, submitCode } from './lib/submit';
import { selectProblem, selectCompiler } from './lib/submit_interact';
import * as fs from 'fs';
import { openWebview } from './lib/webview';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "syzoj-submittor" is now active!');

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

			let hostname = vscode.workspace.getConfiguration().get('syzojSubmittor.hostname') as string;

			try{
				let cookie = await login(username,password,hostname);
				vscode.workspace.getConfiguration().update('syzojSubmittor.cookie',cookie,scope=='Global');
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

			vscode.workspace.getConfiguration().update('syzojSubmittor.cookie',[],scope=='Global');
		}),
		vscode.commands.registerCommand("extension.submitProblem",async ()=>{
			let hostname = vscode.workspace.getConfiguration().get('syzojSubmittor.hostname') as string;
			let cookie = vscode.workspace.getConfiguration().get('syzojSubmittor.cookie') as string[];
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
				let res = await vscode.window.showInformationMessage(`Code submitted at '${submissionPath}' successfully.`,'Show submission (in default browser)','Show submission');
				if(res == 'Show submission (in default browser)'){
					vscode.env.openExternal(vscode.Uri.parse(`http://${hostname}${submissionPath}`));
				}else if(res == 'Show submission'){
					await openWebview('Submission',hostname,submissionPath,cookie);
				}

			}catch(err){
				vscode.window.showErrorMessage(err.message);
			}
			
		})
	)
}

// this method is called when your extension is deactivated
export function deactivate() {}
