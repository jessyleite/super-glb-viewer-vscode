import { C as r, a as i, V as u } from "./BabylonAdapter-DZR9EaPO.js";
class h {
  /**
   * Creates a new instance of the PBRMaterialLoadingAdapter.
   * @param material - The PBR material to adapt.
   */
  constructor(e) {
    this._specWorkflow = !1, this._material = e, this._material.enableSpecularAntiAliasing = !0;
  }
  /**
   * Gets the underlying material
   */
  get material() {
    return this._material;
  }
  /**
   * No-op: PBRMaterial has no deferred finalization.
   * @param _loader Unused.
   */
  async finalizeAsync(e) {
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
   * @param value The alpha cutoff threshold (0-1)
   */
  set alphaCutOff(e) {
    this._material.alphaCutOff = e;
  }
  /**
   * Gets the alpha cutoff value.
   * @returns The alpha cutoff threshold (0-1)
   */
  get alphaCutOff() {
    return this._material.alphaCutOff;
  }
  /**
   * Sets whether to use alpha from the albedo texture.
   * @param value True to use alpha from albedo texture
   */
  set useAlphaFromBaseColorTexture(e) {
    this._material.useAlphaFromAlbedoTexture = e;
  }
  /**
   * Gets whether alpha is used from the albedo texture.
   * @returns True if using alpha from albedo texture
   */
  get useAlphaFromBaseColorTexture() {
    return this._material.useAlphaFromAlbedoTexture;
  }
  /**
   * Gets whether the transparency is treated as alpha coverage.
   */
  get transparencyAsAlphaCoverage() {
    return this._material.useRadianceOverAlpha || this._material.useSpecularOverAlpha;
  }
  /**
   * Sets/Gets whether the transparency is treated as alpha coverage
   */
  set transparencyAsAlphaCoverage(e) {
    this._material.useRadianceOverAlpha = !e, this._material.useSpecularOverAlpha = !e;
  }
  // ========================================
  // BASE PARAMETERS
  // ========================================
  /**
   * Sets the base color of the material (mapped to PBR albedoColor).
   * @param value The base color as a Color3
   */
  set baseColor(e) {
    this._material.albedoColor = e;
  }
  /**
   * Gets the base color of the material.
   * @returns The base color as a Color3
   */
  get baseColor() {
    return this._material.albedoColor;
  }
  /**
   * Sets the base color texture of the material (mapped to PBR albedoTexture).
   * @param value The base color texture or null
   */
  set baseColorTexture(e) {
    this._material.albedoTexture = e;
  }
  /**
   * Gets the base color texture of the material.
   * @returns The base color texture or null
   */
  get baseColorTexture() {
    return this._material.albedoTexture;
  }
  /**
   * Sets the base diffuse roughness of the material.
   * @param value The diffuse roughness value (0-1)
   */
  set baseDiffuseRoughness(e) {
    this._material.baseDiffuseRoughness = e, e > 0 && (this._material.brdf.baseDiffuseModel = r.MATERIAL_DIFFUSE_MODEL_E_OREN_NAYAR);
  }
  /**
   * Gets the base diffuse roughness of the material.
   * @returns The diffuse roughness value (0-1), defaults to 0 if not set
   */
  get baseDiffuseRoughness() {
    return this._material.baseDiffuseRoughness ?? 0;
  }
  /**
   * Sets the base diffuse roughness texture of the material.
   * @param value The diffuse roughness texture or null
   */
  set baseDiffuseRoughnessTexture(e) {
    this._material.baseDiffuseRoughnessTexture = e;
  }
  /**
   * Gets the base diffuse roughness texture of the material.
   * @returns The diffuse roughness texture or null
   */
  get baseDiffuseRoughnessTexture() {
    return this._material.baseDiffuseRoughnessTexture;
  }
  /**
   * Sets the base metalness value of the material (mapped to PBR metallic).
   * @param value The metalness value (0-1)
   */
  set baseMetalness(e) {
    this._material.metallic = e;
  }
  /**
   * Gets the base metalness value of the material.
   * @returns The metalness value (0-1), defaults to 1 if not set
   */
  get baseMetalness() {
    return this._material.metallic ?? 1;
  }
  /**
   * Sets the base metalness texture of the material (mapped to PBR metallicTexture).
   * @param value The metalness texture or null
   */
  set baseMetalnessTexture(e) {
    this._material.metallicTexture = e;
  }
  /**
   * Gets the base metalness texture of the material.
   * @returns The metalness texture or null
   */
  get baseMetalnessTexture() {
    return this._material.metallicTexture;
  }
  /**
   * Sets whether to use roughness from the metallic texture's green channel.
   * Also disables using roughness from the alpha channel when enabled.
   * @param value True to use green channel for roughness
   */
  set useRoughnessFromMetallicTextureGreen(e) {
    this._material.useRoughnessFromMetallicTextureGreen = e, this._material.useRoughnessFromMetallicTextureAlpha = !e;
  }
  /**
   * Sets whether to use metalness from the metallic texture's blue channel.
   * @param value True to use blue channel for metalness
   */
  set useMetallicFromMetallicTextureBlue(e) {
    this._material.useMetallnessFromMetallicTextureBlue = e;
  }
  // ========================================
  // SPECULAR PARAMETERS
  // ========================================
  /**
   * Configures specular properties and optionally enables OpenPBR BRDF model for edge color support.
   * @param enableEdgeColor Whether to enable OpenPBR BRDF models for edge color support
   */
  enableSpecularEdgeColor(e = !1) {
    e && (this._material.brdf.dielectricSpecularModel = r.MATERIAL_DIELECTRIC_SPECULAR_MODEL_OPENPBR, this._material.brdf.conductorSpecularModel = r.MATERIAL_CONDUCTOR_SPECULAR_MODEL_OPENPBR);
  }
  /**
   * Enable the specular/glossiness workflow and disable metallic/roughness.
   */
  configureSpecularGlossiness() {
    this._specWorkflow = !0, this._material.metallic = null, this._material.roughness = null, this._material.useMicroSurfaceFromReflectivityMapAlpha = !0;
  }
  /**
   * Sets the specular weight (mapped to PBR metallicF0Factor).
   * @param value The specular weight value
   */
  set specularWeight(e) {
    this._material.metallicF0Factor = e;
  }
  /**
   * Gets the specular weight.
   * @returns The specular weight value, defaults to 1 if not set
   */
  get specularWeight() {
    return this._material.metallicF0Factor ?? 1;
  }
  /**
   * Sets the specular weight texture (mapped to PBR metallicReflectanceTexture).
   * Configures the material to use only metalness from this texture when set.
   * @param value The specular weight texture or null
   */
  set specularWeightTexture(e) {
    e ? (this._material.metallicReflectanceTexture = e, this._material.useOnlyMetallicFromMetallicReflectanceTexture = !0) : (this._material.metallicReflectanceTexture = null, this._material.useOnlyMetallicFromMetallicReflectanceTexture = !1);
  }
  /**
   * Gets the specular weight texture.
   * @returns The specular weight texture or null
   */
  get specularWeightTexture() {
    return this._material.metallicReflectanceTexture;
  }
  /**
   * Sets the specular color (mapped to PBR metallicReflectanceColor).
   * @param value The specular color as a Color3
   */
  set specularColor(e) {
    this._specWorkflow ? this._material.reflectivityColor = e : this._material.metallicReflectanceColor = e;
  }
  /**
   * Gets the specular color.
   * @returns The specular color as a Color3
   */
  get specularColor() {
    return this._specWorkflow ? this._material.reflectivityColor : this._material.metallicReflectanceColor;
  }
  /**
   * Sets the specular color texture (mapped to PBR reflectanceTexture).
   * @param value The specular color texture or null
   */
  set specularColorTexture(e) {
    this._specWorkflow ? (this._material.reflectivityTexture = e, this._material.reflectivityTexture && (this._material.reflectivityTexture.hasAlpha = !0)) : this._material.reflectanceTexture = e;
  }
  /**
   * Gets the specular color texture.
   * @returns The specular color texture or null
   */
  get specularColorTexture() {
    return this._specWorkflow ? this._material.reflectivityTexture : this._material.reflectanceTexture;
  }
  /**
   * Sets the specular roughness (mapped to PBR roughness).
   * @param value The roughness value (0-1)
   */
  set specularRoughness(e) {
    this._material.roughness = e;
  }
  /**
   * Gets the specular roughness.
   * @returns The roughness value (0-1), defaults to 1 if not set
   */
  get specularRoughness() {
    return this._material.roughness ?? 1;
  }
  /**
   * Sets the specular roughness texture.
   * Note: PBR uses the same texture for both metallic and roughness,
   * so this only sets the texture if no base metalness texture exists.
   * @param value The roughness texture or null
   */
  set specularRoughnessTexture(e) {
    this.baseMetalnessTexture || (this._material.metallicTexture = e);
  }
  /**
   * Gets the specular roughness texture.
   * @returns The roughness texture (same as metallic texture for PBR) or null
   */
  get specularRoughnessTexture() {
    return this._material.metallicTexture;
  }
  /**
   * Sets the specular index of refraction (mapped to PBR indexOfRefraction).
   * @param value The IOR value
   */
  set specularIor(e) {
    this._material.indexOfRefraction = e;
  }
  /**
   * Gets the specular index of refraction.
   * @returns The IOR value
   */
  get specularIor() {
    return this._material.indexOfRefraction;
  }
  /**
   * Sets/gets the glossiness (inverted roughness)
   * ONLY used for specular/glossiness workflow; has no effect when metallic/roughness workflow is active
   */
  get glossiness() {
    return this._material.microSurface ?? 1;
  }
  /**
   * Sets/gets the glossiness (inverted roughness)
   * ONLY used for specular/glossiness workflow; has no effect when metallic/roughness workflow is active
   */
  set glossiness(e) {
    this._material.microSurface = e;
  }
  // ========================================
  // EMISSION PARAMETERS
  // ========================================
  /**
   * Sets the emission color (mapped to PBR emissiveColor).
   * @param value The emission color as a Color3
   */
  set emissionColor(e) {
    this._material.emissiveColor = e;
  }
  /**
   * Gets the emission color.
   * @returns The emission color as a Color3
   */
  get emissionColor() {
    return this._material.emissiveColor;
  }
  /**
   * Sets the emission luminance/intensity (mapped to PBR emissiveIntensity).
   * @param value The emission intensity value
   */
  set emissionLuminance(e) {
    this._material.emissiveIntensity = e;
  }
  /**
   * Gets the emission luminance/intensity.
   * @returns The emission intensity value
   */
  get emissionLuminance() {
    return this._material.emissiveIntensity;
  }
  /**
   * Sets the emission color texture (mapped to PBR emissiveTexture).
   * @param value The emission texture or null
   */
  set emissionColorTexture(e) {
    this._material.emissiveTexture = e;
  }
  /**
   * Gets the emission color texture.
   * @returns The emission texture or null
   */
  get emissionColorTexture() {
    return this._material.emissiveTexture;
  }
  // ========================================
  // AMBIENT OCCLUSION
  // ========================================
  /**
   * Sets the ambient occlusion texture (mapped to PBR ambientTexture).
   * Automatically enables grayscale mode when set.
   * @param value The ambient occlusion texture or null
   */
  set ambientOcclusionTexture(e) {
    this._material.ambientTexture = e, e && (this._material.useAmbientInGrayScale = !0);
  }
  /**
   * Gets the ambient occlusion texture.
   * @returns The ambient occlusion texture or null
   */
  get ambientOcclusionTexture() {
    return this._material.ambientTexture;
  }
  /**
   * Sets the ambient occlusion texture strength.
   * @param value The strength value (typically 0-1)
   */
  set ambientOcclusionTextureStrength(e) {
    this._material.ambientTextureStrength = e;
  }
  /**
   * Gets the ambient occlusion texture strength.
   * @returns The strength value, defaults to 1.0 if not set
   */
  get ambientOcclusionTextureStrength() {
    return this._material.ambientTextureStrength ?? 1;
  }
  // ========================================
  // COAT PARAMETERS
  // ========================================
  /**
   * Configures clear coat for PBR material.
   * Enables clear coat and sets up proper configuration.
   */
  configureCoat() {
    this._material.clearCoat.isEnabled = !0, this._material.clearCoat.useRoughnessFromMainTexture = !1, this._material.clearCoat.remapF0OnInterfaceChange = !1;
  }
  /**
   * Sets the coat weight (mapped to PBR clearCoat.intensity).
   * Automatically enables clear coat.
   * @param value The coat weight value (0-1)
   */
  set coatWeight(e) {
    this._material.clearCoat.isEnabled = !0, this._material.clearCoat.intensity = e;
  }
  /**
   * Gets the coat weight.
   * @returns The coat weight value
   */
  get coatWeight() {
    return this._material.clearCoat.intensity;
  }
  /**
   * Sets the coat weight texture (mapped to PBR clearCoat.texture).
   * Automatically enables clear coat.
   * @param value The coat weight texture or null
   */
  set coatWeightTexture(e) {
    this._material.clearCoat.isEnabled = !0, this._material.clearCoat.texture = e;
  }
  /**
   * Gets the coat weight texture.
   * @returns The coat weight texture or null
   */
  get coatWeightTexture() {
    return this._material.clearCoat.texture;
  }
  /**
   * Sets the coat color (mapped to PBR clearCoat.tintColor).
   * @param value The coat tint color as a Color3
   */
  set coatColor(e) {
    this._material.clearCoat.isTintEnabled = e != i.White(), this._material.clearCoat.tintColor = e;
  }
  /**
   * Sets the coat color texture (mapped to PBR clearCoat.tintTexture).
   * @param value The coat color texture or null
   */
  set coatColorTexture(e) {
    this._material.clearCoat.tintTexture = e;
  }
  /**
   * Sets the coat roughness (mapped to PBR clearCoat.roughness).
   * Automatically enables clear coat.
   * @param value The coat roughness value (0-1)
   */
  set coatRoughness(e) {
    this._material.clearCoat.isEnabled = !0, this._material.clearCoat.roughness = e;
  }
  /**
   * Gets the coat roughness.
   * @returns The coat roughness value, defaults to 0 if not set
   */
  get coatRoughness() {
    return this._material.clearCoat.roughness ?? 0;
  }
  /**
   * Sets the coat roughness texture (mapped to PBR clearCoat.textureRoughness).
   * Automatically enables clear coat and disables using roughness from main texture.
   * @param value The coat roughness texture or null
   */
  set coatRoughnessTexture(e) {
    this._material.clearCoat.isEnabled = !0, this._material.clearCoat.useRoughnessFromMainTexture = !1, this._material.clearCoat.textureRoughness = e;
  }
  /**
   * Gets the coat roughness texture.
   * @returns The coat roughness texture or null
   */
  get coatRoughnessTexture() {
    return this._material.clearCoat.textureRoughness;
  }
  /**
   * Sets the coat index of refraction (IOR).
   */
  set coatIor(e) {
    this._material.clearCoat.indexOfRefraction = e;
  }
  /**
   * Sets the coat darkening value.
   * Note: PBR doesn't have a direct coat darkening property, so this is a no-op.
   * @param value The coat darkening value (ignored for PBR)
   */
  set coatDarkening(e) {
  }
  /**
   * Sets the coat darkening texture
   * @param value The coat darkening texture or null
   */
  set coatDarkeningTexture(e) {
  }
  /**
   * Sets the coat roughness anisotropy.
   * Note: PBR clearCoat doesn't support anisotropy yet, so this is a placeholder.
   * @param value The coat anisotropy intensity value (currently ignored)
   */
  set coatRoughnessAnisotropy(e) {
  }
  /**
   * Gets the coat roughness anisotropy.
   * Note: PBR clearCoat doesn't support anisotropy yet, so this returns 0.
   * @returns Currently returns 0 as clearCoat anisotropy is not yet available
   */
  get coatRoughnessAnisotropy() {
    return 0;
  }
  /**
   * Sets the coat tangent angle for anisotropy.
   * Note: PBR clearCoat doesn't support anisotropy yet, so this is a placeholder.
   * @param value The coat anisotropy rotation angle in radians (currently ignored)
   */
  set geometryCoatTangentAngle(e) {
  }
  /**
   * Sets the coat tangent texture for anisotropy.
   * Note: PBR clearCoat doesn't support anisotropy textures yet, so this is a placeholder.
   * @param value The coat anisotropy texture (currently ignored)
   */
  set geometryCoatTangentTexture(e) {
  }
  /**
   * Gets the coat tangent texture for anisotropy.
   * Note: PBR clearCoat doesn't support anisotropy textures yet, so this returns null.
   * @returns Currently returns null as clearCoat anisotropy is not yet available
   */
  get geometryCoatTangentTexture() {
    return null;
  }
  // ========================================
  // TRANSMISSION LAYER
  // ========================================
  /**
   * Sets the transmission weight (mapped to PBR subSurface.refractionIntensity).
   * Enables refraction when value \> 0.
   * @param value The transmission weight value (0-1)
   */
  set transmissionWeight(e) {
    this._material.subSurface.isRefractionEnabled = e > 0, this._material.subSurface.refractionIntensity = e;
  }
  /**
   * Gets the transmission weight.
   * @returns The transmission weight value
   */
  get transmissionWeight() {
    return this._material.subSurface.isRefractionEnabled ? this._material.subSurface.refractionIntensity : 0;
  }
  /**
   * Sets the transmission weight texture (mapped to PBR subSurface.refractionIntensityTexture).
   * Automatically enables refraction and glTF-style textures.
   * @param value The transmission weight texture or null
   */
  set transmissionWeightTexture(e) {
    this._material.subSurface.isRefractionEnabled = !0, this._material.subSurface.refractionIntensityTexture = e, this._material.subSurface.useGltfStyleTextures = !0;
  }
  /**
   * Sets the attenuation distance for volume.
   * @param value The attenuation distance value
   */
  set transmissionDepth(e) {
    this.transmissionWeight > 0 ? this._material.subSurface.tintColorAtDistance = e : this.subsurfaceWeight > 0 && this._material.subSurface.diffusionDistance.multiplyInPlace(new i(e, e, e));
  }
  /**
   * Gets the attenuation distance for volume.
   * @returns The attenuation distance value
   */
  get transmissionDepth() {
    return this.transmissionWeight > 0 ? this._material.subSurface.tintColorAtDistance : 0;
  }
  /**
   * Sets the attenuation color (mapped to PBR subSurface.tintColor).
   * @param value The attenuation color as a Color3
   */
  set transmissionColor(e) {
    this.transmissionWeight > 0 ? this._material.subSurface.tintColor = e : this.subsurfaceWeight > 0 && this._material.subSurface.diffusionDistance.multiplyInPlace(e);
  }
  /**
   * Sets the attenuation color (mapped to PBR subSurface.tintColor).
   * @returns The attenuation color as a Color3
   */
  get transmissionColor() {
    return this.transmissionWeight > 0 ? this._material.subSurface.tintColor : this.subsurfaceWeight > 0 ? this._material.subSurface.diffusionDistance : new i(0, 0, 0);
  }
  /**
   * Sets the transmission scatter coefficient.
   * @param value The scatter coefficient as a Color3
   */
  set transmissionScatter(e) {
    this._material.subSurface.diffusionDistance = e;
  }
  /**
   * Sets the transmission scatter coefficient.
   * @returns The scatter coefficient as a Color3
   */
  get transmissionScatter() {
    return this._material.subSurface.diffusionDistance;
  }
  set transmissionScatterTexture(e) {
  }
  /**
   * Sets the transmission scattering anisotropy.
   * @param value The anisotropy intensity value (-1 to 1)
   */
  set transmissionScatterAnisotropy(e) {
  }
  /**
   * Sets the transmission dispersion Abbe number.
   * @param value The Abbe number value
   */
  set transmissionDispersionAbbeNumber(e) {
  }
  /**
   * Sets the transmission dispersion scale.
   * @param value The dispersion scale value
   */
  set transmissionDispersionScale(e) {
    e > 0 ? (this._material.subSurface.isDispersionEnabled = !0, this._material.subSurface.dispersion = 20 / e) : (this._material.subSurface.isDispersionEnabled = !1, this._material.subSurface.dispersion = 0);
  }
  /**
   * Gets the refraction background texture
   * @returns The refraction background texture or null
   */
  get refractionBackgroundTexture() {
    return this._material.subSurface.refractionTexture;
  }
  /**
   * Sets the refraction background texture
   * @param value The refraction background texture or null
   */
  set refractionBackgroundTexture(e) {
    this._material.subSurface.refractionTexture = e;
  }
  /**
   * Configures transmission for thin-surface transmission (KHR_materials_transmission).
   * Sets up the material for proper thin-surface transmission behavior.
   */
  configureTransmission() {
    this._material.subSurface.volumeIndexOfRefraction = 1, this._material.subSurface.useAlbedoToTintRefraction = !0, this._material.subSurface.minimumThickness = 0, this._material.subSurface.maximumThickness = 0;
  }
  // ========================================
  // VOLUME PROPERTIES
  // ========================================
  /**
   * Configures volume properties for PBR material. Nothing to do for PBRMaterial.
   */
  configureVolume() {
  }
  /**
   * Sets whether the material is thin-walled (i.e. non-volumetric) or not.
   */
  set geometryThinWalled(e) {
  }
  /**
   * Gets whether the material is thin-walled (i.e. non-volumetric) or not.
   */
  get geometryThinWalled() {
    return this._material.subSurface.maximumThickness === 0;
  }
  /**
   * Sets the thickness texture (mapped to PBR subSurface.thicknessTexture).
   * Automatically enables refraction.
   * @param value The thickness texture or null
   */
  set volumeThicknessTexture(e) {
    this._material.subSurface.thicknessTexture = e, this._material.subSurface.useGltfStyleTextures = !0;
  }
  /**
   * Sets the thickness factor (mapped to PBR subSurface.maximumThickness).
   * Automatically enables refraction.
   * @param value The thickness value
   */
  set volumeThickness(e) {
    this._material.subSurface.minimumThickness = 0, this._material.subSurface.maximumThickness = e, this._material.subSurface.useThicknessAsDepth = !0, e > 0 && (this._material.subSurface.volumeIndexOfRefraction = this._material.indexOfRefraction);
  }
  // ========================================
  // SUBSURFACE PROPERTIES (Subsurface Scattering)
  // ========================================
  /**
   * Configures subsurface properties for PBR material
   */
  configureSubsurface() {
    this._material.subSurface.useGltfStyleTextures = !0, this._material.subSurface.volumeIndexOfRefraction = 1, this._material.subSurface.minimumThickness = 0, this._material.subSurface.maximumThickness = 0, this._material.subSurface.useAlbedoToTintTranslucency = !1;
  }
  /**
   * Sets the subsurface weight
   */
  set subsurfaceWeight(e) {
    this._material.subSurface.isTranslucencyEnabled = e > 0, this._material.subSurface.translucencyIntensity = e;
  }
  /**
   * Gets the subsurface weight
   * @returns The subsurface weight value
   */
  get subsurfaceWeight() {
    return this._material.subSurface.isTranslucencyEnabled ? this._material.subSurface.translucencyIntensity : 0;
  }
  /**
   * Sets the subsurface weight texture
   */
  set subsurfaceWeightTexture(e) {
    this._material.subSurface.translucencyIntensityTexture = e;
  }
  /**
   * Sets the subsurface color.
   * @param value The subsurface tint color as a Color3
   */
  set subsurfaceColor(e) {
    const a = new u(-Math.log(this.transmissionColor.r), -Math.log(this.transmissionColor.g), -Math.log(this.transmissionColor.b));
    a.scaleInPlace(1 / Math.max(this.transmissionDepth, 1e-3));
    const t = a, l = Math.max(t.x, Math.max(t.y, t.z)), s = l > 0 ? 1 / l : 1;
    this._material.subSurface.diffusionDistance = new i(Math.exp(-t.x * s), Math.exp(-t.y * s), Math.exp(-t.z * s));
  }
  /**
   * Sets the subsurface color texture.
   * @param value The subsurface tint texture or null
   */
  set subsurfaceColorTexture(e) {
  }
  /**
   * Sets the surface tint of the material (when using subsurface scattering)
   */
  set diffuseTransmissionTint(e) {
    this._material.subSurface.tintColor = e;
  }
  /**
   * Gets the subsurface constant tint (when using subsurface scattering)
   * @returns The subsurface constant tint as a Color3
   */
  get diffuseTransmissionTint() {
    return this._material.subSurface.tintColor;
  }
  /**
   * Sets the subsurface constant tint texture (when using subsurface scattering)
   * @param value The subsurface constant tint texture or null
   */
  set diffuseTransmissionTintTexture(e) {
    this._material.subSurface.translucencyColorTexture = e;
  }
  /**
   * Gets the subsurface radius (used for subsurface scattering)
   * subsurfaceRadiusScale * subsurfaceRadius gives the mean free path per color channel.
   * @returns The subsurface radius as a Color3
   */
  get subsurfaceRadius() {
    return 1;
  }
  /**
   * Sets the subsurface radius (used for subsurface scattering)
   * subsurfaceRadiusScale * subsurfaceRadius gives the mean free path per color channel.
   * @param value The subsurface radius as a number
   */
  set subsurfaceRadius(e) {
  }
  /**
   * Gets the subsurface radius scale (used for subsurface scattering)
   * subsurfaceRadiusScale * subsurfaceRadius gives the mean free path per color channel.
   * @returns The subsurface radius scale as a Color3
   */
  get subsurfaceRadiusScale() {
    return this._material.subSurface.scatteringDiffusionProfile ?? i.White();
  }
  /**
   * Sets the subsurface radius scale (used for subsurface scattering)
   * subsurfaceRadiusScale * subsurfaceRadius gives the mean free path per color channel.
   * @param value The subsurface radius scale as a Color3
   */
  set subsurfaceRadiusScale(e) {
    this._material.subSurface.scatteringDiffusionProfile = e;
  }
  /**
   * Sets the subsurface scattering anisotropy.
   * Note: PBRMaterial does not have a direct equivalent, so this is a no-op.
   * @param value The anisotropy intensity value (ignored for PBR)
   */
  set subsurfaceScatterAnisotropy(e) {
  }
  /**
   * Does this material have a translucent surface (i.e. either transmission or subsurface)?
   * @returns True if the material is translucent, false otherwise
   */
  isTranslucent() {
    return this.transmissionWeight > 0 || this.subsurfaceWeight > 0;
  }
  // ========================================
  // FUZZ LAYER (Sheen)
  // ========================================
  /**
   * Configures sheen for PBR material.
   * Enables sheen and sets up proper configuration.
   */
  configureFuzz() {
    this._material.sheen.isEnabled = !0, this._material.sheen.useRoughnessFromMainTexture = !1, this._material.sheen.albedoScaling = !0;
  }
  /**
   * Sets the sheen weight (mapped to PBR sheen.intensity).
   * Automatically enables sheen.
   * @param value The sheen weight value
   */
  set fuzzWeight(e) {
    this._material.sheen.isEnabled = !0, this._material.sheen.intensity = e;
  }
  /**
   * Sets the fuzz weight texture.
   * @param value The fuzz weight texture or null
   */
  set fuzzWeightTexture(e) {
    this._material.sheen.texture || (this._material.sheen.texture = e);
  }
  /**
   * Sets the sheen color (mapped to PBR sheen.color).
   * Automatically enables sheen.
   * @param value The sheen color as a Color3
   */
  set fuzzColor(e) {
    this._material.sheen.isEnabled = !0, this._material.sheen.color = e;
  }
  /**
   * Sets the sheen color texture (mapped to PBR sheen.texture).
   * Automatically enables sheen.
   * @param value The sheen color texture or null
   */
  set fuzzColorTexture(e) {
    this._material.sheen.texture = e;
  }
  /**
   * Sets the sheen roughness (mapped to PBR sheen.roughness).
   * Automatically enables sheen.
   * @param value The sheen roughness value (0-1)
   */
  set fuzzRoughness(e) {
    this._material.sheen.isEnabled = !0, this._material.sheen.roughness = e;
  }
  /**
   * Sets the sheen roughness texture (mapped to PBR sheen.textureRoughness).
   * Automatically enables sheen.
   * @param value The sheen roughness texture or null
   */
  set fuzzRoughnessTexture(e) {
    this._material.sheen.isEnabled = !0, this._material.sheen.textureRoughness = e;
  }
  // ========================================
  // ANISOTROPY
  // ========================================
  /**
   * Sets the specular roughness anisotropy (mapped to PBR anisotropy.intensity).
   * Automatically enables anisotropy.
   * @param value The anisotropy intensity value
   */
  set specularRoughnessAnisotropy(e) {
    this._material.anisotropy.isEnabled = !0, this._material.anisotropy.intensity = e;
  }
  /**
   * Gets the specular roughness anisotropy.
   * @returns The anisotropy intensity value
   */
  get specularRoughnessAnisotropy() {
    return this._material.anisotropy.intensity;
  }
  /**
   * Sets the anisotropy rotation (mapped to PBR anisotropy.angle).
   * Automatically enables anisotropy.
   * @param value The anisotropy rotation angle in radians
   */
  set geometryTangentAngle(e) {
    this._material.anisotropy.isEnabled = !0, this._material.anisotropy.angle = e;
  }
  /**
   * Sets the geometry tangent texture (mapped to PBR anisotropy.texture).
   * Automatically enables anisotropy.
   * @param value The anisotropy texture or null
   */
  set geometryTangentTexture(e) {
    this._material.anisotropy.isEnabled = !0, this._material.anisotropy.texture = e;
  }
  /**
   * Gets the geometry tangent texture.
   * @returns The anisotropy texture or null
   */
  get geometryTangentTexture() {
    return this._material.anisotropy.texture;
  }
  /**
   * Configures glTF-style anisotropy for the material.
   * Note: PBR materials don't need this configuration, so this is a no-op.
   * @param useGltfStyle Whether to use glTF-style anisotropy (ignored for PBR)
   */
  configureGltfStyleAnisotropy(e = !0) {
  }
  // ========================================
  // THIN FILM IRIDESCENCE
  // ========================================
  /**
   * Sets the iridescence weight (mapped to PBR iridescence.intensity).
   * Automatically enables iridescence.
   * @param value The iridescence intensity value
   */
  set thinFilmWeight(e) {
    this._material.iridescence.isEnabled = e > 0, this._material.iridescence.intensity = e;
  }
  /**
   * Sets the iridescence IOR (mapped to PBR iridescence.indexOfRefraction).
   * @param value The iridescence IOR value
   */
  set thinFilmIor(e) {
    this._material.iridescence.indexOfRefraction = e;
  }
  /**
   * Sets the iridescence thickness minimum (mapped to PBR iridescence.minimumThickness).
   * @param value The minimum thickness value in nanometers
   */
  set thinFilmThicknessMinimum(e) {
    this._material.iridescence.minimumThickness = e;
  }
  /**
   * Sets the iridescence thickness maximum (mapped to PBR iridescence.maximumThickness).
   * @param value The maximum thickness value in nanometers
   */
  set thinFilmThicknessMaximum(e) {
    this._material.iridescence.maximumThickness = e;
  }
  /**
   * Sets the thin film weight texture (mapped to PBR iridescence.texture).
   * @param value The thin film weight texture or null
   */
  set thinFilmWeightTexture(e) {
    this._material.iridescence.texture = e;
  }
  /**
   * Sets the iridescence thickness texture (mapped to PBR iridescence.thicknessTexture).
   * @param value The iridescence thickness texture or null
   */
  set thinFilmThicknessTexture(e) {
    this._material.iridescence.thicknessTexture = e;
  }
  // ========================================
  // UNLIT MATERIALS
  // ========================================
  /**
   * Sets whether the material is unlit.
   * @param value True to make the material unlit
   */
  set unlit(e) {
    this._material.unlit = e;
  }
  // ========================================
  // GEOMETRY PARAMETERS
  // ========================================
  /**
   * Sets the geometry opacity (mapped to PBR alpha).
   * @param value The opacity value (0-1)
   */
  set geometryOpacity(e) {
    this._material.alpha = e;
  }
  /**
   * Gets the geometry opacity.
   * @returns The opacity value (0-1)
   */
  get geometryOpacity() {
    return this._material.alpha;
  }
  /**
   * Sets the geometry normal texture (mapped to PBR bumpTexture).
   * Also forces irradiance computation in fragment shader for better lighting.
   * @param value The normal texture or null
   */
  set geometryNormalTexture(e) {
    this._material.bumpTexture = e, this._material.forceIrradianceInFragment = !0;
  }
  /**
   * Gets the geometry normal texture.
   * @returns The normal texture or null
   */
  get geometryNormalTexture() {
    return this._material.bumpTexture;
  }
  /**
   * Sets the normal map inversions for the material.
   * @param invertX Whether to invert the normal map on the X axis
   * @param invertY Whether to invert the normal map on the Y axis
   */
  setNormalMapInversions(e, a) {
    this._material.invertNormalMapX = e, this._material.invertNormalMapY = a;
  }
  /**
   * Sets the geometry coat normal texture (mapped to PBR clearCoat.bumpTexture).
   * Automatically enables clear coat.
   * @param value The coat normal texture or null
   */
  set geometryCoatNormalTexture(e) {
    this._material.clearCoat.isEnabled = !0, this._material.clearCoat.bumpTexture = e;
  }
  /**
   * Gets the geometry coat normal texture.
   * @returns The coat normal texture or null
   */
  get geometryCoatNormalTexture() {
    return this._material.clearCoat.bumpTexture;
  }
  /**
   * Sets the geometry coat normal texture scale.
   * @param value The scale value for the coat normal texture
   */
  set geometryCoatNormalTextureScale(e) {
    this._material.clearCoat.bumpTexture && (this._material.clearCoat.bumpTexture.level = e);
  }
}
export {
  h as PBRMaterialLoadingAdapter
};
