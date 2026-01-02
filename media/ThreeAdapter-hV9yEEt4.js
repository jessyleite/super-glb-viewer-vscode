import { d$ as ea, dZ as fe, d_ as Ne, cO as Pe, dt as Z, cM as ne, bO as P, V as ke, y as B, cG as D, S as q, k as aa, h as ta, i as sa, M as ie, a1 as C, dg as na, a2 as Ie, cE as ia, cP as ze, dX as ra, dd as oa, cH as $, cJ as Ue, am as qe, ao as ca, an as ba, ap as la, L as ee, aq as Ke, al as pe, aj as da, ak as ha, bV as fa, x as re, bT as pa, bN as Be, D as ua, Y, dH as ga, bY as We, dR as ma, v as se, dr as ka, dp as xa, dq as Ta, dG as wa, cN as oe, z as Qe, cq as Ra, O as Aa, dQ as Ea, cS as Sa, cW as ya, di as ja, dj as Ve, cK as Xe, a8 as we, e0 as Re, dC as Ae, dJ as Ee, C as ue, g as _a, dh as Ma, cY as Je, cx as La, d6 as Fa, H as ae, aB as ce, d7 as te, c_ as va, a as Se, e5 as H, e6 as Oa, e7 as ye, s as je, e8 as _e, cT as Me, a4 as Ha, e9 as Ga, ea as Ca, q as Da, o as Na, N as Pa } from "./index-BuD9B_7M.js";
import { F as Ia, S as za } from "./StatsManager-BYzrJ2Y6.js";
function Le(h, e) {
  if (e === ea)
    return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), h;
  if (e === fe || e === Ne) {
    let a = h.getIndex();
    if (a === null) {
      const n = [], o = h.getAttribute("position");
      if (o !== void 0) {
        for (let r = 0; r < o.count; r++)
          n.push(r);
        h.setIndex(n), a = h.getIndex();
      } else
        return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), h;
    }
    const i = a.count - 2, t = [];
    if (e === fe)
      for (let n = 1; n <= i; n++)
        t.push(a.getX(0)), t.push(a.getX(n)), t.push(a.getX(n + 1));
    else
      for (let n = 0; n < i; n++)
        n % 2 === 0 ? (t.push(a.getX(n)), t.push(a.getX(n + 1)), t.push(a.getX(n + 2))) : (t.push(a.getX(n + 2)), t.push(a.getX(n + 1)), t.push(a.getX(n)));
    t.length / 3 !== i && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
    const s = h.clone();
    return s.setIndex(t), s.clearGroups(), s;
  } else
    return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", e), h;
}
class Fe extends Pe {
  /**
   * Constructs a new glTF loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(e) {
    super(e), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(a) {
      return new Wa(a);
    }), this.register(function(a) {
      return new Qa(a);
    }), this.register(function(a) {
      return new tt(a);
    }), this.register(function(a) {
      return new st(a);
    }), this.register(function(a) {
      return new nt(a);
    }), this.register(function(a) {
      return new Xa(a);
    }), this.register(function(a) {
      return new Ja(a);
    }), this.register(function(a) {
      return new Ya(a);
    }), this.register(function(a) {
      return new Za(a);
    }), this.register(function(a) {
      return new Ba(a);
    }), this.register(function(a) {
      return new $a(a);
    }), this.register(function(a) {
      return new Va(a);
    }), this.register(function(a) {
      return new at(a);
    }), this.register(function(a) {
      return new et(a);
    }), this.register(function(a) {
      return new qa(a);
    }), this.register(function(a) {
      return new it(a);
    }), this.register(function(a) {
      return new rt(a);
    });
  }
  /**
   * Starts loading from the given URL and passes the loaded glTF asset
   * to the `onLoad()` callback.
   *
   * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
   * @param {function(GLTFLoader~LoadObject)} onLoad - Executed when the loading process has been finished.
   * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
   * @param {onErrorCallback} onError - Executed when errors occur.
   */
  load(e, a, i, t) {
    const s = this;
    let n;
    if (this.resourcePath !== "")
      n = this.resourcePath;
    else if (this.path !== "") {
      const c = Z.extractUrlBase(e);
      n = Z.resolveURL(c, this.path);
    } else
      n = Z.extractUrlBase(e);
    this.manager.itemStart(e);
    const o = function(c) {
      t ? t(c) : console.error(c), s.manager.itemError(e), s.manager.itemEnd(e);
    }, r = new ne(this.manager);
    r.setPath(this.path), r.setResponseType("arraybuffer"), r.setRequestHeader(this.requestHeader), r.setWithCredentials(this.withCredentials), r.load(e, function(c) {
      try {
        s.parse(c, n, function(l) {
          a(l), s.manager.itemEnd(e);
        }, o);
      } catch (l) {
        o(l);
      }
    }, i, o);
  }
  /**
   * Sets the given Draco loader to this loader. Required for decoding assets
   * compressed with the `KHR_draco_mesh_compression` extension.
   *
   * @param {DRACOLoader} dracoLoader - The Draco loader to set.
   * @return {GLTFLoader} A reference to this loader.
   */
  setDRACOLoader(e) {
    return this.dracoLoader = e, this;
  }
  /**
   * Sets the given KTX2 loader to this loader. Required for loading KTX2
   * compressed textures.
   *
   * @param {KTX2Loader} ktx2Loader - The KTX2 loader to set.
   * @return {GLTFLoader} A reference to this loader.
   */
  setKTX2Loader(e) {
    return this.ktx2Loader = e, this;
  }
  /**
   * Sets the given meshopt decoder. Required for decoding assets
   * compressed with the `EXT_meshopt_compression` extension.
   *
   * @param {Object} meshoptDecoder - The meshopt decoder to set.
   * @return {GLTFLoader} A reference to this loader.
   */
  setMeshoptDecoder(e) {
    return this.meshoptDecoder = e, this;
  }
  /**
   * Registers a plugin callback. This API is internally used to implement the various
   * glTF extensions but can also used by third-party code to add additional logic
   * to the loader.
   *
   * @param {function(parser:GLTFParser)} callback - The callback function to register.
   * @return {GLTFLoader} A reference to this loader.
   */
  register(e) {
    return this.pluginCallbacks.indexOf(e) === -1 && this.pluginCallbacks.push(e), this;
  }
  /**
   * Unregisters a plugin callback.
   *
   * @param {Function} callback - The callback function to unregister.
   * @return {GLTFLoader} A reference to this loader.
   */
  unregister(e) {
    return this.pluginCallbacks.indexOf(e) !== -1 && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e), 1), this;
  }
  /**
   * Parses the given FBX data and returns the resulting group.
   *
   * @param {string|ArrayBuffer} data - The raw glTF data.
   * @param {string} path - The URL base path.
   * @param {function(GLTFLoader~LoadObject)} onLoad - Executed when the loading process has been finished.
   * @param {onErrorCallback} onError - Executed when errors occur.
   */
  parse(e, a, i, t) {
    let s;
    const n = {}, o = {}, r = new TextDecoder();
    if (typeof e == "string")
      s = JSON.parse(e);
    else if (e instanceof ArrayBuffer)
      if (r.decode(new Uint8Array(e, 0, 4)) === Ye) {
        try {
          n[S.KHR_BINARY_GLTF] = new ot(e);
        } catch (b) {
          t && t(b);
          return;
        }
        s = JSON.parse(n[S.KHR_BINARY_GLTF].content);
      } else
        s = JSON.parse(r.decode(e));
    else
      s = e;
    if (s.asset === void 0 || s.asset.version[0] < 2) {
      t && t(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const c = new Tt(s, {
      path: a || this.resourcePath || "",
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder
    });
    c.fileLoader.setRequestHeader(this.requestHeader);
    for (let l = 0; l < this.pluginCallbacks.length; l++) {
      const b = this.pluginCallbacks[l](c);
      b.name || console.error("THREE.GLTFLoader: Invalid plugin found: missing name"), o[b.name] = b, n[b.name] = !0;
    }
    if (s.extensionsUsed)
      for (let l = 0; l < s.extensionsUsed.length; ++l) {
        const b = s.extensionsUsed[l], d = s.extensionsRequired || [];
        switch (b) {
          case S.KHR_MATERIALS_UNLIT:
            n[b] = new Ka();
            break;
          case S.KHR_DRACO_MESH_COMPRESSION:
            n[b] = new ct(s, this.dracoLoader);
            break;
          case S.KHR_TEXTURE_TRANSFORM:
            n[b] = new bt();
            break;
          case S.KHR_MESH_QUANTIZATION:
            n[b] = new lt();
            break;
          default:
            d.indexOf(b) >= 0 && o[b] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + b + '".');
        }
      }
    c.setExtensions(n), c.setPlugins(o), c.parse(i, t);
  }
  /**
   * Async version of {@link GLTFLoader#parse}.
   *
   * @async
   * @param {string|ArrayBuffer} data - The raw glTF data.
   * @param {string} path - The URL base path.
   * @return {Promise<GLTFLoader~LoadObject>} A Promise that resolves with the loaded glTF when the parsing has been finished.
   */
  parseAsync(e, a) {
    const i = this;
    return new Promise(function(t, s) {
      i.parse(e, a, t, s);
    });
  }
}
function Ua() {
  let h = {};
  return {
    get: function(e) {
      return h[e];
    },
    add: function(e, a) {
      h[e] = a;
    },
    remove: function(e) {
      delete h[e];
    },
    removeAll: function() {
      h = {};
    }
  };
}
const S = {
  KHR_BINARY_GLTF: "KHR_binary_glTF",
  KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
  KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
  KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
  KHR_MATERIALS_DISPERSION: "KHR_materials_dispersion",
  KHR_MATERIALS_IOR: "KHR_materials_ior",
  KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
  KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
  KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
  KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence",
  KHR_MATERIALS_ANISOTROPY: "KHR_materials_anisotropy",
  KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
  KHR_MATERIALS_VOLUME: "KHR_materials_volume",
  KHR_TEXTURE_BASISU: "KHR_texture_basisu",
  KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
  KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
  KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength",
  EXT_MATERIALS_BUMP: "EXT_materials_bump",
  EXT_TEXTURE_WEBP: "EXT_texture_webp",
  EXT_TEXTURE_AVIF: "EXT_texture_avif",
  EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression",
  EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing"
};
class qa {
  constructor(e) {
    this.parser = e, this.name = S.KHR_LIGHTS_PUNCTUAL, this.cache = { refs: {}, uses: {} };
  }
  _markDefs() {
    const e = this.parser, a = this.parser.json.nodes || [];
    for (let i = 0, t = a.length; i < t; i++) {
      const s = a[i];
      s.extensions && s.extensions[this.name] && s.extensions[this.name].light !== void 0 && e._addNodeRef(this.cache, s.extensions[this.name].light);
    }
  }
  _loadLight(e) {
    const a = this.parser, i = "light:" + e;
    let t = a.cache.get(i);
    if (t) return t;
    const s = a.json, r = ((s.extensions && s.extensions[this.name] || {}).lights || [])[e];
    let c;
    const l = new B(16777215);
    r.color !== void 0 && l.setRGB(r.color[0], r.color[1], r.color[2], D);
    const b = r.range !== void 0 ? r.range : 0;
    switch (r.type) {
      case "directional":
        c = new sa(l), c.target.position.set(0, 0, -1), c.add(c.target);
        break;
      case "point":
        c = new ta(l), c.distance = b;
        break;
      case "spot":
        c = new aa(l), c.distance = b, r.spot = r.spot || {}, r.spot.innerConeAngle = r.spot.innerConeAngle !== void 0 ? r.spot.innerConeAngle : 0, r.spot.outerConeAngle = r.spot.outerConeAngle !== void 0 ? r.spot.outerConeAngle : Math.PI / 4, c.angle = r.spot.outerConeAngle, c.penumbra = 1 - r.spot.innerConeAngle / r.spot.outerConeAngle, c.target.position.set(0, 0, -1), c.add(c.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + r.type);
    }
    return c.position.set(0, 0, 0), N(c, r), r.intensity !== void 0 && (c.intensity = r.intensity), c.name = a.createUniqueName(r.name || "light_" + e), t = Promise.resolve(c), a.cache.add(i, t), t;
  }
  getDependency(e, a) {
    if (e === "light")
      return this._loadLight(a);
  }
  createNodeAttachment(e) {
    const a = this, i = this.parser, s = i.json.nodes[e], o = (s.extensions && s.extensions[this.name] || {}).light;
    return o === void 0 ? null : this._loadLight(o).then(function(r) {
      return i._getNodeRef(a.cache, o, r);
    });
  }
}
class Ka {
  constructor() {
    this.name = S.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return Y;
  }
  extendParams(e, a, i) {
    const t = [];
    e.color = new B(1, 1, 1), e.opacity = 1;
    const s = a.pbrMetallicRoughness;
    if (s) {
      if (Array.isArray(s.baseColorFactor)) {
        const n = s.baseColorFactor;
        e.color.setRGB(n[0], n[1], n[2], D), e.opacity = n[3];
      }
      s.baseColorTexture !== void 0 && t.push(i.assignTexture(e, "map", s.baseColorTexture, q));
    }
    return Promise.all(t);
  }
}
class Ba {
  constructor(e) {
    this.parser = e, this.name = S.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(e, a) {
    const t = this.parser.json.materials[e];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const s = t.extensions[this.name].emissiveStrength;
    return s !== void 0 && (a.emissiveIntensity = s), Promise.resolve();
  }
}
class Wa {
  constructor(e) {
    this.parser = e, this.name = S.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : P;
  }
  extendMaterialParams(e, a) {
    const i = this.parser, t = i.json.materials[e];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const s = [], n = t.extensions[this.name];
    if (n.clearcoatFactor !== void 0 && (a.clearcoat = n.clearcoatFactor), n.clearcoatTexture !== void 0 && s.push(i.assignTexture(a, "clearcoatMap", n.clearcoatTexture)), n.clearcoatRoughnessFactor !== void 0 && (a.clearcoatRoughness = n.clearcoatRoughnessFactor), n.clearcoatRoughnessTexture !== void 0 && s.push(i.assignTexture(a, "clearcoatRoughnessMap", n.clearcoatRoughnessTexture)), n.clearcoatNormalTexture !== void 0 && (s.push(i.assignTexture(a, "clearcoatNormalMap", n.clearcoatNormalTexture)), n.clearcoatNormalTexture.scale !== void 0)) {
      const o = n.clearcoatNormalTexture.scale;
      a.clearcoatNormalScale = new ke(o, o);
    }
    return Promise.all(s);
  }
}
class Qa {
  constructor(e) {
    this.parser = e, this.name = S.KHR_MATERIALS_DISPERSION;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : P;
  }
  extendMaterialParams(e, a) {
    const t = this.parser.json.materials[e];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const s = t.extensions[this.name];
    return a.dispersion = s.dispersion !== void 0 ? s.dispersion : 0, Promise.resolve();
  }
}
class Va {
  constructor(e) {
    this.parser = e, this.name = S.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : P;
  }
  extendMaterialParams(e, a) {
    const i = this.parser, t = i.json.materials[e];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const s = [], n = t.extensions[this.name];
    return n.iridescenceFactor !== void 0 && (a.iridescence = n.iridescenceFactor), n.iridescenceTexture !== void 0 && s.push(i.assignTexture(a, "iridescenceMap", n.iridescenceTexture)), n.iridescenceIor !== void 0 && (a.iridescenceIOR = n.iridescenceIor), a.iridescenceThicknessRange === void 0 && (a.iridescenceThicknessRange = [100, 400]), n.iridescenceThicknessMinimum !== void 0 && (a.iridescenceThicknessRange[0] = n.iridescenceThicknessMinimum), n.iridescenceThicknessMaximum !== void 0 && (a.iridescenceThicknessRange[1] = n.iridescenceThicknessMaximum), n.iridescenceThicknessTexture !== void 0 && s.push(i.assignTexture(a, "iridescenceThicknessMap", n.iridescenceThicknessTexture)), Promise.all(s);
  }
}
class Xa {
  constructor(e) {
    this.parser = e, this.name = S.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : P;
  }
  extendMaterialParams(e, a) {
    const i = this.parser, t = i.json.materials[e];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const s = [];
    a.sheenColor = new B(0, 0, 0), a.sheenRoughness = 0, a.sheen = 1;
    const n = t.extensions[this.name];
    if (n.sheenColorFactor !== void 0) {
      const o = n.sheenColorFactor;
      a.sheenColor.setRGB(o[0], o[1], o[2], D);
    }
    return n.sheenRoughnessFactor !== void 0 && (a.sheenRoughness = n.sheenRoughnessFactor), n.sheenColorTexture !== void 0 && s.push(i.assignTexture(a, "sheenColorMap", n.sheenColorTexture, q)), n.sheenRoughnessTexture !== void 0 && s.push(i.assignTexture(a, "sheenRoughnessMap", n.sheenRoughnessTexture)), Promise.all(s);
  }
}
class Ja {
  constructor(e) {
    this.parser = e, this.name = S.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : P;
  }
  extendMaterialParams(e, a) {
    const i = this.parser, t = i.json.materials[e];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const s = [], n = t.extensions[this.name];
    return n.transmissionFactor !== void 0 && (a.transmission = n.transmissionFactor), n.transmissionTexture !== void 0 && s.push(i.assignTexture(a, "transmissionMap", n.transmissionTexture)), Promise.all(s);
  }
}
class Ya {
  constructor(e) {
    this.parser = e, this.name = S.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : P;
  }
  extendMaterialParams(e, a) {
    const i = this.parser, t = i.json.materials[e];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const s = [], n = t.extensions[this.name];
    a.thickness = n.thicknessFactor !== void 0 ? n.thicknessFactor : 0, n.thicknessTexture !== void 0 && s.push(i.assignTexture(a, "thicknessMap", n.thicknessTexture)), a.attenuationDistance = n.attenuationDistance || 1 / 0;
    const o = n.attenuationColor || [1, 1, 1];
    return a.attenuationColor = new B().setRGB(o[0], o[1], o[2], D), Promise.all(s);
  }
}
class Za {
  constructor(e) {
    this.parser = e, this.name = S.KHR_MATERIALS_IOR;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : P;
  }
  extendMaterialParams(e, a) {
    const t = this.parser.json.materials[e];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const s = t.extensions[this.name];
    return a.ior = s.ior !== void 0 ? s.ior : 1.5, Promise.resolve();
  }
}
class $a {
  constructor(e) {
    this.parser = e, this.name = S.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : P;
  }
  extendMaterialParams(e, a) {
    const i = this.parser, t = i.json.materials[e];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const s = [], n = t.extensions[this.name];
    a.specularIntensity = n.specularFactor !== void 0 ? n.specularFactor : 1, n.specularTexture !== void 0 && s.push(i.assignTexture(a, "specularIntensityMap", n.specularTexture));
    const o = n.specularColorFactor || [1, 1, 1];
    return a.specularColor = new B().setRGB(o[0], o[1], o[2], D), n.specularColorTexture !== void 0 && s.push(i.assignTexture(a, "specularColorMap", n.specularColorTexture, q)), Promise.all(s);
  }
}
class et {
  constructor(e) {
    this.parser = e, this.name = S.EXT_MATERIALS_BUMP;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : P;
  }
  extendMaterialParams(e, a) {
    const i = this.parser, t = i.json.materials[e];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const s = [], n = t.extensions[this.name];
    return a.bumpScale = n.bumpFactor !== void 0 ? n.bumpFactor : 1, n.bumpTexture !== void 0 && s.push(i.assignTexture(a, "bumpMap", n.bumpTexture)), Promise.all(s);
  }
}
class at {
  constructor(e) {
    this.parser = e, this.name = S.KHR_MATERIALS_ANISOTROPY;
  }
  getMaterialType(e) {
    const i = this.parser.json.materials[e];
    return !i.extensions || !i.extensions[this.name] ? null : P;
  }
  extendMaterialParams(e, a) {
    const i = this.parser, t = i.json.materials[e];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const s = [], n = t.extensions[this.name];
    return n.anisotropyStrength !== void 0 && (a.anisotropy = n.anisotropyStrength), n.anisotropyRotation !== void 0 && (a.anisotropyRotation = n.anisotropyRotation), n.anisotropyTexture !== void 0 && s.push(i.assignTexture(a, "anisotropyMap", n.anisotropyTexture)), Promise.all(s);
  }
}
class tt {
  constructor(e) {
    this.parser = e, this.name = S.KHR_TEXTURE_BASISU;
  }
  loadTexture(e) {
    const a = this.parser, i = a.json, t = i.textures[e];
    if (!t.extensions || !t.extensions[this.name])
      return null;
    const s = t.extensions[this.name], n = a.options.ktx2Loader;
    if (!n) {
      if (i.extensionsRequired && i.extensionsRequired.indexOf(this.name) >= 0)
        throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      return null;
    }
    return a.loadTextureImage(e, s.source, n);
  }
}
class st {
  constructor(e) {
    this.parser = e, this.name = S.EXT_TEXTURE_WEBP;
  }
  loadTexture(e) {
    const a = this.name, i = this.parser, t = i.json, s = t.textures[e];
    if (!s.extensions || !s.extensions[a])
      return null;
    const n = s.extensions[a], o = t.images[n.source];
    let r = i.textureLoader;
    if (o.uri) {
      const c = i.options.manager.getHandler(o.uri);
      c !== null && (r = c);
    }
    return i.loadTextureImage(e, n.source, r);
  }
}
class nt {
  constructor(e) {
    this.parser = e, this.name = S.EXT_TEXTURE_AVIF;
  }
  loadTexture(e) {
    const a = this.name, i = this.parser, t = i.json, s = t.textures[e];
    if (!s.extensions || !s.extensions[a])
      return null;
    const n = s.extensions[a], o = t.images[n.source];
    let r = i.textureLoader;
    if (o.uri) {
      const c = i.options.manager.getHandler(o.uri);
      c !== null && (r = c);
    }
    return i.loadTextureImage(e, n.source, r);
  }
}
class it {
  constructor(e) {
    this.name = S.EXT_MESHOPT_COMPRESSION, this.parser = e;
  }
  loadBufferView(e) {
    const a = this.parser.json, i = a.bufferViews[e];
    if (i.extensions && i.extensions[this.name]) {
      const t = i.extensions[this.name], s = this.parser.getDependency("buffer", t.buffer), n = this.parser.options.meshoptDecoder;
      if (!n || !n.supported) {
        if (a.extensionsRequired && a.extensionsRequired.indexOf(this.name) >= 0)
          throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        return null;
      }
      return s.then(function(o) {
        const r = t.byteOffset || 0, c = t.byteLength || 0, l = t.count, b = t.byteStride, d = new Uint8Array(o, r, c);
        return n.decodeGltfBufferAsync ? n.decodeGltfBufferAsync(l, b, d, t.mode, t.filter).then(function(f) {
          return f.buffer;
        }) : n.ready.then(function() {
          const f = new ArrayBuffer(l * b);
          return n.decodeGltfBuffer(new Uint8Array(f), l, b, d, t.mode, t.filter), f;
        });
      });
    } else
      return null;
  }
}
class rt {
  constructor(e) {
    this.name = S.EXT_MESH_GPU_INSTANCING, this.parser = e;
  }
  createNodeMesh(e) {
    const a = this.parser.json, i = a.nodes[e];
    if (!i.extensions || !i.extensions[this.name] || i.mesh === void 0)
      return null;
    const t = a.meshes[i.mesh];
    for (const c of t.primitives)
      if (c.mode !== G.TRIANGLES && c.mode !== G.TRIANGLE_STRIP && c.mode !== G.TRIANGLE_FAN && c.mode !== void 0)
        return null;
    const n = i.extensions[this.name].attributes, o = [], r = {};
    for (const c in n)
      o.push(this.parser.getDependency("accessor", n[c]).then((l) => (r[c] = l, r[c])));
    return o.length < 1 ? null : (o.push(this.parser.createNodeMesh(e)), Promise.all(o).then((c) => {
      const l = c.pop(), b = l.isGroup ? l.children : [l], d = c[0].count, f = [];
      for (const T of b) {
        const R = new ie(), k = new C(), p = new Ie(), u = new C(1, 1, 1), m = new na(T.geometry, T.material, d);
        for (let g = 0; g < d; g++)
          r.TRANSLATION && k.fromBufferAttribute(r.TRANSLATION, g), r.ROTATION && p.fromBufferAttribute(r.ROTATION, g), r.SCALE && u.fromBufferAttribute(r.SCALE, g), m.setMatrixAt(g, R.compose(k, p, u));
        for (const g in r)
          if (g === "_COLOR_0") {
            const w = r[g];
            m.instanceColor = new ia(w.array, w.itemSize, w.normalized);
          } else g !== "TRANSLATION" && g !== "ROTATION" && g !== "SCALE" && T.geometry.setAttribute(g, r[g]);
        ze.prototype.copy.call(m, T), this.parser.assignFinalMaterial(m), f.push(m);
      }
      return l.isGroup ? (l.clear(), l.add(...f), l) : f[0];
    }));
  }
}
const Ye = "glTF", J = 12, ve = { JSON: 1313821514, BIN: 5130562 };
class ot {
  constructor(e) {
    this.name = S.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const a = new DataView(e, 0, J), i = new TextDecoder();
    if (this.header = {
      magic: i.decode(new Uint8Array(e.slice(0, 4))),
      version: a.getUint32(4, !0),
      length: a.getUint32(8, !0)
    }, this.header.magic !== Ye)
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2)
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const t = this.header.length - J, s = new DataView(e, J);
    let n = 0;
    for (; n < t; ) {
      const o = s.getUint32(n, !0);
      n += 4;
      const r = s.getUint32(n, !0);
      if (n += 4, r === ve.JSON) {
        const c = new Uint8Array(e, J + n, o);
        this.content = i.decode(c);
      } else if (r === ve.BIN) {
        const c = J + n;
        this.body = e.slice(c, c + o);
      }
      n += o;
    }
    if (this.content === null)
      throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
}
class ct {
  constructor(e, a) {
    if (!a)
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    this.name = S.KHR_DRACO_MESH_COMPRESSION, this.json = e, this.dracoLoader = a, this.dracoLoader.preload();
  }
  decodePrimitive(e, a) {
    const i = this.json, t = this.dracoLoader, s = e.extensions[this.name].bufferView, n = e.extensions[this.name].attributes, o = {}, r = {}, c = {};
    for (const l in n) {
      const b = ge[l] || l.toLowerCase();
      o[b] = n[l];
    }
    for (const l in e.attributes) {
      const b = ge[l] || l.toLowerCase();
      if (n[l] !== void 0) {
        const d = i.accessors[e.attributes[l]], f = V[d.componentType];
        c[b] = f.name, r[b] = d.normalized === !0;
      }
    }
    return a.getDependency("bufferView", s).then(function(l) {
      return new Promise(function(b, d) {
        t.decodeDracoFile(l, function(f) {
          for (const T in f.attributes) {
            const R = f.attributes[T], k = r[T];
            k !== void 0 && (R.normalized = k);
          }
          b(f);
        }, o, c, D, d);
      });
    });
  }
}
class bt {
  constructor() {
    this.name = S.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(e, a) {
    return (a.texCoord === void 0 || a.texCoord === e.channel) && a.offset === void 0 && a.rotation === void 0 && a.scale === void 0 || (e = e.clone(), a.texCoord !== void 0 && (e.channel = a.texCoord), a.offset !== void 0 && e.offset.fromArray(a.offset), a.rotation !== void 0 && (e.rotation = a.rotation), a.scale !== void 0 && e.repeat.fromArray(a.scale), e.needsUpdate = !0), e;
  }
}
class lt {
  constructor() {
    this.name = S.KHR_MESH_QUANTIZATION;
  }
}
class Ze extends Ma {
  constructor(e, a, i, t) {
    super(e, a, i, t);
  }
  copySampleValue_(e) {
    const a = this.resultBuffer, i = this.sampleValues, t = this.valueSize, s = e * t * 3 + t;
    for (let n = 0; n !== t; n++)
      a[n] = i[s + n];
    return a;
  }
  interpolate_(e, a, i, t) {
    const s = this.resultBuffer, n = this.sampleValues, o = this.valueSize, r = o * 2, c = o * 3, l = t - a, b = (i - a) / l, d = b * b, f = d * b, T = e * c, R = T - c, k = -2 * f + 3 * d, p = f - d, u = 1 - k, m = p - d + b;
    for (let g = 0; g !== o; g++) {
      const w = n[R + g + o], j = n[R + g + r] * l, M = n[T + g + o], x = n[T + g] * l;
      s[g] = u * w + m * j + k * M + p * x;
    }
    return s;
  }
}
const dt = new Ie();
class ht extends Ze {
  interpolate_(e, a, i, t) {
    const s = super.interpolate_(e, a, i, t);
    return dt.fromArray(s).normalize().toArray(s), s;
  }
}
const G = {
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6
}, V = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
}, Oe = {
  9728: Ke,
  9729: ee,
  9984: la,
  9985: ba,
  9986: ca,
  9987: qe
}, He = {
  33071: ha,
  33648: da,
  10497: pe
}, be = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, ge = {
  POSITION: "position",
  NORMAL: "normal",
  TANGENT: "tangent",
  TEXCOORD_0: "uv",
  TEXCOORD_1: "uv1",
  TEXCOORD_2: "uv2",
  TEXCOORD_3: "uv3",
  COLOR_0: "color",
  WEIGHTS_0: "skinWeight",
  JOINTS_0: "skinIndex"
}, K = {
  scale: "scale",
  translation: "position",
  rotation: "quaternion",
  weights: "morphTargetInfluences"
}, ft = {
  CUBICSPLINE: void 0,
  // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
  // keyframe track will be initialized with a default interpolation type, then modified.
  LINEAR: Ve,
  STEP: ja
}, le = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function pt(h) {
  return h.DefaultMaterial === void 0 && (h.DefaultMaterial = new Be({
    color: 16777215,
    emissive: 0,
    metalness: 1,
    roughness: 1,
    transparent: !1,
    depthTest: !0,
    side: _a
  })), h.DefaultMaterial;
}
function W(h, e, a) {
  for (const i in a.extensions)
    h[i] === void 0 && (e.userData.gltfExtensions = e.userData.gltfExtensions || {}, e.userData.gltfExtensions[i] = a.extensions[i]);
}
function N(h, e) {
  e.extras !== void 0 && (typeof e.extras == "object" ? Object.assign(h.userData, e.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + e.extras));
}
function ut(h, e, a) {
  let i = !1, t = !1, s = !1;
  for (let c = 0, l = e.length; c < l; c++) {
    const b = e[c];
    if (b.POSITION !== void 0 && (i = !0), b.NORMAL !== void 0 && (t = !0), b.COLOR_0 !== void 0 && (s = !0), i && t && s) break;
  }
  if (!i && !t && !s) return Promise.resolve(h);
  const n = [], o = [], r = [];
  for (let c = 0, l = e.length; c < l; c++) {
    const b = e[c];
    if (i) {
      const d = b.POSITION !== void 0 ? a.getDependency("accessor", b.POSITION) : h.attributes.position;
      n.push(d);
    }
    if (t) {
      const d = b.NORMAL !== void 0 ? a.getDependency("accessor", b.NORMAL) : h.attributes.normal;
      o.push(d);
    }
    if (s) {
      const d = b.COLOR_0 !== void 0 ? a.getDependency("accessor", b.COLOR_0) : h.attributes.color;
      r.push(d);
    }
  }
  return Promise.all([
    Promise.all(n),
    Promise.all(o),
    Promise.all(r)
  ]).then(function(c) {
    const l = c[0], b = c[1], d = c[2];
    return i && (h.morphAttributes.position = l), t && (h.morphAttributes.normal = b), s && (h.morphAttributes.color = d), h.morphTargetsRelative = !0, h;
  });
}
function gt(h, e) {
  if (h.updateMorphTargets(), e.weights !== void 0)
    for (let a = 0, i = e.weights.length; a < i; a++)
      h.morphTargetInfluences[a] = e.weights[a];
  if (e.extras && Array.isArray(e.extras.targetNames)) {
    const a = e.extras.targetNames;
    if (h.morphTargetInfluences.length === a.length) {
      h.morphTargetDictionary = {};
      for (let i = 0, t = a.length; i < t; i++)
        h.morphTargetDictionary[a[i]] = i;
    } else
      console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
  }
}
function mt(h) {
  let e;
  const a = h.extensions && h.extensions[S.KHR_DRACO_MESH_COMPRESSION];
  if (a ? e = "draco:" + a.bufferView + ":" + a.indices + ":" + de(a.attributes) : e = h.indices + ":" + de(h.attributes) + ":" + h.mode, h.targets !== void 0)
    for (let i = 0, t = h.targets.length; i < t; i++)
      e += ":" + de(h.targets[i]);
  return e;
}
function de(h) {
  let e = "";
  const a = Object.keys(h).sort();
  for (let i = 0, t = a.length; i < t; i++)
    e += a[i] + ":" + h[a[i]] + ";";
  return e;
}
function me(h) {
  switch (h) {
    case Int8Array:
      return 1 / 127;
    case Uint8Array:
      return 1 / 255;
    case Int16Array:
      return 1 / 32767;
    case Uint16Array:
      return 1 / 65535;
    default:
      throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.");
  }
}
function kt(h) {
  return h.search(/\.jpe?g($|\?)/i) > 0 || h.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : h.search(/\.webp($|\?)/i) > 0 || h.search(/^data\:image\/webp/) === 0 ? "image/webp" : h.search(/\.ktx2($|\?)/i) > 0 || h.search(/^data\:image\/ktx2/) === 0 ? "image/ktx2" : "image/png";
}
const xt = new ie();
class Tt {
  constructor(e = {}, a = {}) {
    this.json = e, this.extensions = {}, this.plugins = {}, this.options = a, this.cache = new Ua(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = { refs: {}, uses: {} }, this.cameraCache = { refs: {}, uses: {} }, this.lightCache = { refs: {}, uses: {} }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
    let i = !1, t = -1, s = !1, n = -1;
    if (typeof navigator < "u") {
      const o = navigator.userAgent;
      i = /^((?!chrome|android).)*safari/i.test(o) === !0;
      const r = o.match(/Version\/(\d+)/);
      t = i && r ? parseInt(r[1], 10) : -1, s = o.indexOf("Firefox") > -1, n = s ? o.match(/Firefox\/([0-9]+)\./)[1] : -1;
    }
    typeof createImageBitmap > "u" || i && t < 17 || s && n < 98 ? this.textureLoader = new ra(this.options.manager) : this.textureLoader = new oa(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new ne(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0);
  }
  setExtensions(e) {
    this.extensions = e;
  }
  setPlugins(e) {
    this.plugins = e;
  }
  parse(e, a) {
    const i = this, t = this.json, s = this.extensions;
    this.cache.removeAll(), this.nodeCache = {}, this._invokeAll(function(n) {
      return n._markDefs && n._markDefs();
    }), Promise.all(this._invokeAll(function(n) {
      return n.beforeRoot && n.beforeRoot();
    })).then(function() {
      return Promise.all([
        i.getDependencies("scene"),
        i.getDependencies("animation"),
        i.getDependencies("camera")
      ]);
    }).then(function(n) {
      const o = {
        scene: n[0][t.scene || 0],
        scenes: n[0],
        animations: n[1],
        cameras: n[2],
        asset: t.asset,
        parser: i,
        userData: {}
      };
      return W(s, o, t), N(o, t), Promise.all(i._invokeAll(function(r) {
        return r.afterRoot && r.afterRoot(o);
      })).then(function() {
        for (const r of o.scenes)
          r.updateMatrixWorld();
        e(o);
      });
    }).catch(a);
  }
  /**
   * Marks the special nodes/meshes in json for efficient parse.
   *
   * @private
   */
  _markDefs() {
    const e = this.json.nodes || [], a = this.json.skins || [], i = this.json.meshes || [];
    for (let t = 0, s = a.length; t < s; t++) {
      const n = a[t].joints;
      for (let o = 0, r = n.length; o < r; o++)
        e[n[o]].isBone = !0;
    }
    for (let t = 0, s = e.length; t < s; t++) {
      const n = e[t];
      n.mesh !== void 0 && (this._addNodeRef(this.meshCache, n.mesh), n.skin !== void 0 && (i[n.mesh].isSkinnedMesh = !0)), n.camera !== void 0 && this._addNodeRef(this.cameraCache, n.camera);
    }
  }
  /**
   * Counts references to shared node / Object3D resources. These resources
   * can be reused, or "instantiated", at multiple nodes in the scene
   * hierarchy. Mesh, Camera, and Light instances are instantiated and must
   * be marked. Non-scenegraph resources (like Materials, Geometries, and
   * Textures) can be reused directly and are not marked here.
   *
   * Example: CesiumMilkTruck sample model reuses "Wheel" meshes.
   *
   * @private
   * @param {Object} cache
   * @param {Object3D} index
   */
  _addNodeRef(e, a) {
    a !== void 0 && (e.refs[a] === void 0 && (e.refs[a] = e.uses[a] = 0), e.refs[a]++);
  }
  /**
   * Returns a reference to a shared resource, cloning it if necessary.
   *
   * @private
   * @param {Object} cache
   * @param {number} index
   * @param {Object} object
   * @return {Object}
   */
  _getNodeRef(e, a, i) {
    if (e.refs[a] <= 1) return i;
    const t = i.clone(), s = (n, o) => {
      const r = this.associations.get(n);
      r != null && this.associations.set(o, r);
      for (const [c, l] of n.children.entries())
        s(l, o.children[c]);
    };
    return s(i, t), t.name += "_instance_" + e.uses[a]++, t;
  }
  _invokeOne(e) {
    const a = Object.values(this.plugins);
    a.push(this);
    for (let i = 0; i < a.length; i++) {
      const t = e(a[i]);
      if (t) return t;
    }
    return null;
  }
  _invokeAll(e) {
    const a = Object.values(this.plugins);
    a.unshift(this);
    const i = [];
    for (let t = 0; t < a.length; t++) {
      const s = e(a[t]);
      s && i.push(s);
    }
    return i;
  }
  /**
   * Requests the specified dependency asynchronously, with caching.
   *
   * @private
   * @param {string} type
   * @param {number} index
   * @return {Promise<Object3D|Material|Texture|AnimationClip|ArrayBuffer|Object>}
   */
  getDependency(e, a) {
    const i = e + ":" + a;
    let t = this.cache.get(i);
    if (!t) {
      switch (e) {
        case "scene":
          t = this.loadScene(a);
          break;
        case "node":
          t = this._invokeOne(function(s) {
            return s.loadNode && s.loadNode(a);
          });
          break;
        case "mesh":
          t = this._invokeOne(function(s) {
            return s.loadMesh && s.loadMesh(a);
          });
          break;
        case "accessor":
          t = this.loadAccessor(a);
          break;
        case "bufferView":
          t = this._invokeOne(function(s) {
            return s.loadBufferView && s.loadBufferView(a);
          });
          break;
        case "buffer":
          t = this.loadBuffer(a);
          break;
        case "material":
          t = this._invokeOne(function(s) {
            return s.loadMaterial && s.loadMaterial(a);
          });
          break;
        case "texture":
          t = this._invokeOne(function(s) {
            return s.loadTexture && s.loadTexture(a);
          });
          break;
        case "skin":
          t = this.loadSkin(a);
          break;
        case "animation":
          t = this._invokeOne(function(s) {
            return s.loadAnimation && s.loadAnimation(a);
          });
          break;
        case "camera":
          t = this.loadCamera(a);
          break;
        default:
          if (t = this._invokeOne(function(s) {
            return s != this && s.getDependency && s.getDependency(e, a);
          }), !t)
            throw new Error("Unknown type: " + e);
          break;
      }
      this.cache.add(i, t);
    }
    return t;
  }
  /**
   * Requests all dependencies of the specified type asynchronously, with caching.
   *
   * @private
   * @param {string} type
   * @return {Promise<Array<Object>>}
   */
  getDependencies(e) {
    let a = this.cache.get(e);
    if (!a) {
      const i = this, t = this.json[e + (e === "mesh" ? "es" : "s")] || [];
      a = Promise.all(t.map(function(s, n) {
        return i.getDependency(e, n);
      })), this.cache.add(e, a);
    }
    return a;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   *
   * @private
   * @param {number} bufferIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBuffer(e) {
    const a = this.json.buffers[e], i = this.fileLoader;
    if (a.type && a.type !== "arraybuffer")
      throw new Error("THREE.GLTFLoader: " + a.type + " buffer type is not supported.");
    if (a.uri === void 0 && e === 0)
      return Promise.resolve(this.extensions[S.KHR_BINARY_GLTF].body);
    const t = this.options;
    return new Promise(function(s, n) {
      i.load(Z.resolveURL(a.uri, t.path), s, void 0, function() {
        n(new Error('THREE.GLTFLoader: Failed to load buffer "' + a.uri + '".'));
      });
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   *
   * @private
   * @param {number} bufferViewIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBufferView(e) {
    const a = this.json.bufferViews[e];
    return this.getDependency("buffer", a.buffer).then(function(i) {
      const t = a.byteLength || 0, s = a.byteOffset || 0;
      return i.slice(s, s + t);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#accessors
   *
   * @private
   * @param {number} accessorIndex
   * @return {Promise<BufferAttribute|InterleavedBufferAttribute>}
   */
  loadAccessor(e) {
    const a = this, i = this.json, t = this.json.accessors[e];
    if (t.bufferView === void 0 && t.sparse === void 0) {
      const n = be[t.type], o = V[t.componentType], r = t.normalized === !0, c = new o(t.count * n);
      return Promise.resolve(new $(c, n, r));
    }
    const s = [];
    return t.bufferView !== void 0 ? s.push(this.getDependency("bufferView", t.bufferView)) : s.push(null), t.sparse !== void 0 && (s.push(this.getDependency("bufferView", t.sparse.indices.bufferView)), s.push(this.getDependency("bufferView", t.sparse.values.bufferView))), Promise.all(s).then(function(n) {
      const o = n[0], r = be[t.type], c = V[t.componentType], l = c.BYTES_PER_ELEMENT, b = l * r, d = t.byteOffset || 0, f = t.bufferView !== void 0 ? i.bufferViews[t.bufferView].byteStride : void 0, T = t.normalized === !0;
      let R, k;
      if (f && f !== b) {
        const p = Math.floor(d / f), u = "InterleavedBuffer:" + t.bufferView + ":" + t.componentType + ":" + p + ":" + t.count;
        let m = a.cache.get(u);
        m || (R = new c(o, p * f, t.count * f / l), m = new Ue(R, f / l), a.cache.add(u, m)), k = new Xe(m, r, d % f / l, T);
      } else
        o === null ? R = new c(t.count * r) : R = new c(o, d, t.count * r), k = new $(R, r, T);
      if (t.sparse !== void 0) {
        const p = be.SCALAR, u = V[t.sparse.indices.componentType], m = t.sparse.indices.byteOffset || 0, g = t.sparse.values.byteOffset || 0, w = new u(n[1], m, t.sparse.count * p), j = new c(n[2], g, t.sparse.count * r);
        o !== null && (k = new $(k.array.slice(), k.itemSize, k.normalized)), k.normalized = !1;
        for (let M = 0, x = w.length; M < x; M++) {
          const E = w[M];
          if (k.setX(E, j[M * r]), r >= 2 && k.setY(E, j[M * r + 1]), r >= 3 && k.setZ(E, j[M * r + 2]), r >= 4 && k.setW(E, j[M * r + 3]), r >= 5) throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
        }
        k.normalized = T;
      }
      return k;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#textures
   *
   * @private
   * @param {number} textureIndex
   * @return {Promise<?Texture>}
   */
  loadTexture(e) {
    const a = this.json, i = this.options, s = a.textures[e].source, n = a.images[s];
    let o = this.textureLoader;
    if (n.uri) {
      const r = i.manager.getHandler(n.uri);
      r !== null && (o = r);
    }
    return this.loadTextureImage(e, s, o);
  }
  loadTextureImage(e, a, i) {
    const t = this, s = this.json, n = s.textures[e], o = s.images[a], r = (o.uri || o.bufferView) + ":" + n.sampler;
    if (this.textureCache[r])
      return this.textureCache[r];
    const c = this.loadImageSource(a, i).then(function(l) {
      l.flipY = !1, l.name = n.name || o.name || "", l.name === "" && typeof o.uri == "string" && o.uri.startsWith("data:image/") === !1 && (l.name = o.uri);
      const d = (s.samplers || {})[n.sampler] || {};
      return l.magFilter = Oe[d.magFilter] || ee, l.minFilter = Oe[d.minFilter] || qe, l.wrapS = He[d.wrapS] || pe, l.wrapT = He[d.wrapT] || pe, l.generateMipmaps = !l.isCompressedTexture && l.minFilter !== Ke && l.minFilter !== ee, t.associations.set(l, { textures: e }), l;
    }).catch(function() {
      return null;
    });
    return this.textureCache[r] = c, c;
  }
  loadImageSource(e, a) {
    const i = this, t = this.json, s = this.options;
    if (this.sourceCache[e] !== void 0)
      return this.sourceCache[e].then((b) => b.clone());
    const n = t.images[e], o = self.URL || self.webkitURL;
    let r = n.uri || "", c = !1;
    if (n.bufferView !== void 0)
      r = i.getDependency("bufferView", n.bufferView).then(function(b) {
        c = !0;
        const d = new Blob([b], { type: n.mimeType });
        return r = o.createObjectURL(d), r;
      });
    else if (n.uri === void 0)
      throw new Error("THREE.GLTFLoader: Image " + e + " is missing URI and bufferView");
    const l = Promise.resolve(r).then(function(b) {
      return new Promise(function(d, f) {
        let T = d;
        a.isImageBitmapLoader === !0 && (T = function(R) {
          const k = new we(R);
          k.needsUpdate = !0, d(k);
        }), a.load(Z.resolveURL(b, s.path), T, void 0, f);
      });
    }).then(function(b) {
      return c === !0 && o.revokeObjectURL(r), N(b, n), b.userData.mimeType = n.mimeType || kt(n.uri), b;
    }).catch(function(b) {
      throw console.error("THREE.GLTFLoader: Couldn't load texture", r), b;
    });
    return this.sourceCache[e] = l, l;
  }
  /**
   * Asynchronously assigns a texture to the given material parameters.
   *
   * @private
   * @param {Object} materialParams
   * @param {string} mapName
   * @param {Object} mapDef
   * @param {string} [colorSpace]
   * @return {Promise<Texture>}
   */
  assignTexture(e, a, i, t) {
    const s = this;
    return this.getDependency("texture", i.index).then(function(n) {
      if (!n) return null;
      if (i.texCoord !== void 0 && i.texCoord > 0 && (n = n.clone(), n.channel = i.texCoord), s.extensions[S.KHR_TEXTURE_TRANSFORM]) {
        const o = i.extensions !== void 0 ? i.extensions[S.KHR_TEXTURE_TRANSFORM] : void 0;
        if (o) {
          const r = s.associations.get(n);
          n = s.extensions[S.KHR_TEXTURE_TRANSFORM].extendTexture(n, o), s.associations.set(n, r);
        }
      }
      return t !== void 0 && (n.colorSpace = t), e[a] = n, n;
    });
  }
  /**
   * Assigns final material to a Mesh, Line, or Points instance. The instance
   * already has a material (generated from the glTF material options alone)
   * but reuse of the same glTF material may require multiple threejs materials
   * to accommodate different primitive types, defines, etc. New materials will
   * be created if necessary, and reused from a cache.
   *
   * @private
   * @param {Object3D} mesh Mesh, Line, or Points instance.
   */
  assignFinalMaterial(e) {
    const a = e.geometry;
    let i = e.material;
    const t = a.attributes.tangent === void 0, s = a.attributes.color !== void 0, n = a.attributes.normal === void 0;
    if (e.isPoints) {
      const o = "PointsMaterial:" + i.uuid;
      let r = this.cache.get(o);
      r || (r = new fa(), re.prototype.copy.call(r, i), r.color.copy(i.color), r.map = i.map, r.sizeAttenuation = !1, this.cache.add(o, r)), i = r;
    } else if (e.isLine) {
      const o = "LineBasicMaterial:" + i.uuid;
      let r = this.cache.get(o);
      r || (r = new pa(), re.prototype.copy.call(r, i), r.color.copy(i.color), r.map = i.map, this.cache.add(o, r)), i = r;
    }
    if (t || s || n) {
      let o = "ClonedMaterial:" + i.uuid + ":";
      t && (o += "derivative-tangents:"), s && (o += "vertex-colors:"), n && (o += "flat-shading:");
      let r = this.cache.get(o);
      r || (r = i.clone(), s && (r.vertexColors = !0), n && (r.flatShading = !0), t && (r.normalScale && (r.normalScale.y *= -1), r.clearcoatNormalScale && (r.clearcoatNormalScale.y *= -1)), this.cache.add(o, r), this.associations.set(r, this.associations.get(i))), i = r;
    }
    e.material = i;
  }
  getMaterialType() {
    return Be;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
   *
   * @private
   * @param {number} materialIndex
   * @return {Promise<Material>}
   */
  loadMaterial(e) {
    const a = this, i = this.json, t = this.extensions, s = i.materials[e];
    let n;
    const o = {}, r = s.extensions || {}, c = [];
    if (r[S.KHR_MATERIALS_UNLIT]) {
      const b = t[S.KHR_MATERIALS_UNLIT];
      n = b.getMaterialType(), c.push(b.extendParams(o, s, a));
    } else {
      const b = s.pbrMetallicRoughness || {};
      if (o.color = new B(1, 1, 1), o.opacity = 1, Array.isArray(b.baseColorFactor)) {
        const d = b.baseColorFactor;
        o.color.setRGB(d[0], d[1], d[2], D), o.opacity = d[3];
      }
      b.baseColorTexture !== void 0 && c.push(a.assignTexture(o, "map", b.baseColorTexture, q)), o.metalness = b.metallicFactor !== void 0 ? b.metallicFactor : 1, o.roughness = b.roughnessFactor !== void 0 ? b.roughnessFactor : 1, b.metallicRoughnessTexture !== void 0 && (c.push(a.assignTexture(o, "metalnessMap", b.metallicRoughnessTexture)), c.push(a.assignTexture(o, "roughnessMap", b.metallicRoughnessTexture))), n = this._invokeOne(function(d) {
        return d.getMaterialType && d.getMaterialType(e);
      }), c.push(Promise.all(this._invokeAll(function(d) {
        return d.extendMaterialParams && d.extendMaterialParams(e, o);
      })));
    }
    s.doubleSided === !0 && (o.side = ua);
    const l = s.alphaMode || le.OPAQUE;
    if (l === le.BLEND ? (o.transparent = !0, o.depthWrite = !1) : (o.transparent = !1, l === le.MASK && (o.alphaTest = s.alphaCutoff !== void 0 ? s.alphaCutoff : 0.5)), s.normalTexture !== void 0 && n !== Y && (c.push(a.assignTexture(o, "normalMap", s.normalTexture)), o.normalScale = new ke(1, 1), s.normalTexture.scale !== void 0)) {
      const b = s.normalTexture.scale;
      o.normalScale.set(b, b);
    }
    if (s.occlusionTexture !== void 0 && n !== Y && (c.push(a.assignTexture(o, "aoMap", s.occlusionTexture)), s.occlusionTexture.strength !== void 0 && (o.aoMapIntensity = s.occlusionTexture.strength)), s.emissiveFactor !== void 0 && n !== Y) {
      const b = s.emissiveFactor;
      o.emissive = new B().setRGB(b[0], b[1], b[2], D);
    }
    return s.emissiveTexture !== void 0 && n !== Y && c.push(a.assignTexture(o, "emissiveMap", s.emissiveTexture, q)), Promise.all(c).then(function() {
      const b = new n(o);
      return s.name && (b.name = s.name), N(b, s), a.associations.set(b, { materials: e }), s.extensions && W(t, b, s), b;
    });
  }
  /**
   * When Object3D instances are targeted by animation, they need unique names.
   *
   * @private
   * @param {string} originalName
   * @return {string}
   */
  createUniqueName(e) {
    const a = ga.sanitizeNodeName(e || "");
    return a in this.nodeNamesUsed ? a + "_" + ++this.nodeNamesUsed[a] : (this.nodeNamesUsed[a] = 0, a);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#geometry
   *
   * Creates BufferGeometries from primitives.
   *
   * @private
   * @param {Array<GLTF.Primitive>} primitives
   * @return {Promise<Array<BufferGeometry>>}
   */
  loadGeometries(e) {
    const a = this, i = this.extensions, t = this.primitiveCache;
    function s(o) {
      return i[S.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o, a).then(function(r) {
        return Ge(r, o, a);
      });
    }
    const n = [];
    for (let o = 0, r = e.length; o < r; o++) {
      const c = e[o], l = mt(c), b = t[l];
      if (b)
        n.push(b.promise);
      else {
        let d;
        c.extensions && c.extensions[S.KHR_DRACO_MESH_COMPRESSION] ? d = s(c) : d = Ge(new We(), c, a), t[l] = { primitive: c, promise: d }, n.push(d);
      }
    }
    return Promise.all(n);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
   *
   * @private
   * @param {number} meshIndex
   * @return {Promise<Group|Mesh|SkinnedMesh|Line|Points>}
   */
  loadMesh(e) {
    const a = this, i = this.json, t = this.extensions, s = i.meshes[e], n = s.primitives, o = [];
    for (let r = 0, c = n.length; r < c; r++) {
      const l = n[r].material === void 0 ? pt(this.cache) : this.getDependency("material", n[r].material);
      o.push(l);
    }
    return o.push(a.loadGeometries(n)), Promise.all(o).then(function(r) {
      const c = r.slice(0, r.length - 1), l = r[r.length - 1], b = [];
      for (let f = 0, T = l.length; f < T; f++) {
        const R = l[f], k = n[f];
        let p;
        const u = c[f];
        if (k.mode === G.TRIANGLES || k.mode === G.TRIANGLE_STRIP || k.mode === G.TRIANGLE_FAN || k.mode === void 0)
          p = s.isSkinnedMesh === !0 ? new ma(R, u) : new se(R, u), p.isSkinnedMesh === !0 && p.normalizeSkinWeights(), k.mode === G.TRIANGLE_STRIP ? p.geometry = Le(p.geometry, Ne) : k.mode === G.TRIANGLE_FAN && (p.geometry = Le(p.geometry, fe));
        else if (k.mode === G.LINES)
          p = new ka(R, u);
        else if (k.mode === G.LINE_STRIP)
          p = new xa(R, u);
        else if (k.mode === G.LINE_LOOP)
          p = new Ta(R, u);
        else if (k.mode === G.POINTS)
          p = new wa(R, u);
        else
          throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + k.mode);
        Object.keys(p.geometry.morphAttributes).length > 0 && gt(p, s), p.name = a.createUniqueName(s.name || "mesh_" + e), N(p, s), k.extensions && W(t, p, k), a.assignFinalMaterial(p), b.push(p);
      }
      for (let f = 0, T = b.length; f < T; f++)
        a.associations.set(b[f], {
          meshes: e,
          primitives: f
        });
      if (b.length === 1)
        return s.extensions && W(t, b[0], s), b[0];
      const d = new oe();
      s.extensions && W(t, d, s), a.associations.set(d, { meshes: e });
      for (let f = 0, T = b.length; f < T; f++)
        d.add(b[f]);
      return d;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#cameras
   *
   * @private
   * @param {number} cameraIndex
   * @return {Promise<Camera>|undefined}
   */
  loadCamera(e) {
    let a;
    const i = this.json.cameras[e], t = i[i.type];
    if (!t) {
      console.warn("THREE.GLTFLoader: Missing camera parameters.");
      return;
    }
    return i.type === "perspective" ? a = new Qe(Ra.radToDeg(t.yfov), t.aspectRatio || 1, t.znear || 1, t.zfar || 2e6) : i.type === "orthographic" && (a = new Aa(-t.xmag, t.xmag, t.ymag, -t.ymag, t.znear, t.zfar)), i.name && (a.name = this.createUniqueName(i.name)), N(a, i), Promise.resolve(a);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
   *
   * @private
   * @param {number} skinIndex
   * @return {Promise<Skeleton>}
   */
  loadSkin(e) {
    const a = this.json.skins[e], i = [];
    for (let t = 0, s = a.joints.length; t < s; t++)
      i.push(this._loadNodeShallow(a.joints[t]));
    return a.inverseBindMatrices !== void 0 ? i.push(this.getDependency("accessor", a.inverseBindMatrices)) : i.push(null), Promise.all(i).then(function(t) {
      const s = t.pop(), n = t, o = [], r = [];
      for (let c = 0, l = n.length; c < l; c++) {
        const b = n[c];
        if (b) {
          o.push(b);
          const d = new ie();
          s !== null && d.fromArray(s.array, c * 16), r.push(d);
        } else
          console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', a.joints[c]);
      }
      return new Ea(o, r);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations
   *
   * @private
   * @param {number} animationIndex
   * @return {Promise<AnimationClip>}
   */
  loadAnimation(e) {
    const a = this.json, i = this, t = a.animations[e], s = t.name ? t.name : "animation_" + e, n = [], o = [], r = [], c = [], l = [];
    for (let b = 0, d = t.channels.length; b < d; b++) {
      const f = t.channels[b], T = t.samplers[f.sampler], R = f.target, k = R.node, p = t.parameters !== void 0 ? t.parameters[T.input] : T.input, u = t.parameters !== void 0 ? t.parameters[T.output] : T.output;
      R.node !== void 0 && (n.push(this.getDependency("node", k)), o.push(this.getDependency("accessor", p)), r.push(this.getDependency("accessor", u)), c.push(T), l.push(R));
    }
    return Promise.all([
      Promise.all(n),
      Promise.all(o),
      Promise.all(r),
      Promise.all(c),
      Promise.all(l)
    ]).then(function(b) {
      const d = b[0], f = b[1], T = b[2], R = b[3], k = b[4], p = [];
      for (let m = 0, g = d.length; m < g; m++) {
        const w = d[m], j = f[m], M = T[m], x = R[m], E = k[m];
        if (w === void 0) continue;
        w.updateMatrix && w.updateMatrix();
        const A = i._createAnimationTracks(w, j, M, x, E);
        if (A)
          for (let _ = 0; _ < A.length; _++)
            p.push(A[_]);
      }
      const u = new Sa(s, void 0, p);
      return N(u, t), u;
    });
  }
  createNodeMesh(e) {
    const a = this.json, i = this, t = a.nodes[e];
    return t.mesh === void 0 ? null : i.getDependency("mesh", t.mesh).then(function(s) {
      const n = i._getNodeRef(i.meshCache, t.mesh, s);
      return t.weights !== void 0 && n.traverse(function(o) {
        if (o.isMesh)
          for (let r = 0, c = t.weights.length; r < c; r++)
            o.morphTargetInfluences[r] = t.weights[r];
      }), n;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodes-and-hierarchy
   *
   * @private
   * @param {number} nodeIndex
   * @return {Promise<Object3D>}
   */
  loadNode(e) {
    const a = this.json, i = this, t = a.nodes[e], s = i._loadNodeShallow(e), n = [], o = t.children || [];
    for (let c = 0, l = o.length; c < l; c++)
      n.push(i.getDependency("node", o[c]));
    const r = t.skin === void 0 ? Promise.resolve(null) : i.getDependency("skin", t.skin);
    return Promise.all([
      s,
      Promise.all(n),
      r
    ]).then(function(c) {
      const l = c[0], b = c[1], d = c[2];
      d !== null && l.traverse(function(f) {
        f.isSkinnedMesh && f.bind(d, xt);
      });
      for (let f = 0, T = b.length; f < T; f++)
        l.add(b[f]);
      return l;
    });
  }
  // ._loadNodeShallow() parses a single node.
  // skin and child nodes are created and added in .loadNode() (no '_' prefix).
  _loadNodeShallow(e) {
    const a = this.json, i = this.extensions, t = this;
    if (this.nodeCache[e] !== void 0)
      return this.nodeCache[e];
    const s = a.nodes[e], n = s.name ? t.createUniqueName(s.name) : "", o = [], r = t._invokeOne(function(c) {
      return c.createNodeMesh && c.createNodeMesh(e);
    });
    return r && o.push(r), s.camera !== void 0 && o.push(t.getDependency("camera", s.camera).then(function(c) {
      return t._getNodeRef(t.cameraCache, s.camera, c);
    })), t._invokeAll(function(c) {
      return c.createNodeAttachment && c.createNodeAttachment(e);
    }).forEach(function(c) {
      o.push(c);
    }), this.nodeCache[e] = Promise.all(o).then(function(c) {
      let l;
      if (s.isBone === !0 ? l = new ya() : c.length > 1 ? l = new oe() : c.length === 1 ? l = c[0] : l = new ze(), l !== c[0])
        for (let b = 0, d = c.length; b < d; b++)
          l.add(c[b]);
      if (s.name && (l.userData.name = s.name, l.name = n), N(l, s), s.extensions && W(i, l, s), s.matrix !== void 0) {
        const b = new ie();
        b.fromArray(s.matrix), l.applyMatrix4(b);
      } else
        s.translation !== void 0 && l.position.fromArray(s.translation), s.rotation !== void 0 && l.quaternion.fromArray(s.rotation), s.scale !== void 0 && l.scale.fromArray(s.scale);
      if (!t.associations.has(l))
        t.associations.set(l, {});
      else if (s.mesh !== void 0 && t.meshCache.refs[s.mesh] > 1) {
        const b = t.associations.get(l);
        t.associations.set(l, { ...b });
      }
      return t.associations.get(l).nodes = e, l;
    }), this.nodeCache[e];
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenes
   *
   * @private
   * @param {number} sceneIndex
   * @return {Promise<Group>}
   */
  loadScene(e) {
    const a = this.extensions, i = this.json.scenes[e], t = this, s = new oe();
    i.name && (s.name = t.createUniqueName(i.name)), N(s, i), i.extensions && W(a, s, i);
    const n = i.nodes || [], o = [];
    for (let r = 0, c = n.length; r < c; r++)
      o.push(t.getDependency("node", n[r]));
    return Promise.all(o).then(function(r) {
      for (let l = 0, b = r.length; l < b; l++)
        s.add(r[l]);
      const c = (l) => {
        const b = /* @__PURE__ */ new Map();
        for (const [d, f] of t.associations)
          (d instanceof re || d instanceof we) && b.set(d, f);
        return l.traverse((d) => {
          const f = t.associations.get(d);
          f != null && b.set(d, f);
        }), b;
      };
      return t.associations = c(s), s;
    });
  }
  _createAnimationTracks(e, a, i, t, s) {
    const n = [], o = e.name ? e.name : e.uuid, r = [];
    K[s.path] === K.weights ? e.traverse(function(d) {
      d.morphTargetInfluences && r.push(d.name ? d.name : d.uuid);
    }) : r.push(o);
    let c;
    switch (K[s.path]) {
      case K.weights:
        c = Ae;
        break;
      case K.rotation:
        c = Ee;
        break;
      case K.translation:
      case K.scale:
        c = Re;
        break;
      default:
        switch (i.itemSize) {
          case 1:
            c = Ae;
            break;
          case 2:
          case 3:
          default:
            c = Re;
            break;
        }
        break;
    }
    const l = t.interpolation !== void 0 ? ft[t.interpolation] : Ve, b = this._getArrayFromAccessor(i);
    for (let d = 0, f = r.length; d < f; d++) {
      const T = new c(
        r[d] + "." + K[s.path],
        a.array,
        b,
        l
      );
      t.interpolation === "CUBICSPLINE" && this._createCubicSplineTrackInterpolant(T), n.push(T);
    }
    return n;
  }
  _getArrayFromAccessor(e) {
    let a = e.array;
    if (e.normalized) {
      const i = me(a.constructor), t = new Float32Array(a.length);
      for (let s = 0, n = a.length; s < n; s++)
        t[s] = a[s] * i;
      a = t;
    }
    return a;
  }
  _createCubicSplineTrackInterpolant(e) {
    e.createInterpolant = function(i) {
      const t = this instanceof Ee ? ht : Ze;
      return new t(this.times, this.values, this.getValueSize() / 3, i);
    }, e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0;
  }
}
function wt(h, e, a) {
  const i = e.attributes, t = new Je();
  if (i.POSITION !== void 0) {
    const o = a.json.accessors[i.POSITION], r = o.min, c = o.max;
    if (r !== void 0 && c !== void 0) {
      if (t.set(
        new C(r[0], r[1], r[2]),
        new C(c[0], c[1], c[2])
      ), o.normalized) {
        const l = me(V[o.componentType]);
        t.min.multiplyScalar(l), t.max.multiplyScalar(l);
      }
    } else {
      console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      return;
    }
  } else
    return;
  const s = e.targets;
  if (s !== void 0) {
    const o = new C(), r = new C();
    for (let c = 0, l = s.length; c < l; c++) {
      const b = s[c];
      if (b.POSITION !== void 0) {
        const d = a.json.accessors[b.POSITION], f = d.min, T = d.max;
        if (f !== void 0 && T !== void 0) {
          if (r.setX(Math.max(Math.abs(f[0]), Math.abs(T[0]))), r.setY(Math.max(Math.abs(f[1]), Math.abs(T[1]))), r.setZ(Math.max(Math.abs(f[2]), Math.abs(T[2]))), d.normalized) {
            const R = me(V[d.componentType]);
            r.multiplyScalar(R);
          }
          o.max(r);
        } else
          console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      }
    }
    t.expandByVector(o);
  }
  h.boundingBox = t;
  const n = new La();
  t.getCenter(n.center), n.radius = t.min.distanceTo(t.max) / 2, h.boundingSphere = n;
}
function Ge(h, e, a) {
  const i = e.attributes, t = [];
  function s(n, o) {
    return a.getDependency("accessor", n).then(function(r) {
      h.setAttribute(o, r);
    });
  }
  for (const n in i) {
    const o = ge[n] || n.toLowerCase();
    o in h.attributes || t.push(s(i[n], o));
  }
  if (e.indices !== void 0 && !h.index) {
    const n = a.getDependency("accessor", e.indices).then(function(o) {
      h.setIndex(o);
    });
    t.push(n);
  }
  return ue.workingColorSpace !== D && "COLOR_0" in i && console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ue.workingColorSpace}" not supported.`), N(h, e), wt(h, e, a), Promise.all(t).then(function() {
    return e.targets !== void 0 ? ut(h, e.targets, a) : h;
  });
}
const he = /* @__PURE__ */ new WeakMap();
class Ce extends Pe {
  /**
   * Constructs a new Draco loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(e) {
    super(e), this.decoderPath = "", this.decoderConfig = {}, this.decoderBinary = null, this.decoderPending = null, this.workerLimit = 4, this.workerPool = [], this.workerNextTaskID = 1, this.workerSourceURL = "", this.defaultAttributeIDs = {
      position: "POSITION",
      normal: "NORMAL",
      color: "COLOR",
      uv: "TEX_COORD"
    }, this.defaultAttributeTypes = {
      position: "Float32Array",
      normal: "Float32Array",
      color: "Float32Array",
      uv: "Float32Array"
    };
  }
  /**
   * Provides configuration for the decoder libraries. Configuration cannot be changed after decoding begins.
   *
   * @param {string} path - The decoder path.
   * @return {DRACOLoader} A reference to this loader.
   */
  setDecoderPath(e) {
    return this.decoderPath = e, this;
  }
  /**
   * Provides configuration for the decoder libraries. Configuration cannot be changed after decoding begins.
   *
   * @param {{type:('js'|'wasm')}} config - The decoder config.
   * @return {DRACOLoader} A reference to this loader.
   */
  setDecoderConfig(e) {
    return this.decoderConfig = e, this;
  }
  /**
   * Sets the maximum number of Web Workers to be used during decoding.
   * A lower limit may be preferable if workers are also for other tasks in the application.
   *
   * @param {number} workerLimit - The worker limit.
   * @return {DRACOLoader} A reference to this loader.
   */
  setWorkerLimit(e) {
    return this.workerLimit = e, this;
  }
  /**
   * Starts loading from the given URL and passes the loaded Draco asset
   * to the `onLoad()` callback.
   *
   * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
   * @param {function(BufferGeometry)} onLoad - Executed when the loading process has been finished.
   * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
   * @param {onErrorCallback} onError - Executed when errors occur.
   */
  load(e, a, i, t) {
    const s = new ne(this.manager);
    s.setPath(this.path), s.setResponseType("arraybuffer"), s.setRequestHeader(this.requestHeader), s.setWithCredentials(this.withCredentials), s.load(e, (n) => {
      this.parse(n, a, t);
    }, i, t);
  }
  /**
   * Parses the given Draco data.
   *
   * @param {ArrayBuffer} buffer - The raw Draco data as an array buffer.
   * @param {function(BufferGeometry)} onLoad - Executed when the loading/parsing process has been finished.
   * @param {onErrorCallback} onError - Executed when errors occur.
   */
  parse(e, a, i = () => {
  }) {
    this.decodeDracoFile(e, a, null, null, q, i).catch(i);
  }
  //
  decodeDracoFile(e, a, i, t, s = D, n = () => {
  }) {
    const o = {
      attributeIDs: i || this.defaultAttributeIDs,
      attributeTypes: t || this.defaultAttributeTypes,
      useUniqueIDs: !!i,
      vertexColorSpace: s
    };
    return this.decodeGeometry(e, o).then(a).catch(n);
  }
  decodeGeometry(e, a) {
    const i = JSON.stringify(a);
    if (he.has(e)) {
      const r = he.get(e);
      if (r.key === i)
        return r.promise;
      if (e.byteLength === 0)
        throw new Error(
          "THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred."
        );
    }
    let t;
    const s = this.workerNextTaskID++, n = e.byteLength, o = this._getWorker(s, n).then((r) => (t = r, new Promise((c, l) => {
      t._callbacks[s] = { resolve: c, reject: l }, t.postMessage({ type: "decode", id: s, taskConfig: a, buffer: e }, [e]);
    }))).then((r) => this._createGeometry(r.geometry));
    return o.catch(() => !0).then(() => {
      t && s && this._releaseTask(t, s);
    }), he.set(e, {
      key: i,
      promise: o
    }), o;
  }
  _createGeometry(e) {
    const a = new We();
    e.index && a.setIndex(new $(e.index.array, 1));
    for (let i = 0; i < e.attributes.length; i++) {
      const { name: t, array: s, itemSize: n, stride: o, vertexColorSpace: r } = e.attributes[i];
      let c;
      if (n === o)
        c = new $(s, n);
      else {
        const l = new Ue(s, o);
        c = new Xe(l, n, 0);
      }
      t === "color" && (this._assignVertexColorSpace(c, r), c.normalized = !(s instanceof Float32Array)), a.setAttribute(t, c);
    }
    return a;
  }
  _assignVertexColorSpace(e, a) {
    if (a !== q) return;
    const i = new B();
    for (let t = 0, s = e.count; t < s; t++)
      i.fromBufferAttribute(e, t), ue.colorSpaceToWorking(i, q), e.setXYZ(t, i.r, i.g, i.b);
  }
  _loadLibrary(e, a) {
    const i = new ne(this.manager);
    return i.setPath(this.decoderPath), i.setResponseType(a), i.setWithCredentials(this.withCredentials), new Promise((t, s) => {
      i.load(e, t, void 0, s);
    });
  }
  preload() {
    return this._initDecoder(), this;
  }
  _initDecoder() {
    if (this.decoderPending) return this.decoderPending;
    const e = typeof WebAssembly != "object" || this.decoderConfig.type === "js", a = [];
    return e ? a.push(this._loadLibrary("draco_decoder.js", "text")) : (a.push(this._loadLibrary("draco_wasm_wrapper.js", "text")), a.push(this._loadLibrary("draco_decoder.wasm", "arraybuffer"))), this.decoderPending = Promise.all(a).then((i) => {
      const t = i[0];
      e || (this.decoderConfig.wasmBinary = i[1]);
      const s = Rt.toString(), n = [
        "/* draco decoder */",
        t,
        "",
        "/* worker */",
        s.substring(s.indexOf("{") + 1, s.lastIndexOf("}"))
      ].join(`
`);
      this.workerSourceURL = URL.createObjectURL(new Blob([n]));
    }), this.decoderPending;
  }
  _getWorker(e, a) {
    return this._initDecoder().then(() => {
      if (this.workerPool.length < this.workerLimit) {
        const t = new Worker(this.workerSourceURL);
        t._callbacks = {}, t._taskCosts = {}, t._taskLoad = 0, t.postMessage({ type: "init", decoderConfig: this.decoderConfig }), t.onmessage = function(s) {
          const n = s.data;
          switch (n.type) {
            case "decode":
              t._callbacks[n.id].resolve(n);
              break;
            case "error":
              t._callbacks[n.id].reject(n);
              break;
            default:
              console.error('THREE.DRACOLoader: Unexpected message, "' + n.type + '"');
          }
        }, this.workerPool.push(t);
      } else
        this.workerPool.sort(function(t, s) {
          return t._taskLoad > s._taskLoad ? -1 : 1;
        });
      const i = this.workerPool[this.workerPool.length - 1];
      return i._taskCosts[e] = a, i._taskLoad += a, i;
    });
  }
  _releaseTask(e, a) {
    e._taskLoad -= e._taskCosts[a], delete e._callbacks[a], delete e._taskCosts[a];
  }
  debug() {
    console.log("Task load: ", this.workerPool.map((e) => e._taskLoad));
  }
  dispose() {
    for (let e = 0; e < this.workerPool.length; ++e)
      this.workerPool[e].terminate();
    return this.workerPool.length = 0, this.workerSourceURL !== "" && URL.revokeObjectURL(this.workerSourceURL), this;
  }
}
function Rt() {
  let h, e;
  onmessage = function(n) {
    const o = n.data;
    switch (o.type) {
      case "init":
        h = o.decoderConfig, e = new Promise(function(l) {
          h.onModuleLoaded = function(b) {
            l({ draco: b });
          }, DracoDecoderModule(h);
        });
        break;
      case "decode":
        const r = o.buffer, c = o.taskConfig;
        e.then((l) => {
          const b = l.draco, d = new b.Decoder();
          try {
            const f = a(b, d, new Int8Array(r), c), T = f.attributes.map((R) => R.array.buffer);
            f.index && T.push(f.index.array.buffer), self.postMessage({ type: "decode", id: o.id, geometry: f }, T);
          } catch (f) {
            console.error(f), self.postMessage({ type: "error", id: o.id, error: f.message });
          } finally {
            b.destroy(d);
          }
        });
        break;
    }
  };
  function a(n, o, r, c) {
    const l = c.attributeIDs, b = c.attributeTypes;
    let d, f;
    const T = o.GetEncodedGeometryType(r);
    if (T === n.TRIANGULAR_MESH)
      d = new n.Mesh(), f = o.DecodeArrayToMesh(r, r.byteLength, d);
    else if (T === n.POINT_CLOUD)
      d = new n.PointCloud(), f = o.DecodeArrayToPointCloud(r, r.byteLength, d);
    else
      throw new Error("THREE.DRACOLoader: Unexpected geometry type.");
    if (!f.ok() || d.ptr === 0)
      throw new Error("THREE.DRACOLoader: Decoding failed: " + f.error_msg());
    const R = { index: null, attributes: [] };
    for (const k in l) {
      const p = self[b[k]];
      let u, m;
      if (c.useUniqueIDs)
        m = l[k], u = o.GetAttributeByUniqueId(d, m);
      else {
        if (m = o.GetAttributeId(d, n[l[k]]), m === -1) continue;
        u = o.GetAttribute(d, m);
      }
      const g = t(n, o, d, k, p, u);
      k === "color" && (g.vertexColorSpace = c.vertexColorSpace), R.attributes.push(g);
    }
    return T === n.TRIANGULAR_MESH && (R.index = i(n, o, d)), n.destroy(d), R;
  }
  function i(n, o, r) {
    const l = r.num_faces() * 3, b = l * 4, d = n._malloc(b);
    o.GetTrianglesUInt32Array(r, b, d);
    const f = new Uint32Array(n.HEAPF32.buffer, d, l).slice();
    return n._free(d), { array: f, itemSize: 1 };
  }
  function t(n, o, r, c, l, b) {
    const d = r.num_points(), f = b.num_components(), T = s(n, l), R = f * l.BYTES_PER_ELEMENT, k = Math.ceil(R / 4) * 4, p = k / l.BYTES_PER_ELEMENT, u = d * R, m = d * k, g = n._malloc(u);
    o.GetAttributeDataArrayForAllPoints(r, b, T, u, g);
    const w = new l(n.HEAPF32.buffer, g, u / l.BYTES_PER_ELEMENT);
    let j;
    if (R === k)
      j = w.slice();
    else {
      j = new l(m / l.BYTES_PER_ELEMENT);
      let M = 0;
      for (let x = 0, E = w.length; x < E; x++) {
        for (let A = 0; A < f; A++)
          j[M + A] = w[x * f + A];
        M += p;
      }
    }
    return n._free(g), {
      name: c,
      count: d,
      itemSize: f,
      array: j,
      stride: p
    };
  }
  function s(n, o) {
    switch (o) {
      case Float32Array:
        return n.DT_FLOAT32;
      case Int8Array:
        return n.DT_INT8;
      case Int16Array:
        return n.DT_INT16;
      case Int32Array:
        return n.DT_INT32;
      case Uint8Array:
        return n.DT_UINT8;
      case Uint16Array:
        return n.DT_UINT16;
      case Uint32Array:
        return n.DT_UINT32;
    }
  }
}
var De = (function() {
  var h = "b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuikqbeeedddillviebeoweuec:q:Odkr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbol79IV9Rbrq;w8Wqdbk;esezu8Jjjjjbcj;eb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Radz1jjjbhwcj;abad9Uc;WFbGgocjdaocjd6EhDaicefhocbhqdnindndndnaeaq9nmbaDaeaq9RaqaDfae6Egkcsfglcl4cifcd4hxalc9WGgmTmecbhPawcjdfhsaohzinaraz9Rax6mvarazaxfgo9RcK6mvczhlcbhHinalgic9WfgOawcj;cbffhldndndndndnazaOco4fRbbaHcoG4ciGPlbedibkal9cb83ibalcwf9cb83ibxikalaoRblaoRbbgOco4gAaAciSgAE86bbawcj;cbfaifglcGfaoclfaAfgARbbaOcl4ciGgCaCciSgCE86bbalcVfaAaCfgARbbaOcd4ciGgCaCciSgCE86bbalc7faAaCfgARbbaOciGgOaOciSgOE86bbalctfaAaOfgARbbaoRbegOco4gCaCciSgCE86bbalc91faAaCfgARbbaOcl4ciGgCaCciSgCE86bbalc4faAaCfgARbbaOcd4ciGgCaCciSgCE86bbalc93faAaCfgARbbaOciGgOaOciSgOE86bbalc94faAaOfgARbbaoRbdgOco4gCaCciSgCE86bbalc95faAaCfgARbbaOcl4ciGgCaCciSgCE86bbalc96faAaCfgARbbaOcd4ciGgCaCciSgCE86bbalc97faAaCfgARbbaOciGgOaOciSgOE86bbalc98faAaOfgORbbaoRbigoco4gAaAciSgAE86bbalc99faOaAfgORbbaocl4ciGgAaAciSgAE86bbalc9:faOaAfgORbbaocd4ciGgAaAciSgAE86bbalcufaOaAfglRbbaociGgoaociSgoE86bbalaofhoxdkalaoRbwaoRbbgOcl4gAaAcsSgAE86bbawcj;cbfaifglcGfaocwfaAfgARbbaOcsGgOaOcsSgOE86bbalcVfaAaOfgORbbaoRbegAcl4gCaCcsSgCE86bbalc7faOaCfgORbbaAcsGgAaAcsSgAE86bbalctfaOaAfgORbbaoRbdgAcl4gCaCcsSgCE86bbalc91faOaCfgORbbaAcsGgAaAcsSgAE86bbalc4faOaAfgORbbaoRbigAcl4gCaCcsSgCE86bbalc93faOaCfgORbbaAcsGgAaAcsSgAE86bbalc94faOaAfgORbbaoRblgAcl4gCaCcsSgCE86bbalc95faOaCfgORbbaAcsGgAaAcsSgAE86bbalc96faOaAfgORbbaoRbvgAcl4gCaCcsSgCE86bbalc97faOaCfgORbbaAcsGgAaAcsSgAE86bbalc98faOaAfgORbbaoRbogAcl4gCaCcsSgCE86bbalc99faOaCfgORbbaAcsGgAaAcsSgAE86bbalc9:faOaAfgORbbaoRbrgocl4gAaAcsSgAE86bbalcufaOaAfglRbbaocsGgoaocsSgoE86bbalaofhoxekalao8Pbb83bbalcwfaocwf8Pbb83bbaoczfhokdnaiam9pmbaHcdfhHaiczfhlarao9RcL0mekkaiam6mvaoTmvdnakTmbawaPfRbbhHawcj;cbfhlashiakhOinaialRbbgzce4cbazceG9R7aHfgH86bbaiadfhialcefhlaOcufgOmbkkascefhsaohzaPcefgPad9hmbxikkcbc99arao9Radcaadca0ESEhoxlkaoaxad2fhCdnakmbadhlinaoTmlarao9Rax6mlaoaxfhoalcufglmbkaChoxekcbhmawcjdfhAinarao9Rax6miawamfRbbhHawcj;cbfhlaAhiakhOinaialRbbgzce4cbazceG9R7aHfgH86bbaiadfhialcefhlaOcufgOmbkaAcefhAaoaxfhoamcefgmad9hmbkaChokabaqad2fawcjdfakad2z1jjjb8Aawawcjdfakcufad2fadz1jjjb8Aakaqfhqaombkc9:hoxekc9:hokavcj;ebf8Kjjjjbaok;cseHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgwce0mbavc;abfcFecjez:jjjjb8AavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhDaicefgqarfhidnaeTmbcmcsawceSEhkcbhxcbhmcbhPcbhwcbhlindnaiaD9nmbc9:hoxikdndnaqRbbgoc;Ve0mbavc;abfalaocu7gscl4fcsGcitfgzydlhrazydbhzdnaocsGgHak9pmbavawasfcsGcdtfydbaxaHEhoaHThsdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkaxasfhxcdhHavawcdtfaoBdbawasfhwcehsalhOxdkdndnaHcsSmbaHc987aHamffcefhoxekaicefhoai8SbbgHcFeGhsdndnaHcu9mmbaohixekaicvfhiascFbGhscrhHdninao8SbbgOcFbGaHtasVhsaOcu9kmeaocefhoaHcrfgHc8J9hmbxdkkaocefhikasce4cbasceG9R7amfhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhHavawcdtfaoBdbcehsawcefhwalhOaohmxekdnaocpe0mbaxcefgHavawaDaocsGfRbbgocl49RcsGcdtfydbaocz6gzEhravawao9RcsGcdtfydbaHazfgAaocsGgHEhoaHThCdndnadcd9hmbabaPcetfgHax87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHaxBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfaxBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgOaxBdlaOarBdbavawazfgwcsGcdtfaoBdbalcefcsGhOawaCfhwaxhzaAaCfhxxekaxcbaiRbbgOEgzaoc;:eSgHfhraOcsGhCaOcl4hAdndnaOcs0mbarcefhoxekarhoavawaA9RcsGcdtfydbhrkdndnaCmbaocefhxxekaohxavawaO9RcsGcdtfydbhokdndnaHTmbaicefhHxekaicdfhHai8SbegscFeGhzdnascu9kmbaicofhXazcFbGhzcrhidninaH8SbbgscFbGaitazVhzascu9kmeaHcefhHaicrfgic8J9hmbkaXhHxekaHcefhHkazce4cbazceG9R7amfgmhzkdndnaAcsSmbaHhsxekaHcefhsaH8SbbgicFeGhrdnaicu9kmbaHcvfhXarcFbGhrcrhidninas8SbbgHcFbGaitarVhraHcu9kmeascefhsaicrfgic8J9hmbkaXhsxekascefhskarce4cbarceG9R7amfgmhrkdndnaCcsSmbashixekascefhias8SbbgocFeGhHdnaocu9kmbascvfhXaHcFbGhHcrhodninai8SbbgscFbGaotaHVhHascu9kmeaicefhiaocrfgoc8J9hmbkaXhixekaicefhikaHce4cbaHceG9R7amfgmhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfazBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgXazBdlaXarBdbavawaOcz6aAcsSVfgwcsGcdtfaoBdbawaCTaCcsSVfhwalcefcsGhOkaqcefhqavc;abfaOcitfgOarBdlaOaoBdbavc;abfalasfcsGcitfgraoBdlarazBdbawcsGhwalaHfcsGhlaPcifgPae6mbkkcbc99aiaDSEhokavc;aef8Kjjjjbaok:flevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaic8Etc8F91aicd47avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaic8Etc8F91aicd47avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk;oiliui99iue99dnaeTmbcbhiabhlindndnJ;Zl81Zalcof8UebgvciV:Y:vgoal8Ueb:YNgrJb;:FSNJbbbZJbbb:;arJbbbb9GEMgw:lJbbb9p9DTmbaw:OhDxekcjjjj94hDkalclf8Uebhqalcdf8UebhkabaiavcefciGfcetfaD87ebdndnaoak:YNgwJb;:FSNJbbbZJbbb:;awJbbbb9GEMgx:lJbbb9p9DTmbax:OhDxekcjjjj94hDkabaiavciGfgkcd7cetfaD87ebdndnaoaq:YNgoJb;:FSNJbbbZJbbb:;aoJbbbb9GEMgx:lJbbb9p9DTmbax:OhDxekcjjjj94hDkabaiavcufciGfcetfaD87ebdndnJbbjZararN:tawawN:taoaoN:tgrJbbbbarJbbbb9GE:rJb;:FSNJbbbZMgr:lJbbb9p9DTmbar:Ohvxekcjjjj94hvkabakcetfav87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2gdTmbinababydbgecwtcw91:Yaece91cjjj98Gcjjj;8if::NUdbabclfhbadcufgdmbkkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkkkebcjwklzNbb", e = "b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuikqbbebeedddilve9Weeeviebeoweuec:q:6dkr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbwl79IV9RbDq:p9sqlbzik9:evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaec:q:yjjbfai86bbaecitc:q1jjbfab8Piw83ibaecefgecjd9hmbkk:N8JlHud97euo978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Rad;8qbbcj;abad9UhlaicefhodnaeTmbadTmbalc;WFbGglcjdalcjd6EhwcbhDinawaeaD9RaDawfae6Egqcsfglc9WGgkci2hxakcethmalcl4cifcd4hPabaDad2fhsakc;ab6hzcbhHincbhOaohAdndninaraA9RaP6meavcj;cbfaOak2fhCaAaPfhocbhidnazmbarao9Rc;Gb6mbcbhlinaCalfhidndndndndnaAalco4fRbbgXciGPlbedibkaipxbbbbbbbbbbbbbbbbpklbxikaiaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbaoclfaYpQbfaKc:q:yjjbfRbbfhoxdkaiaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbaocwfaYpQbfaKc:q:yjjbfRbbfhoxekaiaopbbbpklbaoczfhokdndndndndnaXcd4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklzxikaiaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzaoclfaYpQbfaKc:q:yjjbfRbbfhoxdkaiaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzaocwfaYpQbfaKc:q:yjjbfRbbfhoxekaiaopbbbpklzaoczfhokdndndndndnaXcl4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklaxikaiaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaaoclfaYpQbfaKc:q:yjjbfRbbfhoxdkaiaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaaocwfaYpQbfaKc:q:yjjbfRbbfhoxekaiaopbbbpklaaoczfhokdndndndndnaXco4Plbedibkaipxbbbbbbbbbbbbbbbbpkl8WxikaiaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WaoclfaYpQbfaXc:q:yjjbfRbbfhoxdkaiaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WaocwfaYpQbfaXc:q:yjjbfRbbfhoxekaiaopbbbpkl8Waoczfhokalc;abfhialcjefak0meaihlarao9Rc;Fb0mbkkdnaiak9pmbaici4hlinarao9RcK6miaCaifhXdndndndndnaAaico4fRbbalcoG4ciGPlbedibkaXpxbbbbbbbbbbbbbbbbpkbbxikaXaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkbbaoclfaYpQbfaKc:q:yjjbfRbbfhoxdkaXaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkbbaocwfaYpQbfaKc:q:yjjbfRbbfhoxekaXaopbbbpkbbaoczfhokalcdfhlaiczfgiak6mbkkaoTmeaohAaOcefgOclSmdxbkkc9:hoxlkdnakTmbavcjdfaHfhiavaHfpbdbhYcbhXinaiavcj;cbfaXfglpblbgLcep9TaLpxeeeeeeeeeeeeeeeegQp9op9Hp9rgLalakfpblbg8Acep9Ta8AaQp9op9Hp9rg8ApmbzeHdOiAlCvXoQrLgEalamfpblbg3cep9Ta3aQp9op9Hp9rg3alaxfpblbg5cep9Ta5aQp9op9Hp9rg5pmbzeHdOiAlCvXoQrLg8EpmbezHdiOAlvCXorQLgQaQpmbedibedibedibediaYp9UgYp9AdbbaiadfglaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaladfglaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaladfglaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaladfglaYaEa8EpmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaladfglaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaladfglaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaladfglaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaladfglaYaLa8ApmwKDYq8AkEx3m5P8Es8FgLa3a5pmwKDYq8AkEx3m5P8Es8Fg8ApmbezHdiOAlvCXorQLgQaQpmbedibedibedibedip9UgYp9AdbbaladfglaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaladfglaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaladfglaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaladfglaYaLa8ApmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaladfglaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaladfglaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaladfglaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaladfhiaXczfgXak6mbkkaHclfgHad6mbkasavcjdfaqad2;8qbbavavcjdfaqcufad2fad;8qbbaqaDfgDae6mbkkcbc99arao9Radcaadca0ESEhokavcj;kbf8Kjjjjbaokwbz:bjjjbk::seHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgwce0mbavc;abfcFecje;8kbavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhDaicefgqarfhidnaeTmbcmcsawceSEhkcbhxcbhmcbhPcbhwcbhlindnaiaD9nmbc9:hoxikdndnaqRbbgoc;Ve0mbavc;abfalaocu7gscl4fcsGcitfgzydlhrazydbhzdnaocsGgHak9pmbavawasfcsGcdtfydbaxaHEhoaHThsdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkaxasfhxcdhHavawcdtfaoBdbawasfhwcehsalhOxdkdndnaHcsSmbaHc987aHamffcefhoxekaicefhoai8SbbgHcFeGhsdndnaHcu9mmbaohixekaicvfhiascFbGhscrhHdninao8SbbgOcFbGaHtasVhsaOcu9kmeaocefhoaHcrfgHc8J9hmbxdkkaocefhikasce4cbasceG9R7amfhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhHavawcdtfaoBdbcehsawcefhwalhOaohmxekdnaocpe0mbaxcefgHavawaDaocsGfRbbgocl49RcsGcdtfydbaocz6gzEhravawao9RcsGcdtfydbaHazfgAaocsGgHEhoaHThCdndnadcd9hmbabaPcetfgHax87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHaxBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfaxBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgOaxBdlaOarBdbavawazfgwcsGcdtfaoBdbalcefcsGhOawaCfhwaxhzaAaCfhxxekaxcbaiRbbgOEgzaoc;:eSgHfhraOcsGhCaOcl4hAdndnaOcs0mbarcefhoxekarhoavawaA9RcsGcdtfydbhrkdndnaCmbaocefhxxekaohxavawaO9RcsGcdtfydbhokdndnaHTmbaicefhHxekaicdfhHai8SbegscFeGhzdnascu9kmbaicofhXazcFbGhzcrhidninaH8SbbgscFbGaitazVhzascu9kmeaHcefhHaicrfgic8J9hmbkaXhHxekaHcefhHkazce4cbazceG9R7amfgmhzkdndnaAcsSmbaHhsxekaHcefhsaH8SbbgicFeGhrdnaicu9kmbaHcvfhXarcFbGhrcrhidninas8SbbgHcFbGaitarVhraHcu9kmeascefhsaicrfgic8J9hmbkaXhsxekascefhskarce4cbarceG9R7amfgmhrkdndnaCcsSmbashixekascefhias8SbbgocFeGhHdnaocu9kmbascvfhXaHcFbGhHcrhodninai8SbbgscFbGaotaHVhHascu9kmeaicefhiaocrfgoc8J9hmbkaXhixekaicefhikaHce4cbaHceG9R7amfgmhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfazBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgXazBdlaXarBdbavawaOcz6aAcsSVfgwcsGcdtfaoBdbawaCTaCcsSVfhwalcefcsGhOkaqcefhqavc;abfaOcitfgOarBdlaOaoBdbavc;abfalasfcsGcitfgraoBdlarazBdbawcsGhwalaHfcsGhlaPcifgPae6mbkkcbc99aiaDSEhokavc;aef8Kjjjjbaok:flevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaic8Etc8F91aicd47avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaic8Etc8F91aicd47avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:wPliuo97eue978Jjjjjbca9Rhiaec98Ghldndnadcl9hmbdnalTmbcbhvabhdinadadpbbbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbadczfhdavclfgval6mbkkalaeSmeaipxbbbbbbbbbbbbbbbbgqpklbaiabalcdtfgdaeciGglcdtgv;8qbbdnalTmbaiaipblbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDaqp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpklbkadaiav;8qbbskdnalTmbcbhvabhdinadczfgxaxpbbbgopxbbbbbbFFbbbbbbFFgkp9oadpbbbgDaopmbediwDqkzHOAKY8AEgwczp:Reczp:Sep;6egraDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eawczp:Sep;6egwp;Gearp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegrpxb;:FSb;:FSb;:FSb;:FSararp;Meaoaop;Meawaqawamp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFFbbFFbbFFbbFFbbp9oaoawp;Meaqp;Keczp:Rep9qgoarawp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogrpmwDKYqk8AExm35Ps8E8Fp9qpkbbadaDakp9oaoarpmbezHdiOAlvCXorQLp9qpkbbadcafhdavclfgval6mbkkalaeSmbaiaeciGgvcitgdfcbcaad9R;8kbaiabalcitfglad;8qbbdnavTmbaiaipblzgopxbbbbbbFFbbbbbbFFgkp9oaipblbgDaopmbediwDqkzHOAKY8AEgwczp:Reczp:Sep;6egraDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eawczp:Sep;6egwp;Gearp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegrpxb;:FSb;:FSb;:FSb;:FSararp;Meaoaop;Meawaqawamp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFFbbFFbbFFbbFFbbp9oaoawp;Meaqp;Keczp:Rep9qgoarawp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogrpmwDKYqk8AExm35Ps8E8Fp9qpklzaiaDakp9oaoarpmbezHdiOAlvCXorQLp9qpklbkalaiad;8qbbkk;4wllue97euv978Jjjjjbc8W9Rhidnaec98GglTmbcbhvabhoinaiaopbbbgraoczfgwpbbbgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklbaopxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaDakp;Mearp;Keamp9oaqakp;Mearp;Keczp:Rep9qgkpmbezHdiOAlvCXorQLgrp5baipblbpEb:T:j83ibaocwfarp5eaipblbpEe:T:j83ibawaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblbpEd:T:j83ibaocKfakp5eaipblbpEi:T:j83ibaocafhoavclfgval6mbkkdnalaeSmbaiaeciGgvcitgofcbcaao9R;8kbaiabalcitfgwao;8qbbdnavTmbaiaipblbgraipblzgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklaaipxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaDakp;Mearp;Keamp9oaqakp;Mearp;Keczp:Rep9qgkpmbezHdiOAlvCXorQLgrp5baipblapEb:T:j83ibaiarp5eaipblapEe:T:j83iwaiaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblapEd:T:j83izaiakp5eaipblapEi:T:j83iKkawaiao;8qbbkk:Pddiue978Jjjjjbc;ab9Rhidnadcd4ae2glc98GgvTmbcbheabhdinadadpbbbgocwp:Recwp:Sep;6eaocep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepkbbadczfhdaeclfgeav6mbkkdnavalSmbaialciGgecdtgdVcbc;abad9R;8kbaiabavcdtfgvad;8qbbdnaeTmbaiaipblbgocwp:Recwp:Sep;6eaocep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepklbkavaiad;8qbbkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkkebcjwklz:Dbb", a = new Uint8Array([
    0,
    97,
    115,
    109,
    1,
    0,
    0,
    0,
    1,
    4,
    1,
    96,
    0,
    0,
    3,
    3,
    2,
    0,
    0,
    5,
    3,
    1,
    0,
    1,
    12,
    1,
    0,
    10,
    22,
    2,
    12,
    0,
    65,
    0,
    65,
    0,
    65,
    0,
    252,
    10,
    0,
    0,
    11,
    7,
    0,
    65,
    0,
    253,
    15,
    26,
    11
  ]), i = new Uint8Array([
    32,
    0,
    65,
    2,
    1,
    106,
    34,
    33,
    3,
    128,
    11,
    4,
    13,
    64,
    6,
    253,
    10,
    7,
    15,
    116,
    127,
    5,
    8,
    12,
    40,
    16,
    19,
    54,
    20,
    9,
    27,
    255,
    113,
    17,
    42,
    67,
    24,
    23,
    146,
    148,
    18,
    14,
    22,
    45,
    70,
    69,
    56,
    114,
    101,
    21,
    25,
    63,
    75,
    136,
    108,
    28,
    118,
    29,
    73,
    115
  ]);
  if (typeof WebAssembly != "object")
    return {
      supported: !1
    };
  var t = WebAssembly.validate(a) ? o(e) : o(h), s, n = WebAssembly.instantiate(t, {}).then(function(p) {
    s = p.instance, s.exports.__wasm_call_ctors();
  });
  function o(p) {
    for (var u = new Uint8Array(p.length), m = 0; m < p.length; ++m) {
      var g = p.charCodeAt(m);
      u[m] = g > 96 ? g - 97 : g > 64 ? g - 39 : g + 4;
    }
    for (var w = 0, m = 0; m < p.length; ++m)
      u[w++] = u[m] < 60 ? i[u[m]] : (u[m] - 60) * 64 + u[++m];
    return u.buffer.slice(0, w);
  }
  function r(p, u, m, g, w, j, M) {
    var x = p.exports.sbrk, E = g + 3 & -4, A = x(E * w), _ = x(j.length), v = new Uint8Array(p.exports.memory.buffer);
    v.set(j, _);
    var F = u(A, g, w, _, j.length);
    if (F == 0 && M && M(A, E, w), m.set(v.subarray(A, A + g * w)), x(A - x(0)), F != 0)
      throw new Error("Malformed buffer data: " + F);
  }
  var c = {
    NONE: "",
    OCTAHEDRAL: "meshopt_decodeFilterOct",
    QUATERNION: "meshopt_decodeFilterQuat",
    EXPONENTIAL: "meshopt_decodeFilterExp"
  }, l = {
    ATTRIBUTES: "meshopt_decodeVertexBuffer",
    TRIANGLES: "meshopt_decodeIndexBuffer",
    INDICES: "meshopt_decodeIndexSequence"
  }, b = [], d = 0;
  function f(p) {
    var u = {
      object: new Worker(p),
      pending: 0,
      requests: {}
    };
    return u.object.onmessage = function(m) {
      var g = m.data;
      u.pending -= g.count, u.requests[g.id][g.action](g.value), delete u.requests[g.id];
    }, u;
  }
  function T(p) {
    for (var u = "self.ready = WebAssembly.instantiate(new Uint8Array([" + new Uint8Array(t) + "]), {}).then(function(result) { result.instance.exports.__wasm_call_ctors(); return result.instance; });self.onmessage = " + k.name + ";" + r.toString() + k.toString(), m = new Blob([u], { type: "text/javascript" }), g = URL.createObjectURL(m), w = b.length; w < p; ++w)
      b[w] = f(g);
    for (var w = p; w < b.length; ++w)
      b[w].object.postMessage({});
    b.length = p, URL.revokeObjectURL(g);
  }
  function R(p, u, m, g, w) {
    for (var j = b[0], M = 1; M < b.length; ++M)
      b[M].pending < j.pending && (j = b[M]);
    return new Promise(function(x, E) {
      var A = new Uint8Array(m), _ = ++d;
      j.pending += p, j.requests[_] = { resolve: x, reject: E }, j.object.postMessage({ id: _, count: p, size: u, source: A, mode: g, filter: w }, [A.buffer]);
    });
  }
  function k(p) {
    var u = p.data;
    if (!u.id)
      return self.close();
    self.ready.then(function(m) {
      try {
        var g = new Uint8Array(u.count * u.size);
        r(m, m.exports[u.mode], g, u.count, u.size, u.source, m.exports[u.filter]), self.postMessage({ id: u.id, count: u.count, action: "resolve", value: g }, [g.buffer]);
      } catch (w) {
        self.postMessage({ id: u.id, count: u.count, action: "reject", value: w });
      }
    });
  }
  return {
    ready: n,
    supported: !0,
    useWorkers: function(p) {
      T(p);
    },
    decodeVertexBuffer: function(p, u, m, g, w) {
      r(s, s.exports.meshopt_decodeVertexBuffer, p, u, m, g, s.exports[c[w]]);
    },
    decodeIndexBuffer: function(p, u, m, g) {
      r(s, s.exports.meshopt_decodeIndexBuffer, p, u, m, g);
    },
    decodeIndexSequence: function(p, u, m, g) {
      r(s, s.exports.meshopt_decodeIndexSequence, p, u, m, g);
    },
    decodeGltfBuffer: function(p, u, m, g, w, j) {
      r(s, s.exports[l[w]], p, u, m, g, s.exports[c[j]]);
    },
    decodeGltfBufferAsync: function(p, u, m, g, w) {
      return b.length > 0 ? R(p, u, m, l[g], c[w]) : n.then(function() {
        var j = new Uint8Array(p * u);
        return r(s, s.exports[l[g]], j, p, u, m, s.exports[c[w]]), j;
      });
    }
  };
})();
class At extends Fa {
  /**
      * Constructs a new RGBE/HDR loader.
      *
      * @param {LoadingManager} [manager] - The loading manager.
      */
  constructor(e) {
    super(e), this.type = ae;
  }
  /**
      * Parses the given RGBE texture data.
      *
      * @param {ArrayBuffer} buffer - The raw texture data.
      * @return {DataTextureLoader~TexData} An object representing the parsed texture data.
      */
  parse(e) {
    const n = function(x, E) {
      switch (x) {
        case 1:
          throw new Error("THREE.HDRLoader: Read Error: " + (E || ""));
        case 2:
          throw new Error("THREE.HDRLoader: Write Error: " + (E || ""));
        case 3:
          throw new Error("THREE.HDRLoader: Bad File Format: " + (E || ""));
        default:
        case 4:
          throw new Error("THREE.HDRLoader: Memory Error: " + (E || ""));
      }
    }, b = function(x, E, A) {
      E = E || 1024;
      let v = x.pos, F = -1, y = 0, O = "", L = String.fromCharCode.apply(null, new Uint16Array(x.subarray(v, v + 128)));
      for (; 0 > (F = L.indexOf(`
`)) && y < E && v < x.byteLength; )
        O += L, y += L.length, v += 128, L += String.fromCharCode.apply(null, new Uint16Array(x.subarray(v, v + 128)));
      return -1 < F ? (x.pos += y + F + 1, O + L.slice(0, F)) : !1;
    }, d = function(x) {
      const E = /^#\?(\S+)/, A = /^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/, _ = /^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/, v = /^\s*FORMAT=(\S+)\s*$/, F = /^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/, y = {
        valid: 0,
        /* indicate which fields are valid */
        string: "",
        /* the actual header string */
        comments: "",
        /* comments found in header */
        programtype: "RGBE",
        /* listed at beginning of file to identify it after "#?". defaults to "RGBE" */
        format: "",
        /* RGBE format, default 32-bit_rle_rgbe */
        gamma: 1,
        /* image has already been gamma corrected with given gamma. defaults to 1.0 (no correction) */
        exposure: 1,
        /* a value of 1.0 in an image corresponds to <exposure> watts/steradian/m^2. defaults to 1.0 */
        width: 0,
        height: 0
        /* image dimensions, width/height */
      };
      let O, L;
      for ((x.pos >= x.byteLength || !(O = b(x))) && n(1, "no header found"), (L = O.match(E)) || n(3, "bad initial token"), y.valid |= 1, y.programtype = L[1], y.string += O + `
`; O = b(x), O !== !1; ) {
        if (y.string += O + `
`, O.charAt(0) === "#") {
          y.comments += O + `
`;
          continue;
        }
        if ((L = O.match(A)) && (y.gamma = parseFloat(L[1])), (L = O.match(_)) && (y.exposure = parseFloat(L[1])), (L = O.match(v)) && (y.valid |= 2, y.format = L[1]), (L = O.match(F)) && (y.valid |= 4, y.height = parseInt(L[1], 10), y.width = parseInt(L[2], 10)), y.valid & 2 && y.valid & 4) break;
      }
      return y.valid & 2 || n(3, "missing format specifier"), y.valid & 4 || n(3, "missing image size specifier"), y;
    }, f = function(x, E, A) {
      const _ = E;
      if (
        // run length encoding is not allowed so read flat
        _ < 8 || _ > 32767 || // this file is not run length encoded
        x[0] !== 2 || x[1] !== 2 || x[2] & 128
      )
        return new Uint8Array(x);
      _ !== (x[2] << 8 | x[3]) && n(3, "wrong scanline width");
      const v = new Uint8Array(4 * E * A);
      v.length || n(4, "unable to allocate buffer space");
      let F = 0, y = 0;
      const O = 4 * _, L = new Uint8Array(4), Q = new Uint8Array(O);
      let xe = A;
      for (; xe > 0 && y < x.byteLength; ) {
        y + 4 > x.byteLength && n(1), L[0] = x[y++], L[1] = x[y++], L[2] = x[y++], L[3] = x[y++], (L[0] != 2 || L[1] != 2 || (L[2] << 8 | L[3]) != _) && n(3, "bad rgbe scanline format");
        let X = 0, I;
        for (; X < O && y < x.byteLength; ) {
          I = x[y++];
          const z = I > 128;
          if (z && (I -= 128), (I === 0 || X + I > O) && n(3, "bad scanline data"), z) {
            const U = x[y++];
            for (let Te = 0; Te < I; Te++)
              Q[X++] = U;
          } else
            Q.set(x.subarray(y, y + I), X), X += I, y += I;
        }
        const $e = _;
        for (let z = 0; z < $e; z++) {
          let U = 0;
          v[F] = Q[z + U], U += _, v[F + 1] = Q[z + U], U += _, v[F + 2] = Q[z + U], U += _, v[F + 3] = Q[z + U], F += 4;
        }
        xe--;
      }
      return v;
    }, T = function(x, E, A, _) {
      const v = x[E + 3], F = Math.pow(2, v - 128) / 255;
      A[_ + 0] = x[E + 0] * F, A[_ + 1] = x[E + 1] * F, A[_ + 2] = x[E + 2] * F, A[_ + 3] = 1;
    }, R = function(x, E, A, _) {
      const v = x[E + 3], F = Math.pow(2, v - 128) / 255;
      A[_ + 0] = te.toHalfFloat(Math.min(x[E + 0] * F, 65504)), A[_ + 1] = te.toHalfFloat(Math.min(x[E + 1] * F, 65504)), A[_ + 2] = te.toHalfFloat(Math.min(x[E + 2] * F, 65504)), A[_ + 3] = te.toHalfFloat(1);
    }, k = new Uint8Array(e);
    k.pos = 0;
    const p = d(k), u = p.width, m = p.height, g = f(k.subarray(k.pos), u, m);
    let w, j, M;
    switch (this.type) {
      case ce:
        M = g.length / 4;
        const x = new Float32Array(M * 4);
        for (let A = 0; A < M; A++)
          T(g, A * 4, x, A * 4);
        w = x, j = ce;
        break;
      case ae:
        M = g.length / 4;
        const E = new Uint16Array(M * 4);
        for (let A = 0; A < M; A++)
          R(g, A * 4, E, A * 4);
        w = E, j = ae;
        break;
      default:
        throw new Error("THREE.HDRLoader: Unsupported type: " + this.type);
    }
    return {
      width: u,
      height: m,
      data: w,
      header: p.string,
      gamma: p.gamma,
      exposure: p.exposure,
      type: j
    };
  }
  /**
      * Sets the texture type.
      *
      * @param {(HalfFloatType|FloatType)} value - The texture type to set.
      * @return {HDRLoader} A reference to this loader.
      */
  setDataType(e) {
    return this.type = e, this;
  }
  load(e, a, i, t) {
    function s(n, o) {
      switch (n.type) {
        case ce:
        case ae:
          n.colorSpace = D, n.minFilter = ee, n.magFilter = ee, n.generateMipmaps = !1, n.flipY = !0;
          break;
      }
      a && a(n, o);
    }
    return super.load(e, s, i, t);
  }
}
class yt {
  scene = null;
  camera = null;
  renderer = null;
  model = null;
  mixer = null;
  clock = null;
  requestAnimationId = null;
  isWebGPU = !1;
  targetPosition = new C(0, 0, 0);
  targetLookAt = new C(0, 0, 0);
  currentLookAt = new C(0, 0, 0);
  fpsTracker = new Ia();
  loadTime = 0;
  statsManager = null;
  environmentTexture = null;
  // Track for disposal
  // Comparator mode properties (using scissor test)
  _comparatorMode = !1;
  _splitPosition = 0.5;
  sceneRight = null;
  modelRight = null;
  mixerRight = null;
  async init(e, a) {
    if (this.clock = new va(), this.scene = new Se(), this.scene.background = null, this.camera = new Qe(
      H.fov,
      e.width / e.height,
      H.cameraNear,
      H.cameraFar
    ), this.camera.lookAt(new C(H.initialCameraTarget.x, H.initialCameraTarget.y, H.initialCameraTarget.z)), this.isWebGPU = a === Oa.WebGPU, this.isWebGPU) {
      const i = await import("./three.webgpu-DliwmH7Z.js");
      this.renderer = new i.WebGPURenderer({
        canvas: e,
        antialias: !0,
        alpha: !0
      }), await this.renderer.init();
    } else
      this.renderer = new ye({ canvas: e, antialias: !0, alpha: !0, premultipliedAlpha: !0, preserveDrawingBuffer: !1 });
    this.renderer.setSize(e.width, e.height), this.renderer.setPixelRatio(window.devicePixelRatio), this.renderer.autoClear = !0, this.renderer.toneMapping = je, this.renderer.toneMappingExposure = H.toneMappingExposure, this.renderer.outputColorSpace = q, this.isWebGPU || (this.statsManager = new za(), this.statsManager.init(e)), this.animate();
  }
  disposeModel() {
    !this.model || !this.scene || (this.mixer && (this.mixer.stopAllAction(), this.mixer = null), this.scene.remove(this.model), this.model.traverse((e) => {
      e instanceof se && (e.geometry?.dispose(), Array.isArray(e.material) ? e.material.forEach((a) => a.dispose()) : e.material?.dispose());
    }), this.model = null);
  }
  normalizeModel(e) {
    const a = new Je().setFromObject(e), i = a.getCenter(new C()), t = a.getSize(new C());
    let s = 1;
    const n = Math.max(t.x, t.z);
    n > 0 && (s = H.maxModelSize / n, e.scale.multiplyScalar(s)), e.position.sub(i.clone().multiplyScalar(s));
  }
  async loadModel(e) {
    this.disposeModel();
    const a = new Fe(), i = new Ce();
    i.setDecoderPath(_e.draco.decoderPath), a.setDRACOLoader(i), a.setMeshoptDecoder(De);
    const t = performance.now();
    try {
      const s = await a.loadAsync(e);
      this.loadTime = performance.now() - t, this.scene && (this.model = s.scene, this.normalizeModel(this.model), this.scene.add(this.model), s.animations && s.animations.length > 0 && (this.mixer = new Me(this.model), s.animations.forEach((n) => {
        this.mixer?.clipAction(n).play();
      })));
    } catch (s) {
      throw console.error("Error loading GLB:", s), s;
    }
  }
  async loadEnvironment(e) {
    if (!this.scene) return;
    this.environmentTexture && (this.environmentTexture.dispose(), this.environmentTexture = null);
    const a = new At();
    try {
      const i = await a.loadAsync(e);
      if (i.mapping = Ha, this.isWebGPU)
        this.environmentTexture = i, this.scene.environment = i, this.sceneRight && (this.sceneRight.environment = i);
      else if (this.renderer instanceof ye) {
        const t = new Ga(this.renderer);
        t.compileEquirectangularShader();
        const s = t.fromEquirectangular(i).texture;
        this.environmentTexture = s, this.scene.environment = s, this.scene.environmentIntensity = H.environmentIntensity, this.sceneRight && (this.sceneRight.environment = s, this.sceneRight.environmentIntensity = H.environmentIntensity), i.dispose(), t.dispose();
      }
    } catch (i) {
      throw console.error("Error loading HDR environment:", i), i;
    }
  }
  /**
   * Resize the renderer when window dimensions change
   * @param width - New width in pixels (must be > 0)
   * @param height - New height in pixels (must be > 0)
   */
  resize(e, a) {
    if (e <= 0 || a <= 0) {
      console.warn("Invalid resize dimensions:", { width: e, height: a });
      return;
    }
    this.camera && this.renderer && (this.camera.aspect = e / a, this.camera.updateProjectionMatrix(), this.renderer.setPixelRatio(window.devicePixelRatio), this.renderer.setSize(e, a, !0), this.scene && this.renderer.render(this.scene, this.camera));
  }
  getStats() {
    if (!this.renderer)
      return Ca;
    const e = this.renderer.info;
    return {
      fps: this.fpsTracker.fps,
      drawCalls: e?.render.calls ?? 0,
      loadTimeMs: this.loadTime,
      gpuTimeMs: this.statsManager?.getGPUTime() ?? void 0
    };
  }
  setCameraPosition(e, a, i = !1) {
    this.targetPosition.set(e.x, e.y, e.z), this.targetLookAt.set(a.x, a.y, a.z), i && this.camera && (this.camera.position.copy(this.targetPosition), this.currentLookAt.copy(this.targetLookAt), this.camera.lookAt(this.currentLookAt));
  }
  setExposure(e) {
    this.renderer && (this.renderer.toneMappingExposure = e);
  }
  setTonemapping(e) {
    if (this.renderer)
      switch (e) {
        case "linear":
          this.renderer.toneMapping = Pa;
          break;
        case "reinhard":
          this.renderer.toneMapping = Na;
          break;
        case "aces":
          this.renderer.toneMapping = Da;
          break;
        case "neutral":
        default:
          this.renderer.toneMapping = je;
          break;
      }
  }
  // Comparator Mode Methods (using scissor test)
  enableComparatorMode(e) {
    this._comparatorMode || !this.renderer || !this.scene || (this._comparatorMode = !0, this._splitPosition = e, this.sceneRight = new Se(), this.sceneRight.background = null, this.sceneRight.environment = this.scene.environment, this.scene.environmentIntensity !== void 0 && (this.sceneRight.environmentIntensity = this.scene.environmentIntensity));
  }
  disableComparatorMode() {
    this._comparatorMode && (this._comparatorMode = !1, this.disposeModelRight(), this.sceneRight = null);
  }
  setSplitPosition(e) {
    this._splitPosition = e;
  }
  async loadModelToSide(e, a) {
    a === "left" ? await this.loadModel(e) : await this.loadModelRight(e);
  }
  isComparatorModeActive() {
    return this._comparatorMode;
  }
  async loadModelRight(e) {
    if (!this.sceneRight) return;
    this.disposeModelRight();
    const a = new Fe(), i = new Ce();
    i.setDecoderPath(_e.draco.decoderPath), a.setDRACOLoader(i), a.setMeshoptDecoder(De);
    const t = performance.now();
    try {
      const s = await a.loadAsync(e);
      this.loadTime = performance.now() - t, this.modelRight = s.scene, this.normalizeModel(this.modelRight), this.sceneRight.add(this.modelRight), s.animations && s.animations.length > 0 && (this.mixerRight = new Me(this.modelRight), s.animations.forEach((n) => {
        this.mixerRight?.clipAction(n).play();
      }));
    } catch (s) {
      throw console.error("Error loading right GLB:", s), s;
    }
  }
  disposeModelRight() {
    !this.modelRight || !this.sceneRight || (this.mixerRight && (this.mixerRight.stopAllAction(), this.mixerRight = null), this.sceneRight.remove(this.modelRight), this.modelRight.traverse((e) => {
      e instanceof se && (e.geometry?.dispose(), Array.isArray(e.material) ? e.material.forEach((a) => a.dispose()) : e.material?.dispose());
    }), this.modelRight = null);
  }
  dispose() {
    this.requestAnimationId !== null && (cancelAnimationFrame(this.requestAnimationId), this.requestAnimationId = null), this.disableComparatorMode(), this.environmentTexture && (this.environmentTexture.dispose(), this.environmentTexture = null), this.disposeThreeScene(this.scene, this.renderer, this.mixer), this.statsManager && (this.statsManager.dispose(), this.statsManager = null), this.scene = null, this.camera = null, this.renderer = null, this.mixer = null, this.clock = null;
  }
  animate = () => {
    if (this.requestAnimationId = requestAnimationFrame(this.animate), this.fpsTracker.update(), this.clock) {
      const e = this.clock.getDelta();
      this.mixer && this.mixer.update(e), this.mixerRight && this.mixerRight.update(e);
    }
    if (this.renderer && this.scene && this.camera)
      try {
        if (this.camera.position.lerp(this.targetPosition, H.cameraLerpFactor), this.currentLookAt.lerp(this.targetLookAt, H.cameraLerpFactor), this.camera.lookAt(this.currentLookAt), this.statsManager && this.statsManager.begin(), this._comparatorMode && this.sceneRight) {
          const e = this.renderer, a = new ke();
          e.getSize(a);
          const i = a.x, t = a.y, s = Math.floor(i * this._splitPosition);
          e.setViewport(0, 0, i, t), e.setScissorTest(!0), e.setScissor(0, 0, s, t), e.render(this.scene, this.camera), e.setScissor(s, 0, i - s, t), e.render(this.sceneRight, this.camera), e.setScissorTest(!1);
        } else
          this.renderer.render(this.scene, this.camera);
        this.statsManager && (this.statsManager.end(), this.statsManager.update());
      } catch (e) {
        console.error("Rendering error:", e), this.requestAnimationId !== null && (cancelAnimationFrame(this.requestAnimationId), this.requestAnimationId = null);
      }
  };
  disposeThreeScene(e, a, i) {
    i && (i.stopAllAction(), i.uncacheRoot(i.getRoot())), e && e.traverse((t) => {
      t instanceof se && (t.geometry?.dispose(), t.material && (Array.isArray(t.material) ? t.material.forEach((s) => this.disposeMaterial(s)) : this.disposeMaterial(t.material)));
    }), a?.dispose();
  }
  disposeMaterial(e) {
    Object.keys(e).forEach((a) => {
      const i = e[a];
      i && typeof i == "object" && "minFilter" in i && i.dispose();
    }), e.dispose();
  }
}
export {
  yt as ThreeAdapter
};
