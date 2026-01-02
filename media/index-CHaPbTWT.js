import { formatBytes as L, MaterialExtension as m, InspectorAPI as W } from "./index-K0R-8oYE.js";
import { SceneGraphNodeType as Ie } from "./index-K0R-8oYE.js";
import { eb as a, ec as e, ed as J, ee, ef as te, eg as se, eh as ae, ei as ne, ej as le, ek as re, el as $, em as f, en as oe, cq as v, a2 as O, cs as w } from "./index-BuD9B_7M.js";
function ce(t) {
  const s = Math.round(t[0] * 255).toString(16).padStart(2, "0"), n = Math.round(t[1] * 255).toString(16).padStart(2, "0"), l = Math.round(t[2] * 255).toString(16).padStart(2, "0");
  return `#${s}${n}${l}`;
}
function ie(t) {
  const s = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
  return s ? [
    parseInt(s[1], 16) / 255,
    parseInt(s[2], 16) / 255,
    parseInt(s[3], 16) / 255
  ] : [1, 1, 1];
}
function P({
  label: t,
  value: s,
  onChange: n,
  includeAlpha: l = !1,
  disabled: u = !1,
  className: i = ""
}) {
  const p = a.useId(), [c, o] = a.useState(!1), d = a.useRef(null), j = ce(s), C = s.length === 4 ? s[3] : 1;
  a.useEffect(() => {
    if (!c) return;
    const g = (h) => {
      d.current && !d.current.contains(h.target) && o(!1);
    };
    return document.addEventListener("mousedown", g), () => document.removeEventListener("mousedown", g);
  }, [c]);
  const b = a.useCallback(
    (g) => {
      const h = ie(g);
      n(l ? [...h, C] : h);
    },
    [n, l, C]
  ), x = a.useCallback(
    (g) => {
      n([s[0], s[1], s[2], g]);
    },
    [n, s]
  );
  return /* @__PURE__ */ e.jsxs("div", { className: `ui-control ui-color-picker ${i}`, children: [
    /* @__PURE__ */ e.jsx("label", { className: "ui-control-label", children: t }),
    /* @__PURE__ */ e.jsxs("div", { className: "ui-color-picker-controls", children: [
      /* @__PURE__ */ e.jsx(
        "button",
        {
          type: "button",
          className: "ui-color-picker-swatch",
          style: {
            backgroundColor: j,
            opacity: C
          },
          onClick: () => !u && o(!c),
          disabled: u,
          "aria-label": `Select ${t} color`
        }
      ),
      /* @__PURE__ */ e.jsx("span", { className: "ui-color-picker-value", children: j.toUpperCase() }),
      c && /* @__PURE__ */ e.jsxs("div", { ref: d, className: "ui-color-picker-popover", children: [
        /* @__PURE__ */ e.jsx(
          "input",
          {
            type: "color",
            id: p,
            className: "ui-color-picker-input",
            value: j,
            onChange: (g) => b(g.target.value),
            disabled: u
          }
        ),
        l && /* @__PURE__ */ e.jsxs("div", { className: "ui-color-picker-alpha", children: [
          /* @__PURE__ */ e.jsx("label", { htmlFor: `${p}-alpha`, children: "Alpha" }),
          /* @__PURE__ */ e.jsx(
            "input",
            {
              type: "range",
              id: `${p}-alpha`,
              min: 0,
              max: 1,
              step: 0.01,
              value: C,
              onChange: (g) => x(parseFloat(g.target.value)),
              disabled: u
            }
          ),
          /* @__PURE__ */ e.jsx("span", { children: C.toFixed(2) })
        ] })
      ] })
    ] })
  ] });
}
function ue({
  label: t,
  value: s,
  onChange: n,
  disabled: l = !1,
  className: u = ""
}) {
  const i = a.useId(), p = a.useCallback(
    (c) => {
      n(c.target.checked);
    },
    [n]
  );
  return /* @__PURE__ */ e.jsxs("div", { className: `ui-control ui-toggle-input ${u}`, children: [
    /* @__PURE__ */ e.jsx("label", { htmlFor: i, className: "ui-control-label", children: t }),
    /* @__PURE__ */ e.jsxs("label", { className: "ui-toggle-input-switch", children: [
      /* @__PURE__ */ e.jsx(
        "input",
        {
          type: "checkbox",
          id: i,
          checked: s,
          onChange: p,
          disabled: l
        }
      ),
      /* @__PURE__ */ e.jsx("span", { className: "ui-toggle-input-slider" })
    ] })
  ] });
}
const de = ["X", "Y", "Z"], he = ["ui-axis-x", "ui-axis-y", "ui-axis-z"];
function y({
  label: t,
  value: s,
  onChange: n,
  step: l = 0.1,
  disabled: u = !1,
  className: i = ""
}) {
  const p = a.useId(), c = a.useCallback(
    (o, d) => {
      const j = parseFloat(d.target.value);
      if (isNaN(j)) return;
      const C = [...s];
      C[o] = j, n(C);
    },
    [s, n]
  );
  return /* @__PURE__ */ e.jsxs("div", { className: `ui-control ui-vector-input ${i}`, children: [
    /* @__PURE__ */ e.jsx("label", { className: "ui-control-label", children: t }),
    /* @__PURE__ */ e.jsx("div", { className: "ui-vector-input-controls", children: de.map((o, d) => /* @__PURE__ */ e.jsxs("div", { className: `ui-vector-input-axis ${he[d]}`, children: [
      /* @__PURE__ */ e.jsx("label", { htmlFor: `${p}-${o}`, children: o }),
      /* @__PURE__ */ e.jsx(
        "input",
        {
          type: "text",
          inputMode: "decimal",
          id: `${p}-${o}`,
          value: s[d].toFixed(3),
          onChange: (j) => c(d, j),
          disabled: u
        }
      )
    ] }, o)) })
  ] });
}
function pe({ stats: t }) {
  const s = [];
  return t.meshes > 0 && s.push({ label: "Meshes", value: t.meshes }), t.materials > 0 && s.push({ label: "Materials", value: t.materials }), t.textures > 0 && s.push({ label: "Textures", value: t.textures }), t.triangles > 0 && s.push({ label: "Triangles", value: t.triangles.toLocaleString() }), t.geometryVRAM > 0 && s.push({ label: "Geometry VRAM", value: L(t.geometryVRAM) }), t.textureVRAM > 0 && s.push({ label: "Texture VRAM", value: L(t.textureVRAM) }), s.length === 0 ? null : /* @__PURE__ */ e.jsx("div", { className: "node-stats-tooltip", children: s.map(({ label: n, value: l }) => /* @__PURE__ */ e.jsxs("div", { className: "node-stats-row", children: [
    /* @__PURE__ */ e.jsx("span", { className: "node-stats-label", children: n }),
    /* @__PURE__ */ e.jsx("span", { className: "node-stats-value", children: l })
  ] }, n)) });
}
const xe = a.memo(function t({ node: s, depth: n, selectedNode: l, selectNode: u }) {
  const [i, p] = a.useState(n < 2), c = s.children.length > 0, o = l?.id === s.id, d = s.metadata?.stats, j = a.useCallback(
    (x) => {
      x.stopPropagation(), p((g) => !g);
    },
    []
  ), C = a.useCallback(() => {
    u(s.id);
  }, [u, s.id]), b = d ? /* @__PURE__ */ e.jsx(pe, { stats: d }) : null;
  return /* @__PURE__ */ e.jsxs("div", { className: "tree-node", children: [
    /* @__PURE__ */ e.jsx(J, { content: b, className: "node-stats-tooltip", children: /* @__PURE__ */ e.jsxs(
      "div",
      {
        className: `tree-node-row ${o ? "selected" : ""}`,
        style: { paddingLeft: `${n * 16 + 8}px` },
        onClick: C,
        role: "treeitem",
        "aria-selected": o,
        "aria-expanded": c ? i : void 0,
        children: [
          c ? /* @__PURE__ */ e.jsx(
            "button",
            {
              type: "button",
              className: "tree-node-toggle",
              onClick: j,
              "aria-label": i ? "Collapse" : "Expand",
              children: i ? "▼" : "▶"
            }
          ) : /* @__PURE__ */ e.jsx("span", { className: "tree-node-toggle-placeholder" }),
          /* @__PURE__ */ e.jsxs("span", { className: "tree-node-icon", role: "img", "aria-label": s.type, children: [
            s.type === "mesh" && /* @__PURE__ */ e.jsx(ee, {}),
            s.type === "light" && /* @__PURE__ */ e.jsx(te, {}),
            s.type === "camera" && /* @__PURE__ */ e.jsx(se, {}),
            s.type === "armature" && /* @__PURE__ */ e.jsx(ae, {}),
            s.type === "bone" && /* @__PURE__ */ e.jsx(ne, {}),
            s.type === "material" && /* @__PURE__ */ e.jsx(le, {}),
            (s.type === "node" || s.type === "scene") && (c ? /* @__PURE__ */ e.jsx(re, {}) : /* @__PURE__ */ e.jsx($, {})),
            !["mesh", "light", "camera", "armature", "bone", "material", "node", "scene"].includes(s.type) && /* @__PURE__ */ e.jsx($, {})
          ] }),
          /* @__PURE__ */ e.jsx("span", { className: "tree-node-name", children: s.name })
        ]
      }
    ) }),
    c && i && /* @__PURE__ */ e.jsx("div", { className: "tree-node-children", role: "group", children: s.children.map((x) => /* @__PURE__ */ e.jsx(
      t,
      {
        node: x,
        depth: n + 1,
        selectedNode: l,
        selectNode: u
      },
      x.id
    )) })
  ] });
});
function me({ sceneGraph: t, selectedNode: s, selectNode: n, isLoading: l, error: u }) {
  return l ? /* @__PURE__ */ e.jsx("div", { className: "scene-tree scene-tree-loading", children: /* @__PURE__ */ e.jsx("span", { className: "loading-text", children: "Loading..." }) }) : u ? /* @__PURE__ */ e.jsx("div", { className: "scene-tree scene-tree-error", children: /* @__PURE__ */ e.jsx("span", { className: "error-text", children: u }) }) : t ? /* @__PURE__ */ e.jsx("div", { className: "scene-tree", role: "tree", "aria-label": "Scene graph", children: /* @__PURE__ */ e.jsx(xe, { node: t, depth: 0, selectedNode: s, selectNode: n }) }) : /* @__PURE__ */ e.jsx("div", { className: "scene-tree scene-tree-empty", children: /* @__PURE__ */ e.jsx("span", { className: "empty-text", children: "No model loaded" }) });
}
var F = /* @__PURE__ */ ((t) => (t.OPAQUE = "OPAQUE", t.MASK = "MASK", t.BLEND = "BLEND", t))(F || {});
const ge = [
  { value: F.OPAQUE, label: "Opaque" },
  { value: F.MASK, label: "Mask" },
  { value: F.BLEND, label: "Blend" }
], R = {
  [m.Clearcoat]: "Clear Coat",
  [m.Transmission]: "Transmission",
  [m.IOR]: "IOR",
  [m.Sheen]: "Sheen",
  [m.Volume]: "Volume"
}, je = [
  { extension: m.Clearcoat, label: R[m.Clearcoat] },
  { extension: m.Transmission, label: R[m.Transmission] },
  { extension: m.IOR, label: R[m.IOR] },
  { extension: m.Sheen, label: R[m.Sheen] },
  { extension: m.Volume, label: R[m.Volume] }
];
function N({
  title: t,
  children: s,
  defaultOpen: n = !0
}) {
  return /* @__PURE__ */ e.jsxs("details", { className: "property-section", open: n, children: [
    /* @__PURE__ */ e.jsx("summary", { className: "property-section-header", children: t }),
    /* @__PURE__ */ e.jsx("div", { className: "property-section-content", children: s })
  ] });
}
function M({
  label: t,
  texture: s
}) {
  return s ? /* @__PURE__ */ e.jsxs("div", { className: "texture-slot", children: [
    /* @__PURE__ */ e.jsx("span", { className: "texture-slot-label", children: t }),
    /* @__PURE__ */ e.jsx("span", { className: "texture-slot-format", children: s.mimeType.replace("image/", "").toUpperCase() }),
    /* @__PURE__ */ e.jsx("span", { className: "texture-slot-size", children: s.width && s.height && `${s.width}×${s.height}` }),
    /* @__PURE__ */ e.jsx("span", { className: "texture-slot-vram", children: L(s.vram) })
  ] }) : null;
}
function Ce({ material: t, api: s, metadata: n }) {
  const l = t.getBaseColorFactor(), u = t.getMetallicFactor(), i = t.getRoughnessFactor(), p = t.getEmissiveFactor(), c = t.getNormalScale(), o = t.getOcclusionStrength(), d = t.getAlphaMode(), j = t.getAlphaCutoff(), C = t.getDoubleSided(), b = a.useMemo(() => {
    const r = /* @__PURE__ */ new Map();
    if (n?.textures && Array.isArray(n.textures))
      for (const S of n.textures)
        r.set(S.slot, S);
    return r;
  }, [n]), x = t.getExtension("KHR_materials_clearcoat"), g = t.getExtension("KHR_materials_transmission"), h = t.getExtension("KHR_materials_ior"), T = t.getExtension("KHR_materials_sheen"), k = t.getExtension("KHR_materials_volume"), _ = a.useMemo(() => je.filter(({ extension: r }) => {
    switch (r) {
      case m.Clearcoat:
        return !x;
      case m.Transmission:
        return !g;
      case m.IOR:
        return !h;
      case m.Sheen:
        return !T;
      case m.Volume:
        return !k;
      default:
        return !1;
    }
  }), [x, g, h, T, k]), K = a.useCallback(
    (r) => {
      s.updateMaterialProperty(t, "baseColorFactor", r);
    },
    [t, s]
  ), G = a.useCallback(
    (r) => {
      s.updateMaterialProperty(t, "metallicFactor", r);
    },
    [t, s]
  ), X = a.useCallback(
    (r) => {
      s.updateMaterialProperty(t, "roughnessFactor", r);
    },
    [t, s]
  ), H = a.useCallback(
    (r) => {
      s.updateMaterialProperty(t, "emissiveFactor", r);
    },
    [t, s]
  ), Q = a.useCallback(
    (r) => {
      s.updateMaterialProperty(t, "normalScale", r);
    },
    [t, s]
  ), U = a.useCallback(
    (r) => {
      s.updateMaterialProperty(t, "occlusionStrength", r);
    },
    [t, s]
  ), z = a.useCallback(
    (r) => {
      s.updateMaterialProperty(t, "alphaMode", r);
    },
    [t, s]
  ), Y = a.useCallback(
    (r) => {
      s.updateMaterialProperty(t, "alphaCutoff", r);
    },
    [t, s]
  ), Z = a.useCallback(
    (r) => {
      s.updateMaterialProperty(t, "doubleSided", r);
    },
    [t, s]
  ), q = a.useCallback(
    (r) => {
      const S = r.target.value;
      S && s.addMaterialExtension(t, S), r.target.value = "";
    },
    [t, s]
  );
  return /* @__PURE__ */ e.jsxs("div", { className: "material-editor", children: [
    /* @__PURE__ */ e.jsxs(N, { title: "Textures", defaultOpen: !0, children: [
      /* @__PURE__ */ e.jsx(M, { label: "Base Color", texture: b.get("baseColor") }),
      /* @__PURE__ */ e.jsx(M, { label: "Normal", texture: b.get("normal") }),
      /* @__PURE__ */ e.jsx(M, { label: "Metallic/Roughness", texture: b.get("metallicRoughness") }),
      /* @__PURE__ */ e.jsx(M, { label: "Occlusion", texture: b.get("occlusion") }),
      /* @__PURE__ */ e.jsx(M, { label: "Emissive", texture: b.get("emissive") })
    ] }),
    /* @__PURE__ */ e.jsxs(N, { title: "Base Properties", defaultOpen: !0, children: [
      /* @__PURE__ */ e.jsx(
        P,
        {
          label: "Base Color",
          value: l,
          onChange: K,
          includeAlpha: !0
        }
      ),
      /* @__PURE__ */ e.jsx(
        f,
        {
          label: "Metallic",
          value: u,
          onChange: G,
          min: 0,
          max: 1
        }
      ),
      /* @__PURE__ */ e.jsx(
        f,
        {
          label: "Roughness",
          value: i,
          onChange: X,
          min: 0,
          max: 1
        }
      ),
      /* @__PURE__ */ e.jsx(
        P,
        {
          label: "Emissive",
          value: p,
          onChange: H
        }
      ),
      /* @__PURE__ */ e.jsx(
        f,
        {
          label: "Normal Scale",
          value: c,
          onChange: Q,
          min: 0,
          max: 2
        }
      ),
      /* @__PURE__ */ e.jsx(
        f,
        {
          label: "Occlusion",
          value: o,
          onChange: U,
          min: 0,
          max: 1
        }
      )
    ] }),
    /* @__PURE__ */ e.jsxs(N, { title: "Alpha", children: [
      /* @__PURE__ */ e.jsx(
        oe,
        {
          label: "Alpha Mode",
          value: d,
          options: ge,
          onChange: z
        }
      ),
      d === "MASK" && /* @__PURE__ */ e.jsx(
        f,
        {
          label: "Alpha Cutoff",
          value: j,
          onChange: Y,
          min: 0,
          max: 1
        }
      ),
      /* @__PURE__ */ e.jsx(
        ue,
        {
          label: "Double Sided",
          value: C,
          onChange: Z
        }
      )
    ] }),
    x && /* @__PURE__ */ e.jsxs(N, { title: "Clear Coat", children: [
      /* @__PURE__ */ e.jsx(
        f,
        {
          label: "Factor",
          value: x.getClearcoatFactor(),
          onChange: (r) => s.updateMaterialProperty(t, "clearcoatFactor", r),
          min: 0,
          max: 1
        }
      ),
      /* @__PURE__ */ e.jsx(
        f,
        {
          label: "Roughness",
          value: x.getClearcoatRoughnessFactor(),
          onChange: (r) => s.updateMaterialProperty(t, "clearcoatRoughnessFactor", r),
          min: 0,
          max: 1
        }
      )
    ] }),
    g && /* @__PURE__ */ e.jsx(N, { title: "Transmission", children: /* @__PURE__ */ e.jsx(
      f,
      {
        label: "Factor",
        value: g.getTransmissionFactor(),
        onChange: (r) => s.updateMaterialProperty(t, "transmissionFactor", r),
        min: 0,
        max: 1
      }
    ) }),
    h && /* @__PURE__ */ e.jsx(N, { title: "Index of Refraction", children: /* @__PURE__ */ e.jsx(
      f,
      {
        label: "IOR",
        value: h.getIOR(),
        onChange: (r) => s.updateMaterialProperty(t, "ior", r),
        min: 1,
        max: 3,
        step: 0.01
      }
    ) }),
    T && /* @__PURE__ */ e.jsxs(N, { title: "Sheen", children: [
      /* @__PURE__ */ e.jsx(
        P,
        {
          label: "Color",
          value: T.getSheenColorFactor(),
          onChange: (r) => s.updateMaterialProperty(t, "sheenColorFactor", r)
        }
      ),
      /* @__PURE__ */ e.jsx(
        f,
        {
          label: "Roughness",
          value: T.getSheenRoughnessFactor(),
          onChange: (r) => s.updateMaterialProperty(t, "sheenRoughnessFactor", r),
          min: 0,
          max: 1
        }
      )
    ] }),
    k && /* @__PURE__ */ e.jsx(N, { title: "Volume", children: /* @__PURE__ */ e.jsx(
      f,
      {
        label: "Thickness",
        value: k.getThicknessFactor(),
        onChange: (r) => s.updateMaterialProperty(t, "thicknessFactor", r),
        min: 0,
        max: 100,
        step: 0.1
      }
    ) }),
    _.length > 0 && /* @__PURE__ */ e.jsx(N, { title: "Extensions", defaultOpen: !1, children: /* @__PURE__ */ e.jsxs(
      "select",
      {
        className: "ui-select-input-select",
        onChange: q,
        defaultValue: "",
        children: [
          /* @__PURE__ */ e.jsx("option", { value: "", disabled: !0, children: "Add extension..." }),
          _.map(({ extension: r, label: S }) => /* @__PURE__ */ e.jsx("option", { value: r, children: S }, r))
        ]
      }
    ) })
  ] });
}
function fe({ light: t, api: s }) {
  const n = t.getType(), l = t.getIntensity(), u = t.getColor(), i = t.getRange() ?? 0, p = v.radToDeg(t.getInnerConeAngle() ?? 0), c = v.radToDeg(t.getOuterConeAngle() ?? Math.PI / 4), o = a.useCallback(
    (x) => {
      s.updateLightProperty(t, "color", x.slice(0, 3));
    },
    [t, s]
  ), d = a.useCallback(
    (x) => {
      s.updateLightProperty(t, "intensity", x);
    },
    [t, s]
  ), j = a.useCallback(
    (x) => {
      s.updateLightProperty(t, "range", x || null);
    },
    [t, s]
  ), C = a.useCallback(
    (x) => {
      s.updateLightProperty(t, "innerConeAngle", v.degToRad(x));
    },
    [t, s]
  ), b = a.useCallback(
    (x) => {
      s.updateLightProperty(t, "outerConeAngle", v.degToRad(x));
    },
    [t, s]
  );
  return /* @__PURE__ */ e.jsxs("div", { className: "light-editor", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "editor-info", children: [
      /* @__PURE__ */ e.jsx("span", { className: "editor-info-label", children: "Type" }),
      /* @__PURE__ */ e.jsx("span", { className: "editor-info-value", children: n })
    ] }),
    /* @__PURE__ */ e.jsx(P, { label: "Color", value: u, onChange: o }),
    /* @__PURE__ */ e.jsx(
      f,
      {
        label: "Intensity",
        value: l,
        onChange: d,
        min: 0,
        max: 1e3,
        step: 1
      }
    ),
    (n === "point" || n === "spot") && /* @__PURE__ */ e.jsx(
      f,
      {
        label: "Range",
        value: i,
        onChange: j,
        min: 0,
        max: 1e3,
        step: 1
      }
    ),
    n === "spot" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      /* @__PURE__ */ e.jsx(
        f,
        {
          label: "Inner Cone",
          value: p,
          onChange: C,
          min: 0,
          max: 90,
          step: 1
        }
      ),
      /* @__PURE__ */ e.jsx(
        f,
        {
          label: "Outer Cone",
          value: c,
          onChange: b,
          min: 0,
          max: 90,
          step: 1
        }
      )
    ] })
  ] });
}
const A = new w(), V = new O();
function be(t) {
  return V.set(t[0], t[1], t[2], t[3]), A.setFromQuaternion(V, "XYZ"), [
    v.radToDeg(A.x),
    v.radToDeg(A.y),
    v.radToDeg(A.z)
  ];
}
function ve({ node: t, api: s }) {
  const n = t.getTranslation(), l = be(t.getRotation()), u = t.getScale(), i = a.useCallback(
    (o) => {
      s.updateNodeTransform(t, "translation", o);
    },
    [t, s]
  ), p = a.useCallback(
    (o) => {
      s.updateNodeTransform(t, "rotation", o);
    },
    [t, s]
  ), c = a.useCallback(
    (o) => {
      s.updateNodeTransform(t, "scale", o);
    },
    [t, s]
  );
  return /* @__PURE__ */ e.jsxs("div", { className: "node-editor property-section-content", children: [
    /* @__PURE__ */ e.jsx(
      y,
      {
        label: "Translation",
        value: n,
        onChange: i,
        step: 0.1
      }
    ),
    /* @__PURE__ */ e.jsx(
      y,
      {
        label: "Rotation",
        value: l,
        onChange: p,
        step: 1
      }
    ),
    /* @__PURE__ */ e.jsx(
      y,
      {
        label: "Scale",
        value: u,
        onChange: c,
        step: 0.1
      }
    )
  ] });
}
const E = new w(), D = new O();
function Ne({ node: t, api: s }) {
  const n = t.getTranslation(), l = t.getRotation(), u = t.getScale(), i = [0, 0, 0];
  l && (D.set(l[0], l[1], l[2], l[3]), E.setFromQuaternion(D, "XYZ"), i[0] = v.radToDeg(E.x), i[1] = v.radToDeg(E.y), i[2] = v.radToDeg(E.z));
  const p = a.useCallback(
    (d) => {
      s.updateNodeTransform(t, "translation", d);
    },
    [t, s]
  ), c = a.useCallback(
    (d) => {
      s.updateNodeTransform(t, "rotation", d);
    },
    [t, s]
  ), o = a.useCallback(
    (d) => {
      s.updateNodeTransform(t, "scale", d);
    },
    [t, s]
  );
  return /* @__PURE__ */ e.jsx("div", { className: "armature-editor", children: /* @__PURE__ */ e.jsx("div", { className: "property-section", children: /* @__PURE__ */ e.jsxs("div", { className: "property-section-content", children: [
    /* @__PURE__ */ e.jsx(
      y,
      {
        label: "Position",
        value: n,
        onChange: p,
        step: 0.01
      }
    ),
    /* @__PURE__ */ e.jsx(
      y,
      {
        label: "Rotation",
        value: i,
        onChange: c,
        step: 1
      }
    ),
    /* @__PURE__ */ e.jsx(
      y,
      {
        label: "Scale",
        value: u,
        onChange: o,
        step: 0.01
      }
    )
  ] }) }) });
}
const I = new w(), B = new O();
function ye({ node: t, api: s }) {
  const n = t.getTranslation(), l = t.getRotation(), u = t.getScale(), i = [0, 0, 0];
  l && (B.set(l[0], l[1], l[2], l[3]), I.setFromQuaternion(B, "XYZ"), i[0] = v.radToDeg(I.x), i[1] = v.radToDeg(I.y), i[2] = v.radToDeg(I.z));
  const p = a.useCallback(
    (d) => {
      s.updateNodeTransform(t, "translation", d);
    },
    [t, s]
  ), c = a.useCallback(
    (d) => {
      s.updateNodeTransform(t, "rotation", d);
    },
    [t, s]
  ), o = a.useCallback(
    (d) => {
      s.updateNodeTransform(t, "scale", d);
    },
    [t, s]
  );
  return /* @__PURE__ */ e.jsx("div", { className: "bone-editor", children: /* @__PURE__ */ e.jsx("div", { className: "property-section", children: /* @__PURE__ */ e.jsxs("div", { className: "property-section-content", children: [
    /* @__PURE__ */ e.jsx(
      y,
      {
        label: "Position",
        value: n,
        onChange: p,
        step: 0.01
      }
    ),
    /* @__PURE__ */ e.jsx(
      y,
      {
        label: "Rotation",
        value: i,
        onChange: c,
        step: 1
      }
    ),
    /* @__PURE__ */ e.jsx(
      y,
      {
        label: "Scale",
        value: u,
        onChange: o,
        step: 0.01
      }
    )
  ] }) }) });
}
function Se({ mesh: t, metadata: s }) {
  const n = s?.triangleCount, l = t.listPrimitives().length;
  let u = 0;
  for (const i of t.listPrimitives()) {
    const p = i.getAttribute("POSITION");
    p && (u += p.getCount());
  }
  return /* @__PURE__ */ e.jsxs("div", { className: "mesh-editor property-section-content", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "editor-info", children: [
      /* @__PURE__ */ e.jsx("span", { className: "editor-info-label", children: "Triangles" }),
      /* @__PURE__ */ e.jsx("span", { className: "editor-info-value", children: n?.toLocaleString() ?? "N/A" })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "editor-info", children: [
      /* @__PURE__ */ e.jsx("span", { className: "editor-info-label", children: "Vertices" }),
      /* @__PURE__ */ e.jsx("span", { className: "editor-info-value", children: u.toLocaleString() })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "editor-info", children: [
      /* @__PURE__ */ e.jsx("span", { className: "editor-info-label", children: "Primitives" }),
      /* @__PURE__ */ e.jsx("span", { className: "editor-info-value", children: l })
    ] })
  ] });
}
function Te({ selectedNode: t, api: s }) {
  if (!t)
    return /* @__PURE__ */ e.jsx("div", { className: "property-editor property-editor-empty", children: /* @__PURE__ */ e.jsx("div", { className: "empty-state", children: /* @__PURE__ */ e.jsx("span", { className: "empty-state-text", children: "Select an object in the scene graph to view its properties" }) }) });
  const n = () => {
    switch (t.type) {
      case "material":
        return /* @__PURE__ */ e.jsx(Ce, { material: t.gltfRef, api: s, metadata: t.metadata });
      case "mesh":
        return /* @__PURE__ */ e.jsx(Se, { mesh: t.gltfRef, metadata: t.metadata });
      case "light":
        return /* @__PURE__ */ e.jsx(fe, { light: t.gltfRef, api: s });
      case "node":
        return /* @__PURE__ */ e.jsx(ve, { node: t.gltfRef, api: s });
      case "armature":
        return /* @__PURE__ */ e.jsx(Ne, { node: t.gltfRef, api: s });
      case "bone":
        return /* @__PURE__ */ e.jsx(ye, { node: t.gltfRef, api: s });
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
      /* @__PURE__ */ e.jsx("span", { className: "property-editor-name", children: t.name }),
      /* @__PURE__ */ e.jsx("span", { className: "property-editor-type", children: t.type })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "property-editor-content", children: n() })
  ] });
}
function ke({ className: t = "", modelId: s, blob: n, onBlobChange: l, onReset: u, onStatsChange: i, onClose: p }) {
  const c = a.useMemo(() => new W(), []), [o, d] = a.useState(c.getState()), j = a.useRef(null), C = a.useRef(null);
  a.useEffect(() => (c.setOnStateChange(d), () => c.setOnStateChange(null)), [c]), a.useEffect(() => {
    if (!n || !s) {
      c.clear(), C.current = null;
      return;
    }
    if (s === j.current && s === C.current) {
      j.current = null;
      return;
    }
    C.current = s, c.loadBlob(n);
  }, [n, s, c]), a.useEffect(() => {
    if (i)
      if (o.sceneGraph?.metadata?.stats) {
        const h = o.sceneGraph.metadata.stats;
        i({
          meshes: h.meshes,
          materials: h.materials,
          textures: h.textures,
          triangles: h.triangles,
          geometryVRAM: h.geometryVRAM,
          textureVRAM: h.textureVRAM
        });
      } else
        i(null);
  }, [o.sceneGraph, i]);
  const b = a.useCallback(async () => {
    try {
      const h = await c.applyChanges();
      l && (j.current = s, await l(h));
    } catch (h) {
      console.error("Failed to apply changes:", h);
    }
  }, [c, l, s]), x = a.useCallback(async () => {
    try {
      if (await c.reset(), u)
        await u();
      else {
        const h = c.getState().originalBlob;
        l && h && await l(h);
      }
    } catch (h) {
      console.error("Failed to reset:", h);
    }
  }, [c, l, u]), g = a.useCallback(
    (h) => {
      c.selectNode(h);
    },
    [c]
  );
  return /* @__PURE__ */ e.jsxs("div", { className: `inspector-panel ${t}`, children: [
    /* @__PURE__ */ e.jsxs("div", { className: "inspector-panel-header", children: [
      /* @__PURE__ */ e.jsx("h2", { className: "inspector-panel-title", children: "Inspector" }),
      p && /* @__PURE__ */ e.jsx(
        "button",
        {
          type: "button",
          className: "inspector-panel-close",
          onClick: p,
          "aria-label": "Close inspector",
          children: /* @__PURE__ */ e.jsxs("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
            /* @__PURE__ */ e.jsx("line", { x1: "3", y1: "3", x2: "11", y2: "11" }),
            /* @__PURE__ */ e.jsx("line", { x1: "11", y1: "3", x2: "3", y2: "11" })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "inspector-panel-body", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "inspector-panel-section scene-tree-section", children: [
        /* @__PURE__ */ e.jsx("div", { className: "section-header", children: "Scene Graph" }),
        /* @__PURE__ */ e.jsx(
          me,
          {
            sceneGraph: o.sceneGraph,
            selectedNode: o.selectedNode,
            selectNode: g,
            isLoading: o.isLoading,
            error: o.error
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "inspector-panel-divider" }),
      /* @__PURE__ */ e.jsxs("div", { className: "inspector-panel-section property-editor-section", children: [
        /* @__PURE__ */ e.jsx("div", { className: "section-header", children: "Properties" }),
        /* @__PURE__ */ e.jsx(Te, { selectedNode: o.selectedNode, api: c })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "inspector-panel-footer", children: [
      /* @__PURE__ */ e.jsx(
        "button",
        {
          type: "button",
          className: "inspector-button inspector-button-secondary",
          onClick: x,
          disabled: !o.document || o.isLoading,
          children: "Reset"
        }
      ),
      /* @__PURE__ */ e.jsx(
        "button",
        {
          type: "button",
          className: "inspector-button inspector-button-primary",
          onClick: b,
          disabled: !o.isDirty || o.isLoading,
          children: o.isLoading ? "Applying..." : "Apply Changes"
        }
      )
    ] })
  ] });
}
export {
  F as AlphaMode,
  W as InspectorAPI,
  ke as InspectorPanel,
  m as MaterialExtension,
  Ie as SceneGraphNodeType
};
