import { k as a, R as r, l as p, _ as n, m as h } from "./BabylonAdapter-CeSNZ_mQ.js";
class o extends a {
  /**
   * Creates a new FlowGraphPointerUpEventBlock.
   * @param config optional configuration
   */
  constructor(e) {
    super(e), this.type = "PointerUp", this.targetMesh = this.registerDataInput("targetMesh", r, e?.targetMesh), this.pointerId = this.registerDataOutput("pointerId", p), this.pickedMesh = this.registerDataOutput("pickedMesh", r), this.pickedPoint = this.registerDataOutput("pickedPoint", r);
  }
  /** @internal */
  _executeEvent(e, s) {
    const i = this.targetMesh.getValue(e), t = s.pickInfo?.pickedMesh;
    return i && !(t === i || t && n(t, i)) ? !0 : (this.pointerId.setValue(s.event.pointerId, e), this.pickedMesh.setValue(t ?? null, e), this.pickedPoint.setValue(s.pickInfo?.pickedPoint ?? null, e), this._execute(e), !this.config?.stopPropagation);
  }
  /** @internal */
  _preparePendingTasks(e) {
  }
  /** @internal */
  _cancelPendingTasks(e) {
  }
  /**
   * @returns the class name of the block.
   */
  getClassName() {
    return "FlowGraphPointerUpEventBlock";
  }
}
h("FlowGraphPointerUpEventBlock", o);
export {
  o as FlowGraphPointerUpEventBlock
};
