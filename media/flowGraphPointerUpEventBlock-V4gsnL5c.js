import { at as n, R as r, au as p, av as h, aw as o } from "./BabylonAdapter-DZR9EaPO.js";
class c extends n {
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
    return "FlowGraphPointerUpEventBlock";
  }
}
let a = !1;
function u() {
  a || (a = !0, o("FlowGraphPointerUpEventBlock", c));
}
u();
export {
  c as FlowGraphPointerUpEventBlock,
  u as RegisterFlowGraphPointerUpEventBlock
};
