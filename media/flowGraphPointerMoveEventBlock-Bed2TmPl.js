import { at as a, R as r, au as o, av as h, aw as p } from "./BabylonAdapter-DZR9EaPO.js";
class u extends a {
  /**
   * Creates a new FlowGraphPointerMoveEventBlock.
   * @param config optional configuration
   */
  constructor(e) {
    super(e), this.type = "PointerMove", this.targetMesh = this.registerDataInput("targetMesh", r, e?.targetMesh), this.pointerId = this.registerDataOutput("pointerId", o), this.meshUnderPointer = this.registerDataOutput("meshUnderPointer", r), this.pickedPoint = this.registerDataOutput("pickedPoint", r);
  }
  /** @internal */
  _executeEvent(e, s) {
    const i = this.targetMesh.getValue(e), t = s.pickInfo?.pickedMesh;
    return i && !(t === i || t && h(t, i)) ? !0 : (this.pointerId.setValue(s.event.pointerId, e), this.meshUnderPointer.setValue(t ?? null, e), this.pickedPoint.setValue(s.pickInfo?.pickedPoint ?? null, e), this._execute(e), !this.config?.stopPropagation);
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
let n = !1;
function c() {
  n || (n = !0, p("FlowGraphPointerMoveEventBlock", u));
}
c();
export {
  u as FlowGraphPointerMoveEventBlock,
  c as RegisterFlowGraphPointerMoveEventBlock
};
