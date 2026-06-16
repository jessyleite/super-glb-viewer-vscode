import { A as s } from "./abstractAudioBus-DW8T9NJP.js";
import { aB as i } from "./BabylonAdapter-DZR9EaPO.js";
class r extends s {
  constructor(e, t) {
    super(e, t);
  }
}
class n extends r {
  /** @internal */
  constructor(e, t) {
    super(e, t), this._subGraph = new n._SubGraph(this);
  }
  /** @internal */
  async _initAsync(e) {
    if (await this._subGraph.initAsync(e), this.engine.mainOut && !this._connect(this.engine.mainOut))
      throw new Error("Connect failed");
    this.engine._addMainBus(this);
  }
  /** @internal */
  dispose() {
    super.dispose(), this.engine._removeMainBus(this);
  }
  /** @internal */
  get _inNode() {
    return this._subGraph._inNode;
  }
  /** @internal */
  get _outNode() {
    return this._subGraph._outNode;
  }
  _connect(e) {
    return super._connect(e) ? (e._inNode && this._outNode?.connect(e._inNode), !0) : !1;
  }
  _disconnect(e) {
    return super._disconnect(e) ? (e._inNode && this._outNode?.disconnect(e._inNode), !0) : !1;
  }
  /** @internal */
  getClassName() {
    return "_WebAudioMainBus";
  }
}
n._SubGraph = class extends i {
  get _downstreamNodes() {
    return this._owner._downstreamNodes ?? null;
  }
};
export {
  n as _WebAudioMainBus
};
