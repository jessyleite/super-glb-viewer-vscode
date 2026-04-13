import { k as n, R as r, l as a, _ as h, m as p } from "./BabylonAdapter-CeSNZ_mQ.js";
class o extends n {
  /**
   * Creates a new FlowGraphPointerDownEventBlock.
   * @param config optional configuration
   */
  constructor(e) {
    super(e), this.type = "PointerDown", this.targetMesh = this.registerDataInput("targetMesh", r, e?.targetMesh), this.pointerId = this.registerDataOutput("pointerId", a), this.pickedMesh = this.registerDataOutput("pickedMesh", r), this.pickedPoint = this.registerDataOutput("pickedPoint", r);
  }
  /** @internal */
  _executeEvent(e, s) {
    const i = this.targetMesh.getValue(e), t = s.pickInfo?.pickedMesh;
    return i && !(t === i || t && h(t, i)) ? !0 : (this.pointerId.setValue(s.event.pointerId, e), this.pickedMesh.setValue(t ?? null, e), this.pickedPoint.setValue(s.pickInfo?.pickedPoint ?? null, e), this._execute(e), !this.config?.stopPropagation);
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
    return "FlowGraphPointerDownEventBlock";
  }
}
p("FlowGraphPointerDownEventBlock", o);
export {
  o as FlowGraphPointerDownEventBlock
};
