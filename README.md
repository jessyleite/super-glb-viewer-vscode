# Super GLB Viewer for VS Code

View GLB and GLTF 3D model files directly in VS Code — powered by a multi-engine viewer supporting Three.js, Babylon.js, and PlayCanvas.

<!-- ![Super GLB Viewer Screenshot](images/screenshot.png) -->

## Features

- **Open GLB/GLTF files** directly in VS Code as a custom editor
- **Multiple rendering engines** — switch between Three.js, Babylon.js, and PlayCanvas
- **WebGL2 and WebGPU** backends
- **Animations** — play/pause, seek, track selection, and speed control
- **Blend shapes / morph targets** with adjustable weights
- **Inspector** — browse the scene graph, edit materials (PBR, clearcoat, transmission, sheen, volume), transforms, and lights
- **Model comparison** — split view with synchronized camera and stat deltas
- **Optimization** — mesh compression and KTX2 texture compression
- **Export** — download your model (including edits) as GLB
- **Environment lighting** — load custom HDR files, adjust exposure and tonemapping
- **Stats panel** — vertices, triangles, meshes, materials, textures, and VRAM usage
- **Fully offline** — all processing happens locally, no data leaves your machine

## Supported Formats

| Format | Extension | Notes |
|--------|-----------|-------|
| GLB | `.glb` | Self-contained binary glTF

## Usage

1. Install the extension
2. Open any `.glb` file in VS Code
3. The 3D viewer opens automatically

### Camera Controls

| Action | Mouse | Keyboard |
|--------|-------|----------|
| Orbit | Left drag | Arrow keys / WASD |
| Pan | Right drag | — |
| Zoom | Scroll wheel | `+` / `-` |

### Switching Engines

Use the engine selector in the viewer toolbar to switch between Three.js, Babylon.js, and PlayCanvas. Your camera position, environment, and settings are preserved across switches.

## Requirements

- VS Code 1.80.0 or later

## License

This extension is licensed under the [MIT License](LICENSE).

The embedded viewer library ([super-glb-viewer](https://github.com/jessyleite/super-glb-viewer)) is separately licensed — see `media/LICENSE` for details.
