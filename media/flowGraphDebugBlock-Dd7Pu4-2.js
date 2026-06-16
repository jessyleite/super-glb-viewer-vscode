import { F as s, R as o, aw as e } from "./BabylonAdapter-DZR9EaPO.js";
const g = 100;
class r extends s {
  constructor(t) {
    super(t), this.log = [], this._isDebug = !0, this.input = this.registerDataInput("input", o), this.output = this.registerDataOutput("output", o);
  }
  /**
   * @internal
   */
  _updateOutputs(t) {
    const i = this.input.getValue(t);
    this.output.setValue(i, t), this._logValue(i);
  }
  /**
   * Format and store a value in the log.
   * @param value
   */
  _logValue(t) {
    if (t == null)
      this.log.push(["null", "null"]);
    else {
      const i = r._FormatValue(t);
      this.log.push([i, String(t)]);
    }
    this.log.length > g && this.log.shift();
  }
  /**
   * Type-aware value formatting.
   * @param value the value to format
   * @returns a human-readable string
   */
  static _FormatValue(t) {
    if (typeof t == "number")
      return Number.isInteger(t) ? t.toString() : t.toFixed(4);
    if (typeof t == "boolean" || typeof t == "string")
      return String(t);
    if (t && typeof t == "object") {
      if ("w" in t && "x" in t && "y" in t && "z" in t)
        return `(${t.x.toFixed(3)}, ${t.y.toFixed(3)}, ${t.z.toFixed(3)}, ${t.w.toFixed(3)})`;
      if ("z" in t && "x" in t && "y" in t)
        return `(${t.x.toFixed(3)}, ${t.y.toFixed(3)}, ${t.z.toFixed(3)})`;
      if ("x" in t && "y" in t)
        return `(${t.x.toFixed(3)}, ${t.y.toFixed(3)})`;
      if ("r" in t && "g" in t && "b" in t) {
        const i = "a" in t ? `, ${t.a.toFixed(3)}` : "";
        return `(${t.r.toFixed(3)}, ${t.g.toFixed(3)}, ${t.b.toFixed(3)}${i})`;
      }
      if (typeof t.toString == "function" && t.toString !== Object.prototype.toString)
        return t.toString();
    }
    try {
      const i = JSON.stringify(t);
      return i.length > 64 ? i.substring(0, 61) + "..." : i;
    } catch {
      return String(t);
    }
  }
  getClassName() {
    return "FlowGraphDebugBlock";
  }
}
let n = !1;
function p() {
  n || (n = !0, e("FlowGraphDebugBlock", r));
}
p();
export {
  r as FlowGraphDebugBlock,
  p as RegisterFlowGraphDebugBlock
};
