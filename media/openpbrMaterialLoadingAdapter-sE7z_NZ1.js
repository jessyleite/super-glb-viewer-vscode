class s {
  /**
   * Creates a new instance of the OpenPBRMaterialLoadingAdapter.
   * @param material - The OpenPBR material to adapt.
   */
  constructor(e) {
    this._material = e;
  }
  /**
   * Gets the underlying material
   */
  get material() {
    return this._material;
  }
  /**
   * Whether the material should be treated as unlit
   */
  get isUnlit() {
    return this._material.unlit;
  }
  /**
   * Sets whether the material should be treated as unlit
   */
  set isUnlit(e) {
    this._material.unlit = e;
  }
  // ========================================
  // CULLING PROPERTIES
  // ========================================
  /**
   * Sets whether back face culling is enabled.
   * @param value True to enable back face culling
   */
  set backFaceCulling(e) {
    this._material.backFaceCulling = e;
  }
  /**
   * Gets whether back face culling is enabled.
   * @returns True if back face culling is enabled
   */
  get backFaceCulling() {
    return this._material.backFaceCulling;
  }
  /**
   * Sets whether two-sided lighting is enabled.
   * @param value True to enable two-sided lighting
   */
  set twoSidedLighting(e) {
    this._material.twoSidedLighting = e;
  }
  /**
   * Gets whether two-sided lighting is enabled.
   * @returns True if two-sided lighting is enabled
   */
  get twoSidedLighting() {
    return this._material.twoSidedLighting;
  }
  // ========================================
  // ALPHA PROPERTIES
  // ========================================
  /**
   * Sets the alpha cutoff value for alpha testing.
   * Note: OpenPBR doesn't have a direct equivalent, so this is a no-op.
   * @param value The alpha cutoff threshold (ignored for OpenPBR)
   */
  set alphaCutOff(e) {
  }
  /**
   * Gets the alpha cutoff value.
   * @returns Default value of 0.5 (OpenPBR doesn't support this directly)
   */
  get alphaCutOff() {
    return 0.5;
  }
  /**
   * Sets whether to use alpha from the base color texture.
   * Note: OpenPBR handles this differently through the baseColorTexture alpha channel.
   * @param value True to use alpha from base color texture (handled automatically in OpenPBR)
   */
  set useAlphaFromBaseColorTexture(e) {
    this._material._useAlphaFromBaseColorTexture = e;
  }
  /**
   * Gets whether alpha is used from the base color texture.
   * @returns Always false for OpenPBR as it's handled automatically
   */
  get useAlphaFromBaseColorTexture() {
    return !1;
  }
  /**
   * Gets whether the transparency is treated as alpha coverage.
   */
  get transparencyAsAlphaCoverage() {
    return !1;
  }
  /**
   * Sets/Gets whether the transparency is treated as alpha coverage
   */
  set transparencyAsAlphaCoverage(e) {
  }
  // ========================================
  // BASE PARAMETERS
  // ========================================
  /**
   * Sets the base color of the OpenPBR material.
   * @param value The base color as a Color3
   */
  set baseColor(e) {
    this._material.baseColor = e;
  }
  /**
   * Gets the base color of the OpenPBR material.
   * @returns The base color as a Color3
   */
  get baseColor() {
    return this._material.baseColor;
  }
  /**
   * Sets the base color texture of the OpenPBR material.
   * @param value The base color texture or null
   */
  set baseColorTexture(e) {
    this._material.baseColorTexture = e;
  }
  /**
   * Gets the base color texture of the OpenPBR material.
   * @returns The base color texture or null
   */
  get baseColorTexture() {
    return this._material.baseColorTexture;
  }
  /**
   * Sets the base diffuse roughness of the OpenPBR material.
   * @param value The diffuse roughness value (0-1)
   */
  set baseDiffuseRoughness(e) {
    this._material.baseDiffuseRoughness = e;
  }
  /**
   * Gets the base diffuse roughness of the OpenPBR material.
   * @returns The diffuse roughness value (0-1)
   */
  get baseDiffuseRoughness() {
    return this._material.baseDiffuseRoughness;
  }
  /**
   * Sets the base diffuse roughness texture of the OpenPBR material.
   * @param value The diffuse roughness texture or null
   */
  set baseDiffuseRoughnessTexture(e) {
    this._material.baseDiffuseRoughnessTexture = e;
  }
  /**
   * Gets the base diffuse roughness texture of the OpenPBR material.
   * @returns The diffuse roughness texture or null
   */
  get baseDiffuseRoughnessTexture() {
    return this._material.baseDiffuseRoughnessTexture;
  }
  /**
   * Sets the base metalness value of the OpenPBR material.
   * @param value The metalness value (0-1)
   */
  set baseMetalness(e) {
    this._material.baseMetalness = e;
  }
  /**
   * Gets the base metalness value of the OpenPBR material.
   * @returns The metalness value (0-1)
   */
  get baseMetalness() {
    return this._material.baseMetalness;
  }
  /**
   * Sets the base metalness texture of the OpenPBR material.
   * @param value The metalness texture or null
   */
  set baseMetalnessTexture(e) {
    this._material.baseMetalnessTexture = e;
  }
  /**
   * Gets the base metalness texture of the OpenPBR material.
   * @returns The metalness texture or null
   */
  get baseMetalnessTexture() {
    return this._material.baseMetalnessTexture;
  }
  /**
   * Sets whether to use roughness from the metallic texture's green channel.
   * @param value True to use green channel for roughness
   */
  set useRoughnessFromMetallicTextureGreen(e) {
    this._material._useRoughnessFromMetallicTextureGreen = e;
  }
  /**
   * Sets whether to use metalness from the metallic texture's blue channel.
   * @param value True to use blue channel for metalness
   */
  set useMetallicFromMetallicTextureBlue(e) {
    this._material._useMetallicFromMetallicTextureBlue = e;
  }
  // ========================================
  // SPECULAR PARAMETERS
  // ========================================
  /**
   * Configures specular properties for OpenPBR material.
   * @param _enableEdgeColor Whether to enable edge color support (ignored for OpenPBR)
   */
  enableSpecularEdgeColor(e = !1) {
  }
  /**
   * Sets the specular weight of the OpenPBR material.
   * @param value The specular weight value (0-1)
   */
  set specularWeight(e) {
    this._material.specularWeight = e;
  }
  /**
   * Gets the specular weight of the OpenPBR material.
   * @returns The specular weight value (0-1)
   */
  get specularWeight() {
    return this._material.specularWeight;
  }
  /**
   * Sets the specular weight texture of the OpenPBR material.
   * If the same texture is used for specular color, optimizes by using alpha channel for weight.
   * @param value The specular weight texture or null
   */
  set specularWeightTexture(e) {
    this._material.specularColorTexture === e ? (this._material.specularWeightTexture = null, this._material._useSpecularWeightFromSpecularColorTexture = !0, this._material._useSpecularWeightFromAlpha = !0) : this._material.specularWeightTexture = e;
  }
  /**
   * Gets the specular weight texture of the OpenPBR material.
   * @returns The specular weight texture or null
   */
  get specularWeightTexture() {
    return this._material.specularWeightTexture;
  }
  /**
   * Sets the specular color of the OpenPBR material.
   * @param value The specular color as a Color3
   */
  set specularColor(e) {
    this._material.specularColor = e;
  }
  /**
   * Gets the specular color of the OpenPBR material.
   * @returns The specular color as a Color3
   */
  get specularColor() {
    return this._material.specularColor;
  }
  /**
   * Sets the specular color texture of the OpenPBR material.
   * If the same texture is used for specular weight, optimizes by using alpha channel for weight.
   * @param value The specular color texture or null
   */
  set specularColorTexture(e) {
    this._material.specularColorTexture = e, this._material.specularWeightTexture === this._material.specularColorTexture && (this._material.specularWeightTexture = null, this._material._useSpecularWeightFromSpecularColorTexture = !0, this._material._useSpecularWeightFromAlpha = !0);
  }
  /**
   * Gets the specular color texture of the OpenPBR material.
   * @returns The specular color texture or null
   */
  get specularColorTexture() {
    return this._material.specularColorTexture;
  }
  /**
   * Sets the specular roughness of the OpenPBR material.
   * @param value The roughness value (0-1)
   */
  set specularRoughness(e) {
    this._material.specularRoughness = e;
  }
  /**
   * Gets the specular roughness of the OpenPBR material.
   * @returns The roughness value (0-1)
   */
  get specularRoughness() {
    return this._material.specularRoughness;
  }
  /**
   * Sets the specular roughness texture of the OpenPBR material.
   * @param value The roughness texture or null
   */
  set specularRoughnessTexture(e) {
    this._material.specularRoughnessTexture = e;
  }
  /**
   * Gets the specular roughness texture of the OpenPBR material.
   * @returns The roughness texture or null
   */
  get specularRoughnessTexture() {
    return this._material.specularRoughnessTexture;
  }
  /**
   * Sets the specular index of refraction (IOR) of the OpenPBR material.
   * @param value The IOR value
   */
  set specularIor(e) {
    this._material.specularIor = e;
  }
  /**
   * Gets the specular index of refraction (IOR) of the OpenPBR material.
   * @returns The IOR value
   */
  get specularIor() {
    return this._material.specularIor;
  }
  // ========================================
  // EMISSION PARAMETERS
  // ========================================
  /**
   * Sets the emission color of the OpenPBR material.
   * @param value The emission color as a Color3
   */
  set emissionColor(e) {
    this._material.emissionColor = e;
  }
  /**
   * Gets the emission color of the OpenPBR material.
   * @returns The emission color as a Color3
   */
  get emissionColor() {
    return this._material.emissionColor;
  }
  /**
   * Sets the emission luminance of the OpenPBR material.
   * @param value The emission luminance value
   */
  set emissionLuminance(e) {
    this._material.emissionLuminance = e;
  }
  /**
   * Gets the emission luminance of the OpenPBR material.
   * @returns The emission luminance value
   */
  get emissionLuminance() {
    return this._material.emissionLuminance;
  }
  /**
   * Sets the emission color texture of the OpenPBR material.
   * @param value The emission texture or null
   */
  set emissionColorTexture(e) {
    this._material.emissionColorTexture = e;
  }
  /**
   * Gets the emission color texture of the OpenPBR material.
   * @returns The emission texture or null
   */
  get emissionColorTexture() {
    return this._material.emissionColorTexture;
  }
  // ========================================
  // AMBIENT OCCLUSION
  // ========================================
  /**
   * Sets the ambient occlusion texture of the OpenPBR material.
   * @param value The ambient occlusion texture or null
   */
  set ambientOcclusionTexture(e) {
    this._material.ambientOcclusionTexture = e;
  }
  /**
   * Gets the ambient occlusion texture of the OpenPBR material.
   * @returns The ambient occlusion texture or null
   */
  get ambientOcclusionTexture() {
    return this._material.ambientOcclusionTexture;
  }
  /**
   * Sets the ambient occlusion texture strength by modifying the texture's level.
   * @param value The strength value (typically 0-1)
   */
  set ambientOcclusionTextureStrength(e) {
    const t = this._material.ambientOcclusionTexture;
    t && (t.level = e);
  }
  /**
   * Gets the ambient occlusion texture strength from the texture's level property.
   * @returns The strength value, defaults to 1.0 if no texture or level is set
   */
  get ambientOcclusionTextureStrength() {
    return this._material.ambientOcclusionTexture?.level ?? 1;
  }
  // ========================================
  // COAT PARAMETERS
  // ========================================
  /**
   * Configures coat parameters for OpenPBR material.
   * OpenPBR coat is already built-in, so no configuration is needed.
   */
  configureCoat() {
  }
  /**
   * Sets the coat weight of the OpenPBR material.
   * @param value The coat weight value (0-1)
   */
  set coatWeight(e) {
    this._material.coatWeight = e;
  }
  /**
   * Gets the coat weight of the OpenPBR material.
   * @returns The coat weight value (0-1)
   */
  get coatWeight() {
    return this._material.coatWeight;
  }
  /**
   * Sets the coat weight texture of the OpenPBR material.
   * @param value The coat weight texture or null
   */
  set coatWeightTexture(e) {
    this._material.coatWeightTexture = e;
  }
  /**
   * Gets the coat weight texture of the OpenPBR material.
   * @returns The coat weight texture or null
   */
  get coatWeightTexture() {
    return this._material.coatWeightTexture;
  }
  /**
   * Sets the coat color of the OpenPBR material.
   * @param value The coat color as a Color3
   */
  set coatColor(e) {
    this._material.coatColor = e;
  }
  /**
   * Sets the coat color texture of the OpenPBR material.
   * @param value The coat color texture or null
   */
  set coatColorTexture(e) {
    this._material.coatColorTexture = e;
  }
  /**
   * Sets the coat roughness of the OpenPBR material.
   * @param value The coat roughness value (0-1)
   */
  set coatRoughness(e) {
    this._material.coatRoughness = e;
  }
  /**
   * Gets the coat roughness of the OpenPBR material.
   * @returns The coat roughness value (0-1)
   */
  get coatRoughness() {
    return this._material.coatRoughness;
  }
  /**
   * Sets the coat roughness texture of the OpenPBR material.
   * @param value The coat roughness texture or null
   */
  set coatRoughnessTexture(e) {
    this._material.coatRoughnessTexture = e, e && (this._material._useCoatRoughnessFromGreenChannel = !0);
  }
  /**
   * Gets the coat roughness texture of the OpenPBR material.
   * @returns The coat roughness texture or null
   */
  get coatRoughnessTexture() {
    return this._material.coatRoughnessTexture;
  }
  /**
   * Sets the coat index of refraction (IOR) of the OpenPBR material.
   */
  set coatIor(e) {
    this._material.coatIor = e;
  }
  /**
   * Sets the coat darkening value of the OpenPBR material.
   * @param value The coat darkening value
   */
  set coatDarkening(e) {
    this._material.coatDarkening = e;
  }
  /**
   * Sets the coat darkening texture (OpenPBR: coatDarkeningTexture, no PBR equivalent)
   */
  set coatDarkeningTexture(e) {
    this._material.coatDarkeningTexture = e;
  }
  /**
   * Sets the coat roughness anisotropy.
   * TODO: Implementation pending OpenPBR coat anisotropy feature availability.
   * @param value The coat anisotropy intensity value
   */
  set coatRoughnessAnisotropy(e) {
    this._material.coatRoughnessAnisotropy = e;
  }
  /**
   * Gets the coat roughness anisotropy.
   * TODO: Implementation pending OpenPBR coat anisotropy feature availability.
   * @returns Currently returns 0 as coat anisotropy is not yet available
   */
  get coatRoughnessAnisotropy() {
    return this._material.coatRoughnessAnisotropy;
  }
  /**
   * Sets the coat tangent angle for anisotropy.
   * TODO: Implementation pending OpenPBR coat anisotropy feature availability.
   * @param value The coat anisotropy rotation angle in radians
   */
  set geometryCoatTangentAngle(e) {
    this._material.geometryCoatTangentAngle = e;
  }
  /**
   * Sets the coat tangent texture for anisotropy.
   * TODO: Implementation pending OpenPBR coat anisotropy feature availability.
   * @param value The coat anisotropy texture or null
   */
  set geometryCoatTangentTexture(e) {
    this._material.geometryCoatTangentTexture = e, e && (this._material._useCoatRoughnessAnisotropyFromTangentTexture = !0);
  }
  /**
   * Gets the coat tangent texture for anisotropy.
   * TODO: Implementation pending OpenPBR coat anisotropy feature availability.
   * @returns Currently returns null as coat anisotropy is not yet available
   */
  get geometryCoatTangentTexture() {
    return this._material.geometryCoatTangentTexture;
  }
  // ========================================
  // TRANSMISSION LAYER
  // ========================================
  /**
   * Sets the transmission weight.
   * TODO: Implementation pending OpenPBR transmission feature availability.
   * @param value The transmission weight value (0-1)
   */
  set transmissionWeight(e) {
  }
  /**
   * Sets the transmission weight texture.
   * TODO: Implementation pending OpenPBR transmission feature availability.
   * @param value The transmission weight texture or null
   */
  set transmissionWeightTexture(e) {
  }
  /**
   * Gets the transmission weight.
   * TODO: Implementation pending OpenPBR transmission feature availability.
   * @returns Currently returns 0 as transmission is not yet available
   */
  get transmissionWeight() {
    return 0;
  }
  /**
   * Gets the transmission dispersion Abbe number.
   * @param value The Abbe number value
   */
  set transmissionDispersionAbbeNumber(e) {
  }
  /**
   * Configures transmission for OpenPBR material.
   * TODO: Implementation pending OpenPBR transmission feature availability.
   */
  configureTransmission() {
  }
  // ========================================
  // VOLUME PROPERTIES (Subsurface Scattering)
  // ========================================
  /**
   * Sets the attenuation distance for volume scattering.
   * TODO: Implementation pending OpenPBR volume feature availability.
   * @param value The attenuation distance value
   */
  set transmissionDepth(e) {
  }
  /**
   * Sets the attenuation color for volume scattering.
   * TODO: Implementation pending OpenPBR volume feature availability.
   * @param value The attenuation color as a Color3
   */
  set transmissionColor(e) {
  }
  /**
   * Sets the thickness texture for volume scattering.
   * TODO: Implementation pending OpenPBR volume feature availability.
   * @param value The thickness texture or null
   */
  set volumeThicknessTexture(e) {
  }
  /**
   * Sets the thickness factor for volume scattering.
   * TODO: Implementation pending OpenPBR volume feature availability.
   * @param value The thickness value
   */
  set volumeThickness(e) {
  }
  // ========================================
  // SUBSURFACE PROPERTIES (Subsurface Scattering)
  // ========================================
  /**
   * Configures subsurface properties for PBR material
   */
  configureSubsurface() {
  }
  /**
   * Sets the subsurface weight
   */
  set subsurfaceWeight(e) {
  }
  get subsurfaceWeight() {
    return 0;
  }
  /**
   * Sets the subsurface weight texture
   */
  set subsurfaceWeightTexture(e) {
  }
  /**
   * Sets the subsurface color.
   * @param value The subsurface tint color as a Color3
   */
  set subsurfaceColor(e) {
  }
  /**
   * Sets the subsurface color texture.
   * @param value The subsurface tint texture or null
   */
  set subsurfaceColorTexture(e) {
  }
  // ========================================
  // FUZZ LAYER (Sheen)
  // ========================================
  /**
   * Configures fuzz for OpenPBR.
   * Enables fuzz and sets up proper configuration.
   */
  configureFuzz() {
  }
  /**
   * Sets the fuzz weight.
   * @param value The fuzz weight value
   */
  set fuzzWeight(e) {
    this._material.fuzzWeight = e;
  }
  /**
   * Sets the fuzz weight texture.
   * @param value The fuzz weight texture or null
   */
  set fuzzWeightTexture(e) {
    this._material.fuzzWeightTexture = e;
  }
  /**
   * Sets the fuzz color.
   * @param value The fuzz color as a Color3
   */
  set fuzzColor(e) {
    this._material.fuzzColor = e;
  }
  /**
   * Sets the fuzz color texture.
   * @param value The fuzz color texture or null
   */
  set fuzzColorTexture(e) {
    this._material.fuzzColorTexture = e;
  }
  /**
   * Sets the fuzz roughness.
   * @param value The fuzz roughness value (0-1)
   */
  set fuzzRoughness(e) {
    this._material.fuzzRoughness = e;
  }
  /**
   * Sets the fuzz roughness texture.
   * @param value The fuzz roughness texture or null
   */
  set fuzzRoughnessTexture(e) {
    this._material.fuzzRoughnessTexture = e, this._material._useFuzzRoughnessFromTextureAlpha = !0;
  }
  // ========================================
  // ANISOTROPY
  // ========================================
  /**
   * Sets the specular roughness anisotropy of the OpenPBR material.
   * @param value The anisotropy intensity value
   */
  set specularRoughnessAnisotropy(e) {
    this._material.specularRoughnessAnisotropy = e;
  }
  /**
   * Gets the specular roughness anisotropy of the OpenPBR material.
   * @returns The anisotropy intensity value
   */
  get specularRoughnessAnisotropy() {
    return this._material.specularRoughnessAnisotropy;
  }
  /**
   * Sets the anisotropy rotation angle.
   * @param value The anisotropy rotation angle in radians
   */
  set geometryTangentAngle(e) {
    this._material.geometryTangentAngle = e;
  }
  /**
   * Sets the geometry tangent texture for anisotropy.
   * Automatically enables using anisotropy from the tangent texture.
   * @param value The anisotropy texture or null
   */
  set geometryTangentTexture(e) {
    this._material.geometryTangentTexture = e, this._material._useSpecularRoughnessAnisotropyFromTangentTexture = !0;
  }
  /**
   * Gets the geometry tangent texture for anisotropy.
   * @returns The anisotropy texture or null
   */
  get geometryTangentTexture() {
    return this._material.geometryTangentTexture;
  }
  /**
   * Configures glTF-style anisotropy for the OpenPBR material.
   * @param useGltfStyle Whether to use glTF-style anisotropy
   */
  configureGltfStyleAnisotropy(e = !0) {
    this._material._useGltfStyleAnisotropy = e;
  }
  // ========================================
  // THIN FILM IRIDESCENCE
  // ========================================
  /**
   * Sets the thin film weight.
   * @param value The thin film weight value
   */
  set thinFilmWeight(e) {
    this._material.thinFilmWeight = e;
  }
  /**
   * Sets the thin film IOR.
   * @param value The thin film IOR value
   */
  set thinFilmIor(e) {
    this._material.thinFilmIor = e;
  }
  /**
   * Sets the thin film thickness minimum.
   * @param value The minimum thickness value in nanometers
   */
  set thinFilmThicknessMinimum(e) {
    this._material.thinFilmThicknessMin = e / 1e3;
  }
  /**
   * Sets the thin film thickness maximum.
   * @param value The maximum thickness value in nanometers
   */
  set thinFilmThicknessMaximum(e) {
    this._material.thinFilmThickness = e / 1e3;
  }
  /**
   * Sets the thin film weight texture.
   * @param value The thin film weight texture or null
   */
  set thinFilmWeightTexture(e) {
    this._material.thinFilmWeightTexture = e;
  }
  /**
   * Sets the thin film thickness texture.
   * @param value The thin film thickness texture or null
   */
  set thinFilmThicknessTexture(e) {
    this._material.thinFilmThicknessTexture = e, this._material._useThinFilmThicknessFromTextureGreen = !0;
  }
  // ========================================
  // UNLIT MATERIALS
  // ========================================
  /**
   * Sets whether the OpenPBR material is unlit.
   * @param value True to make the material unlit
   */
  set unlit(e) {
    this._material.unlit = e;
  }
  // ========================================
  // GEOMETRY PARAMETERS
  // ========================================
  /**
   * Sets the geometry opacity of the OpenPBR material.
   * @param value The opacity value (0-1)
   */
  set geometryOpacity(e) {
    this._material.geometryOpacity = e;
  }
  /**
   * Gets the geometry opacity of the OpenPBR material.
   * @returns The opacity value (0-1)
   */
  get geometryOpacity() {
    return this._material.geometryOpacity;
  }
  /**
   * Sets the geometry normal texture of the OpenPBR material.
   * @param value The normal texture or null
   */
  set geometryNormalTexture(e) {
    this._material.geometryNormalTexture = e;
  }
  /**
   * Gets the geometry normal texture of the OpenPBR material.
   * @returns The normal texture or null
   */
  get geometryNormalTexture() {
    return this._material.geometryNormalTexture;
  }
  /**
   * Sets the normal map inversions for the OpenPBR material.
   * Note: OpenPBR may handle normal map inversions differently or may not need them.
   * @param invertX Whether to invert the normal map on the X axis (may be ignored)
   * @param invertY Whether to invert the normal map on the Y axis (may be ignored)
   */
  setNormalMapInversions(e, t) {
  }
  /**
   * Sets the geometry coat normal texture of the OpenPBR material.
   * @param value The coat normal texture or null
   */
  set geometryCoatNormalTexture(e) {
    this._material.geometryCoatNormalTexture = e;
  }
  /**
   * Gets the geometry coat normal texture of the OpenPBR material.
   * @returns The coat normal texture or null
   */
  get geometryCoatNormalTexture() {
    return this._material.geometryCoatNormalTexture;
  }
  /**
   * Sets the geometry coat normal texture scale.
   * @param value The scale value for the coat normal texture
   */
  set geometryCoatNormalTextureScale(e) {
    this._material.geometryCoatNormalTexture && (this._material.geometryCoatNormalTexture.level = e);
  }
}
export {
  s as OpenPBRMaterialLoadingAdapter
};
