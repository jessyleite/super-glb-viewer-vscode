import { k as n, R as r, l as a, _ as o, m as h } from "./BabylonAdapter-CeSNZ_mQ.js";
class p extends n {
  /**
   * Creates a new FlowGraphPointerMoveEventBlock.
   * @param config optional configuration
   */
  constructor(e) {
    super(e), this.type = "PointerMove", this.targetMesh = this.registerDataInput("targetMesh", r, e?.targetMesh), this.pointerId = this.registerDataOutput("pointerId", a), this.meshUnderPointer = this.registerDataOutput("meshUnderPointer", r), this.pickedPoint = this.registerDataOutput("pickedPoint", r);
  }
  /** @internal */
  _executeEvent(e, s) {
    const i = this.targetMesh.getValue(e), t = s.pickInfo?.pickedMesh;
    return i && !(t === i || t && o(t, i)) ? !0 : (this.pointerId.setValue(s.event.pointerId, e), this.meshUnderPointer.setValue(t ?? null, e), this.pickedPoint.setValue(s.pickInfo?.pickedPoint ?? null, e), this._execute(e), !this.config?.stopPropagation);
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
    return "FlowGraphPointerMoveEventBlock";
  }
}
h("FlowGraphPointerMoveEventBlock", p);
export {
  p as FlowGraphPointerMoveEventBlock
};
