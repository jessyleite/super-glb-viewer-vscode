import { W as c } from "./WebViewAdapter-BPoV0mN3.js";
import { g as y } from "./index-BrYo9Yjb.js";
class h extends c {
  unityInstance = null;
  canvas = null;
  getConfig() {
    return y("unity");
  }
  // No iframe boundary — Unity runs in the same document, so blob/data
  // URLs are directly accessible. This makes loadModel/loadEnvironment
  // send URLs instead of base64 blobs via SendMessage.
  isSameOrigin() {
    return !0;
  }
  // ── Lifecycle ────────────────────────────────────────────────────
  async init(t, i) {
    const e = this.getConfig();
    this.canvas = t;
    const r = this.resolveBuildDir(e);
    await this.loadScript(r + "/Build/build.loader.js");
    const n = new Promise((a, u) => {
      const l = setTimeout(
        () => u(new Error(`Unity did not become ready within ${e.readyTimeout}ms`)),
        e.readyTimeout
      );
      window.__superGlbViewerBridge = (o) => {
        if (o.type === "ready") {
          clearTimeout(l), a();
          return;
        }
        this.handleGuestEvent(o);
      };
    }), s = {
      dataUrl: r + "/Build/build.data",
      frameworkUrl: r + "/Build/build.framework.js",
      codeUrl: r + "/Build/build.wasm",
      streamingAssetsUrl: "StreamingAssets",
      companyName: "DefaultCompany",
      productName: "Super GLB Viewer Unity",
      productVersion: "0.1.0"
    };
    if (await this.urlExists(s.dataUrl + ".br") && (s.dataUrl += ".br", s.frameworkUrl += ".br", s.codeUrl += ".br"), !window.createUnityInstance)
      throw new Error("DirectUnityAdapter: createUnityInstance not found after loading loader script");
    const d = document.querySelector.bind(document);
    document.querySelector = function(a) {
      return a === "#" ? t : d(a);
    }, t.style.display = "", t.style.width = "100%", t.style.height = "100%", t.width = t.parentElement?.clientWidth || 800, t.height = t.parentElement?.clientHeight || 600, t.id = "unity-canvas", this.unityInstance = await window.createUnityInstance(t, s), await n, this.send({ type: "init" });
  }
  dispose() {
    if (super.dispose(), delete window.__superGlbViewerBridge, this.unityInstance) {
      try {
        this.unityInstance.Quit();
      } catch {
      }
      this.unityInstance = null;
    }
    this.canvas = null;
  }
  // ── Transport: direct SendMessage instead of postMessage ────────
  send(t, i) {
    if (!this.unityInstance) return;
    const e = { ...t };
    if (e.buffer instanceof ArrayBuffer && (e.bufferBase64 = this.arrayBufferToBase64(e.buffer), delete e.buffer), e.type === "setMorphTargetState" && e.state && typeof e.state == "object") {
      const r = Object.keys(e.state);
      e.stateKeys = r, e.stateValues = r.map((n) => e.state[n]), delete e.state;
    }
    this.unityInstance.SendMessage("WebViewBridge", "OnCommand", JSON.stringify(e));
  }
  // ── Helpers ─────────────────────────────────────────────────────
  resolveBuildDir(t) {
    const i = window.__PUBLIC_BASE_URI__;
    if (i) {
      const e = t.buildUrl.replace(/^\/super-glb-viewer/, "");
      return i + e.substring(0, e.lastIndexOf("/"));
    }
    return t.buildUrl.substring(0, t.buildUrl.lastIndexOf("/"));
  }
  loadScript(t) {
    return new Promise((i, e) => {
      const r = document.createElement("script");
      r.src = t, r.onload = () => i(), r.onerror = () => e(new Error(`Failed to load script: ${t}`)), document.head.appendChild(r);
    });
  }
  async urlExists(t) {
    try {
      return (await fetch(t, { method: "HEAD" })).ok;
    } catch {
      return !1;
    }
  }
  arrayBufferToBase64(t) {
    const i = new Uint8Array(t), e = 32768;
    let r = "";
    for (let n = 0; n < i.length; n += e)
      r += String.fromCharCode(...i.subarray(n, n + e));
    return btoa(r);
  }
}
export {
  h as DirectUnityAdapter
};
