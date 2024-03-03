// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const { globalStorageUri } = context;
	vscode.workspace.fs.createDirectory(globalStorageUri);
	const confsPath = vscode.Uri.joinPath(globalStorageUri, 'confs.json');

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "my-launch-conf" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('my-launch-conf.add-conf', () => {
		// The code you place here will be executed every time your command is executed
		
		vscode.workspace.fs.stat(confsPath)
		.then((stat) => { }, (err) => {
			vscode.workspace.fs.writeFile(confsPath, new TextEncoder().encode('[]'));
		})
		.then(() => vscode.workspace.fs.readFile(confsPath))
		.then(uint8Array => new TextDecoder().decode(uint8Array))
		.then(text => console.log('Confs file:\n', text));
		
		vscode.window.showQuickPick(['Uno', 'Dos', 'Tres0'], { canPickMany: true, title: 'Add configurations'})
		.then(chosen => {
			vscode.window.showInformationMessage(`Chosed ${chosen?.length} confs`);
			console.log('Chosen confs:\n', chosen ?? '<< NONE >>');
		});
		vscode.workspace.findFiles('.vscode/launch.json')
		.then(uris => vscode.workspace.fs.readFile(uris[0]))
		.then(uint8Array => new TextDecoder().decode(uint8Array))
		.then(text => console.log('lanunc.json read :\n', text));
	});

	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerTextEditorCommand('my-launch-conf.set-sufix-a-type', (activeTextEditor, edit, ...args) => {
		//vscode.window.activeTextEditor?.edit()
		const { start } = activeTextEditor.selection;
		const { fileName } = activeTextEditor.document;
		vscode.window.showInformationMessage(`Cursor at ${start} of file ${fileName}`);
	}, );
}

// This method is called when your extension is deactivated
export function deactivate() {}
