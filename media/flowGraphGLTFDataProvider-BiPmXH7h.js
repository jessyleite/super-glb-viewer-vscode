import { F as i, R as t } from "./BabylonAdapter-CeSNZ_mQ.js";
class m extends i {
  constructor(s) {
    super();
    const a = s.glTF, r = a.animations?.map((o) => o._babylonAnimationGroup) || [];
    this.animationGroups = this.registerDataOutput("animationGroups", t, r);
    const n = a.nodes?.map((o) => o._babylonTransformNode) || [];
    this.nodes = this.registerDataOutput("nodes", t, n);
  }
  getClassName() {
    return "FlowGraphGLTFDataProvider";
  }
}
export {
  m as FlowGraphGLTFDataProvider
};
