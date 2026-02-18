import { eh as Dt, ei as vt, ej as Ft, ek as Ut } from "./index-1fHvDm8K.js";
var ss = class {
  _listeners = {};
  addEventListener(i, e) {
    const t = this._listeners;
    return t[i] === void 0 && (t[i] = []), t[i].indexOf(e) === -1 && t[i].push(e), this;
  }
  removeEventListener(i, e) {
    const t = this._listeners[i];
    if (t !== void 0) {
      const n = t.indexOf(e);
      n !== -1 && t.splice(n, 1);
    }
    return this;
  }
  dispatchEvent(i) {
    const e = this._listeners[i.type];
    if (e !== void 0) {
      const t = e.slice(0);
      for (let n = 0, s = t.length; n < s; n++) t[n].call(this, i);
    }
    return this;
  }
  dispose() {
    for (const i in this._listeners) delete this._listeners[i];
  }
}, Pe = class {
  _disposed = !1;
  _name;
  _parent;
  _child;
  _attributes;
  constructor(i, e, t, n = {}) {
    if (this._name = i, this._parent = e, this._child = t, this._attributes = n, !e.isOnGraph(t)) throw new Error("Cannot connect disconnected graphs.");
  }
  /** Name (attribute name from parent {@link GraphNode}). */
  getName() {
    return this._name;
  }
  /** Owner node. */
  getParent() {
    return this._parent;
  }
  /** Resource node. */
  getChild() {
    return this._child;
  }
  /**
  * Sets the child node.
  *
  * @internal Only {@link Graph} implementations may safely call this method directly. Use
  * 	{@link Property.swap} or {@link Graph.swapChild} instead.
  */
  setChild(i) {
    return this._child = i, this;
  }
  /** Attributes of the graph node relationship. */
  getAttributes() {
    return this._attributes;
  }
  /** Destroys a (currently intact) edge, updating both the graph and the owner. */
  dispose() {
    this._disposed || (this._parent._destroyRef(this), this._disposed = !0);
  }
  /** Whether this link has been destroyed. */
  isDisposed() {
    return this._disposed;
  }
}, gn = class extends ss {
  _emptySet = /* @__PURE__ */ new Set();
  _edges = /* @__PURE__ */ new Set();
  _parentEdges = /* @__PURE__ */ new Map();
  _childEdges = /* @__PURE__ */ new Map();
  /** Returns a list of all parent->child edges on this graph. */
  listEdges() {
    return Array.from(this._edges);
  }
  /** Returns a list of all edges on the graph having the given node as their child. */
  listParentEdges(i) {
    return Array.from(this._childEdges.get(i) || this._emptySet);
  }
  /** Returns a list of parent nodes for the given child node. */
  listParents(i) {
    const e = /* @__PURE__ */ new Set();
    for (const t of this.listParentEdges(i)) e.add(t.getParent());
    return Array.from(e);
  }
  /** Returns a list of all edges on the graph having the given node as their parent. */
  listChildEdges(i) {
    return Array.from(this._parentEdges.get(i) || this._emptySet);
  }
  /** Returns a list of child nodes for the given parent node. */
  listChildren(i) {
    const e = /* @__PURE__ */ new Set();
    for (const t of this.listChildEdges(i)) e.add(t.getChild());
    return Array.from(e);
  }
  disconnectParents(i, e) {
    for (const t of this.listParentEdges(i)) (!e || e(t.getParent())) && t.dispose();
    return this;
  }
  /**********************************************************************************************
  * Internal.
  */
  /**
  * Creates a {@link GraphEdge} connecting two {@link GraphNode} instances. Edge is returned
  * for the caller to store.
  * @param a Owner
  * @param b Resource
  * @hidden
  * @internal
  */
  _createEdge(i, e, t, n) {
    const s = new Pe(i, e, t, n);
    this._edges.add(s);
    const r = s.getParent();
    this._parentEdges.has(r) || this._parentEdges.set(r, /* @__PURE__ */ new Set()), this._parentEdges.get(r).add(s);
    const o = s.getChild();
    return this._childEdges.has(o) || this._childEdges.set(o, /* @__PURE__ */ new Set()), this._childEdges.get(o).add(s), s;
  }
  /**
  * Detaches a {@link GraphEdge} from the {@link Graph}. Before calling this
  * method, ensure that the GraphEdge has first been detached from any
  * associated {@link GraphNode} attributes.
  * @hidden
  * @internal
  */
  _destroyEdge(i) {
    return this._edges.delete(i), this._parentEdges.get(i.getParent()).delete(i), this._childEdges.get(i.getChild()).delete(i), this;
  }
}, we = class {
  list = [];
  constructor(i) {
    if (i) for (const e of i) this.list.push(e);
  }
  add(i) {
    this.list.push(i);
  }
  remove(i) {
    const e = this.list.indexOf(i);
    e >= 0 && this.list.splice(e, 1);
  }
  removeChild(i) {
    const e = [];
    for (const t of this.list) t.getChild() === i && e.push(t);
    for (const t of e) this.remove(t);
    return e;
  }
  listRefsByChild(i) {
    const e = [];
    for (const t of this.list) t.getChild() === i && e.push(t);
    return e;
  }
  values() {
    return this.list;
  }
}, V = class {
  set = /* @__PURE__ */ new Set();
  map = /* @__PURE__ */ new Map();
  constructor(i) {
    if (i) for (const e of i) this.add(e);
  }
  add(i) {
    const e = i.getChild();
    this.removeChild(e), this.set.add(i), this.map.set(e, i);
  }
  remove(i) {
    this.set.delete(i), this.map.delete(i.getChild());
  }
  removeChild(i) {
    const e = this.map.get(i) || null;
    return e && this.remove(e), e;
  }
  getRefByChild(i) {
    return this.map.get(i) || null;
  }
  values() {
    return Array.from(this.set);
  }
}, ce = class {
  map = {};
  constructor(i) {
    i && Object.assign(this.map, i);
  }
  set(i, e) {
    this.map[i] = e;
  }
  delete(i) {
    delete this.map[i];
  }
  get(i) {
    return this.map[i] || null;
  }
  keys() {
    return Object.keys(this.map);
  }
  values() {
    return Object.values(this.map);
  }
};
const B = /* @__PURE__ */ Symbol("attributes"), De = /* @__PURE__ */ Symbol("immutableKeys");
var pn = class ns extends ss {
  _disposed = !1;
  /**
  * Internal graph used to search and maintain references.
  * @hidden
  */
  graph;
  /**
  * Attributes (literal values and GraphNode references) associated with this instance. For each
  * GraphNode reference, the attributes stores a {@link GraphEdge}. List and Map references are
  * stored as arrays and dictionaries of edges.
  * @internal
  */
  [B];
  /**
  * Attributes included with `getDefaultAttributes` are considered immutable, and cannot be
  * modifed by `.setRef()`, `.copy()`, or other GraphNode methods. Both the edges and the
  * properties will be disposed with the parent GraphNode.
  *
  * Currently, only single-edge references (getRef/setRef) are supported as immutables.
  *
  * @internal
  */
  [De];
  constructor(e) {
    super(), this.graph = e, this[De] = /* @__PURE__ */ new Set(), this[B] = this._createAttributes();
  }
  /**
  * Returns default attributes for the graph node. Subclasses having any attributes (either
  * literal values or references to other graph nodes) must override this method. Literal
  * attributes should be given their default values, if any. References should generally be
  * initialized as empty (Ref → null, RefList → [], RefMap → {}) and then modified by setters.
  *
  * Any single-edge references (setRef) returned by this method will be considered immutable,
  * to be owned by and disposed with the parent node. Multi-edge references (addRef, removeRef,
  * setRefMap) cannot be returned as default attributes.
  */
  getDefaults() {
    return {};
  }
  /**
  * Constructs and returns an object used to store a graph nodes attributes. Compared to the
  * default Attributes interface, this has two distinctions:
  *
  * 1. Slots for GraphNode<T> objects are replaced with slots for GraphEdge<this, GraphNode<T>>
  * 2. GraphNode<T> objects provided as defaults are considered immutable
  *
  * @internal
  */
  _createAttributes() {
    const e = this.getDefaults(), t = {};
    for (const n in e) {
      const s = e[n];
      if (s instanceof ns) {
        const r = this.graph._createEdge(n, this, s);
        this[De].add(n), t[n] = r;
      } else t[n] = s;
    }
    return t;
  }
  /** @internal Returns true if two nodes are on the same {@link Graph}. */
  isOnGraph(e) {
    return this.graph === e.graph;
  }
  /** Returns true if the node has been permanently removed from the graph. */
  isDisposed() {
    return this._disposed;
  }
  /**
  * Removes both inbound references to and outbound references from this object. At the end
  * of the process the object holds no references, and nothing holds references to it. A
  * disposed object is not reusable.
  */
  dispose() {
    this._disposed || (this.graph.listChildEdges(this).forEach((e) => e.dispose()), this.graph.disconnectParents(this), this._disposed = !0, this.dispatchEvent({ type: "dispose" }));
  }
  /**
  * Removes all inbound references to this object. At the end of the process the object is
  * considered 'detached': it may hold references to child resources, but nothing holds
  * references to it. A detached object may be re-attached.
  */
  detach() {
    return this.graph.disconnectParents(this), this;
  }
  /**
  * Transfers this object's references from the old node to the new one. The old node is fully
  * detached from this parent at the end of the process.
  *
  * @hidden
  */
  swap(e, t) {
    for (const n in this[B]) {
      const s = this[B][n];
      if (s instanceof Pe) {
        const r = s;
        r.getChild() === e && this.setRef(n, t, r.getAttributes());
      } else if (s instanceof we) for (const r of s.listRefsByChild(e)) {
        const o = r.getAttributes();
        this.removeRef(n, e), this.addRef(n, t, o);
      }
      else if (s instanceof V) {
        const r = s.getRefByChild(e);
        if (r) {
          const o = r.getAttributes();
          this.removeRef(n, e), this.addRef(n, t, o);
        }
      } else if (s instanceof ce) for (const r of s.keys()) {
        const o = s.get(r);
        o.getChild() === e && this.setRefMap(n, r, t, o.getAttributes());
      }
    }
    return this;
  }
  /**********************************************************************************************
  * Literal attributes.
  */
  /** @hidden */
  get(e) {
    return this[B][e];
  }
  /** @hidden */
  set(e, t) {
    return this[B][e] = t, this.dispatchEvent({
      type: "change",
      attribute: e
    });
  }
  /**********************************************************************************************
  * Ref: 1:1 graph node references.
  */
  /** @hidden */
  getRef(e) {
    const t = this[B][e];
    return t ? t.getChild() : null;
  }
  /** @hidden */
  setRef(e, t, n) {
    if (this[De].has(e)) throw new Error(`Cannot overwrite immutable attribute, "${e}".`);
    const s = this[B][e];
    if (s && s.dispose(), !t) return this;
    const r = this.graph._createEdge(e, this, t, n);
    return this[B][e] = r, this.dispatchEvent({
      type: "change",
      attribute: e
    });
  }
  /**********************************************************************************************
  * RefList: 1:many graph node references.
  */
  /** @hidden */
  listRefs(e) {
    return this.assertRefList(e).values().map((t) => t.getChild());
  }
  /** @hidden */
  addRef(e, t, n) {
    const s = this.graph._createEdge(e, this, t, n);
    return this.assertRefList(e).add(s), this.dispatchEvent({
      type: "change",
      attribute: e
    });
  }
  /** @hidden */
  removeRef(e, t) {
    const n = this.assertRefList(e);
    if (n instanceof we) for (const s of n.listRefsByChild(t)) s.dispose();
    else {
      const s = n.getRefByChild(t);
      s && s.dispose();
    }
    return this;
  }
  /** @hidden */
  assertRefList(e) {
    const t = this[B][e];
    if (t instanceof we || t instanceof V) return t;
    throw new Error(`Expected RefList or RefSet for attribute "${e}"`);
  }
  /**********************************************************************************************
  * RefMap: Named 1:many (map) graph node references.
  */
  /** @hidden */
  listRefMapKeys(e) {
    return this.assertRefMap(e).keys();
  }
  /** @hidden */
  listRefMapValues(e) {
    return this.assertRefMap(e).values().map((t) => t.getChild());
  }
  /** @hidden */
  getRefMap(e, t) {
    const n = this.assertRefMap(e).get(t);
    return n ? n.getChild() : null;
  }
  /** @hidden */
  setRefMap(e, t, n, s) {
    const r = this.assertRefMap(e), o = r.get(t);
    if (o && o.dispose(), !n) return this;
    s = Object.assign(s || {}, { key: t });
    const a = this.graph._createEdge(e, this, n, {
      ...s,
      key: t
    });
    return r.set(t, a), this.dispatchEvent({
      type: "change",
      attribute: e,
      key: t
    });
  }
  /** @hidden */
  assertRefMap(e) {
    const t = this[B][e];
    if (t instanceof ce) return t;
    throw new Error(`Expected RefMap for attribute "${e}"`);
  }
  /**********************************************************************************************
  * Events.
  */
  /**
  * Dispatches an event on the GraphNode, and on the associated
  * Graph. Event types on the graph are prefixed, `"node:[type]"`.
  */
  dispatchEvent(e) {
    return super.dispatchEvent({
      ...e,
      target: this
    }), this.graph.dispatchEvent({
      ...e,
      target: this,
      type: `node:${e.type}`
    }), this;
  }
  /**********************************************************************************************
  * Internal.
  */
  /** @hidden */
  _destroyRef(e) {
    const t = e.getName();
    if (this[B][t] === e)
      this[B][t] = null, this[De].has(t) && e.getChild().dispose();
    else if (this[B][t] instanceof we) this[B][t].remove(e);
    else if (this[B][t] instanceof V) this[B][t].remove(e);
    else if (this[B][t] instanceof ce) {
      const n = this[B][t];
      for (const s of n.keys()) n.get(s) === e && n.delete(s);
    } else return;
    this.graph._destroyEdge(e), this.dispatchEvent({
      type: "change",
      attribute: t
    });
  }
};
const rs = "v4.3.0", ke = "@glb.bin";
var d;
(function(i) {
  i.ACCESSOR = "Accessor", i.ANIMATION = "Animation", i.ANIMATION_CHANNEL = "AnimationChannel", i.ANIMATION_SAMPLER = "AnimationSampler", i.BUFFER = "Buffer", i.CAMERA = "Camera", i.MATERIAL = "Material", i.MESH = "Mesh", i.PRIMITIVE = "Primitive", i.PRIMITIVE_TARGET = "PrimitiveTarget", i.NODE = "Node", i.ROOT = "Root", i.SCENE = "Scene", i.SKIN = "Skin", i.TEXTURE = "Texture", i.TEXTURE_INFO = "TextureInfo";
})(d || (d = {}));
var ct;
(function(i) {
  i.INTERLEAVED = "interleaved", i.SEPARATE = "separate";
})(ct || (ct = {}));
var te;
(function(i) {
  i.ARRAY_BUFFER = "ARRAY_BUFFER", i.ELEMENT_ARRAY_BUFFER = "ELEMENT_ARRAY_BUFFER", i.INVERSE_BIND_MATRICES = "INVERSE_BIND_MATRICES", i.OTHER = "OTHER", i.SPARSE = "SPARSE";
})(te || (te = {}));
var ae;
(function(i) {
  i[i.R = 4096] = "R", i[i.G = 256] = "G", i[i.B = 16] = "B", i[i.A = 1] = "A";
})(ae || (ae = {}));
var Ce;
(function(i) {
  i.GLTF = "GLTF", i.GLB = "GLB";
})(Ce || (Ce = {}));
const lt = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
};
class D {
  /** Creates a byte array from a Data URI. */
  static createBufferFromDataURI(e) {
    if (typeof Buffer > "u") {
      const t = atob(e.split(",")[1]), n = new Uint8Array(t.length);
      for (let s = 0; s < t.length; s++)
        n[s] = t.charCodeAt(s);
      return n;
    } else {
      const t = e.split(",")[1], n = e.indexOf("base64") >= 0;
      return Buffer.from(t, n ? "base64" : "utf8");
    }
  }
  /** Encodes text to a byte array. */
  static encodeText(e) {
    return new TextEncoder().encode(e);
  }
  /** Decodes a byte array to text. */
  static decodeText(e) {
    return new TextDecoder().decode(e);
  }
  /**
   * Concatenates N byte arrays.
   */
  static concat(e) {
    let t = 0;
    for (const r of e)
      t += r.byteLength;
    const n = new Uint8Array(t);
    let s = 0;
    for (const r of e)
      n.set(r, s), s += r.byteLength;
    return n;
  }
  /**
   * Pads a Uint8Array to the next 4-byte boundary.
   *
   * Reference: [glTF → Data Alignment](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#data-alignment)
   */
  static pad(e, t = 0) {
    const n = this.padNumber(e.byteLength);
    if (n === e.byteLength) return e;
    const s = new Uint8Array(n);
    if (s.set(e), t !== 0)
      for (let r = e.byteLength; r < n; r++)
        s[r] = t;
    return s;
  }
  /** Pads a number to 4-byte boundaries. */
  static padNumber(e) {
    return Math.ceil(e / 4) * 4;
  }
  /** Returns true if given byte array instances are equal. */
  static equals(e, t) {
    if (e === t) return !0;
    if (e.byteLength !== t.byteLength) return !1;
    let n = e.byteLength;
    for (; n--; )
      if (e[n] !== t[n]) return !1;
    return !0;
  }
  /**
   * Returns a Uint8Array view of a typed array, with the same underlying ArrayBuffer.
   *
   * A shorthand for:
   *
   * ```js
   * const buffer = new Uint8Array(
   * 	array.buffer,
   * 	array.byteOffset + byteOffset,
   * 	Math.min(array.byteLength, byteLength)
   * );
   * ```
   *
   */
  static toView(e, t = 0, n = 1 / 0) {
    return new Uint8Array(e.buffer, e.byteOffset + t, Math.min(e.byteLength, n));
  }
  static assertView(e) {
    if (e && !ArrayBuffer.isView(e))
      throw new Error(`Method requires Uint8Array parameter; received "${typeof e}".`);
    return e;
  }
}
class ni {
  /**
   * Converts sRGB hexadecimal to linear components.
   * @typeParam T vec3 or vec4 linear components.
   */
  static hexToFactor(e, t) {
    e = Math.floor(e);
    const n = t;
    return n[0] = (e >> 16 & 255) / 255, n[1] = (e >> 8 & 255) / 255, n[2] = (e & 255) / 255, this.convertSRGBToLinear(t, t);
  }
  /**
   * Converts linear components to sRGB hexadecimal.
   * @typeParam T vec3 or vec4 linear components.
   */
  static factorToHex(e) {
    const t = [...e], [n, s, r] = this.convertLinearToSRGB(e, t);
    return n * 255 << 16 ^ s * 255 << 8 ^ r * 255 << 0;
  }
  /**
   * Converts sRGB components to linear components.
   * @typeParam T vec3 or vec4 linear components.
   */
  static convertSRGBToLinear(e, t) {
    const n = e, s = t;
    for (let r = 0; r < 3; r++)
      s[r] = n[r] < 0.04045 ? n[r] * 0.0773993808 : Math.pow(n[r] * 0.9478672986 + 0.0521327014, 2.4);
    return t;
  }
  /**
   * Converts linear components to sRGB components.
   * @typeParam T vec3 or vec4 linear components.
   */
  static convertLinearToSRGB(e, t) {
    const n = e, s = t;
    for (let r = 0; r < 3; r++)
      s[r] = n[r] < 31308e-7 ? n[r] * 12.92 : 1.055 * Math.pow(n[r], 0.41666) - 0.055;
    return t;
  }
}
class Tn {
  match(e) {
    return e.length >= 3 && e[0] === 255 && e[1] === 216 && e[2] === 255;
  }
  getSize(e) {
    let t = new DataView(e.buffer, e.byteOffset + 4), n, s;
    for (; t.byteLength; ) {
      if (n = t.getUint16(0, !1), xn(t, n), s = t.getUint8(n + 1), s === 192 || s === 193 || s === 194)
        return [t.getUint16(n + 7, !1), t.getUint16(n + 5, !1)];
      t = new DataView(e.buffer, t.byteOffset + n + 2);
    }
    throw new TypeError("Invalid JPG, no size found");
  }
  getChannels(e) {
    return 3;
  }
}
class ht {
  match(e) {
    return e.length >= 8 && e[0] === 137 && e[1] === 80 && e[2] === 78 && e[3] === 71 && e[4] === 13 && e[5] === 10 && e[6] === 26 && e[7] === 10;
  }
  getSize(e) {
    const t = new DataView(e.buffer, e.byteOffset);
    return D.decodeText(e.slice(12, 16)) === ht.PNG_FRIED_CHUNK_NAME ? [t.getUint32(32, !1), t.getUint32(36, !1)] : [t.getUint32(16, !1), t.getUint32(20, !1)];
  }
  getChannels(e) {
    return 4;
  }
}
ht.PNG_FRIED_CHUNK_NAME = "CgBI";
class ue {
  /** Registers support for a new image format; useful for certain extensions. */
  static registerFormat(e, t) {
    this.impls[e] = t;
  }
  /**
   * Returns detected MIME type of the given image buffer. Note that for image
   * formats with support provided by extensions, the extension must be
   * registered with an I/O class before it can be detected by ImageUtils.
   */
  static getMimeType(e) {
    for (const t in this.impls)
      if (this.impls[t].match(e))
        return t;
    return null;
  }
  /** Returns the dimensions of the image. */
  static getSize(e, t) {
    return this.impls[t] ? this.impls[t].getSize(e) : null;
  }
  /**
   * Returns a conservative estimate of the number of channels in the image. For some image
   * formats, the method may return 4 indicating the possibility of an alpha channel, without
   * the ability to guarantee that an alpha channel is present.
   */
  static getChannels(e, t) {
    return this.impls[t] ? this.impls[t].getChannels(e) : null;
  }
  /** Returns a conservative estimate of the GPU memory required by this image. */
  static getVRAMByteLength(e, t) {
    if (!this.impls[t]) return null;
    if (this.impls[t].getVRAMByteLength)
      return this.impls[t].getVRAMByteLength(e);
    let n = 0;
    const s = 4, r = this.getSize(e, t);
    if (!r) return null;
    for (; r[0] > 1 || r[1] > 1; )
      n += r[0] * r[1] * s, r[0] = Math.max(Math.floor(r[0] / 2), 1), r[1] = Math.max(Math.floor(r[1] / 2), 1);
    return n += 1 * s, n;
  }
  /** Returns the preferred file extension for the given MIME type. */
  static mimeTypeToExtension(e) {
    return e === "image/jpeg" ? "jpg" : e.split("/").pop();
  }
  /** Returns the MIME type for the given file extension. */
  static extensionToMimeType(e) {
    return e === "jpg" ? "image/jpeg" : e ? `image/${e}` : "";
  }
}
ue.impls = {
  "image/jpeg": new Tn(),
  "image/png": new ht()
};
function xn(i, e) {
  if (e > i.byteLength)
    throw new TypeError("Corrupt JPG, exceeded buffer limits");
  if (i.getUint8(e) !== 255)
    throw new TypeError("Invalid JPG, marker table corrupted");
  return i;
}
class Ge {
  /**
   * Extracts the basename from a file path, e.g. "folder/model.glb" -> "model".
   * See: {@link HTTPUtils.basename}
   */
  static basename(e) {
    const t = e.split(/[\\/]/).pop();
    return t.substring(0, t.lastIndexOf("."));
  }
  /**
   * Extracts the extension from a file path, e.g. "folder/model.glb" -> "glb".
   * See: {@link HTTPUtils.extension}
   */
  static extension(e) {
    if (e.startsWith("data:image/")) {
      const t = e.match(/data:(image\/\w+)/)[1];
      return ue.mimeTypeToExtension(t);
    } else {
      if (e.startsWith("data:model/gltf+json"))
        return "gltf";
      if (e.startsWith("data:model/gltf-binary"))
        return "glb";
      if (e.startsWith("data:application/"))
        return "bin";
    }
    return e.split(/[\\/]/).pop().split(/[.]/).pop();
  }
}
var Et = typeof Float32Array < "u" ? Float32Array : Array;
function mn() {
  var i = new Et(3);
  return Et != Float32Array && (i[0] = 0, i[1] = 0, i[2] = 0), i;
}
function pt(i) {
  var e = i[0], t = i[1], n = i[2];
  return Math.sqrt(e * e + t * t + n * n);
}
function En(i, e, t) {
  var n = e[0], s = e[1], r = e[2], o = t[3] * n + t[7] * s + t[11] * r + t[15];
  return o = o || 1, i[0] = (t[0] * n + t[4] * s + t[8] * r + t[12]) / o, i[1] = (t[1] * n + t[5] * s + t[9] * r + t[13]) / o, i[2] = (t[2] * n + t[6] * s + t[10] * r + t[14]) / o, i;
}
(function() {
  var i = mn();
  return function(e, t, n, s, r, o) {
    var a, c;
    for (t || (t = 3), n || (n = 0), s ? c = Math.min(s * t + n, e.length) : c = e.length, a = n; a < c; a += t)
      i[0] = e[a], i[1] = e[a + 1], i[2] = e[a + 2], r(i, i, o), e[a] = i[0], e[a + 1] = i[1], e[a + 2] = i[2];
    return e;
  };
})();
function Rn(i) {
  const e = is(), t = i.propertyType === d.NODE ? [i] : i.listChildren();
  for (const n of t)
    n.traverse((s) => {
      const r = s.getMesh();
      if (!r) return;
      const o = yn(r, s.getWorldMatrix());
      o.min.every(isFinite) && o.max.every(isFinite) && (Rt(o.min, e), Rt(o.max, e));
    });
  return e;
}
function yn(i, e) {
  const t = is();
  for (const n of i.listPrimitives()) {
    const s = n.getAttribute("POSITION"), r = n.getIndices();
    if (!s) continue;
    let o = [0, 0, 0], a = [0, 0, 0];
    for (let c = 0, u = r ? r.getCount() : s.getCount(); c < u; c++) {
      const h = r ? r.getScalar(c) : c;
      o = s.getElement(h, o), a = En(a, o, e), Rt(a, t);
    }
  }
  return t;
}
function Rt(i, e) {
  for (let t = 0; t < 3; t++)
    e.min[t] = Math.min(i[t], e.min[t]), e.max[t] = Math.max(i[t], e.max[t]);
}
function is() {
  return {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
}
const Bt = "https://null.example";
class We {
  static dirname(e) {
    const t = e.lastIndexOf("/");
    return t === -1 ? "./" : e.substring(0, t + 1);
  }
  /**
   * Extracts the basename from a URL, e.g. "folder/model.glb" -> "model".
   * See: {@link FileUtils.basename}
   */
  static basename(e) {
    return Ge.basename(new URL(e, Bt).pathname);
  }
  /**
   * Extracts the extension from a URL, e.g. "folder/model.glb" -> "glb".
   * See: {@link FileUtils.extension}
   */
  static extension(e) {
    return Ge.extension(new URL(e, Bt).pathname);
  }
  static resolve(e, t) {
    if (!this.isRelativePath(t)) return t;
    const n = e.split("/"), s = t.split("/");
    n.pop();
    for (let r = 0; r < s.length; r++)
      s[r] !== "." && (s[r] === ".." ? n.pop() : n.push(s[r]));
    return n.join("/");
  }
  /**
   * Returns true for URLs containing a protocol, and false for both
   * absolute and relative paths.
   */
  static isAbsoluteURL(e) {
    return this.PROTOCOL_REGEXP.test(e);
  }
  /**
   * Returns true for paths that are declared relative to some unknown base
   * path. For example, "foo/bar/" is relative both "/foo/bar/" is not.
   */
  static isRelativePath(e) {
    return !/^(?:[a-zA-Z]+:)?\//.test(e);
  }
}
We.DEFAULT_INIT = {};
We.PROTOCOL_REGEXP = /^[a-zA-Z]+:\/\//;
function Lt(i) {
  return Object.prototype.toString.call(i) === "[object Object]";
}
function ve(i) {
  if (Lt(i) === !1) return !1;
  const e = i.constructor;
  if (e === void 0) return !0;
  const t = e.prototype;
  return !(Lt(t) === !1 || Object.hasOwn(t, "isPrototypeOf") === !1);
}
var yt, It;
(function(i) {
  i[i.SILENT = 4] = "SILENT", i[i.ERROR = 3] = "ERROR", i[i.WARN = 2] = "WARN", i[i.INFO = 1] = "INFO", i[i.DEBUG = 0] = "DEBUG";
})(It || (It = {}));
class oe {
  /** Constructs a new Logger instance. */
  constructor(e) {
    this.verbosity = void 0, this.verbosity = e;
  }
  /** Logs an event at level {@link Logger.Verbosity.DEBUG}. */
  debug(e) {
    this.verbosity <= oe.Verbosity.DEBUG && console.debug(e);
  }
  /** Logs an event at level {@link Logger.Verbosity.INFO}. */
  info(e) {
    this.verbosity <= oe.Verbosity.INFO && console.info(e);
  }
  /** Logs an event at level {@link Logger.Verbosity.WARN}. */
  warn(e) {
    this.verbosity <= oe.Verbosity.WARN && console.warn(e);
  }
  /** Logs an event at level {@link Logger.Verbosity.ERROR}. */
  error(e) {
    this.verbosity <= oe.Verbosity.ERROR && console.error(e);
  }
}
yt = oe;
oe.Verbosity = It;
oe.DEFAULT_INSTANCE = new yt(yt.Verbosity.INFO);
function In(i) {
  var e = i[0], t = i[1], n = i[2], s = i[3], r = i[4], o = i[5], a = i[6], c = i[7], u = i[8], h = i[9], g = i[10], m = i[11], x = i[12], A = i[13], b = i[14], _ = i[15], l = e * o - t * r, M = e * a - n * r, T = t * a - n * o, y = u * A - h * x, E = u * b - g * x, I = h * b - g * A, f = e * I - t * E + n * y, p = r * I - o * E + a * y, R = u * T - h * M + g * l, N = x * T - A * M + b * l;
  return c * f - s * p + _ * R - m * N;
}
function Nn(i, e, t) {
  var n = e[0], s = e[1], r = e[2], o = e[3], a = e[4], c = e[5], u = e[6], h = e[7], g = e[8], m = e[9], x = e[10], A = e[11], b = e[12], _ = e[13], l = e[14], M = e[15], T = t[0], y = t[1], E = t[2], I = t[3];
  return i[0] = T * n + y * a + E * g + I * b, i[1] = T * s + y * c + E * m + I * _, i[2] = T * r + y * u + E * x + I * l, i[3] = T * o + y * h + E * A + I * M, T = t[4], y = t[5], E = t[6], I = t[7], i[4] = T * n + y * a + E * g + I * b, i[5] = T * s + y * c + E * m + I * _, i[6] = T * r + y * u + E * x + I * l, i[7] = T * o + y * h + E * A + I * M, T = t[8], y = t[9], E = t[10], I = t[11], i[8] = T * n + y * a + E * g + I * b, i[9] = T * s + y * c + E * m + I * _, i[10] = T * r + y * u + E * x + I * l, i[11] = T * o + y * h + E * A + I * M, T = t[12], y = t[13], E = t[14], I = t[15], i[12] = T * n + y * a + E * g + I * b, i[13] = T * s + y * c + E * m + I * _, i[14] = T * r + y * u + E * x + I * l, i[15] = T * o + y * h + E * A + I * M, i;
}
function Sn(i, e) {
  var t = e[0], n = e[1], s = e[2], r = e[4], o = e[5], a = e[6], c = e[8], u = e[9], h = e[10];
  return i[0] = Math.sqrt(t * t + n * n + s * s), i[1] = Math.sqrt(r * r + o * o + a * a), i[2] = Math.sqrt(c * c + u * u + h * h), i;
}
function An(i, e) {
  var t = new Et(3);
  Sn(t, e);
  var n = 1 / t[0], s = 1 / t[1], r = 1 / t[2], o = e[0] * n, a = e[1] * s, c = e[2] * r, u = e[4] * n, h = e[5] * s, g = e[6] * r, m = e[8] * n, x = e[9] * s, A = e[10] * r, b = o + h + A, _ = 0;
  return b > 0 ? (_ = Math.sqrt(b + 1) * 2, i[3] = 0.25 * _, i[0] = (g - x) / _, i[1] = (m - c) / _, i[2] = (a - u) / _) : o > h && o > A ? (_ = Math.sqrt(1 + o - h - A) * 2, i[3] = (g - x) / _, i[0] = 0.25 * _, i[1] = (a + u) / _, i[2] = (m + c) / _) : h > A ? (_ = Math.sqrt(1 + h - o - A) * 2, i[3] = (m - c) / _, i[0] = (a + u) / _, i[1] = 0.25 * _, i[2] = (g + x) / _) : (_ = Math.sqrt(1 + A - o - h) * 2, i[3] = (a - u) / _, i[0] = (m + c) / _, i[1] = (g + x) / _, i[2] = 0.25 * _), i;
}
class L {
  static identity(e) {
    return e;
  }
  static eq(e, t, n = 1e-5) {
    if (e.length !== t.length) return !1;
    for (let s = 0; s < e.length; s++)
      if (Math.abs(e[s] - t[s]) > n) return !1;
    return !0;
  }
  static clamp(e, t, n) {
    return e < t ? t : e > n ? n : e;
  }
  // TODO(perf): Compare performance if we replace the switch with individual functions.
  static decodeNormalizedInt(e, t) {
    switch (t) {
      case 5126:
        return e;
      case 5123:
        return e / 65535;
      case 5121:
        return e / 255;
      case 5122:
        return Math.max(e / 32767, -1);
      case 5120:
        return Math.max(e / 127, -1);
      default:
        throw new Error("Invalid component type.");
    }
  }
  // TODO(perf): Compare performance if we replace the switch with individual functions.
  static encodeNormalizedInt(e, t) {
    switch (t) {
      case 5126:
        return e;
      case 5123:
        return Math.round(L.clamp(e, 0, 1) * 65535);
      case 5121:
        return Math.round(L.clamp(e, 0, 1) * 255);
      case 5122:
        return Math.round(L.clamp(e, -1, 1) * 32767);
      case 5120:
        return Math.round(L.clamp(e, -1, 1) * 127);
      default:
        throw new Error("Invalid component type.");
    }
  }
  /**
   * Decompose a mat4 to TRS properties.
   *
   * Equivalent to the Matrix4 decompose() method in three.js, and intentionally not using the
   * gl-matrix version. See: https://github.com/toji/gl-matrix/issues/408
   *
   * @param srcMat Matrix element, to be decomposed to TRS properties.
   * @param dstTranslation Translation element, to be overwritten.
   * @param dstRotation Rotation element, to be overwritten.
   * @param dstScale Scale element, to be overwritten.
   */
  static decompose(e, t, n, s) {
    let r = pt([e[0], e[1], e[2]]);
    const o = pt([e[4], e[5], e[6]]), a = pt([e[8], e[9], e[10]]);
    In(e) < 0 && (r = -r), t[0] = e[12], t[1] = e[13], t[2] = e[14];
    const u = e.slice(), h = 1 / r, g = 1 / o, m = 1 / a;
    u[0] *= h, u[1] *= h, u[2] *= h, u[4] *= g, u[5] *= g, u[6] *= g, u[8] *= m, u[9] *= m, u[10] *= m, An(n, u), s[0] = r, s[1] = o, s[2] = a;
  }
  /**
   * Compose TRS properties to a mat4.
   *
   * Equivalent to the Matrix4 compose() method in three.js, and intentionally not using the
   * gl-matrix version. See: https://github.com/toji/gl-matrix/issues/408
   *
   * @param srcTranslation Translation element of matrix.
   * @param srcRotation Rotation element of matrix.
   * @param srcScale Scale element of matrix.
   * @param dstMat Matrix element, to be modified and returned.
   * @returns dstMat, overwritten to mat4 equivalent of given TRS properties.
   */
  static compose(e, t, n, s) {
    const r = s, o = t[0], a = t[1], c = t[2], u = t[3], h = o + o, g = a + a, m = c + c, x = o * h, A = o * g, b = o * m, _ = a * g, l = a * m, M = c * m, T = u * h, y = u * g, E = u * m, I = n[0], f = n[1], p = n[2];
    return r[0] = (1 - (_ + M)) * I, r[1] = (A + E) * I, r[2] = (b - y) * I, r[3] = 0, r[4] = (A - E) * f, r[5] = (1 - (x + M)) * f, r[6] = (l + T) * f, r[7] = 0, r[8] = (b + y) * p, r[9] = (l - T) * p, r[10] = (1 - (x + _)) * p, r[11] = 0, r[12] = e[0], r[13] = e[1], r[14] = e[2], r[15] = 1, r;
  }
}
function _n(i, e) {
  if (!!i != !!e) return !1;
  const t = i.getChild(), n = e.getChild();
  return t === n || t.equals(n);
}
function Mn(i, e) {
  if (!!i != !!e) return !1;
  const t = i.values(), n = e.values();
  if (t.length !== n.length) return !1;
  for (let s = 0; s < t.length; s++) {
    const r = t[s], o = n[s];
    if (r.getChild() !== o.getChild() && !r.getChild().equals(o.getChild()))
      return !1;
  }
  return !0;
}
function bn(i, e) {
  if (!!i != !!e) return !1;
  const t = i.keys(), n = e.keys();
  if (t.length !== n.length) return !1;
  for (const s of t) {
    const r = i.get(s), o = e.get(s);
    if (!!r != !!o) return !1;
    const a = r.getChild(), c = o.getChild();
    if (a !== c && !a.equals(c))
      return !1;
  }
  return !0;
}
function os(i, e) {
  if (i === e) return !0;
  if (!!i != !!e || !i || !e || i.length !== e.length) return !1;
  for (let t = 0; t < i.length; t++)
    if (i[t] !== e[t]) return !1;
  return !0;
}
function as(i, e) {
  if (i === e) return !0;
  if (!!i != !!e) return !1;
  if (!ve(i) || !ve(e))
    return i === e;
  const t = i, n = e;
  let s = 0, r = 0, o;
  for (o in t) s++;
  for (o in n) r++;
  if (s !== r) return !1;
  for (o in t) {
    const a = t[o], c = n[o];
    if (ut(a) && ut(c)) {
      if (!os(a, c)) return !1;
    } else if (ve(a) && ve(c)) {
      if (!as(a, c)) return !1;
    } else if (a !== c) return !1;
  }
  return !0;
}
function ut(i) {
  return Array.isArray(i) || ArrayBuffer.isView(i);
}
const jt = "23456789abdegjkmnpqrvwxyzABDEGJKMNPQRVWXYZ", wn = 999, Cn = 6, Pt = /* @__PURE__ */ new Set(), On = function() {
  let e = "";
  for (let t = 0; t < Cn; t++)
    e += jt.charAt(Math.floor(Math.random() * jt.length));
  return e;
}, Dn = function() {
  for (let e = 0; e < wn; e++) {
    const t = On();
    if (!Pt.has(t))
      return Pt.add(t), t;
  }
  return "";
}, Oe = (i) => i, vn = /* @__PURE__ */ new Set();
class Mt extends pn {
  /** @hidden */
  constructor(e, t = "") {
    super(e), this[B].name = t, this.init(), this.dispatchEvent({
      type: "create"
    });
  }
  /**
   * Returns the Graph associated with this Property. For internal use.
   * @hidden
   * @experimental
   */
  getGraph() {
    return this.graph;
  }
  /**
   * Returns default attributes for the property. Empty lists and maps should be initialized
   * to empty arrays and objects. Always invoke `super.getDefaults()` and extend the result.
   */
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      name: "",
      extras: {}
    });
  }
  /** @hidden */
  set(e, t) {
    return Array.isArray(t) && (t = t.slice()), super.set(e, t);
  }
  /**********************************************************************************************
   * Name.
   */
  /**
   * Returns the name of this property. While names are not required to be unique, this is
   * encouraged, and non-unique names will be overwritten in some tools. For custom data about
   * a property, prefer to use Extras.
   */
  getName() {
    return this.get("name");
  }
  /**
   * Sets the name of this property. While names are not required to be unique, this is
   * encouraged, and non-unique names will be overwritten in some tools. For custom data about
   * a property, prefer to use Extras.
   */
  setName(e) {
    return this.set("name", e);
  }
  /**********************************************************************************************
   * Extras.
   */
  /**
   * Returns a reference to the Extras object, containing application-specific data for this
   * Property. Extras should be an Object, not a primitive value, for best portability.
   */
  getExtras() {
    return this.get("extras");
  }
  /**
   * Updates the Extras object, containing application-specific data for this Property. Extras
   * should be an Object, not a primitive value, for best portability.
   */
  setExtras(e) {
    return this.set("extras", e);
  }
  /**********************************************************************************************
   * Graph state.
   */
  /**
   * Makes a copy of this property, with the same resources (by reference) as the original.
   */
  clone() {
    const e = this.constructor;
    return new e(this.graph).copy(this, Oe);
  }
  /**
   * Copies all data from another property to this one. Child properties are copied by reference,
   * unless a 'resolve' function is given to override that.
   * @param other Property to copy references from.
   * @param resolve Function to resolve each Property being transferred. Default is identity.
   */
  copy(e, t = Oe) {
    for (const n in this[B]) {
      const s = this[B][n];
      if (s instanceof Pe)
        this[De].has(n) || s.dispose();
      else if (s instanceof we || s instanceof V)
        for (const r of s.values())
          r.dispose();
      else if (s instanceof ce)
        for (const r of s.values())
          r.dispose();
    }
    for (const n in e[B]) {
      const s = this[B][n], r = e[B][n];
      if (r instanceof Pe)
        this[De].has(n) ? s.getChild().copy(t(r.getChild()), t) : this.setRef(n, t(r.getChild()), r.getAttributes());
      else if (r instanceof V || r instanceof we)
        for (const o of r.values())
          this.addRef(n, t(o.getChild()), o.getAttributes());
      else if (r instanceof ce)
        for (const o of r.keys()) {
          const a = r.get(o);
          this.setRefMap(n, o, t(a.getChild()), a.getAttributes());
        }
      else ve(r) ? this[B][n] = JSON.parse(JSON.stringify(r)) : Array.isArray(r) || r instanceof ArrayBuffer || ArrayBuffer.isView(r) ? this[B][n] = r.slice() : this[B][n] = r;
    }
    return this;
  }
  /**
   * Returns true if two properties are deeply equivalent, recursively comparing the attributes
   * of the properties. Optionally, a 'skip' set may be included, specifying attributes whose
   * values should not be considered in the comparison.
   *
   * Example: Two {@link Primitive Primitives} are equivalent if they have accessors and
   * materials with equivalent content — but not necessarily the same specific accessors
   * and materials.
   */
  equals(e, t = vn) {
    if (this === e) return !0;
    if (this.propertyType !== e.propertyType) return !1;
    for (const n in this[B]) {
      if (t.has(n)) continue;
      const s = this[B][n], r = e[B][n];
      if (s instanceof Pe || r instanceof Pe) {
        if (!_n(s, r))
          return !1;
      } else if (s instanceof V || r instanceof V || s instanceof we || r instanceof we) {
        if (!Mn(s, r))
          return !1;
      } else if (s instanceof ce || r instanceof ce) {
        if (!bn(s, r))
          return !1;
      } else if (ve(s) || ve(r)) {
        if (!as(s, r)) return !1;
      } else if (ut(s) || ut(r)) {
        if (!os(s, r)) return !1;
      } else if (s !== r) return !1;
    }
    return !0;
  }
  detach() {
    return this.graph.disconnectParents(this, (e) => e.propertyType !== "Root"), this;
  }
  /**
   * Returns a list of all properties that hold a reference to this property. For example, a
   * material may hold references to various textures, but a texture does not hold references
   * to the materials that use it.
   *
   * It is often necessary to filter the results for a particular type: some resources, like
   * {@link Accessor}s, may be referenced by different types of properties. Most properties
   * include the {@link Root} as a parent, which is usually not of interest.
   *
   * Usage:
   *
   * ```ts
   * const materials = texture
   * 	.listParents()
   * 	.filter((p) => p instanceof Material)
   * ```
   */
  listParents() {
    return this.graph.listParents(this);
  }
}
class J extends Mt {
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      extensions: new ce()
    });
  }
  /** Returns an {@link ExtensionProperty} attached to this Property, if any. */
  getExtension(e) {
    return this.getRefMap("extensions", e);
  }
  /**
   * Attaches the given {@link ExtensionProperty} to this Property. For a given extension, only
   * one ExtensionProperty may be attached to any one Property at a time.
   */
  setExtension(e, t) {
    return t && t._validateParent(this), this.setRefMap("extensions", e, t);
  }
  /** Lists all {@link ExtensionProperty} instances attached to this Property. */
  listExtensions() {
    return this.listRefMapValues("extensions");
  }
}
class S extends J {
  /**********************************************************************************************
   * Instance.
   */
  init() {
    this.propertyType = d.ACCESSOR;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      array: null,
      type: S.Type.SCALAR,
      componentType: S.ComponentType.FLOAT,
      normalized: !1,
      sparse: !1,
      buffer: null
    });
  }
  /**********************************************************************************************
   * Static.
   */
  /** Returns size of a given element type, in components. */
  static getElementSize(e) {
    switch (e) {
      case S.Type.SCALAR:
        return 1;
      case S.Type.VEC2:
        return 2;
      case S.Type.VEC3:
        return 3;
      case S.Type.VEC4:
        return 4;
      case S.Type.MAT2:
        return 4;
      case S.Type.MAT3:
        return 9;
      case S.Type.MAT4:
        return 16;
      default:
        throw new Error("Unexpected type: " + e);
    }
  }
  /** Returns size of a given component type, in bytes. */
  static getComponentSize(e) {
    switch (e) {
      case S.ComponentType.BYTE:
        return 1;
      case S.ComponentType.UNSIGNED_BYTE:
        return 1;
      case S.ComponentType.SHORT:
        return 2;
      case S.ComponentType.UNSIGNED_SHORT:
        return 2;
      case S.ComponentType.UNSIGNED_INT:
        return 4;
      case S.ComponentType.FLOAT:
        return 4;
      default:
        throw new Error("Unexpected component type: " + e);
    }
  }
  /**********************************************************************************************
   * Min/max bounds.
   */
  /**
   * Minimum value of each component in this attribute. Unlike in a final glTF file, values
   * returned by this method will reflect the minimum accounting for {@link .normalized}
   * state.
   */
  getMinNormalized(e) {
    const t = this.getNormalized(), n = this.getElementSize(), s = this.getComponentType();
    if (this.getMin(e), t)
      for (let r = 0; r < n; r++)
        e[r] = L.decodeNormalizedInt(e[r], s);
    return e;
  }
  /**
   * Minimum value of each component in this attribute. Values returned by this method do not
   * reflect normalization: use {@link .getMinNormalized} in that case.
   */
  getMin(e) {
    const t = this.getArray(), n = this.getCount(), s = this.getElementSize();
    for (let r = 0; r < s; r++) e[r] = 1 / 0;
    for (let r = 0; r < n * s; r += s)
      for (let o = 0; o < s; o++) {
        const a = t[r + o];
        Number.isFinite(a) && (e[o] = Math.min(e[o], a));
      }
    return e;
  }
  /**
   * Maximum value of each component in this attribute. Unlike in a final glTF file, values
   * returned by this method will reflect the minimum accounting for {@link .normalized}
   * state.
   */
  getMaxNormalized(e) {
    const t = this.getNormalized(), n = this.getElementSize(), s = this.getComponentType();
    if (this.getMax(e), t)
      for (let r = 0; r < n; r++)
        e[r] = L.decodeNormalizedInt(e[r], s);
    return e;
  }
  /**
   * Maximum value of each component in this attribute. Values returned by this method do not
   * reflect normalization: use {@link .getMinNormalized} in that case.
   */
  getMax(e) {
    const t = this.get("array"), n = this.getCount(), s = this.getElementSize();
    for (let r = 0; r < s; r++) e[r] = -1 / 0;
    for (let r = 0; r < n * s; r += s)
      for (let o = 0; o < s; o++) {
        const a = t[r + o];
        Number.isFinite(a) && (e[o] = Math.max(e[o], a));
      }
    return e;
  }
  /**********************************************************************************************
   * Layout.
   */
  /**
   * Number of elements in the accessor. An array of length 30, containing 10 `VEC3` elements,
   * will have a count of 10.
   */
  getCount() {
    const e = this.get("array");
    return e ? e.length / this.getElementSize() : 0;
  }
  /** Type of element stored in the accessor. `VEC2`, `VEC3`, etc. */
  getType() {
    return this.get("type");
  }
  /**
   * Sets type of element stored in the accessor. `VEC2`, `VEC3`, etc. Array length must be a
   * multiple of the component size (`VEC2` = 2, `VEC3` = 3, ...) for the selected type.
   */
  setType(e) {
    return this.set("type", e);
  }
  /**
   * Number of components in each element of the accessor. For example, the element size of a
   * `VEC2` accessor is 2. This value is determined automatically based on array length and
   * accessor type, specified with {@link Accessor.setType setType()}.
   */
  // biome-ignore lint/suspicious/useAdjacentOverloadSignatures: Static vs. non-static.
  getElementSize() {
    return S.getElementSize(this.get("type"));
  }
  /**
   * Size of each component (a value in the raw array), in bytes. For example, the
   * `componentSize` of data backed by a `float32` array is 4 bytes.
   */
  getComponentSize() {
    return this.get("array").BYTES_PER_ELEMENT;
  }
  /**
   * Component type (float32, uint16, etc.). This value is determined automatically, and can only
   * be modified by replacing the underlying array.
   */
  getComponentType() {
    return this.get("componentType");
  }
  /**********************************************************************************************
   * Normalization.
   */
  /**
   * Specifies whether integer data values should be normalized (true) to [0, 1] (for unsigned
   * types) or [-1, 1] (for signed types), or converted directly (false) when they are accessed.
   * This property is defined only for accessors that contain vertex attributes or animation
   * output data.
   */
  getNormalized() {
    return this.get("normalized");
  }
  /**
   * Specifies whether integer data values should be normalized (true) to [0, 1] (for unsigned
   * types) or [-1, 1] (for signed types), or converted directly (false) when they are accessed.
   * This property is defined only for accessors that contain vertex attributes or animation
   * output data.
   */
  setNormalized(e) {
    return this.set("normalized", e);
  }
  /**********************************************************************************************
   * Data access.
   */
  /**
   * Returns the scalar element value at the given index. For
   * {@link Accessor.getNormalized normalized} integer accessors, values are
   * decoded and returned in floating-point form.
   */
  getScalar(e) {
    const t = this.getElementSize(), n = this.getComponentType(), s = this.getArray();
    return this.getNormalized() ? L.decodeNormalizedInt(s[e * t], n) : s[e * t];
  }
  /**
   * Assigns the scalar element value at the given index. For
   * {@link Accessor.getNormalized normalized} integer accessors, "value" should be
   * given in floating-point form — it will be integer-encoded before writing
   * to the underlying array.
   */
  setScalar(e, t) {
    const n = this.getElementSize(), s = this.getComponentType(), r = this.getArray();
    return this.getNormalized() ? r[e * n] = L.encodeNormalizedInt(t, s) : r[e * n] = t, this;
  }
  /**
   * Returns the vector or matrix element value at the given index. For
   * {@link Accessor.getNormalized normalized} integer accessors, values are
   * decoded and returned in floating-point form.
   *
   * Example:
   *
   * ```javascript
   * import { add } from 'gl-matrix/add';
   *
   * const element = [];
   * const offset = [1, 1, 1];
   *
   * for (let i = 0; i < accessor.getCount(); i++) {
   * 	accessor.getElement(i, element);
   * 	add(element, element, offset);
   * 	accessor.setElement(i, element);
   * }
   * ```
   */
  getElement(e, t) {
    const n = this.getNormalized(), s = this.getElementSize(), r = this.getComponentType(), o = this.getArray();
    for (let a = 0; a < s; a++)
      n ? t[a] = L.decodeNormalizedInt(o[e * s + a], r) : t[a] = o[e * s + a];
    return t;
  }
  /**
   * Assigns the vector or matrix element value at the given index. For
   * {@link Accessor.getNormalized normalized} integer accessors, "value" should be
   * given in floating-point form — it will be integer-encoded before writing
   * to the underlying array.
   *
   * Example:
   *
   * ```javascript
   * import { add } from 'gl-matrix/add';
   *
   * const element = [];
   * const offset = [1, 1, 1];
   *
   * for (let i = 0; i < accessor.getCount(); i++) {
   * 	accessor.getElement(i, element);
   * 	add(element, element, offset);
   * 	accessor.setElement(i, element);
   * }
   * ```
   */
  setElement(e, t) {
    const n = this.getNormalized(), s = this.getElementSize(), r = this.getComponentType(), o = this.getArray();
    for (let a = 0; a < s; a++)
      n ? o[e * s + a] = L.encodeNormalizedInt(t[a], r) : o[e * s + a] = t[a];
    return this;
  }
  /**********************************************************************************************
   * Raw data storage.
   */
  /**
   * Specifies whether the accessor should be stored sparsely. When written to a glTF file, sparse
   * accessors store only values that differ from base values. When loaded in glTF Transform (or most
   * runtimes) a sparse accessor can be treated like any other accessor. Currently, glTF Transform always
   * uses zeroes for the base values when writing files.
   * @experimental
   */
  getSparse() {
    return this.get("sparse");
  }
  /**
   * Specifies whether the accessor should be stored sparsely. When written to a glTF file, sparse
   * accessors store only values that differ from base values. When loaded in glTF Transform (or most
   * runtimes) a sparse accessor can be treated like any other accessor. Currently, glTF Transform always
   * uses zeroes for the base values when writing files.
   * @experimental
   */
  setSparse(e) {
    return this.set("sparse", e);
  }
  /** Returns the {@link Buffer} into which this accessor will be organized. */
  getBuffer() {
    return this.getRef("buffer");
  }
  /** Assigns the {@link Buffer} into which this accessor will be organized. */
  setBuffer(e) {
    return this.setRef("buffer", e);
  }
  /** Returns the raw typed array underlying this accessor. */
  getArray() {
    return this.get("array");
  }
  /** Assigns the raw typed array underlying this accessor. */
  setArray(e) {
    return this.set("componentType", e ? Fn(e) : S.ComponentType.FLOAT), this.set("array", e), this;
  }
  /** Returns the total bytelength of this accessor, exclusive of padding. */
  getByteLength() {
    const e = this.get("array");
    return e ? e.byteLength : 0;
  }
}
S.Type = {
  /** Scalar, having 1 value per element. */
  SCALAR: "SCALAR",
  /** 2-component vector, having 2 components per element. */
  VEC2: "VEC2",
  /** 3-component vector, having 3 components per element. */
  VEC3: "VEC3",
  /** 4-component vector, having 4 components per element. */
  VEC4: "VEC4",
  /** 2x2 matrix, having 4 components per element. */
  MAT2: "MAT2",
  /** 3x3 matrix, having 9 components per element. */
  MAT3: "MAT3",
  /** 4x3 matrix, having 16 components per element. */
  MAT4: "MAT4"
};
S.ComponentType = {
  /**
   * 1-byte signed integer, stored as
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int8Array Int8Array}.
   */
  BYTE: 5120,
  /**
   * 1-byte unsigned integer, stored as
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array Uint8Array}.
   */
  UNSIGNED_BYTE: 5121,
  /**
   * 2-byte signed integer, stored as
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int16Array Int16Array}.
   */
  SHORT: 5122,
  /**
   * 2-byte unsigned integer, stored as
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint16Array Uint16Array}.
   */
  UNSIGNED_SHORT: 5123,
  /**
   * 4-byte unsigned integer, stored as
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint32Array Uint32Array}.
   */
  UNSIGNED_INT: 5125,
  /**
   * 4-byte floating point number, stored as
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array Float32Array}.
   */
  FLOAT: 5126
};
function Fn(i) {
  switch (i.constructor) {
    case Float32Array:
      return S.ComponentType.FLOAT;
    case Uint32Array:
      return S.ComponentType.UNSIGNED_INT;
    case Uint16Array:
      return S.ComponentType.UNSIGNED_SHORT;
    case Uint8Array:
      return S.ComponentType.UNSIGNED_BYTE;
    case Int16Array:
      return S.ComponentType.SHORT;
    case Int8Array:
      return S.ComponentType.BYTE;
    default:
      throw new Error("Unknown accessor componentType.");
  }
}
class cs extends J {
  init() {
    this.propertyType = d.ANIMATION;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      channels: new V(),
      samplers: new V()
    });
  }
  /** Adds an {@link AnimationChannel} to this Animation. */
  addChannel(e) {
    return this.addRef("channels", e);
  }
  /** Removes an {@link AnimationChannel} from this Animation. */
  removeChannel(e) {
    return this.removeRef("channels", e);
  }
  /** Lists {@link AnimationChannel}s in this Animation. */
  listChannels() {
    return this.listRefs("channels");
  }
  /** Adds an {@link AnimationSampler} to this Animation. */
  addSampler(e) {
    return this.addRef("samplers", e);
  }
  /** Removes an {@link AnimationSampler} from this Animation. */
  removeSampler(e) {
    return this.removeRef("samplers", e);
  }
  /** Lists {@link AnimationSampler}s in this Animation. */
  listSamplers() {
    return this.listRefs("samplers");
  }
}
class bt extends J {
  /**********************************************************************************************
   * Instance.
   */
  init() {
    this.propertyType = d.ANIMATION_CHANNEL;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      targetPath: null,
      targetNode: null,
      sampler: null
    });
  }
  /**********************************************************************************************
   * Properties.
   */
  /**
   * Path (property) animated on the target {@link Node}. Supported values include:
   * `translation`, `rotation`, `scale`, or `weights`.
   */
  getTargetPath() {
    return this.get("targetPath");
  }
  /**
   * Path (property) animated on the target {@link Node}. Supported values include:
   * `translation`, `rotation`, `scale`, or `weights`.
   */
  setTargetPath(e) {
    return this.set("targetPath", e);
  }
  /** Target {@link Node} animated by the channel. */
  getTargetNode() {
    return this.getRef("targetNode");
  }
  /** Target {@link Node} animated by the channel. */
  setTargetNode(e) {
    return this.setRef("targetNode", e);
  }
  /**
   * Keyframe data input/output values for the channel. Must be attached to the same
   * {@link Animation}.
   */
  getSampler() {
    return this.getRef("sampler");
  }
  /**
   * Keyframe data input/output values for the channel. Must be attached to the same
   * {@link Animation}.
   */
  setSampler(e) {
    return this.setRef("sampler", e);
  }
}
bt.TargetPath = {
  /** Channel targets {@link Node.setTranslation}. */
  TRANSLATION: "translation",
  /** Channel targets {@link Node.setRotation}. */
  ROTATION: "rotation",
  /** Channel targets {@link Node.setScale}. */
  SCALE: "scale",
  /** Channel targets {@link Node.setWeights}, affecting {@link PrimitiveTarget} weights. */
  WEIGHTS: "weights"
};
class ze extends J {
  /**********************************************************************************************
   * Instance.
   */
  init() {
    this.propertyType = d.ANIMATION_SAMPLER;
  }
  getDefaultAttributes() {
    return Object.assign(super.getDefaults(), {
      interpolation: ze.Interpolation.LINEAR,
      input: null,
      output: null
    });
  }
  /**********************************************************************************************
   * Static.
   */
  /** Interpolation mode: `STEP`, `LINEAR`, or `CUBICSPLINE`. */
  getInterpolation() {
    return this.get("interpolation");
  }
  /** Interpolation mode: `STEP`, `LINEAR`, or `CUBICSPLINE`. */
  setInterpolation(e) {
    return this.set("interpolation", e);
  }
  /** Times for each keyframe, in seconds. */
  getInput() {
    return this.getRef("input");
  }
  /** Times for each keyframe, in seconds. */
  setInput(e) {
    return this.setRef("input", e, {
      usage: te.OTHER
    });
  }
  /**
   * Values for each keyframe. For `CUBICSPLINE` interpolation, output also contains in/out
   * tangents.
   */
  getOutput() {
    return this.getRef("output");
  }
  /**
   * Values for each keyframe. For `CUBICSPLINE` interpolation, output also contains in/out
   * tangents.
   */
  setOutput(e) {
    return this.setRef("output", e, {
      usage: te.OTHER
    });
  }
}
ze.Interpolation = {
  /** Animated values are linearly interpolated between keyframes. */
  LINEAR: "LINEAR",
  /** Animated values remain constant from one keyframe until the next keyframe. */
  STEP: "STEP",
  /** Animated values are interpolated according to given cubic spline tangents. */
  CUBICSPLINE: "CUBICSPLINE"
};
class us extends J {
  init() {
    this.propertyType = d.BUFFER;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      uri: ""
    });
  }
  /**
   * Returns the URI (or filename) of this buffer (e.g. 'myBuffer.bin'). URIs are strongly
   * encouraged to be relative paths, rather than absolute. Use of a protocol (like `file://`)
   * is possible for custom applications, but will limit the compatibility of the asset with most
   * tools.
   *
   * Buffers commonly use the extension `.bin`, though this is not required.
   */
  getURI() {
    return this.get("uri");
  }
  /**
   * Sets the URI (or filename) of this buffer (e.g. 'myBuffer.bin'). URIs are strongly
   * encouraged to be relative paths, rather than absolute. Use of a protocol (like `file://`)
   * is possible for custom applications, but will limit the compatibility of the asset with most
   * tools.
   *
   * Buffers commonly use the extension `.bin`, though this is not required.
   */
  setURI(e) {
    return this.set("uri", e);
  }
}
class Be extends J {
  /**********************************************************************************************
   * Instance.
   */
  init() {
    this.propertyType = d.CAMERA;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      // Common.
      type: Be.Type.PERSPECTIVE,
      znear: 0.1,
      zfar: 100,
      // Perspective.
      aspectRatio: null,
      yfov: Math.PI * 2 * 50 / 360,
      // 50º
      // Orthographic.
      xmag: 1,
      ymag: 1
    });
  }
  /**********************************************************************************************
   * Common.
   */
  /** Specifies if the camera uses a perspective or orthographic projection. */
  getType() {
    return this.get("type");
  }
  /** Specifies if the camera uses a perspective or orthographic projection. */
  setType(e) {
    return this.set("type", e);
  }
  /** Floating-point distance to the near clipping plane. */
  getZNear() {
    return this.get("znear");
  }
  /** Floating-point distance to the near clipping plane. */
  setZNear(e) {
    return this.set("znear", e);
  }
  /**
   * Floating-point distance to the far clipping plane. When defined, zfar must be greater than
   * znear. If zfar is undefined, runtime must use infinite projection matrix.
   */
  getZFar() {
    return this.get("zfar");
  }
  /**
   * Floating-point distance to the far clipping plane. When defined, zfar must be greater than
   * znear. If zfar is undefined, runtime must use infinite projection matrix.
   */
  setZFar(e) {
    return this.set("zfar", e);
  }
  /**********************************************************************************************
   * Perspective.
   */
  /**
   * Floating-point aspect ratio of the field of view. When undefined, the aspect ratio of the
   * canvas is used.
   */
  getAspectRatio() {
    return this.get("aspectRatio");
  }
  /**
   * Floating-point aspect ratio of the field of view. When undefined, the aspect ratio of the
   * canvas is used.
   */
  setAspectRatio(e) {
    return this.set("aspectRatio", e);
  }
  /** Floating-point vertical field of view in radians. */
  getYFov() {
    return this.get("yfov");
  }
  /** Floating-point vertical field of view in radians. */
  setYFov(e) {
    return this.set("yfov", e);
  }
  /**********************************************************************************************
   * Orthographic.
   */
  /**
   * Floating-point horizontal magnification of the view, and half the view's width
   * in world units.
   */
  getXMag() {
    return this.get("xmag");
  }
  /**
   * Floating-point horizontal magnification of the view, and half the view's width
   * in world units.
   */
  setXMag(e) {
    return this.set("xmag", e);
  }
  /**
   * Floating-point vertical magnification of the view, and half the view's height
   * in world units.
   */
  getYMag() {
    return this.get("ymag");
  }
  /**
   * Floating-point vertical magnification of the view, and half the view's height
   * in world units.
   */
  setYMag(e) {
    return this.set("ymag", e);
  }
}
Be.Type = {
  /** A perspective camera representing a perspective projection matrix. */
  PERSPECTIVE: "perspective",
  /** An orthographic camera representing an orthographic projection matrix. */
  ORTHOGRAPHIC: "orthographic"
};
class H extends Mt {
  /** @hidden */
  _validateParent(e) {
    if (!this.parentTypes.includes(e.propertyType))
      throw new Error(`Parent "${e.propertyType}" invalid for child "${this.propertyType}".`);
  }
}
H.EXTENSION_NAME = void 0;
class j extends J {
  /**********************************************************************************************
   * Instance.
   */
  init() {
    this.propertyType = d.TEXTURE_INFO;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      texCoord: 0,
      magFilter: null,
      minFilter: null,
      wrapS: j.WrapMode.REPEAT,
      wrapT: j.WrapMode.REPEAT
    });
  }
  /**********************************************************************************************
   * Texture coordinates.
   */
  /** Returns the texture coordinate (UV set) index for the texture. */
  getTexCoord() {
    return this.get("texCoord");
  }
  /** Sets the texture coordinate (UV set) index for the texture. */
  setTexCoord(e) {
    return this.set("texCoord", e);
  }
  /**********************************************************************************************
   * Min/mag filter.
   */
  /** Returns the magnification filter applied to the texture. */
  getMagFilter() {
    return this.get("magFilter");
  }
  /** Sets the magnification filter applied to the texture. */
  setMagFilter(e) {
    return this.set("magFilter", e);
  }
  /** Sets the minification filter applied to the texture. */
  getMinFilter() {
    return this.get("minFilter");
  }
  /** Returns the minification filter applied to the texture. */
  setMinFilter(e) {
    return this.set("minFilter", e);
  }
  /**********************************************************************************************
   * UV wrapping.
   */
  /** Returns the S (U) wrapping mode for UVs used by the texture. */
  getWrapS() {
    return this.get("wrapS");
  }
  /** Sets the S (U) wrapping mode for UVs used by the texture. */
  setWrapS(e) {
    return this.set("wrapS", e);
  }
  /** Returns the T (V) wrapping mode for UVs used by the texture. */
  getWrapT() {
    return this.get("wrapT");
  }
  /** Sets the T (V) wrapping mode for UVs used by the texture. */
  setWrapT(e) {
    return this.set("wrapT", e);
  }
}
j.WrapMode = {
  /** */
  CLAMP_TO_EDGE: 33071,
  /** */
  MIRRORED_REPEAT: 33648,
  /** */
  REPEAT: 10497
};
j.MagFilter = {
  /** */
  NEAREST: 9728,
  /** */
  LINEAR: 9729
};
j.MinFilter = {
  /** */
  NEAREST: 9728,
  /** */
  LINEAR: 9729,
  /** */
  NEAREST_MIPMAP_NEAREST: 9984,
  /** */
  LINEAR_MIPMAP_NEAREST: 9985,
  /** */
  NEAREST_MIPMAP_LINEAR: 9986,
  /** */
  LINEAR_MIPMAP_LINEAR: 9987
};
const {
  R: nt,
  G: rt,
  B: it,
  A: Un
} = ae;
class Fe extends J {
  /**********************************************************************************************
   * Instance.
   */
  init() {
    this.propertyType = d.MATERIAL;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      alphaMode: Fe.AlphaMode.OPAQUE,
      alphaCutoff: 0.5,
      doubleSided: !1,
      baseColorFactor: [1, 1, 1, 1],
      baseColorTexture: null,
      baseColorTextureInfo: new j(this.graph, "baseColorTextureInfo"),
      emissiveFactor: [0, 0, 0],
      emissiveTexture: null,
      emissiveTextureInfo: new j(this.graph, "emissiveTextureInfo"),
      normalScale: 1,
      normalTexture: null,
      normalTextureInfo: new j(this.graph, "normalTextureInfo"),
      occlusionStrength: 1,
      occlusionTexture: null,
      occlusionTextureInfo: new j(this.graph, "occlusionTextureInfo"),
      roughnessFactor: 1,
      metallicFactor: 1,
      metallicRoughnessTexture: null,
      metallicRoughnessTextureInfo: new j(this.graph, "metallicRoughnessTextureInfo")
    });
  }
  /**********************************************************************************************
   * Double-sided / culling.
   */
  /** Returns true when both sides of triangles should be rendered. May impact performance. */
  getDoubleSided() {
    return this.get("doubleSided");
  }
  /** Sets whether to render both sides of triangles. May impact performance. */
  setDoubleSided(e) {
    return this.set("doubleSided", e);
  }
  /**********************************************************************************************
   * Alpha.
   */
  /** Returns material alpha, equivalent to baseColorFactor[3]. */
  getAlpha() {
    return this.get("baseColorFactor")[3];
  }
  /** Sets material alpha, equivalent to baseColorFactor[3]. */
  setAlpha(e) {
    const t = this.get("baseColorFactor").slice();
    return t[3] = e, this.set("baseColorFactor", t);
  }
  /**
   * Returns the mode of the material's alpha channels, which are provided by `baseColorFactor`
   * and `baseColorTexture`.
   *
   * - `OPAQUE`: Alpha value is ignored and the rendered output is fully opaque.
   * - `BLEND`: Alpha value is used to determine the transparency each pixel on a surface, and
   * 	the fraction of surface vs. background color in the final result. Alpha blending creates
   *	significant edge cases in realtime renderers, and some care when structuring the model is
   * 	necessary for good results. In particular, transparent geometry should be kept in separate
   * 	meshes or primitives from opaque geometry. The `depthWrite` or `zWrite` settings in engines
   * 	should usually be disabled on transparent materials.
   * - `MASK`: Alpha value is compared against `alphaCutoff` threshold for each pixel on a
   * 	surface, and the pixel is either fully visible or fully discarded based on that cutoff.
   * 	This technique is useful for things like leafs/foliage, grass, fabric meshes, and other
   * 	surfaces where no semitransparency is needed. With a good choice of `alphaCutoff`, surfaces
   * 	that don't require semitransparency can avoid the performance penalties and visual issues
   * 	involved with `BLEND` transparency.
   *
   * Reference:
   * - [glTF → material.alphaMode](https://github.com/KhronosGroup/gltf/blob/main/specification/2.0/README.md#materialalphamode)
   */
  getAlphaMode() {
    return this.get("alphaMode");
  }
  /** Sets the mode of the material's alpha channels. See {@link Material.getAlphaMode getAlphaMode} for details. */
  setAlphaMode(e) {
    return this.set("alphaMode", e);
  }
  /** Returns the visibility threshold; applied only when `.alphaMode='MASK'`. */
  getAlphaCutoff() {
    return this.get("alphaCutoff");
  }
  /** Sets the visibility threshold; applied only when `.alphaMode='MASK'`. */
  setAlphaCutoff(e) {
    return this.set("alphaCutoff", e);
  }
  /**********************************************************************************************
   * Base color.
   */
  /**
   * Base color / albedo factor; Linear-sRGB components.
   * See {@link Material.getBaseColorTexture getBaseColorTexture}.
   */
  getBaseColorFactor() {
    return this.get("baseColorFactor");
  }
  /**
   * Base color / albedo factor; Linear-sRGB components.
   * See {@link Material.getBaseColorTexture getBaseColorTexture}.
   */
  setBaseColorFactor(e) {
    return this.set("baseColorFactor", e);
  }
  /**
   * Base color / albedo. The visible color of a non-metallic surface under constant ambient
   * light would be a linear combination (multiplication) of its vertex colors, base color
   * factor, and base color texture. Lighting, and reflections in metallic or smooth surfaces,
   * also effect the final color. The alpha (`.a`) channel of base color factors and textures
   * will have varying effects, based on the setting of {@link Material.getAlphaMode getAlphaMode}.
   *
   * Reference:
   * - [glTF → material.pbrMetallicRoughness.baseColorFactor](https://github.com/KhronosGroup/gltf/blob/main/specification/2.0/README.md#pbrmetallicroughnessbasecolorfactor)
   */
  getBaseColorTexture() {
    return this.getRef("baseColorTexture");
  }
  /**
   * Settings affecting the material's use of its base color texture. If no texture is attached,
   * {@link TextureInfo} is `null`.
   */
  getBaseColorTextureInfo() {
    return this.getRef("baseColorTexture") ? this.getRef("baseColorTextureInfo") : null;
  }
  /** Sets base color / albedo texture. See {@link Material.getBaseColorTexture getBaseColorTexture}. */
  setBaseColorTexture(e) {
    return this.setRef("baseColorTexture", e, {
      channels: nt | rt | it | Un,
      isColor: !0
    });
  }
  /**********************************************************************************************
   * Emissive.
   */
  /** Emissive color; Linear-sRGB components. See {@link Material.getEmissiveTexture getEmissiveTexture}. */
  getEmissiveFactor() {
    return this.get("emissiveFactor");
  }
  /** Emissive color; Linear-sRGB components. See {@link Material.getEmissiveTexture getEmissiveTexture}. */
  setEmissiveFactor(e) {
    return this.set("emissiveFactor", e);
  }
  /**
   * Emissive texture. Emissive color is added to any base color of the material, after any
   * lighting/shadowing are applied. An emissive color does not inherently "glow", or affect
   * objects around it at all. To create that effect, most viewers must also enable a
   * post-processing effect called "bloom".
   *
   * Reference:
   * - [glTF → material.emissiveTexture](https://github.com/KhronosGroup/gltf/blob/main/specification/2.0/README.md#materialemissivetexture)
   */
  getEmissiveTexture() {
    return this.getRef("emissiveTexture");
  }
  /**
   * Settings affecting the material's use of its emissive texture. If no texture is attached,
   * {@link TextureInfo} is `null`.
   */
  getEmissiveTextureInfo() {
    return this.getRef("emissiveTexture") ? this.getRef("emissiveTextureInfo") : null;
  }
  /** Sets emissive texture. See {@link Material.getEmissiveTexture getEmissiveTexture}. */
  setEmissiveTexture(e) {
    return this.setRef("emissiveTexture", e, {
      channels: nt | rt | it,
      isColor: !0
    });
  }
  /**********************************************************************************************
   * Normal.
   */
  /** Normal (surface detail) factor; linear multiplier. Affects `.normalTexture`. */
  getNormalScale() {
    return this.get("normalScale");
  }
  /** Normal (surface detail) factor; linear multiplier. Affects `.normalTexture`. */
  setNormalScale(e) {
    return this.set("normalScale", e);
  }
  /**
   * Normal (surface detail) texture.
   *
   * A tangent space normal map. The texture contains RGB components. Each texel represents the
   * XYZ components of a normal vector in tangent space. Red [0 to 255] maps to X [-1 to 1].
   * Green [0 to 255] maps to Y [-1 to 1]. Blue [128 to 255] maps to Z [1/255 to 1]. The normal
   * vectors use OpenGL conventions where +X is right and +Y is up. +Z points toward the viewer.
   *
   * Reference:
   * - [glTF → material.normalTexture](https://github.com/KhronosGroup/gltf/blob/main/specification/2.0/README.md#materialnormaltexture)
   */
  getNormalTexture() {
    return this.getRef("normalTexture");
  }
  /**
   * Settings affecting the material's use of its normal texture. If no texture is attached,
   * {@link TextureInfo} is `null`.
   */
  getNormalTextureInfo() {
    return this.getRef("normalTexture") ? this.getRef("normalTextureInfo") : null;
  }
  /** Sets normal (surface detail) texture. See {@link Material.getNormalTexture getNormalTexture}. */
  setNormalTexture(e) {
    return this.setRef("normalTexture", e, {
      channels: nt | rt | it
    });
  }
  /**********************************************************************************************
   * Occlusion.
   */
  /** (Ambient) Occlusion factor; linear multiplier. Affects `.occlusionTexture`. */
  getOcclusionStrength() {
    return this.get("occlusionStrength");
  }
  /** Sets (ambient) occlusion factor; linear multiplier. Affects `.occlusionTexture`. */
  setOcclusionStrength(e) {
    return this.set("occlusionStrength", e);
  }
  /**
   * (Ambient) Occlusion texture, generally used for subtle 'baked' shadowing effects that are
   * independent of an object's position, such as shading in inset areas and corners. Direct
   * lighting is not affected by occlusion, so at least one indirect light source must be present
   * in the scene for occlusion effects to be visible.
   *
   * The occlusion values are sampled from the R channel. Higher values indicate areas that
   * should receive full indirect lighting and lower values indicate no indirect lighting.
   *
   * Reference:
   * - [glTF → material.occlusionTexture](https://github.com/KhronosGroup/gltf/blob/main/specification/2.0/README.md#materialocclusiontexture)
   */
  getOcclusionTexture() {
    return this.getRef("occlusionTexture");
  }
  /**
   * Settings affecting the material's use of its occlusion texture. If no texture is attached,
   * {@link TextureInfo} is `null`.
   */
  getOcclusionTextureInfo() {
    return this.getRef("occlusionTexture") ? this.getRef("occlusionTextureInfo") : null;
  }
  /** Sets (ambient) occlusion texture. See {@link Material.getOcclusionTexture getOcclusionTexture}. */
  setOcclusionTexture(e) {
    return this.setRef("occlusionTexture", e, {
      channels: nt
    });
  }
  /**********************************************************************************************
   * Metallic / roughness.
   */
  /**
   * Roughness factor; linear multiplier. Affects roughness channel of
   * `metallicRoughnessTexture`. See {@link Material.getMetallicRoughnessTexture getMetallicRoughnessTexture}.
   */
  getRoughnessFactor() {
    return this.get("roughnessFactor");
  }
  /**
   * Sets roughness factor; linear multiplier. Affects roughness channel of
   * `metallicRoughnessTexture`. See {@link Material.getMetallicRoughnessTexture getMetallicRoughnessTexture}.
   */
  setRoughnessFactor(e) {
    return this.set("roughnessFactor", e);
  }
  /**
   * Metallic factor; linear multiplier. Affects roughness channel of
   * `metallicRoughnessTexture`. See {@link Material.getMetallicRoughnessTexture getMetallicRoughnessTexture}.
   */
  getMetallicFactor() {
    return this.get("metallicFactor");
  }
  /**
   * Sets metallic factor; linear multiplier. Affects roughness channel of
   * `metallicRoughnessTexture`. See {@link Material.getMetallicRoughnessTexture getMetallicRoughnessTexture}.
   */
  setMetallicFactor(e) {
    return this.set("metallicFactor", e);
  }
  /**
   * Metallic roughness texture. The metalness values are sampled from the B channel. The
   * roughness values are sampled from the G channel. When a material is fully metallic,
   * or nearly so, it may require image-based lighting (i.e. an environment map) or global
   * illumination to appear well-lit.
   *
   * Reference:
   * - [glTF → material.pbrMetallicRoughness.metallicRoughnessTexture](https://github.com/KhronosGroup/gltf/blob/main/specification/2.0/README.md#pbrmetallicroughnessmetallicroughnesstexture)
   */
  getMetallicRoughnessTexture() {
    return this.getRef("metallicRoughnessTexture");
  }
  /**
   * Settings affecting the material's use of its metallic/roughness texture. If no texture is
   * attached, {@link TextureInfo} is `null`.
   */
  getMetallicRoughnessTextureInfo() {
    return this.getRef("metallicRoughnessTexture") ? this.getRef("metallicRoughnessTextureInfo") : null;
  }
  /**
   * Sets metallic/roughness texture.
   * See {@link Material.getMetallicRoughnessTexture getMetallicRoughnessTexture}.
   */
  setMetallicRoughnessTexture(e) {
    return this.setRef("metallicRoughnessTexture", e, {
      channels: rt | it
    });
  }
}
Fe.AlphaMode = {
  /**
   * The alpha value is ignored and the rendered output is fully opaque
   */
  OPAQUE: "OPAQUE",
  /**
   * The rendered output is either fully opaque or fully transparent depending on the alpha
   * value and the specified alpha cutoff value
   */
  MASK: "MASK",
  /**
   * The alpha value is used to composite the source and destination areas. The rendered
   * output is combined with the background using the normal painting operation (i.e. the
   * Porter and Duff over operator)
   */
  BLEND: "BLEND"
};
class fs extends J {
  init() {
    this.propertyType = d.MESH;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      weights: [],
      primitives: new V()
    });
  }
  /** Adds a {@link Primitive} to the mesh's draw call list. */
  addPrimitive(e) {
    return this.addRef("primitives", e);
  }
  /** Removes a {@link Primitive} from the mesh's draw call list. */
  removePrimitive(e) {
    return this.removeRef("primitives", e);
  }
  /** Lists {@link Primitive} draw calls of the mesh. */
  listPrimitives() {
    return this.listRefs("primitives");
  }
  /**
   * Initial weights of each {@link PrimitiveTarget} on this mesh. Each {@link Primitive} must
   * have the same number of targets. Most engines only support 4-8 active morph targets at a
   * time.
   */
  getWeights() {
    return this.get("weights");
  }
  /**
   * Initial weights of each {@link PrimitiveTarget} on this mesh. Each {@link Primitive} must
   * have the same number of targets. Most engines only support 4-8 active morph targets at a
   * time.
   */
  setWeights(e) {
    return this.set("weights", e);
  }
}
class ls extends J {
  init() {
    this.propertyType = d.NODE;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      translation: [0, 0, 0],
      rotation: [0, 0, 0, 1],
      scale: [1, 1, 1],
      weights: [],
      camera: null,
      mesh: null,
      skin: null,
      children: new V()
    });
  }
  copy(e, t = Oe) {
    if (t === Oe) throw new Error("Node cannot be copied.");
    return super.copy(e, t);
  }
  /**********************************************************************************************
   * Local transform.
   */
  /** Returns the translation (position) of this Node in local space. */
  getTranslation() {
    return this.get("translation");
  }
  /** Returns the rotation (quaternion) of this Node in local space. */
  getRotation() {
    return this.get("rotation");
  }
  /** Returns the scale of this Node in local space. */
  getScale() {
    return this.get("scale");
  }
  /** Sets the translation (position) of this Node in local space. */
  setTranslation(e) {
    return this.set("translation", e);
  }
  /** Sets the rotation (quaternion) of this Node in local space. */
  setRotation(e) {
    return this.set("rotation", e);
  }
  /** Sets the scale of this Node in local space. */
  setScale(e) {
    return this.set("scale", e);
  }
  /** Returns the local matrix of this Node. */
  getMatrix() {
    return L.compose(this.get("translation"), this.get("rotation"), this.get("scale"), []);
  }
  /** Sets the local matrix of this Node. Matrix will be decomposed to TRS properties. */
  setMatrix(e) {
    const t = this.get("translation").slice(), n = this.get("rotation").slice(), s = this.get("scale").slice();
    return L.decompose(e, t, n, s), this.set("translation", t).set("rotation", n).set("scale", s);
  }
  /**********************************************************************************************
   * World transform.
   */
  /** Returns the translation (position) of this Node in world space. */
  getWorldTranslation() {
    const e = [0, 0, 0];
    return L.decompose(this.getWorldMatrix(), e, [0, 0, 0, 1], [1, 1, 1]), e;
  }
  /** Returns the rotation (quaternion) of this Node in world space. */
  getWorldRotation() {
    const e = [0, 0, 0, 1];
    return L.decompose(this.getWorldMatrix(), [0, 0, 0], e, [1, 1, 1]), e;
  }
  /** Returns the scale of this Node in world space. */
  getWorldScale() {
    const e = [1, 1, 1];
    return L.decompose(this.getWorldMatrix(), [0, 0, 0], [0, 0, 0, 1], e), e;
  }
  /** Returns the world matrix of this Node. */
  getWorldMatrix() {
    const e = [];
    for (let s = this; s != null; s = s.getParentNode())
      e.push(s);
    let t;
    const n = e.pop().getMatrix();
    for (; t = e.pop(); )
      Nn(n, n, t.getMatrix());
    return n;
  }
  /**********************************************************************************************
   * Scene hierarchy.
   */
  /**
   * Adds the given Node as a child of this Node.
   *
   * Requirements:
   *
   * 1. Nodes MAY be root children of multiple {@link Scene Scenes}
   * 2. Nodes MUST NOT be children of >1 Node
   * 3. Nodes MUST NOT be children of both Nodes and {@link Scene Scenes}
   *
   * The `addChild` method enforces these restrictions automatically, and will
   * remove the new child from previous parents where needed. This behavior
   * may change in future major releases of the library.
   */
  addChild(e) {
    const t = e.getParentNode();
    t && t.removeChild(e);
    for (const n of e.listParents())
      n.propertyType === d.SCENE && n.removeChild(e);
    return this.addRef("children", e);
  }
  /** Removes a Node from this Node's child Node list. */
  removeChild(e) {
    return this.removeRef("children", e);
  }
  /** Lists all child Nodes of this Node. */
  listChildren() {
    return this.listRefs("children");
  }
  /**
   * Returns the Node's unique parent Node within the scene graph. If the
   * Node has no parents, or is a direct child of the {@link Scene}
   * ("root node"), this method returns null.
   *
   * Unrelated to {@link Property.listParents}, which lists all resource
   * references from properties of any type ({@link Skin}, {@link Root}, ...).
   */
  getParentNode() {
    for (const e of this.listParents())
      if (e.propertyType === d.NODE)
        return e;
    return null;
  }
  /**********************************************************************************************
   * Attachments.
   */
  /** Returns the {@link Mesh}, if any, instantiated at this Node. */
  getMesh() {
    return this.getRef("mesh");
  }
  /**
   * Sets a {@link Mesh} to be instantiated at this Node. A single mesh may be instantiated by
   * multiple Nodes; reuse of this sort is strongly encouraged.
   */
  setMesh(e) {
    return this.setRef("mesh", e);
  }
  /** Returns the {@link Camera}, if any, instantiated at this Node. */
  getCamera() {
    return this.getRef("camera");
  }
  /** Sets a {@link Camera} to be instantiated at this Node. */
  setCamera(e) {
    return this.setRef("camera", e);
  }
  /** Returns the {@link Skin}, if any, instantiated at this Node. */
  getSkin() {
    return this.getRef("skin");
  }
  /** Sets a {@link Skin} to be instantiated at this Node. */
  setSkin(e) {
    return this.setRef("skin", e);
  }
  /**
   * Initial weights of each {@link PrimitiveTarget} for the mesh instance at this Node.
   * Most engines only support 4-8 active morph targets at a time.
   */
  getWeights() {
    return this.get("weights");
  }
  /**
   * Initial weights of each {@link PrimitiveTarget} for the mesh instance at this Node.
   * Most engines only support 4-8 active morph targets at a time.
   */
  setWeights(e) {
    return this.set("weights", e);
  }
  /**********************************************************************************************
   * Helpers.
   */
  /** Visits this {@link Node} and its descendants, top-down. */
  traverse(e) {
    e(this);
    for (const t of this.listChildren()) t.traverse(e);
    return this;
  }
}
class Ue extends J {
  /**********************************************************************************************
   * Instance.
   */
  init() {
    this.propertyType = d.PRIMITIVE;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      mode: Ue.Mode.TRIANGLES,
      material: null,
      indices: null,
      attributes: new ce(),
      targets: new V()
    });
  }
  /**********************************************************************************************
   * Primitive data.
   */
  /** Returns an {@link Accessor} with indices of vertices to be drawn. */
  getIndices() {
    return this.getRef("indices");
  }
  /**
   * Sets an {@link Accessor} with indices of vertices to be drawn. In `TRIANGLES` draw mode,
   * each set of three indices define a triangle. The front face has a counter-clockwise (CCW)
   * winding order.
   */
  setIndices(e) {
    return this.setRef("indices", e, {
      usage: te.ELEMENT_ARRAY_BUFFER
    });
  }
  /** Returns a vertex attribute as an {@link Accessor}. */
  getAttribute(e) {
    return this.getRefMap("attributes", e);
  }
  /**
   * Sets a vertex attribute to an {@link Accessor}. All attributes must have the same vertex
   * count.
   */
  setAttribute(e, t) {
    return this.setRefMap("attributes", e, t, {
      usage: te.ARRAY_BUFFER
    });
  }
  /**
   * Lists all vertex attribute {@link Accessor}s associated with the primitive, excluding any
   * attributes used for morph targets. For example, `[positionAccessor, normalAccessor,
   * uvAccessor]`. Order will be consistent with the order returned by {@link .listSemantics}().
   */
  listAttributes() {
    return this.listRefMapValues("attributes");
  }
  /**
   * Lists all vertex attribute semantics associated with the primitive, excluding any semantics
   * used for morph targets. For example, `['POSITION', 'NORMAL', 'TEXCOORD_0']`. Order will be
   * consistent with the order returned by {@link .listAttributes}().
   */
  listSemantics() {
    return this.listRefMapKeys("attributes");
  }
  /** Returns the material used to render the primitive. */
  getMaterial() {
    return this.getRef("material");
  }
  /** Sets the material used to render the primitive. */
  setMaterial(e) {
    return this.setRef("material", e);
  }
  /**********************************************************************************************
   * Mode.
   */
  /**
   * Returns the GPU draw mode (`TRIANGLES`, `LINES`, `POINTS`...) as a WebGL enum value.
   *
   * Reference:
   * - [glTF → `primitive.mode`](https://github.com/KhronosGroup/gltf/blob/main/specification/2.0/README.md#primitivemode)
   */
  getMode() {
    return this.get("mode");
  }
  /**
   * Sets the GPU draw mode (`TRIANGLES`, `LINES`, `POINTS`...) as a WebGL enum value.
   *
   * Reference:
   * - [glTF → `primitive.mode`](https://github.com/KhronosGroup/gltf/blob/main/specification/2.0/README.md#primitivemode)
   */
  setMode(e) {
    return this.set("mode", e);
  }
  /**********************************************************************************************
   * Morph targets.
   */
  /** Lists all morph targets associated with the primitive. */
  listTargets() {
    return this.listRefs("targets");
  }
  /**
   * Adds a morph target to the primitive. All primitives in the same mesh must have the same
   * number of targets.
   */
  addTarget(e) {
    return this.addRef("targets", e);
  }
  /**
   * Removes a morph target from the primitive. All primitives in the same mesh must have the same
   * number of targets.
   */
  removeTarget(e) {
    return this.removeRef("targets", e);
  }
}
Ue.Mode = {
  /**
   * Each vertex defines a single point primitive.
   * Sequence: {0}, {1}, {2}, ... {i}
   */
  POINTS: 0,
  /**
   * Each consecutive pair of vertices defines a single line primitive.
   * Sequence: {0,1}, {2,3}, {4,5}, ... {i, i+1}
   */
  LINES: 1,
  /**
   * Each vertex is connected to the next, and the last vertex is connected to the first,
   * forming a closed loop of line primitives.
   * Sequence: {0,1}, {1,2}, {2,3}, ... {i, i+1}, {n–1, 0}
   *
   * @deprecated See {@link https://github.com/KhronosGroup/glTF/issues/1883 KhronosGroup/glTF#1883}.
   */
  LINE_LOOP: 2,
  /**
   * Each vertex is connected to the next, forming a contiguous series of line primitives.
   * Sequence: {0,1}, {1,2}, {2,3}, ... {i, i+1}
   */
  LINE_STRIP: 3,
  /**
   * Each consecutive set of three vertices defines a single triangle primitive.
   * Sequence: {0,1,2}, {3,4,5}, {6,7,8}, ... {i, i+1, i+2}
   */
  TRIANGLES: 4,
  /**
   * Each vertex defines one triangle primitive, using the two vertices that follow it.
   * Sequence: {0,1,2}, {1,3,2}, {2,3,4}, ... {i, i+(1+i%2), i+(2–i%2)}
   */
  TRIANGLE_STRIP: 5,
  /**
   * Each consecutive pair of vertices defines a triangle primitive sharing a common vertex at index 0.
   * Sequence: {1,2,0}, {2,3,0}, {3,4,0}, ... {i, i+1, 0}
   *
   * @deprecated See {@link https://github.com/KhronosGroup/glTF/issues/1883 KhronosGroup/glTF#1883}.
   */
  TRIANGLE_FAN: 6
};
class Bn extends Mt {
  init() {
    this.propertyType = d.PRIMITIVE_TARGET;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      attributes: new ce()
    });
  }
  /** Returns a morph target vertex attribute as an {@link Accessor}. */
  getAttribute(e) {
    return this.getRefMap("attributes", e);
  }
  /**
   * Sets a morph target vertex attribute to an {@link Accessor}.
   */
  setAttribute(e, t) {
    return this.setRefMap("attributes", e, t, {
      usage: te.ARRAY_BUFFER
    });
  }
  /**
   * Lists all morph target vertex attribute {@link Accessor}s associated. Order will be
   * consistent with the order returned by {@link .listSemantics}().
   */
  listAttributes() {
    return this.listRefMapValues("attributes");
  }
  /**
   * Lists all morph target vertex attribute semantics associated. Order will be
   * consistent with the order returned by {@link .listAttributes}().
   */
  listSemantics() {
    return this.listRefMapKeys("attributes");
  }
}
function W() {
  return W = Object.assign ? Object.assign.bind() : function(i) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var n in t) ({}).hasOwnProperty.call(t, n) && (i[n] = t[n]);
    }
    return i;
  }, W.apply(null, arguments);
}
class hs extends J {
  init() {
    this.propertyType = d.SCENE;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      children: new V()
    });
  }
  copy(e, t = Oe) {
    if (t === Oe) throw new Error("Scene cannot be copied.");
    return super.copy(e, t);
  }
  /**
   * Adds a {@link Node} to the Scene.
   *
   * Requirements:
   *
   * 1. Nodes MAY be root children of multiple {@link Scene Scenes}
   * 2. Nodes MUST NOT be children of >1 Node
   * 3. Nodes MUST NOT be children of both Nodes and {@link Scene Scenes}
   *
   * The `addChild` method enforces these restrictions automatically, and will
   * remove the new child from previous parents where needed. This behavior
   * may change in future major releases of the library.
   */
  addChild(e) {
    const t = e.getParentNode();
    return t && t.removeChild(e), this.addRef("children", e);
  }
  /** Removes a {@link Node} from the Scene. */
  removeChild(e) {
    return this.removeRef("children", e);
  }
  /**
   * Lists all direct child {@link Node Nodes} in the Scene. Indirect
   * descendants (children of children) are not returned, but may be
   * reached recursively or with {@link Scene.traverse} instead.
   */
  listChildren() {
    return this.listRefs("children");
  }
  /** Visits each {@link Node} in the Scene, including descendants, top-down. */
  traverse(e) {
    for (const t of this.listChildren()) t.traverse(e);
    return this;
  }
}
class ds extends J {
  init() {
    this.propertyType = d.SKIN;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      skeleton: null,
      inverseBindMatrices: null,
      joints: new V()
    });
  }
  /**
   * {@link Node} used as a skeleton root. The node must be the closest common root of the joints
   * hierarchy or a direct or indirect parent node of the closest common root.
   */
  getSkeleton() {
    return this.getRef("skeleton");
  }
  /**
   * {@link Node} used as a skeleton root. The node must be the closest common root of the joints
   * hierarchy or a direct or indirect parent node of the closest common root.
   */
  setSkeleton(e) {
    return this.setRef("skeleton", e);
  }
  /**
   * {@link Accessor} containing the floating-point 4x4 inverse-bind matrices. The default is
   * that each matrix is a 4x4 identity matrix, which implies that inverse-bind matrices were
   * pre-applied.
   */
  getInverseBindMatrices() {
    return this.getRef("inverseBindMatrices");
  }
  /**
   * {@link Accessor} containing the floating-point 4x4 inverse-bind matrices. The default is
   * that each matrix is a 4x4 identity matrix, which implies that inverse-bind matrices were
   * pre-applied.
   */
  setInverseBindMatrices(e) {
    return this.setRef("inverseBindMatrices", e, {
      usage: te.INVERSE_BIND_MATRICES
    });
  }
  /** Adds a joint {@link Node} to this {@link Skin}. */
  addJoint(e) {
    return this.addRef("joints", e);
  }
  /** Removes a joint {@link Node} from this {@link Skin}. */
  removeJoint(e) {
    return this.removeRef("joints", e);
  }
  /** Lists joints ({@link Node}s used as joints or bones) in this {@link Skin}. */
  listJoints() {
    return this.listRefs("joints");
  }
}
class gs extends J {
  init() {
    this.propertyType = d.TEXTURE;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      image: null,
      mimeType: "",
      uri: ""
    });
  }
  /**********************************************************************************************
   * MIME type / format.
   */
  /** Returns the MIME type for this texture ('image/jpeg' or 'image/png'). */
  getMimeType() {
    return this.get("mimeType") || ue.extensionToMimeType(Ge.extension(this.get("uri")));
  }
  /**
   * Sets the MIME type for this texture ('image/jpeg' or 'image/png'). If the texture does not
   * have a URI, a MIME type is required for correct export.
   */
  setMimeType(e) {
    return this.set("mimeType", e);
  }
  /**********************************************************************************************
   * URI / filename.
   */
  /** Returns the URI (e.g. 'path/to/file.png') for this texture. */
  getURI() {
    return this.get("uri");
  }
  /**
   * Sets the URI (e.g. 'path/to/file.png') for this texture. If the texture does not have a MIME
   * type, a URI is required for correct export.
   */
  setURI(e) {
    this.set("uri", e);
    const t = ue.extensionToMimeType(Ge.extension(e));
    return t && this.set("mimeType", t), this;
  }
  /**********************************************************************************************
   * Image data.
   */
  /** Returns the raw image data for this texture. */
  getImage() {
    return this.get("image");
  }
  /** Sets the raw image data for this texture. */
  setImage(e) {
    return this.set("image", D.assertView(e));
  }
  /** Returns the size, in pixels, of this texture. */
  getSize() {
    const e = this.get("image");
    return e ? ue.getSize(e, this.getMimeType()) : null;
  }
}
class ps extends J {
  init() {
    this.propertyType = d.ROOT;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      asset: {
        generator: `glTF-Transform ${rs}`,
        version: "2.0"
      },
      defaultScene: null,
      accessors: new V(),
      animations: new V(),
      buffers: new V(),
      cameras: new V(),
      materials: new V(),
      meshes: new V(),
      nodes: new V(),
      scenes: new V(),
      skins: new V(),
      textures: new V()
    });
  }
  /** @internal */
  constructor(e) {
    super(e), this._extensions = /* @__PURE__ */ new Set(), e.addEventListener("node:create", (t) => {
      this._addChildOfRoot(t.target);
    });
  }
  clone() {
    throw new Error("Root cannot be cloned.");
  }
  copy(e, t = Oe) {
    if (t === Oe) throw new Error("Root cannot be copied.");
    this.set("asset", W({}, e.get("asset"))), this.setName(e.getName()), this.setExtras(W({}, e.getExtras())), this.setDefaultScene(e.getDefaultScene() ? t(e.getDefaultScene()) : null);
    for (const n of e.listRefMapKeys("extensions")) {
      const s = e.getExtension(n);
      this.setExtension(n, t(s));
    }
    return this;
  }
  _addChildOfRoot(e) {
    return e instanceof hs ? this.addRef("scenes", e) : e instanceof ls ? this.addRef("nodes", e) : e instanceof Be ? this.addRef("cameras", e) : e instanceof ds ? this.addRef("skins", e) : e instanceof fs ? this.addRef("meshes", e) : e instanceof Fe ? this.addRef("materials", e) : e instanceof gs ? this.addRef("textures", e) : e instanceof cs ? this.addRef("animations", e) : e instanceof S ? this.addRef("accessors", e) : e instanceof us && this.addRef("buffers", e), this;
  }
  /**
   * Returns the `asset` object, which specifies the target glTF version of the asset. Additional
   * metadata can be stored in optional properties such as `generator` or `copyright`.
   *
   * Reference: [glTF → Asset](https://github.com/KhronosGroup/gltf/blob/main/specification/2.0/README.md#asset)
   */
  getAsset() {
    return this.get("asset");
  }
  /**********************************************************************************************
   * Extensions.
   */
  /** Lists all {@link Extension Extensions} enabled for this root. */
  listExtensionsUsed() {
    return Array.from(this._extensions);
  }
  /** Lists all {@link Extension Extensions} enabled and required for this root. */
  listExtensionsRequired() {
    return this.listExtensionsUsed().filter((e) => e.isRequired());
  }
  /** @internal */
  _enableExtension(e) {
    return this._extensions.add(e), this;
  }
  /** @internal */
  _disableExtension(e) {
    return this._extensions.delete(e), this;
  }
  /**********************************************************************************************
   * Properties.
   */
  /** Lists all {@link Scene} properties associated with this root. */
  listScenes() {
    return this.listRefs("scenes");
  }
  /** Default {@link Scene} associated with this root. */
  setDefaultScene(e) {
    return this.setRef("defaultScene", e);
  }
  /** Default {@link Scene} associated with this root. */
  getDefaultScene() {
    return this.getRef("defaultScene");
  }
  /** Lists all {@link Node} properties associated with this root. */
  listNodes() {
    return this.listRefs("nodes");
  }
  /** Lists all {@link Camera} properties associated with this root. */
  listCameras() {
    return this.listRefs("cameras");
  }
  /** Lists all {@link Skin} properties associated with this root. */
  listSkins() {
    return this.listRefs("skins");
  }
  /** Lists all {@link Mesh} properties associated with this root. */
  listMeshes() {
    return this.listRefs("meshes");
  }
  /** Lists all {@link Material} properties associated with this root. */
  listMaterials() {
    return this.listRefs("materials");
  }
  /** Lists all {@link Texture} properties associated with this root. */
  listTextures() {
    return this.listRefs("textures");
  }
  /** Lists all {@link Animation} properties associated with this root. */
  listAnimations() {
    return this.listRefs("animations");
  }
  /** Lists all {@link Accessor} properties associated with this root. */
  listAccessors() {
    return this.listRefs("accessors");
  }
  /** Lists all {@link Buffer} properties associated with this root. */
  listBuffers() {
    return this.listRefs("buffers");
  }
}
class Je {
  /**
   * Returns the Document associated with a given Graph, if any.
   * @hidden
   * @experimental
   */
  static fromGraph(e) {
    return Je._GRAPH_DOCUMENTS.get(e) || null;
  }
  /** Creates a new Document, representing an empty glTF asset. */
  constructor() {
    this._graph = new gn(), this._root = new ps(this._graph), this._logger = oe.DEFAULT_INSTANCE, Je._GRAPH_DOCUMENTS.set(this._graph, this);
  }
  /** Returns the glTF {@link Root} property. */
  getRoot() {
    return this._root;
  }
  /**
   * Returns the {@link Graph} representing connectivity of resources within this document.
   * @hidden
   */
  getGraph() {
    return this._graph;
  }
  /** Returns the {@link Logger} instance used for any operations performed on this document. */
  getLogger() {
    return this._logger;
  }
  /**
   * Overrides the {@link Logger} instance used for any operations performed on this document.
   *
   * Usage:
   *
   * ```ts
   * doc
   * 	.setLogger(new Logger(Logger.Verbosity.SILENT))
   * 	.transform(dedup(), weld());
   * ```
   */
  setLogger(e) {
    return this._logger = e, this;
  }
  /**
   * Clones this Document, copying all resources within it.
   * @deprecated Use 'cloneDocument(document)' from '@gltf-transform/functions'.
   * @hidden
   * @internal
   */
  clone() {
    throw new Error("Use 'cloneDocument(source)' from '@gltf-transform/functions'.");
  }
  /**
   * Merges the content of another Document into this one, without affecting the original.
   * @deprecated Use 'mergeDocuments(target, source)' from '@gltf-transform/functions'.
   * @hidden
   * @internal
   */
  merge(e) {
    throw new Error("Use 'mergeDocuments(target, source)' from '@gltf-transform/functions'.");
  }
  /**
   * Applies a series of modifications to this document. Each transformation is asynchronous,
   * takes the {@link Document} as input, and returns nothing. Transforms are applied in the
   * order given, which may affect the final result.
   *
   * Usage:
   *
   * ```ts
   * await doc.transform(
   * 	dedup(),
   * 	prune()
   * );
   * ```
   *
   * @param transforms List of synchronous transformation functions to apply.
   */
  async transform(...e) {
    const t = e.map((n) => n.name);
    for (const n of e)
      await n(this, {
        stack: t
      });
    return this;
  }
  /**********************************************************************************************
   * Extension factory methods.
   */
  /**
   * Creates a new {@link Extension}, for the extension type of the given constructor. If the
   * extension is already enabled for this Document, the previous Extension reference is reused.
   */
  createExtension(e) {
    const t = e.EXTENSION_NAME;
    return this.getRoot().listExtensionsUsed().find((s) => s.extensionName === t) || new e(this);
  }
  /**
   * Disables and removes an {@link Extension} from the Document. If no Extension exists with
   * the given name, this method has no effect.
   */
  disposeExtension(e) {
    const t = this.getRoot().listExtensionsUsed().find((n) => n.extensionName === e);
    t && t.dispose();
  }
  /**********************************************************************************************
   * Property factory methods.
   */
  /** Creates a new {@link Scene} attached to this document's {@link Root}. */
  createScene(e = "") {
    return new hs(this._graph, e);
  }
  /** Creates a new {@link Node} attached to this document's {@link Root}. */
  createNode(e = "") {
    return new ls(this._graph, e);
  }
  /** Creates a new {@link Camera} attached to this document's {@link Root}. */
  createCamera(e = "") {
    return new Be(this._graph, e);
  }
  /** Creates a new {@link Skin} attached to this document's {@link Root}. */
  createSkin(e = "") {
    return new ds(this._graph, e);
  }
  /** Creates a new {@link Mesh} attached to this document's {@link Root}. */
  createMesh(e = "") {
    return new fs(this._graph, e);
  }
  /**
   * Creates a new {@link Primitive}. Primitives must be attached to a {@link Mesh}
   * for use and export; they are not otherwise associated with a {@link Root}.
   */
  createPrimitive() {
    return new Ue(this._graph);
  }
  /**
   * Creates a new {@link PrimitiveTarget}, or morph target. Targets must be attached to a
   * {@link Primitive} for use and export; they are not otherwise associated with a {@link Root}.
   */
  createPrimitiveTarget(e = "") {
    return new Bn(this._graph, e);
  }
  /** Creates a new {@link Material} attached to this document's {@link Root}. */
  createMaterial(e = "") {
    return new Fe(this._graph, e);
  }
  /** Creates a new {@link Texture} attached to this document's {@link Root}. */
  createTexture(e = "") {
    return new gs(this._graph, e);
  }
  /** Creates a new {@link Animation} attached to this document's {@link Root}. */
  createAnimation(e = "") {
    return new cs(this._graph, e);
  }
  /**
   * Creates a new {@link AnimationChannel}. Channels must be attached to an {@link Animation}
   * for use and export; they are not otherwise associated with a {@link Root}.
   */
  createAnimationChannel(e = "") {
    return new bt(this._graph, e);
  }
  /**
   * Creates a new {@link AnimationSampler}. Samplers must be attached to an {@link Animation}
   * for use and export; they are not otherwise associated with a {@link Root}.
   */
  createAnimationSampler(e = "") {
    return new ze(this._graph, e);
  }
  /** Creates a new {@link Accessor} attached to this document's {@link Root}. */
  createAccessor(e = "", t = null) {
    return t || (t = this.getRoot().listBuffers()[0]), new S(this._graph, e).setBuffer(t);
  }
  /** Creates a new {@link Buffer} attached to this document's {@link Root}. */
  createBuffer(e = "") {
    return new us(this._graph, e);
  }
}
Je._GRAPH_DOCUMENTS = /* @__PURE__ */ new WeakMap();
class k {
  /** @hidden */
  constructor(e) {
    this.extensionName = "", this.prereadTypes = [], this.prewriteTypes = [], this.readDependencies = [], this.writeDependencies = [], this.document = void 0, this.required = !1, this.properties = /* @__PURE__ */ new Set(), this._listener = void 0, this.document = e, e.getRoot()._enableExtension(this), this._listener = (n) => {
      const s = n, r = s.target;
      r instanceof H && r.extensionName === this.extensionName && (s.type === "node:create" && this._addExtensionProperty(r), s.type === "node:dispose" && this._removeExtensionProperty(r));
    };
    const t = e.getGraph();
    t.addEventListener("node:create", this._listener), t.addEventListener("node:dispose", this._listener);
  }
  /** Disables and removes the extension from the Document. */
  dispose() {
    this.document.getRoot()._disableExtension(this);
    const e = this.document.getGraph();
    e.removeEventListener("node:create", this._listener), e.removeEventListener("node:dispose", this._listener);
    for (const t of this.properties)
      t.dispose();
  }
  /** @hidden Performs first-time setup for the extension. Must be idempotent. */
  static register() {
  }
  /**
   * Indicates to the client whether it is OK to load the asset when this extension is not
   * recognized. Optional extensions are generally preferred, if there is not a good reason
   * to require a client to completely fail when an extension isn't known.
   */
  isRequired() {
    return this.required;
  }
  /**
   * Indicates to the client whether it is OK to load the asset when this extension is not
   * recognized. Optional extensions are generally preferred, if there is not a good reason
   * to require a client to completely fail when an extension isn't known.
   */
  setRequired(e) {
    return this.required = e, this;
  }
  /**
   * Lists all {@link ExtensionProperty} instances associated with, or created by, this
   * extension. Includes only instances that are attached to the Document's graph; detached
   * instances will be excluded.
   */
  listProperties() {
    return Array.from(this.properties);
  }
  /**********************************************************************************************
   * ExtensionProperty management.
   */
  /** @internal */
  _addExtensionProperty(e) {
    return this.properties.add(e), this;
  }
  /** @internal */
  _removeExtensionProperty(e) {
    return this.properties.delete(e), this;
  }
  /**********************************************************************************************
   * I/O implementation.
   */
  /** @hidden Installs dependencies required by the extension. */
  install(e, t) {
    return this;
  }
  /**
   * Used by the {@link PlatformIO} utilities when reading a glTF asset. This method may
   * optionally be implemented by an extension, and should then support any property type
   * declared by the Extension's {@link Extension.prereadTypes} list. The Extension will
   * be given a ReaderContext instance, and is expected to update either the context or its
   * {@link JSONDocument} with resources known to the Extension. *Most extensions don't need to
   * implement this.*
   * @hidden
   */
  preread(e, t) {
    return this;
  }
  /**
   * Used by the {@link PlatformIO} utilities when writing a glTF asset. This method may
   * optionally be implemented by an extension, and should then support any property type
   * declared by the Extension's {@link Extension.prewriteTypes} list. The Extension will
   * be given a WriterContext instance, and is expected to update either the context or its
   * {@link JSONDocument} with resources known to the Extension. *Most extensions don't need to
   * implement this.*
   * @hidden
   */
  prewrite(e, t) {
    return this;
  }
}
k.EXTENSION_NAME = void 0;
class Ln {
  constructor(e) {
    this.jsonDoc = void 0, this.buffers = [], this.bufferViews = [], this.bufferViewBuffers = [], this.accessors = [], this.textures = [], this.textureInfos = /* @__PURE__ */ new Map(), this.materials = [], this.meshes = [], this.cameras = [], this.nodes = [], this.skins = [], this.animations = [], this.scenes = [], this.jsonDoc = e;
  }
  setTextureInfo(e, t) {
    this.textureInfos.set(e, t), t.texCoord !== void 0 && e.setTexCoord(t.texCoord), t.extras !== void 0 && e.setExtras(t.extras);
    const n = this.jsonDoc.json.textures[t.index];
    if (n.sampler === void 0) return;
    const s = this.jsonDoc.json.samplers[n.sampler];
    s.magFilter !== void 0 && e.setMagFilter(s.magFilter), s.minFilter !== void 0 && e.setMinFilter(s.minFilter), s.wrapS !== void 0 && e.setWrapS(s.wrapS), s.wrapT !== void 0 && e.setWrapT(s.wrapT);
  }
}
const Vt = {
  logger: oe.DEFAULT_INSTANCE,
  extensions: [],
  dependencies: {}
}, jn = /* @__PURE__ */ new Set([d.BUFFER, d.TEXTURE, d.MATERIAL, d.MESH, d.PRIMITIVE, d.NODE, d.SCENE]);
class Pn {
  static read(e, t = Vt) {
    const n = W({}, Vt, t), {
      json: s
    } = e, r = new Je().setLogger(n.logger);
    this.validate(e, n);
    const o = new Ln(e), a = s.asset, c = r.getRoot().getAsset();
    a.copyright && (c.copyright = a.copyright), a.extras && (c.extras = a.extras), s.extras !== void 0 && r.getRoot().setExtras(W({}, s.extras));
    const u = s.extensionsUsed || [], h = s.extensionsRequired || [];
    n.extensions.sort((f, p) => f.EXTENSION_NAME > p.EXTENSION_NAME ? 1 : -1);
    for (const f of n.extensions)
      if (u.includes(f.EXTENSION_NAME)) {
        const p = r.createExtension(f).setRequired(h.includes(f.EXTENSION_NAME)), R = p.prereadTypes.filter((N) => !jn.has(N));
        R.length && n.logger.warn(`Preread hooks for some types (${R.join()}), requested by extension ${p.extensionName}, are unsupported. Please file an issue or a PR.`);
        for (const N of p.readDependencies)
          p.install(N, n.dependencies[N]);
      }
    const g = s.buffers || [];
    r.getRoot().listExtensionsUsed().filter((f) => f.prereadTypes.includes(d.BUFFER)).forEach((f) => f.preread(o, d.BUFFER)), o.buffers = g.map((f) => {
      const p = r.createBuffer(f.name);
      return f.extras && p.setExtras(f.extras), f.uri && f.uri.indexOf("__") !== 0 && p.setURI(f.uri), p;
    });
    const m = s.bufferViews || [];
    o.bufferViewBuffers = m.map((f, p) => {
      if (!o.bufferViews[p]) {
        const R = e.json.buffers[f.buffer], N = R.uri ? e.resources[R.uri] : e.resources[ke], C = f.byteOffset || 0;
        o.bufferViews[p] = D.toView(N, C, f.byteLength);
      }
      return o.buffers[f.buffer];
    });
    const x = s.accessors || [];
    o.accessors = x.map((f) => {
      const p = o.bufferViewBuffers[f.bufferView], R = r.createAccessor(f.name, p).setType(f.type);
      return f.extras && R.setExtras(f.extras), f.normalized !== void 0 && R.setNormalized(f.normalized), f.bufferView === void 0 || R.setArray(at(f, o)), R;
    });
    const A = s.images || [], b = s.textures || [];
    r.getRoot().listExtensionsUsed().filter((f) => f.prereadTypes.includes(d.TEXTURE)).forEach((f) => f.preread(o, d.TEXTURE)), o.textures = A.map((f) => {
      const p = r.createTexture(f.name);
      if (f.extras && p.setExtras(f.extras), f.bufferView !== void 0) {
        const R = s.bufferViews[f.bufferView], N = e.json.buffers[R.buffer], C = N.uri ? e.resources[N.uri] : e.resources[ke], O = R.byteOffset || 0, w = R.byteLength, F = C.slice(O, O + w);
        p.setImage(F);
      } else f.uri !== void 0 && (p.setImage(e.resources[f.uri]), f.uri.indexOf("__") !== 0 && p.setURI(f.uri));
      if (f.mimeType !== void 0)
        p.setMimeType(f.mimeType);
      else if (f.uri) {
        const R = Ge.extension(f.uri);
        p.setMimeType(ue.extensionToMimeType(R));
      }
      return p;
    }), r.getRoot().listExtensionsUsed().filter((f) => f.prereadTypes.includes(d.MATERIAL)).forEach((f) => f.preread(o, d.MATERIAL));
    const _ = s.materials || [];
    o.materials = _.map((f) => {
      const p = r.createMaterial(f.name);
      f.extras && p.setExtras(f.extras), f.alphaMode !== void 0 && p.setAlphaMode(f.alphaMode), f.alphaCutoff !== void 0 && p.setAlphaCutoff(f.alphaCutoff), f.doubleSided !== void 0 && p.setDoubleSided(f.doubleSided);
      const R = f.pbrMetallicRoughness || {};
      if (R.baseColorFactor !== void 0 && p.setBaseColorFactor(R.baseColorFactor), f.emissiveFactor !== void 0 && p.setEmissiveFactor(f.emissiveFactor), R.metallicFactor !== void 0 && p.setMetallicFactor(R.metallicFactor), R.roughnessFactor !== void 0 && p.setRoughnessFactor(R.roughnessFactor), R.baseColorTexture !== void 0) {
        const N = R.baseColorTexture, C = o.textures[b[N.index].source];
        p.setBaseColorTexture(C), o.setTextureInfo(p.getBaseColorTextureInfo(), N);
      }
      if (f.emissiveTexture !== void 0) {
        const N = f.emissiveTexture, C = o.textures[b[N.index].source];
        p.setEmissiveTexture(C), o.setTextureInfo(p.getEmissiveTextureInfo(), N);
      }
      if (f.normalTexture !== void 0) {
        const N = f.normalTexture, C = o.textures[b[N.index].source];
        p.setNormalTexture(C), o.setTextureInfo(p.getNormalTextureInfo(), N), f.normalTexture.scale !== void 0 && p.setNormalScale(f.normalTexture.scale);
      }
      if (f.occlusionTexture !== void 0) {
        const N = f.occlusionTexture, C = o.textures[b[N.index].source];
        p.setOcclusionTexture(C), o.setTextureInfo(p.getOcclusionTextureInfo(), N), f.occlusionTexture.strength !== void 0 && p.setOcclusionStrength(f.occlusionTexture.strength);
      }
      if (R.metallicRoughnessTexture !== void 0) {
        const N = R.metallicRoughnessTexture, C = o.textures[b[N.index].source];
        p.setMetallicRoughnessTexture(C), o.setTextureInfo(p.getMetallicRoughnessTextureInfo(), N);
      }
      return p;
    }), r.getRoot().listExtensionsUsed().filter((f) => f.prereadTypes.includes(d.MESH)).forEach((f) => f.preread(o, d.MESH));
    const l = s.meshes || [];
    r.getRoot().listExtensionsUsed().filter((f) => f.prereadTypes.includes(d.PRIMITIVE)).forEach((f) => f.preread(o, d.PRIMITIVE)), o.meshes = l.map((f) => {
      const p = r.createMesh(f.name);
      return f.extras && p.setExtras(f.extras), f.weights !== void 0 && p.setWeights(f.weights), (f.primitives || []).forEach((N) => {
        const C = r.createPrimitive();
        N.extras && C.setExtras(N.extras), N.material !== void 0 && C.setMaterial(o.materials[N.material]), N.mode !== void 0 && C.setMode(N.mode);
        for (const [F, v] of Object.entries(N.attributes || {}))
          C.setAttribute(F, o.accessors[v]);
        N.indices !== void 0 && C.setIndices(o.accessors[N.indices]);
        const O = f.extras && f.extras.targetNames || [];
        (N.targets || []).forEach((F, v) => {
          const U = O[v] || v.toString(), P = r.createPrimitiveTarget(U);
          for (const [Q, $] of Object.entries(F))
            P.setAttribute(Q, o.accessors[$]);
          C.addTarget(P);
        }), p.addPrimitive(C);
      }), p;
    });
    const M = s.cameras || [];
    o.cameras = M.map((f) => {
      const p = r.createCamera(f.name).setType(f.type);
      if (f.extras && p.setExtras(f.extras), f.type === Be.Type.PERSPECTIVE) {
        const R = f.perspective;
        p.setYFov(R.yfov), p.setZNear(R.znear), R.zfar !== void 0 && p.setZFar(R.zfar), R.aspectRatio !== void 0 && p.setAspectRatio(R.aspectRatio);
      } else {
        const R = f.orthographic;
        p.setZNear(R.znear).setZFar(R.zfar).setXMag(R.xmag).setYMag(R.ymag);
      }
      return p;
    });
    const T = s.nodes || [];
    r.getRoot().listExtensionsUsed().filter((f) => f.prereadTypes.includes(d.NODE)).forEach((f) => f.preread(o, d.NODE)), o.nodes = T.map((f) => {
      const p = r.createNode(f.name);
      if (f.extras && p.setExtras(f.extras), f.translation !== void 0 && p.setTranslation(f.translation), f.rotation !== void 0 && p.setRotation(f.rotation), f.scale !== void 0 && p.setScale(f.scale), f.matrix !== void 0) {
        const R = [0, 0, 0], N = [0, 0, 0, 1], C = [1, 1, 1];
        L.decompose(f.matrix, R, N, C), p.setTranslation(R), p.setRotation(N), p.setScale(C);
      }
      return f.weights !== void 0 && p.setWeights(f.weights), p;
    });
    const y = s.skins || [];
    o.skins = y.map((f) => {
      const p = r.createSkin(f.name);
      f.extras && p.setExtras(f.extras), f.inverseBindMatrices !== void 0 && p.setInverseBindMatrices(o.accessors[f.inverseBindMatrices]), f.skeleton !== void 0 && p.setSkeleton(o.nodes[f.skeleton]);
      for (const R of f.joints)
        p.addJoint(o.nodes[R]);
      return p;
    }), T.map((f, p) => {
      const R = o.nodes[p];
      (f.children || []).forEach((C) => R.addChild(o.nodes[C])), f.mesh !== void 0 && R.setMesh(o.meshes[f.mesh]), f.camera !== void 0 && R.setCamera(o.cameras[f.camera]), f.skin !== void 0 && R.setSkin(o.skins[f.skin]);
    });
    const E = s.animations || [];
    o.animations = E.map((f) => {
      const p = r.createAnimation(f.name);
      f.extras && p.setExtras(f.extras);
      const N = (f.samplers || []).map((O) => {
        const w = r.createAnimationSampler().setInput(o.accessors[O.input]).setOutput(o.accessors[O.output]).setInterpolation(O.interpolation || ze.Interpolation.LINEAR);
        return O.extras && w.setExtras(O.extras), p.addSampler(w), w;
      });
      return (f.channels || []).forEach((O) => {
        const w = r.createAnimationChannel().setSampler(N[O.sampler]).setTargetPath(O.target.path);
        O.target.node !== void 0 && w.setTargetNode(o.nodes[O.target.node]), O.extras && w.setExtras(O.extras), p.addChannel(w);
      }), p;
    });
    const I = s.scenes || [];
    return r.getRoot().listExtensionsUsed().filter((f) => f.prereadTypes.includes(d.SCENE)).forEach((f) => f.preread(o, d.SCENE)), o.scenes = I.map((f) => {
      const p = r.createScene(f.name);
      return f.extras && p.setExtras(f.extras), (f.nodes || []).map((N) => o.nodes[N]).forEach((N) => p.addChild(N)), p;
    }), s.scene !== void 0 && r.getRoot().setDefaultScene(o.scenes[s.scene]), r.getRoot().listExtensionsUsed().forEach((f) => f.read(o)), x.forEach((f, p) => {
      const R = o.accessors[p], N = !!f.sparse, C = !f.bufferView && !R.getArray();
      (N || C) && R.setSparse(!0).setArray(kn(f, o));
    }), r;
  }
  static validate(e, t) {
    const n = e.json;
    if (n.asset.version !== "2.0")
      throw new Error(`Unsupported glTF version, "${n.asset.version}".`);
    if (n.extensionsRequired) {
      for (const s of n.extensionsRequired)
        if (!t.extensions.find((r) => r.EXTENSION_NAME === s))
          throw new Error(`Missing required extension, "${s}".`);
    }
    if (n.extensionsUsed)
      for (const s of n.extensionsUsed)
        t.extensions.find((r) => r.EXTENSION_NAME === s) || t.logger.warn(`Missing optional extension, "${s}".`);
  }
}
function Vn(i, e) {
  const t = e.jsonDoc, n = e.bufferViews[i.bufferView], s = t.json.bufferViews[i.bufferView], r = lt[i.componentType], o = S.getElementSize(i.type), a = r.BYTES_PER_ELEMENT, c = i.byteOffset || 0, u = new r(i.count * o), h = new DataView(n.buffer, n.byteOffset, n.byteLength), g = s.byteStride;
  for (let m = 0; m < i.count; m++)
    for (let x = 0; x < o; x++) {
      const A = c + m * g + x * a;
      let b;
      switch (i.componentType) {
        case S.ComponentType.FLOAT:
          b = h.getFloat32(A, !0);
          break;
        case S.ComponentType.UNSIGNED_INT:
          b = h.getUint32(A, !0);
          break;
        case S.ComponentType.UNSIGNED_SHORT:
          b = h.getUint16(A, !0);
          break;
        case S.ComponentType.UNSIGNED_BYTE:
          b = h.getUint8(A);
          break;
        case S.ComponentType.SHORT:
          b = h.getInt16(A, !0);
          break;
        case S.ComponentType.BYTE:
          b = h.getInt8(A);
          break;
        default:
          throw new Error(`Unexpected componentType "${i.componentType}".`);
      }
      u[m * o + x] = b;
    }
  return u;
}
function at(i, e) {
  const t = e.jsonDoc, n = e.bufferViews[i.bufferView], s = t.json.bufferViews[i.bufferView], r = lt[i.componentType], o = S.getElementSize(i.type), a = r.BYTES_PER_ELEMENT, c = o * a;
  if (s.byteStride !== void 0 && s.byteStride !== c)
    return Vn(i, e);
  const u = n.byteOffset + (i.byteOffset || 0), h = i.count * o * a;
  return new r(n.buffer.slice(u, u + h));
}
function kn(i, e) {
  const t = lt[i.componentType], n = S.getElementSize(i.type);
  let s;
  i.bufferView !== void 0 ? s = at(i, e) : s = new t(i.count * n);
  const r = i.sparse;
  if (!r) return s;
  const o = r.count, a = W({}, i, r.indices, {
    count: o,
    type: "SCALAR"
  }), c = W({}, i, r.values, {
    count: o
  }), u = at(a, e), h = at(c, e);
  for (let g = 0; g < a.count; g++)
    for (let m = 0; m < n; m++)
      s[u[g] * n + m] = h[g * n + m];
  return s;
}
var Qe;
(function(i) {
  i[i.ARRAY_BUFFER = 34962] = "ARRAY_BUFFER", i[i.ELEMENT_ARRAY_BUFFER = 34963] = "ELEMENT_ARRAY_BUFFER";
})(Qe || (Qe = {}));
class fe {
  constructor(e, t, n) {
    this._doc = void 0, this.jsonDoc = void 0, this.options = void 0, this.accessorIndexMap = /* @__PURE__ */ new Map(), this.animationIndexMap = /* @__PURE__ */ new Map(), this.bufferIndexMap = /* @__PURE__ */ new Map(), this.cameraIndexMap = /* @__PURE__ */ new Map(), this.skinIndexMap = /* @__PURE__ */ new Map(), this.materialIndexMap = /* @__PURE__ */ new Map(), this.meshIndexMap = /* @__PURE__ */ new Map(), this.nodeIndexMap = /* @__PURE__ */ new Map(), this.imageIndexMap = /* @__PURE__ */ new Map(), this.textureDefIndexMap = /* @__PURE__ */ new Map(), this.textureInfoDefMap = /* @__PURE__ */ new Map(), this.samplerDefIndexMap = /* @__PURE__ */ new Map(), this.sceneIndexMap = /* @__PURE__ */ new Map(), this.imageBufferViews = [], this.otherBufferViews = /* @__PURE__ */ new Map(), this.otherBufferViewsIndexMap = /* @__PURE__ */ new Map(), this.extensionData = {}, this.bufferURIGenerator = void 0, this.imageURIGenerator = void 0, this.logger = void 0, this._accessorUsageMap = /* @__PURE__ */ new Map(), this.accessorUsageGroupedByParent = /* @__PURE__ */ new Set(["ARRAY_BUFFER"]), this.accessorParents = /* @__PURE__ */ new Map(), this._doc = e, this.jsonDoc = t, this.options = n;
    const s = e.getRoot(), r = s.listBuffers().length, o = s.listTextures().length;
    this.bufferURIGenerator = new kt(r > 1, () => n.basename || "buffer"), this.imageURIGenerator = new kt(o > 1, (a) => Gn(e, a) || n.basename || "texture"), this.logger = e.getLogger();
  }
  /**
   * Creates a TextureInfo definition, and any Texture or Sampler definitions it requires. If
   * possible, Texture and Sampler definitions are shared.
   */
  createTextureInfoDef(e, t) {
    const n = {
      magFilter: t.getMagFilter() || void 0,
      minFilter: t.getMinFilter() || void 0,
      wrapS: t.getWrapS(),
      wrapT: t.getWrapT()
    }, s = JSON.stringify(n);
    this.samplerDefIndexMap.has(s) || (this.samplerDefIndexMap.set(s, this.jsonDoc.json.samplers.length), this.jsonDoc.json.samplers.push(n));
    const r = {
      source: this.imageIndexMap.get(e),
      sampler: this.samplerDefIndexMap.get(s)
    }, o = JSON.stringify(r);
    this.textureDefIndexMap.has(o) || (this.textureDefIndexMap.set(o, this.jsonDoc.json.textures.length), this.jsonDoc.json.textures.push(r));
    const a = {
      index: this.textureDefIndexMap.get(o)
    };
    return t.getTexCoord() !== 0 && (a.texCoord = t.getTexCoord()), Object.keys(t.getExtras()).length > 0 && (a.extras = t.getExtras()), this.textureInfoDefMap.set(t, a), a;
  }
  createPropertyDef(e) {
    const t = {};
    return e.getName() && (t.name = e.getName()), Object.keys(e.getExtras()).length > 0 && (t.extras = e.getExtras()), t;
  }
  createAccessorDef(e) {
    const t = this.createPropertyDef(e);
    return t.type = e.getType(), t.componentType = e.getComponentType(), t.count = e.getCount(), this._doc.getGraph().listParentEdges(e).some((s) => s.getName() === "attributes" && s.getAttributes().key === "POSITION" || s.getName() === "input") && (t.max = e.getMax([]).map(Math.fround), t.min = e.getMin([]).map(Math.fround)), e.getNormalized() && (t.normalized = e.getNormalized()), t;
  }
  createImageData(e, t, n) {
    if (this.options.format === Ce.GLB)
      this.imageBufferViews.push(t), e.bufferView = this.jsonDoc.json.bufferViews.length, this.jsonDoc.json.bufferViews.push({
        buffer: 0,
        byteOffset: -1,
        // determined while iterating buffers, in Writer.ts.
        byteLength: t.byteLength
      });
    else {
      const s = ue.mimeTypeToExtension(n.getMimeType());
      e.uri = this.imageURIGenerator.createURI(n, s), this.assignResourceURI(e.uri, t, !1);
    }
  }
  assignResourceURI(e, t, n) {
    const s = this.jsonDoc.resources;
    if (!(e in s)) {
      s[e] = t;
      return;
    }
    if (t === s[e]) {
      this.logger.warn(`Duplicate resource URI, "${e}".`);
      return;
    }
    const r = `Resource URI "${e}" already assigned to different data.`;
    if (!n) {
      this.logger.warn(r);
      return;
    }
    throw new Error(r);
  }
  /**
   * Returns implicit usage type of the given accessor, related to grouping accessors into
   * buffer views. Usage is a superset of buffer view target, including ARRAY_BUFFER and
   * ELEMENT_ARRAY_BUFFER, but also usages that do not match GPU buffer view targets such as
   * IBMs. Additional usages are defined by extensions, like `EXT_mesh_gpu_instancing`.
   */
  getAccessorUsage(e) {
    const t = this._accessorUsageMap.get(e);
    if (t) return t;
    if (e.getSparse()) return te.SPARSE;
    for (const n of this._doc.getGraph().listParentEdges(e)) {
      const {
        usage: s
      } = n.getAttributes();
      if (s) return s;
      n.getParent().propertyType !== d.ROOT && this.logger.warn(`Missing attribute ".usage" on edge, "${n.getName()}".`);
    }
    return te.OTHER;
  }
  /**
   * Sets usage for the given accessor. Some accessor types must be grouped into
   * buffer views with like accessors. This includes the specified buffer view "targets", but
   * also implicit usage like IBMs or instanced mesh attributes. If unspecified, an accessor
   * will be grouped with other accessors of unspecified usage.
   */
  addAccessorToUsageGroup(e, t) {
    const n = this._accessorUsageMap.get(e);
    if (n && n !== t)
      throw new Error(`Accessor with usage "${n}" cannot be reused as "${t}".`);
    return this._accessorUsageMap.set(e, t), this;
  }
}
fe.BufferViewTarget = Qe;
fe.BufferViewUsage = te;
fe.USAGE_TO_TARGET = {
  [te.ARRAY_BUFFER]: Qe.ARRAY_BUFFER,
  [te.ELEMENT_ARRAY_BUFFER]: Qe.ELEMENT_ARRAY_BUFFER
};
class kt {
  constructor(e, t) {
    this.multiple = void 0, this.basename = void 0, this.counter = {}, this.multiple = e, this.basename = t;
  }
  createURI(e, t) {
    if (e.getURI())
      return e.getURI();
    if (this.multiple) {
      const n = this.basename(e);
      return this.counter[n] = this.counter[n] || 1, `${n}_${this.counter[n]++}.${t}`;
    } else
      return `${this.basename(e)}.${t}`;
  }
}
function Gn(i, e) {
  const t = i.getGraph().listParentEdges(e).find((n) => n.getParent() !== i.getRoot());
  return t ? t.getName().replace(/texture$/i, "") : "";
}
const {
  BufferViewUsage: ot
} = fe, {
  UNSIGNED_INT: Hn,
  UNSIGNED_SHORT: zn,
  UNSIGNED_BYTE: Xn
} = S.ComponentType, Kn = /* @__PURE__ */ new Set([d.ACCESSOR, d.BUFFER, d.MATERIAL, d.MESH]);
class $n {
  static write(e, t) {
    const n = e.getGraph(), s = e.getRoot(), r = {
      asset: W({
        generator: `glTF-Transform ${rs}`
      }, s.getAsset()),
      extras: W({}, s.getExtras())
    }, o = {
      json: r,
      resources: {}
    }, a = new fe(e, o, t), c = t.logger || oe.DEFAULT_INSTANCE, u = new Set(t.extensions.map((l) => l.EXTENSION_NAME)), h = e.getRoot().listExtensionsUsed().filter((l) => u.has(l.extensionName)).sort((l, M) => l.extensionName > M.extensionName ? 1 : -1), g = e.getRoot().listExtensionsRequired().filter((l) => u.has(l.extensionName)).sort((l, M) => l.extensionName > M.extensionName ? 1 : -1);
    h.length < e.getRoot().listExtensionsUsed().length && c.warn("Some extensions were not registered for I/O, and will not be written.");
    for (const l of h) {
      const M = l.prewriteTypes.filter((T) => !Kn.has(T));
      M.length && c.warn(`Prewrite hooks for some types (${M.join()}), requested by extension ${l.extensionName}, are unsupported. Please file an issue or a PR.`);
      for (const T of l.writeDependencies)
        l.install(T, t.dependencies[T]);
    }
    function m(l, M, T, y) {
      const E = [];
      let I = 0;
      for (const R of l) {
        const N = a.createAccessorDef(R);
        N.bufferView = r.bufferViews.length;
        const C = R.getArray(), O = D.pad(D.toView(C));
        N.byteOffset = I, I += O.byteLength, E.push(O), a.accessorIndexMap.set(R, r.accessors.length), r.accessors.push(N);
      }
      const f = D.concat(E), p = {
        buffer: M,
        byteOffset: T,
        byteLength: f.byteLength
      };
      return y && (p.target = y), r.bufferViews.push(p), {
        buffers: E,
        byteLength: I
      };
    }
    function x(l, M, T) {
      const y = l[0].getCount();
      let E = 0;
      for (const N of l) {
        const C = a.createAccessorDef(N);
        C.bufferView = r.bufferViews.length, C.byteOffset = E;
        const O = N.getElementSize(), w = N.getComponentSize();
        E += D.padNumber(O * w), a.accessorIndexMap.set(N, r.accessors.length), r.accessors.push(C);
      }
      const I = y * E, f = new ArrayBuffer(I), p = new DataView(f);
      for (let N = 0; N < y; N++) {
        let C = 0;
        for (const O of l) {
          const w = O.getElementSize(), F = O.getComponentSize(), v = O.getComponentType(), U = O.getArray();
          for (let P = 0; P < w; P++) {
            const Q = N * E + C + P * F, $ = U[N * w + P];
            switch (v) {
              case S.ComponentType.FLOAT:
                p.setFloat32(Q, $, !0);
                break;
              case S.ComponentType.BYTE:
                p.setInt8(Q, $);
                break;
              case S.ComponentType.SHORT:
                p.setInt16(Q, $, !0);
                break;
              case S.ComponentType.UNSIGNED_BYTE:
                p.setUint8(Q, $);
                break;
              case S.ComponentType.UNSIGNED_SHORT:
                p.setUint16(Q, $, !0);
                break;
              case S.ComponentType.UNSIGNED_INT:
                p.setUint32(Q, $, !0);
                break;
              default:
                throw new Error("Unexpected component type: " + v);
            }
          }
          C += D.padNumber(w * F);
        }
      }
      const R = {
        buffer: M,
        byteOffset: T,
        byteLength: I,
        byteStride: E,
        target: fe.BufferViewTarget.ARRAY_BUFFER
      };
      return r.bufferViews.push(R), {
        byteLength: I,
        buffers: [new Uint8Array(f)]
      };
    }
    function A(l, M, T) {
      const y = [];
      let E = 0;
      const I = /* @__PURE__ */ new Map();
      let f = -1 / 0, p = !1;
      for (const v of l) {
        const U = a.createAccessorDef(v);
        r.accessors.push(U), a.accessorIndexMap.set(v, r.accessors.length - 1);
        const P = [], Q = [], $ = [], dt = new Array(v.getElementSize()).fill(0);
        for (let Me = 0, gt = v.getCount(); Me < gt; Me++)
          if (v.getElement(Me, $), !L.eq($, dt, 0)) {
            f = Math.max(Me, f), P.push(Me);
            for (let Xe = 0; Xe < $.length; Xe++) Q.push($[Xe]);
          }
        const Le = P.length, je = {
          accessorDef: U,
          count: Le
        };
        if (I.set(v, je), Le === 0) continue;
        Le > v.getCount() / 2 && (p = !0);
        const tt = lt[v.getComponentType()];
        je.indices = P, je.values = new tt(Q);
      }
      if (!Number.isFinite(f))
        return {
          buffers: y,
          byteLength: E
        };
      p && c.warn("Some sparse accessors have >50% non-zero elements, which may increase file size.");
      const R = f < 255 ? Uint8Array : f < 65535 ? Uint16Array : Uint32Array, N = f < 255 ? Xn : f < 65535 ? zn : Hn, C = {
        buffer: M,
        byteOffset: T + E,
        byteLength: 0
      };
      for (const v of l) {
        const U = I.get(v);
        if (U.count === 0) continue;
        U.indicesByteOffset = C.byteLength;
        const P = D.pad(D.toView(new R(U.indices)));
        y.push(P), E += P.byteLength, C.byteLength += P.byteLength;
      }
      r.bufferViews.push(C);
      const O = r.bufferViews.length - 1, w = {
        buffer: M,
        byteOffset: T + E,
        byteLength: 0
      };
      for (const v of l) {
        const U = I.get(v);
        if (U.count === 0) continue;
        U.valuesByteOffset = w.byteLength;
        const P = D.pad(D.toView(U.values));
        y.push(P), E += P.byteLength, w.byteLength += P.byteLength;
      }
      r.bufferViews.push(w);
      const F = r.bufferViews.length - 1;
      for (const v of l) {
        const U = I.get(v);
        U.count !== 0 && (U.accessorDef.sparse = {
          count: U.count,
          indices: {
            bufferView: O,
            byteOffset: U.indicesByteOffset,
            componentType: N
          },
          values: {
            bufferView: F,
            byteOffset: U.valuesByteOffset
          }
        });
      }
      return {
        buffers: y,
        byteLength: E
      };
    }
    if (r.accessors = [], r.bufferViews = [], r.samplers = [], r.textures = [], r.images = s.listTextures().map((l, M) => {
      const T = a.createPropertyDef(l);
      l.getMimeType() && (T.mimeType = l.getMimeType());
      const y = l.getImage();
      return y && a.createImageData(T, y, l), a.imageIndexMap.set(l, M), T;
    }), h.filter((l) => l.prewriteTypes.includes(d.ACCESSOR)).forEach((l) => l.prewrite(a, d.ACCESSOR)), s.listAccessors().forEach((l) => {
      const M = a.accessorUsageGroupedByParent, T = a.accessorParents;
      if (a.accessorIndexMap.has(l)) return;
      const y = a.getAccessorUsage(l);
      if (a.addAccessorToUsageGroup(l, y), M.has(y)) {
        const E = n.listParents(l).find((I) => I.propertyType !== d.ROOT);
        T.set(l, E);
      }
    }), h.filter((l) => l.prewriteTypes.includes(d.BUFFER)).forEach((l) => l.prewrite(a, d.BUFFER)), (s.listAccessors().length > 0 || a.otherBufferViews.size > 0 || s.listTextures().length > 0 && t.format === Ce.GLB) && s.listBuffers().length === 0)
      throw new Error("Buffer required for Document resources, but none was found.");
    r.buffers = [], s.listBuffers().forEach((l, M) => {
      const T = a.createPropertyDef(l), y = a.accessorUsageGroupedByParent, E = l.listParents().filter((w) => w instanceof S), I = new Set(E.map((w) => a.accessorParents.get(w))), f = new Map(Array.from(I).map((w, F) => [w, F])), p = {};
      for (const w of E) {
        var R;
        if (a.accessorIndexMap.has(w)) continue;
        const F = a.getAccessorUsage(w);
        let v = F;
        if (y.has(F)) {
          const U = a.accessorParents.get(w);
          v += `:${f.get(U)}`;
        }
        p[R = v] || (p[R] = {
          usage: F,
          accessors: []
        }), p[v].accessors.push(w);
      }
      const N = [], C = r.buffers.length;
      let O = 0;
      for (const {
        usage: w,
        accessors: F
      } of Object.values(p))
        if (w === ot.ARRAY_BUFFER && t.vertexLayout === ct.INTERLEAVED) {
          const v = x(F, C, O);
          O += v.byteLength;
          for (const U of v.buffers)
            N.push(U);
        } else if (w === ot.ARRAY_BUFFER)
          for (const v of F) {
            const U = x([v], C, O);
            O += U.byteLength;
            for (const P of U.buffers)
              N.push(P);
          }
        else if (w === ot.SPARSE) {
          const v = A(F, C, O);
          O += v.byteLength;
          for (const U of v.buffers)
            N.push(U);
        } else if (w === ot.ELEMENT_ARRAY_BUFFER) {
          const v = fe.BufferViewTarget.ELEMENT_ARRAY_BUFFER, U = m(F, C, O, v);
          O += U.byteLength;
          for (const P of U.buffers)
            N.push(P);
        } else {
          const v = m(F, C, O);
          O += v.byteLength;
          for (const U of v.buffers)
            N.push(U);
        }
      if (a.imageBufferViews.length && M === 0) {
        for (let w = 0; w < a.imageBufferViews.length; w++)
          if (r.bufferViews[r.images[w].bufferView].byteOffset = O, O += a.imageBufferViews[w].byteLength, N.push(a.imageBufferViews[w]), O % 8) {
            const F = 8 - O % 8;
            O += F, N.push(new Uint8Array(F));
          }
      }
      if (a.otherBufferViews.has(l))
        for (const w of a.otherBufferViews.get(l))
          r.bufferViews.push({
            buffer: C,
            byteOffset: O,
            byteLength: w.byteLength
          }), a.otherBufferViewsIndexMap.set(w, r.bufferViews.length - 1), O += w.byteLength, N.push(w);
      if (O) {
        let w;
        t.format === Ce.GLB ? w = ke : (w = a.bufferURIGenerator.createURI(l, "bin"), T.uri = w), T.byteLength = O, a.assignResourceURI(w, D.concat(N), !0);
      }
      r.buffers.push(T), a.bufferIndexMap.set(l, M);
    }), s.listAccessors().find((l) => !l.getBuffer()) && c.warn("Skipped writing one or more Accessors: no Buffer assigned."), h.filter((l) => l.prewriteTypes.includes(d.MATERIAL)).forEach((l) => l.prewrite(a, d.MATERIAL)), r.materials = s.listMaterials().map((l, M) => {
      const T = a.createPropertyDef(l);
      if (l.getAlphaMode() !== Fe.AlphaMode.OPAQUE && (T.alphaMode = l.getAlphaMode()), l.getAlphaMode() === Fe.AlphaMode.MASK && (T.alphaCutoff = l.getAlphaCutoff()), l.getDoubleSided() && (T.doubleSided = !0), T.pbrMetallicRoughness = {}, L.eq(l.getBaseColorFactor(), [1, 1, 1, 1]) || (T.pbrMetallicRoughness.baseColorFactor = l.getBaseColorFactor()), L.eq(l.getEmissiveFactor(), [0, 0, 0]) || (T.emissiveFactor = l.getEmissiveFactor()), l.getRoughnessFactor() !== 1 && (T.pbrMetallicRoughness.roughnessFactor = l.getRoughnessFactor()), l.getMetallicFactor() !== 1 && (T.pbrMetallicRoughness.metallicFactor = l.getMetallicFactor()), l.getBaseColorTexture()) {
        const y = l.getBaseColorTexture(), E = l.getBaseColorTextureInfo();
        T.pbrMetallicRoughness.baseColorTexture = a.createTextureInfoDef(y, E);
      }
      if (l.getEmissiveTexture()) {
        const y = l.getEmissiveTexture(), E = l.getEmissiveTextureInfo();
        T.emissiveTexture = a.createTextureInfoDef(y, E);
      }
      if (l.getNormalTexture()) {
        const y = l.getNormalTexture(), E = l.getNormalTextureInfo(), I = a.createTextureInfoDef(y, E);
        l.getNormalScale() !== 1 && (I.scale = l.getNormalScale()), T.normalTexture = I;
      }
      if (l.getOcclusionTexture()) {
        const y = l.getOcclusionTexture(), E = l.getOcclusionTextureInfo(), I = a.createTextureInfoDef(y, E);
        l.getOcclusionStrength() !== 1 && (I.strength = l.getOcclusionStrength()), T.occlusionTexture = I;
      }
      if (l.getMetallicRoughnessTexture()) {
        const y = l.getMetallicRoughnessTexture(), E = l.getMetallicRoughnessTextureInfo();
        T.pbrMetallicRoughness.metallicRoughnessTexture = a.createTextureInfoDef(y, E);
      }
      return a.materialIndexMap.set(l, M), T;
    }), h.filter((l) => l.prewriteTypes.includes(d.MESH)).forEach((l) => l.prewrite(a, d.MESH)), r.meshes = s.listMeshes().map((l, M) => {
      const T = a.createPropertyDef(l);
      let y = null;
      return T.primitives = l.listPrimitives().map((E) => {
        const I = {
          attributes: {}
        };
        I.mode = E.getMode();
        const f = E.getMaterial();
        f && (I.material = a.materialIndexMap.get(f)), Object.keys(E.getExtras()).length && (I.extras = E.getExtras());
        const p = E.getIndices();
        p && (I.indices = a.accessorIndexMap.get(p));
        for (const R of E.listSemantics())
          I.attributes[R] = a.accessorIndexMap.get(E.getAttribute(R));
        for (const R of E.listTargets()) {
          const N = {};
          for (const C of R.listSemantics())
            N[C] = a.accessorIndexMap.get(R.getAttribute(C));
          I.targets = I.targets || [], I.targets.push(N);
        }
        return E.listTargets().length && !y && (y = E.listTargets().map((R) => R.getName())), I;
      }), l.getWeights().length && (T.weights = l.getWeights()), y && (T.extras = T.extras || {}, T.extras.targetNames = y), a.meshIndexMap.set(l, M), T;
    }), r.cameras = s.listCameras().map((l, M) => {
      const T = a.createPropertyDef(l);
      if (T.type = l.getType(), T.type === Be.Type.PERSPECTIVE) {
        T.perspective = {
          znear: l.getZNear(),
          zfar: l.getZFar(),
          yfov: l.getYFov()
        };
        const y = l.getAspectRatio();
        y !== null && (T.perspective.aspectRatio = y);
      } else
        T.orthographic = {
          znear: l.getZNear(),
          zfar: l.getZFar(),
          xmag: l.getXMag(),
          ymag: l.getYMag()
        };
      return a.cameraIndexMap.set(l, M), T;
    }), r.nodes = s.listNodes().map((l, M) => {
      const T = a.createPropertyDef(l);
      return L.eq(l.getTranslation(), [0, 0, 0]) || (T.translation = l.getTranslation()), L.eq(l.getRotation(), [0, 0, 0, 1]) || (T.rotation = l.getRotation()), L.eq(l.getScale(), [1, 1, 1]) || (T.scale = l.getScale()), l.getWeights().length && (T.weights = l.getWeights()), a.nodeIndexMap.set(l, M), T;
    }), r.skins = s.listSkins().map((l, M) => {
      const T = a.createPropertyDef(l), y = l.getInverseBindMatrices();
      y && (T.inverseBindMatrices = a.accessorIndexMap.get(y));
      const E = l.getSkeleton();
      return E && (T.skeleton = a.nodeIndexMap.get(E)), T.joints = l.listJoints().map((I) => a.nodeIndexMap.get(I)), a.skinIndexMap.set(l, M), T;
    }), s.listNodes().forEach((l, M) => {
      const T = r.nodes[M], y = l.getMesh();
      y && (T.mesh = a.meshIndexMap.get(y));
      const E = l.getCamera();
      E && (T.camera = a.cameraIndexMap.get(E));
      const I = l.getSkin();
      I && (T.skin = a.skinIndexMap.get(I)), l.listChildren().length > 0 && (T.children = l.listChildren().map((f) => a.nodeIndexMap.get(f)));
    }), r.animations = s.listAnimations().map((l, M) => {
      const T = a.createPropertyDef(l), y = /* @__PURE__ */ new Map();
      return T.samplers = l.listSamplers().map((E, I) => {
        const f = a.createPropertyDef(E);
        return f.input = a.accessorIndexMap.get(E.getInput()), f.output = a.accessorIndexMap.get(E.getOutput()), f.interpolation = E.getInterpolation(), y.set(E, I), f;
      }), T.channels = l.listChannels().map((E) => {
        const I = a.createPropertyDef(E);
        return I.sampler = y.get(E.getSampler()), I.target = {
          node: a.nodeIndexMap.get(E.getTargetNode()),
          path: E.getTargetPath()
        }, I;
      }), a.animationIndexMap.set(l, M), T;
    }), r.scenes = s.listScenes().map((l, M) => {
      const T = a.createPropertyDef(l);
      return T.nodes = l.listChildren().map((y) => a.nodeIndexMap.get(y)), a.sceneIndexMap.set(l, M), T;
    });
    const _ = s.getDefaultScene();
    return _ && (r.scene = s.listScenes().indexOf(_)), r.extensionsUsed = h.map((l) => l.extensionName), r.extensionsRequired = g.map((l) => l.extensionName), h.forEach((l) => l.write(a)), Yn(r), o;
  }
}
function Yn(i) {
  const e = [];
  for (const t in i) {
    const n = i[t];
    (Array.isArray(n) && n.length === 0 || n === null || n === "" || n && typeof n == "object" && Object.keys(n).length === 0) && e.push(t);
  }
  for (const t of e)
    delete i[t];
}
var ft;
(function(i) {
  i[i.JSON = 1313821514] = "JSON", i[i.BIN = 5130562] = "BIN";
})(ft || (ft = {}));
class qn {
  constructor() {
    this._logger = oe.DEFAULT_INSTANCE, this._extensions = /* @__PURE__ */ new Set(), this._dependencies = {}, this._vertexLayout = ct.INTERLEAVED, this._strictResources = !0, this.lastReadBytes = 0, this.lastWriteBytes = 0;
  }
  /** Sets the {@link Logger} used by this I/O instance. Defaults to Logger.DEFAULT_INSTANCE. */
  setLogger(e) {
    return this._logger = e, this;
  }
  /** Registers extensions, enabling I/O class to read and write glTF assets requiring them. */
  registerExtensions(e) {
    for (const t of e)
      this._extensions.add(t), t.register();
    return this;
  }
  /** Registers dependencies used (e.g. by extensions) in the I/O process. */
  registerDependencies(e) {
    return Object.assign(this._dependencies, e), this;
  }
  /**
   * Sets the vertex layout method used by this I/O instance. Defaults to
   * VertexLayout.INTERLEAVED.
   */
  setVertexLayout(e) {
    return this._vertexLayout = e, this;
  }
  /**
   * Sets whether missing external resources should throw errors (strict mode) or
   * be ignored with warnings. Missing images can be ignored, but missing buffers
   * will currently always result in an error. When strict mode is disabled and
   * missing resources are encountered, the resulting {@link Document} will be
   * created in an invalid state. Manual fixes to the Document may be necessary,
   * resolving null images in {@link Texture Textures} or removing the affected
   * Textures, before the Document can be written to output or used in transforms.
   *
   * Defaults to true (strict mode).
   */
  setStrictResources(e) {
    return this._strictResources = e, this;
  }
  /**********************************************************************************************
   * Public Read API.
   */
  /** Reads a {@link Document} from the given URI. */
  async read(e) {
    return await this.readJSON(await this.readAsJSON(e));
  }
  /** Loads a URI and returns a {@link JSONDocument} struct, without parsing. */
  async readAsJSON(e) {
    const t = await this.readURI(e, "view");
    this.lastReadBytes = t.byteLength;
    const n = Gt(t) ? this._binaryToJSON(t) : {
      json: JSON.parse(D.decodeText(t)),
      resources: {}
    };
    return await this._readResourcesExternal(n, this.dirname(e)), this._readResourcesInternal(n), n;
  }
  /** Converts glTF-formatted JSON and a resource map to a {@link Document}. */
  async readJSON(e) {
    return e = this._copyJSON(e), this._readResourcesInternal(e), Pn.read(e, {
      extensions: Array.from(this._extensions),
      dependencies: this._dependencies,
      logger: this._logger
    });
  }
  /** Converts a GLB-formatted Uint8Array to a {@link JSONDocument}. */
  async binaryToJSON(e) {
    const t = this._binaryToJSON(D.assertView(e));
    this._readResourcesInternal(t);
    const n = t.json;
    if (n.buffers && n.buffers.some((s) => Wn(t, s)))
      throw new Error("Cannot resolve external buffers with binaryToJSON().");
    if (n.images && n.images.some((s) => Jn(t, s)))
      throw new Error("Cannot resolve external images with binaryToJSON().");
    return t;
  }
  /** Converts a GLB-formatted Uint8Array to a {@link Document}. */
  async readBinary(e) {
    return this.readJSON(await this.binaryToJSON(D.assertView(e)));
  }
  /**********************************************************************************************
   * Public Write API.
   */
  /** Converts a {@link Document} to glTF-formatted JSON and a resource map. */
  async writeJSON(e, t = {}) {
    if (t.format === Ce.GLB && e.getRoot().listBuffers().length > 1)
      throw new Error("GLB must have 0–1 buffers.");
    return $n.write(e, {
      format: t.format || Ce.GLTF,
      basename: t.basename || "",
      logger: this._logger,
      vertexLayout: this._vertexLayout,
      dependencies: W({}, this._dependencies),
      extensions: Array.from(this._extensions)
    });
  }
  /** Converts a {@link Document} to a GLB-formatted Uint8Array. */
  async writeBinary(e) {
    const {
      json: t,
      resources: n
    } = await this.writeJSON(e, {
      format: Ce.GLB
    }), s = new Uint32Array([1179937895, 2, 12]), r = JSON.stringify(t), o = D.pad(D.encodeText(r), 32), a = D.toView(new Uint32Array([o.byteLength, 1313821514])), c = D.concat([a, o]);
    s[s.length - 1] += c.byteLength;
    const u = Object.values(n)[0];
    if (!u || !u.byteLength)
      return D.concat([D.toView(s), c]);
    const h = D.pad(u, 0), g = D.toView(new Uint32Array([h.byteLength, 5130562])), m = D.concat([g, h]);
    return s[s.length - 1] += m.byteLength, D.concat([D.toView(s), c, m]);
  }
  /**********************************************************************************************
   * Internal.
   */
  async _readResourcesExternal(e, t) {
    var n = this;
    const s = e.json.images || [], r = e.json.buffers || [], o = [...s, ...r].map(async function(a) {
      const c = a.uri;
      if (!c || c.match(/data:/)) return Promise.resolve();
      try {
        e.resources[c] = await n.readURI(n.resolve(t, c), "view"), n.lastReadBytes += e.resources[c].byteLength;
      } catch (u) {
        if (!n._strictResources && s.includes(a))
          n._logger.warn(`Failed to load image URI, "${c}". ${u}`), e.resources[c] = null;
        else
          throw u;
      }
    });
    await Promise.all(o);
  }
  _readResourcesInternal(e) {
    function t(r) {
      if (r.uri) {
        if (r.uri in e.resources) {
          D.assertView(e.resources[r.uri]);
          return;
        }
        if (r.uri.match(/data:/)) {
          const o = `__${Dn()}.${Ge.extension(r.uri)}`;
          e.resources[o] = D.createBufferFromDataURI(r.uri), r.uri = o;
        }
      }
    }
    (e.json.images || []).forEach((r) => {
      if (r.bufferView === void 0 && r.uri === void 0)
        throw new Error("Missing resource URI or buffer view.");
      t(r);
    }), (e.json.buffers || []).forEach(t);
  }
  /**
   * Creates a shallow copy of glTF-formatted {@link JSONDocument}.
   *
   * Images, Buffers, and Resources objects are deep copies so that PlatformIO can safely
   * modify them during the parsing process. Other properties are shallow copies, and buffers
   * are passed by reference.
   */
  _copyJSON(e) {
    const {
      images: t,
      buffers: n
    } = e.json;
    return e = {
      json: W({}, e.json),
      resources: W({}, e.resources)
    }, t && (e.json.images = t.map((s) => W({}, s))), n && (e.json.buffers = n.map((s) => W({}, s))), e;
  }
  /** Internal version of binaryToJSON; does not warn about external resources. */
  _binaryToJSON(e) {
    if (!Gt(e))
      throw new Error("Invalid glTF 2.0 binary.");
    const t = new Uint32Array(e.buffer, e.byteOffset + 12, 2);
    if (t[1] !== ft.JSON)
      throw new Error("Missing required GLB JSON chunk.");
    const n = 20, s = t[0], r = D.decodeText(D.toView(e, n, s)), o = JSON.parse(r), a = n + s;
    if (e.byteLength <= a)
      return {
        json: o,
        resources: {}
      };
    const c = new Uint32Array(e.buffer, e.byteOffset + a, 2);
    if (c[1] !== ft.BIN)
      return {
        json: o,
        resources: {}
      };
    const u = c[0], h = D.toView(e, a + 8, u);
    return {
      json: o,
      resources: {
        [ke]: h
      }
    };
  }
}
function Wn(i, e) {
  return e.uri !== void 0 && !(e.uri in i.resources);
}
function Jn(i, e) {
  return e.uri !== void 0 && !(e.uri in i.resources) && e.bufferView === void 0;
}
function Gt(i) {
  if (i.byteLength < 3 * Uint32Array.BYTES_PER_ELEMENT) return !1;
  const e = new Uint32Array(i.buffer, i.byteOffset, 3);
  return e[0] === 1179937895 && e[1] === 2;
}
class Qn extends qn {
  /**
   * Constructs a new WebIO service. Instances are reusable.
   * @param fetchConfig Configuration object for Fetch API.
   */
  constructor(e = We.DEFAULT_INIT) {
    super(), this._fetchConfig = void 0, this._fetchConfig = e;
  }
  async readURI(e, t) {
    const n = await fetch(e, this._fetchConfig);
    switch (t) {
      case "view":
        return new Uint8Array(await n.arrayBuffer());
      case "text":
        return n.text();
    }
  }
  resolve(e, t) {
    return We.resolve(e, t);
  }
  dirname(e) {
    return We.dirname(e);
  }
}
const Zn = 0, er = 0, tr = 0, sr = 2, nr = 0, rr = 163, ir = 166, or = 0, ar = 2, cr = 1, ur = 64, fr = 0;
function lr() {
  return {
    vkFormat: fr,
    typeSize: 1,
    pixelWidth: 0,
    pixelHeight: 0,
    pixelDepth: 0,
    layerCount: 0,
    faceCount: 1,
    levelCount: 0,
    supercompressionScheme: Zn,
    levels: [],
    dataFormatDescriptor: [{
      vendorId: tr,
      descriptorType: er,
      versionNumber: sr,
      colorModel: nr,
      colorPrimaries: cr,
      transferFunction: ar,
      flags: or,
      texelBlockDimension: [0, 0, 0, 0],
      bytesPlane: [0, 0, 0, 0, 0, 0, 0, 0],
      samples: []
    }],
    keyValue: {},
    globalData: null
  };
}
class Ke {
  constructor(e, t, n, s) {
    this._dataView = void 0, this._littleEndian = void 0, this._offset = void 0, this._dataView = new DataView(e.buffer, e.byteOffset + t, n), this._littleEndian = s, this._offset = 0;
  }
  _nextUint8() {
    const e = this._dataView.getUint8(this._offset);
    return this._offset += 1, e;
  }
  _nextUint16() {
    const e = this._dataView.getUint16(this._offset, this._littleEndian);
    return this._offset += 2, e;
  }
  _nextUint32() {
    const e = this._dataView.getUint32(this._offset, this._littleEndian);
    return this._offset += 4, e;
  }
  _nextUint64() {
    const e = this._dataView.getUint32(this._offset, this._littleEndian), t = this._dataView.getUint32(this._offset + 4, this._littleEndian), n = e + 2 ** 32 * t;
    return this._offset += 8, n;
  }
  _nextInt32() {
    const e = this._dataView.getInt32(this._offset, this._littleEndian);
    return this._offset += 4, e;
  }
  _nextUint8Array(e) {
    const t = new Uint8Array(this._dataView.buffer, this._dataView.byteOffset + this._offset, e);
    return this._offset += e, t;
  }
  _skip(e) {
    return this._offset += e, this;
  }
  _scan(e, t = 0) {
    const n = this._offset;
    let s = 0;
    for (; this._dataView.getUint8(this._offset) !== t && s < e; )
      s++, this._offset++;
    return s < e && this._offset++, new Uint8Array(this._dataView.buffer, this._dataView.byteOffset + n, s);
  }
}
const q = [
  // '´', 'K', 'T', 'X', '2', '0', 'ª', '\r', '\n', '\x1A', '\n'
  171,
  75,
  84,
  88,
  32,
  50,
  48,
  187,
  13,
  10,
  26,
  10
];
function Ht(i) {
  return new TextDecoder().decode(i);
}
function Tt(i) {
  const e = new Uint8Array(i.buffer, i.byteOffset, q.length);
  if (e[0] !== q[0] || // '´'
  e[1] !== q[1] || // 'K'
  e[2] !== q[2] || // 'T'
  e[3] !== q[3] || // 'X'
  e[4] !== q[4] || // ' '
  e[5] !== q[5] || // '2'
  e[6] !== q[6] || // '0'
  e[7] !== q[7] || // 'ª'
  e[8] !== q[8] || // '\r'
  e[9] !== q[9] || // '\n'
  e[10] !== q[10] || // '\x1A'
  e[11] !== q[11])
    throw new Error("Missing KTX 2.0 identifier.");
  const t = lr(), n = 17 * Uint32Array.BYTES_PER_ELEMENT, s = new Ke(i, q.length, n, !0);
  t.vkFormat = s._nextUint32(), t.typeSize = s._nextUint32(), t.pixelWidth = s._nextUint32(), t.pixelHeight = s._nextUint32(), t.pixelDepth = s._nextUint32(), t.layerCount = s._nextUint32(), t.faceCount = s._nextUint32(), t.levelCount = s._nextUint32(), t.supercompressionScheme = s._nextUint32();
  const r = s._nextUint32(), o = s._nextUint32(), a = s._nextUint32(), c = s._nextUint32(), u = s._nextUint64(), h = s._nextUint64(), g = Math.max(t.levelCount, 1) * 3 * 8, m = new Ke(i, q.length + n, g, !0);
  for (let Z = 0, ee = Math.max(t.levelCount, 1); Z < ee; Z++)
    t.levels.push({
      levelData: new Uint8Array(i.buffer, i.byteOffset + m._nextUint64(), m._nextUint64()),
      uncompressedByteLength: m._nextUint64()
    });
  const x = new Ke(i, r, o, !0);
  x._skip(4);
  const A = x._nextUint16(), b = x._nextUint16(), _ = x._nextUint16(), l = x._nextUint16(), M = x._nextUint8(), T = x._nextUint8(), y = x._nextUint8(), E = x._nextUint8(), I = [x._nextUint8(), x._nextUint8(), x._nextUint8(), x._nextUint8()], f = [x._nextUint8(), x._nextUint8(), x._nextUint8(), x._nextUint8(), x._nextUint8(), x._nextUint8(), x._nextUint8(), x._nextUint8()], R = {
    vendorId: A,
    descriptorType: b,
    versionNumber: _,
    colorModel: M,
    colorPrimaries: T,
    transferFunction: y,
    flags: E,
    texelBlockDimension: I,
    bytesPlane: f,
    samples: []
  }, O = (l / 4 - 6) / 4;
  for (let Z = 0; Z < O; Z++) {
    const ee = {
      bitOffset: x._nextUint16(),
      bitLength: x._nextUint8(),
      channelType: x._nextUint8(),
      samplePosition: [x._nextUint8(), x._nextUint8(), x._nextUint8(), x._nextUint8()],
      sampleLower: Number.NEGATIVE_INFINITY,
      sampleUpper: Number.POSITIVE_INFINITY
    };
    ee.channelType & ur ? (ee.sampleLower = x._nextInt32(), ee.sampleUpper = x._nextInt32()) : (ee.sampleLower = x._nextUint32(), ee.sampleUpper = x._nextUint32()), R.samples[Z] = ee;
  }
  t.dataFormatDescriptor.length = 0, t.dataFormatDescriptor.push(R);
  const w = new Ke(i, a, c, !0);
  for (; w._offset < c; ) {
    const Z = w._nextUint32(), ee = w._scan(Z), st = Ht(ee);
    if (t.keyValue[st] = w._nextUint8Array(Z - ee.byteLength - 1), st.match(/^ktx/i)) {
      const Ot = Ht(t.keyValue[st]);
      t.keyValue[st] = Ot.substring(0, Ot.lastIndexOf("\0"));
    }
    const dn = Z % 4 ? 4 - Z % 4 : 0;
    w._skip(dn);
  }
  if (h <= 0) return t;
  const F = new Ke(i, u, h, !0), v = F._nextUint16(), U = F._nextUint16(), P = F._nextUint32(), Q = F._nextUint32(), $ = F._nextUint32(), dt = F._nextUint32(), Le = [];
  for (let Z = 0, ee = Math.max(t.levelCount, 1); Z < ee; Z++)
    Le.push({
      imageFlags: F._nextUint32(),
      rgbSliceByteOffset: F._nextUint32(),
      rgbSliceByteLength: F._nextUint32(),
      alphaSliceByteOffset: F._nextUint32(),
      alphaSliceByteLength: F._nextUint32()
    });
  const je = u + F._offset, tt = je + P, Me = tt + Q, gt = Me + $, Xe = new Uint8Array(i.buffer, i.byteOffset + je, P), fn = new Uint8Array(i.buffer, i.byteOffset + tt, Q), ln = new Uint8Array(i.buffer, i.byteOffset + Me, $), hn = new Uint8Array(i.buffer, i.byteOffset + gt, dt);
  return t.globalData = {
    endpointCount: v,
    selectorCount: U,
    imageDescs: Le,
    endpointsData: Xe,
    selectorsData: fn,
    tablesData: ln,
    extendedData: hn
  }, t;
}
const le = "EXT_mesh_gpu_instancing", K = "EXT_meshopt_compression", $e = "EXT_texture_webp", Ye = "EXT_texture_avif", G = "KHR_draco_mesh_compression", ne = "KHR_lights_punctual", he = "KHR_materials_anisotropy", de = "KHR_materials_clearcoat", ge = "KHR_materials_diffuse_transmission", pe = "KHR_materials_dispersion", Te = "KHR_materials_emissive_strength", xe = "KHR_materials_ior", me = "KHR_materials_iridescence", Ee = "KHR_materials_pbrSpecularGlossiness", Re = "KHR_materials_sheen", ye = "KHR_materials_specular", Ie = "KHR_materials_transmission", be = "KHR_materials_unlit", Ne = "KHR_materials_volume", Y = "KHR_materials_variants", Ts = "KHR_mesh_quantization", Se = "KHR_node_visibility", qe = "KHR_texture_basisu", Ae = "KHR_texture_transform", re = "KHR_xmp_json_ld", Nt = "INSTANCE_ATTRIBUTE";
class xs extends H {
  init() {
    this.extensionName = le, this.propertyType = "InstancedMesh", this.parentTypes = [d.NODE];
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      attributes: new ce()
    });
  }
  /** Returns an instance attribute as an {@link Accessor}. */
  getAttribute(e) {
    return this.getRefMap("attributes", e);
  }
  /**
   * Sets an instance attribute to an {@link Accessor}. All attributes must have the same
   * instance count.
   */
  setAttribute(e, t) {
    return this.setRefMap("attributes", e, t, {
      usage: Nt
    });
  }
  /**
   * Lists all instance attributes {@link Accessor}s associated with the InstancedMesh. Order
   * will be consistent with the order returned by {@link .listSemantics}().
   */
  listAttributes() {
    return this.listRefMapValues("attributes");
  }
  /**
   * Lists all instance attribute semantics associated with the primitive. Order will be
   * consistent with the order returned by {@link .listAttributes}().
   */
  listSemantics() {
    return this.listRefMapKeys("attributes");
  }
}
xs.EXTENSION_NAME = le;
class ms extends k {
  constructor(...e) {
    super(...e), this.extensionName = le, this.provideTypes = [d.NODE], this.prewriteTypes = [d.ACCESSOR];
  }
  /** Creates a new InstancedMesh property for use on a {@link Node}. */
  createInstancedMesh() {
    return new xs(this.document.getGraph());
  }
  /** @hidden */
  read(e) {
    return (e.jsonDoc.json.nodes || []).forEach((s, r) => {
      if (!s.extensions || !s.extensions[le]) return;
      const o = s.extensions[le], a = this.createInstancedMesh();
      for (const c in o.attributes)
        a.setAttribute(c, e.accessors[o.attributes[c]]);
      e.nodes[r].setExtension(le, a);
    }), this;
  }
  /** @hidden */
  prewrite(e) {
    e.accessorUsageGroupedByParent.add(Nt);
    for (const t of this.properties)
      for (const n of t.listAttributes())
        e.addAccessorToUsageGroup(n, Nt);
    return this;
  }
  /** @hidden */
  write(e) {
    const t = e.jsonDoc;
    return this.document.getRoot().listNodes().forEach((n) => {
      const s = n.getExtension(le);
      if (s) {
        const r = e.nodeIndexMap.get(n), o = t.json.nodes[r], a = {
          attributes: {}
        };
        s.listSemantics().forEach((c) => {
          const u = s.getAttribute(c);
          a.attributes[c] = e.accessorIndexMap.get(u);
        }), o.extensions = o.extensions || {}, o.extensions[le] = a;
      }
    }), this;
  }
}
ms.EXTENSION_NAME = le;
function _e() {
  return _e = Object.assign ? Object.assign.bind() : function(i) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var n in t) ({}).hasOwnProperty.call(t, n) && (i[n] = t[n]);
    }
    return i;
  }, _e.apply(null, arguments);
}
var Ze;
(function(i) {
  i.QUANTIZE = "quantize", i.FILTER = "filter";
})(Ze || (Ze = {}));
var Ve;
(function(i) {
  i.ATTRIBUTES = "ATTRIBUTES", i.TRIANGLES = "TRIANGLES", i.INDICES = "INDICES";
})(Ve || (Ve = {}));
var z;
(function(i) {
  i.NONE = "NONE", i.OCTAHEDRAL = "OCTAHEDRAL", i.QUATERNION = "QUATERNION", i.EXPONENTIAL = "EXPONENTIAL";
})(z || (z = {}));
function hr(i) {
  return !i.extensions || !i.extensions[K] ? !1 : !!i.extensions[K].fallback;
}
const {
  BYTE: dr,
  SHORT: zt,
  FLOAT: gr
} = S.ComponentType, {
  encodeNormalizedInt: Xt,
  decodeNormalizedInt: St
} = L;
function pr(i, e, t, n) {
  const {
    filter: s,
    bits: r
  } = n, o = {
    array: i.getArray(),
    byteStride: i.getElementSize() * i.getComponentSize(),
    componentType: i.getComponentType(),
    normalized: i.getNormalized()
  };
  if (t !== Ve.ATTRIBUTES) return o;
  if (s !== z.NONE) {
    let a = i.getNormalized() ? Tr(i) : new Float32Array(o.array);
    switch (s) {
      case z.EXPONENTIAL:
        o.byteStride = i.getElementSize() * 4, o.componentType = gr, o.normalized = !1, o.array = e.encodeFilterExp(a, i.getCount(), o.byteStride, r);
        break;
      case z.OCTAHEDRAL:
        o.byteStride = r > 8 ? 8 : 4, o.componentType = r > 8 ? zt : dr, o.normalized = !0, a = i.getElementSize() === 3 ? mr(a) : a, o.array = e.encodeFilterOct(a, i.getCount(), o.byteStride, r);
        break;
      case z.QUATERNION:
        o.byteStride = 8, o.componentType = zt, o.normalized = !0, o.array = e.encodeFilterQuat(a, i.getCount(), o.byteStride, r);
        break;
      default:
        throw new Error("Invalid filter.");
    }
    o.min = i.getMin([]), o.max = i.getMax([]), i.getNormalized() && (o.min = o.min.map((c) => St(c, i.getComponentType())), o.max = o.max.map((c) => St(c, i.getComponentType()))), o.normalized && (o.min = o.min.map((c) => Xt(c, o.componentType)), o.max = o.max.map((c) => Xt(c, o.componentType)));
  } else o.byteStride % 4 && (o.array = xr(o.array, i.getElementSize()), o.byteStride = o.array.byteLength / i.getCount());
  return o;
}
function Tr(i) {
  const e = i.getComponentType(), t = i.getArray(), n = new Float32Array(t.length);
  for (let s = 0; s < t.length; s++)
    n[s] = St(t[s], e);
  return n;
}
function xr(i, e) {
  const n = D.padNumber(i.BYTES_PER_ELEMENT * e) / i.BYTES_PER_ELEMENT, s = i.length / e, r = new i.constructor(s * n);
  for (let o = 0; o * e < i.length; o++)
    for (let a = 0; a < e; a++)
      r[o * n + a] = i[o * e + a];
  return r;
}
function mr(i) {
  const e = new Float32Array(i.length * 4 / 3);
  for (let t = 0, n = i.length / 3; t < n; t++)
    e[t * 4] = i[t * 3], e[t * 4 + 1] = i[t * 3 + 1], e[t * 4 + 2] = i[t * 3 + 2];
  return e;
}
function Er(i, e) {
  return e === fe.BufferViewUsage.ELEMENT_ARRAY_BUFFER ? i.listParents().some((n) => n instanceof Ue && n.getMode() === Ue.Mode.TRIANGLES) ? Ve.TRIANGLES : Ve.INDICES : Ve.ATTRIBUTES;
}
function Rr(i, e) {
  const t = e.getGraph().listParentEdges(i).filter((n) => !(n.getParent() instanceof ps));
  for (const n of t) {
    const s = n.getName(), r = n.getAttributes().key || "", o = n.getParent().propertyType === d.PRIMITIVE_TARGET;
    if (s === "indices") return {
      filter: z.NONE
    };
    if (s === "attributes") {
      if (r === "POSITION") return {
        filter: z.NONE
      };
      if (r === "TEXCOORD_0") return {
        filter: z.NONE
      };
      if (r.startsWith("JOINTS_")) return {
        filter: z.NONE
      };
      if (r.startsWith("WEIGHTS_")) return {
        filter: z.NONE
      };
      if (r === "NORMAL" || r === "TANGENT")
        return o ? {
          filter: z.NONE
        } : {
          filter: z.OCTAHEDRAL,
          bits: 8
        };
    }
    if (s === "output") {
      const a = Es(i);
      return a === "rotation" ? {
        filter: z.QUATERNION,
        bits: 16
      } : a === "translation" ? {
        filter: z.EXPONENTIAL,
        bits: 12
      } : a === "scale" ? {
        filter: z.EXPONENTIAL,
        bits: 12
      } : {
        filter: z.NONE
      };
    }
    if (s === "input") return {
      filter: z.NONE
    };
    if (s === "inverseBindMatrices") return {
      filter: z.NONE
    };
  }
  return {
    filter: z.NONE
  };
}
function Es(i) {
  for (const e of i.listParents())
    if (e instanceof ze) {
      for (const t of e.listParents())
        if (t instanceof bt)
          return t.getTargetPath();
    }
  return null;
}
const Kt = {
  method: Ze.QUANTIZE
};
class wt extends k {
  constructor(...e) {
    super(...e), this.extensionName = K, this.prereadTypes = [d.BUFFER, d.PRIMITIVE], this.prewriteTypes = [d.BUFFER, d.ACCESSOR], this.readDependencies = ["meshopt.decoder"], this.writeDependencies = ["meshopt.encoder"], this._decoder = null, this._decoderFallbackBufferMap = /* @__PURE__ */ new Map(), this._encoder = null, this._encoderOptions = Kt, this._encoderFallbackBuffer = null, this._encoderBufferViews = {}, this._encoderBufferViewData = {}, this._encoderBufferViewAccessors = {};
  }
  /** @hidden */
  install(e, t) {
    return e === "meshopt.decoder" && (this._decoder = t), e === "meshopt.encoder" && (this._encoder = t), this;
  }
  /**
   * Configures Meshopt options for quality/compression tuning. The two methods rely on different
   * pre-processing before compression, and should be compared on the basis of (a) quality/loss
   * and (b) final asset size after _also_ applying a lossless compression such as gzip or brotli.
   *
   * - QUANTIZE: Default. Pre-process with {@link quantize quantize()} (lossy to specified
   * 	precision) before applying lossless Meshopt compression. Offers a considerable compression
   * 	ratio with or without further supercompression. Equivalent to `gltfpack -c`.
   * - FILTER: Pre-process with lossy filters to improve compression, before applying lossless
   *	Meshopt compression. While output may initially be larger than with the QUANTIZE method,
   *	this method will benefit more from supercompression (e.g. gzip or brotli). Equivalent to
   * 	`gltfpack -cc`.
   *
   * Output with the FILTER method will generally be smaller after supercompression (e.g. gzip or
   * brotli) is applied, but may be larger than QUANTIZE output without it. Decoding is very fast
   * with both methods.
   *
   * Example:
   *
   * ```ts
   * import { EXTMeshoptCompression } from '@gltf-transform/extensions';
   *
   * doc.createExtension(EXTMeshoptCompression)
   * 	.setRequired(true)
   * 	.setEncoderOptions({
   * 		method: EXTMeshoptCompression.EncoderMethod.QUANTIZE
   * 	});
   * ```
   */
  setEncoderOptions(e) {
    return this._encoderOptions = _e({}, Kt, e), this;
  }
  /**********************************************************************************************
   * Decoding.
   */
  /** @internal Checks preconditions, decodes buffer views, and creates decoded primitives. */
  preread(e, t) {
    if (!this._decoder) {
      if (!this.isRequired()) return this;
      throw new Error(`[${K}] Please install extension dependency, "meshopt.decoder".`);
    }
    if (!this._decoder.supported) {
      if (!this.isRequired()) return this;
      throw new Error(`[${K}]: Missing WASM support.`);
    }
    return t === d.BUFFER ? this._prereadBuffers(e) : t === d.PRIMITIVE && this._prereadPrimitives(e), this;
  }
  /** @internal Decode buffer views. */
  _prereadBuffers(e) {
    const t = e.jsonDoc;
    (t.json.bufferViews || []).forEach((s, r) => {
      if (!s.extensions || !s.extensions[K]) return;
      const o = s.extensions[K], a = o.byteOffset || 0, c = o.byteLength || 0, u = o.count, h = o.byteStride, g = new Uint8Array(u * h), m = t.json.buffers[o.buffer], x = m.uri ? t.resources[m.uri] : t.resources[ke], A = D.toView(x, a, c);
      this._decoder.decodeGltfBuffer(g, u, h, A, o.mode, o.filter), e.bufferViews[r] = g;
    });
  }
  /**
   * Mark fallback buffers and replacements.
   *
   * Note: Alignment with primitives is arbitrary; this just needs to happen
   * after Buffers have been parsed.
   * @internal
   */
  _prereadPrimitives(e) {
    const t = e.jsonDoc;
    (t.json.bufferViews || []).forEach((s) => {
      if (!s.extensions || !s.extensions[K]) return;
      const r = s.extensions[K], o = e.buffers[r.buffer], a = e.buffers[s.buffer], c = t.json.buffers[s.buffer];
      hr(c) && this._decoderFallbackBufferMap.set(a, o);
    });
  }
  /** @hidden Removes Fallback buffers, if extension is required. */
  read(e) {
    if (!this.isRequired()) return this;
    for (const [t, n] of this._decoderFallbackBufferMap) {
      for (const s of t.listParents())
        s instanceof S && s.swap(t, n);
      t.dispose();
    }
    return this;
  }
  /**********************************************************************************************
   * Encoding.
   */
  /** @internal Claims accessors that can be compressed and writes compressed buffer views. */
  prewrite(e, t) {
    return t === d.ACCESSOR ? this._prewriteAccessors(e) : t === d.BUFFER && this._prewriteBuffers(e), this;
  }
  /** @internal Claims accessors that can be compressed. */
  _prewriteAccessors(e) {
    const t = e.jsonDoc.json, n = this._encoder, s = this._encoderOptions, r = this.document.getGraph(), o = this.document.createBuffer(), a = this.document.getRoot().listBuffers().indexOf(o);
    let c = 1;
    const u = /* @__PURE__ */ new Map(), h = (g) => {
      for (const m of r.listParents(g)) {
        if (m.propertyType === d.ROOT) continue;
        let x = u.get(g);
        return x === void 0 && u.set(g, x = c++), x;
      }
      return -1;
    };
    this._encoderFallbackBuffer = o, this._encoderBufferViews = {}, this._encoderBufferViewData = {}, this._encoderBufferViewAccessors = {};
    for (const g of this.document.getRoot().listAccessors()) {
      if (Es(g) === "weights" || g.getSparse()) continue;
      const m = e.getAccessorUsage(g), x = e.accessorUsageGroupedByParent.has(m) ? h(g) : null, A = Er(g, m), b = s.method === Ze.FILTER ? Rr(g, this.document) : {
        filter: z.NONE
      }, _ = pr(g, n, A, b), {
        array: l,
        byteStride: M
      } = _, T = g.getBuffer();
      if (!T) throw new Error(`${K}: Missing buffer for accessor.`);
      const y = this.document.getRoot().listBuffers().indexOf(T), E = [m, x, A, b.filter, M, y].join(":");
      let I = this._encoderBufferViews[E], f = this._encoderBufferViewData[E], p = this._encoderBufferViewAccessors[E];
      (!I || !f) && (p = this._encoderBufferViewAccessors[E] = [], f = this._encoderBufferViewData[E] = [], I = this._encoderBufferViews[E] = {
        buffer: a,
        target: fe.USAGE_TO_TARGET[m],
        byteOffset: 0,
        byteLength: 0,
        byteStride: m === fe.BufferViewUsage.ARRAY_BUFFER ? M : void 0,
        extensions: {
          [K]: {
            buffer: y,
            byteOffset: 0,
            byteLength: 0,
            mode: A,
            filter: b.filter !== z.NONE ? b.filter : void 0,
            byteStride: M,
            count: 0
          }
        }
      });
      const R = e.createAccessorDef(g);
      R.componentType = _.componentType, R.normalized = _.normalized, R.byteOffset = I.byteLength, R.min && _.min && (R.min = _.min), R.max && _.max && (R.max = _.max), e.accessorIndexMap.set(g, t.accessors.length), t.accessors.push(R), p.push(R), f.push(new Uint8Array(l.buffer, l.byteOffset, l.byteLength)), I.byteLength += l.byteLength, I.extensions.EXT_meshopt_compression.count += g.getCount();
    }
  }
  /** @internal Writes compressed buffer views. */
  _prewriteBuffers(e) {
    const t = this._encoder;
    for (const n in this._encoderBufferViews) {
      const s = this._encoderBufferViews[n], r = this._encoderBufferViewData[n], o = this.document.getRoot().listBuffers()[s.extensions[K].buffer], a = e.otherBufferViews.get(o) || [], {
        count: c,
        byteStride: u,
        mode: h
      } = s.extensions[K], g = D.concat(r), m = t.encodeGltfBuffer(g, c, u, h), x = D.pad(m);
      s.extensions[K].byteLength = m.byteLength, r.length = 0, r.push(x), a.push(x), e.otherBufferViews.set(o, a);
    }
  }
  /** @hidden Puts encoded data into glTF output. */
  write(e) {
    let t = 0;
    for (const o in this._encoderBufferViews) {
      const a = this._encoderBufferViews[o], c = this._encoderBufferViewData[o][0], u = e.otherBufferViewsIndexMap.get(c), h = this._encoderBufferViewAccessors[o];
      for (const A of h)
        A.bufferView = u;
      const g = e.jsonDoc.json.bufferViews[u], m = g.byteOffset || 0;
      Object.assign(g, a), g.byteOffset = t;
      const x = g.extensions[K];
      x.byteOffset = m, t += D.padNumber(a.byteLength);
    }
    const n = this._encoderFallbackBuffer, s = e.bufferIndexMap.get(n), r = e.jsonDoc.json.buffers[s];
    return r.byteLength = t, r.extensions = {
      [K]: {
        fallback: !0
      }
    }, n.dispose(), this;
  }
}
wt.EXTENSION_NAME = K;
wt.EncoderMethod = Ze;
class yr {
  match(e) {
    return e.length >= 12 && D.decodeText(e.slice(4, 12)) === "ftypavif";
  }
  /**
   * Probes size of AVIF or HEIC image. Assumes a single static image, without
   * orientation or other metadata that would affect dimensions.
   */
  getSize(e) {
    if (!this.match(e)) return null;
    const t = new DataView(e.buffer, e.byteOffset, e.byteLength);
    let n = $t(t, 0);
    if (!n) return null;
    let s = n.end;
    for (; n = $t(t, s); )
      if (n.type === "meta")
        s = n.start + 4;
      else if (n.type === "iprp" || n.type === "ipco")
        s = n.start;
      else {
        if (n.type === "ispe")
          return [t.getUint32(n.start + 4), t.getUint32(n.start + 8)];
        if (n.type === "mdat")
          break;
        s = n.end;
      }
    return null;
  }
  getChannels(e) {
    return 4;
  }
}
class Rs extends k {
  constructor(...e) {
    super(...e), this.extensionName = Ye, this.prereadTypes = [d.TEXTURE];
  }
  /** @hidden */
  static register() {
    ue.registerFormat("image/avif", new yr());
  }
  /** @hidden */
  preread(e) {
    return (e.jsonDoc.json.textures || []).forEach((n) => {
      n.extensions && n.extensions[Ye] && (n.source = n.extensions[Ye].source);
    }), this;
  }
  /** @hidden */
  read(e) {
    return this;
  }
  /** @hidden */
  write(e) {
    const t = e.jsonDoc;
    return this.document.getRoot().listTextures().forEach((n) => {
      if (n.getMimeType() === "image/avif") {
        const s = e.imageIndexMap.get(n);
        (t.json.textures || []).forEach((o) => {
          o.source === s && (o.extensions = o.extensions || {}, o.extensions[Ye] = {
            source: o.source
          }, delete o.source);
        });
      }
    }), this;
  }
}
Rs.EXTENSION_NAME = Ye;
function $t(i, e) {
  if (i.byteLength < 4 + e) return null;
  const t = i.getUint32(e);
  return i.byteLength < t + e || t < 8 ? null : {
    type: D.decodeText(new Uint8Array(i.buffer, i.byteOffset + e + 4, 4)),
    start: e + 8,
    end: e + t
  };
}
class Ir {
  match(e) {
    return e.length >= 12 && e[8] === 87 && e[9] === 69 && e[10] === 66 && e[11] === 80;
  }
  getSize(e) {
    const t = D.decodeText(e.slice(0, 4)), n = D.decodeText(e.slice(8, 12));
    if (t !== "RIFF" || n !== "WEBP") return null;
    const s = new DataView(e.buffer, e.byteOffset);
    let r = 12;
    for (; r < s.byteLength; ) {
      const o = D.decodeText(new Uint8Array([s.getUint8(r), s.getUint8(r + 1), s.getUint8(r + 2), s.getUint8(r + 3)])), a = s.getUint32(r + 4, !0);
      if (o === "VP8 ") {
        const c = s.getInt16(r + 14, !0) & 16383, u = s.getInt16(r + 16, !0) & 16383;
        return [c, u];
      } else if (o === "VP8L") {
        const c = s.getUint8(r + 9), u = s.getUint8(r + 10), h = s.getUint8(r + 11), g = s.getUint8(r + 12), m = 1 + ((u & 63) << 8 | c), x = 1 + ((g & 15) << 10 | h << 2 | (u & 192) >> 6);
        return [m, x];
      }
      r += 8 + a + a % 2;
    }
    return null;
  }
  getChannels(e) {
    return 4;
  }
}
class ys extends k {
  constructor(...e) {
    super(...e), this.extensionName = $e, this.prereadTypes = [d.TEXTURE];
  }
  /** @hidden */
  static register() {
    ue.registerFormat("image/webp", new Ir());
  }
  /** @hidden */
  preread(e) {
    return (e.jsonDoc.json.textures || []).forEach((n) => {
      n.extensions && n.extensions[$e] && (n.source = n.extensions[$e].source);
    }), this;
  }
  /** @hidden */
  read(e) {
    return this;
  }
  /** @hidden */
  write(e) {
    const t = e.jsonDoc;
    return this.document.getRoot().listTextures().forEach((n) => {
      if (n.getMimeType() === "image/webp") {
        const s = e.imageIndexMap.get(n);
        (t.json.textures || []).forEach((o) => {
          o.source === s && (o.extensions = o.extensions || {}, o.extensions[$e] = {
            source: o.source
          }, delete o.source);
        });
      }
    }), this;
  }
}
ys.EXTENSION_NAME = $e;
let X, Is, Ns;
function Nr(i, e) {
  const t = new X.DecoderBuffer();
  try {
    if (t.Init(e, e.length), i.GetEncodedGeometryType(t) !== X.TRIANGULAR_MESH)
      throw new Error(`[${G}] Unknown geometry type.`);
    const s = new X.Mesh();
    if (!i.DecodeBufferToMesh(t, s).ok() || s.ptr === 0)
      throw new Error(`[${G}] Decoding failure.`);
    return s;
  } finally {
    X.destroy(t);
  }
}
function Sr(i, e) {
  const n = e.num_faces() * 3;
  let s, r;
  if (e.num_points() <= 65534) {
    const o = n * Uint16Array.BYTES_PER_ELEMENT;
    s = X._malloc(o), i.GetTrianglesUInt16Array(e, o, s), r = new Uint16Array(X.HEAPU16.buffer, s, n).slice();
  } else {
    const o = n * Uint32Array.BYTES_PER_ELEMENT;
    s = X._malloc(o), i.GetTrianglesUInt32Array(e, o, s), r = new Uint32Array(X.HEAPU32.buffer, s, n).slice();
  }
  return X._free(s), r;
}
function Ar(i, e, t, n) {
  const s = Ns[n.componentType], r = Is[n.componentType], o = t.num_components(), c = e.num_points() * o, u = c * r.BYTES_PER_ELEMENT, h = X._malloc(u);
  i.GetAttributeDataArrayForAllPoints(e, t, s, u, h);
  const g = new r(X.HEAPF32.buffer, h, c).slice();
  return X._free(h), g;
}
function _r(i) {
  X = i, Is = {
    [S.ComponentType.FLOAT]: Float32Array,
    [S.ComponentType.UNSIGNED_INT]: Uint32Array,
    [S.ComponentType.UNSIGNED_SHORT]: Uint16Array,
    [S.ComponentType.UNSIGNED_BYTE]: Uint8Array,
    [S.ComponentType.SHORT]: Int16Array,
    [S.ComponentType.BYTE]: Int8Array
  }, Ns = {
    [S.ComponentType.FLOAT]: X.DT_FLOAT32,
    [S.ComponentType.UNSIGNED_INT]: X.DT_UINT32,
    [S.ComponentType.UNSIGNED_SHORT]: X.DT_UINT16,
    [S.ComponentType.UNSIGNED_BYTE]: X.DT_UINT8,
    [S.ComponentType.SHORT]: X.DT_INT16,
    [S.ComponentType.BYTE]: X.DT_INT8
  };
}
let se;
var et;
(function(i) {
  i[i.EDGEBREAKER = 1] = "EDGEBREAKER", i[i.SEQUENTIAL = 0] = "SEQUENTIAL";
})(et || (et = {}));
var ie;
(function(i) {
  i.POSITION = "POSITION", i.NORMAL = "NORMAL", i.COLOR = "COLOR", i.TEX_COORD = "TEX_COORD", i.GENERIC = "GENERIC";
})(ie || (ie = {}));
const Ss = {
  [ie.POSITION]: 14,
  [ie.NORMAL]: 10,
  [ie.COLOR]: 8,
  [ie.TEX_COORD]: 12,
  [ie.GENERIC]: 12
}, Yt = {
  decodeSpeed: 5,
  encodeSpeed: 5,
  method: et.EDGEBREAKER,
  quantizationBits: Ss,
  quantizationVolume: "mesh"
};
function Mr(i) {
  se = i;
}
function br(i, e = Yt) {
  const t = _e({}, Yt, e);
  t.quantizationBits = _e({}, Ss, e.quantizationBits);
  const n = new se.MeshBuilder(), s = new se.Mesh(), r = new se.ExpertEncoder(s), o = {}, a = new se.DracoInt8Array(), c = i.listTargets().length > 0;
  let u = !1;
  for (const b of i.listSemantics()) {
    const _ = i.getAttribute(b);
    if (_.getSparse()) {
      u = !0;
      continue;
    }
    const l = wr(b), M = Cr(n, _.getComponentType(), s, se[l], _.getCount(), _.getElementSize(), _.getArray());
    if (M === -1) throw new Error(`Error compressing "${b}" attribute.`);
    if (o[b] = M, t.quantizationVolume === "mesh" || b !== "POSITION")
      r.SetAttributeQuantization(M, t.quantizationBits[l]);
    else if (typeof t.quantizationVolume == "object") {
      const {
        quantizationVolume: T
      } = t, y = Math.max(T.max[0] - T.min[0], T.max[1] - T.min[1], T.max[2] - T.min[2]);
      r.SetAttributeExplicitQuantization(M, t.quantizationBits[l], _.getElementSize(), T.min, y);
    } else
      throw new Error("Invalid quantization volume state.");
  }
  const h = i.getIndices();
  if (!h) throw new At("Primitive must have indices.");
  n.AddFacesToMesh(s, h.getCount() / 3, h.getArray()), r.SetSpeedOptions(t.encodeSpeed, t.decodeSpeed), r.SetTrackEncodedProperties(!0), t.method === et.SEQUENTIAL || c || u ? r.SetEncodingMethod(se.MESH_SEQUENTIAL_ENCODING) : r.SetEncodingMethod(se.MESH_EDGEBREAKER_ENCODING);
  const g = r.EncodeToDracoBuffer(!(c || u), a);
  if (g <= 0) throw new At("Error applying Draco compression.");
  const m = new Uint8Array(g);
  for (let b = 0; b < g; ++b)
    m[b] = a.GetValue(b);
  const x = r.GetNumberOfEncodedPoints(), A = r.GetNumberOfEncodedFaces() * 3;
  return se.destroy(a), se.destroy(s), se.destroy(n), se.destroy(r), {
    numVertices: x,
    numIndices: A,
    data: m,
    attributeIDs: o
  };
}
function wr(i) {
  return i === "POSITION" ? ie.POSITION : i === "NORMAL" ? ie.NORMAL : i.startsWith("COLOR_") ? ie.COLOR : i.startsWith("TEXCOORD_") ? ie.TEX_COORD : ie.GENERIC;
}
function Cr(i, e, t, n, s, r, o) {
  switch (e) {
    case S.ComponentType.UNSIGNED_BYTE:
      return i.AddUInt8Attribute(t, n, s, r, o);
    case S.ComponentType.BYTE:
      return i.AddInt8Attribute(t, n, s, r, o);
    case S.ComponentType.UNSIGNED_SHORT:
      return i.AddUInt16Attribute(t, n, s, r, o);
    case S.ComponentType.SHORT:
      return i.AddInt16Attribute(t, n, s, r, o);
    case S.ComponentType.UNSIGNED_INT:
      return i.AddUInt32Attribute(t, n, s, r, o);
    case S.ComponentType.FLOAT:
      return i.AddFloatAttribute(t, n, s, r, o);
    default:
      throw new Error(`Unexpected component type, "${e}".`);
  }
}
class At extends Error {
}
class Ct extends k {
  constructor(...e) {
    super(...e), this.extensionName = G, this.prereadTypes = [d.PRIMITIVE], this.prewriteTypes = [d.ACCESSOR], this.readDependencies = ["draco3d.decoder"], this.writeDependencies = ["draco3d.encoder"], this._decoderModule = null, this._encoderModule = null, this._encoderOptions = {};
  }
  /** @hidden */
  install(e, t) {
    return e === "draco3d.decoder" && (this._decoderModule = t, _r(this._decoderModule)), e === "draco3d.encoder" && (this._encoderModule = t, Mr(this._encoderModule)), this;
  }
  /**
   * Sets Draco compression options. Compression does not take effect until the Document is
   * written with an I/O class.
   *
   * Defaults:
   * ```
   * decodeSpeed?: number = 5;
   * encodeSpeed?: number = 5;
   * method?: EncoderMethod = EncoderMethod.EDGEBREAKER;
   * quantizationBits?: {[ATTRIBUTE_NAME]: bits};
   * quantizationVolume?: 'mesh' | 'scene' | bbox = 'mesh';
   * ```
   */
  setEncoderOptions(e) {
    return this._encoderOptions = e, this;
  }
  /** @hidden */
  preread(e) {
    if (!this._decoderModule)
      throw new Error(`[${G}] Please install extension dependency, "draco3d.decoder".`);
    const t = this.document.getLogger(), n = e.jsonDoc, s = /* @__PURE__ */ new Map();
    try {
      const r = n.json.meshes || [];
      for (const o of r)
        for (const a of o.primitives) {
          if (!a.extensions || !a.extensions[G]) continue;
          const c = a.extensions[G];
          let [u, h] = s.get(c.bufferView) || [];
          if (!h || !u) {
            const g = n.json.bufferViews[c.bufferView], m = n.json.buffers[g.buffer], x = m.uri ? n.resources[m.uri] : n.resources[ke], A = g.byteOffset || 0, b = g.byteLength, _ = D.toView(x, A, b);
            u = new this._decoderModule.Decoder(), h = Nr(u, _), s.set(c.bufferView, [u, h]), t.debug(`[${G}] Decompressed ${_.byteLength} bytes.`);
          }
          for (const g in c.attributes) {
            const m = e.jsonDoc.json.accessors[a.attributes[g]], x = u.GetAttributeByUniqueId(h, c.attributes[g]), A = Ar(u, h, x, m);
            e.accessors[a.attributes[g]].setArray(A);
          }
          a.indices !== void 0 && e.accessors[a.indices].setArray(Sr(u, h));
        }
    } finally {
      for (const [r, o] of Array.from(s.values()))
        this._decoderModule.destroy(r), this._decoderModule.destroy(o);
    }
    return this;
  }
  /** @hidden */
  read(e) {
    return this;
  }
  /** @hidden */
  prewrite(e, t) {
    if (!this._encoderModule)
      throw new Error(`[${G}] Please install extension dependency, "draco3d.encoder".`);
    const n = this.document.getLogger();
    n.debug(`[${G}] Compression options: ${JSON.stringify(this._encoderOptions)}`);
    const s = Or(this.document), r = /* @__PURE__ */ new Map();
    let o = "mesh";
    this._encoderOptions.quantizationVolume === "scene" && (this.document.getRoot().listScenes().length !== 1 ? n.warn(`[${G}]: quantizationVolume=scene requires exactly 1 scene.`) : o = Rn(this.document.getRoot().listScenes().pop()));
    for (const a of Array.from(s.keys())) {
      const c = s.get(a);
      if (!c) throw new Error("Unexpected primitive.");
      if (r.has(c)) {
        r.set(c, r.get(c));
        continue;
      }
      const u = a.getIndices(), h = e.jsonDoc.json.accessors;
      let g;
      try {
        g = br(a, _e({}, this._encoderOptions, {
          quantizationVolume: o
        }));
      } catch (A) {
        if (A instanceof At) {
          n.warn(`[${G}]: ${A.message} Skipping primitive compression.`);
          continue;
        }
        throw A;
      }
      r.set(c, g);
      const m = e.createAccessorDef(u);
      m.count = g.numIndices, e.accessorIndexMap.set(u, h.length), h.push(m), g.numVertices > 65534 && S.getComponentSize(m.componentType) <= 2 ? m.componentType = S.ComponentType.UNSIGNED_INT : g.numVertices > 254 && S.getComponentSize(m.componentType) <= 1 && (m.componentType = S.ComponentType.UNSIGNED_SHORT);
      for (const A of a.listSemantics()) {
        const b = a.getAttribute(A);
        if (g.attributeIDs[A] === void 0) continue;
        const _ = e.createAccessorDef(b);
        _.count = g.numVertices, e.accessorIndexMap.set(b, h.length), h.push(_);
      }
      const x = a.getAttribute("POSITION").getBuffer() || this.document.getRoot().listBuffers()[0];
      e.otherBufferViews.has(x) || e.otherBufferViews.set(x, []), e.otherBufferViews.get(x).push(g.data);
    }
    return n.debug(`[${G}] Compressed ${s.size} primitives.`), e.extensionData[G] = {
      primitiveHashMap: s,
      primitiveEncodingMap: r
    }, this;
  }
  /** @hidden */
  write(e) {
    const t = e.extensionData[G];
    for (const n of this.document.getRoot().listMeshes()) {
      const s = e.jsonDoc.json.meshes[e.meshIndexMap.get(n)];
      for (let r = 0; r < n.listPrimitives().length; r++) {
        const o = n.listPrimitives()[r], a = s.primitives[r], c = t.primitiveHashMap.get(o);
        if (!c) continue;
        const u = t.primitiveEncodingMap.get(c);
        u && (a.extensions = a.extensions || {}, a.extensions[G] = {
          bufferView: e.otherBufferViewsIndexMap.get(u.data),
          attributes: u.attributeIDs
        });
      }
    }
    if (!t.primitiveHashMap.size) {
      const n = e.jsonDoc.json;
      n.extensionsUsed = (n.extensionsUsed || []).filter((s) => s !== G), n.extensionsRequired = (n.extensionsRequired || []).filter((s) => s !== G);
    }
    return this;
  }
}
Ct.EXTENSION_NAME = G;
Ct.EncoderMethod = et;
function Or(i) {
  const e = i.getLogger(), t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set();
  let s = 0, r = 0;
  for (const g of i.getRoot().listMeshes())
    for (const m of g.listPrimitives())
      m.getIndices() ? m.getMode() !== Ue.Mode.TRIANGLES ? (n.add(m), r++) : t.add(m) : (n.add(m), s++);
  s > 0 && e.warn(`[${G}] Skipping Draco compression of ${s} non-indexed primitives.`), r > 0 && e.warn(`[${G}] Skipping Draco compression of ${r} non-TRIANGLES primitives.`);
  const o = i.getRoot().listAccessors(), a = /* @__PURE__ */ new Map();
  for (let g = 0; g < o.length; g++) a.set(o[g], g);
  const c = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Set(), h = /* @__PURE__ */ new Map();
  for (const g of Array.from(t)) {
    let m = qt(g, a);
    if (u.has(m)) {
      h.set(g, m);
      continue;
    }
    if (c.has(g.getIndices())) {
      const x = g.getIndices(), A = x.clone();
      a.set(A, i.getRoot().listAccessors().length - 1), g.swap(x, A);
    }
    for (const x of g.listAttributes())
      if (c.has(x)) {
        const A = x.clone();
        a.set(A, i.getRoot().listAccessors().length - 1), g.swap(x, A);
      }
    m = qt(g, a), u.add(m), h.set(g, m), c.set(g.getIndices(), m);
    for (const x of g.listAttributes())
      c.set(x, m);
  }
  for (const g of Array.from(c.keys())) {
    const m = new Set(g.listParents().map((x) => x.propertyType));
    if (m.size !== 2 || !m.has(d.PRIMITIVE) || !m.has(d.ROOT))
      throw new Error(`[${G}] Compressed accessors must only be used as indices or vertex attributes.`);
  }
  for (const g of Array.from(t)) {
    const m = h.get(g), x = g.getIndices();
    if (c.get(x) !== m || g.listAttributes().some((A) => c.get(A) !== m))
      throw new Error(`[${G}] Draco primitives must share all, or no, accessors.`);
  }
  for (const g of Array.from(n)) {
    const m = g.getIndices();
    if (c.has(m) || g.listAttributes().some((x) => c.has(x)))
      throw new Error(`[${G}] Accessor cannot be shared by compressed and uncompressed primitives.`);
  }
  return h;
}
function qt(i, e) {
  const t = [], n = i.getIndices();
  t.push(e.get(n));
  for (const s of i.listAttributes())
    t.push(e.get(s));
  return t.sort().join("|");
}
class He extends H {
  /**********************************************************************************************
   * INSTANCE.
   */
  init() {
    this.extensionName = ne, this.propertyType = "Light", this.parentTypes = [d.NODE];
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      color: [1, 1, 1],
      intensity: 1,
      type: He.Type.POINT,
      range: null,
      innerConeAngle: 0,
      outerConeAngle: Math.PI / 4
    });
  }
  /**********************************************************************************************
   * COLOR.
   */
  /** Light color; Linear-sRGB components. */
  getColor() {
    return this.get("color");
  }
  /** Light color; Linear-sRGB components. */
  setColor(e) {
    return this.set("color", e);
  }
  /**********************************************************************************************
   * INTENSITY.
   */
  /**
   * Brightness of light. Units depend on the type of light: point and spot lights use luminous
   * intensity in candela (lm/sr) while directional lights use illuminance in lux (lm/m2).
   */
  getIntensity() {
    return this.get("intensity");
  }
  /**
   * Brightness of light. Units depend on the type of light: point and spot lights use luminous
   * intensity in candela (lm/sr) while directional lights use illuminance in lux (lm/m2).
   */
  setIntensity(e) {
    return this.set("intensity", e);
  }
  /**********************************************************************************************
   * TYPE.
   */
  /** Type. */
  getType() {
    return this.get("type");
  }
  /** Type. */
  setType(e) {
    return this.set("type", e);
  }
  /**********************************************************************************************
   * RANGE.
   */
  /**
   * Hint defining a distance cutoff at which the light's intensity may be considered to have
   * reached zero. Supported only for point and spot lights. Must be > 0. When undefined, range
   * is assumed to be infinite.
   */
  getRange() {
    return this.get("range");
  }
  /**
   * Hint defining a distance cutoff at which the light's intensity may be considered to have
   * reached zero. Supported only for point and spot lights. Must be > 0. When undefined, range
   * is assumed to be infinite.
   */
  setRange(e) {
    return this.set("range", e);
  }
  /**********************************************************************************************
   * SPOT LIGHT PROPERTIES
   */
  /**
   * Angle, in radians, from centre of spotlight where falloff begins. Must be >= 0 and
   * < outerConeAngle.
   */
  getInnerConeAngle() {
    return this.get("innerConeAngle");
  }
  /**
   * Angle, in radians, from centre of spotlight where falloff begins. Must be >= 0 and
   * < outerConeAngle.
   */
  setInnerConeAngle(e) {
    return this.set("innerConeAngle", e);
  }
  /**
   * Angle, in radians, from centre of spotlight where falloff ends. Must be > innerConeAngle and
   * <= PI / 2.0.
   */
  getOuterConeAngle() {
    return this.get("outerConeAngle");
  }
  /**
   * Angle, in radians, from centre of spotlight where falloff ends. Must be > innerConeAngle and
   * <= PI / 2.0.
   */
  setOuterConeAngle(e) {
    return this.set("outerConeAngle", e);
  }
}
He.EXTENSION_NAME = ne;
He.Type = {
  POINT: "point",
  SPOT: "spot",
  DIRECTIONAL: "directional"
};
class As extends k {
  constructor(...e) {
    super(...e), this.extensionName = ne;
  }
  /** Creates a new punctual Light property for use on a {@link Node}. */
  createLight(e = "") {
    return new He(this.document.getGraph(), e);
  }
  /** @hidden */
  read(e) {
    const t = e.jsonDoc;
    if (!t.json.extensions || !t.json.extensions[ne]) return this;
    const r = (t.json.extensions[ne].lights || []).map((o) => {
      var a, c;
      const u = this.createLight().setName(o.name || "").setType(o.type);
      return o.color !== void 0 && u.setColor(o.color), o.intensity !== void 0 && u.setIntensity(o.intensity), o.range !== void 0 && u.setRange(o.range), ((a = o.spot) == null ? void 0 : a.innerConeAngle) !== void 0 && u.setInnerConeAngle(o.spot.innerConeAngle), ((c = o.spot) == null ? void 0 : c.outerConeAngle) !== void 0 && u.setOuterConeAngle(o.spot.outerConeAngle), u;
    });
    return t.json.nodes.forEach((o, a) => {
      if (!o.extensions || !o.extensions[ne]) return;
      const c = o.extensions[ne];
      e.nodes[a].setExtension(ne, r[c.light]);
    }), this;
  }
  /** @hidden */
  write(e) {
    const t = e.jsonDoc;
    if (this.properties.size === 0) return this;
    const n = [], s = /* @__PURE__ */ new Map();
    for (const r of this.properties) {
      const o = r, a = {
        type: o.getType()
      };
      L.eq(o.getColor(), [1, 1, 1]) || (a.color = o.getColor()), o.getIntensity() !== 1 && (a.intensity = o.getIntensity()), o.getRange() != null && (a.range = o.getRange()), o.getName() && (a.name = o.getName()), o.getType() === He.Type.SPOT && (a.spot = {
        innerConeAngle: o.getInnerConeAngle(),
        outerConeAngle: o.getOuterConeAngle()
      }), n.push(a), s.set(o, n.length - 1);
    }
    return this.document.getRoot().listNodes().forEach((r) => {
      const o = r.getExtension(ne);
      if (o) {
        const a = e.nodeIndexMap.get(r), c = t.json.nodes[a];
        c.extensions = c.extensions || {}, c.extensions[ne] = {
          light: s.get(o)
        };
      }
    }), t.json.extensions = t.json.extensions || {}, t.json.extensions[ne] = {
      lights: n
    }, this;
  }
}
As.EXTENSION_NAME = ne;
const {
  R: Dr,
  G: vr,
  B: Fr
} = ae;
class _s extends H {
  init() {
    this.extensionName = he, this.propertyType = "Anisotropy", this.parentTypes = [d.MATERIAL];
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      anisotropyStrength: 0,
      anisotropyRotation: 0,
      anisotropyTexture: null,
      anisotropyTextureInfo: new j(this.graph, "anisotropyTextureInfo")
    });
  }
  /**********************************************************************************************
   * Anisotropy strength.
   */
  /** Anisotropy strength. */
  getAnisotropyStrength() {
    return this.get("anisotropyStrength");
  }
  /** Anisotropy strength. */
  setAnisotropyStrength(e) {
    return this.set("anisotropyStrength", e);
  }
  /**********************************************************************************************
   * Anisotropy rotation.
   */
  /** Anisotropy rotation; linear multiplier. */
  getAnisotropyRotation() {
    return this.get("anisotropyRotation");
  }
  /** Anisotropy rotation; linear multiplier. */
  setAnisotropyRotation(e) {
    return this.set("anisotropyRotation", e);
  }
  /**********************************************************************************************
   * Anisotropy texture.
   */
  /**
   * Anisotropy texture. Red and green channels represent the anisotropy
   * direction in [-1, 1] tangent, bitangent space, to be rotated by
   * anisotropyRotation. The blue channel contains strength as [0, 1] to be
   * multiplied by anisotropyStrength.
   */
  getAnisotropyTexture() {
    return this.getRef("anisotropyTexture");
  }
  /**
   * Settings affecting the material's use of its anisotropy texture. If no
   * texture is attached, {@link TextureInfo} is `null`.
   */
  getAnisotropyTextureInfo() {
    return this.getRef("anisotropyTexture") ? this.getRef("anisotropyTextureInfo") : null;
  }
  /** Anisotropy texture. See {@link Anisotropy.getAnisotropyTexture getAnisotropyTexture}. */
  setAnisotropyTexture(e) {
    return this.setRef("anisotropyTexture", e, {
      channels: Dr | vr | Fr
    });
  }
}
_s.EXTENSION_NAME = he;
class Ms extends k {
  constructor(...e) {
    super(...e), this.extensionName = he, this.prereadTypes = [d.MESH], this.prewriteTypes = [d.MESH];
  }
  /** Creates a new Anisotropy property for use on a {@link Material}. */
  createAnisotropy() {
    return new _s(this.document.getGraph());
  }
  /** @hidden */
  read(e) {
    return this;
  }
  /** @hidden */
  write(e) {
    return this;
  }
  /** @hidden */
  preread(e) {
    const t = e.jsonDoc, n = t.json.materials || [], s = t.json.textures || [];
    return n.forEach((r, o) => {
      if (r.extensions && r.extensions[he]) {
        const a = this.createAnisotropy();
        e.materials[o].setExtension(he, a);
        const c = r.extensions[he];
        if (c.anisotropyStrength !== void 0 && a.setAnisotropyStrength(c.anisotropyStrength), c.anisotropyRotation !== void 0 && a.setAnisotropyRotation(c.anisotropyRotation), c.anisotropyTexture !== void 0) {
          const u = c.anisotropyTexture, h = e.textures[s[u.index].source];
          a.setAnisotropyTexture(h), e.setTextureInfo(a.getAnisotropyTextureInfo(), u);
        }
      }
    }), this;
  }
  /** @hidden */
  prewrite(e) {
    const t = e.jsonDoc;
    return this.document.getRoot().listMaterials().forEach((n) => {
      const s = n.getExtension(he);
      if (s) {
        const r = e.materialIndexMap.get(n), o = t.json.materials[r];
        o.extensions = o.extensions || {};
        const a = o.extensions[he] = {};
        if (s.getAnisotropyStrength() > 0 && (a.anisotropyStrength = s.getAnisotropyStrength()), s.getAnisotropyRotation() !== 0 && (a.anisotropyRotation = s.getAnisotropyRotation()), s.getAnisotropyTexture()) {
          const c = s.getAnisotropyTexture(), u = s.getAnisotropyTextureInfo();
          a.anisotropyTexture = e.createTextureInfoDef(c, u);
        }
      }
    }), this;
  }
}
Ms.EXTENSION_NAME = he;
const {
  R: Wt,
  G: Jt,
  B: Ur
} = ae;
class bs extends H {
  init() {
    this.extensionName = de, this.propertyType = "Clearcoat", this.parentTypes = [d.MATERIAL];
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      clearcoatFactor: 0,
      clearcoatTexture: null,
      clearcoatTextureInfo: new j(this.graph, "clearcoatTextureInfo"),
      clearcoatRoughnessFactor: 0,
      clearcoatRoughnessTexture: null,
      clearcoatRoughnessTextureInfo: new j(this.graph, "clearcoatRoughnessTextureInfo"),
      clearcoatNormalScale: 1,
      clearcoatNormalTexture: null,
      clearcoatNormalTextureInfo: new j(this.graph, "clearcoatNormalTextureInfo")
    });
  }
  /**********************************************************************************************
   * Clearcoat.
   */
  /** Clearcoat; linear multiplier. See {@link Clearcoat.getClearcoatTexture getClearcoatTexture}. */
  getClearcoatFactor() {
    return this.get("clearcoatFactor");
  }
  /** Clearcoat; linear multiplier. See {@link Clearcoat.getClearcoatTexture getClearcoatTexture}. */
  setClearcoatFactor(e) {
    return this.set("clearcoatFactor", e);
  }
  /**
   * Clearcoat texture; linear multiplier. The `r` channel of this texture specifies an amount
   * [0-1] of coating over the surface of the material, which may have its own roughness and
   * normal map properties.
   */
  getClearcoatTexture() {
    return this.getRef("clearcoatTexture");
  }
  /**
   * Settings affecting the material's use of its clearcoat texture. If no texture is attached,
   * {@link TextureInfo} is `null`.
   */
  getClearcoatTextureInfo() {
    return this.getRef("clearcoatTexture") ? this.getRef("clearcoatTextureInfo") : null;
  }
  /** Sets clearcoat texture. See {@link Clearcoat.getClearcoatTexture getClearcoatTexture}. */
  setClearcoatTexture(e) {
    return this.setRef("clearcoatTexture", e, {
      channels: Wt
    });
  }
  /**********************************************************************************************
   * Clearcoat roughness.
   */
  /**
   * Clearcoat roughness; linear multiplier.
   * See {@link Clearcoat.getClearcoatRoughnessTexture getClearcoatRoughnessTexture}.
   */
  getClearcoatRoughnessFactor() {
    return this.get("clearcoatRoughnessFactor");
  }
  /**
   * Clearcoat roughness; linear multiplier.
   * See {@link Clearcoat.getClearcoatRoughnessTexture getClearcoatRoughnessTexture}.
   */
  setClearcoatRoughnessFactor(e) {
    return this.set("clearcoatRoughnessFactor", e);
  }
  /**
   * Clearcoat roughness texture; linear multiplier. The `g` channel of this texture specifies
   * roughness, independent of the base layer's roughness.
   */
  getClearcoatRoughnessTexture() {
    return this.getRef("clearcoatRoughnessTexture");
  }
  /**
   * Settings affecting the material's use of its clearcoat roughness texture. If no texture is
   * attached, {@link TextureInfo} is `null`.
   */
  getClearcoatRoughnessTextureInfo() {
    return this.getRef("clearcoatRoughnessTexture") ? this.getRef("clearcoatRoughnessTextureInfo") : null;
  }
  /**
   * Sets clearcoat roughness texture.
   * See {@link Clearcoat.getClearcoatRoughnessTexture getClearcoatRoughnessTexture}.
   */
  setClearcoatRoughnessTexture(e) {
    return this.setRef("clearcoatRoughnessTexture", e, {
      channels: Jt
    });
  }
  /**********************************************************************************************
   * Clearcoat normals.
   */
  /** Clearcoat normal scale. See {@link Clearcoat.getClearcoatNormalTexture getClearcoatNormalTexture}. */
  getClearcoatNormalScale() {
    return this.get("clearcoatNormalScale");
  }
  /** Clearcoat normal scale. See {@link Clearcoat.getClearcoatNormalTexture getClearcoatNormalTexture}. */
  setClearcoatNormalScale(e) {
    return this.set("clearcoatNormalScale", e);
  }
  /**
   * Clearcoat normal map. Independent of the material base layer normal map.
   */
  getClearcoatNormalTexture() {
    return this.getRef("clearcoatNormalTexture");
  }
  /**
   * Settings affecting the material's use of its clearcoat normal texture. If no texture is
   * attached, {@link TextureInfo} is `null`.
   */
  getClearcoatNormalTextureInfo() {
    return this.getRef("clearcoatNormalTexture") ? this.getRef("clearcoatNormalTextureInfo") : null;
  }
  /** Sets clearcoat normal texture. See {@link Clearcoat.getClearcoatNormalTexture getClearcoatNormalTexture}. */
  setClearcoatNormalTexture(e) {
    return this.setRef("clearcoatNormalTexture", e, {
      channels: Wt | Jt | Ur
    });
  }
}
bs.EXTENSION_NAME = de;
class ws extends k {
  constructor(...e) {
    super(...e), this.extensionName = de, this.prereadTypes = [d.MESH], this.prewriteTypes = [d.MESH];
  }
  /** Creates a new Clearcoat property for use on a {@link Material}. */
  createClearcoat() {
    return new bs(this.document.getGraph());
  }
  /** @hidden */
  read(e) {
    return this;
  }
  /** @hidden */
  write(e) {
    return this;
  }
  /** @hidden */
  preread(e) {
    const t = e.jsonDoc, n = t.json.materials || [], s = t.json.textures || [];
    return n.forEach((r, o) => {
      if (r.extensions && r.extensions[de]) {
        const a = this.createClearcoat();
        e.materials[o].setExtension(de, a);
        const c = r.extensions[de];
        if (c.clearcoatFactor !== void 0 && a.setClearcoatFactor(c.clearcoatFactor), c.clearcoatRoughnessFactor !== void 0 && a.setClearcoatRoughnessFactor(c.clearcoatRoughnessFactor), c.clearcoatTexture !== void 0) {
          const u = c.clearcoatTexture, h = e.textures[s[u.index].source];
          a.setClearcoatTexture(h), e.setTextureInfo(a.getClearcoatTextureInfo(), u);
        }
        if (c.clearcoatRoughnessTexture !== void 0) {
          const u = c.clearcoatRoughnessTexture, h = e.textures[s[u.index].source];
          a.setClearcoatRoughnessTexture(h), e.setTextureInfo(a.getClearcoatRoughnessTextureInfo(), u);
        }
        if (c.clearcoatNormalTexture !== void 0) {
          const u = c.clearcoatNormalTexture, h = e.textures[s[u.index].source];
          a.setClearcoatNormalTexture(h), e.setTextureInfo(a.getClearcoatNormalTextureInfo(), u), u.scale !== void 0 && a.setClearcoatNormalScale(u.scale);
        }
      }
    }), this;
  }
  /** @hidden */
  prewrite(e) {
    const t = e.jsonDoc;
    return this.document.getRoot().listMaterials().forEach((n) => {
      const s = n.getExtension(de);
      if (s) {
        const r = e.materialIndexMap.get(n), o = t.json.materials[r];
        o.extensions = o.extensions || {};
        const a = o.extensions[de] = {
          clearcoatFactor: s.getClearcoatFactor(),
          clearcoatRoughnessFactor: s.getClearcoatRoughnessFactor()
        };
        if (s.getClearcoatTexture()) {
          const c = s.getClearcoatTexture(), u = s.getClearcoatTextureInfo();
          a.clearcoatTexture = e.createTextureInfoDef(c, u);
        }
        if (s.getClearcoatRoughnessTexture()) {
          const c = s.getClearcoatRoughnessTexture(), u = s.getClearcoatRoughnessTextureInfo();
          a.clearcoatRoughnessTexture = e.createTextureInfoDef(c, u);
        }
        if (s.getClearcoatNormalTexture()) {
          const c = s.getClearcoatNormalTexture(), u = s.getClearcoatNormalTextureInfo();
          a.clearcoatNormalTexture = e.createTextureInfoDef(c, u), s.getClearcoatNormalScale() !== 1 && (a.clearcoatNormalTexture.scale = s.getClearcoatNormalScale());
        }
      }
    }), this;
  }
}
ws.EXTENSION_NAME = de;
const {
  R: Br,
  G: Lr,
  B: jr,
  A: Pr
} = ae;
class Cs extends H {
  init() {
    this.extensionName = ge, this.propertyType = "DiffuseTransmission", this.parentTypes = [d.MATERIAL];
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      diffuseTransmissionFactor: 0,
      diffuseTransmissionTexture: null,
      diffuseTransmissionTextureInfo: new j(this.graph, "diffuseTransmissionTextureInfo"),
      diffuseTransmissionColorFactor: [1, 1, 1],
      diffuseTransmissionColorTexture: null,
      diffuseTransmissionColorTextureInfo: new j(this.graph, "diffuseTransmissionColorTextureInfo")
    });
  }
  /**********************************************************************************************
   * Diffuse transmission.
   */
  /**
   * Percentage of reflected, non-specularly reflected light that is transmitted through the
   * surface via the Lambertian diffuse transmission, i.e., the strength of the diffuse
   * transmission effect.
   */
  getDiffuseTransmissionFactor() {
    return this.get("diffuseTransmissionFactor");
  }
  /**
   * Percentage of reflected, non-specularly reflected light that is transmitted through the
   * surface via the Lambertian diffuse transmission, i.e., the strength of the diffuse
   * transmission effect.
   */
  setDiffuseTransmissionFactor(e) {
    return this.set("diffuseTransmissionFactor", e);
  }
  /**
   * Texture that defines the strength of the diffuse transmission effect, stored in the alpha (A)
   * channel. Will be multiplied by the diffuseTransmissionFactor.
   */
  getDiffuseTransmissionTexture() {
    return this.getRef("diffuseTransmissionTexture");
  }
  /**
   * Settings affecting the material's use of its diffuse transmission texture. If no texture is attached,
   * {@link TextureInfo} is `null`.
   */
  getDiffuseTransmissionTextureInfo() {
    return this.getRef("diffuseTransmissionTexture") ? this.getRef("diffuseTransmissionTextureInfo") : null;
  }
  /**
   * Texture that defines the strength of the diffuse transmission effect, stored in the alpha (A)
   * channel. Will be multiplied by the diffuseTransmissionFactor.
   */
  setDiffuseTransmissionTexture(e) {
    return this.setRef("diffuseTransmissionTexture", e, {
      channels: Pr
    });
  }
  /**********************************************************************************************
   * Diffuse transmission color.
   */
  /** Color of the transmitted light; Linear-sRGB components. */
  getDiffuseTransmissionColorFactor() {
    return this.get("diffuseTransmissionColorFactor");
  }
  /** Color of the transmitted light; Linear-sRGB components. */
  setDiffuseTransmissionColorFactor(e) {
    return this.set("diffuseTransmissionColorFactor", e);
  }
  /**
   * Texture that defines the color of the transmitted light, stored in the RGB channels and
   * encoded in sRGB. This texture will be multiplied by diffuseTransmissionColorFactor.
   */
  getDiffuseTransmissionColorTexture() {
    return this.getRef("diffuseTransmissionColorTexture");
  }
  /**
   * Settings affecting the material's use of its diffuse transmission color texture. If no
   * texture is attached, {@link TextureInfo} is `null`.
   */
  getDiffuseTransmissionColorTextureInfo() {
    return this.getRef("diffuseTransmissionColorTexture") ? this.getRef("diffuseTransmissionColorTextureInfo") : null;
  }
  /**
   * Texture that defines the color of the transmitted light, stored in the RGB channels and
   * encoded in sRGB. This texture will be multiplied by diffuseTransmissionColorFactor.
   */
  setDiffuseTransmissionColorTexture(e) {
    return this.setRef("diffuseTransmissionColorTexture", e, {
      channels: Br | Lr | jr
    });
  }
}
Cs.EXTENSION_NAME = ge;
class Os extends k {
  constructor(...e) {
    super(...e), this.extensionName = ge;
  }
  /** Creates a new DiffuseTransmission property for use on a {@link Material}. */
  createDiffuseTransmission() {
    return new Cs(this.document.getGraph());
  }
  /** @hidden */
  read(e) {
    const t = e.jsonDoc, n = t.json.materials || [], s = t.json.textures || [];
    return n.forEach((r, o) => {
      if (r.extensions && r.extensions[ge]) {
        const a = this.createDiffuseTransmission();
        e.materials[o].setExtension(ge, a);
        const c = r.extensions[ge];
        if (c.diffuseTransmissionFactor !== void 0 && a.setDiffuseTransmissionFactor(c.diffuseTransmissionFactor), c.diffuseTransmissionColorFactor !== void 0 && a.setDiffuseTransmissionColorFactor(c.diffuseTransmissionColorFactor), c.diffuseTransmissionTexture !== void 0) {
          const u = c.diffuseTransmissionTexture, h = e.textures[s[u.index].source];
          a.setDiffuseTransmissionTexture(h), e.setTextureInfo(a.getDiffuseTransmissionTextureInfo(), u);
        }
        if (c.diffuseTransmissionColorTexture !== void 0) {
          const u = c.diffuseTransmissionColorTexture, h = e.textures[s[u.index].source];
          a.setDiffuseTransmissionColorTexture(h), e.setTextureInfo(a.getDiffuseTransmissionColorTextureInfo(), u);
        }
      }
    }), this;
  }
  /** @hidden */
  write(e) {
    const t = e.jsonDoc;
    for (const n of this.document.getRoot().listMaterials()) {
      const s = n.getExtension(ge);
      if (!s) continue;
      const r = e.materialIndexMap.get(n), o = t.json.materials[r];
      o.extensions = o.extensions || {};
      const a = o.extensions[ge] = {
        diffuseTransmissionFactor: s.getDiffuseTransmissionFactor(),
        diffuseTransmissionColorFactor: s.getDiffuseTransmissionColorFactor()
      };
      if (s.getDiffuseTransmissionTexture()) {
        const c = s.getDiffuseTransmissionTexture(), u = s.getDiffuseTransmissionTextureInfo();
        a.diffuseTransmissionTexture = e.createTextureInfoDef(c, u);
      }
      if (s.getDiffuseTransmissionColorTexture()) {
        const c = s.getDiffuseTransmissionColorTexture(), u = s.getDiffuseTransmissionColorTextureInfo();
        a.diffuseTransmissionColorTexture = e.createTextureInfoDef(c, u);
      }
    }
    return this;
  }
}
Os.EXTENSION_NAME = ge;
class Ds extends H {
  init() {
    this.extensionName = pe, this.propertyType = "Dispersion", this.parentTypes = [d.MATERIAL];
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      dispersion: 0
    });
  }
  /**********************************************************************************************
   * Dispersion.
   */
  /** Dispersion. */
  getDispersion() {
    return this.get("dispersion");
  }
  /** Dispersion. */
  setDispersion(e) {
    return this.set("dispersion", e);
  }
}
Ds.EXTENSION_NAME = pe;
class vs extends k {
  constructor(...e) {
    super(...e), this.extensionName = pe, this.prereadTypes = [d.MESH], this.prewriteTypes = [d.MESH];
  }
  /** Creates a new Dispersion property for use on a {@link Material}. */
  createDispersion() {
    return new Ds(this.document.getGraph());
  }
  /** @hidden */
  read(e) {
    return this;
  }
  /** @hidden */
  write(e) {
    return this;
  }
  /** @hidden */
  preread(e) {
    return (e.jsonDoc.json.materials || []).forEach((s, r) => {
      if (s.extensions && s.extensions[pe]) {
        const o = this.createDispersion();
        e.materials[r].setExtension(pe, o);
        const a = s.extensions[pe];
        a.dispersion !== void 0 && o.setDispersion(a.dispersion);
      }
    }), this;
  }
  /** @hidden */
  prewrite(e) {
    const t = e.jsonDoc;
    return this.document.getRoot().listMaterials().forEach((n) => {
      const s = n.getExtension(pe);
      if (s) {
        const r = e.materialIndexMap.get(n), o = t.json.materials[r];
        o.extensions = o.extensions || {}, o.extensions[pe] = {
          dispersion: s.getDispersion()
        };
      }
    }), this;
  }
}
vs.EXTENSION_NAME = pe;
class Fs extends H {
  init() {
    this.extensionName = Te, this.propertyType = "EmissiveStrength", this.parentTypes = [d.MATERIAL];
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      emissiveStrength: 1
    });
  }
  /**********************************************************************************************
   * EmissiveStrength.
   */
  /** EmissiveStrength. */
  getEmissiveStrength() {
    return this.get("emissiveStrength");
  }
  /** EmissiveStrength. */
  setEmissiveStrength(e) {
    return this.set("emissiveStrength", e);
  }
}
Fs.EXTENSION_NAME = Te;
class Us extends k {
  constructor(...e) {
    super(...e), this.extensionName = Te, this.prereadTypes = [d.MESH], this.prewriteTypes = [d.MESH];
  }
  /** Creates a new EmissiveStrength property for use on a {@link Material}. */
  createEmissiveStrength() {
    return new Fs(this.document.getGraph());
  }
  /** @hidden */
  read(e) {
    return this;
  }
  /** @hidden */
  write(e) {
    return this;
  }
  /** @hidden */
  preread(e) {
    return (e.jsonDoc.json.materials || []).forEach((s, r) => {
      if (s.extensions && s.extensions[Te]) {
        const o = this.createEmissiveStrength();
        e.materials[r].setExtension(Te, o);
        const a = s.extensions[Te];
        a.emissiveStrength !== void 0 && o.setEmissiveStrength(a.emissiveStrength);
      }
    }), this;
  }
  /** @hidden */
  prewrite(e) {
    const t = e.jsonDoc;
    return this.document.getRoot().listMaterials().forEach((n) => {
      const s = n.getExtension(Te);
      if (s) {
        const r = e.materialIndexMap.get(n), o = t.json.materials[r];
        o.extensions = o.extensions || {}, o.extensions[Te] = {
          emissiveStrength: s.getEmissiveStrength()
        };
      }
    }), this;
  }
}
Us.EXTENSION_NAME = Te;
class Bs extends H {
  init() {
    this.extensionName = xe, this.propertyType = "IOR", this.parentTypes = [d.MATERIAL];
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      ior: 1.5
    });
  }
  /**********************************************************************************************
   * IOR.
   */
  /** IOR. */
  getIOR() {
    return this.get("ior");
  }
  /** IOR. */
  setIOR(e) {
    return this.set("ior", e);
  }
}
Bs.EXTENSION_NAME = xe;
class Ls extends k {
  constructor(...e) {
    super(...e), this.extensionName = xe, this.prereadTypes = [d.MESH], this.prewriteTypes = [d.MESH];
  }
  /** Creates a new IOR property for use on a {@link Material}. */
  createIOR() {
    return new Bs(this.document.getGraph());
  }
  /** @hidden */
  read(e) {
    return this;
  }
  /** @hidden */
  write(e) {
    return this;
  }
  /** @hidden */
  preread(e) {
    return (e.jsonDoc.json.materials || []).forEach((s, r) => {
      if (s.extensions && s.extensions[xe]) {
        const o = this.createIOR();
        e.materials[r].setExtension(xe, o);
        const a = s.extensions[xe];
        a.ior !== void 0 && o.setIOR(a.ior);
      }
    }), this;
  }
  /** @hidden */
  prewrite(e) {
    const t = e.jsonDoc;
    return this.document.getRoot().listMaterials().forEach((n) => {
      const s = n.getExtension(xe);
      if (s) {
        const r = e.materialIndexMap.get(n), o = t.json.materials[r];
        o.extensions = o.extensions || {}, o.extensions[xe] = {
          ior: s.getIOR()
        };
      }
    }), this;
  }
}
Ls.EXTENSION_NAME = xe;
const {
  R: Vr,
  G: kr
} = ae;
class js extends H {
  init() {
    this.extensionName = me, this.propertyType = "Iridescence", this.parentTypes = [d.MATERIAL];
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      iridescenceFactor: 0,
      iridescenceTexture: null,
      iridescenceTextureInfo: new j(this.graph, "iridescenceTextureInfo"),
      iridescenceIOR: 1.3,
      iridescenceThicknessMinimum: 100,
      iridescenceThicknessMaximum: 400,
      iridescenceThicknessTexture: null,
      iridescenceThicknessTextureInfo: new j(this.graph, "iridescenceThicknessTextureInfo")
    });
  }
  /**********************************************************************************************
   * Iridescence.
   */
  /** Iridescence; linear multiplier. See {@link Iridescence.getIridescenceTexture getIridescenceTexture}. */
  getIridescenceFactor() {
    return this.get("iridescenceFactor");
  }
  /** Iridescence; linear multiplier. See {@link Iridescence.getIridescenceTexture getIridescenceTexture}. */
  setIridescenceFactor(e) {
    return this.set("iridescenceFactor", e);
  }
  /**
   * Iridescence intensity.
   *
   * Only the red (R) channel is used for iridescence intensity, but this texture may optionally
   * be packed with additional data in the other channels.
   */
  getIridescenceTexture() {
    return this.getRef("iridescenceTexture");
  }
  /**
   * Settings affecting the material's use of its iridescence texture. If no texture is attached,
   * {@link TextureInfo} is `null`.
   */
  getIridescenceTextureInfo() {
    return this.getRef("iridescenceTexture") ? this.getRef("iridescenceTextureInfo") : null;
  }
  /** Iridescence intensity. See {@link Iridescence.getIridescenceTexture getIridescenceTexture}. */
  setIridescenceTexture(e) {
    return this.setRef("iridescenceTexture", e, {
      channels: Vr
    });
  }
  /**********************************************************************************************
   * Iridescence IOR.
   */
  /** Index of refraction of the dielectric thin-film layer. */
  getIridescenceIOR() {
    return this.get("iridescenceIOR");
  }
  /** Index of refraction of the dielectric thin-film layer. */
  setIridescenceIOR(e) {
    return this.set("iridescenceIOR", e);
  }
  /**********************************************************************************************
   * Iridescence thickness.
   */
  /** Minimum thickness of the thin-film layer, in nanometers (nm). */
  getIridescenceThicknessMinimum() {
    return this.get("iridescenceThicknessMinimum");
  }
  /** Minimum thickness of the thin-film layer, in nanometers (nm). */
  setIridescenceThicknessMinimum(e) {
    return this.set("iridescenceThicknessMinimum", e);
  }
  /** Maximum thickness of the thin-film layer, in nanometers (nm). */
  getIridescenceThicknessMaximum() {
    return this.get("iridescenceThicknessMaximum");
  }
  /** Maximum thickness of the thin-film layer, in nanometers (nm). */
  setIridescenceThicknessMaximum(e) {
    return this.set("iridescenceThicknessMaximum", e);
  }
  /**
   * The green channel of this texture defines the thickness of the
   * thin-film layer by blending between the minimum and maximum thickness.
   */
  getIridescenceThicknessTexture() {
    return this.getRef("iridescenceThicknessTexture");
  }
  /**
   * Settings affecting the material's use of its iridescence thickness texture.
   * If no texture is attached, {@link TextureInfo} is `null`.
   */
  getIridescenceThicknessTextureInfo() {
    return this.getRef("iridescenceThicknessTexture") ? this.getRef("iridescenceThicknessTextureInfo") : null;
  }
  /**
   * Sets iridescence thickness texture.
   * See {@link Iridescence.getIridescenceThicknessTexture getIridescenceThicknessTexture}.
   */
  setIridescenceThicknessTexture(e) {
    return this.setRef("iridescenceThicknessTexture", e, {
      channels: kr
    });
  }
}
js.EXTENSION_NAME = me;
class Ps extends k {
  constructor(...e) {
    super(...e), this.extensionName = me, this.prereadTypes = [d.MESH], this.prewriteTypes = [d.MESH];
  }
  /** Creates a new Iridescence property for use on a {@link Material}. */
  createIridescence() {
    return new js(this.document.getGraph());
  }
  /** @hidden */
  read(e) {
    return this;
  }
  /** @hidden */
  write(e) {
    return this;
  }
  /** @hidden */
  preread(e) {
    const t = e.jsonDoc, n = t.json.materials || [], s = t.json.textures || [];
    return n.forEach((r, o) => {
      if (r.extensions && r.extensions[me]) {
        const a = this.createIridescence();
        e.materials[o].setExtension(me, a);
        const c = r.extensions[me];
        if (c.iridescenceFactor !== void 0 && a.setIridescenceFactor(c.iridescenceFactor), c.iridescenceIor !== void 0 && a.setIridescenceIOR(c.iridescenceIor), c.iridescenceThicknessMinimum !== void 0 && a.setIridescenceThicknessMinimum(c.iridescenceThicknessMinimum), c.iridescenceThicknessMaximum !== void 0 && a.setIridescenceThicknessMaximum(c.iridescenceThicknessMaximum), c.iridescenceTexture !== void 0) {
          const u = c.iridescenceTexture, h = e.textures[s[u.index].source];
          a.setIridescenceTexture(h), e.setTextureInfo(a.getIridescenceTextureInfo(), u);
        }
        if (c.iridescenceThicknessTexture !== void 0) {
          const u = c.iridescenceThicknessTexture, h = e.textures[s[u.index].source];
          a.setIridescenceThicknessTexture(h), e.setTextureInfo(a.getIridescenceThicknessTextureInfo(), u);
        }
      }
    }), this;
  }
  /** @hidden */
  prewrite(e) {
    const t = e.jsonDoc;
    return this.document.getRoot().listMaterials().forEach((n) => {
      const s = n.getExtension(me);
      if (s) {
        const r = e.materialIndexMap.get(n), o = t.json.materials[r];
        o.extensions = o.extensions || {};
        const a = o.extensions[me] = {};
        if (s.getIridescenceFactor() > 0 && (a.iridescenceFactor = s.getIridescenceFactor()), s.getIridescenceIOR() !== 1.3 && (a.iridescenceIor = s.getIridescenceIOR()), s.getIridescenceThicknessMinimum() !== 100 && (a.iridescenceThicknessMinimum = s.getIridescenceThicknessMinimum()), s.getIridescenceThicknessMaximum() !== 400 && (a.iridescenceThicknessMaximum = s.getIridescenceThicknessMaximum()), s.getIridescenceTexture()) {
          const c = s.getIridescenceTexture(), u = s.getIridescenceTextureInfo();
          a.iridescenceTexture = e.createTextureInfoDef(c, u);
        }
        if (s.getIridescenceThicknessTexture()) {
          const c = s.getIridescenceThicknessTexture(), u = s.getIridescenceThicknessTextureInfo();
          a.iridescenceThicknessTexture = e.createTextureInfoDef(c, u);
        }
      }
    }), this;
  }
}
Ps.EXTENSION_NAME = me;
const {
  R: Qt,
  G: Zt,
  B: es,
  A: ts
} = ae;
class Vs extends H {
  init() {
    this.extensionName = Ee, this.propertyType = "PBRSpecularGlossiness", this.parentTypes = [d.MATERIAL];
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      diffuseFactor: [1, 1, 1, 1],
      diffuseTexture: null,
      diffuseTextureInfo: new j(this.graph, "diffuseTextureInfo"),
      specularFactor: [1, 1, 1],
      glossinessFactor: 1,
      specularGlossinessTexture: null,
      specularGlossinessTextureInfo: new j(this.graph, "specularGlossinessTextureInfo")
    });
  }
  /**********************************************************************************************
   * Diffuse.
   */
  /** Diffuse; Linear-sRGB components. See {@link PBRSpecularGlossiness.getDiffuseTexture getDiffuseTexture}. */
  getDiffuseFactor() {
    return this.get("diffuseFactor");
  }
  /** Diffuse; Linear-sRGB components. See {@link PBRSpecularGlossiness.getDiffuseTexture getDiffuseTexture}. */
  setDiffuseFactor(e) {
    return this.set("diffuseFactor", e);
  }
  /**
   * Diffuse texture; sRGB. Alternative to baseColorTexture, used within the
   * spec/gloss PBR workflow.
   */
  getDiffuseTexture() {
    return this.getRef("diffuseTexture");
  }
  /**
   * Settings affecting the material's use of its diffuse texture. If no texture is attached,
   * {@link TextureInfo} is `null`.
   */
  getDiffuseTextureInfo() {
    return this.getRef("diffuseTexture") ? this.getRef("diffuseTextureInfo") : null;
  }
  /** Sets diffuse texture. See {@link PBRSpecularGlossiness.getDiffuseTexture getDiffuseTexture}. */
  setDiffuseTexture(e) {
    return this.setRef("diffuseTexture", e, {
      channels: Qt | Zt | es | ts,
      isColor: !0
    });
  }
  /**********************************************************************************************
   * Specular.
   */
  /** Specular; linear multiplier. */
  getSpecularFactor() {
    return this.get("specularFactor");
  }
  /** Specular; linear multiplier. */
  setSpecularFactor(e) {
    return this.set("specularFactor", e);
  }
  /**********************************************************************************************
   * Glossiness.
   */
  /** Glossiness; linear multiplier. */
  getGlossinessFactor() {
    return this.get("glossinessFactor");
  }
  /** Glossiness; linear multiplier. */
  setGlossinessFactor(e) {
    return this.set("glossinessFactor", e);
  }
  /**********************************************************************************************
   * Specular/Glossiness.
   */
  /** Spec/gloss texture; linear multiplier. */
  getSpecularGlossinessTexture() {
    return this.getRef("specularGlossinessTexture");
  }
  /**
   * Settings affecting the material's use of its spec/gloss texture. If no texture is attached,
   * {@link TextureInfo} is `null`.
   */
  getSpecularGlossinessTextureInfo() {
    return this.getRef("specularGlossinessTexture") ? this.getRef("specularGlossinessTextureInfo") : null;
  }
  /** Spec/gloss texture; linear multiplier. */
  setSpecularGlossinessTexture(e) {
    return this.setRef("specularGlossinessTexture", e, {
      channels: Qt | Zt | es | ts
    });
  }
}
Vs.EXTENSION_NAME = Ee;
class ks extends k {
  constructor(...e) {
    super(...e), this.extensionName = Ee, this.prereadTypes = [d.MESH], this.prewriteTypes = [d.MESH];
  }
  /** Creates a new PBRSpecularGlossiness property for use on a {@link Material}. */
  createPBRSpecularGlossiness() {
    return new Vs(this.document.getGraph());
  }
  /** @hidden */
  read(e) {
    return this;
  }
  /** @hidden */
  write(e) {
    return this;
  }
  /** @hidden */
  preread(e) {
    const t = e.jsonDoc, n = t.json.materials || [], s = t.json.textures || [];
    return n.forEach((r, o) => {
      if (r.extensions && r.extensions[Ee]) {
        const a = this.createPBRSpecularGlossiness();
        e.materials[o].setExtension(Ee, a);
        const c = r.extensions[Ee];
        if (c.diffuseFactor !== void 0 && a.setDiffuseFactor(c.diffuseFactor), c.specularFactor !== void 0 && a.setSpecularFactor(c.specularFactor), c.glossinessFactor !== void 0 && a.setGlossinessFactor(c.glossinessFactor), c.diffuseTexture !== void 0) {
          const u = c.diffuseTexture, h = e.textures[s[u.index].source];
          a.setDiffuseTexture(h), e.setTextureInfo(a.getDiffuseTextureInfo(), u);
        }
        if (c.specularGlossinessTexture !== void 0) {
          const u = c.specularGlossinessTexture, h = e.textures[s[u.index].source];
          a.setSpecularGlossinessTexture(h), e.setTextureInfo(a.getSpecularGlossinessTextureInfo(), u);
        }
      }
    }), this;
  }
  /** @hidden */
  prewrite(e) {
    const t = e.jsonDoc;
    return this.document.getRoot().listMaterials().forEach((n) => {
      const s = n.getExtension(Ee);
      if (s) {
        const r = e.materialIndexMap.get(n), o = t.json.materials[r];
        o.extensions = o.extensions || {};
        const a = o.extensions[Ee] = {
          diffuseFactor: s.getDiffuseFactor(),
          specularFactor: s.getSpecularFactor(),
          glossinessFactor: s.getGlossinessFactor()
        };
        if (s.getDiffuseTexture()) {
          const c = s.getDiffuseTexture(), u = s.getDiffuseTextureInfo();
          a.diffuseTexture = e.createTextureInfoDef(c, u);
        }
        if (s.getSpecularGlossinessTexture()) {
          const c = s.getSpecularGlossinessTexture(), u = s.getSpecularGlossinessTextureInfo();
          a.specularGlossinessTexture = e.createTextureInfoDef(c, u);
        }
      }
    }), this;
  }
}
ks.EXTENSION_NAME = Ee;
const {
  R: Gr,
  G: Hr,
  B: zr,
  A: Xr
} = ae;
class Gs extends H {
  init() {
    this.extensionName = Re, this.propertyType = "Sheen", this.parentTypes = [d.MATERIAL];
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      sheenColorFactor: [0, 0, 0],
      sheenColorTexture: null,
      sheenColorTextureInfo: new j(this.graph, "sheenColorTextureInfo"),
      sheenRoughnessFactor: 0,
      sheenRoughnessTexture: null,
      sheenRoughnessTextureInfo: new j(this.graph, "sheenRoughnessTextureInfo")
    });
  }
  /**********************************************************************************************
   * Sheen color.
   */
  /** Sheen; linear multiplier. */
  getSheenColorFactor() {
    return this.get("sheenColorFactor");
  }
  /** Sheen; linear multiplier. */
  setSheenColorFactor(e) {
    return this.set("sheenColorFactor", e);
  }
  /**
   * Sheen color texture, in sRGB colorspace.
   */
  getSheenColorTexture() {
    return this.getRef("sheenColorTexture");
  }
  /**
   * Settings affecting the material's use of its sheen color texture. If no texture is attached,
   * {@link TextureInfo} is `null`.
   */
  getSheenColorTextureInfo() {
    return this.getRef("sheenColorTexture") ? this.getRef("sheenColorTextureInfo") : null;
  }
  /** Sets sheen color texture. See {@link Sheen.getSheenColorTexture getSheenColorTexture}. */
  setSheenColorTexture(e) {
    return this.setRef("sheenColorTexture", e, {
      channels: Gr | Hr | zr,
      isColor: !0
    });
  }
  /**********************************************************************************************
   * Sheen roughness.
   */
  /** Sheen roughness; linear multiplier. See {@link Sheen.getSheenRoughnessTexture getSheenRoughnessTexture}. */
  getSheenRoughnessFactor() {
    return this.get("sheenRoughnessFactor");
  }
  /** Sheen roughness; linear multiplier. See {@link Sheen.getSheenRoughnessTexture getSheenRoughnessTexture}. */
  setSheenRoughnessFactor(e) {
    return this.set("sheenRoughnessFactor", e);
  }
  /**
   * Sheen roughness texture; linear multiplier. The `a` channel of this texture specifies
   * roughness, independent of the base layer's roughness.
   */
  getSheenRoughnessTexture() {
    return this.getRef("sheenRoughnessTexture");
  }
  /**
   * Settings affecting the material's use of its sheen roughness texture. If no texture is
   * attached, {@link TextureInfo} is `null`.
   */
  getSheenRoughnessTextureInfo() {
    return this.getRef("sheenRoughnessTexture") ? this.getRef("sheenRoughnessTextureInfo") : null;
  }
  /**
   * Sets sheen roughness texture.  The `a` channel of this texture specifies
   * roughness, independent of the base layer's roughness.
   */
  setSheenRoughnessTexture(e) {
    return this.setRef("sheenRoughnessTexture", e, {
      channels: Xr
    });
  }
}
Gs.EXTENSION_NAME = Re;
class Hs extends k {
  constructor(...e) {
    super(...e), this.extensionName = Re, this.prereadTypes = [d.MESH], this.prewriteTypes = [d.MESH];
  }
  /** Creates a new Sheen property for use on a {@link Material}. */
  createSheen() {
    return new Gs(this.document.getGraph());
  }
  /** @hidden */
  read(e) {
    return this;
  }
  /** @hidden */
  write(e) {
    return this;
  }
  /** @hidden */
  preread(e) {
    const t = e.jsonDoc, n = t.json.materials || [], s = t.json.textures || [];
    return n.forEach((r, o) => {
      if (r.extensions && r.extensions[Re]) {
        const a = this.createSheen();
        e.materials[o].setExtension(Re, a);
        const c = r.extensions[Re];
        if (c.sheenColorFactor !== void 0 && a.setSheenColorFactor(c.sheenColorFactor), c.sheenRoughnessFactor !== void 0 && a.setSheenRoughnessFactor(c.sheenRoughnessFactor), c.sheenColorTexture !== void 0) {
          const u = c.sheenColorTexture, h = e.textures[s[u.index].source];
          a.setSheenColorTexture(h), e.setTextureInfo(a.getSheenColorTextureInfo(), u);
        }
        if (c.sheenRoughnessTexture !== void 0) {
          const u = c.sheenRoughnessTexture, h = e.textures[s[u.index].source];
          a.setSheenRoughnessTexture(h), e.setTextureInfo(a.getSheenRoughnessTextureInfo(), u);
        }
      }
    }), this;
  }
  /** @hidden */
  prewrite(e) {
    const t = e.jsonDoc;
    return this.document.getRoot().listMaterials().forEach((n) => {
      const s = n.getExtension(Re);
      if (s) {
        const r = e.materialIndexMap.get(n), o = t.json.materials[r];
        o.extensions = o.extensions || {};
        const a = o.extensions[Re] = {
          sheenColorFactor: s.getSheenColorFactor(),
          sheenRoughnessFactor: s.getSheenRoughnessFactor()
        };
        if (s.getSheenColorTexture()) {
          const c = s.getSheenColorTexture(), u = s.getSheenColorTextureInfo();
          a.sheenColorTexture = e.createTextureInfoDef(c, u);
        }
        if (s.getSheenRoughnessTexture()) {
          const c = s.getSheenRoughnessTexture(), u = s.getSheenRoughnessTextureInfo();
          a.sheenRoughnessTexture = e.createTextureInfoDef(c, u);
        }
      }
    }), this;
  }
}
Hs.EXTENSION_NAME = Re;
const {
  R: Kr,
  G: $r,
  B: Yr,
  A: qr
} = ae;
class zs extends H {
  init() {
    this.extensionName = ye, this.propertyType = "Specular", this.parentTypes = [d.MATERIAL];
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      specularFactor: 1,
      specularTexture: null,
      specularTextureInfo: new j(this.graph, "specularTextureInfo"),
      specularColorFactor: [1, 1, 1],
      specularColorTexture: null,
      specularColorTextureInfo: new j(this.graph, "specularColorTextureInfo")
    });
  }
  /**********************************************************************************************
   * Specular.
   */
  /** Specular; linear multiplier. See {@link Specular.getSpecularTexture getSpecularTexture}. */
  getSpecularFactor() {
    return this.get("specularFactor");
  }
  /** Specular; linear multiplier. See {@link Specular.getSpecularTexture getSpecularTexture}. */
  setSpecularFactor(e) {
    return this.set("specularFactor", e);
  }
  /** Specular color; Linear-sRGB components. See {@link Specular.getSpecularTexture getSpecularTexture}. */
  getSpecularColorFactor() {
    return this.get("specularColorFactor");
  }
  /** Specular color; Linear-sRGB components. See {@link Specular.getSpecularTexture getSpecularTexture}. */
  setSpecularColorFactor(e) {
    return this.set("specularColorFactor", e);
  }
  /**
   * Specular texture; linear multiplier. Configures the strength of the specular reflection in
   * the dielectric BRDF. A value of zero disables the specular reflection, resulting in a pure
   * diffuse material.
   *
   * Only the alpha (A) channel is used for specular strength, but this texture may optionally
   * be packed with specular color (RGB) into a single texture.
   */
  getSpecularTexture() {
    return this.getRef("specularTexture");
  }
  /**
   * Settings affecting the material's use of its specular texture. If no texture is attached,
   * {@link TextureInfo} is `null`.
   */
  getSpecularTextureInfo() {
    return this.getRef("specularTexture") ? this.getRef("specularTextureInfo") : null;
  }
  /** Sets specular texture. See {@link Specular.getSpecularTexture getSpecularTexture}. */
  setSpecularTexture(e) {
    return this.setRef("specularTexture", e, {
      channels: qr
    });
  }
  /**
   * Specular color texture; linear multiplier. Defines the F0 color of the specular reflection
   * (RGB channels, encoded in sRGB) in the the dielectric BRDF.
   *
   * Only RGB channels are used here, but this texture may optionally be packed with a specular
   * factor (A) into a single texture.
   */
  getSpecularColorTexture() {
    return this.getRef("specularColorTexture");
  }
  /**
   * Settings affecting the material's use of its specular color texture. If no texture is
   * attached, {@link TextureInfo} is `null`.
   */
  getSpecularColorTextureInfo() {
    return this.getRef("specularColorTexture") ? this.getRef("specularColorTextureInfo") : null;
  }
  /** Sets specular color texture. See {@link Specular.getSpecularColorTexture getSpecularColorTexture}. */
  setSpecularColorTexture(e) {
    return this.setRef("specularColorTexture", e, {
      channels: Kr | $r | Yr,
      isColor: !0
    });
  }
}
zs.EXTENSION_NAME = ye;
class Xs extends k {
  constructor(...e) {
    super(...e), this.extensionName = ye, this.prereadTypes = [d.MESH], this.prewriteTypes = [d.MESH];
  }
  /** Creates a new Specular property for use on a {@link Material}. */
  createSpecular() {
    return new zs(this.document.getGraph());
  }
  /** @hidden */
  read(e) {
    return this;
  }
  /** @hidden */
  write(e) {
    return this;
  }
  /** @hidden */
  preread(e) {
    const t = e.jsonDoc, n = t.json.materials || [], s = t.json.textures || [];
    return n.forEach((r, o) => {
      if (r.extensions && r.extensions[ye]) {
        const a = this.createSpecular();
        e.materials[o].setExtension(ye, a);
        const c = r.extensions[ye];
        if (c.specularFactor !== void 0 && a.setSpecularFactor(c.specularFactor), c.specularColorFactor !== void 0 && a.setSpecularColorFactor(c.specularColorFactor), c.specularTexture !== void 0) {
          const u = c.specularTexture, h = e.textures[s[u.index].source];
          a.setSpecularTexture(h), e.setTextureInfo(a.getSpecularTextureInfo(), u);
        }
        if (c.specularColorTexture !== void 0) {
          const u = c.specularColorTexture, h = e.textures[s[u.index].source];
          a.setSpecularColorTexture(h), e.setTextureInfo(a.getSpecularColorTextureInfo(), u);
        }
      }
    }), this;
  }
  /** @hidden */
  prewrite(e) {
    const t = e.jsonDoc;
    return this.document.getRoot().listMaterials().forEach((n) => {
      const s = n.getExtension(ye);
      if (s) {
        const r = e.materialIndexMap.get(n), o = t.json.materials[r];
        o.extensions = o.extensions || {};
        const a = o.extensions[ye] = {};
        if (s.getSpecularFactor() !== 1 && (a.specularFactor = s.getSpecularFactor()), L.eq(s.getSpecularColorFactor(), [1, 1, 1]) || (a.specularColorFactor = s.getSpecularColorFactor()), s.getSpecularTexture()) {
          const c = s.getSpecularTexture(), u = s.getSpecularTextureInfo();
          a.specularTexture = e.createTextureInfoDef(c, u);
        }
        if (s.getSpecularColorTexture()) {
          const c = s.getSpecularColorTexture(), u = s.getSpecularColorTextureInfo();
          a.specularColorTexture = e.createTextureInfoDef(c, u);
        }
      }
    }), this;
  }
}
Xs.EXTENSION_NAME = ye;
const {
  R: Wr
} = ae;
class Ks extends H {
  init() {
    this.extensionName = Ie, this.propertyType = "Transmission", this.parentTypes = [d.MATERIAL];
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      transmissionFactor: 0,
      transmissionTexture: null,
      transmissionTextureInfo: new j(this.graph, "transmissionTextureInfo")
    });
  }
  /**********************************************************************************************
   * Transmission.
   */
  /** Transmission; linear multiplier. See {@link Transmission.getTransmissionTexture getTransmissionTexture}. */
  getTransmissionFactor() {
    return this.get("transmissionFactor");
  }
  /** Transmission; linear multiplier. See {@link Transmission.getTransmissionTexture getTransmissionTexture}. */
  setTransmissionFactor(e) {
    return this.set("transmissionFactor", e);
  }
  /**
   * Transmission texture; linear multiplier. The `r` channel of this texture specifies
   * transmission [0-1] of the material's surface. By default this is a thin transparency
   * effect, but volume effects (refraction, subsurface scattering) may be introduced with the
   * addition of the `KHR_materials_volume` extension.
   */
  getTransmissionTexture() {
    return this.getRef("transmissionTexture");
  }
  /**
   * Settings affecting the material's use of its transmission texture. If no texture is attached,
   * {@link TextureInfo} is `null`.
   */
  getTransmissionTextureInfo() {
    return this.getRef("transmissionTexture") ? this.getRef("transmissionTextureInfo") : null;
  }
  /** Sets transmission texture. See {@link Transmission.getTransmissionTexture getTransmissionTexture}. */
  setTransmissionTexture(e) {
    return this.setRef("transmissionTexture", e, {
      channels: Wr
    });
  }
}
Ks.EXTENSION_NAME = Ie;
class $s extends k {
  constructor(...e) {
    super(...e), this.extensionName = Ie, this.prereadTypes = [d.MESH], this.prewriteTypes = [d.MESH];
  }
  /** Creates a new Transmission property for use on a {@link Material}. */
  createTransmission() {
    return new Ks(this.document.getGraph());
  }
  /** @hidden */
  read(e) {
    return this;
  }
  /** @hidden */
  write(e) {
    return this;
  }
  /** @hidden */
  preread(e) {
    const t = e.jsonDoc, n = t.json.materials || [], s = t.json.textures || [];
    return n.forEach((r, o) => {
      if (r.extensions && r.extensions[Ie]) {
        const a = this.createTransmission();
        e.materials[o].setExtension(Ie, a);
        const c = r.extensions[Ie];
        if (c.transmissionFactor !== void 0 && a.setTransmissionFactor(c.transmissionFactor), c.transmissionTexture !== void 0) {
          const u = c.transmissionTexture, h = e.textures[s[u.index].source];
          a.setTransmissionTexture(h), e.setTextureInfo(a.getTransmissionTextureInfo(), u);
        }
      }
    }), this;
  }
  /** @hidden */
  prewrite(e) {
    const t = e.jsonDoc;
    return this.document.getRoot().listMaterials().forEach((n) => {
      const s = n.getExtension(Ie);
      if (s) {
        const r = e.materialIndexMap.get(n), o = t.json.materials[r];
        o.extensions = o.extensions || {};
        const a = o.extensions[Ie] = {
          transmissionFactor: s.getTransmissionFactor()
        };
        if (s.getTransmissionTexture()) {
          const c = s.getTransmissionTexture(), u = s.getTransmissionTextureInfo();
          a.transmissionTexture = e.createTextureInfoDef(c, u);
        }
      }
    }), this;
  }
}
$s.EXTENSION_NAME = Ie;
class Ys extends H {
  init() {
    this.extensionName = be, this.propertyType = "Unlit", this.parentTypes = [d.MATERIAL];
  }
}
Ys.EXTENSION_NAME = be;
class qs extends k {
  constructor(...e) {
    super(...e), this.extensionName = be, this.prereadTypes = [d.MESH], this.prewriteTypes = [d.MESH];
  }
  /** Creates a new Unlit property for use on a {@link Material}. */
  createUnlit() {
    return new Ys(this.document.getGraph());
  }
  /** @hidden */
  read(e) {
    return this;
  }
  /** @hidden */
  write(e) {
    return this;
  }
  /** @hidden */
  preread(e) {
    return (e.jsonDoc.json.materials || []).forEach((n, s) => {
      n.extensions && n.extensions[be] && e.materials[s].setExtension(be, this.createUnlit());
    }), this;
  }
  /** @hidden */
  prewrite(e) {
    const t = e.jsonDoc;
    return this.document.getRoot().listMaterials().forEach((n) => {
      if (n.getExtension(be)) {
        const s = e.materialIndexMap.get(n), r = t.json.materials[s];
        r.extensions = r.extensions || {}, r.extensions[be] = {};
      }
    }), this;
  }
}
qs.EXTENSION_NAME = be;
class Ws extends H {
  init() {
    this.extensionName = Y, this.propertyType = "Mapping", this.parentTypes = ["MappingList"];
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      material: null,
      variants: new V()
    });
  }
  /** The {@link Material} designated for this {@link Primitive}, under the given variants. */
  getMaterial() {
    return this.getRef("material");
  }
  /** The {@link Material} designated for this {@link Primitive}, under the given variants. */
  setMaterial(e) {
    return this.setRef("material", e);
  }
  /** Adds a {@link Variant} to this mapping. */
  addVariant(e) {
    return this.addRef("variants", e);
  }
  /** Removes a {@link Variant} from this mapping. */
  removeVariant(e) {
    return this.removeRef("variants", e);
  }
  /** Lists {@link Variant}s in this mapping. */
  listVariants() {
    return this.listRefs("variants");
  }
}
Ws.EXTENSION_NAME = Y;
class Js extends H {
  init() {
    this.extensionName = Y, this.propertyType = "MappingList", this.parentTypes = [d.PRIMITIVE];
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      mappings: new V()
    });
  }
  /** Adds a {@link Mapping} to this mapping. */
  addMapping(e) {
    return this.addRef("mappings", e);
  }
  /** Removes a {@link Mapping} from the list for this {@link Primitive}. */
  removeMapping(e) {
    return this.removeRef("mappings", e);
  }
  /** Lists {@link Mapping}s in this {@link Primitive}. */
  listMappings() {
    return this.listRefs("mappings");
  }
}
Js.EXTENSION_NAME = Y;
class _t extends H {
  init() {
    this.extensionName = Y, this.propertyType = "Variant", this.parentTypes = ["MappingList"];
  }
}
_t.EXTENSION_NAME = Y;
class Qs extends k {
  constructor(...e) {
    super(...e), this.extensionName = Y;
  }
  /** Creates a new MappingList property. */
  createMappingList() {
    return new Js(this.document.getGraph());
  }
  /** Creates a new Variant property. */
  createVariant(e = "") {
    return new _t(this.document.getGraph(), e);
  }
  /** Creates a new Mapping property. */
  createMapping() {
    return new Ws(this.document.getGraph());
  }
  /** Lists all Variants on the current Document. */
  listVariants() {
    return Array.from(this.properties).filter((e) => e instanceof _t);
  }
  /** @hidden */
  read(e) {
    const t = e.jsonDoc;
    if (!t.json.extensions || !t.json.extensions[Y]) return this;
    const r = (t.json.extensions[Y].variants || []).map((a) => this.createVariant().setName(a.name || ""));
    return (t.json.meshes || []).forEach((a, c) => {
      const u = e.meshes[c];
      (a.primitives || []).forEach((g, m) => {
        if (!g.extensions || !g.extensions[Y])
          return;
        const x = this.createMappingList(), A = g.extensions[Y];
        for (const b of A.mappings) {
          const _ = this.createMapping();
          b.material !== void 0 && _.setMaterial(e.materials[b.material]);
          for (const l of b.variants || [])
            _.addVariant(r[l]);
          x.addMapping(_);
        }
        u.listPrimitives()[m].setExtension(Y, x);
      });
    }), this;
  }
  /** @hidden */
  write(e) {
    const t = e.jsonDoc, n = this.listVariants();
    if (!n.length) return this;
    const s = [], r = /* @__PURE__ */ new Map();
    for (const o of n)
      r.set(o, s.length), s.push(e.createPropertyDef(o));
    for (const o of this.document.getRoot().listMeshes()) {
      const a = e.meshIndexMap.get(o);
      o.listPrimitives().forEach((c, u) => {
        const h = c.getExtension(Y);
        if (!h) return;
        const g = e.jsonDoc.json.meshes[a].primitives[u], m = h.listMappings().map((x) => {
          const A = e.createPropertyDef(x), b = x.getMaterial();
          return b && (A.material = e.materialIndexMap.get(b)), A.variants = x.listVariants().map((_) => r.get(_)), A;
        });
        g.extensions = g.extensions || {}, g.extensions[Y] = {
          mappings: m
        };
      });
    }
    return t.json.extensions = t.json.extensions || {}, t.json.extensions[Y] = {
      variants: s
    }, this;
  }
}
Qs.EXTENSION_NAME = Y;
const {
  G: Jr
} = ae;
class Zs extends H {
  init() {
    this.extensionName = Ne, this.propertyType = "Volume", this.parentTypes = [d.MATERIAL];
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      thicknessFactor: 0,
      thicknessTexture: null,
      thicknessTextureInfo: new j(this.graph, "thicknessTexture"),
      attenuationDistance: 1 / 0,
      attenuationColor: [1, 1, 1]
    });
  }
  /**********************************************************************************************
   * Thickness.
   */
  /**
   * Thickness of the volume beneath the surface in meters in the local coordinate system of the
   * node. If the value is 0 the material is thin-walled. Otherwise the material is a volume
   * boundary. The doubleSided property has no effect on volume boundaries.
   */
  getThicknessFactor() {
    return this.get("thicknessFactor");
  }
  /**
   * Thickness of the volume beneath the surface in meters in the local coordinate system of the
   * node. If the value is 0 the material is thin-walled. Otherwise the material is a volume
   * boundary. The doubleSided property has no effect on volume boundaries.
   */
  setThicknessFactor(e) {
    return this.set("thicknessFactor", e);
  }
  /**
   * Texture that defines the thickness, stored in the G channel. This will be multiplied by
   * thicknessFactor.
   */
  getThicknessTexture() {
    return this.getRef("thicknessTexture");
  }
  /**
   * Settings affecting the material's use of its thickness texture. If no texture is attached,
   * {@link TextureInfo} is `null`.
   */
  getThicknessTextureInfo() {
    return this.getRef("thicknessTexture") ? this.getRef("thicknessTextureInfo") : null;
  }
  /**
   * Texture that defines the thickness, stored in the G channel. This will be multiplied by
   * thicknessFactor.
   */
  setThicknessTexture(e) {
    return this.setRef("thicknessTexture", e, {
      channels: Jr
    });
  }
  /**********************************************************************************************
   * Attenuation.
   */
  /**
   * Density of the medium given as the average distance in meters that light travels in the
   * medium before interacting with a particle.
   */
  getAttenuationDistance() {
    return this.get("attenuationDistance");
  }
  /**
   * Density of the medium given as the average distance in meters that light travels in the
   * medium before interacting with a particle.
   */
  setAttenuationDistance(e) {
    return this.set("attenuationDistance", e);
  }
  /**
   * Color (linear) that white light turns into due to absorption when reaching the attenuation
   * distance.
   */
  getAttenuationColor() {
    return this.get("attenuationColor");
  }
  /**
   * Color (linear) that white light turns into due to absorption when reaching the attenuation
   * distance.
   */
  setAttenuationColor(e) {
    return this.set("attenuationColor", e);
  }
}
Zs.EXTENSION_NAME = Ne;
class en extends k {
  constructor(...e) {
    super(...e), this.extensionName = Ne, this.prereadTypes = [d.MESH], this.prewriteTypes = [d.MESH];
  }
  /** Creates a new Volume property for use on a {@link Material}. */
  createVolume() {
    return new Zs(this.document.getGraph());
  }
  /** @hidden */
  read(e) {
    return this;
  }
  /** @hidden */
  write(e) {
    return this;
  }
  /** @hidden */
  preread(e) {
    const t = e.jsonDoc, n = t.json.materials || [], s = t.json.textures || [];
    return n.forEach((r, o) => {
      if (r.extensions && r.extensions[Ne]) {
        const a = this.createVolume();
        e.materials[o].setExtension(Ne, a);
        const c = r.extensions[Ne];
        if (c.thicknessFactor !== void 0 && a.setThicknessFactor(c.thicknessFactor), c.attenuationDistance !== void 0 && a.setAttenuationDistance(c.attenuationDistance), c.attenuationColor !== void 0 && a.setAttenuationColor(c.attenuationColor), c.thicknessTexture !== void 0) {
          const u = c.thicknessTexture, h = e.textures[s[u.index].source];
          a.setThicknessTexture(h), e.setTextureInfo(a.getThicknessTextureInfo(), u);
        }
      }
    }), this;
  }
  /** @hidden */
  prewrite(e) {
    const t = e.jsonDoc;
    return this.document.getRoot().listMaterials().forEach((n) => {
      const s = n.getExtension(Ne);
      if (s) {
        const r = e.materialIndexMap.get(n), o = t.json.materials[r];
        o.extensions = o.extensions || {};
        const a = o.extensions[Ne] = {};
        if (s.getThicknessFactor() > 0 && (a.thicknessFactor = s.getThicknessFactor()), Number.isFinite(s.getAttenuationDistance()) && (a.attenuationDistance = s.getAttenuationDistance()), L.eq(s.getAttenuationColor(), [1, 1, 1]) || (a.attenuationColor = s.getAttenuationColor()), s.getThicknessTexture()) {
          const c = s.getThicknessTexture(), u = s.getThicknessTextureInfo();
          a.thicknessTexture = e.createTextureInfoDef(c, u);
        }
      }
    }), this;
  }
}
en.EXTENSION_NAME = Ne;
class tn extends k {
  constructor(...e) {
    super(...e), this.extensionName = Ts;
  }
  /** @hidden */
  read(e) {
    return this;
  }
  /** @hidden */
  write(e) {
    return this;
  }
}
tn.EXTENSION_NAME = Ts;
class sn extends H {
  init() {
    this.extensionName = Se, this.propertyType = "Visibility", this.parentTypes = [d.NODE];
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      visible: !0
    });
  }
  /** Visibility of node and descendants. */
  getVisible() {
    return this.get("visible");
  }
  /** Visibility of node and descendants. */
  setVisible(e) {
    return this.set("visible", e);
  }
}
sn.EXTENSION_NAME = Se;
class nn extends k {
  constructor(...e) {
    super(...e), this.extensionName = Se;
  }
  /** Creates a new Visibility property for use on a {@link Node}. */
  createVisibility() {
    return new sn(this.document.getGraph());
  }
  /** @hidden */
  read(e) {
    return (e.jsonDoc.json.nodes || []).forEach((s, r) => {
      if (s.extensions && s.extensions[Se]) {
        const o = this.createVisibility();
        e.nodes[r].setExtension(Se, o);
        const a = s.extensions[Se];
        a.visible !== void 0 && o.setVisible(a.visible);
      }
    }), this;
  }
  /** @hidden */
  write(e) {
    const t = e.jsonDoc;
    for (const n of this.document.getRoot().listNodes()) {
      const s = n.getExtension(Se);
      if (!s) continue;
      const r = e.nodeIndexMap.get(n), o = t.json.nodes[r];
      o.extensions = o.extensions || {}, o.extensions[Se] = {
        visible: s.getVisible()
      };
    }
    return this;
  }
}
nn.EXTENSION_NAME = Se;
class Qr {
  match(e) {
    return e[0] === 171 && e[1] === 75 && e[2] === 84 && e[3] === 88 && e[4] === 32 && e[5] === 50 && e[6] === 48 && e[7] === 187 && e[8] === 13 && e[9] === 10 && e[10] === 26 && e[11] === 10;
  }
  getSize(e) {
    const t = Tt(e);
    return [t.pixelWidth, t.pixelHeight];
  }
  getChannels(e) {
    const n = Tt(e).dataFormatDescriptor[0];
    if (n.colorModel === rr)
      return n.samples.length === 2 && (n.samples[1].channelType & 15) === 15 ? 4 : 3;
    if (n.colorModel === ir)
      return (n.samples[0].channelType & 15) === 3 ? 4 : 3;
    throw new Error(`Unexpected KTX2 colorModel, "${n.colorModel}".`);
  }
  getVRAMByteLength(e) {
    const t = Tt(e), n = this.getChannels(e) > 3;
    let s = 0;
    for (let r = 0; r < t.levels.length; r++) {
      const o = t.levels[r];
      if (o.uncompressedByteLength)
        s += o.uncompressedByteLength;
      else {
        const a = Math.max(1, Math.floor(t.pixelWidth / Math.pow(2, r))), c = Math.max(1, Math.floor(t.pixelHeight / Math.pow(2, r))), u = n ? 16 : 8;
        s += a / 4 * (c / 4) * u;
      }
    }
    return s;
  }
}
class rn extends k {
  constructor(...e) {
    super(...e), this.extensionName = qe, this.prereadTypes = [d.TEXTURE];
  }
  /** @hidden */
  static register() {
    ue.registerFormat("image/ktx2", new Qr());
  }
  /** @hidden */
  preread(e) {
    return e.jsonDoc.json.textures && e.jsonDoc.json.textures.forEach((t) => {
      if (t.extensions && t.extensions[qe]) {
        const n = t.extensions[qe];
        t.source = n.source;
      }
    }), this;
  }
  /** @hidden */
  read(e) {
    return this;
  }
  /** @hidden */
  write(e) {
    const t = e.jsonDoc;
    return this.document.getRoot().listTextures().forEach((n) => {
      if (n.getMimeType() === "image/ktx2") {
        const s = e.imageIndexMap.get(n);
        t.json.textures.forEach((r) => {
          r.source === s && (r.extensions = r.extensions || {}, r.extensions[qe] = {
            source: r.source
          }, delete r.source);
        });
      }
    }), this;
  }
}
rn.EXTENSION_NAME = qe;
class on extends H {
  init() {
    this.extensionName = Ae, this.propertyType = "Transform", this.parentTypes = [d.TEXTURE_INFO];
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      offset: [0, 0],
      rotation: 0,
      scale: [1, 1],
      texCoord: null
    });
  }
  getOffset() {
    return this.get("offset");
  }
  setOffset(e) {
    return this.set("offset", e);
  }
  getRotation() {
    return this.get("rotation");
  }
  setRotation(e) {
    return this.set("rotation", e);
  }
  getScale() {
    return this.get("scale");
  }
  setScale(e) {
    return this.set("scale", e);
  }
  getTexCoord() {
    return this.get("texCoord");
  }
  setTexCoord(e) {
    return this.set("texCoord", e);
  }
}
on.EXTENSION_NAME = Ae;
class an extends k {
  constructor(...e) {
    super(...e), this.extensionName = Ae;
  }
  /** Creates a new Transform property for use on a {@link TextureInfo}. */
  createTransform() {
    return new on(this.document.getGraph());
  }
  /** @hidden */
  read(e) {
    for (const [t, n] of Array.from(e.textureInfos.entries())) {
      if (!n.extensions || !n.extensions[Ae]) continue;
      const s = this.createTransform(), r = n.extensions[Ae];
      r.offset !== void 0 && s.setOffset(r.offset), r.rotation !== void 0 && s.setRotation(r.rotation), r.scale !== void 0 && s.setScale(r.scale), r.texCoord !== void 0 && s.setTexCoord(r.texCoord), t.setExtension(Ae, s);
    }
    return this;
  }
  /** @hidden */
  write(e) {
    const t = Array.from(e.textureInfoDefMap.entries());
    for (const [n, s] of t) {
      const r = n.getExtension(Ae);
      if (!r) continue;
      s.extensions = s.extensions || {};
      const o = {}, a = L.eq;
      a(r.getOffset(), [0, 0]) || (o.offset = r.getOffset()), r.getRotation() !== 0 && (o.rotation = r.getRotation()), a(r.getScale(), [1, 1]) || (o.scale = r.getScale()), r.getTexCoord() != null && (o.texCoord = r.getTexCoord()), s.extensions[Ae] = o;
    }
    return this;
  }
}
an.EXTENSION_NAME = Ae;
const Zr = [d.ROOT, d.SCENE, d.NODE, d.MESH, d.MATERIAL, d.TEXTURE, d.ANIMATION];
class cn extends H {
  init() {
    this.extensionName = re, this.propertyType = "Packet", this.parentTypes = Zr;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      context: {},
      properties: {}
    });
  }
  /**********************************************************************************************
   * Context.
   */
  /**
   * Returns the XMP context definition URL for the given term.
   * See: https://json-ld.org/spec/latest/json-ld/#the-context
   * @param term Case-sensitive term. Usually a concise, lowercase, alphanumeric identifier.
   */
  getContext() {
    return this.get("context");
  }
  /**
   * Sets the XMP context definition URL for the given term.
   * See: https://json-ld.org/spec/latest/json-ld/#the-context
   *
   * Example:
   *
   * ```typescript
   * packet.setContext({
   *   dc: 'http://purl.org/dc/elements/1.1/',
   *   model3d: 'https://schema.khronos.org/model3d/xsd/1.0/',
   * });
   * ```
   *
   * @param term Case-sensitive term. Usually a concise, lowercase, alphanumeric identifier.
   * @param definition URI for XMP namespace.
   */
  setContext(e) {
    return this.set("context", _e({}, e));
  }
  /**********************************************************************************************
   * Properties.
   */
  /**
   * Lists properties defined in this packet.
   *
   * Example:
   *
   * ```typescript
   * packet.listProperties(); // → ['dc:Language', 'dc:Creator', 'xmp:CreateDate']
   * ```
   */
  listProperties() {
    return Object.keys(this.get("properties"));
  }
  /**
   * Returns the value of a property, as a literal or JSONLD object.
   *
   * Example:
   *
   * ```typescript
   * packet.getProperty('dc:Creator'); // → {"@list": ["Acme, Inc."]}
   * packet.getProperty('dc:Title'); // → {"@type": "rdf:Alt", "rdf:_1": {"@language": "en-US", "@value": "Lamp"}}
   * packet.getProperty('xmp:CreateDate'); // → "2022-01-01"
   * ```
   */
  getProperty(e) {
    const t = this.get("properties");
    return e in t ? t[e] : null;
  }
  /**
   * Sets the value of a property, as a literal or JSONLD object.
   *
   * Example:
   *
   * ```typescript
   * packet.setProperty('dc:Creator', {'@list': ['Acme, Inc.']});
   * packet.setProperty('dc:Title', {
   * 	'@type': 'rdf:Alt',
   * 	'rdf:_1': {'@language': 'en-US', '@value': 'Lamp'}
   * });
   * packet.setProperty('model3d:preferredSurfaces', {'@list': ['vertical']});
   * ```
   */
  setProperty(e, t) {
    this._assertContext(e);
    const n = _e({}, this.get("properties"));
    return t ? n[e] = t : delete n[e], this.set("properties", n);
  }
  /**********************************************************************************************
   * Serialize / Deserialize.
   */
  /**
   * Serializes the packet context and properties to a JSONLD object.
   */
  toJSONLD() {
    const e = xt(this.get("context")), t = xt(this.get("properties"));
    return _e({
      "@context": e
    }, t);
  }
  /**
   * Deserializes a JSONLD packet, then overwrites existing context and properties with
   * the new values.
   */
  fromJSONLD(e) {
    e = xt(e);
    const t = e["@context"];
    return t && this.set("context", t), delete e["@context"], this.set("properties", e);
  }
  /**********************************************************************************************
   * Validation.
   */
  /** @hidden */
  _assertContext(e) {
    if (!(e.split(":")[0] in this.get("context")))
      throw new Error(`${re}: Missing context for term, "${e}".`);
  }
}
cn.EXTENSION_NAME = re;
function xt(i) {
  return JSON.parse(JSON.stringify(i));
}
class un extends k {
  constructor(...e) {
    super(...e), this.extensionName = re;
  }
  /** Creates a new XMP packet, to be linked with a {@link Document} or {@link Property Properties}. */
  createPacket() {
    return new cn(this.document.getGraph());
  }
  /** Lists XMP packets currently defined in a {@link Document}. */
  listPackets() {
    return Array.from(this.properties);
  }
  /** @hidden */
  read(e) {
    var t;
    const n = (t = e.jsonDoc.json.extensions) == null ? void 0 : t[re];
    if (!n || !n.packets) return this;
    const s = e.jsonDoc.json, r = this.document.getRoot(), o = n.packets.map((u) => this.createPacket().fromJSONLD(u)), a = [[s.asset], s.scenes, s.nodes, s.meshes, s.materials, s.images, s.animations], c = [[r], r.listScenes(), r.listNodes(), r.listMeshes(), r.listMaterials(), r.listTextures(), r.listAnimations()];
    for (let u = 0; u < a.length; u++) {
      const h = a[u] || [];
      for (let g = 0; g < h.length; g++) {
        const m = h[g];
        if (m.extensions && m.extensions[re]) {
          const x = m.extensions[re];
          c[u][g].setExtension(re, o[x.packet]);
        }
      }
    }
    return this;
  }
  /** @hidden */
  write(e) {
    const {
      json: t
    } = e.jsonDoc, n = [];
    for (const s of this.properties) {
      n.push(s.toJSONLD());
      for (const r of s.listParents()) {
        let o;
        switch (r.propertyType) {
          case d.ROOT:
            o = t.asset;
            break;
          case d.SCENE:
            o = t.scenes[e.sceneIndexMap.get(r)];
            break;
          case d.NODE:
            o = t.nodes[e.nodeIndexMap.get(r)];
            break;
          case d.MESH:
            o = t.meshes[e.meshIndexMap.get(r)];
            break;
          case d.MATERIAL:
            o = t.materials[e.materialIndexMap.get(r)];
            break;
          case d.TEXTURE:
            o = t.images[e.imageIndexMap.get(r)];
            break;
          case d.ANIMATION:
            o = t.animations[e.animationIndexMap.get(r)];
            break;
          default:
            o = null, this.document.getLogger().warn(`[${re}]: Unsupported parent property, "${r.propertyType}"`);
            break;
        }
        o && (o.extensions = o.extensions || {}, o.extensions[re] = {
          packet: n.length - 1
        });
      }
    }
    return n.length > 0 && (t.extensions = t.extensions || {}, t.extensions[re] = {
      packets: n
    }), this;
  }
}
un.EXTENSION_NAME = re;
const ei = [Ct, As, Ms, ws, Os, vs, Us, Ls, Ps, ks, Xs, Hs, $s, qs, Qs, en, tn, nn, rn, an, un], ti = [ms, wt, Rs, ys, ...ei];
let mt = null;
async function ri() {
  if (mt) return mt;
  const i = new Qn().registerExtensions(ti), [e, t] = await Promise.all([
    fetch(Dt.draco.wasmUrl),
    fetch(Dt.draco.encoderWasmUrl)
  ]), [n, s] = await Promise.all([
    e.arrayBuffer(),
    t.arrayBuffer()
  ]), [r, o] = await Promise.all([
    vt.createDecoderModule({ wasmBinary: n }),
    vt.createEncoderModule({ wasmBinary: s })
  ]);
  return await Promise.all([Ft.ready, Ut.ready]), i.registerDependencies({
    "meshopt.decoder": Ft,
    "meshopt.encoder": Ut,
    "draco3d.decoder": r,
    "draco3d.encoder": o
  }), mt = i, i;
}
export {
  S as A,
  D as B,
  ni as C,
  Je as D,
  H as E,
  rn as K,
  Fe as M,
  d as P,
  ps as R,
  hs as S,
  gs as T,
  Ue as a,
  bt as b,
  j as c,
  wt as d,
  en as e,
  Hs as f,
  Ls as g,
  $s as h,
  ri as i,
  ws as j
};
