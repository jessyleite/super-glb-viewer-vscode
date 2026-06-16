import { formatBytes as z, MaterialExtension as a, InspectorAPI as ie } from "./index-D32OEL7S.js";
import { SceneGraphNodeType as Be } from "./index-D32OEL7S.js";
import { es as r, et as e, eu as ce, ev as ue, ew as de, ex as pe, ey as he, ez as xe, eA as me, eB as ge, eC as X, eD as V, eE as g, eF as ve, eG as je, eH as fe, eI as Ce, cB as b, eJ as P, am as Q, dq as G } from "./index--tWw_-Xm.js";
function ye({ stats: s }) {
  const t = [];
  return s.meshes > 0 && t.push({ label: "Meshes", value: s.meshes }), s.materials > 0 && t.push({ label: "Materials", value: s.materials }), s.textures > 0 && t.push({ label: "Textures", value: s.textures }), s.triangles > 0 && t.push({ label: "Triangles", value: s.triangles.toLocaleString() }), s.geometryVRAM > 0 && t.push({ label: "Geometry VRAM", value: z(s.geometryVRAM) }), s.textureVRAM > 0 && t.push({ label: "Texture VRAM", value: z(s.textureVRAM) }), t.length === 0 ? null : /* @__PURE__ */ e.jsx("div", { className: "node-stats-tooltip", children: t.map(({ label: o, value: l }) => /* @__PURE__ */ e.jsxs("div", { className: "node-stats-row", children: [
    /* @__PURE__ */ e.jsx("span", { className: "node-stats-label", children: o }),
    /* @__PURE__ */ e.jsx("span", { className: "node-stats-value", children: l })
  ] }, o)) });
}
const be = r.memo(function s({ node: t, depth: o, selectedNode: l, selectNode: c, expandedNodes: i, onToggleExpand: m }) {
  const d = i.has(t.id), p = t.children.length > 0, u = l?.id === t.id, j = t.metadata?.stats, f = r.useCallback(
    (y) => {
      y.stopPropagation(), m(t.id);
    },
    [m, t.id]
  ), x = r.useCallback(() => {
    c(t.id);
  }, [c, t.id]), h = j ? /* @__PURE__ */ e.jsx(ye, { stats: j }) : null;
  return /* @__PURE__ */ e.jsxs("div", { className: "tree-node", children: [
    /* @__PURE__ */ e.jsx(ce, { content: h, className: "node-stats-tooltip", children: /* @__PURE__ */ e.jsxs(
      "div",
      {
        className: `tree-node-row ${u ? "selected" : ""}`,
        style: { paddingLeft: `${o * 12 + 6}px` },
        onClick: x,
        role: "treeitem",
        "aria-selected": u,
        "aria-expanded": p ? d : void 0,
        children: [
          p ? /* @__PURE__ */ e.jsx(
            "button",
            {
              type: "button",
              className: "tree-node-toggle",
              onClick: f,
              "aria-label": d ? "Collapse" : "Expand",
              children: d ? "▼" : "▶"
            }
          ) : /* @__PURE__ */ e.jsx("span", { className: "tree-node-toggle-placeholder" }),
          /* @__PURE__ */ e.jsxs("span", { className: "tree-node-icon", role: "img", "aria-label": t.type, children: [
            t.type === "mesh" && /* @__PURE__ */ e.jsx(ue, {}),
            t.type === "light" && /* @__PURE__ */ e.jsx(de, {}),
            t.type === "camera" && /* @__PURE__ */ e.jsx(pe, {}),
            t.type === "armature" && /* @__PURE__ */ e.jsx(he, {}),
            t.type === "bone" && /* @__PURE__ */ e.jsx(xe, {}),
            t.type === "material" && /* @__PURE__ */ e.jsx(me, {}),
            (t.type === "node" || t.type === "scene") && (p ? /* @__PURE__ */ e.jsx(ge, {}) : /* @__PURE__ */ e.jsx(X, {})),
            !["mesh", "light", "camera", "armature", "bone", "material", "node", "scene"].includes(t.type) && /* @__PURE__ */ e.jsx(X, {})
          ] }),
          /* @__PURE__ */ e.jsx("span", { className: "tree-node-name", children: t.name })
        ]
      }
    ) }),
    p && d && /* @__PURE__ */ e.jsx("div", { className: "tree-node-children", role: "group", children: t.children.map((y) => /* @__PURE__ */ e.jsx(
      s,
      {
        node: y,
        depth: o + 1,
        selectedNode: l,
        selectNode: c,
        expandedNodes: i,
        onToggleExpand: m
      },
      y.id
    )) })
  ] });
});
function J(s, t, o) {
  if (t < 2) {
    o.add(s.id);
    for (const l of s.children)
      J(l, t + 1, o);
  }
}
function Ne({ sceneGraph: s, selectedNode: t, selectNode: o, isLoading: l, error: c }) {
  const [i, m] = r.useState(/* @__PURE__ */ new Set()), d = r.useRef(null);
  if (s && s.id !== d.current) {
    const u = d.current !== null && i.size > 0 && !i.has(s.id);
    if (d.current === null || u) {
      const j = /* @__PURE__ */ new Set();
      J(s, 0, j), m(j);
    }
    d.current = s.id;
  }
  const p = r.useCallback((u) => {
    m((j) => {
      const f = new Set(j);
      return f.has(u) ? f.delete(u) : f.add(u), f;
    });
  }, []);
  return l ? /* @__PURE__ */ e.jsx("div", { className: "scene-tree scene-tree-loading", children: /* @__PURE__ */ e.jsx("span", { className: "loading-text", children: "Loading..." }) }) : c ? /* @__PURE__ */ e.jsx("div", { className: "scene-tree scene-tree-error", children: /* @__PURE__ */ e.jsx("span", { className: "error-text", children: c }) }) : s ? /* @__PURE__ */ e.jsx("div", { className: "scene-tree", role: "tree", "aria-label": "Scene graph", children: /* @__PURE__ */ e.jsx(
    be,
    {
      node: s,
      depth: 0,
      selectedNode: t,
      selectNode: o,
      expandedNodes: i,
      onToggleExpand: p
    }
  ) }) : /* @__PURE__ */ e.jsx("div", { className: "scene-tree scene-tree-empty", children: /* @__PURE__ */ e.jsx("span", { className: "empty-text", children: "No model loaded" }) });
}
var $ = /* @__PURE__ */ ((s) => (s.OPAQUE = "OPAQUE", s.MASK = "MASK", s.BLEND = "BLEND", s))($ || {});
const Re = [
  { value: $.OPAQUE, label: "Opaque" },
  { value: $.MASK, label: "Mask" },
  { value: $.BLEND, label: "Blend" }
], R = {
  [a.Clearcoat]: "Clear Coat",
  [a.Transmission]: "Transmission",
  [a.IOR]: "IOR",
  [a.Sheen]: "Sheen",
  [a.Volume]: "Volume",
  [a.Anisotropy]: "Anisotropy",
  [a.Iridescence]: "Iridescence",
  [a.Specular]: "Specular",
  [a.EmissiveStrength]: "Emissive Strength",
  [a.Dispersion]: "Dispersion",
  [a.Unlit]: "Unlit"
}, Se = [
  { extension: a.Clearcoat, label: R[a.Clearcoat] },
  { extension: a.Transmission, label: R[a.Transmission] },
  { extension: a.IOR, label: R[a.IOR] },
  { extension: a.Sheen, label: R[a.Sheen] },
  { extension: a.Volume, label: R[a.Volume] },
  { extension: a.Anisotropy, label: R[a.Anisotropy] },
  { extension: a.Iridescence, label: R[a.Iridescence] },
  { extension: a.Specular, label: R[a.Specular] },
  { extension: a.EmissiveStrength, label: R[a.EmissiveStrength] },
  { extension: a.Dispersion, label: R[a.Dispersion] },
  { extension: a.Unlit, label: R[a.Unlit] }
];
function C({
  title: s,
  children: t,
  defaultOpen: o = !0,
  onRemove: l
}) {
  return /* @__PURE__ */ e.jsxs("details", { className: "property-section", open: o, children: [
    /* @__PURE__ */ e.jsxs("summary", { className: "property-section-header", children: [
      s,
      l && /* @__PURE__ */ e.jsx(
        "button",
        {
          className: "property-section-remove",
          onClick: (c) => {
            c.preventDefault(), c.stopPropagation(), l();
          },
          title: "Remove extension",
          children: "×"
        }
      )
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "property-section-content", children: t })
  ] });
}
function L({
  label: s,
  texture: t,
  onPreview: o
}) {
  if (!t) return null;
  const l = () => {
    t.previewUrl && o && o(t);
  };
  return /* @__PURE__ */ e.jsxs(
    "div",
    {
      className: `texture-slot ${t.previewUrl ? "texture-slot--clickable" : "texture-slot--no-preview"}`,
      onClick: l,
      children: [
        /* @__PURE__ */ e.jsx("div", { className: "texture-slot-thumbnail", children: t.previewUrl ? /* @__PURE__ */ e.jsx("img", { src: t.previewUrl, alt: s }) : /* @__PURE__ */ e.jsx(Ce, { className: "texture-slot-thumbnail-icon" }) }),
        /* @__PURE__ */ e.jsx("span", { className: "texture-slot-label", children: s }),
        /* @__PURE__ */ e.jsx("span", { className: "texture-slot-format", children: t.mimeType.replace("image/", "").toUpperCase() }),
        /* @__PURE__ */ e.jsx("span", { className: "texture-slot-size", children: t.width && t.height && `${t.width}×${t.height}` }),
        /* @__PURE__ */ e.jsx("span", { className: "texture-slot-vram", children: z(t.vram) })
      ]
    }
  );
}
function Me({
  texture: s,
  onClose: t
}) {
  return s.previewUrl ? fe.createPortal(
    /* @__PURE__ */ e.jsx("div", { className: "texture-preview-overlay", onClick: t, children: /* @__PURE__ */ e.jsxs("div", { className: "texture-preview-modal", onClick: (o) => o.stopPropagation(), children: [
      /* @__PURE__ */ e.jsxs("div", { className: "texture-preview-info", children: [
        /* @__PURE__ */ e.jsx("span", { className: "texture-preview-info-name", children: s.name }),
        /* @__PURE__ */ e.jsx("span", { className: "texture-preview-info-format", children: s.mimeType.replace("image/", "").toUpperCase() }),
        /* @__PURE__ */ e.jsxs("span", { className: "texture-preview-info-size", children: [
          s.width,
          "×",
          s.height
        ] }),
        /* @__PURE__ */ e.jsx("span", { className: "texture-preview-info-vram", children: z(s.vram) })
      ] }),
      /* @__PURE__ */ e.jsx(
        "img",
        {
          className: "texture-preview-image",
          src: s.previewUrl,
          alt: s.name
        }
      )
    ] }) }),
    document.body
  ) : null;
}
function Te({ material: s, api: t, metadata: o }) {
  const [l, c] = r.useState(null), i = s.getBaseColorFactor(), m = s.getMetallicFactor(), d = s.getRoughnessFactor(), p = s.getEmissiveFactor(), u = s.getNormalScale(), j = s.getOcclusionStrength(), f = s.getAlphaMode(), x = s.getAlphaCutoff(), h = s.getDoubleSided(), y = r.useMemo(() => {
    const n = /* @__PURE__ */ new Map();
    if (o?.textures && Array.isArray(o.textures))
      for (const D of o.textures)
        n.set(D.slot, D);
    return n;
  }, [o]), A = s.getExtension("KHR_materials_clearcoat"), I = s.getExtension("KHR_materials_transmission"), S = s.getExtension("KHR_materials_ior"), M = s.getExtension("KHR_materials_sheen"), T = s.getExtension("KHR_materials_volume"), k = s.getExtension("KHR_materials_anisotropy"), E = s.getExtension("KHR_materials_iridescence"), w = s.getExtension("KHR_materials_specular"), F = s.getExtension("KHR_materials_emissive_strength"), O = s.getExtension("KHR_materials_dispersion"), _ = s.getExtension("KHR_materials_unlit"), U = r.useMemo(() => Se.filter(({ extension: n }) => {
    switch (n) {
      case a.Clearcoat:
        return !A;
      case a.Transmission:
        return !I;
      case a.IOR:
        return !S;
      case a.Sheen:
        return !M;
      case a.Volume:
        return !T;
      case a.Anisotropy:
        return !k;
      case a.Iridescence:
        return !E;
      case a.Specular:
        return !w;
      case a.EmissiveStrength:
        return !F;
      case a.Dispersion:
        return !O;
      case a.Unlit:
        return !_;
      default:
        return !1;
    }
  }), [A, I, S, M, T, k, E, w, F, O, _]), v = r.useCallback(
    (n) => {
      t.updateMaterialProperty(s, "baseColorFactor", n);
    },
    [s, t]
  ), W = r.useCallback(
    (n) => {
      t.updateMaterialProperty(s, "metallicFactor", n);
    },
    [s, t]
  ), ee = r.useCallback(
    (n) => {
      t.updateMaterialProperty(s, "roughnessFactor", n);
    },
    [s, t]
  ), se = r.useCallback(
    (n) => {
      t.updateMaterialProperty(s, "emissiveFactor", n);
    },
    [s, t]
  ), te = r.useCallback(
    (n) => {
      t.updateMaterialProperty(s, "normalScale", n);
    },
    [s, t]
  ), ne = r.useCallback(
    (n) => {
      t.updateMaterialProperty(s, "occlusionStrength", n);
    },
    [s, t]
  ), ae = r.useCallback(
    (n) => {
      t.updateMaterialProperty(s, "alphaMode", n);
    },
    [s, t]
  ), re = r.useCallback(
    (n) => {
      t.updateMaterialProperty(s, "alphaCutoff", n);
    },
    [s, t]
  ), oe = r.useCallback(
    (n) => {
      t.updateMaterialProperty(s, "doubleSided", n);
    },
    [s, t]
  ), le = r.useCallback(
    (n) => {
      const D = n.target.value;
      D && t.addMaterialExtension(s, D), n.target.value = "";
    },
    [s, t]
  ), N = r.useCallback(
    (n) => {
      t.removeMaterialExtension(s, n);
    },
    [s, t]
  );
  return /* @__PURE__ */ e.jsxs("div", { className: "material-editor", children: [
    l && /* @__PURE__ */ e.jsx(
      Me,
      {
        texture: l,
        onClose: () => c(null)
      }
    ),
    y.size > 0 && /* @__PURE__ */ e.jsxs(C, { title: "Textures", defaultOpen: !0, children: [
      /* @__PURE__ */ e.jsx(L, { label: "Base Color", texture: y.get("baseColor"), onPreview: c }),
      /* @__PURE__ */ e.jsx(L, { label: "Normal", texture: y.get("normal"), onPreview: c }),
      /* @__PURE__ */ e.jsx(L, { label: "Metallic/Roughness", texture: y.get("metallicRoughness"), onPreview: c }),
      /* @__PURE__ */ e.jsx(L, { label: "Occlusion", texture: y.get("occlusion"), onPreview: c }),
      /* @__PURE__ */ e.jsx(L, { label: "Emissive", texture: y.get("emissive"), onPreview: c })
    ] }),
    /* @__PURE__ */ e.jsxs(C, { title: "Base Properties", defaultOpen: !0, children: [
      /* @__PURE__ */ e.jsx(
        V,
        {
          label: "Base Color",
          value: i,
          onChange: v,
          includeAlpha: !0
        }
      ),
      /* @__PURE__ */ e.jsx(
        g,
        {
          label: "Metallic",
          value: m,
          onChange: W,
          min: 0,
          max: 1
        }
      ),
      /* @__PURE__ */ e.jsx(
        g,
        {
          label: "Roughness",
          value: d,
          onChange: ee,
          min: 0,
          max: 1
        }
      ),
      /* @__PURE__ */ e.jsx(
        V,
        {
          label: "Emissive",
          value: p,
          onChange: se
        }
      ),
      /* @__PURE__ */ e.jsx(
        g,
        {
          label: "Normal Scale",
          value: u,
          onChange: te,
          min: 0,
          max: 2
        }
      ),
      /* @__PURE__ */ e.jsx(
        g,
        {
          label: "Occlusion",
          value: j,
          onChange: ne,
          min: 0,
          max: 1
        }
      )
    ] }),
    /* @__PURE__ */ e.jsxs(C, { title: "Alpha", children: [
      /* @__PURE__ */ e.jsx(
        ve,
        {
          label: "Alpha Mode",
          value: f,
          options: Re,
          onChange: ae
        }
      ),
      f === "MASK" && /* @__PURE__ */ e.jsx(
        g,
        {
          label: "Alpha Cutoff",
          value: x,
          onChange: re,
          min: 0,
          max: 1
        }
      ),
      /* @__PURE__ */ e.jsx(
        je,
        {
          label: "Double Sided",
          value: h,
          onChange: oe
        }
      )
    ] }),
    A && /* @__PURE__ */ e.jsxs(C, { title: "Clear Coat", onRemove: () => N(a.Clearcoat), children: [
      /* @__PURE__ */ e.jsx(
        g,
        {
          label: "Factor",
          value: A.getClearcoatFactor(),
          onChange: (n) => t.updateMaterialProperty(s, "clearcoatFactor", n),
          min: 0,
          max: 1
        }
      ),
      /* @__PURE__ */ e.jsx(
        g,
        {
          label: "Roughness",
          value: A.getClearcoatRoughnessFactor(),
          onChange: (n) => t.updateMaterialProperty(s, "clearcoatRoughnessFactor", n),
          min: 0,
          max: 1
        }
      )
    ] }),
    I && /* @__PURE__ */ e.jsx(C, { title: "Transmission", onRemove: () => N(a.Transmission), children: /* @__PURE__ */ e.jsx(
      g,
      {
        label: "Factor",
        value: I.getTransmissionFactor(),
        onChange: (n) => t.updateMaterialProperty(s, "transmissionFactor", n),
        min: 0,
        max: 1
      }
    ) }),
    S && /* @__PURE__ */ e.jsx(C, { title: "Index of Refraction", onRemove: () => N(a.IOR), children: /* @__PURE__ */ e.jsx(
      g,
      {
        label: "IOR",
        value: S.getIOR(),
        onChange: (n) => t.updateMaterialProperty(s, "ior", n),
        min: 1,
        max: 3,
        step: 0.01
      }
    ) }),
    M && /* @__PURE__ */ e.jsxs(C, { title: "Sheen", onRemove: () => N(a.Sheen), children: [
      /* @__PURE__ */ e.jsx(
        V,
        {
          label: "Color",
          value: M.getSheenColorFactor(),
          onChange: (n) => t.updateMaterialProperty(s, "sheenColorFactor", n)
        }
      ),
      /* @__PURE__ */ e.jsx(
        g,
        {
          label: "Roughness",
          value: M.getSheenRoughnessFactor(),
          onChange: (n) => t.updateMaterialProperty(s, "sheenRoughnessFactor", n),
          min: 0,
          max: 1
        }
      )
    ] }),
    T && /* @__PURE__ */ e.jsx(C, { title: "Volume", onRemove: () => N(a.Volume), children: /* @__PURE__ */ e.jsx(
      g,
      {
        label: "Thickness",
        value: T.getThicknessFactor(),
        onChange: (n) => t.updateMaterialProperty(s, "thicknessFactor", n),
        min: 0,
        max: 100,
        step: 0.1
      }
    ) }),
    k && /* @__PURE__ */ e.jsxs(C, { title: "Anisotropy", onRemove: () => N(a.Anisotropy), children: [
      /* @__PURE__ */ e.jsx(
        g,
        {
          label: "Strength",
          value: k.getAnisotropyStrength(),
          onChange: (n) => t.updateMaterialProperty(s, "anisotropyStrength", n),
          min: 0,
          max: 1
        }
      ),
      /* @__PURE__ */ e.jsx(
        g,
        {
          label: "Rotation",
          value: k.getAnisotropyRotation(),
          onChange: (n) => t.updateMaterialProperty(s, "anisotropyRotation", n),
          min: 0,
          max: Math.PI * 2,
          step: 0.01
        }
      )
    ] }),
    E && /* @__PURE__ */ e.jsxs(C, { title: "Iridescence", onRemove: () => N(a.Iridescence), children: [
      /* @__PURE__ */ e.jsx(
        g,
        {
          label: "Factor",
          value: E.getIridescenceFactor(),
          onChange: (n) => t.updateMaterialProperty(s, "iridescenceFactor", n),
          min: 0,
          max: 1
        }
      ),
      /* @__PURE__ */ e.jsx(
        g,
        {
          label: "IOR",
          value: E.getIridescenceIOR(),
          onChange: (n) => t.updateMaterialProperty(s, "iridescenceIOR", n),
          min: 1,
          max: 3,
          step: 0.01
        }
      ),
      /* @__PURE__ */ e.jsx(
        g,
        {
          label: "Thickness Min (nm)",
          value: E.getIridescenceThicknessMinimum(),
          onChange: (n) => t.updateMaterialProperty(s, "iridescenceThicknessMinimum", n),
          min: 0,
          max: 1e3,
          step: 1
        }
      ),
      /* @__PURE__ */ e.jsx(
        g,
        {
          label: "Thickness Max (nm)",
          value: E.getIridescenceThicknessMaximum(),
          onChange: (n) => t.updateMaterialProperty(s, "iridescenceThicknessMaximum", n),
          min: 0,
          max: 1e3,
          step: 1
        }
      )
    ] }),
    w && /* @__PURE__ */ e.jsxs(C, { title: "Specular", onRemove: () => N(a.Specular), children: [
      /* @__PURE__ */ e.jsx(
        g,
        {
          label: "Factor",
          value: w.getSpecularFactor(),
          onChange: (n) => t.updateMaterialProperty(s, "specularFactor", n),
          min: 0,
          max: 1
        }
      ),
      /* @__PURE__ */ e.jsx(
        V,
        {
          label: "Color",
          value: w.getSpecularColorFactor(),
          onChange: (n) => t.updateMaterialProperty(s, "specularColorFactor", n)
        }
      )
    ] }),
    F && /* @__PURE__ */ e.jsx(C, { title: "Emissive Strength", onRemove: () => N(a.EmissiveStrength), children: /* @__PURE__ */ e.jsx(
      g,
      {
        label: "Strength",
        value: F.getEmissiveStrength(),
        onChange: (n) => t.updateMaterialProperty(s, "emissiveStrength", n),
        min: 0,
        max: 100,
        step: 0.1
      }
    ) }),
    O && /* @__PURE__ */ e.jsx(C, { title: "Dispersion", onRemove: () => N(a.Dispersion), children: /* @__PURE__ */ e.jsx(
      g,
      {
        label: "Dispersion",
        value: O.getDispersion(),
        onChange: (n) => t.updateMaterialProperty(s, "dispersion", n),
        min: 0,
        max: 1,
        step: 0.01
      }
    ) }),
    _ && /* @__PURE__ */ e.jsx(C, { title: "Unlit", onRemove: () => N(a.Unlit), children: /* @__PURE__ */ e.jsx("p", { className: "property-section-note", children: "Disables PBR shading. No properties." }) }),
    U.length > 0 && /* @__PURE__ */ e.jsx(C, { title: "Extensions", defaultOpen: !1, children: /* @__PURE__ */ e.jsxs(
      "select",
      {
        className: "ui-select-input-select",
        onChange: le,
        defaultValue: "",
        children: [
          /* @__PURE__ */ e.jsx("option", { value: "", disabled: !0, children: "Add extension..." }),
          U.map(({ extension: n, label: D }) => /* @__PURE__ */ e.jsx("option", { value: n, children: D }, n))
        ]
      }
    ) })
  ] });
}
function Ee({ light: s, api: t }) {
  const o = s.getType(), l = s.getIntensity(), c = s.getColor(), i = s.getRange() ?? 0, m = b.radToDeg(s.getInnerConeAngle() ?? 0), d = b.radToDeg(s.getOuterConeAngle() ?? Math.PI / 4), p = r.useCallback(
    (h) => {
      t.updateLightProperty(s, "color", h.slice(0, 3));
    },
    [s, t]
  ), u = r.useCallback(
    (h) => {
      t.updateLightProperty(s, "intensity", h);
    },
    [s, t]
  ), j = r.useCallback(
    (h) => {
      t.updateLightProperty(s, "range", h || null);
    },
    [s, t]
  ), f = r.useCallback(
    (h) => {
      t.updateLightProperty(s, "innerConeAngle", b.degToRad(h));
    },
    [s, t]
  ), x = r.useCallback(
    (h) => {
      t.updateLightProperty(s, "outerConeAngle", b.degToRad(h));
    },
    [s, t]
  );
  return /* @__PURE__ */ e.jsx("div", { className: "light-editor", children: /* @__PURE__ */ e.jsx("div", { className: "property-section", children: /* @__PURE__ */ e.jsxs("div", { className: "property-section-content", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "editor-info", children: [
      /* @__PURE__ */ e.jsx("span", { className: "editor-info-label", children: "Type" }),
      /* @__PURE__ */ e.jsx("span", { className: "editor-info-value", children: o })
    ] }),
    /* @__PURE__ */ e.jsx(V, { label: "Color", value: c, onChange: p }),
    /* @__PURE__ */ e.jsx(
      g,
      {
        label: "Intensity",
        value: l,
        onChange: u,
        min: 0,
        max: 1e3,
        step: 1
      }
    ),
    (o === "point" || o === "spot") && /* @__PURE__ */ e.jsx(
      g,
      {
        label: "Range",
        value: i,
        onChange: j,
        min: 0,
        max: 1e3,
        step: 1
      }
    ),
    o === "spot" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      /* @__PURE__ */ e.jsx(
        g,
        {
          label: "Inner Cone",
          value: m,
          onChange: f,
          min: 0,
          max: 90,
          step: 1
        }
      ),
      /* @__PURE__ */ e.jsx(
        g,
        {
          label: "Outer Cone",
          value: d,
          onChange: x,
          min: 0,
          max: 90,
          step: 1
        }
      )
    ] })
  ] }) }) });
}
const B = new G(), Y = new Q();
function Pe(s) {
  return Y.set(s[0], s[1], s[2], s[3]), B.setFromQuaternion(Y, "XYZ"), [
    b.radToDeg(B.x),
    b.radToDeg(B.y),
    b.radToDeg(B.z)
  ];
}
function Ae({ node: s, api: t }) {
  const o = s.getTranslation(), l = Pe(s.getRotation()), c = s.getScale(), i = r.useCallback(
    (p) => {
      t.updateNodeTransform(s, "translation", p);
    },
    [s, t]
  ), m = r.useCallback(
    (p) => {
      t.updateNodeTransform(s, "rotation", p);
    },
    [s, t]
  ), d = r.useCallback(
    (p) => {
      t.updateNodeTransform(s, "scale", p);
    },
    [s, t]
  );
  return /* @__PURE__ */ e.jsxs("div", { className: "node-editor property-section-content", children: [
    /* @__PURE__ */ e.jsx(
      P,
      {
        label: "Translation",
        value: o,
        onChange: i,
        step: 0.1
      }
    ),
    /* @__PURE__ */ e.jsx(
      P,
      {
        label: "Rotation",
        value: l,
        onChange: m,
        step: 1
      }
    ),
    /* @__PURE__ */ e.jsx(
      P,
      {
        label: "Scale",
        value: c,
        onChange: d,
        step: 0.1
      }
    )
  ] });
}
const K = new G(), q = new Q();
function ke({ node: s, api: t }) {
  const o = s.getTranslation(), l = s.getRotation(), c = s.getScale(), i = [0, 0, 0];
  l && (q.set(l[0], l[1], l[2], l[3]), K.setFromQuaternion(q, "XYZ"), i[0] = b.radToDeg(K.x), i[1] = b.radToDeg(K.y), i[2] = b.radToDeg(K.z));
  const m = r.useCallback(
    (u) => {
      t.updateNodeTransform(s, "translation", u);
    },
    [s, t]
  ), d = r.useCallback(
    (u) => {
      t.updateNodeTransform(s, "rotation", u);
    },
    [s, t]
  ), p = r.useCallback(
    (u) => {
      t.updateNodeTransform(s, "scale", u);
    },
    [s, t]
  );
  return /* @__PURE__ */ e.jsx("div", { className: "armature-editor", children: /* @__PURE__ */ e.jsx("div", { className: "property-section", children: /* @__PURE__ */ e.jsxs("div", { className: "property-section-content", children: [
    /* @__PURE__ */ e.jsx(
      P,
      {
        label: "Position",
        value: o,
        onChange: m,
        step: 0.01
      }
    ),
    /* @__PURE__ */ e.jsx(
      P,
      {
        label: "Rotation",
        value: i,
        onChange: d,
        step: 1
      }
    ),
    /* @__PURE__ */ e.jsx(
      P,
      {
        label: "Scale",
        value: c,
        onChange: p,
        step: 0.01
      }
    )
  ] }) }) });
}
const H = new G(), Z = new Q();
function Ie({ node: s, api: t }) {
  const o = s.getTranslation(), l = s.getRotation(), c = s.getScale(), i = [0, 0, 0];
  l && (Z.set(l[0], l[1], l[2], l[3]), H.setFromQuaternion(Z, "XYZ"), i[0] = b.radToDeg(H.x), i[1] = b.radToDeg(H.y), i[2] = b.radToDeg(H.z));
  const m = r.useCallback(
    (u) => {
      t.updateNodeTransform(s, "translation", u);
    },
    [s, t]
  ), d = r.useCallback(
    (u) => {
      t.updateNodeTransform(s, "rotation", u);
    },
    [s, t]
  ), p = r.useCallback(
    (u) => {
      t.updateNodeTransform(s, "scale", u);
    },
    [s, t]
  );
  return /* @__PURE__ */ e.jsx("div", { className: "bone-editor", children: /* @__PURE__ */ e.jsx("div", { className: "property-section", children: /* @__PURE__ */ e.jsxs("div", { className: "property-section-content", children: [
    /* @__PURE__ */ e.jsx(
      P,
      {
        label: "Position",
        value: o,
        onChange: m,
        step: 0.01
      }
    ),
    /* @__PURE__ */ e.jsx(
      P,
      {
        label: "Rotation",
        value: i,
        onChange: d,
        step: 1
      }
    ),
    /* @__PURE__ */ e.jsx(
      P,
      {
        label: "Scale",
        value: c,
        onChange: p,
        step: 0.01
      }
    )
  ] }) }) });
}
function we({ mesh: s, metadata: t }) {
  const o = t?.triangleCount, l = s.listPrimitives().length;
  let c = 0;
  for (const i of s.listPrimitives()) {
    const m = i.getAttribute("POSITION");
    m && (c += m.getCount());
  }
  return /* @__PURE__ */ e.jsxs("div", { className: "mesh-editor property-section-content", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "editor-info", children: [
      /* @__PURE__ */ e.jsx("span", { className: "editor-info-label", children: "Triangles" }),
      /* @__PURE__ */ e.jsx("span", { className: "editor-info-value", children: o?.toLocaleString() ?? "N/A" })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "editor-info", children: [
      /* @__PURE__ */ e.jsx("span", { className: "editor-info-label", children: "Vertices" }),
      /* @__PURE__ */ e.jsx("span", { className: "editor-info-value", children: c.toLocaleString() })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "editor-info", children: [
      /* @__PURE__ */ e.jsx("span", { className: "editor-info-label", children: "Primitives" }),
      /* @__PURE__ */ e.jsx("span", { className: "editor-info-value", children: l })
    ] })
  ] });
}
function De({ selectedNode: s, api: t }) {
  if (!s)
    return /* @__PURE__ */ e.jsx("div", { className: "property-editor property-editor-empty", children: /* @__PURE__ */ e.jsx("div", { className: "empty-state", children: /* @__PURE__ */ e.jsx("span", { className: "empty-state-text", children: "Select an object in the scene graph to view its properties" }) }) });
  const o = () => {
    switch (s.type) {
      case "material":
        return /* @__PURE__ */ e.jsx(Te, { material: s.gltfRef, api: t, metadata: s.metadata });
      case "mesh":
        return /* @__PURE__ */ e.jsx(we, { mesh: s.gltfRef, metadata: s.metadata });
      case "light":
        return /* @__PURE__ */ e.jsx(Ee, { light: s.gltfRef, api: t });
      case "node":
        return /* @__PURE__ */ e.jsx(Ae, { node: s.gltfRef, api: t });
      case "armature":
        return /* @__PURE__ */ e.jsx(ke, { node: s.gltfRef, api: t });
      case "bone":
        return /* @__PURE__ */ e.jsx(Ie, { node: s.gltfRef, api: t });
      case "scene":
        return /* @__PURE__ */ e.jsx("div", { className: "property-editor-info", children: /* @__PURE__ */ e.jsx("div", { className: "info-state", children: /* @__PURE__ */ e.jsx("span", { className: "info-state-text", children: "Select a node to inspect its properties." }) }) });
      case "camera":
        return /* @__PURE__ */ e.jsx("div", { className: "property-editor-info", children: /* @__PURE__ */ e.jsx("div", { className: "info-state", children: /* @__PURE__ */ e.jsx("span", { className: "info-state-text", children: "Camera properties are not supported." }) }) });
      default:
        return null;
    }
  };
  return /* @__PURE__ */ e.jsxs("div", { className: "property-editor", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "property-editor-header", children: [
      /* @__PURE__ */ e.jsx("span", { className: "property-editor-name", children: s.name }),
      /* @__PURE__ */ e.jsx("span", { className: "property-editor-type", children: s.type })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "property-editor-content", children: o() })
  ] });
}
function Fe(s, t = 40) {
  const [o, l] = r.useState(t), [c, i] = r.useState(!1), m = r.useCallback((d) => {
    d.preventDefault(), i(!0);
  }, []);
  return r.useEffect(() => {
    if (!c) return;
    const d = (u) => {
      const j = s.current;
      if (!j) return;
      const f = j.getBoundingClientRect(), x = (u.clientY - f.top) / f.height * 100;
      l(Math.max(20, Math.min(80, x)));
    }, p = () => i(!1);
    return document.addEventListener("mousemove", d), document.addEventListener("mouseup", p), () => {
      document.removeEventListener("mousemove", d), document.removeEventListener("mouseup", p);
    };
  }, [c, s]), { splitPercent: o, isDragging: c, handleMouseDown: m };
}
function Le({ className: s = "", modelId: t, blob: o, bundle: l, hasModifiedBlob: c, onBlobChange: i, onReset: m, onStatsChange: d, onAnimationsChange: p, onBlendShapesChange: u, onWarningsChange: j, onClose: f }) {
  const x = r.useMemo(() => new ie(), []), [h, y] = r.useState(x.getState()), [A, I] = r.useState(!1), S = r.useRef(null), M = r.useRef(null), T = r.useRef(!1), k = r.useRef(null), { splitPercent: E, isDragging: w, handleMouseDown: F } = Fe(k);
  r.useEffect(() => (x.setOnStateChange(y), () => x.setOnStateChange(null)), [x]), r.useEffect(() => {
    if (!o || !t) {
      x.clear(), M.current = null, S.current = null, T.current = !1;
      return;
    }
    S.current === o && t === M.current || T.current || (T.current = !0, M.current = t, S.current = o, x.loadBlob(o, l ?? void 0).finally(() => {
      T.current = !1;
    }));
  }, [o, t, x, l]), r.useEffect(() => {
    if (!h.document) {
      d?.(null), p?.([]), u?.([]), j?.([]);
      return;
    }
    if (d)
      if (h.sceneGraph?.metadata?.stats) {
        const v = h.sceneGraph.metadata.stats;
        d({
          meshes: v.meshes,
          materials: v.materials,
          textures: v.textures,
          triangles: v.triangles,
          geometryVRAM: v.geometryVRAM,
          textureVRAM: v.textureVRAM
        });
      } else
        d(null);
    p && p(x.getAnimationTracks()), u && u(x.getBlendShapes()), j && j(x.getWarnings());
  }, [h.document, h.sceneGraph, d, p, u, j, x]);
  const O = r.useCallback(async () => {
    I(!0);
    try {
      const v = await x.applyChanges();
      i && (S.current = v, await i(v));
    } catch (v) {
      console.error("Failed to apply changes:", v);
    } finally {
      I(!1);
    }
  }, [x, i]), _ = r.useCallback(async () => {
    try {
      await x.reset();
      const v = x.getState().originalBlob;
      v && (S.current = v), m ? await m() : i && v && await i(v);
    } catch (v) {
      console.error("Failed to reset:", v);
    }
  }, [x, i, m]), U = r.useCallback(
    (v) => {
      x.selectNode(v);
    },
    [x]
  );
  return /* @__PURE__ */ e.jsxs("div", { className: `inspector-panel ${s}`, children: [
    /* @__PURE__ */ e.jsxs("div", { className: "inspector-panel-header", children: [
      /* @__PURE__ */ e.jsx("h2", { className: "inspector-panel-title", children: "Inspector" }),
      f && /* @__PURE__ */ e.jsx(
        "button",
        {
          type: "button",
          className: "inspector-panel-close",
          onClick: f,
          "aria-label": "Close inspector",
          children: /* @__PURE__ */ e.jsxs("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
            /* @__PURE__ */ e.jsx("line", { x1: "3", y1: "3", x2: "11", y2: "11" }),
            /* @__PURE__ */ e.jsx("line", { x1: "11", y1: "3", x2: "3", y2: "11" })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ e.jsxs("div", { ref: k, className: `inspector-panel-body${w ? " is-resizing" : ""}`, children: [
      /* @__PURE__ */ e.jsxs("div", { className: "inspector-panel-section scene-tree-section", style: { flex: `0 0 ${E}%` }, children: [
        /* @__PURE__ */ e.jsx("div", { className: "section-header", children: "Scene Graph" }),
        /* @__PURE__ */ e.jsx(
          Ne,
          {
            sceneGraph: h.sceneGraph,
            selectedNode: h.selectedNode,
            selectNode: U,
            isLoading: h.isLoading,
            error: h.error
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "inspector-panel-divider", onMouseDown: F, children: /* @__PURE__ */ e.jsx("div", { className: "inspector-panel-divider-handle" }) }),
      /* @__PURE__ */ e.jsxs("div", { className: "inspector-panel-section property-editor-section", children: [
        /* @__PURE__ */ e.jsx("div", { className: "section-header", children: "Properties" }),
        /* @__PURE__ */ e.jsx(De, { selectedNode: h.selectedNode, api: x })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "inspector-panel-footer", children: [
      /* @__PURE__ */ e.jsx(
        "button",
        {
          type: "button",
          className: "inspector-button inspector-button-secondary",
          onClick: _,
          disabled: !h.document || h.isLoading || !c,
          children: "Reset"
        }
      ),
      /* @__PURE__ */ e.jsx(
        "button",
        {
          type: "button",
          className: "inspector-button inspector-button-primary",
          onClick: O,
          disabled: !h.isDirty || h.isLoading || A,
          children: A ? "Applying..." : "Apply Changes"
        }
      )
    ] })
  ] });
}
export {
  $ as AlphaMode,
  ie as InspectorAPI,
  Le as InspectorPanel,
  a as MaterialExtension,
  Be as SceneGraphNodeType
};
