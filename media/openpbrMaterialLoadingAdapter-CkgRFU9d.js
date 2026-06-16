import { ao as u, ap as X, a as y } from "./BabylonAdapter-DZR9EaPO.js";
const $ = "textureProcessor";
var _;
(function(t) {
  t[t.Linear = 0] = "Linear", t[t.SRGB = 1] = "SRGB";
})(_ || (_ = {}));
var c;
(function(t) {
  t[t.R = 1] = "R", t[t.G = 2] = "G", t[t.B = 4] = "B", t[t.A = 8] = "A", t[t.RGB = 7] = "RGB", t[t.RGBA = 15] = "RGBA";
})(c || (c = {}));
var o;
(function(t) {
  t[t.RGBA = 0] = "RGBA", t[t.R = 1] = "R", t[t.G = 2] = "G", t[t.B = 3] = "B", t[t.A = 4] = "A";
})(o || (o = {}));
function H(t) {
  return { texture: null, factor: t };
}
function h(t, e, r, s) {
  const i = { texture: t, factor: e };
  return r && (i.channel = r), s && (i.colorSpace = s), i;
}
function d(t) {
  return t.factor ?? new u(1, 1, 1, 1);
}
function q(t, e) {
  return new u(t.r * e.r, t.g * e.g, t.b * e.b, t.a * e.a);
}
function K(t, e, r) {
  return new u(t.r + (e.r - t.r) * r.r, t.g + (e.g - t.g) * r.g, t.b + (e.b - t.b) * r.b, t.a + (e.a - t.a) * r.a);
}
function B(t) {
  let e = 0, r = 512;
  for (const s of t)
    if (s.texture) {
      const i = s.texture.getSize(), n = Math.max(i.width, i.height);
      n > e && (e = n, r = i.width === i.height ? n : i);
    }
  return r;
}
function G(t) {
  return !t.getTextureMatrix().isIdentity();
}
function v(t) {
  if (t.length <= 1)
    return !0;
  const e = t[0].getTextureMatrix();
  for (let r = 1; r < t.length; r++)
    if (!e.equals(t[r].getTextureMatrix()))
      return !1;
  return !0;
}
function O(t, e, r) {
  if (e.coordinatesIndex = t.coordinatesIndex, e.wrapU = t.wrapU, e.wrapV = t.wrapV, r) {
    const s = t;
    e.uOffset = s.uOffset ?? 0, e.vOffset = s.vOffset ?? 0, e.uScale = s.uScale ?? 1, e.vScale = s.vScale ?? 1, e.wAng = s.wAng ?? 0;
  }
}
function k(t) {
  switch (t) {
    case o.R:
      return "R";
    case o.G:
      return "G";
    case o.B:
      return "B";
    case o.A:
      return "A";
    default:
      return "";
  }
}
function j(t, e) {
  switch (e) {
    case o.R:
      return new u(t.r, t.r, t.r, t.a);
    case o.G:
      return new u(t.g, t.g, t.g, t.a);
    case o.B:
      return new u(t.b, t.b, t.b, t.a);
    case o.A:
      return new u(t.a, t.a, t.a, t.a);
    default:
      return t;
  }
}
function Z(t) {
  const e = ["OP_INVERT"];
  return t & c.R && e.push("INVERT_R"), t & c.G && e.push("INVERT_G"), t & c.B && e.push("INVERT_B"), t & c.A && e.push("INVERT_A"), e;
}
function D(t) {
  const e = [];
  return t & c.R || e.push("OUTPUT_MASK_R_ZERO"), t & c.G || e.push("OUTPUT_MASK_G_ZERO"), t & c.B || e.push("OUTPUT_MASK_B_ZERO"), t & c.A || e.push("OUTPUT_MASK_A_ONE"), e;
}
function S(t, e) {
  return new u(e & c.R ? t.r : 0, e & c.G ? t.g : 0, e & c.B ? t.b : 0, e & c.A ? t.a : 1);
}
function w(t, e, r) {
  const s = [];
  return t.texture && (s.push(`OPERAND_${e}_TEXTURE`), r && G(t.texture) && s.push(`OPERAND_${e}_MATRIX`), t.colorSpace && s.push(`OPERAND_${e}_SRGB`), t.channel && s.push(`OPERAND_${e}_CHANNEL_${k(t.channel)}`)), (t.factor !== void 0 || !t.texture) && s.push(`OPERAND_${e}_FACTOR`), s;
}
function Y(t, e) {
  const r = [];
  return t.texture && (r.push("LERP_T_TEXTURE"), e && G(t.texture) && r.push("LERP_T_MATRIX"), t.factor !== void 0 && r.push("LERP_T_FACTOR"), t.colorSpace && r.push("LERP_T_SRGB"), t.channel && r.push(`LERP_T_CHANNEL_${k(t.channel)}`)), r;
}
function b(t, e, r, s, i) {
  e.texture && (t.setTexture(r, e.texture), i && G(e.texture) && t.setMatrix(`${r}Matrix`, e.texture.getTextureMatrix())), (e.factor !== void 0 || !e.texture) && t.setColor4(s, d(e));
}
function J(t, e, r) {
  e.texture ? (t.setTexture("textureT", e.texture), r && G(e.texture) && t.setMatrix("textureTMatrix", e.texture.getTextureMatrix()), e.factor !== void 0 && t.setColor4("factorT", e.factor)) : t.setColor4("factorT", d(e));
}
function F(t, e, r, s, i = _.Linear) {
  const n = {
    type: 0,
    format: 5,
    samplingMode: 2,
    generateDepthBuffer: !1,
    generateMipMaps: !1,
    gammaSpace: i === _.SRGB,
    shaderLanguage: s.getEngine().isWebGPU ? 1 : 0,
    extraInitializationsAsync: async () => {
      s.getEngine().isWebGPU ? await Promise.all([import("./textureProcessor.fragment-BkQLtq9R.js")]) : await Promise.all([import("./textureProcessor.fragment-DGcQUmIU.js")]);
    },
    // Opt out of scene-managed rendering. _shouldRender() would re-render the texture
    // on the first scene frame regardless of refreshRate (because _currentRefreshId starts
    // at -1 and is only advanced by _shouldRender() itself, not by a direct render() call).
    // That re-render would sample already-disposed input textures, producing blank output.
    skipSceneRegistration: !0
  }, l = new X(t, r, $, s, n);
  return l.refreshRate = -1, l.defines = e.length > 0 ? "#define " + e.join(`
#define `) + `
` : "", l;
}
async function N(t) {
  return await new Promise((e, r) => {
    t.executeWhenReady(() => {
      try {
        t.render(), e();
      } catch (s) {
        r(s instanceof Error ? s : new Error(String(s)));
      }
    });
  });
}
async function V(t, e, r, s, i, n) {
  if (!e.texture && !r.texture) {
    const p = q(d(e), d(r));
    return { texture: null, factor: n ? S(p, n) : p };
  }
  const l = [];
  e.texture && l.push(e.texture), r.texture && l.push(r.texture);
  const m = v(l), f = !m, a = [
    ...w(e, "A", f),
    ...w(r, "B", f),
    ...n ? D(n) : []
  ];
  i && a.push("OUTPUT_SRGB");
  const g = F(t, a, B([e, r]), s, i);
  b(g, e, "textureA", "factorA", f), b(g, r, "textureB", "factorB", f);
  try {
    await N(g);
  } catch (p) {
    throw e.dispose?.(), r.dispose?.(), p;
  }
  e.dispose?.(), r.dispose?.(), O(l[0], g, m);
  const T = { texture: g, dispose: () => g.dispose() };
  return i && (T.colorSpace = i), T;
}
async function C(t, e, r, s, i, n, l) {
  if (!e.texture && !r.texture && !s.texture) {
    const R = K(d(e), d(r), d(s));
    return { texture: null, factor: l ? S(R, l) : R };
  }
  const m = [];
  e.texture && m.push(e.texture), r.texture && m.push(r.texture), s.texture && m.push(s.texture);
  const f = v(m), a = !f, g = [
    "OP_LERP",
    ...w(e, "A", a),
    ...w(r, "B", a),
    ...Y(s, a),
    ...l ? D(l) : []
  ];
  n && g.push("OUTPUT_SRGB");
  const T = F(t, g, B([e, r, s]), i, n);
  b(T, e, "textureA", "factorA", a), b(T, r, "textureB", "factorB", a), J(T, s, a);
  try {
    await N(T);
  } catch (R) {
    throw e.dispose?.(), r.dispose?.(), s.dispose?.(), R;
  }
  e.dispose?.(), r.dispose?.(), s.dispose?.(), O(m[0], T, f);
  const p = { texture: T, dispose: () => T.dispose() };
  return n && (p.colorSpace = n), p;
}
async function Q(t, e, r, s = c.RGBA, i, n) {
  if (!e.texture) {
    const a = d(e), g = new u(s & c.R ? 1 - a.r : a.r, s & c.G ? 1 - a.g : a.g, s & c.B ? 1 - a.b : a.b, s & c.A ? 1 - a.a : a.a);
    return { texture: null, factor: n ? S(g, n) : g };
  }
  const l = [...w(e, "A", !1), ...Z(s), ...n ? D(n) : []];
  i && l.push("OUTPUT_SRGB");
  const m = F(t, l, B([e]), r, i);
  b(m, e, "textureA", "factorA", !1);
  try {
    await N(m);
  } catch (a) {
    throw e.dispose?.(), a;
  }
  e.dispose?.(), O(e.texture, m, !0);
  const f = { texture: m, dispose: () => m.dispose() };
  return i && (f.colorSpace = i), f;
}
async function ee(t, e, r, s = !1, i, n) {
  if (!e.texture) {
    const a = d(e), g = s ? Math.max(a.r, a.g, a.b, a.a) : Math.max(a.r, a.g, a.b), T = new u(g, g, g, s ? g : a.a);
    return { texture: null, factor: n ? S(T, n) : T };
  }
  const l = [...w(e, "A", !1), "OP_CHANNEL_MAX", ...n ? D(n) : []];
  s && l.push("CHANNEL_MAX_INCLUDE_ALPHA"), i && l.push("OUTPUT_SRGB");
  const m = F(t, l, B([e]), r, i);
  b(m, e, "textureA", "factorA", !1);
  try {
    await N(m);
  } catch (a) {
    throw e.dispose?.(), a;
  }
  e.dispose?.(), O(e.texture, m, !0);
  const f = { texture: m, dispose: () => m.dispose() };
  return i && (f.colorSpace = i), f;
}
async function te(t, e, r, s, i, n) {
  if (!e.texture) {
    const l = j(d(e), r);
    return { texture: null, factor: n ? S(l, n) : l };
  }
  return await V(t, { ...e, channel: r }, H(new u(1, 1, 1, 1)), s, i, n);
}
class se {
  /**
   * Creates a new instance of the OpenPBRMaterialLoadingAdapter.
   * @param material - The OpenPBR material to adapt.
   */
  constructor(e) {
    this._specWorkflow = !1, this._diffuseTransmissionTint = y.White(), this._diffuseTransmissionTintTexture = null, this._material = e;
  }
  /**
   * Gets the underlying material
   */
  get material() {
    return this._material;
  }
  /**
   * Whether the material should be treated as unlit
   */
  get isUnlit() {
    return this._material.unlit;
  }
  /**
   * Sets whether the material should be treated as unlit
   */
  set isUnlit(e) {
    this._material.unlit = e;
  }
  // ========================================
  // CULLING PROPERTIES
  // ========================================
  /**
   * Sets whether back face culling is enabled.
   * @param value True to enable back face culling
   */
  set backFaceCulling(e) {
    this._material.backFaceCulling = e;
  }
  /**
   * Gets whether back face culling is enabled.
   * @returns True if back face culling is enabled
   */
  get backFaceCulling() {
    return this._material.backFaceCulling;
  }
  /**
   * Sets whether two-sided lighting is enabled.
   * @param value True to enable two-sided lighting
   */
  set twoSidedLighting(e) {
    this._material.twoSidedLighting = e;
  }
  /**
   * Gets whether two-sided lighting is enabled.
   * @returns True if two-sided lighting is enabled
   */
  get twoSidedLighting() {
    return this._material.twoSidedLighting;
  }
  // ========================================
  // ALPHA PROPERTIES
  // ========================================
  /**
   * Sets the alpha cutoff value for alpha testing.
   * Note: OpenPBR doesn't have a direct equivalent, so this is a no-op.
   * @param value The alpha cutoff threshold (ignored for OpenPBR)
   */
  set alphaCutOff(e) {
    this._material.alphaCutOff = e;
  }
  /**
   * Gets the alpha cutoff value.
   * @returns Default value of 0.5 (OpenPBR doesn't support this directly)
   */
  get alphaCutOff() {
    return this._material.alphaCutOff;
  }
  /**
   * Sets whether to use alpha from the base color texture.
   * Note: OpenPBR handles this differently through the baseColorTexture alpha channel.
   * @param value True to use alpha from base color texture (handled automatically in OpenPBR)
   */
  set useAlphaFromBaseColorTexture(e) {
    this._material._useAlphaFromBaseColorTexture = e;
  }
  /**
   * Gets whether alpha is used from the base color texture.
   * @returns True if alpha is used from the base color texture
   */
  get useAlphaFromBaseColorTexture() {
    return this._material._useAlphaFromBaseColorTexture;
  }
  /**
   * Gets whether the transparency is treated as alpha coverage.
   */
  get transparencyAsAlphaCoverage() {
    return !1;
  }
  /**
   * Sets/Gets whether the transparency is treated as alpha coverage
   */
  set transparencyAsAlphaCoverage(e) {
  }
  // ========================================
  // BASE PARAMETERS
  // ========================================
  /**
   * Sets the base color of the OpenPBR material.
   * @param value The base color as a Color3
   */
  set baseColor(e) {
    this._material.baseColor = e;
  }
  /**
   * Gets the base color of the OpenPBR material.
   * @returns The base color as a Color3
   */
  get baseColor() {
    return this._material.baseColor;
  }
  /**
   * Sets the base color texture of the OpenPBR material.
   * @param value The base color texture or null
   */
  set baseColorTexture(e) {
    this._material.baseColorTexture = e;
  }
  /**
   * Gets the base color texture of the OpenPBR material.
   * @returns The base color texture or null
   */
  get baseColorTexture() {
    return this._material.baseColorTexture;
  }
  /**
   * Sets the base diffuse roughness of the OpenPBR material.
   * @param value The diffuse roughness value (0-1)
   */
  set baseDiffuseRoughness(e) {
    this._material.baseDiffuseRoughness = e;
  }
  /**
   * Gets the base diffuse roughness of the OpenPBR material.
   * @returns The diffuse roughness value (0-1)
   */
  get baseDiffuseRoughness() {
    return this._material.baseDiffuseRoughness;
  }
  /**
   * Sets the base diffuse roughness texture of the OpenPBR material.
   * @param value The diffuse roughness texture or null
   */
  set baseDiffuseRoughnessTexture(e) {
    this._material.baseDiffuseRoughnessTexture = e;
  }
  /**
   * Gets the base diffuse roughness texture of the OpenPBR material.
   * @returns The diffuse roughness texture or null
   */
  get baseDiffuseRoughnessTexture() {
    return this._material.baseDiffuseRoughnessTexture;
  }
  /**
   * Sets the base metalness value of the OpenPBR material.
   * @param value The metalness value (0-1)
   */
  set baseMetalness(e) {
    this._material.baseMetalness = e;
  }
  /**
   * Gets the base metalness value of the OpenPBR material.
   * @returns The metalness value (0-1)
   */
  get baseMetalness() {
    return this._material.baseMetalness;
  }
  /**
   * Sets the base metalness texture of the OpenPBR material.
   * @param value The metalness texture or null
   */
  set baseMetalnessTexture(e) {
    this._material.baseMetalnessTexture = e;
  }
  /**
   * Gets the base metalness texture of the OpenPBR material.
   * @returns The metalness texture or null
   */
  get baseMetalnessTexture() {
    return this._material.baseMetalnessTexture;
  }
  /**
   * Sets whether to use roughness from the metallic texture's green channel.
   * @param value True to use green channel for roughness
   */
  set useRoughnessFromMetallicTextureGreen(e) {
    this._material._useRoughnessFromMetallicTextureGreen = e;
  }
  /**
   * Sets whether to use metalness from the metallic texture's blue channel.
   * @param value True to use blue channel for metalness
   */
  set useMetallicFromMetallicTextureBlue(e) {
    this._material._useMetallicFromMetallicTextureBlue = e;
  }
  // ========================================
  // SPECULAR PARAMETERS
  // ========================================
  /**
   * Configures specular properties for OpenPBR material.
   * @param _enableEdgeColor Whether to enable edge color support (ignored for OpenPBR)
   */
  enableSpecularEdgeColor(e = !1) {
  }
  configureSpecularGlossiness() {
    this._specWorkflow = !0;
  }
  /**
   * Sets the specular weight of the OpenPBR material.
   * @param value The specular weight value (0-1)
   */
  set specularWeight(e) {
    this._material.specularWeight = e;
  }
  /**
   * Gets the specular weight of the OpenPBR material.
   * @returns The specular weight value (0-1)
   */
  get specularWeight() {
    return this._material.specularWeight;
  }
  /**
   * Sets the specular weight texture of the OpenPBR material.
   * If the same texture is used for specular color, optimizes by using alpha channel for weight.
   * @param value The specular weight texture or null
   */
  set specularWeightTexture(e) {
    this._material.specularColorTexture === e ? (this._material.specularWeightTexture = null, this._material._useSpecularWeightFromSpecularColorTexture = !0, this._material._useSpecularWeightFromAlpha = !0) : this._material.specularWeightTexture = e;
  }
  /**
   * Gets the specular weight texture of the OpenPBR material.
   * @returns The specular weight texture or null
   */
  get specularWeightTexture() {
    return this._material.specularWeightTexture;
  }
  /**
   * Sets the specular color of the OpenPBR material.
   * @param value The specular color as a Color3
   */
  set specularColor(e) {
    this._material.specularColor = e;
  }
  /**
   * Gets the specular color of the OpenPBR material.
   * @returns The specular color as a Color3
   */
  get specularColor() {
    return this._material.specularColor;
  }
  /**
   * Sets the specular color texture of the OpenPBR material.
   * If the same texture is used for specular weight, optimizes by using alpha channel for weight.
   * @param value The specular color texture or null
   */
  set specularColorTexture(e) {
    this._material.specularColorTexture = e, this._material.specularWeightTexture === this._material.specularColorTexture && (this._material.specularWeightTexture = null, this._material._useSpecularWeightFromSpecularColorTexture = !0, this._material._useSpecularWeightFromAlpha = !0);
  }
  /**
   * Gets the specular color texture of the OpenPBR material.
   * @returns The specular color texture or null
   */
  get specularColorTexture() {
    return this._material.specularColorTexture;
  }
  /**
   * Sets the specular roughness of the OpenPBR material.
   * @param value The roughness value (0-1)
   */
  set specularRoughness(e) {
    this._material.specularRoughness = e;
  }
  /**
   * Gets the specular roughness of the OpenPBR material.
   * @returns The roughness value (0-1)
   */
  get specularRoughness() {
    return this._material.specularRoughness;
  }
  /**
   * Sets the specular roughness texture of the OpenPBR material.
   * @param value The roughness texture or null
   */
  set specularRoughnessTexture(e) {
    this._material.specularRoughnessTexture = e;
  }
  /**
   * Gets the specular roughness texture of the OpenPBR material.
   * @returns The roughness texture or null
   */
  get specularRoughnessTexture() {
    return this._material.specularRoughnessTexture;
  }
  /**
   * Sets the specular index of refraction (IOR) of the OpenPBR material.
   * @param value The IOR value
   */
  set specularIor(e) {
    this._material.specularIor = e;
  }
  /**
   * Gets the specular index of refraction (IOR) of the OpenPBR material.
   * @returns The IOR value
   */
  get specularIor() {
    return this._material.specularIor;
  }
  /**
   * Sets the glossiness (inverted roughness) of the OpenPBR material.
   */
  set glossiness(e) {
    this._material.specularRoughness = Math.max(1 - e, 0);
  }
  get glossiness() {
    return 1 - this._material.specularRoughness;
  }
  // ========================================
  // EMISSION PARAMETERS
  // ========================================
  /**
   * Sets the emission color of the OpenPBR material.
   * @param value The emission color as a Color3
   */
  set emissionColor(e) {
    this._material.emissionColor = e;
  }
  /**
   * Gets the emission color of the OpenPBR material.
   * @returns The emission color as a Color3
   */
  get emissionColor() {
    return this._material.emissionColor;
  }
  /**
   * Sets the emission luminance of the OpenPBR material.
   * @param value The emission luminance value
   */
  set emissionLuminance(e) {
    this._material.emissionLuminance = e;
  }
  /**
   * Gets the emission luminance of the OpenPBR material.
   * @returns The emission luminance value
   */
  get emissionLuminance() {
    return this._material.emissionLuminance;
  }
  /**
   * Sets the emission color texture of the OpenPBR material.
   * @param value The emission texture or null
   */
  set emissionColorTexture(e) {
    this._material.emissionColorTexture = e;
  }
  /**
   * Gets the emission color texture of the OpenPBR material.
   * @returns The emission texture or null
   */
  get emissionColorTexture() {
    return this._material.emissionColorTexture;
  }
  // ========================================
  // AMBIENT OCCLUSION
  // ========================================
  /**
   * Sets the ambient occlusion texture of the OpenPBR material.
   * @param value The ambient occlusion texture or null
   */
  set ambientOcclusionTexture(e) {
    this._material.ambientOcclusionTexture = e;
  }
  /**
   * Gets the ambient occlusion texture of the OpenPBR material.
   * @returns The ambient occlusion texture or null
   */
  get ambientOcclusionTexture() {
    return this._material.ambientOcclusionTexture;
  }
  /**
   * Sets the ambient occlusion texture strength by modifying the texture's level.
   * @param value The strength value (typically 0-1)
   */
  set ambientOcclusionTextureStrength(e) {
    const r = this._material.ambientOcclusionTexture;
    r && (r.level = e);
  }
  /**
   * Gets the ambient occlusion texture strength from the texture's level property.
   * @returns The strength value, defaults to 1.0 if no texture or level is set
   */
  get ambientOcclusionTextureStrength() {
    return this._material.ambientOcclusionTexture?.level ?? 1;
  }
  // ========================================
  // COAT PARAMETERS
  // ========================================
  /**
   * Configures coat parameters for OpenPBR material.
   * OpenPBR coat is already built-in, so no configuration is needed.
   */
  configureCoat() {
  }
  /**
   * Sets the coat weight of the OpenPBR material.
   * @param value The coat weight value (0-1)
   */
  set coatWeight(e) {
    this._material.coatWeight = e;
  }
  /**
   * Gets the coat weight of the OpenPBR material.
   * @returns The coat weight value (0-1)
   */
  get coatWeight() {
    return this._material.coatWeight;
  }
  /**
   * Sets the coat weight texture of the OpenPBR material.
   * @param value The coat weight texture or null
   */
  set coatWeightTexture(e) {
    this._material.coatWeightTexture = e;
  }
  /**
   * Gets the coat weight texture of the OpenPBR material.
   * @returns The coat weight texture or null
   */
  get coatWeightTexture() {
    return this._material.coatWeightTexture;
  }
  /**
   * Sets the coat color of the OpenPBR material.
   * @param value The coat color as a Color3
   */
  set coatColor(e) {
    this._material.coatColor = e;
  }
  /**
   * Gets the coat color of the OpenPBR material.
   */
  get coatColor() {
    return this._material.coatColor;
  }
  /**
   * Sets the coat color texture of the OpenPBR material.
   * @param value The coat color texture or null
   */
  set coatColorTexture(e) {
    this._material.coatColorTexture = e;
  }
  /**
   * Sets the coat roughness of the OpenPBR material.
   * @param value The coat roughness value (0-1)
   */
  set coatRoughness(e) {
    this._material.coatRoughness = e;
  }
  /**
   * Gets the coat roughness of the OpenPBR material.
   * @returns The coat roughness value (0-1)
   */
  get coatRoughness() {
    return this._material.coatRoughness;
  }
  /**
   * Sets the coat roughness texture of the OpenPBR material.
   * @param value The coat roughness texture or null
   */
  set coatRoughnessTexture(e) {
    this._material.coatRoughnessTexture = e, e && (this._material._useCoatRoughnessFromGreenChannel = !0);
  }
  /**
   * Gets the coat roughness texture of the OpenPBR material.
   * @returns The coat roughness texture or null
   */
  get coatRoughnessTexture() {
    return this._material.coatRoughnessTexture;
  }
  /**
   * Sets the coat index of refraction (IOR) of the OpenPBR material.
   */
  set coatIor(e) {
    this._material.coatIor = e;
  }
  get coatIor() {
    return this._material.coatIor;
  }
  /**
   * Sets the coat darkening value of the OpenPBR material.
   * @param value The coat darkening value
   */
  set coatDarkening(e) {
    this._material.coatDarkening = e;
  }
  get coatDarkening() {
    return this._material.coatDarkening;
  }
  /**
   * Sets the coat darkening texture (OpenPBR: coatDarkeningTexture, no PBR equivalent)
   */
  set coatDarkeningTexture(e) {
    this._material.coatDarkeningTexture = e;
  }
  /**
   * Sets the coat roughness anisotropy.
   * TODO: Implementation pending OpenPBR coat anisotropy feature availability.
   * @param value The coat anisotropy intensity value
   */
  set coatRoughnessAnisotropy(e) {
    this._material.coatRoughnessAnisotropy = e;
  }
  /**
   * Gets the coat roughness anisotropy.
   * TODO: Implementation pending OpenPBR coat anisotropy feature availability.
   * @returns Currently returns 0 as coat anisotropy is not yet available
   */
  get coatRoughnessAnisotropy() {
    return this._material.coatRoughnessAnisotropy;
  }
  /**
   * Sets the coat tangent angle for anisotropy.
   * TODO: Implementation pending OpenPBR coat anisotropy feature availability.
   * @param value The coat anisotropy rotation angle in radians
   */
  set geometryCoatTangentAngle(e) {
    this._material.geometryCoatTangentAngle = e;
  }
  /**
   * Sets the coat tangent texture for anisotropy.
   * TODO: Implementation pending OpenPBR coat anisotropy feature availability.
   * @param value The coat anisotropy texture or null
   */
  set geometryCoatTangentTexture(e) {
    this._material.geometryCoatTangentTexture = e, e && (this._material._useCoatRoughnessAnisotropyFromTangentTexture = !0);
  }
  /**
   * Gets the coat tangent texture for anisotropy.
   * TODO: Implementation pending OpenPBR coat anisotropy feature availability.
   * @returns Currently returns null as coat anisotropy is not yet available
   */
  get geometryCoatTangentTexture() {
    return this._material.geometryCoatTangentTexture;
  }
  // ========================================
  // TRANSMISSION LAYER
  // ========================================
  /**
   * Configures transmission for OpenPBR material.
   */
  configureTransmission() {
    this._material.geometryThinWalled = 1, this._material.transmissionDepth = 0;
  }
  /**
   * Sets the transmission weight.
   * @param value The transmission weight value (0-1)
   */
  set transmissionWeight(e) {
    this._material.transmissionWeight = e;
  }
  /**
   * Sets the transmission weight texture.
   * @param value The transmission weight texture or null
   */
  set transmissionWeightTexture(e) {
    this._material.transmissionWeightTexture = e;
  }
  get transmissionWeightTexture() {
    return this._material.transmissionWeightTexture;
  }
  /**
   * Gets the transmission weight.
   * @returns Currently returns 0 as transmission is not yet available
   */
  get transmissionWeight() {
    return this._material.transmissionWeight;
  }
  /**
   * Sets the transmission scatter coefficient.
   * @param value The scatter coefficient as a Vector3
   */
  set transmissionScatter(e) {
    this._material.transmissionScatter = e;
  }
  /**
   * Gets the transmission scatter coefficient.
   * @returns The scatter coefficient as a Vector3
   */
  get transmissionScatter() {
    return this._material.transmissionScatter;
  }
  /**
   * Sets the transmission scatter texture.
   * @param value The transmission scatter texture or null
   */
  set transmissionScatterTexture(e) {
    this._material.transmissionScatterTexture = e;
  }
  /**
   * Gets the transmission scatter texture.
   * @returns The transmission scatter texture or null
   */
  get transmissionScatterTexture() {
    return this._material.transmissionScatterTexture;
  }
  /**
   * Sets the transmission scattering anisotropy.
   * @param value The anisotropy intensity value (-1 to 1)
   */
  set transmissionScatterAnisotropy(e) {
    this._material.transmissionScatterAnisotropy = e;
  }
  /**
   * Sets the transmission dispersion Abbe number.
   * @param value The Abbe number value
   */
  set transmissionDispersionAbbeNumber(e) {
    this._material.transmissionDispersionAbbeNumber = e;
  }
  /**
   * Sets the transmission dispersion scale.
   * @param value The dispersion scale value
   */
  set transmissionDispersionScale(e) {
    this._material.transmissionDispersionScale = e;
  }
  /**
   * Sets the attenuation distance.
   * @param value The attenuation distance value
   */
  set transmissionDepth(e) {
    e !== Number.MAX_VALUE || this._material.transmissionDepth !== 0 ? this._material.transmissionDepth = e : this._material.transmissionDepth = 0;
  }
  /**
   * Gets the attenuation distance.
   */
  get transmissionDepth() {
    return this._material.transmissionDepth;
  }
  /**
   * Sets the attenuation color.
   * @param value The attenuation color as a Color3
   */
  set transmissionColor(e) {
    e.equals(y.White()) || (this._material.transmissionColor = e);
  }
  /**
   * Gets the attenuation color.
   */
  get transmissionColor() {
    return this._material.transmissionColor;
  }
  /**
   * Gets the refraction background texture
   * @returns The refraction background texture or null
   */
  get refractionBackgroundTexture() {
    return this._material.backgroundRefractionTexture;
  }
  /**
   * Sets the refraction background texture
   * @param value The refraction background texture or null
   */
  set refractionBackgroundTexture(e) {
    this._material.backgroundRefractionTexture = e;
  }
  // ========================================
  // VOLUME PROPERTIES
  // ========================================
  /**
   * Configures volume properties for OpenPBR material.
   */
  configureVolume() {
    this._material.geometryThinWalled = 0;
  }
  /**
   * Sets whether the material is thin-walled (i.e. non-volumetric) or not.
   */
  set geometryThinWalled(e) {
    this._material.geometryThinWalled = e ? 1 : 0;
  }
  /**
   * Gets whether the material is thin-walled (i.e. non-volumetric) or not.
   */
  get geometryThinWalled() {
    return !!this._material.geometryThinWalled;
  }
  /**
   * Sets the thickness texture.
   * @param value The thickness texture or null
   */
  set volumeThicknessTexture(e) {
    this._material.geometryThicknessTexture = e, this._material._useGeometryThicknessFromGreenChannel = !0;
  }
  /**
   * Sets the thickness factor.
   * @param value The thickness value
   */
  set volumeThickness(e) {
    this._material.geometryThickness = e;
  }
  // ========================================
  // SUBSURFACE PROPERTIES (Subsurface Scattering)
  // ========================================
  /**
   * Configures subsurface properties for PBR material
   */
  configureSubsurface() {
    this._material.geometryThinWalled = 1, this._material.subsurfaceScatterAnisotropy = 1;
  }
  /**
   * Sets the subsurface weight
   */
  set subsurfaceWeight(e) {
    this._material.subsurfaceWeight = e;
  }
  get subsurfaceWeight() {
    return this._material.subsurfaceWeight;
  }
  /**
   * Sets the subsurface weight texture
   */
  set subsurfaceWeightTexture(e) {
    this._material.subsurfaceWeightTexture = e, this._material._useSubsurfaceWeightFromTextureAlpha = !0;
  }
  get subsurfaceWeightTexture() {
    return this._material.subsurfaceWeightTexture;
  }
  /**
   * Sets the subsurface color.
   * @param value The subsurface tint color as a Color3
   */
  set subsurfaceColor(e) {
    this._material.subsurfaceColor = e;
  }
  /**
   * Sets the subsurface color texture.
   * @param value The subsurface tint texture or null
   */
  set subsurfaceColorTexture(e) {
    this._material.subsurfaceColorTexture = e;
  }
  /**
   * Sets the diffuse transmission tint of the material
   */
  set diffuseTransmissionTint(e) {
    this._diffuseTransmissionTint = e;
  }
  /**
   * Gets the diffuse transmission tint of the material
   */
  get diffuseTransmissionTint() {
    return this._diffuseTransmissionTint;
  }
  /**
   * Sets the diffuse transmission tint texture of the material
   */
  set diffuseTransmissionTintTexture(e) {
    this._diffuseTransmissionTintTexture = e;
  }
  /**
   * Gets the subsurface radius for subsurface scattering.
   * subsurfaceRadiusScale * subsurfaceRadius gives the mean free path per color channel.
   */
  get subsurfaceRadius() {
    return this._material.subsurfaceRadius;
  }
  /**
   * Sets the subsurface radius for subsurface scattering.
   * subsurfaceRadiusScale * subsurfaceRadius gives the mean free path per color channel.
   * @param value The subsurface radius value
   */
  set subsurfaceRadius(e) {
    this._material.subsurfaceRadius = e;
  }
  /**
   * Gets the subsurface radius scale for subsurface scattering.
   * subsurfaceRadiusScale * subsurfaceRadius gives the mean free path per color channel.
   */
  get subsurfaceRadiusScale() {
    return this._material.subsurfaceRadiusScale;
  }
  /**
   * Sets the subsurface radius scale for subsurface scattering.
   * subsurfaceRadiusScale * subsurfaceRadius gives the mean free path per color channel.
   * @param value The subsurface radius scale as a Color3
   */
  set subsurfaceRadiusScale(e) {
    this._material.subsurfaceRadiusScale = e;
  }
  /**
   * Sets the subsurface scattering anisotropy.
   * @param value The anisotropy intensity value
   */
  set subsurfaceScatterAnisotropy(e) {
    this._material.subsurfaceScatterAnisotropy = e;
  }
  /**
   * Does this material have a translucent surface (i.e. either transmission or subsurface)?
   * @returns True if the material is translucent, false otherwise
   */
  isTranslucent() {
    return this.transmissionWeight > 0 || this.subsurfaceWeight > 0;
  }
  // ========================================
  // FUZZ LAYER (Sheen)
  // ========================================
  /**
   * Configures fuzz for OpenPBR.
   * Enables fuzz and sets up proper configuration.
   */
  configureFuzz() {
  }
  /**
   * Sets the fuzz weight.
   * @param value The fuzz weight value
   */
  set fuzzWeight(e) {
    this._material.fuzzWeight = e;
  }
  /**
   * Sets the fuzz weight texture.
   * @param value The fuzz weight texture or null
   */
  set fuzzWeightTexture(e) {
    this._material.fuzzWeightTexture = e;
  }
  /**
   * Sets the fuzz color.
   * @param value The fuzz color as a Color3
   */
  set fuzzColor(e) {
    this._material.fuzzColor = e;
  }
  /**
   * Sets the fuzz color texture.
   * @param value The fuzz color texture or null
   */
  set fuzzColorTexture(e) {
    this._material.fuzzColorTexture = e;
  }
  /**
   * Sets the fuzz roughness.
   * @param value The fuzz roughness value (0-1)
   */
  set fuzzRoughness(e) {
    this._material.fuzzRoughness = e;
  }
  /**
   * Sets the fuzz roughness texture.
   * @param value The fuzz roughness texture or null
   */
  set fuzzRoughnessTexture(e) {
    this._material.fuzzRoughnessTexture = e, this._material._useFuzzRoughnessFromTextureAlpha = !0;
  }
  // ========================================
  // ANISOTROPY
  // ========================================
  /**
   * Sets the specular roughness anisotropy of the OpenPBR material.
   * @param value The anisotropy intensity value
   */
  set specularRoughnessAnisotropy(e) {
    this._material.specularRoughnessAnisotropy = e;
  }
  /**
   * Gets the specular roughness anisotropy of the OpenPBR material.
   * @returns The anisotropy intensity value
   */
  get specularRoughnessAnisotropy() {
    return this._material.specularRoughnessAnisotropy;
  }
  /**
   * Sets the anisotropy rotation angle.
   * @param value The anisotropy rotation angle in radians
   */
  set geometryTangentAngle(e) {
    this._material.geometryTangentAngle = e;
  }
  /**
   * Sets the geometry tangent texture for anisotropy.
   * Automatically enables using anisotropy from the tangent texture.
   * @param value The anisotropy texture or null
   */
  set geometryTangentTexture(e) {
    this._material.geometryTangentTexture = e, this._material._useSpecularRoughnessAnisotropyFromTangentTexture = !0;
  }
  /**
   * Gets the geometry tangent texture for anisotropy.
   * @returns The anisotropy texture or null
   */
  get geometryTangentTexture() {
    return this._material.geometryTangentTexture;
  }
  /**
   * Configures glTF-style anisotropy for the OpenPBR material.
   * @param useGltfStyle Whether to use glTF-style anisotropy
   */
  configureGltfStyleAnisotropy(e = !0) {
    this._material._useGltfStyleAnisotropy = e;
  }
  // ========================================
  // THIN FILM IRIDESCENCE
  // ========================================
  /**
   * Sets the thin film weight.
   * @param value The thin film weight value
   */
  set thinFilmWeight(e) {
    this._material.thinFilmWeight = e;
  }
  /**
   * Sets the thin film IOR.
   * @param value The thin film IOR value
   */
  set thinFilmIor(e) {
    this._material.thinFilmIor = e;
  }
  /**
   * Sets the thin film thickness minimum.
   * @param value The minimum thickness value in nanometers
   */
  set thinFilmThicknessMinimum(e) {
    this._material.thinFilmThicknessMin = e / 1e3;
  }
  /**
   * Sets the thin film thickness maximum.
   * @param value The maximum thickness value in nanometers
   */
  set thinFilmThicknessMaximum(e) {
    this._material.thinFilmThickness = e / 1e3;
  }
  /**
   * Sets the thin film weight texture.
   * @param value The thin film weight texture or null
   */
  set thinFilmWeightTexture(e) {
    this._material.thinFilmWeightTexture = e;
  }
  /**
   * Sets the thin film thickness texture.
   * @param value The thin film thickness texture or null
   */
  set thinFilmThicknessTexture(e) {
    this._material.thinFilmThicknessTexture = e, this._material._useThinFilmThicknessFromTextureGreen = !0;
  }
  // ========================================
  // UNLIT MATERIALS
  // ========================================
  /**
   * Sets whether the OpenPBR material is unlit.
   * @param value True to make the material unlit
   */
  set unlit(e) {
    this._material.unlit = e;
  }
  // ========================================
  // GEOMETRY PARAMETERS
  // ========================================
  /**
   * Sets the geometry opacity of the OpenPBR material.
   * @param value The opacity value (0-1)
   */
  set geometryOpacity(e) {
    this._material.geometryOpacity = e;
  }
  /**
   * Gets the geometry opacity of the OpenPBR material.
   * @returns The opacity value (0-1)
   */
  get geometryOpacity() {
    return this._material.geometryOpacity;
  }
  /**
   * Sets the geometry normal texture of the OpenPBR material.
   * @param value The normal texture or null
   */
  set geometryNormalTexture(e) {
    this._material.geometryNormalTexture = e;
  }
  /**
   * Gets the geometry normal texture of the OpenPBR material.
   * @returns The normal texture or null
   */
  get geometryNormalTexture() {
    return this._material.geometryNormalTexture;
  }
  /**
   * Sets the normal map inversions for the OpenPBR material.
   * Note: OpenPBR may handle normal map inversions differently or may not need them.
   * @param invertX Whether to invert the normal map on the X axis (may be ignored)
   * @param invertY Whether to invert the normal map on the Y axis (may be ignored)
   */
  setNormalMapInversions(e, r) {
  }
  /**
   * Sets the geometry coat normal texture of the OpenPBR material.
   * @param value The coat normal texture or null
   */
  set geometryCoatNormalTexture(e) {
    this._material.geometryCoatNormalTexture = e;
  }
  /**
   * Gets the geometry coat normal texture of the OpenPBR material.
   * @returns The coat normal texture or null
   */
  get geometryCoatNormalTexture() {
    return this._material.geometryCoatNormalTexture;
  }
  /**
   * Sets the geometry coat normal texture scale.
   * @param value The scale value for the coat normal texture
   */
  set geometryCoatNormalTextureScale(e) {
    this._material.geometryCoatNormalTexture && (this._material.geometryCoatNormalTexture.level = e);
  }
  /**
   * Finalizes material properties after all loading is complete.
   * @param loader The glTF loader; `loader._disposed` is polled between texture passes to bail early on dispose.
   */
  async finalizeAsync(e) {
    if (this._diffuseTransmissionTint && !this._diffuseTransmissionTint.equals(y.White()) || this._diffuseTransmissionTintTexture) {
      if (this._material.geometryThinWalled)
        this.subsurfaceColor = this._diffuseTransmissionTint, this.subsurfaceColorTexture = this._diffuseTransmissionTintTexture;
      else if (await this.copySurfaceToCoatAsync(e, this.subsurfaceWeight, this.subsurfaceWeightTexture, o.A, this._diffuseTransmissionTint, this._diffuseTransmissionTintTexture, !0), e._disposed)
        return;
    }
    if (this.transmissionWeight > 0) {
      if (this._material.geometryThinWalled || this._material.transmissionDepth === 0)
        this._material.transmissionColor = this._material.baseColor, this._material.transmissionColorTexture = this._material.baseColorTexture;
      else if ((!this.baseColor.equals(y.White()) || this.baseColorTexture !== null) && (await this.copySurfaceToCoatAsync(e, this.transmissionWeight, this.transmissionWeightTexture, o.R, this.baseColor, this.baseColorTexture, !1), e._disposed))
        return;
    }
    if (this._specWorkflow) {
      const r = await Q("newRoughnessTexture (" + this._material.name + ")", await te("glossiness (" + this._material.name + ")", h(this.specularColorTexture, new u(this.specularColor.r, this.specularColor.g, this.specularColor.b, this.glossiness), o.A, _.Linear), o.A, this._material.getScene(), _.Linear, c.R), this._material.getScene(), c.R, _.Linear, c.R);
      if (e._disposed) {
        r.texture?.dispose();
        return;
      }
      this.specularRoughnessTexture = r.texture, this.specularRoughness = r.factor ? r.factor.r : 1;
      const s = await ee("metallicTexture (" + this._material.name + ")", h(this.specularColorTexture, this.specularColor.toColor4(), o.RGBA, _.Linear), this._material.getScene(), !1, _.SRGB, c.RGB);
      if (e._disposed) {
        s.texture?.dispose();
        return;
      }
      this.baseMetalnessTexture = s.texture, this.baseMetalness = s.factor ? s.factor.r : 1;
      const i = await C("newBaseColor (" + this._material.name + ")", h(this.baseColorTexture, this.baseColor.toColor4(), o.RGBA, _.Linear), h(this.specularColorTexture, this.specularColor.toColor4(), o.RGBA, _.Linear), { ...s, dispose: void 0, colorSpace: _.Linear }, this._material.getScene(), _.SRGB, c.RGB);
      if (e._disposed) {
        i.texture?.dispose();
        return;
      }
      this.baseColorTexture?.dispose(), this.baseColorTexture = i.texture, this.baseColor = i.factor ? new y(i.factor.r, i.factor.g, i.factor.b) : y.White(), this.specularColorTexture?.dispose(), this.specularColorTexture = null;
    }
  }
  async copySurfaceToCoatAsync(e, r, s, i, n, l, m = !1) {
    const f = this._material.coatWeight, a = this._material.coatWeightTexture, g = this._material.coatColor.clone(), T = this._material.coatColorTexture, p = this._material.geometryCoatNormalTexture, R = new u(f, f, f, f), I = new u(r, r, r, r);
    this.coatWeightTexture = null, this.coatWeight = 1;
    const E = await Promise.allSettled([
      C("lerpExistingCoat", h(null, new u(1, 1, 1, 1)), h(T, g.toColor4(), o.RGBA, _.SRGB), h(a, R, o.R), this._material.getScene(), _.SRGB),
      C("lerpSurfaceColor", h(null, new u(1, 1, 1, 1)), h(l, n.toColor4(), o.RGBA, _.SRGB), h(s, I, i), this._material.getScene(), _.SRGB)
    ]), P = E.find((x) => x.status === "rejected");
    if (P) {
      for (const x of E)
        x.status === "fulfilled" && x.value.texture?.dispose();
      throw P.reason;
    }
    const [M, U] = E.map((x) => x.value);
    if (e._disposed) {
      M.texture?.dispose(), U.texture?.dispose();
      return;
    }
    const A = await V("newCoatColor (" + this._material.name + ")", M, U, this._material.getScene(), _.SRGB);
    if (e._disposed) {
      A.texture?.dispose();
      return;
    }
    A.texture ? (this.coatColorTexture = A.texture, this.coatColor = y.White()) : A.factor && (this.coatColorTexture = null, this.coatColor.fromArray([A.factor.r, A.factor.g, A.factor.b]));
    const z = await C("newCoatIor (" + this._material.name + ")", h(null, new u(this._material.specularIor, this._material.specularIor, this._material.specularIor, 1), o.R), h(null, new u(this.coatIor, this.coatIor, this.coatIor, 1), o.R), h(a, R, o.R), this._material.getScene());
    if (e._disposed) {
      z.texture?.dispose();
      return;
    }
    this.coatIor = z.factor ? z.factor.r : this.coatIor;
    const W = await C("newCoatRoughness (" + this._material.name + ")", h(this.specularRoughnessTexture, new u(this.specularRoughness, this.specularRoughness, this.specularRoughness, 1), o.G), h(this.coatRoughnessTexture, new u(this.coatRoughness, this.coatRoughness, this.coatRoughness, 1), o.G), h(a, R, o.R), this._material.getScene());
    if (e._disposed) {
      W.texture?.dispose();
      return;
    }
    this.coatRoughness = W.factor ? W.factor.r : 1, this.coatRoughnessTexture = W.texture;
    const L = await C("newCoatDarkening (" + this._material.name + ")", h(null, new u(0, 0, 0, 1), o.R), h(null, new u(this.coatDarkening, this.coatDarkening, this.coatDarkening, 1), o.R), h(a, R, o.R), this._material.getScene());
    if (e._disposed) {
      L.texture?.dispose();
      return;
    }
    if (this.coatDarkening = L.factor ? L.factor.r : this.coatDarkening, m) {
      const x = await C("newSpecularRoughness (" + this._material.name + ")", h(this.specularRoughnessTexture, new u(this._material.specularRoughness, this._material.specularRoughness, this._material.specularRoughness, 1), o.G), h(null, new u(1, 1, 1, 1), o.R), h(s, I, i), this._material.getScene());
      if (e._disposed) {
        x.texture?.dispose();
        return;
      }
      this.specularRoughness = x.factor ? x.factor.r : 1, this.specularRoughnessTexture = x.texture;
    }
    if (p || this.geometryNormalTexture) {
      const x = await C("newCoatNormal (" + this._material.name + ")", h(this.geometryNormalTexture, this.geometryNormalTexture ? new u(1, 1, 1, 1) : new u(0.5, 0.5, 1, 1), o.RGBA), h(p, p ? new u(1, 1, 1, 1) : new u(0.5, 0.5, 1, 1), o.RGBA), h(a, R, o.R), this._material.getScene());
      if (e._disposed) {
        x.texture?.dispose();
        return;
      }
      x.texture && (this.geometryCoatNormalTexture = x.texture);
    }
  }
}
export {
  se as OpenPBRMaterialLoadingAdapter
};
