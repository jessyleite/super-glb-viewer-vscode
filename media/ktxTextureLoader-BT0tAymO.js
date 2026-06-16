import { ar as l, as as h } from "./BabylonAdapter-DZR9EaPO.js";
class n {
  /**
   * Creates a new KhronosTextureContainer
   * @param data contents of the KTX container file
   * @param facesExpected should be either 1 or 6, based whether a cube texture or or
   */
  constructor(r, e) {
    if (this.data = r, this.isInvalid = !1, !n.IsValid(r)) {
      this.isInvalid = !0, l.Error("texture missing KTX identifier");
      return;
    }
    const s = Uint32Array.BYTES_PER_ELEMENT, a = new DataView(this.data.buffer, this.data.byteOffset + 12, 13 * s), t = a.getUint32(0, !0) === 67305985;
    if (this.glType = a.getUint32(1 * s, t), this.glTypeSize = a.getUint32(2 * s, t), this.glFormat = a.getUint32(3 * s, t), this.glInternalFormat = a.getUint32(4 * s, t), this.glBaseInternalFormat = a.getUint32(5 * s, t), this.pixelWidth = a.getUint32(6 * s, t), this.pixelHeight = a.getUint32(7 * s, t), this.pixelDepth = a.getUint32(8 * s, t), this.numberOfArrayElements = a.getUint32(9 * s, t), this.numberOfFaces = a.getUint32(10 * s, t), this.numberOfMipmapLevels = a.getUint32(11 * s, t), this.bytesOfKeyValueData = a.getUint32(12 * s, t), this.glType !== 0) {
      l.Error("only compressed formats currently supported"), this.isInvalid = !0;
      return;
    } else
      this.numberOfMipmapLevels = Math.max(1, this.numberOfMipmapLevels);
    if (this.pixelHeight === 0 || this.pixelDepth !== 0) {
      l.Error("only 2D textures currently supported"), this.isInvalid = !0;
      return;
    }
    if (this.numberOfArrayElements !== 0) {
      l.Error("texture arrays not currently supported"), this.isInvalid = !0;
      return;
    }
    if (this.numberOfFaces !== e) {
      l.Error("number of faces expected" + e + ", but found " + this.numberOfFaces), this.isInvalid = !0;
      return;
    }
    this.loadType = n.COMPRESSED_2D;
  }
  /**
   * Uploads KTX content to a Babylon Texture.
   * It is assumed that the texture has already been created & is currently bound
   * @internal
   */
  uploadLevels(r, e) {
    this.loadType === n.COMPRESSED_2D && this._upload2DCompressedLevels(r, e);
  }
  _upload2DCompressedLevels(r, e) {
    let s = n.HEADER_LEN + this.bytesOfKeyValueData, a = this.pixelWidth, i = this.pixelHeight;
    const t = e ? this.numberOfMipmapLevels : 1;
    for (let p = 0; p < t; p++) {
      const f = new Int32Array(this.data.buffer, this.data.byteOffset + s, 1)[0];
      s += 4;
      for (let o = 0; o < this.numberOfFaces; o++) {
        const g = new Uint8Array(this.data.buffer, this.data.byteOffset + s, f);
        r.getEngine()._uploadCompressedDataToTextureDirectly(r, r.format, a, i, g, o, p), s += f, s += 3 - (f + 3) % 4;
      }
      a = Math.max(1, a * 0.5), i = Math.max(1, i * 0.5);
    }
  }
  /**
   * Checks if the given data starts with a KTX file identifier.
   * @param data the data to check
   * @returns true if the data is a KTX file or false otherwise
   */
  static IsValid(r) {
    if (r.byteLength >= 12) {
      const e = new Uint8Array(r.buffer, r.byteOffset, 12);
      if (e[0] === 171 && e[1] === 75 && e[2] === 84 && e[3] === 88 && e[4] === 32 && e[5] === 49 && e[6] === 49 && e[7] === 187 && e[8] === 13 && e[9] === 10 && e[10] === 26 && e[11] === 10)
        return !0;
    }
    return !1;
  }
}
n.HEADER_LEN = 64;
n.COMPRESSED_2D = 0;
n.COMPRESSED_3D = 1;
n.TEX_2D = 2;
n.TEX_3D = 3;
function c(u) {
  switch (u) {
    case 35916:
      return 33776;
    case 35918:
      return 33778;
    case 35919:
      return 33779;
    case 37493:
      return 37492;
    case 37497:
      return 37496;
    case 37495:
      return 37494;
    case 37840:
      return 37808;
    case 37841:
      return 37809;
    case 37842:
      return 37810;
    case 37843:
      return 37811;
    case 37844:
      return 37812;
    case 37845:
      return 37813;
    case 37846:
      return 37814;
    case 37847:
      return 37815;
    case 37848:
      return 37816;
    case 37849:
      return 37817;
    case 37850:
      return 37818;
    case 37851:
      return 37819;
    case 37852:
      return 37820;
    case 37853:
      return 37821;
    case 36493:
      return 36492;
  }
  return null;
}
class b {
  constructor() {
    this.supportCascades = !1;
  }
  /**
   * Uploads the cube texture data to the WebGL texture. It has already been bound.
   * @param data contains the texture data
   * @param texture defines the BabylonJS internal texture
   * @param createPolynomials will be true if polynomials have been requested
   * @param onLoad defines the callback to trigger once the texture is ready
   */
  loadCubeData(r, e, s, a) {
    if (Array.isArray(r))
      return;
    e._invertVScale = !e.invertY;
    const i = e.getEngine(), t = new n(r, 6), p = c(t.glInternalFormat);
    p !== null ? (e.format = p, e._useSRGBBuffer = i._getUseSRGBBuffer(!0, !e.generateMipMaps), e._gammaSpace = !0) : e.format = t.glInternalFormat;
    const f = t.numberOfMipmapLevels > 1 && e.generateMipMaps;
    i._unpackFlipY(!0), t.uploadLevels(e, e.generateMipMaps), e.width = t.pixelWidth, e.height = t.pixelHeight, i._setCubeMapTextureParams(e, f, t.numberOfMipmapLevels - 1), e.isReady = !0, e.onLoadedObservable.notifyObservers(e), e.onLoadedObservable.clear(), a && a();
  }
  /**
   * Uploads the 2D texture data to the WebGL texture. It has already been bound once in the callback.
   * @param data contains the texture data
   * @param texture defines the BabylonJS internal texture
   * @param callback defines the method to call once ready to upload
   * @param options
   */
  loadData(r, e, s, a) {
    if (n.IsValid(r)) {
      e._invertVScale = !e.invertY;
      const i = new n(r, 1), t = c(i.glInternalFormat);
      t !== null ? (e.format = t, e._useSRGBBuffer = e.getEngine()._getUseSRGBBuffer(!0, !e.generateMipMaps), e._gammaSpace = !0) : e.format = i.glInternalFormat, s(i.pixelWidth, i.pixelHeight, e.generateMipMaps, !0, () => {
        i.uploadLevels(e, e.generateMipMaps);
      }, i.isInvalid);
    } else h.IsValid(r) ? new h(e.getEngine())._uploadAsync(r, e, a).then(() => {
      s(e.width, e.height, e.generateMipMaps, !0, () => {
      }, !1);
    }, (t) => {
      l.Warn(`Failed to load KTX2 texture data: ${t.message}`), s(0, 0, !1, !1, () => {
      }, !0);
    }) : (l.Error("texture missing KTX identifier"), s(0, 0, !1, !1, () => {
    }, !0));
  }
}
export {
  b as _KTXTextureLoader
};
