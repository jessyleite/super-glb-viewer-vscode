import { i as a, z as r, A as o, B as l, D as t, E as s, H as c, I as g } from "./BabylonAdapter-DZR9EaPO.js";
const n = "gaussianSplattingPixelShader", i = `#include<clipPlaneFragmentDeclaration>
#include<logDepthDeclaration>
#include<fogFragmentDeclaration>
varying vec4 vColor;varying vec2 vPosition;
#define CUSTOM_FRAGMENT_DEFINITIONS
#include<gaussianSplattingFragmentDeclaration>
void main () {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
vec4 finalColor=gaussianColor(vColor);
#define CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR
gl_FragColor=finalColor;
#define CUSTOM_FRAGMENT_MAIN_END
}
`;
a.ShadersStore[n] || (a.ShadersStore[n] = i);
const d = [r, o, l, t, s, c, g];
for (const e of d)
  a.IncludesShadersStore[e.name] || (a.IncludesShadersStore[e.name] = e.shader);
const F = { name: n, shader: i };
export {
  F as gaussianSplattingPixelShader
};
