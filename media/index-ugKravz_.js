import { formatBytes as _, MaterialExtension as g, InspectorAPI as ee } from "./index-724CYdI7.js";
import { SceneGraphNodeType as Ie } from "./index-724CYdI7.js";
import { el as e, em as n, en as se, eo as te, ep as ne, eq as ae, er as re, es as le, et as oe, eu as ce, ev as Q, ew as O, ex as v, ey as ie, ez as ue, eA as de, eB as he, cu as f, eC as R, a2 as K, cL as G } from "./index-1fHvDm8K.js";
function pe({ stats: s }) {
  const t = [];
  return s.meshes > 0 && t.push({ label: "Meshes", value: s.meshes }), s.materials > 0 && t.push({ label: "Materials", value: s.materials }), s.textures > 0 && t.push({ label: "Textures", value: s.textures }), s.triangles > 0 && t.push({ label: "Triangles", value: s.triangles.toLocaleString() }), s.geometryVRAM > 0 && t.push({ label: "Geometry VRAM", value: _(s.geometryVRAM) }), s.textureVRAM > 0 && t.push({ label: "Texture VRAM", value: _(s.textureVRAM) }), t.length === 0 ? null : /* @__PURE__ */ e.jsx("div", { className: "node-stats-tooltip", children: t.map(({ label: a, value: l }) => /* @__PURE__ */ e.jsxs("div", { className: "node-stats-row", children: [
    /* @__PURE__ */ e.jsx("span", { className: "node-stats-label", children: a }),
    /* @__PURE__ */ e.jsx("span", { className: "node-stats-value", children: l })
  ] }, a)) });
}
const xe = n.memo(function s({ node: t, depth: a, selectedNode: l, selectNode: c }) {
  const [o, m] = n.useState(a < 2), u = t.children.length > 0, h = l?.id === t.id, d = t.metadata?.stats, C = n.useCallback(
    (j) => {
      j.stopPropagation(), m((y) => !y);
    },
    []
  ), i = n.useCallback(() => {
    c(t.id);
  }, [c, t.id]), p = d ? /* @__PURE__ */ e.jsx(pe, { stats: d }) : null;
  return /* @__PURE__ */ e.jsxs("div", { className: "tree-node", children: [
    /* @__PURE__ */ e.jsx(se, { content: p, className: "node-stats-tooltip", children: /* @__PURE__ */ e.jsxs(
      "div",
      {
        className: `tree-node-row ${h ? "selected" : ""}`,
        style: { paddingLeft: `${a * 12 + 6}px` },
        onClick: i,
        role: "treeitem",
        "aria-selected": h,
        "aria-expanded": u ? o : void 0,
        children: [
          u ? /* @__PURE__ */ e.jsx(
            "button",
            {
              type: "button",
              className: "tree-node-toggle",
              onClick: C,
              "aria-label": o ? "Collapse" : "Expand",
              children: o ? "▼" : "▶"
            }
          ) : /* @__PURE__ */ e.jsx("span", { className: "tree-node-toggle-placeholder" }),
          /* @__PURE__ */ e.jsxs("span", { className: "tree-node-icon", role: "img", "aria-label": t.type, children: [
            t.type === "mesh" && /* @__PURE__ */ e.jsx(te, {}),
            t.type === "light" && /* @__PURE__ */ e.jsx(ne, {}),
            t.type === "camera" && /* @__PURE__ */ e.jsx(ae, {}),
            t.type === "armature" && /* @__PURE__ */ e.jsx(re, {}),
            t.type === "bone" && /* @__PURE__ */ e.jsx(le, {}),
            t.type === "material" && /* @__PURE__ */ e.jsx(oe, {}),
            (t.type === "node" || t.type === "scene") && (u ? /* @__PURE__ */ e.jsx(ce, {}) : /* @__PURE__ */ e.jsx(Q, {})),
            !["mesh", "light", "camera", "armature", "bone", "material", "node", "scene"].includes(t.type) && /* @__PURE__ */ e.jsx(Q, {})
          ] }),
          /* @__PURE__ */ e.jsx("span", { className: "tree-node-name", children: t.name })
        ]
      }
    ) }),
    u && o && /* @__PURE__ */ e.jsx("div", { className: "tree-node-children", role: "group", children: t.children.map((j) => /* @__PURE__ */ e.jsx(
      s,
      {
        node: j,
        depth: a + 1,
        selectedNode: l,
        selectNode: c
      },
      j.id
    )) })
  ] });
});
function me({ sceneGraph: s, selectedNode: t, selectNode: a, isLoading: l, error: c }) {
  return l ? /* @__PURE__ */ e.jsx("div", { className: "scene-tree scene-tree-loading", children: /* @__PURE__ */ e.jsx("span", { className: "loading-text", children: "Loading..." }) }) : c ? /* @__PURE__ */ e.jsx("div", { className: "scene-tree scene-tree-error", children: /* @__PURE__ */ e.jsx("span", { className: "error-text", children: c }) }) : s ? /* @__PURE__ */ e.jsx("div", { className: "scene-tree", role: "tree", "aria-label": "Scene graph", children: /* @__PURE__ */ e.jsx(xe, { node: s, depth: 0, selectedNode: t, selectNode: a }) }) : /* @__PURE__ */ e.jsx("div", { className: "scene-tree scene-tree-empty", children: /* @__PURE__ */ e.jsx("span", { className: "empty-text", children: "No model loaded" }) });
}
var D = /* @__PURE__ */ ((s) => (s.OPAQUE = "OPAQUE", s.MASK = "MASK", s.BLEND = "BLEND", s))(D || {});
const ge = [
  { value: D.OPAQUE, label: "Opaque" },
  { value: D.MASK, label: "Mask" },
  { value: D.BLEND, label: "Blend" }
], P = {
  [g.Clearcoat]: "Clear Coat",
  [g.Transmission]: "Transmission",
  [g.IOR]: "IOR",
  [g.Sheen]: "Sheen",
  [g.Volume]: "Volume"
}, je = [
  { extension: g.Clearcoat, label: P[g.Clearcoat] },
  { extension: g.Transmission, label: P[g.Transmission] },
  { extension: g.IOR, label: P[g.IOR] },
  { extension: g.Sheen, label: P[g.Sheen] },
  { extension: g.Volume, label: P[g.Volume] }
];
function T({
  title: s,
  children: t,
  defaultOpen: a = !0
}) {
  return /* @__PURE__ */ e.jsxs("details", { className: "property-section", open: a, children: [
    /* @__PURE__ */ e.jsx("summary", { className: "property-section-header", children: s }),
    /* @__PURE__ */ e.jsx("div", { className: "property-section-content", children: t })
  ] });
}
function w({
  label: s,
  texture: t,
  onPreview: a
}) {
  if (!t) return null;
  const l = () => {
    t.previewUrl && a && a(t);
  };
  return /* @__PURE__ */ e.jsxs(
    "div",
    {
      className: `texture-slot ${t.previewUrl ? "texture-slot--clickable" : "texture-slot--no-preview"}`,
      onClick: l,
      children: [
        /* @__PURE__ */ e.jsx("div", { className: "texture-slot-thumbnail", children: t.previewUrl ? /* @__PURE__ */ e.jsx("img", { src: t.previewUrl, alt: s }) : /* @__PURE__ */ e.jsx(he, { className: "texture-slot-thumbnail-icon" }) }),
        /* @__PURE__ */ e.jsx("span", { className: "texture-slot-label", children: s }),
        /* @__PURE__ */ e.jsx("span", { className: "texture-slot-format", children: t.mimeType.replace("image/", "").toUpperCase() }),
        /* @__PURE__ */ e.jsx("span", { className: "texture-slot-size", children: t.width && t.height && `${t.width}×${t.height}` }),
        /* @__PURE__ */ e.jsx("span", { className: "texture-slot-vram", children: _(t.vram) })
      ]
    }
  );
}
function ve({
  texture: s,
  onClose: t
}) {
  return s.previewUrl ? de.createPortal(
    /* @__PURE__ */ e.jsx("div", { className: "texture-preview-overlay", onClick: t, children: /* @__PURE__ */ e.jsxs("div", { className: "texture-preview-modal", onClick: (a) => a.stopPropagation(), children: [
      /* @__PURE__ */ e.jsxs("div", { className: "texture-preview-info", children: [
        /* @__PURE__ */ e.jsx("span", { className: "texture-preview-info-name", children: s.name }),
        /* @__PURE__ */ e.jsx("span", { className: "texture-preview-info-format", children: s.mimeType.replace("image/", "").toUpperCase() }),
        /* @__PURE__ */ e.jsxs("span", { className: "texture-preview-info-size", children: [
          s.width,
          "×",
          s.height
        ] }),
        /* @__PURE__ */ e.jsx("span", { className: "texture-preview-info-vram", children: _(s.vram) })
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
function fe({ material: s, api: t, metadata: a }) {
  const [l, c] = n.useState(null), o = s.getBaseColorFactor(), m = s.getMetallicFactor(), u = s.getRoughnessFactor(), h = s.getEmissiveFactor(), d = s.getNormalScale(), C = s.getOcclusionStrength(), i = s.getAlphaMode(), p = s.getAlphaCutoff(), j = s.getDoubleSided(), y = n.useMemo(() => {
    const r = /* @__PURE__ */ new Map();
    if (a?.textures && Array.isArray(a.textures))
      for (const E of a.textures)
        r.set(E.slot, E);
    return r;
  }, [a]), M = s.getExtension("KHR_materials_clearcoat"), b = s.getExtension("KHR_materials_transmission"), S = s.getExtension("KHR_materials_ior"), N = s.getExtension("KHR_materials_sheen"), A = s.getExtension("KHR_materials_volume"), k = n.useMemo(() => je.filter(({ extension: r }) => {
    switch (r) {
      case g.Clearcoat:
        return !M;
      case g.Transmission:
        return !b;
      case g.IOR:
        return !S;
      case g.Sheen:
        return !N;
      case g.Volume:
        return !A;
      default:
        return !1;
    }
  }), [M, b, S, N, A]), V = n.useCallback(
    (r) => {
      t.updateMaterialProperty(s, "baseColorFactor", r);
    },
    [s, t]
  ), B = n.useCallback(
    (r) => {
      t.updateMaterialProperty(s, "metallicFactor", r);
    },
    [s, t]
  ), U = n.useCallback(
    (r) => {
      t.updateMaterialProperty(s, "roughnessFactor", r);
    },
    [s, t]
  ), $ = n.useCallback(
    (r) => {
      t.updateMaterialProperty(s, "emissiveFactor", r);
    },
    [s, t]
  ), z = n.useCallback(
    (r) => {
      t.updateMaterialProperty(s, "normalScale", r);
    },
    [s, t]
  ), x = n.useCallback(
    (r) => {
      t.updateMaterialProperty(s, "occlusionStrength", r);
    },
    [s, t]
  ), q = n.useCallback(
    (r) => {
      t.updateMaterialProperty(s, "alphaMode", r);
    },
    [s, t]
  ), Z = n.useCallback(
    (r) => {
      t.updateMaterialProperty(s, "alphaCutoff", r);
    },
    [s, t]
  ), W = n.useCallback(
    (r) => {
      t.updateMaterialProperty(s, "doubleSided", r);
    },
    [s, t]
  ), J = n.useCallback(
    (r) => {
      const E = r.target.value;
      E && t.addMaterialExtension(s, E), r.target.value = "";
    },
    [s, t]
  );
  return /* @__PURE__ */ e.jsxs("div", { className: "material-editor", children: [
    l && /* @__PURE__ */ e.jsx(
      ve,
      {
        texture: l,
        onClose: () => c(null)
      }
    ),
    y.size > 0 && /* @__PURE__ */ e.jsxs(T, { title: "Textures", defaultOpen: !0, children: [
      /* @__PURE__ */ e.jsx(w, { label: "Base Color", texture: y.get("baseColor"), onPreview: c }),
      /* @__PURE__ */ e.jsx(w, { label: "Normal", texture: y.get("normal"), onPreview: c }),
      /* @__PURE__ */ e.jsx(w, { label: "Metallic/Roughness", texture: y.get("metallicRoughness"), onPreview: c }),
      /* @__PURE__ */ e.jsx(w, { label: "Occlusion", texture: y.get("occlusion"), onPreview: c }),
      /* @__PURE__ */ e.jsx(w, { label: "Emissive", texture: y.get("emissive"), onPreview: c })
    ] }),
    /* @__PURE__ */ e.jsxs(T, { title: "Base Properties", defaultOpen: !0, children: [
      /* @__PURE__ */ e.jsx(
        O,
        {
          label: "Base Color",
          value: o,
          onChange: V,
          includeAlpha: !0
        }
      ),
      /* @__PURE__ */ e.jsx(
        v,
        {
          label: "Metallic",
          value: m,
          onChange: B,
          min: 0,
          max: 1
        }
      ),
      /* @__PURE__ */ e.jsx(
        v,
        {
          label: "Roughness",
          value: u,
          onChange: U,
          min: 0,
          max: 1
        }
      ),
      /* @__PURE__ */ e.jsx(
        O,
        {
          label: "Emissive",
          value: h,
          onChange: $
        }
      ),
      /* @__PURE__ */ e.jsx(
        v,
        {
          label: "Normal Scale",
          value: d,
          onChange: z,
          min: 0,
          max: 2
        }
      ),
      /* @__PURE__ */ e.jsx(
        v,
        {
          label: "Occlusion",
          value: C,
          onChange: x,
          min: 0,
          max: 1
        }
      )
    ] }),
    /* @__PURE__ */ e.jsxs(T, { title: "Alpha", children: [
      /* @__PURE__ */ e.jsx(
        ie,
        {
          label: "Alpha Mode",
          value: i,
          options: ge,
          onChange: q
        }
      ),
      i === "MASK" && /* @__PURE__ */ e.jsx(
        v,
        {
          label: "Alpha Cutoff",
          value: p,
          onChange: Z,
          min: 0,
          max: 1
        }
      ),
      /* @__PURE__ */ e.jsx(
        ue,
        {
          label: "Double Sided",
          value: j,
          onChange: W
        }
      )
    ] }),
    M && /* @__PURE__ */ e.jsxs(T, { title: "Clear Coat", children: [
      /* @__PURE__ */ e.jsx(
        v,
        {
          label: "Factor",
          value: M.getClearcoatFactor(),
          onChange: (r) => t.updateMaterialProperty(s, "clearcoatFactor", r),
          min: 0,
          max: 1
        }
      ),
      /* @__PURE__ */ e.jsx(
        v,
        {
          label: "Roughness",
          value: M.getClearcoatRoughnessFactor(),
          onChange: (r) => t.updateMaterialProperty(s, "clearcoatRoughnessFactor", r),
          min: 0,
          max: 1
        }
      )
    ] }),
    b && /* @__PURE__ */ e.jsx(T, { title: "Transmission", children: /* @__PURE__ */ e.jsx(
      v,
      {
        label: "Factor",
        value: b.getTransmissionFactor(),
        onChange: (r) => t.updateMaterialProperty(s, "transmissionFactor", r),
        min: 0,
        max: 1
      }
    ) }),
    S && /* @__PURE__ */ e.jsx(T, { title: "Index of Refraction", children: /* @__PURE__ */ e.jsx(
      v,
      {
        label: "IOR",
        value: S.getIOR(),
        onChange: (r) => t.updateMaterialProperty(s, "ior", r),
        min: 1,
        max: 3,
        step: 0.01
      }
    ) }),
    N && /* @__PURE__ */ e.jsxs(T, { title: "Sheen", children: [
      /* @__PURE__ */ e.jsx(
        O,
        {
          label: "Color",
          value: N.getSheenColorFactor(),
          onChange: (r) => t.updateMaterialProperty(s, "sheenColorFactor", r)
        }
      ),
      /* @__PURE__ */ e.jsx(
        v,
        {
          label: "Roughness",
          value: N.getSheenRoughnessFactor(),
          onChange: (r) => t.updateMaterialProperty(s, "sheenRoughnessFactor", r),
          min: 0,
          max: 1
        }
      )
    ] }),
    A && /* @__PURE__ */ e.jsx(T, { title: "Volume", children: /* @__PURE__ */ e.jsx(
      v,
      {
        label: "Thickness",
        value: A.getThicknessFactor(),
        onChange: (r) => t.updateMaterialProperty(s, "thicknessFactor", r),
        min: 0,
        max: 100,
        step: 0.1
      }
    ) }),
    k.length > 0 && /* @__PURE__ */ e.jsx(T, { title: "Extensions", defaultOpen: !1, children: /* @__PURE__ */ e.jsxs(
      "select",
      {
        className: "ui-select-input-select",
        onChange: J,
        defaultValue: "",
        children: [
          /* @__PURE__ */ e.jsx("option", { value: "", disabled: !0, children: "Add extension..." }),
          k.map(({ extension: r, label: E }) => /* @__PURE__ */ e.jsx("option", { value: r, children: E }, r))
        ]
      }
    ) })
  ] });
}
function Ce({ light: s, api: t }) {
  const a = s.getType(), l = s.getIntensity(), c = s.getColor(), o = s.getRange() ?? 0, m = f.radToDeg(s.getInnerConeAngle() ?? 0), u = f.radToDeg(s.getOuterConeAngle() ?? Math.PI / 4), h = n.useCallback(
    (j) => {
      t.updateLightProperty(s, "color", j.slice(0, 3));
    },
    [s, t]
  ), d = n.useCallback(
    (j) => {
      t.updateLightProperty(s, "intensity", j);
    },
    [s, t]
  ), C = n.useCallback(
    (j) => {
      t.updateLightProperty(s, "range", j || null);
    },
    [s, t]
  ), i = n.useCallback(
    (j) => {
      t.updateLightProperty(s, "innerConeAngle", f.degToRad(j));
    },
    [s, t]
  ), p = n.useCallback(
    (j) => {
      t.updateLightProperty(s, "outerConeAngle", f.degToRad(j));
    },
    [s, t]
  );
  return /* @__PURE__ */ e.jsx("div", { className: "light-editor", children: /* @__PURE__ */ e.jsx("div", { className: "property-section", children: /* @__PURE__ */ e.jsxs("div", { className: "property-section-content", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "editor-info", children: [
      /* @__PURE__ */ e.jsx("span", { className: "editor-info-label", children: "Type" }),
      /* @__PURE__ */ e.jsx("span", { className: "editor-info-value", children: a })
    ] }),
    /* @__PURE__ */ e.jsx(O, { label: "Color", value: c, onChange: h }),
    /* @__PURE__ */ e.jsx(
      v,
      {
        label: "Intensity",
        value: l,
        onChange: d,
        min: 0,
        max: 1e3,
        step: 1
      }
    ),
    (a === "point" || a === "spot") && /* @__PURE__ */ e.jsx(
      v,
      {
        label: "Range",
        value: o,
        onChange: C,
        min: 0,
        max: 1e3,
        step: 1
      }
    ),
    a === "spot" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      /* @__PURE__ */ e.jsx(
        v,
        {
          label: "Inner Cone",
          value: m,
          onChange: i,
          min: 0,
          max: 90,
          step: 1
        }
      ),
      /* @__PURE__ */ e.jsx(
        v,
        {
          label: "Outer Cone",
          value: u,
          onChange: p,
          min: 0,
          max: 90,
          step: 1
        }
      )
    ] })
  ] }) }) });
}
const I = new G(), H = new K();
function ye(s) {
  return H.set(s[0], s[1], s[2], s[3]), I.setFromQuaternion(H, "XYZ"), [
    f.radToDeg(I.x),
    f.radToDeg(I.y),
    f.radToDeg(I.z)
  ];
}
function be({ node: s, api: t }) {
  const a = s.getTranslation(), l = ye(s.getRotation()), c = s.getScale(), o = n.useCallback(
    (h) => {
      t.updateNodeTransform(s, "translation", h);
    },
    [s, t]
  ), m = n.useCallback(
    (h) => {
      t.updateNodeTransform(s, "rotation", h);
    },
    [s, t]
  ), u = n.useCallback(
    (h) => {
      t.updateNodeTransform(s, "scale", h);
    },
    [s, t]
  );
  return /* @__PURE__ */ e.jsxs("div", { className: "node-editor property-section-content", children: [
    /* @__PURE__ */ e.jsx(
      R,
      {
        label: "Translation",
        value: a,
        onChange: o,
        step: 0.1
      }
    ),
    /* @__PURE__ */ e.jsx(
      R,
      {
        label: "Rotation",
        value: l,
        onChange: m,
        step: 1
      }
    ),
    /* @__PURE__ */ e.jsx(
      R,
      {
        label: "Scale",
        value: c,
        onChange: u,
        step: 0.1
      }
    )
  ] });
}
const L = new G(), X = new K();
function Ne({ node: s, api: t }) {
  const a = s.getTranslation(), l = s.getRotation(), c = s.getScale(), o = [0, 0, 0];
  l && (X.set(l[0], l[1], l[2], l[3]), L.setFromQuaternion(X, "XYZ"), o[0] = f.radToDeg(L.x), o[1] = f.radToDeg(L.y), o[2] = f.radToDeg(L.z));
  const m = n.useCallback(
    (d) => {
      t.updateNodeTransform(s, "translation", d);
    },
    [s, t]
  ), u = n.useCallback(
    (d) => {
      t.updateNodeTransform(s, "rotation", d);
    },
    [s, t]
  ), h = n.useCallback(
    (d) => {
      t.updateNodeTransform(s, "scale", d);
    },
    [s, t]
  );
  return /* @__PURE__ */ e.jsx("div", { className: "armature-editor", children: /* @__PURE__ */ e.jsx("div", { className: "property-section", children: /* @__PURE__ */ e.jsxs("div", { className: "property-section-content", children: [
    /* @__PURE__ */ e.jsx(
      R,
      {
        label: "Position",
        value: a,
        onChange: m,
        step: 0.01
      }
    ),
    /* @__PURE__ */ e.jsx(
      R,
      {
        label: "Rotation",
        value: o,
        onChange: u,
        step: 1
      }
    ),
    /* @__PURE__ */ e.jsx(
      R,
      {
        label: "Scale",
        value: c,
        onChange: h,
        step: 0.01
      }
    )
  ] }) }) });
}
const F = new G(), Y = new K();
function Te({ node: s, api: t }) {
  const a = s.getTranslation(), l = s.getRotation(), c = s.getScale(), o = [0, 0, 0];
  l && (Y.set(l[0], l[1], l[2], l[3]), F.setFromQuaternion(Y, "XYZ"), o[0] = f.radToDeg(F.x), o[1] = f.radToDeg(F.y), o[2] = f.radToDeg(F.z));
  const m = n.useCallback(
    (d) => {
      t.updateNodeTransform(s, "translation", d);
    },
    [s, t]
  ), u = n.useCallback(
    (d) => {
      t.updateNodeTransform(s, "rotation", d);
    },
    [s, t]
  ), h = n.useCallback(
    (d) => {
      t.updateNodeTransform(s, "scale", d);
    },
    [s, t]
  );
  return /* @__PURE__ */ e.jsx("div", { className: "bone-editor", children: /* @__PURE__ */ e.jsx("div", { className: "property-section", children: /* @__PURE__ */ e.jsxs("div", { className: "property-section-content", children: [
    /* @__PURE__ */ e.jsx(
      R,
      {
        label: "Position",
        value: a,
        onChange: m,
        step: 0.01
      }
    ),
    /* @__PURE__ */ e.jsx(
      R,
      {
        label: "Rotation",
        value: o,
        onChange: u,
        step: 1
      }
    ),
    /* @__PURE__ */ e.jsx(
      R,
      {
        label: "Scale",
        value: c,
        onChange: h,
        step: 0.01
      }
    )
  ] }) }) });
}
function Re({ mesh: s, metadata: t }) {
  const a = t?.triangleCount, l = s.listPrimitives().length;
  let c = 0;
  for (const o of s.listPrimitives()) {
    const m = o.getAttribute("POSITION");
    m && (c += m.getCount());
  }
  return /* @__PURE__ */ e.jsxs("div", { className: "mesh-editor property-section-content", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "editor-info", children: [
      /* @__PURE__ */ e.jsx("span", { className: "editor-info-label", children: "Triangles" }),
      /* @__PURE__ */ e.jsx("span", { className: "editor-info-value", children: a?.toLocaleString() ?? "N/A" })
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
function Me({ selectedNode: s, api: t }) {
  if (!s)
    return /* @__PURE__ */ e.jsx("div", { className: "property-editor property-editor-empty", children: /* @__PURE__ */ e.jsx("div", { className: "empty-state", children: /* @__PURE__ */ e.jsx("span", { className: "empty-state-text", children: "Select an object in the scene graph to view its properties" }) }) });
  const a = () => {
    switch (s.type) {
      case "material":
        return /* @__PURE__ */ e.jsx(fe, { material: s.gltfRef, api: t, metadata: s.metadata });
      case "mesh":
        return /* @__PURE__ */ e.jsx(Re, { mesh: s.gltfRef, metadata: s.metadata });
      case "light":
        return /* @__PURE__ */ e.jsx(Ce, { light: s.gltfRef, api: t });
      case "node":
        return /* @__PURE__ */ e.jsx(be, { node: s.gltfRef, api: t });
      case "armature":
        return /* @__PURE__ */ e.jsx(Ne, { node: s.gltfRef, api: t });
      case "bone":
        return /* @__PURE__ */ e.jsx(Te, { node: s.gltfRef, api: t });
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
    /* @__PURE__ */ e.jsx("div", { className: "property-editor-content", children: a() })
  ] });
}
function Se(s, t = 40) {
  const [a, l] = n.useState(t), [c, o] = n.useState(!1), m = n.useCallback((u) => {
    u.preventDefault(), o(!0);
  }, []);
  return n.useEffect(() => {
    if (!c) return;
    const u = (d) => {
      const C = s.current;
      if (!C) return;
      const i = C.getBoundingClientRect(), p = (d.clientY - i.top) / i.height * 100;
      l(Math.max(20, Math.min(80, p)));
    }, h = () => o(!1);
    return document.addEventListener("mousemove", u), document.addEventListener("mouseup", h), () => {
      document.removeEventListener("mousemove", u), document.removeEventListener("mouseup", h);
    };
  }, [c, s]), { splitPercent: a, isDragging: c, handleMouseDown: m };
}
function Pe({ className: s = "", modelId: t, blob: a, bundle: l, hasModifiedBlob: c, onBlobChange: o, onReset: m, onStatsChange: u, onAnimationsChange: h, onBlendShapesChange: d, onClose: C }) {
  const i = n.useMemo(() => new ee(), []), [p, j] = n.useState(i.getState()), [y, M] = n.useState(!1), b = n.useRef(null), S = n.useRef(null), N = n.useRef(!1), A = n.useRef(null), { splitPercent: k, isDragging: V, handleMouseDown: B } = Se(A);
  n.useEffect(() => (i.setOnStateChange(j), () => i.setOnStateChange(null)), [i]), n.useEffect(() => {
    if (!a || !t) {
      i.clear(), S.current = null, b.current = null, N.current = !1;
      return;
    }
    b.current === a && t === S.current || N.current || (N.current = !0, S.current = t, b.current = a, i.loadBlob(a, l ?? void 0).finally(() => {
      N.current = !1;
    }));
  }, [a, t, i, l]), n.useEffect(() => {
    if (!p.document) {
      u?.(null), h?.([]), d?.([]);
      return;
    }
    if (u)
      if (p.sceneGraph?.metadata?.stats) {
        const x = p.sceneGraph.metadata.stats;
        u({
          meshes: x.meshes,
          materials: x.materials,
          textures: x.textures,
          triangles: x.triangles,
          geometryVRAM: x.geometryVRAM,
          textureVRAM: x.textureVRAM
        });
      } else
        u(null);
    h && h(i.getAnimationTracks()), d && d(i.getBlendShapes());
  }, [p.document, p.sceneGraph, u, h, d, i]);
  const U = n.useCallback(async () => {
    M(!0);
    try {
      const x = await i.applyChanges();
      o && (b.current = x, await o(x));
    } catch (x) {
      console.error("Failed to apply changes:", x);
    } finally {
      M(!1);
    }
  }, [i, o]), $ = n.useCallback(async () => {
    try {
      await i.reset();
      const x = i.getState().originalBlob;
      x && (b.current = x), m ? await m() : o && x && await o(x);
    } catch (x) {
      console.error("Failed to reset:", x);
    }
  }, [i, o, m]), z = n.useCallback(
    (x) => {
      i.selectNode(x);
    },
    [i]
  );
  return /* @__PURE__ */ e.jsxs("div", { className: `inspector-panel ${s}`, children: [
    /* @__PURE__ */ e.jsxs("div", { className: "inspector-panel-header", children: [
      /* @__PURE__ */ e.jsx("h2", { className: "inspector-panel-title", children: "Inspector" }),
      C && /* @__PURE__ */ e.jsx(
        "button",
        {
          type: "button",
          className: "inspector-panel-close",
          onClick: C,
          "aria-label": "Close inspector",
          children: /* @__PURE__ */ e.jsxs("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
            /* @__PURE__ */ e.jsx("line", { x1: "3", y1: "3", x2: "11", y2: "11" }),
            /* @__PURE__ */ e.jsx("line", { x1: "11", y1: "3", x2: "3", y2: "11" })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ e.jsxs("div", { ref: A, className: `inspector-panel-body${V ? " is-resizing" : ""}`, children: [
      /* @__PURE__ */ e.jsxs("div", { className: "inspector-panel-section scene-tree-section", style: { flex: `0 0 ${k}%` }, children: [
        /* @__PURE__ */ e.jsx("div", { className: "section-header", children: "Scene Graph" }),
        /* @__PURE__ */ e.jsx(
          me,
          {
            sceneGraph: p.sceneGraph,
            selectedNode: p.selectedNode,
            selectNode: z,
            isLoading: p.isLoading,
            error: p.error
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "inspector-panel-divider", onMouseDown: B, children: /* @__PURE__ */ e.jsx("div", { className: "inspector-panel-divider-handle" }) }),
      /* @__PURE__ */ e.jsxs("div", { className: "inspector-panel-section property-editor-section", children: [
        /* @__PURE__ */ e.jsx("div", { className: "section-header", children: "Properties" }),
        /* @__PURE__ */ e.jsx(Me, { selectedNode: p.selectedNode, api: i })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "inspector-panel-footer", children: [
      /* @__PURE__ */ e.jsx(
        "button",
        {
          type: "button",
          className: "inspector-button inspector-button-secondary",
          onClick: $,
          disabled: !p.document || p.isLoading || !c,
          children: "Reset"
        }
      ),
      /* @__PURE__ */ e.jsx(
        "button",
        {
          type: "button",
          className: "inspector-button inspector-button-primary",
          onClick: U,
          disabled: !p.isDirty || p.isLoading || y,
          children: y ? "Applying..." : "Apply Changes"
        }
      )
    ] })
  ] });
}
export {
  D as AlphaMode,
  ee as InspectorAPI,
  Pe as InspectorPanel,
  g as MaterialExtension,
  Ie as SceneGraphNodeType
};
