import { formatBytes as V, MaterialExtension as m, InspectorAPI as te } from "./index-CGNF3a1c.js";
import { SceneGraphNodeType as Fe } from "./index-CGNF3a1c.js";
import { el as n, em as e, en as ne, eo as ae, ep as re, eq as le, er as oe, es as ce, et as ie, eu as ue, ev as X, ew as D, ex as j, ey as de, ez as he, eA as pe, eB as me, cu as b, eC as T, a2 as Q, cL as H } from "./index-Ba1b9g-o.js";
function xe({ stats: s }) {
  const t = [];
  return s.meshes > 0 && t.push({ label: "Meshes", value: s.meshes }), s.materials > 0 && t.push({ label: "Materials", value: s.materials }), s.textures > 0 && t.push({ label: "Textures", value: s.textures }), s.triangles > 0 && t.push({ label: "Triangles", value: s.triangles.toLocaleString() }), s.geometryVRAM > 0 && t.push({ label: "Geometry VRAM", value: V(s.geometryVRAM) }), s.textureVRAM > 0 && t.push({ label: "Texture VRAM", value: V(s.textureVRAM) }), t.length === 0 ? null : /* @__PURE__ */ e.jsx("div", { className: "node-stats-tooltip", children: t.map(({ label: a, value: l }) => /* @__PURE__ */ e.jsxs("div", { className: "node-stats-row", children: [
    /* @__PURE__ */ e.jsx("span", { className: "node-stats-label", children: a }),
    /* @__PURE__ */ e.jsx("span", { className: "node-stats-value", children: l })
  ] }, a)) });
}
const ge = n.memo(function s({ node: t, depth: a, selectedNode: l, selectNode: c, expandedNodes: o, onToggleExpand: p }) {
  const d = o.has(t.id), h = t.children.length > 0, u = l?.id === t.id, v = t.metadata?.stats, i = n.useCallback(
    (C) => {
      C.stopPropagation(), p(t.id);
    },
    [p, t.id]
  ), x = n.useCallback(() => {
    c(t.id);
  }, [c, t.id]), f = v ? /* @__PURE__ */ e.jsx(xe, { stats: v }) : null;
  return /* @__PURE__ */ e.jsxs("div", { className: "tree-node", children: [
    /* @__PURE__ */ e.jsx(ne, { content: f, className: "node-stats-tooltip", children: /* @__PURE__ */ e.jsxs(
      "div",
      {
        className: `tree-node-row ${u ? "selected" : ""}`,
        style: { paddingLeft: `${a * 12 + 6}px` },
        onClick: x,
        role: "treeitem",
        "aria-selected": u,
        "aria-expanded": h ? d : void 0,
        children: [
          h ? /* @__PURE__ */ e.jsx(
            "button",
            {
              type: "button",
              className: "tree-node-toggle",
              onClick: i,
              "aria-label": d ? "Collapse" : "Expand",
              children: d ? "▼" : "▶"
            }
          ) : /* @__PURE__ */ e.jsx("span", { className: "tree-node-toggle-placeholder" }),
          /* @__PURE__ */ e.jsxs("span", { className: "tree-node-icon", role: "img", "aria-label": t.type, children: [
            t.type === "mesh" && /* @__PURE__ */ e.jsx(ae, {}),
            t.type === "light" && /* @__PURE__ */ e.jsx(re, {}),
            t.type === "camera" && /* @__PURE__ */ e.jsx(le, {}),
            t.type === "armature" && /* @__PURE__ */ e.jsx(oe, {}),
            t.type === "bone" && /* @__PURE__ */ e.jsx(ce, {}),
            t.type === "material" && /* @__PURE__ */ e.jsx(ie, {}),
            (t.type === "node" || t.type === "scene") && (h ? /* @__PURE__ */ e.jsx(ue, {}) : /* @__PURE__ */ e.jsx(X, {})),
            !["mesh", "light", "camera", "armature", "bone", "material", "node", "scene"].includes(t.type) && /* @__PURE__ */ e.jsx(X, {})
          ] }),
          /* @__PURE__ */ e.jsx("span", { className: "tree-node-name", children: t.name })
        ]
      }
    ) }),
    h && d && /* @__PURE__ */ e.jsx("div", { className: "tree-node-children", role: "group", children: t.children.map((C) => /* @__PURE__ */ e.jsx(
      s,
      {
        node: C,
        depth: a + 1,
        selectedNode: l,
        selectNode: c,
        expandedNodes: o,
        onToggleExpand: p
      },
      C.id
    )) })
  ] });
});
function Z(s, t, a) {
  if (t < 2) {
    a.add(s.id);
    for (const l of s.children)
      Z(l, t + 1, a);
  }
}
function ve({ sceneGraph: s, selectedNode: t, selectNode: a, isLoading: l, error: c }) {
  const [o, p] = n.useState(/* @__PURE__ */ new Set()), d = n.useRef(null);
  if (s && s.id !== d.current) {
    const u = d.current !== null && o.size > 0 && !o.has(s.id);
    if (d.current === null || u) {
      const v = /* @__PURE__ */ new Set();
      Z(s, 0, v), p(v);
    }
    d.current = s.id;
  }
  const h = n.useCallback((u) => {
    p((v) => {
      const i = new Set(v);
      return i.has(u) ? i.delete(u) : i.add(u), i;
    });
  }, []);
  return l ? /* @__PURE__ */ e.jsx("div", { className: "scene-tree scene-tree-loading", children: /* @__PURE__ */ e.jsx("span", { className: "loading-text", children: "Loading..." }) }) : c ? /* @__PURE__ */ e.jsx("div", { className: "scene-tree scene-tree-error", children: /* @__PURE__ */ e.jsx("span", { className: "error-text", children: c }) }) : s ? /* @__PURE__ */ e.jsx("div", { className: "scene-tree", role: "tree", "aria-label": "Scene graph", children: /* @__PURE__ */ e.jsx(
    ge,
    {
      node: s,
      depth: 0,
      selectedNode: t,
      selectNode: a,
      expandedNodes: o,
      onToggleExpand: h
    }
  ) }) : /* @__PURE__ */ e.jsx("div", { className: "scene-tree scene-tree-empty", children: /* @__PURE__ */ e.jsx("span", { className: "empty-text", children: "No model loaded" }) });
}
var _ = /* @__PURE__ */ ((s) => (s.OPAQUE = "OPAQUE", s.MASK = "MASK", s.BLEND = "BLEND", s))(_ || {});
const fe = [
  { value: _.OPAQUE, label: "Opaque" },
  { value: _.MASK, label: "Mask" },
  { value: _.BLEND, label: "Blend" }
], P = {
  [m.Clearcoat]: "Clear Coat",
  [m.Transmission]: "Transmission",
  [m.IOR]: "IOR",
  [m.Sheen]: "Sheen",
  [m.Volume]: "Volume"
}, je = [
  { extension: m.Clearcoat, label: P[m.Clearcoat] },
  { extension: m.Transmission, label: P[m.Transmission] },
  { extension: m.IOR, label: P[m.IOR] },
  { extension: m.Sheen, label: P[m.Sheen] },
  { extension: m.Volume, label: P[m.Volume] }
];
function R({
  title: s,
  children: t,
  defaultOpen: a = !0,
  onRemove: l
}) {
  return /* @__PURE__ */ e.jsxs("details", { className: "property-section", open: a, children: [
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
function k({
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
        /* @__PURE__ */ e.jsx("div", { className: "texture-slot-thumbnail", children: t.previewUrl ? /* @__PURE__ */ e.jsx("img", { src: t.previewUrl, alt: s }) : /* @__PURE__ */ e.jsx(me, { className: "texture-slot-thumbnail-icon" }) }),
        /* @__PURE__ */ e.jsx("span", { className: "texture-slot-label", children: s }),
        /* @__PURE__ */ e.jsx("span", { className: "texture-slot-format", children: t.mimeType.replace("image/", "").toUpperCase() }),
        /* @__PURE__ */ e.jsx("span", { className: "texture-slot-size", children: t.width && t.height && `${t.width}×${t.height}` }),
        /* @__PURE__ */ e.jsx("span", { className: "texture-slot-vram", children: V(t.vram) })
      ]
    }
  );
}
function Ce({
  texture: s,
  onClose: t
}) {
  return s.previewUrl ? pe.createPortal(
    /* @__PURE__ */ e.jsx("div", { className: "texture-preview-overlay", onClick: t, children: /* @__PURE__ */ e.jsxs("div", { className: "texture-preview-modal", onClick: (a) => a.stopPropagation(), children: [
      /* @__PURE__ */ e.jsxs("div", { className: "texture-preview-info", children: [
        /* @__PURE__ */ e.jsx("span", { className: "texture-preview-info-name", children: s.name }),
        /* @__PURE__ */ e.jsx("span", { className: "texture-preview-info-format", children: s.mimeType.replace("image/", "").toUpperCase() }),
        /* @__PURE__ */ e.jsxs("span", { className: "texture-preview-info-size", children: [
          s.width,
          "×",
          s.height
        ] }),
        /* @__PURE__ */ e.jsx("span", { className: "texture-preview-info-vram", children: V(s.vram) })
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
function be({ material: s, api: t, metadata: a }) {
  const [l, c] = n.useState(null), o = s.getBaseColorFactor(), p = s.getMetallicFactor(), d = s.getRoughnessFactor(), h = s.getEmissiveFactor(), u = s.getNormalScale(), v = s.getOcclusionStrength(), i = s.getAlphaMode(), x = s.getAlphaCutoff(), f = s.getDoubleSided(), C = n.useMemo(() => {
    const r = /* @__PURE__ */ new Map();
    if (a?.textures && Array.isArray(a.textures))
      for (const A of a.textures)
        r.set(A.slot, A);
    return r;
  }, [a]), S = s.getExtension("KHR_materials_clearcoat"), y = s.getExtension("KHR_materials_transmission"), M = s.getExtension("KHR_materials_ior"), N = s.getExtension("KHR_materials_sheen"), E = s.getExtension("KHR_materials_volume"), I = n.useMemo(() => je.filter(({ extension: r }) => {
    switch (r) {
      case m.Clearcoat:
        return !S;
      case m.Transmission:
        return !y;
      case m.IOR:
        return !M;
      case m.Sheen:
        return !N;
      case m.Volume:
        return !E;
      default:
        return !1;
    }
  }), [S, y, M, N, E]), B = n.useCallback(
    (r) => {
      t.updateMaterialProperty(s, "baseColorFactor", r);
    },
    [s, t]
  ), U = n.useCallback(
    (r) => {
      t.updateMaterialProperty(s, "metallicFactor", r);
    },
    [s, t]
  ), $ = n.useCallback(
    (r) => {
      t.updateMaterialProperty(s, "roughnessFactor", r);
    },
    [s, t]
  ), z = n.useCallback(
    (r) => {
      t.updateMaterialProperty(s, "emissiveFactor", r);
    },
    [s, t]
  ), K = n.useCallback(
    (r) => {
      t.updateMaterialProperty(s, "normalScale", r);
    },
    [s, t]
  ), g = n.useCallback(
    (r) => {
      t.updateMaterialProperty(s, "occlusionStrength", r);
    },
    [s, t]
  ), W = n.useCallback(
    (r) => {
      t.updateMaterialProperty(s, "alphaMode", r);
    },
    [s, t]
  ), J = n.useCallback(
    (r) => {
      t.updateMaterialProperty(s, "alphaCutoff", r);
    },
    [s, t]
  ), ee = n.useCallback(
    (r) => {
      t.updateMaterialProperty(s, "doubleSided", r);
    },
    [s, t]
  ), se = n.useCallback(
    (r) => {
      const A = r.target.value;
      A && t.addMaterialExtension(s, A), r.target.value = "";
    },
    [s, t]
  ), w = n.useCallback(
    (r) => {
      t.removeMaterialExtension(s, r);
    },
    [s, t]
  );
  return /* @__PURE__ */ e.jsxs("div", { className: "material-editor", children: [
    l && /* @__PURE__ */ e.jsx(
      Ce,
      {
        texture: l,
        onClose: () => c(null)
      }
    ),
    C.size > 0 && /* @__PURE__ */ e.jsxs(R, { title: "Textures", defaultOpen: !0, children: [
      /* @__PURE__ */ e.jsx(k, { label: "Base Color", texture: C.get("baseColor"), onPreview: c }),
      /* @__PURE__ */ e.jsx(k, { label: "Normal", texture: C.get("normal"), onPreview: c }),
      /* @__PURE__ */ e.jsx(k, { label: "Metallic/Roughness", texture: C.get("metallicRoughness"), onPreview: c }),
      /* @__PURE__ */ e.jsx(k, { label: "Occlusion", texture: C.get("occlusion"), onPreview: c }),
      /* @__PURE__ */ e.jsx(k, { label: "Emissive", texture: C.get("emissive"), onPreview: c })
    ] }),
    /* @__PURE__ */ e.jsxs(R, { title: "Base Properties", defaultOpen: !0, children: [
      /* @__PURE__ */ e.jsx(
        D,
        {
          label: "Base Color",
          value: o,
          onChange: B,
          includeAlpha: !0
        }
      ),
      /* @__PURE__ */ e.jsx(
        j,
        {
          label: "Metallic",
          value: p,
          onChange: U,
          min: 0,
          max: 1
        }
      ),
      /* @__PURE__ */ e.jsx(
        j,
        {
          label: "Roughness",
          value: d,
          onChange: $,
          min: 0,
          max: 1
        }
      ),
      /* @__PURE__ */ e.jsx(
        D,
        {
          label: "Emissive",
          value: h,
          onChange: z
        }
      ),
      /* @__PURE__ */ e.jsx(
        j,
        {
          label: "Normal Scale",
          value: u,
          onChange: K,
          min: 0,
          max: 2
        }
      ),
      /* @__PURE__ */ e.jsx(
        j,
        {
          label: "Occlusion",
          value: v,
          onChange: g,
          min: 0,
          max: 1
        }
      )
    ] }),
    /* @__PURE__ */ e.jsxs(R, { title: "Alpha", children: [
      /* @__PURE__ */ e.jsx(
        de,
        {
          label: "Alpha Mode",
          value: i,
          options: fe,
          onChange: W
        }
      ),
      i === "MASK" && /* @__PURE__ */ e.jsx(
        j,
        {
          label: "Alpha Cutoff",
          value: x,
          onChange: J,
          min: 0,
          max: 1
        }
      ),
      /* @__PURE__ */ e.jsx(
        he,
        {
          label: "Double Sided",
          value: f,
          onChange: ee
        }
      )
    ] }),
    S && /* @__PURE__ */ e.jsxs(R, { title: "Clear Coat", onRemove: () => w(m.Clearcoat), children: [
      /* @__PURE__ */ e.jsx(
        j,
        {
          label: "Factor",
          value: S.getClearcoatFactor(),
          onChange: (r) => t.updateMaterialProperty(s, "clearcoatFactor", r),
          min: 0,
          max: 1
        }
      ),
      /* @__PURE__ */ e.jsx(
        j,
        {
          label: "Roughness",
          value: S.getClearcoatRoughnessFactor(),
          onChange: (r) => t.updateMaterialProperty(s, "clearcoatRoughnessFactor", r),
          min: 0,
          max: 1
        }
      )
    ] }),
    y && /* @__PURE__ */ e.jsx(R, { title: "Transmission", onRemove: () => w(m.Transmission), children: /* @__PURE__ */ e.jsx(
      j,
      {
        label: "Factor",
        value: y.getTransmissionFactor(),
        onChange: (r) => t.updateMaterialProperty(s, "transmissionFactor", r),
        min: 0,
        max: 1
      }
    ) }),
    M && /* @__PURE__ */ e.jsx(R, { title: "Index of Refraction", onRemove: () => w(m.IOR), children: /* @__PURE__ */ e.jsx(
      j,
      {
        label: "IOR",
        value: M.getIOR(),
        onChange: (r) => t.updateMaterialProperty(s, "ior", r),
        min: 1,
        max: 3,
        step: 0.01
      }
    ) }),
    N && /* @__PURE__ */ e.jsxs(R, { title: "Sheen", onRemove: () => w(m.Sheen), children: [
      /* @__PURE__ */ e.jsx(
        D,
        {
          label: "Color",
          value: N.getSheenColorFactor(),
          onChange: (r) => t.updateMaterialProperty(s, "sheenColorFactor", r)
        }
      ),
      /* @__PURE__ */ e.jsx(
        j,
        {
          label: "Roughness",
          value: N.getSheenRoughnessFactor(),
          onChange: (r) => t.updateMaterialProperty(s, "sheenRoughnessFactor", r),
          min: 0,
          max: 1
        }
      )
    ] }),
    E && /* @__PURE__ */ e.jsx(R, { title: "Volume", onRemove: () => w(m.Volume), children: /* @__PURE__ */ e.jsx(
      j,
      {
        label: "Thickness",
        value: E.getThicknessFactor(),
        onChange: (r) => t.updateMaterialProperty(s, "thicknessFactor", r),
        min: 0,
        max: 100,
        step: 0.1
      }
    ) }),
    I.length > 0 && /* @__PURE__ */ e.jsx(R, { title: "Extensions", defaultOpen: !1, children: /* @__PURE__ */ e.jsxs(
      "select",
      {
        className: "ui-select-input-select",
        onChange: se,
        defaultValue: "",
        children: [
          /* @__PURE__ */ e.jsx("option", { value: "", disabled: !0, children: "Add extension..." }),
          I.map(({ extension: r, label: A }) => /* @__PURE__ */ e.jsx("option", { value: r, children: A }, r))
        ]
      }
    ) })
  ] });
}
function ye({ light: s, api: t }) {
  const a = s.getType(), l = s.getIntensity(), c = s.getColor(), o = s.getRange() ?? 0, p = b.radToDeg(s.getInnerConeAngle() ?? 0), d = b.radToDeg(s.getOuterConeAngle() ?? Math.PI / 4), h = n.useCallback(
    (f) => {
      t.updateLightProperty(s, "color", f.slice(0, 3));
    },
    [s, t]
  ), u = n.useCallback(
    (f) => {
      t.updateLightProperty(s, "intensity", f);
    },
    [s, t]
  ), v = n.useCallback(
    (f) => {
      t.updateLightProperty(s, "range", f || null);
    },
    [s, t]
  ), i = n.useCallback(
    (f) => {
      t.updateLightProperty(s, "innerConeAngle", b.degToRad(f));
    },
    [s, t]
  ), x = n.useCallback(
    (f) => {
      t.updateLightProperty(s, "outerConeAngle", b.degToRad(f));
    },
    [s, t]
  );
  return /* @__PURE__ */ e.jsx("div", { className: "light-editor", children: /* @__PURE__ */ e.jsx("div", { className: "property-section", children: /* @__PURE__ */ e.jsxs("div", { className: "property-section-content", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "editor-info", children: [
      /* @__PURE__ */ e.jsx("span", { className: "editor-info-label", children: "Type" }),
      /* @__PURE__ */ e.jsx("span", { className: "editor-info-value", children: a })
    ] }),
    /* @__PURE__ */ e.jsx(D, { label: "Color", value: c, onChange: h }),
    /* @__PURE__ */ e.jsx(
      j,
      {
        label: "Intensity",
        value: l,
        onChange: u,
        min: 0,
        max: 1e3,
        step: 1
      }
    ),
    (a === "point" || a === "spot") && /* @__PURE__ */ e.jsx(
      j,
      {
        label: "Range",
        value: o,
        onChange: v,
        min: 0,
        max: 1e3,
        step: 1
      }
    ),
    a === "spot" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      /* @__PURE__ */ e.jsx(
        j,
        {
          label: "Inner Cone",
          value: p,
          onChange: i,
          min: 0,
          max: 90,
          step: 1
        }
      ),
      /* @__PURE__ */ e.jsx(
        j,
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
const L = new H(), G = new Q();
function Ne(s) {
  return G.set(s[0], s[1], s[2], s[3]), L.setFromQuaternion(G, "XYZ"), [
    b.radToDeg(L.x),
    b.radToDeg(L.y),
    b.radToDeg(L.z)
  ];
}
function Re({ node: s, api: t }) {
  const a = s.getTranslation(), l = Ne(s.getRotation()), c = s.getScale(), o = n.useCallback(
    (h) => {
      t.updateNodeTransform(s, "translation", h);
    },
    [s, t]
  ), p = n.useCallback(
    (h) => {
      t.updateNodeTransform(s, "rotation", h);
    },
    [s, t]
  ), d = n.useCallback(
    (h) => {
      t.updateNodeTransform(s, "scale", h);
    },
    [s, t]
  );
  return /* @__PURE__ */ e.jsxs("div", { className: "node-editor property-section-content", children: [
    /* @__PURE__ */ e.jsx(
      T,
      {
        label: "Translation",
        value: a,
        onChange: o,
        step: 0.1
      }
    ),
    /* @__PURE__ */ e.jsx(
      T,
      {
        label: "Rotation",
        value: l,
        onChange: p,
        step: 1
      }
    ),
    /* @__PURE__ */ e.jsx(
      T,
      {
        label: "Scale",
        value: c,
        onChange: d,
        step: 0.1
      }
    )
  ] });
}
const F = new H(), Y = new Q();
function Te({ node: s, api: t }) {
  const a = s.getTranslation(), l = s.getRotation(), c = s.getScale(), o = [0, 0, 0];
  l && (Y.set(l[0], l[1], l[2], l[3]), F.setFromQuaternion(Y, "XYZ"), o[0] = b.radToDeg(F.x), o[1] = b.radToDeg(F.y), o[2] = b.radToDeg(F.z));
  const p = n.useCallback(
    (u) => {
      t.updateNodeTransform(s, "translation", u);
    },
    [s, t]
  ), d = n.useCallback(
    (u) => {
      t.updateNodeTransform(s, "rotation", u);
    },
    [s, t]
  ), h = n.useCallback(
    (u) => {
      t.updateNodeTransform(s, "scale", u);
    },
    [s, t]
  );
  return /* @__PURE__ */ e.jsx("div", { className: "armature-editor", children: /* @__PURE__ */ e.jsx("div", { className: "property-section", children: /* @__PURE__ */ e.jsxs("div", { className: "property-section-content", children: [
    /* @__PURE__ */ e.jsx(
      T,
      {
        label: "Position",
        value: a,
        onChange: p,
        step: 0.01
      }
    ),
    /* @__PURE__ */ e.jsx(
      T,
      {
        label: "Rotation",
        value: o,
        onChange: d,
        step: 1
      }
    ),
    /* @__PURE__ */ e.jsx(
      T,
      {
        label: "Scale",
        value: c,
        onChange: h,
        step: 0.01
      }
    )
  ] }) }) });
}
const O = new H(), q = new Q();
function Se({ node: s, api: t }) {
  const a = s.getTranslation(), l = s.getRotation(), c = s.getScale(), o = [0, 0, 0];
  l && (q.set(l[0], l[1], l[2], l[3]), O.setFromQuaternion(q, "XYZ"), o[0] = b.radToDeg(O.x), o[1] = b.radToDeg(O.y), o[2] = b.radToDeg(O.z));
  const p = n.useCallback(
    (u) => {
      t.updateNodeTransform(s, "translation", u);
    },
    [s, t]
  ), d = n.useCallback(
    (u) => {
      t.updateNodeTransform(s, "rotation", u);
    },
    [s, t]
  ), h = n.useCallback(
    (u) => {
      t.updateNodeTransform(s, "scale", u);
    },
    [s, t]
  );
  return /* @__PURE__ */ e.jsx("div", { className: "bone-editor", children: /* @__PURE__ */ e.jsx("div", { className: "property-section", children: /* @__PURE__ */ e.jsxs("div", { className: "property-section-content", children: [
    /* @__PURE__ */ e.jsx(
      T,
      {
        label: "Position",
        value: a,
        onChange: p,
        step: 0.01
      }
    ),
    /* @__PURE__ */ e.jsx(
      T,
      {
        label: "Rotation",
        value: o,
        onChange: d,
        step: 1
      }
    ),
    /* @__PURE__ */ e.jsx(
      T,
      {
        label: "Scale",
        value: c,
        onChange: h,
        step: 0.01
      }
    )
  ] }) }) });
}
function Me({ mesh: s, metadata: t }) {
  const a = t?.triangleCount, l = s.listPrimitives().length;
  let c = 0;
  for (const o of s.listPrimitives()) {
    const p = o.getAttribute("POSITION");
    p && (c += p.getCount());
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
function Ee({ selectedNode: s, api: t }) {
  if (!s)
    return /* @__PURE__ */ e.jsx("div", { className: "property-editor property-editor-empty", children: /* @__PURE__ */ e.jsx("div", { className: "empty-state", children: /* @__PURE__ */ e.jsx("span", { className: "empty-state-text", children: "Select an object in the scene graph to view its properties" }) }) });
  const a = () => {
    switch (s.type) {
      case "material":
        return /* @__PURE__ */ e.jsx(be, { material: s.gltfRef, api: t, metadata: s.metadata });
      case "mesh":
        return /* @__PURE__ */ e.jsx(Me, { mesh: s.gltfRef, metadata: s.metadata });
      case "light":
        return /* @__PURE__ */ e.jsx(ye, { light: s.gltfRef, api: t });
      case "node":
        return /* @__PURE__ */ e.jsx(Re, { node: s.gltfRef, api: t });
      case "armature":
        return /* @__PURE__ */ e.jsx(Te, { node: s.gltfRef, api: t });
      case "bone":
        return /* @__PURE__ */ e.jsx(Se, { node: s.gltfRef, api: t });
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
function Ae(s, t = 40) {
  const [a, l] = n.useState(t), [c, o] = n.useState(!1), p = n.useCallback((d) => {
    d.preventDefault(), o(!0);
  }, []);
  return n.useEffect(() => {
    if (!c) return;
    const d = (u) => {
      const v = s.current;
      if (!v) return;
      const i = v.getBoundingClientRect(), x = (u.clientY - i.top) / i.height * 100;
      l(Math.max(20, Math.min(80, x)));
    }, h = () => o(!1);
    return document.addEventListener("mousemove", d), document.addEventListener("mouseup", h), () => {
      document.removeEventListener("mousemove", d), document.removeEventListener("mouseup", h);
    };
  }, [c, s]), { splitPercent: a, isDragging: c, handleMouseDown: p };
}
function ke({ className: s = "", modelId: t, blob: a, bundle: l, hasModifiedBlob: c, onBlobChange: o, onReset: p, onStatsChange: d, onAnimationsChange: h, onBlendShapesChange: u, onClose: v }) {
  const i = n.useMemo(() => new te(), []), [x, f] = n.useState(i.getState()), [C, S] = n.useState(!1), y = n.useRef(null), M = n.useRef(null), N = n.useRef(!1), E = n.useRef(null), { splitPercent: I, isDragging: B, handleMouseDown: U } = Ae(E);
  n.useEffect(() => (i.setOnStateChange(f), () => i.setOnStateChange(null)), [i]), n.useEffect(() => {
    if (!a || !t) {
      i.clear(), M.current = null, y.current = null, N.current = !1;
      return;
    }
    y.current === a && t === M.current || N.current || (N.current = !0, M.current = t, y.current = a, i.loadBlob(a, l ?? void 0).finally(() => {
      N.current = !1;
    }));
  }, [a, t, i, l]), n.useEffect(() => {
    if (!x.document) {
      d?.(null), h?.([]), u?.([]);
      return;
    }
    if (d)
      if (x.sceneGraph?.metadata?.stats) {
        const g = x.sceneGraph.metadata.stats;
        d({
          meshes: g.meshes,
          materials: g.materials,
          textures: g.textures,
          triangles: g.triangles,
          geometryVRAM: g.geometryVRAM,
          textureVRAM: g.textureVRAM
        });
      } else
        d(null);
    h && h(i.getAnimationTracks()), u && u(i.getBlendShapes());
  }, [x.document, x.sceneGraph, d, h, u, i]);
  const $ = n.useCallback(async () => {
    S(!0);
    try {
      const g = await i.applyChanges();
      o && (y.current = g, await o(g));
    } catch (g) {
      console.error("Failed to apply changes:", g);
    } finally {
      S(!1);
    }
  }, [i, o]), z = n.useCallback(async () => {
    try {
      await i.reset();
      const g = i.getState().originalBlob;
      g && (y.current = g), p ? await p() : o && g && await o(g);
    } catch (g) {
      console.error("Failed to reset:", g);
    }
  }, [i, o, p]), K = n.useCallback(
    (g) => {
      i.selectNode(g);
    },
    [i]
  );
  return /* @__PURE__ */ e.jsxs("div", { className: `inspector-panel ${s}`, children: [
    /* @__PURE__ */ e.jsxs("div", { className: "inspector-panel-header", children: [
      /* @__PURE__ */ e.jsx("h2", { className: "inspector-panel-title", children: "Inspector" }),
      v && /* @__PURE__ */ e.jsx(
        "button",
        {
          type: "button",
          className: "inspector-panel-close",
          onClick: v,
          "aria-label": "Close inspector",
          children: /* @__PURE__ */ e.jsxs("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
            /* @__PURE__ */ e.jsx("line", { x1: "3", y1: "3", x2: "11", y2: "11" }),
            /* @__PURE__ */ e.jsx("line", { x1: "11", y1: "3", x2: "3", y2: "11" })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ e.jsxs("div", { ref: E, className: `inspector-panel-body${B ? " is-resizing" : ""}`, children: [
      /* @__PURE__ */ e.jsxs("div", { className: "inspector-panel-section scene-tree-section", style: { flex: `0 0 ${I}%` }, children: [
        /* @__PURE__ */ e.jsx("div", { className: "section-header", children: "Scene Graph" }),
        /* @__PURE__ */ e.jsx(
          ve,
          {
            sceneGraph: x.sceneGraph,
            selectedNode: x.selectedNode,
            selectNode: K,
            isLoading: x.isLoading,
            error: x.error
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "inspector-panel-divider", onMouseDown: U, children: /* @__PURE__ */ e.jsx("div", { className: "inspector-panel-divider-handle" }) }),
      /* @__PURE__ */ e.jsxs("div", { className: "inspector-panel-section property-editor-section", children: [
        /* @__PURE__ */ e.jsx("div", { className: "section-header", children: "Properties" }),
        /* @__PURE__ */ e.jsx(Ee, { selectedNode: x.selectedNode, api: i })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "inspector-panel-footer", children: [
      /* @__PURE__ */ e.jsx(
        "button",
        {
          type: "button",
          className: "inspector-button inspector-button-secondary",
          onClick: z,
          disabled: !x.document || x.isLoading || !c,
          children: "Reset"
        }
      ),
      /* @__PURE__ */ e.jsx(
        "button",
        {
          type: "button",
          className: "inspector-button inspector-button-primary",
          onClick: $,
          disabled: !x.isDirty || x.isLoading || C,
          children: C ? "Applying..." : "Apply Changes"
        }
      )
    ] })
  ] });
}
export {
  _ as AlphaMode,
  te as InspectorAPI,
  ke as InspectorPanel,
  m as MaterialExtension,
  Fe as SceneGraphNodeType
};
