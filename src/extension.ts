// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let cmd = vscode.commands.registerCommand('Code-Context.copyCodeWithMetadata', copyCodeWithMetadata);
	context.subscriptions.push(cmd);
}

function copyCodeWithMetadata() {
	vscode.window.showInformationMessage('copy code with extra info!');
	const editor = vscode.window.activeTextEditor;
	if (editor) {
		const filePath = editor.document.fileName;
		const fileFormat = editor.document.languageId;
		const workspaceFolders = vscode.workspace.workspaceFolders;
		const folderPath = (workspaceFolders && workspaceFolders?.length > 0 && workspaceFolders[0].uri.fsPath) ?? '';
		if (!editor.selection) {
			vscode.window.showInformationMessage('Please select code first.');
			return;
		}
		const selectedText = editor.document.getText(editor.selection);
		const lineNum = editor.selection.start.line + 1;

		const clipboardContent = JSON.stringify({
			type: 'code',
			language: editor.document.languageId,
			folderPath,
			filePath,
			fileFormat,
			lineNum,
			text: selectedText
		});

		vscode.env.clipboard.writeText('ymjr:' + clipboardContent)
		.then(() => {
			vscode.window.showInformationMessage('File info copied to clipboard.');
		})
	} else {
		vscode.window.showWarningMessage('No active editor found.');
	}
}

// This method is called when your extension is deactivated
export function deactivate() {}
