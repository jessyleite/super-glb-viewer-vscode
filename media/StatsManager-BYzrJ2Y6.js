const p = {
  logsPerSecond: 5,
  samplesLog: 100,
  samplesGraph: 10,
  precision: 2,
  horizontal: !0,
  minimal: !1,
  mode: 0,
  trackGPU: !0
};
class P {
  lastFrameTime = 0;
  currentFPS = 0;
  /**
   * Update FPS calculation
   */
  update() {
    const t = performance.now();
    if (this.lastFrameTime > 0) {
      const i = t - this.lastFrameTime;
      this.currentFPS = i > 0 ? 1e3 / i : 0;
    }
    this.lastFrameTime = t;
  }
  /**
   * Get current FPS without updating
   */
  get fps() {
    return this.currentFPS;
  }
  /**
   * Reset the tracker
   */
  reset() {
    this.lastFrameTime = 0, this.currentFPS = 0;
  }
}
class g {
  constructor(t, i, e) {
    this.name = t, this.fg = i, this.bg = e, this.gradient = null, this.PR = Math.round(window.devicePixelRatio || 1), this.WIDTH = 90 * this.PR, this.HEIGHT = 48 * this.PR, this.TEXT_X = 3 * this.PR, this.TEXT_Y = 2 * this.PR, this.GRAPH_X = 3 * this.PR, this.GRAPH_Y = 15 * this.PR, this.GRAPH_WIDTH = 84 * this.PR, this.GRAPH_HEIGHT = 30 * this.PR, this.canvas = document.createElement("canvas"), this.canvas.width = this.WIDTH, this.canvas.height = this.HEIGHT, this.canvas.style.width = "90px", this.canvas.style.height = "48px", this.canvas.style.position = "absolute", this.canvas.style.cssText = "width:90px;height:48px", this.context = this.canvas.getContext("2d"), this.initializeCanvas();
  }
  createGradient() {
    if (!this.context)
      throw new Error("No context");
    const t = this.context.createLinearGradient(
      0,
      this.GRAPH_Y,
      0,
      this.GRAPH_Y + this.GRAPH_HEIGHT
    );
    let i;
    const e = this.fg;
    switch (this.fg.toLowerCase()) {
      case "#0ff":
        i = "#006666";
        break;
      case "#0f0":
        i = "#006600";
        break;
      case "#ff0":
        i = "#666600";
        break;
      case "#e1e1e1":
        i = "#666666";
        break;
      default:
        i = this.bg;
        break;
    }
    return t.addColorStop(0, i), t.addColorStop(1, e), t;
  }
  initializeCanvas() {
    this.context && (this.context.font = "bold " + 9 * this.PR + "px Helvetica,Arial,sans-serif", this.context.textBaseline = "top", this.gradient = this.createGradient(), this.context.fillStyle = this.bg, this.context.fillRect(0, 0, this.WIDTH, this.HEIGHT), this.context.fillStyle = this.fg, this.context.fillText(this.name, this.TEXT_X, this.TEXT_Y), this.context.fillStyle = this.fg, this.context.fillRect(this.GRAPH_X, this.GRAPH_Y, this.GRAPH_WIDTH, this.GRAPH_HEIGHT), this.context.fillStyle = this.bg, this.context.globalAlpha = 0.9, this.context.fillRect(this.GRAPH_X, this.GRAPH_Y, this.GRAPH_WIDTH, this.GRAPH_HEIGHT));
  }
  update(t, i, e, h, n = 0) {
    if (!this.context || !this.gradient)
      return;
    const a = Math.min(1 / 0, t), l = Math.max(e, t);
    h = Math.max(h, i), this.context.globalAlpha = 1, this.context.fillStyle = this.bg, this.context.fillRect(0, 0, this.WIDTH, this.GRAPH_Y), this.context.fillStyle = this.fg, this.context.fillText(
      `${t.toFixed(n)} ${this.name} (${a.toFixed(n)}-${parseFloat(
        l.toFixed(n)
      )})`,
      this.TEXT_X,
      this.TEXT_Y
    ), this.context.drawImage(
      this.canvas,
      this.GRAPH_X + this.PR,
      this.GRAPH_Y,
      this.GRAPH_WIDTH - this.PR,
      this.GRAPH_HEIGHT,
      this.GRAPH_X,
      this.GRAPH_Y,
      this.GRAPH_WIDTH - this.PR,
      this.GRAPH_HEIGHT
    );
    const s = this.GRAPH_HEIGHT - (1 - i / h) * this.GRAPH_HEIGHT;
    s > 0 && (this.context.globalAlpha = 1, this.context.fillStyle = this.gradient, this.context.fillRect(
      this.GRAPH_X + this.GRAPH_WIDTH - this.PR,
      this.GRAPH_Y + this.GRAPH_HEIGHT - s,
      this.PR,
      s
    ));
  }
}
const u = class o {
  constructor({
    trackGPU: t = !1,
    logsPerSecond: i = 30,
    samplesLog: e = 60,
    samplesGraph: h = 10,
    precision: n = 2,
    minimal: a = !1,
    horizontal: l = !0,
    mode: s = 0
  } = {}) {
    this.gl = null, this.ext = null, this.activeQuery = null, this.gpuQueries = [], this.threeRendererPatched = !1, this.frames = 0, this.renderCount = 0, this.isRunningCPUProfiling = !1, this.totalCpuDuration = 0, this.totalGpuDuration = 0, this.totalGpuDurationCompute = 0, this.totalFps = 0, this.gpuPanel = null, this.gpuPanelCompute = null, this.averageFps = { logs: [], graph: [] }, this.averageCpu = { logs: [], graph: [] }, this.averageGpu = { logs: [], graph: [] }, this.averageGpuCompute = { logs: [], graph: [] }, this.handleClick = (c) => {
      c.preventDefault(), this.showPanel(++this.mode % this.dom.children.length);
    }, this.handleResize = () => {
      this.resizePanel(this.fpsPanel, 0), this.resizePanel(this.msPanel, 1), this.gpuPanel && this.resizePanel(this.gpuPanel, 2), this.gpuPanelCompute && this.resizePanel(this.gpuPanelCompute, 3);
    }, this.mode = s, this.horizontal = l, this.minimal = a, this.trackGPU = t, this.samplesLog = e, this.samplesGraph = h, this.precision = n, this.logsPerSecond = i, this.dom = document.createElement("div"), this.initializeDOM(), this.beginTime = performance.now(), this.prevTime = this.beginTime, this.prevCpuTime = this.beginTime, this.fpsPanel = this.addPanel(new o.Panel("FPS", "#0ff", "#002"), 0), this.msPanel = this.addPanel(new o.Panel("CPU", "#0f0", "#020"), 1), this.setupEventListeners();
  }
  initializeDOM() {
    this.dom.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      opacity: 0.9;
      z-index: 10000;
      ${this.minimal ? "cursor: pointer;" : ""}
    `;
  }
  setupEventListeners() {
    this.minimal ? (this.dom.addEventListener("click", this.handleClick), this.showPanel(this.mode)) : window.addEventListener("resize", this.handleResize);
  }
  async init(t) {
    if (!t) {
      console.error('Stats: The "canvas" parameter is undefined.');
      return;
    }
    this.handleThreeRenderer(t) || await this.handleWebGPURenderer(t) || this.initializeWebGL(t);
  }
  handleThreeRenderer(t) {
    return t.isWebGLRenderer && !this.threeRendererPatched ? (this.patchThreeRenderer(t), this.gl = t.getContext(), this.trackGPU && this.initializeGPUTracking(), !0) : !1;
  }
  async handleWebGPURenderer(t) {
    return t.isWebGPURenderer ? (this.trackGPU && (t.backend.trackTimestamp = !0, await t.hasFeatureAsync("timestamp-query") && this.initializeWebGPUPanels()), this.info = t.info, !0) : !1;
  }
  initializeWebGPUPanels() {
    this.gpuPanel = this.addPanel(new o.Panel("GPU", "#ff0", "#220"), 2), this.gpuPanelCompute = this.addPanel(
      new o.Panel("CPT", "#e1e1e1", "#212121"),
      3
    );
  }
  initializeWebGL(t) {
    if (t instanceof WebGL2RenderingContext)
      this.gl = t;
    else if (t instanceof HTMLCanvasElement || t instanceof OffscreenCanvas) {
      if (this.gl = t.getContext("webgl2"), !this.gl)
        return console.error("Stats: Unable to obtain WebGL2 context."), !1;
    } else
      return console.error(
        "Stats: Invalid input type. Expected WebGL2RenderingContext, HTMLCanvasElement, or OffscreenCanvas."
      ), !1;
    return !0;
  }
  initializeGPUTracking() {
    this.gl && (this.ext = this.gl.getExtension("EXT_disjoint_timer_query_webgl2"), this.ext && (this.gpuPanel = this.addPanel(new o.Panel("GPU", "#ff0", "#220"), 2)));
  }
  begin() {
    this.isRunningCPUProfiling || this.beginProfiling("cpu-started"), !(!this.gl || !this.ext) && (this.activeQuery && this.gl.endQuery(this.ext.TIME_ELAPSED_EXT), this.activeQuery = this.gl.createQuery(), this.activeQuery && this.gl.beginQuery(this.ext.TIME_ELAPSED_EXT, this.activeQuery));
  }
  end() {
    this.renderCount++, this.gl && this.ext && this.activeQuery && (this.gl.endQuery(this.ext.TIME_ELAPSED_EXT), this.gpuQueries.push({ query: this.activeQuery }), this.activeQuery = null);
  }
  update() {
    this.info ? this.processWebGPUTimestamps() : this.processGpuQueries(), this.endProfiling("cpu-started", "cpu-finished", "cpu-duration"), this.updateAverages(), this.resetCounters();
  }
  processWebGPUTimestamps() {
    this.totalGpuDuration = this.info.render.timestamp, this.totalGpuDurationCompute = this.info.compute.timestamp, this.addToAverage(this.totalGpuDurationCompute, this.averageGpuCompute);
  }
  updateAverages() {
    this.addToAverage(this.totalCpuDuration, this.averageCpu), this.addToAverage(this.totalGpuDuration, this.averageGpu);
  }
  resetCounters() {
    this.renderCount = 0, this.totalCpuDuration === 0 && this.beginProfiling("cpu-started"), this.totalCpuDuration = 0, this.totalFps = 0, this.beginTime = this.endInternal();
  }
  resizePanel(t, i) {
    t.canvas.style.position = "absolute", this.minimal ? t.canvas.style.display = "none" : (t.canvas.style.display = "block", this.horizontal ? (t.canvas.style.top = "0px", t.canvas.style.left = i * t.WIDTH / t.PR + "px") : (t.canvas.style.left = "0px", t.canvas.style.top = i * t.HEIGHT / t.PR + "px"));
  }
  addPanel(t, i) {
    return t.canvas && (this.dom.appendChild(t.canvas), this.resizePanel(t, i)), t;
  }
  showPanel(t) {
    for (let i = 0; i < this.dom.children.length; i++) {
      const e = this.dom.children[i];
      e.style.display = i === t ? "block" : "none";
    }
    this.mode = t;
  }
  processGpuQueries() {
    !this.gl || !this.ext || (this.totalGpuDuration = 0, this.gpuQueries.forEach((t, i) => {
      if (this.gl) {
        const e = this.gl.getQueryParameter(t.query, this.gl.QUERY_RESULT_AVAILABLE), h = this.gl.getParameter(this.ext.GPU_DISJOINT_EXT);
        if (e && !h) {
          const a = this.gl.getQueryParameter(t.query, this.gl.QUERY_RESULT) * 1e-6;
          this.totalGpuDuration += a, this.gl.deleteQuery(t.query), this.gpuQueries.splice(i, 1);
        }
      }
    }));
  }
  endInternal() {
    this.frames++;
    const t = (performance || Date).now(), i = t - this.prevTime;
    if (t >= this.prevCpuTime + 1e3 / this.logsPerSecond) {
      const e = Math.round(this.frames * 1e3 / i);
      this.addToAverage(e, this.averageFps), this.updatePanel(this.fpsPanel, this.averageFps, 0), this.updatePanel(this.msPanel, this.averageCpu, this.precision), this.updatePanel(this.gpuPanel, this.averageGpu, this.precision), this.gpuPanelCompute && this.updatePanel(this.gpuPanelCompute, this.averageGpuCompute), this.frames = 0, this.prevCpuTime = t, this.prevTime = t;
    }
    return t;
  }
  addToAverage(t, i) {
    i.logs.push(t), i.logs.length > this.samplesLog && i.logs.shift(), i.graph.push(t), i.graph.length > this.samplesGraph && i.graph.shift();
  }
  beginProfiling(t) {
    window.performance && (window.performance.mark(t), this.isRunningCPUProfiling = !0);
  }
  endProfiling(t, i, e) {
    if (window.performance && i && this.isRunningCPUProfiling) {
      window.performance.mark(i);
      const h = performance.measure(e, t, i);
      this.totalCpuDuration += h.duration, this.isRunningCPUProfiling = !1;
    }
  }
  updatePanel(t, i, e = 2) {
    if (i.logs.length > 0) {
      let h = 0, n = 0.01;
      for (let s = 0; s < i.logs.length; s++)
        h += i.logs[s], i.logs[s] > n && (n = i.logs[s]);
      let a = 0, l = 0.01;
      for (let s = 0; s < i.graph.length; s++)
        a += i.graph[s], i.graph[s] > l && (l = i.graph[s]);
      t && t.update(h / Math.min(i.logs.length, this.samplesLog), a / Math.min(i.graph.length, this.samplesGraph), n, l, e);
    }
  }
  get domElement() {
    return this.dom;
  }
  patchThreeRenderer(t) {
    const i = t.render, e = this;
    t.render = function(h, n) {
      e.begin(), i.call(this, h, n), e.end();
    }, this.threeRendererPatched = !0;
  }
};
u.Panel = g;
let d = u;
class f {
  stats = null;
  /**
   * Initialize stats-gl (headless mode - no DOM)
   * @param canvas - Canvas element to attach to
   * @param config - Stats-gl configuration
   */
  init(t, i) {
    const e = { ...p, ...i ?? {} };
    this.stats = new d(e), this.stats.init(t);
  }
  /**
   * Mark the beginning of a frame
   */
  begin() {
    this.stats?.begin();
  }
  /**
   * Mark the end of a frame
   */
  end() {
    this.stats?.end();
  }
  /**
   * Update stats (call after end())
   */
  update() {
    this.stats?.update();
  }
  /**
   * Get GPU time in milliseconds (null if unavailable)
   */
  getGPUTime() {
    if (!this.stats) return null;
    try {
      const t = this.stats.averageGpu;
      if (!t || !t.logs || t.logs.length === 0)
        return null;
      const i = t.logs;
      return i[i.length - 1] ?? null;
    } catch {
      return null;
    }
  }
  /**
   * Check if stats are initialized
   */
  isInitialized() {
    return this.stats !== null;
  }
  /**
   * Dispose of stats
   */
  dispose() {
    this.stats = null;
  }
}
export {
  P as F,
  f as S
};
