import * as vscode from 'vscode';
import { GlbEditorProvider } from './glbEditorProvider';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(GlbEditorProvider.register(context));
}

export function deactivate() {}
