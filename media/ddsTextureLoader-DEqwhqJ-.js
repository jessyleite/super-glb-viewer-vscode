import { DDSTools as n } from "./dds-AlAGstYs.js";
import { S as t } from "./BabylonAdapter-DZR9EaPO.js";
class c {
  constructor() {
    this.supportCascades = !0;
  }
  /**
   * Uploads the cube texture data to the WebGL texture. It has already been bound.
   * @param imgs contains the cube maps
   * @param texture defines the BabylonJS internal texture
   * @param createPolynomials will be true if polynomials have been requested
   * @param onLoad defines the callback to trigger once the texture is ready
   */
  loadCubeData(p, i, m, o) {
    const e = i.getEngine();
    let a, l = !1, d = 1e3;
    if (Array.isArray(p))
      for (let s = 0; s < p.length; s++) {
        const h = p[s];
        a = n.GetDDSInfo(h), i.width = a.width, i.height = a.height, l = (a.isRGB || a.isLuminance || a.mipmapCount > 1) && i.generateMipMaps, e._unpackFlipY(a.isCompressed), n.UploadDDSLevels(e, i, h, a, l, 6, -1, s), !a.isFourCC && a.mipmapCount === 1 ? e.generateMipMapsForCubemap(i) : d = a.mipmapCount - 1;
      }
    else {
      const s = p;
      a = n.GetDDSInfo(s), i.width = a.width, i.height = a.height, m && (a.sphericalPolynomial = new t()), l = (a.isRGB || a.isLuminance || a.mipmapCount > 1) && i.generateMipMaps, e._unpackFlipY(a.isCompressed), n.UploadDDSLevels(e, i, s, a, l, 6), !a.isFourCC && a.mipmapCount === 1 ? e.generateMipMapsForCubemap(i, !1) : d = a.mipmapCount - 1;
    }
    e._setCubeMapTextureParams(i, l, d), i.isReady = !0, i.onLoadedObservable.notifyObservers(i), i.onLoadedObservable.clear(), o && o({ isDDS: !0, width: i.width, info: a, data: p, texture: i });
  }
  /**
   * Uploads the 2D texture data to the WebGL texture. It has already been bound once in the callback.
   * @param data contains the texture data
   * @param texture defines the BabylonJS internal texture
   * @param callback defines the method to call once ready to upload
   */
  loadData(p, i, m) {
    const o = n.GetDDSInfo(p), e = (o.isRGB || o.isLuminance || o.mipmapCount > 1) && i.generateMipMaps && Math.max(o.width, o.height) >> o.mipmapCount - 1 === 1;
    m(o.width, o.height, e, o.isFourCC, () => {
      n.UploadDDSLevels(i.getEngine(), i, p, o, e, 1);
    });
  }
}
export {
  c as _DDSTextureLoader
};
