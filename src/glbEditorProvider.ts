import * as vscode from 'vscode';

export class GlbEditorProvider implements vscode.CustomReadonlyEditorProvider {
  public static readonly viewType = 'superGlbViewer.glbPreview';

  constructor(private readonly context: vscode.ExtensionContext) { }

  public static register(context: vscode.ExtensionContext): vscode.Disposable {
    const provider = new GlbEditorProvider(context);
    return vscode.window.registerCustomEditorProvider(
      GlbEditorProvider.viewType,
      provider,
      {
        webviewOptions: {
          retainContextWhenHidden: true,
        },
        supportsMultipleEditorsPerDocument: false,
      }
    );
  }

  public async openCustomDocument(
    uri: vscode.Uri,
    _openContext: vscode.CustomDocumentOpenContext,
    _token: vscode.CancellationToken
  ): Promise<vscode.CustomDocument> {
    return { uri, dispose: () => { } };
  }

  public async resolveCustomEditor(
    document: vscode.CustomDocument,
    webviewPanel: vscode.WebviewPanel,
    _token: vscode.CancellationToken
  ): Promise<void> {
    webviewPanel.webview.options = {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.joinPath(this.context.extensionUri, 'media')
      ],
    };

    webviewPanel.webview.html = await this.getHtmlForWebview(
      webviewPanel.webview,
      document.uri
    );

    // Handle messages from the webview (e.g. file export/save)
    webviewPanel.webview.onDidReceiveMessage(async (message) => {
      if (message.type === 'saveFile') {
        const { data } = message;
        const sourceDir = vscode.Uri.joinPath(document.uri, '..');
        const baseName = document.uri.path.split('/').pop()!.replace(/\.(glb|gltf)$/i, '');
        const ext = document.uri.path.endsWith('.gltf') ? '.gltf' : '.glb';
        const outputUri = vscode.Uri.joinPath(sourceDir, `${baseName}_optimized${ext}`);
        await vscode.workspace.fs.writeFile(outputUri, new Uint8Array(data));
        vscode.window.showInformationMessage(`Saved to ${outputUri.fsPath}`);
      }
    });
  }

  private async getHtmlForWebview(
    webview: vscode.Webview,
    documentUri: vscode.Uri
  ): Promise<string> {
    // URIs for the viewer library assets
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, 'media', 'super-glb-viewer.es.js')
    );
    const styleUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, 'media', 'super-glb-viewer.css')
    );
    // Base URI for media folder - needed for vendor files, HDR, etc.
    const mediaBaseUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, 'media')
    );

    // Read the GLB file and convert to base64 data URL
    const fileData = await vscode.workspace.fs.readFile(documentUri);
    const base64 = Buffer.from(fileData).toString('base64');
    const dataUrl = `data:model/gltf-binary;base64,${base64}`;
    const fileName = documentUri.path.split('/').pop() || 'model.glb';

    // Generate a nonce for CSP
    const nonce = getNonce();

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src ${webview.cspSource} 'nonce-${nonce}' 'unsafe-eval'; img-src ${webview.cspSource} data: blob: https:; font-src ${webview.cspSource}; connect-src ${webview.cspSource} data: blob: https:; worker-src ${webview.cspSource} blob:;">
  <script nonce="${nonce}">
    // Polyfill Node.js globals before any modules load
    window.process = { env: { NODE_ENV: 'production' } };
    window.global = window;
    // Base URI for loading assets (vendor, HDR, etc.)
    window.__PUBLIC_BASE_URI__ = '${mediaBaseUri}';

    // VS Code API for messaging between webview and extension
    const vscodeApi = acquireVsCodeApi();

    // Polyfill showSaveFilePicker — not available in VS Code webviews.
    // The viewer library calls this to export files. We intercept the blob
    // and send it to the extension host which uses VS Code's native save dialog.
    window.showSaveFilePicker = async function(options) {
      const suggestedName = (options && options.suggestedName) || 'model.glb';
      let savedBlob = null;
      return {
        createWritable: function() {
          return {
            write: async function(blob) {
              savedBlob = blob;
            },
            close: async function() {
              if (savedBlob) {
                const arrayBuffer = await savedBlob.arrayBuffer();
                vscodeApi.postMessage({
                  type: 'saveFile',
                  fileName: suggestedName,
                  data: Array.from(new Uint8Array(arrayBuffer)),
                });
              }
            }
          };
        }
      };
    };
  </script>
  <link rel="stylesheet" href="${styleUri}">
  <title>GLB Viewer</title>
  <style>
    html, body, #root {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  </style>
</head>
<body>
  <div id="root"></div>
  <script nonce="${nonce}" type="module">
    import { App, React, ReactDOM } from '${scriptUri}';

    const glbDataUrl = '${dataUrl}';
    const root = document.getElementById('root');

    // Render the App component with initialModels and params
    const reactRoot = ReactDOM.createRoot(root);
    reactRoot.render(
      React.createElement(App, {
        initialModels: [{ url: glbDataUrl, name: '${fileName}' }],
        params: {
          displayFooterLinks: false,
          enableAddModels: false,
        }
      })
    );
  </script>
</body>
</html>`;
  }
}

function getNonce(): string {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
