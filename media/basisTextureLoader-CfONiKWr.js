import { T as p, L as f, c as i } from "./BabylonAdapter-Gi-6Ojkb.js";
class m {
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
  loadCubeData(o, e, n, a, c) {
    if (Array.isArray(o))
      return;
    const s = e.getEngine().getCaps(), r = {
      supportedCompressionFormats: {
        etc1: !!s.etc1,
        s3tc: !!s.s3tc,
        pvrtc: !!s.pvrtc,
        etc2: !!s.etc2,
        astc: !!s.astc,
        bc7: !!s.bptc
      }
    };
    p(o, r).then((t) => {
      const l = t.fileInfo.images[0].levels.length > 1 && e.generateMipMaps;
      f(e, t), e.getEngine()._setCubeMapTextureParams(e, l), e.isReady = !0, e.onLoadedObservable.notifyObservers(e), e.onLoadedObservable.clear(), a && a();
    }).catch((t) => {
      i.Warn("Failed to transcode Basis file, transcoding may not be supported on this device"), e.isReady = !0, c && c(t);
    });
  }
  /**
   * Uploads the 2D texture data to the WebGL texture. It has already been bound once in the callback.
   * @param data contains the texture data
   * @param texture defines the BabylonJS internal texture
   * @param callback defines the method to call once ready to upload
   */
  loadData(o, e, n) {
    const a = e.getEngine().getCaps(), c = {
      supportedCompressionFormats: {
        etc1: !!a.etc1,
        s3tc: !!a.s3tc,
        pvrtc: !!a.pvrtc,
        etc2: !!a.etc2,
        astc: !!a.astc,
        bc7: !!a.bptc
      }
    };
    p(o, c).then((s) => {
      const r = s.fileInfo.images[0].levels[0], t = s.fileInfo.images[0].levels.length > 1 && e.generateMipMaps;
      n(r.width, r.height, t, s.format !== -1, () => {
        f(e, s);
      });
    }).catch((s) => {
      i.Warn("Failed to transcode Basis file, transcoding may not be supported on this device"), i.Warn(`Failed to transcode Basis file: ${s}`), n(0, 0, !1, !1, () => {
      }, !0);
    });
  }
}
export {
  m as _BasisTextureLoader
};
