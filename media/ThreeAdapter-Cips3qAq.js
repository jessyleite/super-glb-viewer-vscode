import { di as ya, H as V, aC as iA, dj as fA, cS as J, L as AA, ef as xa, ed as jA, ee as me, dI as zA, dJ as CA, dp as oA, bU as Z, V as XA, I as X, S as W, n as Ga, k as Ta, l as La, M as mA, a4 as P, dv as Ma, a5 as we, cO as Na, dT as De, eb as Ua, ds as qa, cT as pA, cV as ke, an as kA, ap as _a, ao as ja, aq as Fe, ar as wA, am as KA, ak as Ka, al as Ha, b$ as Pa, G as FA, bZ as va, bT as Re, D as Ja, $ as dA, dX as Oa, c2 as Se, e5 as Ya, z as ZA, dG as Va, dE as Wa, dF as za, dW as Xa, dr as RA, J as ye, cz as Za, O as $a, e4 as At, cZ as et, d2 as at, dy as tt, dz as xe, cU as Ge, c6 as Ae, eg as ee, dS as ae, dZ as te, C as DA, h as it, dw as st, d4 as Te, cH as nt, c_ as ot, en as rt, em as gt, eH as hA, eo as ct, da as bt, d9 as It, db as Le, aB as ie, bq as se, bp as HA, bM as PA, bP as Et, bQ as dt, bN as ht, bO as Bt, bm as vA, bj as ne, bk as JA, bC as SA, by as uA, bx as lt, bw as Ct, bv as pt, bu as ft, bs as Me, bt as Ne, bd as OA, be as BA, bg as lA, c as gA, U as x, b8 as Ue, b7 as qe, bR as Qt, dh as ut, bn as mt, br as wt, e0 as Dt, eI as G, d7 as kt, a as oe, eJ as aA, eK as Ft, eL as re, v as ge, eM as QA, a7 as Rt, eN as St, eO as bA, t as yt, r as xt, q as Gt, N as Tt, el as Lt, dK as Mt } from "./index-BrYo9Yjb.js";
import { F as Nt } from "./FPSTracker-B6JnU7CM.js";
import { n as Ut } from "./index-BwuObN8-.js";
class qt extends ya {
  /**
      * Constructs a new RGBE/HDR loader.
      *
      * @param {LoadingManager} [manager] - The loading manager.
      */
  constructor(A) {
    super(A), this.type = V;
  }
  /**
      * Parses the given RGBE texture data.
      *
      * @param {ArrayBuffer} buffer - The raw texture data.
      * @return {DataTextureLoader~TexData} An object representing the parsed texture data.
      */
  parse(A) {
    const s = function(u, w) {
      switch (u) {
        case 1:
          throw new Error("THREE.HDRLoader: Read Error: " + (w || ""));
        case 2:
          throw new Error("THREE.HDRLoader: Write Error: " + (w || ""));
        case 3:
          throw new Error("THREE.HDRLoader: Bad File Format: " + (w || ""));
        default:
        case 4:
          throw new Error("THREE.HDRLoader: Memory Error: " + (w || ""));
      }
    }, g = function(u, w, m) {
      w = w || 1024;
      let M = u.pos, T = -1, D = 0, N = "", y = String.fromCharCode.apply(null, new Uint16Array(u.subarray(M, M + 128)));
      for (; 0 > (T = y.indexOf(`
`)) && D < w && M < u.byteLength; )
        N += y, D += y.length, M += 128, y += String.fromCharCode.apply(null, new Uint16Array(u.subarray(M, M + 128)));
      return -1 < T ? (u.pos += D + T + 1, N + y.slice(0, T)) : !1;
    }, I = function(u) {
      const w = /^#\?(\S+)/, m = /^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/, R = /^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/, M = /^\s*FORMAT=(\S+)\s*$/, T = /^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/, D = {
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
      let N, y;
      for ((u.pos >= u.byteLength || !(N = g(u))) && s(1, "no header found"), (y = N.match(w)) || s(3, "bad initial token"), D.valid |= 1, D.programtype = y[1], D.string += N + `
`; N = g(u), N !== !1; ) {
        if (D.string += N + `
`, N.charAt(0) === "#") {
          D.comments += N + `
`;
          continue;
        }
        if ((y = N.match(m)) && (D.gamma = parseFloat(y[1])), (y = N.match(R)) && (D.exposure = parseFloat(y[1])), (y = N.match(M)) && (D.valid |= 2, D.format = y[1]), (y = N.match(T)) && (D.valid |= 4, D.height = parseInt(y[1], 10), D.width = parseInt(y[2], 10)), D.valid & 2 && D.valid & 4) break;
      }
      return D.valid & 2 || s(3, "missing format specifier"), D.valid & 4 || s(3, "missing image size specifier"), D;
    }, E = function(u, w, m) {
      const R = w;
      if (
        // run length encoding is not allowed so read flat
        R < 8 || R > 32767 || // this file is not run length encoded
        u[0] !== 2 || u[1] !== 2 || u[2] & 128
      )
        return new Uint8Array(u);
      R !== (u[2] << 8 | u[3]) && s(3, "wrong scanline width");
      const M = new Uint8Array(4 * w * m);
      M.length || s(4, "unable to allocate buffer space");
      let T = 0, D = 0;
      const N = 4 * R, y = new Uint8Array(4), O = new Uint8Array(N);
      let eA = m;
      for (; eA > 0 && D < u.byteLength; ) {
        D + 4 > u.byteLength && s(1), y[0] = u[D++], y[1] = u[D++], y[2] = u[D++], y[3] = u[D++], (y[0] != 2 || y[1] != 2 || (y[2] << 8 | y[3]) != R) && s(3, "bad rgbe scanline format");
        let Y = 0, K;
        for (; Y < N && D < u.byteLength; ) {
          K = u[D++];
          const L = K > 128;
          if (L && (K -= 128), (K === 0 || Y + K > N) && s(3, "bad scanline data"), L) {
            const q = u[D++];
            for (let sA = 0; sA < K; sA++)
              O[Y++] = q;
          } else
            O.set(u.subarray(D, D + K), Y), Y += K, D += K;
        }
        const U = R;
        for (let L = 0; L < U; L++) {
          let q = 0;
          M[T] = O[L + q], q += R, M[T + 1] = O[L + q], q += R, M[T + 2] = O[L + q], q += R, M[T + 3] = O[L + q], T += 4;
        }
        eA--;
      }
      return M;
    }, l = function(u, w, m, R) {
      const M = u[w + 3], T = Math.pow(2, M - 128) / 255;
      m[R + 0] = u[w + 0] * T, m[R + 1] = u[w + 1] * T, m[R + 2] = u[w + 2] * T, m[R + 3] = 1;
    }, p = function(u, w, m, R) {
      const M = u[w + 3], T = Math.pow(2, M - 128) / 255;
      m[R + 0] = fA.toHalfFloat(Math.min(u[w + 0] * T, 65504)), m[R + 1] = fA.toHalfFloat(Math.min(u[w + 1] * T, 65504)), m[R + 2] = fA.toHalfFloat(Math.min(u[w + 2] * T, 65504)), m[R + 3] = fA.toHalfFloat(1);
    }, f = new Uint8Array(A);
    f.pos = 0;
    const h = I(f), d = h.width, C = h.height, B = E(f.subarray(f.pos), d, C);
    let Q, k, F;
    switch (this.type) {
      case iA:
        F = B.length / 4;
        const u = new Float32Array(F * 4);
        for (let m = 0; m < F; m++)
          l(B, m * 4, u, m * 4);
        Q = u, k = iA;
        break;
      case V:
        F = B.length / 4;
        const w = new Uint16Array(F * 4);
        for (let m = 0; m < F; m++)
          p(B, m * 4, w, m * 4);
        Q = w, k = V;
        break;
      default:
        throw new Error("THREE.HDRLoader: Unsupported type: " + this.type);
    }
    return {
      width: d,
      height: C,
      data: Q,
      header: h.string,
      gamma: h.gamma,
      exposure: h.exposure,
      type: k
    };
  }
  /**
      * Sets the texture type.
      *
      * @param {(HalfFloatType|FloatType)} value - The texture type to set.
      * @return {HDRLoader} A reference to this loader.
      */
  setDataType(A) {
    return this.type = A, this;
  }
  load(A, e, a, t) {
    function i(s, o) {
      switch (s.type) {
        case iA:
        case V:
          s.colorSpace = J, s.minFilter = AA, s.magFilter = AA, s.generateMipmaps = !1, s.flipY = !0;
          break;
      }
      e && e(s, o);
    }
    return super.load(A, i, a, t);
  }
}
function ce(b, A) {
  if (A === xa)
    return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), b;
  if (A === jA || A === me) {
    let e = b.getIndex();
    if (e === null) {
      const s = [], o = b.getAttribute("position");
      if (o !== void 0) {
        for (let n = 0; n < o.count; n++)
          s.push(n);
        b.setIndex(s), e = b.getIndex();
      } else
        return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), b;
    }
    const a = e.count - 2, t = [];
    if (A === jA)
      for (let s = 1; s <= a; s++)
        t.push(e.getX(0)), t.push(e.getX(s)), t.push(e.getX(s + 1));
    else
      for (let s = 0; s < a; s++)
        s % 2 === 0 ? (t.push(e.getX(s)), t.push(e.getX(s + 1)), t.push(e.getX(s + 2))) : (t.push(e.getX(s + 2)), t.push(e.getX(s + 1)), t.push(e.getX(s)));
    t.length / 3 !== a && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
    const i = b.clone();
    return i.setIndex(t), i.clearGroups(), i;
  } else
    return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", A), b;
}
function _t(b) {
  const A = /* @__PURE__ */ new Map(), e = /* @__PURE__ */ new Map(), a = b.clone();
  return _e(b, a, function(t, i) {
    A.set(i, t), e.set(t, i);
  }), a.traverse(function(t) {
    if (!t.isSkinnedMesh) return;
    const i = t, s = A.get(t), o = s.skeleton.bones;
    i.skeleton = s.skeleton.clone(), i.bindMatrix.copy(s.bindMatrix), i.skeleton.bones = o.map(function(n) {
      return e.get(n);
    }), i.bind(i.skeleton, i.bindMatrix);
  }), a;
}
function _e(b, A, e) {
  e(b, A);
  for (let a = 0; a < b.children.length; a++)
    _e(b.children[a], A.children[a], e);
}
class be extends zA {
  /**
   * Constructs a new glTF loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(A) {
    super(A), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(e) {
      return new vt(e);
    }), this.register(function(e) {
      return new Jt(e);
    }), this.register(function(e) {
      return new Ai(e);
    }), this.register(function(e) {
      return new ei(e);
    }), this.register(function(e) {
      return new ai(e);
    }), this.register(function(e) {
      return new Yt(e);
    }), this.register(function(e) {
      return new Vt(e);
    }), this.register(function(e) {
      return new Wt(e);
    }), this.register(function(e) {
      return new zt(e);
    }), this.register(function(e) {
      return new Pt(e);
    }), this.register(function(e) {
      return new Xt(e);
    }), this.register(function(e) {
      return new Ot(e);
    }), this.register(function(e) {
      return new $t(e);
    }), this.register(function(e) {
      return new Zt(e);
    }), this.register(function(e) {
      return new Kt(e);
    }), this.register(function(e) {
      return new Ie(e, S.EXT_MESHOPT_COMPRESSION);
    }), this.register(function(e) {
      return new Ie(e, S.KHR_MESHOPT_COMPRESSION);
    }), this.register(function(e) {
      return new ti(e);
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
  load(A, e, a, t) {
    const i = this;
    let s;
    if (this.resourcePath !== "")
      s = this.resourcePath;
    else if (this.path !== "") {
      const r = CA.extractUrlBase(A);
      s = CA.resolveURL(r, this.path);
    } else
      s = CA.extractUrlBase(A);
    this.manager.itemStart(A);
    const o = function(r) {
      t ? t(r) : console.error(r), i.manager.itemError(A), i.manager.itemEnd(A);
    }, n = new oA(this.manager);
    n.setPath(this.path), n.setResponseType("arraybuffer"), n.setRequestHeader(this.requestHeader), n.setWithCredentials(this.withCredentials), n.load(A, function(r) {
      try {
        i.parse(r, s, function(c) {
          e(c), i.manager.itemEnd(A);
        }, o);
      } catch (c) {
        o(c);
      }
    }, a, o);
  }
  /**
   * Sets the given Draco loader to this loader. Required for decoding assets
   * compressed with the `KHR_draco_mesh_compression` extension.
   *
   * @param {DRACOLoader} dracoLoader - The Draco loader to set.
   * @return {GLTFLoader} A reference to this loader.
   */
  setDRACOLoader(A) {
    return this.dracoLoader = A, this;
  }
  /**
   * Sets the given KTX2 loader to this loader. Required for loading KTX2
   * compressed textures.
   *
   * @param {KTX2Loader} ktx2Loader - The KTX2 loader to set.
   * @return {GLTFLoader} A reference to this loader.
   */
  setKTX2Loader(A) {
    return this.ktx2Loader = A, this;
  }
  /**
   * Sets the given meshopt decoder. Required for decoding assets
   * compressed with the `EXT_meshopt_compression` extension.
   *
   * @param {Object} meshoptDecoder - The meshopt decoder to set.
   * @return {GLTFLoader} A reference to this loader.
   */
  setMeshoptDecoder(A) {
    return this.meshoptDecoder = A, this;
  }
  /**
   * Registers a plugin callback. This API is internally used to implement the various
   * glTF extensions but can also used by third-party code to add additional logic
   * to the loader.
   *
   * @param {function(parser:GLTFParser)} callback - The callback function to register.
   * @return {GLTFLoader} A reference to this loader.
   */
  register(A) {
    return this.pluginCallbacks.indexOf(A) === -1 && this.pluginCallbacks.push(A), this;
  }
  /**
   * Unregisters a plugin callback.
   *
   * @param {Function} callback - The callback function to unregister.
   * @return {GLTFLoader} A reference to this loader.
   */
  unregister(A) {
    return this.pluginCallbacks.indexOf(A) !== -1 && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(A), 1), this;
  }
  /**
   * Parses the given glTF data and returns the resulting group.
   *
   * @param {string|ArrayBuffer} data - The raw glTF data.
   * @param {string} path - The URL base path.
   * @param {function(GLTFLoader~LoadObject)} onLoad - Executed when the loading process has been finished.
   * @param {onErrorCallback} onError - Executed when errors occur.
   */
  parse(A, e, a, t) {
    let i;
    const s = {}, o = {}, n = new TextDecoder();
    if (typeof A == "string")
      i = JSON.parse(A);
    else if (A instanceof ArrayBuffer)
      if (n.decode(new Uint8Array(A, 0, 4)) === je) {
        try {
          s[S.KHR_BINARY_GLTF] = new ii(A);
        } catch (g) {
          t && t(g);
          return;
        }
        i = JSON.parse(s[S.KHR_BINARY_GLTF].content);
      } else
        i = JSON.parse(n.decode(A));
    else
      i = A;
    if (i.asset === void 0 || i.asset.version[0] < 2) {
      t && t(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const r = new li(i, {
      path: e || this.resourcePath || "",
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder
    });
    r.fileLoader.setRequestHeader(this.requestHeader);
    for (let c = 0; c < this.pluginCallbacks.length; c++) {
      const g = this.pluginCallbacks[c](r);
      g.name || console.error("THREE.GLTFLoader: Invalid plugin found: missing name"), o[g.name] = g, s[g.name] = !0;
    }
    if (i.extensionsUsed)
      for (let c = 0; c < i.extensionsUsed.length; ++c) {
        const g = i.extensionsUsed[c], I = i.extensionsRequired || [];
        switch (g) {
          case S.KHR_MATERIALS_UNLIT:
            s[g] = new Ht();
            break;
          case S.KHR_DRACO_MESH_COMPRESSION:
            s[g] = new si(i, this.dracoLoader);
            break;
          case S.KHR_TEXTURE_TRANSFORM:
            s[g] = new ni();
            break;
          case S.KHR_MESH_QUANTIZATION:
            s[g] = new oi();
            break;
          default:
            I.indexOf(g) >= 0 && o[g] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + g + '".');
        }
      }
    r.setExtensions(s), r.setPlugins(o), r.parse(a, t);
  }
  /**
   * Async version of {@link GLTFLoader#parse}.
   *
   * @async
   * @param {string|ArrayBuffer} data - The raw glTF data.
   * @param {string} path - The URL base path.
   * @return {Promise<GLTFLoader~LoadObject>} A Promise that resolves with the loaded glTF when the parsing has been finished.
   */
  parseAsync(A, e) {
    const a = this;
    return new Promise(function(t, i) {
      a.parse(A, e, t, i);
    });
  }
}
function jt() {
  let b = {};
  return {
    get: function(A) {
      return b[A];
    },
    add: function(A, e) {
      b[A] = e;
    },
    remove: function(A) {
      delete b[A];
    },
    removeAll: function() {
      b = {};
    }
  };
}
function _(b, A, e) {
  const a = b.json.materials[A];
  return a.extensions && a.extensions[e] ? a.extensions[e] : null;
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
  KHR_MESHOPT_COMPRESSION: "KHR_meshopt_compression",
  EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing"
};
class Kt {
  constructor(A) {
    this.parser = A, this.name = S.KHR_LIGHTS_PUNCTUAL, this.cache = { refs: {}, uses: {} };
  }
  _markDefs() {
    const A = this.parser, e = this.parser.json.nodes || [];
    for (let a = 0, t = e.length; a < t; a++) {
      const i = e[a];
      i.extensions && i.extensions[this.name] && i.extensions[this.name].light !== void 0 && A._addNodeRef(this.cache, i.extensions[this.name].light);
    }
  }
  _loadLight(A) {
    const e = this.parser, a = "light:" + A;
    let t = e.cache.get(a);
    if (t) return t;
    const i = e.json, n = ((i.extensions && i.extensions[this.name] || {}).lights || [])[A];
    let r;
    const c = new X(16777215);
    n.color !== void 0 && c.setRGB(n.color[0], n.color[1], n.color[2], J);
    const g = n.range !== void 0 ? n.range : 0;
    switch (n.type) {
      case "directional":
        r = new La(c), r.target.position.set(0, 0, -1), r.add(r.target);
        break;
      case "point":
        r = new Ta(c), r.distance = g;
        break;
      case "spot":
        r = new Ga(c), r.distance = g, n.spot = n.spot || {}, n.spot.innerConeAngle = n.spot.innerConeAngle !== void 0 ? n.spot.innerConeAngle : 0, n.spot.outerConeAngle = n.spot.outerConeAngle !== void 0 ? n.spot.outerConeAngle : Math.PI / 4, r.angle = n.spot.outerConeAngle, r.penumbra = 1 - n.spot.innerConeAngle / n.spot.outerConeAngle, r.target.position.set(0, 0, -1), r.add(r.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + n.type);
    }
    return r.position.set(0, 0, 0), z(r, n), n.intensity !== void 0 && (r.intensity = n.intensity), r.name = e.createUniqueName(n.name || "light_" + A), t = Promise.resolve(r), e.cache.add(a, t), t;
  }
  getDependency(A, e) {
    if (A === "light")
      return this._loadLight(e);
  }
  createNodeAttachment(A) {
    const e = this, a = this.parser, i = a.json.nodes[A], o = (i.extensions && i.extensions[this.name] || {}).light;
    return o === void 0 ? null : this._loadLight(o).then(function(n) {
      return a._getNodeRef(e.cache, o, n);
    });
  }
}
class Ht {
  constructor() {
    this.name = S.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return dA;
  }
  extendParams(A, e, a) {
    const t = [];
    A.color = new X(1, 1, 1), A.opacity = 1;
    const i = e.pbrMetallicRoughness;
    if (i) {
      if (Array.isArray(i.baseColorFactor)) {
        const s = i.baseColorFactor;
        A.color.setRGB(s[0], s[1], s[2], J), A.opacity = s[3];
      }
      i.baseColorTexture !== void 0 && t.push(a.assignTexture(A, "map", i.baseColorTexture, W));
    }
    return Promise.all(t);
  }
}
class Pt {
  constructor(A) {
    this.parser = A, this.name = S.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(A, e) {
    const a = _(this.parser, A, this.name);
    return a === null || a.emissiveStrength !== void 0 && (e.emissiveIntensity = a.emissiveStrength), Promise.resolve();
  }
}
class vt {
  constructor(A) {
    this.parser = A, this.name = S.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(A) {
    return _(this.parser, A, this.name) !== null ? Z : null;
  }
  extendMaterialParams(A, e) {
    const a = _(this.parser, A, this.name);
    if (a === null) return Promise.resolve();
    const t = [];
    if (a.clearcoatFactor !== void 0 && (e.clearcoat = a.clearcoatFactor), a.clearcoatTexture !== void 0 && t.push(this.parser.assignTexture(e, "clearcoatMap", a.clearcoatTexture)), a.clearcoatRoughnessFactor !== void 0 && (e.clearcoatRoughness = a.clearcoatRoughnessFactor), a.clearcoatRoughnessTexture !== void 0 && t.push(this.parser.assignTexture(e, "clearcoatRoughnessMap", a.clearcoatRoughnessTexture)), a.clearcoatNormalTexture !== void 0 && (t.push(this.parser.assignTexture(e, "clearcoatNormalMap", a.clearcoatNormalTexture)), a.clearcoatNormalTexture.scale !== void 0)) {
      const i = a.clearcoatNormalTexture.scale;
      e.clearcoatNormalScale = new XA(i, i);
    }
    return Promise.all(t);
  }
}
class Jt {
  constructor(A) {
    this.parser = A, this.name = S.KHR_MATERIALS_DISPERSION;
  }
  getMaterialType(A) {
    return _(this.parser, A, this.name) !== null ? Z : null;
  }
  extendMaterialParams(A, e) {
    const a = _(this.parser, A, this.name);
    return a === null || (e.dispersion = a.dispersion !== void 0 ? a.dispersion : 0), Promise.resolve();
  }
}
class Ot {
  constructor(A) {
    this.parser = A, this.name = S.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(A) {
    return _(this.parser, A, this.name) !== null ? Z : null;
  }
  extendMaterialParams(A, e) {
    const a = _(this.parser, A, this.name);
    if (a === null) return Promise.resolve();
    const t = [];
    return a.iridescenceFactor !== void 0 && (e.iridescence = a.iridescenceFactor), a.iridescenceTexture !== void 0 && t.push(this.parser.assignTexture(e, "iridescenceMap", a.iridescenceTexture)), a.iridescenceIor !== void 0 && (e.iridescenceIOR = a.iridescenceIor), e.iridescenceThicknessRange === void 0 && (e.iridescenceThicknessRange = [100, 400]), a.iridescenceThicknessMinimum !== void 0 && (e.iridescenceThicknessRange[0] = a.iridescenceThicknessMinimum), a.iridescenceThicknessMaximum !== void 0 && (e.iridescenceThicknessRange[1] = a.iridescenceThicknessMaximum), a.iridescenceThicknessTexture !== void 0 && t.push(this.parser.assignTexture(e, "iridescenceThicknessMap", a.iridescenceThicknessTexture)), Promise.all(t);
  }
}
class Yt {
  constructor(A) {
    this.parser = A, this.name = S.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(A) {
    return _(this.parser, A, this.name) !== null ? Z : null;
  }
  extendMaterialParams(A, e) {
    const a = _(this.parser, A, this.name);
    if (a === null) return Promise.resolve();
    const t = [];
    if (e.sheenColor = new X(0, 0, 0), e.sheenRoughness = 0, e.sheen = 1, a.sheenColorFactor !== void 0) {
      const i = a.sheenColorFactor;
      e.sheenColor.setRGB(i[0], i[1], i[2], J);
    }
    return a.sheenRoughnessFactor !== void 0 && (e.sheenRoughness = a.sheenRoughnessFactor), a.sheenColorTexture !== void 0 && t.push(this.parser.assignTexture(e, "sheenColorMap", a.sheenColorTexture, W)), a.sheenRoughnessTexture !== void 0 && t.push(this.parser.assignTexture(e, "sheenRoughnessMap", a.sheenRoughnessTexture)), Promise.all(t);
  }
}
class Vt {
  constructor(A) {
    this.parser = A, this.name = S.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(A) {
    return _(this.parser, A, this.name) !== null ? Z : null;
  }
  extendMaterialParams(A, e) {
    const a = _(this.parser, A, this.name);
    if (a === null) return Promise.resolve();
    const t = [];
    return a.transmissionFactor !== void 0 && (e.transmission = a.transmissionFactor), a.transmissionTexture !== void 0 && t.push(this.parser.assignTexture(e, "transmissionMap", a.transmissionTexture)), Promise.all(t);
  }
}
class Wt {
  constructor(A) {
    this.parser = A, this.name = S.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(A) {
    return _(this.parser, A, this.name) !== null ? Z : null;
  }
  extendMaterialParams(A, e) {
    const a = _(this.parser, A, this.name);
    if (a === null) return Promise.resolve();
    const t = [];
    e.thickness = a.thicknessFactor !== void 0 ? a.thicknessFactor : 0, a.thicknessTexture !== void 0 && t.push(this.parser.assignTexture(e, "thicknessMap", a.thicknessTexture)), e.attenuationDistance = a.attenuationDistance || 1 / 0;
    const i = a.attenuationColor || [1, 1, 1];
    return e.attenuationColor = new X().setRGB(i[0], i[1], i[2], J), Promise.all(t);
  }
}
class zt {
  constructor(A) {
    this.parser = A, this.name = S.KHR_MATERIALS_IOR;
  }
  getMaterialType(A) {
    return _(this.parser, A, this.name) !== null ? Z : null;
  }
  extendMaterialParams(A, e) {
    const a = _(this.parser, A, this.name);
    return a === null || (e.ior = a.ior !== void 0 ? a.ior : 1.5), Promise.resolve();
  }
}
class Xt {
  constructor(A) {
    this.parser = A, this.name = S.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(A) {
    return _(this.parser, A, this.name) !== null ? Z : null;
  }
  extendMaterialParams(A, e) {
    const a = _(this.parser, A, this.name);
    if (a === null) return Promise.resolve();
    const t = [];
    e.specularIntensity = a.specularFactor !== void 0 ? a.specularFactor : 1, a.specularTexture !== void 0 && t.push(this.parser.assignTexture(e, "specularIntensityMap", a.specularTexture));
    const i = a.specularColorFactor || [1, 1, 1];
    return e.specularColor = new X().setRGB(i[0], i[1], i[2], J), a.specularColorTexture !== void 0 && t.push(this.parser.assignTexture(e, "specularColorMap", a.specularColorTexture, W)), Promise.all(t);
  }
}
class Zt {
  constructor(A) {
    this.parser = A, this.name = S.EXT_MATERIALS_BUMP;
  }
  getMaterialType(A) {
    return _(this.parser, A, this.name) !== null ? Z : null;
  }
  extendMaterialParams(A, e) {
    const a = _(this.parser, A, this.name);
    if (a === null) return Promise.resolve();
    const t = [];
    return e.bumpScale = a.bumpFactor !== void 0 ? a.bumpFactor : 1, a.bumpTexture !== void 0 && t.push(this.parser.assignTexture(e, "bumpMap", a.bumpTexture)), Promise.all(t);
  }
}
class $t {
  constructor(A) {
    this.parser = A, this.name = S.KHR_MATERIALS_ANISOTROPY;
  }
  getMaterialType(A) {
    return _(this.parser, A, this.name) !== null ? Z : null;
  }
  extendMaterialParams(A, e) {
    const a = _(this.parser, A, this.name);
    if (a === null) return Promise.resolve();
    const t = [];
    return a.anisotropyStrength !== void 0 && (e.anisotropy = a.anisotropyStrength), a.anisotropyRotation !== void 0 && (e.anisotropyRotation = a.anisotropyRotation), a.anisotropyTexture !== void 0 && t.push(this.parser.assignTexture(e, "anisotropyMap", a.anisotropyTexture)), Promise.all(t);
  }
}
class Ai {
  constructor(A) {
    this.parser = A, this.name = S.KHR_TEXTURE_BASISU;
  }
  loadTexture(A) {
    const e = this.parser, a = e.json, t = a.textures[A];
    if (!t.extensions || !t.extensions[this.name])
      return null;
    const i = t.extensions[this.name], s = e.options.ktx2Loader;
    if (!s) {
      if (a.extensionsRequired && a.extensionsRequired.indexOf(this.name) >= 0)
        throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      return null;
    }
    return e.loadTextureImage(A, i.source, s);
  }
}
class ei {
  constructor(A) {
    this.parser = A, this.name = S.EXT_TEXTURE_WEBP;
  }
  loadTexture(A) {
    const e = this.name, a = this.parser, t = a.json, i = t.textures[A];
    if (!i.extensions || !i.extensions[e])
      return null;
    const s = i.extensions[e], o = t.images[s.source];
    let n = a.textureLoader;
    if (o.uri) {
      const r = a.options.manager.getHandler(o.uri);
      r !== null && (n = r);
    }
    return a.loadTextureImage(A, s.source, n);
  }
}
class ai {
  constructor(A) {
    this.parser = A, this.name = S.EXT_TEXTURE_AVIF;
  }
  loadTexture(A) {
    const e = this.name, a = this.parser, t = a.json, i = t.textures[A];
    if (!i.extensions || !i.extensions[e])
      return null;
    const s = i.extensions[e], o = t.images[s.source];
    let n = a.textureLoader;
    if (o.uri) {
      const r = a.options.manager.getHandler(o.uri);
      r !== null && (n = r);
    }
    return a.loadTextureImage(A, s.source, n);
  }
}
class Ie {
  constructor(A, e) {
    this.name = e, this.parser = A;
  }
  loadBufferView(A) {
    const e = this.parser.json, a = e.bufferViews[A];
    if (a.extensions && a.extensions[this.name]) {
      const t = a.extensions[this.name], i = this.parser.getDependency("buffer", t.buffer), s = this.parser.options.meshoptDecoder;
      if (!s || !s.supported) {
        if (e.extensionsRequired && e.extensionsRequired.indexOf(this.name) >= 0)
          throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        return null;
      }
      return i.then(function(o) {
        const n = t.byteOffset || 0, r = t.byteLength || 0, c = t.count, g = t.byteStride, I = new Uint8Array(o, n, r);
        return s.decodeGltfBufferAsync ? s.decodeGltfBufferAsync(c, g, I, t.mode, t.filter).then(function(E) {
          return E.buffer;
        }) : s.ready.then(function() {
          const E = new ArrayBuffer(c * g);
          return s.decodeGltfBuffer(new Uint8Array(E), c, g, I, t.mode, t.filter), E;
        });
      });
    } else
      return null;
  }
}
class ti {
  constructor(A) {
    this.name = S.EXT_MESH_GPU_INSTANCING, this.parser = A;
  }
  createNodeMesh(A) {
    const e = this.parser.json, a = e.nodes[A];
    if (!a.extensions || !a.extensions[this.name] || a.mesh === void 0)
      return null;
    const t = e.meshes[a.mesh];
    for (const r of t.primitives)
      if (r.mode !== v.TRIANGLES && r.mode !== v.TRIANGLE_STRIP && r.mode !== v.TRIANGLE_FAN && r.mode !== void 0)
        return null;
    const s = a.extensions[this.name].attributes, o = [], n = {};
    for (const r in s)
      o.push(this.parser.getDependency("accessor", s[r]).then((c) => (n[r] = c, n[r])));
    return o.length < 1 ? null : (o.push(this.parser.createNodeMesh(A)), Promise.all(o).then((r) => {
      const c = r.pop(), g = c.isGroup ? c.children : [c], I = r[0].count, E = [];
      for (const l of g) {
        const p = new mA(), f = new P(), h = new we(), d = new P(1, 1, 1), C = new Ma(l.geometry, l.material, I);
        for (let B = 0; B < I; B++)
          n.TRANSLATION && f.fromBufferAttribute(n.TRANSLATION, B), n.ROTATION && h.fromBufferAttribute(n.ROTATION, B), n.SCALE && d.fromBufferAttribute(n.SCALE, B), C.setMatrixAt(B, p.compose(f, h, d));
        for (const B in n)
          if (B === "_COLOR_0") {
            const Q = n[B];
            C.instanceColor = new Na(Q.array, Q.itemSize, Q.normalized);
          } else B !== "TRANSLATION" && B !== "ROTATION" && B !== "SCALE" && l.geometry.setAttribute(B, n[B]);
        De.prototype.copy.call(C, l), this.parser.assignFinalMaterial(C), E.push(C);
      }
      return c.isGroup ? (c.clear(), c.add(...E), c) : E[0];
    }));
  }
}
const je = "glTF", IA = 12, Ee = { JSON: 1313821514, BIN: 5130562 };
class ii {
  constructor(A) {
    this.name = S.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const e = new DataView(A, 0, IA), a = new TextDecoder();
    if (this.header = {
      magic: a.decode(new Uint8Array(A.slice(0, 4))),
      version: e.getUint32(4, !0),
      length: e.getUint32(8, !0)
    }, this.header.magic !== je)
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2)
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const t = this.header.length - IA, i = new DataView(A, IA);
    let s = 0;
    for (; s < t; ) {
      const o = i.getUint32(s, !0);
      s += 4;
      const n = i.getUint32(s, !0);
      if (s += 4, n === Ee.JSON) {
        const r = new Uint8Array(A, IA + s, o);
        this.content = a.decode(r);
      } else if (n === Ee.BIN) {
        const r = IA + s;
        this.body = A.slice(r, r + o);
      }
      s += o;
    }
    if (this.content === null)
      throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
}
class si {
  constructor(A, e) {
    if (!e)
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    this.name = S.KHR_DRACO_MESH_COMPRESSION, this.json = A, this.dracoLoader = e, this.dracoLoader.preload();
  }
  decodePrimitive(A, e) {
    const a = this.json, t = this.dracoLoader, i = A.extensions[this.name].bufferView, s = A.extensions[this.name].attributes, o = {}, n = {}, r = {};
    for (const c in s) {
      const g = YA[c] || c.toLowerCase();
      o[g] = s[c];
    }
    for (const c in A.attributes) {
      const g = YA[c] || c.toLowerCase();
      if (s[c] !== void 0) {
        const I = a.accessors[A.attributes[c]], E = cA[I.componentType];
        r[g] = E.name, n[g] = I.normalized === !0;
      }
    }
    return e.getDependency("bufferView", i).then(function(c) {
      return new Promise(function(g, I) {
        t.decodeDracoFile(c, function(E) {
          for (const l in E.attributes) {
            const p = E.attributes[l], f = n[l];
            f !== void 0 && (p.normalized = f);
          }
          g(E);
        }, o, r, J, I);
      });
    });
  }
}
class ni {
  constructor() {
    this.name = S.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(A, e) {
    return (e.texCoord === void 0 || e.texCoord === A.channel) && e.offset === void 0 && e.rotation === void 0 && e.scale === void 0 || (A = A.clone(), e.texCoord !== void 0 && (A.channel = e.texCoord), e.offset !== void 0 && A.offset.fromArray(e.offset), e.rotation !== void 0 && (A.rotation = e.rotation), e.scale !== void 0 && A.repeat.fromArray(e.scale), A.needsUpdate = !0), A;
  }
}
class oi {
  constructor() {
    this.name = S.KHR_MESH_QUANTIZATION;
  }
}
class Ke extends st {
  constructor(A, e, a, t) {
    super(A, e, a, t);
  }
  copySampleValue_(A) {
    const e = this.resultBuffer, a = this.sampleValues, t = this.valueSize, i = A * t * 3 + t;
    for (let s = 0; s !== t; s++)
      e[s] = a[i + s];
    return e;
  }
  interpolate_(A, e, a, t) {
    const i = this.resultBuffer, s = this.sampleValues, o = this.valueSize, n = o * 2, r = o * 3, c = t - e, g = (a - e) / c, I = g * g, E = I * g, l = A * r, p = l - r, f = -2 * E + 3 * I, h = E - I, d = 1 - f, C = h - I + g;
    for (let B = 0; B !== o; B++) {
      const Q = s[p + B + o], k = s[p + B + n] * c, F = s[l + B + o], u = s[l + B] * c;
      i[B] = d * Q + C * k + f * F + h * u;
    }
    return i;
  }
}
const ri = new we();
class gi extends Ke {
  interpolate_(A, e, a, t) {
    const i = super.interpolate_(A, e, a, t);
    return ri.fromArray(i).normalize().toArray(i), i;
  }
}
const v = {
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6
}, cA = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
}, de = {
  9728: wA,
  9729: AA,
  9984: Fe,
  9985: ja,
  9986: _a,
  9987: kA
}, he = {
  33071: Ha,
  33648: Ka,
  10497: KA
}, yA = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, YA = {
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
}, tA = {
  scale: "scale",
  translation: "position",
  rotation: "quaternion",
  weights: "morphTargetInfluences"
}, ci = {
  CUBICSPLINE: void 0,
  // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
  // keyframe track will be initialized with a default interpolation type, then modified.
  LINEAR: xe,
  STEP: tt
}, xA = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function bi(b) {
  return b.DefaultMaterial === void 0 && (b.DefaultMaterial = new Re({
    color: 16777215,
    emissive: 0,
    metalness: 1,
    roughness: 1,
    transparent: !1,
    depthTest: !0,
    side: it
  })), b.DefaultMaterial;
}
function nA(b, A, e) {
  for (const a in e.extensions)
    b[a] === void 0 && (A.userData.gltfExtensions = A.userData.gltfExtensions || {}, A.userData.gltfExtensions[a] = e.extensions[a]);
}
function z(b, A) {
  A.extras !== void 0 && (typeof A.extras == "object" ? Object.assign(b.userData, A.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + A.extras));
}
function Ii(b, A, e) {
  let a = !1, t = !1, i = !1;
  for (let r = 0, c = A.length; r < c; r++) {
    const g = A[r];
    if (g.POSITION !== void 0 && (a = !0), g.NORMAL !== void 0 && (t = !0), g.COLOR_0 !== void 0 && (i = !0), a && t && i) break;
  }
  if (!a && !t && !i) return Promise.resolve(b);
  const s = [], o = [], n = [];
  for (let r = 0, c = A.length; r < c; r++) {
    const g = A[r];
    if (a) {
      const I = g.POSITION !== void 0 ? e.getDependency("accessor", g.POSITION) : b.attributes.position;
      s.push(I);
    }
    if (t) {
      const I = g.NORMAL !== void 0 ? e.getDependency("accessor", g.NORMAL) : b.attributes.normal;
      o.push(I);
    }
    if (i) {
      const I = g.COLOR_0 !== void 0 ? e.getDependency("accessor", g.COLOR_0) : b.attributes.color;
      n.push(I);
    }
  }
  return Promise.all([
    Promise.all(s),
    Promise.all(o),
    Promise.all(n)
  ]).then(function(r) {
    const c = r[0], g = r[1], I = r[2];
    return a && (b.morphAttributes.position = c), t && (b.morphAttributes.normal = g), i && (b.morphAttributes.color = I), b.morphTargetsRelative = !0, b;
  });
}
function Ei(b, A) {
  if (b.updateMorphTargets(), A.weights !== void 0)
    for (let e = 0, a = A.weights.length; e < a; e++)
      b.morphTargetInfluences[e] = A.weights[e];
  if (A.extras && Array.isArray(A.extras.targetNames)) {
    const e = A.extras.targetNames;
    if (b.morphTargetInfluences.length === e.length) {
      b.morphTargetDictionary = {};
      for (let a = 0, t = e.length; a < t; a++)
        b.morphTargetDictionary[e[a]] = a;
    } else
      console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
  }
}
function di(b) {
  let A;
  const e = b.extensions && b.extensions[S.KHR_DRACO_MESH_COMPRESSION];
  if (e ? A = "draco:" + e.bufferView + ":" + e.indices + ":" + GA(e.attributes) : A = b.indices + ":" + GA(b.attributes) + ":" + b.mode, b.targets !== void 0)
    for (let a = 0, t = b.targets.length; a < t; a++)
      A += ":" + GA(b.targets[a]);
  return A;
}
function GA(b) {
  let A = "";
  const e = Object.keys(b).sort();
  for (let a = 0, t = e.length; a < t; a++)
    A += e[a] + ":" + b[e[a]] + ";";
  return A;
}
function VA(b) {
  switch (b) {
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
function hi(b) {
  return b.search(/\.jpe?g($|\?)/i) > 0 || b.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : b.search(/\.webp($|\?)/i) > 0 || b.search(/^data\:image\/webp/) === 0 ? "image/webp" : b.search(/\.ktx2($|\?)/i) > 0 || b.search(/^data\:image\/ktx2/) === 0 ? "image/ktx2" : "image/png";
}
const Bi = new mA();
class li {
  constructor(A = {}, e = {}) {
    this.json = A, this.extensions = {}, this.plugins = {}, this.options = e, this.cache = new jt(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = { refs: {}, uses: {} }, this.cameraCache = { refs: {}, uses: {} }, this.lightCache = { refs: {}, uses: {} }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
    let a = !1, t = -1, i = !1, s = -1;
    if (typeof navigator < "u" && typeof navigator.userAgent < "u") {
      const o = navigator.userAgent;
      a = /^((?!chrome|android).)*safari/i.test(o) === !0;
      const n = o.match(/Version\/(\d+)/);
      t = a && n ? parseInt(n[1], 10) : -1, i = o.indexOf("Firefox") > -1, s = i ? o.match(/Firefox\/([0-9]+)\./)[1] : -1;
    }
    typeof createImageBitmap > "u" || a && t < 17 || i && s < 98 ? this.textureLoader = new Ua(this.options.manager) : this.textureLoader = new qa(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new oA(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0);
  }
  setExtensions(A) {
    this.extensions = A;
  }
  setPlugins(A) {
    this.plugins = A;
  }
  parse(A, e) {
    const a = this, t = this.json, i = this.extensions;
    this.cache.removeAll(), this.nodeCache = {}, this._invokeAll(function(s) {
      return s._markDefs && s._markDefs();
    }), Promise.all(this._invokeAll(function(s) {
      return s.beforeRoot && s.beforeRoot();
    })).then(function() {
      return Promise.all([
        a.getDependencies("scene"),
        a.getDependencies("animation"),
        a.getDependencies("camera")
      ]);
    }).then(function(s) {
      const o = {
        scene: s[0][t.scene || 0],
        scenes: s[0],
        animations: s[1],
        cameras: s[2],
        asset: t.asset,
        parser: a,
        userData: {}
      };
      return nA(i, o, t), z(o, t), Promise.all(a._invokeAll(function(n) {
        return n.afterRoot && n.afterRoot(o);
      })).then(function() {
        for (const n of o.scenes)
          n.updateMatrixWorld();
        A(o);
      });
    }).catch(e);
  }
  /**
   * Marks the special nodes/meshes in json for efficient parse.
   *
   * @private
   */
  _markDefs() {
    const A = this.json.nodes || [], e = this.json.skins || [], a = this.json.meshes || [];
    for (let t = 0, i = e.length; t < i; t++) {
      const s = e[t].joints;
      for (let o = 0, n = s.length; o < n; o++)
        A[s[o]].isBone = !0;
    }
    for (let t = 0, i = A.length; t < i; t++) {
      const s = A[t];
      s.mesh !== void 0 && (this._addNodeRef(this.meshCache, s.mesh), s.skin !== void 0 && (a[s.mesh].isSkinnedMesh = !0)), s.camera !== void 0 && this._addNodeRef(this.cameraCache, s.camera);
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
  _addNodeRef(A, e) {
    e !== void 0 && (A.refs[e] === void 0 && (A.refs[e] = A.uses[e] = 0), A.refs[e]++);
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
  _getNodeRef(A, e, a) {
    if (A.refs[e] <= 1) return a;
    const t = a.clone(), i = (s, o) => {
      const n = this.associations.get(s);
      n != null && this.associations.set(o, n);
      for (const [r, c] of s.children.entries())
        i(c, o.children[r]);
    };
    return i(a, t), t.name += "_instance_" + A.uses[e]++, t;
  }
  _invokeOne(A) {
    const e = Object.values(this.plugins);
    e.push(this);
    for (let a = 0; a < e.length; a++) {
      const t = A(e[a]);
      if (t) return t;
    }
    return null;
  }
  _invokeAll(A) {
    const e = Object.values(this.plugins);
    e.unshift(this);
    const a = [];
    for (let t = 0; t < e.length; t++) {
      const i = A(e[t]);
      i && a.push(i);
    }
    return a;
  }
  /**
   * Requests the specified dependency asynchronously, with caching.
   *
   * @private
   * @param {string} type
   * @param {number} index
   * @return {Promise<Object3D|Material|Texture|AnimationClip|ArrayBuffer|Object>}
   */
  getDependency(A, e) {
    const a = A + ":" + e;
    let t = this.cache.get(a);
    if (!t) {
      switch (A) {
        case "scene":
          t = this.loadScene(e);
          break;
        case "node":
          t = this._invokeOne(function(i) {
            return i.loadNode && i.loadNode(e);
          });
          break;
        case "mesh":
          t = this._invokeOne(function(i) {
            return i.loadMesh && i.loadMesh(e);
          });
          break;
        case "accessor":
          t = this.loadAccessor(e);
          break;
        case "bufferView":
          t = this._invokeOne(function(i) {
            return i.loadBufferView && i.loadBufferView(e);
          });
          break;
        case "buffer":
          t = this.loadBuffer(e);
          break;
        case "material":
          t = this._invokeOne(function(i) {
            return i.loadMaterial && i.loadMaterial(e);
          });
          break;
        case "texture":
          t = this._invokeOne(function(i) {
            return i.loadTexture && i.loadTexture(e);
          });
          break;
        case "skin":
          t = this.loadSkin(e);
          break;
        case "animation":
          t = this._invokeOne(function(i) {
            return i.loadAnimation && i.loadAnimation(e);
          });
          break;
        case "camera":
          t = this.loadCamera(e);
          break;
        default:
          if (t = this._invokeOne(function(i) {
            return i != this && i.getDependency && i.getDependency(A, e);
          }), !t)
            throw new Error("Unknown type: " + A);
          break;
      }
      this.cache.add(a, t);
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
  getDependencies(A) {
    let e = this.cache.get(A);
    if (!e) {
      const a = this, t = this.json[A + (A === "mesh" ? "es" : "s")] || [];
      e = Promise.all(t.map(function(i, s) {
        return a.getDependency(A, s);
      })), this.cache.add(A, e);
    }
    return e;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   *
   * @private
   * @param {number} bufferIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBuffer(A) {
    const e = this.json.buffers[A], a = this.fileLoader;
    if (e.type && e.type !== "arraybuffer")
      throw new Error("THREE.GLTFLoader: " + e.type + " buffer type is not supported.");
    if (e.uri === void 0 && A === 0)
      return Promise.resolve(this.extensions[S.KHR_BINARY_GLTF].body);
    const t = this.options;
    return new Promise(function(i, s) {
      a.load(CA.resolveURL(e.uri, t.path), i, void 0, function() {
        s(new Error('THREE.GLTFLoader: Failed to load buffer "' + e.uri + '".'));
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
  loadBufferView(A) {
    const e = this.json.bufferViews[A];
    return this.getDependency("buffer", e.buffer).then(function(a) {
      const t = e.byteLength || 0, i = e.byteOffset || 0;
      return a.slice(i, i + t);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#accessors
   *
   * @private
   * @param {number} accessorIndex
   * @return {Promise<BufferAttribute|InterleavedBufferAttribute>}
   */
  loadAccessor(A) {
    const e = this, a = this.json, t = this.json.accessors[A];
    if (t.bufferView === void 0 && t.sparse === void 0) {
      const s = yA[t.type], o = cA[t.componentType], n = t.normalized === !0, r = new o(t.count * s);
      return Promise.resolve(new pA(r, s, n));
    }
    const i = [];
    return t.bufferView !== void 0 ? i.push(this.getDependency("bufferView", t.bufferView)) : i.push(null), t.sparse !== void 0 && (i.push(this.getDependency("bufferView", t.sparse.indices.bufferView)), i.push(this.getDependency("bufferView", t.sparse.values.bufferView))), Promise.all(i).then(function(s) {
      const o = s[0], n = yA[t.type], r = cA[t.componentType], c = r.BYTES_PER_ELEMENT, g = c * n, I = t.byteOffset || 0, E = t.bufferView !== void 0 ? a.bufferViews[t.bufferView].byteStride : void 0, l = t.normalized === !0;
      let p, f;
      if (E && E !== g) {
        const h = Math.floor(I / E), d = "InterleavedBuffer:" + t.bufferView + ":" + t.componentType + ":" + h + ":" + t.count;
        let C = e.cache.get(d);
        C || (p = new r(o, h * E, t.count * E / c), C = new ke(p, E / c), e.cache.add(d, C)), f = new Ge(C, n, I % E / c, l);
      } else
        o === null ? p = new r(t.count * n) : p = new r(o, I, t.count * n), f = new pA(p, n, l);
      if (t.sparse !== void 0) {
        const h = yA.SCALAR, d = cA[t.sparse.indices.componentType], C = t.sparse.indices.byteOffset || 0, B = t.sparse.values.byteOffset || 0, Q = new d(s[1], C, t.sparse.count * h), k = new r(s[2], B, t.sparse.count * n);
        o !== null && (f = new pA(f.array.slice(), f.itemSize, f.normalized)), f.normalized = !1;
        for (let F = 0, u = Q.length; F < u; F++) {
          const w = Q[F];
          if (f.setX(w, k[F * n]), n >= 2 && f.setY(w, k[F * n + 1]), n >= 3 && f.setZ(w, k[F * n + 2]), n >= 4 && f.setW(w, k[F * n + 3]), n >= 5) throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
        }
        f.normalized = l;
      }
      return f;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#textures
   *
   * @private
   * @param {number} textureIndex
   * @return {Promise<?Texture>}
   */
  loadTexture(A) {
    const e = this.json, a = this.options, i = e.textures[A].source, s = e.images[i];
    let o = this.textureLoader;
    if (s.uri) {
      const n = a.manager.getHandler(s.uri);
      n !== null && (o = n);
    }
    return this.loadTextureImage(A, i, o);
  }
  loadTextureImage(A, e, a) {
    const t = this, i = this.json, s = i.textures[A], o = i.images[e], n = (o.uri || o.bufferView) + ":" + s.sampler;
    if (this.textureCache[n])
      return this.textureCache[n];
    const r = this.loadImageSource(e, a).then(function(c) {
      c.flipY = !1, c.name = s.name || o.name || "", c.name === "" && typeof o.uri == "string" && o.uri.startsWith("data:image/") === !1 && (c.name = o.uri);
      const I = (i.samplers || {})[s.sampler] || {};
      return c.magFilter = de[I.magFilter] || AA, c.minFilter = de[I.minFilter] || kA, c.wrapS = he[I.wrapS] || KA, c.wrapT = he[I.wrapT] || KA, c.generateMipmaps = !c.isCompressedTexture && c.minFilter !== wA && c.minFilter !== AA, t.associations.set(c, { textures: A }), c;
    }).catch(function() {
      return null;
    });
    return this.textureCache[n] = r, r;
  }
  loadImageSource(A, e) {
    const a = this, t = this.json, i = this.options;
    if (this.sourceCache[A] !== void 0)
      return this.sourceCache[A].then((g) => g.clone());
    const s = t.images[A], o = self.URL || self.webkitURL;
    let n = s.uri || "", r = !1;
    if (s.bufferView !== void 0)
      n = a.getDependency("bufferView", s.bufferView).then(function(g) {
        r = !0;
        const I = new Blob([g], { type: s.mimeType });
        return n = o.createObjectURL(I), n;
      });
    else if (s.uri === void 0)
      throw new Error("THREE.GLTFLoader: Image " + A + " is missing URI and bufferView");
    const c = Promise.resolve(n).then(function(g) {
      return new Promise(function(I, E) {
        let l = I;
        e.isImageBitmapLoader === !0 && (l = function(p) {
          const f = new Ae(p);
          f.needsUpdate = !0, I(f);
        }), e.load(CA.resolveURL(g, i.path), l, void 0, E);
      });
    }).then(function(g) {
      return r === !0 && o.revokeObjectURL(n), z(g, s), g.userData.mimeType = s.mimeType || hi(s.uri), g;
    }).catch(function(g) {
      throw console.error("THREE.GLTFLoader: Couldn't load texture", n), g;
    });
    return this.sourceCache[A] = c, c;
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
  assignTexture(A, e, a, t) {
    const i = this;
    return this.getDependency("texture", a.index).then(function(s) {
      if (!s) return null;
      if (a.texCoord !== void 0 && a.texCoord > 0 && (s = s.clone(), s.channel = a.texCoord), i.extensions[S.KHR_TEXTURE_TRANSFORM]) {
        const o = a.extensions !== void 0 ? a.extensions[S.KHR_TEXTURE_TRANSFORM] : void 0;
        if (o) {
          const n = i.associations.get(s);
          s = i.extensions[S.KHR_TEXTURE_TRANSFORM].extendTexture(s, o), i.associations.set(s, n);
        }
      }
      return t !== void 0 && (s.colorSpace = t), A[e] = s, s;
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
  assignFinalMaterial(A) {
    const e = A.geometry;
    let a = A.material;
    const t = e.attributes.tangent === void 0, i = e.attributes.color !== void 0, s = e.attributes.normal === void 0;
    if (A.isPoints) {
      const o = "PointsMaterial:" + a.uuid;
      let n = this.cache.get(o);
      n || (n = new Pa(), FA.prototype.copy.call(n, a), n.color.copy(a.color), n.map = a.map, n.sizeAttenuation = !1, this.cache.add(o, n)), a = n;
    } else if (A.isLine) {
      const o = "LineBasicMaterial:" + a.uuid;
      let n = this.cache.get(o);
      n || (n = new va(), FA.prototype.copy.call(n, a), n.color.copy(a.color), n.map = a.map, this.cache.add(o, n)), a = n;
    }
    if (t || i || s) {
      let o = "ClonedMaterial:" + a.uuid + ":";
      t && (o += "derivative-tangents:"), i && (o += "vertex-colors:"), s && (o += "flat-shading:");
      let n = this.cache.get(o);
      n || (n = a.clone(), i && (n.vertexColors = !0), s && (n.flatShading = !0), t && (n.normalScale && (n.normalScale.y *= -1), n.clearcoatNormalScale && (n.clearcoatNormalScale.y *= -1)), this.cache.add(o, n), this.associations.set(n, this.associations.get(a))), a = n;
    }
    A.material = a;
  }
  getMaterialType() {
    return Re;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
   *
   * @private
   * @param {number} materialIndex
   * @return {Promise<Material>}
   */
  loadMaterial(A) {
    const e = this, a = this.json, t = this.extensions, i = a.materials[A];
    let s;
    const o = {}, n = i.extensions || {}, r = [];
    if (n[S.KHR_MATERIALS_UNLIT]) {
      const g = t[S.KHR_MATERIALS_UNLIT];
      s = g.getMaterialType(), r.push(g.extendParams(o, i, e));
    } else {
      const g = i.pbrMetallicRoughness || {};
      if (o.color = new X(1, 1, 1), o.opacity = 1, Array.isArray(g.baseColorFactor)) {
        const I = g.baseColorFactor;
        o.color.setRGB(I[0], I[1], I[2], J), o.opacity = I[3];
      }
      g.baseColorTexture !== void 0 && r.push(e.assignTexture(o, "map", g.baseColorTexture, W)), o.metalness = g.metallicFactor !== void 0 ? g.metallicFactor : 1, o.roughness = g.roughnessFactor !== void 0 ? g.roughnessFactor : 1, g.metallicRoughnessTexture !== void 0 && (r.push(e.assignTexture(o, "metalnessMap", g.metallicRoughnessTexture)), r.push(e.assignTexture(o, "roughnessMap", g.metallicRoughnessTexture))), s = this._invokeOne(function(I) {
        return I.getMaterialType && I.getMaterialType(A);
      }), r.push(Promise.all(this._invokeAll(function(I) {
        return I.extendMaterialParams && I.extendMaterialParams(A, o);
      })));
    }
    i.doubleSided === !0 && (o.side = Ja);
    const c = i.alphaMode || xA.OPAQUE;
    if (c === xA.BLEND ? (o.transparent = !0, o.depthWrite = !1) : (o.transparent = !1, c === xA.MASK && (o.alphaTest = i.alphaCutoff !== void 0 ? i.alphaCutoff : 0.5)), i.normalTexture !== void 0 && s !== dA && (r.push(e.assignTexture(o, "normalMap", i.normalTexture)), o.normalScale = new XA(1, 1), i.normalTexture.scale !== void 0)) {
      const g = i.normalTexture.scale;
      o.normalScale.set(g, g);
    }
    if (i.occlusionTexture !== void 0 && s !== dA && (r.push(e.assignTexture(o, "aoMap", i.occlusionTexture)), i.occlusionTexture.strength !== void 0 && (o.aoMapIntensity = i.occlusionTexture.strength)), i.emissiveFactor !== void 0 && s !== dA) {
      const g = i.emissiveFactor;
      o.emissive = new X().setRGB(g[0], g[1], g[2], J);
    }
    return i.emissiveTexture !== void 0 && s !== dA && r.push(e.assignTexture(o, "emissiveMap", i.emissiveTexture, W)), Promise.all(r).then(function() {
      const g = new s(o);
      return i.name && (g.name = i.name), z(g, i), e.associations.set(g, { materials: A }), i.extensions && nA(t, g, i), g;
    });
  }
  /**
   * When Object3D instances are targeted by animation, they need unique names.
   *
   * @private
   * @param {string} originalName
   * @return {string}
   */
  createUniqueName(A) {
    const e = Oa.sanitizeNodeName(A || "");
    return e in this.nodeNamesUsed ? e + "_" + ++this.nodeNamesUsed[e] : (this.nodeNamesUsed[e] = 0, e);
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
  loadGeometries(A) {
    const e = this, a = this.extensions, t = this.primitiveCache;
    function i(o) {
      return a[S.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o, e).then(function(n) {
        return Be(n, o, e);
      });
    }
    const s = [];
    for (let o = 0, n = A.length; o < n; o++) {
      const r = A[o], c = di(r), g = t[c];
      if (g)
        s.push(g.promise);
      else {
        let I;
        r.extensions && r.extensions[S.KHR_DRACO_MESH_COMPRESSION] ? I = i(r) : I = Be(new Se(), r, e), t[c] = { primitive: r, promise: I }, s.push(I);
      }
    }
    return Promise.all(s);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
   *
   * @private
   * @param {number} meshIndex
   * @return {Promise<Group|Mesh|SkinnedMesh|Line|Points>}
   */
  loadMesh(A) {
    const e = this, a = this.json, t = this.extensions, i = a.meshes[A], s = i.primitives, o = [];
    for (let n = 0, r = s.length; n < r; n++) {
      const c = s[n].material === void 0 ? bi(this.cache) : this.getDependency("material", s[n].material);
      o.push(c);
    }
    return o.push(e.loadGeometries(s)), Promise.all(o).then(function(n) {
      const r = n.slice(0, n.length - 1), c = n[n.length - 1], g = [];
      for (let E = 0, l = c.length; E < l; E++) {
        const p = c[E], f = s[E];
        let h;
        const d = r[E];
        if (f.mode === v.TRIANGLES || f.mode === v.TRIANGLE_STRIP || f.mode === v.TRIANGLE_FAN || f.mode === void 0)
          h = i.isSkinnedMesh === !0 ? new Ya(p, d) : new ZA(p, d), h.isSkinnedMesh === !0 && h.normalizeSkinWeights(), f.mode === v.TRIANGLE_STRIP ? h.geometry = ce(h.geometry, me) : f.mode === v.TRIANGLE_FAN && (h.geometry = ce(h.geometry, jA));
        else if (f.mode === v.LINES)
          h = new Va(p, d);
        else if (f.mode === v.LINE_STRIP)
          h = new Wa(p, d);
        else if (f.mode === v.LINE_LOOP)
          h = new za(p, d);
        else if (f.mode === v.POINTS)
          h = new Xa(p, d);
        else
          throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + f.mode);
        Object.keys(h.geometry.morphAttributes).length > 0 && Ei(h, i), h.name = e.createUniqueName(i.name || "mesh_" + A), z(h, i), f.extensions && nA(t, h, f), e.assignFinalMaterial(h), g.push(h);
      }
      for (let E = 0, l = g.length; E < l; E++)
        e.associations.set(g[E], {
          meshes: A,
          primitives: E
        });
      if (g.length === 1)
        return i.extensions && nA(t, g[0], i), g[0];
      const I = new RA();
      i.extensions && nA(t, I, i), e.associations.set(I, { meshes: A });
      for (let E = 0, l = g.length; E < l; E++)
        I.add(g[E]);
      return I;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#cameras
   *
   * @private
   * @param {number} cameraIndex
   * @return {Promise<Camera>|undefined}
   */
  loadCamera(A) {
    let e;
    const a = this.json.cameras[A], t = a[a.type];
    if (!t) {
      console.warn("THREE.GLTFLoader: Missing camera parameters.");
      return;
    }
    return a.type === "perspective" ? e = new ye(Za.radToDeg(t.yfov), t.aspectRatio || 1, t.znear || 1, t.zfar || 2e6) : a.type === "orthographic" && (e = new $a(-t.xmag, t.xmag, t.ymag, -t.ymag, t.znear, t.zfar)), a.name && (e.name = this.createUniqueName(a.name)), z(e, a), Promise.resolve(e);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
   *
   * @private
   * @param {number} skinIndex
   * @return {Promise<Skeleton>}
   */
  loadSkin(A) {
    const e = this.json.skins[A], a = [];
    for (let t = 0, i = e.joints.length; t < i; t++)
      a.push(this._loadNodeShallow(e.joints[t]));
    return e.inverseBindMatrices !== void 0 ? a.push(this.getDependency("accessor", e.inverseBindMatrices)) : a.push(null), Promise.all(a).then(function(t) {
      const i = t.pop(), s = t, o = [], n = [];
      for (let r = 0, c = s.length; r < c; r++) {
        const g = s[r];
        if (g) {
          o.push(g);
          const I = new mA();
          i !== null && I.fromArray(i.array, r * 16), n.push(I);
        } else
          console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', e.joints[r]);
      }
      return new At(o, n);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations
   *
   * @private
   * @param {number} animationIndex
   * @return {Promise<AnimationClip>}
   */
  loadAnimation(A) {
    const e = this.json, a = this, t = e.animations[A], i = t.name ? t.name : "animation_" + A, s = [], o = [], n = [], r = [], c = [];
    for (let g = 0, I = t.channels.length; g < I; g++) {
      const E = t.channels[g], l = t.samplers[E.sampler], p = E.target, f = p.node, h = t.parameters !== void 0 ? t.parameters[l.input] : l.input, d = t.parameters !== void 0 ? t.parameters[l.output] : l.output;
      p.node !== void 0 && (s.push(this.getDependency("node", f)), o.push(this.getDependency("accessor", h)), n.push(this.getDependency("accessor", d)), r.push(l), c.push(p));
    }
    return Promise.all([
      Promise.all(s),
      Promise.all(o),
      Promise.all(n),
      Promise.all(r),
      Promise.all(c)
    ]).then(function(g) {
      const I = g[0], E = g[1], l = g[2], p = g[3], f = g[4], h = [];
      for (let C = 0, B = I.length; C < B; C++) {
        const Q = I[C], k = E[C], F = l[C], u = p[C], w = f[C];
        if (Q === void 0) continue;
        Q.updateMatrix && Q.updateMatrix();
        const m = a._createAnimationTracks(Q, k, F, u, w);
        if (m)
          for (let R = 0; R < m.length; R++)
            h.push(m[R]);
      }
      const d = new et(i, void 0, h);
      return z(d, t), d;
    });
  }
  createNodeMesh(A) {
    const e = this.json, a = this, t = e.nodes[A];
    return t.mesh === void 0 ? null : a.getDependency("mesh", t.mesh).then(function(i) {
      const s = a._getNodeRef(a.meshCache, t.mesh, i);
      return t.weights !== void 0 && s.traverse(function(o) {
        if (o.isMesh)
          for (let n = 0, r = t.weights.length; n < r; n++)
            o.morphTargetInfluences[n] = t.weights[n];
      }), s;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodes-and-hierarchy
   *
   * @private
   * @param {number} nodeIndex
   * @return {Promise<Object3D>}
   */
  loadNode(A) {
    const e = this.json, a = this, t = e.nodes[A], i = a._loadNodeShallow(A), s = [], o = t.children || [];
    for (let r = 0, c = o.length; r < c; r++)
      s.push(a.getDependency("node", o[r]));
    const n = t.skin === void 0 ? Promise.resolve(null) : a.getDependency("skin", t.skin);
    return Promise.all([
      i,
      Promise.all(s),
      n
    ]).then(function(r) {
      const c = r[0], g = r[1], I = r[2];
      I !== null && c.traverse(function(E) {
        E.isSkinnedMesh && E.bind(I, Bi);
      });
      for (let E = 0, l = g.length; E < l; E++)
        c.add(g[E]);
      if (c.userData.pivot !== void 0 && g.length > 0) {
        const E = c.userData.pivot, l = g[0];
        c.pivot = new P().fromArray(E), c.position.x -= E[0], c.position.y -= E[1], c.position.z -= E[2], l.position.set(0, 0, 0), delete c.userData.pivot;
      }
      return c;
    });
  }
  // ._loadNodeShallow() parses a single node.
  // skin and child nodes are created and added in .loadNode() (no '_' prefix).
  _loadNodeShallow(A) {
    const e = this.json, a = this.extensions, t = this;
    if (this.nodeCache[A] !== void 0)
      return this.nodeCache[A];
    const i = e.nodes[A], s = i.name ? t.createUniqueName(i.name) : "", o = [], n = t._invokeOne(function(r) {
      return r.createNodeMesh && r.createNodeMesh(A);
    });
    return n && o.push(n), i.camera !== void 0 && o.push(t.getDependency("camera", i.camera).then(function(r) {
      return t._getNodeRef(t.cameraCache, i.camera, r);
    })), t._invokeAll(function(r) {
      return r.createNodeAttachment && r.createNodeAttachment(A);
    }).forEach(function(r) {
      o.push(r);
    }), this.nodeCache[A] = Promise.all(o).then(function(r) {
      let c;
      if (i.isBone === !0 ? c = new at() : r.length > 1 ? c = new RA() : r.length === 1 ? c = r[0] : c = new De(), c !== r[0])
        for (let g = 0, I = r.length; g < I; g++)
          c.add(r[g]);
      if (i.name && (c.userData.name = i.name, c.name = s), z(c, i), i.extensions && nA(a, c, i), i.matrix !== void 0) {
        const g = new mA();
        g.fromArray(i.matrix), c.applyMatrix4(g);
      } else
        i.translation !== void 0 && c.position.fromArray(i.translation), i.rotation !== void 0 && c.quaternion.fromArray(i.rotation), i.scale !== void 0 && c.scale.fromArray(i.scale);
      if (!t.associations.has(c))
        t.associations.set(c, {});
      else if (i.mesh !== void 0 && t.meshCache.refs[i.mesh] > 1) {
        const g = t.associations.get(c);
        t.associations.set(c, { ...g });
      }
      return t.associations.get(c).nodes = A, c;
    }), this.nodeCache[A];
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenes
   *
   * @private
   * @param {number} sceneIndex
   * @return {Promise<Group>}
   */
  loadScene(A) {
    const e = this.extensions, a = this.json.scenes[A], t = this, i = new RA();
    a.name && (i.name = t.createUniqueName(a.name)), z(i, a), a.extensions && nA(e, i, a);
    const s = a.nodes || [], o = [];
    for (let n = 0, r = s.length; n < r; n++)
      o.push(t.getDependency("node", s[n]));
    return Promise.all(o).then(function(n) {
      for (let c = 0, g = n.length; c < g; c++) {
        const I = n[c];
        I.parent !== null ? i.add(_t(I)) : i.add(I);
      }
      const r = (c) => {
        const g = /* @__PURE__ */ new Map();
        for (const [I, E] of t.associations)
          (I instanceof FA || I instanceof Ae) && g.set(I, E);
        return c.traverse((I) => {
          const E = t.associations.get(I);
          E != null && g.set(I, E);
        }), g;
      };
      return t.associations = r(i), i;
    });
  }
  _createAnimationTracks(A, e, a, t, i) {
    const s = [], o = A.name ? A.name : A.uuid, n = [];
    tA[i.path] === tA.weights ? A.traverse(function(I) {
      I.morphTargetInfluences && n.push(I.name ? I.name : I.uuid);
    }) : n.push(o);
    let r;
    switch (tA[i.path]) {
      case tA.weights:
        r = ae;
        break;
      case tA.rotation:
        r = te;
        break;
      case tA.translation:
      case tA.scale:
        r = ee;
        break;
      default:
        a.itemSize === 1 ? r = ae : r = ee;
        break;
    }
    const c = t.interpolation !== void 0 ? ci[t.interpolation] : xe, g = this._getArrayFromAccessor(a);
    for (let I = 0, E = n.length; I < E; I++) {
      const l = new r(
        n[I] + "." + tA[i.path],
        e.array,
        g,
        c
      );
      t.interpolation === "CUBICSPLINE" && this._createCubicSplineTrackInterpolant(l), s.push(l);
    }
    return s;
  }
  _getArrayFromAccessor(A) {
    let e = A.array;
    if (A.normalized) {
      const a = VA(e.constructor), t = new Float32Array(e.length);
      for (let i = 0, s = e.length; i < s; i++)
        t[i] = e[i] * a;
      e = t;
    }
    return e;
  }
  _createCubicSplineTrackInterpolant(A) {
    A.createInterpolant = function(a) {
      const t = this instanceof te ? gi : Ke;
      return new t(this.times, this.values, this.getValueSize() / 3, a);
    }, A.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0;
  }
}
function Ci(b, A, e) {
  const a = A.attributes, t = new Te();
  if (a.POSITION !== void 0) {
    const o = e.json.accessors[a.POSITION], n = o.min, r = o.max;
    if (n !== void 0 && r !== void 0) {
      if (t.set(
        new P(n[0], n[1], n[2]),
        new P(r[0], r[1], r[2])
      ), o.normalized) {
        const c = VA(cA[o.componentType]);
        t.min.multiplyScalar(c), t.max.multiplyScalar(c);
      }
    } else {
      console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      return;
    }
  } else
    return;
  const i = A.targets;
  if (i !== void 0) {
    const o = new P(), n = new P();
    for (let r = 0, c = i.length; r < c; r++) {
      const g = i[r];
      if (g.POSITION !== void 0) {
        const I = e.json.accessors[g.POSITION], E = I.min, l = I.max;
        if (E !== void 0 && l !== void 0) {
          if (n.setX(Math.max(Math.abs(E[0]), Math.abs(l[0]))), n.setY(Math.max(Math.abs(E[1]), Math.abs(l[1]))), n.setZ(Math.max(Math.abs(E[2]), Math.abs(l[2]))), I.normalized) {
            const p = VA(cA[I.componentType]);
            n.multiplyScalar(p);
          }
          o.max(n);
        } else
          console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      }
    }
    t.expandByVector(o);
  }
  b.boundingBox = t;
  const s = new nt();
  t.getCenter(s.center), s.radius = t.min.distanceTo(t.max) / 2, b.boundingSphere = s;
}
function Be(b, A, e) {
  const a = A.attributes, t = [];
  function i(s, o) {
    return e.getDependency("accessor", s).then(function(n) {
      b.setAttribute(o, n);
    });
  }
  for (const s in a) {
    const o = YA[s] || s.toLowerCase();
    o in b.attributes || t.push(i(a[s], o));
  }
  if (A.indices !== void 0 && !b.index) {
    const s = e.getDependency("accessor", A.indices).then(function(o) {
      b.setIndex(o);
    });
    t.push(s);
  }
  return DA.workingColorSpace !== J && "COLOR_0" in a && console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${DA.workingColorSpace}" not supported.`), z(b, A), Ci(b, A, e), Promise.all(t).then(function() {
    return A.targets !== void 0 ? Ii(b, A.targets, e) : b;
  });
}
const pi = (b) => (b.traverse((e) => {
  if (e.isMesh && e.geometry) {
    const a = e, t = a.geometry.morphAttributes;
    a.geometry.morphAttributes = {}, a.geometry.computeBoundingBox(), a.geometry.morphAttributes = t;
  }
}), new Te().setFromObject(b));
class fi {
  scene;
  group = null;
  mixer = null;
  clips = [];
  speed = 1;
  constructor(A) {
    this.scene = A;
  }
  /**
   * Load a GLB model from a URL
   */
  async load(A, e) {
    this.dispose();
    const a = performance.now(), t = await e.loadAsync(A), i = performance.now() - a;
    return this.group = t.scene, this.normalize(), this.scene.add(this.group), this.clips = t.animations.map((s) => s.clone()) ?? [], this.clips.forEach((s) => {
      s.name = Ut(s.name);
    }), this.clips.length > 0 && (this.mixer = new ot(this.group)), this.setAnimationState(rt()), i;
  }
  /**
   * Normalize model scale and position to fit within bounds
   */
  normalize() {
    if (!this.group) return;
    const A = pi(this.group), e = A.getCenter(new P()), a = A.getSize(new P());
    let t = 1;
    const i = Math.max(a.x, a.y, a.z);
    i > 0 && (t = hA.maxModelSize / i, this.group.scale.multiplyScalar(t)), this.group.position.sub(e.clone().multiplyScalar(t));
  }
  /**
   * Update animation mixer and state
   */
  update(A) {
    if (!this.mixer) return;
    const a = this.mixer._actions?.find((t) => t.isRunning?.() || t.paused);
    if (a && a.isRunning?.()) {
      this.mixer.update(A), gt()(a.time ?? 0);
      const t = this.getMorphTargetWeights(), i = ct();
      i && t.size > 0 && i(t);
    }
  }
  /**
   * Extract current morph target weights from all meshes
   */
  getMorphTargetWeights() {
    const A = /* @__PURE__ */ new Map();
    return this.group && this.group.traverse((e) => {
      if (e.type === "Mesh" || e.type === "SkinnedMesh") {
        const a = e;
        if (a.morphTargetInfluences && a.morphTargetInfluences.length > 0)
          for (const t in a.morphTargetDictionary) {
            const i = a.morphTargetDictionary[t], s = a.morphTargetInfluences[i];
            A.set(t, s);
          }
      }
    }), A;
  }
  /**
   * Get current animation state
   */
  getAnimationState() {
    const e = this.mixer?._actions?.find((a) => a.isRunning?.() || a.paused);
    return e ? {
      isPlaying: e.isRunning?.() && !e.paused,
      trackName: e.getClip?.()?.name ?? null,
      time: e.time ?? 0,
      duration: e.getClip?.()?.duration ?? 0,
      speed: this.speed
    } : {
      isPlaying: !1,
      trackName: null,
      time: 0,
      duration: 0,
      speed: this.speed
    };
  }
  /**
   * Get animation tracks info
   */
  getAnimationTracks() {
    return this.clips.map((A) => ({
      name: A.name,
      duration: A.duration
    }));
  }
  /**
   * Set animation state (for restoring state)
   */
  setAnimationState(A) {
    if (!this.mixer || !A.trackName) return;
    this.speed = A.speed;
    let a = this.mixer._actions?.find((t) => t.getClip?.()?.name === A.trackName);
    if (!a) {
      const t = this.clips.find((i) => i.name === A.trackName);
      t && (a = this.mixer.clipAction(t));
    }
    if (a) {
      a.setEffectiveTimeScale(this.speed);
      const t = a.getClip?.()?.duration ?? 0;
      Math.abs(t - A.duration) < 0.01 && (a.isRunning() || a.play(), a.time = A.time, a.paused = !A.isPlaying);
    }
    this.mixer.update(0);
  }
  /**
   * Play a specific animation track by name
   */
  playTrack(A) {
    if (!this.mixer) return;
    const e = this.clips.find((t) => t.name === A);
    if (!e) {
      console.error(`Animation clip not found: ${A}`);
      return;
    }
    if (this.mixer._actions.length > 0) {
      const t = this.mixer._actions?.find((i) => i.isRunning?.() || i.paused);
      if (e.name === t?.getClip?.()?.name)
        return;
    }
    this.mixer.stopAllAction();
    const a = this.mixer.clipAction(e);
    a.setEffectiveTimeScale(this.speed), a.play();
  }
  /**
   * Set playing state
   */
  setPlaying(A) {
    if (!this.mixer) return;
    const a = this.mixer._actions?.find((t) => t.isRunning?.() || t.paused);
    a && (a.paused = !A);
  }
  /**
   * Seek to a specific time
   */
  seek(A, e) {
    if (!this.mixer) return;
    let a;
    if (e) {
      const t = this.clips.find((i) => i.name === e);
      t && (a = this.mixer.clipAction(t), !a.isRunning() && !a.paused && (a.paused = !0, a.play()));
    } else
      a = this.mixer._actions?.find((i) => i.isRunning?.() || i.paused);
    a && (a.time = A, this.mixer.update(0));
  }
  /**
   * Set animation playback speed
   */
  setSpeed(A) {
    this.speed = A, this.mixer && this.mixer._actions?.forEach((a) => {
      a.setEffectiveTimeScale?.(A);
    });
  }
  /**
   * Get the mixer instance (for external sync)
   */
  get animationMixer() {
    return this.mixer;
  }
  /**
   * Check if model has animations
   */
  hasAnimations() {
    return this.clips.length > 0;
  }
  /**
   * Generate a hash representing the animation structure.
   * Used to compare if two models have identical animations.
   * Hash is based on: clip names, durations, and track counts.
   */
  getAnimationHash() {
    return this.clips.length === 0 ? "" : this.clips.map((e) => {
      const a = e.tracks.length, t = Math.round(e.duration * 100) / 100;
      return `${e.name}:${t}:${a}`;
    }).sort().join("|");
  }
  /**
   * Check if this model's animations are equal to another model's
   */
  hasEqualAnimations(A) {
    return this.getAnimationHash() === A.getAnimationHash();
  }
  /**
   * Dispose all textures from a material to free GPU memory
   */
  disposeMaterialTextures(A) {
    Object.keys(A).forEach((e) => {
      const a = A[e];
      a && typeof a == "object" && "minFilter" in a && a.dispose();
    });
  }
  /**
   * Dispose model resources
   */
  dispose() {
    this.mixer && (this.mixer.stopAllAction(), this.mixer = null), this.group && (this.scene.remove(this.group), this.group.traverse((A) => {
      A instanceof ZA && (A.geometry?.dispose(), Array.isArray(A.material) ? A.material.forEach((e) => {
        this.disposeMaterialTextures(e), e.dispose();
      }) : A.material && (this.disposeMaterialTextures(A.material), A.material.dispose()));
    }), this.group = null), this.clips = [];
  }
}
const Qi = 0, le = 2, ui = 1, Ce = 2, mi = 0, wi = 1, Di = 10, ki = 0, He = 9, Pe = 15, ve = 16, Je = 22, Oe = 37, Ye = 43, Ve = 76, We = 83, ze = 97, Xe = 100, Ze = 103, $e = 109, Aa = 122, ea = 123, aa = 131, ta = 132, ia = 133, sa = 134, na = 137, oa = 138, ra = 139, ga = 140, ca = 141, ba = 142, Ia = 145, Ea = 146, da = 148, ha = 152, Ba = 153, la = 154, Ca = 155, pa = 156, fa = 157, Qa = 158, ua = 165, ma = 166, wa = 1000054e3, Da = 1000054001, ka = 1000054004, Fa = 1000054005, $A = 1000066e3, Ra = 1000066004;
class EA {
  constructor(A, e, a, t) {
    this._dataView = void 0, this._littleEndian = void 0, this._offset = void 0, this._dataView = new DataView(A.buffer, A.byteOffset + e, a), this._littleEndian = t, this._offset = 0;
  }
  _nextUint8() {
    const A = this._dataView.getUint8(this._offset);
    return this._offset += 1, A;
  }
  _nextUint16() {
    const A = this._dataView.getUint16(this._offset, this._littleEndian);
    return this._offset += 2, A;
  }
  _nextUint32() {
    const A = this._dataView.getUint32(this._offset, this._littleEndian);
    return this._offset += 4, A;
  }
  _nextUint64() {
    const A = this._dataView.getUint32(this._offset, this._littleEndian) + 4294967296 * this._dataView.getUint32(this._offset + 4, this._littleEndian);
    return this._offset += 8, A;
  }
  _nextInt32() {
    const A = this._dataView.getInt32(this._offset, this._littleEndian);
    return this._offset += 4, A;
  }
  _nextUint8Array(A) {
    const e = new Uint8Array(this._dataView.buffer, this._dataView.byteOffset + this._offset, A);
    return this._offset += A, e;
  }
  _skip(A) {
    return this._offset += A, this;
  }
  _scan(A, e = 0) {
    const a = this._offset;
    let t = 0;
    for (; this._dataView.getUint8(this._offset) !== e && t < A; ) t++, this._offset++;
    return t < A && this._offset++, new Uint8Array(this._dataView.buffer, this._dataView.byteOffset + a, t);
  }
}
const j = [171, 75, 84, 88, 32, 50, 48, 187, 13, 10, 26, 10];
function pe(b) {
  return new TextDecoder().decode(b);
}
function Fi(b) {
  const A = new Uint8Array(b.buffer, b.byteOffset, j.length);
  if (A[0] !== j[0] || A[1] !== j[1] || A[2] !== j[2] || A[3] !== j[3] || A[4] !== j[4] || A[5] !== j[5] || A[6] !== j[6] || A[7] !== j[7] || A[8] !== j[8] || A[9] !== j[9] || A[10] !== j[10] || A[11] !== j[11]) throw new Error("Missing KTX 2.0 identifier.");
  const e = { vkFormat: 0, typeSize: 1, pixelWidth: 0, pixelHeight: 0, pixelDepth: 0, layerCount: 0, faceCount: 1, levelCount: 0, supercompressionScheme: 0, levels: [], dataFormatDescriptor: [{ vendorId: 0, descriptorType: 0, versionNumber: 2, colorModel: 0, colorPrimaries: 1, transferFunction: 2, flags: 0, texelBlockDimension: [0, 0, 0, 0], bytesPlane: [0, 0, 0, 0, 0, 0, 0, 0], samples: [] }], keyValue: {}, globalData: null }, a = 17 * Uint32Array.BYTES_PER_ELEMENT, t = new EA(b, j.length, a, !0);
  e.vkFormat = t._nextUint32(), e.typeSize = t._nextUint32(), e.pixelWidth = t._nextUint32(), e.pixelHeight = t._nextUint32(), e.pixelDepth = t._nextUint32(), e.layerCount = t._nextUint32(), e.faceCount = t._nextUint32(), e.levelCount = t._nextUint32(), e.supercompressionScheme = t._nextUint32();
  const i = t._nextUint32(), s = t._nextUint32(), o = t._nextUint32(), n = t._nextUint32(), r = t._nextUint64(), c = t._nextUint64(), g = 3 * Math.max(e.levelCount, 1) * 8, I = new EA(b, j.length + a, g, !0);
  for (let U = 0, L = Math.max(e.levelCount, 1); U < L; U++) e.levels.push({ levelData: new Uint8Array(b.buffer, b.byteOffset + I._nextUint64(), I._nextUint64()), uncompressedByteLength: I._nextUint64() });
  const E = new EA(b, i, s, !0);
  E._skip(4);
  const l = E._nextUint16(), p = E._nextUint16(), f = E._nextUint16(), h = E._nextUint16(), d = { vendorId: l, descriptorType: p, versionNumber: f, colorModel: E._nextUint8(), colorPrimaries: E._nextUint8(), transferFunction: E._nextUint8(), flags: E._nextUint8(), texelBlockDimension: [E._nextUint8(), E._nextUint8(), E._nextUint8(), E._nextUint8()], bytesPlane: [E._nextUint8(), E._nextUint8(), E._nextUint8(), E._nextUint8(), E._nextUint8(), E._nextUint8(), E._nextUint8(), E._nextUint8()], samples: [] }, C = (h / 4 - 6) / 4;
  for (let U = 0; U < C; U++) {
    const L = { bitOffset: E._nextUint16(), bitLength: E._nextUint8(), channelType: E._nextUint8(), samplePosition: [E._nextUint8(), E._nextUint8(), E._nextUint8(), E._nextUint8()], sampleLower: Number.NEGATIVE_INFINITY, sampleUpper: Number.POSITIVE_INFINITY };
    64 & L.channelType ? (L.sampleLower = E._nextInt32(), L.sampleUpper = E._nextInt32()) : (L.sampleLower = E._nextUint32(), L.sampleUpper = E._nextUint32()), d.samples[U] = L;
  }
  e.dataFormatDescriptor.length = 0, e.dataFormatDescriptor.push(d);
  const B = new EA(b, o, n, !0);
  for (; B._offset < n; ) {
    const U = B._nextUint32(), L = B._scan(U), q = pe(L);
    if (e.keyValue[q] = B._nextUint8Array(U - L.byteLength - 1), q.match(/^ktx/i)) {
      const sA = pe(e.keyValue[q]);
      e.keyValue[q] = sA.substring(0, sA.lastIndexOf("\0"));
    }
    B._skip(U % 4 ? 4 - U % 4 : 0);
  }
  if (c <= 0) return e;
  const Q = new EA(b, r, c, !0), k = Q._nextUint16(), F = Q._nextUint16(), u = Q._nextUint32(), w = Q._nextUint32(), m = Q._nextUint32(), R = Q._nextUint32(), M = [];
  for (let U = 0, L = Math.max(e.levelCount, 1); U < L; U++) M.push({ imageFlags: Q._nextUint32(), rgbSliceByteOffset: Q._nextUint32(), rgbSliceByteLength: Q._nextUint32(), alphaSliceByteOffset: Q._nextUint32(), alphaSliceByteLength: Q._nextUint32() });
  const T = r + Q._offset, D = T + u, N = D + w, y = N + m, O = new Uint8Array(b.buffer, b.byteOffset + T, u), eA = new Uint8Array(b.buffer, b.byteOffset + D, w), Y = new Uint8Array(b.buffer, b.byteOffset + N, m), K = new Uint8Array(b.buffer, b.byteOffset + y, R);
  return e.globalData = { endpointCount: k, selectorCount: F, imageDescs: M, endpointsData: O, selectorsData: eA, tablesData: Y, extendedData: K }, e;
}
const TA = /* @__PURE__ */ new WeakMap();
class fe extends zA {
  /**
   * Constructs a new Draco loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(A) {
    super(A), this.decoderPath = "", this.decoderConfig = {}, this.decoderBinary = null, this.decoderPending = null, this.workerLimit = 4, this.workerPool = [], this.workerNextTaskID = 1, this.workerSourceURL = "", this.defaultAttributeIDs = {
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
  setDecoderPath(A) {
    return this.decoderPath = A, this;
  }
  /**
   * Provides configuration for the decoder libraries. Configuration cannot be changed after decoding begins.
   *
   * @param {{type:('js'|'wasm')}} config - The decoder config.
   * @return {DRACOLoader} A reference to this loader.
   */
  setDecoderConfig(A) {
    return this.decoderConfig = A, this;
  }
  /**
   * Sets the maximum number of Web Workers to be used during decoding.
   * A lower limit may be preferable if workers are also for other tasks in the application.
   *
   * @param {number} workerLimit - The worker limit.
   * @return {DRACOLoader} A reference to this loader.
   */
  setWorkerLimit(A) {
    return this.workerLimit = A, this;
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
  load(A, e, a, t) {
    const i = new oA(this.manager);
    i.setPath(this.path), i.setResponseType("arraybuffer"), i.setRequestHeader(this.requestHeader), i.setWithCredentials(this.withCredentials), i.load(A, (s) => {
      this.parse(s, e, t);
    }, a, t);
  }
  /**
   * Parses the given Draco data.
   *
   * @param {ArrayBuffer} buffer - The raw Draco data as an array buffer.
   * @param {function(BufferGeometry)} onLoad - Executed when the loading/parsing process has been finished.
   * @param {onErrorCallback} onError - Executed when errors occur.
   */
  parse(A, e, a = () => {
  }) {
    this.decodeDracoFile(A, e, null, null, W, a).catch(a);
  }
  //
  decodeDracoFile(A, e, a, t, i = J, s = () => {
  }) {
    const o = {
      attributeIDs: a || this.defaultAttributeIDs,
      attributeTypes: t || this.defaultAttributeTypes,
      useUniqueIDs: !!a,
      vertexColorSpace: i
    };
    return this.decodeGeometry(A, o).then(e).catch(s);
  }
  decodeGeometry(A, e) {
    const a = JSON.stringify(e);
    if (TA.has(A)) {
      const n = TA.get(A);
      if (n.key === a)
        return n.promise;
      if (A.byteLength === 0)
        throw new Error(
          "THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred."
        );
    }
    let t;
    const i = this.workerNextTaskID++, s = A.byteLength, o = this._getWorker(i, s).then((n) => (t = n, new Promise((r, c) => {
      t._callbacks[i] = { resolve: r, reject: c }, t.postMessage({ type: "decode", id: i, taskConfig: e, buffer: A }, [A]);
    }))).then((n) => this._createGeometry(n.geometry));
    return o.catch(() => !0).then(() => {
      t && i && this._releaseTask(t, i);
    }), TA.set(A, {
      key: a,
      promise: o
    }), o;
  }
  _createGeometry(A) {
    const e = new Se();
    A.index && e.setIndex(new pA(A.index.array, 1));
    for (let a = 0; a < A.attributes.length; a++) {
      const { name: t, array: i, itemSize: s, stride: o, vertexColorSpace: n } = A.attributes[a];
      let r;
      if (s === o)
        r = new pA(i, s);
      else {
        const c = new ke(i, o);
        r = new Ge(c, s, 0);
      }
      t === "color" && (this._assignVertexColorSpace(r, n), r.normalized = !(i instanceof Float32Array)), e.setAttribute(t, r);
    }
    return e;
  }
  _assignVertexColorSpace(A, e) {
    if (e !== W) return;
    const a = new X();
    for (let t = 0, i = A.count; t < i; t++)
      a.fromBufferAttribute(A, t), DA.colorSpaceToWorking(a, W), A.setXYZ(t, a.r, a.g, a.b);
  }
  _loadLibrary(A, e) {
    const a = new oA(this.manager);
    return a.setPath(this.decoderPath), a.setResponseType(e), a.setWithCredentials(this.withCredentials), new Promise((t, i) => {
      a.load(A, t, void 0, i);
    });
  }
  preload() {
    return this._initDecoder(), this;
  }
  _initDecoder() {
    if (this.decoderPending) return this.decoderPending;
    const A = typeof WebAssembly != "object" || this.decoderConfig.type === "js", e = [];
    return A ? e.push(this._loadLibrary("draco_decoder.js", "text")) : (e.push(this._loadLibrary("draco_wasm_wrapper.js", "text")), e.push(this._loadLibrary("draco_decoder.wasm", "arraybuffer"))), this.decoderPending = Promise.all(e).then((a) => {
      const t = a[0];
      A || (this.decoderConfig.wasmBinary = a[1]);
      const i = Ri.toString(), s = [
        "/* draco decoder */",
        t,
        "",
        "/* worker */",
        i.substring(i.indexOf("{") + 1, i.lastIndexOf("}"))
      ].join(`
`);
      this.workerSourceURL = URL.createObjectURL(new Blob([s]));
    }), this.decoderPending;
  }
  _getWorker(A, e) {
    return this._initDecoder().then(() => {
      if (this.workerPool.length < this.workerLimit) {
        const t = new Worker(this.workerSourceURL);
        t._callbacks = {}, t._taskCosts = {}, t._taskLoad = 0, t.postMessage({ type: "init", decoderConfig: this.decoderConfig }), t.onmessage = function(i) {
          const s = i.data;
          switch (s.type) {
            case "decode":
              t._callbacks[s.id].resolve(s);
              break;
            case "error":
              t._callbacks[s.id].reject(s);
              break;
            default:
              console.error('THREE.DRACOLoader: Unexpected message, "' + s.type + '"');
          }
        }, this.workerPool.push(t);
      } else
        this.workerPool.sort(function(t, i) {
          return t._taskLoad > i._taskLoad ? -1 : 1;
        });
      const a = this.workerPool[this.workerPool.length - 1];
      return a._taskCosts[A] = e, a._taskLoad += e, a;
    });
  }
  _releaseTask(A, e) {
    A._taskLoad -= A._taskCosts[e], delete A._callbacks[e], delete A._taskCosts[e];
  }
  debug() {
    console.log("Task load: ", this.workerPool.map((A) => A._taskLoad));
  }
  dispose() {
    for (let A = 0; A < this.workerPool.length; ++A)
      this.workerPool[A].terminate();
    return this.workerPool.length = 0, this.workerSourceURL !== "" && URL.revokeObjectURL(this.workerSourceURL), this;
  }
}
function Ri() {
  let b, A;
  onmessage = function(s) {
    const o = s.data;
    switch (o.type) {
      case "init":
        b = o.decoderConfig, A = new Promise(function(c) {
          b.onModuleLoaded = function(g) {
            c({ draco: g });
          }, DracoDecoderModule(b);
        });
        break;
      case "decode":
        const n = o.buffer, r = o.taskConfig;
        A.then((c) => {
          const g = c.draco, I = new g.Decoder();
          try {
            const E = e(g, I, new Int8Array(n), r), l = E.attributes.map((p) => p.array.buffer);
            E.index && l.push(E.index.array.buffer), self.postMessage({ type: "decode", id: o.id, geometry: E }, l);
          } catch (E) {
            console.error(E), self.postMessage({ type: "error", id: o.id, error: E.message });
          } finally {
            g.destroy(I);
          }
        });
        break;
    }
  };
  function e(s, o, n, r) {
    const c = r.attributeIDs, g = r.attributeTypes;
    let I, E;
    const l = o.GetEncodedGeometryType(n);
    if (l === s.TRIANGULAR_MESH)
      I = new s.Mesh(), E = o.DecodeArrayToMesh(n, n.byteLength, I);
    else if (l === s.POINT_CLOUD)
      I = new s.PointCloud(), E = o.DecodeArrayToPointCloud(n, n.byteLength, I);
    else
      throw new Error("THREE.DRACOLoader: Unexpected geometry type.");
    if (!E.ok() || I.ptr === 0)
      throw new Error("THREE.DRACOLoader: Decoding failed: " + E.error_msg());
    const p = { index: null, attributes: [] };
    for (const f in c) {
      const h = self[g[f]];
      let d, C;
      if (r.useUniqueIDs)
        C = c[f], d = o.GetAttributeByUniqueId(I, C);
      else {
        if (C = o.GetAttributeId(I, s[c[f]]), C === -1) continue;
        d = o.GetAttribute(I, C);
      }
      const B = t(s, o, I, f, h, d);
      f === "color" && (B.vertexColorSpace = r.vertexColorSpace), p.attributes.push(B);
    }
    return l === s.TRIANGULAR_MESH && (p.index = a(s, o, I)), s.destroy(I), p;
  }
  function a(s, o, n) {
    const c = n.num_faces() * 3, g = c * 4, I = s._malloc(g);
    o.GetTrianglesUInt32Array(n, g, I);
    const E = new Uint32Array(s.HEAPF32.buffer, I, c).slice();
    return s._free(I), { array: E, itemSize: 1 };
  }
  function t(s, o, n, r, c, g) {
    const I = n.num_points(), E = g.num_components(), l = i(s, c), p = E * c.BYTES_PER_ELEMENT, f = Math.ceil(p / 4) * 4, h = f / c.BYTES_PER_ELEMENT, d = I * p, C = I * f, B = s._malloc(d);
    o.GetAttributeDataArrayForAllPoints(n, g, l, d, B);
    const Q = new c(s.HEAPF32.buffer, B, d / c.BYTES_PER_ELEMENT);
    let k;
    if (p === f)
      k = Q.slice();
    else {
      k = new c(C / c.BYTES_PER_ELEMENT);
      let F = 0;
      for (let u = 0, w = Q.length; u < w; u++) {
        for (let m = 0; m < E; m++)
          k[F + m] = Q[u * E + m];
        F += h;
      }
    }
    return s._free(B), {
      name: r,
      count: I,
      itemSize: E,
      array: k,
      stride: h
    };
  }
  function i(s, o) {
    switch (o) {
      case Float32Array:
        return s.DT_FLOAT32;
      case Int8Array:
        return s.DT_INT8;
      case Int16Array:
        return s.DT_INT16;
      case Int32Array:
        return s.DT_INT32;
      case Uint8Array:
        return s.DT_UINT8;
      case Uint16Array:
        return s.DT_UINT16;
      case Uint32Array:
        return s.DT_UINT32;
    }
  }
}
class Si {
  /**
   * Constructs a new Worker pool.
   *
   * @param {number} [pool=4] - The size of the pool.
   */
  constructor(A = 4) {
    this.pool = A, this.queue = [], this.workers = [], this.workersResolve = [], this.workerStatus = 0, this.workerCreator = null;
  }
  _initWorker(A) {
    if (!this.workers[A]) {
      const e = this.workerCreator();
      e.addEventListener("message", this._onMessage.bind(this, A)), this.workers[A] = e;
    }
  }
  _getIdleWorker() {
    for (let A = 0; A < this.pool; A++)
      if (!(this.workerStatus & 1 << A)) return A;
    return -1;
  }
  _onMessage(A, e) {
    const a = this.workersResolve[A];
    if (a && a(e), this.queue.length) {
      const { resolve: t, msg: i, transfer: s } = this.queue.shift();
      this.workersResolve[A] = t, this.workers[A].postMessage(i, s);
    } else
      this.workerStatus ^= 1 << A;
  }
  /**
   * Sets a function that is responsible for creating Workers.
   *
   * @param {Function} workerCreator - The worker creator function.
   */
  setWorkerCreator(A) {
    this.workerCreator = A;
  }
  /**
   * Sets the Worker limit
   *
   * @param {number} pool - The size of the pool.
   */
  setWorkerLimit(A) {
    this.pool = A;
  }
  /**
   * Post a message to an idle Worker. If no Worker is available,
   * the message is pushed into a message queue for later processing.
   *
   * @param {Object} msg - The message.
   * @param {Array<ArrayBuffer>} transfer - An array with array buffers for data transfer.
   * @return {Promise} A Promise that resolves when the message has been processed.
   */
  postMessage(A, e) {
    return new Promise((a) => {
      const t = this._getIdleWorker();
      t !== -1 ? (this._initWorker(t), this.workerStatus |= 1 << t, this.workersResolve[t] = a, this.workers[t].postMessage(A, e)) : this.queue.push({ resolve: a, msg: A, transfer: e });
    });
  }
  /**
   * Terminates all Workers of this pool. Call this  method whenever this
   * Worker pool is no longer used in your app.
   */
  dispose() {
    this.workers.forEach((A) => A.terminate()), this.workersResolve.length = 0, this.workers.length = 0, this.queue.length = 0, this.workerStatus = 0;
  }
}
let LA, $, WA;
const MA = { env: { emscripten_notify_memory_growth: function(b) {
  WA = new Uint8Array($.exports.memory.buffer);
} } };
class yi {
  init() {
    return LA || (LA = typeof fetch < "u" ? fetch("data:application/wasm;base64," + Qe).then((A) => A.arrayBuffer()).then((A) => WebAssembly.instantiate(A, MA)).then(this._init) : WebAssembly.instantiate(Buffer.from(Qe, "base64"), MA).then(this._init), LA);
  }
  _init(A) {
    $ = A.instance, MA.env.emscripten_notify_memory_growth(0);
  }
  decode(A, e = 0) {
    if (!$) throw new Error("ZSTDDecoder: Await .init() before decoding.");
    const a = A.byteLength, t = $.exports.malloc(a);
    WA.set(A, t), e = e || Number($.exports.ZSTD_findDecompressedSize(t, a));
    const i = $.exports.malloc(e), s = $.exports.ZSTD_decompress(i, e, t, a), o = WA.slice(i, i + s);
    return $.exports.free(t), $.exports.free(i), o;
  }
}
const Qe = "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IAMNACAEQQNxBEADQCACRQ0FIAAgAkF/aiICaiIDIAEgAmotAAA6AAAgA0EDcQ0ACwsgAkEDTQ0AA0AgACACQXxqIgJqIAEgAmooAgA2AgAgAkEDSw0ACwsgAkUNAgNAIAAgAkF/aiICaiABIAJqLQAAOgAAIAINAAsMAgsgAkEDTQ0AIAIhBANAIAMgASgCADYCACABQQRqIQEgA0EEaiEDIARBfGoiBEEDSw0ACyACQQNxIQILIAJFDQADQCADIAEtAAA6AAAgA0EBaiEDIAFBAWohASACQX9qIgINAAsLIAAL8wICAn8BfgJAIAJFDQAgACACaiIDQX9qIAE6AAAgACABOgAAIAJBA0kNACADQX5qIAE6AAAgACABOgABIANBfWogAToAACAAIAE6AAIgAkEHSQ0AIANBfGogAToAACAAIAE6AAMgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgE2AgAgAyACIARrQXxxIgRqIgJBfGogATYCACAEQQlJDQAgAyABNgIIIAMgATYCBCACQXhqIAE2AgAgAkF0aiABNgIAIARBGUkNACADIAE2AhggAyABNgIUIAMgATYCECADIAE2AgwgAkFwaiABNgIAIAJBbGogATYCACACQWhqIAE2AgAgAkFkaiABNgIAIAQgA0EEcUEYciIEayICQSBJDQAgAa0iBUIghiAFhCEFIAMgBGohAQNAIAEgBTcDGCABIAU3AxAgASAFNwMIIAEgBTcDACABQSBqIQEgAkFgaiICQR9LDQALCyAACy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAIajYCACADCy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAFajYCACADCx8AIAAgASACKAIEEAg2AgAgARAEGiAAIAJBCGo2AgQLCAAgAGdBH3MLugUBDX8jAEEQayIKJAACfyAEQQNNBEAgCkEANgIMIApBDGogAyAEEAsaIAAgASACIApBDGpBBBAVIgBBbCAAEAMbIAAgACAESxsMAQsgAEEAIAEoAgBBAXRBAmoQECENQVQgAygAACIGQQ9xIgBBCksNABogAiAAQQVqNgIAIAMgBGoiAkF8aiEMIAJBeWohDiACQXtqIRAgAEEGaiELQQQh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ASIDNgLE4AEgACgCvOABIQQgACABNgK84AEgACABIAJqNgK44AEgACABIAQgA2tqNgLA4AELpgEBAX8gACAAKALs4QEQFjYCyOABIABCADcD+OABIABCADcDuOABIABBwOABakIANwMAIABBqNAAaiIBQYyAgOAANgIAIABBADYCmOIBIABCADcDiOEBIABCAzcDgOEBIABBrNABakHgEikCADcCACAAQbTQAWpB6BIoAgA2AgAgACABNgIMIAAgAEGYIGo2AgggACAAQaAwajYCBCAAIABBEGo2AgALYQEBf0G4fyEDAkAgAUEDSQ0AIAIgABAhIgFBA3YiADYCCCACIAFBAXE2AgQgAiABQQF2QQNxIgM2AgACQCADQX9qIgFBAksNAAJAIAFBAWsOAgEAAgtBbA8LIAAhAwsgAwsMACAAIAEgAkEAEC4LiAQCA38CfiADEBYhBCAAQQBBKBAQIQAgBCACSwRAIAQPCyABRQRAQX8PCwJAAkAgA0EBRg0AIAEoAAAiBkGo6r5pRg0AQXYhAyAGQXBxQdDUtMIBRw0BQQghAyACQQhJDQEgAEEAQSgQECEAIAEoAAQhASAAQQE2AhQgACABrTcDAEEADwsgASACIAMQLyIDIAJLDQAgACADNgIYQXIhAyABIARqIgVBf2otAAAiAkEIcQ0AIAJBIHEiBkUEQEFwIQMgBS0AACIFQacBSw0BIAVBB3GtQgEgBUEDdkEKaq2GIgdCA4h+IAd8IQggBEEBaiEECyACQQZ2IQMgAkECdiEFAkAgAkEDcUF/aiICQQJLBEBBACECDAELAkACQAJAIAJBAWsOAgECAAsgASAEai0AACECIARBAWohBAwCCyABIARqLwAAIQIgBEECaiEEDAELIAEgBGooAAAhAiAEQQRqIQQLIAVBAXEhBQJ+AkACQAJAIANBf2oiA0ECTQRAIANBAWsOAgIDAQtCfyAGRQ0DGiABIARqMQAADAMLIAEgBGovAACtQoACfAwCCyABIARqKAAArQwBCyABIARqKQAACyEHIAAgBTYCICAAIAI2AhwgACAHNwMAQQAhAyAAQQA2AhQgACAHIAggBhsiBzcDCCAAIAdCgIAIIAdCgIAIVBs+AhALIAMLWwEBf0G4fyEDIAIQFiICIAFNBH8gACACakF/ai0AACIAQQNxQQJ0QaAeaigC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C0Egak8NAQsgByAHKQNoNwMQIAcgBykDYDcDCCAEIA0gB0EIaiAHQdwAaiAPIA4gESAQEB4hCwwBCyACIARqIQggBCAKEAcgAkERTwRAIARBEGohAgNAIAIgCkEQaiIKEAcgAkEQaiICIAhJDQALCyAIIAlrIQIgByATNgJcIAkgCCAOa0sEQCAJIAggEWtLBEBBbCELDAILIBAgAiAOayICaiIKIANqIBBNBEAgCCAKIAMQDxoMAgsgCCAKQQAgAmsQDyEIIAcgAiADaiIDNgJkIAggAmshCCAOIQILIAlBEE8EQCADIAhqIQMDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALDAELAkAgCUEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgCUECdCIDQcAeaigCAGoiAhAXIAIgA0HgHmooAgBrIQIgBygCZCEDDAELIAggAhAMCyADQQlJDQAgAyAIaiEDIAhBCGoiCCACQQhqIgJrQQ9MBEADQCAIIAIQDCACQQhqIQIgCEEIaiIIIANJDQAMAgALAAsDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALCyAHQRhqEAQaIAsgDCALEAMiAhshDCAEIAQgC2ogAhshBCAFQX9qIgUNAAsgDBADDQFBbCEMIAdBGGoQBEECSQ0BQQAhCANAIAhBA0cEQCAAIAhBAnQiAmpBrNABaiACIAdqKAJENgIAIAhBAWohCAwBCwsgBygCXCEIC0G6fyEMIA8gCGsiACANIARrSw0AIAQEfyAEIAggABALIABqBUEACyABayEMCyAHQfAAaiQAIAwLkRcCFn8FfiMAQdABayIHJAAgByAAKALw4QEiCDYCvAEgASACaiESIAggACgCgOIBaiETAkACQCAFRQRAIAEhAwwBCyAAKALE4AEhESAAKALA4AEhFSAAKAK84AEhDyAAQQE2AozhAUEAIQgDQCAIQQNHBEAgByAIQQJ0IgJqIAAgAmpBrNABaigCADYCVCAIQQFqIQgMAQsLIAcgETYCZCAHIA82AmAgByABIA9rNgJoQWwhECAHQShqIAMgBBAGEAMNASAFQQQgBUEESBshFyAHQTxqIAdBKGogACgCABATIAdBxABqIAdBKGogACgCCBATIAdBzABqIAdB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IAdB0AFqJAAgEAslACAAQgA3AgAgAEEAOwEIIABBADoACyAAIAE2AgwgACACOgAKC7QFAQN/IwBBMGsiBCQAIABB/wFqIgVBfWohBgJAIAMvAQIEQCAEQRhqIAEgAhAGIgIQAw0BIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahASOgAAIAMgBEEIaiAEQRhqEBI6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0FIAEgBEEQaiAEQRhqEBI6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBSABIARBCGogBEEYahASOgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEjoAACABIAJqIABrIQIMAwsgAyAEQRBqIARBGGoQEjoAAiADIARBCGogBEEYahASOgADIANBBGohAwwAAAsACyAEQRhqIAEgAhAGIgIQAw0AIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahAROgAAIAMgBEEIaiAEQRhqEBE6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0EIAEgBEEQaiAEQRhqEBE6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBCABIARBCGogBEEYahAROgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEToAACABIAJqIABrIQIMAgsgAyAEQRBqIARBGGoQEToAAiADIARBCGogBEEYahAROgADIANBBGohAwwAAAsACyAEQTBqJAAgAgtpAQF/An8CQAJAIAJBB00NACABKAAAQbfIwuF+Rw0AIAAgASgABDYCmOIBQWIgAEEQaiABIAIQPiIDEAMNAhogAEKBgICAEDcDiOEBIAAgASADaiACIANrECoMAQsgACABIAIQKgtBAAsLrQMBBn8jAEGAAWsiAyQAQWIhCAJAIAJBCUkNACAAQZjQAGogAUEIaiIEIAJBeGogAEGY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wOABCwutAgIEfwF+IwBBQGoiBCQAAkACQCACQQhJDQAgASgAAEFwcUHQ1LTCAUcNACABIAIQIiEBIABCADcDCCAAQQA2AgQgACABNgIADAELIARBGGogASACEC0iAxADBEAgACADEBoMAQsgAwRAIABBuH8QGgwBCyACIAQoAjAiA2shAiABIANqIQMDQAJAIAAgAyACIARBCGoQLCIFEAMEfyAFBSACIAVBA2oiBU8NAUG4fwsQGgwCCyAGQQFqIQYgAiAFayECIAMgBWohAyAEKAIMRQ0ACyAEKAI4BEAgAkEDTQRAIABBuH8QGgwCCyADQQRqIQMLIAQoAighAiAEKQMYIQcgAEEANgIEIAAgAyABazYCACAAIAIgBmytIAcgB0J/URs3AwgLIARBQGskAAslAQF/IwBBEGsiAiQAIAIgACABEFEgAigCACEAIAJBEGokACAAC30BBH8jAEGQBGsiBCQAIARB/wE2AggCQCAEQRBqIARBCGogBEEMaiABIAIQFSIGEAMEQCAGIQUMAQtBVCEFIAQoAgwiB0EGSw0AIAMgBEEQaiAEKAIIIAcQQSIFEAMNACAAIAEgBmogAiAGayADEDwhBQsgBEGQBGokACAFC4cBAgJ/An5BABAWIQMCQANAIAEgA08EQAJAIAAoAABBcHFB0NS0wgFGBEAgACABECIiAhADRQ0BQn4PCyAAIAEQVSIEQn1WDQMgBCAFfCIFIARUIQJCfiEEIAINAyAAIAEQUiICEAMNAwsgASACayEBIAAgAmohAAwBCwtCfiAFIAEbIQQLIAQLPwIBfwF+IwBBMGsiAiQAAn5CfiACQQhqIAAgARAtDQAaQgAgAigCHEEBRg0AGiACKQMICyEDIAJBMGokACADC40BAQJ/IwBBMGsiASQAAkAgAEUNACAAKAKI4gENACABIABB/OEBaigCADYCKCABIAApAvThATcDICAAEDAgACgCqOIBIQIgASABKAIoNgIYIAEgASkDIDcDECACIAFBEGoQGyAAQQA2AqjiASABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALKgECfyMAQRBrIgAkACAAQQA2AgggAEIANwMAIAAQWCEBIABBEGokACABC4cBAQN/IwBBEGsiAiQAAkAgACgCAEUgACgCBEVzDQAgAiAAKAIINgIIIAIgACkCADcDAAJ/IAIoAgAiAQRAIAIoAghBqOMJIAERBQAMAQtBqOMJECgLIgFFDQAgASAAKQIANwL04QEgAUH84QFqIAAoAgg2AgAgARBZIAEhAwsgAkEQaiQAIAMLywEBAn8jAEEgayIBJAAgAEGBgIDAADYCtOIBIABBADYCiOIBIABBADYC7OEBIABCADcDkOIBIABBADYCpOMJIABBADYC3OIBIABCADcCzOIBIABBADYCvOIBIABBADYCxOABIABCADcCnOIBIABBpOIBakIANwIAIABBrOIBakEANgIAIAFCADcCECABQgA3AhggASABKQMYNwMIIAEgASkDEDcDACABKAIIQQh2QQFxIQIgAEEANgLg4gEgACACNgKM4gEgAUEgaiQAC3YBA38jAEEwayIBJAAgAARAIAEgAEHE0AFqIgIoAgA2AiggASAAKQK80AE3AyAgACgCACEDIAEgAigCADYCGCABIAApArzQATcDECADIAFBEGoQGyABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALzAEBAX8gACABKAK00AE2ApjiASAAIAEoAgQiAjYCwOABIAAgAjYCvOABIAAgAiABKAIIaiICNgK44AEgACACNgLE4AEgASgCuNABBEAgAEKBgICAEDcDiOEBIAAgAUGk0ABqNgIMIAAgAUGUIGo2AgggACABQZwwajYCBCAAIAFBDGo2AgAgAEGs0AFqIAFBqNABaigCADYCACAAQbDQAWogAUGs0AFqKAIANgIAIABBtNABaiABQbDQAWooAgA2AgAPCyAAQgA3A4jhAQs7ACACRQRAQbp/DwsgBEUEQEFsDwsgAiAEEGAEQCAAIAEgAiADIAQgBRBhDwsgACABIAIgAyAEIAUQZQtGAQF/IwBBEGsiBSQAIAVBCGogBBAOAn8gBS0ACQRAIAAgASACIAMgBBAyDAELIAAgASACIAMgBBA0CyEAIAVBEGokACAACzQAIAAgAyAEIAUQNiIFEAMEQCAFDwsgBSAESQR/IAEgAiADIAVqIAQgBWsgABA1BUG4fwsLRgEBfyMAQRBrIgUkACAFQQhqIAQQDgJ/IAUtAAkEQCAAIAEgAiADIAQQYgwBCyAAIAEgAiADIAQQNQshACAFQRBqJAAgAAtZAQF/QQ8hAiABIABJBEAgAUEE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", xi = "display-p3", Gi = "display-p3-linear";
({
  ...DA.spaces[W]
});
const NA = /* @__PURE__ */ new WeakMap();
let UA = 0, qA;
class H extends zA {
  /**
   * Constructs a new KTX2 loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(A) {
    super(A), this.transcoderPath = "", this.transcoderBinary = null, this.transcoderPending = null, this.workerPool = new Si(), this.workerSourceURL = "", this.workerConfig = null, typeof MSC_TRANSCODER < "u" && console.warn(
      'THREE.KTX2Loader: Please update to latest "basis_transcoder". "msc_basis_transcoder" is no longer supported in three.js r125+.'
    );
  }
  /**
   * Sets the transcoder path.
   *
   * The WASM transcoder and JS wrapper are available from the `examples/jsm/libs/basis` directory.
   *
   * @param {string} path - The transcoder path to set.
   * @return {KTX2Loader} A reference to this loader.
   */
  setTranscoderPath(A) {
    return this.transcoderPath = A, this;
  }
  /**
   * Sets the maximum number of Web Workers to be allocated by this instance.
   *
   * @param {number} workerLimit - The worker limit.
   * @return {KTX2Loader} A reference to this loader.
   */
  setWorkerLimit(A) {
    return this.workerPool.setWorkerLimit(A), this;
  }
  /**
   * Async version of {@link KTX2Loader#detectSupport}.
   *
   * @async
   * @deprecated
   * @param {WebGPURenderer} renderer - The renderer.
   * @return {Promise} A Promise that resolves when the support has been detected.
   */
  async detectSupportAsync(A) {
    return console.warn('KTX2Loader: "detectSupportAsync()" has been deprecated. Use "detectSupport()" and "await renderer.init();" when creating the renderer.'), await A.init(), this.detectSupport(A);
  }
  /**
   * Detects hardware support for available compressed texture formats, to determine
   * the output format for the transcoder. Must be called before loading a texture.
   *
   * @param {WebGPURenderer|WebGLRenderer} renderer - The renderer.
   * @return {KTX2Loader} A reference to this loader.
   */
  detectSupport(A) {
    return A.isWebGPURenderer === !0 ? this.workerConfig = {
      astcSupported: A.hasFeature("texture-compression-astc"),
      astcHDRSupported: !1,
      // https://github.com/gpuweb/gpuweb/issues/3856
      etc1Supported: A.hasFeature("texture-compression-etc1"),
      etc2Supported: A.hasFeature("texture-compression-etc2"),
      dxtSupported: A.hasFeature("texture-compression-s3tc"),
      bptcSupported: A.hasFeature("texture-compression-bc"),
      pvrtcSupported: A.hasFeature("texture-compression-pvrtc")
    } : (this.workerConfig = {
      astcSupported: A.extensions.has("WEBGL_compressed_texture_astc"),
      astcHDRSupported: A.extensions.has("WEBGL_compressed_texture_astc") && A.extensions.get("WEBGL_compressed_texture_astc").getSupportedProfiles().includes("hdr"),
      etc1Supported: A.extensions.has("WEBGL_compressed_texture_etc1"),
      etc2Supported: A.extensions.has("WEBGL_compressed_texture_etc"),
      dxtSupported: A.extensions.has("WEBGL_compressed_texture_s3tc"),
      bptcSupported: A.extensions.has("EXT_texture_compression_bptc"),
      pvrtcSupported: A.extensions.has("WEBGL_compressed_texture_pvrtc") || A.extensions.has("WEBKIT_WEBGL_compressed_texture_pvrtc")
    }, typeof navigator < "u" && typeof navigator.platform < "u" && typeof navigator.userAgent < "u" && navigator.platform.indexOf("Linux") >= 0 && navigator.userAgent.indexOf("Firefox") >= 0 && this.workerConfig.astcSupported && this.workerConfig.etc2Supported && this.workerConfig.bptcSupported && this.workerConfig.dxtSupported && (this.workerConfig.astcSupported = !1, this.workerConfig.etc2Supported = !1)), this;
  }
  // TODO: Make this method private
  init() {
    if (!this.transcoderPending) {
      const A = new oA(this.manager);
      A.setPath(this.transcoderPath), A.setWithCredentials(this.withCredentials);
      const e = A.loadAsync("basis_transcoder.js"), a = new oA(this.manager);
      a.setPath(this.transcoderPath), a.setResponseType("arraybuffer"), a.setWithCredentials(this.withCredentials);
      const t = a.loadAsync("basis_transcoder.wasm");
      this.transcoderPending = Promise.all([e, t]).then(([i, s]) => {
        const o = H.BasisWorker.toString(), n = [
          "/* constants */",
          "let _EngineFormat = " + JSON.stringify(H.EngineFormat),
          "let _EngineType = " + JSON.stringify(H.EngineType),
          "let _TranscoderFormat = " + JSON.stringify(H.TranscoderFormat),
          "let _BasisFormat = " + JSON.stringify(H.BasisFormat),
          "/* basis_transcoder.js */",
          i,
          "/* worker */",
          o.substring(o.indexOf("{") + 1, o.lastIndexOf("}"))
        ].join(`
`);
        this.workerSourceURL = URL.createObjectURL(new Blob([n])), this.transcoderBinary = s, this.workerPool.setWorkerCreator(() => {
          const r = new Worker(this.workerSourceURL), c = this.transcoderBinary.slice(0);
          return r.postMessage({ type: "init", config: this.workerConfig, transcoderBinary: c }, [c]), r;
        });
      }), UA > 0 && console.warn(
        "THREE.KTX2Loader: Multiple active KTX2 loaders may cause performance issues. Use a single KTX2Loader instance, or call .dispose() on old instances."
      ), UA++;
    }
    return this.transcoderPending;
  }
  /**
   * Starts loading from the given URL and passes the loaded KTX2 texture
   * to the `onLoad()` callback.
   *
   * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
   * @param {function(CompressedTexture)} onLoad - Executed when the loading process has been finished.
   * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
   * @param {onErrorCallback} onError - Executed when errors occur.
   */
  load(A, e, a, t) {
    if (this.workerConfig === null)
      throw new Error("THREE.KTX2Loader: Missing initialization with `.detectSupport( renderer )`.");
    const i = new oA(this.manager);
    i.setPath(this.path), i.setCrossOrigin(this.crossOrigin), i.setWithCredentials(this.withCredentials), i.setRequestHeader(this.requestHeader), i.setResponseType("arraybuffer"), i.load(A, (s) => {
      this.parse(s, e, t);
    }, a, t);
  }
  /**
   * Parses the given KTX2 data.
   *
   * @param {ArrayBuffer} buffer - The raw KTX2 data as an array buffer.
   * @param {function(CompressedTexture)} onLoad - Executed when the loading/parsing process has been finished.
   * @param {onErrorCallback} onError - Executed when errors occur.
   * @returns {Promise} A Promise that resolves when the parsing has been finished.
   */
  parse(A, e, a) {
    if (this.workerConfig === null)
      throw new Error("THREE.KTX2Loader: Missing initialization with `.detectSupport( renderer )`.");
    if (NA.has(A))
      return NA.get(A).promise.then(e).catch(a);
    this._createTexture(A).then((t) => e ? e(t) : null).catch(a);
  }
  _createTextureFrom(A, e) {
    const { type: a, error: t, data: { faces: i, width: s, height: o, format: n, type: r, dfdFlags: c } } = A;
    if (a === "error") return Promise.reject(t);
    let g;
    if (e.faceCount === 6)
      g = new bt(i, n, r);
    else {
      const I = i[0].mipmaps;
      g = e.layerCount > 1 ? new It(I, s, o, e.layerCount, n, r) : new Le(I, s, o, n, r);
    }
    return g.minFilter = i[0].mipmaps.length === 1 ? AA : kA, g.magFilter = AA, g.generateMipmaps = !1, g.needsUpdate = !0, g.colorSpace = Sa(e), g.premultiplyAlpha = !!(c & ui), g;
  }
  /**
   * @private
   * @param {ArrayBuffer} buffer
   * @param {?Object} config
   * @return {Promise<CompressedTexture|CompressedArrayTexture|DataTexture|Data3DTexture>}
   */
  async _createTexture(A, e = {}) {
    const a = Fi(new Uint8Array(A)), t = a.vkFormat === $A && a.dataFormatDescriptor[0].colorModel === 167;
    if (!(a.vkFormat === ki || t && !this.workerConfig.astcHDRSupported))
      return Li(a);
    const s = e, o = this.init().then(() => this.workerPool.postMessage({ type: "transcode", buffer: A, taskConfig: s }, [A])).then((n) => this._createTextureFrom(n.data, a));
    return NA.set(A, { promise: o }), o;
  }
  /**
   * Frees internal resources. This method should be called
   * when the loader is no longer required.
   */
  dispose() {
    this.workerPool.dispose(), this.workerSourceURL && URL.revokeObjectURL(this.workerSourceURL), UA--;
  }
}
H.BasisFormat = {
  ETC1S: 0,
  UASTC: 1,
  UASTC_HDR: 2
};
H.TranscoderFormat = {
  ETC1: 0,
  ETC2: 1,
  BC1: 2,
  BC3: 3,
  BC4: 4,
  BC5: 5,
  BC7_M6_OPAQUE_ONLY: 6,
  BC7_M5: 7,
  PVRTC1_4_RGB: 8,
  PVRTC1_4_RGBA: 9,
  ASTC_4x4: 10,
  ATC_RGB: 11,
  ATC_RGBA_INTERPOLATED_ALPHA: 12,
  RGBA32: 13,
  RGB565: 14,
  BGR565: 15,
  RGBA4444: 16,
  BC6H: 22,
  RGB_HALF: 24,
  RGBA_HALF: 25
};
H.EngineFormat = {
  RGBAFormat: gA,
  RGBA_ASTC_4x4_Format: uA,
  RGB_BPTC_UNSIGNED_Format: Dt,
  RGBA_BPTC_Format: PA,
  RGBA_ETC2_EAC_Format: Ne,
  RGBA_PVRTC_4BPPV1_Format: HA,
  RGBA_S3TC_DXT5_Format: vA,
  RGB_ETC1_Format: wt,
  RGB_ETC2_Format: Me,
  RGB_PVRTC_4BPPV1_Format: mt,
  RGBA_S3TC_DXT1_Format: JA
};
H.EngineType = {
  UnsignedByteType: x,
  HalfFloatType: V,
  FloatType: iA
};
H.BasisWorker = function() {
  let b, A, e;
  const a = _EngineFormat, t = _EngineType, i = _TranscoderFormat, s = _BasisFormat;
  self.addEventListener("message", function(l) {
    const p = l.data;
    switch (p.type) {
      case "init":
        b = p.config, o(p.transcoderBinary);
        break;
      case "transcode":
        A.then(() => {
          try {
            const { faces: f, buffers: h, width: d, height: C, hasAlpha: B, format: Q, type: k, dfdFlags: F } = n(p.buffer);
            self.postMessage({ type: "transcode", id: p.id, data: { faces: f, width: d, height: C, hasAlpha: B, format: Q, type: k, dfdFlags: F } }, h);
          } catch (f) {
            console.error(f), self.postMessage({ type: "error", id: p.id, error: f.message });
          }
        });
        break;
    }
  });
  function o(l) {
    A = new Promise((p) => {
      e = { wasmBinary: l, onRuntimeInitialized: p }, BASIS(e);
    }).then(() => {
      e.initializeBasis(), e.KTX2File === void 0 && console.warn("THREE.KTX2Loader: Please update Basis Universal transcoder.");
    });
  }
  function n(l) {
    const p = new e.KTX2File(new Uint8Array(l));
    function f() {
      p.close(), p.delete();
    }
    if (!p.isValid())
      throw f(), new Error("THREE.KTX2Loader:	Invalid or unsupported .ktx2 file");
    let h;
    if (p.isUASTC())
      h = s.UASTC;
    else if (p.isETC1S())
      h = s.ETC1S;
    else if (p.isHDR())
      h = s.UASTC_HDR;
    else
      throw new Error("THREE.KTX2Loader: Unknown Basis encoding");
    const d = p.getWidth(), C = p.getHeight(), B = p.getLayers() || 1, Q = p.getLevels(), k = p.getFaces(), F = p.getHasAlpha(), u = p.getDFDFlags(), { transcoderFormat: w, engineFormat: m, engineType: R } = g(h, d, C, F);
    if (!d || !C || !Q)
      throw f(), new Error("THREE.KTX2Loader:	Invalid texture");
    if (!p.startTranscoding())
      throw f(), new Error("THREE.KTX2Loader: .startTranscoding failed");
    const M = [], T = [];
    for (let D = 0; D < k; D++) {
      const N = [];
      for (let y = 0; y < Q; y++) {
        const O = [];
        let eA, Y;
        for (let U = 0; U < B; U++) {
          const L = p.getImageLevelInfo(y, U, D);
          D === 0 && y === 0 && U === 0 && (L.origWidth % 4 !== 0 || L.origHeight % 4 !== 0) && console.warn("THREE.KTX2Loader: ETC1S and UASTC textures should use multiple-of-four dimensions."), Q > 1 ? (eA = L.origWidth, Y = L.origHeight) : (eA = L.width, Y = L.height);
          let q = new Uint8Array(p.getImageTranscodedSizeInBytes(y, U, 0, w));
          const sA = p.transcodeImage(q, y, U, D, w, 0, -1, -1);
          if (R === t.HalfFloatType && (q = new Uint16Array(q.buffer, q.byteOffset, q.byteLength / Uint16Array.BYTES_PER_ELEMENT)), !sA)
            throw f(), new Error("THREE.KTX2Loader: .transcodeImage failed.");
          O.push(q);
        }
        const K = E(O);
        N.push({ data: K, width: eA, height: Y }), T.push(K.buffer);
      }
      M.push({ mipmaps: N, width: d, height: C, format: m, type: R });
    }
    return f(), { faces: M, buffers: T, width: d, height: C, hasAlpha: F, dfdFlags: u, format: m, type: R };
  }
  const r = [
    {
      if: "astcSupported",
      basisFormat: [s.UASTC],
      transcoderFormat: [i.ASTC_4x4, i.ASTC_4x4],
      engineFormat: [a.RGBA_ASTC_4x4_Format, a.RGBA_ASTC_4x4_Format],
      engineType: [t.UnsignedByteType],
      priorityETC1S: 1 / 0,
      priorityUASTC: 1,
      needsPowerOfTwo: !1
    },
    {
      if: "bptcSupported",
      basisFormat: [s.ETC1S, s.UASTC],
      transcoderFormat: [i.BC7_M5, i.BC7_M5],
      engineFormat: [a.RGBA_BPTC_Format, a.RGBA_BPTC_Format],
      engineType: [t.UnsignedByteType],
      priorityETC1S: 3,
      priorityUASTC: 2,
      needsPowerOfTwo: !1
    },
    {
      if: "dxtSupported",
      basisFormat: [s.ETC1S, s.UASTC],
      transcoderFormat: [i.BC1, i.BC3],
      engineFormat: [a.RGBA_S3TC_DXT1_Format, a.RGBA_S3TC_DXT5_Format],
      engineType: [t.UnsignedByteType],
      priorityETC1S: 4,
      priorityUASTC: 5,
      needsPowerOfTwo: !1
    },
    {
      if: "etc2Supported",
      basisFormat: [s.ETC1S, s.UASTC],
      transcoderFormat: [i.ETC1, i.ETC2],
      engineFormat: [a.RGB_ETC2_Format, a.RGBA_ETC2_EAC_Format],
      engineType: [t.UnsignedByteType],
      priorityETC1S: 1,
      priorityUASTC: 3,
      needsPowerOfTwo: !1
    },
    {
      if: "etc1Supported",
      basisFormat: [s.ETC1S, s.UASTC],
      transcoderFormat: [i.ETC1],
      engineFormat: [a.RGB_ETC1_Format],
      engineType: [t.UnsignedByteType],
      priorityETC1S: 2,
      priorityUASTC: 4,
      needsPowerOfTwo: !1
    },
    {
      if: "pvrtcSupported",
      basisFormat: [s.ETC1S, s.UASTC],
      transcoderFormat: [i.PVRTC1_4_RGB, i.PVRTC1_4_RGBA],
      engineFormat: [a.RGB_PVRTC_4BPPV1_Format, a.RGBA_PVRTC_4BPPV1_Format],
      engineType: [t.UnsignedByteType],
      priorityETC1S: 5,
      priorityUASTC: 6,
      needsPowerOfTwo: !0
    },
    {
      if: "bptcSupported",
      basisFormat: [s.UASTC_HDR],
      transcoderFormat: [i.BC6H],
      engineFormat: [a.RGB_BPTC_UNSIGNED_Format],
      engineType: [t.HalfFloatType],
      priorityHDR: 1,
      needsPowerOfTwo: !1
    },
    // Uncompressed fallbacks.
    {
      basisFormat: [s.ETC1S, s.UASTC],
      transcoderFormat: [i.RGBA32, i.RGBA32],
      engineFormat: [a.RGBAFormat, a.RGBAFormat],
      engineType: [t.UnsignedByteType, t.UnsignedByteType],
      priorityETC1S: 100,
      priorityUASTC: 100,
      needsPowerOfTwo: !1
    },
    {
      basisFormat: [s.UASTC_HDR],
      transcoderFormat: [i.RGBA_HALF],
      engineFormat: [a.RGBAFormat],
      engineType: [t.HalfFloatType],
      priorityHDR: 100,
      needsPowerOfTwo: !1
    }
  ], c = {
    [s.ETC1S]: r.filter((l) => l.basisFormat.includes(s.ETC1S)).sort((l, p) => l.priorityETC1S - p.priorityETC1S),
    [s.UASTC]: r.filter((l) => l.basisFormat.includes(s.UASTC)).sort((l, p) => l.priorityUASTC - p.priorityUASTC),
    [s.UASTC_HDR]: r.filter((l) => l.basisFormat.includes(s.UASTC_HDR)).sort((l, p) => l.priorityHDR - p.priorityHDR)
  };
  function g(l, p, f, h) {
    const d = c[l];
    for (let C = 0; C < d.length; C++) {
      const B = d[C];
      if (B.if && !b[B.if] || !B.basisFormat.includes(l) || h && B.transcoderFormat.length < 2 || B.needsPowerOfTwo && !(I(p) && I(f))) continue;
      const Q = B.transcoderFormat[h ? 1 : 0], k = B.engineFormat[h ? 1 : 0], F = B.engineType[0];
      return { transcoderFormat: Q, engineFormat: k, engineType: F };
    }
    throw new Error("THREE.KTX2Loader: Failed to identify transcoding target.");
  }
  function I(l) {
    return l <= 2 ? !0 : (l & l - 1) === 0 && l !== 0;
  }
  function E(l) {
    if (l.length === 1) return l[0];
    let p = 0;
    for (let d = 0; d < l.length; d++) {
      const C = l[d];
      p += C.byteLength;
    }
    const f = new Uint8Array(p);
    let h = 0;
    for (let d = 0; d < l.length; d++) {
      const C = l[d];
      f.set(C, h), h += C.byteLength;
    }
    return f;
  }
};
const Ti = /* @__PURE__ */ new Set([gA, OA, lA, BA]), _A = {
  [$e]: gA,
  [Ze]: lA,
  [Xe]: BA,
  [ze]: gA,
  [We]: lA,
  [Ve]: BA,
  [Ye]: gA,
  [Oe]: gA,
  [Je]: lA,
  [ve]: lA,
  [Pe]: BA,
  [He]: BA,
  [ea]: OA,
  [Aa]: OA,
  [ha]: Ne,
  [da]: Me,
  [Ba]: ft,
  [la]: pt,
  [Ca]: Ct,
  [pa]: lt,
  [$A]: uA,
  [Qa]: uA,
  [fa]: uA,
  [Ra]: SA,
  [ma]: SA,
  [ua]: SA,
  [sa]: JA,
  [ia]: JA,
  [ta]: ne,
  [aa]: ne,
  [oa]: vA,
  [na]: vA,
  [ga]: Bt,
  [ra]: ht,
  [ba]: dt,
  [ca]: Et,
  [Ea]: PA,
  [Ia]: PA,
  [Fa]: HA,
  [Da]: HA,
  [ka]: se,
  [wa]: se
}, rA = {
  [$e]: iA,
  [Ze]: iA,
  [Xe]: iA,
  [ze]: V,
  [We]: V,
  [Ve]: V,
  [Ye]: x,
  [Oe]: x,
  [Je]: x,
  [ve]: x,
  [Pe]: x,
  [He]: x,
  [ea]: qe,
  [Aa]: Ue,
  [ha]: x,
  [da]: x,
  [Ba]: x,
  [la]: x,
  [Ca]: x,
  [pa]: x,
  [$A]: V,
  [Qa]: x,
  [fa]: x,
  [Ra]: V,
  [ma]: x,
  [ua]: x,
  [sa]: x,
  [ia]: x,
  [ta]: x,
  [aa]: x,
  [oa]: x,
  [na]: x,
  [ga]: x,
  [ra]: x,
  [ba]: x,
  [ca]: x,
  [Ea]: x,
  [Ia]: x,
  [Fa]: x,
  [Da]: x,
  [ka]: x,
  [wa]: x
};
async function Li(b) {
  const { vkFormat: A } = b;
  if (_A[A] === void 0)
    throw new Error("THREE.KTX2Loader: Unsupported vkFormat: " + A);
  rA[A] === void 0 && console.warn('THREE.KTX2Loader: Missing ".type" for vkFormat: ' + A);
  let e;
  b.supercompressionScheme === le && (qA || (qA = new Promise(async (s) => {
    const o = new yi();
    await o.init(), s(o);
  })), e = await qA);
  const a = [];
  for (let s = 0; s < b.levels.length; s++) {
    const o = Math.max(1, b.pixelWidth >> s), n = Math.max(1, b.pixelHeight >> s), r = b.pixelDepth ? Math.max(1, b.pixelDepth >> s) : 0, c = b.levels[s];
    let g;
    if (b.supercompressionScheme === Qi)
      g = c.levelData;
    else if (b.supercompressionScheme === le)
      g = e.decode(c.levelData, c.uncompressedByteLength);
    else
      throw new Error("THREE.KTX2Loader: Unsupported supercompressionScheme.");
    let I;
    rA[A] === iA ? I = new Float32Array(
      g.buffer,
      g.byteOffset,
      g.byteLength / Float32Array.BYTES_PER_ELEMENT
    ) : rA[A] === V ? I = new Uint16Array(
      g.buffer,
      g.byteOffset,
      g.byteLength / Uint16Array.BYTES_PER_ELEMENT
    ) : rA[A] === qe || rA[A] === Ue ? I = new Uint32Array(
      g.buffer,
      g.byteOffset,
      g.byteLength / Uint32Array.BYTES_PER_ELEMENT
    ) : I = g, a.push({
      data: I,
      width: o,
      height: n,
      depth: r
    });
  }
  const t = b.levelCount === 0 || a.length > 1;
  let i;
  if (Ti.has(_A[A]))
    i = b.pixelDepth === 0 ? new Qt(a[0].data, b.pixelWidth, b.pixelHeight) : new ut(a[0].data, b.pixelWidth, b.pixelHeight, b.pixelDepth), i.minFilter = t ? Fe : wA, i.magFilter = wA, i.generateMipmaps = b.levelCount === 0;
  else {
    if (b.pixelDepth > 0) throw new Error("THREE.KTX2Loader: Unsupported pixelDepth.");
    i = new Le(a, b.pixelWidth, b.pixelHeight), i.minFilter = t ? kA : AA, i.magFilter = AA;
  }
  return i.mipmaps = a, i.type = rA[A], i.format = _A[A], i.colorSpace = Sa(b), i.needsUpdate = !0, Promise.resolve(i);
}
function Sa(b) {
  const A = b.dataFormatDescriptor[0];
  return A.colorPrimaries === wi ? A.transferFunction === Ce ? W : J : A.colorPrimaries === Di ? A.transferFunction === Ce ? xi : Gi : A.colorPrimaries === mi ? ie : (console.warn(`THREE.KTX2Loader: Unsupported color primaries, "${A.colorPrimaries}"`), ie);
}
var ue = (function() {
  var b = "b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuixkbeeeddddillviebeoweuec:W:Odkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WboY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbrl79IV9Rbwq;lZkdbk;jYi5ud9:du8Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaicefhxcj;abad9Uc;WFbGcjdadca0EhmaialfgPar9Rgoadfhsavaoadz:jjjjbgzceVhHcbhOdndninaeaO9nmeaPax9RaD6mdamaeaO9RaOamfgoae6EgAcsfglc9WGhCabaOad2fhXaAcethQaxaDfhiaOaeaoaeao6E9RhLalcl4cifcd4hKazcj;cbfaAfhYcbh8AazcjdfhEaHh3incbhodnawTmbaxa8Acd4fRbbhokaocFeGh5cbh8Eazcj;cbfhqinaih8Fdndndndna5a8Ecet4ciGgoc9:fPdebdkaPa8F9RaA6mrazcj;cbfa8EaA2fa8FaAz:jjjjb8Aa8FaAfhixdkazcj;cbfa8EaA2fcbaAz:kjjjb8Aa8FhixekaPa8F9RaK6mva8FaKfhidnaCTmbaPai9RcK6mbaocdtc:q1jjbfcj1jjbawEhaczhrcbhlinargoc9Wfghaqfhrdndndndndndnaaa8Fahco4fRbbalcoG4ciGcdtfydbPDbedvivvvlvkar9cb83bbarcwf9cb83bbxlkarcbaiRbdai8Xbb9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbaqaofgrcGfag9c8F1:NghcKtc8F91aicdfa8J9c8N1:Nfg8KRbbG86bbarcVfcba8KahcjeGcr4fghRbbag9cjjjjjl:dg8J9qE86bbarc7fcbaha8J9c8L1:NfghRbbag9cjjjjjd:dg8J9qE86bbarctfcbaha8J9c8K1:NfghRbbag9cjjjjje:dg8J9qE86bbarc91fcbaha8J9c8J1:NfghRbbag9cjjjj;ab:dg8J9qE86bbarc4fcbaha8J9cg1:NfghRbbag9cjjjja:dg8J9qE86bbarc93fcbaha8J9ch1:NfghRbbag9cjjjjz:dgg9qE86bbarc94fcbahag9ca1:NfghRbbai8Xbe9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbarc95fag9c8F1:NgicKtc8F91aha8J9c8N1:NfghRbbG86bbarc96fcbahaicjeGcr4fgiRbbag9cjjjjjl:dg8J9qE86bbarc97fcbaia8J9c8L1:NfgiRbbag9cjjjjjd:dg8J9qE86bbarc98fcbaia8J9c8K1:NfgiRbbag9cjjjjje:dg8J9qE86bbarc99fcbaia8J9c8J1:NfgiRbbag9cjjjj;ab:dg8J9qE86bbarc9:fcbaia8J9cg1:NfgiRbbag9cjjjja:dg8J9qE86bbarcufcbaia8J9ch1:NfgiRbbag9cjjjjz:dgg9qE86bbaiag9ca1:NfhixikaraiRblaiRbbghco4g8Ka8KciSg8KE86bbaqaofgrcGfaiclfa8Kfg8KRbbahcl4ciGg8La8LciSg8LE86bbarcVfa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc7fa8Ka8Lfg8KRbbahciGghahciSghE86bbarctfa8Kahfg8KRbbaiRbeghco4g8La8LciSg8LE86bbarc91fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc4fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc93fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc94fa8Kahfg8KRbbaiRbdghco4g8La8LciSg8LE86bbarc95fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc96fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc97fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc98fa8KahfghRbbaiRbigico4g8Ka8KciSg8KE86bbarc99faha8KfghRbbaicl4ciGg8Ka8KciSg8KE86bbarc9:faha8KfghRbbaicd4ciGg8Ka8KciSg8KE86bbarcufaha8KfgrRbbaiciGgiaiciSgiE86bbaraifhixdkaraiRbwaiRbbghcl4g8Ka8KcsSg8KE86bbaqaofgrcGfaicwfa8Kfg8KRbbahcsGghahcsSghE86bbarcVfa8KahfghRbbaiRbeg8Kcl4g8La8LcsSg8LE86bbarc7faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarctfaha8KfghRbbaiRbdg8Kcl4g8La8LcsSg8LE86bbarc91faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc4faha8KfghRbbaiRbig8Kcl4g8La8LcsSg8LE86bbarc93faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc94faha8KfghRbbaiRblg8Kcl4g8La8LcsSg8LE86bbarc95faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc96faha8KfghRbbaiRbvg8Kcl4g8La8LcsSg8LE86bbarc97faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc98faha8KfghRbbaiRbog8Kcl4g8La8LcsSg8LE86bbarc99faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc9:faha8KfghRbbaiRbrgicl4g8Ka8KcsSg8KE86bbarcufaha8KfgrRbbaicsGgiaicsSgiE86bbaraifhixekarai8Pbb83bbarcwfaicwf8Pbb83bbaiczfhikdnaoaC9pmbalcdfhlaoczfhraPai9RcL0mekkaoaC6moaimexokaCmva8FTmvkaqaAfhqa8Ecefg8Ecl9hmbkdndndndnawTmbasa8Acd4fRbbgociGPlbedrbkaATmdaza8Afh8Fazcj;cbfhhcbh8EaEhaina8FRbbhraahocbhlinaoahalfRbbgqce4cbaqceG9R7arfgr86bbaoadfhoaAalcefgl9hmbkaacefhaa8Fcefh8FahaAfhha8Ecefg8Ecl9hmbxikkaATmeaza8Afhaazcj;cbfhhcbhoceh8EaYh8FinaEaofhlaa8Vbbhrcbhoinala8FaofRbbcwtahaofRbbgqVc;:FiGce4cbaqceG9R7arfgr87bbaladfhlaLaocefgofmbka8FaQfh8FcdhoaacdfhaahaQfhha8EceGhlcbh8EalmbxdkkaATmbcbaocl49Rh8Eaza8AfRbbhqcwhoa3hlinalRbbaotaqVhqalcefhlaocwfgoca9hmbkcbhhaEh8FaYhainazcj;cbfahfRbbhrcwhoaahlinalRbbaotarVhralaAfhlaocwfgoca9hmbkara8E93aq7hqcbhoa8Fhlinalaqao486bbalcefhlaocwfgoca9hmbka8Fadfh8FaacefhaahcefghaA9hmbkkaEclfhEa3clfh3a8Aclfg8Aad6mbkaXazcjdfaAad2z:jjjjb8AazazcjdfaAcufad2fadz:jjjjb8AaAaOfhOaihxaimbkc9:hoxdkcbc99aPax9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaok:XseHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:kjjjb8AavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhldnaeTmbcmcsaDceSEhkcbhxcbhmcbhrcbhicbhoindnalaq9nmbc9:hoxikdndnawRbbgDc;Ve0mbavc;abfaoaDcu7gPcl4fcsGcitfgsydlhzasydbhHdndnaDcsGgsak9pmbavaiaPfcsGcdtfydbaxasEhDaxasTgOfhxxekdndnascsSmbcehOasc987asamffcefhDxekalcefhDal8SbbgscFeGhPdndnascu9mmbaDhlxekalcvfhlaPcFbGhPcrhsdninaD8SbbgOcFbGastaPVhPaOcu9kmeaDcefhDascrfgsc8J9hmbxdkkaDcefhlkcehOaPce4cbaPceG9R7amfhDkaDhmkavc;abfaocitfgsaDBdbasazBdlavaicdtfaDBdbavc;abfaocefcsGcitfgsaHBdbasaDBdlaocdfhoaOaifhidnadcd9hmbabarcetfgsaH87ebasclfaD87ebascdfaz87ebxdkabarcdtfgsaHBdbascwfaDBdbasclfazBdbxekdnaDcpe0mbaxcefgOavaiaqaDcsGfRbbgscl49RcsGcdtfydbascz6gPEhDavaias9RcsGcdtfydbaOaPfgzascsGgOEhsaOThOdndnadcd9hmbabarcetfgHax87ebaHclfas87ebaHcdfaD87ebxekabarcdtfgHaxBdbaHcwfasBdbaHclfaDBdbkavaicdtfaxBdbavc;abfaocitfgHaDBdbaHaxBdlavaicefgicsGcdtfaDBdbavc;abfaocefcsGcitfgHasBdbaHaDBdlavaiaPfgicsGcdtfasBdbavc;abfaocdfcsGcitfgDaxBdbaDasBdlaocifhoaiaOfhiazaOfhxxekaxcbalRbbgHEgAaDc;:eSgDfhzaHcsGhCaHcl4hXdndnaHcs0mbazcefhOxekazhOavaiaX9RcsGcdtfydbhzkdndnaCmbaOcefhxxekaOhxavaiaH9RcsGcdtfydbhOkdndnaDTmbalcefhDxekalcdfhDal8SbegPcFeGhsdnaPcu9kmbalcofhAascFbGhscrhldninaD8SbbgPcFbGaltasVhsaPcu9kmeaDcefhDalcrfglc8J9hmbkaAhDxekaDcefhDkasce4cbasceG9R7amfgmhAkdndnaXcsSmbaDhsxekaDcefhsaD8SbbglcFeGhPdnalcu9kmbaDcvfhzaPcFbGhPcrhldninas8SbbgDcFbGaltaPVhPaDcu9kmeascefhsalcrfglc8J9hmbkazhsxekascefhskaPce4cbaPceG9R7amfgmhzkdndnaCcsSmbashlxekascefhlas8SbbgDcFeGhPdnaDcu9kmbascvfhOaPcFbGhPcrhDdninal8SbbgscFbGaDtaPVhPascu9kmealcefhlaDcrfgDc8J9hmbkaOhlxekalcefhlkaPce4cbaPceG9R7amfgmhOkdndnadcd9hmbabarcetfgDaA87ebaDclfaO87ebaDcdfaz87ebxekabarcdtfgDaABdbaDcwfaOBdbaDclfazBdbkavc;abfaocitfgDazBdbaDaABdlavaicdtfaABdbavc;abfaocefcsGcitfgDaOBdbaDazBdlavaicefgicsGcdtfazBdbavc;abfaocdfcsGcitfgDaABdbaDaOBdlavaiaHcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhiaocifhokawcefhwaocsGhoaicsGhiarcifgrae6mbkkcbc99alaqSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnaecvfal9nmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk::ioiue99dud99dud99dnaeTmbcbhiabhlindndnal8Uebgv:YgoJ:ji:1Salcof8UebgrciVgw:Y:vgDNJbbbZJbbb:;avcu9kEMgq:lJbbb9p9DTmbaq:Ohkxekcjjjj94hkkalclf8Uebhvalcdf8UebhxabaiarcefciGfcetfak87ebdndnax:YgqaDNJbbbZJbbb:;axcu9kEMgm:lJbbb9p9DTmbam:Ohxxekcjjjj94hxkabaiarciGfgkcd7cetfax87ebdndnav:YgmaDNJbbbZJbbb:;avcu9kEMgP:lJbbb9p9DTmbaP:Ohvxekcjjjj94hvkabaiarcufciGfcetfav87ebdndnawaw2:ZgPaPMaoaoN:taqaqN:tamamN:tgoJbbbbaoJbbbb9GE:raDNJbbbZMgD:lJbbb9p9DTmbaD:Ohrxekcjjjj94hrkabakcetfar87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2gdTmbinababydbgecwtcw91:Yaece91cjjj98Gcjjj;8if::NUdbabclfhbadcufgdmbkkk:Tvirud99eudndnadcl9hmbaeTmeindndnabRbbgiabcefgl8Sbbgvabcdfgo8Sbbgrf9R:YJbbuJabcifgwRbbgdce4adVgDcd4aDVgDcl4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax86bbdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao86bbdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai86bbdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad86bbabclfhbaecufgembxdkkaeTmbindndnab8Vebgiabcdfgl8Uebgvabclfgo8Uebgrf9R:YJbFu9habcofgw8Vebgdce4adVgDcd4aDVgDcl4aDVgDcw4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax87ebdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao87ebdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai87ebdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad87ebabcwfhbaecufgembkkk9teiucbcbyd:K1jjbgeabcifc98GfgbBd:K1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;teeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiaeydlBdlaiaeydwBdwaiaeydxBdxaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk:3eedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdxaialBdwaialBdlaialBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkk81dbcjwk8Kbbbbdbbblbbbwbbbbbbbebbbdbbblbbbwbbbbc:Kwkl8WNbb", A = "b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuixkbbebeeddddilve9Weeeviebeoweuec:q:6dkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WbwY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbDl79IV9Rbqq:Ctklbzik9:evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaec:q:yjjbfai86bbaecitc:q1jjbfab8Piw83ibaecefgecjd9hmbkk:183lYud97dur978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaicefhxavaialfgmar9Rgoad;8qbbcj;abad9Uc;WFbGcjdadca0EhPdndndnadTmbaoadfhscbhzinaeaz9nmdamax9RaD6miabazad2fhHaxaDfhOaPaeaz9RazaPfae6EgAcsfgocl4cifcd4hCavcj;cbfaoc9WGgXcetfhQavcj;cbfaXci2fhLavcj;cbfaXfhKcbhYaoc;ab6h8AincbhodnawTmbaxaYcd4fRbbhokaocFeGhEcbh3avcj;cbfh5indndndndnaEa3cet4ciGgoc9:fPdebdkamaO9RaX6mwavcj;cbfa3aX2faOaX;8qbbaOaAfhOxdkavcj;cbfa3aX2fcbaX;8kbxekamaO9RaC6moaoclVcbawEhraOaCfhocbhidna8Ambamao9Rc;Gb6mbcbhlina5alfhidndndndndndnaOalco4fRbbgqciGarfPDbedibledibkaipxbbbbbbbbbbbbbbbbpklbxlkaiaopbblaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLg8Ecdp:mea8EpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9og8Fpxiiiiiiiiiiiiiiiip8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaaaoclffahc:q:yjjbfRbbfhoxikaiaopbbwaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9og8Fpxssssssssssssssssp8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaaaocwffahc:q:yjjbfRbbfhoxdkaiaopbbbpklbaoczfhoxekaiaopbbdaoRbbgacitc:q1jjbfpbibaac:q:yjjbfRbbgapsaoRbeghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPpklbaaaocdffahc:q:yjjbfRbbfhokdndndndndndnaqcd4ciGarfPDbedibledibkaiczfpxbbbbbbbbbbbbbbbbpklbxlkaiczfaopbblaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLg8Ecdp:mea8EpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9og8Fpxiiiiiiiiiiiiiiiip8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaaaoclffahc:q:yjjbfRbbfhoxikaiczfaopbbwaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9og8Fpxssssssssssssssssp8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaaaocwffahc:q:yjjbfRbbfhoxdkaiczfaopbbbpklbaoczfhoxekaiczfaopbbdaoRbbgacitc:q1jjbfpbibaac:q:yjjbfRbbgapsaoRbeghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPpklbaaaocdffahc:q:yjjbfRbbfhokdndndndndndnaqcl4ciGarfPDbedibledibkaicafpxbbbbbbbbbbbbbbbbpklbxlkaicafaopbblaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLg8Ecdp:mea8EpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9og8Fpxiiiiiiiiiiiiiiiip8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaaaoclffahc:q:yjjbfRbbfhoxikaicafaopbbwaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9og8Fpxssssssssssssssssp8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaaaocwffahc:q:yjjbfRbbfhoxdkaicafaopbbbpklbaoczfhoxekaicafaopbbdaoRbbgacitc:q1jjbfpbibaac:q:yjjbfRbbgapsaoRbeghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPpklbaaaocdffahc:q:yjjbfRbbfhokdndndndndndnaqco4arfPDbedibledibkaic8Wfpxbbbbbbbbbbbbbbbbpklbxlkaic8Wfaopbblaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLg8Ecdp:mea8EpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9og8Fpxiiiiiiiiiiiiiiiip8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngicitc:q1jjbfpbibaic:q:yjjbfRbbgipsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaiaoclffaqc:q:yjjbfRbbfhoxikaic8Wfaopbbwaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9og8Fpxssssssssssssssssp8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngicitc:q1jjbfpbibaic:q:yjjbfRbbgipsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spklbaiaocwffaqc:q:yjjbfRbbfhoxdkaic8Wfaopbbbpklbaoczfhoxekaic8WfaopbbdaoRbbgicitc:q1jjbfpbibaic:q:yjjbfRbbgipsaoRbegqcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPpklbaiaocdffaqc:q:yjjbfRbbfhokalc;abfhialcjefaX0meaihlamao9Rc;Fb0mbkkdnaiaX9pmbaici4hlinamao9RcK6mwa5aifhqdndndndndndnaOaico4fRbbalcoG4ciGarfPDbedibledibkaqpxbbbbbbbbbbbbbbbbpkbbxlkaqaopbblaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLg8Ecdp:mea8EpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9og8Fpxiiiiiiiiiiiiiiiip8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spkbbaaaoclffahc:q:yjjbfRbbfhoxikaqaopbbwaopbbbg8Eclp:mea8EpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9og8Fpxssssssssssssssssp8Jg8Ep5b9cjF;8;4;W;G;ab9:9cU1:Ngacitc:q1jjbfpbibaac:q:yjjbfRbbgapsa8Ep5e9cjF;8;4;W;G;ab9:9cU1:Nghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPa8Fa8Ep9spkbbaaaocwffahc:q:yjjbfRbbfhoxdkaqaopbbbpkbbaoczfhoxekaqaopbbdaoRbbgacitc:q1jjbfpbibaac:q:yjjbfRbbgapsaoRbeghcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPpkbbaaaocdffahc:q:yjjbfRbbfhokalcdfhlaiczfgiaX6mbkkaohOaoTmoka5aXfh5a3cefg3cl9hmbkdndndndnawTmbasaYcd4fRbbglciGPlbedwbkaXTmdavcjdfaYfhlavaYfpbdbhgcbhoinalavcj;cbfaofpblbg8JaKaofpblbg8KpmbzeHdOiAlCvXoQrLg8LaQaofpblbg8MaLaofpblbg8NpmbzeHdOiAlCvXoQrLgypmbezHdiOAlvCXorQLg8Ecep9Ta8Epxeeeeeeeeeeeeeeeeg8Fp9op9Hp9rg8Eagp9Uggp9Abbbaladfglaga8Ea8Epmlvorlvorlvorlvorp9Uggp9Abbbaladfglaga8Ea8EpmwDqkwDqkwDqkwDqkp9Uggp9Abbbaladfglaga8Ea8EpmxmPsxmPsxmPsxmPsp9Uggp9Abbbaladfglaga8LaypmwDKYqk8AExm35Ps8E8Fg8Ecep9Ta8Ea8Fp9op9Hp9rg8Ep9Uggp9Abbbaladfglaga8Ea8Epmlvorlvorlvorlvorp9Uggp9Abbbaladfglaga8Ea8EpmwDqkwDqkwDqkwDqkp9Uggp9Abbbaladfglaga8Ea8EpmxmPsxmPsxmPsxmPsp9Uggp9Abbbaladfglaga8Ja8KpmwKDYq8AkEx3m5P8Es8Fg8Ja8Ma8NpmwKDYq8AkEx3m5P8Es8Fg8KpmbezHdiOAlvCXorQLg8Ecep9Ta8Ea8Fp9op9Hp9rg8Ep9Uggp9Abbbaladfglaga8Ea8Epmlvorlvorlvorlvorp9Uggp9Abbbaladfglaga8Ea8EpmwDqkwDqkwDqkwDqkp9Uggp9Abbbaladfglaga8Ea8EpmxmPsxmPsxmPsxmPsp9Uggp9Abbbaladfglaga8Ja8KpmwDKYqk8AExm35Ps8E8Fg8Ecep9Ta8Ea8Fp9op9Hp9rg8Ep9Ug8Fp9Abbbaladfgla8Fa8Ea8Epmlvorlvorlvorlvorp9Ug8Fp9Abbbaladfgla8Fa8Ea8EpmwDqkwDqkwDqkwDqkp9Ug8Fp9Abbbaladfgla8Fa8Ea8EpmxmPsxmPsxmPsxmPsp9Uggp9AbbbaladfhlaoczfgoaX6mbxikkaXTmeavcjdfaYfhlavaYfpbdbhgcbhoinalavcj;cbfaofpblbg8JaKaofpblbg8KpmbzeHdOiAlCvXoQrLg8LaQaofpblbg8MaLaofpblbg8NpmbzeHdOiAlCvXoQrLgypmbezHdiOAlvCXorQLg8Ecep:nea8Epxebebebebebebebebg8Fp9op:bep9rg8Eagp:oeggp9Abbbaladfglaga8Ea8Epmlvorlvorlvorlvorp:oeggp9Abbbaladfglaga8Ea8EpmwDqkwDqkwDqkwDqkp:oeggp9Abbbaladfglaga8Ea8EpmxmPsxmPsxmPsxmPsp:oeggp9Abbbaladfglaga8LaypmwDKYqk8AExm35Ps8E8Fg8Ecep:nea8Ea8Fp9op:bep9rg8Ep:oeggp9Abbbaladfglaga8Ea8Epmlvorlvorlvorlvorp:oeggp9Abbbaladfglaga8Ea8EpmwDqkwDqkwDqkwDqkp:oeggp9Abbbaladfglaga8Ea8EpmxmPsxmPsxmPsxmPsp:oeggp9Abbbaladfglaga8Ja8KpmwKDYq8AkEx3m5P8Es8Fg8Ja8Ma8NpmwKDYq8AkEx3m5P8Es8Fg8KpmbezHdiOAlvCXorQLg8Ecep:nea8Ea8Fp9op:bep9rg8Ep:oeggp9Abbbaladfglaga8Ea8Epmlvorlvorlvorlvorp:oeggp9Abbbaladfglaga8Ea8EpmwDqkwDqkwDqkwDqkp:oeggp9Abbbaladfglaga8Ea8EpmxmPsxmPsxmPsxmPsp:oeggp9Abbbaladfglaga8Ja8KpmwDKYqk8AExm35Ps8E8Fg8Ecep:nea8Ea8Fp9op:bep9rg8Ep:oeg8Fp9Abbbaladfgla8Fa8Ea8Epmlvorlvorlvorlvorp:oeg8Fp9Abbbaladfgla8Fa8Ea8EpmwDqkwDqkwDqkwDqkp:oeg8Fp9Abbbaladfgla8Fa8Ea8EpmxmPsxmPsxmPsxmPsp:oeggp9AbbbaladfhlaoczfgoaX6mbxdkkaXTmbcbhocbalcl4gl9Rc8FGhiavcjdfaYfhravaYfpbdbh8Finaravcj;cbfaofpblbggaKaofpblbg8JpmbzeHdOiAlCvXoQrLg8KaQaofpblbg8LaLaofpblbg8MpmbzeHdOiAlCvXoQrLg8NpmbezHdiOAlvCXorQLg8Eaip:Rea8Ealp:Sep9qg8Ea8Fp9rg8Fp9Abbbaradfgra8Fa8Ea8Epmlvorlvorlvorlvorp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmwDqkwDqkwDqkwDqkp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmxmPsxmPsxmPsxmPsp9rg8Fp9Abbbaradfgra8Fa8Ka8NpmwDKYqk8AExm35Ps8E8Fg8Eaip:Rea8Ealp:Sep9qg8Ep9rg8Fp9Abbbaradfgra8Fa8Ea8Epmlvorlvorlvorlvorp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmwDqkwDqkwDqkwDqkp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmxmPsxmPsxmPsxmPsp9rg8Fp9Abbbaradfgra8Faga8JpmwKDYq8AkEx3m5P8Es8Fgga8La8MpmwKDYq8AkEx3m5P8Es8Fg8JpmbezHdiOAlvCXorQLg8Eaip:Rea8Ealp:Sep9qg8Ep9rg8Fp9Abbbaradfgra8Fa8Ea8Epmlvorlvorlvorlvorp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmwDqkwDqkwDqkwDqkp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmxmPsxmPsxmPsxmPsp9rg8Fp9Abbbaradfgra8Faga8JpmwDKYqk8AExm35Ps8E8Fg8Eaip:Rea8Ealp:Sep9qg8Ep9rg8Fp9Abbbaradfgra8Fa8Ea8Epmlvorlvorlvorlvorp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmwDqkwDqkwDqkwDqkp9rg8Fp9Abbbaradfgra8Fa8Ea8EpmxmPsxmPsxmPsxmPsp9rg8Fp9AbbbaradfhraoczfgoaX6mbkkaYclfgYad6mbkaHavcjdfaAad2;8qbbavavcjdfaAcufad2fad;8qbbaAazfhzc9:hoaOhxaOmbxlkkaeTmbaDalfhrcbhocuhlinaralaD9RglfaD6mdaPaeao9RaoaPfae6Eaofgoae6mbkaial9Rhxkcbc99amax9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaokwbz:bjjjbk:TseHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhldnaeTmbcmcsaDceSEhkcbhxcbhmcbhrcbhicbhoindnalaq9nmbc9:hoxikdndnawRbbgDc;Ve0mbavc;abfaoaDcu7gPcl4fcsGcitfgsydlhzasydbhHdndnaDcsGgsak9pmbavaiaPfcsGcdtfydbaxasEhDaxasTgOfhxxekdndnascsSmbcehOasc987asamffcefhDxekalcefhDal8SbbgscFeGhPdndnascu9mmbaDhlxekalcvfhlaPcFbGhPcrhsdninaD8SbbgOcFbGastaPVhPaOcu9kmeaDcefhDascrfgsc8J9hmbxdkkaDcefhlkcehOaPce4cbaPceG9R7amfhDkaDhmkavc;abfaocitfgsaDBdbasazBdlavaicdtfaDBdbavc;abfaocefcsGcitfgsaHBdbasaDBdlaocdfhoaOaifhidnadcd9hmbabarcetfgsaH87ebasclfaD87ebascdfaz87ebxdkabarcdtfgsaHBdbascwfaDBdbasclfazBdbxekdnaDcpe0mbaxcefgOavaiaqaDcsGfRbbgscl49RcsGcdtfydbascz6gPEhDavaias9RcsGcdtfydbaOaPfgzascsGgOEhsaOThOdndnadcd9hmbabarcetfgHax87ebaHclfas87ebaHcdfaD87ebxekabarcdtfgHaxBdbaHcwfasBdbaHclfaDBdbkavaicdtfaxBdbavc;abfaocitfgHaDBdbaHaxBdlavaicefgicsGcdtfaDBdbavc;abfaocefcsGcitfgHasBdbaHaDBdlavaiaPfgicsGcdtfasBdbavc;abfaocdfcsGcitfgDaxBdbaDasBdlaocifhoaiaOfhiazaOfhxxekaxcbalRbbgHEgAaDc;:eSgDfhzaHcsGhCaHcl4hXdndnaHcs0mbazcefhOxekazhOavaiaX9RcsGcdtfydbhzkdndnaCmbaOcefhxxekaOhxavaiaH9RcsGcdtfydbhOkdndnaDTmbalcefhDxekalcdfhDal8SbegPcFeGhsdnaPcu9kmbalcofhAascFbGhscrhldninaD8SbbgPcFbGaltasVhsaPcu9kmeaDcefhDalcrfglc8J9hmbkaAhDxekaDcefhDkasce4cbasceG9R7amfgmhAkdndnaXcsSmbaDhsxekaDcefhsaD8SbbglcFeGhPdnalcu9kmbaDcvfhzaPcFbGhPcrhldninas8SbbgDcFbGaltaPVhPaDcu9kmeascefhsalcrfglc8J9hmbkazhsxekascefhskaPce4cbaPceG9R7amfgmhzkdndnaCcsSmbashlxekascefhlas8SbbgDcFeGhPdnaDcu9kmbascvfhOaPcFbGhPcrhDdninal8SbbgscFbGaDtaPVhPascu9kmealcefhlaDcrfgDc8J9hmbkaOhlxekalcefhlkaPce4cbaPceG9R7amfgmhOkdndnadcd9hmbabarcetfgDaA87ebaDclfaO87ebaDcdfaz87ebxekabarcdtfgDaABdbaDcwfaOBdbaDclfazBdbkavc;abfaocitfgDazBdbaDaABdlavaicdtfaABdbavc;abfaocefcsGcitfgDaOBdbaDazBdlavaicefgicsGcdtfazBdbavc;abfaocdfcsGcitfgDaABdbaDaOBdlavaiaHcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhiaocifhokawcefhwaocsGhoaicsGhiarcifgrae6mbkkcbc99alaqSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnaecvfal9nmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk:2Pliur97eue978Jjjjjbc8W9Rhiaec98Ghldndnadcl9hmbdnalTmbcbhvabhdinadadpbbbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbadczfhdavclfgval6mbkkalaeSmeaipxbbbbbbbbbbbbbbbbgqpklbaiabalcdtfgdaeciGglcdtgv;8qbbdnalTmbaiaipblbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDaqp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpklbkadaiav;8qbbskaipxFubbFubbFubbFubbgxpklbdnalTmbcbhvabhdinadczfgmampbbbgopxbbbbbbFFbbbbbbFFgkp9oadpbbbgDaopmbediwDqkzHOAKY8AEgwczp:Reczp:Sep;6egraipblbaDaopmlvorxmPsCXQL358E8Fp9op;6eawczp:Sep;6egwp;Gearp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgPp9op9rp;Kegrpxb;:FSb;:FSb;:FSb;:FSararp;Meaoaop;MeawaqawaPp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFFbbFFbbFFbbFFbbp9oaoawp;Meaqp;Keczp:Rep9qgoarawp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogrpmwDKYqk8AExm35Ps8E8Fp9qpkbbadaDakp9oaoarpmbezHdiOAlvCXorQLp9qpkbbadcafhdavclfgval6mbkkalaeSmbaiczfpxbbbbbbbbbbbbbbbbgopklbaiaopklbaiabalcitfgdaeciGglcitgv;8qbbaiaxpkladnalTmbaiaipblzgopxbbbbbbFFbbbbbbFFgkp9oaipblbgDaopmbediwDqkzHOAKY8AEgwczp:Reczp:Sep;6egraipblaaDaopmlvorxmPsCXQL358E8Fp9op;6eawczp:Sep;6egwp;Gearp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgPp9op9rp;Kegrpxb;:FSb;:FSb;:FSb;:FSararp;Meaoaop;MeawaqawaPp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFFbbFFbbFFbbFFbbp9oaoawp;Meaqp;Keczp:Rep9qgoarawp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogrpmwDKYqk8AExm35Ps8E8Fp9qpklzaiaDakp9oaoarpmbezHdiOAlvCXorQLp9qpklbkadaiav;8qbbkk:Iwllue97euo978Jjjjjbca9Rhidnaec98GglTmbcbhvabhoinaocKfpx:ji:1S:ji:1S:ji:1S:ji:1SaopbbbgraoczfgwpbbbgDpmlvorxmPsCXQL358E8Fgqczp:Segkpxibbbibbbibbbibbbp9qgxp;6ep;Negmaxaxp:1ep;7egxaxp;KearaDpmbediwDqkzHOAKY8AEgxczp:Reczp:Sep;6egrarp;Meaxczp:Sep;6egDaDp;Meaqczp:Reczp:Sep;6egqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jep;Mepxbbn0bbn0bbn0bbn0gxp;KepxFFbbFFbbFFbbFFbbgPp9oamaDp;Meaxp;Keczp:Rep9qgDamarp;Meaxp;KeaPp9oamaqp;Meaxp;Keczp:Rep9qgxpmwDKYqk8AExm35Ps8E8Fgrp5eakclp:RegmpEi:T:j83ibawarp5bampEd:T:j83ibaocwfaDaxpmbezHdiOAlvCXorQLgxp5eampEe:T:j83ibaoaxp5bampEb:T:j83ibaocafhoavclfgval6mbkkdnalaeSmbaiczfpxbbbbbbbbbbbbbbbbgmpklbaiampklbaiabalcitfgoaeciGgvcitgw;8qbbdnavTmbaipx:ji:1S:ji:1S:ji:1S:ji:1SaipblbgraipblzgDpmlvorxmPsCXQL358E8Fgqczp:Segkpxibbbibbbibbbibbbp9qgxp;6ep;Negmaxaxp:1ep;7egxaxp;KearaDpmbediwDqkzHOAKY8AEgxczp:Reczp:Sep;6egrarp;Meaxczp:Sep;6egDaDp;Meaqczp:Reczp:Sep;6egqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jep;Mepxbbn0bbn0bbn0bbn0gxp;KepxFFbbFFbbFFbbFFbbgPp9oamaDp;Meaxp;Keczp:Rep9qgDamarp;Meaxp;KeaPp9oamaqp;Meaxp;Keczp:Rep9qgxpmwDKYqk8AExm35Ps8E8Fgrp5eakclp:RegmpEi:T:j83iKaiarp5bampEd:T:j83izaiaDaxpmbezHdiOAlvCXorQLgxp5eampEe:T:j83iwaiaxp5bampEb:T:j83ibkaoaiaw;8qbbkk;uddiue978Jjjjjbc;ab9Rhidnadcd4ae2glc98GgvTmbcbheabhdinadadpbbbgocwp:Recwp:Sep;6eaocep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepkbbadczfhdaeclfgeav6mbkkdnavalSmbaic8WfpxbbbbbbbbbbbbbbbbgopklbaicafaopklbaiczfaopklbaiaopklbaiabavcdtfgdalciGgecdtgv;8qbbdnaeTmbaiaipblbgocwp:Recwp:Sep;6eaocep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepklbkadaiav;8qbbkk:CPvdue97euw97eu8Jjjjjbc8W9Rhiaec98Ghldndnadcl9hmbaipxbbbbbbbbbbbbbbbbgvpklbdnalTmbcbhoabhdinadpbbbhradpxbbuJbbuJbbuJbbuJaipblbarcKp:Tep9qgwcep:Seawp9qgDcdp:SeaDp9qgDclp:SeaDp9qgqp;6ep;NegDarcwp:RecKp:SegkarpxFbbbFbbbFbbbFbbbgxp9ogmp:Uep;6ep;Mepxbbn0bbn0bbn0bbn0gPp;Kecwp:RepxbFbbbFbbbFbbbFbbp9oaDamakp:Xearczp:RecKp:Segrp:Uep;6ep;MeaPp;Keaxp9op9qaDamakarp:Uep:Xep;6ep;MeaPp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qaDaqawcep:Rep9oawpxebbbebbbebbbebbbp9op9qp;6ep;MeaPp;KecKp:Rep9qpkbbadczfhdaoclfgoal6mbkkalaeSmeaiavpklaaicafabalcdtfgdaeciGglcdtgo;8qbbaiavpklbdnalTmbaipblahraipxbbuJbbuJbbuJbbuJaipblbarcKp:Tep9qgwcep:Seawp9qgDcdp:SeaDp9qgDclp:SeaDp9qgqp;6ep;NegDarcwp:RecKp:SegkarpxFbbbFbbbFbbbFbbbgxp9ogmp:Uep;6ep;Mepxbbn0bbn0bbn0bbn0gPp;Kecwp:RepxbFbbbFbbbFbbbFbbp9oaDamakp:Xearczp:RecKp:Segrp:Uep;6ep;MeaPp;Keaxp9op9qaDamakarp:Uep:Xep;6ep;MeaPp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qaDaqawcep:Rep9oawpxebbbebbbebbbebbbp9op9qp;6ep;MeaPp;KecKp:Rep9qpklakadaicafao;8qbbskaipxbbbbbbbbbbbbbbbbgvpklbdnalTmbcbhoabhdinadczfgspxbFu9hbFu9hbFu9hbFu9hadpbbbgDaspbbbgPpmlvorxmPsCXQL358E8Fgmczp:Teaipblbp9qgrcep:Searp9qgwcdp:Seawp9qgwclp:Seawp9qgwcwp:Seawp9qgqp;6ep;NegwaDaPpmbediwDqkzHOAKY8AEgDpxFFbbFFbbFFbbFFbbgPp9ogkaDczp:Segxp:Ueamczp:Reczp:Segmp:Xep;6ep;Mepxbbn0bbn0bbn0bbn0gDp;KeaPp9oawakaxamp:Uep:Xep;6ep;MeaDp;Keczp:Rep9qgxawaqarcep:Rep9oarpxebbbebbbebbbebbbp9op9qp;6ep;MeaDp;Keczp:Reawamakp:Uep;6ep;MeaDp;KeaPp9op9qgrpmwDKYqk8AExm35Ps8E8FpkbbadaxarpmbezHdiOAlvCXorQLpkbbadcafhdaoclfgoal6mbkkalaeSmbaiczfpxbbbbbbbbbbbbbbbbgrpklbaiarpklbaiabalcitfgdaeciGglcitgo;8qbbaiavpkladnalTmbaipxbFu9hbFu9hbFu9hbFu9haipblbgDaipblzgPpmlvorxmPsCXQL358E8Fgmczp:Teaipblap9qgrcep:Searp9qgwcdp:Seawp9qgwclp:Seawp9qgwcwp:Seawp9qgqp;6ep;NegwaDaPpmbediwDqkzHOAKY8AEgDpxFFbbFFbbFFbbFFbbgPp9ogkaDczp:Segxp:Ueamczp:Reczp:Segmp:Xep;6ep;Mepxbbn0bbn0bbn0bbn0gDp;KeaPp9oawakaxamp:Uep:Xep;6ep;MeaDp;Keczp:Rep9qgxawaqarcep:Rep9oarpxebbbebbbebbbebbbp9op9qp;6ep;MeaDp;Keczp:Reawamakp:Uep;6ep;MeaDp;KeaPp9op9qgrpmwDKYqk8AExm35Ps8E8FpklzaiaxarpmbezHdiOAlvCXorQLpklbkadaiao;8qbbkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkkebcjwklz:Dbb", e = new Uint8Array([
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
  ]), a = new Uint8Array([
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
  var t = WebAssembly.validate(e) ? o(A) : o(b), i, s = WebAssembly.instantiate(t, {}).then(function(h) {
    i = h.instance, i.exports.__wasm_call_ctors();
  });
  function o(h) {
    for (var d = new Uint8Array(h.length), C = 0; C < h.length; ++C) {
      var B = h.charCodeAt(C);
      d[C] = B > 96 ? B - 97 : B > 64 ? B - 39 : B + 4;
    }
    for (var Q = 0, C = 0; C < h.length; ++C)
      d[Q++] = d[C] < 60 ? a[d[C]] : (d[C] - 60) * 64 + d[++C];
    return d.buffer.slice(0, Q);
  }
  function n(h, d, C, B, Q, k, F) {
    var u = h.exports.sbrk, w = B + 3 & -4, m = u(w * Q), R = u(k.length), M = new Uint8Array(h.exports.memory.buffer);
    M.set(k, R);
    var T = d(m, B, Q, R, k.length);
    if (T == 0 && F && F(m, w, Q), C.set(M.subarray(m, m + B * Q)), u(m - u(0)), T != 0)
      throw new Error("Malformed buffer data: " + T);
  }
  var r = {
    NONE: "",
    OCTAHEDRAL: "meshopt_decodeFilterOct",
    QUATERNION: "meshopt_decodeFilterQuat",
    EXPONENTIAL: "meshopt_decodeFilterExp",
    COLOR: "meshopt_decodeFilterColor"
  }, c = {
    ATTRIBUTES: "meshopt_decodeVertexBuffer",
    TRIANGLES: "meshopt_decodeIndexBuffer",
    INDICES: "meshopt_decodeIndexSequence"
  }, g = [], I = 0;
  function E(h) {
    var d = {
      object: new Worker(h),
      pending: 0,
      requests: {}
    };
    return d.object.onmessage = function(C) {
      var B = C.data;
      d.pending -= B.count, d.requests[B.id][B.action](B.value), delete d.requests[B.id];
    }, d;
  }
  function l(h) {
    for (var d = "self.ready = WebAssembly.instantiate(new Uint8Array([" + new Uint8Array(t) + "]), {}).then(function(result) { result.instance.exports.__wasm_call_ctors(); return result.instance; });self.onmessage = " + f.name + ";" + n.toString() + f.toString(), C = new Blob([d], { type: "text/javascript" }), B = URL.createObjectURL(C), Q = g.length; Q < h; ++Q)
      g[Q] = E(B);
    for (var Q = h; Q < g.length; ++Q)
      g[Q].object.postMessage({});
    g.length = h, URL.revokeObjectURL(B);
  }
  function p(h, d, C, B, Q) {
    for (var k = g[0], F = 1; F < g.length; ++F)
      g[F].pending < k.pending && (k = g[F]);
    return new Promise(function(u, w) {
      var m = new Uint8Array(C), R = ++I;
      k.pending += h, k.requests[R] = { resolve: u, reject: w }, k.object.postMessage({ id: R, count: h, size: d, source: m, mode: B, filter: Q }, [m.buffer]);
    });
  }
  function f(h) {
    var d = h.data;
    if (!d.id)
      return self.close();
    self.ready.then(function(C) {
      try {
        var B = new Uint8Array(d.count * d.size);
        n(C, C.exports[d.mode], B, d.count, d.size, d.source, C.exports[d.filter]), self.postMessage({ id: d.id, count: d.count, action: "resolve", value: B }, [B.buffer]);
      } catch (Q) {
        self.postMessage({ id: d.id, count: d.count, action: "reject", value: Q });
      }
    });
  }
  return {
    ready: s,
    supported: !0,
    useWorkers: function(h) {
      l(h);
    },
    decodeVertexBuffer: function(h, d, C, B, Q) {
      n(i, i.exports.meshopt_decodeVertexBuffer, h, d, C, B, i.exports[r[Q]]);
    },
    decodeIndexBuffer: function(h, d, C, B) {
      n(i, i.exports.meshopt_decodeIndexBuffer, h, d, C, B);
    },
    decodeIndexSequence: function(h, d, C, B) {
      n(i, i.exports.meshopt_decodeIndexSequence, h, d, C, B);
    },
    decodeGltfBuffer: function(h, d, C, B, Q, k) {
      n(i, i.exports[c[Q]], h, d, C, B, i.exports[r[k]]);
    },
    decodeGltfBufferAsync: function(h, d, C, B, Q) {
      return g.length > 0 ? p(h, d, C, c[B], r[Q]) : s.then(function() {
        var k = new Uint8Array(h * d);
        return n(i, i.exports[c[B]], k, h, d, C, i.exports[r[Q]]), k;
      });
    }
  };
})();
class qi {
  camera = null;
  renderer = null;
  clock = null;
  requestAnimationId = null;
  isWebGPU = !1;
  targetPosition = new P(0, 0, 0);
  targetLookAt = new P(0, 0, 0);
  currentLookAt = new P(0, 0, 0);
  fpsTracker = new Nt();
  loadTime = 0;
  environmentTexture = null;
  _skyboxEnabled = !1;
  loader = null;
  dracoLoader = null;
  ktx2Loader = null;
  // Model sides (left is primary, right is comparator)
  sides = /* @__PURE__ */ new Map();
  // Comparator mode properties
  _comparatorMode = !1;
  _splitPosition = 0.5;
  // Animation comparison (updated when models are loaded)
  _areAnimationsEqual = null;
  // Track the most recent load request ID per side to prevent race conditions
  lastLoadId = /* @__PURE__ */ new Map([
    [G.LEFT, 0],
    [G.RIGHT, 0]
  ]);
  async init(A, e) {
    this.clock = new kt();
    const a = new oe();
    a.background = null, this.sides.set(G.LEFT, {
      scene: a,
      model: null
    });
    const t = A.width || 1, i = A.height || 1;
    if (this.camera = new ye(
      aA.fov,
      t / i,
      aA.near,
      aA.far
    ), this.camera.lookAt(new P(aA.initialTarget.x, aA.initialTarget.y, aA.initialTarget.z)), this.isWebGPU = e === Ft.WEBGPU, this.isWebGPU) {
      const s = await import("./three.webgpu-n59E9TO1.js");
      this.renderer = new s.WebGPURenderer({
        canvas: A,
        antialias: !0
      }), await this.renderer.init();
    } else
      this.renderer = new re({ canvas: A, antialias: !0, preserveDrawingBuffer: !1 });
    this.renderer.setSize(t, i), this.renderer.setPixelRatio(window.devicePixelRatio), this.renderer.autoClear = !0, this.renderer.toneMapping = ge, this.renderer.toneMappingExposure = hA.toneMappingExposure, this.renderer.setClearColor(new X(hA.backgroundColor)), this.renderer.outputColorSpace = W, this.loader = new be(), this.dracoLoader = new fe(), this.dracoLoader.setDecoderPath(QA.draco.decoderPath), this.loader.setDRACOLoader(this.dracoLoader), this.loader.setMeshoptDecoder(ue), this.renderer && (this.ktx2Loader = new H(), this.ktx2Loader.setTranscoderPath(QA.three.basis.transcoderPath), this.ktx2Loader.detectSupport(this.renderer), this.loader.setKTX2Loader(this.ktx2Loader)), this.animate();
  }
  resize(A, e) {
    if (A <= 0 || e <= 0) {
      console.warn("Invalid resize dimensions:", { width: A, height: e });
      return;
    }
    if (this.camera && this.renderer) {
      this.camera.aspect = A / e, this.camera.updateProjectionMatrix(), this.renderer.setPixelRatio(window.devicePixelRatio), this.renderer.setSize(A, e, !0);
      const a = this.sides.get(G.LEFT);
      a && this.renderer.render(a.scene, this.camera);
    }
  }
  dispose() {
    this.requestAnimationId !== null && (cancelAnimationFrame(this.requestAnimationId), this.requestAnimationId = null), this.disableComparatorMode(), this.environmentTexture && (this.environmentTexture.dispose(), this.environmentTexture = null);
    for (const [, A] of this.sides)
      A.model && A.model.dispose(), A.scene.traverse((e) => {
        e instanceof ZA && (e.geometry?.dispose(), e.material && (Array.isArray(e.material) ? e.material.forEach((a) => this.disposeMaterial(a)) : this.disposeMaterial(e.material)));
      });
    this.sides.clear(), this.renderer?.dispose?.(), this.camera = null, this.renderer = null, this.clock = null, this.loader = null, this.dracoLoader?.dispose(), this.dracoLoader = null, this.ktx2Loader?.dispose(), this.ktx2Loader = null;
  }
  async loadModel(A, e) {
    await this.loadModelToSideInternal(A, G.LEFT, e);
  }
  async loadModelToSide(A, e, a) {
    await this.loadModelToSideInternal(A, e, a);
  }
  removeModel(A) {
    const e = A === "left" ? G.LEFT : G.RIGHT, a = this.sides.get(e);
    a?.model && (a.model.dispose(), a.model = null, this.updateAnimationsComparison());
  }
  async loadEnvironment(A) {
    const e = this.sides.get(G.LEFT);
    if (!e) return;
    this.environmentTexture && (this.environmentTexture.dispose(), this.environmentTexture = null);
    const a = new qt();
    try {
      const t = await a.loadAsync(A);
      if (t.mapping = Rt, this.isWebGPU) {
        this.environmentTexture = t, e.scene.environment = t;
        const i = this.sides.get(G.RIGHT);
        i && (i.scene.environment = t);
      } else if (this.renderer instanceof re) {
        const i = new St(this.renderer);
        i.compileEquirectangularShader();
        const s = i.fromEquirectangular(t).texture;
        this.environmentTexture = s, e.scene.environment = s, e.scene.environmentIntensity = hA.environmentIntensity;
        const o = this.sides.get(G.RIGHT);
        o && (o.scene.environment = s, o.scene.environmentIntensity = hA.environmentIntensity), t.dispose(), i.dispose();
      }
      if (this._skyboxEnabled && this.environmentTexture)
        for (const [, i] of this.sides)
          i.scene.background = this.environmentTexture;
    } catch (t) {
      throw console.error("Error loading HDR environment:", t), t;
    }
  }
  setCameraPosition(A, e, a = !1) {
    this.targetPosition.set(A.x, A.y, A.z), this.targetLookAt.set(e.x, e.y, e.z), a && this.camera && (this.camera.position.copy(this.targetPosition), this.currentLookAt.copy(this.targetLookAt), this.camera.lookAt(this.currentLookAt));
  }
  setExposure(A) {
    this.renderer && (this.renderer.toneMappingExposure = A);
  }
  setTonemapping(A) {
    if (this.renderer)
      switch (A) {
        case bA.NONE:
          this.renderer.toneMapping = Tt;
          break;
        case bA.LINEAR:
          this.renderer.toneMapping = Gt;
          break;
        case bA.REINHARD:
          this.renderer.toneMapping = xt;
          break;
        case bA.ACES:
          this.renderer.toneMapping = yt;
          break;
        case bA.NEUTRAL:
        default:
          this.renderer.toneMapping = ge;
          break;
      }
  }
  setBackgroundColor(A) {
    this.renderer && this.renderer.setClearColor(new X(A));
  }
  setSkyboxEnabled(A) {
    this._skyboxEnabled = A;
    for (const [, e] of this.sides)
      e.scene.background = A && this.environmentTexture ? this.environmentTexture : null;
  }
  enableComparatorMode(A) {
    const e = this.sides.get(G.LEFT);
    if (this._comparatorMode || !this.renderer || !e) return;
    this._comparatorMode = !0, this._splitPosition = A;
    const a = new oe();
    a.background = null, a.environment = e.scene.environment, e.scene.environmentIntensity !== void 0 && (a.environmentIntensity = e.scene.environmentIntensity), this.sides.set(G.RIGHT, {
      scene: a,
      model: null
    });
  }
  disableComparatorMode() {
    if (!this._comparatorMode) return;
    this._comparatorMode = !1, this._areAnimationsEqual = null;
    const A = this.sides.get(G.RIGHT);
    A?.model && A.model.dispose(), this.sides.delete(G.RIGHT);
  }
  setSplitPosition(A) {
    this._splitPosition = A;
  }
  isComparatorModeActive() {
    return this._comparatorMode;
  }
  /**
   * Check if left and right models have equal animations.
   * Returns null if both models are not loaded.
   */
  get areAnimationsEqual() {
    return this._areAnimationsEqual;
  }
  getAnimationState() {
    return this.sides.get(G.LEFT)?.model?.getAnimationState() ?? { isPlaying: !1, trackName: null, time: 0, duration: 0, speed: 1 };
  }
  setAnimationState(A) {
    this.sides.get(G.LEFT)?.model?.setAnimationState(A), this._areAnimationsEqual && this.sides.get(G.RIGHT)?.model?.setAnimationState(A);
  }
  playAnimationTrack(A) {
    this.sides.get(G.LEFT)?.model?.playTrack(A), this._areAnimationsEqual && this.sides.get(G.RIGHT)?.model?.playTrack(A);
  }
  setAnimationPlaying(A) {
    this.sides.get(G.LEFT)?.model?.setPlaying(A), this._areAnimationsEqual && this.sides.get(G.RIGHT)?.model?.setPlaying(A);
  }
  seekAnimation(A, e) {
    this.sides.get(G.LEFT)?.model?.seek(A, e), this._areAnimationsEqual && this.sides.get(G.RIGHT)?.model?.seek(A, e);
  }
  setAnimationSpeed(A) {
    this.sides.get(G.LEFT)?.model?.setSpeed(A), this.sides.get(G.RIGHT)?.model?.setSpeed(A);
  }
  getAnimationTracks() {
    return this.sides.get(G.LEFT)?.model?.getAnimationTracks() ?? [];
  }
  setMorphTargetWeight(A, e) {
    for (const [, a] of this.sides)
      a?.scene && a.scene.traverse((t) => {
        if (t.type === "Mesh" || t.type === "SkinnedMesh") {
          const i = t;
          if (i.morphTargetDictionary && i.morphTargetInfluences) {
            const s = i.morphTargetDictionary[A];
            s !== void 0 && s < i.morphTargetInfluences.length && (i.morphTargetInfluences[s] = e);
          }
        }
      });
  }
  setMorphTargetState(A) {
    for (const [e, a] of A)
      this.setMorphTargetWeight(e, a);
  }
  getStats() {
    if (!this.renderer)
      return Lt;
    const A = this.renderer.info;
    return {
      fps: this.fpsTracker.fps,
      drawCalls: A?.render.calls ?? 0,
      loadTimeMs: this.loadTime
    };
  }
  // Private Helper Methods
  animate = () => {
    this.requestAnimationId = requestAnimationFrame(this.animate), this.fpsTracker.update();
    const A = this.sides.get(G.LEFT);
    if (this.clock) {
      const e = this.clock.getDelta();
      for (const a of this.sides.values())
        a.model?.update(e);
    }
    if (this.renderer && A && this.camera)
      try {
        this.camera.position.lerp(this.targetPosition, aA.lerpFactor), this.currentLookAt.lerp(this.targetLookAt, aA.lerpFactor), this.camera.lookAt(this.currentLookAt);
        const e = this.sides.get(G.RIGHT);
        if (this._comparatorMode && e) {
          const a = this.renderer, t = new XA();
          a.getSize(t);
          const i = t.x, s = t.y, o = Math.floor(i * this._splitPosition);
          a.setViewport(0, 0, i, s), a.setScissorTest(!0), a.setScissor(0, 0, o, s), a.clear(!0, !0, !0), a.render(A.scene, this.camera), a.setScissor(o, 0, i - o, s), a.clear(!0, !0, !0), a.render(e.scene, this.camera), a.setScissorTest(!1);
        } else
          this.renderer.render(A.scene, this.camera);
      } catch (e) {
        console.error("Rendering error:", e), this.requestAnimationId !== null && (cancelAnimationFrame(this.requestAnimationId), this.requestAnimationId = null);
      }
  };
  disposeMaterial(A) {
    Object.keys(A).forEach((e) => {
      const a = A[e];
      a && typeof a == "object" && "minFilter" in a && a.dispose();
    }), A.dispose();
  }
  async loadModelToSideInternal(A, e, a) {
    if (a) {
      this.dracoLoader?.dispose(), this.ktx2Loader?.dispose();
      const n = new Mt();
      n.setURLModifier((r) => {
        if (r.startsWith("data:"))
          return r;
        const c = (r.split("/").pop() || r).split("?")[0];
        return a.resolve(c) || r;
      }), this.loader = new be(n), this.dracoLoader = new fe(), this.dracoLoader.setDecoderPath(QA.draco.decoderPath), this.loader.setDRACOLoader(this.dracoLoader), this.loader.setMeshoptDecoder(ue), this.renderer && !this.isWebGPU && (this.ktx2Loader = new H(), this.ktx2Loader.setTranscoderPath(QA.three.basis.transcoderPath), this.ktx2Loader.detectSupport(this.renderer), this.loader.setKTX2Loader(this.ktx2Loader));
    } else this.loader && this.loader.manager;
    const t = this.sides.get(e);
    if (!t) return;
    const i = t.model, s = new fi(t.scene), o = (this.lastLoadId.get(e) || 0) + 1;
    this.lastLoadId.set(e, o);
    try {
      if (this.loader && (this.loadTime = await s.load(A, this.loader)), this.lastLoadId.get(e) !== o) {
        s.dispose();
        return;
      }
      i && i.dispose(), t.model = s, this.updateAnimationsComparison();
    } catch (n) {
      throw s.dispose(), i && i.dispose(), console.error(`Error loading GLB for ${e} side:`, n), n;
    }
    if (e === G.RIGHT && this._comparatorMode && this._areAnimationsEqual) {
      const r = this.sides.get(G.LEFT)?.model?.getAnimationState();
      r?.trackName && (t.model.playTrack(r.trackName), t.model.setAnimationState(r));
    }
  }
  /**
   * Update animation comparison when models change
   */
  updateAnimationsComparison() {
    const A = this.sides.get(G.LEFT)?.model, e = this.sides.get(G.RIGHT)?.model;
    A && e ? this._areAnimationsEqual = A.hasEqualAnimations(e) : this._areAnimationsEqual = null;
  }
}
export {
  qi as ThreeAdapter
};
