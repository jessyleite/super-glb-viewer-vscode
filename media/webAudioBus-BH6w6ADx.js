import { A as u } from "./abstractAudioBus-DW8T9NJP.js";
import { ax as a, ay as o, az as n, aA as r } from "./BabylonAdapter-DZR9EaPO.js";
class _ extends u {
  constructor(t, s, e) {
    super(t, s), this._spatialAutoUpdate = !0, this._spatialMinUpdateTime = 0, this._outBus = null, this._spatial = null, this._onOutBusDisposed = () => {
      this.outBus = this.engine.defaultMainBus;
    }, typeof e.spatialAutoUpdate == "boolean" && (this._spatialAutoUpdate = e.spatialAutoUpdate), typeof e.spatialMinUpdateTime == "number" && (this._spatialMinUpdateTime = e.spatialMinUpdateTime);
  }
  /**
   * The output bus of the audio bus. Defaults to the audio engine's default main bus.
   */
  get outBus() {
    return this._outBus;
  }
  set outBus(t) {
    if (this._outBus !== t) {
      if (this._outBus && (this._outBus.onDisposeObservable.removeCallback(this._onOutBusDisposed), !this._disconnect(this._outBus)))
        throw new Error("Disconnect failed");
      if (this._outBus = t, this._outBus && (this._outBus.onDisposeObservable.add(this._onOutBusDisposed), !this._connect(this._outBus)))
        throw new Error("Connect failed");
    }
  }
  /**
   * The spatial audio features.
   */
  get spatial() {
    return this._spatial ? this._spatial : this._initSpatialProperty();
  }
  /**
   * Releases associated resources.
   */
  dispose() {
    super.dispose(), this._spatial?.dispose(), this._spatial = null, this._outBus && this._outBus.onDisposeObservable.removeCallback(this._onOutBusDisposed), this._outBus = null;
  }
  _initSpatialProperty() {
    return this._spatial = this._createSpatialProperty(this._spatialAutoUpdate, this._spatialMinUpdateTime);
  }
}
class i extends _ {
  /** @internal */
  constructor(t, s, e) {
    super(t, s, e), this._stereo = null, this._subGraph = new i._SubGraph(this);
  }
  /** @internal */
  async _initAsync(t) {
    t.outBus ? this.outBus = t.outBus : (await this.engine.isReadyPromise, this.outBus = this.engine.defaultMainBus), await this._subGraph.initAsync(t), a(t) && this._initSpatialProperty(), this.engine._addNode(this);
  }
  /** @internal */
  dispose() {
    super.dispose(), this._stereo = null, this.engine._removeNode(this);
  }
  /** @internal */
  get _inNode() {
    return this._subGraph._inNode;
  }
  /** @internal */
  get _outNode() {
    return this._subGraph._outNode;
  }
  /** @internal */
  get stereo() {
    return this._stereo ?? (this._stereo = new o(this._subGraph));
  }
  /** @internal */
  getClassName() {
    return "_WebAudioBus";
  }
  _createSpatialProperty(t, s) {
    return new n(this._subGraph, t, s);
  }
  _connect(t) {
    return super._connect(t) ? (t._inNode && this._outNode?.connect(t._inNode), !0) : !1;
  }
  _disconnect(t) {
    return super._disconnect(t) ? (t._inNode && this._outNode?.disconnect(t._inNode), !0) : !1;
  }
}
i._SubGraph = class extends r {
  get _downstreamNodes() {
    return this._owner._downstreamNodes ?? null;
  }
  get _upstreamNodes() {
    return this._owner._upstreamNodes ?? null;
  }
};
export {
  i as _WebAudioBus
};
