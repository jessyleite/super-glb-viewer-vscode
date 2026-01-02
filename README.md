# Super GLB Viewer

A VS Code extension that lets you view GLB and GLTF 3D model files directly in the editor.

## Getting the Viewer Library

This extension uses [super-glb-viewer](https://github.com/jessyleite/super-glb-viewer). You need to build and copy the library files:

1. Clone and build the library:
   ```bash
   git clone https://github.com/jessyleite/super-glb-viewer
   cd super-glb-viewer
   deno task build:lib:bundled
   ```

2. Copy the dist files to this extension's `media/` folder:
   ```bash
   cp -r dist/* /path/to/super-glb-viewer-vscode/media/
   ```

   This should include:
   - `super-glb-viewer.es.js` - Main ES module
   - `super-glb-viewer.css` - Styles
   - Various chunk files (adapters, loaders, etc.)
   - `vendor/` folder (Draco decoder, etc.) if needed
   - HDR environment files if needed

## Try the Extension

### From Source

1. Install dependencies:
   ```bash
   npm install
   ```

2. Compile the extension:
   ```bash
   npm run compile
   ```

3. Open this folder in VS Code and press `F5` to launch the Extension Development Host or use `Ctrl+Shift+P` to open the Command Palette and run `Debug: Start Debugging`.

4. In the new VS Code window, open any `.glb` or `.gltf` file

5. You can run `Developer: Open Webview Developer Tools` to open the webview developer tools.

### Install as VSIX

1. Package the extension:
   ```bash
   npm run package
   ```

2. Install the generated `.vsix` file:
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Click `...` menu → "Install from VSIX..."
   - Select the generated `.vsix` file

## Development

```bash
npm run compile   # Build once
npm run watch     # Watch mode
npm run package   # Create .vsix
```
