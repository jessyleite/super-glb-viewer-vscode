import { F as e, R as s } from "./BabylonAdapter-DZR9EaPO.js";
class m extends e {
  constructor(o) {
    super(o);
    const t = o.glTF, r = t?.animations?.map((a) => a._babylonAnimationGroup) || [];
    this.animationGroups = this.registerDataOutput("animationGroups", s, r);
    const n = t?.nodes?.map((a) => a._babylonTransformNode) || [];
    this.nodes = this.registerDataOutput("nodes", s, n);
  }
  getClassName() {
    return "FlowGraphGLTFDataProvider";
  }
}
export {
  m as FlowGraphGLTFDataProvider
};
