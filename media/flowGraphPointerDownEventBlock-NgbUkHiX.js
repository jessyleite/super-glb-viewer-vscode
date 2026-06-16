import { at as a, R as r, au as o, av as h, aw as p } from "./BabylonAdapter-DZR9EaPO.js";
class c extends a {
  /**
   * Creates a new FlowGraphPointerDownEventBlock.
   * @param config optional configuration
   */
  constructor(e) {
    super(e), this.type = "PointerDown", this.targetMesh = this.registerDataInput("targetMesh", r, e?.targetMesh), this.pointerId = this.registerDataOutput("pointerId", o), this.pickedMesh = this.registerDataOutput("pickedMesh", r), this.pickedPoint = this.registerDataOutput("pickedPoint", r);
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
let n = !1;
function u() {
  n || (n = !0, p("FlowGraphPointerDownEventBlock", c));
}
u();
export {
  c as FlowGraphPointerDownEventBlock,
  u as RegisterFlowGraphPointerDownEventBlock
};
