import { ei as p, ej as f, ek as m, el as y } from "./index-BoEfGKHU.js";
const c = "super-glb-viewer";
function u(h) {
  return h.data?.source === c;
}
class g {
  iframe = null;
  container = null;
  hiddenCanvas = null;
  messageHandler = null;
  // Cached state pushed from the guest
  cachedStats = { ...p };
  cachedAnimationTracks = [];
  _areAnimationsEqual = null;
  // Comparator bookkeeping (host-side mirror for `isComparatorModeActive`)
  _comparatorMode = !1;
  // One-shot waiters keyed by event type
  waiters = /* @__PURE__ */ new Map();
  // ── Lifecycle ────────────────────────────────────────────────────
  async init(e, t) {
    const a = this.getConfig();
    if (this.hiddenCanvas = e, e.style.display = "none", this.container = e.parentElement, !this.container) throw new Error("WebViewAdapter: canvas has no parentElement");
    this.iframe = document.createElement("iframe"), this.iframe.className = a.iframeClass, this.iframe.style.cssText = "width:100%;height:100%;border:none;display:block;";
    const s = typeof window < "u" && window.__PUBLIC_BASE_URI__;
    if (s) {
      const i = a.buildUrl.replace(/^\/super-glb-viewer/, ""), d = i.substring(0, i.lastIndexOf("/") + 1), r = (await fetch(s + i).then((o) => o.text())).replace("<head>", '<head><base href="' + s + d + '">');
      this.iframe.src = URL.createObjectURL(new Blob([r], { type: "text/html" }));
    } else
      this.iframe.src = a.buildUrl;
    this.container.appendChild(this.iframe), await new Promise((i, d) => {
      const l = setTimeout(
        () => d(new Error(`WebView engine did not become ready within ${a.readyTimeout}ms`)),
        a.readyTimeout
      );
      this.messageHandler = (r) => {
        if (!u(r)) return;
        const o = r.data.payload;
        if (o.type === "ready") {
          clearTimeout(l), i();
          return;
        }
        this.handleGuestEvent(o);
      }, window.addEventListener("message", this.messageHandler);
    }), this.send({ type: "init" });
  }
  dispose() {
    this.send({ type: "dispose" }), this.messageHandler && (window.removeEventListener("message", this.messageHandler), this.messageHandler = null), this.iframe && (this.iframe.remove(), this.iframe = null), this.hiddenCanvas && (this.hiddenCanvas.style.display = "", this.hiddenCanvas = null), this.container = null, this.waiters.clear();
  }
  // ── Guest event handler (shared between iframe and direct modes) ─
  handleGuestEvent(e) {
    switch (e.type) {
      case "stats":
        this.cachedStats = e.data;
        break;
      case "animationTracks":
        this.cachedAnimationTracks = e.data, this.resolveWaiter("animationTracks", e.data);
        break;
      case "animationsEqual":
        this._areAnimationsEqual = e.value;
        break;
      case "animationTimeUpdate":
        try {
          f()(e.time);
        } catch {
        }
        break;
      case "morphTargetUpdate": {
        const t = y();
        if (t) {
          const a = new Map(Object.entries(e.state));
          t(a);
        }
        break;
      }
      case "modelLoaded":
        this.resolveWaiter(e.side ? `modelLoaded:${e.side}` : "modelLoaded", void 0);
        break;
      case "environmentLoaded":
        this.resolveWaiter("environmentLoaded", void 0);
        break;
      case "error":
        console.error("[WebViewAdapter] guest error:", e.message);
        for (const [t, a] of this.waiters)
          a.reject(new Error(e.message)), this.waiters.delete(t);
        break;
    }
  }
  // ── PostMessage helpers ──────────────────────────────────────────
  send(e, t) {
    this.iframe?.contentWindow?.postMessage(
      { source: c, payload: e },
      "*",
      t ?? []
    );
  }
  resolveWaiter(e, t) {
    const a = this.waiters.get(e);
    a && (a.resolve(t), this.waiters.delete(e));
  }
  waitForEvent(e, t = 6e4) {
    return new Promise((a, s) => {
      const n = setTimeout(() => {
        this.waiters.delete(e), s(new Error(`WebViewAdapter: timeout waiting for "${e}"`));
      }, t);
      this.waiters.set(e, {
        resolve: (i) => {
          clearTimeout(n), a(i);
        },
        reject: (i) => {
          clearTimeout(n), s(i);
        }
      });
    });
  }
  /**
   * Detect whether the iframe is same-origin (blob: URLs work directly).
   * If not, we transfer the blob data via postMessage Transferable.
   */
  isSameOrigin() {
    try {
      return !!this.iframe?.contentWindow?.location?.href;
    } catch {
      return !1;
    }
  }
  // ── EngineAdapter implementation ─────────────────────────────────
  async loadModel(e, t) {
    if (this.isSameOrigin())
      this.send({ type: "loadModel", url: e });
    else {
      const s = await (await fetch(e)).arrayBuffer();
      this.send({ type: "loadModelBuffer", buffer: s }, [s]);
    }
    await this.waitForEvent("modelLoaded");
    try {
      const a = m();
      a.trackName && this.send({ type: "setAnimationState", state: a });
    } catch {
    }
  }
  async loadEnvironment(e) {
    if (this.isSameOrigin())
      this.send({ type: "loadEnvironment", url: e });
    else {
      const a = await (await fetch(e)).arrayBuffer();
      this.send({ type: "loadEnvironmentBuffer", buffer: a }, [a]);
    }
    await this.waitForEvent("environmentLoaded");
  }
  resize(e, t) {
    this.send({ type: "resize", width: e, height: t });
  }
  getStats() {
    return this.cachedStats;
  }
  setCameraPosition(e, t, a) {
    this.send({ type: "setCameraPosition", position: e, target: t, instant: a });
  }
  setExposure(e) {
    this.send({ type: "setExposure", value: e });
  }
  setTonemapping(e) {
    this.send({ type: "setTonemapping", mode: e });
  }
  setBackgroundColor(e) {
    this.send({ type: "setBackgroundColor", color: e });
  }
  setSkyboxEnabled(e) {
    this.send({ type: "setSkyboxEnabled", enabled: e });
  }
  setRenderMode(e) {
    this.send({ type: "setRenderMode", mode: e });
  }
  playAnimationTrack(e) {
    this.send({ type: "playAnimationTrack", trackName: e });
  }
  setAnimationPlaying(e) {
    this.send({ type: "setAnimationPlaying", playing: e });
  }
  seekAnimation(e, t) {
    this.send({ type: "seekAnimation", time: e, trackName: t });
  }
  setAnimationSpeed(e) {
    this.send({ type: "setAnimationSpeed", speed: e });
  }
  get areAnimationsEqual() {
    return this._areAnimationsEqual;
  }
  // Comparator mode
  enableComparatorMode(e) {
    this._comparatorMode = !0, this.send({ type: "enableComparatorMode", splitPosition: e });
  }
  disableComparatorMode() {
    this._comparatorMode = !1, this._areAnimationsEqual = null, this.send({ type: "disableComparatorMode" });
  }
  setSplitPosition(e) {
    this.send({ type: "setSplitPosition", position: e });
  }
  async loadModelToSide(e, t, a) {
    if (this.isSameOrigin())
      this.send({ type: "loadModelToSide", url: e, side: t });
    else {
      const n = await (await fetch(e)).arrayBuffer();
      this.send({ type: "loadModelToSideBuffer", buffer: n, side: t }, [n]);
    }
    await this.waitForEvent(`modelLoaded:${t}`);
    try {
      const s = m();
      s.trackName && this.send({ type: "setAnimationState", state: s });
    } catch {
    }
  }
  isComparatorModeActive() {
    return this._comparatorMode;
  }
  removeModel(e) {
    this.send({ type: "removeModel", side: e });
  }
  getAnimationTracks() {
    return this.cachedAnimationTracks;
  }
  setMorphTargetWeight(e, t) {
    this.send({ type: "setMorphTargetWeight", targetName: e, weight: t });
  }
  setMorphTargetState(e) {
    const t = {};
    e.forEach((a, s) => {
      t[s] = a;
    }), this.send({ type: "setMorphTargetState", state: t });
  }
  setAnimationState(e) {
    this.send({ type: "setAnimationState", state: e });
  }
}
export {
  g as W
};
