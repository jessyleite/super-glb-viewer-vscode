class s {
  lastFrameTime = 0;
  currentFPS = 0;
  /**
   * Update FPS calculation
   */
  update() {
    const e = performance.now();
    if (this.lastFrameTime > 0) {
      const t = e - this.lastFrameTime;
      this.currentFPS = t > 0 ? 1e3 / t : 0;
    }
    this.lastFrameTime = e;
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
export {
  s as F
};
