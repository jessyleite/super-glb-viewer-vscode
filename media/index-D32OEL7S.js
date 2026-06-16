import { eS as W, dq as z, cB as H, am as G, eT as Y, eU as J, eV as X, eW as q, eX as Z, eY as Q, eZ as ee, e_ as te, e$ as se, f0 as ne, f1 as ie } from "./index--tWw_-Xm.js";
import { n as re } from "./index-__2__MqI.js";
var ae = /* @__PURE__ */ ((n) => (n.Clearcoat = "KHR_materials_clearcoat", n.Transmission = "KHR_materials_transmission", n.IOR = "KHR_materials_ior", n.Sheen = "KHR_materials_sheen", n.Volume = "KHR_materials_volume", n.Anisotropy = "KHR_materials_anisotropy", n.Iridescence = "KHR_materials_iridescence", n.Specular = "KHR_materials_specular", n.EmissiveStrength = "KHR_materials_emissive_strength", n.Dispersion = "KHR_materials_dispersion", n.Unlit = "KHR_materials_unlit", n))(ae || {}), x = /* @__PURE__ */ ((n) => (n.Scene = "scene", n.Node = "node", n.Armature = "armature", n.Bone = "bone", n.Mesh = "mesh", n.Material = "material", n.Light = "light", n.Camera = "camera", n))(x || {});
function U(n, e, i) {
  const [t, s, r] = n.getScale(), o = t * s * r, a = o === 0 ? 1 : Math.sign(o), l = e * a;
  l < 0 && n.getMesh() && i.push(n);
  for (const c of n.listChildren())
    U(c, l, i);
}
function oe(n) {
  const e = [], i = [];
  for (const t of n.getRoot().listScenes())
    for (const s of t.listChildren())
      U(s, 1, i);
  if (i.length > 0) {
    const t = i.map((s) => s.getMesh()?.getName() || s.getName() || "Mesh");
    e.push({
      id: "geometry.negative-scale",
      severity: "warning",
      category: "geometry",
      message: `${i.length} mesh(es) with negative scale. Faces will render inside-out unless you apply transforms or recalculate normals before export.`,
      affected: t
    });
  }
  return e;
}
function ce(n) {
  const e = [], i = [];
  for (const t of n.getRoot().listMeshes()) {
    const s = t.listPrimitives();
    if (s.length === 0) continue;
    s.some((o) => o.getMaterial() === null) && i.push(t.getName() || "Mesh");
  }
  if (i.length > 0) {
    const t = i.slice(0, 3).join(", "), s = i.length > 3 ? ` and ${i.length - 3} more` : "";
    e.push({
      id: "materials.no-material",
      severity: "warning",
      category: "materials",
      message: `${i.length} mesh(es) with no material: ${t}${s}. They'll render as untextured surfaces.`,
      affected: i
    });
  }
  return e;
}
const le = 64, he = 256;
function me(n) {
  const e = [];
  for (const i of n.getRoot().listSkins()) {
    const s = i.listJoints().length, r = i.getName() || "Skin";
    s > he ? e.push({
      id: "skin.bones.hard",
      severity: "error",
      category: "skinning",
      message: `Skin '${r}' has ${s} joints. Most engines cap skin matrix counts well below this — WebGL2 / glTFast around 64, mobile around 128. Cull unused bones or split the rig.`,
      affected: [r]
    }) : s > le && e.push({
      id: "skin.bones.soft",
      severity: "warning",
      category: "skinning",
      message: `Skin '${r}' has ${s} joints. Above the 64-bone WebGL2 / glTFast comfort zone — animations may render fine in desktop Three but hitch on mobile. Test on the target engine or cull non-deforming bones.`,
      affected: [r]
    });
  }
  return e;
}
function ge(n) {
  const e = [], i = n.getRoot().listAnimations();
  for (let t = 0; t < i.length; t++) {
    const s = i[t], r = s.getName() || `Animation ${t}`, o = [];
    let a = 0;
    const l = s.listChannels();
    for (let c = 0; c < l.length; c++) {
      const g = l[c];
      if (g.getTargetPath() === "pointer") {
        o.push(`channel ${c}`);
        continue;
      }
      g.getTargetNode() === null && a++;
    }
    if (o.length > 0) {
      const c = o.slice(0, 3).join(", ");
      e.push({
        id: "animation.pointer",
        severity: "warning",
        category: "animation",
        message: `Animation '${r}' has ${o.length} channel(s) Three / Babylon / PlayCanvas don't read in 2026 (${c}). They ship in the GLB but render silently as no-ops.`,
        affected: [r]
      });
    }
    a > 0 && e.push({
      id: "animation.no-target",
      severity: "error",
      category: "animation",
      message: `Animation '${r}' has ${a} channel(s) with no target — runtime will throw or skip.`,
      affected: [r]
    });
  }
  return e;
}
const ue = [
  oe,
  ce,
  me,
  ge
];
function de(n) {
  const e = [];
  for (const i of ue)
    try {
      e.push(...i(n));
    } catch (t) {
      console.warn("[warnings] rule failed:", t);
    }
  return e;
}
const fe = {
  // GPU-compressed formats - Block compression
  // 8 bytes per 4×4 block = 0.5 bytes/pixel
  "ktx2-etc1s": 0.5,
  // 4 bits per pixel
  "basis-etc1s": 0.5,
  etc1: 0.5,
  dxt1: 0.5,
  bc1: 0.5,
  bc4: 0.5,
  // 16 bytes per 4×4 block = 1 byte/pixel
  "ktx2-uastc": 1,
  // 8 bits per pixel
  "basis-uastc": 1,
  uastc: 1,
  dxt5: 1,
  bc3: 1,
  bc5: 1,
  bc7: 1,
  astc: 1,
  etc2: 1,
  // Fallback for generic formats
  ktx2: 1,
  basis: 1,
  dds: 1,
  // Standard formats (decompress to RGBA8 in GPU memory)
  jpeg: 4,
  // RGBA8 = 4 bytes per pixel
  jpg: 4,
  png: 4,
  webp: 4
};
function xe(n) {
  const e = n.toLowerCase();
  for (const [i, t] of Object.entries(fe))
    if (e.includes(i))
      return t;
  return 4;
}
function pe(n) {
  const e = n.width ?? 1024, i = n.height ?? 1024, t = e * i, s = 1.333, r = xe(n.mimeType);
  return Math.ceil(t * r * s);
}
function we(n) {
  return n < 1024 ? `${n.toFixed(2)} B` : n < 1024 * 1024 ? `${(n / 1024).toFixed(2)} KB` : `${(n / (1024 * 1024)).toFixed(2)} MB`;
}
const B = {
  5120: 1,
  // BYTE
  5121: 1,
  // UNSIGNED_BYTE
  5122: 2,
  // SHORT
  5123: 2,
  // UNSIGNED_SHORT
  5125: 4,
  // UNSIGNED_INT
  5126: 4
  // FLOAT
}, _e = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
};
function ye(n) {
  let e = 0;
  for (const i of n.listPrimitives()) {
    const t = i.getIndices();
    if (t) {
      const r = B[t.getComponentType()] ?? 4;
      e += t.getCount() * r;
    }
    const s = i.listSemantics();
    for (const r of s) {
      const o = i.getAttribute(r);
      if (o) {
        const a = B[o.getComponentType()] ?? 4, l = _e[o.getType()] ?? 1;
        e += o.getCount() * l * a;
      }
    }
  }
  return e;
}
const be = /* @__PURE__ */ new Set([
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/webp",
  "image/avif",
  "image/svg+xml",
  "image/bmp"
]);
function Se(n) {
  return be.has(n);
}
const I = new z(), E = new G();
function v(n, e, i, t) {
  const s = e ?? /* @__PURE__ */ new Set(), r = i ?? /* @__PURE__ */ new Set(), o = t ?? /* @__PURE__ */ new Set(), a = {
    meshes: 0,
    materials: 0,
    textures: 0,
    triangles: 0,
    textureVRAM: 0,
    geometryVRAM: 0
  };
  if (n.type === x.Mesh) {
    const l = n.gltfRef;
    s.has(l) || (s.add(l), a.meshes = 1, a.triangles = n.metadata?.triangleCount || 0, a.geometryVRAM = n.metadata?.geometryVRAM || 0);
  } else if (n.type === x.Material) {
    const l = n.gltfRef;
    if (!r.has(l)) {
      r.add(l), a.materials = 1;
      const c = n.metadata?.textures;
      if (c)
        for (const g of c) {
          const h = g.gltfRef;
          h && !o.has(h) ? (o.add(h), a.textures += 1, a.textureVRAM += g.vram) : h || (a.textures += 1, a.textureVRAM += g.vram);
        }
    }
  }
  for (const l of n.children) {
    const c = v(l, s, r, o);
    a.meshes += c.meshes, a.materials += c.materials, a.textures += c.textures, a.triangles += c.triangles, a.textureVRAM += c.textureVRAM, a.geometryVRAM += c.geometryVRAM;
  }
  return n.metadata = { ...n.metadata, stats: a }, a;
}
function P(n, e) {
  const i = n.getRoot(), t = i.listScenes();
  if (t.length === 0)
    return null;
  const s = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set();
  for (const m of i.listSkins()) {
    for (const _ of m.listJoints())
      s.add(_);
    const p = m.getSkeleton();
    p && r.add(p);
  }
  let o = 0;
  const a = () => `node-${o++}`, l = (m) => {
    const p = [];
    let _ = x.Node;
    r.has(m) ? _ = x.Armature : s.has(m) && (_ = x.Bone);
    const d = m.getName();
    let u;
    if (d)
      u = d;
    else
      switch (_) {
        case x.Armature:
          u = "Armature";
          break;
        case x.Bone:
          u = "Bone";
          break;
        default:
          u = "Node";
      }
    for (const k of m.listChildren())
      p.push(l(k));
    const y = m.getMesh();
    if (y) {
      let k = 0;
      for (const C of y.listPrimitives()) {
        const f = C.getIndices();
        f && (k += f.getCount() / 3);
      }
      const O = ye(y), K = {
        id: a(),
        name: y.getName() || "Mesh",
        type: x.Mesh,
        children: [],
        gltfRef: y,
        metadata: { triangleCount: k, geometryVRAM: O }
      }, A = /* @__PURE__ */ new Set();
      for (const C of y.listPrimitives()) {
        const f = C.getMaterial();
        if (f && !A.has(f)) {
          A.add(f);
          const T = [], L = [
            { texture: f.getBaseColorTexture(), slot: "baseColor" },
            { texture: f.getNormalTexture(), slot: "normal" },
            { texture: f.getMetallicRoughnessTexture(), slot: "metallicRoughness" },
            { texture: f.getOcclusionTexture(), slot: "occlusion" },
            { texture: f.getEmissiveTexture(), slot: "emissive" }
          ];
          for (const { texture: b, slot: $ } of L)
            if (b) {
              const M = b.getMimeType(), N = b.getURI(), D = N ? N.split("/").pop()?.split("?")[0] : null, V = b.getName() || D || "Embedded", w = {
                slot: $,
                name: V,
                mimeType: M,
                width: b.getSize()?.[0],
                height: b.getSize()?.[1],
                vram: 0,
                gltfRef: b
              };
              w.vram = pe(w);
              const F = b.getImage();
              if (F && M && Se(M)) {
                const j = new Blob([F], { type: M });
                w.previewUrl = URL.createObjectURL(j), e.push(w.previewUrl);
              }
              T.push(w);
            }
          K.children.push({
            id: a(),
            name: f.getName() || "Material",
            type: x.Material,
            children: [],
            gltfRef: f,
            metadata: { textures: T }
          });
        }
      }
      p.push(K);
    }
    const S = m.getExtension("KHR_lights_punctual");
    S && p.push({
      id: a(),
      name: S.getName() || "Light",
      type: x.Light,
      children: [],
      gltfRef: S
    });
    const R = m.getCamera();
    return R && p.push({
      id: a(),
      name: R.getName() || "Camera",
      type: x.Camera,
      children: [],
      gltfRef: R
    }), {
      id: a(),
      name: u,
      type: _,
      children: p,
      gltfRef: m
    };
  }, c = i.getDefaultScene() ?? t[0], g = [];
  for (const m of c.listChildren())
    g.push(l(m));
  const h = {
    id: a(),
    name: c.getName() || "Scene",
    type: x.Scene,
    children: g,
    gltfRef: c
  };
  return v(h), h;
}
class Ee {
  state;
  io = null;
  onStateChange = null;
  texturePreviewUrls = [];
  constructor() {
    this.state = {
      document: null,
      originalBlob: null,
      sceneGraph: null,
      selectedNode: null,
      isDirty: !1,
      isLoading: !1,
      error: null
    };
  }
  /**
   * Initialize WebIO with required extensions and dependencies
   */
  async initIOInstance() {
    return this.io ? this.io : (this.io = await W(), this.io);
  }
  /**
   * Get the current state
   */
  getState() {
    return { ...this.state };
  }
  /**
   * Set callback for state changes
   */
  setOnStateChange(e) {
    this.onStateChange = e;
  }
  /**
   * Emit state change event
   */
  emitStateChange() {
    this.onStateChange && this.onStateChange(this.getState());
  }
  /**
   * Update internal state and emit change
   */
  setState(e) {
    this.state = { ...this.state, ...e }, this.emitStateChange();
  }
  /**
   * Load a GLB or GLTF blob
   * @param blob The main file blob (GLB or GLTF)
   * @param resources Optional map of filename -> blobUrl for external resources
   */
  async loadBlob(e, i) {
    let t;
    i && (t = /* @__PURE__ */ new Map(), i.getAllFiles().forEach((s) => {
      t.set(s.name, s.blobUrl);
    })), this.setState({ isLoading: !0, error: null }), this.revokeTextureUrls();
    try {
      const s = await this.initIOInstance(), r = await e.arrayBuffer(), o = new Uint8Array(r), a = new Uint32Array(r.slice(0, 4))[0] === 1179937895;
      let l;
      if (a)
        l = await s.readBinary(o);
      else {
        const h = new TextDecoder().decode(o), m = JSON.parse(h), p = {}, _ = async (d) => {
          if (!d || d.startsWith("data:")) return null;
          const u = d.split("/").pop() || d, y = decodeURIComponent(u), S = t?.get(y) || t?.get(u);
          if (S)
            try {
              const k = await (await fetch(S)).arrayBuffer();
              return p[u] = new Uint8Array(k), u;
            } catch (R) {
              console.warn(`Failed to fetch resource ${u}:`, R);
            }
          return null;
        };
        if (m.buffers)
          for (const d of m.buffers) {
            const u = await _(d.uri);
            u && (d.uri = u);
          }
        if (m.images)
          for (const d of m.images) {
            const u = await _(d.uri);
            u && (d.uri = u);
          }
        l = await s.readJSON({
          json: m,
          resources: p
        });
      }
      const c = P(l, this.texturePreviewUrls);
      this.setState({
        document: l,
        originalBlob: e,
        sceneGraph: c,
        selectedNode: null,
        isDirty: !1,
        isLoading: !1,
        error: null
      });
    } catch (s) {
      const r = s instanceof Error ? s.message : "Failed to parse model";
      this.setState({
        isLoading: !1,
        error: r
      });
    }
  }
  /**
   * Revoke all texture preview Object URLs to free memory
   */
  revokeTextureUrls() {
    for (const e of this.texturePreviewUrls)
      URL.revokeObjectURL(e);
    this.texturePreviewUrls = [];
  }
  /**
   * Clear all data
   */
  clear() {
    this.revokeTextureUrls(), this.state = {
      document: null,
      originalBlob: null,
      sceneGraph: null,
      selectedNode: null,
      isDirty: !1,
      isLoading: !1,
      error: null
    }, this.emitStateChange();
  }
  /**
   * Dispose all resources - call this when done using the API
   */
  dispose() {
    this.clear(), this.io = null, this.onStateChange = null;
  }
  /**
   * Select a node by ID
   */
  selectNode(e) {
    if (!e) {
      this.setState({ selectedNode: null });
      return;
    }
    const i = (s, r) => {
      if (s.id === r) return s;
      for (const o of s.children) {
        const a = i(o, r);
        if (a) return a;
      }
      return null;
    }, t = this.state.sceneGraph ? i(this.state.sceneGraph, e) : null;
    this.setState({ selectedNode: t });
  }
  /**
   * Update a material property
   */
  updateMaterialProperty(e, i, t) {
    switch (i) {
      case "baseColorFactor":
        e.setBaseColorFactor(t);
        break;
      case "metallicFactor":
        e.setMetallicFactor(t);
        break;
      case "roughnessFactor":
        e.setRoughnessFactor(t);
        break;
      case "emissiveFactor":
        e.setEmissiveFactor(t);
        break;
      case "normalScale":
        e.setNormalScale(t);
        break;
      case "occlusionStrength":
        e.setOcclusionStrength(t);
        break;
      case "alphaMode":
        e.setAlphaMode(t);
        break;
      case "alphaCutoff":
        e.setAlphaCutoff(t);
        break;
      case "doubleSided":
        e.setDoubleSided(t);
        break;
      // Extension properties
      case "clearcoatFactor": {
        e.getExtension("KHR_materials_clearcoat")?.setClearcoatFactor(t);
        break;
      }
      case "clearcoatRoughnessFactor": {
        e.getExtension("KHR_materials_clearcoat")?.setClearcoatRoughnessFactor(t);
        break;
      }
      case "transmissionFactor": {
        e.getExtension("KHR_materials_transmission")?.setTransmissionFactor(t);
        break;
      }
      case "ior": {
        e.getExtension("KHR_materials_ior")?.setIOR(t);
        break;
      }
      case "sheenColorFactor": {
        e.getExtension("KHR_materials_sheen")?.setSheenColorFactor(t);
        break;
      }
      case "sheenRoughnessFactor": {
        e.getExtension("KHR_materials_sheen")?.setSheenRoughnessFactor(t);
        break;
      }
      case "thicknessFactor": {
        e.getExtension("KHR_materials_volume")?.setThicknessFactor(t);
        break;
      }
      case "anisotropyStrength": {
        e.getExtension("KHR_materials_anisotropy")?.setAnisotropyStrength(t);
        break;
      }
      case "anisotropyRotation": {
        e.getExtension("KHR_materials_anisotropy")?.setAnisotropyRotation(t);
        break;
      }
      case "iridescenceFactor": {
        e.getExtension("KHR_materials_iridescence")?.setIridescenceFactor(t);
        break;
      }
      case "iridescenceIOR": {
        e.getExtension("KHR_materials_iridescence")?.setIridescenceIOR(t);
        break;
      }
      case "iridescenceThicknessMinimum": {
        e.getExtension("KHR_materials_iridescence")?.setIridescenceThicknessMinimum(t);
        break;
      }
      case "iridescenceThicknessMaximum": {
        e.getExtension("KHR_materials_iridescence")?.setIridescenceThicknessMaximum(t);
        break;
      }
      case "specularFactor": {
        e.getExtension("KHR_materials_specular")?.setSpecularFactor(t);
        break;
      }
      case "specularColorFactor": {
        e.getExtension("KHR_materials_specular")?.setSpecularColorFactor(t);
        break;
      }
      case "emissiveStrength": {
        e.getExtension("KHR_materials_emissive_strength")?.setEmissiveStrength(t);
        break;
      }
      case "dispersion": {
        e.getExtension("KHR_materials_dispersion")?.setDispersion(t);
        break;
      }
    }
    this.setState({ isDirty: !0 });
  }
  /**
   * Update a node transform
   */
  updateNodeTransform(e, i, t) {
    switch (i) {
      case "translation":
        e.setTranslation(t);
        break;
      case "rotation": {
        I.set(
          H.degToRad(t[0]),
          H.degToRad(t[1]),
          H.degToRad(t[2]),
          "XYZ"
        ), E.setFromEuler(I), e.setRotation([E.x, E.y, E.z, E.w]);
        break;
      }
      case "scale":
        e.setScale(t);
        break;
    }
    this.setState({ isDirty: !0 });
  }
  /**
   * Update a light property
   */
  updateLightProperty(e, i, t) {
    switch (i) {
      case "intensity":
        e.setIntensity(t);
        break;
      case "color":
        e.setColor(t);
        break;
      case "range":
        e.setRange(t);
        break;
      case "innerConeAngle":
        e.setInnerConeAngle(t);
        break;
      case "outerConeAngle":
        e.setOuterConeAngle(t);
        break;
    }
    this.setState({ isDirty: !0 });
  }
  /**
   * Add a material extension
   */
  addMaterialExtension(e, i) {
    const { document: t } = this.state;
    if (t) {
      switch (i) {
        case "KHR_materials_clearcoat": {
          const r = t.createExtension(ie).createClearcoat();
          e.setExtension("KHR_materials_clearcoat", r);
          break;
        }
        case "KHR_materials_transmission": {
          const r = t.createExtension(ne).createTransmission();
          e.setExtension("KHR_materials_transmission", r);
          break;
        }
        case "KHR_materials_ior": {
          const r = t.createExtension(se).createIOR();
          e.setExtension("KHR_materials_ior", r);
          break;
        }
        case "KHR_materials_sheen": {
          const r = t.createExtension(te).createSheen();
          e.setExtension("KHR_materials_sheen", r);
          break;
        }
        case "KHR_materials_volume": {
          const r = t.createExtension(ee).createVolume();
          e.setExtension("KHR_materials_volume", r);
          break;
        }
        case "KHR_materials_anisotropy": {
          const r = t.createExtension(Q).createAnisotropy();
          e.setExtension("KHR_materials_anisotropy", r);
          break;
        }
        case "KHR_materials_iridescence": {
          const r = t.createExtension(Z).createIridescence();
          e.setExtension("KHR_materials_iridescence", r);
          break;
        }
        case "KHR_materials_specular": {
          const r = t.createExtension(q).createSpecular();
          e.setExtension("KHR_materials_specular", r);
          break;
        }
        case "KHR_materials_emissive_strength": {
          const r = t.createExtension(X).createEmissiveStrength();
          e.setExtension("KHR_materials_emissive_strength", r);
          break;
        }
        case "KHR_materials_dispersion": {
          const r = t.createExtension(J).createDispersion();
          e.setExtension("KHR_materials_dispersion", r);
          break;
        }
        case "KHR_materials_unlit": {
          const r = t.createExtension(Y).createUnlit();
          e.setExtension("KHR_materials_unlit", r);
          break;
        }
      }
      this.setState({ isDirty: !0 });
    }
  }
  removeMaterialExtension(e, i) {
    e.setExtension(i, null), this.setState({ isDirty: !0 });
  }
  /**
   * Apply changes and export as blob
   */
  async applyChanges() {
    if (!this.state.document)
      throw new Error("No document loaded");
    try {
      this.io || await this.initIOInstance();
      const e = await this.io.writeBinary(this.state.document), i = new Blob([e], { type: "model/gltf-binary" });
      return this.setState({
        isDirty: !1
      }), i;
    } catch (e) {
      const i = e instanceof Error ? e.message : "Failed to export GLB";
      throw this.setState({
        error: i
      }), e;
    }
  }
  /**
   * Reset to original blob
   */
  async reset() {
    if (!this.state.originalBlob) return;
    const e = this.state.selectedNode?.id ?? null;
    this.setState({ isLoading: !0, error: null }), this.revokeTextureUrls();
    try {
      this.io || await this.initIOInstance();
      const i = await this.state.originalBlob.arrayBuffer(), t = new Uint8Array(i), s = await this.io.readBinary(t), r = P(s, this.texturePreviewUrls);
      let o = null;
      if (e && r) {
        const a = (l, c) => {
          if (l.id === c) return l;
          for (const g of l.children) {
            const h = a(g, c);
            if (h) return h;
          }
          return null;
        };
        o = a(r, e);
      }
      this.setState({
        document: s,
        sceneGraph: r,
        selectedNode: o,
        isDirty: !1,
        isLoading: !1,
        error: null
      });
    } catch (i) {
      const t = i instanceof Error ? i.message : "Failed to reset";
      throw this.setState({
        isLoading: !1,
        error: t
      }), i;
    }
  }
  /**
   * Get animation tracks from the loaded document
   * Note: Returns actual names from glTF (may be empty strings).
   * Use displayName for UI and name for API calls.
   */
  getAnimationTracks() {
    return this.state.document ? this.state.document.getRoot().listAnimations().map((t, s) => {
      let r = 0;
      for (const a of t.listChannels()) {
        const l = a.getSampler();
        if (l) {
          const c = l.getInput();
          if (c) {
            const g = c.getArray();
            if (g && g.length > 0) {
              const h = g[g.length - 1];
              h > r && (r = h);
            }
          }
        }
      }
      const o = t.getName();
      return {
        name: re(o || `Animation ${s}`),
        displayName: o || `Animation ${s}`,
        duration: r
      };
    }) : [];
  }
  /**
   * Run all warning rules against the loaded document.
   * Returns an empty array if no document is loaded.
   */
  getWarnings() {
    return this.state.document ? de(this.state.document) : [];
  }
  /**
   * Get blend shapes (morph targets) from the loaded document
   * Returns all blend shapes across all meshes in the document
   */
  getBlendShapes() {
    if (!this.state.document) return [];
    const e = this.state.document.getRoot(), i = [];
    for (const t of e.listMeshes()) {
      const s = t.getName() || "Mesh", o = t.getExtras()?.targetNames ?? [], a = t.listPrimitives();
      if (a.length === 0) continue;
      const c = a[0].listTargets();
      if (c.length === 0) continue;
      let g = [];
      for (const h of e.listNodes())
        if (h.getMesh() === t) {
          const m = h.getWeights();
          if (m.length > 0) {
            g = m;
            break;
          }
        }
      for (let h = 0; h < c.length; h++) {
        const m = o[h] || `BlendShape ${h}`;
        i.push({
          name: m,
          meshName: s,
          index: h,
          defaultWeight: g[h] ?? 0
        });
      }
    }
    return i;
  }
}
export {
  Ee as InspectorAPI,
  ae as MaterialExtension,
  x as SceneGraphNodeType,
  ye as estimateGeometryVRAM,
  pe as estimateTextureVRAM,
  we as formatBytes,
  de as runWarningChecks
};
