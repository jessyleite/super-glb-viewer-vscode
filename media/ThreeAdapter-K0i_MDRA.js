import { d9 as lt, H as V, aB as tA, da as hA, cG as v, L as $, e2 as Qt, e0 as UA, e1 as de, cO as vA, dw as bA, cM as nA, bO as z, V as PA, y as aA, S as W, k as ft, h as pt, i as ut, M as QA, a1 as J, dj as mt, a2 as he, cE as wt, cP as le, d_ as Dt, dg as Rt, cH as dA, cJ as Qe, am as uA, ao as kt, an as Ft, ap as fe, aq as fA, al as _A, aj as St, ak as yt, bV as Gt, x as mA, bT as Tt, bN as pe, D as xt, Y as BA, dK as Lt, bY as ue, dU as Mt, v as YA, du as Ut, ds as _t, dt as Nt, dJ as Ht, cN as wA, z as me, cq as qt, O as Ot, dT as Kt, cS as jt, cW as Jt, dl as vt, dm as we, cK as De, a8 as WA, e3 as XA, dF as zA, dM as ZA, C as pA, g as Pt, dk as Yt, cY as Re, cx as Vt, d1 as Wt, d0 as Xt, d2 as ke, aA as $A, bo as Ae, bn as NA, bG as HA, bJ as zt, bK as Zt, bH as $t, bI as Aa, bj as ee, bh as te, bi as qA, bw as DA, bs as lA, bq as Fe, br as Se, bb as OA, bc as EA, be as CA, c as rA, U as x, b6 as ye, b5 as Ge, bL as ea, d8 as ta, bl as aa, bp as ia, bk as sa, dQ as na, e8 as ae, cT as oa, e9 as ra, ea as O, c_ as ga, a as ie, eb as M, ec as ca, ed as se, s as ne, a4 as Ia, ee as Ba, ef as Ea, q as Ca, o as ba, N as da } from "./index-ZWlHOBvT.js";
import { F as ha, S as la } from "./StatsManager-BYzrJ2Y6.js";
import { n as Qa } from "./index-Bz976FC6.js";
class fa extends lt {
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
    const i = function(u, w) {
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
      let L = u.pos, G = -1, D = 0, U = "", y = String.fromCharCode.apply(null, new Uint16Array(u.subarray(L, L + 128)));
      for (; 0 > (G = y.indexOf(`
`)) && D < w && L < u.byteLength; )
        U += y, D += y.length, L += 128, y += String.fromCharCode.apply(null, new Uint16Array(u.subarray(L, L + 128)));
      return -1 < G ? (u.pos += D + G + 1, U + y.slice(0, G)) : !1;
    }, B = function(u) {
      const w = /^#\?(\S+)/, m = /^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/, F = /^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/, L = /^\s*FORMAT=(\S+)\s*$/, G = /^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/, D = {
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
      let U, y;
      for ((u.pos >= u.byteLength || !(U = g(u))) && i(1, "no header found"), (y = U.match(w)) || i(3, "bad initial token"), D.valid |= 1, D.programtype = y[1], D.string += U + `
`; U = g(u), U !== !1; ) {
        if (D.string += U + `
`, U.charAt(0) === "#") {
          D.comments += U + `
`;
          continue;
        }
        if ((y = U.match(m)) && (D.gamma = parseFloat(y[1])), (y = U.match(F)) && (D.exposure = parseFloat(y[1])), (y = U.match(L)) && (D.valid |= 2, D.format = y[1]), (y = U.match(G)) && (D.valid |= 4, D.height = parseInt(y[1], 10), D.width = parseInt(y[2], 10)), D.valid & 2 && D.valid & 4) break;
      }
      return D.valid & 2 || i(3, "missing format specifier"), D.valid & 4 || i(3, "missing image size specifier"), D;
    }, E = function(u, w, m) {
      const F = w;
      if (
        // run length encoding is not allowed so read flat
        F < 8 || F > 32767 || // this file is not run length encoded
        u[0] !== 2 || u[1] !== 2 || u[2] & 128
      )
        return new Uint8Array(u);
      F !== (u[2] << 8 | u[3]) && i(3, "wrong scanline width");
      const L = new Uint8Array(4 * w * m);
      L.length || i(4, "unable to allocate buffer space");
      let G = 0, D = 0;
      const U = 4 * F, y = new Uint8Array(4), P = new Uint8Array(U);
      let AA = m;
      for (; AA > 0 && D < u.byteLength; ) {
        D + 4 > u.byteLength && i(1), y[0] = u[D++], y[1] = u[D++], y[2] = u[D++], y[3] = u[D++], (y[0] != 2 || y[1] != 2 || (y[2] << 8 | y[3]) != F) && i(3, "bad rgbe scanline format");
        let Y = 0, q;
        for (; Y < U && D < u.byteLength; ) {
          q = u[D++];
          const T = q > 128;
          if (T && (q -= 128), (q === 0 || Y + q > U) && i(3, "bad scanline data"), T) {
            const N = u[D++];
            for (let iA = 0; iA < q; iA++)
              P[Y++] = N;
          } else
            P.set(u.subarray(D, D + q), Y), Y += q, D += q;
        }
        const _ = F;
        for (let T = 0; T < _; T++) {
          let N = 0;
          L[G] = P[T + N], N += F, L[G + 1] = P[T + N], N += F, L[G + 2] = P[T + N], N += F, L[G + 3] = P[T + N], G += 4;
        }
        AA--;
      }
      return L;
    }, h = function(u, w, m, F) {
      const L = u[w + 3], G = Math.pow(2, L - 128) / 255;
      m[F + 0] = u[w + 0] * G, m[F + 1] = u[w + 1] * G, m[F + 2] = u[w + 2] * G, m[F + 3] = 1;
    }, Q = function(u, w, m, F) {
      const L = u[w + 3], G = Math.pow(2, L - 128) / 255;
      m[F + 0] = hA.toHalfFloat(Math.min(u[w + 0] * G, 65504)), m[F + 1] = hA.toHalfFloat(Math.min(u[w + 1] * G, 65504)), m[F + 2] = hA.toHalfFloat(Math.min(u[w + 2] * G, 65504)), m[F + 3] = hA.toHalfFloat(1);
    }, f = new Uint8Array(A);
    f.pos = 0;
    const b = B(f), C = b.width, l = b.height, d = E(f.subarray(f.pos), C, l);
    let p, R, k;
    switch (this.type) {
      case tA:
        k = d.length / 4;
        const u = new Float32Array(k * 4);
        for (let m = 0; m < k; m++)
          h(d, m * 4, u, m * 4);
        p = u, R = tA;
        break;
      case V:
        k = d.length / 4;
        const w = new Uint16Array(k * 4);
        for (let m = 0; m < k; m++)
          Q(d, m * 4, w, m * 4);
        p = w, R = V;
        break;
      default:
        throw new Error("THREE.HDRLoader: Unsupported type: " + this.type);
    }
    return {
      width: C,
      height: l,
      data: p,
      header: b.string,
      gamma: b.gamma,
      exposure: b.exposure,
      type: R
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
    function s(i, o) {
      switch (i.type) {
        case tA:
        case V:
          i.colorSpace = v, i.minFilter = $, i.magFilter = $, i.generateMipmaps = !1, i.flipY = !0;
          break;
      }
      e && e(i, o);
    }
    return super.load(A, s, a, t);
  }
}
function oe(I, A) {
  if (A === Qt)
    return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), I;
  if (A === UA || A === de) {
    let e = I.getIndex();
    if (e === null) {
      const i = [], o = I.getAttribute("position");
      if (o !== void 0) {
        for (let n = 0; n < o.count; n++)
          i.push(n);
        I.setIndex(i), e = I.getIndex();
      } else
        return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), I;
    }
    const a = e.count - 2, t = [];
    if (A === UA)
      for (let i = 1; i <= a; i++)
        t.push(e.getX(0)), t.push(e.getX(i)), t.push(e.getX(i + 1));
    else
      for (let i = 0; i < a; i++)
        i % 2 === 0 ? (t.push(e.getX(i)), t.push(e.getX(i + 1)), t.push(e.getX(i + 2))) : (t.push(e.getX(i + 2)), t.push(e.getX(i + 1)), t.push(e.getX(i)));
    t.length / 3 !== a && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
    const s = I.clone();
    return s.setIndex(t), s.clearGroups(), s;
  } else
    return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", A), I;
}
class pa extends vA {
  /**
   * Constructs a new glTF loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(A) {
    super(A), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(e) {
      return new Ra(e);
    }), this.register(function(e) {
      return new ka(e);
    }), this.register(function(e) {
      return new Ua(e);
    }), this.register(function(e) {
      return new _a(e);
    }), this.register(function(e) {
      return new Na(e);
    }), this.register(function(e) {
      return new Sa(e);
    }), this.register(function(e) {
      return new ya(e);
    }), this.register(function(e) {
      return new Ga(e);
    }), this.register(function(e) {
      return new Ta(e);
    }), this.register(function(e) {
      return new Da(e);
    }), this.register(function(e) {
      return new xa(e);
    }), this.register(function(e) {
      return new Fa(e);
    }), this.register(function(e) {
      return new Ma(e);
    }), this.register(function(e) {
      return new La(e);
    }), this.register(function(e) {
      return new ma(e);
    }), this.register(function(e) {
      return new Ha(e);
    }), this.register(function(e) {
      return new qa(e);
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
    const s = this;
    let i;
    if (this.resourcePath !== "")
      i = this.resourcePath;
    else if (this.path !== "") {
      const r = bA.extractUrlBase(A);
      i = bA.resolveURL(r, this.path);
    } else
      i = bA.extractUrlBase(A);
    this.manager.itemStart(A);
    const o = function(r) {
      t ? t(r) : console.error(r), s.manager.itemError(A), s.manager.itemEnd(A);
    }, n = new nA(this.manager);
    n.setPath(this.path), n.setResponseType("arraybuffer"), n.setRequestHeader(this.requestHeader), n.setWithCredentials(this.withCredentials), n.load(A, function(r) {
      try {
        s.parse(r, i, function(c) {
          e(c), s.manager.itemEnd(A);
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
   * Parses the given FBX data and returns the resulting group.
   *
   * @param {string|ArrayBuffer} data - The raw glTF data.
   * @param {string} path - The URL base path.
   * @param {function(GLTFLoader~LoadObject)} onLoad - Executed when the loading process has been finished.
   * @param {onErrorCallback} onError - Executed when errors occur.
   */
  parse(A, e, a, t) {
    let s;
    const i = {}, o = {}, n = new TextDecoder();
    if (typeof A == "string")
      s = JSON.parse(A);
    else if (A instanceof ArrayBuffer)
      if (n.decode(new Uint8Array(A, 0, 4)) === Te) {
        try {
          i[S.KHR_BINARY_GLTF] = new Oa(A);
        } catch (g) {
          t && t(g);
          return;
        }
        s = JSON.parse(i[S.KHR_BINARY_GLTF].content);
      } else
        s = JSON.parse(n.decode(A));
    else
      s = A;
    if (s.asset === void 0 || s.asset.version[0] < 2) {
      t && t(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const r = new Ai(s, {
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
      g.name || console.error("THREE.GLTFLoader: Invalid plugin found: missing name"), o[g.name] = g, i[g.name] = !0;
    }
    if (s.extensionsUsed)
      for (let c = 0; c < s.extensionsUsed.length; ++c) {
        const g = s.extensionsUsed[c], B = s.extensionsRequired || [];
        switch (g) {
          case S.KHR_MATERIALS_UNLIT:
            i[g] = new wa();
            break;
          case S.KHR_DRACO_MESH_COMPRESSION:
            i[g] = new Ka(s, this.dracoLoader);
            break;
          case S.KHR_TEXTURE_TRANSFORM:
            i[g] = new ja();
            break;
          case S.KHR_MESH_QUANTIZATION:
            i[g] = new Ja();
            break;
          default:
            B.indexOf(g) >= 0 && o[g] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + g + '".');
        }
      }
    r.setExtensions(i), r.setPlugins(o), r.parse(a, t);
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
    return new Promise(function(t, s) {
      a.parse(A, e, t, s);
    });
  }
}
function ua() {
  let I = {};
  return {
    get: function(A) {
      return I[A];
    },
    add: function(A, e) {
      I[A] = e;
    },
    remove: function(A) {
      delete I[A];
    },
    removeAll: function() {
      I = {};
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
class ma {
  constructor(A) {
    this.parser = A, this.name = S.KHR_LIGHTS_PUNCTUAL, this.cache = { refs: {}, uses: {} };
  }
  _markDefs() {
    const A = this.parser, e = this.parser.json.nodes || [];
    for (let a = 0, t = e.length; a < t; a++) {
      const s = e[a];
      s.extensions && s.extensions[this.name] && s.extensions[this.name].light !== void 0 && A._addNodeRef(this.cache, s.extensions[this.name].light);
    }
  }
  _loadLight(A) {
    const e = this.parser, a = "light:" + A;
    let t = e.cache.get(a);
    if (t) return t;
    const s = e.json, n = ((s.extensions && s.extensions[this.name] || {}).lights || [])[A];
    let r;
    const c = new aA(16777215);
    n.color !== void 0 && c.setRGB(n.color[0], n.color[1], n.color[2], v);
    const g = n.range !== void 0 ? n.range : 0;
    switch (n.type) {
      case "directional":
        r = new ut(c), r.target.position.set(0, 0, -1), r.add(r.target);
        break;
      case "point":
        r = new pt(c), r.distance = g;
        break;
      case "spot":
        r = new ft(c), r.distance = g, n.spot = n.spot || {}, n.spot.innerConeAngle = n.spot.innerConeAngle !== void 0 ? n.spot.innerConeAngle : 0, n.spot.outerConeAngle = n.spot.outerConeAngle !== void 0 ? n.spot.outerConeAngle : Math.PI / 4, r.angle = n.spot.outerConeAngle, r.penumbra = 1 - n.spot.innerConeAngle / n.spot.outerConeAngle, r.target.position.set(0, 0, -1), r.add(r.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + n.type);
    }
    return r.position.set(0, 0, 0), X(r, n), n.intensity !== void 0 && (r.intensity = n.intensity), r.name = e.createUniqueName(n.name || "light_" + A), t = Promise.resolve(r), e.cache.add(a, t), t;
  }
  getDependency(A, e) {
    if (A === "light")
      return this._loadLight(e);
  }
  createNodeAttachment(A) {
    const e = this, a = this.parser, s = a.json.nodes[A], o = (s.extensions && s.extensions[this.name] || {}).light;
    return o === void 0 ? null : this._loadLight(o).then(function(n) {
      return a._getNodeRef(e.cache, o, n);
    });
  }
}
class wa {
  constructor() {
    this.name = S.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return BA;
  }
  extendParams(A, e, a) {
    const t = [];
    A.color = new aA(1, 1, 1), A.opacity = 1;
    const s = e.pbrMetallicRoughness;
    if (s) {
      if (Array.isArray(s.baseColorFactor)) {
        const i = s.baseColorFactor;
        A.color.setRGB(i[0], i[1], i[2], v), A.opacity = i[3];
      }
      s.baseColorTexture !== void 0 && t.push(a.assignTexture(A, "map", s.baseColorTexture, W));
    }
    return Promise.all(t);
  }
}
class Da {
  constructor(A) {
    this.parser = A, this.name = S.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(A, e) {
    const t = this.parser.json.materials[A];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const s = t.extensions[this.name].emissiveStrength;
    return s !== void 0 && (e.emissiveIntensity = s), Promise.resolve();
  }
}
class Ra {
  constructor(A) {
    this.parser = A, this.name = S.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(A) {
    const a = this.parser.json.materials[A];
    return !a.extensions || !a.extensions[this.name] ? null : z;
  }
  extendMaterialParams(A, e) {
    const a = this.parser, t = a.json.materials[A];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const s = [], i = t.extensions[this.name];
    if (i.clearcoatFactor !== void 0 && (e.clearcoat = i.clearcoatFactor), i.clearcoatTexture !== void 0 && s.push(a.assignTexture(e, "clearcoatMap", i.clearcoatTexture)), i.clearcoatRoughnessFactor !== void 0 && (e.clearcoatRoughness = i.clearcoatRoughnessFactor), i.clearcoatRoughnessTexture !== void 0 && s.push(a.assignTexture(e, "clearcoatRoughnessMap", i.clearcoatRoughnessTexture)), i.clearcoatNormalTexture !== void 0 && (s.push(a.assignTexture(e, "clearcoatNormalMap", i.clearcoatNormalTexture)), i.clearcoatNormalTexture.scale !== void 0)) {
      const o = i.clearcoatNormalTexture.scale;
      e.clearcoatNormalScale = new PA(o, o);
    }
    return Promise.all(s);
  }
}
class ka {
  constructor(A) {
    this.parser = A, this.name = S.KHR_MATERIALS_DISPERSION;
  }
  getMaterialType(A) {
    const a = this.parser.json.materials[A];
    return !a.extensions || !a.extensions[this.name] ? null : z;
  }
  extendMaterialParams(A, e) {
    const t = this.parser.json.materials[A];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const s = t.extensions[this.name];
    return e.dispersion = s.dispersion !== void 0 ? s.dispersion : 0, Promise.resolve();
  }
}
class Fa {
  constructor(A) {
    this.parser = A, this.name = S.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(A) {
    const a = this.parser.json.materials[A];
    return !a.extensions || !a.extensions[this.name] ? null : z;
  }
  extendMaterialParams(A, e) {
    const a = this.parser, t = a.json.materials[A];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const s = [], i = t.extensions[this.name];
    return i.iridescenceFactor !== void 0 && (e.iridescence = i.iridescenceFactor), i.iridescenceTexture !== void 0 && s.push(a.assignTexture(e, "iridescenceMap", i.iridescenceTexture)), i.iridescenceIor !== void 0 && (e.iridescenceIOR = i.iridescenceIor), e.iridescenceThicknessRange === void 0 && (e.iridescenceThicknessRange = [100, 400]), i.iridescenceThicknessMinimum !== void 0 && (e.iridescenceThicknessRange[0] = i.iridescenceThicknessMinimum), i.iridescenceThicknessMaximum !== void 0 && (e.iridescenceThicknessRange[1] = i.iridescenceThicknessMaximum), i.iridescenceThicknessTexture !== void 0 && s.push(a.assignTexture(e, "iridescenceThicknessMap", i.iridescenceThicknessTexture)), Promise.all(s);
  }
}
class Sa {
  constructor(A) {
    this.parser = A, this.name = S.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(A) {
    const a = this.parser.json.materials[A];
    return !a.extensions || !a.extensions[this.name] ? null : z;
  }
  extendMaterialParams(A, e) {
    const a = this.parser, t = a.json.materials[A];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const s = [];
    e.sheenColor = new aA(0, 0, 0), e.sheenRoughness = 0, e.sheen = 1;
    const i = t.extensions[this.name];
    if (i.sheenColorFactor !== void 0) {
      const o = i.sheenColorFactor;
      e.sheenColor.setRGB(o[0], o[1], o[2], v);
    }
    return i.sheenRoughnessFactor !== void 0 && (e.sheenRoughness = i.sheenRoughnessFactor), i.sheenColorTexture !== void 0 && s.push(a.assignTexture(e, "sheenColorMap", i.sheenColorTexture, W)), i.sheenRoughnessTexture !== void 0 && s.push(a.assignTexture(e, "sheenRoughnessMap", i.sheenRoughnessTexture)), Promise.all(s);
  }
}
class ya {
  constructor(A) {
    this.parser = A, this.name = S.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(A) {
    const a = this.parser.json.materials[A];
    return !a.extensions || !a.extensions[this.name] ? null : z;
  }
  extendMaterialParams(A, e) {
    const a = this.parser, t = a.json.materials[A];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const s = [], i = t.extensions[this.name];
    return i.transmissionFactor !== void 0 && (e.transmission = i.transmissionFactor), i.transmissionTexture !== void 0 && s.push(a.assignTexture(e, "transmissionMap", i.transmissionTexture)), Promise.all(s);
  }
}
class Ga {
  constructor(A) {
    this.parser = A, this.name = S.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(A) {
    const a = this.parser.json.materials[A];
    return !a.extensions || !a.extensions[this.name] ? null : z;
  }
  extendMaterialParams(A, e) {
    const a = this.parser, t = a.json.materials[A];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const s = [], i = t.extensions[this.name];
    e.thickness = i.thicknessFactor !== void 0 ? i.thicknessFactor : 0, i.thicknessTexture !== void 0 && s.push(a.assignTexture(e, "thicknessMap", i.thicknessTexture)), e.attenuationDistance = i.attenuationDistance || 1 / 0;
    const o = i.attenuationColor || [1, 1, 1];
    return e.attenuationColor = new aA().setRGB(o[0], o[1], o[2], v), Promise.all(s);
  }
}
class Ta {
  constructor(A) {
    this.parser = A, this.name = S.KHR_MATERIALS_IOR;
  }
  getMaterialType(A) {
    const a = this.parser.json.materials[A];
    return !a.extensions || !a.extensions[this.name] ? null : z;
  }
  extendMaterialParams(A, e) {
    const t = this.parser.json.materials[A];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const s = t.extensions[this.name];
    return e.ior = s.ior !== void 0 ? s.ior : 1.5, Promise.resolve();
  }
}
class xa {
  constructor(A) {
    this.parser = A, this.name = S.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(A) {
    const a = this.parser.json.materials[A];
    return !a.extensions || !a.extensions[this.name] ? null : z;
  }
  extendMaterialParams(A, e) {
    const a = this.parser, t = a.json.materials[A];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const s = [], i = t.extensions[this.name];
    e.specularIntensity = i.specularFactor !== void 0 ? i.specularFactor : 1, i.specularTexture !== void 0 && s.push(a.assignTexture(e, "specularIntensityMap", i.specularTexture));
    const o = i.specularColorFactor || [1, 1, 1];
    return e.specularColor = new aA().setRGB(o[0], o[1], o[2], v), i.specularColorTexture !== void 0 && s.push(a.assignTexture(e, "specularColorMap", i.specularColorTexture, W)), Promise.all(s);
  }
}
class La {
  constructor(A) {
    this.parser = A, this.name = S.EXT_MATERIALS_BUMP;
  }
  getMaterialType(A) {
    const a = this.parser.json.materials[A];
    return !a.extensions || !a.extensions[this.name] ? null : z;
  }
  extendMaterialParams(A, e) {
    const a = this.parser, t = a.json.materials[A];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const s = [], i = t.extensions[this.name];
    return e.bumpScale = i.bumpFactor !== void 0 ? i.bumpFactor : 1, i.bumpTexture !== void 0 && s.push(a.assignTexture(e, "bumpMap", i.bumpTexture)), Promise.all(s);
  }
}
class Ma {
  constructor(A) {
    this.parser = A, this.name = S.KHR_MATERIALS_ANISOTROPY;
  }
  getMaterialType(A) {
    const a = this.parser.json.materials[A];
    return !a.extensions || !a.extensions[this.name] ? null : z;
  }
  extendMaterialParams(A, e) {
    const a = this.parser, t = a.json.materials[A];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const s = [], i = t.extensions[this.name];
    return i.anisotropyStrength !== void 0 && (e.anisotropy = i.anisotropyStrength), i.anisotropyRotation !== void 0 && (e.anisotropyRotation = i.anisotropyRotation), i.anisotropyTexture !== void 0 && s.push(a.assignTexture(e, "anisotropyMap", i.anisotropyTexture)), Promise.all(s);
  }
}
class Ua {
  constructor(A) {
    this.parser = A, this.name = S.KHR_TEXTURE_BASISU;
  }
  loadTexture(A) {
    const e = this.parser, a = e.json, t = a.textures[A];
    if (!t.extensions || !t.extensions[this.name])
      return null;
    const s = t.extensions[this.name], i = e.options.ktx2Loader;
    if (!i) {
      if (a.extensionsRequired && a.extensionsRequired.indexOf(this.name) >= 0)
        throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      return null;
    }
    return e.loadTextureImage(A, s.source, i);
  }
}
class _a {
  constructor(A) {
    this.parser = A, this.name = S.EXT_TEXTURE_WEBP;
  }
  loadTexture(A) {
    const e = this.name, a = this.parser, t = a.json, s = t.textures[A];
    if (!s.extensions || !s.extensions[e])
      return null;
    const i = s.extensions[e], o = t.images[i.source];
    let n = a.textureLoader;
    if (o.uri) {
      const r = a.options.manager.getHandler(o.uri);
      r !== null && (n = r);
    }
    return a.loadTextureImage(A, i.source, n);
  }
}
class Na {
  constructor(A) {
    this.parser = A, this.name = S.EXT_TEXTURE_AVIF;
  }
  loadTexture(A) {
    const e = this.name, a = this.parser, t = a.json, s = t.textures[A];
    if (!s.extensions || !s.extensions[e])
      return null;
    const i = s.extensions[e], o = t.images[i.source];
    let n = a.textureLoader;
    if (o.uri) {
      const r = a.options.manager.getHandler(o.uri);
      r !== null && (n = r);
    }
    return a.loadTextureImage(A, i.source, n);
  }
}
class Ha {
  constructor(A) {
    this.name = S.EXT_MESHOPT_COMPRESSION, this.parser = A;
  }
  loadBufferView(A) {
    const e = this.parser.json, a = e.bufferViews[A];
    if (a.extensions && a.extensions[this.name]) {
      const t = a.extensions[this.name], s = this.parser.getDependency("buffer", t.buffer), i = this.parser.options.meshoptDecoder;
      if (!i || !i.supported) {
        if (e.extensionsRequired && e.extensionsRequired.indexOf(this.name) >= 0)
          throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        return null;
      }
      return s.then(function(o) {
        const n = t.byteOffset || 0, r = t.byteLength || 0, c = t.count, g = t.byteStride, B = new Uint8Array(o, n, r);
        return i.decodeGltfBufferAsync ? i.decodeGltfBufferAsync(c, g, B, t.mode, t.filter).then(function(E) {
          return E.buffer;
        }) : i.ready.then(function() {
          const E = new ArrayBuffer(c * g);
          return i.decodeGltfBuffer(new Uint8Array(E), c, g, B, t.mode, t.filter), E;
        });
      });
    } else
      return null;
  }
}
class qa {
  constructor(A) {
    this.name = S.EXT_MESH_GPU_INSTANCING, this.parser = A;
  }
  createNodeMesh(A) {
    const e = this.parser.json, a = e.nodes[A];
    if (!a.extensions || !a.extensions[this.name] || a.mesh === void 0)
      return null;
    const t = e.meshes[a.mesh];
    for (const r of t.primitives)
      if (r.mode !== K.TRIANGLES && r.mode !== K.TRIANGLE_STRIP && r.mode !== K.TRIANGLE_FAN && r.mode !== void 0)
        return null;
    const i = a.extensions[this.name].attributes, o = [], n = {};
    for (const r in i)
      o.push(this.parser.getDependency("accessor", i[r]).then((c) => (n[r] = c, n[r])));
    return o.length < 1 ? null : (o.push(this.parser.createNodeMesh(A)), Promise.all(o).then((r) => {
      const c = r.pop(), g = c.isGroup ? c.children : [c], B = r[0].count, E = [];
      for (const h of g) {
        const Q = new QA(), f = new J(), b = new he(), C = new J(1, 1, 1), l = new mt(h.geometry, h.material, B);
        for (let d = 0; d < B; d++)
          n.TRANSLATION && f.fromBufferAttribute(n.TRANSLATION, d), n.ROTATION && b.fromBufferAttribute(n.ROTATION, d), n.SCALE && C.fromBufferAttribute(n.SCALE, d), l.setMatrixAt(d, Q.compose(f, b, C));
        for (const d in n)
          if (d === "_COLOR_0") {
            const p = n[d];
            l.instanceColor = new wt(p.array, p.itemSize, p.normalized);
          } else d !== "TRANSLATION" && d !== "ROTATION" && d !== "SCALE" && h.geometry.setAttribute(d, n[d]);
        le.prototype.copy.call(l, h), this.parser.assignFinalMaterial(l), E.push(l);
      }
      return c.isGroup ? (c.clear(), c.add(...E), c) : E[0];
    }));
  }
}
const Te = "glTF", cA = 12, re = { JSON: 1313821514, BIN: 5130562 };
class Oa {
  constructor(A) {
    this.name = S.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const e = new DataView(A, 0, cA), a = new TextDecoder();
    if (this.header = {
      magic: a.decode(new Uint8Array(A.slice(0, 4))),
      version: e.getUint32(4, !0),
      length: e.getUint32(8, !0)
    }, this.header.magic !== Te)
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2)
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const t = this.header.length - cA, s = new DataView(A, cA);
    let i = 0;
    for (; i < t; ) {
      const o = s.getUint32(i, !0);
      i += 4;
      const n = s.getUint32(i, !0);
      if (i += 4, n === re.JSON) {
        const r = new Uint8Array(A, cA + i, o);
        this.content = a.decode(r);
      } else if (n === re.BIN) {
        const r = cA + i;
        this.body = A.slice(r, r + o);
      }
      i += o;
    }
    if (this.content === null)
      throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
}
class Ka {
  constructor(A, e) {
    if (!e)
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    this.name = S.KHR_DRACO_MESH_COMPRESSION, this.json = A, this.dracoLoader = e, this.dracoLoader.preload();
  }
  decodePrimitive(A, e) {
    const a = this.json, t = this.dracoLoader, s = A.extensions[this.name].bufferView, i = A.extensions[this.name].attributes, o = {}, n = {}, r = {};
    for (const c in i) {
      const g = KA[c] || c.toLowerCase();
      o[g] = i[c];
    }
    for (const c in A.attributes) {
      const g = KA[c] || c.toLowerCase();
      if (i[c] !== void 0) {
        const B = a.accessors[A.attributes[c]], E = gA[B.componentType];
        r[g] = E.name, n[g] = B.normalized === !0;
      }
    }
    return e.getDependency("bufferView", s).then(function(c) {
      return new Promise(function(g, B) {
        t.decodeDracoFile(c, function(E) {
          for (const h in E.attributes) {
            const Q = E.attributes[h], f = n[h];
            f !== void 0 && (Q.normalized = f);
          }
          g(E);
        }, o, r, v, B);
      });
    });
  }
}
class ja {
  constructor() {
    this.name = S.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(A, e) {
    return (e.texCoord === void 0 || e.texCoord === A.channel) && e.offset === void 0 && e.rotation === void 0 && e.scale === void 0 || (A = A.clone(), e.texCoord !== void 0 && (A.channel = e.texCoord), e.offset !== void 0 && A.offset.fromArray(e.offset), e.rotation !== void 0 && (A.rotation = e.rotation), e.scale !== void 0 && A.repeat.fromArray(e.scale), A.needsUpdate = !0), A;
  }
}
class Ja {
  constructor() {
    this.name = S.KHR_MESH_QUANTIZATION;
  }
}
class xe extends Yt {
  constructor(A, e, a, t) {
    super(A, e, a, t);
  }
  copySampleValue_(A) {
    const e = this.resultBuffer, a = this.sampleValues, t = this.valueSize, s = A * t * 3 + t;
    for (let i = 0; i !== t; i++)
      e[i] = a[s + i];
    return e;
  }
  interpolate_(A, e, a, t) {
    const s = this.resultBuffer, i = this.sampleValues, o = this.valueSize, n = o * 2, r = o * 3, c = t - e, g = (a - e) / c, B = g * g, E = B * g, h = A * r, Q = h - r, f = -2 * E + 3 * B, b = E - B, C = 1 - f, l = b - B + g;
    for (let d = 0; d !== o; d++) {
      const p = i[Q + d + o], R = i[Q + d + n] * c, k = i[h + d + o], u = i[h + d] * c;
      s[d] = C * p + l * R + f * k + b * u;
    }
    return s;
  }
}
const va = new he();
class Pa extends xe {
  interpolate_(A, e, a, t) {
    const s = super.interpolate_(A, e, a, t);
    return va.fromArray(s).normalize().toArray(s), s;
  }
}
const K = {
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6
}, gA = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
}, ge = {
  9728: fA,
  9729: $,
  9984: fe,
  9985: Ft,
  9986: kt,
  9987: uA
}, ce = {
  33071: yt,
  33648: St,
  10497: _A
}, RA = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, KA = {
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
}, eA = {
  scale: "scale",
  translation: "position",
  rotation: "quaternion",
  weights: "morphTargetInfluences"
}, Ya = {
  CUBICSPLINE: void 0,
  // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
  // keyframe track will be initialized with a default interpolation type, then modified.
  LINEAR: we,
  STEP: vt
}, kA = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function Va(I) {
  return I.DefaultMaterial === void 0 && (I.DefaultMaterial = new pe({
    color: 16777215,
    emissive: 0,
    metalness: 1,
    roughness: 1,
    transparent: !1,
    depthTest: !0,
    side: Pt
  })), I.DefaultMaterial;
}
function sA(I, A, e) {
  for (const a in e.extensions)
    I[a] === void 0 && (A.userData.gltfExtensions = A.userData.gltfExtensions || {}, A.userData.gltfExtensions[a] = e.extensions[a]);
}
function X(I, A) {
  A.extras !== void 0 && (typeof A.extras == "object" ? Object.assign(I.userData, A.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + A.extras));
}
function Wa(I, A, e) {
  let a = !1, t = !1, s = !1;
  for (let r = 0, c = A.length; r < c; r++) {
    const g = A[r];
    if (g.POSITION !== void 0 && (a = !0), g.NORMAL !== void 0 && (t = !0), g.COLOR_0 !== void 0 && (s = !0), a && t && s) break;
  }
  if (!a && !t && !s) return Promise.resolve(I);
  const i = [], o = [], n = [];
  for (let r = 0, c = A.length; r < c; r++) {
    const g = A[r];
    if (a) {
      const B = g.POSITION !== void 0 ? e.getDependency("accessor", g.POSITION) : I.attributes.position;
      i.push(B);
    }
    if (t) {
      const B = g.NORMAL !== void 0 ? e.getDependency("accessor", g.NORMAL) : I.attributes.normal;
      o.push(B);
    }
    if (s) {
      const B = g.COLOR_0 !== void 0 ? e.getDependency("accessor", g.COLOR_0) : I.attributes.color;
      n.push(B);
    }
  }
  return Promise.all([
    Promise.all(i),
    Promise.all(o),
    Promise.all(n)
  ]).then(function(r) {
    const c = r[0], g = r[1], B = r[2];
    return a && (I.morphAttributes.position = c), t && (I.morphAttributes.normal = g), s && (I.morphAttributes.color = B), I.morphTargetsRelative = !0, I;
  });
}
function Xa(I, A) {
  if (I.updateMorphTargets(), A.weights !== void 0)
    for (let e = 0, a = A.weights.length; e < a; e++)
      I.morphTargetInfluences[e] = A.weights[e];
  if (A.extras && Array.isArray(A.extras.targetNames)) {
    const e = A.extras.targetNames;
    if (I.morphTargetInfluences.length === e.length) {
      I.morphTargetDictionary = {};
      for (let a = 0, t = e.length; a < t; a++)
        I.morphTargetDictionary[e[a]] = a;
    } else
      console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
  }
}
function za(I) {
  let A;
  const e = I.extensions && I.extensions[S.KHR_DRACO_MESH_COMPRESSION];
  if (e ? A = "draco:" + e.bufferView + ":" + e.indices + ":" + FA(e.attributes) : A = I.indices + ":" + FA(I.attributes) + ":" + I.mode, I.targets !== void 0)
    for (let a = 0, t = I.targets.length; a < t; a++)
      A += ":" + FA(I.targets[a]);
  return A;
}
function FA(I) {
  let A = "";
  const e = Object.keys(I).sort();
  for (let a = 0, t = e.length; a < t; a++)
    A += e[a] + ":" + I[e[a]] + ";";
  return A;
}
function jA(I) {
  switch (I) {
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
function Za(I) {
  return I.search(/\.jpe?g($|\?)/i) > 0 || I.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : I.search(/\.webp($|\?)/i) > 0 || I.search(/^data\:image\/webp/) === 0 ? "image/webp" : I.search(/\.ktx2($|\?)/i) > 0 || I.search(/^data\:image\/ktx2/) === 0 ? "image/ktx2" : "image/png";
}
const $a = new QA();
class Ai {
  constructor(A = {}, e = {}) {
    this.json = A, this.extensions = {}, this.plugins = {}, this.options = e, this.cache = new ua(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = { refs: {}, uses: {} }, this.cameraCache = { refs: {}, uses: {} }, this.lightCache = { refs: {}, uses: {} }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
    let a = !1, t = -1, s = !1, i = -1;
    if (typeof navigator < "u") {
      const o = navigator.userAgent;
      a = /^((?!chrome|android).)*safari/i.test(o) === !0;
      const n = o.match(/Version\/(\d+)/);
      t = a && n ? parseInt(n[1], 10) : -1, s = o.indexOf("Firefox") > -1, i = s ? o.match(/Firefox\/([0-9]+)\./)[1] : -1;
    }
    typeof createImageBitmap > "u" || a && t < 17 || s && i < 98 ? this.textureLoader = new Dt(this.options.manager) : this.textureLoader = new Rt(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new nA(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0);
  }
  setExtensions(A) {
    this.extensions = A;
  }
  setPlugins(A) {
    this.plugins = A;
  }
  parse(A, e) {
    const a = this, t = this.json, s = this.extensions;
    this.cache.removeAll(), this.nodeCache = {}, this._invokeAll(function(i) {
      return i._markDefs && i._markDefs();
    }), Promise.all(this._invokeAll(function(i) {
      return i.beforeRoot && i.beforeRoot();
    })).then(function() {
      return Promise.all([
        a.getDependencies("scene"),
        a.getDependencies("animation"),
        a.getDependencies("camera")
      ]);
    }).then(function(i) {
      const o = {
        scene: i[0][t.scene || 0],
        scenes: i[0],
        animations: i[1],
        cameras: i[2],
        asset: t.asset,
        parser: a,
        userData: {}
      };
      return sA(s, o, t), X(o, t), Promise.all(a._invokeAll(function(n) {
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
    for (let t = 0, s = e.length; t < s; t++) {
      const i = e[t].joints;
      for (let o = 0, n = i.length; o < n; o++)
        A[i[o]].isBone = !0;
    }
    for (let t = 0, s = A.length; t < s; t++) {
      const i = A[t];
      i.mesh !== void 0 && (this._addNodeRef(this.meshCache, i.mesh), i.skin !== void 0 && (a[i.mesh].isSkinnedMesh = !0)), i.camera !== void 0 && this._addNodeRef(this.cameraCache, i.camera);
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
    const t = a.clone(), s = (i, o) => {
      const n = this.associations.get(i);
      n != null && this.associations.set(o, n);
      for (const [r, c] of i.children.entries())
        s(c, o.children[r]);
    };
    return s(a, t), t.name += "_instance_" + A.uses[e]++, t;
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
      const s = A(e[t]);
      s && a.push(s);
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
          t = this._invokeOne(function(s) {
            return s.loadNode && s.loadNode(e);
          });
          break;
        case "mesh":
          t = this._invokeOne(function(s) {
            return s.loadMesh && s.loadMesh(e);
          });
          break;
        case "accessor":
          t = this.loadAccessor(e);
          break;
        case "bufferView":
          t = this._invokeOne(function(s) {
            return s.loadBufferView && s.loadBufferView(e);
          });
          break;
        case "buffer":
          t = this.loadBuffer(e);
          break;
        case "material":
          t = this._invokeOne(function(s) {
            return s.loadMaterial && s.loadMaterial(e);
          });
          break;
        case "texture":
          t = this._invokeOne(function(s) {
            return s.loadTexture && s.loadTexture(e);
          });
          break;
        case "skin":
          t = this.loadSkin(e);
          break;
        case "animation":
          t = this._invokeOne(function(s) {
            return s.loadAnimation && s.loadAnimation(e);
          });
          break;
        case "camera":
          t = this.loadCamera(e);
          break;
        default:
          if (t = this._invokeOne(function(s) {
            return s != this && s.getDependency && s.getDependency(A, e);
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
      e = Promise.all(t.map(function(s, i) {
        return a.getDependency(A, i);
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
    return new Promise(function(s, i) {
      a.load(bA.resolveURL(e.uri, t.path), s, void 0, function() {
        i(new Error('THREE.GLTFLoader: Failed to load buffer "' + e.uri + '".'));
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
      const t = e.byteLength || 0, s = e.byteOffset || 0;
      return a.slice(s, s + t);
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
      const i = RA[t.type], o = gA[t.componentType], n = t.normalized === !0, r = new o(t.count * i);
      return Promise.resolve(new dA(r, i, n));
    }
    const s = [];
    return t.bufferView !== void 0 ? s.push(this.getDependency("bufferView", t.bufferView)) : s.push(null), t.sparse !== void 0 && (s.push(this.getDependency("bufferView", t.sparse.indices.bufferView)), s.push(this.getDependency("bufferView", t.sparse.values.bufferView))), Promise.all(s).then(function(i) {
      const o = i[0], n = RA[t.type], r = gA[t.componentType], c = r.BYTES_PER_ELEMENT, g = c * n, B = t.byteOffset || 0, E = t.bufferView !== void 0 ? a.bufferViews[t.bufferView].byteStride : void 0, h = t.normalized === !0;
      let Q, f;
      if (E && E !== g) {
        const b = Math.floor(B / E), C = "InterleavedBuffer:" + t.bufferView + ":" + t.componentType + ":" + b + ":" + t.count;
        let l = e.cache.get(C);
        l || (Q = new r(o, b * E, t.count * E / c), l = new Qe(Q, E / c), e.cache.add(C, l)), f = new De(l, n, B % E / c, h);
      } else
        o === null ? Q = new r(t.count * n) : Q = new r(o, B, t.count * n), f = new dA(Q, n, h);
      if (t.sparse !== void 0) {
        const b = RA.SCALAR, C = gA[t.sparse.indices.componentType], l = t.sparse.indices.byteOffset || 0, d = t.sparse.values.byteOffset || 0, p = new C(i[1], l, t.sparse.count * b), R = new r(i[2], d, t.sparse.count * n);
        o !== null && (f = new dA(f.array.slice(), f.itemSize, f.normalized)), f.normalized = !1;
        for (let k = 0, u = p.length; k < u; k++) {
          const w = p[k];
          if (f.setX(w, R[k * n]), n >= 2 && f.setY(w, R[k * n + 1]), n >= 3 && f.setZ(w, R[k * n + 2]), n >= 4 && f.setW(w, R[k * n + 3]), n >= 5) throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
        }
        f.normalized = h;
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
    const e = this.json, a = this.options, s = e.textures[A].source, i = e.images[s];
    let o = this.textureLoader;
    if (i.uri) {
      const n = a.manager.getHandler(i.uri);
      n !== null && (o = n);
    }
    return this.loadTextureImage(A, s, o);
  }
  loadTextureImage(A, e, a) {
    const t = this, s = this.json, i = s.textures[A], o = s.images[e], n = (o.uri || o.bufferView) + ":" + i.sampler;
    if (this.textureCache[n])
      return this.textureCache[n];
    const r = this.loadImageSource(e, a).then(function(c) {
      c.flipY = !1, c.name = i.name || o.name || "", c.name === "" && typeof o.uri == "string" && o.uri.startsWith("data:image/") === !1 && (c.name = o.uri);
      const B = (s.samplers || {})[i.sampler] || {};
      return c.magFilter = ge[B.magFilter] || $, c.minFilter = ge[B.minFilter] || uA, c.wrapS = ce[B.wrapS] || _A, c.wrapT = ce[B.wrapT] || _A, c.generateMipmaps = !c.isCompressedTexture && c.minFilter !== fA && c.minFilter !== $, t.associations.set(c, { textures: A }), c;
    }).catch(function() {
      return null;
    });
    return this.textureCache[n] = r, r;
  }
  loadImageSource(A, e) {
    const a = this, t = this.json, s = this.options;
    if (this.sourceCache[A] !== void 0)
      return this.sourceCache[A].then((g) => g.clone());
    const i = t.images[A], o = self.URL || self.webkitURL;
    let n = i.uri || "", r = !1;
    if (i.bufferView !== void 0)
      n = a.getDependency("bufferView", i.bufferView).then(function(g) {
        r = !0;
        const B = new Blob([g], { type: i.mimeType });
        return n = o.createObjectURL(B), n;
      });
    else if (i.uri === void 0)
      throw new Error("THREE.GLTFLoader: Image " + A + " is missing URI and bufferView");
    const c = Promise.resolve(n).then(function(g) {
      return new Promise(function(B, E) {
        let h = B;
        e.isImageBitmapLoader === !0 && (h = function(Q) {
          const f = new WA(Q);
          f.needsUpdate = !0, B(f);
        }), e.load(bA.resolveURL(g, s.path), h, void 0, E);
      });
    }).then(function(g) {
      return r === !0 && o.revokeObjectURL(n), X(g, i), g.userData.mimeType = i.mimeType || Za(i.uri), g;
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
    const s = this;
    return this.getDependency("texture", a.index).then(function(i) {
      if (!i) return null;
      if (a.texCoord !== void 0 && a.texCoord > 0 && (i = i.clone(), i.channel = a.texCoord), s.extensions[S.KHR_TEXTURE_TRANSFORM]) {
        const o = a.extensions !== void 0 ? a.extensions[S.KHR_TEXTURE_TRANSFORM] : void 0;
        if (o) {
          const n = s.associations.get(i);
          i = s.extensions[S.KHR_TEXTURE_TRANSFORM].extendTexture(i, o), s.associations.set(i, n);
        }
      }
      return t !== void 0 && (i.colorSpace = t), A[e] = i, i;
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
    const t = e.attributes.tangent === void 0, s = e.attributes.color !== void 0, i = e.attributes.normal === void 0;
    if (A.isPoints) {
      const o = "PointsMaterial:" + a.uuid;
      let n = this.cache.get(o);
      n || (n = new Gt(), mA.prototype.copy.call(n, a), n.color.copy(a.color), n.map = a.map, n.sizeAttenuation = !1, this.cache.add(o, n)), a = n;
    } else if (A.isLine) {
      const o = "LineBasicMaterial:" + a.uuid;
      let n = this.cache.get(o);
      n || (n = new Tt(), mA.prototype.copy.call(n, a), n.color.copy(a.color), n.map = a.map, this.cache.add(o, n)), a = n;
    }
    if (t || s || i) {
      let o = "ClonedMaterial:" + a.uuid + ":";
      t && (o += "derivative-tangents:"), s && (o += "vertex-colors:"), i && (o += "flat-shading:");
      let n = this.cache.get(o);
      n || (n = a.clone(), s && (n.vertexColors = !0), i && (n.flatShading = !0), t && (n.normalScale && (n.normalScale.y *= -1), n.clearcoatNormalScale && (n.clearcoatNormalScale.y *= -1)), this.cache.add(o, n), this.associations.set(n, this.associations.get(a))), a = n;
    }
    A.material = a;
  }
  getMaterialType() {
    return pe;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
   *
   * @private
   * @param {number} materialIndex
   * @return {Promise<Material>}
   */
  loadMaterial(A) {
    const e = this, a = this.json, t = this.extensions, s = a.materials[A];
    let i;
    const o = {}, n = s.extensions || {}, r = [];
    if (n[S.KHR_MATERIALS_UNLIT]) {
      const g = t[S.KHR_MATERIALS_UNLIT];
      i = g.getMaterialType(), r.push(g.extendParams(o, s, e));
    } else {
      const g = s.pbrMetallicRoughness || {};
      if (o.color = new aA(1, 1, 1), o.opacity = 1, Array.isArray(g.baseColorFactor)) {
        const B = g.baseColorFactor;
        o.color.setRGB(B[0], B[1], B[2], v), o.opacity = B[3];
      }
      g.baseColorTexture !== void 0 && r.push(e.assignTexture(o, "map", g.baseColorTexture, W)), o.metalness = g.metallicFactor !== void 0 ? g.metallicFactor : 1, o.roughness = g.roughnessFactor !== void 0 ? g.roughnessFactor : 1, g.metallicRoughnessTexture !== void 0 && (r.push(e.assignTexture(o, "metalnessMap", g.metallicRoughnessTexture)), r.push(e.assignTexture(o, "roughnessMap", g.metallicRoughnessTexture))), i = this._invokeOne(function(B) {
        return B.getMaterialType && B.getMaterialType(A);
      }), r.push(Promise.all(this._invokeAll(function(B) {
        return B.extendMaterialParams && B.extendMaterialParams(A, o);
      })));
    }
    s.doubleSided === !0 && (o.side = xt);
    const c = s.alphaMode || kA.OPAQUE;
    if (c === kA.BLEND ? (o.transparent = !0, o.depthWrite = !1) : (o.transparent = !1, c === kA.MASK && (o.alphaTest = s.alphaCutoff !== void 0 ? s.alphaCutoff : 0.5)), s.normalTexture !== void 0 && i !== BA && (r.push(e.assignTexture(o, "normalMap", s.normalTexture)), o.normalScale = new PA(1, 1), s.normalTexture.scale !== void 0)) {
      const g = s.normalTexture.scale;
      o.normalScale.set(g, g);
    }
    if (s.occlusionTexture !== void 0 && i !== BA && (r.push(e.assignTexture(o, "aoMap", s.occlusionTexture)), s.occlusionTexture.strength !== void 0 && (o.aoMapIntensity = s.occlusionTexture.strength)), s.emissiveFactor !== void 0 && i !== BA) {
      const g = s.emissiveFactor;
      o.emissive = new aA().setRGB(g[0], g[1], g[2], v);
    }
    return s.emissiveTexture !== void 0 && i !== BA && r.push(e.assignTexture(o, "emissiveMap", s.emissiveTexture, W)), Promise.all(r).then(function() {
      const g = new i(o);
      return s.name && (g.name = s.name), X(g, s), e.associations.set(g, { materials: A }), s.extensions && sA(t, g, s), g;
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
    const e = Lt.sanitizeNodeName(A || "");
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
    function s(o) {
      return a[S.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o, e).then(function(n) {
        return Ie(n, o, e);
      });
    }
    const i = [];
    for (let o = 0, n = A.length; o < n; o++) {
      const r = A[o], c = za(r), g = t[c];
      if (g)
        i.push(g.promise);
      else {
        let B;
        r.extensions && r.extensions[S.KHR_DRACO_MESH_COMPRESSION] ? B = s(r) : B = Ie(new ue(), r, e), t[c] = { primitive: r, promise: B }, i.push(B);
      }
    }
    return Promise.all(i);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
   *
   * @private
   * @param {number} meshIndex
   * @return {Promise<Group|Mesh|SkinnedMesh|Line|Points>}
   */
  loadMesh(A) {
    const e = this, a = this.json, t = this.extensions, s = a.meshes[A], i = s.primitives, o = [];
    for (let n = 0, r = i.length; n < r; n++) {
      const c = i[n].material === void 0 ? Va(this.cache) : this.getDependency("material", i[n].material);
      o.push(c);
    }
    return o.push(e.loadGeometries(i)), Promise.all(o).then(function(n) {
      const r = n.slice(0, n.length - 1), c = n[n.length - 1], g = [];
      for (let E = 0, h = c.length; E < h; E++) {
        const Q = c[E], f = i[E];
        let b;
        const C = r[E];
        if (f.mode === K.TRIANGLES || f.mode === K.TRIANGLE_STRIP || f.mode === K.TRIANGLE_FAN || f.mode === void 0)
          b = s.isSkinnedMesh === !0 ? new Mt(Q, C) : new YA(Q, C), b.isSkinnedMesh === !0 && b.normalizeSkinWeights(), f.mode === K.TRIANGLE_STRIP ? b.geometry = oe(b.geometry, de) : f.mode === K.TRIANGLE_FAN && (b.geometry = oe(b.geometry, UA));
        else if (f.mode === K.LINES)
          b = new Ut(Q, C);
        else if (f.mode === K.LINE_STRIP)
          b = new _t(Q, C);
        else if (f.mode === K.LINE_LOOP)
          b = new Nt(Q, C);
        else if (f.mode === K.POINTS)
          b = new Ht(Q, C);
        else
          throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + f.mode);
        Object.keys(b.geometry.morphAttributes).length > 0 && Xa(b, s), b.name = e.createUniqueName(s.name || "mesh_" + A), X(b, s), f.extensions && sA(t, b, f), e.assignFinalMaterial(b), g.push(b);
      }
      for (let E = 0, h = g.length; E < h; E++)
        e.associations.set(g[E], {
          meshes: A,
          primitives: E
        });
      if (g.length === 1)
        return s.extensions && sA(t, g[0], s), g[0];
      const B = new wA();
      s.extensions && sA(t, B, s), e.associations.set(B, { meshes: A });
      for (let E = 0, h = g.length; E < h; E++)
        B.add(g[E]);
      return B;
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
    return a.type === "perspective" ? e = new me(qt.radToDeg(t.yfov), t.aspectRatio || 1, t.znear || 1, t.zfar || 2e6) : a.type === "orthographic" && (e = new Ot(-t.xmag, t.xmag, t.ymag, -t.ymag, t.znear, t.zfar)), a.name && (e.name = this.createUniqueName(a.name)), X(e, a), Promise.resolve(e);
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
    for (let t = 0, s = e.joints.length; t < s; t++)
      a.push(this._loadNodeShallow(e.joints[t]));
    return e.inverseBindMatrices !== void 0 ? a.push(this.getDependency("accessor", e.inverseBindMatrices)) : a.push(null), Promise.all(a).then(function(t) {
      const s = t.pop(), i = t, o = [], n = [];
      for (let r = 0, c = i.length; r < c; r++) {
        const g = i[r];
        if (g) {
          o.push(g);
          const B = new QA();
          s !== null && B.fromArray(s.array, r * 16), n.push(B);
        } else
          console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', e.joints[r]);
      }
      return new Kt(o, n);
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
    const e = this.json, a = this, t = e.animations[A], s = t.name ? t.name : "animation_" + A, i = [], o = [], n = [], r = [], c = [];
    for (let g = 0, B = t.channels.length; g < B; g++) {
      const E = t.channels[g], h = t.samplers[E.sampler], Q = E.target, f = Q.node, b = t.parameters !== void 0 ? t.parameters[h.input] : h.input, C = t.parameters !== void 0 ? t.parameters[h.output] : h.output;
      Q.node !== void 0 && (i.push(this.getDependency("node", f)), o.push(this.getDependency("accessor", b)), n.push(this.getDependency("accessor", C)), r.push(h), c.push(Q));
    }
    return Promise.all([
      Promise.all(i),
      Promise.all(o),
      Promise.all(n),
      Promise.all(r),
      Promise.all(c)
    ]).then(function(g) {
      const B = g[0], E = g[1], h = g[2], Q = g[3], f = g[4], b = [];
      for (let l = 0, d = B.length; l < d; l++) {
        const p = B[l], R = E[l], k = h[l], u = Q[l], w = f[l];
        if (p === void 0) continue;
        p.updateMatrix && p.updateMatrix();
        const m = a._createAnimationTracks(p, R, k, u, w);
        if (m)
          for (let F = 0; F < m.length; F++)
            b.push(m[F]);
      }
      const C = new jt(s, void 0, b);
      return X(C, t), C;
    });
  }
  createNodeMesh(A) {
    const e = this.json, a = this, t = e.nodes[A];
    return t.mesh === void 0 ? null : a.getDependency("mesh", t.mesh).then(function(s) {
      const i = a._getNodeRef(a.meshCache, t.mesh, s);
      return t.weights !== void 0 && i.traverse(function(o) {
        if (o.isMesh)
          for (let n = 0, r = t.weights.length; n < r; n++)
            o.morphTargetInfluences[n] = t.weights[n];
      }), i;
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
    const e = this.json, a = this, t = e.nodes[A], s = a._loadNodeShallow(A), i = [], o = t.children || [];
    for (let r = 0, c = o.length; r < c; r++)
      i.push(a.getDependency("node", o[r]));
    const n = t.skin === void 0 ? Promise.resolve(null) : a.getDependency("skin", t.skin);
    return Promise.all([
      s,
      Promise.all(i),
      n
    ]).then(function(r) {
      const c = r[0], g = r[1], B = r[2];
      B !== null && c.traverse(function(E) {
        E.isSkinnedMesh && E.bind(B, $a);
      });
      for (let E = 0, h = g.length; E < h; E++)
        c.add(g[E]);
      return c;
    });
  }
  // ._loadNodeShallow() parses a single node.
  // skin and child nodes are created and added in .loadNode() (no '_' prefix).
  _loadNodeShallow(A) {
    const e = this.json, a = this.extensions, t = this;
    if (this.nodeCache[A] !== void 0)
      return this.nodeCache[A];
    const s = e.nodes[A], i = s.name ? t.createUniqueName(s.name) : "", o = [], n = t._invokeOne(function(r) {
      return r.createNodeMesh && r.createNodeMesh(A);
    });
    return n && o.push(n), s.camera !== void 0 && o.push(t.getDependency("camera", s.camera).then(function(r) {
      return t._getNodeRef(t.cameraCache, s.camera, r);
    })), t._invokeAll(function(r) {
      return r.createNodeAttachment && r.createNodeAttachment(A);
    }).forEach(function(r) {
      o.push(r);
    }), this.nodeCache[A] = Promise.all(o).then(function(r) {
      let c;
      if (s.isBone === !0 ? c = new Jt() : r.length > 1 ? c = new wA() : r.length === 1 ? c = r[0] : c = new le(), c !== r[0])
        for (let g = 0, B = r.length; g < B; g++)
          c.add(r[g]);
      if (s.name && (c.userData.name = s.name, c.name = i), X(c, s), s.extensions && sA(a, c, s), s.matrix !== void 0) {
        const g = new QA();
        g.fromArray(s.matrix), c.applyMatrix4(g);
      } else
        s.translation !== void 0 && c.position.fromArray(s.translation), s.rotation !== void 0 && c.quaternion.fromArray(s.rotation), s.scale !== void 0 && c.scale.fromArray(s.scale);
      if (!t.associations.has(c))
        t.associations.set(c, {});
      else if (s.mesh !== void 0 && t.meshCache.refs[s.mesh] > 1) {
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
    const e = this.extensions, a = this.json.scenes[A], t = this, s = new wA();
    a.name && (s.name = t.createUniqueName(a.name)), X(s, a), a.extensions && sA(e, s, a);
    const i = a.nodes || [], o = [];
    for (let n = 0, r = i.length; n < r; n++)
      o.push(t.getDependency("node", i[n]));
    return Promise.all(o).then(function(n) {
      for (let c = 0, g = n.length; c < g; c++)
        s.add(n[c]);
      const r = (c) => {
        const g = /* @__PURE__ */ new Map();
        for (const [B, E] of t.associations)
          (B instanceof mA || B instanceof WA) && g.set(B, E);
        return c.traverse((B) => {
          const E = t.associations.get(B);
          E != null && g.set(B, E);
        }), g;
      };
      return t.associations = r(s), s;
    });
  }
  _createAnimationTracks(A, e, a, t, s) {
    const i = [], o = A.name ? A.name : A.uuid, n = [];
    eA[s.path] === eA.weights ? A.traverse(function(B) {
      B.morphTargetInfluences && n.push(B.name ? B.name : B.uuid);
    }) : n.push(o);
    let r;
    switch (eA[s.path]) {
      case eA.weights:
        r = zA;
        break;
      case eA.rotation:
        r = ZA;
        break;
      case eA.translation:
      case eA.scale:
        r = XA;
        break;
      default:
        switch (a.itemSize) {
          case 1:
            r = zA;
            break;
          case 2:
          case 3:
          default:
            r = XA;
            break;
        }
        break;
    }
    const c = t.interpolation !== void 0 ? Ya[t.interpolation] : we, g = this._getArrayFromAccessor(a);
    for (let B = 0, E = n.length; B < E; B++) {
      const h = new r(
        n[B] + "." + eA[s.path],
        e.array,
        g,
        c
      );
      t.interpolation === "CUBICSPLINE" && this._createCubicSplineTrackInterpolant(h), i.push(h);
    }
    return i;
  }
  _getArrayFromAccessor(A) {
    let e = A.array;
    if (A.normalized) {
      const a = jA(e.constructor), t = new Float32Array(e.length);
      for (let s = 0, i = e.length; s < i; s++)
        t[s] = e[s] * a;
      e = t;
    }
    return e;
  }
  _createCubicSplineTrackInterpolant(A) {
    A.createInterpolant = function(a) {
      const t = this instanceof ZA ? Pa : xe;
      return new t(this.times, this.values, this.getValueSize() / 3, a);
    }, A.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0;
  }
}
function ei(I, A, e) {
  const a = A.attributes, t = new Re();
  if (a.POSITION !== void 0) {
    const o = e.json.accessors[a.POSITION], n = o.min, r = o.max;
    if (n !== void 0 && r !== void 0) {
      if (t.set(
        new J(n[0], n[1], n[2]),
        new J(r[0], r[1], r[2])
      ), o.normalized) {
        const c = jA(gA[o.componentType]);
        t.min.multiplyScalar(c), t.max.multiplyScalar(c);
      }
    } else {
      console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      return;
    }
  } else
    return;
  const s = A.targets;
  if (s !== void 0) {
    const o = new J(), n = new J();
    for (let r = 0, c = s.length; r < c; r++) {
      const g = s[r];
      if (g.POSITION !== void 0) {
        const B = e.json.accessors[g.POSITION], E = B.min, h = B.max;
        if (E !== void 0 && h !== void 0) {
          if (n.setX(Math.max(Math.abs(E[0]), Math.abs(h[0]))), n.setY(Math.max(Math.abs(E[1]), Math.abs(h[1]))), n.setZ(Math.max(Math.abs(E[2]), Math.abs(h[2]))), B.normalized) {
            const Q = jA(gA[B.componentType]);
            n.multiplyScalar(Q);
          }
          o.max(n);
        } else
          console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      }
    }
    t.expandByVector(o);
  }
  I.boundingBox = t;
  const i = new Vt();
  t.getCenter(i.center), i.radius = t.min.distanceTo(t.max) / 2, I.boundingSphere = i;
}
function Ie(I, A, e) {
  const a = A.attributes, t = [];
  function s(i, o) {
    return e.getDependency("accessor", i).then(function(n) {
      I.setAttribute(o, n);
    });
  }
  for (const i in a) {
    const o = KA[i] || i.toLowerCase();
    o in I.attributes || t.push(s(a[i], o));
  }
  if (A.indices !== void 0 && !I.index) {
    const i = e.getDependency("accessor", A.indices).then(function(o) {
      I.setIndex(o);
    });
    t.push(i);
  }
  return pA.workingColorSpace !== v && "COLOR_0" in a && console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${pA.workingColorSpace}" not supported.`), X(I, A), ei(I, A, e), Promise.all(t).then(function() {
    return A.targets !== void 0 ? Wa(I, A.targets, e) : I;
  });
}
const SA = /* @__PURE__ */ new WeakMap();
class ti extends vA {
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
    const s = new nA(this.manager);
    s.setPath(this.path), s.setResponseType("arraybuffer"), s.setRequestHeader(this.requestHeader), s.setWithCredentials(this.withCredentials), s.load(A, (i) => {
      this.parse(i, e, t);
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
  decodeDracoFile(A, e, a, t, s = v, i = () => {
  }) {
    const o = {
      attributeIDs: a || this.defaultAttributeIDs,
      attributeTypes: t || this.defaultAttributeTypes,
      useUniqueIDs: !!a,
      vertexColorSpace: s
    };
    return this.decodeGeometry(A, o).then(e).catch(i);
  }
  decodeGeometry(A, e) {
    const a = JSON.stringify(e);
    if (SA.has(A)) {
      const n = SA.get(A);
      if (n.key === a)
        return n.promise;
      if (A.byteLength === 0)
        throw new Error(
          "THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred."
        );
    }
    let t;
    const s = this.workerNextTaskID++, i = A.byteLength, o = this._getWorker(s, i).then((n) => (t = n, new Promise((r, c) => {
      t._callbacks[s] = { resolve: r, reject: c }, t.postMessage({ type: "decode", id: s, taskConfig: e, buffer: A }, [A]);
    }))).then((n) => this._createGeometry(n.geometry));
    return o.catch(() => !0).then(() => {
      t && s && this._releaseTask(t, s);
    }), SA.set(A, {
      key: a,
      promise: o
    }), o;
  }
  _createGeometry(A) {
    const e = new ue();
    A.index && e.setIndex(new dA(A.index.array, 1));
    for (let a = 0; a < A.attributes.length; a++) {
      const { name: t, array: s, itemSize: i, stride: o, vertexColorSpace: n } = A.attributes[a];
      let r;
      if (i === o)
        r = new dA(s, i);
      else {
        const c = new Qe(s, o);
        r = new De(c, i, 0);
      }
      t === "color" && (this._assignVertexColorSpace(r, n), r.normalized = !(s instanceof Float32Array)), e.setAttribute(t, r);
    }
    return e;
  }
  _assignVertexColorSpace(A, e) {
    if (e !== W) return;
    const a = new aA();
    for (let t = 0, s = A.count; t < s; t++)
      a.fromBufferAttribute(A, t), pA.colorSpaceToWorking(a, W), A.setXYZ(t, a.r, a.g, a.b);
  }
  _loadLibrary(A, e) {
    const a = new nA(this.manager);
    return a.setPath(this.decoderPath), a.setResponseType(e), a.setWithCredentials(this.withCredentials), new Promise((t, s) => {
      a.load(A, t, void 0, s);
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
      const s = ai.toString(), i = [
        "/* draco decoder */",
        t,
        "",
        "/* worker */",
        s.substring(s.indexOf("{") + 1, s.lastIndexOf("}"))
      ].join(`
`);
      this.workerSourceURL = URL.createObjectURL(new Blob([i]));
    }), this.decoderPending;
  }
  _getWorker(A, e) {
    return this._initDecoder().then(() => {
      if (this.workerPool.length < this.workerLimit) {
        const t = new Worker(this.workerSourceURL);
        t._callbacks = {}, t._taskCosts = {}, t._taskLoad = 0, t.postMessage({ type: "init", decoderConfig: this.decoderConfig }), t.onmessage = function(s) {
          const i = s.data;
          switch (i.type) {
            case "decode":
              t._callbacks[i.id].resolve(i);
              break;
            case "error":
              t._callbacks[i.id].reject(i);
              break;
            default:
              console.error('THREE.DRACOLoader: Unexpected message, "' + i.type + '"');
          }
        }, this.workerPool.push(t);
      } else
        this.workerPool.sort(function(t, s) {
          return t._taskLoad > s._taskLoad ? -1 : 1;
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
function ai() {
  let I, A;
  onmessage = function(i) {
    const o = i.data;
    switch (o.type) {
      case "init":
        I = o.decoderConfig, A = new Promise(function(c) {
          I.onModuleLoaded = function(g) {
            c({ draco: g });
          }, DracoDecoderModule(I);
        });
        break;
      case "decode":
        const n = o.buffer, r = o.taskConfig;
        A.then((c) => {
          const g = c.draco, B = new g.Decoder();
          try {
            const E = e(g, B, new Int8Array(n), r), h = E.attributes.map((Q) => Q.array.buffer);
            E.index && h.push(E.index.array.buffer), self.postMessage({ type: "decode", id: o.id, geometry: E }, h);
          } catch (E) {
            console.error(E), self.postMessage({ type: "error", id: o.id, error: E.message });
          } finally {
            g.destroy(B);
          }
        });
        break;
    }
  };
  function e(i, o, n, r) {
    const c = r.attributeIDs, g = r.attributeTypes;
    let B, E;
    const h = o.GetEncodedGeometryType(n);
    if (h === i.TRIANGULAR_MESH)
      B = new i.Mesh(), E = o.DecodeArrayToMesh(n, n.byteLength, B);
    else if (h === i.POINT_CLOUD)
      B = new i.PointCloud(), E = o.DecodeArrayToPointCloud(n, n.byteLength, B);
    else
      throw new Error("THREE.DRACOLoader: Unexpected geometry type.");
    if (!E.ok() || B.ptr === 0)
      throw new Error("THREE.DRACOLoader: Decoding failed: " + E.error_msg());
    const Q = { index: null, attributes: [] };
    for (const f in c) {
      const b = self[g[f]];
      let C, l;
      if (r.useUniqueIDs)
        l = c[f], C = o.GetAttributeByUniqueId(B, l);
      else {
        if (l = o.GetAttributeId(B, i[c[f]]), l === -1) continue;
        C = o.GetAttribute(B, l);
      }
      const d = t(i, o, B, f, b, C);
      f === "color" && (d.vertexColorSpace = r.vertexColorSpace), Q.attributes.push(d);
    }
    return h === i.TRIANGULAR_MESH && (Q.index = a(i, o, B)), i.destroy(B), Q;
  }
  function a(i, o, n) {
    const c = n.num_faces() * 3, g = c * 4, B = i._malloc(g);
    o.GetTrianglesUInt32Array(n, g, B);
    const E = new Uint32Array(i.HEAPF32.buffer, B, c).slice();
    return i._free(B), { array: E, itemSize: 1 };
  }
  function t(i, o, n, r, c, g) {
    const B = n.num_points(), E = g.num_components(), h = s(i, c), Q = E * c.BYTES_PER_ELEMENT, f = Math.ceil(Q / 4) * 4, b = f / c.BYTES_PER_ELEMENT, C = B * Q, l = B * f, d = i._malloc(C);
    o.GetAttributeDataArrayForAllPoints(n, g, h, C, d);
    const p = new c(i.HEAPF32.buffer, d, C / c.BYTES_PER_ELEMENT);
    let R;
    if (Q === f)
      R = p.slice();
    else {
      R = new c(l / c.BYTES_PER_ELEMENT);
      let k = 0;
      for (let u = 0, w = p.length; u < w; u++) {
        for (let m = 0; m < E; m++)
          R[k + m] = p[u * E + m];
        k += b;
      }
    }
    return i._free(d), {
      name: r,
      count: B,
      itemSize: E,
      array: R,
      stride: b
    };
  }
  function s(i, o) {
    switch (o) {
      case Float32Array:
        return i.DT_FLOAT32;
      case Int8Array:
        return i.DT_INT8;
      case Int16Array:
        return i.DT_INT16;
      case Int32Array:
        return i.DT_INT32;
      case Uint8Array:
        return i.DT_UINT8;
      case Uint16Array:
        return i.DT_UINT16;
      case Uint32Array:
        return i.DT_UINT32;
    }
  }
}
class ii {
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
      const { resolve: t, msg: s, transfer: i } = this.queue.shift();
      this.workersResolve[A] = t, this.workers[A].postMessage(s, i);
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
const si = 0, Be = 2, ni = 1, Ee = 2, oi = 0, ri = 1, gi = 10, ci = 0, Le = 9, Me = 15, Ue = 16, _e = 22, Ne = 37, He = 43, qe = 76, Oe = 83, Ke = 97, je = 100, Je = 103, ve = 109, Pe = 122, Ye = 123, Ve = 131, We = 132, Xe = 133, ze = 134, Ze = 137, $e = 138, At = 139, et = 140, tt = 141, at = 142, it = 145, st = 146, nt = 148, ot = 152, rt = 157, gt = 158, ct = 165, It = 166, Bt = 1000054e3, Et = 1000054001, Ct = 1000054004, bt = 1000054005, VA = 1000066e3, dt = 1000066004;
class IA {
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
const H = [171, 75, 84, 88, 32, 50, 48, 187, 13, 10, 26, 10];
function Ce(I) {
  return new TextDecoder().decode(I);
}
function Ii(I) {
  const A = new Uint8Array(I.buffer, I.byteOffset, H.length);
  if (A[0] !== H[0] || A[1] !== H[1] || A[2] !== H[2] || A[3] !== H[3] || A[4] !== H[4] || A[5] !== H[5] || A[6] !== H[6] || A[7] !== H[7] || A[8] !== H[8] || A[9] !== H[9] || A[10] !== H[10] || A[11] !== H[11]) throw new Error("Missing KTX 2.0 identifier.");
  const e = { vkFormat: 0, typeSize: 1, pixelWidth: 0, pixelHeight: 0, pixelDepth: 0, layerCount: 0, faceCount: 1, levelCount: 0, supercompressionScheme: 0, levels: [], dataFormatDescriptor: [{ vendorId: 0, descriptorType: 0, versionNumber: 2, colorModel: 0, colorPrimaries: 1, transferFunction: 2, flags: 0, texelBlockDimension: [0, 0, 0, 0], bytesPlane: [0, 0, 0, 0, 0, 0, 0, 0], samples: [] }], keyValue: {}, globalData: null }, a = 17 * Uint32Array.BYTES_PER_ELEMENT, t = new IA(I, H.length, a, !0);
  e.vkFormat = t._nextUint32(), e.typeSize = t._nextUint32(), e.pixelWidth = t._nextUint32(), e.pixelHeight = t._nextUint32(), e.pixelDepth = t._nextUint32(), e.layerCount = t._nextUint32(), e.faceCount = t._nextUint32(), e.levelCount = t._nextUint32(), e.supercompressionScheme = t._nextUint32();
  const s = t._nextUint32(), i = t._nextUint32(), o = t._nextUint32(), n = t._nextUint32(), r = t._nextUint64(), c = t._nextUint64(), g = 3 * Math.max(e.levelCount, 1) * 8, B = new IA(I, H.length + a, g, !0);
  for (let _ = 0, T = Math.max(e.levelCount, 1); _ < T; _++) e.levels.push({ levelData: new Uint8Array(I.buffer, I.byteOffset + B._nextUint64(), B._nextUint64()), uncompressedByteLength: B._nextUint64() });
  const E = new IA(I, s, i, !0);
  E._skip(4);
  const h = E._nextUint16(), Q = E._nextUint16(), f = E._nextUint16(), b = E._nextUint16(), C = { vendorId: h, descriptorType: Q, versionNumber: f, colorModel: E._nextUint8(), colorPrimaries: E._nextUint8(), transferFunction: E._nextUint8(), flags: E._nextUint8(), texelBlockDimension: [E._nextUint8(), E._nextUint8(), E._nextUint8(), E._nextUint8()], bytesPlane: [E._nextUint8(), E._nextUint8(), E._nextUint8(), E._nextUint8(), E._nextUint8(), E._nextUint8(), E._nextUint8(), E._nextUint8()], samples: [] }, l = (b / 4 - 6) / 4;
  for (let _ = 0; _ < l; _++) {
    const T = { bitOffset: E._nextUint16(), bitLength: E._nextUint8(), channelType: E._nextUint8(), samplePosition: [E._nextUint8(), E._nextUint8(), E._nextUint8(), E._nextUint8()], sampleLower: Number.NEGATIVE_INFINITY, sampleUpper: Number.POSITIVE_INFINITY };
    64 & T.channelType ? (T.sampleLower = E._nextInt32(), T.sampleUpper = E._nextInt32()) : (T.sampleLower = E._nextUint32(), T.sampleUpper = E._nextUint32()), C.samples[_] = T;
  }
  e.dataFormatDescriptor.length = 0, e.dataFormatDescriptor.push(C);
  const d = new IA(I, o, n, !0);
  for (; d._offset < n; ) {
    const _ = d._nextUint32(), T = d._scan(_), N = Ce(T);
    if (e.keyValue[N] = d._nextUint8Array(_ - T.byteLength - 1), N.match(/^ktx/i)) {
      const iA = Ce(e.keyValue[N]);
      e.keyValue[N] = iA.substring(0, iA.lastIndexOf("\0"));
    }
    d._skip(_ % 4 ? 4 - _ % 4 : 0);
  }
  if (c <= 0) return e;
  const p = new IA(I, r, c, !0), R = p._nextUint16(), k = p._nextUint16(), u = p._nextUint32(), w = p._nextUint32(), m = p._nextUint32(), F = p._nextUint32(), L = [];
  for (let _ = 0, T = Math.max(e.levelCount, 1); _ < T; _++) L.push({ imageFlags: p._nextUint32(), rgbSliceByteOffset: p._nextUint32(), rgbSliceByteLength: p._nextUint32(), alphaSliceByteOffset: p._nextUint32(), alphaSliceByteLength: p._nextUint32() });
  const G = r + p._offset, D = G + u, U = D + w, y = U + m, P = new Uint8Array(I.buffer, I.byteOffset + G, u), AA = new Uint8Array(I.buffer, I.byteOffset + D, w), Y = new Uint8Array(I.buffer, I.byteOffset + U, m), q = new Uint8Array(I.buffer, I.byteOffset + y, F);
  return e.globalData = { endpointCount: R, selectorCount: k, imageDescs: L, endpointsData: P, selectorsData: AA, tablesData: Y, extendedData: q }, e;
}
let yA, Z, JA;
const GA = { env: { emscripten_notify_memory_growth: function(I) {
  JA = new Uint8Array(Z.exports.memory.buffer);
} } };
class Bi {
  init() {
    return yA || (yA = typeof fetch < "u" ? fetch("data:application/wasm;base64," + be).then((A) => A.arrayBuffer()).then((A) => WebAssembly.instantiate(A, GA)).then(this._init) : WebAssembly.instantiate(Buffer.from(be, "base64"), GA).then(this._init), yA);
  }
  _init(A) {
    Z = A.instance, GA.env.emscripten_notify_memory_growth(0);
  }
  decode(A, e = 0) {
    if (!Z) throw new Error("ZSTDDecoder: Await .init() before decoding.");
    const a = A.byteLength, t = Z.exports.malloc(a);
    JA.set(A, t), e = e || Number(Z.exports.ZSTD_findDecompressedSize(t, a));
    const s = Z.exports.malloc(e), i = Z.exports.ZSTD_decompress(s, e, t, a), o = JA.slice(s, s + i);
    return Z.exports.free(t), Z.exports.free(s), o;
  }
}
const be = "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IAMNACAEQQNxBEADQCACRQ0FIAAgAkF/aiICaiIDIAEgAmotAAA6AAAgA0EDcQ0ACwsgAkEDTQ0AA0AgACACQXxqIgJqIAEgAmooAgA2AgAgAkEDSw0ACwsgAkUNAgNAIAAgAkF/aiICaiABIAJqLQAAOgAAIAINAAsMAgsgAkEDTQ0AIAIhBANAIAMgASgCADYCACABQQRqIQEgA0EEaiEDIARBfGoiBEEDSw0ACyACQQNxIQILIAJFDQADQCADIAEtAAA6AAAgA0EBaiEDIAFBAWohASACQX9qIgINAAsLIAAL8wICAn8BfgJAIAJFDQAgACACaiIDQX9qIAE6AAAgACABOgAAIAJBA0kNACADQX5qIAE6AAAgACABOgABIANBfWogAToAACAAIAE6AAIgAkEHSQ0AIANBfGogAToAACAAIAE6AAMgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgE2AgAgAyACIARrQXxxIgRqIgJBfGogATYCACAEQQlJDQAgAyABNgIIIAMgATYCBCACQXhqIAE2AgAgAkF0aiABNgIAIARBGUkNACADIAE2AhggAyABNgIUIAMgATYCECADIAE2AgwgAkFwaiABNgIAIAJBbGogATYCACACQWhqIAE2AgAgAkFkaiABNgIAIAQgA0EEcUEYciIEayICQSBJDQAgAa0iBUIghiAFhCEFIAMgBGohAQNAIAEgBTcDGCABIAU3AxAgASAFNwMIIAEgBTcDACABQSBqIQEgAkFgaiICQR9LDQALCyAACy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAIajYCACADCy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAFajYCACADCx8AIAAgASACKAIEEAg2AgAgARAEGiAAIAJBCGo2AgQLCAAgAGdBH3MLugUBDX8jAEEQayIKJAACfyAEQQNNBEAgCkEANgIMIApBDGogAyAEEAsaIAAgASACIApBDGpBBBAVIgBBbCAAEAMbIAAgACAESxsMAQsgAEEAIAEoAgBBAXRBAmoQECENQVQgAygAACIGQQ9xIgBBCksNABogAiAAQQVqNgIAIAMgBGoiAkF8aiEMIAJBeWohDiACQXtqIRAgAEEGaiELQQQh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ASIDNgLE4AEgACgCvOABIQQgACABNgK84AEgACABIAJqNgK44AEgACABIAQgA2tqNgLA4AELpgEBAX8gACAAKALs4QEQFjYCyOABIABCADcD+OABIABCADcDuOABIABBwOABakIANwMAIABBqNAAaiIBQYyAgOAANgIAIABBADYCmOIBIABCADcDiOEBIABCAzcDgOEBIABBrNABakHgEikCADcCACAAQbTQAWpB6BIoAgA2AgAgACABNgIMIAAgAEGYIGo2AgggACAAQaAwajYCBCAAIABBEGo2AgALYQEBf0G4fyEDAkAgAUEDSQ0AIAIgABAhIgFBA3YiADYCCCACIAFBAXE2AgQgAiABQQF2QQNxIgM2AgACQCADQX9qIgFBAksNAAJAIAFBAWsOAgEAAgtBbA8LIAAhAwsgAwsMACAAIAEgAkEAEC4LiAQCA38CfiADEBYhBCAAQQBBKBAQIQAgBCACSwRAIAQPCyABRQRAQX8PCwJAAkAgA0EBRg0AIAEoAAAiBkGo6r5pRg0AQXYhAyAGQXBxQdDUtMIBRw0BQQghAyACQQhJDQEgAEEAQSgQECEAIAEoAAQhASAAQQE2AhQgACABrTcDAEEADwsgASACIAMQLyIDIAJLDQAgACADNgIYQXIhAyABIARqIgVBf2otAAAiAkEIcQ0AIAJBIHEiBkUEQEFwIQMgBS0AACIFQacBSw0BIAVBB3GtQgEgBUEDdkEKaq2GIgdCA4h+IAd8IQggBEEBaiEECyACQQZ2IQMgAkECdiEFAkAgAkEDcUF/aiICQQJLBEBBACECDAELAkACQAJAIAJBAWsOAgECAAsgASAEai0AACECIARBAWohBAwCCyABIARqLwAAIQIgBEECaiEEDAELIAEgBGooAAAhAiAEQQRqIQQLIAVBAXEhBQJ+AkACQAJAIANBf2oiA0ECTQRAIANBAWsOAgIDAQtCfyAGRQ0DGiABIARqMQAADAMLIAEgBGovAACtQoACfAwCCyABIARqKAAArQwBCyABIARqKQAACyEHIAAgBTYCICAAIAI2AhwgACAHNwMAQQAhAyAAQQA2AhQgACAHIAggBhsiBzcDCCAAIAdCgIAIIAdCgIAIVBs+AhALIAMLWwEBf0G4fyEDIAIQFiICIAFNBH8gACACakF/ai0AACIAQQNxQQJ0QaAeaigC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C0Egak8NAQsgByAHKQNoNwMQIAcgBykDYDcDCCAEIA0gB0EIaiAHQdwAaiAPIA4gESAQEB4hCwwBCyACIARqIQggBCAKEAcgAkERTwRAIARBEGohAgNAIAIgCkEQaiIKEAcgAkEQaiICIAhJDQALCyAIIAlrIQIgByATNgJcIAkgCCAOa0sEQCAJIAggEWtLBEBBbCELDAILIBAgAiAOayICaiIKIANqIBBNBEAgCCAKIAMQDxoMAgsgCCAKQQAgAmsQDyEIIAcgAiADaiIDNgJkIAggAmshCCAOIQILIAlBEE8EQCADIAhqIQMDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALDAELAkAgCUEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgCUECdCIDQcAeaigCAGoiAhAXIAIgA0HgHmooAgBrIQIgBygCZCEDDAELIAggAhAMCyADQQlJDQAgAyAIaiEDIAhBCGoiCCACQQhqIgJrQQ9MBEADQCAIIAIQDCACQQhqIQIgCEEIaiIIIANJDQAMAgALAAsDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALCyAHQRhqEAQaIAsgDCALEAMiAhshDCAEIAQgC2ogAhshBCAFQX9qIgUNAAsgDBADDQFBbCEMIAdBGGoQBEECSQ0BQQAhCANAIAhBA0cEQCAAIAhBAnQiAmpBrNABaiACIAdqKAJENgIAIAhBAWohCAwBCwsgBygCXCEIC0G6fyEMIA8gCGsiACANIARrSw0AIAQEfyAEIAggABALIABqBUEACyABayEMCyAHQfAAaiQAIAwLkRcCFn8FfiMAQdABayIHJAAgByAAKALw4QEiCDYCvAEgASACaiESIAggACgCgOIBaiETAkACQCAFRQRAIAEhAwwBCyAAKALE4AEhESAAKALA4AEhFSAAKAK84AEhDyAAQQE2AozhAUEAIQgDQCAIQQNHBEAgByAIQQJ0IgJqIAAgAmpBrNABaigCADYCVCAIQQFqIQgMAQsLIAcgETYCZCAHIA82AmAgByABIA9rNgJoQWwhECAHQShqIAMgBBAGEAMNASAFQQQgBUEESBshFyAHQTxqIAdBKGogACgCABATIAdBxABqIAdBKGogACgCCBATIAdBzABqIAdB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IAdB0AFqJAAgEAslACAAQgA3AgAgAEEAOwEIIABBADoACyAAIAE2AgwgACACOgAKC7QFAQN/IwBBMGsiBCQAIABB/wFqIgVBfWohBgJAIAMvAQIEQCAEQRhqIAEgAhAGIgIQAw0BIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahASOgAAIAMgBEEIaiAEQRhqEBI6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0FIAEgBEEQaiAEQRhqEBI6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBSABIARBCGogBEEYahASOgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEjoAACABIAJqIABrIQIMAwsgAyAEQRBqIARBGGoQEjoAAiADIARBCGogBEEYahASOgADIANBBGohAwwAAAsACyAEQRhqIAEgAhAGIgIQAw0AIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahAROgAAIAMgBEEIaiAEQRhqEBE6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0EIAEgBEEQaiAEQRhqEBE6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBCABIARBCGogBEEYahAROgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEToAACABIAJqIABrIQIMAgsgAyAEQRBqIARBGGoQEToAAiADIARBCGogBEEYahAROgADIANBBGohAwwAAAsACyAEQTBqJAAgAgtpAQF/An8CQAJAIAJBB00NACABKAAAQbfIwuF+Rw0AIAAgASgABDYCmOIBQWIgAEEQaiABIAIQPiIDEAMNAhogAEKBgICAEDcDiOEBIAAgASADaiACIANrECoMAQsgACABIAIQKgtBAAsLrQMBBn8jAEGAAWsiAyQAQWIhCAJAIAJBCUkNACAAQZjQAGogAUEIaiIEIAJBeGogAEGY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wOABCwutAgIEfwF+IwBBQGoiBCQAAkACQCACQQhJDQAgASgAAEFwcUHQ1LTCAUcNACABIAIQIiEBIABCADcDCCAAQQA2AgQgACABNgIADAELIARBGGogASACEC0iAxADBEAgACADEBoMAQsgAwRAIABBuH8QGgwBCyACIAQoAjAiA2shAiABIANqIQMDQAJAIAAgAyACIARBCGoQLCIFEAMEfyAFBSACIAVBA2oiBU8NAUG4fwsQGgwCCyAGQQFqIQYgAiAFayECIAMgBWohAyAEKAIMRQ0ACyAEKAI4BEAgAkEDTQRAIABBuH8QGgwCCyADQQRqIQMLIAQoAighAiAEKQMYIQcgAEEANgIEIAAgAyABazYCACAAIAIgBmytIAcgB0J/URs3AwgLIARBQGskAAslAQF/IwBBEGsiAiQAIAIgACABEFEgAigCACEAIAJBEGokACAAC30BBH8jAEGQBGsiBCQAIARB/wE2AggCQCAEQRBqIARBCGogBEEMaiABIAIQFSIGEAMEQCAGIQUMAQtBVCEFIAQoAgwiB0EGSw0AIAMgBEEQaiAEKAIIIAcQQSIFEAMNACAAIAEgBmogAiAGayADEDwhBQsgBEGQBGokACAFC4cBAgJ/An5BABAWIQMCQANAIAEgA08EQAJAIAAoAABBcHFB0NS0wgFGBEAgACABECIiAhADRQ0BQn4PCyAAIAEQVSIEQn1WDQMgBCAFfCIFIARUIQJCfiEEIAINAyAAIAEQUiICEAMNAwsgASACayEBIAAgAmohAAwBCwtCfiAFIAEbIQQLIAQLPwIBfwF+IwBBMGsiAiQAAn5CfiACQQhqIAAgARAtDQAaQgAgAigCHEEBRg0AGiACKQMICyEDIAJBMGokACADC40BAQJ/IwBBMGsiASQAAkAgAEUNACAAKAKI4gENACABIABB/OEBaigCADYCKCABIAApAvThATcDICAAEDAgACgCqOIBIQIgASABKAIoNgIYIAEgASkDIDcDECACIAFBEGoQGyAAQQA2AqjiASABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALKgECfyMAQRBrIgAkACAAQQA2AgggAEIANwMAIAAQWCEBIABBEGokACABC4cBAQN/IwBBEGsiAiQAAkAgACgCAEUgACgCBEVzDQAgAiAAKAIINgIIIAIgACkCADcDAAJ/IAIoAgAiAQRAIAIoAghBqOMJIAERBQAMAQtBqOMJECgLIgFFDQAgASAAKQIANwL04QEgAUH84QFqIAAoAgg2AgAgARBZIAEhAwsgAkEQaiQAIAMLywEBAn8jAEEgayIBJAAgAEGBgIDAADYCtOIBIABBADYCiOIBIABBADYC7OEBIABCADcDkOIBIABBADYCpOMJIABBADYC3OIBIABCADcCzOIBIABBADYCvOIBIABBADYCxOABIABCADcCnOIBIABBpOIBakIANwIAIABBrOIBakEANgIAIAFCADcCECABQgA3AhggASABKQMYNwMIIAEgASkDEDcDACABKAIIQQh2QQFxIQIgAEEANgLg4gEgACACNgKM4gEgAUEgaiQAC3YBA38jAEEwayIBJAAgAARAIAEgAEHE0AFqIgIoAgA2AiggASAAKQK80AE3AyAgACgCACEDIAEgAigCADYCGCABIAApArzQATcDECADIAFBEGoQGyABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALzAEBAX8gACABKAK00AE2ApjiASAAIAEoAgQiAjYCwOABIAAgAjYCvOABIAAgAiABKAIIaiICNgK44AEgACACNgLE4AEgASgCuNABBEAgAEKBgICAEDcDiOEBIAAgAUGk0ABqNgIMIAAgAUGUIGo2AgggACABQZwwajYCBCAAIAFBDGo2AgAgAEGs0AFqIAFBqNABaigCADYCACAAQbDQAWogAUGs0AFqKAIANgIAIABBtNABaiABQbDQAWooAgA2AgAPCyAAQgA3A4jhAQs7ACACRQRAQbp/DwsgBEUEQEFsDwsgAiAEEGAEQCAAIAEgAiADIAQgBRBhDwsgACABIAIgAyAEIAUQZQtGAQF/IwBBEGsiBSQAIAVBCGogBBAOAn8gBS0ACQRAIAAgASACIAMgBBAyDAELIAAgASACIAMgBBA0CyEAIAVBEGokACAACzQAIAAgAyAEIAUQNiIFEAMEQCAFDwsgBSAESQR/IAEgAiADIAVqIAQgBWsgABA1BUG4fwsLRgEBfyMAQRBrIgUkACAFQQhqIAQQDgJ/IAUtAAkEQCAAIAEgAiADIAQQYgwBCyAAIAEgAiADIAQQNQshACAFQRBqJAAgAAtZAQF/QQ8hAiABIABJBEAgAUEE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", Ei = "display-p3", Ci = "display-p3-linear";
({
  ...pA.spaces[W]
});
const TA = /* @__PURE__ */ new WeakMap();
let xA = 0, LA;
class j extends vA {
  /**
   * Constructs a new KTX2 loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(A) {
    super(A), this.transcoderPath = "", this.transcoderBinary = null, this.transcoderPending = null, this.workerPool = new ii(), this.workerSourceURL = "", this.workerConfig = null, typeof MSC_TRANSCODER < "u" && console.warn(
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
    }, typeof navigator < "u" && navigator.platform.indexOf("Linux") >= 0 && navigator.userAgent.indexOf("Firefox") >= 0 && this.workerConfig.astcSupported && this.workerConfig.etc2Supported && this.workerConfig.bptcSupported && this.workerConfig.dxtSupported && (this.workerConfig.astcSupported = !1, this.workerConfig.etc2Supported = !1)), this;
  }
  // TODO: Make this method private
  init() {
    if (!this.transcoderPending) {
      const A = new nA(this.manager);
      A.setPath(this.transcoderPath), A.setWithCredentials(this.withCredentials);
      const e = A.loadAsync("basis_transcoder.js"), a = new nA(this.manager);
      a.setPath(this.transcoderPath), a.setResponseType("arraybuffer"), a.setWithCredentials(this.withCredentials);
      const t = a.loadAsync("basis_transcoder.wasm");
      this.transcoderPending = Promise.all([e, t]).then(([s, i]) => {
        const o = j.BasisWorker.toString(), n = [
          "/* constants */",
          "let _EngineFormat = " + JSON.stringify(j.EngineFormat),
          "let _EngineType = " + JSON.stringify(j.EngineType),
          "let _TranscoderFormat = " + JSON.stringify(j.TranscoderFormat),
          "let _BasisFormat = " + JSON.stringify(j.BasisFormat),
          "/* basis_transcoder.js */",
          s,
          "/* worker */",
          o.substring(o.indexOf("{") + 1, o.lastIndexOf("}"))
        ].join(`
`);
        this.workerSourceURL = URL.createObjectURL(new Blob([n])), this.transcoderBinary = i, this.workerPool.setWorkerCreator(() => {
          const r = new Worker(this.workerSourceURL), c = this.transcoderBinary.slice(0);
          return r.postMessage({ type: "init", config: this.workerConfig, transcoderBinary: c }, [c]), r;
        });
      }), xA > 0 && console.warn(
        "THREE.KTX2Loader: Multiple active KTX2 loaders may cause performance issues. Use a single KTX2Loader instance, or call .dispose() on old instances."
      ), xA++;
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
    const s = new nA(this.manager);
    s.setPath(this.path), s.setCrossOrigin(this.crossOrigin), s.setWithCredentials(this.withCredentials), s.setRequestHeader(this.requestHeader), s.setResponseType("arraybuffer"), s.load(A, (i) => {
      this.parse(i, e, t);
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
    if (TA.has(A))
      return TA.get(A).promise.then(e).catch(a);
    this._createTexture(A).then((t) => e ? e(t) : null).catch(a);
  }
  _createTextureFrom(A, e) {
    const { type: a, error: t, data: { faces: s, width: i, height: o, format: n, type: r, dfdFlags: c } } = A;
    if (a === "error") return Promise.reject(t);
    let g;
    if (e.faceCount === 6)
      g = new Wt(s, n, r);
    else {
      const B = s[0].mipmaps;
      g = e.layerCount > 1 ? new Xt(B, i, o, e.layerCount, n, r) : new ke(B, i, o, n, r);
    }
    return g.minFilter = s[0].mipmaps.length === 1 ? $ : uA, g.magFilter = $, g.generateMipmaps = !1, g.needsUpdate = !0, g.colorSpace = ht(e), g.premultiplyAlpha = !!(c & ni), g;
  }
  /**
   * @private
   * @param {ArrayBuffer} buffer
   * @param {?Object} config
   * @return {Promise<CompressedTexture|CompressedArrayTexture|DataTexture|Data3DTexture>}
   */
  async _createTexture(A, e = {}) {
    const a = Ii(new Uint8Array(A)), t = a.vkFormat === VA && a.dataFormatDescriptor[0].colorModel === 167;
    if (!(a.vkFormat === ci || t && !this.workerConfig.astcHDRSupported))
      return di(a);
    const i = e, o = this.init().then(() => this.workerPool.postMessage({ type: "transcode", buffer: A, taskConfig: i }, [A])).then((n) => this._createTextureFrom(n.data, a));
    return TA.set(A, { promise: o }), o;
  }
  /**
   * Frees internal resources. This method should be called
   * when the loader is no longer required.
   */
  dispose() {
    this.workerPool.dispose(), this.workerSourceURL && URL.revokeObjectURL(this.workerSourceURL), xA--;
  }
}
j.BasisFormat = {
  ETC1S: 0,
  UASTC: 1,
  UASTC_HDR: 2
};
j.TranscoderFormat = {
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
j.EngineFormat = {
  RGBAFormat: rA,
  RGBA_ASTC_4x4_Format: lA,
  RGB_BPTC_UNSIGNED_Format: na,
  RGBA_BPTC_Format: HA,
  RGBA_ETC2_EAC_Format: Se,
  RGBA_PVRTC_4BPPV1_Format: NA,
  RGBA_S3TC_DXT5_Format: sa,
  RGB_ETC1_Format: ia,
  RGB_ETC2_Format: Fe,
  RGB_PVRTC_4BPPV1_Format: aa,
  RGBA_S3TC_DXT1_Format: qA
};
j.EngineType = {
  UnsignedByteType: x,
  HalfFloatType: V,
  FloatType: tA
};
j.BasisWorker = function() {
  let I, A, e;
  const a = _EngineFormat, t = _EngineType, s = _TranscoderFormat, i = _BasisFormat;
  self.addEventListener("message", function(h) {
    const Q = h.data;
    switch (Q.type) {
      case "init":
        I = Q.config, o(Q.transcoderBinary);
        break;
      case "transcode":
        A.then(() => {
          try {
            const { faces: f, buffers: b, width: C, height: l, hasAlpha: d, format: p, type: R, dfdFlags: k } = n(Q.buffer);
            self.postMessage({ type: "transcode", id: Q.id, data: { faces: f, width: C, height: l, hasAlpha: d, format: p, type: R, dfdFlags: k } }, b);
          } catch (f) {
            console.error(f), self.postMessage({ type: "error", id: Q.id, error: f.message });
          }
        });
        break;
    }
  });
  function o(h) {
    A = new Promise((Q) => {
      e = { wasmBinary: h, onRuntimeInitialized: Q }, BASIS(e);
    }).then(() => {
      e.initializeBasis(), e.KTX2File === void 0 && console.warn("THREE.KTX2Loader: Please update Basis Universal transcoder.");
    });
  }
  function n(h) {
    const Q = new e.KTX2File(new Uint8Array(h));
    function f() {
      Q.close(), Q.delete();
    }
    if (!Q.isValid())
      throw f(), new Error("THREE.KTX2Loader:	Invalid or unsupported .ktx2 file");
    let b;
    if (Q.isUASTC())
      b = i.UASTC;
    else if (Q.isETC1S())
      b = i.ETC1S;
    else if (Q.isHDR())
      b = i.UASTC_HDR;
    else
      throw new Error("THREE.KTX2Loader: Unknown Basis encoding");
    const C = Q.getWidth(), l = Q.getHeight(), d = Q.getLayers() || 1, p = Q.getLevels(), R = Q.getFaces(), k = Q.getHasAlpha(), u = Q.getDFDFlags(), { transcoderFormat: w, engineFormat: m, engineType: F } = g(b, C, l, k);
    if (!C || !l || !p)
      throw f(), new Error("THREE.KTX2Loader:	Invalid texture");
    if (!Q.startTranscoding())
      throw f(), new Error("THREE.KTX2Loader: .startTranscoding failed");
    const L = [], G = [];
    for (let D = 0; D < R; D++) {
      const U = [];
      for (let y = 0; y < p; y++) {
        const P = [];
        let AA, Y;
        for (let _ = 0; _ < d; _++) {
          const T = Q.getImageLevelInfo(y, _, D);
          D === 0 && y === 0 && _ === 0 && (T.origWidth % 4 !== 0 || T.origHeight % 4 !== 0) && console.warn("THREE.KTX2Loader: ETC1S and UASTC textures should use multiple-of-four dimensions."), p > 1 ? (AA = T.origWidth, Y = T.origHeight) : (AA = T.width, Y = T.height);
          let N = new Uint8Array(Q.getImageTranscodedSizeInBytes(y, _, 0, w));
          const iA = Q.transcodeImage(N, y, _, D, w, 0, -1, -1);
          if (F === t.HalfFloatType && (N = new Uint16Array(N.buffer, N.byteOffset, N.byteLength / Uint16Array.BYTES_PER_ELEMENT)), !iA)
            throw f(), new Error("THREE.KTX2Loader: .transcodeImage failed.");
          P.push(N);
        }
        const q = E(P);
        U.push({ data: q, width: AA, height: Y }), G.push(q.buffer);
      }
      L.push({ mipmaps: U, width: C, height: l, format: m, type: F });
    }
    return f(), { faces: L, buffers: G, width: C, height: l, hasAlpha: k, dfdFlags: u, format: m, type: F };
  }
  const r = [
    {
      if: "astcSupported",
      basisFormat: [i.UASTC],
      transcoderFormat: [s.ASTC_4x4, s.ASTC_4x4],
      engineFormat: [a.RGBA_ASTC_4x4_Format, a.RGBA_ASTC_4x4_Format],
      engineType: [t.UnsignedByteType],
      priorityETC1S: 1 / 0,
      priorityUASTC: 1,
      needsPowerOfTwo: !1
    },
    {
      if: "bptcSupported",
      basisFormat: [i.ETC1S, i.UASTC],
      transcoderFormat: [s.BC7_M5, s.BC7_M5],
      engineFormat: [a.RGBA_BPTC_Format, a.RGBA_BPTC_Format],
      engineType: [t.UnsignedByteType],
      priorityETC1S: 3,
      priorityUASTC: 2,
      needsPowerOfTwo: !1
    },
    {
      if: "dxtSupported",
      basisFormat: [i.ETC1S, i.UASTC],
      transcoderFormat: [s.BC1, s.BC3],
      engineFormat: [a.RGBA_S3TC_DXT1_Format, a.RGBA_S3TC_DXT5_Format],
      engineType: [t.UnsignedByteType],
      priorityETC1S: 4,
      priorityUASTC: 5,
      needsPowerOfTwo: !1
    },
    {
      if: "etc2Supported",
      basisFormat: [i.ETC1S, i.UASTC],
      transcoderFormat: [s.ETC1, s.ETC2],
      engineFormat: [a.RGB_ETC2_Format, a.RGBA_ETC2_EAC_Format],
      engineType: [t.UnsignedByteType],
      priorityETC1S: 1,
      priorityUASTC: 3,
      needsPowerOfTwo: !1
    },
    {
      if: "etc1Supported",
      basisFormat: [i.ETC1S, i.UASTC],
      transcoderFormat: [s.ETC1],
      engineFormat: [a.RGB_ETC1_Format],
      engineType: [t.UnsignedByteType],
      priorityETC1S: 2,
      priorityUASTC: 4,
      needsPowerOfTwo: !1
    },
    {
      if: "pvrtcSupported",
      basisFormat: [i.ETC1S, i.UASTC],
      transcoderFormat: [s.PVRTC1_4_RGB, s.PVRTC1_4_RGBA],
      engineFormat: [a.RGB_PVRTC_4BPPV1_Format, a.RGBA_PVRTC_4BPPV1_Format],
      engineType: [t.UnsignedByteType],
      priorityETC1S: 5,
      priorityUASTC: 6,
      needsPowerOfTwo: !0
    },
    {
      if: "bptcSupported",
      basisFormat: [i.UASTC_HDR],
      transcoderFormat: [s.BC6H],
      engineFormat: [a.RGB_BPTC_UNSIGNED_Format],
      engineType: [t.HalfFloatType],
      priorityHDR: 1,
      needsPowerOfTwo: !1
    },
    // Uncompressed fallbacks.
    {
      basisFormat: [i.ETC1S, i.UASTC],
      transcoderFormat: [s.RGBA32, s.RGBA32],
      engineFormat: [a.RGBAFormat, a.RGBAFormat],
      engineType: [t.UnsignedByteType, t.UnsignedByteType],
      priorityETC1S: 100,
      priorityUASTC: 100,
      needsPowerOfTwo: !1
    },
    {
      basisFormat: [i.UASTC_HDR],
      transcoderFormat: [s.RGBA_HALF],
      engineFormat: [a.RGBAFormat],
      engineType: [t.HalfFloatType],
      priorityHDR: 100,
      needsPowerOfTwo: !1
    }
  ], c = {
    [i.ETC1S]: r.filter((h) => h.basisFormat.includes(i.ETC1S)).sort((h, Q) => h.priorityETC1S - Q.priorityETC1S),
    [i.UASTC]: r.filter((h) => h.basisFormat.includes(i.UASTC)).sort((h, Q) => h.priorityUASTC - Q.priorityUASTC),
    [i.UASTC_HDR]: r.filter((h) => h.basisFormat.includes(i.UASTC_HDR)).sort((h, Q) => h.priorityHDR - Q.priorityHDR)
  };
  function g(h, Q, f, b) {
    const C = c[h];
    for (let l = 0; l < C.length; l++) {
      const d = C[l];
      if (d.if && !I[d.if] || !d.basisFormat.includes(h) || b && d.transcoderFormat.length < 2 || d.needsPowerOfTwo && !(B(Q) && B(f))) continue;
      const p = d.transcoderFormat[b ? 1 : 0], R = d.engineFormat[b ? 1 : 0], k = d.engineType[0];
      return { transcoderFormat: p, engineFormat: R, engineType: k };
    }
    throw new Error("THREE.KTX2Loader: Failed to identify transcoding target.");
  }
  function B(h) {
    return h <= 2 ? !0 : (h & h - 1) === 0 && h !== 0;
  }
  function E(h) {
    if (h.length === 1) return h[0];
    let Q = 0;
    for (let C = 0; C < h.length; C++) {
      const l = h[C];
      Q += l.byteLength;
    }
    const f = new Uint8Array(Q);
    let b = 0;
    for (let C = 0; C < h.length; C++) {
      const l = h[C];
      f.set(l, b), b += l.byteLength;
    }
    return f;
  }
};
const bi = /* @__PURE__ */ new Set([rA, OA, CA, EA]), MA = {
  [ve]: rA,
  [Je]: CA,
  [je]: EA,
  [Ke]: rA,
  [Oe]: CA,
  [qe]: EA,
  [He]: rA,
  [Ne]: rA,
  [_e]: CA,
  [Ue]: CA,
  [Me]: EA,
  [Le]: EA,
  [Ye]: OA,
  [Pe]: OA,
  [ot]: Se,
  [nt]: Fe,
  [VA]: lA,
  [gt]: lA,
  [rt]: lA,
  [dt]: DA,
  [It]: DA,
  [ct]: DA,
  [ze]: qA,
  [Xe]: qA,
  [We]: te,
  [Ve]: te,
  [$e]: ee,
  [Ze]: ee,
  [et]: Aa,
  [At]: $t,
  [at]: Zt,
  [tt]: zt,
  [st]: HA,
  [it]: HA,
  [bt]: NA,
  [Et]: NA,
  [Ct]: Ae,
  [Bt]: Ae
}, oA = {
  [ve]: tA,
  [Je]: tA,
  [je]: tA,
  [Ke]: V,
  [Oe]: V,
  [qe]: V,
  [He]: x,
  [Ne]: x,
  [_e]: x,
  [Ue]: x,
  [Me]: x,
  [Le]: x,
  [Ye]: Ge,
  [Pe]: ye,
  [ot]: x,
  [nt]: x,
  [VA]: V,
  [gt]: x,
  [rt]: x,
  [dt]: V,
  [It]: x,
  [ct]: x,
  [ze]: x,
  [Xe]: x,
  [We]: x,
  [Ve]: x,
  [$e]: x,
  [Ze]: x,
  [et]: x,
  [At]: x,
  [at]: x,
  [tt]: x,
  [st]: x,
  [it]: x,
  [bt]: x,
  [Et]: x,
  [Ct]: x,
  [Bt]: x
};
async function di(I) {
  const { vkFormat: A } = I;
  if (MA[A] === void 0)
    throw new Error("THREE.KTX2Loader: Unsupported vkFormat: " + A);
  oA[A] === void 0 && console.warn('THREE.KTX2Loader: Missing ".type" for vkFormat: ' + A);
  let e;
  I.supercompressionScheme === Be && (LA || (LA = new Promise(async (i) => {
    const o = new Bi();
    await o.init(), i(o);
  })), e = await LA);
  const a = [];
  for (let i = 0; i < I.levels.length; i++) {
    const o = Math.max(1, I.pixelWidth >> i), n = Math.max(1, I.pixelHeight >> i), r = I.pixelDepth ? Math.max(1, I.pixelDepth >> i) : 0, c = I.levels[i];
    let g;
    if (I.supercompressionScheme === si)
      g = c.levelData;
    else if (I.supercompressionScheme === Be)
      g = e.decode(c.levelData, c.uncompressedByteLength);
    else
      throw new Error("THREE.KTX2Loader: Unsupported supercompressionScheme.");
    let B;
    oA[A] === tA ? B = new Float32Array(
      g.buffer,
      g.byteOffset,
      g.byteLength / Float32Array.BYTES_PER_ELEMENT
    ) : oA[A] === V ? B = new Uint16Array(
      g.buffer,
      g.byteOffset,
      g.byteLength / Uint16Array.BYTES_PER_ELEMENT
    ) : oA[A] === Ge || oA[A] === ye ? B = new Uint32Array(
      g.buffer,
      g.byteOffset,
      g.byteLength / Uint32Array.BYTES_PER_ELEMENT
    ) : B = g, a.push({
      data: B,
      width: o,
      height: n,
      depth: r
    });
  }
  const t = I.levelCount === 0 || a.length > 1;
  let s;
  if (bi.has(MA[A]))
    s = I.pixelDepth === 0 ? new ea(a[0].data, I.pixelWidth, I.pixelHeight) : new ta(a[0].data, I.pixelWidth, I.pixelHeight, I.pixelDepth), s.minFilter = t ? fe : fA, s.magFilter = fA, s.generateMipmaps = I.levelCount === 0;
  else {
    if (I.pixelDepth > 0) throw new Error("THREE.KTX2Loader: Unsupported pixelDepth.");
    s = new ke(a, I.pixelWidth, I.pixelHeight), s.minFilter = t ? uA : $, s.magFilter = $;
  }
  return s.mipmaps = a, s.type = oA[A], s.format = MA[A], s.colorSpace = ht(I), s.needsUpdate = !0, Promise.resolve(s);
}
function ht(I) {
  const A = I.dataFormatDescriptor[0];
  return A.colorPrimaries === ri ? A.transferFunction === Ee ? W : v : A.colorPrimaries === gi ? A.transferFunction === Ee ? Ei : Ci : A.colorPrimaries === oi ? $A : (console.warn(`THREE.KTX2Loader: Unsupported color primaries, "${A.colorPrimaries}"`), $A);
}
var hi = (function() {
  var I = "b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuikqbeeedddillviebeoweuec:q:Odkr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbol79IV9Rbrq;w8Wqdbk;esezu8Jjjjjbcj;eb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Radz1jjjbhwcj;abad9Uc;WFbGgocjdaocjd6EhDaicefhocbhqdnindndndnaeaq9nmbaDaeaq9RaqaDfae6Egkcsfglcl4cifcd4hxalc9WGgmTmecbhPawcjdfhsaohzinaraz9Rax6mvarazaxfgo9RcK6mvczhlcbhHinalgic9WfgOawcj;cbffhldndndndndnazaOco4fRbbaHcoG4ciGPlbedibkal9cb83ibalcwf9cb83ibxikalaoRblaoRbbgOco4gAaAciSgAE86bbawcj;cbfaifglcGfaoclfaAfgARbbaOcl4ciGgCaCciSgCE86bbalcVfaAaCfgARbbaOcd4ciGgCaCciSgCE86bbalc7faAaCfgARbbaOciGgOaOciSgOE86bbalctfaAaOfgARbbaoRbegOco4gCaCciSgCE86bbalc91faAaCfgARbbaOcl4ciGgCaCciSgCE86bbalc4faAaCfgARbbaOcd4ciGgCaCciSgCE86bbalc93faAaCfgARbbaOciGgOaOciSgOE86bbalc94faAaOfgARbbaoRbdgOco4gCaCciSgCE86bbalc95faAaCfgARbbaOcl4ciGgCaCciSgCE86bbalc96faAaCfgARbbaOcd4ciGgCaCciSgCE86bbalc97faAaCfgARbbaOciGgOaOciSgOE86bbalc98faAaOfgORbbaoRbigoco4gAaAciSgAE86bbalc99faOaAfgORbbaocl4ciGgAaAciSgAE86bbalc9:faOaAfgORbbaocd4ciGgAaAciSgAE86bbalcufaOaAfglRbbaociGgoaociSgoE86bbalaofhoxdkalaoRbwaoRbbgOcl4gAaAcsSgAE86bbawcj;cbfaifglcGfaocwfaAfgARbbaOcsGgOaOcsSgOE86bbalcVfaAaOfgORbbaoRbegAcl4gCaCcsSgCE86bbalc7faOaCfgORbbaAcsGgAaAcsSgAE86bbalctfaOaAfgORbbaoRbdgAcl4gCaCcsSgCE86bbalc91faOaCfgORbbaAcsGgAaAcsSgAE86bbalc4faOaAfgORbbaoRbigAcl4gCaCcsSgCE86bbalc93faOaCfgORbbaAcsGgAaAcsSgAE86bbalc94faOaAfgORbbaoRblgAcl4gCaCcsSgCE86bbalc95faOaCfgORbbaAcsGgAaAcsSgAE86bbalc96faOaAfgORbbaoRbvgAcl4gCaCcsSgCE86bbalc97faOaCfgORbbaAcsGgAaAcsSgAE86bbalc98faOaAfgORbbaoRbogAcl4gCaCcsSgCE86bbalc99faOaCfgORbbaAcsGgAaAcsSgAE86bbalc9:faOaAfgORbbaoRbrgocl4gAaAcsSgAE86bbalcufaOaAfglRbbaocsGgoaocsSgoE86bbalaofhoxekalao8Pbb83bbalcwfaocwf8Pbb83bbaoczfhokdnaiam9pmbaHcdfhHaiczfhlarao9RcL0mekkaiam6mvaoTmvdnakTmbawaPfRbbhHawcj;cbfhlashiakhOinaialRbbgzce4cbazceG9R7aHfgH86bbaiadfhialcefhlaOcufgOmbkkascefhsaohzaPcefgPad9hmbxikkcbc99arao9Radcaadca0ESEhoxlkaoaxad2fhCdnakmbadhlinaoTmlarao9Rax6mlaoaxfhoalcufglmbkaChoxekcbhmawcjdfhAinarao9Rax6miawamfRbbhHawcj;cbfhlaAhiakhOinaialRbbgzce4cbazceG9R7aHfgH86bbaiadfhialcefhlaOcufgOmbkaAcefhAaoaxfhoamcefgmad9hmbkaChokabaqad2fawcjdfakad2z1jjjb8Aawawcjdfakcufad2fadz1jjjb8Aakaqfhqaombkc9:hoxekc9:hokavcj;ebf8Kjjjjbaok;cseHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgwce0mbavc;abfcFecjez:jjjjb8AavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhDaicefgqarfhidnaeTmbcmcsawceSEhkcbhxcbhmcbhPcbhwcbhlindnaiaD9nmbc9:hoxikdndnaqRbbgoc;Ve0mbavc;abfalaocu7gscl4fcsGcitfgzydlhrazydbhzdnaocsGgHak9pmbavawasfcsGcdtfydbaxaHEhoaHThsdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkaxasfhxcdhHavawcdtfaoBdbawasfhwcehsalhOxdkdndnaHcsSmbaHc987aHamffcefhoxekaicefhoai8SbbgHcFeGhsdndnaHcu9mmbaohixekaicvfhiascFbGhscrhHdninao8SbbgOcFbGaHtasVhsaOcu9kmeaocefhoaHcrfgHc8J9hmbxdkkaocefhikasce4cbasceG9R7amfhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhHavawcdtfaoBdbcehsawcefhwalhOaohmxekdnaocpe0mbaxcefgHavawaDaocsGfRbbgocl49RcsGcdtfydbaocz6gzEhravawao9RcsGcdtfydbaHazfgAaocsGgHEhoaHThCdndnadcd9hmbabaPcetfgHax87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHaxBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfaxBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgOaxBdlaOarBdbavawazfgwcsGcdtfaoBdbalcefcsGhOawaCfhwaxhzaAaCfhxxekaxcbaiRbbgOEgzaoc;:eSgHfhraOcsGhCaOcl4hAdndnaOcs0mbarcefhoxekarhoavawaA9RcsGcdtfydbhrkdndnaCmbaocefhxxekaohxavawaO9RcsGcdtfydbhokdndnaHTmbaicefhHxekaicdfhHai8SbegscFeGhzdnascu9kmbaicofhXazcFbGhzcrhidninaH8SbbgscFbGaitazVhzascu9kmeaHcefhHaicrfgic8J9hmbkaXhHxekaHcefhHkazce4cbazceG9R7amfgmhzkdndnaAcsSmbaHhsxekaHcefhsaH8SbbgicFeGhrdnaicu9kmbaHcvfhXarcFbGhrcrhidninas8SbbgHcFbGaitarVhraHcu9kmeascefhsaicrfgic8J9hmbkaXhsxekascefhskarce4cbarceG9R7amfgmhrkdndnaCcsSmbashixekascefhias8SbbgocFeGhHdnaocu9kmbascvfhXaHcFbGhHcrhodninai8SbbgscFbGaotaHVhHascu9kmeaicefhiaocrfgoc8J9hmbkaXhixekaicefhikaHce4cbaHceG9R7amfgmhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfazBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgXazBdlaXarBdbavawaOcz6aAcsSVfgwcsGcdtfaoBdbawaCTaCcsSVfhwalcefcsGhOkaqcefhqavc;abfaOcitfgOarBdlaOaoBdbavc;abfalasfcsGcitfgraoBdlarazBdbawcsGhwalaHfcsGhlaPcifgPae6mbkkcbc99aiaDSEhokavc;aef8Kjjjjbaok:flevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaic8Etc8F91aicd47avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaic8Etc8F91aicd47avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk;oiliui99iue99dnaeTmbcbhiabhlindndnJ;Zl81Zalcof8UebgvciV:Y:vgoal8Ueb:YNgrJb;:FSNJbbbZJbbb:;arJbbbb9GEMgw:lJbbb9p9DTmbaw:OhDxekcjjjj94hDkalclf8Uebhqalcdf8UebhkabaiavcefciGfcetfaD87ebdndnaoak:YNgwJb;:FSNJbbbZJbbb:;awJbbbb9GEMgx:lJbbb9p9DTmbax:OhDxekcjjjj94hDkabaiavciGfgkcd7cetfaD87ebdndnaoaq:YNgoJb;:FSNJbbbZJbbb:;aoJbbbb9GEMgx:lJbbb9p9DTmbax:OhDxekcjjjj94hDkabaiavcufciGfcetfaD87ebdndnJbbjZararN:tawawN:taoaoN:tgrJbbbbarJbbbb9GE:rJb;:FSNJbbbZMgr:lJbbb9p9DTmbar:Ohvxekcjjjj94hvkabakcetfav87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2gdTmbinababydbgecwtcw91:Yaece91cjjj98Gcjjj;8if::NUdbabclfhbadcufgdmbkkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkkkebcjwklzNbb", A = "b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuikqbbebeedddilve9Weeeviebeoweuec:q:6dkr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbwl79IV9RbDq:p9sqlbzik9:evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaec:q:yjjbfai86bbaecitc:q1jjbfab8Piw83ibaecefgecjd9hmbkk:N8JlHud97euo978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Rad;8qbbcj;abad9UhlaicefhodnaeTmbadTmbalc;WFbGglcjdalcjd6EhwcbhDinawaeaD9RaDawfae6Egqcsfglc9WGgkci2hxakcethmalcl4cifcd4hPabaDad2fhsakc;ab6hzcbhHincbhOaohAdndninaraA9RaP6meavcj;cbfaOak2fhCaAaPfhocbhidnazmbarao9Rc;Gb6mbcbhlinaCalfhidndndndndnaAalco4fRbbgXciGPlbedibkaipxbbbbbbbbbbbbbbbbpklbxikaiaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbaoclfaYpQbfaKc:q:yjjbfRbbfhoxdkaiaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbaocwfaYpQbfaKc:q:yjjbfRbbfhoxekaiaopbbbpklbaoczfhokdndndndndnaXcd4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklzxikaiaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzaoclfaYpQbfaKc:q:yjjbfRbbfhoxdkaiaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzaocwfaYpQbfaKc:q:yjjbfRbbfhoxekaiaopbbbpklzaoczfhokdndndndndnaXcl4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklaxikaiaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaaoclfaYpQbfaKc:q:yjjbfRbbfhoxdkaiaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaaocwfaYpQbfaKc:q:yjjbfRbbfhoxekaiaopbbbpklaaoczfhokdndndndndnaXco4Plbedibkaipxbbbbbbbbbbbbbbbbpkl8WxikaiaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WaoclfaYpQbfaXc:q:yjjbfRbbfhoxdkaiaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WaocwfaYpQbfaXc:q:yjjbfRbbfhoxekaiaopbbbpkl8Waoczfhokalc;abfhialcjefak0meaihlarao9Rc;Fb0mbkkdnaiak9pmbaici4hlinarao9RcK6miaCaifhXdndndndndnaAaico4fRbbalcoG4ciGPlbedibkaXpxbbbbbbbbbbbbbbbbpkbbxikaXaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkbbaoclfaYpQbfaKc:q:yjjbfRbbfhoxdkaXaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkbbaocwfaYpQbfaKc:q:yjjbfRbbfhoxekaXaopbbbpkbbaoczfhokalcdfhlaiczfgiak6mbkkaoTmeaohAaOcefgOclSmdxbkkc9:hoxlkdnakTmbavcjdfaHfhiavaHfpbdbhYcbhXinaiavcj;cbfaXfglpblbgLcep9TaLpxeeeeeeeeeeeeeeeegQp9op9Hp9rgLalakfpblbg8Acep9Ta8AaQp9op9Hp9rg8ApmbzeHdOiAlCvXoQrLgEalamfpblbg3cep9Ta3aQp9op9Hp9rg3alaxfpblbg5cep9Ta5aQp9op9Hp9rg5pmbzeHdOiAlCvXoQrLg8EpmbezHdiOAlvCXorQLgQaQpmbedibedibedibediaYp9UgYp9AdbbaiadfglaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaladfglaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaladfglaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaladfglaYaEa8EpmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaladfglaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaladfglaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaladfglaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaladfglaYaLa8ApmwKDYq8AkEx3m5P8Es8FgLa3a5pmwKDYq8AkEx3m5P8Es8Fg8ApmbezHdiOAlvCXorQLgQaQpmbedibedibedibedip9UgYp9AdbbaladfglaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaladfglaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaladfglaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaladfglaYaLa8ApmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaladfglaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaladfglaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaladfglaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaladfhiaXczfgXak6mbkkaHclfgHad6mbkasavcjdfaqad2;8qbbavavcjdfaqcufad2fad;8qbbaqaDfgDae6mbkkcbc99arao9Radcaadca0ESEhokavcj;kbf8Kjjjjbaokwbz:bjjjbk::seHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgwce0mbavc;abfcFecje;8kbavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhDaicefgqarfhidnaeTmbcmcsawceSEhkcbhxcbhmcbhPcbhwcbhlindnaiaD9nmbc9:hoxikdndnaqRbbgoc;Ve0mbavc;abfalaocu7gscl4fcsGcitfgzydlhrazydbhzdnaocsGgHak9pmbavawasfcsGcdtfydbaxaHEhoaHThsdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkaxasfhxcdhHavawcdtfaoBdbawasfhwcehsalhOxdkdndnaHcsSmbaHc987aHamffcefhoxekaicefhoai8SbbgHcFeGhsdndnaHcu9mmbaohixekaicvfhiascFbGhscrhHdninao8SbbgOcFbGaHtasVhsaOcu9kmeaocefhoaHcrfgHc8J9hmbxdkkaocefhikasce4cbasceG9R7amfhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhHavawcdtfaoBdbcehsawcefhwalhOaohmxekdnaocpe0mbaxcefgHavawaDaocsGfRbbgocl49RcsGcdtfydbaocz6gzEhravawao9RcsGcdtfydbaHazfgAaocsGgHEhoaHThCdndnadcd9hmbabaPcetfgHax87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHaxBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfaxBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgOaxBdlaOarBdbavawazfgwcsGcdtfaoBdbalcefcsGhOawaCfhwaxhzaAaCfhxxekaxcbaiRbbgOEgzaoc;:eSgHfhraOcsGhCaOcl4hAdndnaOcs0mbarcefhoxekarhoavawaA9RcsGcdtfydbhrkdndnaCmbaocefhxxekaohxavawaO9RcsGcdtfydbhokdndnaHTmbaicefhHxekaicdfhHai8SbegscFeGhzdnascu9kmbaicofhXazcFbGhzcrhidninaH8SbbgscFbGaitazVhzascu9kmeaHcefhHaicrfgic8J9hmbkaXhHxekaHcefhHkazce4cbazceG9R7amfgmhzkdndnaAcsSmbaHhsxekaHcefhsaH8SbbgicFeGhrdnaicu9kmbaHcvfhXarcFbGhrcrhidninas8SbbgHcFbGaitarVhraHcu9kmeascefhsaicrfgic8J9hmbkaXhsxekascefhskarce4cbarceG9R7amfgmhrkdndnaCcsSmbashixekascefhias8SbbgocFeGhHdnaocu9kmbascvfhXaHcFbGhHcrhodninai8SbbgscFbGaotaHVhHascu9kmeaicefhiaocrfgoc8J9hmbkaXhixekaicefhikaHce4cbaHceG9R7amfgmhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfazBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgXazBdlaXarBdbavawaOcz6aAcsSVfgwcsGcdtfaoBdbawaCTaCcsSVfhwalcefcsGhOkaqcefhqavc;abfaOcitfgOarBdlaOaoBdbavc;abfalasfcsGcitfgraoBdlarazBdbawcsGhwalaHfcsGhlaPcifgPae6mbkkcbc99aiaDSEhokavc;aef8Kjjjjbaok:flevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaic8Etc8F91aicd47avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaic8Etc8F91aicd47avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:wPliuo97eue978Jjjjjbca9Rhiaec98Ghldndnadcl9hmbdnalTmbcbhvabhdinadadpbbbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbadczfhdavclfgval6mbkkalaeSmeaipxbbbbbbbbbbbbbbbbgqpklbaiabalcdtfgdaeciGglcdtgv;8qbbdnalTmbaiaipblbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDaqp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpklbkadaiav;8qbbskdnalTmbcbhvabhdinadczfgxaxpbbbgopxbbbbbbFFbbbbbbFFgkp9oadpbbbgDaopmbediwDqkzHOAKY8AEgwczp:Reczp:Sep;6egraDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eawczp:Sep;6egwp;Gearp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegrpxb;:FSb;:FSb;:FSb;:FSararp;Meaoaop;Meawaqawamp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFFbbFFbbFFbbFFbbp9oaoawp;Meaqp;Keczp:Rep9qgoarawp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogrpmwDKYqk8AExm35Ps8E8Fp9qpkbbadaDakp9oaoarpmbezHdiOAlvCXorQLp9qpkbbadcafhdavclfgval6mbkkalaeSmbaiaeciGgvcitgdfcbcaad9R;8kbaiabalcitfglad;8qbbdnavTmbaiaipblzgopxbbbbbbFFbbbbbbFFgkp9oaipblbgDaopmbediwDqkzHOAKY8AEgwczp:Reczp:Sep;6egraDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eawczp:Sep;6egwp;Gearp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegrpxb;:FSb;:FSb;:FSb;:FSararp;Meaoaop;Meawaqawamp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFFbbFFbbFFbbFFbbp9oaoawp;Meaqp;Keczp:Rep9qgoarawp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogrpmwDKYqk8AExm35Ps8E8Fp9qpklzaiaDakp9oaoarpmbezHdiOAlvCXorQLp9qpklbkalaiad;8qbbkk;4wllue97euv978Jjjjjbc8W9Rhidnaec98GglTmbcbhvabhoinaiaopbbbgraoczfgwpbbbgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklbaopxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaDakp;Mearp;Keamp9oaqakp;Mearp;Keczp:Rep9qgkpmbezHdiOAlvCXorQLgrp5baipblbpEb:T:j83ibaocwfarp5eaipblbpEe:T:j83ibawaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblbpEd:T:j83ibaocKfakp5eaipblbpEi:T:j83ibaocafhoavclfgval6mbkkdnalaeSmbaiaeciGgvcitgofcbcaao9R;8kbaiabalcitfgwao;8qbbdnavTmbaiaipblbgraipblzgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklaaipxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaDakp;Mearp;Keamp9oaqakp;Mearp;Keczp:Rep9qgkpmbezHdiOAlvCXorQLgrp5baipblapEb:T:j83ibaiarp5eaipblapEe:T:j83iwaiaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblapEd:T:j83izaiakp5eaipblapEi:T:j83iKkawaiao;8qbbkk:Pddiue978Jjjjjbc;ab9Rhidnadcd4ae2glc98GgvTmbcbheabhdinadadpbbbgocwp:Recwp:Sep;6eaocep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepkbbadczfhdaeclfgeav6mbkkdnavalSmbaialciGgecdtgdVcbc;abad9R;8kbaiabavcdtfgvad;8qbbdnaeTmbaiaipblbgocwp:Recwp:Sep;6eaocep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepklbkavaiad;8qbbkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkkebcjwklz:Dbb", e = new Uint8Array([
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
  var t = WebAssembly.validate(e) ? o(A) : o(I), s, i = WebAssembly.instantiate(t, {}).then(function(b) {
    s = b.instance, s.exports.__wasm_call_ctors();
  });
  function o(b) {
    for (var C = new Uint8Array(b.length), l = 0; l < b.length; ++l) {
      var d = b.charCodeAt(l);
      C[l] = d > 96 ? d - 97 : d > 64 ? d - 39 : d + 4;
    }
    for (var p = 0, l = 0; l < b.length; ++l)
      C[p++] = C[l] < 60 ? a[C[l]] : (C[l] - 60) * 64 + C[++l];
    return C.buffer.slice(0, p);
  }
  function n(b, C, l, d, p, R, k) {
    var u = b.exports.sbrk, w = d + 3 & -4, m = u(w * p), F = u(R.length), L = new Uint8Array(b.exports.memory.buffer);
    L.set(R, F);
    var G = C(m, d, p, F, R.length);
    if (G == 0 && k && k(m, w, p), l.set(L.subarray(m, m + d * p)), u(m - u(0)), G != 0)
      throw new Error("Malformed buffer data: " + G);
  }
  var r = {
    NONE: "",
    OCTAHEDRAL: "meshopt_decodeFilterOct",
    QUATERNION: "meshopt_decodeFilterQuat",
    EXPONENTIAL: "meshopt_decodeFilterExp"
  }, c = {
    ATTRIBUTES: "meshopt_decodeVertexBuffer",
    TRIANGLES: "meshopt_decodeIndexBuffer",
    INDICES: "meshopt_decodeIndexSequence"
  }, g = [], B = 0;
  function E(b) {
    var C = {
      object: new Worker(b),
      pending: 0,
      requests: {}
    };
    return C.object.onmessage = function(l) {
      var d = l.data;
      C.pending -= d.count, C.requests[d.id][d.action](d.value), delete C.requests[d.id];
    }, C;
  }
  function h(b) {
    for (var C = "self.ready = WebAssembly.instantiate(new Uint8Array([" + new Uint8Array(t) + "]), {}).then(function(result) { result.instance.exports.__wasm_call_ctors(); return result.instance; });self.onmessage = " + f.name + ";" + n.toString() + f.toString(), l = new Blob([C], { type: "text/javascript" }), d = URL.createObjectURL(l), p = g.length; p < b; ++p)
      g[p] = E(d);
    for (var p = b; p < g.length; ++p)
      g[p].object.postMessage({});
    g.length = b, URL.revokeObjectURL(d);
  }
  function Q(b, C, l, d, p) {
    for (var R = g[0], k = 1; k < g.length; ++k)
      g[k].pending < R.pending && (R = g[k]);
    return new Promise(function(u, w) {
      var m = new Uint8Array(l), F = ++B;
      R.pending += b, R.requests[F] = { resolve: u, reject: w }, R.object.postMessage({ id: F, count: b, size: C, source: m, mode: d, filter: p }, [m.buffer]);
    });
  }
  function f(b) {
    var C = b.data;
    if (!C.id)
      return self.close();
    self.ready.then(function(l) {
      try {
        var d = new Uint8Array(C.count * C.size);
        n(l, l.exports[C.mode], d, C.count, C.size, C.source, l.exports[C.filter]), self.postMessage({ id: C.id, count: C.count, action: "resolve", value: d }, [d.buffer]);
      } catch (p) {
        self.postMessage({ id: C.id, count: C.count, action: "reject", value: p });
      }
    });
  }
  return {
    ready: i,
    supported: !0,
    useWorkers: function(b) {
      h(b);
    },
    decodeVertexBuffer: function(b, C, l, d, p) {
      n(s, s.exports.meshopt_decodeVertexBuffer, b, C, l, d, s.exports[r[p]]);
    },
    decodeIndexBuffer: function(b, C, l, d) {
      n(s, s.exports.meshopt_decodeIndexBuffer, b, C, l, d);
    },
    decodeIndexSequence: function(b, C, l, d) {
      n(s, s.exports.meshopt_decodeIndexSequence, b, C, l, d);
    },
    decodeGltfBuffer: function(b, C, l, d, p, R) {
      n(s, s.exports[c[p]], b, C, l, d, s.exports[r[R]]);
    },
    decodeGltfBufferAsync: function(b, C, l, d, p) {
      return g.length > 0 ? Q(b, C, l, c[d], r[p]) : i.then(function() {
        var R = new Uint8Array(b * C);
        return n(s, s.exports[c[d]], R, b, C, l, s.exports[r[p]]), R;
      });
    }
  };
})();
class li {
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
    const a = new pa(), t = new ti();
    if (t.setDecoderPath(ae.draco.decoderPath), a.setDRACOLoader(t), a.setMeshoptDecoder(hi), e) {
      const n = new j();
      n.setTranscoderPath(ae.basis.transcoderPath), n.detectSupport(e), a.setKTX2Loader(n);
    }
    const s = performance.now(), i = await a.loadAsync(A), o = performance.now() - s;
    return this.group = i.scene, this.normalize(), this.scene.add(this.group), this.clips = i.animations.map((n) => n.clone()) ?? [], this.clips.forEach((n) => {
      n.name = Qa(n.name);
    }), this.clips.length > 0 && (this.mixer = new oa(this.group)), o;
  }
  /**
   * Normalize model scale and position to fit within bounds
   */
  normalize() {
    if (!this.group) return;
    const A = new Re().setFromObject(this.group), e = A.getCenter(new J()), a = A.getSize(new J());
    let t = 1;
    const s = Math.max(a.x, a.z);
    s > 0 && (t = O.maxModelSize / s, this.group.scale.multiplyScalar(t)), this.group.position.sub(e.clone().multiplyScalar(t));
  }
  /**
   * Update animation mixer and state
   */
  update(A) {
    if (!this.mixer) return;
    this.mixer.update(A);
    const a = this.mixer._actions?.find((t) => t.isRunning?.() || t.paused);
    a && a.isRunning?.() && ra()(a.time ?? 0);
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
      duration: e.getClip?.()?.duration ?? 0
    } : {
      isPlaying: !1,
      trackName: null,
      time: 0,
      duration: 0
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
    let a = this.mixer._actions?.find((t) => t.getClip?.()?.name === A.trackName);
    if (!a) {
      const t = this.clips.find((s) => s.name === A.trackName);
      t && (a = this.mixer.clipAction(t), a.setEffectiveTimeScale(this.speed));
    }
    if (a) {
      const t = a.getClip?.()?.duration ?? 0;
      Math.abs(t - A.duration) < 0.01 && (a.isRunning() || a.play(), a.time = A.time, a.paused = !A.isPlaying);
    }
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
      const t = this.mixer._actions?.find((s) => s.isRunning?.() || s.paused);
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
  seek(A) {
    if (!this.mixer) return;
    const a = this.mixer._actions?.find((t) => t.isRunning?.() || t.paused);
    a && (a.time = A);
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
   * Dispose model resources
   */
  dispose() {
    this.mixer && (this.mixer.stopAllAction(), this.mixer = null), this.group && (this.scene.remove(this.group), this.group.traverse((A) => {
      A instanceof YA && (A.geometry?.dispose(), Array.isArray(A.material) ? A.material.forEach((e) => e.dispose()) : A.material?.dispose());
    }), this.group = null), this.clips = [];
  }
}
class ui {
  camera = null;
  renderer = null;
  clock = null;
  requestAnimationId = null;
  isWebGPU = !1;
  targetPosition = new J(0, 0, 0);
  targetLookAt = new J(0, 0, 0);
  currentLookAt = new J(0, 0, 0);
  fpsTracker = new ha();
  loadTime = 0;
  statsManager = null;
  environmentTexture = null;
  // Model sides (left is primary, right is comparator)
  sides = /* @__PURE__ */ new Map();
  // Comparator mode properties
  _comparatorMode = !1;
  _splitPosition = 0.5;
  // Animation comparison (updated when models are loaded)
  _areAnimationsEqual = null;
  async init(A, e) {
    this.clock = new ga();
    const a = new ie();
    if (a.background = null, this.sides.set(M.LEFT, {
      scene: a,
      model: null
    }), this.camera = new me(
      O.fov,
      A.width / A.height,
      O.cameraNear,
      O.cameraFar
    ), this.camera.lookAt(new J(O.initialCameraTarget.x, O.initialCameraTarget.y, O.initialCameraTarget.z)), this.isWebGPU = e === ca.WebGPU, this.isWebGPU) {
      const t = await import("./three.webgpu-DoSEQW1u.js");
      this.renderer = new t.WebGPURenderer({
        canvas: A,
        antialias: !0,
        alpha: !0
      }), await this.renderer.init();
    } else
      this.renderer = new se({ canvas: A, antialias: !0, alpha: !0, premultipliedAlpha: !0, preserveDrawingBuffer: !1 });
    this.renderer.setSize(A.width, A.height), this.renderer.setPixelRatio(window.devicePixelRatio), this.renderer.autoClear = !0, this.renderer.toneMapping = ne, this.renderer.toneMappingExposure = O.toneMappingExposure, this.renderer.outputColorSpace = W, this.isWebGPU || (this.statsManager = new la(), this.statsManager.init(A)), this.animate();
  }
  async loadModel(A) {
    await this.loadModelToSideInternal(A, M.LEFT);
  }
  async loadModelToSideInternal(A, e) {
    const a = this.sides.get(e);
    if (a) {
      a.model && a.model.dispose(), a.model = new li(a.scene);
      try {
        this.loadTime = await a.model.load(A, this.renderer ?? void 0), this.updateAnimationsComparison();
      } catch (t) {
        throw console.error(`Error loading GLB for ${e} side:`, t), t;
      }
      if (e === M.RIGHT && this._comparatorMode && this._areAnimationsEqual) {
        const s = this.sides.get(M.LEFT)?.model?.getAnimationState();
        s?.trackName && (a.model.playTrack(s.trackName), a.model.setAnimationState(s));
      }
    }
  }
  /**
   * Update animation comparison when models change
   */
  updateAnimationsComparison() {
    const A = this.sides.get(M.LEFT)?.model, e = this.sides.get(M.RIGHT)?.model;
    A && e ? this._areAnimationsEqual = A.hasEqualAnimations(e) : this._areAnimationsEqual = null;
  }
  /**
   * Check if left and right models have equal animations.
   * Returns null if both models are not loaded.
   */
  get areAnimationsEqual() {
    return this._areAnimationsEqual;
  }
  async loadEnvironment(A) {
    const e = this.sides.get(M.LEFT);
    if (!e) return;
    this.environmentTexture && (this.environmentTexture.dispose(), this.environmentTexture = null);
    const a = new fa();
    try {
      const t = await a.loadAsync(A);
      if (t.mapping = Ia, this.isWebGPU) {
        this.environmentTexture = t, e.scene.environment = t;
        const s = this.sides.get(M.RIGHT);
        s && (s.scene.environment = t);
      } else if (this.renderer instanceof se) {
        const s = new Ba(this.renderer);
        s.compileEquirectangularShader();
        const i = s.fromEquirectangular(t).texture;
        this.environmentTexture = i, e.scene.environment = i, e.scene.environmentIntensity = O.environmentIntensity;
        const o = this.sides.get(M.RIGHT);
        o && (o.scene.environment = i, o.scene.environmentIntensity = O.environmentIntensity), t.dispose(), s.dispose();
      }
    } catch (t) {
      throw console.error("Error loading HDR environment:", t), t;
    }
  }
  resize(A, e) {
    if (A <= 0 || e <= 0) {
      console.warn("Invalid resize dimensions:", { width: A, height: e });
      return;
    }
    if (this.camera && this.renderer) {
      this.camera.aspect = A / e, this.camera.updateProjectionMatrix(), this.renderer.setPixelRatio(window.devicePixelRatio), this.renderer.setSize(A, e, !0);
      const a = this.sides.get(M.LEFT);
      a && this.renderer.render(a.scene, this.camera);
    }
  }
  getStats() {
    if (!this.renderer)
      return Ea;
    const A = this.renderer.info;
    return {
      fps: this.fpsTracker.fps,
      drawCalls: A?.render.calls ?? 0,
      loadTimeMs: this.loadTime,
      gpuTimeMs: this.statsManager?.getGPUTime() ?? void 0
    };
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
        case "linear":
          this.renderer.toneMapping = da;
          break;
        case "reinhard":
          this.renderer.toneMapping = ba;
          break;
        case "aces":
          this.renderer.toneMapping = Ca;
          break;
        case "neutral":
        default:
          this.renderer.toneMapping = ne;
          break;
      }
  }
  // Comparator Mode Methods
  enableComparatorMode(A) {
    const e = this.sides.get(M.LEFT);
    if (this._comparatorMode || !this.renderer || !e) return;
    this._comparatorMode = !0, this._splitPosition = A;
    const a = new ie();
    a.background = null, a.environment = e.scene.environment, e.scene.environmentIntensity !== void 0 && (a.environmentIntensity = e.scene.environmentIntensity), this.sides.set(M.RIGHT, {
      scene: a,
      model: null
    });
  }
  disableComparatorMode() {
    if (!this._comparatorMode) return;
    this._comparatorMode = !1, this._areAnimationsEqual = null;
    const A = this.sides.get(M.RIGHT);
    A?.model && A.model.dispose(), this.sides.delete(M.RIGHT);
  }
  setSplitPosition(A) {
    this._splitPosition = A;
  }
  async loadModelToSide(A, e) {
    await this.loadModelToSideInternal(A, e);
  }
  isComparatorModeActive() {
    return this._comparatorMode;
  }
  dispose() {
    this.requestAnimationId !== null && (cancelAnimationFrame(this.requestAnimationId), this.requestAnimationId = null), this.disableComparatorMode(), this.environmentTexture && (this.environmentTexture.dispose(), this.environmentTexture = null);
    for (const [, A] of this.sides)
      A.model && A.model.dispose(), A.scene.traverse((e) => {
        e instanceof YA && (e.geometry?.dispose(), e.material && (Array.isArray(e.material) ? e.material.forEach((a) => this.disposeMaterial(a)) : this.disposeMaterial(e.material)));
      });
    this.sides.clear(), this.statsManager && (this.statsManager.dispose(), this.statsManager = null), this.renderer?.dispose?.(), this.camera = null, this.renderer = null, this.clock = null;
  }
  animate = () => {
    this.requestAnimationId = requestAnimationFrame(this.animate), this.fpsTracker.update();
    const A = this.sides.get(M.LEFT);
    if (this.clock) {
      const e = this.clock.getDelta();
      for (const a of this.sides.values())
        a.model?.update(e);
    }
    if (this.renderer && A && this.camera)
      try {
        this.camera.position.lerp(this.targetPosition, O.cameraLerpFactor), this.currentLookAt.lerp(this.targetLookAt, O.cameraLerpFactor), this.camera.lookAt(this.currentLookAt), this.statsManager && this.statsManager.begin();
        const e = this.sides.get(M.RIGHT);
        if (this._comparatorMode && e) {
          const a = this.renderer, t = new PA();
          a.getSize(t);
          const s = t.x, i = t.y, o = Math.floor(s * this._splitPosition);
          a.setViewport(0, 0, s, i), a.setScissorTest(!0), a.setScissor(0, 0, o, i), a.render(A.scene, this.camera), a.setScissor(o, 0, s - o, i), a.render(e.scene, this.camera), a.setScissorTest(!1);
        } else
          this.renderer.render(A.scene, this.camera);
        this.statsManager && (this.statsManager.end(), this.statsManager.update());
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
  // Animation API - delegates to Model class
  // When animations are equal, operations on LEFT are mirrored to RIGHT
  getAnimationState() {
    return this.sides.get(M.LEFT)?.model?.getAnimationState() ?? { isPlaying: !1, trackName: null, time: 0, duration: 0 };
  }
  setAnimationState(A) {
    this.sides.get(M.LEFT)?.model?.setAnimationState(A), this._areAnimationsEqual && this.sides.get(M.RIGHT)?.model?.setAnimationState(A);
  }
  playAnimationTrack(A) {
    this.sides.get(M.LEFT)?.model?.playTrack(A), this._areAnimationsEqual && this.sides.get(M.RIGHT)?.model?.playTrack(A);
  }
  setAnimationPlaying(A) {
    this.sides.get(M.LEFT)?.model?.setPlaying(A), this._areAnimationsEqual && this.sides.get(M.RIGHT)?.model?.setPlaying(A);
  }
  seekAnimation(A) {
    this.sides.get(M.LEFT)?.model?.seek(A), this._areAnimationsEqual && this.sides.get(M.RIGHT)?.model?.seek(A);
  }
  setAnimationSpeed(A) {
    this.sides.get(M.LEFT)?.model?.setSpeed(A), this._areAnimationsEqual && this.sides.get(M.RIGHT)?.model?.setSpeed(A);
  }
  getAnimationTracks() {
    return this.sides.get(M.LEFT)?.model?.getAnimationTracks() ?? [];
  }
}
export {
  ui as ThreeAdapter
};
