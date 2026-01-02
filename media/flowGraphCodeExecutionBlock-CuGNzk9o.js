import { F as i, R as e } from "./BabylonAdapter-Coo7aqI5.js";
class o extends i {
  /**
   * Construct a FlowGraphCodeExecutionBlock.
   * @param config construction parameters
   */
  constructor(t) {
    super(t), this.config = t, this.executionFunction = this.registerDataInput("function", e), this.value = this.registerDataInput("value", e), this.result = this.registerDataOutput("result", e);
  }
  /**
   * @internal
   */
  _updateOutputs(t) {
    const s = this.executionFunction.getValue(t), u = this.value.getValue(t);
    s && this.result.setValue(s(u, t), t);
  }
  getClassName() {
    return "FlowGraphCodeExecutionBlock";
  }
}
export {
  o as FlowGraphCodeExecutionBlock
};
