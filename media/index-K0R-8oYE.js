import { ep as Hi, eq as zn, er as Vi, e8 as Wi, cs as Ki, cq as Zn, a2 as qi } from "./index-BuD9B_7M.js";
class Hs {
  constructor() {
    this._listeners = {};
  }
  addEventListener(e, t) {
    const a = this._listeners;
    return a[e] === void 0 && (a[e] = []), a[e].indexOf(t) === -1 && a[e].push(t), this;
  }
  removeEventListener(e, t) {
    const r = this._listeners[e];
    if (r !== void 0) {
      const n = r.indexOf(t);
      n !== -1 && r.splice(n, 1);
    }
    return this;
  }
  dispatchEvent(e) {
    const a = this._listeners[e.type];
    if (a !== void 0) {
      const r = a.slice(0);
      for (let n = 0, s = r.length; n < s; n++)
        r[n].call(this, e);
    }
    return this;
  }
  dispose() {
    for (const e in this._listeners)
      delete this._listeners[e];
  }
}
class Mt {
  constructor(e, t, a, r = {}) {
    if (this._name = void 0, this._parent = void 0, this._child = void 0, this._attributes = void 0, this._disposed = !1, this._name = e, this._parent = t, this._child = a, this._attributes = r, !t.isOnGraph(a))
      throw new Error("Cannot connect disconnected graphs.");
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
  setChild(e) {
    return this._child = e, this;
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
}
class Xi extends Hs {
  constructor(...e) {
    super(...e), this._emptySet = /* @__PURE__ */ new Set(), this._edges = /* @__PURE__ */ new Set(), this._parentEdges = /* @__PURE__ */ new Map(), this._childEdges = /* @__PURE__ */ new Map();
  }
  /** Returns a list of all parent->child edges on this graph. */
  listEdges() {
    return Array.from(this._edges);
  }
  /** Returns a list of all edges on the graph having the given node as their child. */
  listParentEdges(e) {
    return Array.from(this._childEdges.get(e) || this._emptySet);
  }
  /** Returns a list of parent nodes for the given child node. */
  listParents(e) {
    const t = /* @__PURE__ */ new Set();
    for (const a of this.listParentEdges(e))
      t.add(a.getParent());
    return Array.from(t);
  }
  /** Returns a list of all edges on the graph having the given node as their parent. */
  listChildEdges(e) {
    return Array.from(this._parentEdges.get(e) || this._emptySet);
  }
  /** Returns a list of child nodes for the given parent node. */
  listChildren(e) {
    const t = /* @__PURE__ */ new Set();
    for (const a of this.listChildEdges(e))
      t.add(a.getChild());
    return Array.from(t);
  }
  disconnectParents(e, t) {
    for (const a of this.listParentEdges(e))
      (!t || t(a.getParent())) && a.dispose();
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
  _createEdge(e, t, a, r) {
    const n = new Mt(e, t, a, r);
    this._edges.add(n);
    const s = n.getParent();
    this._parentEdges.has(s) || this._parentEdges.set(s, /* @__PURE__ */ new Set()), this._parentEdges.get(s).add(n);
    const c = n.getChild();
    return this._childEdges.has(c) || this._childEdges.set(c, /* @__PURE__ */ new Set()), this._childEdges.get(c).add(n), n;
  }
  /**
   * Detaches a {@link GraphEdge} from the {@link Graph}. Before calling this
   * method, ensure that the GraphEdge has first been detached from any
   * associated {@link GraphNode} attributes.
   * @hidden
   * @internal
   */
  _destroyEdge(e) {
    return this._edges.delete(e), this._parentEdges.get(e.getParent()).delete(e), this._childEdges.get(e.getChild()).delete(e), this;
  }
}
function jn() {
  return jn = Object.assign || function(o) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var a in t)
        Object.prototype.hasOwnProperty.call(t, a) && (o[a] = t[a]);
    }
    return o;
  }, jn.apply(this, arguments);
}
class bt {
  constructor(e) {
    if (this.list = [], e)
      for (const t of e)
        this.list.push(t);
  }
  add(e) {
    this.list.push(e);
  }
  remove(e) {
    const t = this.list.indexOf(e);
    t >= 0 && this.list.splice(t, 1);
  }
  removeChild(e) {
    const t = [];
    for (const a of this.list)
      a.getChild() === e && t.push(a);
    for (const a of t)
      this.remove(a);
    return t;
  }
  listRefsByChild(e) {
    const t = [];
    for (const a of this.list)
      a.getChild() === e && t.push(a);
    return t;
  }
  values() {
    return this.list;
  }
}
class ce {
  constructor(e) {
    if (this.set = /* @__PURE__ */ new Set(), this.map = /* @__PURE__ */ new Map(), e)
      for (const t of e)
        this.add(t);
  }
  add(e) {
    const t = e.getChild();
    this.removeChild(t), this.set.add(e), this.map.set(t, e);
  }
  remove(e) {
    this.set.delete(e), this.map.delete(e.getChild());
  }
  removeChild(e) {
    const t = this.map.get(e) || null;
    return t && this.remove(t), t;
  }
  getRefByChild(e) {
    return this.map.get(e) || null;
  }
  values() {
    return Array.from(this.set);
  }
}
class Pe {
  constructor(e) {
    this.map = {}, e && Object.assign(this.map, e);
  }
  set(e, t) {
    this.map[e] = t;
  }
  delete(e) {
    delete this.map[e];
  }
  get(e) {
    return this.map[e] || null;
  }
  keys() {
    return Object.keys(this.map);
  }
  values() {
    return Object.values(this.map);
  }
}
const re = Symbol("attributes"), xt = Symbol("immutableKeys");
class ba extends Hs {
  /**
   * Internal graph used to search and maintain references.
   * @hidden
   */
  /**
   * Attributes (literal values and GraphNode references) associated with this instance. For each
   * GraphNode reference, the attributes stores a {@link GraphEdge}. List and Map references are
   * stored as arrays and dictionaries of edges.
   * @internal
   */
  /**
   * Attributes included with `getDefaultAttributes` are considered immutable, and cannot be
   * modifed by `.setRef()`, `.copy()`, or other GraphNode methods. Both the edges and the
   * properties will be disposed with the parent GraphNode.
   *
   * Currently, only single-edge references (getRef/setRef) are supported as immutables.
   *
   * @internal
   */
  constructor(e) {
    super(), this._disposed = !1, this.graph = void 0, this[re] = void 0, this[xt] = void 0, this.graph = e, this[xt] = /* @__PURE__ */ new Set(), this[re] = this._createAttributes();
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
    for (const a in e) {
      const r = e[a];
      if (r instanceof ba) {
        const n = this.graph._createEdge(a, this, r);
        this[xt].add(a), t[a] = n;
      } else
        t[a] = r;
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
    this._disposed || (this.graph.listChildEdges(this).forEach((e) => e.dispose()), this.graph.disconnectParents(this), this._disposed = !0, this.dispatchEvent({
      type: "dispose"
    }));
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
    for (const a in this[re]) {
      const r = this[re][a];
      if (r instanceof Mt) {
        const n = r;
        n.getChild() === e && this.setRef(a, t, n.getAttributes());
      } else if (r instanceof bt)
        for (const n of r.listRefsByChild(e)) {
          const s = n.getAttributes();
          this.removeRef(a, e), this.addRef(a, t, s);
        }
      else if (r instanceof ce) {
        const n = r.getRefByChild(e);
        if (n) {
          const s = n.getAttributes();
          this.removeRef(a, e), this.addRef(a, t, s);
        }
      } else if (r instanceof Pe)
        for (const n of r.keys()) {
          const s = r.get(n);
          s.getChild() === e && this.setRefMap(a, n, t, s.getAttributes());
        }
    }
    return this;
  }
  /**********************************************************************************************
   * Literal attributes.
   */
  /** @hidden */
  get(e) {
    return this[re][e];
  }
  /** @hidden */
  set(e, t) {
    return this[re][e] = t, this.dispatchEvent({
      type: "change",
      attribute: e
    });
  }
  /**********************************************************************************************
   * Ref: 1:1 graph node references.
   */
  /** @hidden */
  getRef(e) {
    const t = this[re][e];
    return t ? t.getChild() : null;
  }
  /** @hidden */
  setRef(e, t, a) {
    if (this[xt].has(e))
      throw new Error(`Cannot overwrite immutable attribute, "${e}".`);
    const r = this[re][e];
    if (r && r.dispose(), !t) return this;
    const n = this.graph._createEdge(e, this, t, a);
    return this[re][e] = n, this.dispatchEvent({
      type: "change",
      attribute: e
    });
  }
  /**********************************************************************************************
   * RefList: 1:many graph node references.
   */
  /** @hidden */
  listRefs(e) {
    return this.assertRefList(e).values().map((a) => a.getChild());
  }
  /** @hidden */
  addRef(e, t, a) {
    const r = this.graph._createEdge(e, this, t, a);
    return this.assertRefList(e).add(r), this.dispatchEvent({
      type: "change",
      attribute: e
    });
  }
  /** @hidden */
  removeRef(e, t) {
    const a = this.assertRefList(e);
    if (a instanceof bt)
      for (const r of a.listRefsByChild(t))
        r.dispose();
    else {
      const r = a.getRefByChild(t);
      r && r.dispose();
    }
    return this;
  }
  /** @hidden */
  assertRefList(e) {
    const t = this[re][e];
    if (t instanceof bt || t instanceof ce)
      return t;
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
    const r = this.assertRefMap(e).get(t);
    return r ? r.getChild() : null;
  }
  /** @hidden */
  setRefMap(e, t, a, r) {
    const n = this.assertRefMap(e), s = n.get(t);
    if (s && s.dispose(), !a) return this;
    r = Object.assign(r || {}, {
      key: t
    });
    const c = this.graph._createEdge(e, this, a, jn({}, r, {
      key: t
    }));
    return n.set(t, c), this.dispatchEvent({
      type: "change",
      attribute: e,
      key: t
    });
  }
  /** @hidden */
  assertRefMap(e) {
    const t = this[re][e];
    if (t instanceof Pe)
      return t;
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
    return super.dispatchEvent(jn({}, e, {
      target: this
    })), this.graph.dispatchEvent(jn({}, e, {
      target: this,
      type: `node:${e.type}`
    })), this;
  }
  /**********************************************************************************************
   * Internal.
   */
  /** @hidden */
  _destroyRef(e) {
    const t = e.getName();
    if (this[re][t] === e)
      this[re][t] = null, this[xt].has(t) && e.getChild().dispose();
    else if (this[re][t] instanceof bt)
      this[re][t].remove(e);
    else if (this[re][t] instanceof ce)
      this[re][t].remove(e);
    else if (this[re][t] instanceof Pe) {
      const a = this[re][t];
      for (const r of a.keys())
        a.get(r) === e && a.delete(r);
    } else
      return;
    this.graph._destroyEdge(e), this.dispatchEvent({
      type: "change",
      attribute: t
    });
  }
}
const Vs = "v4.2.1", vt = "@glb.bin";
var F;
(function(o) {
  o.ACCESSOR = "Accessor", o.ANIMATION = "Animation", o.ANIMATION_CHANNEL = "AnimationChannel", o.ANIMATION_SAMPLER = "AnimationSampler", o.BUFFER = "Buffer", o.CAMERA = "Camera", o.MATERIAL = "Material", o.MESH = "Mesh", o.PRIMITIVE = "Primitive", o.PRIMITIVE_TARGET = "PrimitiveTarget", o.NODE = "Node", o.ROOT = "Root", o.SCENE = "Scene", o.SKIN = "Skin", o.TEXTURE = "Texture", o.TEXTURE_INFO = "TextureInfo";
})(F || (F = {}));
var Hn;
(function(o) {
  o.INTERLEAVED = "interleaved", o.SEPARATE = "separate";
})(Hn || (Hn = {}));
var Me;
(function(o) {
  o.ARRAY_BUFFER = "ARRAY_BUFFER", o.ELEMENT_ARRAY_BUFFER = "ELEMENT_ARRAY_BUFFER", o.INVERSE_BIND_MATRICES = "INVERSE_BIND_MATRICES", o.OTHER = "OTHER", o.SPARSE = "SPARSE";
})(Me || (Me = {}));
var Ue;
(function(o) {
  o[o.R = 4096] = "R", o[o.G = 256] = "G", o[o.B = 16] = "B", o[o.A = 1] = "A";
})(Ue || (Ue = {}));
var dt;
(function(o) {
  o.GLTF = "GLTF", o.GLB = "GLB";
})(dt || (dt = {}));
const qn = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
};
class Z {
  /** Creates a byte array from a Data URI. */
  static createBufferFromDataURI(e) {
    if (typeof Buffer > "u") {
      const t = atob(e.split(",")[1]), a = new Uint8Array(t.length);
      for (let r = 0; r < t.length; r++)
        a[r] = t.charCodeAt(r);
      return a;
    } else {
      const t = e.split(",")[1], a = e.indexOf("base64") >= 0;
      return Buffer.from(t, a ? "base64" : "utf8");
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
    for (const n of e)
      t += n.byteLength;
    const a = new Uint8Array(t);
    let r = 0;
    for (const n of e)
      a.set(n, r), r += n.byteLength;
    return a;
  }
  /**
   * Pads a Uint8Array to the next 4-byte boundary.
   *
   * Reference: [glTF → Data Alignment](https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#data-alignment)
   */
  static pad(e, t = 0) {
    const a = this.padNumber(e.byteLength);
    if (a === e.byteLength) return e;
    const r = new Uint8Array(a);
    if (r.set(e), t !== 0)
      for (let n = e.byteLength; n < a; n++)
        r[n] = t;
    return r;
  }
  /** Pads a number to 4-byte boundaries. */
  static padNumber(e) {
    return Math.ceil(e / 4) * 4;
  }
  /** Returns true if given byte array instances are equal. */
  static equals(e, t) {
    if (e === t) return !0;
    if (e.byteLength !== t.byteLength) return !1;
    let a = e.byteLength;
    for (; a--; )
      if (e[a] !== t[a]) return !1;
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
  static toView(e, t = 0, a = 1 / 0) {
    return new Uint8Array(e.buffer, e.byteOffset + t, Math.min(e.byteLength, a));
  }
  static assertView(e) {
    if (e && !ArrayBuffer.isView(e))
      throw new Error(`Method requires Uint8Array parameter; received "${typeof e}".`);
    return e;
  }
}
class Ji {
  match(e) {
    return e.length >= 3 && e[0] === 255 && e[1] === 216 && e[2] === 255;
  }
  getSize(e) {
    let t = new DataView(e.buffer, e.byteOffset + 4), a, r;
    for (; t.byteLength; ) {
      if (a = t.getUint16(0, !1), Yi(t, a), r = t.getUint8(a + 1), r === 192 || r === 193 || r === 194)
        return [t.getUint16(a + 7, !1), t.getUint16(a + 5, !1)];
      t = new DataView(e.buffer, t.byteOffset + a + 2);
    }
    throw new TypeError("Invalid JPG, no size found");
  }
  getChannels(e) {
    return 3;
  }
}
class Xn {
  match(e) {
    return e.length >= 8 && e[0] === 137 && e[1] === 80 && e[2] === 78 && e[3] === 71 && e[4] === 13 && e[5] === 10 && e[6] === 26 && e[7] === 10;
  }
  getSize(e) {
    const t = new DataView(e.buffer, e.byteOffset);
    return Z.decodeText(e.slice(12, 16)) === Xn.PNG_FRIED_CHUNK_NAME ? [t.getUint32(32, !1), t.getUint32(36, !1)] : [t.getUint32(16, !1), t.getUint32(20, !1)];
  }
  getChannels(e) {
    return 4;
  }
}
Xn.PNG_FRIED_CHUNK_NAME = "CgBI";
class He {
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
    let a = 0;
    const r = 4, n = this.getSize(e, t);
    if (!n) return null;
    for (; n[0] > 1 || n[1] > 1; )
      a += n[0] * n[1] * r, n[0] = Math.max(Math.floor(n[0] / 2), 1), n[1] = Math.max(Math.floor(n[1] / 2), 1);
    return a += 1 * r, a;
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
He.impls = {
  "image/jpeg": new Ji(),
  "image/png": new Xn()
};
function Yi(o, e) {
  if (e > o.byteLength)
    throw new TypeError("Corrupt JPG, exceeded buffer limits");
  if (o.getUint8(e) !== 255)
    throw new TypeError("Invalid JPG, marker table corrupted");
  return o;
}
class kt {
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
      return He.mimeTypeToExtension(t);
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
var na = typeof Float32Array < "u" ? Float32Array : Array;
Math.hypot || (Math.hypot = function() {
  for (var o = 0, e = arguments.length; e--; )
    o += arguments[e] * arguments[e];
  return Math.sqrt(o);
});
function Qi() {
  var o = new na(3);
  return na != Float32Array && (o[0] = 0, o[1] = 0, o[2] = 0), o;
}
function $n(o) {
  var e = o[0], t = o[1], a = o[2];
  return Math.hypot(e, t, a);
}
function Zi(o, e, t) {
  var a = e[0], r = e[1], n = e[2], s = t[3] * a + t[7] * r + t[11] * n + t[15];
  return s = s || 1, o[0] = (t[0] * a + t[4] * r + t[8] * n + t[12]) / s, o[1] = (t[1] * a + t[5] * r + t[9] * n + t[13]) / s, o[2] = (t[2] * a + t[6] * r + t[10] * n + t[14]) / s, o;
}
(function() {
  var o = Qi();
  return function(e, t, a, r, n, s) {
    var c, d;
    for (t || (t = 3), a || (a = 0), r ? d = Math.min(r * t + a, e.length) : d = e.length, c = a; c < d; c += t)
      o[0] = e[c], o[1] = e[c + 1], o[2] = e[c + 2], n(o, o, s), e[c] = o[0], e[c + 1] = o[1], e[c + 2] = o[2];
    return e;
  };
})();
function $i(o) {
  const e = Ws(), t = o.propertyType === F.NODE ? [o] : o.listChildren();
  for (const a of t)
    a.traverse((r) => {
      const n = r.getMesh();
      if (!n) return;
      const s = eo(n, r.getWorldMatrix());
      s.min.every(isFinite) && s.max.every(isFinite) && (aa(s.min, e), aa(s.max, e));
    });
  return e;
}
function eo(o, e) {
  const t = Ws();
  for (const a of o.listPrimitives()) {
    const r = a.getAttribute("POSITION"), n = a.getIndices();
    if (!r) continue;
    let s = [0, 0, 0], c = [0, 0, 0];
    for (let d = 0, y = n ? n.getCount() : r.getCount(); d < y; d++) {
      const _ = n ? n.getScalar(d) : d;
      s = r.getElement(_, s), c = Zi(c, s, e), aa(c, t);
    }
  }
  return t;
}
function aa(o, e) {
  for (let t = 0; t < 3; t++)
    e.min[t] = Math.min(o[t], e.min[t]), e.max[t] = Math.max(o[t], e.max[t]);
}
function Ws() {
  return {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
}
const hs = "https://null.example";
class Rn {
  static dirname(e) {
    const t = e.lastIndexOf("/");
    return t === -1 ? "./" : e.substring(0, t + 1);
  }
  /**
   * Extracts the basename from a URL, e.g. "folder/model.glb" -> "model".
   * See: {@link FileUtils.basename}
   */
  static basename(e) {
    return kt.basename(new URL(e, hs).pathname);
  }
  /**
   * Extracts the extension from a URL, e.g. "folder/model.glb" -> "glb".
   * See: {@link FileUtils.extension}
   */
  static extension(e) {
    return kt.extension(new URL(e, hs).pathname);
  }
  static resolve(e, t) {
    if (!this.isRelativePath(t)) return t;
    const a = e.split("/"), r = t.split("/");
    a.pop();
    for (let n = 0; n < r.length; n++)
      r[n] !== "." && (r[n] === ".." ? a.pop() : a.push(r[n]));
    return a.join("/");
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
Rn.DEFAULT_INIT = {};
Rn.PROTOCOL_REGEXP = /^[a-zA-Z]+:\/\//;
function _s(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}
function At(o) {
  if (_s(o) === !1) return !1;
  const e = o.constructor;
  if (e === void 0) return !0;
  const t = e.prototype;
  return !(_s(t) === !1 || Object.hasOwn(t, "isPrototypeOf") === !1);
}
var sa, ia;
(function(o) {
  o[o.SILENT = 4] = "SILENT", o[o.ERROR = 3] = "ERROR", o[o.WARN = 2] = "WARN", o[o.INFO = 1] = "INFO", o[o.DEBUG = 0] = "DEBUG";
})(ia || (ia = {}));
class Fe {
  /** Constructs a new Logger instance. */
  constructor(e) {
    this.verbosity = void 0, this.verbosity = e;
  }
  /** Logs an event at level {@link Logger.Verbosity.DEBUG}. */
  debug(e) {
    this.verbosity <= Fe.Verbosity.DEBUG && console.debug(e);
  }
  /** Logs an event at level {@link Logger.Verbosity.INFO}. */
  info(e) {
    this.verbosity <= Fe.Verbosity.INFO && console.info(e);
  }
  /** Logs an event at level {@link Logger.Verbosity.WARN}. */
  warn(e) {
    this.verbosity <= Fe.Verbosity.WARN && console.warn(e);
  }
  /** Logs an event at level {@link Logger.Verbosity.ERROR}. */
  error(e) {
    this.verbosity <= Fe.Verbosity.ERROR && console.error(e);
  }
}
sa = Fe;
Fe.Verbosity = ia;
Fe.DEFAULT_INSTANCE = new sa(sa.Verbosity.INFO);
function to(o) {
  var e = o[0], t = o[1], a = o[2], r = o[3], n = o[4], s = o[5], c = o[6], d = o[7], y = o[8], _ = o[9], g = o[10], w = o[11], E = o[12], T = o[13], j = o[14], A = o[15], l = e * s - t * n, S = e * c - a * n, I = e * d - r * n, k = t * c - a * s, v = t * d - r * s, O = a * d - r * c, m = y * T - _ * E, R = y * j - g * E, C = y * A - w * E, D = _ * j - g * T, B = _ * A - w * T, L = g * A - w * j;
  return l * L - S * B + I * D + k * C - v * R + O * m;
}
function ro(o, e, t) {
  var a = e[0], r = e[1], n = e[2], s = e[3], c = e[4], d = e[5], y = e[6], _ = e[7], g = e[8], w = e[9], E = e[10], T = e[11], j = e[12], A = e[13], l = e[14], S = e[15], I = t[0], k = t[1], v = t[2], O = t[3];
  return o[0] = I * a + k * c + v * g + O * j, o[1] = I * r + k * d + v * w + O * A, o[2] = I * n + k * y + v * E + O * l, o[3] = I * s + k * _ + v * T + O * S, I = t[4], k = t[5], v = t[6], O = t[7], o[4] = I * a + k * c + v * g + O * j, o[5] = I * r + k * d + v * w + O * A, o[6] = I * n + k * y + v * E + O * l, o[7] = I * s + k * _ + v * T + O * S, I = t[8], k = t[9], v = t[10], O = t[11], o[8] = I * a + k * c + v * g + O * j, o[9] = I * r + k * d + v * w + O * A, o[10] = I * n + k * y + v * E + O * l, o[11] = I * s + k * _ + v * T + O * S, I = t[12], k = t[13], v = t[14], O = t[15], o[12] = I * a + k * c + v * g + O * j, o[13] = I * r + k * d + v * w + O * A, o[14] = I * n + k * y + v * E + O * l, o[15] = I * s + k * _ + v * T + O * S, o;
}
function no(o, e) {
  var t = e[0], a = e[1], r = e[2], n = e[4], s = e[5], c = e[6], d = e[8], y = e[9], _ = e[10];
  return o[0] = Math.hypot(t, a, r), o[1] = Math.hypot(n, s, c), o[2] = Math.hypot(d, y, _), o;
}
function ao(o, e) {
  var t = new na(3);
  no(t, e);
  var a = 1 / t[0], r = 1 / t[1], n = 1 / t[2], s = e[0] * a, c = e[1] * r, d = e[2] * n, y = e[4] * a, _ = e[5] * r, g = e[6] * n, w = e[8] * a, E = e[9] * r, T = e[10] * n, j = s + _ + T, A = 0;
  return j > 0 ? (A = Math.sqrt(j + 1) * 2, o[3] = 0.25 * A, o[0] = (g - E) / A, o[1] = (w - d) / A, o[2] = (c - y) / A) : s > _ && s > T ? (A = Math.sqrt(1 + s - _ - T) * 2, o[3] = (g - E) / A, o[0] = 0.25 * A, o[1] = (c + y) / A, o[2] = (w + d) / A) : _ > T ? (A = Math.sqrt(1 + _ - s - T) * 2, o[3] = (w - d) / A, o[0] = (c + y) / A, o[1] = 0.25 * A, o[2] = (g + E) / A) : (A = Math.sqrt(1 + T - s - _) * 2, o[3] = (c - y) / A, o[0] = (w + d) / A, o[1] = (g + E) / A, o[2] = 0.25 * A), o;
}
class ne {
  static identity(e) {
    return e;
  }
  static eq(e, t, a = 1e-5) {
    if (e.length !== t.length) return !1;
    for (let r = 0; r < e.length; r++)
      if (Math.abs(e[r] - t[r]) > a) return !1;
    return !0;
  }
  static clamp(e, t, a) {
    return e < t ? t : e > a ? a : e;
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
        return Math.round(ne.clamp(e, 0, 1) * 65535);
      case 5121:
        return Math.round(ne.clamp(e, 0, 1) * 255);
      case 5122:
        return Math.round(ne.clamp(e, -1, 1) * 32767);
      case 5120:
        return Math.round(ne.clamp(e, -1, 1) * 127);
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
  static decompose(e, t, a, r) {
    let n = $n([e[0], e[1], e[2]]);
    const s = $n([e[4], e[5], e[6]]), c = $n([e[8], e[9], e[10]]);
    to(e) < 0 && (n = -n), t[0] = e[12], t[1] = e[13], t[2] = e[14];
    const y = e.slice(), _ = 1 / n, g = 1 / s, w = 1 / c;
    y[0] *= _, y[1] *= _, y[2] *= _, y[4] *= g, y[5] *= g, y[6] *= g, y[8] *= w, y[9] *= w, y[10] *= w, ao(a, y), r[0] = n, r[1] = s, r[2] = c;
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
  static compose(e, t, a, r) {
    const n = r, s = t[0], c = t[1], d = t[2], y = t[3], _ = s + s, g = c + c, w = d + d, E = s * _, T = s * g, j = s * w, A = c * g, l = c * w, S = d * w, I = y * _, k = y * g, v = y * w, O = a[0], m = a[1], R = a[2];
    return n[0] = (1 - (A + S)) * O, n[1] = (T + v) * O, n[2] = (j - k) * O, n[3] = 0, n[4] = (T - v) * m, n[5] = (1 - (E + S)) * m, n[6] = (l + I) * m, n[7] = 0, n[8] = (j + k) * R, n[9] = (l - I) * R, n[10] = (1 - (E + A)) * R, n[11] = 0, n[12] = e[0], n[13] = e[1], n[14] = e[2], n[15] = 1, n;
  }
}
function so(o, e) {
  if (!!o != !!e) return !1;
  const t = o.getChild(), a = e.getChild();
  return t === a || t.equals(a);
}
function io(o, e) {
  if (!!o != !!e) return !1;
  const t = o.values(), a = e.values();
  if (t.length !== a.length) return !1;
  for (let r = 0; r < t.length; r++) {
    const n = t[r], s = a[r];
    if (n.getChild() !== s.getChild() && !n.getChild().equals(s.getChild()))
      return !1;
  }
  return !0;
}
function oo(o, e) {
  if (!!o != !!e) return !1;
  const t = o.keys(), a = e.keys();
  if (t.length !== a.length) return !1;
  for (const r of t) {
    const n = o.get(r), s = e.get(r);
    if (!!n != !!s) return !1;
    const c = n.getChild(), d = s.getChild();
    if (c !== d && !c.equals(d))
      return !1;
  }
  return !0;
}
function Ks(o, e) {
  if (o === e) return !0;
  if (!!o != !!e || !o || !e || o.length !== e.length) return !1;
  for (let t = 0; t < o.length; t++)
    if (o[t] !== e[t]) return !1;
  return !0;
}
function qs(o, e) {
  if (o === e) return !0;
  if (!!o != !!e) return !1;
  if (!At(o) || !At(e))
    return o === e;
  const t = o, a = e;
  let r = 0, n = 0, s;
  for (s in t) r++;
  for (s in a) n++;
  if (r !== n) return !1;
  for (s in t) {
    const c = t[s], d = a[s];
    if (Vn(c) && Vn(d)) {
      if (!Ks(c, d)) return !1;
    } else if (At(c) && At(d)) {
      if (!qs(c, d)) return !1;
    } else if (c !== d) return !1;
  }
  return !0;
}
function Vn(o) {
  return Array.isArray(o) || ArrayBuffer.isView(o);
}
const ms = "23456789abdegjkmnpqrvwxyzABDEGJKMNPQRVWXYZ", co = 999, uo = 6, gs = /* @__PURE__ */ new Set(), fo = function() {
  let e = "";
  for (let t = 0; t < uo; t++)
    e += ms.charAt(Math.floor(Math.random() * ms.length));
  return e;
}, bo = function() {
  for (let e = 0; e < co; e++) {
    const t = fo();
    if (!gs.has(t))
      return gs.add(t), t;
  }
  return "";
}, pt = (o) => o, po = /* @__PURE__ */ new Set();
class da extends ba {
  /** @hidden */
  constructor(e, t = "") {
    super(e), this[re].name = t, this.init(), this.dispatchEvent({
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
    return new e(this.graph).copy(this, pt);
  }
  /**
   * Copies all data from another property to this one. Child properties are copied by reference,
   * unless a 'resolve' function is given to override that.
   * @param other Property to copy references from.
   * @param resolve Function to resolve each Property being transferred. Default is identity.
   */
  copy(e, t = pt) {
    for (const a in this[re]) {
      const r = this[re][a];
      if (r instanceof Mt)
        this[xt].has(a) || r.dispose();
      else if (r instanceof bt || r instanceof ce)
        for (const n of r.values())
          n.dispose();
      else if (r instanceof Pe)
        for (const n of r.values())
          n.dispose();
    }
    for (const a in e[re]) {
      const r = this[re][a], n = e[re][a];
      if (n instanceof Mt)
        this[xt].has(a) ? r.getChild().copy(t(n.getChild()), t) : this.setRef(a, t(n.getChild()), n.getAttributes());
      else if (n instanceof ce || n instanceof bt)
        for (const s of n.values())
          this.addRef(a, t(s.getChild()), s.getAttributes());
      else if (n instanceof Pe)
        for (const s of n.keys()) {
          const c = n.get(s);
          this.setRefMap(a, s, t(c.getChild()), c.getAttributes());
        }
      else At(n) ? this[re][a] = JSON.parse(JSON.stringify(n)) : Array.isArray(n) || n instanceof ArrayBuffer || ArrayBuffer.isView(n) ? this[re][a] = n.slice() : this[re][a] = n;
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
  equals(e, t = po) {
    if (this === e) return !0;
    if (this.propertyType !== e.propertyType) return !1;
    for (const a in this[re]) {
      if (t.has(a)) continue;
      const r = this[re][a], n = e[re][a];
      if (r instanceof Mt || n instanceof Mt) {
        if (!so(r, n))
          return !1;
      } else if (r instanceof ce || n instanceof ce || r instanceof bt || n instanceof bt) {
        if (!io(r, n))
          return !1;
      } else if (r instanceof Pe || n instanceof Pe) {
        if (!oo(r, n))
          return !1;
      } else if (At(r) || At(n)) {
        if (!qs(r, n)) return !1;
      } else if (Vn(r) || Vn(n)) {
        if (!Ks(r, n)) return !1;
      } else if (r !== n) return !1;
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
class je extends da {
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      extensions: new Pe()
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
class q extends je {
  /**********************************************************************************************
   * Instance.
   */
  init() {
    this.propertyType = F.ACCESSOR;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      array: null,
      type: q.Type.SCALAR,
      componentType: q.ComponentType.FLOAT,
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
      case q.Type.SCALAR:
        return 1;
      case q.Type.VEC2:
        return 2;
      case q.Type.VEC3:
        return 3;
      case q.Type.VEC4:
        return 4;
      case q.Type.MAT2:
        return 4;
      case q.Type.MAT3:
        return 9;
      case q.Type.MAT4:
        return 16;
      default:
        throw new Error("Unexpected type: " + e);
    }
  }
  /** Returns size of a given component type, in bytes. */
  static getComponentSize(e) {
    switch (e) {
      case q.ComponentType.BYTE:
        return 1;
      case q.ComponentType.UNSIGNED_BYTE:
        return 1;
      case q.ComponentType.SHORT:
        return 2;
      case q.ComponentType.UNSIGNED_SHORT:
        return 2;
      case q.ComponentType.UNSIGNED_INT:
        return 4;
      case q.ComponentType.FLOAT:
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
    const t = this.getNormalized(), a = this.getElementSize(), r = this.getComponentType();
    if (this.getMin(e), t)
      for (let n = 0; n < a; n++)
        e[n] = ne.decodeNormalizedInt(e[n], r);
    return e;
  }
  /**
   * Minimum value of each component in this attribute. Values returned by this method do not
   * reflect normalization: use {@link .getMinNormalized} in that case.
   */
  getMin(e) {
    const t = this.getArray(), a = this.getCount(), r = this.getElementSize();
    for (let n = 0; n < r; n++) e[n] = 1 / 0;
    for (let n = 0; n < a * r; n += r)
      for (let s = 0; s < r; s++) {
        const c = t[n + s];
        Number.isFinite(c) && (e[s] = Math.min(e[s], c));
      }
    return e;
  }
  /**
   * Maximum value of each component in this attribute. Unlike in a final glTF file, values
   * returned by this method will reflect the minimum accounting for {@link .normalized}
   * state.
   */
  getMaxNormalized(e) {
    const t = this.getNormalized(), a = this.getElementSize(), r = this.getComponentType();
    if (this.getMax(e), t)
      for (let n = 0; n < a; n++)
        e[n] = ne.decodeNormalizedInt(e[n], r);
    return e;
  }
  /**
   * Maximum value of each component in this attribute. Values returned by this method do not
   * reflect normalization: use {@link .getMinNormalized} in that case.
   */
  getMax(e) {
    const t = this.get("array"), a = this.getCount(), r = this.getElementSize();
    for (let n = 0; n < r; n++) e[n] = -1 / 0;
    for (let n = 0; n < a * r; n += r)
      for (let s = 0; s < r; s++) {
        const c = t[n + s];
        Number.isFinite(c) && (e[s] = Math.max(e[s], c));
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
    return q.getElementSize(this.get("type"));
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
    const t = this.getElementSize(), a = this.getComponentType(), r = this.getArray();
    return this.getNormalized() ? ne.decodeNormalizedInt(r[e * t], a) : r[e * t];
  }
  /**
   * Assigns the scalar element value at the given index. For
   * {@link Accessor.getNormalized normalized} integer accessors, "value" should be
   * given in floating-point form — it will be integer-encoded before writing
   * to the underlying array.
   */
  setScalar(e, t) {
    const a = this.getElementSize(), r = this.getComponentType(), n = this.getArray();
    return this.getNormalized() ? n[e * a] = ne.encodeNormalizedInt(t, r) : n[e * a] = t, this;
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
    const a = this.getNormalized(), r = this.getElementSize(), n = this.getComponentType(), s = this.getArray();
    for (let c = 0; c < r; c++)
      a ? t[c] = ne.decodeNormalizedInt(s[e * r + c], n) : t[c] = s[e * r + c];
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
    const a = this.getNormalized(), r = this.getElementSize(), n = this.getComponentType(), s = this.getArray();
    for (let c = 0; c < r; c++)
      a ? s[e * r + c] = ne.encodeNormalizedInt(t[c], n) : s[e * r + c] = t[c];
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
    return this.set("componentType", e ? lo(e) : q.ComponentType.FLOAT), this.set("array", e), this;
  }
  /** Returns the total bytelength of this accessor, exclusive of padding. */
  getByteLength() {
    const e = this.get("array");
    return e ? e.byteLength : 0;
  }
}
q.Type = {
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
q.ComponentType = {
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
function lo(o) {
  switch (o.constructor) {
    case Float32Array:
      return q.ComponentType.FLOAT;
    case Uint32Array:
      return q.ComponentType.UNSIGNED_INT;
    case Uint16Array:
      return q.ComponentType.UNSIGNED_SHORT;
    case Uint8Array:
      return q.ComponentType.UNSIGNED_BYTE;
    case Int16Array:
      return q.ComponentType.SHORT;
    case Int8Array:
      return q.ComponentType.BYTE;
    default:
      throw new Error("Unknown accessor componentType.");
  }
}
class Xs extends je {
  init() {
    this.propertyType = F.ANIMATION;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      channels: new ce(),
      samplers: new ce()
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
class pa extends je {
  /**********************************************************************************************
   * Instance.
   */
  init() {
    this.propertyType = F.ANIMATION_CHANNEL;
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
pa.TargetPath = {
  /** Channel targets {@link Node.setTranslation}. */
  TRANSLATION: "translation",
  /** Channel targets {@link Node.setRotation}. */
  ROTATION: "rotation",
  /** Channel targets {@link Node.setScale}. */
  SCALE: "scale",
  /** Channel targets {@link Node.setWeights}, affecting {@link PrimitiveTarget} weights. */
  WEIGHTS: "weights"
};
class Ot extends je {
  /**********************************************************************************************
   * Instance.
   */
  init() {
    this.propertyType = F.ANIMATION_SAMPLER;
  }
  getDefaultAttributes() {
    return Object.assign(super.getDefaults(), {
      interpolation: Ot.Interpolation.LINEAR,
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
      usage: Me.OTHER
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
      usage: Me.OTHER
    });
  }
}
Ot.Interpolation = {
  /** Animated values are linearly interpolated between keyframes. */
  LINEAR: "LINEAR",
  /** Animated values remain constant from one keyframe until the next keyframe. */
  STEP: "STEP",
  /** Animated values are interpolated according to given cubic spline tangents. */
  CUBICSPLINE: "CUBICSPLINE"
};
class Js extends je {
  init() {
    this.propertyType = F.BUFFER;
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
class jt extends je {
  /**********************************************************************************************
   * Instance.
   */
  init() {
    this.propertyType = F.CAMERA;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      // Common.
      type: jt.Type.PERSPECTIVE,
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
jt.Type = {
  /** A perspective camera representing a perspective projection matrix. */
  PERSPECTIVE: "perspective",
  /** An orthographic camera representing an orthographic projection matrix. */
  ORTHOGRAPHIC: "orthographic"
};
class pe extends da {
  /** @hidden */
  _validateParent(e) {
    if (!this.parentTypes.includes(e.propertyType))
      throw new Error(`Parent "${e.propertyType}" invalid for child "${this.propertyType}".`);
  }
}
pe.EXTENSION_NAME = void 0;
class ie extends je {
  /**********************************************************************************************
   * Instance.
   */
  init() {
    this.propertyType = F.TEXTURE_INFO;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      texCoord: 0,
      magFilter: null,
      minFilter: null,
      wrapS: ie.WrapMode.REPEAT,
      wrapT: ie.WrapMode.REPEAT
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
ie.WrapMode = {
  /** */
  CLAMP_TO_EDGE: 33071,
  /** */
  MIRRORED_REPEAT: 33648,
  /** */
  REPEAT: 10497
};
ie.MagFilter = {
  /** */
  NEAREST: 9728,
  /** */
  LINEAR: 9729
};
ie.MinFilter = {
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
  R: Dn,
  G: Fn,
  B: Un,
  A: ho
} = Ue;
class Et extends je {
  /**********************************************************************************************
   * Instance.
   */
  init() {
    this.propertyType = F.MATERIAL;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      alphaMode: Et.AlphaMode.OPAQUE,
      alphaCutoff: 0.5,
      doubleSided: !1,
      baseColorFactor: [1, 1, 1, 1],
      baseColorTexture: null,
      baseColorTextureInfo: new ie(this.graph, "baseColorTextureInfo"),
      emissiveFactor: [0, 0, 0],
      emissiveTexture: null,
      emissiveTextureInfo: new ie(this.graph, "emissiveTextureInfo"),
      normalScale: 1,
      normalTexture: null,
      normalTextureInfo: new ie(this.graph, "normalTextureInfo"),
      occlusionStrength: 1,
      occlusionTexture: null,
      occlusionTextureInfo: new ie(this.graph, "occlusionTextureInfo"),
      roughnessFactor: 1,
      metallicFactor: 1,
      metallicRoughnessTexture: null,
      metallicRoughnessTextureInfo: new ie(this.graph, "metallicRoughnessTextureInfo")
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
      channels: Dn | Fn | Un | ho,
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
      channels: Dn | Fn | Un,
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
      channels: Dn | Fn | Un
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
      channels: Dn
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
      channels: Fn | Un
    });
  }
}
Et.AlphaMode = {
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
class Ys extends je {
  init() {
    this.propertyType = F.MESH;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      weights: [],
      primitives: new ce()
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
class Qs extends je {
  init() {
    this.propertyType = F.NODE;
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
      children: new ce()
    });
  }
  copy(e, t = pt) {
    if (t === pt) throw new Error("Node cannot be copied.");
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
    return ne.compose(this.get("translation"), this.get("rotation"), this.get("scale"), []);
  }
  /** Sets the local matrix of this Node. Matrix will be decomposed to TRS properties. */
  setMatrix(e) {
    const t = this.get("translation").slice(), a = this.get("rotation").slice(), r = this.get("scale").slice();
    return ne.decompose(e, t, a, r), this.set("translation", t).set("rotation", a).set("scale", r);
  }
  /**********************************************************************************************
   * World transform.
   */
  /** Returns the translation (position) of this Node in world space. */
  getWorldTranslation() {
    const e = [0, 0, 0];
    return ne.decompose(this.getWorldMatrix(), e, [0, 0, 0, 1], [1, 1, 1]), e;
  }
  /** Returns the rotation (quaternion) of this Node in world space. */
  getWorldRotation() {
    const e = [0, 0, 0, 1];
    return ne.decompose(this.getWorldMatrix(), [0, 0, 0], e, [1, 1, 1]), e;
  }
  /** Returns the scale of this Node in world space. */
  getWorldScale() {
    const e = [1, 1, 1];
    return ne.decompose(this.getWorldMatrix(), [0, 0, 0], [0, 0, 0, 1], e), e;
  }
  /** Returns the world matrix of this Node. */
  getWorldMatrix() {
    const e = [];
    for (let r = this; r != null; r = r.getParentNode())
      e.push(r);
    let t;
    const a = e.pop().getMatrix();
    for (; t = e.pop(); )
      ro(a, a, t.getMatrix());
    return a;
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
    for (const a of e.listParents())
      a.propertyType === F.SCENE && a.removeChild(e);
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
      if (e.propertyType === F.NODE)
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
class It extends je {
  /**********************************************************************************************
   * Instance.
   */
  init() {
    this.propertyType = F.PRIMITIVE;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      mode: It.Mode.TRIANGLES,
      material: null,
      indices: null,
      attributes: new Pe(),
      targets: new ce()
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
      usage: Me.ELEMENT_ARRAY_BUFFER
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
      usage: Me.ARRAY_BUFFER
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
It.Mode = {
  /** Draw single points. */
  POINTS: 0,
  /** Draw lines. Each vertex connects to the one after it. */
  LINES: 1,
  /**
   * Draw lines. Each set of two vertices is treated as a separate line segment.
   * @deprecated See {@link https://github.com/KhronosGroup/glTF/issues/1883 KhronosGroup/glTF#1883}.
   */
  LINE_LOOP: 2,
  /** Draw a connected group of line segments from the first vertex to the last,  */
  LINE_STRIP: 3,
  /** Draw triangles. Each set of three vertices creates a separate triangle. */
  TRIANGLES: 4,
  /** Draw a connected strip of triangles. */
  TRIANGLE_STRIP: 5,
  /**
   * Draw a connected group of triangles. Each vertex connects to the previous and the first
   * vertex in the fan.
   * @deprecated See {@link https://github.com/KhronosGroup/glTF/issues/1883 KhronosGroup/glTF#1883}.
   */
  TRIANGLE_FAN: 6
};
class _o extends da {
  init() {
    this.propertyType = F.PRIMITIVE_TARGET;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      attributes: new Pe()
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
      usage: Me.ARRAY_BUFFER
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
function Ie() {
  return Ie = Object.assign ? Object.assign.bind() : function(o) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var a in t) ({}).hasOwnProperty.call(t, a) && (o[a] = t[a]);
    }
    return o;
  }, Ie.apply(null, arguments);
}
class Zs extends je {
  init() {
    this.propertyType = F.SCENE;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      children: new ce()
    });
  }
  copy(e, t = pt) {
    if (t === pt) throw new Error("Scene cannot be copied.");
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
class $s extends je {
  init() {
    this.propertyType = F.SKIN;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      skeleton: null,
      inverseBindMatrices: null,
      joints: new ce()
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
      usage: Me.INVERSE_BIND_MATRICES
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
class ei extends je {
  init() {
    this.propertyType = F.TEXTURE;
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
    return this.get("mimeType") || He.extensionToMimeType(kt.extension(this.get("uri")));
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
    const t = He.extensionToMimeType(kt.extension(e));
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
    return this.set("image", Z.assertView(e));
  }
  /** Returns the size, in pixels, of this texture. */
  getSize() {
    const e = this.get("image");
    return e ? He.getSize(e, this.getMimeType()) : null;
  }
}
class ti extends je {
  init() {
    this.propertyType = F.ROOT;
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      asset: {
        generator: `glTF-Transform ${Vs}`,
        version: "2.0"
      },
      defaultScene: null,
      accessors: new ce(),
      animations: new ce(),
      buffers: new ce(),
      cameras: new ce(),
      materials: new ce(),
      meshes: new ce(),
      nodes: new ce(),
      scenes: new ce(),
      skins: new ce(),
      textures: new ce()
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
  copy(e, t = pt) {
    if (t === pt) throw new Error("Root cannot be copied.");
    this.set("asset", Ie({}, e.get("asset"))), this.setName(e.getName()), this.setExtras(Ie({}, e.getExtras())), this.setDefaultScene(e.getDefaultScene() ? t(e.getDefaultScene()) : null);
    for (const a of e.listRefMapKeys("extensions")) {
      const r = e.getExtension(a);
      this.setExtension(a, t(r));
    }
    return this;
  }
  _addChildOfRoot(e) {
    return e instanceof Zs ? this.addRef("scenes", e) : e instanceof Qs ? this.addRef("nodes", e) : e instanceof jt ? this.addRef("cameras", e) : e instanceof $s ? this.addRef("skins", e) : e instanceof Ys ? this.addRef("meshes", e) : e instanceof Et ? this.addRef("materials", e) : e instanceof ei ? this.addRef("textures", e) : e instanceof Xs ? this.addRef("animations", e) : e instanceof q ? this.addRef("accessors", e) : e instanceof Js && this.addRef("buffers", e), this;
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
class wn {
  /**
   * Returns the Document associated with a given Graph, if any.
   * @hidden
   * @experimental
   */
  static fromGraph(e) {
    return wn._GRAPH_DOCUMENTS.get(e) || null;
  }
  /** Creates a new Document, representing an empty glTF asset. */
  constructor() {
    this._graph = new Xi(), this._root = new ti(this._graph), this._logger = Fe.DEFAULT_INSTANCE, wn._GRAPH_DOCUMENTS.set(this._graph, this);
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
    const t = e.map((a) => a.name);
    for (const a of e)
      await a(this, {
        stack: t
      });
    return this;
  }
  /**********************************************************************************************
   * Extension factory method.
   */
  /**
   * Creates a new {@link Extension}, for the extension type of the given constructor. If the
   * extension is already enabled for this Document, the previous Extension reference is reused.
   */
  createExtension(e) {
    const t = e.EXTENSION_NAME;
    return this.getRoot().listExtensionsUsed().find((r) => r.extensionName === t) || new e(this);
  }
  /**********************************************************************************************
   * Property factory methods.
   */
  /** Creates a new {@link Scene} attached to this document's {@link Root}. */
  createScene(e = "") {
    return new Zs(this._graph, e);
  }
  /** Creates a new {@link Node} attached to this document's {@link Root}. */
  createNode(e = "") {
    return new Qs(this._graph, e);
  }
  /** Creates a new {@link Camera} attached to this document's {@link Root}. */
  createCamera(e = "") {
    return new jt(this._graph, e);
  }
  /** Creates a new {@link Skin} attached to this document's {@link Root}. */
  createSkin(e = "") {
    return new $s(this._graph, e);
  }
  /** Creates a new {@link Mesh} attached to this document's {@link Root}. */
  createMesh(e = "") {
    return new Ys(this._graph, e);
  }
  /**
   * Creates a new {@link Primitive}. Primitives must be attached to a {@link Mesh}
   * for use and export; they are not otherwise associated with a {@link Root}.
   */
  createPrimitive() {
    return new It(this._graph);
  }
  /**
   * Creates a new {@link PrimitiveTarget}, or morph target. Targets must be attached to a
   * {@link Primitive} for use and export; they are not otherwise associated with a {@link Root}.
   */
  createPrimitiveTarget(e = "") {
    return new _o(this._graph, e);
  }
  /** Creates a new {@link Material} attached to this document's {@link Root}. */
  createMaterial(e = "") {
    return new Et(this._graph, e);
  }
  /** Creates a new {@link Texture} attached to this document's {@link Root}. */
  createTexture(e = "") {
    return new ei(this._graph, e);
  }
  /** Creates a new {@link Animation} attached to this document's {@link Root}. */
  createAnimation(e = "") {
    return new Xs(this._graph, e);
  }
  /**
   * Creates a new {@link AnimationChannel}. Channels must be attached to an {@link Animation}
   * for use and export; they are not otherwise associated with a {@link Root}.
   */
  createAnimationChannel(e = "") {
    return new pa(this._graph, e);
  }
  /**
   * Creates a new {@link AnimationSampler}. Samplers must be attached to an {@link Animation}
   * for use and export; they are not otherwise associated with a {@link Root}.
   */
  createAnimationSampler(e = "") {
    return new Ot(this._graph, e);
  }
  /** Creates a new {@link Accessor} attached to this document's {@link Root}. */
  createAccessor(e = "", t = null) {
    return t || (t = this.getRoot().listBuffers()[0]), new q(this._graph, e).setBuffer(t);
  }
  /** Creates a new {@link Buffer} attached to this document's {@link Root}. */
  createBuffer(e = "") {
    return new Js(this._graph, e);
  }
}
wn._GRAPH_DOCUMENTS = /* @__PURE__ */ new WeakMap();
class fe {
  /** @hidden */
  constructor(e) {
    this.extensionName = "", this.prereadTypes = [], this.prewriteTypes = [], this.readDependencies = [], this.writeDependencies = [], this.document = void 0, this.required = !1, this.properties = /* @__PURE__ */ new Set(), this._listener = void 0, this.document = e, e.getRoot()._enableExtension(this), this._listener = (a) => {
      const r = a, n = r.target;
      n instanceof pe && n.extensionName === this.extensionName && (r.type === "node:create" && this._addExtensionProperty(n), r.type === "node:dispose" && this._removeExtensionProperty(n));
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
fe.EXTENSION_NAME = void 0;
class mo {
  constructor(e) {
    this.jsonDoc = void 0, this.buffers = [], this.bufferViews = [], this.bufferViewBuffers = [], this.accessors = [], this.textures = [], this.textureInfos = /* @__PURE__ */ new Map(), this.materials = [], this.meshes = [], this.cameras = [], this.nodes = [], this.skins = [], this.animations = [], this.scenes = [], this.jsonDoc = e;
  }
  setTextureInfo(e, t) {
    this.textureInfos.set(e, t), t.texCoord !== void 0 && e.setTexCoord(t.texCoord), t.extras !== void 0 && e.setExtras(t.extras);
    const a = this.jsonDoc.json.textures[t.index];
    if (a.sampler === void 0) return;
    const r = this.jsonDoc.json.samplers[a.sampler];
    r.magFilter !== void 0 && e.setMagFilter(r.magFilter), r.minFilter !== void 0 && e.setMinFilter(r.minFilter), r.wrapS !== void 0 && e.setWrapS(r.wrapS), r.wrapT !== void 0 && e.setWrapT(r.wrapT);
  }
}
const ys = {
  logger: Fe.DEFAULT_INSTANCE,
  extensions: [],
  dependencies: {}
}, go = /* @__PURE__ */ new Set([F.BUFFER, F.TEXTURE, F.MATERIAL, F.MESH, F.PRIMITIVE, F.NODE, F.SCENE]);
class yo {
  static read(e, t = ys) {
    const a = Ie({}, ys, t), {
      json: r
    } = e, n = new wn().setLogger(a.logger);
    this.validate(e, a);
    const s = new mo(e), c = r.asset, d = n.getRoot().getAsset();
    c.copyright && (d.copyright = c.copyright), c.extras && (d.extras = c.extras), r.extras !== void 0 && n.getRoot().setExtras(Ie({}, r.extras));
    const y = r.extensionsUsed || [], _ = r.extensionsRequired || [];
    a.extensions.sort((m, R) => m.EXTENSION_NAME > R.EXTENSION_NAME ? 1 : -1);
    for (const m of a.extensions)
      if (y.includes(m.EXTENSION_NAME)) {
        const R = n.createExtension(m).setRequired(_.includes(m.EXTENSION_NAME)), C = R.prereadTypes.filter((D) => !go.has(D));
        C.length && a.logger.warn(`Preread hooks for some types (${C.join()}), requested by extension ${R.extensionName}, are unsupported. Please file an issue or a PR.`);
        for (const D of R.readDependencies)
          R.install(D, a.dependencies[D]);
      }
    const g = r.buffers || [];
    n.getRoot().listExtensionsUsed().filter((m) => m.prereadTypes.includes(F.BUFFER)).forEach((m) => m.preread(s, F.BUFFER)), s.buffers = g.map((m) => {
      const R = n.createBuffer(m.name);
      return m.extras && R.setExtras(m.extras), m.uri && m.uri.indexOf("__") !== 0 && R.setURI(m.uri), R;
    });
    const w = r.bufferViews || [];
    s.bufferViewBuffers = w.map((m, R) => {
      if (!s.bufferViews[R]) {
        const C = e.json.buffers[m.buffer], D = C.uri ? e.resources[C.uri] : e.resources[vt], B = m.byteOffset || 0;
        s.bufferViews[R] = Z.toView(D, B, m.byteLength);
      }
      return s.buffers[m.buffer];
    });
    const E = r.accessors || [];
    s.accessors = E.map((m) => {
      const R = s.bufferViewBuffers[m.bufferView], C = n.createAccessor(m.name, R).setType(m.type);
      return m.extras && C.setExtras(m.extras), m.normalized !== void 0 && C.setNormalized(m.normalized), m.bufferView === void 0 || C.setArray(Gn(m, s)), C;
    });
    const T = r.images || [], j = r.textures || [];
    n.getRoot().listExtensionsUsed().filter((m) => m.prereadTypes.includes(F.TEXTURE)).forEach((m) => m.preread(s, F.TEXTURE)), s.textures = T.map((m) => {
      const R = n.createTexture(m.name);
      if (m.extras && R.setExtras(m.extras), m.bufferView !== void 0) {
        const C = r.bufferViews[m.bufferView], D = e.json.buffers[C.buffer], B = D.uri ? e.resources[D.uri] : e.resources[vt], L = C.byteOffset || 0, G = C.byteLength, H = B.slice(L, L + G);
        R.setImage(H);
      } else m.uri !== void 0 && (R.setImage(e.resources[m.uri]), m.uri.indexOf("__") !== 0 && R.setURI(m.uri));
      if (m.mimeType !== void 0)
        R.setMimeType(m.mimeType);
      else if (m.uri) {
        const C = kt.extension(m.uri);
        R.setMimeType(He.extensionToMimeType(C));
      }
      return R;
    }), n.getRoot().listExtensionsUsed().filter((m) => m.prereadTypes.includes(F.MATERIAL)).forEach((m) => m.preread(s, F.MATERIAL));
    const A = r.materials || [];
    s.materials = A.map((m) => {
      const R = n.createMaterial(m.name);
      m.extras && R.setExtras(m.extras), m.alphaMode !== void 0 && R.setAlphaMode(m.alphaMode), m.alphaCutoff !== void 0 && R.setAlphaCutoff(m.alphaCutoff), m.doubleSided !== void 0 && R.setDoubleSided(m.doubleSided);
      const C = m.pbrMetallicRoughness || {};
      if (C.baseColorFactor !== void 0 && R.setBaseColorFactor(C.baseColorFactor), m.emissiveFactor !== void 0 && R.setEmissiveFactor(m.emissiveFactor), C.metallicFactor !== void 0 && R.setMetallicFactor(C.metallicFactor), C.roughnessFactor !== void 0 && R.setRoughnessFactor(C.roughnessFactor), C.baseColorTexture !== void 0) {
        const D = C.baseColorTexture, B = s.textures[j[D.index].source];
        R.setBaseColorTexture(B), s.setTextureInfo(R.getBaseColorTextureInfo(), D);
      }
      if (m.emissiveTexture !== void 0) {
        const D = m.emissiveTexture, B = s.textures[j[D.index].source];
        R.setEmissiveTexture(B), s.setTextureInfo(R.getEmissiveTextureInfo(), D);
      }
      if (m.normalTexture !== void 0) {
        const D = m.normalTexture, B = s.textures[j[D.index].source];
        R.setNormalTexture(B), s.setTextureInfo(R.getNormalTextureInfo(), D), m.normalTexture.scale !== void 0 && R.setNormalScale(m.normalTexture.scale);
      }
      if (m.occlusionTexture !== void 0) {
        const D = m.occlusionTexture, B = s.textures[j[D.index].source];
        R.setOcclusionTexture(B), s.setTextureInfo(R.getOcclusionTextureInfo(), D), m.occlusionTexture.strength !== void 0 && R.setOcclusionStrength(m.occlusionTexture.strength);
      }
      if (C.metallicRoughnessTexture !== void 0) {
        const D = C.metallicRoughnessTexture, B = s.textures[j[D.index].source];
        R.setMetallicRoughnessTexture(B), s.setTextureInfo(R.getMetallicRoughnessTextureInfo(), D);
      }
      return R;
    }), n.getRoot().listExtensionsUsed().filter((m) => m.prereadTypes.includes(F.MESH)).forEach((m) => m.preread(s, F.MESH));
    const l = r.meshes || [];
    n.getRoot().listExtensionsUsed().filter((m) => m.prereadTypes.includes(F.PRIMITIVE)).forEach((m) => m.preread(s, F.PRIMITIVE)), s.meshes = l.map((m) => {
      const R = n.createMesh(m.name);
      return m.extras && R.setExtras(m.extras), m.weights !== void 0 && R.setWeights(m.weights), (m.primitives || []).forEach((D) => {
        const B = n.createPrimitive();
        D.extras && B.setExtras(D.extras), D.material !== void 0 && B.setMaterial(s.materials[D.material]), D.mode !== void 0 && B.setMode(D.mode);
        for (const [H, P] of Object.entries(D.attributes || {}))
          B.setAttribute(H, s.accessors[P]);
        D.indices !== void 0 && B.setIndices(s.accessors[D.indices]);
        const L = m.extras && m.extras.targetNames || [];
        (D.targets || []).forEach((H, P) => {
          const V = L[P] || P.toString(), K = n.createPrimitiveTarget(V);
          for (const [f, Q] of Object.entries(H))
            K.setAttribute(f, s.accessors[Q]);
          B.addTarget(K);
        }), R.addPrimitive(B);
      }), R;
    });
    const S = r.cameras || [];
    s.cameras = S.map((m) => {
      const R = n.createCamera(m.name).setType(m.type);
      if (m.extras && R.setExtras(m.extras), m.type === jt.Type.PERSPECTIVE) {
        const C = m.perspective;
        R.setYFov(C.yfov), R.setZNear(C.znear), C.zfar !== void 0 && R.setZFar(C.zfar), C.aspectRatio !== void 0 && R.setAspectRatio(C.aspectRatio);
      } else {
        const C = m.orthographic;
        R.setZNear(C.znear).setZFar(C.zfar).setXMag(C.xmag).setYMag(C.ymag);
      }
      return R;
    });
    const I = r.nodes || [];
    n.getRoot().listExtensionsUsed().filter((m) => m.prereadTypes.includes(F.NODE)).forEach((m) => m.preread(s, F.NODE)), s.nodes = I.map((m) => {
      const R = n.createNode(m.name);
      if (m.extras && R.setExtras(m.extras), m.translation !== void 0 && R.setTranslation(m.translation), m.rotation !== void 0 && R.setRotation(m.rotation), m.scale !== void 0 && R.setScale(m.scale), m.matrix !== void 0) {
        const C = [0, 0, 0], D = [0, 0, 0, 1], B = [1, 1, 1];
        ne.decompose(m.matrix, C, D, B), R.setTranslation(C), R.setRotation(D), R.setScale(B);
      }
      return m.weights !== void 0 && R.setWeights(m.weights), R;
    });
    const k = r.skins || [];
    s.skins = k.map((m) => {
      const R = n.createSkin(m.name);
      m.extras && R.setExtras(m.extras), m.inverseBindMatrices !== void 0 && R.setInverseBindMatrices(s.accessors[m.inverseBindMatrices]), m.skeleton !== void 0 && R.setSkeleton(s.nodes[m.skeleton]);
      for (const C of m.joints)
        R.addJoint(s.nodes[C]);
      return R;
    }), I.map((m, R) => {
      const C = s.nodes[R];
      (m.children || []).forEach((B) => C.addChild(s.nodes[B])), m.mesh !== void 0 && C.setMesh(s.meshes[m.mesh]), m.camera !== void 0 && C.setCamera(s.cameras[m.camera]), m.skin !== void 0 && C.setSkin(s.skins[m.skin]);
    });
    const v = r.animations || [];
    s.animations = v.map((m) => {
      const R = n.createAnimation(m.name);
      m.extras && R.setExtras(m.extras);
      const D = (m.samplers || []).map((L) => {
        const G = n.createAnimationSampler().setInput(s.accessors[L.input]).setOutput(s.accessors[L.output]).setInterpolation(L.interpolation || Ot.Interpolation.LINEAR);
        return L.extras && G.setExtras(L.extras), R.addSampler(G), G;
      });
      return (m.channels || []).forEach((L) => {
        const G = n.createAnimationChannel().setSampler(D[L.sampler]).setTargetPath(L.target.path);
        L.target.node !== void 0 && G.setTargetNode(s.nodes[L.target.node]), L.extras && G.setExtras(L.extras), R.addChannel(G);
      }), R;
    });
    const O = r.scenes || [];
    return n.getRoot().listExtensionsUsed().filter((m) => m.prereadTypes.includes(F.SCENE)).forEach((m) => m.preread(s, F.SCENE)), s.scenes = O.map((m) => {
      const R = n.createScene(m.name);
      return m.extras && R.setExtras(m.extras), (m.nodes || []).map((D) => s.nodes[D]).forEach((D) => R.addChild(D)), R;
    }), r.scene !== void 0 && n.getRoot().setDefaultScene(s.scenes[r.scene]), n.getRoot().listExtensionsUsed().forEach((m) => m.read(s)), E.forEach((m, R) => {
      const C = s.accessors[R], D = !!m.sparse, B = !m.bufferView && !C.getArray();
      (D || B) && C.setSparse(!0).setArray(xo(m, s));
    }), n;
  }
  static validate(e, t) {
    const a = e.json;
    if (a.asset.version !== "2.0")
      throw new Error(`Unsupported glTF version, "${a.asset.version}".`);
    if (a.extensionsRequired) {
      for (const r of a.extensionsRequired)
        if (!t.extensions.find((n) => n.EXTENSION_NAME === r))
          throw new Error(`Missing required extension, "${r}".`);
    }
    if (a.extensionsUsed)
      for (const r of a.extensionsUsed)
        t.extensions.find((n) => n.EXTENSION_NAME === r) || t.logger.warn(`Missing optional extension, "${r}".`);
  }
}
function To(o, e) {
  const t = e.jsonDoc, a = e.bufferViews[o.bufferView], r = t.json.bufferViews[o.bufferView], n = qn[o.componentType], s = q.getElementSize(o.type), c = n.BYTES_PER_ELEMENT, d = o.byteOffset || 0, y = new n(o.count * s), _ = new DataView(a.buffer, a.byteOffset, a.byteLength), g = r.byteStride;
  for (let w = 0; w < o.count; w++)
    for (let E = 0; E < s; E++) {
      const T = d + w * g + E * c;
      let j;
      switch (o.componentType) {
        case q.ComponentType.FLOAT:
          j = _.getFloat32(T, !0);
          break;
        case q.ComponentType.UNSIGNED_INT:
          j = _.getUint32(T, !0);
          break;
        case q.ComponentType.UNSIGNED_SHORT:
          j = _.getUint16(T, !0);
          break;
        case q.ComponentType.UNSIGNED_BYTE:
          j = _.getUint8(T);
          break;
        case q.ComponentType.SHORT:
          j = _.getInt16(T, !0);
          break;
        case q.ComponentType.BYTE:
          j = _.getInt8(T);
          break;
        default:
          throw new Error(`Unexpected componentType "${o.componentType}".`);
      }
      y[w * s + E] = j;
    }
  return y;
}
function Gn(o, e) {
  const t = e.jsonDoc, a = e.bufferViews[o.bufferView], r = t.json.bufferViews[o.bufferView], n = qn[o.componentType], s = q.getElementSize(o.type), c = n.BYTES_PER_ELEMENT, d = s * c;
  if (r.byteStride !== void 0 && r.byteStride !== d)
    return To(o, e);
  const y = a.byteOffset + (o.byteOffset || 0), _ = o.count * s * c;
  return new n(a.buffer.slice(y, y + _));
}
function xo(o, e) {
  const t = qn[o.componentType], a = q.getElementSize(o.type);
  let r;
  o.bufferView !== void 0 ? r = Gn(o, e) : r = new t(o.count * a);
  const n = o.sparse;
  if (!n) return r;
  const s = n.count, c = Ie({}, o, n.indices, {
    count: s,
    type: "SCALAR"
  }), d = Ie({}, o, n.values, {
    count: s
  }), y = Gn(c, e), _ = Gn(d, e);
  for (let g = 0; g < c.count; g++)
    for (let w = 0; w < a; w++)
      r[y[g] * a + w] = _[g * a + w];
  return r;
}
var Sn;
(function(o) {
  o[o.ARRAY_BUFFER = 34962] = "ARRAY_BUFFER", o[o.ELEMENT_ARRAY_BUFFER = 34963] = "ELEMENT_ARRAY_BUFFER";
})(Sn || (Sn = {}));
class Ve {
  constructor(e, t, a) {
    this._doc = void 0, this.jsonDoc = void 0, this.options = void 0, this.accessorIndexMap = /* @__PURE__ */ new Map(), this.animationIndexMap = /* @__PURE__ */ new Map(), this.bufferIndexMap = /* @__PURE__ */ new Map(), this.cameraIndexMap = /* @__PURE__ */ new Map(), this.skinIndexMap = /* @__PURE__ */ new Map(), this.materialIndexMap = /* @__PURE__ */ new Map(), this.meshIndexMap = /* @__PURE__ */ new Map(), this.nodeIndexMap = /* @__PURE__ */ new Map(), this.imageIndexMap = /* @__PURE__ */ new Map(), this.textureDefIndexMap = /* @__PURE__ */ new Map(), this.textureInfoDefMap = /* @__PURE__ */ new Map(), this.samplerDefIndexMap = /* @__PURE__ */ new Map(), this.sceneIndexMap = /* @__PURE__ */ new Map(), this.imageBufferViews = [], this.otherBufferViews = /* @__PURE__ */ new Map(), this.otherBufferViewsIndexMap = /* @__PURE__ */ new Map(), this.extensionData = {}, this.bufferURIGenerator = void 0, this.imageURIGenerator = void 0, this.logger = void 0, this._accessorUsageMap = /* @__PURE__ */ new Map(), this.accessorUsageGroupedByParent = /* @__PURE__ */ new Set(["ARRAY_BUFFER"]), this.accessorParents = /* @__PURE__ */ new Map(), this._doc = e, this.jsonDoc = t, this.options = a;
    const r = e.getRoot(), n = r.listBuffers().length, s = r.listTextures().length;
    this.bufferURIGenerator = new Ts(n > 1, () => a.basename || "buffer"), this.imageURIGenerator = new Ts(s > 1, (c) => Ao(e, c) || a.basename || "texture"), this.logger = e.getLogger();
  }
  /**
   * Creates a TextureInfo definition, and any Texture or Sampler definitions it requires. If
   * possible, Texture and Sampler definitions are shared.
   */
  createTextureInfoDef(e, t) {
    const a = {
      magFilter: t.getMagFilter() || void 0,
      minFilter: t.getMinFilter() || void 0,
      wrapS: t.getWrapS(),
      wrapT: t.getWrapT()
    }, r = JSON.stringify(a);
    this.samplerDefIndexMap.has(r) || (this.samplerDefIndexMap.set(r, this.jsonDoc.json.samplers.length), this.jsonDoc.json.samplers.push(a));
    const n = {
      source: this.imageIndexMap.get(e),
      sampler: this.samplerDefIndexMap.get(r)
    }, s = JSON.stringify(n);
    this.textureDefIndexMap.has(s) || (this.textureDefIndexMap.set(s, this.jsonDoc.json.textures.length), this.jsonDoc.json.textures.push(n));
    const c = {
      index: this.textureDefIndexMap.get(s)
    };
    return t.getTexCoord() !== 0 && (c.texCoord = t.getTexCoord()), Object.keys(t.getExtras()).length > 0 && (c.extras = t.getExtras()), this.textureInfoDefMap.set(t, c), c;
  }
  createPropertyDef(e) {
    const t = {};
    return e.getName() && (t.name = e.getName()), Object.keys(e.getExtras()).length > 0 && (t.extras = e.getExtras()), t;
  }
  createAccessorDef(e) {
    const t = this.createPropertyDef(e);
    return t.type = e.getType(), t.componentType = e.getComponentType(), t.count = e.getCount(), this._doc.getGraph().listParentEdges(e).some((r) => r.getName() === "attributes" && r.getAttributes().key === "POSITION" || r.getName() === "input") && (t.max = e.getMax([]).map(Math.fround), t.min = e.getMin([]).map(Math.fround)), e.getNormalized() && (t.normalized = e.getNormalized()), t;
  }
  createImageData(e, t, a) {
    if (this.options.format === dt.GLB)
      this.imageBufferViews.push(t), e.bufferView = this.jsonDoc.json.bufferViews.length, this.jsonDoc.json.bufferViews.push({
        buffer: 0,
        byteOffset: -1,
        // determined while iterating buffers, in Writer.ts.
        byteLength: t.byteLength
      });
    else {
      const r = He.mimeTypeToExtension(a.getMimeType());
      e.uri = this.imageURIGenerator.createURI(a, r), this.assignResourceURI(e.uri, t, !1);
    }
  }
  assignResourceURI(e, t, a) {
    const r = this.jsonDoc.resources;
    if (!(e in r)) {
      r[e] = t;
      return;
    }
    if (t === r[e]) {
      this.logger.warn(`Duplicate resource URI, "${e}".`);
      return;
    }
    const n = `Resource URI "${e}" already assigned to different data.`;
    if (!a) {
      this.logger.warn(n);
      return;
    }
    throw new Error(n);
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
    if (e.getSparse()) return Me.SPARSE;
    for (const a of this._doc.getGraph().listParentEdges(e)) {
      const {
        usage: r
      } = a.getAttributes();
      if (r) return r;
      a.getParent().propertyType !== F.ROOT && this.logger.warn(`Missing attribute ".usage" on edge, "${a.getName()}".`);
    }
    return Me.OTHER;
  }
  /**
   * Sets usage for the given accessor. Some accessor types must be grouped into
   * buffer views with like accessors. This includes the specified buffer view "targets", but
   * also implicit usage like IBMs or instanced mesh attributes. If unspecified, an accessor
   * will be grouped with other accessors of unspecified usage.
   */
  addAccessorToUsageGroup(e, t) {
    const a = this._accessorUsageMap.get(e);
    if (a && a !== t)
      throw new Error(`Accessor with usage "${a}" cannot be reused as "${t}".`);
    return this._accessorUsageMap.set(e, t), this;
  }
}
Ve.BufferViewTarget = Sn;
Ve.BufferViewUsage = Me;
Ve.USAGE_TO_TARGET = {
  [Me.ARRAY_BUFFER]: Sn.ARRAY_BUFFER,
  [Me.ELEMENT_ARRAY_BUFFER]: Sn.ELEMENT_ARRAY_BUFFER
};
class Ts {
  constructor(e, t) {
    this.multiple = void 0, this.basename = void 0, this.counter = {}, this.multiple = e, this.basename = t;
  }
  createURI(e, t) {
    if (e.getURI())
      return e.getURI();
    if (this.multiple) {
      const a = this.basename(e);
      return this.counter[a] = this.counter[a] || 1, `${a}_${this.counter[a]++}.${t}`;
    } else
      return `${this.basename(e)}.${t}`;
  }
}
function Ao(o, e) {
  const t = o.getGraph().listParentEdges(e).find((a) => a.getParent() !== o.getRoot());
  return t ? t.getName().replace(/texture$/i, "") : "";
}
const {
  BufferViewUsage: Bn
} = Ve, {
  UNSIGNED_INT: Eo,
  UNSIGNED_SHORT: Io,
  UNSIGNED_BYTE: jo
} = q.ComponentType, Ro = /* @__PURE__ */ new Set([F.ACCESSOR, F.BUFFER, F.MATERIAL, F.MESH]);
class wo {
  static write(e, t) {
    const a = e.getGraph(), r = e.getRoot(), n = {
      asset: Ie({
        generator: `glTF-Transform ${Vs}`
      }, r.getAsset()),
      extras: Ie({}, r.getExtras())
    }, s = {
      json: n,
      resources: {}
    }, c = new Ve(e, s, t), d = t.logger || Fe.DEFAULT_INSTANCE, y = new Set(t.extensions.map((l) => l.EXTENSION_NAME)), _ = e.getRoot().listExtensionsUsed().filter((l) => y.has(l.extensionName)).sort((l, S) => l.extensionName > S.extensionName ? 1 : -1), g = e.getRoot().listExtensionsRequired().filter((l) => y.has(l.extensionName)).sort((l, S) => l.extensionName > S.extensionName ? 1 : -1);
    _.length < e.getRoot().listExtensionsUsed().length && d.warn("Some extensions were not registered for I/O, and will not be written.");
    for (const l of _) {
      const S = l.prewriteTypes.filter((I) => !Ro.has(I));
      S.length && d.warn(`Prewrite hooks for some types (${S.join()}), requested by extension ${l.extensionName}, are unsupported. Please file an issue or a PR.`);
      for (const I of l.writeDependencies)
        l.install(I, t.dependencies[I]);
    }
    function w(l, S, I, k) {
      const v = [];
      let O = 0;
      for (const C of l) {
        const D = c.createAccessorDef(C);
        D.bufferView = n.bufferViews.length;
        const B = C.getArray(), L = Z.pad(Z.toView(B));
        D.byteOffset = O, O += L.byteLength, v.push(L), c.accessorIndexMap.set(C, n.accessors.length), n.accessors.push(D);
      }
      const m = Z.concat(v), R = {
        buffer: S,
        byteOffset: I,
        byteLength: m.byteLength
      };
      return k && (R.target = k), n.bufferViews.push(R), {
        buffers: v,
        byteLength: O
      };
    }
    function E(l, S, I) {
      const k = l[0].getCount();
      let v = 0;
      for (const D of l) {
        const B = c.createAccessorDef(D);
        B.bufferView = n.bufferViews.length, B.byteOffset = v;
        const L = D.getElementSize(), G = D.getComponentSize();
        v += Z.padNumber(L * G), c.accessorIndexMap.set(D, n.accessors.length), n.accessors.push(B);
      }
      const O = k * v, m = new ArrayBuffer(O), R = new DataView(m);
      for (let D = 0; D < k; D++) {
        let B = 0;
        for (const L of l) {
          const G = L.getElementSize(), H = L.getComponentSize(), P = L.getComponentType(), V = L.getArray();
          for (let K = 0; K < G; K++) {
            const f = D * v + B + K * H, Q = V[D * G + K];
            switch (P) {
              case q.ComponentType.FLOAT:
                R.setFloat32(f, Q, !0);
                break;
              case q.ComponentType.BYTE:
                R.setInt8(f, Q);
                break;
              case q.ComponentType.SHORT:
                R.setInt16(f, Q, !0);
                break;
              case q.ComponentType.UNSIGNED_BYTE:
                R.setUint8(f, Q);
                break;
              case q.ComponentType.UNSIGNED_SHORT:
                R.setUint16(f, Q, !0);
                break;
              case q.ComponentType.UNSIGNED_INT:
                R.setUint32(f, Q, !0);
                break;
              default:
                throw new Error("Unexpected component type: " + P);
            }
          }
          B += Z.padNumber(G * H);
        }
      }
      const C = {
        buffer: S,
        byteOffset: I,
        byteLength: O,
        byteStride: v,
        target: Ve.BufferViewTarget.ARRAY_BUFFER
      };
      return n.bufferViews.push(C), {
        byteLength: O,
        buffers: [new Uint8Array(m)]
      };
    }
    function T(l, S, I) {
      const k = [];
      let v = 0;
      const O = /* @__PURE__ */ new Map();
      let m = -1 / 0, R = !1;
      for (const P of l) {
        const V = c.createAccessorDef(P);
        n.accessors.push(V), c.accessorIndexMap.set(P, n.accessors.length - 1);
        const K = [], f = [], Q = [], oe = new Array(P.getElementSize()).fill(0);
        for (let W = 0, i = P.getCount(); W < i; W++)
          if (P.getElement(W, Q), !ne.eq(Q, oe, 0)) {
            m = Math.max(W, m), K.push(W);
            for (let Be = 0; Be < Q.length; Be++) f.push(Q[Be]);
          }
        const ae = K.length, se = {
          accessorDef: V,
          count: ae
        };
        if (O.set(P, se), ae === 0) continue;
        ae > P.getCount() / 2 && (R = !0);
        const te = qn[P.getComponentType()];
        se.indices = K, se.values = new te(f);
      }
      if (!Number.isFinite(m))
        return {
          buffers: k,
          byteLength: v
        };
      R && d.warn("Some sparse accessors have >50% non-zero elements, which may increase file size.");
      const C = m < 255 ? Uint8Array : m < 65535 ? Uint16Array : Uint32Array, D = m < 255 ? jo : m < 65535 ? Io : Eo, B = {
        buffer: S,
        byteOffset: I + v,
        byteLength: 0
      };
      for (const P of l) {
        const V = O.get(P);
        if (V.count === 0) continue;
        V.indicesByteOffset = B.byteLength;
        const K = Z.pad(Z.toView(new C(V.indices)));
        k.push(K), v += K.byteLength, B.byteLength += K.byteLength;
      }
      n.bufferViews.push(B);
      const L = n.bufferViews.length - 1, G = {
        buffer: S,
        byteOffset: I + v,
        byteLength: 0
      };
      for (const P of l) {
        const V = O.get(P);
        if (V.count === 0) continue;
        V.valuesByteOffset = G.byteLength;
        const K = Z.pad(Z.toView(V.values));
        k.push(K), v += K.byteLength, G.byteLength += K.byteLength;
      }
      n.bufferViews.push(G);
      const H = n.bufferViews.length - 1;
      for (const P of l) {
        const V = O.get(P);
        V.count !== 0 && (V.accessorDef.sparse = {
          count: V.count,
          indices: {
            bufferView: L,
            byteOffset: V.indicesByteOffset,
            componentType: D
          },
          values: {
            bufferView: H,
            byteOffset: V.valuesByteOffset
          }
        });
      }
      return {
        buffers: k,
        byteLength: v
      };
    }
    if (n.accessors = [], n.bufferViews = [], n.samplers = [], n.textures = [], n.images = r.listTextures().map((l, S) => {
      const I = c.createPropertyDef(l);
      l.getMimeType() && (I.mimeType = l.getMimeType());
      const k = l.getImage();
      return k && c.createImageData(I, k, l), c.imageIndexMap.set(l, S), I;
    }), _.filter((l) => l.prewriteTypes.includes(F.ACCESSOR)).forEach((l) => l.prewrite(c, F.ACCESSOR)), r.listAccessors().forEach((l) => {
      const S = c.accessorUsageGroupedByParent, I = c.accessorParents;
      if (c.accessorIndexMap.has(l)) return;
      const k = c.getAccessorUsage(l);
      if (c.addAccessorToUsageGroup(l, k), S.has(k)) {
        const v = a.listParents(l).find((O) => O.propertyType !== F.ROOT);
        I.set(l, v);
      }
    }), _.filter((l) => l.prewriteTypes.includes(F.BUFFER)).forEach((l) => l.prewrite(c, F.BUFFER)), (r.listAccessors().length > 0 || c.otherBufferViews.size > 0 || r.listTextures().length > 0 && t.format === dt.GLB) && r.listBuffers().length === 0)
      throw new Error("Buffer required for Document resources, but none was found.");
    n.buffers = [], r.listBuffers().forEach((l, S) => {
      const I = c.createPropertyDef(l), k = c.accessorUsageGroupedByParent, v = l.listParents().filter((G) => G instanceof q), O = new Set(v.map((G) => c.accessorParents.get(G))), m = new Map(Array.from(O).map((G, H) => [G, H])), R = {};
      for (const G of v) {
        var C;
        if (c.accessorIndexMap.has(G)) continue;
        const H = c.getAccessorUsage(G);
        let P = H;
        if (k.has(H)) {
          const V = c.accessorParents.get(G);
          P += `:${m.get(V)}`;
        }
        R[C = P] || (R[C] = {
          usage: H,
          accessors: []
        }), R[P].accessors.push(G);
      }
      const D = [], B = n.buffers.length;
      let L = 0;
      for (const {
        usage: G,
        accessors: H
      } of Object.values(R))
        if (G === Bn.ARRAY_BUFFER && t.vertexLayout === Hn.INTERLEAVED) {
          const P = E(H, B, L);
          L += P.byteLength;
          for (const V of P.buffers)
            D.push(V);
        } else if (G === Bn.ARRAY_BUFFER)
          for (const P of H) {
            const V = E([P], B, L);
            L += V.byteLength;
            for (const K of V.buffers)
              D.push(K);
          }
        else if (G === Bn.SPARSE) {
          const P = T(H, B, L);
          L += P.byteLength;
          for (const V of P.buffers)
            D.push(V);
        } else if (G === Bn.ELEMENT_ARRAY_BUFFER) {
          const P = Ve.BufferViewTarget.ELEMENT_ARRAY_BUFFER, V = w(H, B, L, P);
          L += V.byteLength;
          for (const K of V.buffers)
            D.push(K);
        } else {
          const P = w(H, B, L);
          L += P.byteLength;
          for (const V of P.buffers)
            D.push(V);
        }
      if (c.imageBufferViews.length && S === 0) {
        for (let G = 0; G < c.imageBufferViews.length; G++)
          if (n.bufferViews[n.images[G].bufferView].byteOffset = L, L += c.imageBufferViews[G].byteLength, D.push(c.imageBufferViews[G]), L % 8) {
            const H = 8 - L % 8;
            L += H, D.push(new Uint8Array(H));
          }
      }
      if (c.otherBufferViews.has(l))
        for (const G of c.otherBufferViews.get(l))
          n.bufferViews.push({
            buffer: B,
            byteOffset: L,
            byteLength: G.byteLength
          }), c.otherBufferViewsIndexMap.set(G, n.bufferViews.length - 1), L += G.byteLength, D.push(G);
      if (L) {
        let G;
        t.format === dt.GLB ? G = vt : (G = c.bufferURIGenerator.createURI(l, "bin"), I.uri = G), I.byteLength = L, c.assignResourceURI(G, Z.concat(D), !0);
      }
      n.buffers.push(I), c.bufferIndexMap.set(l, S);
    }), r.listAccessors().find((l) => !l.getBuffer()) && d.warn("Skipped writing one or more Accessors: no Buffer assigned."), _.filter((l) => l.prewriteTypes.includes(F.MATERIAL)).forEach((l) => l.prewrite(c, F.MATERIAL)), n.materials = r.listMaterials().map((l, S) => {
      const I = c.createPropertyDef(l);
      if (l.getAlphaMode() !== Et.AlphaMode.OPAQUE && (I.alphaMode = l.getAlphaMode()), l.getAlphaMode() === Et.AlphaMode.MASK && (I.alphaCutoff = l.getAlphaCutoff()), l.getDoubleSided() && (I.doubleSided = !0), I.pbrMetallicRoughness = {}, ne.eq(l.getBaseColorFactor(), [1, 1, 1, 1]) || (I.pbrMetallicRoughness.baseColorFactor = l.getBaseColorFactor()), ne.eq(l.getEmissiveFactor(), [0, 0, 0]) || (I.emissiveFactor = l.getEmissiveFactor()), l.getRoughnessFactor() !== 1 && (I.pbrMetallicRoughness.roughnessFactor = l.getRoughnessFactor()), l.getMetallicFactor() !== 1 && (I.pbrMetallicRoughness.metallicFactor = l.getMetallicFactor()), l.getBaseColorTexture()) {
        const k = l.getBaseColorTexture(), v = l.getBaseColorTextureInfo();
        I.pbrMetallicRoughness.baseColorTexture = c.createTextureInfoDef(k, v);
      }
      if (l.getEmissiveTexture()) {
        const k = l.getEmissiveTexture(), v = l.getEmissiveTextureInfo();
        I.emissiveTexture = c.createTextureInfoDef(k, v);
      }
      if (l.getNormalTexture()) {
        const k = l.getNormalTexture(), v = l.getNormalTextureInfo(), O = c.createTextureInfoDef(k, v);
        l.getNormalScale() !== 1 && (O.scale = l.getNormalScale()), I.normalTexture = O;
      }
      if (l.getOcclusionTexture()) {
        const k = l.getOcclusionTexture(), v = l.getOcclusionTextureInfo(), O = c.createTextureInfoDef(k, v);
        l.getOcclusionStrength() !== 1 && (O.strength = l.getOcclusionStrength()), I.occlusionTexture = O;
      }
      if (l.getMetallicRoughnessTexture()) {
        const k = l.getMetallicRoughnessTexture(), v = l.getMetallicRoughnessTextureInfo();
        I.pbrMetallicRoughness.metallicRoughnessTexture = c.createTextureInfoDef(k, v);
      }
      return c.materialIndexMap.set(l, S), I;
    }), _.filter((l) => l.prewriteTypes.includes(F.MESH)).forEach((l) => l.prewrite(c, F.MESH)), n.meshes = r.listMeshes().map((l, S) => {
      const I = c.createPropertyDef(l);
      let k = null;
      return I.primitives = l.listPrimitives().map((v) => {
        const O = {
          attributes: {}
        };
        O.mode = v.getMode();
        const m = v.getMaterial();
        m && (O.material = c.materialIndexMap.get(m)), Object.keys(v.getExtras()).length && (O.extras = v.getExtras());
        const R = v.getIndices();
        R && (O.indices = c.accessorIndexMap.get(R));
        for (const C of v.listSemantics())
          O.attributes[C] = c.accessorIndexMap.get(v.getAttribute(C));
        for (const C of v.listTargets()) {
          const D = {};
          for (const B of C.listSemantics())
            D[B] = c.accessorIndexMap.get(C.getAttribute(B));
          O.targets = O.targets || [], O.targets.push(D);
        }
        return v.listTargets().length && !k && (k = v.listTargets().map((C) => C.getName())), O;
      }), l.getWeights().length && (I.weights = l.getWeights()), k && (I.extras = I.extras || {}, I.extras.targetNames = k), c.meshIndexMap.set(l, S), I;
    }), n.cameras = r.listCameras().map((l, S) => {
      const I = c.createPropertyDef(l);
      if (I.type = l.getType(), I.type === jt.Type.PERSPECTIVE) {
        I.perspective = {
          znear: l.getZNear(),
          zfar: l.getZFar(),
          yfov: l.getYFov()
        };
        const k = l.getAspectRatio();
        k !== null && (I.perspective.aspectRatio = k);
      } else
        I.orthographic = {
          znear: l.getZNear(),
          zfar: l.getZFar(),
          xmag: l.getXMag(),
          ymag: l.getYMag()
        };
      return c.cameraIndexMap.set(l, S), I;
    }), n.nodes = r.listNodes().map((l, S) => {
      const I = c.createPropertyDef(l);
      return ne.eq(l.getTranslation(), [0, 0, 0]) || (I.translation = l.getTranslation()), ne.eq(l.getRotation(), [0, 0, 0, 1]) || (I.rotation = l.getRotation()), ne.eq(l.getScale(), [1, 1, 1]) || (I.scale = l.getScale()), l.getWeights().length && (I.weights = l.getWeights()), c.nodeIndexMap.set(l, S), I;
    }), n.skins = r.listSkins().map((l, S) => {
      const I = c.createPropertyDef(l), k = l.getInverseBindMatrices();
      k && (I.inverseBindMatrices = c.accessorIndexMap.get(k));
      const v = l.getSkeleton();
      return v && (I.skeleton = c.nodeIndexMap.get(v)), I.joints = l.listJoints().map((O) => c.nodeIndexMap.get(O)), c.skinIndexMap.set(l, S), I;
    }), r.listNodes().forEach((l, S) => {
      const I = n.nodes[S], k = l.getMesh();
      k && (I.mesh = c.meshIndexMap.get(k));
      const v = l.getCamera();
      v && (I.camera = c.cameraIndexMap.get(v));
      const O = l.getSkin();
      O && (I.skin = c.skinIndexMap.get(O)), l.listChildren().length > 0 && (I.children = l.listChildren().map((m) => c.nodeIndexMap.get(m)));
    }), n.animations = r.listAnimations().map((l, S) => {
      const I = c.createPropertyDef(l), k = /* @__PURE__ */ new Map();
      return I.samplers = l.listSamplers().map((v, O) => {
        const m = c.createPropertyDef(v);
        return m.input = c.accessorIndexMap.get(v.getInput()), m.output = c.accessorIndexMap.get(v.getOutput()), m.interpolation = v.getInterpolation(), k.set(v, O), m;
      }), I.channels = l.listChannels().map((v) => {
        const O = c.createPropertyDef(v);
        return O.sampler = k.get(v.getSampler()), O.target = {
          node: c.nodeIndexMap.get(v.getTargetNode()),
          path: v.getTargetPath()
        }, O;
      }), c.animationIndexMap.set(l, S), I;
    }), n.scenes = r.listScenes().map((l, S) => {
      const I = c.createPropertyDef(l);
      return I.nodes = l.listChildren().map((k) => c.nodeIndexMap.get(k)), c.sceneIndexMap.set(l, S), I;
    });
    const A = r.getDefaultScene();
    return A && (n.scene = r.listScenes().indexOf(A)), n.extensionsUsed = _.map((l) => l.extensionName), n.extensionsRequired = g.map((l) => l.extensionName), _.forEach((l) => l.write(c)), So(n), s;
  }
}
function So(o) {
  const e = [];
  for (const t in o) {
    const a = o[t];
    (Array.isArray(a) && a.length === 0 || a === null || a === "" || a && typeof a == "object" && Object.keys(a).length === 0) && e.push(t);
  }
  for (const t of e)
    delete o[t];
}
var Wn;
(function(o) {
  o[o.JSON = 1313821514] = "JSON", o[o.BIN = 5130562] = "BIN";
})(Wn || (Wn = {}));
class Mo {
  constructor() {
    this._logger = Fe.DEFAULT_INSTANCE, this._extensions = /* @__PURE__ */ new Set(), this._dependencies = {}, this._vertexLayout = Hn.INTERLEAVED, this.lastReadBytes = 0, this.lastWriteBytes = 0;
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
    const a = xs(t) ? this._binaryToJSON(t) : {
      json: JSON.parse(Z.decodeText(t)),
      resources: {}
    };
    return await this._readResourcesExternal(a, this.dirname(e)), this._readResourcesInternal(a), a;
  }
  /** Converts glTF-formatted JSON and a resource map to a {@link Document}. */
  async readJSON(e) {
    return e = this._copyJSON(e), this._readResourcesInternal(e), yo.read(e, {
      extensions: Array.from(this._extensions),
      dependencies: this._dependencies,
      logger: this._logger
    });
  }
  /** Converts a GLB-formatted Uint8Array to a {@link JSONDocument}. */
  async binaryToJSON(e) {
    const t = this._binaryToJSON(Z.assertView(e));
    this._readResourcesInternal(t);
    const a = t.json;
    if (a.buffers && a.buffers.some((r) => No(t, r)))
      throw new Error("Cannot resolve external buffers with binaryToJSON().");
    if (a.images && a.images.some((r) => vo(t, r)))
      throw new Error("Cannot resolve external images with binaryToJSON().");
    return t;
  }
  /** Converts a GLB-formatted Uint8Array to a {@link Document}. */
  async readBinary(e) {
    return this.readJSON(await this.binaryToJSON(Z.assertView(e)));
  }
  /**********************************************************************************************
   * Public Write API.
   */
  /** Converts a {@link Document} to glTF-formatted JSON and a resource map. */
  async writeJSON(e, t = {}) {
    if (t.format === dt.GLB && e.getRoot().listBuffers().length > 1)
      throw new Error("GLB must have 0–1 buffers.");
    return wo.write(e, {
      format: t.format || dt.GLTF,
      basename: t.basename || "",
      logger: this._logger,
      vertexLayout: this._vertexLayout,
      dependencies: Ie({}, this._dependencies),
      extensions: Array.from(this._extensions)
    });
  }
  /** Converts a {@link Document} to a GLB-formatted Uint8Array. */
  async writeBinary(e) {
    const {
      json: t,
      resources: a
    } = await this.writeJSON(e, {
      format: dt.GLB
    }), r = new Uint32Array([1179937895, 2, 12]), n = JSON.stringify(t), s = Z.pad(Z.encodeText(n), 32), c = Z.toView(new Uint32Array([s.byteLength, 1313821514])), d = Z.concat([c, s]);
    r[r.length - 1] += d.byteLength;
    const y = Object.values(a)[0];
    if (!y || !y.byteLength)
      return Z.concat([Z.toView(r), d]);
    const _ = Z.pad(y, 0), g = Z.toView(new Uint32Array([_.byteLength, 5130562])), w = Z.concat([g, _]);
    return r[r.length - 1] += w.byteLength, Z.concat([Z.toView(r), d, w]);
  }
  /**********************************************************************************************
   * Internal.
   */
  async _readResourcesExternal(e, t) {
    var a = this;
    const r = e.json.images || [], n = e.json.buffers || [], s = [...r, ...n].map(async function(c) {
      const d = c.uri;
      if (!d || d.match(/data:/)) return Promise.resolve();
      e.resources[d] = await a.readURI(a.resolve(t, d), "view"), a.lastReadBytes += e.resources[d].byteLength;
    });
    await Promise.all(s);
  }
  _readResourcesInternal(e) {
    function t(n) {
      if (n.uri) {
        if (n.uri in e.resources) {
          Z.assertView(e.resources[n.uri]);
          return;
        }
        if (n.uri.match(/data:/)) {
          const s = `__${bo()}.${kt.extension(n.uri)}`;
          e.resources[s] = Z.createBufferFromDataURI(n.uri), n.uri = s;
        }
      }
    }
    (e.json.images || []).forEach((n) => {
      if (n.bufferView === void 0 && n.uri === void 0)
        throw new Error("Missing resource URI or buffer view.");
      t(n);
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
      buffers: a
    } = e.json;
    return e = {
      json: Ie({}, e.json),
      resources: Ie({}, e.resources)
    }, t && (e.json.images = t.map((r) => Ie({}, r))), a && (e.json.buffers = a.map((r) => Ie({}, r))), e;
  }
  /** Internal version of binaryToJSON; does not warn about external resources. */
  _binaryToJSON(e) {
    if (!xs(e))
      throw new Error("Invalid glTF 2.0 binary.");
    const t = new Uint32Array(e.buffer, e.byteOffset + 12, 2);
    if (t[1] !== Wn.JSON)
      throw new Error("Missing required GLB JSON chunk.");
    const a = 20, r = t[0], n = Z.decodeText(Z.toView(e, a, r)), s = JSON.parse(n), c = a + r;
    if (e.byteLength <= c)
      return {
        json: s,
        resources: {}
      };
    const d = new Uint32Array(e.buffer, e.byteOffset + c, 2);
    if (d[1] !== Wn.BIN)
      return {
        json: s,
        resources: {}
      };
    const y = d[0], _ = Z.toView(e, c + 8, y);
    return {
      json: s,
      resources: {
        [vt]: _
      }
    };
  }
}
function No(o, e) {
  return e.uri !== void 0 && !(e.uri in o.resources);
}
function vo(o, e) {
  return e.uri !== void 0 && !(e.uri in o.resources) && e.bufferView === void 0;
}
function xs(o) {
  if (o.byteLength < 3 * Uint32Array.BYTES_PER_ELEMENT) return !1;
  const e = new Uint32Array(o.buffer, o.byteOffset, 3);
  return e[0] === 1179937895 && e[1] === 2;
}
class ko extends Mo {
  /**
   * Constructs a new WebIO service. Instances are reusable.
   * @param fetchConfig Configuration object for Fetch API.
   */
  constructor(e = Rn.DEFAULT_INIT) {
    super(), this._fetchConfig = void 0, this._fetchConfig = e;
  }
  async readURI(e, t) {
    const a = await fetch(e, this._fetchConfig);
    switch (t) {
      case "view":
        return new Uint8Array(await a.arrayBuffer());
      case "text":
        return a.text();
    }
  }
  resolve(e, t) {
    return Rn.resolve(e, t);
  }
  dirname(e) {
    return Rn.dirname(e);
  }
}
const Co = 0, Oo = 0, Do = 0, Fo = 2, Uo = 0, Bo = 163, Go = 166, Po = 0, Lo = 2, zo = 1, Ho = 64, Vo = 0;
function Wo() {
  return {
    vkFormat: Vo,
    typeSize: 1,
    pixelWidth: 0,
    pixelHeight: 0,
    pixelDepth: 0,
    layerCount: 0,
    faceCount: 1,
    levelCount: 0,
    supercompressionScheme: Co,
    levels: [],
    dataFormatDescriptor: [{
      vendorId: Do,
      descriptorType: Oo,
      versionNumber: Fo,
      colorModel: Uo,
      colorPrimaries: zo,
      transferFunction: Lo,
      flags: Po,
      texelBlockDimension: [0, 0, 0, 0],
      bytesPlane: [0, 0, 0, 0, 0, 0, 0, 0],
      samples: []
    }],
    keyValue: {},
    globalData: null
  };
}
class Tn {
  constructor(e, t, a, r) {
    this._dataView = void 0, this._littleEndian = void 0, this._offset = void 0, this._dataView = new DataView(e.buffer, e.byteOffset + t, a), this._littleEndian = r, this._offset = 0;
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
    const e = this._dataView.getUint32(this._offset, this._littleEndian), t = this._dataView.getUint32(this._offset + 4, this._littleEndian), a = e + 2 ** 32 * t;
    return this._offset += 8, a;
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
    const a = this._offset;
    let r = 0;
    for (; this._dataView.getUint8(this._offset) !== t && r < e; )
      r++, this._offset++;
    return r < e && this._offset++, new Uint8Array(this._dataView.buffer, this._dataView.byteOffset + a, r);
  }
}
const Ee = [
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
function As(o) {
  return new TextDecoder().decode(o);
}
function ea(o) {
  const e = new Uint8Array(o.buffer, o.byteOffset, Ee.length);
  if (e[0] !== Ee[0] || // '´'
  e[1] !== Ee[1] || // 'K'
  e[2] !== Ee[2] || // 'T'
  e[3] !== Ee[3] || // 'X'
  e[4] !== Ee[4] || // ' '
  e[5] !== Ee[5] || // '2'
  e[6] !== Ee[6] || // '0'
  e[7] !== Ee[7] || // 'ª'
  e[8] !== Ee[8] || // '\r'
  e[9] !== Ee[9] || // '\n'
  e[10] !== Ee[10] || // '\x1A'
  e[11] !== Ee[11])
    throw new Error("Missing KTX 2.0 identifier.");
  const t = Wo(), a = 17 * Uint32Array.BYTES_PER_ELEMENT, r = new Tn(o, Ee.length, a, !0);
  t.vkFormat = r._nextUint32(), t.typeSize = r._nextUint32(), t.pixelWidth = r._nextUint32(), t.pixelHeight = r._nextUint32(), t.pixelDepth = r._nextUint32(), t.layerCount = r._nextUint32(), t.faceCount = r._nextUint32(), t.levelCount = r._nextUint32(), t.supercompressionScheme = r._nextUint32();
  const n = r._nextUint32(), s = r._nextUint32(), c = r._nextUint32(), d = r._nextUint32(), y = r._nextUint64(), _ = r._nextUint64(), g = Math.max(t.levelCount, 1) * 3 * 8, w = new Tn(o, Ee.length + a, g, !0);
  for (let le = 0, he = Math.max(t.levelCount, 1); le < he; le++)
    t.levels.push({
      levelData: new Uint8Array(o.buffer, o.byteOffset + w._nextUint64(), w._nextUint64()),
      uncompressedByteLength: w._nextUint64()
    });
  const E = new Tn(o, n, s, !0);
  E._skip(4);
  const T = E._nextUint16(), j = E._nextUint16(), A = E._nextUint16(), l = E._nextUint16(), S = E._nextUint8(), I = E._nextUint8(), k = E._nextUint8(), v = E._nextUint8(), O = [E._nextUint8(), E._nextUint8(), E._nextUint8(), E._nextUint8()], m = [E._nextUint8(), E._nextUint8(), E._nextUint8(), E._nextUint8(), E._nextUint8(), E._nextUint8(), E._nextUint8(), E._nextUint8()], C = {
    vendorId: T,
    descriptorType: j,
    versionNumber: A,
    colorModel: S,
    colorPrimaries: I,
    transferFunction: k,
    flags: v,
    texelBlockDimension: O,
    bytesPlane: m,
    samples: []
  }, L = (l / 4 - 6) / 4;
  for (let le = 0; le < L; le++) {
    const he = {
      bitOffset: E._nextUint16(),
      bitLength: E._nextUint8(),
      channelType: E._nextUint8(),
      samplePosition: [E._nextUint8(), E._nextUint8(), E._nextUint8(), E._nextUint8()],
      sampleLower: Number.NEGATIVE_INFINITY,
      sampleUpper: Number.POSITIVE_INFINITY
    };
    he.channelType & Ho ? (he.sampleLower = E._nextInt32(), he.sampleUpper = E._nextInt32()) : (he.sampleLower = E._nextUint32(), he.sampleUpper = E._nextUint32()), C.samples[le] = he;
  }
  t.dataFormatDescriptor.length = 0, t.dataFormatDescriptor.push(C);
  const G = new Tn(o, c, d, !0);
  for (; G._offset < d; ) {
    const le = G._nextUint32(), he = G._scan(le), Re = As(he);
    if (t.keyValue[Re] = G._nextUint8Array(le - he.byteLength - 1), Re.match(/^ktx/i)) {
      const _e = As(t.keyValue[Re]);
      t.keyValue[Re] = _e.substring(0, _e.lastIndexOf("\0"));
    }
    const Le = le % 4 ? 4 - le % 4 : 0;
    G._skip(Le);
  }
  if (_ <= 0) return t;
  const H = new Tn(o, y, _, !0), P = H._nextUint16(), V = H._nextUint16(), K = H._nextUint32(), f = H._nextUint32(), Q = H._nextUint32(), oe = H._nextUint32(), ae = [];
  for (let le = 0, he = Math.max(t.levelCount, 1); le < he; le++)
    ae.push({
      imageFlags: H._nextUint32(),
      rgbSliceByteOffset: H._nextUint32(),
      rgbSliceByteLength: H._nextUint32(),
      alphaSliceByteOffset: H._nextUint32(),
      alphaSliceByteLength: H._nextUint32()
    });
  const se = y + H._offset, te = se + K, W = te + f, i = W + Q, Be = new Uint8Array(o.buffer, o.byteOffset + se, K), ge = new Uint8Array(o.buffer, o.byteOffset + te, f), lt = new Uint8Array(o.buffer, o.byteOffset + W, Q), ct = new Uint8Array(o.buffer, o.byteOffset + i, oe);
  return t.globalData = {
    endpointCount: P,
    selectorCount: V,
    imageDescs: ae,
    endpointsData: Be,
    selectorsData: ge,
    tablesData: lt,
    extendedData: ct
  }, t;
}
const qe = "EXT_mesh_gpu_instancing", ye = "EXT_meshopt_compression", An = "EXT_texture_webp", En = "EXT_texture_avif", be = "KHR_draco_mesh_compression", Ce = "KHR_lights_punctual", Xe = "KHR_materials_anisotropy", Je = "KHR_materials_clearcoat", Ye = "KHR_materials_diffuse_transmission", Qe = "KHR_materials_dispersion", Ze = "KHR_materials_emissive_strength", $e = "KHR_materials_ior", et = "KHR_materials_iridescence", tt = "KHR_materials_pbrSpecularGlossiness", rt = "KHR_materials_sheen", nt = "KHR_materials_specular", at = "KHR_materials_transmission", ft = "KHR_materials_unlit", st = "KHR_materials_volume", xe = "KHR_materials_variants", ri = "KHR_mesh_quantization", In = "KHR_texture_basisu", it = "KHR_texture_transform", Oe = "KHR_xmp_json_ld", oa = "INSTANCE_ATTRIBUTE";
class ni extends pe {
  init() {
    this.extensionName = qe, this.propertyType = "InstancedMesh", this.parentTypes = [F.NODE];
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      attributes: new Pe()
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
      usage: oa
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
ni.EXTENSION_NAME = qe;
class ai extends fe {
  constructor(...e) {
    super(...e), this.extensionName = qe, this.provideTypes = [F.NODE], this.prewriteTypes = [F.ACCESSOR];
  }
  /** Creates a new InstancedMesh property for use on a {@link Node}. */
  createInstancedMesh() {
    return new ni(this.document.getGraph());
  }
  /** @hidden */
  read(e) {
    return (e.jsonDoc.json.nodes || []).forEach((r, n) => {
      if (!r.extensions || !r.extensions[qe]) return;
      const s = r.extensions[qe], c = this.createInstancedMesh();
      for (const d in s.attributes)
        c.setAttribute(d, e.accessors[s.attributes[d]]);
      e.nodes[n].setExtension(qe, c);
    }), this;
  }
  /** @hidden */
  prewrite(e) {
    e.accessorUsageGroupedByParent.add(oa);
    for (const t of this.properties)
      for (const a of t.listAttributes())
        e.addAccessorToUsageGroup(a, oa);
    return this;
  }
  /** @hidden */
  write(e) {
    const t = e.jsonDoc;
    return this.document.getRoot().listNodes().forEach((a) => {
      const r = a.getExtension(qe);
      if (r) {
        const n = e.nodeIndexMap.get(a), s = t.json.nodes[n], c = {
          attributes: {}
        };
        r.listSemantics().forEach((d) => {
          const y = r.getAttribute(d);
          c.attributes[d] = e.accessorIndexMap.get(y);
        }), s.extensions = s.extensions || {}, s.extensions[qe] = c;
      }
    }), this;
  }
}
ai.EXTENSION_NAME = qe;
function ot() {
  return ot = Object.assign ? Object.assign.bind() : function(o) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var a in t) ({}).hasOwnProperty.call(t, a) && (o[a] = t[a]);
    }
    return o;
  }, ot.apply(null, arguments);
}
var Mn;
(function(o) {
  o.QUANTIZE = "quantize", o.FILTER = "filter";
})(Mn || (Mn = {}));
var Nt;
(function(o) {
  o.ATTRIBUTES = "ATTRIBUTES", o.TRIANGLES = "TRIANGLES", o.INDICES = "INDICES";
})(Nt || (Nt = {}));
var de;
(function(o) {
  o.NONE = "NONE", o.OCTAHEDRAL = "OCTAHEDRAL", o.QUATERNION = "QUATERNION", o.EXPONENTIAL = "EXPONENTIAL";
})(de || (de = {}));
function Ko(o) {
  return !o.extensions || !o.extensions[ye] ? !1 : !!o.extensions[ye].fallback;
}
const {
  BYTE: qo,
  SHORT: Es,
  FLOAT: Xo
} = q.ComponentType, {
  encodeNormalizedInt: Is,
  decodeNormalizedInt: ca
} = ne;
function Jo(o, e, t, a) {
  const {
    filter: r,
    bits: n
  } = a, s = {
    array: o.getArray(),
    byteStride: o.getElementSize() * o.getComponentSize(),
    componentType: o.getComponentType(),
    normalized: o.getNormalized()
  };
  if (t !== Nt.ATTRIBUTES) return s;
  if (r !== de.NONE) {
    let c = o.getNormalized() ? Yo(o) : new Float32Array(s.array);
    switch (r) {
      case de.EXPONENTIAL:
        s.byteStride = o.getElementSize() * 4, s.componentType = Xo, s.normalized = !1, s.array = e.encodeFilterExp(c, o.getCount(), s.byteStride, n);
        break;
      case de.OCTAHEDRAL:
        s.byteStride = n > 8 ? 8 : 4, s.componentType = n > 8 ? Es : qo, s.normalized = !0, c = o.getElementSize() === 3 ? Zo(c) : c, s.array = e.encodeFilterOct(c, o.getCount(), s.byteStride, n);
        break;
      case de.QUATERNION:
        s.byteStride = 8, s.componentType = Es, s.normalized = !0, s.array = e.encodeFilterQuat(c, o.getCount(), s.byteStride, n);
        break;
      default:
        throw new Error("Invalid filter.");
    }
    s.min = o.getMin([]), s.max = o.getMax([]), o.getNormalized() && (s.min = s.min.map((d) => ca(d, o.getComponentType())), s.max = s.max.map((d) => ca(d, o.getComponentType()))), s.normalized && (s.min = s.min.map((d) => Is(d, s.componentType)), s.max = s.max.map((d) => Is(d, s.componentType)));
  } else s.byteStride % 4 && (s.array = Qo(s.array, o.getElementSize()), s.byteStride = s.array.byteLength / o.getCount());
  return s;
}
function Yo(o) {
  const e = o.getComponentType(), t = o.getArray(), a = new Float32Array(t.length);
  for (let r = 0; r < t.length; r++)
    a[r] = ca(t[r], e);
  return a;
}
function Qo(o, e) {
  const a = Z.padNumber(o.BYTES_PER_ELEMENT * e) / o.BYTES_PER_ELEMENT, r = o.length / e, n = new o.constructor(r * a);
  for (let s = 0; s * e < o.length; s++)
    for (let c = 0; c < e; c++)
      n[s * a + c] = o[s * e + c];
  return n;
}
function Zo(o) {
  const e = new Float32Array(o.length * 4 / 3);
  for (let t = 0, a = o.length / 3; t < a; t++)
    e[t * 4] = o[t * 3], e[t * 4 + 1] = o[t * 3 + 1], e[t * 4 + 2] = o[t * 3 + 2];
  return e;
}
function $o(o, e) {
  return e === Ve.BufferViewUsage.ELEMENT_ARRAY_BUFFER ? o.listParents().some((a) => a instanceof It && a.getMode() === It.Mode.TRIANGLES) ? Nt.TRIANGLES : Nt.INDICES : Nt.ATTRIBUTES;
}
function ec(o, e) {
  const t = e.getGraph().listParentEdges(o).filter((a) => !(a.getParent() instanceof ti));
  for (const a of t) {
    const r = a.getName(), n = a.getAttributes().key || "", s = a.getParent().propertyType === F.PRIMITIVE_TARGET;
    if (r === "indices") return {
      filter: de.NONE
    };
    if (r === "attributes") {
      if (n === "POSITION") return {
        filter: de.NONE
      };
      if (n === "TEXCOORD_0") return {
        filter: de.NONE
      };
      if (n.startsWith("JOINTS_")) return {
        filter: de.NONE
      };
      if (n.startsWith("WEIGHTS_")) return {
        filter: de.NONE
      };
      if (n === "NORMAL" || n === "TANGENT")
        return s ? {
          filter: de.NONE
        } : {
          filter: de.OCTAHEDRAL,
          bits: 8
        };
    }
    if (r === "output") {
      const c = si(o);
      return c === "rotation" ? {
        filter: de.QUATERNION,
        bits: 16
      } : c === "translation" ? {
        filter: de.EXPONENTIAL,
        bits: 12
      } : c === "scale" ? {
        filter: de.EXPONENTIAL,
        bits: 12
      } : {
        filter: de.NONE
      };
    }
    if (r === "input") return {
      filter: de.NONE
    };
    if (r === "inverseBindMatrices") return {
      filter: de.NONE
    };
  }
  return {
    filter: de.NONE
  };
}
function si(o) {
  for (const e of o.listParents())
    if (e instanceof Ot) {
      for (const t of e.listParents())
        if (t instanceof pa)
          return t.getTargetPath();
    }
  return null;
}
const js = {
  method: Mn.QUANTIZE
};
class la extends fe {
  constructor(...e) {
    super(...e), this.extensionName = ye, this.prereadTypes = [F.BUFFER, F.PRIMITIVE], this.prewriteTypes = [F.BUFFER, F.ACCESSOR], this.readDependencies = ["meshopt.decoder"], this.writeDependencies = ["meshopt.encoder"], this._decoder = null, this._decoderFallbackBufferMap = /* @__PURE__ */ new Map(), this._encoder = null, this._encoderOptions = js, this._encoderFallbackBuffer = null, this._encoderBufferViews = {}, this._encoderBufferViewData = {}, this._encoderBufferViewAccessors = {};
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
    return this._encoderOptions = ot({}, js, e), this;
  }
  /**********************************************************************************************
   * Decoding.
   */
  /** @internal Checks preconditions, decodes buffer views, and creates decoded primitives. */
  preread(e, t) {
    if (!this._decoder) {
      if (!this.isRequired()) return this;
      throw new Error(`[${ye}] Please install extension dependency, "meshopt.decoder".`);
    }
    if (!this._decoder.supported) {
      if (!this.isRequired()) return this;
      throw new Error(`[${ye}]: Missing WASM support.`);
    }
    return t === F.BUFFER ? this._prereadBuffers(e) : t === F.PRIMITIVE && this._prereadPrimitives(e), this;
  }
  /** @internal Decode buffer views. */
  _prereadBuffers(e) {
    const t = e.jsonDoc;
    (t.json.bufferViews || []).forEach((r, n) => {
      if (!r.extensions || !r.extensions[ye]) return;
      const s = r.extensions[ye], c = s.byteOffset || 0, d = s.byteLength || 0, y = s.count, _ = s.byteStride, g = new Uint8Array(y * _), w = t.json.buffers[s.buffer], E = w.uri ? t.resources[w.uri] : t.resources[vt], T = Z.toView(E, c, d);
      this._decoder.decodeGltfBuffer(g, y, _, T, s.mode, s.filter), e.bufferViews[n] = g;
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
    (t.json.bufferViews || []).forEach((r) => {
      if (!r.extensions || !r.extensions[ye]) return;
      const n = r.extensions[ye], s = e.buffers[n.buffer], c = e.buffers[r.buffer], d = t.json.buffers[r.buffer];
      Ko(d) && this._decoderFallbackBufferMap.set(c, s);
    });
  }
  /** @hidden Removes Fallback buffers, if extension is required. */
  read(e) {
    if (!this.isRequired()) return this;
    for (const [t, a] of this._decoderFallbackBufferMap) {
      for (const r of t.listParents())
        r instanceof q && r.swap(t, a);
      t.dispose();
    }
    return this;
  }
  /**********************************************************************************************
   * Encoding.
   */
  /** @internal Claims accessors that can be compressed and writes compressed buffer views. */
  prewrite(e, t) {
    return t === F.ACCESSOR ? this._prewriteAccessors(e) : t === F.BUFFER && this._prewriteBuffers(e), this;
  }
  /** @internal Claims accessors that can be compressed. */
  _prewriteAccessors(e) {
    const t = e.jsonDoc.json, a = this._encoder, r = this._encoderOptions, n = this.document.getGraph(), s = this.document.createBuffer(), c = this.document.getRoot().listBuffers().indexOf(s);
    let d = 1;
    const y = /* @__PURE__ */ new Map(), _ = (g) => {
      for (const w of n.listParents(g)) {
        if (w.propertyType === F.ROOT) continue;
        let E = y.get(g);
        return E === void 0 && y.set(g, E = d++), E;
      }
      return -1;
    };
    this._encoderFallbackBuffer = s, this._encoderBufferViews = {}, this._encoderBufferViewData = {}, this._encoderBufferViewAccessors = {};
    for (const g of this.document.getRoot().listAccessors()) {
      if (si(g) === "weights" || g.getSparse()) continue;
      const w = e.getAccessorUsage(g), E = e.accessorUsageGroupedByParent.has(w) ? _(g) : null, T = $o(g, w), j = r.method === Mn.FILTER ? ec(g, this.document) : {
        filter: de.NONE
      }, A = Jo(g, a, T, j), {
        array: l,
        byteStride: S
      } = A, I = g.getBuffer();
      if (!I) throw new Error(`${ye}: Missing buffer for accessor.`);
      const k = this.document.getRoot().listBuffers().indexOf(I), v = [w, E, T, j.filter, S, k].join(":");
      let O = this._encoderBufferViews[v], m = this._encoderBufferViewData[v], R = this._encoderBufferViewAccessors[v];
      (!O || !m) && (R = this._encoderBufferViewAccessors[v] = [], m = this._encoderBufferViewData[v] = [], O = this._encoderBufferViews[v] = {
        buffer: c,
        target: Ve.USAGE_TO_TARGET[w],
        byteOffset: 0,
        byteLength: 0,
        byteStride: w === Ve.BufferViewUsage.ARRAY_BUFFER ? S : void 0,
        extensions: {
          [ye]: {
            buffer: k,
            byteOffset: 0,
            byteLength: 0,
            mode: T,
            filter: j.filter !== de.NONE ? j.filter : void 0,
            byteStride: S,
            count: 0
          }
        }
      });
      const C = e.createAccessorDef(g);
      C.componentType = A.componentType, C.normalized = A.normalized, C.byteOffset = O.byteLength, C.min && A.min && (C.min = A.min), C.max && A.max && (C.max = A.max), e.accessorIndexMap.set(g, t.accessors.length), t.accessors.push(C), R.push(C), m.push(new Uint8Array(l.buffer, l.byteOffset, l.byteLength)), O.byteLength += l.byteLength, O.extensions.EXT_meshopt_compression.count += g.getCount();
    }
  }
  /** @internal Writes compressed buffer views. */
  _prewriteBuffers(e) {
    const t = this._encoder;
    for (const a in this._encoderBufferViews) {
      const r = this._encoderBufferViews[a], n = this._encoderBufferViewData[a], s = this.document.getRoot().listBuffers()[r.extensions[ye].buffer], c = e.otherBufferViews.get(s) || [], {
        count: d,
        byteStride: y,
        mode: _
      } = r.extensions[ye], g = Z.concat(n), w = t.encodeGltfBuffer(g, d, y, _), E = Z.pad(w);
      r.extensions[ye].byteLength = w.byteLength, n.length = 0, n.push(E), c.push(E), e.otherBufferViews.set(s, c);
    }
  }
  /** @hidden Puts encoded data into glTF output. */
  write(e) {
    let t = 0;
    for (const s in this._encoderBufferViews) {
      const c = this._encoderBufferViews[s], d = this._encoderBufferViewData[s][0], y = e.otherBufferViewsIndexMap.get(d), _ = this._encoderBufferViewAccessors[s];
      for (const T of _)
        T.bufferView = y;
      const g = e.jsonDoc.json.bufferViews[y], w = g.byteOffset || 0;
      Object.assign(g, c), g.byteOffset = t;
      const E = g.extensions[ye];
      E.byteOffset = w, t += Z.padNumber(c.byteLength);
    }
    const a = this._encoderFallbackBuffer, r = e.bufferIndexMap.get(a), n = e.jsonDoc.json.buffers[r];
    return n.byteLength = t, n.extensions = {
      [ye]: {
        fallback: !0
      }
    }, a.dispose(), this;
  }
}
la.EXTENSION_NAME = ye;
la.EncoderMethod = Mn;
class tc {
  match(e) {
    return e.length >= 12 && Z.decodeText(e.slice(4, 12)) === "ftypavif";
  }
  /**
   * Probes size of AVIF or HEIC image. Assumes a single static image, without
   * orientation or other metadata that would affect dimensions.
   */
  getSize(e) {
    if (!this.match(e)) return null;
    const t = new DataView(e.buffer, e.byteOffset, e.byteLength);
    let a = Rs(t, 0);
    if (!a) return null;
    let r = a.end;
    for (; a = Rs(t, r); )
      if (a.type === "meta")
        r = a.start + 4;
      else if (a.type === "iprp" || a.type === "ipco")
        r = a.start;
      else {
        if (a.type === "ispe")
          return [t.getUint32(a.start + 4), t.getUint32(a.start + 8)];
        if (a.type === "mdat")
          break;
        r = a.end;
      }
    return null;
  }
  getChannels(e) {
    return 4;
  }
}
class ii extends fe {
  constructor(...e) {
    super(...e), this.extensionName = En, this.prereadTypes = [F.TEXTURE];
  }
  /** @hidden */
  static register() {
    He.registerFormat("image/avif", new tc());
  }
  /** @hidden */
  preread(e) {
    return (e.jsonDoc.json.textures || []).forEach((a) => {
      a.extensions && a.extensions[En] && (a.source = a.extensions[En].source);
    }), this;
  }
  /** @hidden */
  read(e) {
    return this;
  }
  /** @hidden */
  write(e) {
    const t = e.jsonDoc;
    return this.document.getRoot().listTextures().forEach((a) => {
      if (a.getMimeType() === "image/avif") {
        const r = e.imageIndexMap.get(a);
        (t.json.textures || []).forEach((s) => {
          s.source === r && (s.extensions = s.extensions || {}, s.extensions[En] = {
            source: s.source
          }, delete s.source);
        });
      }
    }), this;
  }
}
ii.EXTENSION_NAME = En;
function Rs(o, e) {
  if (o.byteLength < 4 + e) return null;
  const t = o.getUint32(e);
  return o.byteLength < t + e || t < 8 ? null : {
    type: Z.decodeText(new Uint8Array(o.buffer, o.byteOffset + e + 4, 4)),
    start: e + 8,
    end: e + t
  };
}
class rc {
  match(e) {
    return e.length >= 12 && e[8] === 87 && e[9] === 69 && e[10] === 66 && e[11] === 80;
  }
  getSize(e) {
    const t = Z.decodeText(e.slice(0, 4)), a = Z.decodeText(e.slice(8, 12));
    if (t !== "RIFF" || a !== "WEBP") return null;
    const r = new DataView(e.buffer, e.byteOffset);
    let n = 12;
    for (; n < r.byteLength; ) {
      const s = Z.decodeText(new Uint8Array([r.getUint8(n), r.getUint8(n + 1), r.getUint8(n + 2), r.getUint8(n + 3)])), c = r.getUint32(n + 4, !0);
      if (s === "VP8 ") {
        const d = r.getInt16(n + 14, !0) & 16383, y = r.getInt16(n + 16, !0) & 16383;
        return [d, y];
      } else if (s === "VP8L") {
        const d = r.getUint8(n + 9), y = r.getUint8(n + 10), _ = r.getUint8(n + 11), g = r.getUint8(n + 12), w = 1 + ((y & 63) << 8 | d), E = 1 + ((g & 15) << 10 | _ << 2 | (y & 192) >> 6);
        return [w, E];
      }
      n += 8 + c + c % 2;
    }
    return null;
  }
  getChannels(e) {
    return 4;
  }
}
class oi extends fe {
  constructor(...e) {
    super(...e), this.extensionName = An, this.prereadTypes = [F.TEXTURE];
  }
  /** @hidden */
  static register() {
    He.registerFormat("image/webp", new rc());
  }
  /** @hidden */
  preread(e) {
    return (e.jsonDoc.json.textures || []).forEach((a) => {
      a.extensions && a.extensions[An] && (a.source = a.extensions[An].source);
    }), this;
  }
  /** @hidden */
  read(e) {
    return this;
  }
  /** @hidden */
  write(e) {
    const t = e.jsonDoc;
    return this.document.getRoot().listTextures().forEach((a) => {
      if (a.getMimeType() === "image/webp") {
        const r = e.imageIndexMap.get(a);
        (t.json.textures || []).forEach((s) => {
          s.source === r && (s.extensions = s.extensions || {}, s.extensions[An] = {
            source: s.source
          }, delete s.source);
        });
      }
    }), this;
  }
}
oi.EXTENSION_NAME = An;
let me, ci, ui;
function nc(o, e) {
  const t = new me.DecoderBuffer();
  try {
    if (t.Init(e, e.length), o.GetEncodedGeometryType(t) !== me.TRIANGULAR_MESH)
      throw new Error(`[${be}] Unknown geometry type.`);
    const r = new me.Mesh();
    if (!o.DecodeBufferToMesh(t, r).ok() || r.ptr === 0)
      throw new Error(`[${be}] Decoding failure.`);
    return r;
  } finally {
    me.destroy(t);
  }
}
function ac(o, e) {
  const a = e.num_faces() * 3;
  let r, n;
  if (e.num_points() <= 65534) {
    const s = a * Uint16Array.BYTES_PER_ELEMENT;
    r = me._malloc(s), o.GetTrianglesUInt16Array(e, s, r), n = new Uint16Array(me.HEAPU16.buffer, r, a).slice();
  } else {
    const s = a * Uint32Array.BYTES_PER_ELEMENT;
    r = me._malloc(s), o.GetTrianglesUInt32Array(e, s, r), n = new Uint32Array(me.HEAPU32.buffer, r, a).slice();
  }
  return me._free(r), n;
}
function sc(o, e, t, a) {
  const r = ui[a.componentType], n = ci[a.componentType], s = t.num_components(), d = e.num_points() * s, y = d * n.BYTES_PER_ELEMENT, _ = me._malloc(y);
  o.GetAttributeDataArrayForAllPoints(e, t, r, y, _);
  const g = new n(me.HEAPF32.buffer, _, d).slice();
  return me._free(_), g;
}
function ic(o) {
  me = o, ci = {
    [q.ComponentType.FLOAT]: Float32Array,
    [q.ComponentType.UNSIGNED_INT]: Uint32Array,
    [q.ComponentType.UNSIGNED_SHORT]: Uint16Array,
    [q.ComponentType.UNSIGNED_BYTE]: Uint8Array,
    [q.ComponentType.SHORT]: Int16Array,
    [q.ComponentType.BYTE]: Int8Array
  }, ui = {
    [q.ComponentType.FLOAT]: me.DT_FLOAT32,
    [q.ComponentType.UNSIGNED_INT]: me.DT_UINT32,
    [q.ComponentType.UNSIGNED_SHORT]: me.DT_UINT16,
    [q.ComponentType.UNSIGNED_BYTE]: me.DT_UINT8,
    [q.ComponentType.SHORT]: me.DT_INT16,
    [q.ComponentType.BYTE]: me.DT_INT8
  };
}
let ke;
var Nn;
(function(o) {
  o[o.EDGEBREAKER = 1] = "EDGEBREAKER", o[o.SEQUENTIAL = 0] = "SEQUENTIAL";
})(Nn || (Nn = {}));
var De;
(function(o) {
  o.POSITION = "POSITION", o.NORMAL = "NORMAL", o.COLOR = "COLOR", o.TEX_COORD = "TEX_COORD", o.GENERIC = "GENERIC";
})(De || (De = {}));
const fi = {
  [De.POSITION]: 14,
  [De.NORMAL]: 10,
  [De.COLOR]: 8,
  [De.TEX_COORD]: 12,
  [De.GENERIC]: 12
}, ws = {
  decodeSpeed: 5,
  encodeSpeed: 5,
  method: Nn.EDGEBREAKER,
  quantizationBits: fi,
  quantizationVolume: "mesh"
};
function oc(o) {
  ke = o;
}
function cc(o, e = ws) {
  const t = ot({}, ws, e);
  t.quantizationBits = ot({}, fi, e.quantizationBits);
  const a = new ke.MeshBuilder(), r = new ke.Mesh(), n = new ke.ExpertEncoder(r), s = {}, c = new ke.DracoInt8Array(), d = o.listTargets().length > 0;
  let y = !1;
  for (const j of o.listSemantics()) {
    const A = o.getAttribute(j);
    if (A.getSparse()) {
      y = !0;
      continue;
    }
    const l = uc(j), S = fc(a, A.getComponentType(), r, ke[l], A.getCount(), A.getElementSize(), A.getArray());
    if (S === -1) throw new Error(`Error compressing "${j}" attribute.`);
    if (s[j] = S, t.quantizationVolume === "mesh" || j !== "POSITION")
      n.SetAttributeQuantization(S, t.quantizationBits[l]);
    else if (typeof t.quantizationVolume == "object") {
      const {
        quantizationVolume: I
      } = t, k = Math.max(I.max[0] - I.min[0], I.max[1] - I.min[1], I.max[2] - I.min[2]);
      n.SetAttributeExplicitQuantization(S, t.quantizationBits[l], A.getElementSize(), I.min, k);
    } else
      throw new Error("Invalid quantization volume state.");
  }
  const _ = o.getIndices();
  if (!_) throw new ua("Primitive must have indices.");
  a.AddFacesToMesh(r, _.getCount() / 3, _.getArray()), n.SetSpeedOptions(t.encodeSpeed, t.decodeSpeed), n.SetTrackEncodedProperties(!0), t.method === Nn.SEQUENTIAL || d || y ? n.SetEncodingMethod(ke.MESH_SEQUENTIAL_ENCODING) : n.SetEncodingMethod(ke.MESH_EDGEBREAKER_ENCODING);
  const g = n.EncodeToDracoBuffer(!(d || y), c);
  if (g <= 0) throw new ua("Error applying Draco compression.");
  const w = new Uint8Array(g);
  for (let j = 0; j < g; ++j)
    w[j] = c.GetValue(j);
  const E = n.GetNumberOfEncodedPoints(), T = n.GetNumberOfEncodedFaces() * 3;
  return ke.destroy(c), ke.destroy(r), ke.destroy(a), ke.destroy(n), {
    numVertices: E,
    numIndices: T,
    data: w,
    attributeIDs: s
  };
}
function uc(o) {
  return o === "POSITION" ? De.POSITION : o === "NORMAL" ? De.NORMAL : o.startsWith("COLOR_") ? De.COLOR : o.startsWith("TEXCOORD_") ? De.TEX_COORD : De.GENERIC;
}
function fc(o, e, t, a, r, n, s) {
  switch (e) {
    case q.ComponentType.UNSIGNED_BYTE:
      return o.AddUInt8Attribute(t, a, r, n, s);
    case q.ComponentType.BYTE:
      return o.AddInt8Attribute(t, a, r, n, s);
    case q.ComponentType.UNSIGNED_SHORT:
      return o.AddUInt16Attribute(t, a, r, n, s);
    case q.ComponentType.SHORT:
      return o.AddInt16Attribute(t, a, r, n, s);
    case q.ComponentType.UNSIGNED_INT:
      return o.AddUInt32Attribute(t, a, r, n, s);
    case q.ComponentType.FLOAT:
      return o.AddFloatAttribute(t, a, r, n, s);
    default:
      throw new Error(`Unexpected component type, "${e}".`);
  }
}
class ua extends Error {
}
class ha extends fe {
  constructor(...e) {
    super(...e), this.extensionName = be, this.prereadTypes = [F.PRIMITIVE], this.prewriteTypes = [F.ACCESSOR], this.readDependencies = ["draco3d.decoder"], this.writeDependencies = ["draco3d.encoder"], this._decoderModule = null, this._encoderModule = null, this._encoderOptions = {};
  }
  /** @hidden */
  install(e, t) {
    return e === "draco3d.decoder" && (this._decoderModule = t, ic(this._decoderModule)), e === "draco3d.encoder" && (this._encoderModule = t, oc(this._encoderModule)), this;
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
      throw new Error(`[${be}] Please install extension dependency, "draco3d.decoder".`);
    const t = this.document.getLogger(), a = e.jsonDoc, r = /* @__PURE__ */ new Map();
    try {
      const n = a.json.meshes || [];
      for (const s of n)
        for (const c of s.primitives) {
          if (!c.extensions || !c.extensions[be]) continue;
          const d = c.extensions[be];
          let [y, _] = r.get(d.bufferView) || [];
          if (!_ || !y) {
            const g = a.json.bufferViews[d.bufferView], w = a.json.buffers[g.buffer], E = w.uri ? a.resources[w.uri] : a.resources[vt], T = g.byteOffset || 0, j = g.byteLength, A = Z.toView(E, T, j);
            y = new this._decoderModule.Decoder(), _ = nc(y, A), r.set(d.bufferView, [y, _]), t.debug(`[${be}] Decompressed ${A.byteLength} bytes.`);
          }
          for (const g in d.attributes) {
            const w = e.jsonDoc.json.accessors[c.attributes[g]], E = y.GetAttributeByUniqueId(_, d.attributes[g]), T = sc(y, _, E, w);
            e.accessors[c.attributes[g]].setArray(T);
          }
          c.indices !== void 0 && e.accessors[c.indices].setArray(ac(y, _));
        }
    } finally {
      for (const [n, s] of Array.from(r.values()))
        this._decoderModule.destroy(n), this._decoderModule.destroy(s);
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
      throw new Error(`[${be}] Please install extension dependency, "draco3d.encoder".`);
    const a = this.document.getLogger();
    a.debug(`[${be}] Compression options: ${JSON.stringify(this._encoderOptions)}`);
    const r = bc(this.document), n = /* @__PURE__ */ new Map();
    let s = "mesh";
    this._encoderOptions.quantizationVolume === "scene" && (this.document.getRoot().listScenes().length !== 1 ? a.warn(`[${be}]: quantizationVolume=scene requires exactly 1 scene.`) : s = $i(this.document.getRoot().listScenes().pop()));
    for (const c of Array.from(r.keys())) {
      const d = r.get(c);
      if (!d) throw new Error("Unexpected primitive.");
      if (n.has(d)) {
        n.set(d, n.get(d));
        continue;
      }
      const y = c.getIndices(), _ = e.jsonDoc.json.accessors;
      let g;
      try {
        g = cc(c, ot({}, this._encoderOptions, {
          quantizationVolume: s
        }));
      } catch (T) {
        if (T instanceof ua) {
          a.warn(`[${be}]: ${T.message} Skipping primitive compression.`);
          continue;
        }
        throw T;
      }
      n.set(d, g);
      const w = e.createAccessorDef(y);
      w.count = g.numIndices, e.accessorIndexMap.set(y, _.length), _.push(w), g.numVertices > 65534 && q.getComponentSize(w.componentType) <= 2 ? w.componentType = q.ComponentType.UNSIGNED_INT : g.numVertices > 254 && q.getComponentSize(w.componentType) <= 1 && (w.componentType = q.ComponentType.UNSIGNED_SHORT);
      for (const T of c.listSemantics()) {
        const j = c.getAttribute(T);
        if (g.attributeIDs[T] === void 0) continue;
        const A = e.createAccessorDef(j);
        A.count = g.numVertices, e.accessorIndexMap.set(j, _.length), _.push(A);
      }
      const E = c.getAttribute("POSITION").getBuffer() || this.document.getRoot().listBuffers()[0];
      e.otherBufferViews.has(E) || e.otherBufferViews.set(E, []), e.otherBufferViews.get(E).push(g.data);
    }
    return a.debug(`[${be}] Compressed ${r.size} primitives.`), e.extensionData[be] = {
      primitiveHashMap: r,
      primitiveEncodingMap: n
    }, this;
  }
  /** @hidden */
  write(e) {
    const t = e.extensionData[be];
    for (const a of this.document.getRoot().listMeshes()) {
      const r = e.jsonDoc.json.meshes[e.meshIndexMap.get(a)];
      for (let n = 0; n < a.listPrimitives().length; n++) {
        const s = a.listPrimitives()[n], c = r.primitives[n], d = t.primitiveHashMap.get(s);
        if (!d) continue;
        const y = t.primitiveEncodingMap.get(d);
        y && (c.extensions = c.extensions || {}, c.extensions[be] = {
          bufferView: e.otherBufferViewsIndexMap.get(y.data),
          attributes: y.attributeIDs
        });
      }
    }
    if (!t.primitiveHashMap.size) {
      const a = e.jsonDoc.json;
      a.extensionsUsed = (a.extensionsUsed || []).filter((r) => r !== be), a.extensionsRequired = (a.extensionsRequired || []).filter((r) => r !== be);
    }
    return this;
  }
}
ha.EXTENSION_NAME = be;
ha.EncoderMethod = Nn;
function bc(o) {
  const e = o.getLogger(), t = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set();
  let r = 0, n = 0;
  for (const g of o.getRoot().listMeshes())
    for (const w of g.listPrimitives())
      w.getIndices() ? w.getMode() !== It.Mode.TRIANGLES ? (a.add(w), n++) : t.add(w) : (a.add(w), r++);
  r > 0 && e.warn(`[${be}] Skipping Draco compression of ${r} non-indexed primitives.`), n > 0 && e.warn(`[${be}] Skipping Draco compression of ${n} non-TRIANGLES primitives.`);
  const s = o.getRoot().listAccessors(), c = /* @__PURE__ */ new Map();
  for (let g = 0; g < s.length; g++) c.set(s[g], g);
  const d = /* @__PURE__ */ new Map(), y = /* @__PURE__ */ new Set(), _ = /* @__PURE__ */ new Map();
  for (const g of Array.from(t)) {
    let w = Ss(g, c);
    if (y.has(w)) {
      _.set(g, w);
      continue;
    }
    if (d.has(g.getIndices())) {
      const E = g.getIndices(), T = E.clone();
      c.set(T, o.getRoot().listAccessors().length - 1), g.swap(E, T);
    }
    for (const E of g.listAttributes())
      if (d.has(E)) {
        const T = E.clone();
        c.set(T, o.getRoot().listAccessors().length - 1), g.swap(E, T);
      }
    w = Ss(g, c), y.add(w), _.set(g, w), d.set(g.getIndices(), w);
    for (const E of g.listAttributes())
      d.set(E, w);
  }
  for (const g of Array.from(d.keys())) {
    const w = new Set(g.listParents().map((E) => E.propertyType));
    if (w.size !== 2 || !w.has(F.PRIMITIVE) || !w.has(F.ROOT))
      throw new Error(`[${be}] Compressed accessors must only be used as indices or vertex attributes.`);
  }
  for (const g of Array.from(t)) {
    const w = _.get(g), E = g.getIndices();
    if (d.get(E) !== w || g.listAttributes().some((T) => d.get(T) !== w))
      throw new Error(`[${be}] Draco primitives must share all, or no, accessors.`);
  }
  for (const g of Array.from(a)) {
    const w = g.getIndices();
    if (d.has(w) || g.listAttributes().some((E) => d.has(E)))
      throw new Error(`[${be}] Accessor cannot be shared by compressed and uncompressed primitives.`);
  }
  return _;
}
function Ss(o, e) {
  const t = [], a = o.getIndices();
  t.push(e.get(a));
  for (const r of o.listAttributes())
    t.push(e.get(r));
  return t.sort().join("|");
}
class Ct extends pe {
  /**********************************************************************************************
   * INSTANCE.
   */
  init() {
    this.extensionName = Ce, this.propertyType = "Light", this.parentTypes = [F.NODE];
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      color: [1, 1, 1],
      intensity: 1,
      type: Ct.Type.POINT,
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
Ct.EXTENSION_NAME = Ce;
Ct.Type = {
  POINT: "point",
  SPOT: "spot",
  DIRECTIONAL: "directional"
};
class bi extends fe {
  constructor(...e) {
    super(...e), this.extensionName = Ce;
  }
  /** Creates a new punctual Light property for use on a {@link Node}. */
  createLight(e = "") {
    return new Ct(this.document.getGraph(), e);
  }
  /** @hidden */
  read(e) {
    const t = e.jsonDoc;
    if (!t.json.extensions || !t.json.extensions[Ce]) return this;
    const n = (t.json.extensions[Ce].lights || []).map((s) => {
      var c, d;
      const y = this.createLight().setName(s.name || "").setType(s.type);
      return s.color !== void 0 && y.setColor(s.color), s.intensity !== void 0 && y.setIntensity(s.intensity), s.range !== void 0 && y.setRange(s.range), ((c = s.spot) == null ? void 0 : c.innerConeAngle) !== void 0 && y.setInnerConeAngle(s.spot.innerConeAngle), ((d = s.spot) == null ? void 0 : d.outerConeAngle) !== void 0 && y.setOuterConeAngle(s.spot.outerConeAngle), y;
    });
    return t.json.nodes.forEach((s, c) => {
      if (!s.extensions || !s.extensions[Ce]) return;
      const d = s.extensions[Ce];
      e.nodes[c].setExtension(Ce, n[d.light]);
    }), this;
  }
  /** @hidden */
  write(e) {
    const t = e.jsonDoc;
    if (this.properties.size === 0) return this;
    const a = [], r = /* @__PURE__ */ new Map();
    for (const n of this.properties) {
      const s = n, c = {
        type: s.getType()
      };
      ne.eq(s.getColor(), [1, 1, 1]) || (c.color = s.getColor()), s.getIntensity() !== 1 && (c.intensity = s.getIntensity()), s.getRange() != null && (c.range = s.getRange()), s.getName() && (c.name = s.getName()), s.getType() === Ct.Type.SPOT && (c.spot = {
        innerConeAngle: s.getInnerConeAngle(),
        outerConeAngle: s.getOuterConeAngle()
      }), a.push(c), r.set(s, a.length - 1);
    }
    return this.document.getRoot().listNodes().forEach((n) => {
      const s = n.getExtension(Ce);
      if (s) {
        const c = e.nodeIndexMap.get(n), d = t.json.nodes[c];
        d.extensions = d.extensions || {}, d.extensions[Ce] = {
          light: r.get(s)
        };
      }
    }), t.json.extensions = t.json.extensions || {}, t.json.extensions[Ce] = {
      lights: a
    }, this;
  }
}
bi.EXTENSION_NAME = Ce;
const {
  R: dc,
  G: pc,
  B: lc
} = Ue;
class di extends pe {
  init() {
    this.extensionName = Xe, this.propertyType = "Anisotropy", this.parentTypes = [F.MATERIAL];
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      anisotropyStrength: 0,
      anisotropyRotation: 0,
      anisotropyTexture: null,
      anisotropyTextureInfo: new ie(this.graph, "anisotropyTextureInfo")
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
      channels: dc | pc | lc
    });
  }
}
di.EXTENSION_NAME = Xe;
class pi extends fe {
  constructor(...e) {
    super(...e), this.extensionName = Xe, this.prereadTypes = [F.MESH], this.prewriteTypes = [F.MESH];
  }
  /** Creates a new Anisotropy property for use on a {@link Material}. */
  createAnisotropy() {
    return new di(this.document.getGraph());
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
    const t = e.jsonDoc, a = t.json.materials || [], r = t.json.textures || [];
    return a.forEach((n, s) => {
      if (n.extensions && n.extensions[Xe]) {
        const c = this.createAnisotropy();
        e.materials[s].setExtension(Xe, c);
        const d = n.extensions[Xe];
        if (d.anisotropyStrength !== void 0 && c.setAnisotropyStrength(d.anisotropyStrength), d.anisotropyRotation !== void 0 && c.setAnisotropyRotation(d.anisotropyRotation), d.anisotropyTexture !== void 0) {
          const y = d.anisotropyTexture, _ = e.textures[r[y.index].source];
          c.setAnisotropyTexture(_), e.setTextureInfo(c.getAnisotropyTextureInfo(), y);
        }
      }
    }), this;
  }
  /** @hidden */
  prewrite(e) {
    const t = e.jsonDoc;
    return this.document.getRoot().listMaterials().forEach((a) => {
      const r = a.getExtension(Xe);
      if (r) {
        const n = e.materialIndexMap.get(a), s = t.json.materials[n];
        s.extensions = s.extensions || {};
        const c = s.extensions[Xe] = {};
        if (r.getAnisotropyStrength() > 0 && (c.anisotropyStrength = r.getAnisotropyStrength()), r.getAnisotropyRotation() !== 0 && (c.anisotropyRotation = r.getAnisotropyRotation()), r.getAnisotropyTexture()) {
          const d = r.getAnisotropyTexture(), y = r.getAnisotropyTextureInfo();
          c.anisotropyTexture = e.createTextureInfoDef(d, y);
        }
      }
    }), this;
  }
}
pi.EXTENSION_NAME = Xe;
const {
  R: Ms,
  G: Ns,
  B: hc
} = Ue;
class li extends pe {
  init() {
    this.extensionName = Je, this.propertyType = "Clearcoat", this.parentTypes = [F.MATERIAL];
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      clearcoatFactor: 0,
      clearcoatTexture: null,
      clearcoatTextureInfo: new ie(this.graph, "clearcoatTextureInfo"),
      clearcoatRoughnessFactor: 0,
      clearcoatRoughnessTexture: null,
      clearcoatRoughnessTextureInfo: new ie(this.graph, "clearcoatRoughnessTextureInfo"),
      clearcoatNormalScale: 1,
      clearcoatNormalTexture: null,
      clearcoatNormalTextureInfo: new ie(this.graph, "clearcoatNormalTextureInfo")
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
      channels: Ms
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
      channels: Ns
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
      channels: Ms | Ns | hc
    });
  }
}
li.EXTENSION_NAME = Je;
class _a extends fe {
  constructor(...e) {
    super(...e), this.extensionName = Je, this.prereadTypes = [F.MESH], this.prewriteTypes = [F.MESH];
  }
  /** Creates a new Clearcoat property for use on a {@link Material}. */
  createClearcoat() {
    return new li(this.document.getGraph());
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
    const t = e.jsonDoc, a = t.json.materials || [], r = t.json.textures || [];
    return a.forEach((n, s) => {
      if (n.extensions && n.extensions[Je]) {
        const c = this.createClearcoat();
        e.materials[s].setExtension(Je, c);
        const d = n.extensions[Je];
        if (d.clearcoatFactor !== void 0 && c.setClearcoatFactor(d.clearcoatFactor), d.clearcoatRoughnessFactor !== void 0 && c.setClearcoatRoughnessFactor(d.clearcoatRoughnessFactor), d.clearcoatTexture !== void 0) {
          const y = d.clearcoatTexture, _ = e.textures[r[y.index].source];
          c.setClearcoatTexture(_), e.setTextureInfo(c.getClearcoatTextureInfo(), y);
        }
        if (d.clearcoatRoughnessTexture !== void 0) {
          const y = d.clearcoatRoughnessTexture, _ = e.textures[r[y.index].source];
          c.setClearcoatRoughnessTexture(_), e.setTextureInfo(c.getClearcoatRoughnessTextureInfo(), y);
        }
        if (d.clearcoatNormalTexture !== void 0) {
          const y = d.clearcoatNormalTexture, _ = e.textures[r[y.index].source];
          c.setClearcoatNormalTexture(_), e.setTextureInfo(c.getClearcoatNormalTextureInfo(), y), y.scale !== void 0 && c.setClearcoatNormalScale(y.scale);
        }
      }
    }), this;
  }
  /** @hidden */
  prewrite(e) {
    const t = e.jsonDoc;
    return this.document.getRoot().listMaterials().forEach((a) => {
      const r = a.getExtension(Je);
      if (r) {
        const n = e.materialIndexMap.get(a), s = t.json.materials[n];
        s.extensions = s.extensions || {};
        const c = s.extensions[Je] = {
          clearcoatFactor: r.getClearcoatFactor(),
          clearcoatRoughnessFactor: r.getClearcoatRoughnessFactor()
        };
        if (r.getClearcoatTexture()) {
          const d = r.getClearcoatTexture(), y = r.getClearcoatTextureInfo();
          c.clearcoatTexture = e.createTextureInfoDef(d, y);
        }
        if (r.getClearcoatRoughnessTexture()) {
          const d = r.getClearcoatRoughnessTexture(), y = r.getClearcoatRoughnessTextureInfo();
          c.clearcoatRoughnessTexture = e.createTextureInfoDef(d, y);
        }
        if (r.getClearcoatNormalTexture()) {
          const d = r.getClearcoatNormalTexture(), y = r.getClearcoatNormalTextureInfo();
          c.clearcoatNormalTexture = e.createTextureInfoDef(d, y), r.getClearcoatNormalScale() !== 1 && (c.clearcoatNormalTexture.scale = r.getClearcoatNormalScale());
        }
      }
    }), this;
  }
}
_a.EXTENSION_NAME = Je;
const {
  R: _c,
  G: mc,
  B: gc,
  A: yc
} = Ue;
class hi extends pe {
  init() {
    this.extensionName = Ye, this.propertyType = "DiffuseTransmission", this.parentTypes = [F.MATERIAL];
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      diffuseTransmissionFactor: 0,
      diffuseTransmissionTexture: null,
      diffuseTransmissionTextureInfo: new ie(this.graph, "diffuseTransmissionTextureInfo"),
      diffuseTransmissionColorFactor: [1, 1, 1],
      diffuseTransmissionColorTexture: null,
      diffuseTransmissionColorTextureInfo: new ie(this.graph, "diffuseTransmissionColorTextureInfo")
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
      channels: yc
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
      channels: _c | mc | gc
    });
  }
}
hi.EXTENSION_NAME = Ye;
class _i extends fe {
  constructor(...e) {
    super(...e), this.extensionName = Ye;
  }
  /** Creates a new DiffuseTransmission property for use on a {@link Material}. */
  createDiffuseTransmission() {
    return new hi(this.document.getGraph());
  }
  /** @hidden */
  read(e) {
    const t = e.jsonDoc, a = t.json.materials || [], r = t.json.textures || [];
    return a.forEach((n, s) => {
      if (n.extensions && n.extensions[Ye]) {
        const c = this.createDiffuseTransmission();
        e.materials[s].setExtension(Ye, c);
        const d = n.extensions[Ye];
        if (d.diffuseTransmissionFactor !== void 0 && c.setDiffuseTransmissionFactor(d.diffuseTransmissionFactor), d.diffuseTransmissionColorFactor !== void 0 && c.setDiffuseTransmissionColorFactor(d.diffuseTransmissionColorFactor), d.diffuseTransmissionTexture !== void 0) {
          const y = d.diffuseTransmissionTexture, _ = e.textures[r[y.index].source];
          c.setDiffuseTransmissionTexture(_), e.setTextureInfo(c.getDiffuseTransmissionTextureInfo(), y);
        }
        if (d.diffuseTransmissionColorTexture !== void 0) {
          const y = d.diffuseTransmissionColorTexture, _ = e.textures[r[y.index].source];
          c.setDiffuseTransmissionColorTexture(_), e.setTextureInfo(c.getDiffuseTransmissionColorTextureInfo(), y);
        }
      }
    }), this;
  }
  /** @hidden */
  write(e) {
    const t = e.jsonDoc;
    for (const a of this.document.getRoot().listMaterials()) {
      const r = a.getExtension(Ye);
      if (!r) continue;
      const n = e.materialIndexMap.get(a), s = t.json.materials[n];
      s.extensions = s.extensions || {};
      const c = s.extensions[Ye] = {
        diffuseTransmissionFactor: r.getDiffuseTransmissionFactor(),
        diffuseTransmissionColorFactor: r.getDiffuseTransmissionColorFactor()
      };
      if (r.getDiffuseTransmissionTexture()) {
        const d = r.getDiffuseTransmissionTexture(), y = r.getDiffuseTransmissionTextureInfo();
        c.diffuseTransmissionTexture = e.createTextureInfoDef(d, y);
      }
      if (r.getDiffuseTransmissionColorTexture()) {
        const d = r.getDiffuseTransmissionColorTexture(), y = r.getDiffuseTransmissionColorTextureInfo();
        c.diffuseTransmissionColorTexture = e.createTextureInfoDef(d, y);
      }
    }
    return this;
  }
}
_i.EXTENSION_NAME = Ye;
class mi extends pe {
  init() {
    this.extensionName = Qe, this.propertyType = "Dispersion", this.parentTypes = [F.MATERIAL];
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
mi.EXTENSION_NAME = Qe;
class gi extends fe {
  constructor(...e) {
    super(...e), this.extensionName = Qe, this.prereadTypes = [F.MESH], this.prewriteTypes = [F.MESH];
  }
  /** Creates a new Dispersion property for use on a {@link Material}. */
  createDispersion() {
    return new mi(this.document.getGraph());
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
    return (e.jsonDoc.json.materials || []).forEach((r, n) => {
      if (r.extensions && r.extensions[Qe]) {
        const s = this.createDispersion();
        e.materials[n].setExtension(Qe, s);
        const c = r.extensions[Qe];
        c.dispersion !== void 0 && s.setDispersion(c.dispersion);
      }
    }), this;
  }
  /** @hidden */
  prewrite(e) {
    const t = e.jsonDoc;
    return this.document.getRoot().listMaterials().forEach((a) => {
      const r = a.getExtension(Qe);
      if (r) {
        const n = e.materialIndexMap.get(a), s = t.json.materials[n];
        s.extensions = s.extensions || {}, s.extensions[Qe] = {
          dispersion: r.getDispersion()
        };
      }
    }), this;
  }
}
gi.EXTENSION_NAME = Qe;
class yi extends pe {
  init() {
    this.extensionName = Ze, this.propertyType = "EmissiveStrength", this.parentTypes = [F.MATERIAL];
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
yi.EXTENSION_NAME = Ze;
class Ti extends fe {
  constructor(...e) {
    super(...e), this.extensionName = Ze, this.prereadTypes = [F.MESH], this.prewriteTypes = [F.MESH];
  }
  /** Creates a new EmissiveStrength property for use on a {@link Material}. */
  createEmissiveStrength() {
    return new yi(this.document.getGraph());
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
    return (e.jsonDoc.json.materials || []).forEach((r, n) => {
      if (r.extensions && r.extensions[Ze]) {
        const s = this.createEmissiveStrength();
        e.materials[n].setExtension(Ze, s);
        const c = r.extensions[Ze];
        c.emissiveStrength !== void 0 && s.setEmissiveStrength(c.emissiveStrength);
      }
    }), this;
  }
  /** @hidden */
  prewrite(e) {
    const t = e.jsonDoc;
    return this.document.getRoot().listMaterials().forEach((a) => {
      const r = a.getExtension(Ze);
      if (r) {
        const n = e.materialIndexMap.get(a), s = t.json.materials[n];
        s.extensions = s.extensions || {}, s.extensions[Ze] = {
          emissiveStrength: r.getEmissiveStrength()
        };
      }
    }), this;
  }
}
Ti.EXTENSION_NAME = Ze;
class xi extends pe {
  init() {
    this.extensionName = $e, this.propertyType = "IOR", this.parentTypes = [F.MATERIAL];
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
xi.EXTENSION_NAME = $e;
class ma extends fe {
  constructor(...e) {
    super(...e), this.extensionName = $e, this.prereadTypes = [F.MESH], this.prewriteTypes = [F.MESH];
  }
  /** Creates a new IOR property for use on a {@link Material}. */
  createIOR() {
    return new xi(this.document.getGraph());
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
    return (e.jsonDoc.json.materials || []).forEach((r, n) => {
      if (r.extensions && r.extensions[$e]) {
        const s = this.createIOR();
        e.materials[n].setExtension($e, s);
        const c = r.extensions[$e];
        c.ior !== void 0 && s.setIOR(c.ior);
      }
    }), this;
  }
  /** @hidden */
  prewrite(e) {
    const t = e.jsonDoc;
    return this.document.getRoot().listMaterials().forEach((a) => {
      const r = a.getExtension($e);
      if (r) {
        const n = e.materialIndexMap.get(a), s = t.json.materials[n];
        s.extensions = s.extensions || {}, s.extensions[$e] = {
          ior: r.getIOR()
        };
      }
    }), this;
  }
}
ma.EXTENSION_NAME = $e;
const {
  R: Tc,
  G: xc
} = Ue;
class Ai extends pe {
  init() {
    this.extensionName = et, this.propertyType = "Iridescence", this.parentTypes = [F.MATERIAL];
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      iridescenceFactor: 0,
      iridescenceTexture: null,
      iridescenceTextureInfo: new ie(this.graph, "iridescenceTextureInfo"),
      iridescenceIOR: 1.3,
      iridescenceThicknessMinimum: 100,
      iridescenceThicknessMaximum: 400,
      iridescenceThicknessTexture: null,
      iridescenceThicknessTextureInfo: new ie(this.graph, "iridescenceThicknessTextureInfo")
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
      channels: Tc
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
      channels: xc
    });
  }
}
Ai.EXTENSION_NAME = et;
class Ei extends fe {
  constructor(...e) {
    super(...e), this.extensionName = et, this.prereadTypes = [F.MESH], this.prewriteTypes = [F.MESH];
  }
  /** Creates a new Iridescence property for use on a {@link Material}. */
  createIridescence() {
    return new Ai(this.document.getGraph());
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
    const t = e.jsonDoc, a = t.json.materials || [], r = t.json.textures || [];
    return a.forEach((n, s) => {
      if (n.extensions && n.extensions[et]) {
        const c = this.createIridescence();
        e.materials[s].setExtension(et, c);
        const d = n.extensions[et];
        if (d.iridescenceFactor !== void 0 && c.setIridescenceFactor(d.iridescenceFactor), d.iridescenceIor !== void 0 && c.setIridescenceIOR(d.iridescenceIor), d.iridescenceThicknessMinimum !== void 0 && c.setIridescenceThicknessMinimum(d.iridescenceThicknessMinimum), d.iridescenceThicknessMaximum !== void 0 && c.setIridescenceThicknessMaximum(d.iridescenceThicknessMaximum), d.iridescenceTexture !== void 0) {
          const y = d.iridescenceTexture, _ = e.textures[r[y.index].source];
          c.setIridescenceTexture(_), e.setTextureInfo(c.getIridescenceTextureInfo(), y);
        }
        if (d.iridescenceThicknessTexture !== void 0) {
          const y = d.iridescenceThicknessTexture, _ = e.textures[r[y.index].source];
          c.setIridescenceThicknessTexture(_), e.setTextureInfo(c.getIridescenceThicknessTextureInfo(), y);
        }
      }
    }), this;
  }
  /** @hidden */
  prewrite(e) {
    const t = e.jsonDoc;
    return this.document.getRoot().listMaterials().forEach((a) => {
      const r = a.getExtension(et);
      if (r) {
        const n = e.materialIndexMap.get(a), s = t.json.materials[n];
        s.extensions = s.extensions || {};
        const c = s.extensions[et] = {};
        if (r.getIridescenceFactor() > 0 && (c.iridescenceFactor = r.getIridescenceFactor()), r.getIridescenceIOR() !== 1.3 && (c.iridescenceIor = r.getIridescenceIOR()), r.getIridescenceThicknessMinimum() !== 100 && (c.iridescenceThicknessMinimum = r.getIridescenceThicknessMinimum()), r.getIridescenceThicknessMaximum() !== 400 && (c.iridescenceThicknessMaximum = r.getIridescenceThicknessMaximum()), r.getIridescenceTexture()) {
          const d = r.getIridescenceTexture(), y = r.getIridescenceTextureInfo();
          c.iridescenceTexture = e.createTextureInfoDef(d, y);
        }
        if (r.getIridescenceThicknessTexture()) {
          const d = r.getIridescenceThicknessTexture(), y = r.getIridescenceThicknessTextureInfo();
          c.iridescenceThicknessTexture = e.createTextureInfoDef(d, y);
        }
      }
    }), this;
  }
}
Ei.EXTENSION_NAME = et;
const {
  R: vs,
  G: ks,
  B: Cs,
  A: Os
} = Ue;
class Ii extends pe {
  init() {
    this.extensionName = tt, this.propertyType = "PBRSpecularGlossiness", this.parentTypes = [F.MATERIAL];
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      diffuseFactor: [1, 1, 1, 1],
      diffuseTexture: null,
      diffuseTextureInfo: new ie(this.graph, "diffuseTextureInfo"),
      specularFactor: [1, 1, 1],
      glossinessFactor: 1,
      specularGlossinessTexture: null,
      specularGlossinessTextureInfo: new ie(this.graph, "specularGlossinessTextureInfo")
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
      channels: vs | ks | Cs | Os,
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
      channels: vs | ks | Cs | Os
    });
  }
}
Ii.EXTENSION_NAME = tt;
class ji extends fe {
  constructor(...e) {
    super(...e), this.extensionName = tt, this.prereadTypes = [F.MESH], this.prewriteTypes = [F.MESH];
  }
  /** Creates a new PBRSpecularGlossiness property for use on a {@link Material}. */
  createPBRSpecularGlossiness() {
    return new Ii(this.document.getGraph());
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
    const t = e.jsonDoc, a = t.json.materials || [], r = t.json.textures || [];
    return a.forEach((n, s) => {
      if (n.extensions && n.extensions[tt]) {
        const c = this.createPBRSpecularGlossiness();
        e.materials[s].setExtension(tt, c);
        const d = n.extensions[tt];
        if (d.diffuseFactor !== void 0 && c.setDiffuseFactor(d.diffuseFactor), d.specularFactor !== void 0 && c.setSpecularFactor(d.specularFactor), d.glossinessFactor !== void 0 && c.setGlossinessFactor(d.glossinessFactor), d.diffuseTexture !== void 0) {
          const y = d.diffuseTexture, _ = e.textures[r[y.index].source];
          c.setDiffuseTexture(_), e.setTextureInfo(c.getDiffuseTextureInfo(), y);
        }
        if (d.specularGlossinessTexture !== void 0) {
          const y = d.specularGlossinessTexture, _ = e.textures[r[y.index].source];
          c.setSpecularGlossinessTexture(_), e.setTextureInfo(c.getSpecularGlossinessTextureInfo(), y);
        }
      }
    }), this;
  }
  /** @hidden */
  prewrite(e) {
    const t = e.jsonDoc;
    return this.document.getRoot().listMaterials().forEach((a) => {
      const r = a.getExtension(tt);
      if (r) {
        const n = e.materialIndexMap.get(a), s = t.json.materials[n];
        s.extensions = s.extensions || {};
        const c = s.extensions[tt] = {
          diffuseFactor: r.getDiffuseFactor(),
          specularFactor: r.getSpecularFactor(),
          glossinessFactor: r.getGlossinessFactor()
        };
        if (r.getDiffuseTexture()) {
          const d = r.getDiffuseTexture(), y = r.getDiffuseTextureInfo();
          c.diffuseTexture = e.createTextureInfoDef(d, y);
        }
        if (r.getSpecularGlossinessTexture()) {
          const d = r.getSpecularGlossinessTexture(), y = r.getSpecularGlossinessTextureInfo();
          c.specularGlossinessTexture = e.createTextureInfoDef(d, y);
        }
      }
    }), this;
  }
}
ji.EXTENSION_NAME = tt;
const {
  R: Ac,
  G: Ec,
  B: Ic,
  A: jc
} = Ue;
class Ri extends pe {
  init() {
    this.extensionName = rt, this.propertyType = "Sheen", this.parentTypes = [F.MATERIAL];
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      sheenColorFactor: [0, 0, 0],
      sheenColorTexture: null,
      sheenColorTextureInfo: new ie(this.graph, "sheenColorTextureInfo"),
      sheenRoughnessFactor: 0,
      sheenRoughnessTexture: null,
      sheenRoughnessTextureInfo: new ie(this.graph, "sheenRoughnessTextureInfo")
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
      channels: Ac | Ec | Ic,
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
      channels: jc
    });
  }
}
Ri.EXTENSION_NAME = rt;
class ga extends fe {
  constructor(...e) {
    super(...e), this.extensionName = rt, this.prereadTypes = [F.MESH], this.prewriteTypes = [F.MESH];
  }
  /** Creates a new Sheen property for use on a {@link Material}. */
  createSheen() {
    return new Ri(this.document.getGraph());
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
    const t = e.jsonDoc, a = t.json.materials || [], r = t.json.textures || [];
    return a.forEach((n, s) => {
      if (n.extensions && n.extensions[rt]) {
        const c = this.createSheen();
        e.materials[s].setExtension(rt, c);
        const d = n.extensions[rt];
        if (d.sheenColorFactor !== void 0 && c.setSheenColorFactor(d.sheenColorFactor), d.sheenRoughnessFactor !== void 0 && c.setSheenRoughnessFactor(d.sheenRoughnessFactor), d.sheenColorTexture !== void 0) {
          const y = d.sheenColorTexture, _ = e.textures[r[y.index].source];
          c.setSheenColorTexture(_), e.setTextureInfo(c.getSheenColorTextureInfo(), y);
        }
        if (d.sheenRoughnessTexture !== void 0) {
          const y = d.sheenRoughnessTexture, _ = e.textures[r[y.index].source];
          c.setSheenRoughnessTexture(_), e.setTextureInfo(c.getSheenRoughnessTextureInfo(), y);
        }
      }
    }), this;
  }
  /** @hidden */
  prewrite(e) {
    const t = e.jsonDoc;
    return this.document.getRoot().listMaterials().forEach((a) => {
      const r = a.getExtension(rt);
      if (r) {
        const n = e.materialIndexMap.get(a), s = t.json.materials[n];
        s.extensions = s.extensions || {};
        const c = s.extensions[rt] = {
          sheenColorFactor: r.getSheenColorFactor(),
          sheenRoughnessFactor: r.getSheenRoughnessFactor()
        };
        if (r.getSheenColorTexture()) {
          const d = r.getSheenColorTexture(), y = r.getSheenColorTextureInfo();
          c.sheenColorTexture = e.createTextureInfoDef(d, y);
        }
        if (r.getSheenRoughnessTexture()) {
          const d = r.getSheenRoughnessTexture(), y = r.getSheenRoughnessTextureInfo();
          c.sheenRoughnessTexture = e.createTextureInfoDef(d, y);
        }
      }
    }), this;
  }
}
ga.EXTENSION_NAME = rt;
const {
  R: Rc,
  G: wc,
  B: Sc,
  A: Mc
} = Ue;
class wi extends pe {
  init() {
    this.extensionName = nt, this.propertyType = "Specular", this.parentTypes = [F.MATERIAL];
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      specularFactor: 1,
      specularTexture: null,
      specularTextureInfo: new ie(this.graph, "specularTextureInfo"),
      specularColorFactor: [1, 1, 1],
      specularColorTexture: null,
      specularColorTextureInfo: new ie(this.graph, "specularColorTextureInfo")
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
      channels: Mc
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
      channels: Rc | wc | Sc,
      isColor: !0
    });
  }
}
wi.EXTENSION_NAME = nt;
class Si extends fe {
  constructor(...e) {
    super(...e), this.extensionName = nt, this.prereadTypes = [F.MESH], this.prewriteTypes = [F.MESH];
  }
  /** Creates a new Specular property for use on a {@link Material}. */
  createSpecular() {
    return new wi(this.document.getGraph());
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
    const t = e.jsonDoc, a = t.json.materials || [], r = t.json.textures || [];
    return a.forEach((n, s) => {
      if (n.extensions && n.extensions[nt]) {
        const c = this.createSpecular();
        e.materials[s].setExtension(nt, c);
        const d = n.extensions[nt];
        if (d.specularFactor !== void 0 && c.setSpecularFactor(d.specularFactor), d.specularColorFactor !== void 0 && c.setSpecularColorFactor(d.specularColorFactor), d.specularTexture !== void 0) {
          const y = d.specularTexture, _ = e.textures[r[y.index].source];
          c.setSpecularTexture(_), e.setTextureInfo(c.getSpecularTextureInfo(), y);
        }
        if (d.specularColorTexture !== void 0) {
          const y = d.specularColorTexture, _ = e.textures[r[y.index].source];
          c.setSpecularColorTexture(_), e.setTextureInfo(c.getSpecularColorTextureInfo(), y);
        }
      }
    }), this;
  }
  /** @hidden */
  prewrite(e) {
    const t = e.jsonDoc;
    return this.document.getRoot().listMaterials().forEach((a) => {
      const r = a.getExtension(nt);
      if (r) {
        const n = e.materialIndexMap.get(a), s = t.json.materials[n];
        s.extensions = s.extensions || {};
        const c = s.extensions[nt] = {};
        if (r.getSpecularFactor() !== 1 && (c.specularFactor = r.getSpecularFactor()), ne.eq(r.getSpecularColorFactor(), [1, 1, 1]) || (c.specularColorFactor = r.getSpecularColorFactor()), r.getSpecularTexture()) {
          const d = r.getSpecularTexture(), y = r.getSpecularTextureInfo();
          c.specularTexture = e.createTextureInfoDef(d, y);
        }
        if (r.getSpecularColorTexture()) {
          const d = r.getSpecularColorTexture(), y = r.getSpecularColorTextureInfo();
          c.specularColorTexture = e.createTextureInfoDef(d, y);
        }
      }
    }), this;
  }
}
Si.EXTENSION_NAME = nt;
const {
  R: Nc
} = Ue;
class Mi extends pe {
  init() {
    this.extensionName = at, this.propertyType = "Transmission", this.parentTypes = [F.MATERIAL];
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      transmissionFactor: 0,
      transmissionTexture: null,
      transmissionTextureInfo: new ie(this.graph, "transmissionTextureInfo")
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
      channels: Nc
    });
  }
}
Mi.EXTENSION_NAME = at;
class ya extends fe {
  constructor(...e) {
    super(...e), this.extensionName = at, this.prereadTypes = [F.MESH], this.prewriteTypes = [F.MESH];
  }
  /** Creates a new Transmission property for use on a {@link Material}. */
  createTransmission() {
    return new Mi(this.document.getGraph());
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
    const t = e.jsonDoc, a = t.json.materials || [], r = t.json.textures || [];
    return a.forEach((n, s) => {
      if (n.extensions && n.extensions[at]) {
        const c = this.createTransmission();
        e.materials[s].setExtension(at, c);
        const d = n.extensions[at];
        if (d.transmissionFactor !== void 0 && c.setTransmissionFactor(d.transmissionFactor), d.transmissionTexture !== void 0) {
          const y = d.transmissionTexture, _ = e.textures[r[y.index].source];
          c.setTransmissionTexture(_), e.setTextureInfo(c.getTransmissionTextureInfo(), y);
        }
      }
    }), this;
  }
  /** @hidden */
  prewrite(e) {
    const t = e.jsonDoc;
    return this.document.getRoot().listMaterials().forEach((a) => {
      const r = a.getExtension(at);
      if (r) {
        const n = e.materialIndexMap.get(a), s = t.json.materials[n];
        s.extensions = s.extensions || {};
        const c = s.extensions[at] = {
          transmissionFactor: r.getTransmissionFactor()
        };
        if (r.getTransmissionTexture()) {
          const d = r.getTransmissionTexture(), y = r.getTransmissionTextureInfo();
          c.transmissionTexture = e.createTextureInfoDef(d, y);
        }
      }
    }), this;
  }
}
ya.EXTENSION_NAME = at;
class Ni extends pe {
  init() {
    this.extensionName = ft, this.propertyType = "Unlit", this.parentTypes = [F.MATERIAL];
  }
}
Ni.EXTENSION_NAME = ft;
class vi extends fe {
  constructor(...e) {
    super(...e), this.extensionName = ft, this.prereadTypes = [F.MESH], this.prewriteTypes = [F.MESH];
  }
  /** Creates a new Unlit property for use on a {@link Material}. */
  createUnlit() {
    return new Ni(this.document.getGraph());
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
    return (e.jsonDoc.json.materials || []).forEach((a, r) => {
      a.extensions && a.extensions[ft] && e.materials[r].setExtension(ft, this.createUnlit());
    }), this;
  }
  /** @hidden */
  prewrite(e) {
    const t = e.jsonDoc;
    return this.document.getRoot().listMaterials().forEach((a) => {
      if (a.getExtension(ft)) {
        const r = e.materialIndexMap.get(a), n = t.json.materials[r];
        n.extensions = n.extensions || {}, n.extensions[ft] = {};
      }
    }), this;
  }
}
vi.EXTENSION_NAME = ft;
class ki extends pe {
  init() {
    this.extensionName = xe, this.propertyType = "Mapping", this.parentTypes = ["MappingList"];
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      material: null,
      variants: new ce()
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
ki.EXTENSION_NAME = xe;
class Ci extends pe {
  init() {
    this.extensionName = xe, this.propertyType = "MappingList", this.parentTypes = [F.PRIMITIVE];
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      mappings: new ce()
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
Ci.EXTENSION_NAME = xe;
class fa extends pe {
  init() {
    this.extensionName = xe, this.propertyType = "Variant", this.parentTypes = ["MappingList"];
  }
}
fa.EXTENSION_NAME = xe;
class Oi extends fe {
  constructor(...e) {
    super(...e), this.extensionName = xe;
  }
  /** Creates a new MappingList property. */
  createMappingList() {
    return new Ci(this.document.getGraph());
  }
  /** Creates a new Variant property. */
  createVariant(e = "") {
    return new fa(this.document.getGraph(), e);
  }
  /** Creates a new Mapping property. */
  createMapping() {
    return new ki(this.document.getGraph());
  }
  /** Lists all Variants on the current Document. */
  listVariants() {
    return Array.from(this.properties).filter((e) => e instanceof fa);
  }
  /** @hidden */
  read(e) {
    const t = e.jsonDoc;
    if (!t.json.extensions || !t.json.extensions[xe]) return this;
    const n = (t.json.extensions[xe].variants || []).map((c) => this.createVariant().setName(c.name || ""));
    return (t.json.meshes || []).forEach((c, d) => {
      const y = e.meshes[d];
      (c.primitives || []).forEach((g, w) => {
        if (!g.extensions || !g.extensions[xe])
          return;
        const E = this.createMappingList(), T = g.extensions[xe];
        for (const j of T.mappings) {
          const A = this.createMapping();
          j.material !== void 0 && A.setMaterial(e.materials[j.material]);
          for (const l of j.variants || [])
            A.addVariant(n[l]);
          E.addMapping(A);
        }
        y.listPrimitives()[w].setExtension(xe, E);
      });
    }), this;
  }
  /** @hidden */
  write(e) {
    const t = e.jsonDoc, a = this.listVariants();
    if (!a.length) return this;
    const r = [], n = /* @__PURE__ */ new Map();
    for (const s of a)
      n.set(s, r.length), r.push(e.createPropertyDef(s));
    for (const s of this.document.getRoot().listMeshes()) {
      const c = e.meshIndexMap.get(s);
      s.listPrimitives().forEach((d, y) => {
        const _ = d.getExtension(xe);
        if (!_) return;
        const g = e.jsonDoc.json.meshes[c].primitives[y], w = _.listMappings().map((E) => {
          const T = e.createPropertyDef(E), j = E.getMaterial();
          return j && (T.material = e.materialIndexMap.get(j)), T.variants = E.listVariants().map((A) => n.get(A)), T;
        });
        g.extensions = g.extensions || {}, g.extensions[xe] = {
          mappings: w
        };
      });
    }
    return t.json.extensions = t.json.extensions || {}, t.json.extensions[xe] = {
      variants: r
    }, this;
  }
}
Oi.EXTENSION_NAME = xe;
const {
  G: vc
} = Ue;
class Di extends pe {
  init() {
    this.extensionName = st, this.propertyType = "Volume", this.parentTypes = [F.MATERIAL];
  }
  getDefaults() {
    return Object.assign(super.getDefaults(), {
      thicknessFactor: 0,
      thicknessTexture: null,
      thicknessTextureInfo: new ie(this.graph, "thicknessTexture"),
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
      channels: vc
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
Di.EXTENSION_NAME = st;
class Ta extends fe {
  constructor(...e) {
    super(...e), this.extensionName = st, this.prereadTypes = [F.MESH], this.prewriteTypes = [F.MESH];
  }
  /** Creates a new Volume property for use on a {@link Material}. */
  createVolume() {
    return new Di(this.document.getGraph());
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
    const t = e.jsonDoc, a = t.json.materials || [], r = t.json.textures || [];
    return a.forEach((n, s) => {
      if (n.extensions && n.extensions[st]) {
        const c = this.createVolume();
        e.materials[s].setExtension(st, c);
        const d = n.extensions[st];
        if (d.thicknessFactor !== void 0 && c.setThicknessFactor(d.thicknessFactor), d.attenuationDistance !== void 0 && c.setAttenuationDistance(d.attenuationDistance), d.attenuationColor !== void 0 && c.setAttenuationColor(d.attenuationColor), d.thicknessTexture !== void 0) {
          const y = d.thicknessTexture, _ = e.textures[r[y.index].source];
          c.setThicknessTexture(_), e.setTextureInfo(c.getThicknessTextureInfo(), y);
        }
      }
    }), this;
  }
  /** @hidden */
  prewrite(e) {
    const t = e.jsonDoc;
    return this.document.getRoot().listMaterials().forEach((a) => {
      const r = a.getExtension(st);
      if (r) {
        const n = e.materialIndexMap.get(a), s = t.json.materials[n];
        s.extensions = s.extensions || {};
        const c = s.extensions[st] = {};
        if (r.getThicknessFactor() > 0 && (c.thicknessFactor = r.getThicknessFactor()), Number.isFinite(r.getAttenuationDistance()) && (c.attenuationDistance = r.getAttenuationDistance()), ne.eq(r.getAttenuationColor(), [1, 1, 1]) || (c.attenuationColor = r.getAttenuationColor()), r.getThicknessTexture()) {
          const d = r.getThicknessTexture(), y = r.getThicknessTextureInfo();
          c.thicknessTexture = e.createTextureInfoDef(d, y);
        }
      }
    }), this;
  }
}
Ta.EXTENSION_NAME = st;
class Fi extends fe {
  constructor(...e) {
    super(...e), this.extensionName = ri;
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
Fi.EXTENSION_NAME = ri;
class kc {
  match(e) {
    return e[0] === 171 && e[1] === 75 && e[2] === 84 && e[3] === 88 && e[4] === 32 && e[5] === 50 && e[6] === 48 && e[7] === 187 && e[8] === 13 && e[9] === 10 && e[10] === 26 && e[11] === 10;
  }
  getSize(e) {
    const t = ea(e);
    return [t.pixelWidth, t.pixelHeight];
  }
  getChannels(e) {
    const a = ea(e).dataFormatDescriptor[0];
    if (a.colorModel === Bo)
      return a.samples.length === 2 && (a.samples[1].channelType & 15) === 15 ? 4 : 3;
    if (a.colorModel === Go)
      return (a.samples[0].channelType & 15) === 3 ? 4 : 3;
    throw new Error(`Unexpected KTX2 colorModel, "${a.colorModel}".`);
  }
  getVRAMByteLength(e) {
    const t = ea(e), a = this.getChannels(e) > 3;
    let r = 0;
    for (let n = 0; n < t.levels.length; n++) {
      const s = t.levels[n];
      if (s.uncompressedByteLength)
        r += s.uncompressedByteLength;
      else {
        const c = Math.max(1, Math.floor(t.pixelWidth / Math.pow(2, n))), d = Math.max(1, Math.floor(t.pixelHeight / Math.pow(2, n))), y = a ? 16 : 8;
        r += c / 4 * (d / 4) * y;
      }
    }
    return r;
  }
}
class Ui extends fe {
  constructor(...e) {
    super(...e), this.extensionName = In, this.prereadTypes = [F.TEXTURE];
  }
  /** @hidden */
  static register() {
    He.registerFormat("image/ktx2", new kc());
  }
  /** @hidden */
  preread(e) {
    return e.jsonDoc.json.textures.forEach((t) => {
      if (t.extensions && t.extensions[In]) {
        const a = t.extensions[In];
        t.source = a.source;
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
    return this.document.getRoot().listTextures().forEach((a) => {
      if (a.getMimeType() === "image/ktx2") {
        const r = e.imageIndexMap.get(a);
        t.json.textures.forEach((n) => {
          n.source === r && (n.extensions = n.extensions || {}, n.extensions[In] = {
            source: n.source
          }, delete n.source);
        });
      }
    }), this;
  }
}
Ui.EXTENSION_NAME = In;
class Bi extends pe {
  init() {
    this.extensionName = it, this.propertyType = "Transform", this.parentTypes = [F.TEXTURE_INFO];
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
Bi.EXTENSION_NAME = it;
class Gi extends fe {
  constructor(...e) {
    super(...e), this.extensionName = it;
  }
  /** Creates a new Transform property for use on a {@link TextureInfo}. */
  createTransform() {
    return new Bi(this.document.getGraph());
  }
  /** @hidden */
  read(e) {
    for (const [t, a] of Array.from(e.textureInfos.entries())) {
      if (!a.extensions || !a.extensions[it]) continue;
      const r = this.createTransform(), n = a.extensions[it];
      n.offset !== void 0 && r.setOffset(n.offset), n.rotation !== void 0 && r.setRotation(n.rotation), n.scale !== void 0 && r.setScale(n.scale), n.texCoord !== void 0 && r.setTexCoord(n.texCoord), t.setExtension(it, r);
    }
    return this;
  }
  /** @hidden */
  write(e) {
    const t = Array.from(e.textureInfoDefMap.entries());
    for (const [a, r] of t) {
      const n = a.getExtension(it);
      if (!n) continue;
      r.extensions = r.extensions || {};
      const s = {}, c = ne.eq;
      c(n.getOffset(), [0, 0]) || (s.offset = n.getOffset()), n.getRotation() !== 0 && (s.rotation = n.getRotation()), c(n.getScale(), [1, 1]) || (s.scale = n.getScale()), n.getTexCoord() != null && (s.texCoord = n.getTexCoord()), r.extensions[it] = s;
    }
    return this;
  }
}
Gi.EXTENSION_NAME = it;
const Cc = [F.ROOT, F.SCENE, F.NODE, F.MESH, F.MATERIAL, F.TEXTURE, F.ANIMATION];
class Pi extends pe {
  init() {
    this.extensionName = Oe, this.propertyType = "Packet", this.parentTypes = Cc;
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
    return this.set("context", ot({}, e));
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
    const a = ot({}, this.get("properties"));
    return t ? a[e] = t : delete a[e], this.set("properties", a);
  }
  /**********************************************************************************************
   * Serialize / Deserialize.
   */
  /**
   * Serializes the packet context and properties to a JSONLD object.
   */
  toJSONLD() {
    const e = ta(this.get("context")), t = ta(this.get("properties"));
    return ot({
      "@context": e
    }, t);
  }
  /**
   * Deserializes a JSONLD packet, then overwrites existing context and properties with
   * the new values.
   */
  fromJSONLD(e) {
    e = ta(e);
    const t = e["@context"];
    return t && this.set("context", t), delete e["@context"], this.set("properties", e);
  }
  /**********************************************************************************************
   * Validation.
   */
  /** @hidden */
  _assertContext(e) {
    if (!(e.split(":")[0] in this.get("context")))
      throw new Error(`${Oe}: Missing context for term, "${e}".`);
  }
}
Pi.EXTENSION_NAME = Oe;
function ta(o) {
  return JSON.parse(JSON.stringify(o));
}
class Li extends fe {
  constructor(...e) {
    super(...e), this.extensionName = Oe;
  }
  /** Creates a new XMP packet, to be linked with a {@link Document} or {@link Property Properties}. */
  createPacket() {
    return new Pi(this.document.getGraph());
  }
  /** Lists XMP packets currently defined in a {@link Document}. */
  listPackets() {
    return Array.from(this.properties);
  }
  /** @hidden */
  read(e) {
    var t;
    const a = (t = e.jsonDoc.json.extensions) == null ? void 0 : t[Oe];
    if (!a || !a.packets) return this;
    const r = e.jsonDoc.json, n = this.document.getRoot(), s = a.packets.map((y) => this.createPacket().fromJSONLD(y)), c = [[r.asset], r.scenes, r.nodes, r.meshes, r.materials, r.images, r.animations], d = [[n], n.listScenes(), n.listNodes(), n.listMeshes(), n.listMaterials(), n.listTextures(), n.listAnimations()];
    for (let y = 0; y < c.length; y++) {
      const _ = c[y] || [];
      for (let g = 0; g < _.length; g++) {
        const w = _[g];
        if (w.extensions && w.extensions[Oe]) {
          const E = w.extensions[Oe];
          d[y][g].setExtension(Oe, s[E.packet]);
        }
      }
    }
    return this;
  }
  /** @hidden */
  write(e) {
    const {
      json: t
    } = e.jsonDoc, a = [];
    for (const r of this.properties) {
      a.push(r.toJSONLD());
      for (const n of r.listParents()) {
        let s;
        switch (n.propertyType) {
          case F.ROOT:
            s = t.asset;
            break;
          case F.SCENE:
            s = t.scenes[e.sceneIndexMap.get(n)];
            break;
          case F.NODE:
            s = t.nodes[e.nodeIndexMap.get(n)];
            break;
          case F.MESH:
            s = t.meshes[e.meshIndexMap.get(n)];
            break;
          case F.MATERIAL:
            s = t.materials[e.materialIndexMap.get(n)];
            break;
          case F.TEXTURE:
            s = t.images[e.imageIndexMap.get(n)];
            break;
          case F.ANIMATION:
            s = t.animations[e.animationIndexMap.get(n)];
            break;
          default:
            s = null, this.document.getLogger().warn(`[${Oe}]: Unsupported parent property, "${n.propertyType}"`);
            break;
        }
        s && (s.extensions = s.extensions || {}, s.extensions[Oe] = {
          packet: a.length - 1
        });
      }
    }
    return a.length > 0 && (t.extensions = t.extensions || {}, t.extensions[Oe] = {
      packets: a
    }), this;
  }
}
Li.EXTENSION_NAME = Oe;
const Oc = [ha, bi, pi, _a, _i, gi, Ti, ma, Ei, ji, Si, ga, ya, vi, Oi, Ta, Fi, Ui, Gi, Li], Dc = [ai, la, ii, oi, ...Oc];
var Ds = (function() {
  var o = "b9H79TebbbeJq9Geueu9Geub9Gbb9Gvuuuuueu9Gduueu9Gluuuueu9Gvuuuuub9Gouuuuuub9Gluuuub9GiuuueuiKLdilevlevlooroowwvwbDDbelve9Weiiviebeoweuec:G;kekr;RiOo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9FW9U9J9V9KW9wWVtW949c919M9MWVbe8F9TW79O9V9Wt9FW9U9J9V9KW9wWVtW949c919M9MWV9c9V919U9KbdE9TW79O9V9Wt9FW9U9J9V9KW9wWVtW949wWV79P9V9UbiY9TW79O9V9Wt9FW9U9J9V9KW69U9KW949c919M9MWVbl8E9TW79O9V9Wt9FW9U9J9V9KW69U9KW949c919M9MWV9c9V919U9Kbv8A9TW79O9V9Wt9FW9U9J9V9KW69U9KW949wWV79P9V9UboE9TW79O9V9Wt9FW9U9J9V9KW69U9KW949tWG91W9U9JWbra9TW79O9V9Wt9FW9U9J9V9KW69U9KW949tWG91W9U9JW9c9V919U9KbwL9TW79O9V9Wt9FW9U9J9V9KWS9P2tWV9p9JtbDK9TW79O9V9Wt9FW9U9J9V9KWS9P2tWV9r919HtbqL9TW79O9V9Wt9FW9U9J9V9KWS9P2tWVT949WbkE9TW79O9V9Wt9F9V9Wt9P9T9P96W9wWVtW94J9H9J9OWbPa9TW79O9V9Wt9F9V9Wt9P9T9P96W9wWVtW94J9H9J9OW9ttV9P9Wbsa9TW79O9V9Wt9F9V9Wt9P9T9P96W9wWVtW94SWt9J9O9sW9T9H9WbzK9TW79O9V9Wt9F79W9Ht9P9H29t9VVt9sW9T9H9WbHl79IV9RbODwebcekdQXq;C9oLdbk;GqeKu8Jjjjjbcjo9Rgv8Kjjjjbcbhodnalcefae0mbabcbRbN:kjjbc:GeV86bbavcjdfcbcjdzNjjjb8AdnaiTmbavcjdfadalz:tjjjb8Akabaefhrabcefhwavalfcbcbcjdal9RalcFe0EzNjjjb8Aavavcjdfalz:tjjjbhDcj;abal9Uc;WFbGgecjdaecjd6Ehqcbhkindndnaiak9nmbaDcjlfcbcjdzNjjjb8Aaqaiak9Rakaqfai6Egxcsfgecl4cifcd4hmadakal2fhPdndndnaec9WGgsTmbcbhzaPhHawhOxekdnaxmbalheinaraw9Ram6miawcbamzNjjjbamfhwaecufgembxvkkcbhAaPhOinaDaAfRbbhCaDcjlfheaOhoaxhXinaeaoRbbgQaC9RgCcetaC;acr4786bbaoalfhoaecefheaQhCaXcufgXmbkaraw9Ram6mdaOcefhOawcbamzNjjjbamfhwaAcefgAal9hmbxlkkindnaxTmbaDazfRbbhCaDcjlfheaHhoaxhXinaeaoRbbgQaC9RgCcetaC;acr4786bbaoalfhoaecefheaQhCaXcufgXmbkkaraO9Ram6mearaOcbamzNjjjbgLamfgw9RcK6mecbhKaDcjlfhOinaDcjlfaKfhYcwhAczhQceheindndnaegXce9hmbcuhoaYRbbmecbhodninaogecsSmeaecefhoaOaefcefRbbTmbkkcucbaecs6EhoxekaXcethocuaXtc;:bGcFb7hCcbheinaoaCaOaefRbb9nfhoaecefgecz9hmbkkaoaQaoaQ6geEhQaXaAaeEhAaXcetheaXcl6mbkdndndndnaAcufPdiebkaLaKco4fgeaeRbbcdciaAclSEaKci4coGtV86bbaAcw9hmeawaY8Pbb83bbawcwfaYcwf8Pbb83bbawczfhwxdkaLaKco4fgeaeRbbceaKci4coGtV86bbkdncwaA9Tg8Ambinawcb86bbawcefhwxbkkcuaAtcu7hYcbhEaOh3ina3hea8AhCcbhoinaeRbbgQaYcFeGgXaQaX6EaoaAtVhoaecefheaCcufgCmbkawao86bba3a8Afh3awcefhwaEa8AfgEcz6mbkcbheindnaOaefRbbgoaX6mbawao86bbawcefhwkaecefgecz9hmbkkdnaKczfgKas9pmbaOczfhOaraw9RcL0mekkaKas6meawTmeaHcefhHawhOazcefgzalSmixbkkcbhoxikcbhoaraw9Ralcaalca0E6mddnalc8F0mbawcbcaal9RgezNjjjbaefhwkawaDcjdfalz:tjjjbalfab9RhoxdkaDaPaxcufal2falz:tjjjb8Aaxakfhkawmbkcbhokavcjof8Kjjjjbaok9heeuaecaaeca0Eabcj;abae9Uc;WFbGgdcjdadcjd6Egdfcufad9Uae2adcl4cifcd4adV2fcefkmbcbabBdN:kjjbk:zse5u8Jjjjjbc;ae9Rgl8Kjjjjbcbhvdnaici9UgocHfae0mbabcbyd:e:kjjbgrc;GeV86bbalc;abfcFecjezNjjjb8AalcUfgw9cu83ibalc8WfgD9cu83ibalcyfgq9cu83ibalcafgk9cu83ibalcKfgx9cu83ibalczfgm9cu83ibal9cu83iwal9cu83ibabaefc9WfhPabcefgsaofhednaiTmbcmcsarcb9kgzEhHcbhOcbhAcbhCcbhXcbhQindnaeaP9nmbcbhvxikaQcufhvadaCcdtfgLydbhKaLcwfydbhYaLclfydbh8AcbhEdndndninalc;abfavcsGcitfgoydlh3dndndnaoydbgoaK9hmba3a8ASmekdnaoa8A9hmba3aY9hmbaEcefhExekaoaY9hmea3aK9hmeaEcdfhEkaEc870mdaXcufhvaLaEciGcx2goc:y1jjbfydbcdtfydbh3aLaocN1jjbfydbcdtfydbh8AaLaoc:q1jjbfydbcdtfydbhKcbhodnindnalavcsGcdtfydba39hmbaohYxdkcuhYavcufhvaocefgocz9hmbkkaOa3aOSgvaYce9iaYaH9oVgoGfhOdndndncbcsavEaYaoEgvcs9hmbarce9imba3a3aAa3cefaASgvEgAcefSmecmcsavEhvkasavaEcdtc;WeGV86bbavcs9hmea3aA9Rgvcetavc8F917hvinaeavcFb0crtavcFbGV86bbaecefheavcje6hoavcr4hvaoTmbka3hAxvkcPhvasaEcdtcPV86bba3hAkavTmiavaH9omicdhocehEaQhYxlkavcufhvaEclfgEc;ab9hmbkkdnaLceaYaOSceta8AaOSEcx2gvc:q1jjbfydbcdtfydbgKTaLavcN1jjbfydbcdtfydbg8AceSGaLavc:y1jjbfydbcdtfydbg3cdSGaOcb9hGazGg5ce9hmbaw9cu83ibaD9cu83ibaq9cu83ibak9cu83ibax9cu83ibam9cu83ibal9cu83iwal9cu83ibcbhOkcbhEaXcufgvhodnindnalaocsGcdtfydba8A9hmbaEhYxdkcuhYaocufhoaEcefgEcz9hmbkkcbhodnindnalavcsGcdtfydba39hmbaohExdkcuhEavcufhvaocefgocz9hmbkkaOaKaOSg8EfhLdndnaYcm0mbaYcefhYxekcbcsa8AaLSgvEhYaLavfhLkdndnaEcm0mbaEcefhExekcbcsa3aLSgvEhEaLavfhLkc9:cua8EEh8FcbhvaEaYcltVgacFeGhodndndninavcj1jjbfRbbaoSmeavcefgvcz9hmbxdkka5aKaO9havcm0VVmbasavc;WeV86bbxekasa8F86bbaeaa86bbaecefhekdna8EmbaKaA9Rgvcetavc8F917hvinaeavcFb0gocrtavcFbGV86bbavcr4hvaecefheaombkaKhAkdnaYcs9hmba8AaA9Rgvcetavc8F917hvinaeavcFb0gocrtavcFbGV86bbavcr4hvaecefheaombka8AhAkdnaEcs9hmba3aA9Rgvcetavc8F917hvinaeavcFb0gocrtavcFbGV86bbavcr4hvaecefheaombka3hAkalaXcdtfaKBdbaXcefcsGhvdndnaYPzbeeeeeeeeeeeeeebekalavcdtfa8ABdbaXcdfcsGhvkdndnaEPzbeeeeeeeeeeeeeebekalavcdtfa3BdbavcefcsGhvkcihoalc;abfaQcitfgEaKBdlaEa8ABdbaQcefcsGhYcdhEavhXaLhOxekcdhoalaXcdtfa3BdbcehEaXcefcsGhXaQhYkalc;abfaYcitfgva8ABdlava3Bdbalc;abfaQaEfcsGcitfgva3BdlavaKBdbascefhsaQaofcsGhQaCcifgCai6mbkkcbhvaeaP0mbcbhvinaeavfavcj1jjbfRbb86bbavcefgvcz9hmbkaeab9Ravfhvkalc;aef8KjjjjbavkZeeucbhddninadcefgdc8F0meceadtae6mbkkadcrfcFeGcr9Uci2cdfabci9U2cHfkmbcbabBd:e:kjjbk:ydewu8Jjjjjbcz9Rhlcbhvdnaicvfae0mbcbhvabcbRb:e:kjjbc;qeV86bbal9cb83iwabcefhoabaefc98fhrdnaiTmbcbhwcbhDindnaoar6mbcbskadaDcdtfydbgqalcwfawaqav9Rgvavc8F91gv7av9Rc507gwcdtfgkydb9Rgvc8E91c9:Gavcdt7awVhvinaoavcFb0gecrtavcFbGV86bbavcr4hvaocefhoaembkakaqBdbaqhvaDcefgDai9hmbkkcbhvaoar0mbaocbBbbaoab9RclfhvkavkBeeucbhddninadcefgdc8F0meceadtae6mbkkadcwfcFeGcr9Uab2cvfk:bvli99dui99ludnaeTmbcuadcetcuftcu7:Yhvdndncuaicuftcu7:YgoJbbbZMgr:lJbbb9p9DTmbar:Ohwxekcjjjj94hwkcbhicbhDinalclfIdbgrJbbbbJbbjZalIdbgq:lar:lMalcwfIdbgk:lMgr:varJbbbb9BEgrNhxaqarNhrdndnakJbbbb9GTmbaxhqxekJbbjZar:l:tgqaq:maxJbbbb9GEhqJbbjZax:l:tgxax:marJbbbb9GEhrkdndnalcxfIdbgxJbbj:;axJbbj:;9GEgkJbbjZakJbbjZ9FEavNJbbbZJbbb:;axJbbbb9GEMgx:lJbbb9p9DTmbax:Ohmxekcjjjj94hmkdndnaqJbbj:;aqJbbj:;9GEgxJbbjZaxJbbjZ9FEaoNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:OhPxekcjjjj94hPkdndnarJbbj:;arJbbj:;9GEgqJbbjZaqJbbjZ9FEaoNJbbbZJbbb:;arJbbbb9GEMgr:lJbbb9p9DTmbar:Ohsxekcjjjj94hskdndnadcl9hmbabaifgzas86bbazcifam86bbazcdfaw86bbazcefaP86bbxekabaDfgzas87ebazcofam87ebazclfaw87ebazcdfaP87ebkalczfhlaiclfhiaDcwfhDaecufgembkkk;hlld99eud99eudnaeTmbdndncuaicuftcu7:YgvJbbbZMgo:lJbbb9p9DTmbao:Ohixekcjjjj94hikaic;8FiGhrinabcofcicdalclfIdb:lalIdb:l9EgialcwfIdb:lalaicdtfIdb:l9EEgialcxfIdb:lalaicdtfIdb:l9EEgiarV87ebdndnJbbj:;JbbjZalaicdtfIdbJbbbb9DEgoalaicd7cdtfIdbJ;Zl:1ZNNgwJbbj:;awJbbj:;9GEgDJbbjZaDJbbjZ9FEavNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohqxekcjjjj94hqkabcdfaq87ebdndnalaicefciGcdtfIdbJ;Zl:1ZNaoNgwJbbj:;awJbbj:;9GEgDJbbjZaDJbbjZ9FEavNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohqxekcjjjj94hqkabaq87ebdndnaoalaicufciGcdtfIdbJ;Zl:1ZNNgoJbbj:;aoJbbj:;9GEgwJbbjZawJbbjZ9FEavNJbbbZJbbb:;aoJbbbb9GEMgo:lJbbb9p9DTmbao:Ohixekcjjjj94hikabclfai87ebabcwfhbalczfhlaecufgembkkk:dvdxue998Jjjjjbcjd9Rgo8Kjjjjbadcd4hrdndndndnavcd9hmbadcl6meaohwarhDinawc:CuBdbawclfhwaDcufgDmbkaeTmiadcl6mdarcdthqalhkcbhxinaohwakhDarhminawawydbgPaDydbgscL4cFeGc:cufcbasEgsaPas9kEBdbaDclfhDawclfhwamcufgmmbkakaqfhkaxcefgxaeSmixbkkaeTmdxekaeTmekavcb9hadcl6gqVhzarcdthxavce9hhHcbhdindndndnaHmbaqmdc:CuhDalhwarhminaDawydbgPcL4cFeGc:cufcbaPEgPaDaP9kEhDawclfhwamcufgmmbxdkkc:CuhDazmbaohwalhmarhPinawamydbgscL4cFeGgkc8Aakc8A9kEc:cufcbasEBdbamclfhmawclfhwaPcufgPmbkkaqmbcbhwarhPinaDhmdnavceSmbaoawfydbhmkdndnalawfIdbgOcjjj;8iamai9RcefgmcLt9R::NJbbbZJbbb:;aOJbbbb9GEMgO:lJbbb9p9DTmbaO:Ohsxekcjjjj94hskabawfascFFFrGamcKtVBdbawclfhwaPcufgPmbkkabaxfhbalaxfhladcefgdae9hmbkkaocjdf8Kjjjjbk;HqdCui998Jjjjjbc:qd9Rgv8Kjjjjbavc:Sefcbc;KbzNjjjb8AcbhodnadTmbcbhoaiTmbdnabae9hmbavcuadcdtgradcFFFFi0Ecbyd:m:kjjbHjjjjbbgeBd:SeavceBd:mdaeabarz:tjjjb8Akavc:GefcwfcbBdbav9cb83i:Geavc:Gefaeadaiavc:Sefz:njjjbavyd:Gehwadci9UgDcbyd:m:kjjbHjjjjbbhravc:Sefavyd:mdgqcdtfarBdbavaqcefgkBd:mdarcbaDzNjjjbhxavc:SefakcdtfcuaicdtaicFFFFi0Ecbyd:m:kjjbHjjjjbbgmBdbavaqcdfgPBd:mdawhramhkinakalIdbalarydbgscwascw6Ecdtfc;ebfIdbMUdbarclfhrakclfhkaicufgimbkavc:SefaPcdtfcuaDcdtadcFFFF970Ecbyd:m:kjjbHjjjjbbgPBdbdnadci6mbaehraPhkaDhiinakamarydbcdtfIdbamarclfydbcdtfIdbMamarcwfydbcdtfIdbMUdbarcxfhrakclfhkaicufgimbkkaqcifhoavc;qbfhzavhravyd:KehHavyd:OehOcbhscbhkcbhAcehCinarhXcihQaeakci2gLcdtfgrydbhdarclfydbhqabaAcx2fgicwfarcwfydbgKBdbaiclfaqBdbaiadBdbaxakfce86bbazaKBdwazaqBdlazadBdbaPakcdtfcbBdbdnasTmbcihQaXhiinazaQcdtfaiydbgrBdbaQaraK9harad9haraq9hGGfhQaiclfhiascufgsmbkkaAcefhAcbhsinaOaHaeasaLfcdtfydbcdtgifydbcdtfgKhrawaifgqydbgdhidnadTmbdninarydbakSmearclfhraicufgiTmdxbkkaraKadcdtfc98fydbBdbaqaqydbcufBdbkascefgsci9hmbkdndnaQTmbcuhkJbbbbhYcbhqavyd:KehKavyd:OehLindndnawazaqcdtfydbcdtgsfydbgrmbaqcefhqxekaqcs0hiamasfgdIdbh8AadalcbaqcefgqaiEcdtfIdbalarcwarcw6Ecdtfc;ebfIdbMgEUdbaEa8A:thEarcdthiaLaKasfydbcdtfhrinaParydbgscdtfgdaEadIdbMg8AUdba8AaYaYa8A9DgdEhYasakadEhkarclfhraic98fgimbkkaqaQ9hmbkakcu9hmekaCaD9pmdindnaxaCfRbbmbaChkxdkaDaCcefgC9hmbxikkaQczaQcz6EhsazhraXhzakcu9hmbkkaocdtavc:Seffc98fhrdninaoTmearydbcbyd1:kjjbH:bjjjbbarc98fhraocufhoxbkkavc:qdf8Kjjjjbk;IlevucuaicdtgvaicFFFFi0Egocbyd:m:kjjbHjjjjbbhralalyd9GgwcdtfarBdbalawcefBd9GabarBdbaocbyd:m:kjjbHjjjjbbhralalyd9GgocdtfarBdbalaocefBd9GabarBdlcuadcdtadcFFFFi0Ecbyd:m:kjjbHjjjjbbhralalyd9GgocdtfarBdbalaocefBd9GabarBdwabydbcbavzNjjjb8Aadci9UhDdnadTmbabydbhoaehladhrinaoalydbcdtfgvavydbcefBdbalclfhlarcufgrmbkkdnaiTmbabydbhlabydlhrcbhvaihoinaravBdbarclfhralydbavfhvalclfhlaocufgombkkdnadci6mbabydlhrabydwhvcbhlinaecwfydbhoaeclfydbhdaraeydbcdtfgwawydbgwcefBdbavawcdtfalBdbaradcdtfgdadydbgdcefBdbavadcdtfalBdbaraocdtfgoaoydbgocefBdbavaocdtfalBdbaecxfheaDalcefgl9hmbkkdnaiTmbabydlheabydbhlinaeaeydbalydb9RBdbalclfhlaeclfheaicufgimbkkkQbabaeadaic:01jjbz:mjjjbkQbabaeadaic:C:jjjbz:mjjjbk9DeeuabcFeaicdtzNjjjbhlcbhbdnadTmbindnalaeydbcdtfgiydbcu9hmbaiabBdbabcefhbkaeclfheadcufgdmbkkabk;Wkivuo99lu8Jjjjjbc;W;Gb9Rgl8Kjjjjbcbhvalcj;Gbfcbc;KbzNjjjb8AalcuadcdtadcFFFFi0Egocbyd:m:kjjbHjjjjbbgrBdj9GalceBd;G9GalcFFF;7rBdwal9cFFF;7;3FF:;Fb83dbalcFFF97Bd;S9Gal9cFFF;7FFF:;u83d;K9Gaicd4hwdndnadmbJFFuFhDJFFuuhqJFFuuhkJFFuFhxJFFuuhmJFFuFhPxekawcdthsaehzincbhiinalaifgHazaifIdbgDaHIdbgxaxaD9EEUdbalc;K;GbfaifgHaDaHIdbgxaxaD9DEUdbaiclfgicx9hmbkazasfhzavcefgvad9hmbkalIdwhqalId;S9GhDalIdlhkalId;O9GhxalIdbhmalId;K9GhPkdndnadTmbJbbbbJbbjZJbbbbaPam:tgPaPJbbbb9DEgPaxak:tgxaxaP9DEgxaDaq:tgDaDax9DEgD:vaDJbbbb9BEhDawcdthsarhHadhzindndnaDaeIdbam:tNJb;au9eNJbbbZMgx:lJbbb9p9DTmbax:Ohixekcjjjj94hikaicztaicwtcj;GiGVaicsGVc:p;G:dKGcH2c;d;H:WKGcv2c;j:KM;jbGhvdndnaDaeclfIdbak:tNJb;au9eNJbbbZMgx:lJbbb9p9DTmbax:Ohixekcjjjj94hikaicztaicwtcj;GiGVaicsGVc:p;G:dKGcH2c;d;H:WKGcq2cM;j:KMeGavVhvdndnaDaecwfIdbaq:tNJb;au9eNJbbbZMgx:lJbbb9p9DTmbax:Ohixekcjjjj94hikaHavaicztaicwtcj;GiGVaicsGVc:p;G:dKGcH2c;d;H:WKGcC2c:KM;j:KdGVBdbaeasfheaHclfhHazcufgzmbkalcbcj;GbzNjjjbhiarhHadheinaiaHydbgzcFrGcx2fgvavydbcefBdbaiazcq4cFrGcx2fgvavydlcefBdlaiazcC4cFrGcx2fgzazydwcefBdwaHclfhHaecufgembxdkkalcbcj;GbzNjjjb8AkcbhHcbhzcbhecbhvinalaHfgiydbhsaiazBdbaicwfgwydbhOawavBdbaiclfgiydbhwaiaeBdbasazfhzaOavfhvawaefheaHcxfgHcj;Gb9hmbkcbhHalaocbyd:m:kjjbHjjjjbbgiBd:e9GdnadTmbabhzinazaHBdbazclfhzadaHcefgH9hmbkabhHadhzinalaraHydbgecdtfydbcFrGcx2fgvavydbgvcefBdbaiavcdtfaeBdbaHclfhHazcufgzmbkaihHadhzinalaraHydbgecdtfydbcq4cFrGcx2fgvavydlgvcefBdlabavcdtfaeBdbaHclfhHazcufgzmbkabhHadhzinalaraHydbgecdtfydbcC4cFrGcx2fgvavydwgvcefBdwaiavcdtfaeBdbaHclfhHazcufgzmbkcbhHinabaiydbcdtfaHBdbaiclfhiadaHcefgH9hmbkkclhidninaic98Smealcj;Gbfaifydbcbyd1:kjjbH:bjjjbbaic98fhixbkkalc;W;Gbf8Kjjjjbk9teiucbcbyd:q:kjjbgeabcifc98GfgbBd:q:kjjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabk9teiucbcbyd:q:kjjbgeabcrfc94GfgbBd:q:kjjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik9:eiuZbhedndncbyd:q:kjjbgdaecztgi9nmbcuheadai9RcFFifcz4nbcuSmekadhekcbabae9Rcifc98Gcbyd:q:kjjbfgdBd:q:kjjbdnadZbcztge9nmbadae9RcFFifcz4nb8Akkk:Iddbcjwk:edb4:h9w9N94:P:gW:j9O:ye9Pbbbbbbebbbdbbbebbbdbbbbbbbdbbbbbbbebbbbbbb:l29hZ;69:9kZ;N;76Z;rg97Z;z;o9xZ8J;B85Z;:;u9yZ;b;k9HZ:2;Z9DZ9e:l9mZ59A8KZ:r;T3Z:A:zYZ79OHZ;j4::8::Y:D9V8:bbbb9s:49:Z8R:hBZ9M9M;M8:L;z;o8:;8:PG89q;x:J878R:hQ8::M:B;e87bbbbbbjZbbjZbbjZ:E;V;N8::Y:DsZ9i;H;68:xd;R8:;h0838:;W:NoZbbbb:WV9O8:uf888:9i;H;68:9c9G;L89;n;m9m89;D8Ko8:bbbbf:8tZ9m836ZS:2AZL;zPZZ818EZ9e:lxZ;U98F8:819E;68:bc:eqkzebbbebbbdbbbaWbb", e = new Uint8Array([32, 0, 65, 2, 1, 106, 34, 33, 3, 128, 11, 4, 13, 64, 6, 253, 10, 7, 15, 116, 127, 5, 8, 12, 40, 16, 19, 54, 20, 9, 27, 255, 113, 17, 42, 67, 24, 23, 146, 148, 18, 14, 22, 45, 70, 69, 56, 114, 101, 21, 25, 63, 75, 136, 108, 28, 118, 29, 73, 115]);
  if (typeof WebAssembly != "object")
    return {
      supported: !1
    };
  var t, a = WebAssembly.instantiate(r(o), {}).then(function(E) {
    t = E.instance, t.exports.__wasm_call_ctors(), t.exports.meshopt_encodeVertexVersion(0), t.exports.meshopt_encodeIndexVersion(1);
  });
  function r(E) {
    for (var T = new Uint8Array(E.length), j = 0; j < E.length; ++j) {
      var A = E.charCodeAt(j);
      T[j] = A > 96 ? A - 97 : A > 64 ? A - 39 : A + 4;
    }
    for (var l = 0, j = 0; j < E.length; ++j)
      T[l++] = T[j] < 60 ? e[T[j]] : (T[j] - 60) * 64 + T[++j];
    return T.buffer.slice(0, l);
  }
  function n(E) {
    if (!E)
      throw new Error("Assertion failed");
  }
  function s(E) {
    return new Uint8Array(E.buffer, E.byteOffset, E.byteLength);
  }
  function c(E, T, j, A) {
    var l = t.exports.sbrk, S = l(T.length * 4), I = l(j * 4), k = new Uint8Array(t.exports.memory.buffer), v = s(T);
    k.set(v, S), A && A(S, S, T.length, j);
    var O = E(I, S, T.length, j);
    k = new Uint8Array(t.exports.memory.buffer);
    var m = new Uint32Array(j);
    new Uint8Array(m.buffer).set(k.subarray(I, I + j * 4)), v.set(k.subarray(S, S + T.length * 4)), l(S - l(0));
    for (var R = 0; R < T.length; ++R)
      T[R] = m[T[R]];
    return [m, O];
  }
  function d(E, T, j, A) {
    var l = t.exports.sbrk, S = l(j * 4), I = l(j * A), k = new Uint8Array(t.exports.memory.buffer);
    k.set(s(T), I), E(S, I, j, A), k = new Uint8Array(t.exports.memory.buffer);
    var v = new Uint32Array(j);
    return new Uint8Array(v.buffer).set(k.subarray(S, S + j * 4)), l(S - l(0)), v;
  }
  function y(E, T, j, A, l) {
    var S = t.exports.sbrk, I = S(T), k = S(A * l), v = new Uint8Array(t.exports.memory.buffer);
    v.set(s(j), k);
    var O = E(I, T, k, A, l), m = new Uint8Array(O);
    return m.set(v.subarray(I, I + O)), S(I - S(0)), m;
  }
  function _(E) {
    for (var T = 0, j = 0; j < E.length; ++j) {
      var A = E[j];
      T = T < A ? A : T;
    }
    return T;
  }
  function g(E, T) {
    if (n(T == 2 || T == 4), T == 4)
      return new Uint32Array(E.buffer, E.byteOffset, E.byteLength / 4);
    var j = new Uint16Array(E.buffer, E.byteOffset, E.byteLength / 2);
    return new Uint32Array(j);
  }
  function w(E, T, j, A, l, S, I) {
    var k = t.exports.sbrk, v = k(j * A), O = k(j * S), m = new Uint8Array(t.exports.memory.buffer);
    m.set(s(T), O), E(v, j, A, l, O, I);
    var R = new Uint8Array(j * A);
    return R.set(m.subarray(v, v + j * A)), k(v - k(0)), R;
  }
  return {
    ready: a,
    supported: !0,
    reorderMesh: function(E, T, j) {
      var A = T ? j ? t.exports.meshopt_optimizeVertexCacheStrip : t.exports.meshopt_optimizeVertexCache : void 0;
      return c(t.exports.meshopt_optimizeVertexFetchRemap, E, _(E) + 1, A);
    },
    reorderPoints: function(E, T) {
      return n(E instanceof Float32Array), n(E.length % T == 0), n(T >= 3), d(t.exports.meshopt_spatialSortRemap, E, E.length / T, T * 4);
    },
    encodeVertexBuffer: function(E, T, j) {
      n(j > 0 && j <= 256), n(j % 4 == 0);
      var A = t.exports.meshopt_encodeVertexBufferBound(T, j);
      return y(t.exports.meshopt_encodeVertexBuffer, A, E, T, j);
    },
    encodeIndexBuffer: function(E, T, j) {
      n(j == 2 || j == 4), n(T % 3 == 0);
      var A = g(E, j), l = t.exports.meshopt_encodeIndexBufferBound(T, _(A) + 1);
      return y(t.exports.meshopt_encodeIndexBuffer, l, A, T, 4);
    },
    encodeIndexSequence: function(E, T, j) {
      n(j == 2 || j == 4);
      var A = g(E, j), l = t.exports.meshopt_encodeIndexSequenceBound(T, _(A) + 1);
      return y(t.exports.meshopt_encodeIndexSequence, l, A, T, 4);
    },
    encodeGltfBuffer: function(E, T, j, A) {
      var l = {
        ATTRIBUTES: this.encodeVertexBuffer,
        TRIANGLES: this.encodeIndexBuffer,
        INDICES: this.encodeIndexSequence
      };
      return n(l[A]), l[A](E, T, j);
    },
    encodeFilterOct: function(E, T, j, A) {
      return n(j == 4 || j == 8), n(A >= 1 && A <= 16), w(t.exports.meshopt_encodeFilterOct, E, T, j, A, 16);
    },
    encodeFilterQuat: function(E, T, j, A) {
      return n(j == 8), n(A >= 4 && A <= 16), w(t.exports.meshopt_encodeFilterQuat, E, T, j, A, 16);
    },
    encodeFilterExp: function(E, T, j, A, l) {
      n(j > 0 && j % 4 == 0), n(A >= 1 && A <= 24);
      var S = {
        Separate: 0,
        SharedVector: 1,
        SharedComponent: 2
      };
      return w(t.exports.meshopt_encodeFilterExp, E, T, j, A, j, l ? S[l] : 1);
    }
  };
})(), Fs = (function() {
  var o = "b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuikqbeeedddillviebeoweuec:q;iekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbol79IV9Rbrq;w8Wqdbk;esezu8Jjjjjbcj;eb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Radz1jjjbhwcj;abad9Uc;WFbGgocjdaocjd6EhDaicefhocbhqdnindndndnaeaq9nmbaDaeaq9RaqaDfae6Egkcsfglcl4cifcd4hxalc9WGgmTmecbhPawcjdfhsaohzinaraz9Rax6mvarazaxfgo9RcK6mvczhlcbhHinalgic9WfgOawcj;cbffhldndndndndnazaOco4fRbbaHcoG4ciGPlbedibkal9cb83ibalcwf9cb83ibxikalaoRblaoRbbgOco4gAaAciSgAE86bbawcj;cbfaifglcGfaoclfaAfgARbbaOcl4ciGgCaCciSgCE86bbalcVfaAaCfgARbbaOcd4ciGgCaCciSgCE86bbalc7faAaCfgARbbaOciGgOaOciSgOE86bbalctfaAaOfgARbbaoRbegOco4gCaCciSgCE86bbalc91faAaCfgARbbaOcl4ciGgCaCciSgCE86bbalc4faAaCfgARbbaOcd4ciGgCaCciSgCE86bbalc93faAaCfgARbbaOciGgOaOciSgOE86bbalc94faAaOfgARbbaoRbdgOco4gCaCciSgCE86bbalc95faAaCfgARbbaOcl4ciGgCaCciSgCE86bbalc96faAaCfgARbbaOcd4ciGgCaCciSgCE86bbalc97faAaCfgARbbaOciGgOaOciSgOE86bbalc98faAaOfgORbbaoRbigoco4gAaAciSgAE86bbalc99faOaAfgORbbaocl4ciGgAaAciSgAE86bbalc9:faOaAfgORbbaocd4ciGgAaAciSgAE86bbalcufaOaAfglRbbaociGgoaociSgoE86bbalaofhoxdkalaoRbwaoRbbgOcl4gAaAcsSgAE86bbawcj;cbfaifglcGfaocwfaAfgARbbaOcsGgOaOcsSgOE86bbalcVfaAaOfgORbbaoRbegAcl4gCaCcsSgCE86bbalc7faOaCfgORbbaAcsGgAaAcsSgAE86bbalctfaOaAfgORbbaoRbdgAcl4gCaCcsSgCE86bbalc91faOaCfgORbbaAcsGgAaAcsSgAE86bbalc4faOaAfgORbbaoRbigAcl4gCaCcsSgCE86bbalc93faOaCfgORbbaAcsGgAaAcsSgAE86bbalc94faOaAfgORbbaoRblgAcl4gCaCcsSgCE86bbalc95faOaCfgORbbaAcsGgAaAcsSgAE86bbalc96faOaAfgORbbaoRbvgAcl4gCaCcsSgCE86bbalc97faOaCfgORbbaAcsGgAaAcsSgAE86bbalc98faOaAfgORbbaoRbogAcl4gCaCcsSgCE86bbalc99faOaCfgORbbaAcsGgAaAcsSgAE86bbalc9:faOaAfgORbbaoRbrgocl4gAaAcsSgAE86bbalcufaOaAfglRbbaocsGgoaocsSgoE86bbalaofhoxekalao8Pbb83bbalcwfaocwf8Pbb83bbaoczfhokdnaiam9pmbaHcdfhHaiczfhlarao9RcL0mekkaiam6mvaoTmvdnakTmbawaPfRbbhHawcj;cbfhlashiakhOinaialRbbgzce4cbazceG9R7aHfgH86bbaiadfhialcefhlaOcufgOmbkkascefhsaohzaPcefgPad9hmbxikkcbc99arao9Radcaadca0ESEhoxlkaoaxad2fhCdnakmbadhlinaoTmlarao9Rax6mlaoaxfhoalcufglmbkaChoxekcbhmawcjdfhAinarao9Rax6miawamfRbbhHawcj;cbfhlaAhiakhOinaialRbbgzce4cbazceG9R7aHfgH86bbaiadfhialcefhlaOcufgOmbkaAcefhAaoaxfhoamcefgmad9hmbkaChokabaqad2fawcjdfakad2z1jjjb8Aawawcjdfakcufad2fadz1jjjb8Aakaqfhqaombkc9:hoxekc9:hokavcj;ebf8Kjjjjbaok;cseHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgwce0mbavc;abfcFecjez:jjjjb8AavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhDaicefgqarfhidnaeTmbcmcsawceSEhkcbhxcbhmcbhPcbhwcbhlindnaiaD9nmbc9:hoxikdndnaqRbbgoc;Ve0mbavc;abfalaocu7gscl4fcsGcitfgzydlhrazydbhzdnaocsGgHak9pmbavawasfcsGcdtfydbaxaHEhoaHThsdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkaxasfhxcdhHavawcdtfaoBdbawasfhwcehsalhOxdkdndnaHcsSmbaHc987aHamffcefhoxekaicefhoai8SbbgHcFeGhsdndnaHcu9mmbaohixekaicvfhiascFbGhscrhHdninao8SbbgOcFbGaHtasVhsaOcu9kmeaocefhoaHcrfgHc8J9hmbxdkkaocefhikasce4cbasceG9R7amfhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhHavawcdtfaoBdbcehsawcefhwalhOaohmxekdnaocpe0mbaxcefgHavawaDaocsGfRbbgocl49RcsGcdtfydbaocz6gzEhravawao9RcsGcdtfydbaHazfgAaocsGgHEhoaHThCdndnadcd9hmbabaPcetfgHax87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHaxBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfaxBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgOaxBdlaOarBdbavawazfgwcsGcdtfaoBdbalcefcsGhOawaCfhwaxhzaAaCfhxxekaxcbaiRbbgOEgzaoc;:eSgHfhraOcsGhCaOcl4hAdndnaOcs0mbarcefhoxekarhoavawaA9RcsGcdtfydbhrkdndnaCmbaocefhxxekaohxavawaO9RcsGcdtfydbhokdndnaHTmbaicefhHxekaicdfhHai8SbegscFeGhzdnascu9kmbaicofhXazcFbGhzcrhidninaH8SbbgscFbGaitazVhzascu9kmeaHcefhHaicrfgic8J9hmbkaXhHxekaHcefhHkazce4cbazceG9R7amfgmhzkdndnaAcsSmbaHhsxekaHcefhsaH8SbbgicFeGhrdnaicu9kmbaHcvfhXarcFbGhrcrhidninas8SbbgHcFbGaitarVhraHcu9kmeascefhsaicrfgic8J9hmbkaXhsxekascefhskarce4cbarceG9R7amfgmhrkdndnaCcsSmbashixekascefhias8SbbgocFeGhHdnaocu9kmbascvfhXaHcFbGhHcrhodninai8SbbgscFbGaotaHVhHascu9kmeaicefhiaocrfgoc8J9hmbkaXhixekaicefhikaHce4cbaHceG9R7amfgmhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfazBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgXazBdlaXarBdbavawaOcz6aAcsSVfgwcsGcdtfaoBdbawaCTaCcsSVfhwalcefcsGhOkaqcefhqavc;abfaOcitfgOarBdlaOaoBdbavc;abfalasfcsGcitfgraoBdlarazBdbawcsGhwalaHfcsGhlaPcifgPae6mbkkcbc99aiaDSEhokavc;aef8Kjjjjbaok:flevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaic8Etc8F91aicd47avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaic8Etc8F91aicd47avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk;oiliui99iue99dnaeTmbcbhiabhlindndnJ;Zl81Zalcof8UebgvciV:Y:vgoal8Ueb:YNgrJb;:FSNJbbbZJbbb:;arJbbbb9GEMgw:lJbbb9p9DTmbaw:OhDxekcjjjj94hDkalclf8Uebhqalcdf8UebhkabaiavcefciGfcetfaD87ebdndnaoak:YNgwJb;:FSNJbbbZJbbb:;awJbbbb9GEMgx:lJbbb9p9DTmbax:OhDxekcjjjj94hDkabaiavciGfgkcd7cetfaD87ebdndnaoaq:YNgoJb;:FSNJbbbZJbbb:;aoJbbbb9GEMgx:lJbbb9p9DTmbax:OhDxekcjjjj94hDkabaiavcufciGfcetfaD87ebdndnJbbjZararN:tawawN:taoaoN:tgrJbbbbarJbbbb9GE:rJb;:FSNJbbbZMgr:lJbbb9p9DTmbar:Ohvxekcjjjj94hvkabakcetfav87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2gdTmbinababydbgecwtcw91:Yaece91cjjj98Gcjjj;8if::NUdbabclfhbadcufgdmbkkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkkkebcjwklz9Kbb", e = "b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuikqbbebeedddilve9Weeeviebeoweuec:q;Aekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbwl79IV9RbDq:p9sqlbzik9:evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaec:q:yjjbfai86bbaecitc:q1jjbfab8Piw83ibaecefgecjd9hmbkk:N8JlHud97euo978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Rad;8qbbcj;abad9UhlaicefhodnaeTmbadTmbalc;WFbGglcjdalcjd6EhwcbhDinawaeaD9RaDawfae6Egqcsfglc9WGgkci2hxakcethmalcl4cifcd4hPabaDad2fhsakc;ab6hzcbhHincbhOaohAdndninaraA9RaP6meavcj;cbfaOak2fhCaAaPfhocbhidnazmbarao9Rc;Gb6mbcbhlinaCalfhidndndndndnaAalco4fRbbgXciGPlbedibkaipxbbbbbbbbbbbbbbbbpklbxikaiaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbaoclfaYpQbfaKc:q:yjjbfRbbfhoxdkaiaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbaocwfaYpQbfaKc:q:yjjbfRbbfhoxekaiaopbbbpklbaoczfhokdndndndndnaXcd4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklzxikaiaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzaoclfaYpQbfaKc:q:yjjbfRbbfhoxdkaiaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzaocwfaYpQbfaKc:q:yjjbfRbbfhoxekaiaopbbbpklzaoczfhokdndndndndnaXcl4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklaxikaiaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaaoclfaYpQbfaKc:q:yjjbfRbbfhoxdkaiaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaaocwfaYpQbfaKc:q:yjjbfRbbfhoxekaiaopbbbpklaaoczfhokdndndndndnaXco4Plbedibkaipxbbbbbbbbbbbbbbbbpkl8WxikaiaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WaoclfaYpQbfaXc:q:yjjbfRbbfhoxdkaiaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WaocwfaYpQbfaXc:q:yjjbfRbbfhoxekaiaopbbbpkl8Waoczfhokalc;abfhialcjefak0meaihlarao9Rc;Fb0mbkkdnaiak9pmbaici4hlinarao9RcK6miaCaifhXdndndndndnaAaico4fRbbalcoG4ciGPlbedibkaXpxbbbbbbbbbbbbbbbbpkbbxikaXaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkbbaoclfaYpQbfaKc:q:yjjbfRbbfhoxdkaXaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkbbaocwfaYpQbfaKc:q:yjjbfRbbfhoxekaXaopbbbpkbbaoczfhokalcdfhlaiczfgiak6mbkkaoTmeaohAaOcefgOclSmdxbkkc9:hoxlkdnakTmbavcjdfaHfhiavaHfpbdbhYcbhXinaiavcj;cbfaXfglpblbgLcep9TaLpxeeeeeeeeeeeeeeeegQp9op9Hp9rgLalakfpblbg8Acep9Ta8AaQp9op9Hp9rg8ApmbzeHdOiAlCvXoQrLgEalamfpblbg3cep9Ta3aQp9op9Hp9rg3alaxfpblbg5cep9Ta5aQp9op9Hp9rg5pmbzeHdOiAlCvXoQrLg8EpmbezHdiOAlvCXorQLgQaQpmbedibedibedibediaYp9UgYp9AdbbaiadfglaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaladfglaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaladfglaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaladfglaYaEa8EpmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaladfglaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaladfglaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaladfglaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaladfglaYaLa8ApmwKDYq8AkEx3m5P8Es8FgLa3a5pmwKDYq8AkEx3m5P8Es8Fg8ApmbezHdiOAlvCXorQLgQaQpmbedibedibedibedip9UgYp9AdbbaladfglaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaladfglaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaladfglaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaladfglaYaLa8ApmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaladfglaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaladfglaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaladfglaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaladfhiaXczfgXak6mbkkaHclfgHad6mbkasavcjdfaqad2;8qbbavavcjdfaqcufad2fad;8qbbaqaDfgDae6mbkkcbc99arao9Radcaadca0ESEhokavcj;kbf8Kjjjjbaokwbz:bjjjbk::seHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgwce0mbavc;abfcFecje;8kbavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhDaicefgqarfhidnaeTmbcmcsawceSEhkcbhxcbhmcbhPcbhwcbhlindnaiaD9nmbc9:hoxikdndnaqRbbgoc;Ve0mbavc;abfalaocu7gscl4fcsGcitfgzydlhrazydbhzdnaocsGgHak9pmbavawasfcsGcdtfydbaxaHEhoaHThsdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkaxasfhxcdhHavawcdtfaoBdbawasfhwcehsalhOxdkdndnaHcsSmbaHc987aHamffcefhoxekaicefhoai8SbbgHcFeGhsdndnaHcu9mmbaohixekaicvfhiascFbGhscrhHdninao8SbbgOcFbGaHtasVhsaOcu9kmeaocefhoaHcrfgHc8J9hmbxdkkaocefhikasce4cbasceG9R7amfhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhHavawcdtfaoBdbcehsawcefhwalhOaohmxekdnaocpe0mbaxcefgHavawaDaocsGfRbbgocl49RcsGcdtfydbaocz6gzEhravawao9RcsGcdtfydbaHazfgAaocsGgHEhoaHThCdndnadcd9hmbabaPcetfgHax87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHaxBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfaxBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgOaxBdlaOarBdbavawazfgwcsGcdtfaoBdbalcefcsGhOawaCfhwaxhzaAaCfhxxekaxcbaiRbbgOEgzaoc;:eSgHfhraOcsGhCaOcl4hAdndnaOcs0mbarcefhoxekarhoavawaA9RcsGcdtfydbhrkdndnaCmbaocefhxxekaohxavawaO9RcsGcdtfydbhokdndnaHTmbaicefhHxekaicdfhHai8SbegscFeGhzdnascu9kmbaicofhXazcFbGhzcrhidninaH8SbbgscFbGaitazVhzascu9kmeaHcefhHaicrfgic8J9hmbkaXhHxekaHcefhHkazce4cbazceG9R7amfgmhzkdndnaAcsSmbaHhsxekaHcefhsaH8SbbgicFeGhrdnaicu9kmbaHcvfhXarcFbGhrcrhidninas8SbbgHcFbGaitarVhraHcu9kmeascefhsaicrfgic8J9hmbkaXhsxekascefhskarce4cbarceG9R7amfgmhrkdndnaCcsSmbashixekascefhias8SbbgocFeGhHdnaocu9kmbascvfhXaHcFbGhHcrhodninai8SbbgscFbGaotaHVhHascu9kmeaicefhiaocrfgoc8J9hmbkaXhixekaicefhikaHce4cbaHceG9R7amfgmhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfazBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgXazBdlaXarBdbavawaOcz6aAcsSVfgwcsGcdtfaoBdbawaCTaCcsSVfhwalcefcsGhOkaqcefhqavc;abfaOcitfgOarBdlaOaoBdbavc;abfalasfcsGcitfgraoBdlarazBdbawcsGhwalaHfcsGhlaPcifgPae6mbkkcbc99aiaDSEhokavc;aef8Kjjjjbaok:flevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaic8Etc8F91aicd47avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaic8Etc8F91aicd47avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:wPliuo97eue978Jjjjjbca9Rhiaec98Ghldndnadcl9hmbdnalTmbcbhvabhdinadadpbbbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbadczfhdavclfgval6mbkkalaeSmeaipxbbbbbbbbbbbbbbbbgqpklbaiabalcdtfgdaeciGglcdtgv;8qbbdnalTmbaiaipblbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDaqp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpklbkadaiav;8qbbskdnalTmbcbhvabhdinadczfgxaxpbbbgopxbbbbbbFFbbbbbbFFgkp9oadpbbbgDaopmbediwDqkzHOAKY8AEgwczp:Reczp:Sep;6egraDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eawczp:Sep;6egwp;Gearp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegrpxb;:FSb;:FSb;:FSb;:FSararp;Meaoaop;Meawaqawamp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFFbbFFbbFFbbFFbbp9oaoawp;Meaqp;Keczp:Rep9qgoarawp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogrpmwDKYqk8AExm35Ps8E8Fp9qpkbbadaDakp9oaoarpmbezHdiOAlvCXorQLp9qpkbbadcafhdavclfgval6mbkkalaeSmbaiaeciGgvcitgdfcbcaad9R;8kbaiabalcitfglad;8qbbdnavTmbaiaipblzgopxbbbbbbFFbbbbbbFFgkp9oaipblbgDaopmbediwDqkzHOAKY8AEgwczp:Reczp:Sep;6egraDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eawczp:Sep;6egwp;Gearp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegrpxb;:FSb;:FSb;:FSb;:FSararp;Meaoaop;Meawaqawamp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFFbbFFbbFFbbFFbbp9oaoawp;Meaqp;Keczp:Rep9qgoarawp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogrpmwDKYqk8AExm35Ps8E8Fp9qpklzaiaDakp9oaoarpmbezHdiOAlvCXorQLp9qpklbkalaiad;8qbbkk;4wllue97euv978Jjjjjbc8W9Rhidnaec98GglTmbcbhvabhoinaiaopbbbgraoczfgwpbbbgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklbaopxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaDakp;Mearp;Keamp9oaqakp;Mearp;Keczp:Rep9qgkpmbezHdiOAlvCXorQLgrp5baipblbpEb:T:j83ibaocwfarp5eaipblbpEe:T:j83ibawaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblbpEd:T:j83ibaocKfakp5eaipblbpEi:T:j83ibaocafhoavclfgval6mbkkdnalaeSmbaiaeciGgvcitgofcbcaao9R;8kbaiabalcitfgwao;8qbbdnavTmbaiaipblbgraipblzgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklaaipxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaDakp;Mearp;Keamp9oaqakp;Mearp;Keczp:Rep9qgkpmbezHdiOAlvCXorQLgrp5baipblapEb:T:j83ibaiarp5eaipblapEe:T:j83iwaiaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblapEd:T:j83izaiakp5eaipblapEi:T:j83iKkawaiao;8qbbkk:Pddiue978Jjjjjbc;ab9Rhidnadcd4ae2glc98GgvTmbcbheabhdinadadpbbbgocwp:Recwp:Sep;6eaocep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepkbbadczfhdaeclfgeav6mbkkdnavalSmbaialciGgecdtgdVcbc;abad9R;8kbaiabavcdtfgvad;8qbbdnaeTmbaiaipblbgocwp:Recwp:Sep;6eaocep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepklbkavaiad;8qbbkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkkebcjwklz9Tbb", t = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 3, 2, 0, 0, 5, 3, 1, 0, 1, 12, 1, 0, 10, 22, 2, 12, 0, 65, 0, 65, 0, 65, 0, 252, 10, 0, 0, 11, 7, 0, 65, 0, 253, 15, 26, 11]), a = new Uint8Array([32, 0, 65, 2, 1, 106, 34, 33, 3, 128, 11, 4, 13, 64, 6, 253, 10, 7, 15, 116, 127, 5, 8, 12, 40, 16, 19, 54, 20, 9, 27, 255, 113, 17, 42, 67, 24, 23, 146, 148, 18, 14, 22, 45, 70, 69, 56, 114, 101, 21, 25, 63, 75, 136, 108, 28, 118, 29, 73, 115]);
  if (typeof WebAssembly != "object")
    return {
      supported: !1
    };
  var r = WebAssembly.validate(t) ? c(e) : c(o), n, s = WebAssembly.instantiate(r, {}).then(function(l) {
    n = l.instance, n.exports.__wasm_call_ctors();
  });
  function c(l) {
    for (var S = new Uint8Array(l.length), I = 0; I < l.length; ++I) {
      var k = l.charCodeAt(I);
      S[I] = k > 96 ? k - 97 : k > 64 ? k - 39 : k + 4;
    }
    for (var v = 0, I = 0; I < l.length; ++I)
      S[v++] = S[I] < 60 ? a[S[I]] : (S[I] - 60) * 64 + S[++I];
    return S.buffer.slice(0, v);
  }
  function d(l, S, I, k, v, O, m) {
    var R = l.exports.sbrk, C = k + 3 & -4, D = R(C * v), B = R(O.length), L = new Uint8Array(l.exports.memory.buffer);
    L.set(O, B);
    var G = S(D, k, v, B, O.length);
    if (G == 0 && m && m(D, C, v), I.set(L.subarray(D, D + k * v)), R(D - R(0)), G != 0)
      throw new Error("Malformed buffer data: " + G);
  }
  var y = {
    NONE: "",
    OCTAHEDRAL: "meshopt_decodeFilterOct",
    QUATERNION: "meshopt_decodeFilterQuat",
    EXPONENTIAL: "meshopt_decodeFilterExp"
  }, _ = {
    ATTRIBUTES: "meshopt_decodeVertexBuffer",
    TRIANGLES: "meshopt_decodeIndexBuffer",
    INDICES: "meshopt_decodeIndexSequence"
  }, g = [], w = 0;
  function E(l) {
    var S = {
      object: new Worker(l),
      pending: 0,
      requests: {}
    };
    return S.object.onmessage = function(I) {
      var k = I.data;
      S.pending -= k.count, S.requests[k.id][k.action](k.value), delete S.requests[k.id];
    }, S;
  }
  function T(l) {
    for (var S = "self.ready = WebAssembly.instantiate(new Uint8Array([" + new Uint8Array(r) + "]), {}).then(function(result) { result.instance.exports.__wasm_call_ctors(); return result.instance; });self.onmessage = " + A.name + ";" + d.toString() + A.toString(), I = new Blob([S], { type: "text/javascript" }), k = URL.createObjectURL(I), v = g.length; v < l; ++v)
      g[v] = E(k);
    for (var v = l; v < g.length; ++v)
      g[v].object.postMessage({});
    g.length = l, URL.revokeObjectURL(k);
  }
  function j(l, S, I, k, v) {
    for (var O = g[0], m = 1; m < g.length; ++m)
      g[m].pending < O.pending && (O = g[m]);
    return new Promise(function(R, C) {
      var D = new Uint8Array(I), B = ++w;
      O.pending += l, O.requests[B] = { resolve: R, reject: C }, O.object.postMessage({ id: B, count: l, size: S, source: D, mode: k, filter: v }, [D.buffer]);
    });
  }
  function A(l) {
    var S = l.data;
    if (!S.id)
      return self.close();
    self.ready.then(function(I) {
      try {
        var k = new Uint8Array(S.count * S.size);
        d(I, I.exports[S.mode], k, S.count, S.size, S.source, I.exports[S.filter]), self.postMessage({ id: S.id, count: S.count, action: "resolve", value: k }, [k.buffer]);
      } catch (v) {
        self.postMessage({ id: S.id, count: S.count, action: "reject", value: v });
      }
    });
  }
  return {
    ready: s,
    supported: !0,
    useWorkers: function(l) {
      T(l);
    },
    decodeVertexBuffer: function(l, S, I, k, v) {
      d(n, n.exports.meshopt_decodeVertexBuffer, l, S, I, k, n.exports[y[v]]);
    },
    decodeIndexBuffer: function(l, S, I, k) {
      d(n, n.exports.meshopt_decodeIndexBuffer, l, S, I, k);
    },
    decodeIndexSequence: function(l, S, I, k) {
      d(n, n.exports.meshopt_decodeIndexSequence, l, S, I, k);
    },
    decodeGltfBuffer: function(l, S, I, k, v, O) {
      d(n, n.exports[_[v]], l, S, I, k, n.exports[y[O]]);
    },
    decodeGltfBufferAsync: function(l, S, I, k, v) {
      return g.length > 0 ? j(l, S, I, _[k], y[v]) : s.then(function() {
        var O = new Uint8Array(l * S);
        return d(n, n.exports[_[k]], O, l, S, I, n.exports[y[v]]), O;
      });
    }
  };
})();
(function() {
  var o = "b9H79Tebbbe9Hk9Geueu9Geub9Gbb9Gsuuuuuuuuuuuu99uueu9Gvuuuuub9Gvuuuuue999Gquuuuuuu99uueu9Gwuuuuuu99ueu9Giuuue999Gluuuueu9GiuuueuizsdilvoirwDbqqbeqlve9Weiiviebeoweuecj;jekr:Tewo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bbz9TW79O9V9Wt9F79P9T9W29P9M95bl8E9TW79O9V9Wt9F79P9T9W29P9M959x9Pt9OcttV9P9I91tW7bvQ9TW79O9V9Wt9F79P9T9W29P9M959q9V9P9Ut7boX9TW79O9V9Wt9F79P9T9W29P9M959t9J9H2Wbra9TW79O9V9Wt9F9V9Wt9P9T9P96W9wWVtW94SWt9J9O9sW9T9H9Wbwl79IV9RbDDwebcekdmxq:f97sdbk:39si8Au8A99zu8Jjjjjbc;W;ab9Rgs8Kjjjjbcbhzascxfcbc;Kbz:ljjjb8AdnabaeSmbabaeadcdtz:kjjjb8AkdndnamcdGmbcbhHxekasalcrfci4gecbyd;S1jjbHjjjjbbgOBdxasceBd2aOcbaez:ljjjbhAcbhlcbhednadTmbcbhlabheadhOinaAaeydbgCci4fgXaXRbbgXceaCcrGgCtV86bbaXcu7aC4ceGalfhlaeclfheaOcufgOmbkcualcdtalcFFFFi0Ehekasaecbyd;S1jjbHjjjjbbgHBdzascdBd2alcd4alfhCcehOinaOgecethOaeaC6mbkcdhzcbhQascuaecdtgOaecFFFFi0Ecbyd;S1jjbHjjjjbbgCBdCasciBd2aCcFeaOz:ljjjbhLdnadTmbaecufhXcbhKinabaQcdtfgYydbgAc:v;t;h;Ev2hCcbhedndninaLaCaXGgCcdtfg8AydbgOcuSmeaHaOcdtfydbaASmdaecefgeaCfhCaeaX9nmbxdkkaHaKcdtfaABdba8AaKBdbaKhOaKcefhKkaYaOBdbaQcefgQad9hmbkkaLcbyd;O1jjbH:bjjjbbascdBd2kascxfazcdtfcualcefgecdtaecFFFFi0Ecbyd;S1jjbHjjjjbbgEBdbasaEBdlasazceVgeBd2ascxfaecdtfcuadcitadcFFFFe0Ecbyd;S1jjbHjjjjbbg3Bdbasa3BdwasazcdfgeBd2asclfabadalcbz:cjjjbascxfaecdtfcualcdtg5alcFFFFi0Eg8Ecbyd;S1jjbHjjjjbbgOBdbasazcifgeBd2ascxfaecdtfa8Ecbyd;S1jjbHjjjjbbg8FBdbasazclVgaBd2alcd4alfhXcehCinaCgecethCaeaX6mbkcbhKascxfaacdtfghcuaecdtgCaecFFFFi0Ecbyd;S1jjbHjjjjbbgXBdbasazcvVggBd2aXcFeaCz:ljjjbhQdnalTmbavcd4hAaecufhCinaKhednaHTmbaHaKcdtfydbhekaiaeaA2cdtfgeydlgXcH4aX7c:F:b:DD2aeydbgXcH4aX7c;D;O:B8J27aeydwgecH4ae7c:3F;N8N27aCGheaKcdth8JdndndndndnaHTmbaHa8JfhYcbhXinaQaecdtfgLydbg8AcuSmlaiaHa8AcdtfydbaA2cdtfaiaYydbaA2cdtfcxz:ojjjbTmiaXcefgXaefaCGheaXaC9nmbxdkkaiaKaA2cdtfhYcbhXinaQaecdtfgLydbg8AcuSmiaia8AaA2cdtfaYcxz:ojjjbTmdaXcefgXaefaCGheaXaC9nmbkkcbhLkaLydbgecu9hmekaLaKBdbaKhekaOa8JfaeBdbaKcefgKal9hmbkcbhea8FhCinaCaeBdbaCclfhCalaecefge9hmbkcbheaOhCa8FhXindnaeaCydbgASmbaXa8FaAcdtfgAydbBdbaAaeBdbkaCclfhCaXclfhXalaecefge9hmbkkcbh8KaQcbyd;O1jjbH:bjjjbbasaaBd2ahalcbyd;S1jjbHjjjjbbgABdbasagBd2ascxfagcdtfa8Ecbyd;S1jjbHjjjjbbgeBdbasazcofgCBd2ascxfaCcdtfa8Ecbyd;S1jjbHjjjjbbgCBdbasazcrfg8LBd2aecFea5z:ljjjbh8MaCcFea5z:ljjjbh8NdnalTmba3cwfhyindnaEa8KgXcefg8Kcdtfydbg8AaEaXcdtgefydbgCSmba8AaC9Rh8Ja3aCcitfh5a8Naefhga8MaefhKcbhLindndna5aLcitfydbgQaX9hmbaKaXBdbagaXBdbxekdnaEaQcdtgafgeclfydbgCaeydbgeSmba3aecitg8AfydbaXSmeaCae9Rhhaecu7aCfhYaya8AfhCcbheinaYaeSmeaecefheaCydbh8AaCcwfhCa8AaX9hmbkaeah6meka8NaafgeaXaQaeydbcuSEBdbaKaQaXaKydbcuSEBdbkaLcefgLa8J9hmbkka8Kal9hmbkaOhCaHhLa8FhXa8Nh8Aa8MhQcbheindndnaeaCydbgY9hmbdnaqTmbaehYdnaHTmbaLydbhYkaqaYfRbbTmbaAaefcl86bbxdkdnaeaXydbgY9hmbaQydbhYdna8AydbgKcu9hmbaYcu9hmbaAaefcb86bbxikaAaefh8JdnaeaKSmbaeaYSmba8Jce86bbxika8Jcl86bbxdkdnaea8FaYcdtgKfydb9hmbdna8Aydbg8JcuSmbaea8JSmbaQydbg5cuSmbaea5Smba8NaKfydbgacuSmbaaaYSmba8MaKfydbgKcuSmbaKaYSmbdnaOa8JcdtfydbaOaKcdtfydb9hmbaOa5cdtfydbaOaacdtfydb9hmbaAaefcd86bbxlkaAaefcl86bbxikaAaefcl86bbxdkaAaefcl86bbxekaAaefaAaYfRbb86bbkaCclfhCaLclfhLaXclfhXa8Aclfh8AaQclfhQalaecefge9hmbkamceGTmbaAhealhCindnaeRbbce9hmbaecl86bbkaecefheaCcufgCmbkkascxfa8Lcdtfcualcx2alc;v:Q;v:Qe0Ecbyd;S1jjbHjjjjbbggBdbasazcwVg8JBd2agaialavaHz:djjjbh8PdndnaDmbcbhvxekascxfa8JcdtfcualaD2gecdtaecFFFFi0Ecbyd;S1jjbHjjjjbbgvBdbasazcDVg8JBd2alTmbarcd4hYdnaHTmbaDcdthKcbhLavhQinaoaHaLcdtfydbaY2cdtfheawhCaQhXaDh8AinaXaeIdbaCIdbNUdbaeclfheaCclfhCaXclfhXa8Acufg8AmbkaQaKfhQaLcefgLal9hmbxdkkaYcdthYaDcdthKcbhQavhLinaoheawhCaLhXaDh8AinaXaeIdbaCIdbNUdbaeclfheaCclfhCaXclfhXa8Acufg8AmbkaoaYfhoaLaKfhLaQcefgQal9hmbkkascxfa8Jcdtfcualc8S2gealc;D;O;f8U0EgXcbyd;S1jjbHjjjjbbgCBdbasa8Jcefg8ABd2aCcbaez:ljjjbh8KdndndnaDTmbascxfa8AcdtfaXcbyd;S1jjbHjjjjbbgqBdbasa8JcdfgCBd2aqcbaez:ljjjb8AascxfaCcdtfcualaD2gecltgCaecFFFFb0Ecbyd;S1jjbHjjjjbbgwBdbasa8JcifBd2awcbaCz:ljjjb8AadmexdkcbhqcbhwadTmekcbhLabhCindnagaCclfydbgQcx2fgeIdbagaCydbgYcx2fgXIdbgI:tg8RagaCcwfydbgKcx2fg8AIdlaXIdlg8S:tgRNa8AIdbaI:tg8UaeIdla8S:tg8VN:tg8Wa8WNa8Va8AIdwaXIdwg8X:tg8YNaRaeIdwa8X:tg8VN:tgRaRNa8Va8UNa8Ya8RN:tg8Ra8RNMM:rg8UJbbbb9ETmba8Wa8U:vh8Wa8Ra8U:vh8RaRa8U:vhRka8KaOaYcdtfydbc8S2fgeaRa8U:rg8UaRNNg8VaeIdbMUdbaea8Ra8Ua8RNg8ZNg8YaeIdlMUdlaea8Wa8Ua8WNg80Ng81aeIdwMUdwaea8ZaRNg8ZaeIdxMUdxaea80aRNgBaeIdzMUdzaea80a8RNg80aeIdCMUdCaeaRa8Ua8Wa8XNaRaINa8Sa8RNMM:mg8SNgINgRaeIdKMUdKaea8RaINg8RaeId3MUd3aea8WaINg8WaeIdaMUdaaeaIa8SNgIaeId8KMUd8Kaea8UaeIdyMUdya8KaOaQcdtfydbc8S2fgea8VaeIdbMUdbaea8YaeIdlMUdlaea81aeIdwMUdwaea8ZaeIdxMUdxaeaBaeIdzMUdzaea80aeIdCMUdCaeaRaeIdKMUdKaea8RaeId3MUd3aea8WaeIdaMUdaaeaIaeId8KMUd8Kaea8UaeIdyMUdya8KaOaKcdtfydbc8S2fgea8VaeIdbMUdbaea8YaeIdlMUdlaea81aeIdwMUdwaea8ZaeIdxMUdxaeaBaeIdzMUdzaea80aeIdCMUdCaeaRaeIdKMUdKaea8RaeId3MUd3aea8WaeIdaMUdaaeaIaeId8KMUd8Kaea8UaeIdyMUdyaCcxfhCaLcifgLad6mbkcbh8JabhYinaba8JcdtfhQcbhCinaAaQaCcj1jjbfydbcdtfydbgXfRbbhedndnaAaYaCfydbg8AfRbbgLc99fcFeGcpe0mbaeceSmbaecd9hmekdnaLcufcFeGce0mba8Ma8AcdtfydbaX9hmekdnaecufcFeGce0mba8NaXcdtfydba8A9hmekdnaLcv2aefc:q1jjbfRbbTmbaOaXcdtfydbaOa8Acdtfydb0mekdnagaXcx2fgKIdwaga8Acx2fgiIdwg8S:tgRaRNaKIdbaiIdbg8X:tg8Ra8RNaKIdlaiIdlg8V:tg8Ua8UNMM:rgIJbbbb9ETmbaRaI:vhRa8UaI:vh8Ua8RaI:vh8RkJbbacJbbacJbbjZaeceSEaLceSEh80dnagaQaCc:e1jjbfydbcdtfydbcx2fgeIdwa8S:tg8WaRa8WaRNaeIdba8X:tg81a8RNa8UaeIdla8V:tg8ZNMMg8YN:tg8Wa8WNa81a8Ra8YN:tgRaRNa8Za8Ua8YN:tg8Ra8RNMM:rg8UJbbbb9ETmba8Wa8U:vh8Wa8Ra8U:vh8RaRa8U:vhRka8KaOa8Acdtfydbc8S2fgeaRa80aINg8UaRNNg8YaeIdbMUdbaea8Ra8Ua8RNg80Ng81aeIdlMUdlaea8Wa8Ua8WNgINg8ZaeIdwMUdwaea80aRNg80aeIdxMUdxaeaIaRNgBaeIdzMUdzaeaIa8RNg83aeIdCMUdCaeaRa8Ua8Wa8SNaRa8XNa8Va8RNMM:mg8SNgINgRaeIdKMUdKaea8RaINg8RaeId3MUd3aea8WaINg8WaeIdaMUdaaeaIa8SNgIaeId8KMUd8Kaea8UaeIdyMUdya8KaOaXcdtfydbc8S2fgea8YaeIdbMUdbaea81aeIdlMUdlaea8ZaeIdwMUdwaea80aeIdxMUdxaeaBaeIdzMUdzaea83aeIdCMUdCaeaRaeIdKMUdKaea8RaeId3MUd3aea8WaeIdaMUdaaeaIaeId8KMUd8Kaea8UaeIdyMUdykaCclfgCcx9hmbkaYcxfhYa8Jcifg8Jad6mbkaDTmbcbhYinJbbbbh8XagabaYcdtfgeclfydbgKcx2fgCIdwagaeydbgicx2fgXIdwg8Z:tg8Ra8RNaCIdbaXIdbgB:tg8Wa8WNaCIdlaXIdlg83:tg8Ua8UNMMg80agaecwfydbg8Jcx2fgeIdwa8Z:tgINa8Ra8RaINa8WaeIdbaB:tg8SNa8UaeIdla83:tg8VNMMgRN:tJbbbbJbbjZa80aIaINa8Sa8SNa8Va8VNMMg81NaRaRN:tg8Y:va8YJbbbb9BEg8YNhUa81a8RNaIaRN:ta8YNh85a80a8VNa8UaRN:ta8YNh86a81a8UNa8VaRN:ta8YNh87a80a8SNa8WaRN:ta8YNh88a81a8WNa8SaRN:ta8YNh89a8Wa8VNa8Sa8UN:tgRaRNa8UaINa8Va8RN:tgRaRNa8Ra8SNaIa8WN:tgRaRNMM:r:rhRavaiaD2cdtfhCava8JaD2cdtfhXavaKaD2cdtfh8Aa8Z:mh8:a83:mhZaB:mhncbhLaDhQJbbbbh8VJbbbbh8YJbbbbh80Jbbbbh81Jbbbbh8ZJbbbbhBJbbbbh83JbbbbhcJbbbbh9cinasc;WbfaLfgecwfaRa85a8AIdbaCIdbgI:tg8UNaUaXIdbaI:tg8SNMg8RNUdbaeclfaRa87a8UNa86a8SNMg8WNUdbaeaRa89a8UNa88a8SNMg8UNUdbaecxfaRa8:a8RNaZa8WNaIana8UNMMMgINUdbaRa8Ra8WNNa81Mh81aRa8Ra8UNNa8ZMh8ZaRa8Wa8UNNaBMhBaRaIaINNa8XMh8XaRa8RaINNa8VMh8VaRa8WaINNa8YMh8YaRa8UaINNa80Mh80aRa8Ra8RNNa83Mh83aRa8Wa8WNNacMhcaRa8Ua8UNNa9cMh9caCclfhCa8Aclfh8AaXclfhXaLczfhLaQcufgQmbkaqaOaicdtfydbgCc8S2fgea9caeIdbMUdbaeacaeIdlMUdlaea83aeIdwMUdwaeaBaeIdxMUdxaea8ZaeIdzMUdzaea81aeIdCMUdCaea80aeIdKMUdKaea8YaeId3MUd3aea8VaeIdaMUdaaea8XaeId8KMUd8KaeaRaeIdyMUdyaqaOaKcdtfydbgKc8S2fgea9caeIdbMUdbaeacaeIdlMUdlaea83aeIdwMUdwaeaBaeIdxMUdxaea8ZaeIdzMUdzaea81aeIdCMUdCaea80aeIdKMUdKaea8YaeId3MUd3aea8VaeIdaMUdaaea8XaeId8KMUd8KaeaRaeIdyMUdyaqaOa8Jcdtfydbgic8S2fgea9caeIdbMUdbaeacaeIdlMUdlaea83aeIdwMUdwaeaBaeIdxMUdxaea8ZaeIdzMUdzaea81aeIdCMUdCaea80aeIdKMUdKaea8YaeId3MUd3aea8VaeIdaMUdaaea8XaeId8KMUd8KaeaRaeIdyMUdyawaCaD2cltfhQcbhCaDh8AinaQaCfgeasc;WbfaCfgXIdbaeIdbMUdbaeclfgLaXclfIdbaLIdbMUdbaecwfgLaXcwfIdbaLIdbMUdbaecxfgeaXcxfIdbaeIdbMUdbaCczfhCa8Acufg8AmbkawaKaD2cltfhQcbhCaDh8AinaQaCfgeasc;WbfaCfgXIdbaeIdbMUdbaeclfgLaXclfIdbaLIdbMUdbaecwfgLaXcwfIdbaLIdbMUdbaecxfgeaXcxfIdbaeIdbMUdbaCczfhCa8Acufg8AmbkawaiaD2cltfhQcbhCaDh8AinaQaCfgeasc;WbfaCfgXIdbaeIdbMUdbaeclfgLaXclfIdbaLIdbMUdbaecwfgLaXcwfIdbaLIdbMUdbaecxfgeaXcxfIdbaeIdbMUdbaCczfhCa8Acufg8AmbkaYcifgYad6mbkkasydlhJcbhednalTmbaJclfheaJydbh8AaAhCalhLcbhXincbaeydbgQa8A9RaCRbbcpeGEaXfhXaCcefhCaeclfheaQh8AaLcufgLmbkaXce4hekcuadae9Rcifg8Lcx2a8Lc;v:Q;v:Qe0Ecbyd;S1jjbHjjjjbbhhascxfasyd2gecdtfahBdbasaecefgCBd2ascxfaCcdtfcua8Lcdta8LcFFFFi0Ecbyd;S1jjbHjjjjbbgzBdbasaecdfgCBd2ascxfaCcdtfa8Ecbyd;S1jjbHjjjjbbg3BdbasaecifgCBd2ascxfaCcdtfalcbyd;S1jjbHjjjjbbg9eBdbasaeclfBd2a8PJbbjZamclGEhcJbbbbh83dnadak9nmbdna8Lci6mbaxaxNacacN:vhBaDclthTahcwfhSJbbbbh83inasclfabadgoalaOz:cjjjbabhicbhEcbhyinabaycdtfh8JcbheindnaOaiaefydbgXcdtgKfydbg8AaOa8Jaec:S1jjbfydbcdtfydbgCcdtfydbgLSmbaAaCfRbbgYcv2aAaXfRbbgQfc;a1jjbfRbbgaaQcv2aYfg5c;a1jjbfRbbgdVcFeGTmbdnaLa8A9nmba5c:q1jjbfRbbcFeGmekdnaQaY9hmbaQcufcFeGce0mba8MaKfydbaC9hmekahaEcx2fg8AaCaXadcFeGgLEBdla8AaXaCaLEBdba8AaLaaGcb9hBdwaEcefhEkaeclfgecx9hmbkdnaycifgyao9pmbaicxfhiaEcifa8L9nmekkdnaEmbaohdxikcbhYinJbbbbJbbjZa8KaOahaYcx2fg8AydlgLa8AydbgQa8AydwgCEgicdtfydbgac8S2gdfgeIdygR:vaRJbbbb9BEaeIdwagaQaLaCEgKcx2fgCIdwg8UNaeIdzaCIdbgINaeIdaMgRaRMMa8UNaeIdlaCIdlg8SNaeIdCa8UNaeId3MgRaRMMa8SNaeIdbaINaeIdxa8SNaeIdKMgRaRMMaINaeId8KMMM:lNh80JbbbbJbbjZa8KaOaQcdtfydbgyc8S2gXfgeIdygR:vaRJbbbb9BEaeIdwagaLcx2fgCIdwg8WNaeIdzaCIdbg8XNaeIdaMgRaRMMa8WNaeIdlaCIdlg8VNaeIdCa8WNaeId3MgRaRMMa8VNaeIdba8XNaeIdxa8VNaeIdKMgRaRMMa8XNaeId8KMMM:lNh81a8Acwfh8Ja8Aclfh5dnaDTmbaqaXfgXIdwa8WNaXIdza8XNaXIdaMgRaRMMa8WNaXIdla8VNaXIdCa8WNaXId3MgRaRMMa8VNaXIdba8XNaXIdxa8VNaXIdKMgRaRMMa8XNaXId8KMMMh8RavaLaD2cdtfhCawayaD2cltfheaXIdyh8YaDhXinaCIdbgRJbbb;aNaecxfIdba8WaecwfIdbNa8XaeIdbNa8VaeclfIdbNMMMNaRaRNa8YNa8RMMh8RaCclfhCaeczfheaXcufgXmbkaqadfgXIdwa8UNaXIdzaINaXIdaMgRaRMMa8UNaXIdla8SNaXIdCa8UNaXId3MgRaRMMa8SNaXIdbaINaXIdxa8SNaXIdKMgRaRMMaINaXId8KMMMh8WavaKaD2cdtfhCawaaaD2cltfheaXIdyh8XaDhXinaCIdbgRJbbb;aNaecxfIdba8UaecwfIdbNaIaeIdbNa8SaeclfIdbNMMMNaRaRNa8XNa8WMMh8WaCclfhCaeczfheaXcufgXmbka80a8W:lMh80a81a8R:lMh81ka5aLaKa81a809FgeEBdba8AaQaiaeEBdba8Ja81a80aeEUdbaYcefgYaE9hmbkasc;Wbfcbcj;abz:ljjjb8AaSheaEhCinasc;WbfaeydbcO4c;8ZGfgXaXydbcefBdbaecxfheaCcufgCmbkcbhecbhCinasc;WbfaefgXydbh8AaXaCBdba8AaCfhCaeclfgecj;ab9hmbkcbheaShCinasc;WbfaCydbcO4c;8ZGfgXaXydbgXcefBdbazaXcdtfaeBdbaCcxfhCaEaecefge9hmbkaoak9RgXci9Uh9hdnalTmbcbhea3hCinaCaeBdbaCclfhCalaecefge9hmbkkcbh9ia9ecbalz:ljjjbh6aXcO9Uh9ka9hce4h0asydwh9mcbhdcbh5dninahaza5cdtfydbcx2fg8JIdwg8RaB9Emeada9h9pmeJFFuuhRdna0aE9pmbahaza0cdtfydbcx2fIdwJbb;aZNhRkdna8RaR9ETmbada9k0mdkdna6aOa8Jydlg9ncdtg9ofydbg8Afg9pRbba6aOa8Jydbgicdtg9qfydbg9rfg9sRbbVmbdnaJa9rcdtfgeclfydbgCaeydbgeSmbaCae9RhQa9maecitfheaga8Acx2fgKcwfhyaKclfh8Eaga9rcx2fgacwfhmaaclfhrcbhCcehYdnindna3aeydbcdtfydbgXa8ASmba3aeclfydbcdtfydbgLa8ASmbaXaLSmbagaLcx2fgLIdbagaXcx2fgXIdbg8W:tgRarIdbaXIdlg8U:tg8XNaaIdba8W:tg8VaLIdla8U:tg8RN:tgIaRa8EIdba8U:tg8YNaKIdba8W:tg80a8RN:tg8UNa8RamIdbaXIdwg8S:tg81Na8XaLIdwa8S:tg8WN:tg8Xa8RayIdba8S:tg8ZNa8Ya8WN:tg8RNa8Wa8VNa81aRN:tg8Sa8Wa80Na8ZaRN:tgRNMMaIaINa8Xa8XNa8Sa8SNMMa8Ua8UNa8Ra8RNaRaRNMMN:rJbbj8:N9FmdkaecwfheaCcefgCaQ6hYaQaC9hmbkkaYceGTmba0cefh0xeka8Ka8Ac8S2gXfgea8Ka9rc8S2gLfgCIdbaeIdbMUdbaeaCIdlaeIdlMUdlaeaCIdwaeIdwMUdwaeaCIdxaeIdxMUdxaeaCIdzaeIdzMUdzaeaCIdCaeIdCMUdCaeaCIdKaeIdKMUdKaeaCId3aeId3MUd3aeaCIdaaeIdaMUdaaeaCId8KaeId8KMUd8KaeaCIdyaeIdyMUdydnaDTmbaqaXfgeaqaLfgCIdbaeIdbMUdbaeaCIdlaeIdlMUdlaeaCIdwaeIdwMUdwaeaCIdxaeIdxMUdxaeaCIdzaeIdzMUdzaeaCIdCaeIdCMUdCaeaCIdKaeIdKMUdKaeaCId3aeId3MUd3aeaCIdaaeIdaMUdaaeaCId8KaeId8KMUd8KaeaCIdyaeIdyMUdyaTa9r2hYaTa8A2hKawhCaDhLinaCaKfgeaCaYfgXIdbaeIdbMUdbaeclfgQaXclfIdbaQIdbMUdbaecwfgQaXcwfIdbaQIdbMUdbaecxfgeaXcxfIdbaeIdbMUdbaCczfhCaLcufgLmbkka8JcwfhCdndndndnaAaifgXRbbc9:fPdebdkaiheina3aecdtgefa8ABdba8Faefydbgeai9hmbxikka8Fa9ofydbhea8Fa9qfydbhia3a9qfa9nBdbaeh9nka3aicdtfa9nBdbka9sce86bba9pce86bbaCIdbgRa83a83aR9DEh83a9icefh9icecdaXRbbceSEadfhdka5cefg5aE9hmbkkdna9imbaohdxikdnalTmbcbhCa8MheindnaeydbgXcuSmbdnaCa3aXcdtg8AfydbgX9hmba8Ma8AfydbhXkaeaXBdbkaeclfhealaCcefgC9hmbkcbhCa8NheindnaeydbgXcuSmbdnaCa3aXcdtg8AfydbgX9hmba8Na8AfydbhXkaeaXBdbkaeclfhealaCcefgC9hmbkkcbhdabhecbhLindna3aeydbcdtfydbgCa3aeclfydbcdtfydbgXSmbaCa3aecwfydbcdtfydbg8ASmbaXa8ASmbabadcdtfgQaCBdbaQcwfa8ABdbaQclfaXBdbadcifhdkaecxfheaLcifgLao6mbkadak9nmdxbkkasclfabadalaOz:cjjjbkdnaHTmbadTmbadheinabaHabydbcdtfydbBdbabclfhbaecufgembkkdnaPTmbaPaca83:rNUdbkasyd2gecdtascxffc98fhOdninaeTmeaOydbcbyd;O1jjbH:bjjjbbaOc98fhOaecufhexbkkasc;W;abf8Kjjjjbadk;Yieouabydlhvabydbclfcbaicdtz:ljjjbhoadci9UhrdnadTmbdnalTmbaehwadhDinaoalawydbcdtfydbcdtfgqaqydbcefBdbawclfhwaDcufgDmbxdkkaehwadhDinaoawydbcdtfgqaqydbcefBdbawclfhwaDcufgDmbkkdnaiTmbcbhDaohwinawydbhqawaDBdbawclfhwaqaDfhDaicufgimbkkdnadci6mbinaecwfydbhwaeclfydbhDaeydbhidnalTmbalawcdtfydbhwalaDcdtfydbhDalaicdtfydbhikavaoaicdtfgqydbcitfaDBdbavaqydbcitfawBdlaqaqydbcefBdbavaoaDcdtfgqydbcitfawBdbavaqydbcitfaiBdlaqaqydbcefBdbavaoawcdtfgwydbcitfaiBdbavawydbcitfaDBdlawawydbcefBdbaecxfhearcufgrmbkkabydbcbBdbk;Podvuv998Jjjjjbca9RgvcFFF;7rBd3av9cFFF;7;3FF:;Fb83dCavcFFF97Bdzav9cFFF;7FFF:;u83dwdnadTmbaicd4hodnabmbdnalTmbcbhrinaealarcdtfydbao2cdtfhwcbhiinavcCfaifgDawaifIdbgqaDIdbgkakaq9EEUdbavcwfaifgDaqaDIdbgkakaq9DEUdbaiclfgicx9hmbkarcefgrad9hmbxikkaocdthrcbhwincbhiinavcCfaifgDaeaifIdbgqaDIdbgkakaq9EEUdbavcwfaifgDaqaDIdbgkakaq9DEUdbaiclfgicx9hmbkaearfheawcefgwad9hmbxdkkdnalTmbcbhrinabarcx2fgiaealarcdtfydbao2cdtfgwIdbUdbaiawIdlUdlaiawIdwUdwcbhiinavcCfaifgDawaifIdbgqaDIdbgkakaq9EEUdbavcwfaifgDaqaDIdbgkakaq9DEUdbaiclfgicx9hmbkarcefgrad9hmbxdkkaocdthlcbhraehwinabarcx2fgiaearao2cdtfgDIdbUdbaiaDIdlUdlaiaDIdwUdwcbhiinavcCfaifgDawaifIdbgqaDIdbgkakaq9EEUdbavcwfaifgDaqaDIdbgkakaq9DEUdbaiclfgicx9hmbkawalfhwarcefgrad9hmbkkJbbbbavIdwavIdCgk:tgqaqJbbbb9DEgqavIdxavIdKgx:tgmamaq9DEgqavIdzavId3gm:tgPaPaq9DEhPdnabTmbadTmbJbbbbJbbjZaP:vaPJbbbb9BEhqinabaqabIdbak:tNUdbabclfgvaqavIdbax:tNUdbabcwfgvaqavIdbam:tNUdbabcxfhbadcufgdmbkkaPk8MbabaeadaialavcbcbcbcbcbaoarawaDz:bjjjbk8MbabaeadaialavaoarawaDaqakaxamaPz:bjjjbk;3Aowud99wue99iul998Jjjjjbc;Wb9Rgw8KjjjjbdndnarmbcbhDxekawcxfcbc;Kbz:ljjjb8Aawcuadcx2adc;v:Q;v:Qe0Ecbyd;S1jjbHjjjjbbgqBdxawceBd2aqaeadaicbz:djjjb8AawcuadcdtadcFFFFi0Egkcbyd;S1jjbHjjjjbbgxBdzawcdBd2adcd4adfhmceheinaegicetheaiam6mbkcbhmawcuaicdtgPaicFFFFi0Ecbyd;S1jjbHjjjjbbgsBdCawciBd2dndnar:Zgz:rJbbbZMgH:lJbbb9p9DTmbaH:Ohexekcjjjj94hekaicufhOc:bwhAcbhCcbhXadhQinaChLaeaAgKcufaeaK9iEamgDcefaeaD9kEhYdndnadTmbaYcuf:YhHaqhiaxheadhmindndnaiIdbaHNJbbbZMg8A:lJbbb9p9DTmba8A:OhAxekcjjjj94hAkaAcCthAdndnaiclfIdbaHNJbbbZMg8A:lJbbb9p9DTmba8A:OhCxekcjjjj94hCkaCcqtaAVhAdndnaicwfIdbaHNJbbbZMg8A:lJbbb9p9DTmba8A:OhCxekcjjjj94hCkaeaAaCVBdbaicxfhiaeclfheamcufgmmbkascFeaPz:ljjjbhEcbh3cbh5indnaEaxa5cdtfydbgAcm4aA7c:v;t;h;Ev2gics4ai7aOGgmcdtfgCydbgecuSmbaeaASmbcehiinaEamaifaOGgmcdtfgCydbgecuSmeaicefhiaeaA9hmbkkaCaABdba3aecuSfh3a5cefg5ad9hmbxdkkascFeaPz:ljjjb8Acbh3kaDaYa3ar0giEhmaLa3aiEhCdna3arSmbaYaKaiEgAam9Rcd9imbdndnaXcl0mbdnaQ:ZgHaL:Zg8A:taY:Yg8EaD:Y:tg8Fa8EaK:Y:tgaa3:Zghaz:tNNNaHaz:taaNa8Aah:tNa8Aaz:ta8FNahaH:tNM:va8EMJbbbZMgH:lJbbb9p9DTmbaH:Ohexdkcjjjj94hexekamaAfcd9Theka3aQaiEhQaXcefgXcs9hmekkdndnaCmbcihicbhDxekcbhiawakcbyd;S1jjbHjjjjbbg5BdKawclBd2dndnadTmbamcuf:YhHaqhiaxheadhmindndnaiIdbaHNJbbbZMg8A:lJbbb9p9DTmba8A:OhAxekcjjjj94hAkaAcCthAdndnaiclfIdbaHNJbbbZMg8A:lJbbb9p9DTmba8A:OhCxekcjjjj94hCkaCcqtaAVhAdndnaicwfIdbaHNJbbbZMg8A:lJbbb9p9DTmba8A:OhCxekcjjjj94hCkaeaAaCVBdbaicxfhiaeclfheamcufgmmbkascFeaPz:ljjjbhEcbhDcbh3inaxa3cdtgYfydbgAcm4aA7c:v;t;h;Ev2gics4ai7hecbhidndninaEaeaOGgmcdtfgCydbgecuSmednaxaecdtgCfydbaASmbaicefgiamfheaiaO9nmekka5aCfydbhixekaCa3BdbaDhiaDcefhDka5aYfaiBdba3cefg3ad9hmbkcuaDc32giaDc;j:KM;jb0EhexekascFeaPz:ljjjb8AcbhDcbhekawaecbyd;S1jjbHjjjjbbgeBd3awcvBd2aecbaiz:ljjjbhCavcd4hxdnadTmbdnalTmbaxcdthEa5hAalheaqhmadhOinaCaAydbc32fgiamIdbaiIdbMUdbaiamclfIdbaiIdlMUdlaiamcwfIdbaiIdwMUdwaiaeIdbaiIdxMUdxaiaeclfIdbaiIdzMUdzaiaecwfIdbaiIdCMUdCaiaiIdKJbbjZMUdKaAclfhAaeaEfheamcxfhmaOcufgOmbxdkka5hmaqheadhAinaCamydbc32fgiaeIdbaiIdbMUdbaiaeclfIdbaiIdlMUdlaiaecwfIdbaiIdwMUdwaiaiIdxJbbbbMUdxaiaiIdzJbbbbMUdzaiaiIdCJbbbbMUdCaiaiIdKJbbjZMUdKamclfhmaecxfheaAcufgAmbkkdnaDTmbaChiaDheinaiaiIdbJbbbbJbbjZaicKfIdbgH:vaHJbbbb9BEgHNUdbaiclfgmaHamIdbNUdbaicwfgmaHamIdbNUdbaicxfgmaHamIdbNUdbaiczfgmaHamIdbNUdbaicCfgmaHamIdbNUdbaic3fhiaecufgembkkcbhAawcuaDcdtgYaDcFFFFi0Egicbyd;S1jjbHjjjjbbgeBdaawcoBd2awaicbyd;S1jjbHjjjjbbgEBd8KaecFeaYz:ljjjbh3dnadTmbaoaoNh8Aaxcdthxalheina8Aaec;C1jjbalEgmIdwaCa5ydbgOc32fgiIdC:tgHaHNamIdbaiIdx:tgHaHNamIdlaiIdz:tgHaHNMMNaqcwfIdbaiIdw:tgHaHNaqIdbaiIdb:tgHaHNaqclfIdbaiIdl:tgHaHNMMMhHdndna3aOcdtgifgmydbcuSmbaEaifIdbaH9ETmekamaABdbaEaifaHUdbka5clfh5aeaxfheaqcxfhqadaAcefgA9hmbkkaba3aYz:kjjjb8AcrhikaicdthiinaiTmeaic98fgiawcxffydbcbyd;O1jjbH:bjjjbbxbkkawc;Wbf8KjjjjbaDk:Odieui99iu8Jjjjjbca9RgicFFF;7rBd3ai9cFFF;7;3FF:;Fb83dCaicFFF97Bdzai9cFFF;7FFF:;u83dwdndnaembJbbjFhlJbbjFhvJbbjFhoxekadcd4cdthrcbhwincbhdinaicCfadfgDabadfIdbglaDIdbgvaval9EEUdbaicwfadfgDalaDIdbgvaval9DEUdbadclfgdcx9hmbkabarfhbawcefgwae9hmbkaiIdzaiId3:thoaiIdxaiIdK:thvaiIdwaiIdC:thlkJbbbbalalJbbbb9DEglavaval9DEglaoaoal9DEk9DeeuabcFeaicdtz:ljjjbhlcbhbdnadTmbindnalaeydbcdtfgiydbcu9hmbaiabBdbabcefhbkaeclfheadcufgdmbkkabk9teiucbcbyd;W1jjbgeabcifc98GfgbBd;W1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabk9teiucbcbyd;W1jjbgeabcrfc94GfgbBd;W1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik9:eiuZbhedndncbyd;W1jjbgdaecztgi9nmbcuheadai9RcFFifcz4nbcuSmekadhekcbabae9Rcifc98Gcbyd;W1jjbfgdBd;W1jjbdnadZbcztge9nmbadae9RcFFifcz4nb8Akk6eiucbhidnadTmbdninabRbbglaeRbbgv9hmeaecefheabcefhbadcufgdmbxdkkalav9Rhikaikk:bedbcjwk9Oebbbdbbbbbbbebbbeeebeebebbeeebebbbbbebebbbbbebbbdbbbbbbbbbbbbbbbeeeeebebbbbbebbbbbeebbbbbbbbbbbbbbbbbbbbbc;Owkxebbbdbbbj9Kbb", e = new Uint8Array([32, 0, 65, 2, 1, 106, 34, 33, 3, 128, 11, 4, 13, 64, 6, 253, 10, 7, 15, 116, 127, 5, 8, 12, 40, 16, 19, 54, 20, 9, 27, 255, 113, 17, 42, 67, 24, 23, 146, 148, 18, 14, 22, 45, 70, 69, 56, 114, 101, 21, 25, 63, 75, 136, 108, 28, 118, 29, 73, 115]);
  if (typeof WebAssembly != "object")
    return {
      supported: !1
    };
  var t, a = WebAssembly.instantiate(r(o), {}).then(function(T) {
    t = T.instance, t.exports.__wasm_call_ctors();
  });
  function r(T) {
    for (var j = new Uint8Array(T.length), A = 0; A < T.length; ++A) {
      var l = T.charCodeAt(A);
      j[A] = l > 96 ? l - 97 : l > 64 ? l - 39 : l + 4;
    }
    for (var S = 0, A = 0; A < T.length; ++A)
      j[S++] = j[A] < 60 ? e[j[A]] : (j[A] - 60) * 64 + j[++A];
    return j.buffer.slice(0, S);
  }
  function n(T) {
    if (!T)
      throw new Error("Assertion failed");
  }
  function s(T) {
    return new Uint8Array(T.buffer, T.byteOffset, T.byteLength);
  }
  function c(T, j, A) {
    var l = t.exports.sbrk, S = l(j.length * 4), I = l(A * 4), k = new Uint8Array(t.exports.memory.buffer), v = s(j);
    k.set(v, S);
    var O = T(I, S, j.length, A);
    k = new Uint8Array(t.exports.memory.buffer);
    var m = new Uint32Array(A);
    new Uint8Array(m.buffer).set(k.subarray(I, I + A * 4)), v.set(k.subarray(S, S + j.length * 4)), l(S - l(0));
    for (var R = 0; R < j.length; ++R)
      j[R] = m[j[R]];
    return [m, O];
  }
  function d(T) {
    for (var j = 0, A = 0; A < T.length; ++A) {
      var l = T[A];
      j = j < l ? l : j;
    }
    return j;
  }
  function y(T, j, A, l, S, I, k, v, O) {
    var m = t.exports.sbrk, R = m(4), C = m(A * 4), D = m(S * I), B = m(A * 4), L = new Uint8Array(t.exports.memory.buffer);
    L.set(s(l), D), L.set(s(j), B);
    var G = T(C, B, A, D, S, I, k, v, O, R);
    L = new Uint8Array(t.exports.memory.buffer);
    var H = new Uint32Array(G);
    s(H).set(L.subarray(C, C + G * 4));
    var P = new Float32Array(1);
    return s(P).set(L.subarray(R, R + 4)), m(R - m(0)), [H, P[0]];
  }
  function _(T, j, A, l, S, I, k, v, O, m, R, C, D) {
    var B = t.exports.sbrk, L = B(4), G = B(A * 4), H = B(S * I), P = B(S * v), V = B(O.length * 4), K = B(A * 4), f = m ? B(S) : 0, Q = new Uint8Array(t.exports.memory.buffer);
    Q.set(s(l), H), Q.set(s(k), P), Q.set(s(O), V), Q.set(s(j), K), m && Q.set(s(m), f);
    var oe = T(G, K, A, H, S, I, P, v, V, O.length, f, R, C, D, L);
    Q = new Uint8Array(t.exports.memory.buffer);
    var ae = new Uint32Array(oe);
    s(ae).set(Q.subarray(G, G + oe * 4));
    var se = new Float32Array(1);
    return s(se).set(Q.subarray(L, L + 4)), B(L - B(0)), [ae, se[0]];
  }
  function g(T, j, A, l) {
    var S = t.exports.sbrk, I = S(A * l), k = new Uint8Array(t.exports.memory.buffer);
    k.set(s(j), I);
    var v = T(I, A, l);
    return S(I - S(0)), v;
  }
  function w(T, j, A, l, S, I, k, v) {
    var O = t.exports.sbrk, m = O(v * 4), R = O(A * l), C = O(A * I), D = new Uint8Array(t.exports.memory.buffer);
    D.set(s(j), R), S && D.set(s(S), C);
    var B = T(m, R, A, l, C, I, k, v);
    D = new Uint8Array(t.exports.memory.buffer);
    var L = new Uint32Array(B);
    return s(L).set(D.subarray(m, m + B * 4)), O(m - O(0)), L;
  }
  var E = {
    LockBorder: 1,
    Sparse: 2,
    ErrorAbsolute: 4
  };
  return {
    ready: a,
    supported: !0,
    // set this to true to be able to use simplifyPoints and simplifyWithAttributes
    // note that these functions are experimental and may change interface/behavior in a way that will require revising calling code
    useExperimentalFeatures: !1,
    compactMesh: function(T) {
      n(T instanceof Uint32Array || T instanceof Int32Array || T instanceof Uint16Array || T instanceof Int16Array), n(T.length % 3 == 0);
      var j = T.BYTES_PER_ELEMENT == 4 ? T : new Uint32Array(T);
      return c(t.exports.meshopt_optimizeVertexFetchRemap, j, d(T) + 1);
    },
    simplify: function(T, j, A, l, S, I) {
      n(T instanceof Uint32Array || T instanceof Int32Array || T instanceof Uint16Array || T instanceof Int16Array), n(T.length % 3 == 0), n(j instanceof Float32Array), n(j.length % A == 0), n(A >= 3), n(l >= 0 && l <= T.length), n(l % 3 == 0), n(S >= 0);
      for (var k = 0, v = 0; v < (I ? I.length : 0); ++v)
        n(I[v] in E), k |= E[I[v]];
      var O = T.BYTES_PER_ELEMENT == 4 ? T : new Uint32Array(T), m = y(t.exports.meshopt_simplify, O, T.length, j, j.length / A, A * 4, l, S, k);
      return m[0] = T instanceof Uint32Array ? m[0] : new T.constructor(m[0]), m;
    },
    simplifyWithAttributes: function(T, j, A, l, S, I, k, v, O, m) {
      n(this.useExperimentalFeatures), n(T instanceof Uint32Array || T instanceof Int32Array || T instanceof Uint16Array || T instanceof Int16Array), n(T.length % 3 == 0), n(j instanceof Float32Array), n(j.length % A == 0), n(A >= 3), n(l instanceof Float32Array), n(l.length % S == 0), n(S >= 0), n(k == null || k.length == j.length), n(v >= 0 && v <= T.length), n(v % 3 == 0), n(O >= 0), n(Array.isArray(I)), n(S >= I.length), n(I.length <= 16);
      for (var R = 0, C = 0; C < (m ? m.length : 0); ++C)
        n(m[C] in E), R |= E[m[C]];
      var D = T.BYTES_PER_ELEMENT == 4 ? T : new Uint32Array(T), B = _(t.exports.meshopt_simplifyWithAttributes, D, T.length, j, j.length / A, A * 4, l, S * 4, new Float32Array(I), k ? new Uint8Array(k) : null, v, O, R);
      return B[0] = T instanceof Uint32Array ? B[0] : new T.constructor(B[0]), B;
    },
    getScale: function(T, j) {
      return n(T instanceof Float32Array), n(T.length % j == 0), n(j >= 3), g(t.exports.meshopt_simplifyScale, T, T.length / j, j * 4);
    },
    simplifyPoints: function(T, j, A, l, S, I) {
      return n(this.useExperimentalFeatures), n(T instanceof Float32Array), n(T.length % j == 0), n(j >= 3), n(A >= 0 && A <= T.length / j), l ? (n(l instanceof Float32Array), n(l.length % S == 0), n(S >= 3), n(T.length / j == l.length / S), w(t.exports.meshopt_simplifyPoints, T, T.length / j, j * 4, l, S * 4, I, A)) : w(t.exports.meshopt_simplifyPoints, T, T.length / j, j * 4, void 0, 0, 0, A);
    }
  };
})();
var Pn = { exports: {} };
const Fc = {}, Uc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Fc
}, Symbol.toStringTag, { value: "Module" })), Kn = /* @__PURE__ */ Hi(Uc);
var Bc = Pn.exports, Us;
function Gc() {
  return Us || (Us = 1, (function(o, e) {
    var t = t || {};
    t.scope = {}, t.arrayIteratorImpl = function(r) {
      var n = 0;
      return function() {
        return n < r.length ? { done: !1, value: r[n++] } : { done: !0 };
      };
    }, t.arrayIterator = function(r) {
      return { next: t.arrayIteratorImpl(r) };
    }, t.makeIterator = function(r) {
      var n = typeof Symbol < "u" && Symbol.iterator && r[Symbol.iterator];
      return n ? n.call(r) : t.arrayIterator(r);
    }, t.ASSUME_ES5 = !1, t.ASSUME_NO_NATIVE_MAP = !1, t.ASSUME_NO_NATIVE_SET = !1, t.SIMPLE_FROUND_POLYFILL = !1, t.ISOLATE_POLYFILLS = !1, t.FORCE_POLYFILL_PROMISE = !1, t.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1, t.getGlobal = function(r) {
      r = [typeof globalThis == "object" && globalThis, r, typeof window == "object" && window, typeof self == "object" && self, typeof zn == "object" && zn];
      for (var n = 0; n < r.length; ++n) {
        var s = r[n];
        if (s && s.Math == Math) return s;
      }
      throw Error("Cannot find global object");
    }, t.global = t.getGlobal(Bc), t.defineProperty = t.ASSUME_ES5 || typeof Object.defineProperties == "function" ? Object.defineProperty : function(r, n, s) {
      return r == Array.prototype || r == Object.prototype || (r[n] = s.value), r;
    }, t.IS_SYMBOL_NATIVE = typeof Symbol == "function" && typeof Symbol("x") == "symbol", t.TRUST_ES6_POLYFILLS = !t.ISOLATE_POLYFILLS || t.IS_SYMBOL_NATIVE, t.polyfills = {}, t.propertyToPolyfillSymbol = {}, t.POLYFILL_PREFIX = "$jscp$", t.polyfill = function(r, n, s, c) {
      n && (t.ISOLATE_POLYFILLS ? t.polyfillIsolated(r, n, s, c) : t.polyfillUnisolated(r, n, s, c));
    }, t.polyfillUnisolated = function(r, n, s, c) {
      for (s = t.global, r = r.split("."), c = 0; c < r.length - 1; c++) {
        var d = r[c];
        if (!(d in s)) return;
        s = s[d];
      }
      r = r[r.length - 1], c = s[r], n = n(c), n != c && n != null && t.defineProperty(s, r, { configurable: !0, writable: !0, value: n });
    }, t.polyfillIsolated = function(r, n, s, c) {
      var d = r.split(".");
      r = d.length === 1, c = d[0], c = !r && c in t.polyfills ? t.polyfills : t.global;
      for (var y = 0; y < d.length - 1; y++) {
        var _ = d[y];
        if (!(_ in c)) return;
        c = c[_];
      }
      d = d[d.length - 1], s = t.IS_SYMBOL_NATIVE && s === "es6" ? c[d] : null, n = n(s), n != null && (r ? t.defineProperty(t.polyfills, d, { configurable: !0, writable: !0, value: n }) : n !== s && (t.propertyToPolyfillSymbol[d] === void 0 && (s = 1e9 * Math.random() >>> 0, t.propertyToPolyfillSymbol[d] = t.IS_SYMBOL_NATIVE ? t.global.Symbol(d) : t.POLYFILL_PREFIX + s + "$" + d), t.defineProperty(c, t.propertyToPolyfillSymbol[d], { configurable: !0, writable: !0, value: n })));
    }, t.polyfill("Promise", function(r) {
      function n() {
        this.batch_ = null;
      }
      function s(_) {
        return _ instanceof d ? _ : new d(function(g, w) {
          g(_);
        });
      }
      if (r && (!(t.FORCE_POLYFILL_PROMISE || t.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION && typeof t.global.PromiseRejectionEvent > "u") || !t.global.Promise || t.global.Promise.toString().indexOf("[native code]") === -1)) return r;
      n.prototype.asyncExecute = function(_) {
        if (this.batch_ == null) {
          this.batch_ = [];
          var g = this;
          this.asyncExecuteFunction(function() {
            g.executeBatch_();
          });
        }
        this.batch_.push(_);
      };
      var c = t.global.setTimeout;
      n.prototype.asyncExecuteFunction = function(_) {
        c(_, 0);
      }, n.prototype.executeBatch_ = function() {
        for (; this.batch_ && this.batch_.length; ) {
          var _ = this.batch_;
          this.batch_ = [];
          for (var g = 0; g < _.length; ++g) {
            var w = _[g];
            _[g] = null;
            try {
              w();
            } catch (E) {
              this.asyncThrow_(E);
            }
          }
        }
        this.batch_ = null;
      }, n.prototype.asyncThrow_ = function(_) {
        this.asyncExecuteFunction(function() {
          throw _;
        });
      };
      var d = function(_) {
        this.state_ = 0, this.result_ = void 0, this.onSettledCallbacks_ = [], this.isRejectionHandled_ = !1;
        var g = this.createResolveAndReject_();
        try {
          _(g.resolve, g.reject);
        } catch (w) {
          g.reject(w);
        }
      };
      d.prototype.createResolveAndReject_ = function() {
        function _(E) {
          return function(T) {
            w || (w = !0, E.call(g, T));
          };
        }
        var g = this, w = !1;
        return { resolve: _(this.resolveTo_), reject: _(this.reject_) };
      }, d.prototype.resolveTo_ = function(_) {
        if (_ === this) this.reject_(new TypeError("A Promise cannot resolve to itself"));
        else if (_ instanceof d) this.settleSameAsPromise_(_);
        else {
          e: switch (typeof _) {
            case "object":
              var g = _ != null;
              break e;
            case "function":
              g = !0;
              break e;
            default:
              g = !1;
          }
          g ? this.resolveToNonPromiseObj_(_) : this.fulfill_(_);
        }
      }, d.prototype.resolveToNonPromiseObj_ = function(_) {
        var g = void 0;
        try {
          g = _.then;
        } catch (w) {
          this.reject_(w);
          return;
        }
        typeof g == "function" ? this.settleSameAsThenable_(g, _) : this.fulfill_(_);
      }, d.prototype.reject_ = function(_) {
        this.settle_(2, _);
      }, d.prototype.fulfill_ = function(_) {
        this.settle_(1, _);
      }, d.prototype.settle_ = function(_, g) {
        if (this.state_ != 0) throw Error("Cannot settle(" + _ + ", " + g + "): Promise already settled in state" + this.state_);
        this.state_ = _, this.result_ = g, this.state_ === 2 && this.scheduleUnhandledRejectionCheck_(), this.executeOnSettledCallbacks_();
      }, d.prototype.scheduleUnhandledRejectionCheck_ = function() {
        var _ = this;
        c(function() {
          if (_.notifyUnhandledRejection_()) {
            var g = t.global.console;
            typeof g < "u" && g.error(_.result_);
          }
        }, 1);
      }, d.prototype.notifyUnhandledRejection_ = function() {
        if (this.isRejectionHandled_) return !1;
        var _ = t.global.CustomEvent, g = t.global.Event, w = t.global.dispatchEvent;
        return typeof w > "u" ? !0 : (typeof _ == "function" ? _ = new _("unhandledrejection", { cancelable: !0 }) : typeof g == "function" ? _ = new g("unhandledrejection", { cancelable: !0 }) : (_ = t.global.document.createEvent("CustomEvent"), _.initCustomEvent("unhandledrejection", !1, !0, _)), _.promise = this, _.reason = this.result_, w(_));
      }, d.prototype.executeOnSettledCallbacks_ = function() {
        if (this.onSettledCallbacks_ != null) {
          for (var _ = 0; _ < this.onSettledCallbacks_.length; ++_) y.asyncExecute(this.onSettledCallbacks_[_]);
          this.onSettledCallbacks_ = null;
        }
      };
      var y = new n();
      return d.prototype.settleSameAsPromise_ = function(_) {
        var g = this.createResolveAndReject_();
        _.callWhenSettled_(g.resolve, g.reject);
      }, d.prototype.settleSameAsThenable_ = function(_, g) {
        var w = this.createResolveAndReject_();
        try {
          _.call(g, w.resolve, w.reject);
        } catch (E) {
          w.reject(E);
        }
      }, d.prototype.then = function(_, g) {
        function w(A, l) {
          return typeof A == "function" ? function(S) {
            try {
              E(A(S));
            } catch (I) {
              T(I);
            }
          } : l;
        }
        var E, T, j = new d(function(A, l) {
          E = A, T = l;
        });
        return this.callWhenSettled_(w(_, E), w(g, T)), j;
      }, d.prototype.catch = function(_) {
        return this.then(void 0, _);
      }, d.prototype.callWhenSettled_ = function(_, g) {
        function w() {
          switch (E.state_) {
            case 1:
              _(E.result_);
              break;
            case 2:
              g(E.result_);
              break;
            default:
              throw Error("Unexpected state: " + E.state_);
          }
        }
        var E = this;
        this.onSettledCallbacks_ == null ? y.asyncExecute(w) : this.onSettledCallbacks_.push(w), this.isRejectionHandled_ = !0;
      }, d.resolve = s, d.reject = function(_) {
        return new d(function(g, w) {
          w(_);
        });
      }, d.race = function(_) {
        return new d(function(g, w) {
          for (var E = t.makeIterator(_), T = E.next(); !T.done; T = E.next()) s(T.value).callWhenSettled_(g, w);
        });
      }, d.all = function(_) {
        var g = t.makeIterator(_), w = g.next();
        return w.done ? s([]) : new d(function(E, T) {
          function j(S) {
            return function(I) {
              A[S] = I, l--, l == 0 && E(A);
            };
          }
          var A = [], l = 0;
          do
            A.push(void 0), l++, s(w.value).callWhenSettled_(j(A.length - 1), T), w = g.next();
          while (!w.done);
        });
      }, d;
    }, "es6", "es3"), t.owns = function(r, n) {
      return Object.prototype.hasOwnProperty.call(r, n);
    }, t.assign = t.TRUST_ES6_POLYFILLS && typeof Object.assign == "function" ? Object.assign : function(r, n) {
      for (var s = 1; s < arguments.length; s++) {
        var c = arguments[s];
        if (c) for (var d in c) t.owns(c, d) && (r[d] = c[d]);
      }
      return r;
    }, t.polyfill("Object.assign", function(r) {
      return r || t.assign;
    }, "es6", "es3"), t.checkStringArgs = function(r, n, s) {
      if (r == null) throw new TypeError("The 'this' value for String.prototype." + s + " must not be null or undefined");
      if (n instanceof RegExp) throw new TypeError("First argument to String.prototype." + s + " must not be a regular expression");
      return r + "";
    }, t.polyfill("String.prototype.startsWith", function(r) {
      return r || function(n, s) {
        var c = t.checkStringArgs(this, n, "startsWith");
        n += "";
        var d = c.length, y = n.length;
        s = Math.max(0, Math.min(s | 0, c.length));
        for (var _ = 0; _ < y && s < d; ) if (c[s++] != n[_++]) return !1;
        return _ >= y;
      };
    }, "es6", "es3"), t.polyfill("Array.prototype.copyWithin", function(r) {
      function n(s) {
        return s = Number(s), s === 1 / 0 || s === -1 / 0 ? s : s | 0;
      }
      return r || function(s, c, d) {
        var y = this.length;
        if (s = n(s), c = n(c), d = d === void 0 ? y : n(d), s = 0 > s ? Math.max(y + s, 0) : Math.min(s, y), c = 0 > c ? Math.max(y + c, 0) : Math.min(c, y), d = 0 > d ? Math.max(y + d, 0) : Math.min(d, y), s < c) for (; c < d; ) c in this ? this[s++] = this[c++] : (delete this[s++], c++);
        else for (d = Math.min(d, y + c - s), s += d - c; d > c; ) --d in this ? this[--s] = this[d] : delete this[--s];
        return this;
      };
    }, "es6", "es3"), t.typedArrayCopyWithin = function(r) {
      return r || Array.prototype.copyWithin;
    }, t.polyfill("Int8Array.prototype.copyWithin", t.typedArrayCopyWithin, "es6", "es5"), t.polyfill("Uint8Array.prototype.copyWithin", t.typedArrayCopyWithin, "es6", "es5"), t.polyfill("Uint8ClampedArray.prototype.copyWithin", t.typedArrayCopyWithin, "es6", "es5"), t.polyfill("Int16Array.prototype.copyWithin", t.typedArrayCopyWithin, "es6", "es5"), t.polyfill("Uint16Array.prototype.copyWithin", t.typedArrayCopyWithin, "es6", "es5"), t.polyfill("Int32Array.prototype.copyWithin", t.typedArrayCopyWithin, "es6", "es5"), t.polyfill("Uint32Array.prototype.copyWithin", t.typedArrayCopyWithin, "es6", "es5"), t.polyfill("Float32Array.prototype.copyWithin", t.typedArrayCopyWithin, "es6", "es5"), t.polyfill("Float64Array.prototype.copyWithin", t.typedArrayCopyWithin, "es6", "es5");
    var a = (function() {
      var r = typeof document < "u" && document.currentScript ? document.currentScript.src : void 0;
      return typeof __filename < "u" && (r = r || __filename), function(n) {
        function s(b) {
          return f.locateFile ? f.locateFile(b, ge) : ge + b;
        }
        function c() {
          var b = ht.buffer;
          f.HEAP8 = Ne = new Int8Array(b), f.HEAP16 = mt = new Int16Array(b), f.HEAP32 = We = new Int32Array(b), f.HEAPU8 = _t = new Uint8Array(b), f.HEAPU16 = new Uint16Array(b), f.HEAPU32 = Ae = new Uint32Array(b), f.HEAPF32 = Ke = new Float32Array(b), f.HEAPF64 = new Float64Array(b);
        }
        function d(b) {
          throw f.onAbort && f.onAbort(b), b = "Aborted(" + b + ")", Le(b), Rt = !0, b = new WebAssembly.RuntimeError(b + ". Build with -sASSERTIONS for more info."), oe(b), b;
        }
        function y(b) {
          try {
            if (b == ue && _e) return new Uint8Array(_e);
            if (he) return he(b);
            throw "both async and sync fetching of the wasm failed";
          } catch (p) {
            d(p);
          }
        }
        function _() {
          if (!_e && (W || i)) {
            if (typeof fetch == "function" && !ue.startsWith("file://")) return fetch(ue, { credentials: "same-origin" }).then(function(b) {
              if (!b.ok) throw "failed to load wasm binary file at '" + ue + "'";
              return b.arrayBuffer();
            }).catch(function() {
              return y(ue);
            });
            if (Re) return new Promise(function(b, p) {
              Re(ue, function(x) {
                b(new Uint8Array(x));
              }, p);
            });
          }
          return Promise.resolve().then(function() {
            return y(ue);
          });
        }
        function g(b) {
          for (; 0 < b.length; ) b.shift()(f);
        }
        function w(b) {
          this.excPtr = b, this.ptr = b - 24, this.set_type = function(p) {
            Ae[this.ptr + 4 >> 2] = p;
          }, this.get_type = function() {
            return Ae[this.ptr + 4 >> 2];
          }, this.set_destructor = function(p) {
            Ae[this.ptr + 8 >> 2] = p;
          }, this.get_destructor = function() {
            return Ae[this.ptr + 8 >> 2];
          }, this.set_refcount = function(p) {
            We[this.ptr >> 2] = p;
          }, this.set_caught = function(p) {
            Ne[this.ptr + 12 >> 0] = p ? 1 : 0;
          }, this.get_caught = function() {
            return Ne[this.ptr + 12 >> 0] != 0;
          }, this.set_rethrown = function(p) {
            Ne[this.ptr + 13 >> 0] = p ? 1 : 0;
          }, this.get_rethrown = function() {
            return Ne[this.ptr + 13 >> 0] != 0;
          }, this.init = function(p, x) {
            this.set_adjusted_ptr(0), this.set_type(p), this.set_destructor(x), this.set_refcount(0), this.set_caught(!1), this.set_rethrown(!1);
          }, this.add_ref = function() {
            We[this.ptr >> 2] += 1;
          }, this.release_ref = function() {
            var p = We[this.ptr >> 2];
            return We[this.ptr >> 2] = p - 1, p === 1;
          }, this.set_adjusted_ptr = function(p) {
            Ae[this.ptr + 16 >> 2] = p;
          }, this.get_adjusted_ptr = function() {
            return Ae[this.ptr + 16 >> 2];
          }, this.get_exception_ptr = function() {
            if (gn(this.get_type())) return Ae[this.excPtr >> 2];
            var p = this.get_adjusted_ptr();
            return p !== 0 ? p : this.excPtr;
          };
        }
        function E() {
          function b() {
            if (!yt && (yt = !0, f.calledRun = !0, !Rt)) {
              if (ve = !0, g(wt), Q(f), f.onRuntimeInitialized && f.onRuntimeInitialized(), f.postRun) for (typeof f.postRun == "function" && (f.postRun = [f.postRun]); f.postRun.length; ) Dt.unshift(f.postRun.shift());
              g(Dt);
            }
          }
          if (!(0 < we)) {
            if (f.preRun) for (typeof f.preRun == "function" && (f.preRun = [f.preRun]); f.preRun.length; ) gt.unshift(f.preRun.shift());
            g(gt), 0 < we || (f.setStatus ? (f.setStatus("Running..."), setTimeout(function() {
              setTimeout(function() {
                f.setStatus("");
              }, 1), b();
            }, 1)) : b());
          }
        }
        function T() {
        }
        function j(b) {
          return (b || T).__cache__;
        }
        function A(b, p) {
          var x = j(p), N = x[b];
          return N || (N = Object.create((p || T).prototype), N.ptr = b, x[b] = N);
        }
        function l(b) {
          if (typeof b == "string") {
            for (var p = 0, x = 0; x < b.length; ++x) {
              var N = b.charCodeAt(x);
              127 >= N ? p++ : 2047 >= N ? p += 2 : 55296 <= N && 57343 >= N ? (p += 4, ++x) : p += 3;
            }
            if (p = Array(p + 1), x = 0, N = p.length, 0 < N) {
              N = x + N - 1;
              for (var U = 0; U < b.length; ++U) {
                var X = b.charCodeAt(U);
                if (55296 <= X && 57343 >= X) {
                  var yn = b.charCodeAt(++U);
                  X = 65536 + ((X & 1023) << 10) | yn & 1023;
                }
                if (127 >= X) {
                  if (x >= N) break;
                  p[x++] = X;
                } else {
                  if (2047 >= X) {
                    if (x + 1 >= N) break;
                    p[x++] = 192 | X >> 6;
                  } else {
                    if (65535 >= X) {
                      if (x + 2 >= N) break;
                      p[x++] = 224 | X >> 12;
                    } else {
                      if (x + 3 >= N) break;
                      p[x++] = 240 | X >> 18, p[x++] = 128 | X >> 12 & 63;
                    }
                    p[x++] = 128 | X >> 6 & 63;
                  }
                  p[x++] = 128 | X & 63;
                }
              }
              p[x] = 0;
            }
            return b = J.alloc(p, Ne), J.copy(p, Ne, b), b;
          }
          return b;
        }
        function S(b) {
          if (typeof b == "object") {
            var p = J.alloc(b, Ne);
            return J.copy(b, Ne, p), p;
          }
          return b;
        }
        function I(b) {
          if (typeof b == "object") {
            var p = J.alloc(b, mt);
            return J.copy(b, mt, p), p;
          }
          return b;
        }
        function k(b) {
          if (typeof b == "object") {
            var p = J.alloc(b, We);
            return J.copy(b, We, p), p;
          }
          return b;
        }
        function v(b) {
          if (typeof b == "object") {
            var p = J.alloc(b, Ke);
            return J.copy(b, Ke, p), p;
          }
          return b;
        }
        function O() {
          throw "cannot construct a VoidPtr, no constructor in IDL";
        }
        function m() {
          this.ptr = Ft(), j(m)[this.ptr] = this;
        }
        function R() {
          this.ptr = ze(), j(R)[this.ptr] = this;
        }
        function C() {
          this.ptr = Ht(), j(C)[this.ptr] = this;
        }
        function D() {
          this.ptr = qt(), j(D)[this.ptr] = this;
        }
        function B() {
          this.ptr = $t(), j(B)[this.ptr] = this;
        }
        function L() {
          this.ptr = tr(), j(L)[this.ptr] = this;
        }
        function G() {
          this.ptr = sr(), j(G)[this.ptr] = this;
        }
        function H() {
          this.ptr = br(), j(H)[this.ptr] = this;
        }
        function P() {
          this.ptr = Er(), j(P)[this.ptr] = this;
        }
        function V() {
          this.ptr = Gr(), j(V)[this.ptr] = this;
        }
        function K(b) {
          b && typeof b == "object" && (b = b.ptr), this.ptr = Yr(b), j(K)[this.ptr] = this;
        }
        n = n === void 0 ? {} : n;
        var f = typeof n < "u" ? n : {}, Q, oe;
        f.ready = new Promise(function(b, p) {
          Q = b, oe = p;
        });
        var ae = !1, se = !1;
        f.onRuntimeInitialized = function() {
          ae = !0, se && typeof f.onModuleLoaded == "function" && f.onModuleLoaded(f);
        }, f.onModuleParsed = function() {
          se = !0, ae && typeof f.onModuleLoaded == "function" && f.onModuleLoaded(f);
        }, f.isVersionSupported = function(b) {
          return typeof b != "string" ? !1 : (b = b.split("."), 2 > b.length || 3 < b.length ? !1 : b[0] == 1 && 0 <= b[1] && 5 >= b[1] ? !0 : !(b[0] != 0 || 10 < b[1]));
        };
        var te = Object.assign({}, f), W = typeof window == "object", i = typeof importScripts == "function", Be = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string", ge = "";
        if (Be) {
          var lt = Kn, ct = Kn;
          ge = i ? ct.dirname(ge) + "/" : __dirname + "/";
          var le = function(b, p) {
            return b = b.startsWith("file://") ? new URL(b) : ct.normalize(b), lt.readFileSync(b, p ? void 0 : "utf8");
          }, he = function(b) {
            return b = le(b, !0), b.buffer || (b = new Uint8Array(b)), b;
          }, Re = function(b, p, x) {
            b = b.startsWith("file://") ? new URL(b) : ct.normalize(b), lt.readFile(b, function(N, U) {
              N ? x(N) : p(U.buffer);
            });
          };
          1 < process.argv.length && process.argv[1].replace(/\\/g, "/"), process.argv.slice(2), f.inspect = function() {
            return "[Emscripten Module object]";
          };
        } else (W || i) && (i ? ge = self.location.href : typeof document < "u" && document.currentScript && (ge = document.currentScript.src), r && (ge = r), ge = ge.indexOf("blob:") !== 0 ? ge.substr(0, ge.replace(/[?#].*/, "").lastIndexOf("/") + 1) : "", le = function(b) {
          var p = new XMLHttpRequest();
          return p.open("GET", b, !1), p.send(null), p.responseText;
        }, i && (he = function(b) {
          var p = new XMLHttpRequest();
          return p.open("GET", b, !1), p.responseType = "arraybuffer", p.send(null), new Uint8Array(p.response);
        }), Re = function(b, p, x) {
          var N = new XMLHttpRequest();
          N.open("GET", b, !0), N.responseType = "arraybuffer", N.onload = function() {
            N.status == 200 || N.status == 0 && N.response ? p(N.response) : x();
          }, N.onerror = x, N.send(null);
        });
        f.print || console.log.bind(console);
        var Le = f.printErr || console.warn.bind(console);
        Object.assign(f, te), te = null;
        var _e;
        f.wasmBinary && (_e = f.wasmBinary), typeof WebAssembly != "object" && d("no native wasm support detected");
        var ht, Rt = !1, Ne, _t, mt, We, Ae, Ke, gt = [], wt = [], Dt = [], ve = !1, we = 0, Ge = null, ue = "draco_encoder.wasm";
        ue.startsWith("data:application/octet-stream;base64,") || (ue = s(ue));
        var vn = { b: function(b, p, x) {
          throw new w(b).init(p, x), b;
        }, a: function() {
          d("");
        }, d: function(b, p, x) {
          _t.copyWithin(b, p, p + x);
        }, c: function(b) {
          var p = _t.length;
          if (b >>>= 0, 2147483648 < b) return !1;
          for (var x = 1; 4 >= x; x *= 2) {
            var N = p * (1 + 0.2 / x);
            N = Math.min(N, b + 100663296);
            var U = Math;
            N = Math.max(b, N), U = U.min.call(
              U,
              2147483648,
              N + (65536 - N % 65536) % 65536
            );
            e: {
              N = ht.buffer;
              try {
                ht.grow(U - N.byteLength + 65535 >>> 16), c();
                var X = 1;
                break e;
              } catch {
              }
              X = void 0;
            }
            if (X) return !0;
          }
          return !1;
        } };
        (function() {
          function b(U, X) {
            f.asm = U.exports, ht = f.asm.e, c(), wt.unshift(f.asm.f), we--, f.monitorRunDependencies && f.monitorRunDependencies(we), we == 0 && Ge && (U = Ge, Ge = null, U());
          }
          function p(U) {
            b(U.instance);
          }
          function x(U) {
            return _().then(function(X) {
              return WebAssembly.instantiate(X, N);
            }).then(function(X) {
              return X;
            }).then(U, function(X) {
              Le("failed to asynchronously prepare wasm: " + X), d(X);
            });
          }
          var N = { a: vn };
          if (we++, f.monitorRunDependencies && f.monitorRunDependencies(we), f.instantiateWasm) try {
            return f.instantiateWasm(N, b);
          } catch (U) {
            Le("Module.instantiateWasm callback failed with error: " + U), oe(U);
          }
          return (function() {
            return _e || typeof WebAssembly.instantiateStreaming != "function" || ue.startsWith("data:application/octet-stream;base64,") || ue.startsWith("file://") || Be || typeof fetch != "function" ? x(p) : fetch(ue, { credentials: "same-origin" }).then(function(U) {
              return WebAssembly.instantiateStreaming(U, N).then(
                p,
                function(X) {
                  return Le("wasm streaming compile failed: " + X), Le("falling back to ArrayBuffer instantiation"), x(p);
                }
              );
            });
          })().catch(oe), {};
        })();
        var St = f._emscripten_bind_VoidPtr___destroy___0 = function() {
          return (St = f._emscripten_bind_VoidPtr___destroy___0 = f.asm.h).apply(null, arguments);
        }, Ft = f._emscripten_bind_GeometryAttribute_GeometryAttribute_0 = function() {
          return (Ft = f._emscripten_bind_GeometryAttribute_GeometryAttribute_0 = f.asm.i).apply(null, arguments);
        }, Ut = f._emscripten_bind_GeometryAttribute___destroy___0 = function() {
          return (Ut = f._emscripten_bind_GeometryAttribute___destroy___0 = f.asm.j).apply(null, arguments);
        }, ze = f._emscripten_bind_PointAttribute_PointAttribute_0 = function() {
          return (ze = f._emscripten_bind_PointAttribute_PointAttribute_0 = f.asm.k).apply(null, arguments);
        }, ut = f._emscripten_bind_PointAttribute_size_0 = function() {
          return (ut = f._emscripten_bind_PointAttribute_size_0 = f.asm.l).apply(null, arguments);
        }, Te = f._emscripten_bind_PointAttribute_attribute_type_0 = function() {
          return (Te = f._emscripten_bind_PointAttribute_attribute_type_0 = f.asm.m).apply(null, arguments);
        }, kn = f._emscripten_bind_PointAttribute_data_type_0 = function() {
          return (kn = f._emscripten_bind_PointAttribute_data_type_0 = f.asm.n).apply(null, arguments);
        }, Cn = f._emscripten_bind_PointAttribute_num_components_0 = function() {
          return (Cn = f._emscripten_bind_PointAttribute_num_components_0 = f.asm.o).apply(null, arguments);
        }, Bt = f._emscripten_bind_PointAttribute_normalized_0 = function() {
          return (Bt = f._emscripten_bind_PointAttribute_normalized_0 = f.asm.p).apply(null, arguments);
        }, Gt = f._emscripten_bind_PointAttribute_byte_stride_0 = function() {
          return (Gt = f._emscripten_bind_PointAttribute_byte_stride_0 = f.asm.q).apply(null, arguments);
        }, Pt = f._emscripten_bind_PointAttribute_byte_offset_0 = function() {
          return (Pt = f._emscripten_bind_PointAttribute_byte_offset_0 = f.asm.r).apply(null, arguments);
        }, Lt = f._emscripten_bind_PointAttribute_unique_id_0 = function() {
          return (Lt = f._emscripten_bind_PointAttribute_unique_id_0 = f.asm.s).apply(null, arguments);
        }, zt = f._emscripten_bind_PointAttribute___destroy___0 = function() {
          return (zt = f._emscripten_bind_PointAttribute___destroy___0 = f.asm.t).apply(null, arguments);
        }, Ht = f._emscripten_bind_PointCloud_PointCloud_0 = function() {
          return (Ht = f._emscripten_bind_PointCloud_PointCloud_0 = f.asm.u).apply(null, arguments);
        }, Vt = f._emscripten_bind_PointCloud_num_attributes_0 = function() {
          return (Vt = f._emscripten_bind_PointCloud_num_attributes_0 = f.asm.v).apply(null, arguments);
        }, Wt = f._emscripten_bind_PointCloud_num_points_0 = function() {
          return (Wt = f._emscripten_bind_PointCloud_num_points_0 = f.asm.w).apply(null, arguments);
        }, Kt = f._emscripten_bind_PointCloud___destroy___0 = function() {
          return (Kt = f._emscripten_bind_PointCloud___destroy___0 = f.asm.x).apply(null, arguments);
        }, qt = f._emscripten_bind_Mesh_Mesh_0 = function() {
          return (qt = f._emscripten_bind_Mesh_Mesh_0 = f.asm.y).apply(null, arguments);
        }, Xt = f._emscripten_bind_Mesh_num_faces_0 = function() {
          return (Xt = f._emscripten_bind_Mesh_num_faces_0 = f.asm.z).apply(null, arguments);
        }, Jt = f._emscripten_bind_Mesh_num_attributes_0 = function() {
          return (Jt = f._emscripten_bind_Mesh_num_attributes_0 = f.asm.A).apply(null, arguments);
        }, Yt = f._emscripten_bind_Mesh_num_points_0 = function() {
          return (Yt = f._emscripten_bind_Mesh_num_points_0 = f.asm.B).apply(null, arguments);
        }, Qt = f._emscripten_bind_Mesh_set_num_points_1 = function() {
          return (Qt = f._emscripten_bind_Mesh_set_num_points_1 = f.asm.C).apply(null, arguments);
        }, Zt = f._emscripten_bind_Mesh___destroy___0 = function() {
          return (Zt = f._emscripten_bind_Mesh___destroy___0 = f.asm.D).apply(null, arguments);
        }, $t = f._emscripten_bind_Metadata_Metadata_0 = function() {
          return ($t = f._emscripten_bind_Metadata_Metadata_0 = f.asm.E).apply(null, arguments);
        }, er = f._emscripten_bind_Metadata___destroy___0 = function() {
          return (er = f._emscripten_bind_Metadata___destroy___0 = f.asm.F).apply(null, arguments);
        }, tr = f._emscripten_bind_DracoInt8Array_DracoInt8Array_0 = function() {
          return (tr = f._emscripten_bind_DracoInt8Array_DracoInt8Array_0 = f.asm.G).apply(null, arguments);
        }, rr = f._emscripten_bind_DracoInt8Array_GetValue_1 = function() {
          return (rr = f._emscripten_bind_DracoInt8Array_GetValue_1 = f.asm.H).apply(null, arguments);
        }, nr = f._emscripten_bind_DracoInt8Array_size_0 = function() {
          return (nr = f._emscripten_bind_DracoInt8Array_size_0 = f.asm.I).apply(null, arguments);
        }, ar = f._emscripten_bind_DracoInt8Array___destroy___0 = function() {
          return (ar = f._emscripten_bind_DracoInt8Array___destroy___0 = f.asm.J).apply(null, arguments);
        }, sr = f._emscripten_bind_MetadataBuilder_MetadataBuilder_0 = function() {
          return (sr = f._emscripten_bind_MetadataBuilder_MetadataBuilder_0 = f.asm.K).apply(null, arguments);
        }, ir = f._emscripten_bind_MetadataBuilder_AddStringEntry_3 = function() {
          return (ir = f._emscripten_bind_MetadataBuilder_AddStringEntry_3 = f.asm.L).apply(null, arguments);
        }, or = f._emscripten_bind_MetadataBuilder_AddIntEntry_3 = function() {
          return (or = f._emscripten_bind_MetadataBuilder_AddIntEntry_3 = f.asm.M).apply(null, arguments);
        }, cr = f._emscripten_bind_MetadataBuilder_AddIntEntryArray_4 = function() {
          return (cr = f._emscripten_bind_MetadataBuilder_AddIntEntryArray_4 = f.asm.N).apply(null, arguments);
        }, ur = f._emscripten_bind_MetadataBuilder_AddDoubleEntry_3 = function() {
          return (ur = f._emscripten_bind_MetadataBuilder_AddDoubleEntry_3 = f.asm.O).apply(null, arguments);
        }, fr = f._emscripten_bind_MetadataBuilder___destroy___0 = function() {
          return (fr = f._emscripten_bind_MetadataBuilder___destroy___0 = f.asm.P).apply(null, arguments);
        }, br = f._emscripten_bind_PointCloudBuilder_PointCloudBuilder_0 = function() {
          return (br = f._emscripten_bind_PointCloudBuilder_PointCloudBuilder_0 = f.asm.Q).apply(null, arguments);
        }, dr = f._emscripten_bind_PointCloudBuilder_AddFloatAttribute_5 = function() {
          return (dr = f._emscripten_bind_PointCloudBuilder_AddFloatAttribute_5 = f.asm.R).apply(null, arguments);
        }, pr = f._emscripten_bind_PointCloudBuilder_AddInt8Attribute_5 = function() {
          return (pr = f._emscripten_bind_PointCloudBuilder_AddInt8Attribute_5 = f.asm.S).apply(null, arguments);
        }, lr = f._emscripten_bind_PointCloudBuilder_AddUInt8Attribute_5 = function() {
          return (lr = f._emscripten_bind_PointCloudBuilder_AddUInt8Attribute_5 = f.asm.T).apply(null, arguments);
        }, hr = f._emscripten_bind_PointCloudBuilder_AddInt16Attribute_5 = function() {
          return (hr = f._emscripten_bind_PointCloudBuilder_AddInt16Attribute_5 = f.asm.U).apply(null, arguments);
        }, _r = f._emscripten_bind_PointCloudBuilder_AddUInt16Attribute_5 = function() {
          return (_r = f._emscripten_bind_PointCloudBuilder_AddUInt16Attribute_5 = f.asm.V).apply(null, arguments);
        }, mr = f._emscripten_bind_PointCloudBuilder_AddInt32Attribute_5 = function() {
          return (mr = f._emscripten_bind_PointCloudBuilder_AddInt32Attribute_5 = f.asm.W).apply(null, arguments);
        }, gr = f._emscripten_bind_PointCloudBuilder_AddUInt32Attribute_5 = function() {
          return (gr = f._emscripten_bind_PointCloudBuilder_AddUInt32Attribute_5 = f.asm.X).apply(null, arguments);
        }, yr = f._emscripten_bind_PointCloudBuilder_AddMetadata_2 = function() {
          return (yr = f._emscripten_bind_PointCloudBuilder_AddMetadata_2 = f.asm.Y).apply(null, arguments);
        }, Tr = f._emscripten_bind_PointCloudBuilder_SetMetadataForAttribute_3 = function() {
          return (Tr = f._emscripten_bind_PointCloudBuilder_SetMetadataForAttribute_3 = f.asm.Z).apply(null, arguments);
        }, xr = f._emscripten_bind_PointCloudBuilder_SetNormalizedFlagForAttribute_3 = function() {
          return (xr = f._emscripten_bind_PointCloudBuilder_SetNormalizedFlagForAttribute_3 = f.asm._).apply(null, arguments);
        }, Ar = f._emscripten_bind_PointCloudBuilder___destroy___0 = function() {
          return (Ar = f._emscripten_bind_PointCloudBuilder___destroy___0 = f.asm.$).apply(null, arguments);
        }, Er = f._emscripten_bind_MeshBuilder_MeshBuilder_0 = function() {
          return (Er = f._emscripten_bind_MeshBuilder_MeshBuilder_0 = f.asm.aa).apply(null, arguments);
        }, Ir = f._emscripten_bind_MeshBuilder_AddFacesToMesh_3 = function() {
          return (Ir = f._emscripten_bind_MeshBuilder_AddFacesToMesh_3 = f.asm.ba).apply(null, arguments);
        }, jr = f._emscripten_bind_MeshBuilder_AddFloatAttributeToMesh_5 = function() {
          return (jr = f._emscripten_bind_MeshBuilder_AddFloatAttributeToMesh_5 = f.asm.ca).apply(null, arguments);
        }, Rr = f._emscripten_bind_MeshBuilder_AddInt32AttributeToMesh_5 = function() {
          return (Rr = f._emscripten_bind_MeshBuilder_AddInt32AttributeToMesh_5 = f.asm.da).apply(null, arguments);
        }, wr = f._emscripten_bind_MeshBuilder_AddMetadataToMesh_2 = function() {
          return (wr = f._emscripten_bind_MeshBuilder_AddMetadataToMesh_2 = f.asm.ea).apply(null, arguments);
        }, Sr = f._emscripten_bind_MeshBuilder_AddFloatAttribute_5 = function() {
          return (Sr = f._emscripten_bind_MeshBuilder_AddFloatAttribute_5 = f.asm.fa).apply(
            null,
            arguments
          );
        }, Mr = f._emscripten_bind_MeshBuilder_AddInt8Attribute_5 = function() {
          return (Mr = f._emscripten_bind_MeshBuilder_AddInt8Attribute_5 = f.asm.ga).apply(null, arguments);
        }, Nr = f._emscripten_bind_MeshBuilder_AddUInt8Attribute_5 = function() {
          return (Nr = f._emscripten_bind_MeshBuilder_AddUInt8Attribute_5 = f.asm.ha).apply(null, arguments);
        }, vr = f._emscripten_bind_MeshBuilder_AddInt16Attribute_5 = function() {
          return (vr = f._emscripten_bind_MeshBuilder_AddInt16Attribute_5 = f.asm.ia).apply(null, arguments);
        }, kr = f._emscripten_bind_MeshBuilder_AddUInt16Attribute_5 = function() {
          return (kr = f._emscripten_bind_MeshBuilder_AddUInt16Attribute_5 = f.asm.ja).apply(null, arguments);
        }, Cr = f._emscripten_bind_MeshBuilder_AddInt32Attribute_5 = function() {
          return (Cr = f._emscripten_bind_MeshBuilder_AddInt32Attribute_5 = f.asm.ka).apply(null, arguments);
        }, Or = f._emscripten_bind_MeshBuilder_AddUInt32Attribute_5 = function() {
          return (Or = f._emscripten_bind_MeshBuilder_AddUInt32Attribute_5 = f.asm.la).apply(null, arguments);
        }, Dr = f._emscripten_bind_MeshBuilder_AddMetadata_2 = function() {
          return (Dr = f._emscripten_bind_MeshBuilder_AddMetadata_2 = f.asm.ma).apply(null, arguments);
        }, Fr = f._emscripten_bind_MeshBuilder_SetMetadataForAttribute_3 = function() {
          return (Fr = f._emscripten_bind_MeshBuilder_SetMetadataForAttribute_3 = f.asm.na).apply(null, arguments);
        }, Ur = f._emscripten_bind_MeshBuilder_SetNormalizedFlagForAttribute_3 = function() {
          return (Ur = f._emscripten_bind_MeshBuilder_SetNormalizedFlagForAttribute_3 = f.asm.oa).apply(null, arguments);
        }, Br = f._emscripten_bind_MeshBuilder___destroy___0 = function() {
          return (Br = f._emscripten_bind_MeshBuilder___destroy___0 = f.asm.pa).apply(null, arguments);
        }, Gr = f._emscripten_bind_Encoder_Encoder_0 = function() {
          return (Gr = f._emscripten_bind_Encoder_Encoder_0 = f.asm.qa).apply(null, arguments);
        }, Pr = f._emscripten_bind_Encoder_SetEncodingMethod_1 = function() {
          return (Pr = f._emscripten_bind_Encoder_SetEncodingMethod_1 = f.asm.ra).apply(null, arguments);
        }, Lr = f._emscripten_bind_Encoder_SetAttributeQuantization_2 = function() {
          return (Lr = f._emscripten_bind_Encoder_SetAttributeQuantization_2 = f.asm.sa).apply(null, arguments);
        }, zr = f._emscripten_bind_Encoder_SetAttributeExplicitQuantization_5 = function() {
          return (zr = f._emscripten_bind_Encoder_SetAttributeExplicitQuantization_5 = f.asm.ta).apply(null, arguments);
        }, Hr = f._emscripten_bind_Encoder_SetSpeedOptions_2 = function() {
          return (Hr = f._emscripten_bind_Encoder_SetSpeedOptions_2 = f.asm.ua).apply(null, arguments);
        }, Vr = f._emscripten_bind_Encoder_SetTrackEncodedProperties_1 = function() {
          return (Vr = f._emscripten_bind_Encoder_SetTrackEncodedProperties_1 = f.asm.va).apply(null, arguments);
        }, Wr = f._emscripten_bind_Encoder_EncodeMeshToDracoBuffer_2 = function() {
          return (Wr = f._emscripten_bind_Encoder_EncodeMeshToDracoBuffer_2 = f.asm.wa).apply(null, arguments);
        }, Kr = f._emscripten_bind_Encoder_EncodePointCloudToDracoBuffer_3 = function() {
          return (Kr = f._emscripten_bind_Encoder_EncodePointCloudToDracoBuffer_3 = f.asm.xa).apply(null, arguments);
        }, qr = f._emscripten_bind_Encoder_GetNumberOfEncodedPoints_0 = function() {
          return (qr = f._emscripten_bind_Encoder_GetNumberOfEncodedPoints_0 = f.asm.ya).apply(null, arguments);
        }, Xr = f._emscripten_bind_Encoder_GetNumberOfEncodedFaces_0 = function() {
          return (Xr = f._emscripten_bind_Encoder_GetNumberOfEncodedFaces_0 = f.asm.za).apply(null, arguments);
        }, Jr = f._emscripten_bind_Encoder___destroy___0 = function() {
          return (Jr = f._emscripten_bind_Encoder___destroy___0 = f.asm.Aa).apply(null, arguments);
        }, Yr = f._emscripten_bind_ExpertEncoder_ExpertEncoder_1 = function() {
          return (Yr = f._emscripten_bind_ExpertEncoder_ExpertEncoder_1 = f.asm.Ba).apply(null, arguments);
        }, Qr = f._emscripten_bind_ExpertEncoder_SetEncodingMethod_1 = function() {
          return (Qr = f._emscripten_bind_ExpertEncoder_SetEncodingMethod_1 = f.asm.Ca).apply(null, arguments);
        }, Zr = f._emscripten_bind_ExpertEncoder_SetAttributeQuantization_2 = function() {
          return (Zr = f._emscripten_bind_ExpertEncoder_SetAttributeQuantization_2 = f.asm.Da).apply(null, arguments);
        }, $r = f._emscripten_bind_ExpertEncoder_SetAttributeExplicitQuantization_5 = function() {
          return ($r = f._emscripten_bind_ExpertEncoder_SetAttributeExplicitQuantization_5 = f.asm.Ea).apply(null, arguments);
        }, en = f._emscripten_bind_ExpertEncoder_SetSpeedOptions_2 = function() {
          return (en = f._emscripten_bind_ExpertEncoder_SetSpeedOptions_2 = f.asm.Fa).apply(null, arguments);
        }, tn = f._emscripten_bind_ExpertEncoder_SetTrackEncodedProperties_1 = function() {
          return (tn = f._emscripten_bind_ExpertEncoder_SetTrackEncodedProperties_1 = f.asm.Ga).apply(null, arguments);
        }, rn = f._emscripten_bind_ExpertEncoder_EncodeToDracoBuffer_2 = function() {
          return (rn = f._emscripten_bind_ExpertEncoder_EncodeToDracoBuffer_2 = f.asm.Ha).apply(null, arguments);
        }, nn = f._emscripten_bind_ExpertEncoder_GetNumberOfEncodedPoints_0 = function() {
          return (nn = f._emscripten_bind_ExpertEncoder_GetNumberOfEncodedPoints_0 = f.asm.Ia).apply(null, arguments);
        }, an = f._emscripten_bind_ExpertEncoder_GetNumberOfEncodedFaces_0 = function() {
          return (an = f._emscripten_bind_ExpertEncoder_GetNumberOfEncodedFaces_0 = f.asm.Ja).apply(null, arguments);
        }, sn = f._emscripten_bind_ExpertEncoder___destroy___0 = function() {
          return (sn = f._emscripten_bind_ExpertEncoder___destroy___0 = f.asm.Ka).apply(null, arguments);
        }, on = f._emscripten_enum_draco_GeometryAttribute_Type_INVALID = function() {
          return (on = f._emscripten_enum_draco_GeometryAttribute_Type_INVALID = f.asm.La).apply(
            null,
            arguments
          );
        }, cn = f._emscripten_enum_draco_GeometryAttribute_Type_POSITION = function() {
          return (cn = f._emscripten_enum_draco_GeometryAttribute_Type_POSITION = f.asm.Ma).apply(null, arguments);
        }, un = f._emscripten_enum_draco_GeometryAttribute_Type_NORMAL = function() {
          return (un = f._emscripten_enum_draco_GeometryAttribute_Type_NORMAL = f.asm.Na).apply(null, arguments);
        }, fn = f._emscripten_enum_draco_GeometryAttribute_Type_COLOR = function() {
          return (fn = f._emscripten_enum_draco_GeometryAttribute_Type_COLOR = f.asm.Oa).apply(
            null,
            arguments
          );
        }, bn = f._emscripten_enum_draco_GeometryAttribute_Type_TEX_COORD = function() {
          return (bn = f._emscripten_enum_draco_GeometryAttribute_Type_TEX_COORD = f.asm.Pa).apply(null, arguments);
        }, dn = f._emscripten_enum_draco_GeometryAttribute_Type_GENERIC = function() {
          return (dn = f._emscripten_enum_draco_GeometryAttribute_Type_GENERIC = f.asm.Qa).apply(null, arguments);
        }, pn = f._emscripten_enum_draco_EncodedGeometryType_INVALID_GEOMETRY_TYPE = function() {
          return (pn = f._emscripten_enum_draco_EncodedGeometryType_INVALID_GEOMETRY_TYPE = f.asm.Ra).apply(null, arguments);
        }, ln = f._emscripten_enum_draco_EncodedGeometryType_POINT_CLOUD = function() {
          return (ln = f._emscripten_enum_draco_EncodedGeometryType_POINT_CLOUD = f.asm.Sa).apply(null, arguments);
        }, hn = f._emscripten_enum_draco_EncodedGeometryType_TRIANGULAR_MESH = function() {
          return (hn = f._emscripten_enum_draco_EncodedGeometryType_TRIANGULAR_MESH = f.asm.Ta).apply(null, arguments);
        }, _n = f._emscripten_enum_draco_MeshEncoderMethod_MESH_SEQUENTIAL_ENCODING = function() {
          return (_n = f._emscripten_enum_draco_MeshEncoderMethod_MESH_SEQUENTIAL_ENCODING = f.asm.Ua).apply(null, arguments);
        }, mn = f._emscripten_enum_draco_MeshEncoderMethod_MESH_EDGEBREAKER_ENCODING = function() {
          return (mn = f._emscripten_enum_draco_MeshEncoderMethod_MESH_EDGEBREAKER_ENCODING = f.asm.Va).apply(null, arguments);
        };
        f._malloc = function() {
          return (f._malloc = f.asm.Wa).apply(null, arguments);
        }, f._free = function() {
          return (f._free = f.asm.Xa).apply(null, arguments);
        };
        var gn = function() {
          return (gn = f.asm.Ya).apply(null, arguments);
        };
        f.___start_em_js = 19116, f.___stop_em_js = 19214;
        var yt;
        if (Ge = function b() {
          yt || E(), yt || (Ge = b);
        }, f.preInit) for (typeof f.preInit == "function" && (f.preInit = [f.preInit]); 0 < f.preInit.length; ) f.preInit.pop()();
        E(), T.prototype = Object.create(T.prototype), T.prototype.constructor = T, T.prototype.__class__ = T, T.__cache__ = {}, f.WrapperObject = T, f.getCache = j, f.wrapPointer = A, f.castObject = function(b, p) {
          return A(b.ptr, p);
        }, f.NULL = A(0), f.destroy = function(b) {
          if (!b.__destroy__) throw "Error: Cannot destroy object. (Did you create it yourself?)";
          b.__destroy__(), delete j(b.__class__)[b.ptr];
        }, f.compare = function(b, p) {
          return b.ptr === p.ptr;
        }, f.getPointer = function(b) {
          return b.ptr;
        }, f.getClass = function(b) {
          return b.__class__;
        };
        var J = { buffer: 0, size: 0, pos: 0, temps: [], needed: 0, prepare: function() {
          if (J.needed) {
            for (var b = 0; b < J.temps.length; b++) f._free(J.temps[b]);
            J.temps.length = 0, f._free(J.buffer), J.buffer = 0, J.size += J.needed, J.needed = 0;
          }
          J.buffer || (J.size += 128, J.buffer = f._malloc(J.size), J.buffer || d(void 0)), J.pos = 0;
        }, alloc: function(b, p) {
          return J.buffer || d(void 0), b = b.length * p.BYTES_PER_ELEMENT, b = b + 7 & -8, J.pos + b >= J.size ? (0 < b || d(void 0), J.needed += b, p = f._malloc(b), J.temps.push(p)) : (p = J.buffer + J.pos, J.pos += b), p;
        }, copy: function(b, p, x) {
          switch (x >>>= 0, p.BYTES_PER_ELEMENT) {
            case 2:
              x >>>= 1;
              break;
            case 4:
              x >>>= 2;
              break;
            case 8:
              x >>>= 3;
          }
          for (var N = 0; N < b.length; N++) p[x + N] = b[N];
        } };
        return O.prototype = Object.create(T.prototype), O.prototype.constructor = O, O.prototype.__class__ = O, O.__cache__ = {}, f.VoidPtr = O, O.prototype.__destroy__ = O.prototype.__destroy__ = function() {
          St(this.ptr);
        }, m.prototype = Object.create(T.prototype), m.prototype.constructor = m, m.prototype.__class__ = m, m.__cache__ = {}, f.GeometryAttribute = m, m.prototype.__destroy__ = m.prototype.__destroy__ = function() {
          Ut(this.ptr);
        }, R.prototype = Object.create(T.prototype), R.prototype.constructor = R, R.prototype.__class__ = R, R.__cache__ = {}, f.PointAttribute = R, R.prototype.size = R.prototype.size = function() {
          return ut(this.ptr);
        }, R.prototype.attribute_type = R.prototype.attribute_type = function() {
          return Te(this.ptr);
        }, R.prototype.data_type = R.prototype.data_type = function() {
          return kn(this.ptr);
        }, R.prototype.num_components = R.prototype.num_components = function() {
          return Cn(this.ptr);
        }, R.prototype.normalized = R.prototype.normalized = function() {
          return !!Bt(this.ptr);
        }, R.prototype.byte_stride = R.prototype.byte_stride = function() {
          return Gt(this.ptr);
        }, R.prototype.byte_offset = R.prototype.byte_offset = function() {
          return Pt(this.ptr);
        }, R.prototype.unique_id = R.prototype.unique_id = function() {
          return Lt(this.ptr);
        }, R.prototype.__destroy__ = R.prototype.__destroy__ = function() {
          zt(this.ptr);
        }, C.prototype = Object.create(T.prototype), C.prototype.constructor = C, C.prototype.__class__ = C, C.__cache__ = {}, f.PointCloud = C, C.prototype.num_attributes = C.prototype.num_attributes = function() {
          return Vt(this.ptr);
        }, C.prototype.num_points = C.prototype.num_points = function() {
          return Wt(this.ptr);
        }, C.prototype.__destroy__ = C.prototype.__destroy__ = function() {
          Kt(this.ptr);
        }, D.prototype = Object.create(T.prototype), D.prototype.constructor = D, D.prototype.__class__ = D, D.__cache__ = {}, f.Mesh = D, D.prototype.num_faces = D.prototype.num_faces = function() {
          return Xt(this.ptr);
        }, D.prototype.num_attributes = D.prototype.num_attributes = function() {
          return Jt(this.ptr);
        }, D.prototype.num_points = D.prototype.num_points = function() {
          return Yt(this.ptr);
        }, D.prototype.set_num_points = D.prototype.set_num_points = function(b) {
          var p = this.ptr;
          b && typeof b == "object" && (b = b.ptr), Qt(p, b);
        }, D.prototype.__destroy__ = D.prototype.__destroy__ = function() {
          Zt(this.ptr);
        }, B.prototype = Object.create(T.prototype), B.prototype.constructor = B, B.prototype.__class__ = B, B.__cache__ = {}, f.Metadata = B, B.prototype.__destroy__ = B.prototype.__destroy__ = function() {
          er(this.ptr);
        }, L.prototype = Object.create(T.prototype), L.prototype.constructor = L, L.prototype.__class__ = L, L.__cache__ = {}, f.DracoInt8Array = L, L.prototype.GetValue = L.prototype.GetValue = function(b) {
          var p = this.ptr;
          return b && typeof b == "object" && (b = b.ptr), rr(p, b);
        }, L.prototype.size = L.prototype.size = function() {
          return nr(this.ptr);
        }, L.prototype.__destroy__ = L.prototype.__destroy__ = function() {
          ar(this.ptr);
        }, G.prototype = Object.create(T.prototype), G.prototype.constructor = G, G.prototype.__class__ = G, G.__cache__ = {}, f.MetadataBuilder = G, G.prototype.AddStringEntry = G.prototype.AddStringEntry = function(b, p, x) {
          var N = this.ptr;
          return J.prepare(), b && typeof b == "object" && (b = b.ptr), p = p && typeof p == "object" ? p.ptr : l(p), x = x && typeof x == "object" ? x.ptr : l(x), !!ir(N, b, p, x);
        }, G.prototype.AddIntEntry = G.prototype.AddIntEntry = function(b, p, x) {
          var N = this.ptr;
          return J.prepare(), b && typeof b == "object" && (b = b.ptr), p = p && typeof p == "object" ? p.ptr : l(p), x && typeof x == "object" && (x = x.ptr), !!or(N, b, p, x);
        }, G.prototype.AddIntEntryArray = G.prototype.AddIntEntryArray = function(b, p, x, N) {
          var U = this.ptr;
          return J.prepare(), b && typeof b == "object" && (b = b.ptr), p = p && typeof p == "object" ? p.ptr : l(p), typeof x == "object" && (x = k(x)), N && typeof N == "object" && (N = N.ptr), !!cr(U, b, p, x, N);
        }, G.prototype.AddDoubleEntry = G.prototype.AddDoubleEntry = function(b, p, x) {
          var N = this.ptr;
          return J.prepare(), b && typeof b == "object" && (b = b.ptr), p = p && typeof p == "object" ? p.ptr : l(p), x && typeof x == "object" && (x = x.ptr), !!ur(N, b, p, x);
        }, G.prototype.__destroy__ = G.prototype.__destroy__ = function() {
          fr(this.ptr);
        }, H.prototype = Object.create(T.prototype), H.prototype.constructor = H, H.prototype.__class__ = H, H.__cache__ = {}, f.PointCloudBuilder = H, H.prototype.AddFloatAttribute = H.prototype.AddFloatAttribute = function(b, p, x, N, U) {
          var X = this.ptr;
          return J.prepare(), b && typeof b == "object" && (b = b.ptr), p && typeof p == "object" && (p = p.ptr), x && typeof x == "object" && (x = x.ptr), N && typeof N == "object" && (N = N.ptr), typeof U == "object" && (U = v(U)), dr(X, b, p, x, N, U);
        }, H.prototype.AddInt8Attribute = H.prototype.AddInt8Attribute = function(b, p, x, N, U) {
          var X = this.ptr;
          return J.prepare(), b && typeof b == "object" && (b = b.ptr), p && typeof p == "object" && (p = p.ptr), x && typeof x == "object" && (x = x.ptr), N && typeof N == "object" && (N = N.ptr), typeof U == "object" && (U = S(U)), pr(X, b, p, x, N, U);
        }, H.prototype.AddUInt8Attribute = H.prototype.AddUInt8Attribute = function(b, p, x, N, U) {
          var X = this.ptr;
          return J.prepare(), b && typeof b == "object" && (b = b.ptr), p && typeof p == "object" && (p = p.ptr), x && typeof x == "object" && (x = x.ptr), N && typeof N == "object" && (N = N.ptr), typeof U == "object" && (U = S(U)), lr(X, b, p, x, N, U);
        }, H.prototype.AddInt16Attribute = H.prototype.AddInt16Attribute = function(b, p, x, N, U) {
          var X = this.ptr;
          return J.prepare(), b && typeof b == "object" && (b = b.ptr), p && typeof p == "object" && (p = p.ptr), x && typeof x == "object" && (x = x.ptr), N && typeof N == "object" && (N = N.ptr), typeof U == "object" && (U = I(U)), hr(X, b, p, x, N, U);
        }, H.prototype.AddUInt16Attribute = H.prototype.AddUInt16Attribute = function(b, p, x, N, U) {
          var X = this.ptr;
          return J.prepare(), b && typeof b == "object" && (b = b.ptr), p && typeof p == "object" && (p = p.ptr), x && typeof x == "object" && (x = x.ptr), N && typeof N == "object" && (N = N.ptr), typeof U == "object" && (U = I(U)), _r(X, b, p, x, N, U);
        }, H.prototype.AddInt32Attribute = H.prototype.AddInt32Attribute = function(b, p, x, N, U) {
          var X = this.ptr;
          return J.prepare(), b && typeof b == "object" && (b = b.ptr), p && typeof p == "object" && (p = p.ptr), x && typeof x == "object" && (x = x.ptr), N && typeof N == "object" && (N = N.ptr), typeof U == "object" && (U = k(U)), mr(X, b, p, x, N, U);
        }, H.prototype.AddUInt32Attribute = H.prototype.AddUInt32Attribute = function(b, p, x, N, U) {
          var X = this.ptr;
          return J.prepare(), b && typeof b == "object" && (b = b.ptr), p && typeof p == "object" && (p = p.ptr), x && typeof x == "object" && (x = x.ptr), N && typeof N == "object" && (N = N.ptr), typeof U == "object" && (U = k(U)), gr(X, b, p, x, N, U);
        }, H.prototype.AddMetadata = H.prototype.AddMetadata = function(b, p) {
          var x = this.ptr;
          return b && typeof b == "object" && (b = b.ptr), p && typeof p == "object" && (p = p.ptr), !!yr(x, b, p);
        }, H.prototype.SetMetadataForAttribute = H.prototype.SetMetadataForAttribute = function(b, p, x) {
          var N = this.ptr;
          return b && typeof b == "object" && (b = b.ptr), p && typeof p == "object" && (p = p.ptr), x && typeof x == "object" && (x = x.ptr), !!Tr(N, b, p, x);
        }, H.prototype.SetNormalizedFlagForAttribute = H.prototype.SetNormalizedFlagForAttribute = function(b, p, x) {
          var N = this.ptr;
          return b && typeof b == "object" && (b = b.ptr), p && typeof p == "object" && (p = p.ptr), x && typeof x == "object" && (x = x.ptr), !!xr(N, b, p, x);
        }, H.prototype.__destroy__ = H.prototype.__destroy__ = function() {
          Ar(this.ptr);
        }, P.prototype = Object.create(T.prototype), P.prototype.constructor = P, P.prototype.__class__ = P, P.__cache__ = {}, f.MeshBuilder = P, P.prototype.AddFacesToMesh = P.prototype.AddFacesToMesh = function(b, p, x) {
          var N = this.ptr;
          return J.prepare(), b && typeof b == "object" && (b = b.ptr), p && typeof p == "object" && (p = p.ptr), typeof x == "object" && (x = k(x)), !!Ir(N, b, p, x);
        }, P.prototype.AddFloatAttributeToMesh = P.prototype.AddFloatAttributeToMesh = function(b, p, x, N, U) {
          var X = this.ptr;
          return J.prepare(), b && typeof b == "object" && (b = b.ptr), p && typeof p == "object" && (p = p.ptr), x && typeof x == "object" && (x = x.ptr), N && typeof N == "object" && (N = N.ptr), typeof U == "object" && (U = v(U)), jr(X, b, p, x, N, U);
        }, P.prototype.AddInt32AttributeToMesh = P.prototype.AddInt32AttributeToMesh = function(b, p, x, N, U) {
          var X = this.ptr;
          return J.prepare(), b && typeof b == "object" && (b = b.ptr), p && typeof p == "object" && (p = p.ptr), x && typeof x == "object" && (x = x.ptr), N && typeof N == "object" && (N = N.ptr), typeof U == "object" && (U = k(U)), Rr(X, b, p, x, N, U);
        }, P.prototype.AddMetadataToMesh = P.prototype.AddMetadataToMesh = function(b, p) {
          var x = this.ptr;
          return b && typeof b == "object" && (b = b.ptr), p && typeof p == "object" && (p = p.ptr), !!wr(x, b, p);
        }, P.prototype.AddFloatAttribute = P.prototype.AddFloatAttribute = function(b, p, x, N, U) {
          var X = this.ptr;
          return J.prepare(), b && typeof b == "object" && (b = b.ptr), p && typeof p == "object" && (p = p.ptr), x && typeof x == "object" && (x = x.ptr), N && typeof N == "object" && (N = N.ptr), typeof U == "object" && (U = v(U)), Sr(X, b, p, x, N, U);
        }, P.prototype.AddInt8Attribute = P.prototype.AddInt8Attribute = function(b, p, x, N, U) {
          var X = this.ptr;
          return J.prepare(), b && typeof b == "object" && (b = b.ptr), p && typeof p == "object" && (p = p.ptr), x && typeof x == "object" && (x = x.ptr), N && typeof N == "object" && (N = N.ptr), typeof U == "object" && (U = S(U)), Mr(X, b, p, x, N, U);
        }, P.prototype.AddUInt8Attribute = P.prototype.AddUInt8Attribute = function(b, p, x, N, U) {
          var X = this.ptr;
          return J.prepare(), b && typeof b == "object" && (b = b.ptr), p && typeof p == "object" && (p = p.ptr), x && typeof x == "object" && (x = x.ptr), N && typeof N == "object" && (N = N.ptr), typeof U == "object" && (U = S(U)), Nr(X, b, p, x, N, U);
        }, P.prototype.AddInt16Attribute = P.prototype.AddInt16Attribute = function(b, p, x, N, U) {
          var X = this.ptr;
          return J.prepare(), b && typeof b == "object" && (b = b.ptr), p && typeof p == "object" && (p = p.ptr), x && typeof x == "object" && (x = x.ptr), N && typeof N == "object" && (N = N.ptr), typeof U == "object" && (U = I(U)), vr(X, b, p, x, N, U);
        }, P.prototype.AddUInt16Attribute = P.prototype.AddUInt16Attribute = function(b, p, x, N, U) {
          var X = this.ptr;
          return J.prepare(), b && typeof b == "object" && (b = b.ptr), p && typeof p == "object" && (p = p.ptr), x && typeof x == "object" && (x = x.ptr), N && typeof N == "object" && (N = N.ptr), typeof U == "object" && (U = I(U)), kr(X, b, p, x, N, U);
        }, P.prototype.AddInt32Attribute = P.prototype.AddInt32Attribute = function(b, p, x, N, U) {
          var X = this.ptr;
          return J.prepare(), b && typeof b == "object" && (b = b.ptr), p && typeof p == "object" && (p = p.ptr), x && typeof x == "object" && (x = x.ptr), N && typeof N == "object" && (N = N.ptr), typeof U == "object" && (U = k(U)), Cr(X, b, p, x, N, U);
        }, P.prototype.AddUInt32Attribute = P.prototype.AddUInt32Attribute = function(b, p, x, N, U) {
          var X = this.ptr;
          return J.prepare(), b && typeof b == "object" && (b = b.ptr), p && typeof p == "object" && (p = p.ptr), x && typeof x == "object" && (x = x.ptr), N && typeof N == "object" && (N = N.ptr), typeof U == "object" && (U = k(U)), Or(X, b, p, x, N, U);
        }, P.prototype.AddMetadata = P.prototype.AddMetadata = function(b, p) {
          var x = this.ptr;
          return b && typeof b == "object" && (b = b.ptr), p && typeof p == "object" && (p = p.ptr), !!Dr(x, b, p);
        }, P.prototype.SetMetadataForAttribute = P.prototype.SetMetadataForAttribute = function(b, p, x) {
          var N = this.ptr;
          return b && typeof b == "object" && (b = b.ptr), p && typeof p == "object" && (p = p.ptr), x && typeof x == "object" && (x = x.ptr), !!Fr(N, b, p, x);
        }, P.prototype.SetNormalizedFlagForAttribute = P.prototype.SetNormalizedFlagForAttribute = function(b, p, x) {
          var N = this.ptr;
          return b && typeof b == "object" && (b = b.ptr), p && typeof p == "object" && (p = p.ptr), x && typeof x == "object" && (x = x.ptr), !!Ur(N, b, p, x);
        }, P.prototype.__destroy__ = P.prototype.__destroy__ = function() {
          Br(this.ptr);
        }, V.prototype = Object.create(T.prototype), V.prototype.constructor = V, V.prototype.__class__ = V, V.__cache__ = {}, f.Encoder = V, V.prototype.SetEncodingMethod = V.prototype.SetEncodingMethod = function(b) {
          var p = this.ptr;
          b && typeof b == "object" && (b = b.ptr), Pr(p, b);
        }, V.prototype.SetAttributeQuantization = V.prototype.SetAttributeQuantization = function(b, p) {
          var x = this.ptr;
          b && typeof b == "object" && (b = b.ptr), p && typeof p == "object" && (p = p.ptr), Lr(x, b, p);
        }, V.prototype.SetAttributeExplicitQuantization = V.prototype.SetAttributeExplicitQuantization = function(b, p, x, N, U) {
          var X = this.ptr;
          J.prepare(), b && typeof b == "object" && (b = b.ptr), p && typeof p == "object" && (p = p.ptr), x && typeof x == "object" && (x = x.ptr), typeof N == "object" && (N = v(N)), U && typeof U == "object" && (U = U.ptr), zr(X, b, p, x, N, U);
        }, V.prototype.SetSpeedOptions = V.prototype.SetSpeedOptions = function(b, p) {
          var x = this.ptr;
          b && typeof b == "object" && (b = b.ptr), p && typeof p == "object" && (p = p.ptr), Hr(x, b, p);
        }, V.prototype.SetTrackEncodedProperties = V.prototype.SetTrackEncodedProperties = function(b) {
          var p = this.ptr;
          b && typeof b == "object" && (b = b.ptr), Vr(p, b);
        }, V.prototype.EncodeMeshToDracoBuffer = V.prototype.EncodeMeshToDracoBuffer = function(b, p) {
          var x = this.ptr;
          return b && typeof b == "object" && (b = b.ptr), p && typeof p == "object" && (p = p.ptr), Wr(x, b, p);
        }, V.prototype.EncodePointCloudToDracoBuffer = V.prototype.EncodePointCloudToDracoBuffer = function(b, p, x) {
          var N = this.ptr;
          return b && typeof b == "object" && (b = b.ptr), p && typeof p == "object" && (p = p.ptr), x && typeof x == "object" && (x = x.ptr), Kr(N, b, p, x);
        }, V.prototype.GetNumberOfEncodedPoints = V.prototype.GetNumberOfEncodedPoints = function() {
          return qr(this.ptr);
        }, V.prototype.GetNumberOfEncodedFaces = V.prototype.GetNumberOfEncodedFaces = function() {
          return Xr(this.ptr);
        }, V.prototype.__destroy__ = V.prototype.__destroy__ = function() {
          Jr(this.ptr);
        }, K.prototype = Object.create(T.prototype), K.prototype.constructor = K, K.prototype.__class__ = K, K.__cache__ = {}, f.ExpertEncoder = K, K.prototype.SetEncodingMethod = K.prototype.SetEncodingMethod = function(b) {
          var p = this.ptr;
          b && typeof b == "object" && (b = b.ptr), Qr(p, b);
        }, K.prototype.SetAttributeQuantization = K.prototype.SetAttributeQuantization = function(b, p) {
          var x = this.ptr;
          b && typeof b == "object" && (b = b.ptr), p && typeof p == "object" && (p = p.ptr), Zr(x, b, p);
        }, K.prototype.SetAttributeExplicitQuantization = K.prototype.SetAttributeExplicitQuantization = function(b, p, x, N, U) {
          var X = this.ptr;
          J.prepare(), b && typeof b == "object" && (b = b.ptr), p && typeof p == "object" && (p = p.ptr), x && typeof x == "object" && (x = x.ptr), typeof N == "object" && (N = v(N)), U && typeof U == "object" && (U = U.ptr), $r(X, b, p, x, N, U);
        }, K.prototype.SetSpeedOptions = K.prototype.SetSpeedOptions = function(b, p) {
          var x = this.ptr;
          b && typeof b == "object" && (b = b.ptr), p && typeof p == "object" && (p = p.ptr), en(x, b, p);
        }, K.prototype.SetTrackEncodedProperties = K.prototype.SetTrackEncodedProperties = function(b) {
          var p = this.ptr;
          b && typeof b == "object" && (b = b.ptr), tn(p, b);
        }, K.prototype.EncodeToDracoBuffer = K.prototype.EncodeToDracoBuffer = function(b, p) {
          var x = this.ptr;
          return b && typeof b == "object" && (b = b.ptr), p && typeof p == "object" && (p = p.ptr), rn(x, b, p);
        }, K.prototype.GetNumberOfEncodedPoints = K.prototype.GetNumberOfEncodedPoints = function() {
          return nn(this.ptr);
        }, K.prototype.GetNumberOfEncodedFaces = K.prototype.GetNumberOfEncodedFaces = function() {
          return an(this.ptr);
        }, K.prototype.__destroy__ = K.prototype.__destroy__ = function() {
          sn(this.ptr);
        }, (function() {
          function b() {
            f.INVALID = on(), f.POSITION = cn(), f.NORMAL = un(), f.COLOR = fn(), f.TEX_COORD = bn(), f.GENERIC = dn(), f.INVALID_GEOMETRY_TYPE = pn(), f.POINT_CLOUD = ln(), f.TRIANGULAR_MESH = hn(), f.MESH_SEQUENTIAL_ENCODING = _n(), f.MESH_EDGEBREAKER_ENCODING = mn();
          }
          ve ? b() : wt.unshift(b);
        })(), typeof f.onModuleParsed == "function" && f.onModuleParsed(), n.ready;
      };
    })();
    o.exports = a;
  })(Pn)), Pn.exports;
}
var Ln = { exports: {} }, Pc = Ln.exports, Bs;
function Lc() {
  return Bs || (Bs = 1, (function(o, e) {
    var t = t || {};
    t.scope = {}, t.arrayIteratorImpl = function(r) {
      var n = 0;
      return function() {
        return n < r.length ? { done: !1, value: r[n++] } : { done: !0 };
      };
    }, t.arrayIterator = function(r) {
      return { next: t.arrayIteratorImpl(r) };
    }, t.makeIterator = function(r) {
      var n = typeof Symbol < "u" && Symbol.iterator && r[Symbol.iterator];
      return n ? n.call(r) : t.arrayIterator(r);
    }, t.ASSUME_ES5 = !1, t.ASSUME_NO_NATIVE_MAP = !1, t.ASSUME_NO_NATIVE_SET = !1, t.SIMPLE_FROUND_POLYFILL = !1, t.ISOLATE_POLYFILLS = !1, t.FORCE_POLYFILL_PROMISE = !1, t.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1, t.getGlobal = function(r) {
      r = [typeof globalThis == "object" && globalThis, r, typeof window == "object" && window, typeof self == "object" && self, typeof zn == "object" && zn];
      for (var n = 0; n < r.length; ++n) {
        var s = r[n];
        if (s && s.Math == Math) return s;
      }
      throw Error("Cannot find global object");
    }, t.global = t.getGlobal(Pc), t.defineProperty = t.ASSUME_ES5 || typeof Object.defineProperties == "function" ? Object.defineProperty : function(r, n, s) {
      return r == Array.prototype || r == Object.prototype || (r[n] = s.value), r;
    }, t.IS_SYMBOL_NATIVE = typeof Symbol == "function" && typeof Symbol("x") == "symbol", t.TRUST_ES6_POLYFILLS = !t.ISOLATE_POLYFILLS || t.IS_SYMBOL_NATIVE, t.polyfills = {}, t.propertyToPolyfillSymbol = {}, t.POLYFILL_PREFIX = "$jscp$", t.polyfill = function(r, n, s, c) {
      n && (t.ISOLATE_POLYFILLS ? t.polyfillIsolated(r, n, s, c) : t.polyfillUnisolated(r, n, s, c));
    }, t.polyfillUnisolated = function(r, n, s, c) {
      for (s = t.global, r = r.split("."), c = 0; c < r.length - 1; c++) {
        var d = r[c];
        if (!(d in s)) return;
        s = s[d];
      }
      r = r[r.length - 1], c = s[r], n = n(c), n != c && n != null && t.defineProperty(s, r, { configurable: !0, writable: !0, value: n });
    }, t.polyfillIsolated = function(r, n, s, c) {
      var d = r.split(".");
      r = d.length === 1, c = d[0], c = !r && c in t.polyfills ? t.polyfills : t.global;
      for (var y = 0; y < d.length - 1; y++) {
        var _ = d[y];
        if (!(_ in c)) return;
        c = c[_];
      }
      d = d[d.length - 1], s = t.IS_SYMBOL_NATIVE && s === "es6" ? c[d] : null, n = n(s), n != null && (r ? t.defineProperty(t.polyfills, d, { configurable: !0, writable: !0, value: n }) : n !== s && (t.propertyToPolyfillSymbol[d] === void 0 && (s = 1e9 * Math.random() >>> 0, t.propertyToPolyfillSymbol[d] = t.IS_SYMBOL_NATIVE ? t.global.Symbol(d) : t.POLYFILL_PREFIX + s + "$" + d), t.defineProperty(c, t.propertyToPolyfillSymbol[d], { configurable: !0, writable: !0, value: n })));
    }, t.polyfill("Promise", function(r) {
      function n() {
        this.batch_ = null;
      }
      function s(_) {
        return _ instanceof d ? _ : new d(function(g, w) {
          g(_);
        });
      }
      if (r && (!(t.FORCE_POLYFILL_PROMISE || t.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION && typeof t.global.PromiseRejectionEvent > "u") || !t.global.Promise || t.global.Promise.toString().indexOf("[native code]") === -1)) return r;
      n.prototype.asyncExecute = function(_) {
        if (this.batch_ == null) {
          this.batch_ = [];
          var g = this;
          this.asyncExecuteFunction(function() {
            g.executeBatch_();
          });
        }
        this.batch_.push(_);
      };
      var c = t.global.setTimeout;
      n.prototype.asyncExecuteFunction = function(_) {
        c(_, 0);
      }, n.prototype.executeBatch_ = function() {
        for (; this.batch_ && this.batch_.length; ) {
          var _ = this.batch_;
          this.batch_ = [];
          for (var g = 0; g < _.length; ++g) {
            var w = _[g];
            _[g] = null;
            try {
              w();
            } catch (E) {
              this.asyncThrow_(E);
            }
          }
        }
        this.batch_ = null;
      }, n.prototype.asyncThrow_ = function(_) {
        this.asyncExecuteFunction(function() {
          throw _;
        });
      };
      var d = function(_) {
        this.state_ = 0, this.result_ = void 0, this.onSettledCallbacks_ = [], this.isRejectionHandled_ = !1;
        var g = this.createResolveAndReject_();
        try {
          _(g.resolve, g.reject);
        } catch (w) {
          g.reject(w);
        }
      };
      d.prototype.createResolveAndReject_ = function() {
        function _(E) {
          return function(T) {
            w || (w = !0, E.call(g, T));
          };
        }
        var g = this, w = !1;
        return { resolve: _(this.resolveTo_), reject: _(this.reject_) };
      }, d.prototype.resolveTo_ = function(_) {
        if (_ === this) this.reject_(new TypeError("A Promise cannot resolve to itself"));
        else if (_ instanceof d) this.settleSameAsPromise_(_);
        else {
          e: switch (typeof _) {
            case "object":
              var g = _ != null;
              break e;
            case "function":
              g = !0;
              break e;
            default:
              g = !1;
          }
          g ? this.resolveToNonPromiseObj_(_) : this.fulfill_(_);
        }
      }, d.prototype.resolveToNonPromiseObj_ = function(_) {
        var g = void 0;
        try {
          g = _.then;
        } catch (w) {
          this.reject_(w);
          return;
        }
        typeof g == "function" ? this.settleSameAsThenable_(g, _) : this.fulfill_(_);
      }, d.prototype.reject_ = function(_) {
        this.settle_(2, _);
      }, d.prototype.fulfill_ = function(_) {
        this.settle_(1, _);
      }, d.prototype.settle_ = function(_, g) {
        if (this.state_ != 0) throw Error("Cannot settle(" + _ + ", " + g + "): Promise already settled in state" + this.state_);
        this.state_ = _, this.result_ = g, this.state_ === 2 && this.scheduleUnhandledRejectionCheck_(), this.executeOnSettledCallbacks_();
      }, d.prototype.scheduleUnhandledRejectionCheck_ = function() {
        var _ = this;
        c(function() {
          if (_.notifyUnhandledRejection_()) {
            var g = t.global.console;
            typeof g < "u" && g.error(_.result_);
          }
        }, 1);
      }, d.prototype.notifyUnhandledRejection_ = function() {
        if (this.isRejectionHandled_) return !1;
        var _ = t.global.CustomEvent, g = t.global.Event, w = t.global.dispatchEvent;
        return typeof w > "u" ? !0 : (typeof _ == "function" ? _ = new _("unhandledrejection", { cancelable: !0 }) : typeof g == "function" ? _ = new g("unhandledrejection", { cancelable: !0 }) : (_ = t.global.document.createEvent("CustomEvent"), _.initCustomEvent("unhandledrejection", !1, !0, _)), _.promise = this, _.reason = this.result_, w(_));
      }, d.prototype.executeOnSettledCallbacks_ = function() {
        if (this.onSettledCallbacks_ != null) {
          for (var _ = 0; _ < this.onSettledCallbacks_.length; ++_) y.asyncExecute(this.onSettledCallbacks_[_]);
          this.onSettledCallbacks_ = null;
        }
      };
      var y = new n();
      return d.prototype.settleSameAsPromise_ = function(_) {
        var g = this.createResolveAndReject_();
        _.callWhenSettled_(g.resolve, g.reject);
      }, d.prototype.settleSameAsThenable_ = function(_, g) {
        var w = this.createResolveAndReject_();
        try {
          _.call(g, w.resolve, w.reject);
        } catch (E) {
          w.reject(E);
        }
      }, d.prototype.then = function(_, g) {
        function w(A, l) {
          return typeof A == "function" ? function(S) {
            try {
              E(A(S));
            } catch (I) {
              T(I);
            }
          } : l;
        }
        var E, T, j = new d(function(A, l) {
          E = A, T = l;
        });
        return this.callWhenSettled_(w(_, E), w(g, T)), j;
      }, d.prototype.catch = function(_) {
        return this.then(void 0, _);
      }, d.prototype.callWhenSettled_ = function(_, g) {
        function w() {
          switch (E.state_) {
            case 1:
              _(E.result_);
              break;
            case 2:
              g(E.result_);
              break;
            default:
              throw Error("Unexpected state: " + E.state_);
          }
        }
        var E = this;
        this.onSettledCallbacks_ == null ? y.asyncExecute(w) : this.onSettledCallbacks_.push(w), this.isRejectionHandled_ = !0;
      }, d.resolve = s, d.reject = function(_) {
        return new d(function(g, w) {
          w(_);
        });
      }, d.race = function(_) {
        return new d(function(g, w) {
          for (var E = t.makeIterator(_), T = E.next(); !T.done; T = E.next()) s(T.value).callWhenSettled_(g, w);
        });
      }, d.all = function(_) {
        var g = t.makeIterator(_), w = g.next();
        return w.done ? s([]) : new d(function(E, T) {
          function j(S) {
            return function(I) {
              A[S] = I, l--, l == 0 && E(A);
            };
          }
          var A = [], l = 0;
          do
            A.push(void 0), l++, s(w.value).callWhenSettled_(j(A.length - 1), T), w = g.next();
          while (!w.done);
        });
      }, d;
    }, "es6", "es3"), t.owns = function(r, n) {
      return Object.prototype.hasOwnProperty.call(r, n);
    }, t.assign = t.TRUST_ES6_POLYFILLS && typeof Object.assign == "function" ? Object.assign : function(r, n) {
      for (var s = 1; s < arguments.length; s++) {
        var c = arguments[s];
        if (c) for (var d in c) t.owns(c, d) && (r[d] = c[d]);
      }
      return r;
    }, t.polyfill("Object.assign", function(r) {
      return r || t.assign;
    }, "es6", "es3"), t.checkStringArgs = function(r, n, s) {
      if (r == null) throw new TypeError("The 'this' value for String.prototype." + s + " must not be null or undefined");
      if (n instanceof RegExp) throw new TypeError("First argument to String.prototype." + s + " must not be a regular expression");
      return r + "";
    }, t.polyfill("String.prototype.startsWith", function(r) {
      return r || function(n, s) {
        var c = t.checkStringArgs(this, n, "startsWith");
        n += "";
        var d = c.length, y = n.length;
        s = Math.max(0, Math.min(s | 0, c.length));
        for (var _ = 0; _ < y && s < d; ) if (c[s++] != n[_++]) return !1;
        return _ >= y;
      };
    }, "es6", "es3"), t.polyfill("Array.prototype.copyWithin", function(r) {
      function n(s) {
        return s = Number(s), s === 1 / 0 || s === -1 / 0 ? s : s | 0;
      }
      return r || function(s, c, d) {
        var y = this.length;
        if (s = n(s), c = n(c), d = d === void 0 ? y : n(d), s = 0 > s ? Math.max(y + s, 0) : Math.min(s, y), c = 0 > c ? Math.max(y + c, 0) : Math.min(c, y), d = 0 > d ? Math.max(y + d, 0) : Math.min(d, y), s < c) for (; c < d; ) c in this ? this[s++] = this[c++] : (delete this[s++], c++);
        else for (d = Math.min(d, y + c - s), s += d - c; d > c; ) --d in this ? this[--s] = this[d] : delete this[--s];
        return this;
      };
    }, "es6", "es3"), t.typedArrayCopyWithin = function(r) {
      return r || Array.prototype.copyWithin;
    }, t.polyfill("Int8Array.prototype.copyWithin", t.typedArrayCopyWithin, "es6", "es5"), t.polyfill("Uint8Array.prototype.copyWithin", t.typedArrayCopyWithin, "es6", "es5"), t.polyfill("Uint8ClampedArray.prototype.copyWithin", t.typedArrayCopyWithin, "es6", "es5"), t.polyfill("Int16Array.prototype.copyWithin", t.typedArrayCopyWithin, "es6", "es5"), t.polyfill("Uint16Array.prototype.copyWithin", t.typedArrayCopyWithin, "es6", "es5"), t.polyfill("Int32Array.prototype.copyWithin", t.typedArrayCopyWithin, "es6", "es5"), t.polyfill("Uint32Array.prototype.copyWithin", t.typedArrayCopyWithin, "es6", "es5"), t.polyfill("Float32Array.prototype.copyWithin", t.typedArrayCopyWithin, "es6", "es5"), t.polyfill("Float64Array.prototype.copyWithin", t.typedArrayCopyWithin, "es6", "es5");
    var a = (function() {
      var r = typeof document < "u" && document.currentScript ? document.currentScript.src : void 0;
      return typeof __filename < "u" && (r = r || __filename), function(n) {
        function s(u) {
          return i.locateFile ? i.locateFile(u, _e) : _e + u;
        }
        function c(u, h, M) {
          var z = h + M;
          for (M = h; u[M] && !(M >= z); ) ++M;
          if (16 < M - h && u.buffer && Dt) return Dt.decode(u.subarray(h, M));
          for (z = ""; h < M; ) {
            var Y = u[h++];
            if (Y & 128) {
              var ee = u[h++] & 63;
              if ((Y & 224) == 192) z += String.fromCharCode((Y & 31) << 6 | ee);
              else {
                var Tt = u[h++] & 63;
                Y = (Y & 240) == 224 ? (Y & 15) << 12 | ee << 6 | Tt : (Y & 7) << 18 | ee << 12 | Tt << 6 | u[h++] & 63, 65536 > Y ? z += String.fromCharCode(Y) : (Y -= 65536, z += String.fromCharCode(55296 | Y >> 10, 56320 | Y & 1023));
              }
            } else z += String.fromCharCode(Y);
          }
          return z;
        }
        function d(u, h) {
          return u ? c(we, u, h) : "";
        }
        function y() {
          var u = gt.buffer;
          i.HEAP8 = ve = new Int8Array(u), i.HEAP16 = new Int16Array(u), i.HEAP32 = Ge = new Int32Array(u), i.HEAPU8 = we = new Uint8Array(u), i.HEAPU16 = new Uint16Array(u), i.HEAPU32 = ue = new Uint32Array(u), i.HEAPF32 = new Float32Array(u), i.HEAPF64 = new Float64Array(u);
        }
        function _(u) {
          throw i.onAbort && i.onAbort(u), u = "Aborted(" + u + ")", Ae(u), wt = !0, u = new WebAssembly.RuntimeError(u + ". Build with -sASSERTIONS for more info."), ge(u), u;
        }
        function g(u) {
          try {
            if (u == Te && Ke) return new Uint8Array(Ke);
            if (_t) return _t(u);
            throw "both async and sync fetching of the wasm failed";
          } catch (h) {
            _(h);
          }
        }
        function w() {
          if (!Ke && (he || Re)) {
            if (typeof fetch == "function" && !Te.startsWith("file://")) return fetch(Te, { credentials: "same-origin" }).then(function(u) {
              if (!u.ok) throw "failed to load wasm binary file at '" + Te + "'";
              return u.arrayBuffer();
            }).catch(function() {
              return g(Te);
            });
            if (mt) return new Promise(function(u, h) {
              mt(Te, function(M) {
                u(new Uint8Array(M));
              }, h);
            });
          }
          return Promise.resolve().then(function() {
            return g(Te);
          });
        }
        function E(u) {
          for (; 0 < u.length; ) u.shift()(i);
        }
        function T(u) {
          this.excPtr = u, this.ptr = u - 24, this.set_type = function(h) {
            ue[this.ptr + 4 >> 2] = h;
          }, this.get_type = function() {
            return ue[this.ptr + 4 >> 2];
          }, this.set_destructor = function(h) {
            ue[this.ptr + 8 >> 2] = h;
          }, this.get_destructor = function() {
            return ue[this.ptr + 8 >> 2];
          }, this.set_refcount = function(h) {
            Ge[this.ptr >> 2] = h;
          }, this.set_caught = function(h) {
            ve[this.ptr + 12 >> 0] = h ? 1 : 0;
          }, this.get_caught = function() {
            return ve[this.ptr + 12 >> 0] != 0;
          }, this.set_rethrown = function(h) {
            ve[this.ptr + 13 >> 0] = h ? 1 : 0;
          }, this.get_rethrown = function() {
            return ve[this.ptr + 13 >> 0] != 0;
          }, this.init = function(h, M) {
            this.set_adjusted_ptr(0), this.set_type(h), this.set_destructor(M), this.set_refcount(0), this.set_caught(!1), this.set_rethrown(!1);
          }, this.add_ref = function() {
            Ge[this.ptr >> 2] += 1;
          }, this.release_ref = function() {
            var h = Ge[this.ptr >> 2];
            return Ge[this.ptr >> 2] = h - 1, h === 1;
          }, this.set_adjusted_ptr = function(h) {
            ue[this.ptr + 16 >> 2] = h;
          }, this.get_adjusted_ptr = function() {
            return ue[this.ptr + 16 >> 2];
          }, this.get_exception_ptr = function() {
            if (ps(this.get_type())) return ue[this.excPtr >> 2];
            var h = this.get_adjusted_ptr();
            return h !== 0 ? h : this.excPtr;
          };
        }
        function j() {
          function u() {
            if (!On && (On = !0, i.calledRun = !0, !wt)) {
              if (Ut = !0, E(St), Be(i), i.onRuntimeInitialized && i.onRuntimeInitialized(), i.postRun) for (typeof i.postRun == "function" && (i.postRun = [i.postRun]); i.postRun.length; ) Ft.unshift(i.postRun.shift());
              E(Ft);
            }
          }
          if (!(0 < ze)) {
            if (i.preRun) for (typeof i.preRun == "function" && (i.preRun = [i.preRun]); i.preRun.length; ) vn.unshift(i.preRun.shift());
            E(vn), 0 < ze || (i.setStatus ? (i.setStatus("Running..."), setTimeout(function() {
              setTimeout(function() {
                i.setStatus("");
              }, 1), u();
            }, 1)) : u());
          }
        }
        function A() {
        }
        function l(u) {
          return (u || A).__cache__;
        }
        function S(u, h) {
          var M = l(h), z = M[u];
          return z || (z = Object.create((h || A).prototype), z.ptr = u, M[u] = z);
        }
        function I(u) {
          if (typeof u == "string") {
            for (var h = 0, M = 0; M < u.length; ++M) {
              var z = u.charCodeAt(M);
              127 >= z ? h++ : 2047 >= z ? h += 2 : 55296 <= z && 57343 >= z ? (h += 4, ++M) : h += 3;
            }
            if (h = Array(h + 1), M = 0, z = h.length, 0 < z) {
              z = M + z - 1;
              for (var Y = 0; Y < u.length; ++Y) {
                var ee = u.charCodeAt(Y);
                if (55296 <= ee && 57343 >= ee) {
                  var Tt = u.charCodeAt(++Y);
                  ee = 65536 + ((ee & 1023) << 10) | Tt & 1023;
                }
                if (127 >= ee) {
                  if (M >= z) break;
                  h[M++] = ee;
                } else {
                  if (2047 >= ee) {
                    if (M + 1 >= z) break;
                    h[M++] = 192 | ee >> 6;
                  } else {
                    if (65535 >= ee) {
                      if (M + 2 >= z) break;
                      h[M++] = 224 | ee >> 12;
                    } else {
                      if (M + 3 >= z) break;
                      h[M++] = 240 | ee >> 18, h[M++] = 128 | ee >> 12 & 63;
                    }
                    h[M++] = 128 | ee >> 6 & 63;
                  }
                  h[M++] = 128 | ee & 63;
                }
              }
              h[M] = 0;
            }
            return u = $.alloc(h, ve), $.copy(h, ve, u), u;
          }
          return u;
        }
        function k(u) {
          if (typeof u == "object") {
            var h = $.alloc(u, ve);
            return $.copy(u, ve, h), h;
          }
          return u;
        }
        function v() {
          throw "cannot construct a VoidPtr, no constructor in IDL";
        }
        function O() {
          this.ptr = Gt(), l(O)[this.ptr] = this;
        }
        function m() {
          this.ptr = zt(), l(m)[this.ptr] = this;
        }
        function R() {
          this.ptr = Wt(), l(R)[this.ptr] = this;
        }
        function C() {
          this.ptr = qt(), l(C)[this.ptr] = this;
        }
        function D() {
          this.ptr = ar(), l(D)[this.ptr] = this;
        }
        function B() {
          this.ptr = fr(), l(B)[this.ptr] = this;
        }
        function L() {
          this.ptr = lr(), l(L)[this.ptr] = this;
        }
        function G() {
          this.ptr = gr(), l(G)[this.ptr] = this;
        }
        function H() {
          this.ptr = Er(), l(H)[this.ptr] = this;
        }
        function P() {
          throw "cannot construct a Status, no constructor in IDL";
        }
        function V() {
          this.ptr = Mr(), l(V)[this.ptr] = this;
        }
        function K() {
          this.ptr = Cr(), l(K)[this.ptr] = this;
        }
        function f() {
          this.ptr = Ur(), l(f)[this.ptr] = this;
        }
        function Q() {
          this.ptr = Lr(), l(Q)[this.ptr] = this;
        }
        function oe() {
          this.ptr = Wr(), l(oe)[this.ptr] = this;
        }
        function ae() {
          this.ptr = Jr(), l(ae)[this.ptr] = this;
        }
        function se() {
          this.ptr = $r(), l(se)[this.ptr] = this;
        }
        function te() {
          this.ptr = nn(), l(te)[this.ptr] = this;
        }
        function W() {
          this.ptr = pn(), l(W)[this.ptr] = this;
        }
        n = n === void 0 ? {} : n;
        var i = typeof n < "u" ? n : {}, Be, ge;
        i.ready = new Promise(function(u, h) {
          Be = u, ge = h;
        });
        var lt = !1, ct = !1;
        i.onRuntimeInitialized = function() {
          lt = !0, ct && typeof i.onModuleLoaded == "function" && i.onModuleLoaded(i);
        }, i.onModuleParsed = function() {
          ct = !0, lt && typeof i.onModuleLoaded == "function" && i.onModuleLoaded(i);
        }, i.isVersionSupported = function(u) {
          return typeof u != "string" ? !1 : (u = u.split("."), 2 > u.length || 3 < u.length ? !1 : u[0] == 1 && 0 <= u[1] && 5 >= u[1] ? !0 : !(u[0] != 0 || 10 < u[1]));
        };
        var le = Object.assign({}, i), he = typeof window == "object", Re = typeof importScripts == "function", Le = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string", _e = "";
        if (Le) {
          var ht = Kn, Rt = Kn;
          _e = Re ? Rt.dirname(_e) + "/" : __dirname + "/";
          var Ne = function(u, h) {
            return u = u.startsWith("file://") ? new URL(u) : Rt.normalize(u), ht.readFileSync(u, h ? void 0 : "utf8");
          }, _t = function(u) {
            return u = Ne(u, !0), u.buffer || (u = new Uint8Array(u)), u;
          }, mt = function(u, h, M) {
            u = u.startsWith("file://") ? new URL(u) : Rt.normalize(u), ht.readFile(u, function(z, Y) {
              z ? M(z) : h(Y.buffer);
            });
          };
          1 < process.argv.length && process.argv[1].replace(/\\/g, "/"), process.argv.slice(2), i.inspect = function() {
            return "[Emscripten Module object]";
          };
        } else (he || Re) && (Re ? _e = self.location.href : typeof document < "u" && document.currentScript && (_e = document.currentScript.src), r && (_e = r), _e = _e.indexOf("blob:") !== 0 ? _e.substr(0, _e.replace(/[?#].*/, "").lastIndexOf("/") + 1) : "", Ne = function(u) {
          var h = new XMLHttpRequest();
          return h.open("GET", u, !1), h.send(null), h.responseText;
        }, Re && (_t = function(u) {
          var h = new XMLHttpRequest();
          return h.open("GET", u, !1), h.responseType = "arraybuffer", h.send(null), new Uint8Array(h.response);
        }), mt = function(u, h, M) {
          var z = new XMLHttpRequest();
          z.open("GET", u, !0), z.responseType = "arraybuffer", z.onload = function() {
            z.status == 200 || z.status == 0 && z.response ? h(z.response) : M();
          }, z.onerror = M, z.send(null);
        });
        var We = i.print || console.log.bind(console), Ae = i.printErr || console.warn.bind(console);
        Object.assign(i, le), le = null;
        var Ke;
        i.wasmBinary && (Ke = i.wasmBinary), typeof WebAssembly != "object" && _("no native wasm support detected");
        var gt, wt = !1, Dt = typeof TextDecoder < "u" ? new TextDecoder("utf8") : void 0, ve, we, Ge, ue, vn = [], St = [], Ft = [], Ut = !1, ze = 0, ut = null, Te = "draco_decoder.wasm";
        Te.startsWith("data:application/octet-stream;base64,") || (Te = s(Te));
        var kn = [null, [], []], Cn = { b: function(u, h, M) {
          throw new T(u).init(h, M), u;
        }, a: function() {
          _("");
        }, g: function(u, h, M) {
          we.copyWithin(u, h, h + M);
        }, e: function(u) {
          var h = we.length;
          if (u >>>= 0, 2147483648 < u) return !1;
          for (var M = 1; 4 >= M; M *= 2) {
            var z = h * (1 + 0.2 / M);
            z = Math.min(z, u + 100663296);
            var Y = Math;
            z = Math.max(u, z), Y = Y.min.call(Y, 2147483648, z + (65536 - z % 65536) % 65536);
            e: {
              z = gt.buffer;
              try {
                gt.grow(Y - z.byteLength + 65535 >>> 16), y();
                var ee = 1;
                break e;
              } catch {
              }
              ee = void 0;
            }
            if (ee) return !0;
          }
          return !1;
        }, f: function(u) {
          return 52;
        }, d: function(u, h, M, z, Y) {
          return 70;
        }, c: function(u, h, M, z) {
          for (var Y = 0, ee = 0; ee < M; ee++) {
            var Tt = ue[h >> 2], ls = ue[h + 4 >> 2];
            h += 8;
            for (var Jn = 0; Jn < ls; Jn++) {
              var Yn = we[Tt + Jn], Qn = kn[u];
              Yn === 0 || Yn === 10 ? ((u === 1 ? We : Ae)(c(Qn, 0)), Qn.length = 0) : Qn.push(Yn);
            }
            Y += ls;
          }
          return ue[z >> 2] = Y, 0;
        } };
        (function() {
          function u(Y, ee) {
            i.asm = Y.exports, gt = i.asm.h, y(), St.unshift(i.asm.i), ze--, i.monitorRunDependencies && i.monitorRunDependencies(ze), ze == 0 && ut && (Y = ut, ut = null, Y());
          }
          function h(Y) {
            u(Y.instance);
          }
          function M(Y) {
            return w().then(function(ee) {
              return WebAssembly.instantiate(ee, z);
            }).then(function(ee) {
              return ee;
            }).then(Y, function(ee) {
              Ae("failed to asynchronously prepare wasm: " + ee), _(ee);
            });
          }
          var z = { a: Cn };
          if (ze++, i.monitorRunDependencies && i.monitorRunDependencies(ze), i.instantiateWasm) try {
            return i.instantiateWasm(z, u);
          } catch (Y) {
            Ae("Module.instantiateWasm callback failed with error: " + Y), ge(Y);
          }
          return (function() {
            return Ke || typeof WebAssembly.instantiateStreaming != "function" || Te.startsWith("data:application/octet-stream;base64,") || Te.startsWith("file://") || Le || typeof fetch != "function" ? M(h) : fetch(Te, { credentials: "same-origin" }).then(function(Y) {
              return WebAssembly.instantiateStreaming(Y, z).then(h, function(ee) {
                return Ae("wasm streaming compile failed: " + ee), Ae("falling back to ArrayBuffer instantiation"), M(h);
              });
            });
          })().catch(ge), {};
        })();
        var Bt = i._emscripten_bind_VoidPtr___destroy___0 = function() {
          return (Bt = i._emscripten_bind_VoidPtr___destroy___0 = i.asm.k).apply(null, arguments);
        }, Gt = i._emscripten_bind_DecoderBuffer_DecoderBuffer_0 = function() {
          return (Gt = i._emscripten_bind_DecoderBuffer_DecoderBuffer_0 = i.asm.l).apply(null, arguments);
        }, Pt = i._emscripten_bind_DecoderBuffer_Init_2 = function() {
          return (Pt = i._emscripten_bind_DecoderBuffer_Init_2 = i.asm.m).apply(null, arguments);
        }, Lt = i._emscripten_bind_DecoderBuffer___destroy___0 = function() {
          return (Lt = i._emscripten_bind_DecoderBuffer___destroy___0 = i.asm.n).apply(null, arguments);
        }, zt = i._emscripten_bind_AttributeTransformData_AttributeTransformData_0 = function() {
          return (zt = i._emscripten_bind_AttributeTransformData_AttributeTransformData_0 = i.asm.o).apply(null, arguments);
        }, Ht = i._emscripten_bind_AttributeTransformData_transform_type_0 = function() {
          return (Ht = i._emscripten_bind_AttributeTransformData_transform_type_0 = i.asm.p).apply(null, arguments);
        }, Vt = i._emscripten_bind_AttributeTransformData___destroy___0 = function() {
          return (Vt = i._emscripten_bind_AttributeTransformData___destroy___0 = i.asm.q).apply(null, arguments);
        }, Wt = i._emscripten_bind_GeometryAttribute_GeometryAttribute_0 = function() {
          return (Wt = i._emscripten_bind_GeometryAttribute_GeometryAttribute_0 = i.asm.r).apply(null, arguments);
        }, Kt = i._emscripten_bind_GeometryAttribute___destroy___0 = function() {
          return (Kt = i._emscripten_bind_GeometryAttribute___destroy___0 = i.asm.s).apply(null, arguments);
        }, qt = i._emscripten_bind_PointAttribute_PointAttribute_0 = function() {
          return (qt = i._emscripten_bind_PointAttribute_PointAttribute_0 = i.asm.t).apply(null, arguments);
        }, Xt = i._emscripten_bind_PointAttribute_size_0 = function() {
          return (Xt = i._emscripten_bind_PointAttribute_size_0 = i.asm.u).apply(null, arguments);
        }, Jt = i._emscripten_bind_PointAttribute_GetAttributeTransformData_0 = function() {
          return (Jt = i._emscripten_bind_PointAttribute_GetAttributeTransformData_0 = i.asm.v).apply(null, arguments);
        }, Yt = i._emscripten_bind_PointAttribute_attribute_type_0 = function() {
          return (Yt = i._emscripten_bind_PointAttribute_attribute_type_0 = i.asm.w).apply(null, arguments);
        }, Qt = i._emscripten_bind_PointAttribute_data_type_0 = function() {
          return (Qt = i._emscripten_bind_PointAttribute_data_type_0 = i.asm.x).apply(null, arguments);
        }, Zt = i._emscripten_bind_PointAttribute_num_components_0 = function() {
          return (Zt = i._emscripten_bind_PointAttribute_num_components_0 = i.asm.y).apply(null, arguments);
        }, $t = i._emscripten_bind_PointAttribute_normalized_0 = function() {
          return ($t = i._emscripten_bind_PointAttribute_normalized_0 = i.asm.z).apply(null, arguments);
        }, er = i._emscripten_bind_PointAttribute_byte_stride_0 = function() {
          return (er = i._emscripten_bind_PointAttribute_byte_stride_0 = i.asm.A).apply(null, arguments);
        }, tr = i._emscripten_bind_PointAttribute_byte_offset_0 = function() {
          return (tr = i._emscripten_bind_PointAttribute_byte_offset_0 = i.asm.B).apply(null, arguments);
        }, rr = i._emscripten_bind_PointAttribute_unique_id_0 = function() {
          return (rr = i._emscripten_bind_PointAttribute_unique_id_0 = i.asm.C).apply(null, arguments);
        }, nr = i._emscripten_bind_PointAttribute___destroy___0 = function() {
          return (nr = i._emscripten_bind_PointAttribute___destroy___0 = i.asm.D).apply(null, arguments);
        }, ar = i._emscripten_bind_AttributeQuantizationTransform_AttributeQuantizationTransform_0 = function() {
          return (ar = i._emscripten_bind_AttributeQuantizationTransform_AttributeQuantizationTransform_0 = i.asm.E).apply(null, arguments);
        }, sr = i._emscripten_bind_AttributeQuantizationTransform_InitFromAttribute_1 = function() {
          return (sr = i._emscripten_bind_AttributeQuantizationTransform_InitFromAttribute_1 = i.asm.F).apply(null, arguments);
        }, ir = i._emscripten_bind_AttributeQuantizationTransform_quantization_bits_0 = function() {
          return (ir = i._emscripten_bind_AttributeQuantizationTransform_quantization_bits_0 = i.asm.G).apply(null, arguments);
        }, or = i._emscripten_bind_AttributeQuantizationTransform_min_value_1 = function() {
          return (or = i._emscripten_bind_AttributeQuantizationTransform_min_value_1 = i.asm.H).apply(null, arguments);
        }, cr = i._emscripten_bind_AttributeQuantizationTransform_range_0 = function() {
          return (cr = i._emscripten_bind_AttributeQuantizationTransform_range_0 = i.asm.I).apply(null, arguments);
        }, ur = i._emscripten_bind_AttributeQuantizationTransform___destroy___0 = function() {
          return (ur = i._emscripten_bind_AttributeQuantizationTransform___destroy___0 = i.asm.J).apply(null, arguments);
        }, fr = i._emscripten_bind_AttributeOctahedronTransform_AttributeOctahedronTransform_0 = function() {
          return (fr = i._emscripten_bind_AttributeOctahedronTransform_AttributeOctahedronTransform_0 = i.asm.K).apply(null, arguments);
        }, br = i._emscripten_bind_AttributeOctahedronTransform_InitFromAttribute_1 = function() {
          return (br = i._emscripten_bind_AttributeOctahedronTransform_InitFromAttribute_1 = i.asm.L).apply(
            null,
            arguments
          );
        }, dr = i._emscripten_bind_AttributeOctahedronTransform_quantization_bits_0 = function() {
          return (dr = i._emscripten_bind_AttributeOctahedronTransform_quantization_bits_0 = i.asm.M).apply(null, arguments);
        }, pr = i._emscripten_bind_AttributeOctahedronTransform___destroy___0 = function() {
          return (pr = i._emscripten_bind_AttributeOctahedronTransform___destroy___0 = i.asm.N).apply(null, arguments);
        }, lr = i._emscripten_bind_PointCloud_PointCloud_0 = function() {
          return (lr = i._emscripten_bind_PointCloud_PointCloud_0 = i.asm.O).apply(
            null,
            arguments
          );
        }, hr = i._emscripten_bind_PointCloud_num_attributes_0 = function() {
          return (hr = i._emscripten_bind_PointCloud_num_attributes_0 = i.asm.P).apply(null, arguments);
        }, _r = i._emscripten_bind_PointCloud_num_points_0 = function() {
          return (_r = i._emscripten_bind_PointCloud_num_points_0 = i.asm.Q).apply(null, arguments);
        }, mr = i._emscripten_bind_PointCloud___destroy___0 = function() {
          return (mr = i._emscripten_bind_PointCloud___destroy___0 = i.asm.R).apply(null, arguments);
        }, gr = i._emscripten_bind_Mesh_Mesh_0 = function() {
          return (gr = i._emscripten_bind_Mesh_Mesh_0 = i.asm.S).apply(null, arguments);
        }, yr = i._emscripten_bind_Mesh_num_faces_0 = function() {
          return (yr = i._emscripten_bind_Mesh_num_faces_0 = i.asm.T).apply(null, arguments);
        }, Tr = i._emscripten_bind_Mesh_num_attributes_0 = function() {
          return (Tr = i._emscripten_bind_Mesh_num_attributes_0 = i.asm.U).apply(null, arguments);
        }, xr = i._emscripten_bind_Mesh_num_points_0 = function() {
          return (xr = i._emscripten_bind_Mesh_num_points_0 = i.asm.V).apply(null, arguments);
        }, Ar = i._emscripten_bind_Mesh___destroy___0 = function() {
          return (Ar = i._emscripten_bind_Mesh___destroy___0 = i.asm.W).apply(null, arguments);
        }, Er = i._emscripten_bind_Metadata_Metadata_0 = function() {
          return (Er = i._emscripten_bind_Metadata_Metadata_0 = i.asm.X).apply(null, arguments);
        }, Ir = i._emscripten_bind_Metadata___destroy___0 = function() {
          return (Ir = i._emscripten_bind_Metadata___destroy___0 = i.asm.Y).apply(null, arguments);
        }, jr = i._emscripten_bind_Status_code_0 = function() {
          return (jr = i._emscripten_bind_Status_code_0 = i.asm.Z).apply(null, arguments);
        }, Rr = i._emscripten_bind_Status_ok_0 = function() {
          return (Rr = i._emscripten_bind_Status_ok_0 = i.asm._).apply(null, arguments);
        }, wr = i._emscripten_bind_Status_error_msg_0 = function() {
          return (wr = i._emscripten_bind_Status_error_msg_0 = i.asm.$).apply(null, arguments);
        }, Sr = i._emscripten_bind_Status___destroy___0 = function() {
          return (Sr = i._emscripten_bind_Status___destroy___0 = i.asm.aa).apply(null, arguments);
        }, Mr = i._emscripten_bind_DracoFloat32Array_DracoFloat32Array_0 = function() {
          return (Mr = i._emscripten_bind_DracoFloat32Array_DracoFloat32Array_0 = i.asm.ba).apply(null, arguments);
        }, Nr = i._emscripten_bind_DracoFloat32Array_GetValue_1 = function() {
          return (Nr = i._emscripten_bind_DracoFloat32Array_GetValue_1 = i.asm.ca).apply(null, arguments);
        }, vr = i._emscripten_bind_DracoFloat32Array_size_0 = function() {
          return (vr = i._emscripten_bind_DracoFloat32Array_size_0 = i.asm.da).apply(null, arguments);
        }, kr = i._emscripten_bind_DracoFloat32Array___destroy___0 = function() {
          return (kr = i._emscripten_bind_DracoFloat32Array___destroy___0 = i.asm.ea).apply(null, arguments);
        }, Cr = i._emscripten_bind_DracoInt8Array_DracoInt8Array_0 = function() {
          return (Cr = i._emscripten_bind_DracoInt8Array_DracoInt8Array_0 = i.asm.fa).apply(null, arguments);
        }, Or = i._emscripten_bind_DracoInt8Array_GetValue_1 = function() {
          return (Or = i._emscripten_bind_DracoInt8Array_GetValue_1 = i.asm.ga).apply(null, arguments);
        }, Dr = i._emscripten_bind_DracoInt8Array_size_0 = function() {
          return (Dr = i._emscripten_bind_DracoInt8Array_size_0 = i.asm.ha).apply(null, arguments);
        }, Fr = i._emscripten_bind_DracoInt8Array___destroy___0 = function() {
          return (Fr = i._emscripten_bind_DracoInt8Array___destroy___0 = i.asm.ia).apply(null, arguments);
        }, Ur = i._emscripten_bind_DracoUInt8Array_DracoUInt8Array_0 = function() {
          return (Ur = i._emscripten_bind_DracoUInt8Array_DracoUInt8Array_0 = i.asm.ja).apply(null, arguments);
        }, Br = i._emscripten_bind_DracoUInt8Array_GetValue_1 = function() {
          return (Br = i._emscripten_bind_DracoUInt8Array_GetValue_1 = i.asm.ka).apply(null, arguments);
        }, Gr = i._emscripten_bind_DracoUInt8Array_size_0 = function() {
          return (Gr = i._emscripten_bind_DracoUInt8Array_size_0 = i.asm.la).apply(null, arguments);
        }, Pr = i._emscripten_bind_DracoUInt8Array___destroy___0 = function() {
          return (Pr = i._emscripten_bind_DracoUInt8Array___destroy___0 = i.asm.ma).apply(null, arguments);
        }, Lr = i._emscripten_bind_DracoInt16Array_DracoInt16Array_0 = function() {
          return (Lr = i._emscripten_bind_DracoInt16Array_DracoInt16Array_0 = i.asm.na).apply(null, arguments);
        }, zr = i._emscripten_bind_DracoInt16Array_GetValue_1 = function() {
          return (zr = i._emscripten_bind_DracoInt16Array_GetValue_1 = i.asm.oa).apply(null, arguments);
        }, Hr = i._emscripten_bind_DracoInt16Array_size_0 = function() {
          return (Hr = i._emscripten_bind_DracoInt16Array_size_0 = i.asm.pa).apply(null, arguments);
        }, Vr = i._emscripten_bind_DracoInt16Array___destroy___0 = function() {
          return (Vr = i._emscripten_bind_DracoInt16Array___destroy___0 = i.asm.qa).apply(null, arguments);
        }, Wr = i._emscripten_bind_DracoUInt16Array_DracoUInt16Array_0 = function() {
          return (Wr = i._emscripten_bind_DracoUInt16Array_DracoUInt16Array_0 = i.asm.ra).apply(null, arguments);
        }, Kr = i._emscripten_bind_DracoUInt16Array_GetValue_1 = function() {
          return (Kr = i._emscripten_bind_DracoUInt16Array_GetValue_1 = i.asm.sa).apply(null, arguments);
        }, qr = i._emscripten_bind_DracoUInt16Array_size_0 = function() {
          return (qr = i._emscripten_bind_DracoUInt16Array_size_0 = i.asm.ta).apply(null, arguments);
        }, Xr = i._emscripten_bind_DracoUInt16Array___destroy___0 = function() {
          return (Xr = i._emscripten_bind_DracoUInt16Array___destroy___0 = i.asm.ua).apply(null, arguments);
        }, Jr = i._emscripten_bind_DracoInt32Array_DracoInt32Array_0 = function() {
          return (Jr = i._emscripten_bind_DracoInt32Array_DracoInt32Array_0 = i.asm.va).apply(null, arguments);
        }, Yr = i._emscripten_bind_DracoInt32Array_GetValue_1 = function() {
          return (Yr = i._emscripten_bind_DracoInt32Array_GetValue_1 = i.asm.wa).apply(null, arguments);
        }, Qr = i._emscripten_bind_DracoInt32Array_size_0 = function() {
          return (Qr = i._emscripten_bind_DracoInt32Array_size_0 = i.asm.xa).apply(null, arguments);
        }, Zr = i._emscripten_bind_DracoInt32Array___destroy___0 = function() {
          return (Zr = i._emscripten_bind_DracoInt32Array___destroy___0 = i.asm.ya).apply(null, arguments);
        }, $r = i._emscripten_bind_DracoUInt32Array_DracoUInt32Array_0 = function() {
          return ($r = i._emscripten_bind_DracoUInt32Array_DracoUInt32Array_0 = i.asm.za).apply(null, arguments);
        }, en = i._emscripten_bind_DracoUInt32Array_GetValue_1 = function() {
          return (en = i._emscripten_bind_DracoUInt32Array_GetValue_1 = i.asm.Aa).apply(null, arguments);
        }, tn = i._emscripten_bind_DracoUInt32Array_size_0 = function() {
          return (tn = i._emscripten_bind_DracoUInt32Array_size_0 = i.asm.Ba).apply(null, arguments);
        }, rn = i._emscripten_bind_DracoUInt32Array___destroy___0 = function() {
          return (rn = i._emscripten_bind_DracoUInt32Array___destroy___0 = i.asm.Ca).apply(null, arguments);
        }, nn = i._emscripten_bind_MetadataQuerier_MetadataQuerier_0 = function() {
          return (nn = i._emscripten_bind_MetadataQuerier_MetadataQuerier_0 = i.asm.Da).apply(null, arguments);
        }, an = i._emscripten_bind_MetadataQuerier_HasEntry_2 = function() {
          return (an = i._emscripten_bind_MetadataQuerier_HasEntry_2 = i.asm.Ea).apply(null, arguments);
        }, sn = i._emscripten_bind_MetadataQuerier_GetIntEntry_2 = function() {
          return (sn = i._emscripten_bind_MetadataQuerier_GetIntEntry_2 = i.asm.Fa).apply(null, arguments);
        }, on = i._emscripten_bind_MetadataQuerier_GetIntEntryArray_3 = function() {
          return (on = i._emscripten_bind_MetadataQuerier_GetIntEntryArray_3 = i.asm.Ga).apply(null, arguments);
        }, cn = i._emscripten_bind_MetadataQuerier_GetDoubleEntry_2 = function() {
          return (cn = i._emscripten_bind_MetadataQuerier_GetDoubleEntry_2 = i.asm.Ha).apply(null, arguments);
        }, un = i._emscripten_bind_MetadataQuerier_GetStringEntry_2 = function() {
          return (un = i._emscripten_bind_MetadataQuerier_GetStringEntry_2 = i.asm.Ia).apply(null, arguments);
        }, fn = i._emscripten_bind_MetadataQuerier_NumEntries_1 = function() {
          return (fn = i._emscripten_bind_MetadataQuerier_NumEntries_1 = i.asm.Ja).apply(null, arguments);
        }, bn = i._emscripten_bind_MetadataQuerier_GetEntryName_2 = function() {
          return (bn = i._emscripten_bind_MetadataQuerier_GetEntryName_2 = i.asm.Ka).apply(null, arguments);
        }, dn = i._emscripten_bind_MetadataQuerier___destroy___0 = function() {
          return (dn = i._emscripten_bind_MetadataQuerier___destroy___0 = i.asm.La).apply(null, arguments);
        }, pn = i._emscripten_bind_Decoder_Decoder_0 = function() {
          return (pn = i._emscripten_bind_Decoder_Decoder_0 = i.asm.Ma).apply(null, arguments);
        }, ln = i._emscripten_bind_Decoder_DecodeArrayToPointCloud_3 = function() {
          return (ln = i._emscripten_bind_Decoder_DecodeArrayToPointCloud_3 = i.asm.Na).apply(null, arguments);
        }, hn = i._emscripten_bind_Decoder_DecodeArrayToMesh_3 = function() {
          return (hn = i._emscripten_bind_Decoder_DecodeArrayToMesh_3 = i.asm.Oa).apply(null, arguments);
        }, _n = i._emscripten_bind_Decoder_GetAttributeId_2 = function() {
          return (_n = i._emscripten_bind_Decoder_GetAttributeId_2 = i.asm.Pa).apply(null, arguments);
        }, mn = i._emscripten_bind_Decoder_GetAttributeIdByName_2 = function() {
          return (mn = i._emscripten_bind_Decoder_GetAttributeIdByName_2 = i.asm.Qa).apply(null, arguments);
        }, gn = i._emscripten_bind_Decoder_GetAttributeIdByMetadataEntry_3 = function() {
          return (gn = i._emscripten_bind_Decoder_GetAttributeIdByMetadataEntry_3 = i.asm.Ra).apply(null, arguments);
        }, yt = i._emscripten_bind_Decoder_GetAttribute_2 = function() {
          return (yt = i._emscripten_bind_Decoder_GetAttribute_2 = i.asm.Sa).apply(null, arguments);
        }, J = i._emscripten_bind_Decoder_GetAttributeByUniqueId_2 = function() {
          return (J = i._emscripten_bind_Decoder_GetAttributeByUniqueId_2 = i.asm.Ta).apply(null, arguments);
        }, b = i._emscripten_bind_Decoder_GetMetadata_1 = function() {
          return (b = i._emscripten_bind_Decoder_GetMetadata_1 = i.asm.Ua).apply(null, arguments);
        }, p = i._emscripten_bind_Decoder_GetAttributeMetadata_2 = function() {
          return (p = i._emscripten_bind_Decoder_GetAttributeMetadata_2 = i.asm.Va).apply(null, arguments);
        }, x = i._emscripten_bind_Decoder_GetFaceFromMesh_3 = function() {
          return (x = i._emscripten_bind_Decoder_GetFaceFromMesh_3 = i.asm.Wa).apply(null, arguments);
        }, N = i._emscripten_bind_Decoder_GetTriangleStripsFromMesh_2 = function() {
          return (N = i._emscripten_bind_Decoder_GetTriangleStripsFromMesh_2 = i.asm.Xa).apply(null, arguments);
        }, U = i._emscripten_bind_Decoder_GetTrianglesUInt16Array_3 = function() {
          return (U = i._emscripten_bind_Decoder_GetTrianglesUInt16Array_3 = i.asm.Ya).apply(null, arguments);
        }, X = i._emscripten_bind_Decoder_GetTrianglesUInt32Array_3 = function() {
          return (X = i._emscripten_bind_Decoder_GetTrianglesUInt32Array_3 = i.asm.Za).apply(null, arguments);
        }, yn = i._emscripten_bind_Decoder_GetAttributeFloat_3 = function() {
          return (yn = i._emscripten_bind_Decoder_GetAttributeFloat_3 = i.asm._a).apply(null, arguments);
        }, xa = i._emscripten_bind_Decoder_GetAttributeFloatForAllPoints_3 = function() {
          return (xa = i._emscripten_bind_Decoder_GetAttributeFloatForAllPoints_3 = i.asm.$a).apply(null, arguments);
        }, Aa = i._emscripten_bind_Decoder_GetAttributeIntForAllPoints_3 = function() {
          return (Aa = i._emscripten_bind_Decoder_GetAttributeIntForAllPoints_3 = i.asm.ab).apply(null, arguments);
        }, Ea = i._emscripten_bind_Decoder_GetAttributeInt8ForAllPoints_3 = function() {
          return (Ea = i._emscripten_bind_Decoder_GetAttributeInt8ForAllPoints_3 = i.asm.bb).apply(null, arguments);
        }, Ia = i._emscripten_bind_Decoder_GetAttributeUInt8ForAllPoints_3 = function() {
          return (Ia = i._emscripten_bind_Decoder_GetAttributeUInt8ForAllPoints_3 = i.asm.cb).apply(null, arguments);
        }, ja = i._emscripten_bind_Decoder_GetAttributeInt16ForAllPoints_3 = function() {
          return (ja = i._emscripten_bind_Decoder_GetAttributeInt16ForAllPoints_3 = i.asm.db).apply(null, arguments);
        }, Ra = i._emscripten_bind_Decoder_GetAttributeUInt16ForAllPoints_3 = function() {
          return (Ra = i._emscripten_bind_Decoder_GetAttributeUInt16ForAllPoints_3 = i.asm.eb).apply(null, arguments);
        }, wa = i._emscripten_bind_Decoder_GetAttributeInt32ForAllPoints_3 = function() {
          return (wa = i._emscripten_bind_Decoder_GetAttributeInt32ForAllPoints_3 = i.asm.fb).apply(null, arguments);
        }, Sa = i._emscripten_bind_Decoder_GetAttributeUInt32ForAllPoints_3 = function() {
          return (Sa = i._emscripten_bind_Decoder_GetAttributeUInt32ForAllPoints_3 = i.asm.gb).apply(null, arguments);
        }, Ma = i._emscripten_bind_Decoder_GetAttributeDataArrayForAllPoints_5 = function() {
          return (Ma = i._emscripten_bind_Decoder_GetAttributeDataArrayForAllPoints_5 = i.asm.hb).apply(null, arguments);
        }, Na = i._emscripten_bind_Decoder_SkipAttributeTransform_1 = function() {
          return (Na = i._emscripten_bind_Decoder_SkipAttributeTransform_1 = i.asm.ib).apply(null, arguments);
        }, va = i._emscripten_bind_Decoder_GetEncodedGeometryType_Deprecated_1 = function() {
          return (va = i._emscripten_bind_Decoder_GetEncodedGeometryType_Deprecated_1 = i.asm.jb).apply(null, arguments);
        }, ka = i._emscripten_bind_Decoder_DecodeBufferToPointCloud_2 = function() {
          return (ka = i._emscripten_bind_Decoder_DecodeBufferToPointCloud_2 = i.asm.kb).apply(null, arguments);
        }, Ca = i._emscripten_bind_Decoder_DecodeBufferToMesh_2 = function() {
          return (Ca = i._emscripten_bind_Decoder_DecodeBufferToMesh_2 = i.asm.lb).apply(null, arguments);
        }, Oa = i._emscripten_bind_Decoder___destroy___0 = function() {
          return (Oa = i._emscripten_bind_Decoder___destroy___0 = i.asm.mb).apply(null, arguments);
        }, Da = i._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_INVALID_TRANSFORM = function() {
          return (Da = i._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_INVALID_TRANSFORM = i.asm.nb).apply(null, arguments);
        }, Fa = i._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_NO_TRANSFORM = function() {
          return (Fa = i._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_NO_TRANSFORM = i.asm.ob).apply(null, arguments);
        }, Ua = i._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_QUANTIZATION_TRANSFORM = function() {
          return (Ua = i._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_QUANTIZATION_TRANSFORM = i.asm.pb).apply(null, arguments);
        }, Ba = i._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_OCTAHEDRON_TRANSFORM = function() {
          return (Ba = i._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_OCTAHEDRON_TRANSFORM = i.asm.qb).apply(null, arguments);
        }, Ga = i._emscripten_enum_draco_GeometryAttribute_Type_INVALID = function() {
          return (Ga = i._emscripten_enum_draco_GeometryAttribute_Type_INVALID = i.asm.rb).apply(null, arguments);
        }, Pa = i._emscripten_enum_draco_GeometryAttribute_Type_POSITION = function() {
          return (Pa = i._emscripten_enum_draco_GeometryAttribute_Type_POSITION = i.asm.sb).apply(null, arguments);
        }, La = i._emscripten_enum_draco_GeometryAttribute_Type_NORMAL = function() {
          return (La = i._emscripten_enum_draco_GeometryAttribute_Type_NORMAL = i.asm.tb).apply(null, arguments);
        }, za = i._emscripten_enum_draco_GeometryAttribute_Type_COLOR = function() {
          return (za = i._emscripten_enum_draco_GeometryAttribute_Type_COLOR = i.asm.ub).apply(null, arguments);
        }, Ha = i._emscripten_enum_draco_GeometryAttribute_Type_TEX_COORD = function() {
          return (Ha = i._emscripten_enum_draco_GeometryAttribute_Type_TEX_COORD = i.asm.vb).apply(null, arguments);
        }, Va = i._emscripten_enum_draco_GeometryAttribute_Type_GENERIC = function() {
          return (Va = i._emscripten_enum_draco_GeometryAttribute_Type_GENERIC = i.asm.wb).apply(null, arguments);
        }, Wa = i._emscripten_enum_draco_EncodedGeometryType_INVALID_GEOMETRY_TYPE = function() {
          return (Wa = i._emscripten_enum_draco_EncodedGeometryType_INVALID_GEOMETRY_TYPE = i.asm.xb).apply(null, arguments);
        }, Ka = i._emscripten_enum_draco_EncodedGeometryType_POINT_CLOUD = function() {
          return (Ka = i._emscripten_enum_draco_EncodedGeometryType_POINT_CLOUD = i.asm.yb).apply(null, arguments);
        }, qa = i._emscripten_enum_draco_EncodedGeometryType_TRIANGULAR_MESH = function() {
          return (qa = i._emscripten_enum_draco_EncodedGeometryType_TRIANGULAR_MESH = i.asm.zb).apply(null, arguments);
        }, Xa = i._emscripten_enum_draco_DataType_DT_INVALID = function() {
          return (Xa = i._emscripten_enum_draco_DataType_DT_INVALID = i.asm.Ab).apply(null, arguments);
        }, Ja = i._emscripten_enum_draco_DataType_DT_INT8 = function() {
          return (Ja = i._emscripten_enum_draco_DataType_DT_INT8 = i.asm.Bb).apply(null, arguments);
        }, Ya = i._emscripten_enum_draco_DataType_DT_UINT8 = function() {
          return (Ya = i._emscripten_enum_draco_DataType_DT_UINT8 = i.asm.Cb).apply(null, arguments);
        }, Qa = i._emscripten_enum_draco_DataType_DT_INT16 = function() {
          return (Qa = i._emscripten_enum_draco_DataType_DT_INT16 = i.asm.Db).apply(null, arguments);
        }, Za = i._emscripten_enum_draco_DataType_DT_UINT16 = function() {
          return (Za = i._emscripten_enum_draco_DataType_DT_UINT16 = i.asm.Eb).apply(null, arguments);
        }, $a = i._emscripten_enum_draco_DataType_DT_INT32 = function() {
          return ($a = i._emscripten_enum_draco_DataType_DT_INT32 = i.asm.Fb).apply(null, arguments);
        }, es = i._emscripten_enum_draco_DataType_DT_UINT32 = function() {
          return (es = i._emscripten_enum_draco_DataType_DT_UINT32 = i.asm.Gb).apply(null, arguments);
        }, ts = i._emscripten_enum_draco_DataType_DT_INT64 = function() {
          return (ts = i._emscripten_enum_draco_DataType_DT_INT64 = i.asm.Hb).apply(null, arguments);
        }, rs = i._emscripten_enum_draco_DataType_DT_UINT64 = function() {
          return (rs = i._emscripten_enum_draco_DataType_DT_UINT64 = i.asm.Ib).apply(null, arguments);
        }, ns = i._emscripten_enum_draco_DataType_DT_FLOAT32 = function() {
          return (ns = i._emscripten_enum_draco_DataType_DT_FLOAT32 = i.asm.Jb).apply(
            null,
            arguments
          );
        }, as = i._emscripten_enum_draco_DataType_DT_FLOAT64 = function() {
          return (as = i._emscripten_enum_draco_DataType_DT_FLOAT64 = i.asm.Kb).apply(null, arguments);
        }, ss = i._emscripten_enum_draco_DataType_DT_BOOL = function() {
          return (ss = i._emscripten_enum_draco_DataType_DT_BOOL = i.asm.Lb).apply(null, arguments);
        }, is = i._emscripten_enum_draco_DataType_DT_TYPES_COUNT = function() {
          return (is = i._emscripten_enum_draco_DataType_DT_TYPES_COUNT = i.asm.Mb).apply(null, arguments);
        }, os = i._emscripten_enum_draco_StatusCode_OK = function() {
          return (os = i._emscripten_enum_draco_StatusCode_OK = i.asm.Nb).apply(null, arguments);
        }, cs = i._emscripten_enum_draco_StatusCode_DRACO_ERROR = function() {
          return (cs = i._emscripten_enum_draco_StatusCode_DRACO_ERROR = i.asm.Ob).apply(null, arguments);
        }, us = i._emscripten_enum_draco_StatusCode_IO_ERROR = function() {
          return (us = i._emscripten_enum_draco_StatusCode_IO_ERROR = i.asm.Pb).apply(null, arguments);
        }, fs = i._emscripten_enum_draco_StatusCode_INVALID_PARAMETER = function() {
          return (fs = i._emscripten_enum_draco_StatusCode_INVALID_PARAMETER = i.asm.Qb).apply(null, arguments);
        }, bs = i._emscripten_enum_draco_StatusCode_UNSUPPORTED_VERSION = function() {
          return (bs = i._emscripten_enum_draco_StatusCode_UNSUPPORTED_VERSION = i.asm.Rb).apply(null, arguments);
        }, ds = i._emscripten_enum_draco_StatusCode_UNKNOWN_VERSION = function() {
          return (ds = i._emscripten_enum_draco_StatusCode_UNKNOWN_VERSION = i.asm.Sb).apply(null, arguments);
        };
        i._malloc = function() {
          return (i._malloc = i.asm.Tb).apply(null, arguments);
        }, i._free = function() {
          return (i._free = i.asm.Ub).apply(null, arguments);
        };
        var ps = function() {
          return (ps = i.asm.Vb).apply(null, arguments);
        };
        i.___start_em_js = 15856, i.___stop_em_js = 15954;
        var On;
        if (ut = function u() {
          On || j(), On || (ut = u);
        }, i.preInit) for (typeof i.preInit == "function" && (i.preInit = [i.preInit]); 0 < i.preInit.length; ) i.preInit.pop()();
        j(), A.prototype = Object.create(A.prototype), A.prototype.constructor = A, A.prototype.__class__ = A, A.__cache__ = {}, i.WrapperObject = A, i.getCache = l, i.wrapPointer = S, i.castObject = function(u, h) {
          return S(u.ptr, h);
        }, i.NULL = S(0), i.destroy = function(u) {
          if (!u.__destroy__) throw "Error: Cannot destroy object. (Did you create it yourself?)";
          u.__destroy__(), delete l(u.__class__)[u.ptr];
        }, i.compare = function(u, h) {
          return u.ptr === h.ptr;
        }, i.getPointer = function(u) {
          return u.ptr;
        }, i.getClass = function(u) {
          return u.__class__;
        };
        var $ = { buffer: 0, size: 0, pos: 0, temps: [], needed: 0, prepare: function() {
          if ($.needed) {
            for (var u = 0; u < $.temps.length; u++) i._free($.temps[u]);
            $.temps.length = 0, i._free($.buffer), $.buffer = 0, $.size += $.needed, $.needed = 0;
          }
          $.buffer || ($.size += 128, $.buffer = i._malloc($.size), $.buffer || _(void 0)), $.pos = 0;
        }, alloc: function(u, h) {
          return $.buffer || _(void 0), u = u.length * h.BYTES_PER_ELEMENT, u = u + 7 & -8, $.pos + u >= $.size ? (0 < u || _(void 0), $.needed += u, h = i._malloc(u), $.temps.push(h)) : (h = $.buffer + $.pos, $.pos += u), h;
        }, copy: function(u, h, M) {
          switch (M >>>= 0, h.BYTES_PER_ELEMENT) {
            case 2:
              M >>>= 1;
              break;
            case 4:
              M >>>= 2;
              break;
            case 8:
              M >>>= 3;
          }
          for (var z = 0; z < u.length; z++) h[M + z] = u[z];
        } };
        return v.prototype = Object.create(A.prototype), v.prototype.constructor = v, v.prototype.__class__ = v, v.__cache__ = {}, i.VoidPtr = v, v.prototype.__destroy__ = v.prototype.__destroy__ = function() {
          Bt(this.ptr);
        }, O.prototype = Object.create(A.prototype), O.prototype.constructor = O, O.prototype.__class__ = O, O.__cache__ = {}, i.DecoderBuffer = O, O.prototype.Init = O.prototype.Init = function(u, h) {
          var M = this.ptr;
          $.prepare(), typeof u == "object" && (u = k(u)), h && typeof h == "object" && (h = h.ptr), Pt(M, u, h);
        }, O.prototype.__destroy__ = O.prototype.__destroy__ = function() {
          Lt(this.ptr);
        }, m.prototype = Object.create(A.prototype), m.prototype.constructor = m, m.prototype.__class__ = m, m.__cache__ = {}, i.AttributeTransformData = m, m.prototype.transform_type = m.prototype.transform_type = function() {
          return Ht(this.ptr);
        }, m.prototype.__destroy__ = m.prototype.__destroy__ = function() {
          Vt(this.ptr);
        }, R.prototype = Object.create(A.prototype), R.prototype.constructor = R, R.prototype.__class__ = R, R.__cache__ = {}, i.GeometryAttribute = R, R.prototype.__destroy__ = R.prototype.__destroy__ = function() {
          Kt(this.ptr);
        }, C.prototype = Object.create(A.prototype), C.prototype.constructor = C, C.prototype.__class__ = C, C.__cache__ = {}, i.PointAttribute = C, C.prototype.size = C.prototype.size = function() {
          return Xt(this.ptr);
        }, C.prototype.GetAttributeTransformData = C.prototype.GetAttributeTransformData = function() {
          return S(Jt(this.ptr), m);
        }, C.prototype.attribute_type = C.prototype.attribute_type = function() {
          return Yt(this.ptr);
        }, C.prototype.data_type = C.prototype.data_type = function() {
          return Qt(this.ptr);
        }, C.prototype.num_components = C.prototype.num_components = function() {
          return Zt(this.ptr);
        }, C.prototype.normalized = C.prototype.normalized = function() {
          return !!$t(this.ptr);
        }, C.prototype.byte_stride = C.prototype.byte_stride = function() {
          return er(this.ptr);
        }, C.prototype.byte_offset = C.prototype.byte_offset = function() {
          return tr(this.ptr);
        }, C.prototype.unique_id = C.prototype.unique_id = function() {
          return rr(this.ptr);
        }, C.prototype.__destroy__ = C.prototype.__destroy__ = function() {
          nr(this.ptr);
        }, D.prototype = Object.create(A.prototype), D.prototype.constructor = D, D.prototype.__class__ = D, D.__cache__ = {}, i.AttributeQuantizationTransform = D, D.prototype.InitFromAttribute = D.prototype.InitFromAttribute = function(u) {
          var h = this.ptr;
          return u && typeof u == "object" && (u = u.ptr), !!sr(h, u);
        }, D.prototype.quantization_bits = D.prototype.quantization_bits = function() {
          return ir(this.ptr);
        }, D.prototype.min_value = D.prototype.min_value = function(u) {
          var h = this.ptr;
          return u && typeof u == "object" && (u = u.ptr), or(h, u);
        }, D.prototype.range = D.prototype.range = function() {
          return cr(this.ptr);
        }, D.prototype.__destroy__ = D.prototype.__destroy__ = function() {
          ur(this.ptr);
        }, B.prototype = Object.create(A.prototype), B.prototype.constructor = B, B.prototype.__class__ = B, B.__cache__ = {}, i.AttributeOctahedronTransform = B, B.prototype.InitFromAttribute = B.prototype.InitFromAttribute = function(u) {
          var h = this.ptr;
          return u && typeof u == "object" && (u = u.ptr), !!br(h, u);
        }, B.prototype.quantization_bits = B.prototype.quantization_bits = function() {
          return dr(this.ptr);
        }, B.prototype.__destroy__ = B.prototype.__destroy__ = function() {
          pr(this.ptr);
        }, L.prototype = Object.create(A.prototype), L.prototype.constructor = L, L.prototype.__class__ = L, L.__cache__ = {}, i.PointCloud = L, L.prototype.num_attributes = L.prototype.num_attributes = function() {
          return hr(this.ptr);
        }, L.prototype.num_points = L.prototype.num_points = function() {
          return _r(this.ptr);
        }, L.prototype.__destroy__ = L.prototype.__destroy__ = function() {
          mr(this.ptr);
        }, G.prototype = Object.create(A.prototype), G.prototype.constructor = G, G.prototype.__class__ = G, G.__cache__ = {}, i.Mesh = G, G.prototype.num_faces = G.prototype.num_faces = function() {
          return yr(this.ptr);
        }, G.prototype.num_attributes = G.prototype.num_attributes = function() {
          return Tr(this.ptr);
        }, G.prototype.num_points = G.prototype.num_points = function() {
          return xr(this.ptr);
        }, G.prototype.__destroy__ = G.prototype.__destroy__ = function() {
          Ar(this.ptr);
        }, H.prototype = Object.create(A.prototype), H.prototype.constructor = H, H.prototype.__class__ = H, H.__cache__ = {}, i.Metadata = H, H.prototype.__destroy__ = H.prototype.__destroy__ = function() {
          Ir(this.ptr);
        }, P.prototype = Object.create(A.prototype), P.prototype.constructor = P, P.prototype.__class__ = P, P.__cache__ = {}, i.Status = P, P.prototype.code = P.prototype.code = function() {
          return jr(this.ptr);
        }, P.prototype.ok = P.prototype.ok = function() {
          return !!Rr(this.ptr);
        }, P.prototype.error_msg = P.prototype.error_msg = function() {
          return d(wr(this.ptr));
        }, P.prototype.__destroy__ = P.prototype.__destroy__ = function() {
          Sr(this.ptr);
        }, V.prototype = Object.create(A.prototype), V.prototype.constructor = V, V.prototype.__class__ = V, V.__cache__ = {}, i.DracoFloat32Array = V, V.prototype.GetValue = V.prototype.GetValue = function(u) {
          var h = this.ptr;
          return u && typeof u == "object" && (u = u.ptr), Nr(h, u);
        }, V.prototype.size = V.prototype.size = function() {
          return vr(this.ptr);
        }, V.prototype.__destroy__ = V.prototype.__destroy__ = function() {
          kr(this.ptr);
        }, K.prototype = Object.create(A.prototype), K.prototype.constructor = K, K.prototype.__class__ = K, K.__cache__ = {}, i.DracoInt8Array = K, K.prototype.GetValue = K.prototype.GetValue = function(u) {
          var h = this.ptr;
          return u && typeof u == "object" && (u = u.ptr), Or(h, u);
        }, K.prototype.size = K.prototype.size = function() {
          return Dr(this.ptr);
        }, K.prototype.__destroy__ = K.prototype.__destroy__ = function() {
          Fr(this.ptr);
        }, f.prototype = Object.create(A.prototype), f.prototype.constructor = f, f.prototype.__class__ = f, f.__cache__ = {}, i.DracoUInt8Array = f, f.prototype.GetValue = f.prototype.GetValue = function(u) {
          var h = this.ptr;
          return u && typeof u == "object" && (u = u.ptr), Br(h, u);
        }, f.prototype.size = f.prototype.size = function() {
          return Gr(this.ptr);
        }, f.prototype.__destroy__ = f.prototype.__destroy__ = function() {
          Pr(this.ptr);
        }, Q.prototype = Object.create(A.prototype), Q.prototype.constructor = Q, Q.prototype.__class__ = Q, Q.__cache__ = {}, i.DracoInt16Array = Q, Q.prototype.GetValue = Q.prototype.GetValue = function(u) {
          var h = this.ptr;
          return u && typeof u == "object" && (u = u.ptr), zr(h, u);
        }, Q.prototype.size = Q.prototype.size = function() {
          return Hr(this.ptr);
        }, Q.prototype.__destroy__ = Q.prototype.__destroy__ = function() {
          Vr(this.ptr);
        }, oe.prototype = Object.create(A.prototype), oe.prototype.constructor = oe, oe.prototype.__class__ = oe, oe.__cache__ = {}, i.DracoUInt16Array = oe, oe.prototype.GetValue = oe.prototype.GetValue = function(u) {
          var h = this.ptr;
          return u && typeof u == "object" && (u = u.ptr), Kr(h, u);
        }, oe.prototype.size = oe.prototype.size = function() {
          return qr(this.ptr);
        }, oe.prototype.__destroy__ = oe.prototype.__destroy__ = function() {
          Xr(this.ptr);
        }, ae.prototype = Object.create(A.prototype), ae.prototype.constructor = ae, ae.prototype.__class__ = ae, ae.__cache__ = {}, i.DracoInt32Array = ae, ae.prototype.GetValue = ae.prototype.GetValue = function(u) {
          var h = this.ptr;
          return u && typeof u == "object" && (u = u.ptr), Yr(h, u);
        }, ae.prototype.size = ae.prototype.size = function() {
          return Qr(this.ptr);
        }, ae.prototype.__destroy__ = ae.prototype.__destroy__ = function() {
          Zr(this.ptr);
        }, se.prototype = Object.create(A.prototype), se.prototype.constructor = se, se.prototype.__class__ = se, se.__cache__ = {}, i.DracoUInt32Array = se, se.prototype.GetValue = se.prototype.GetValue = function(u) {
          var h = this.ptr;
          return u && typeof u == "object" && (u = u.ptr), en(h, u);
        }, se.prototype.size = se.prototype.size = function() {
          return tn(this.ptr);
        }, se.prototype.__destroy__ = se.prototype.__destroy__ = function() {
          rn(this.ptr);
        }, te.prototype = Object.create(A.prototype), te.prototype.constructor = te, te.prototype.__class__ = te, te.__cache__ = {}, i.MetadataQuerier = te, te.prototype.HasEntry = te.prototype.HasEntry = function(u, h) {
          var M = this.ptr;
          return $.prepare(), u && typeof u == "object" && (u = u.ptr), h = h && typeof h == "object" ? h.ptr : I(h), !!an(M, u, h);
        }, te.prototype.GetIntEntry = te.prototype.GetIntEntry = function(u, h) {
          var M = this.ptr;
          return $.prepare(), u && typeof u == "object" && (u = u.ptr), h = h && typeof h == "object" ? h.ptr : I(h), sn(M, u, h);
        }, te.prototype.GetIntEntryArray = te.prototype.GetIntEntryArray = function(u, h, M) {
          var z = this.ptr;
          $.prepare(), u && typeof u == "object" && (u = u.ptr), h = h && typeof h == "object" ? h.ptr : I(h), M && typeof M == "object" && (M = M.ptr), on(z, u, h, M);
        }, te.prototype.GetDoubleEntry = te.prototype.GetDoubleEntry = function(u, h) {
          var M = this.ptr;
          return $.prepare(), u && typeof u == "object" && (u = u.ptr), h = h && typeof h == "object" ? h.ptr : I(h), cn(M, u, h);
        }, te.prototype.GetStringEntry = te.prototype.GetStringEntry = function(u, h) {
          var M = this.ptr;
          return $.prepare(), u && typeof u == "object" && (u = u.ptr), h = h && typeof h == "object" ? h.ptr : I(h), d(un(M, u, h));
        }, te.prototype.NumEntries = te.prototype.NumEntries = function(u) {
          var h = this.ptr;
          return u && typeof u == "object" && (u = u.ptr), fn(h, u);
        }, te.prototype.GetEntryName = te.prototype.GetEntryName = function(u, h) {
          var M = this.ptr;
          return u && typeof u == "object" && (u = u.ptr), h && typeof h == "object" && (h = h.ptr), d(bn(M, u, h));
        }, te.prototype.__destroy__ = te.prototype.__destroy__ = function() {
          dn(this.ptr);
        }, W.prototype = Object.create(A.prototype), W.prototype.constructor = W, W.prototype.__class__ = W, W.__cache__ = {}, i.Decoder = W, W.prototype.DecodeArrayToPointCloud = W.prototype.DecodeArrayToPointCloud = function(u, h, M) {
          var z = this.ptr;
          return $.prepare(), typeof u == "object" && (u = k(u)), h && typeof h == "object" && (h = h.ptr), M && typeof M == "object" && (M = M.ptr), S(ln(z, u, h, M), P);
        }, W.prototype.DecodeArrayToMesh = W.prototype.DecodeArrayToMesh = function(u, h, M) {
          var z = this.ptr;
          return $.prepare(), typeof u == "object" && (u = k(u)), h && typeof h == "object" && (h = h.ptr), M && typeof M == "object" && (M = M.ptr), S(hn(z, u, h, M), P);
        }, W.prototype.GetAttributeId = W.prototype.GetAttributeId = function(u, h) {
          var M = this.ptr;
          return u && typeof u == "object" && (u = u.ptr), h && typeof h == "object" && (h = h.ptr), _n(M, u, h);
        }, W.prototype.GetAttributeIdByName = W.prototype.GetAttributeIdByName = function(u, h) {
          var M = this.ptr;
          return $.prepare(), u && typeof u == "object" && (u = u.ptr), h = h && typeof h == "object" ? h.ptr : I(h), mn(M, u, h);
        }, W.prototype.GetAttributeIdByMetadataEntry = W.prototype.GetAttributeIdByMetadataEntry = function(u, h, M) {
          var z = this.ptr;
          return $.prepare(), u && typeof u == "object" && (u = u.ptr), h = h && typeof h == "object" ? h.ptr : I(h), M = M && typeof M == "object" ? M.ptr : I(M), gn(z, u, h, M);
        }, W.prototype.GetAttribute = W.prototype.GetAttribute = function(u, h) {
          var M = this.ptr;
          return u && typeof u == "object" && (u = u.ptr), h && typeof h == "object" && (h = h.ptr), S(yt(M, u, h), C);
        }, W.prototype.GetAttributeByUniqueId = W.prototype.GetAttributeByUniqueId = function(u, h) {
          var M = this.ptr;
          return u && typeof u == "object" && (u = u.ptr), h && typeof h == "object" && (h = h.ptr), S(J(M, u, h), C);
        }, W.prototype.GetMetadata = W.prototype.GetMetadata = function(u) {
          var h = this.ptr;
          return u && typeof u == "object" && (u = u.ptr), S(b(h, u), H);
        }, W.prototype.GetAttributeMetadata = W.prototype.GetAttributeMetadata = function(u, h) {
          var M = this.ptr;
          return u && typeof u == "object" && (u = u.ptr), h && typeof h == "object" && (h = h.ptr), S(p(M, u, h), H);
        }, W.prototype.GetFaceFromMesh = W.prototype.GetFaceFromMesh = function(u, h, M) {
          var z = this.ptr;
          return u && typeof u == "object" && (u = u.ptr), h && typeof h == "object" && (h = h.ptr), M && typeof M == "object" && (M = M.ptr), !!x(z, u, h, M);
        }, W.prototype.GetTriangleStripsFromMesh = W.prototype.GetTriangleStripsFromMesh = function(u, h) {
          var M = this.ptr;
          return u && typeof u == "object" && (u = u.ptr), h && typeof h == "object" && (h = h.ptr), N(M, u, h);
        }, W.prototype.GetTrianglesUInt16Array = W.prototype.GetTrianglesUInt16Array = function(u, h, M) {
          var z = this.ptr;
          return u && typeof u == "object" && (u = u.ptr), h && typeof h == "object" && (h = h.ptr), M && typeof M == "object" && (M = M.ptr), !!U(z, u, h, M);
        }, W.prototype.GetTrianglesUInt32Array = W.prototype.GetTrianglesUInt32Array = function(u, h, M) {
          var z = this.ptr;
          return u && typeof u == "object" && (u = u.ptr), h && typeof h == "object" && (h = h.ptr), M && typeof M == "object" && (M = M.ptr), !!X(z, u, h, M);
        }, W.prototype.GetAttributeFloat = W.prototype.GetAttributeFloat = function(u, h, M) {
          var z = this.ptr;
          return u && typeof u == "object" && (u = u.ptr), h && typeof h == "object" && (h = h.ptr), M && typeof M == "object" && (M = M.ptr), !!yn(z, u, h, M);
        }, W.prototype.GetAttributeFloatForAllPoints = W.prototype.GetAttributeFloatForAllPoints = function(u, h, M) {
          var z = this.ptr;
          return u && typeof u == "object" && (u = u.ptr), h && typeof h == "object" && (h = h.ptr), M && typeof M == "object" && (M = M.ptr), !!xa(z, u, h, M);
        }, W.prototype.GetAttributeIntForAllPoints = W.prototype.GetAttributeIntForAllPoints = function(u, h, M) {
          var z = this.ptr;
          return u && typeof u == "object" && (u = u.ptr), h && typeof h == "object" && (h = h.ptr), M && typeof M == "object" && (M = M.ptr), !!Aa(z, u, h, M);
        }, W.prototype.GetAttributeInt8ForAllPoints = W.prototype.GetAttributeInt8ForAllPoints = function(u, h, M) {
          var z = this.ptr;
          return u && typeof u == "object" && (u = u.ptr), h && typeof h == "object" && (h = h.ptr), M && typeof M == "object" && (M = M.ptr), !!Ea(z, u, h, M);
        }, W.prototype.GetAttributeUInt8ForAllPoints = W.prototype.GetAttributeUInt8ForAllPoints = function(u, h, M) {
          var z = this.ptr;
          return u && typeof u == "object" && (u = u.ptr), h && typeof h == "object" && (h = h.ptr), M && typeof M == "object" && (M = M.ptr), !!Ia(z, u, h, M);
        }, W.prototype.GetAttributeInt16ForAllPoints = W.prototype.GetAttributeInt16ForAllPoints = function(u, h, M) {
          var z = this.ptr;
          return u && typeof u == "object" && (u = u.ptr), h && typeof h == "object" && (h = h.ptr), M && typeof M == "object" && (M = M.ptr), !!ja(z, u, h, M);
        }, W.prototype.GetAttributeUInt16ForAllPoints = W.prototype.GetAttributeUInt16ForAllPoints = function(u, h, M) {
          var z = this.ptr;
          return u && typeof u == "object" && (u = u.ptr), h && typeof h == "object" && (h = h.ptr), M && typeof M == "object" && (M = M.ptr), !!Ra(z, u, h, M);
        }, W.prototype.GetAttributeInt32ForAllPoints = W.prototype.GetAttributeInt32ForAllPoints = function(u, h, M) {
          var z = this.ptr;
          return u && typeof u == "object" && (u = u.ptr), h && typeof h == "object" && (h = h.ptr), M && typeof M == "object" && (M = M.ptr), !!wa(z, u, h, M);
        }, W.prototype.GetAttributeUInt32ForAllPoints = W.prototype.GetAttributeUInt32ForAllPoints = function(u, h, M) {
          var z = this.ptr;
          return u && typeof u == "object" && (u = u.ptr), h && typeof h == "object" && (h = h.ptr), M && typeof M == "object" && (M = M.ptr), !!Sa(z, u, h, M);
        }, W.prototype.GetAttributeDataArrayForAllPoints = W.prototype.GetAttributeDataArrayForAllPoints = function(u, h, M, z, Y) {
          var ee = this.ptr;
          return u && typeof u == "object" && (u = u.ptr), h && typeof h == "object" && (h = h.ptr), M && typeof M == "object" && (M = M.ptr), z && typeof z == "object" && (z = z.ptr), Y && typeof Y == "object" && (Y = Y.ptr), !!Ma(ee, u, h, M, z, Y);
        }, W.prototype.SkipAttributeTransform = W.prototype.SkipAttributeTransform = function(u) {
          var h = this.ptr;
          u && typeof u == "object" && (u = u.ptr), Na(h, u);
        }, W.prototype.GetEncodedGeometryType_Deprecated = W.prototype.GetEncodedGeometryType_Deprecated = function(u) {
          var h = this.ptr;
          return u && typeof u == "object" && (u = u.ptr), va(h, u);
        }, W.prototype.DecodeBufferToPointCloud = W.prototype.DecodeBufferToPointCloud = function(u, h) {
          var M = this.ptr;
          return u && typeof u == "object" && (u = u.ptr), h && typeof h == "object" && (h = h.ptr), S(ka(M, u, h), P);
        }, W.prototype.DecodeBufferToMesh = W.prototype.DecodeBufferToMesh = function(u, h) {
          var M = this.ptr;
          return u && typeof u == "object" && (u = u.ptr), h && typeof h == "object" && (h = h.ptr), S(Ca(M, u, h), P);
        }, W.prototype.__destroy__ = W.prototype.__destroy__ = function() {
          Oa(this.ptr);
        }, (function() {
          function u() {
            i.ATTRIBUTE_INVALID_TRANSFORM = Da(), i.ATTRIBUTE_NO_TRANSFORM = Fa(), i.ATTRIBUTE_QUANTIZATION_TRANSFORM = Ua(), i.ATTRIBUTE_OCTAHEDRON_TRANSFORM = Ba(), i.INVALID = Ga(), i.POSITION = Pa(), i.NORMAL = La(), i.COLOR = za(), i.TEX_COORD = Ha(), i.GENERIC = Va(), i.INVALID_GEOMETRY_TYPE = Wa(), i.POINT_CLOUD = Ka(), i.TRIANGULAR_MESH = qa(), i.DT_INVALID = Xa(), i.DT_INT8 = Ja(), i.DT_UINT8 = Ya(), i.DT_INT16 = Qa(), i.DT_UINT16 = Za(), i.DT_INT32 = $a(), i.DT_UINT32 = es(), i.DT_INT64 = ts(), i.DT_UINT64 = rs(), i.DT_FLOAT32 = ns(), i.DT_FLOAT64 = as(), i.DT_BOOL = ss(), i.DT_TYPES_COUNT = is(), i.OK = os(), i.DRACO_ERROR = cs(), i.IO_ERROR = us(), i.INVALID_PARAMETER = fs(), i.UNSUPPORTED_VERSION = bs(), i.UNKNOWN_VERSION = ds();
          }
          Ut ? u() : St.unshift(u);
        })(), typeof i.onModuleParsed == "function" && i.onModuleParsed(), i.Decoder.prototype.GetEncodedGeometryType = function(u) {
          if (u.__class__ && u.__class__ === i.DecoderBuffer) return i.Decoder.prototype.GetEncodedGeometryType_Deprecated(u);
          if (8 > u.byteLength) return i.INVALID_GEOMETRY_TYPE;
          switch (u[7]) {
            case 0:
              return i.POINT_CLOUD;
            case 1:
              return i.TRIANGULAR_MESH;
            default:
              return i.INVALID_GEOMETRY_TYPE;
          }
        }, n.ready;
      };
    })();
    o.exports = a;
  })(Ln)), Ln.exports;
}
var ra, Gs;
function zc() {
  if (Gs) return ra;
  Gs = 1;
  var o = Gc(), e = Lc();
  return ra = {
    createEncoderModule: o,
    createDecoderModule: e
  }, ra;
}
var Hc = zc();
const Vc = /* @__PURE__ */ Vi(Hc);
var Wc = /* @__PURE__ */ ((o) => (o.Clearcoat = "KHR_materials_clearcoat", o.Transmission = "KHR_materials_transmission", o.IOR = "KHR_materials_ior", o.Sheen = "KHR_materials_sheen", o.Volume = "KHR_materials_volume", o))(Wc || {}), Se = /* @__PURE__ */ ((o) => (o.Scene = "scene", o.Node = "node", o.Armature = "armature", o.Bone = "bone", o.Mesh = "mesh", o.Material = "material", o.Light = "light", o.Camera = "camera", o))(Se || {});
const Kc = {
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
function qc(o) {
  const e = o.toLowerCase();
  for (const [t, a] of Object.entries(Kc))
    if (e.includes(t))
      return a;
  return 4;
}
function Xc(o) {
  const e = o.width ?? 1024, t = o.height ?? 1024, a = e * t, r = 1.333, n = qc(o.mimeType);
  return Math.ceil(a * n * r);
}
function Zc(o) {
  return o < 1024 ? `${o.toFixed(2)} B` : o < 1024 * 1024 ? `${(o / 1024).toFixed(2)} KB` : `${(o / (1024 * 1024)).toFixed(2)} MB`;
}
const Ps = {
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
}, Jc = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
};
function Yc(o) {
  let e = 0;
  for (const t of o.listPrimitives()) {
    const a = t.getIndices();
    if (a) {
      const n = Ps[a.getComponentType()] ?? 4;
      e += a.getCount() * n;
    }
    const r = t.listSemantics();
    for (const n of r) {
      const s = t.getAttribute(n);
      if (s) {
        const c = Ps[s.getComponentType()] ?? 4, d = Jc[s.getType()] ?? 1;
        e += s.getCount() * d * c;
      }
    }
  }
  return e;
}
const Ls = new Ki(), xn = new qi();
function zi(o) {
  const e = {
    meshes: 0,
    materials: 0,
    textures: 0,
    triangles: 0,
    textureVRAM: 0,
    geometryVRAM: 0
  };
  if (o.type === Se.Mesh)
    e.meshes = 1, e.triangles = o.metadata?.triangleCount || 0, e.geometryVRAM = o.metadata?.geometryVRAM || 0;
  else if (o.type === Se.Material) {
    e.materials = 1;
    const t = o.metadata?.textures;
    t && (e.textures = t.length, e.textureVRAM = t.reduce((a, r) => a + r.vram, 0));
  }
  for (const t of o.children) {
    const a = zi(t);
    e.meshes += a.meshes, e.materials += a.materials, e.textures += a.textures, e.triangles += a.triangles, e.textureVRAM += a.textureVRAM, e.geometryVRAM += a.geometryVRAM;
  }
  return o.metadata = { ...o.metadata, stats: e }, e;
}
function zs(o) {
  const e = o.getRoot(), t = e.listScenes();
  if (t.length === 0)
    return null;
  const a = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set();
  for (const g of e.listSkins()) {
    for (const E of g.listJoints())
      a.add(E);
    const w = g.getSkeleton();
    w && r.add(w);
  }
  let n = 0;
  const s = () => `node-${n++}`, c = (g) => {
    const w = [];
    let E = Se.Node;
    r.has(g) ? E = Se.Armature : a.has(g) && (E = Se.Bone);
    const T = g.getName();
    let j;
    if (T)
      j = T;
    else
      switch (E) {
        case Se.Armature:
          j = "Armature";
          break;
        case Se.Bone:
          console.log(g), j = "Bone";
          break;
        default:
          j = "Node";
      }
    for (const I of g.listChildren())
      w.push(c(I));
    const A = g.getMesh();
    if (A) {
      let I = 0;
      for (const m of A.listPrimitives()) {
        const R = m.getIndices();
        R && (I += R.getCount() / 3);
      }
      const k = Yc(A), v = {
        id: s(),
        name: A.getName() || "Mesh",
        type: Se.Mesh,
        children: [],
        gltfRef: A,
        metadata: { triangleCount: I, geometryVRAM: k }
      }, O = /* @__PURE__ */ new Set();
      for (const m of A.listPrimitives()) {
        const R = m.getMaterial();
        if (R && !O.has(R)) {
          O.add(R);
          const C = [], D = [
            { texture: R.getBaseColorTexture(), slot: "baseColor" },
            { texture: R.getNormalTexture(), slot: "normal" },
            { texture: R.getMetallicRoughnessTexture(), slot: "metallicRoughness" },
            { texture: R.getOcclusionTexture(), slot: "occlusion" },
            { texture: R.getEmissiveTexture(), slot: "emissive" }
          ];
          for (const { texture: B, slot: L } of D)
            if (B) {
              const G = {
                slot: L,
                name: B.getName() || "Embedded",
                mimeType: B.getMimeType(),
                width: B.getSize()?.[0],
                height: B.getSize()?.[1],
                vram: 0
              };
              G.vram = Xc(G), C.push(G);
            }
          v.children.push({
            id: s(),
            name: R.getName() || "Material",
            type: Se.Material,
            children: [],
            gltfRef: R,
            metadata: { textures: C }
          });
        }
      }
      w.push(v);
    }
    const l = g.getExtension("KHR_lights_punctual");
    l && w.push({
      id: s(),
      name: l.getName() || "Light",
      type: Se.Light,
      children: [],
      gltfRef: l
    });
    const S = g.getCamera();
    return S && w.push({
      id: s(),
      name: S.getName() || "Camera",
      type: Se.Camera,
      children: [],
      gltfRef: S
    }), {
      id: s(),
      name: j,
      type: E,
      children: w,
      gltfRef: g
    };
  }, d = e.getDefaultScene() ?? t[0], y = [];
  for (const g of d.listChildren())
    y.push(c(g));
  const _ = {
    id: s(),
    name: d.getName() || "Scene",
    type: Se.Scene,
    children: y,
    gltfRef: d
  };
  return zi(_), _;
}
class $c {
  state;
  io = null;
  onStateChange = null;
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
  async initIO() {
    if (this.io) return this.io;
    const e = new ko().registerExtensions(Dc), a = await (await fetch(Wi.draco.wasmUrl)).arrayBuffer(), r = await Vc.createDecoderModule({ wasmBinary: a });
    return await Promise.all([Fs.ready, Ds.ready]), e.registerDependencies({
      "meshopt.decoder": Fs,
      "meshopt.encoder": Ds,
      "draco3d.decoder": r
    }), this.io = e, e;
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
   * Load a GLB blob
   */
  async loadBlob(e) {
    this.setState({ isLoading: !0, error: null });
    try {
      const t = await this.initIO(), a = await e.arrayBuffer(), r = new Uint8Array(a), n = await t.readBinary(r), s = zs(n);
      this.setState({
        document: n,
        originalBlob: e,
        sceneGraph: s,
        selectedNode: null,
        isDirty: !1,
        isLoading: !1,
        error: null
      });
    } catch (t) {
      const a = t instanceof Error ? t.message : "Failed to parse GLB";
      this.setState({
        isLoading: !1,
        error: a
      });
    }
  }
  /**
   * Clear all data
   */
  clear() {
    this.state = {
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
   * Select a node by ID
   */
  selectNode(e) {
    if (!e) {
      this.setState({ selectedNode: null });
      return;
    }
    const t = (r, n) => {
      if (r.id === n) return r;
      for (const s of r.children) {
        const c = t(s, n);
        if (c) return c;
      }
      return null;
    }, a = this.state.sceneGraph ? t(this.state.sceneGraph, e) : null;
    this.setState({ selectedNode: a });
  }
  /**
   * Update a material property
   */
  updateMaterialProperty(e, t, a) {
    switch (t) {
      case "baseColorFactor":
        e.setBaseColorFactor(a);
        break;
      case "metallicFactor":
        e.setMetallicFactor(a);
        break;
      case "roughnessFactor":
        e.setRoughnessFactor(a);
        break;
      case "emissiveFactor":
        e.setEmissiveFactor(a);
        break;
      case "normalScale":
        e.setNormalScale(a);
        break;
      case "occlusionStrength":
        e.setOcclusionStrength(a);
        break;
      case "alphaMode":
        e.setAlphaMode(a);
        break;
      case "alphaCutoff":
        e.setAlphaCutoff(a);
        break;
      case "doubleSided":
        e.setDoubleSided(a);
        break;
      // Extension properties
      case "clearcoatFactor": {
        e.getExtension("KHR_materials_clearcoat")?.setClearcoatFactor(a);
        break;
      }
      case "clearcoatRoughnessFactor": {
        e.getExtension("KHR_materials_clearcoat")?.setClearcoatRoughnessFactor(a);
        break;
      }
      case "transmissionFactor": {
        e.getExtension("KHR_materials_transmission")?.setTransmissionFactor(a);
        break;
      }
      case "ior": {
        e.getExtension("KHR_materials_ior")?.setIOR(a);
        break;
      }
      case "sheenColorFactor": {
        e.getExtension("KHR_materials_sheen")?.setSheenColorFactor(a);
        break;
      }
      case "sheenRoughnessFactor": {
        e.getExtension("KHR_materials_sheen")?.setSheenRoughnessFactor(a);
        break;
      }
      case "thicknessFactor": {
        e.getExtension("KHR_materials_volume")?.setThicknessFactor(a);
        break;
      }
    }
    this.setState({ isDirty: !0 });
  }
  /**
   * Update a node transform
   */
  updateNodeTransform(e, t, a) {
    switch (t) {
      case "translation":
        e.setTranslation(a);
        break;
      case "rotation": {
        Ls.set(
          Zn.degToRad(a[0]),
          Zn.degToRad(a[1]),
          Zn.degToRad(a[2]),
          "XYZ"
        ), xn.setFromEuler(Ls), e.setRotation([xn.x, xn.y, xn.z, xn.w]);
        break;
      }
      case "scale":
        e.setScale(a);
        break;
    }
    this.setState({ isDirty: !0 });
  }
  /**
   * Update a light property
   */
  updateLightProperty(e, t, a) {
    switch (t) {
      case "intensity":
        e.setIntensity(a);
        break;
      case "color":
        e.setColor(a);
        break;
      case "range":
        e.setRange(a);
        break;
      case "innerConeAngle":
        e.setInnerConeAngle(a);
        break;
      case "outerConeAngle":
        e.setOuterConeAngle(a);
        break;
    }
    this.setState({ isDirty: !0 });
  }
  /**
   * Add a material extension
   */
  addMaterialExtension(e, t) {
    const { document: a } = this.state;
    if (a) {
      switch (t) {
        case "KHR_materials_clearcoat": {
          const n = a.createExtension(_a).createClearcoat();
          e.setExtension("KHR_materials_clearcoat", n);
          break;
        }
        case "KHR_materials_transmission": {
          const n = a.createExtension(ya).createTransmission();
          e.setExtension("KHR_materials_transmission", n);
          break;
        }
        case "KHR_materials_ior": {
          const n = a.createExtension(ma).createIOR();
          e.setExtension("KHR_materials_ior", n);
          break;
        }
        case "KHR_materials_sheen": {
          const n = a.createExtension(ga).createSheen();
          e.setExtension("KHR_materials_sheen", n);
          break;
        }
        case "KHR_materials_volume": {
          const n = a.createExtension(Ta).createVolume();
          e.setExtension("KHR_materials_volume", n);
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
    this.setState({ isLoading: !0 });
    try {
      this.io || await this.initIO();
      const e = await this.io.writeBinary(this.state.document), t = new Blob([e], { type: "model/gltf-binary" });
      return this.setState({
        isDirty: !1,
        isLoading: !1
      }), t;
    } catch (e) {
      const t = e instanceof Error ? e.message : "Failed to export GLB";
      throw this.setState({
        isLoading: !1,
        error: t
      }), e;
    }
  }
  /**
   * Reset to original blob
   */
  async reset() {
    if (this.state.originalBlob) {
      this.setState({ isLoading: !0, error: null });
      try {
        this.io || await this.initIO();
        const e = await this.state.originalBlob.arrayBuffer(), t = new Uint8Array(e), a = await this.io.readBinary(t), r = zs(a);
        this.setState({
          document: a,
          sceneGraph: r,
          selectedNode: null,
          isDirty: !1,
          isLoading: !1,
          error: null
        });
      } catch (e) {
        const t = e instanceof Error ? e.message : "Failed to reset";
        throw this.setState({
          isLoading: !1,
          error: t
        }), e;
      }
    }
  }
}
export {
  $c as InspectorAPI,
  Wc as MaterialExtension,
  Se as SceneGraphNodeType,
  Yc as estimateGeometryVRAM,
  Xc as estimateTextureVRAM,
  Zc as formatBytes
};
