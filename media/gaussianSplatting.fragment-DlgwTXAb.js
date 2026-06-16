import { i as a, j as i, l as r, k as o, m as l, n as s, o as S, p as g } from "./BabylonAdapter-DZR9EaPO.js";
const e = "gaussianSplattingPixelShader", t = `#include<clipPlaneFragmentDeclaration>
#include<logDepthDeclaration>
#include<fogFragmentDeclaration>
varying vColor: vec4f;varying vPosition: vec2f;
#define CUSTOM_FRAGMENT_DEFINITIONS
#include<gaussianSplattingFragmentDeclaration>
@fragment
fn main(input: FragmentInputs)->FragmentOutputs {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
var finalColor: vec4f=gaussianColor(input.vColor,input.vPosition);
#define CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR
fragmentOutputs.color=finalColor;
#define CUSTOM_FRAGMENT_MAIN_END
}
`;
a.ShadersStoreWGSL[e] || (a.ShadersStoreWGSL[e] = t);
const c = [i, r, o, l, s, S, g];
for (const n of c)
  a.IncludesShadersStoreWGSL[n.name] || (a.IncludesShadersStoreWGSL[n.name] = n.shader);
const m = { name: e, shader: t };
export {
  m as gaussianSplattingPixelShaderWGSL
};
