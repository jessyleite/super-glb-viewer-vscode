import { eQ as $, c8 as z, cz as A, a5 as W, eR as Y, eS as J, eT as G, eU as Q, eV as X } from "./index-BrYo9Yjb.js";
import { n as q } from "./index-BwuObN8-.js";
var Z = /* @__PURE__ */ ((s) => (s.Clearcoat = "KHR_materials_clearcoat", s.Transmission = "KHR_materials_transmission", s.IOR = "KHR_materials_ior", s.Sheen = "KHR_materials_sheen", s.Volume = "KHR_materials_volume", s))(Z || {}), x = /* @__PURE__ */ ((s) => (s.Scene = "scene", s.Node = "node", s.Armature = "armature", s.Bone = "bone", s.Mesh = "mesh", s.Material = "material", s.Light = "light", s.Camera = "camera", s))(x || {});
const ee = {
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
function te(s) {
  const e = s.toLowerCase();
  for (const [n, t] of Object.entries(ee))
    if (e.includes(n))
      return t;
  return 4;
}
function se(s) {
  const e = s.width ?? 1024, n = s.height ?? 1024, t = e * n, a = 1.333, r = te(s.mimeType);
  return Math.ceil(t * r * a);
}
function le(s) {
  return s < 1024 ? `${s.toFixed(2)} B` : s < 1024 * 1024 ? `${(s / 1024).toFixed(2)} KB` : `${(s / (1024 * 1024)).toFixed(2)} MB`;
}
const P = {
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
}, ne = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
};
function ae(s) {
  let e = 0;
  for (const n of s.listPrimitives()) {
    const t = n.getIndices();
    if (t) {
      const r = P[t.getComponentType()] ?? 4;
      e += t.getCount() * r;
    }
    const a = n.listSemantics();
    for (const r of a) {
      const h = n.getAttribute(r);
      if (h) {
        const o = P[h.getComponentType()] ?? 4, i = ne[h.getType()] ?? 1;
        e += h.getCount() * i * o;
      }
    }
  }
  return e;
}
const re = /* @__PURE__ */ new Set([
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/webp",
  "image/avif",
  "image/svg+xml",
  "image/bmp"
]);
function oe(s) {
  return re.has(s);
}
const K = new z(), M = new W();
function H(s, e, n, t) {
  const a = e ?? /* @__PURE__ */ new Set(), r = n ?? /* @__PURE__ */ new Set(), h = t ?? /* @__PURE__ */ new Set(), o = {
    meshes: 0,
    materials: 0,
    textures: 0,
    triangles: 0,
    textureVRAM: 0,
    geometryVRAM: 0
  };
  if (s.type === x.Mesh) {
    const i = s.gltfRef;
    a.has(i) || (a.add(i), o.meshes = 1, o.triangles = s.metadata?.triangleCount || 0, o.geometryVRAM = s.metadata?.geometryVRAM || 0);
  } else if (s.type === x.Material) {
    const i = s.gltfRef;
    if (!r.has(i)) {
      r.add(i), o.materials = 1;
      const l = s.metadata?.textures;
      if (l)
        for (const m of l) {
          const c = m.gltfRef;
          c && !h.has(c) ? (h.add(c), o.textures += 1, o.textureVRAM += m.vram) : c || (o.textures += 1, o.textureVRAM += m.vram);
        }
    }
  }
  for (const i of s.children) {
    const l = H(i, a, r, h);
    o.meshes += l.meshes, o.materials += l.materials, o.textures += l.textures, o.triangles += l.triangles, o.textureVRAM += l.textureVRAM, o.geometryVRAM += l.geometryVRAM;
  }
  return s.metadata = { ...s.metadata, stats: o }, o;
}
function U(s, e) {
  const n = s.getRoot(), t = n.listScenes();
  if (t.length === 0)
    return null;
  const a = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set();
  for (const u of n.listSkins()) {
    for (const S of u.listJoints())
      a.add(S);
    const p = u.getSkeleton();
    p && r.add(p);
  }
  let h = 0;
  const o = () => `node-${h++}`, i = (u) => {
    const p = [];
    let S = x.Node;
    r.has(u) ? S = x.Armature : a.has(u) && (S = x.Bone);
    const f = u.getName();
    let g;
    if (f)
      g = f;
    else
      switch (S) {
        case x.Armature:
          g = "Armature";
          break;
        case x.Bone:
          g = "Bone";
          break;
        default:
          g = "Node";
      }
    for (const _ of u.listChildren())
      p.push(i(_));
    const b = u.getMesh();
    if (b) {
      let _ = 0;
      for (const E of b.listPrimitives()) {
        const d = E.getIndices();
        d && (_ += d.getCount() / 3);
      }
      const O = ae(b), T = {
        id: o(),
        name: b.getName() || "Mesh",
        type: x.Mesh,
        children: [],
        gltfRef: b,
        metadata: { triangleCount: _, geometryVRAM: O }
      }, N = /* @__PURE__ */ new Set();
      for (const E of b.listPrimitives()) {
        const d = E.getMaterial();
        if (d && !N.has(d)) {
          N.add(d);
          const B = [], L = [
            { texture: d.getBaseColorTexture(), slot: "baseColor" },
            { texture: d.getNormalTexture(), slot: "normal" },
            { texture: d.getMetallicRoughnessTexture(), slot: "metallicRoughness" },
            { texture: d.getOcclusionTexture(), slot: "occlusion" },
            { texture: d.getEmissiveTexture(), slot: "emissive" }
          ];
          for (const { texture: y, slot: V } of L)
            if (y) {
              const k = y.getMimeType(), F = y.getURI(), v = F ? F.split("/").pop()?.split("?")[0] : null, D = y.getName() || v || "Embedded", C = {
                slot: V,
                name: D,
                mimeType: k,
                width: y.getSize()?.[0],
                height: y.getSize()?.[1],
                vram: 0,
                gltfRef: y
              };
              C.vram = se(C);
              const I = y.getImage();
              if (I && k && oe(k)) {
                const j = new Blob([I], { type: k });
                C.previewUrl = URL.createObjectURL(j), e.push(C.previewUrl);
              }
              B.push(C);
            }
          T.children.push({
            id: o(),
            name: d.getName() || "Material",
            type: x.Material,
            children: [],
            gltfRef: d,
            metadata: { textures: B }
          });
        }
      }
      p.push(T);
    }
    const R = u.getExtension("KHR_lights_punctual");
    R && p.push({
      id: o(),
      name: R.getName() || "Light",
      type: x.Light,
      children: [],
      gltfRef: R
    });
    const w = u.getCamera();
    return w && p.push({
      id: o(),
      name: w.getName() || "Camera",
      type: x.Camera,
      children: [],
      gltfRef: w
    }), {
      id: o(),
      name: g,
      type: S,
      children: p,
      gltfRef: u
    };
  }, l = n.getDefaultScene() ?? t[0], m = [];
  for (const u of l.listChildren())
    m.push(i(u));
  const c = {
    id: o(),
    name: l.getName() || "Scene",
    type: x.Scene,
    children: m,
    gltfRef: l
  };
  return H(c), c;
}
class ue {
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
    return this.io ? this.io : (this.io = await $(), this.io);
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
  async loadBlob(e, n) {
    let t;
    n && (t = /* @__PURE__ */ new Map(), n.getAllFiles().forEach((a) => {
      t.set(a.name, a.blobUrl);
    })), this.setState({ isLoading: !0, error: null }), this.revokeTextureUrls();
    try {
      const a = await this.initIOInstance(), r = await e.arrayBuffer(), h = new Uint8Array(r), o = new Uint32Array(r.slice(0, 4))[0] === 1179937895;
      let i;
      if (o)
        i = await a.readBinary(h);
      else {
        const c = new TextDecoder().decode(h), u = JSON.parse(c), p = {}, S = async (f) => {
          if (!f || f.startsWith("data:")) return null;
          const g = f.split("/").pop() || f, b = decodeURIComponent(g), R = t?.get(b) || t?.get(g);
          if (R)
            try {
              const _ = await (await fetch(R)).arrayBuffer();
              return p[g] = new Uint8Array(_), g;
            } catch (w) {
              console.warn(`Failed to fetch resource ${g}:`, w);
            }
          return null;
        };
        if (u.buffers)
          for (const f of u.buffers) {
            const g = await S(f.uri);
            g && (f.uri = g);
          }
        if (u.images)
          for (const f of u.images) {
            const g = await S(f.uri);
            g && (f.uri = g);
          }
        i = await a.readJSON({
          json: u,
          resources: p
        });
      }
      const l = U(i, this.texturePreviewUrls);
      this.setState({
        document: i,
        originalBlob: e,
        sceneGraph: l,
        selectedNode: null,
        isDirty: !1,
        isLoading: !1,
        error: null
      });
    } catch (a) {
      const r = a instanceof Error ? a.message : "Failed to parse model";
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
    const n = (a, r) => {
      if (a.id === r) return a;
      for (const h of a.children) {
        const o = n(h, r);
        if (o) return o;
      }
      return null;
    }, t = this.state.sceneGraph ? n(this.state.sceneGraph, e) : null;
    this.setState({ selectedNode: t });
  }
  /**
   * Update a material property
   */
  updateMaterialProperty(e, n, t) {
    switch (n) {
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
    }
    this.setState({ isDirty: !0 });
  }
  /**
   * Update a node transform
   */
  updateNodeTransform(e, n, t) {
    switch (n) {
      case "translation":
        e.setTranslation(t);
        break;
      case "rotation": {
        K.set(
          A.degToRad(t[0]),
          A.degToRad(t[1]),
          A.degToRad(t[2]),
          "XYZ"
        ), M.setFromEuler(K), e.setRotation([M.x, M.y, M.z, M.w]);
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
  updateLightProperty(e, n, t) {
    switch (n) {
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
  addMaterialExtension(e, n) {
    const { document: t } = this.state;
    if (t) {
      switch (n) {
        case "KHR_materials_clearcoat": {
          const r = t.createExtension(X).createClearcoat();
          e.setExtension("KHR_materials_clearcoat", r);
          break;
        }
        case "KHR_materials_transmission": {
          const r = t.createExtension(Q).createTransmission();
          e.setExtension("KHR_materials_transmission", r);
          break;
        }
        case "KHR_materials_ior": {
          const r = t.createExtension(G).createIOR();
          e.setExtension("KHR_materials_ior", r);
          break;
        }
        case "KHR_materials_sheen": {
          const r = t.createExtension(J).createSheen();
          e.setExtension("KHR_materials_sheen", r);
          break;
        }
        case "KHR_materials_volume": {
          const r = t.createExtension(Y).createVolume();
          e.setExtension("KHR_materials_volume", r);
          break;
        }
      }
      this.setState({ isDirty: !0 });
    }
  }
  removeMaterialExtension(e, n) {
    e.setExtension(n, null), this.setState({ isDirty: !0 });
  }
  /**
   * Apply changes and export as blob
   */
  async applyChanges() {
    if (!this.state.document)
      throw new Error("No document loaded");
    try {
      this.io || await this.initIOInstance();
      const e = await this.io.writeBinary(this.state.document), n = new Blob([e], { type: "model/gltf-binary" });
      return this.setState({
        isDirty: !1
      }), n;
    } catch (e) {
      const n = e instanceof Error ? e.message : "Failed to export GLB";
      throw this.setState({
        error: n
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
      const n = await this.state.originalBlob.arrayBuffer(), t = new Uint8Array(n), a = await this.io.readBinary(t), r = U(a, this.texturePreviewUrls);
      let h = null;
      if (e && r) {
        const o = (i, l) => {
          if (i.id === l) return i;
          for (const m of i.children) {
            const c = o(m, l);
            if (c) return c;
          }
          return null;
        };
        h = o(r, e);
      }
      this.setState({
        document: a,
        sceneGraph: r,
        selectedNode: h,
        isDirty: !1,
        isLoading: !1,
        error: null
      });
    } catch (n) {
      const t = n instanceof Error ? n.message : "Failed to reset";
      throw this.setState({
        isLoading: !1,
        error: t
      }), n;
    }
  }
  /**
   * Get animation tracks from the loaded document
   * Note: Returns actual names from glTF (may be empty strings).
   * Use displayName for UI and name for API calls.
   */
  getAnimationTracks() {
    return this.state.document ? this.state.document.getRoot().listAnimations().map((t, a) => {
      let r = 0;
      for (const o of t.listChannels()) {
        const i = o.getSampler();
        if (i) {
          const l = i.getInput();
          if (l) {
            const m = l.getArray();
            if (m && m.length > 0) {
              const c = m[m.length - 1];
              c > r && (r = c);
            }
          }
        }
      }
      const h = t.getName();
      return {
        name: q(h || `Animation ${a}`),
        displayName: h || `Animation ${a}`,
        duration: r
      };
    }) : [];
  }
  /**
   * Get blend shapes (morph targets) from the loaded document
   * Returns all blend shapes across all meshes in the document
   */
  getBlendShapes() {
    if (!this.state.document) return [];
    const e = this.state.document.getRoot(), n = [];
    for (const t of e.listMeshes()) {
      const a = t.getName() || "Mesh", h = t.getExtras()?.targetNames ?? [], o = t.listPrimitives();
      if (o.length === 0) continue;
      const l = o[0].listTargets();
      if (l.length === 0) continue;
      let m = [];
      for (const c of e.listNodes())
        if (c.getMesh() === t) {
          const u = c.getWeights();
          if (u.length > 0) {
            m = u;
            break;
          }
        }
      for (let c = 0; c < l.length; c++) {
        const u = h[c] || `BlendShape ${c}`;
        n.push({
          name: u,
          meshName: a,
          index: c,
          defaultWeight: m[c] ?? 0
        });
      }
    }
    return n;
  }
}
export {
  ue as InspectorAPI,
  Z as MaterialExtension,
  x as SceneGraphNodeType,
  ae as estimateGeometryVRAM,
  se as estimateTextureVRAM,
  le as formatBytes
};
