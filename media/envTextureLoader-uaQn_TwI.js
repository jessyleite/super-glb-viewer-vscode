import { G as l, U as d, d as t } from "./BabylonAdapter-DXDkMOqC.js";
class c {
  constructor() {
    this.supportCascades = !1;
  }
  /**
   * Uploads the cube texture data to the WebGL texture. It has already been bound.
   * @param data contains the texture data
   * @param texture defines the BabylonJS internal texture
   * @param createPolynomials will be true if polynomials have been requested
   * @param onLoad defines the callback to trigger once the texture is ready
   * @param onError defines the callback to trigger in case of error
   */
  loadCubeData(s, e, p, i, n) {
    if (Array.isArray(s))
      return;
    const a = l(s);
    if (a) {
      e.width = a.width, e.height = a.width;
      try {
        d(e, a), t(e, s, a).then(() => {
          e.isReady = !0, e.onLoadedObservable.notifyObservers(e), e.onLoadedObservable.clear(), i && i();
        }, (o) => {
          n?.("Can not upload environment levels", o);
        });
      } catch (o) {
        n?.("Can not upload environment file", o);
      }
    } else n && n("Can not parse the environment file", null);
  }
  /**
   * Uploads the 2D texture data to the WebGL texture. It has already been bound once in the callback.
   */
  loadData() {
    throw ".env not supported in 2d.";
  }
}
export {
  c as _ENVTextureLoader
};
