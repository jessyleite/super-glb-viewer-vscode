import { cL as $, cu as E, a2 as W } from "./index-1fHvDm8K.js";
import { i as z, e as Y, f as J, g as G, h as X, j as q } from "./gltfIO-Ce7kfg7O.js";
import { n as Q } from "./index-DU2q2Z5D.js";
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
function me(s) {
  return s < 1024 ? `${s.toFixed(2)} B` : s < 1024 * 1024 ? `${(s / 1024).toFixed(2)} KB` : `${(s / (1024 * 1024)).toFixed(2)} MB`;
}
const I = {
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
}, ae = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
};
function ne(s) {
  let e = 0;
  for (const n of s.listPrimitives()) {
    const t = n.getIndices();
    if (t) {
      const r = I[t.getComponentType()] ?? 4;
      e += t.getCount() * r;
    }
    const a = n.listSemantics();
    for (const r of a) {
      const h = n.getAttribute(r);
      if (h) {
        const o = I[h.getComponentType()] ?? 4, l = ae[h.getType()] ?? 1;
        e += h.getCount() * l * o;
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
const K = new $(), M = new W();
function U(s, e, n, t) {
  const a = e ?? /* @__PURE__ */ new Set(), r = n ?? /* @__PURE__ */ new Set(), h = t ?? /* @__PURE__ */ new Set(), o = {
    meshes: 0,
    materials: 0,
    textures: 0,
    triangles: 0,
    textureVRAM: 0,
    geometryVRAM: 0
  };
  if (s.type === x.Mesh) {
    const l = s.gltfRef;
    a.has(l) || (a.add(l), o.meshes = 1, o.triangles = s.metadata?.triangleCount || 0, o.geometryVRAM = s.metadata?.geometryVRAM || 0);
  } else if (s.type === x.Material) {
    const l = s.gltfRef;
    if (!r.has(l)) {
      r.add(l), o.materials = 1;
      const m = s.metadata?.textures;
      if (m)
        for (const g of m) {
          const c = g.gltfRef;
          c && !h.has(c) ? (h.add(c), o.textures += 1, o.textureVRAM += g.vram) : c || (o.textures += 1, o.textureVRAM += g.vram);
        }
    }
  }
  for (const l of s.children) {
    const m = U(l, a, r, h);
    o.meshes += m.meshes, o.materials += m.materials, o.textures += m.textures, o.triangles += m.triangles, o.textureVRAM += m.textureVRAM, o.geometryVRAM += m.geometryVRAM;
  }
  return s.metadata = { ...s.metadata, stats: o }, o;
}
function H(s, e) {
  const n = s.getRoot(), t = n.listScenes();
  if (t.length === 0)
    return null;
  const a = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set();
  for (const i of n.listSkins()) {
    for (const b of i.listJoints())
      a.add(b);
    const p = i.getSkeleton();
    p && r.add(p);
  }
  let h = 0;
  const o = () => `node-${h++}`, l = (i) => {
    const p = [];
    let b = x.Node;
    r.has(i) ? b = x.Armature : a.has(i) && (b = x.Bone);
    const f = i.getName();
    let u;
    if (f)
      u = f;
    else
      switch (b) {
        case x.Armature:
          u = "Armature";
          break;
        case x.Bone:
          u = "Bone";
          break;
        default:
          u = "Node";
      }
    for (const _ of i.listChildren())
      p.push(l(_));
    const S = i.getMesh();
    if (S) {
      let _ = 0;
      for (const A of S.listPrimitives()) {
        const d = A.getIndices();
        d && (_ += d.getCount() / 3);
      }
      const O = ne(S), T = {
        id: o(),
        name: S.getName() || "Mesh",
        type: x.Mesh,
        children: [],
        gltfRef: S,
        metadata: { triangleCount: _, geometryVRAM: O }
      }, B = /* @__PURE__ */ new Set();
      for (const A of S.listPrimitives()) {
        const d = A.getMaterial();
        if (d && !B.has(d)) {
          B.add(d);
          const N = [], L = [
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
              const P = y.getImage();
              if (P && k && oe(k)) {
                const j = new Blob([P], { type: k });
                C.previewUrl = URL.createObjectURL(j), e.push(C.previewUrl);
              }
              N.push(C);
            }
          T.children.push({
            id: o(),
            name: d.getName() || "Material",
            type: x.Material,
            children: [],
            gltfRef: d,
            metadata: { textures: N }
          });
        }
      }
      p.push(T);
    }
    const R = i.getExtension("KHR_lights_punctual");
    R && p.push({
      id: o(),
      name: R.getName() || "Light",
      type: x.Light,
      children: [],
      gltfRef: R
    });
    const w = i.getCamera();
    return w && p.push({
      id: o(),
      name: w.getName() || "Camera",
      type: x.Camera,
      children: [],
      gltfRef: w
    }), {
      id: o(),
      name: u,
      type: b,
      children: p,
      gltfRef: i
    };
  }, m = n.getDefaultScene() ?? t[0], g = [];
  for (const i of m.listChildren())
    g.push(l(i));
  const c = {
    id: o(),
    name: m.getName() || "Scene",
    type: x.Scene,
    children: g,
    gltfRef: m
  };
  return U(c), c;
}
class he {
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
    return this.io ? this.io : (this.io = await z(), this.io);
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
      let l;
      if (o)
        l = await a.readBinary(h);
      else {
        const c = new TextDecoder().decode(h), i = JSON.parse(c), p = {}, b = async (f) => {
          if (!f || f.startsWith("data:")) return null;
          const u = f.split("/").pop() || f, S = decodeURIComponent(u), R = t?.get(S) || t?.get(u);
          if (R)
            try {
              const _ = await (await fetch(R)).arrayBuffer();
              return p[u] = new Uint8Array(_), u;
            } catch (w) {
              console.warn(`Failed to fetch resource ${u}:`, w);
            }
          return null;
        };
        if (i.buffers)
          for (const f of i.buffers) {
            const u = await b(f.uri);
            u && (f.uri = u);
          }
        if (i.images)
          for (const f of i.images) {
            const u = await b(f.uri);
            u && (f.uri = u);
          }
        l = await a.readJSON({
          json: i,
          resources: p
        });
      }
      const m = H(l, this.texturePreviewUrls);
      this.setState({
        document: l,
        originalBlob: e,
        sceneGraph: m,
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
          E.degToRad(t[0]),
          E.degToRad(t[1]),
          E.degToRad(t[2]),
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
          const r = t.createExtension(q).createClearcoat();
          e.setExtension("KHR_materials_clearcoat", r);
          break;
        }
        case "KHR_materials_transmission": {
          const r = t.createExtension(X).createTransmission();
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
    if (this.state.originalBlob) {
      this.setState({ isLoading: !0, error: null }), this.revokeTextureUrls();
      try {
        this.io || await this.initIOInstance();
        const e = await this.state.originalBlob.arrayBuffer(), n = new Uint8Array(e), t = await this.io.readBinary(n), a = H(t, this.texturePreviewUrls);
        this.setState({
          document: t,
          sceneGraph: a,
          selectedNode: null,
          isDirty: !1,
          isLoading: !1,
          error: null
        });
      } catch (e) {
        const n = e instanceof Error ? e.message : "Failed to reset";
        throw this.setState({
          isLoading: !1,
          error: n
        }), e;
      }
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
        const l = o.getSampler();
        if (l) {
          const m = l.getInput();
          if (m) {
            const g = m.getArray();
            if (g && g.length > 0) {
              const c = g[g.length - 1];
              c > r && (r = c);
            }
          }
        }
      }
      const h = t.getName();
      return {
        name: Q(h || `Animation ${a}`),
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
      const m = o[0].listTargets();
      if (m.length === 0) continue;
      let g = [];
      for (const c of e.listNodes())
        if (c.getMesh() === t) {
          const i = c.getWeights();
          if (i.length > 0) {
            g = i;
            break;
          }
        }
      for (let c = 0; c < m.length; c++) {
        const i = h[c] || `BlendShape ${c}`;
        n.push({
          name: i,
          meshName: a,
          index: c,
          defaultWeight: g[c] ?? 0
        });
      }
    }
    return n;
  }
}
export {
  he as InspectorAPI,
  Z as MaterialExtension,
  x as SceneGraphNodeType,
  ne as estimateGeometryVRAM,
  se as estimateTextureVRAM,
  me as formatBytes
};
