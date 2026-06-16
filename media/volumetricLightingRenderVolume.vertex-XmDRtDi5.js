import { i as e, $ as t, K as i, a0 as n, M as a } from "./BabylonAdapter-DZR9EaPO.js";
const r = "volumetricLightingRenderVolumeVertexShader", s = `#include<__decl__sceneVertex>
#include<__decl__meshVertex>
attribute vec3 position;varying vec4 vWorldPos;void main(void) {vec4 worldPos=world*vec4(position,1.0);vWorldPos=worldPos;gl_Position=viewProjection*worldPos;}
`;
e.ShadersStore[r] || (e.ShadersStore[r] = s);
const c = [t, i, n, a];
for (const o of c)
  e.IncludesShadersStore[o.name] || (e.IncludesShadersStore[o.name] = o.shader);
const l = { name: r, shader: s };
export {
  l as volumetricLightingRenderVolumeVertexShader
};
