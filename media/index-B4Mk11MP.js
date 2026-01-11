import { formatBytes as L, MaterialExtension as g, InspectorAPI as ee } from "./index-qXG1asua.js";
import { SceneGraphNodeType as Le } from "./index-qXG1asua.js";
import { eg as n, eh as e, ei as se, ej as te, ek as ae, el as ne, em as re, en as le, eo as oe, ep as ce, eq as D, er as f, es as ie, et as ue, eu as de, cq as C, a2 as $, cs as _ } from "./index-ZWlHOBvT.js";
function he(s) {
  const t = Math.round(s[0] * 255).toString(16).padStart(2, "0"), a = Math.round(s[1] * 255).toString(16).padStart(2, "0"), r = Math.round(s[2] * 255).toString(16).padStart(2, "0");
  return `#${t}${a}${r}`;
}
function pe(s) {
  const t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(s);
  return t ? [
    parseInt(t[1], 16) / 255,
    parseInt(t[2], 16) / 255,
    parseInt(t[3], 16) / 255
  ] : [1, 1, 1];
}
function F({
  label: s,
  value: t,
  onChange: a,
  includeAlpha: r = !1,
  disabled: i = !1,
  className: u = ""
}) {
  const p = n.useId(), [c, o] = n.useState(!1), d = n.useRef(null), v = he(t), j = t.length === 4 ? t[3] : 1;
  n.useEffect(() => {
    if (!c) return;
    const m = (h) => {
      d.current && !d.current.contains(h.target) && o(!1);
    };
    return document.addEventListener("mousedown", m), () => document.removeEventListener("mousedown", m);
  }, [c]);
  const b = n.useCallback(
    (m) => {
      const h = pe(m);
      a(r ? [...h, j] : h);
    },
    [a, r, j]
  ), x = n.useCallback(
    (m) => {
      a([t[0], t[1], t[2], m]);
    },
    [a, t]
  );
  return /* @__PURE__ */ e.jsxs("div", { className: `ui-control ui-color-picker ${u}`, children: [
    /* @__PURE__ */ e.jsx("label", { className: "ui-control-label", children: s }),
    /* @__PURE__ */ e.jsxs("div", { className: "ui-color-picker-controls", children: [
      /* @__PURE__ */ e.jsx(
        "button",
        {
          type: "button",
          className: "ui-color-picker-swatch",
          style: {
            backgroundColor: v,
            opacity: j
          },
          onClick: () => !i && o(!c),
          disabled: i,
          "aria-label": `Select ${s} color`
        }
      ),
      /* @__PURE__ */ e.jsx("span", { className: "ui-color-picker-value", children: v.toUpperCase() }),
      c && /* @__PURE__ */ e.jsxs("div", { ref: d, className: "ui-color-picker-popover", children: [
        /* @__PURE__ */ e.jsx(
          "input",
          {
            type: "color",
            id: p,
            className: "ui-color-picker-input",
            value: v,
            onChange: (m) => b(m.target.value),
            disabled: i
          }
        ),
        r && /* @__PURE__ */ e.jsxs("div", { className: "ui-color-picker-alpha", children: [
          /* @__PURE__ */ e.jsx("label", { htmlFor: `${p}-alpha`, children: "Alpha" }),
          /* @__PURE__ */ e.jsx(
            "input",
            {
              type: "range",
              id: `${p}-alpha`,
              min: 0,
              max: 1,
              step: 0.01,
              value: j,
              onChange: (m) => x(parseFloat(m.target.value)),
              disabled: i
            }
          ),
          /* @__PURE__ */ e.jsx("span", { children: j.toFixed(2) })
        ] })
      ] })
    ] })
  ] });
}
function xe({
  label: s,
  value: t,
  onChange: a,
  disabled: r = !1,
  className: i = ""
}) {
  const u = n.useId(), p = n.useCallback(
    (c) => {
      a(c.target.checked);
    },
    [a]
  );
  return /* @__PURE__ */ e.jsxs("div", { className: `ui-control ui-toggle-input ${i}`, children: [
    /* @__PURE__ */ e.jsx("label", { htmlFor: u, className: "ui-control-label", children: s }),
    /* @__PURE__ */ e.jsxs("label", { className: "ui-toggle-input-switch", children: [
      /* @__PURE__ */ e.jsx(
        "input",
        {
          type: "checkbox",
          id: u,
          checked: t,
          onChange: p,
          disabled: r
        }
      ),
      /* @__PURE__ */ e.jsx("span", { className: "ui-toggle-input-slider" })
    ] })
  ] });
}
const me = ["X", "Y", "Z"], ge = ["ui-axis-x", "ui-axis-y", "ui-axis-z"];
function y({
  label: s,
  value: t,
  onChange: a,
  step: r = 0.1,
  disabled: i = !1,
  className: u = ""
}) {
  const p = n.useId(), c = n.useCallback(
    (o, d) => {
      const v = parseFloat(d.target.value);
      if (isNaN(v)) return;
      const j = [...t];
      j[o] = v, a(j);
    },
    [t, a]
  );
  return /* @__PURE__ */ e.jsxs("div", { className: `ui-control ui-vector-input ${u}`, children: [
    /* @__PURE__ */ e.jsx("label", { className: "ui-control-label", children: s }),
    /* @__PURE__ */ e.jsx("div", { className: "ui-vector-input-controls", children: me.map((o, d) => /* @__PURE__ */ e.jsxs("div", { className: `ui-vector-input-axis ${ge[d]}`, children: [
      /* @__PURE__ */ e.jsx("label", { htmlFor: `${p}-${o}`, children: o }),
      /* @__PURE__ */ e.jsx(
        "input",
        {
          type: "text",
          inputMode: "decimal",
          id: `${p}-${o}`,
          value: t[d].toFixed(3),
          onChange: (v) => c(d, v),
          disabled: i
        }
      )
    ] }, o)) })
  ] });
}
function je({ stats: s }) {
  const t = [];
  return s.meshes > 0 && t.push({ label: "Meshes", value: s.meshes }), s.materials > 0 && t.push({ label: "Materials", value: s.materials }), s.textures > 0 && t.push({ label: "Textures", value: s.textures }), s.triangles > 0 && t.push({ label: "Triangles", value: s.triangles.toLocaleString() }), s.geometryVRAM > 0 && t.push({ label: "Geometry VRAM", value: L(s.geometryVRAM) }), s.textureVRAM > 0 && t.push({ label: "Texture VRAM", value: L(s.textureVRAM) }), t.length === 0 ? null : /* @__PURE__ */ e.jsx("div", { className: "node-stats-tooltip", children: t.map(({ label: a, value: r }) => /* @__PURE__ */ e.jsxs("div", { className: "node-stats-row", children: [
    /* @__PURE__ */ e.jsx("span", { className: "node-stats-label", children: a }),
    /* @__PURE__ */ e.jsx("span", { className: "node-stats-value", children: r })
  ] }, a)) });
}
const ve = n.memo(function s({ node: t, depth: a, selectedNode: r, selectNode: i }) {
  const [u, p] = n.useState(a < 2), c = t.children.length > 0, o = r?.id === t.id, d = t.metadata?.stats, v = n.useCallback(
    (x) => {
      x.stopPropagation(), p((m) => !m);
    },
    []
  ), j = n.useCallback(() => {
    i(t.id);
  }, [i, t.id]), b = d ? /* @__PURE__ */ e.jsx(je, { stats: d }) : null;
  return /* @__PURE__ */ e.jsxs("div", { className: "tree-node", children: [
    /* @__PURE__ */ e.jsx(se, { content: b, className: "node-stats-tooltip", children: /* @__PURE__ */ e.jsxs(
      "div",
      {
        className: `tree-node-row ${o ? "selected" : ""}`,
        style: { paddingLeft: `${a * 16 + 8}px` },
        onClick: j,
        role: "treeitem",
        "aria-selected": o,
        "aria-expanded": c ? u : void 0,
        children: [
          c ? /* @__PURE__ */ e.jsx(
            "button",
            {
              type: "button",
              className: "tree-node-toggle",
              onClick: v,
              "aria-label": u ? "Collapse" : "Expand",
              children: u ? "▼" : "▶"
            }
          ) : /* @__PURE__ */ e.jsx("span", { className: "tree-node-toggle-placeholder" }),
          /* @__PURE__ */ e.jsxs("span", { className: "tree-node-icon", role: "img", "aria-label": t.type, children: [
            t.type === "mesh" && /* @__PURE__ */ e.jsx(te, {}),
            t.type === "light" && /* @__PURE__ */ e.jsx(ae, {}),
            t.type === "camera" && /* @__PURE__ */ e.jsx(ne, {}),
            t.type === "armature" && /* @__PURE__ */ e.jsx(re, {}),
            t.type === "bone" && /* @__PURE__ */ e.jsx(le, {}),
            t.type === "material" && /* @__PURE__ */ e.jsx(oe, {}),
            (t.type === "node" || t.type === "scene") && (c ? /* @__PURE__ */ e.jsx(ce, {}) : /* @__PURE__ */ e.jsx(D, {})),
            !["mesh", "light", "camera", "armature", "bone", "material", "node", "scene"].includes(t.type) && /* @__PURE__ */ e.jsx(D, {})
          ] }),
          /* @__PURE__ */ e.jsx("span", { className: "tree-node-name", children: t.name })
        ]
      }
    ) }),
    c && u && /* @__PURE__ */ e.jsx("div", { className: "tree-node-children", role: "group", children: t.children.map((x) => /* @__PURE__ */ e.jsx(
      s,
      {
        node: x,
        depth: a + 1,
        selectedNode: r,
        selectNode: i
      },
      x.id
    )) })
  ] });
});
function fe({ sceneGraph: s, selectedNode: t, selectNode: a, isLoading: r, error: i }) {
  return r ? /* @__PURE__ */ e.jsx("div", { className: "scene-tree scene-tree-loading", children: /* @__PURE__ */ e.jsx("span", { className: "loading-text", children: "Loading..." }) }) : i ? /* @__PURE__ */ e.jsx("div", { className: "scene-tree scene-tree-error", children: /* @__PURE__ */ e.jsx("span", { className: "error-text", children: i }) }) : s ? /* @__PURE__ */ e.jsx("div", { className: "scene-tree", role: "tree", "aria-label": "Scene graph", children: /* @__PURE__ */ e.jsx(ve, { node: s, depth: 0, selectedNode: t, selectNode: a }) }) : /* @__PURE__ */ e.jsx("div", { className: "scene-tree scene-tree-empty", children: /* @__PURE__ */ e.jsx("span", { className: "empty-text", children: "No model loaded" }) });
}
var O = /* @__PURE__ */ ((s) => (s.OPAQUE = "OPAQUE", s.MASK = "MASK", s.BLEND = "BLEND", s))(O || {});
const Ce = [
  { value: O.OPAQUE, label: "Opaque" },
  { value: O.MASK, label: "Mask" },
  { value: O.BLEND, label: "Blend" }
], k = {
  [g.Clearcoat]: "Clear Coat",
  [g.Transmission]: "Transmission",
  [g.IOR]: "IOR",
  [g.Sheen]: "Sheen",
  [g.Volume]: "Volume"
}, be = [
  { extension: g.Clearcoat, label: k[g.Clearcoat] },
  { extension: g.Transmission, label: k[g.Transmission] },
  { extension: g.IOR, label: k[g.IOR] },
  { extension: g.Sheen, label: k[g.Sheen] },
  { extension: g.Volume, label: k[g.Volume] }
];
function N({
  title: s,
  children: t,
  defaultOpen: a = !0
}) {
  return /* @__PURE__ */ e.jsxs("details", { className: "property-section", open: a, children: [
    /* @__PURE__ */ e.jsx("summary", { className: "property-section-header", children: s }),
    /* @__PURE__ */ e.jsx("div", { className: "property-section-content", children: t })
  ] });
}
function R({
  label: s,
  texture: t,
  onPreview: a
}) {
  if (!t) return null;
  const r = () => {
    t.previewUrl && a && a(t);
  };
  return /* @__PURE__ */ e.jsxs(
    "div",
    {
      className: `texture-slot ${t.previewUrl ? "texture-slot--clickable" : "texture-slot--no-preview"}`,
      onClick: r,
      children: [
        /* @__PURE__ */ e.jsx("div", { className: "texture-slot-thumbnail", children: t.previewUrl ? /* @__PURE__ */ e.jsx("img", { src: t.previewUrl, alt: s }) : /* @__PURE__ */ e.jsx(de, { className: "texture-slot-thumbnail-icon" }) }),
        /* @__PURE__ */ e.jsx("span", { className: "texture-slot-label", children: s }),
        /* @__PURE__ */ e.jsx("span", { className: "texture-slot-format", children: t.mimeType.replace("image/", "").toUpperCase() }),
        /* @__PURE__ */ e.jsx("span", { className: "texture-slot-size", children: t.width && t.height && `${t.width}×${t.height}` }),
        /* @__PURE__ */ e.jsx("span", { className: "texture-slot-vram", children: L(t.vram) })
      ]
    }
  );
}
function Ne({
  texture: s,
  onClose: t
}) {
  return s.previewUrl ? ue.createPortal(
    /* @__PURE__ */ e.jsx("div", { className: "texture-preview-overlay", onClick: t, children: /* @__PURE__ */ e.jsxs("div", { className: "texture-preview-modal", onClick: (a) => a.stopPropagation(), children: [
      /* @__PURE__ */ e.jsxs("div", { className: "texture-preview-info", children: [
        /* @__PURE__ */ e.jsx("span", { className: "texture-preview-info-name", children: s.name }),
        /* @__PURE__ */ e.jsx("span", { className: "texture-preview-info-format", children: s.mimeType.replace("image/", "").toUpperCase() }),
        /* @__PURE__ */ e.jsxs("span", { className: "texture-preview-info-size", children: [
          s.width,
          "×",
          s.height
        ] }),
        /* @__PURE__ */ e.jsx("span", { className: "texture-preview-info-vram", children: L(s.vram) })
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
function ye({ material: s, api: t, metadata: a }) {
  const [r, i] = n.useState(null), u = s.getBaseColorFactor(), p = s.getMetallicFactor(), c = s.getRoughnessFactor(), o = s.getEmissiveFactor(), d = s.getNormalScale(), v = s.getOcclusionStrength(), j = s.getAlphaMode(), b = s.getAlphaCutoff(), x = s.getDoubleSided(), m = n.useMemo(() => {
    const l = /* @__PURE__ */ new Map();
    if (a?.textures && Array.isArray(a.textures))
      for (const S of a.textures)
        l.set(S.slot, S);
    return l;
  }, [a]), h = s.getExtension("KHR_materials_clearcoat"), M = s.getExtension("KHR_materials_transmission"), A = s.getExtension("KHR_materials_ior"), T = s.getExtension("KHR_materials_sheen"), E = s.getExtension("KHR_materials_volume"), V = n.useMemo(() => be.filter(({ extension: l }) => {
    switch (l) {
      case g.Clearcoat:
        return !h;
      case g.Transmission:
        return !M;
      case g.IOR:
        return !A;
      case g.Sheen:
        return !T;
      case g.Volume:
        return !E;
      default:
        return !1;
    }
  }), [h, M, A, T, E]), G = n.useCallback(
    (l) => {
      t.updateMaterialProperty(s, "baseColorFactor", l);
    },
    [s, t]
  ), X = n.useCallback(
    (l) => {
      t.updateMaterialProperty(s, "metallicFactor", l);
    },
    [s, t]
  ), H = n.useCallback(
    (l) => {
      t.updateMaterialProperty(s, "roughnessFactor", l);
    },
    [s, t]
  ), Q = n.useCallback(
    (l) => {
      t.updateMaterialProperty(s, "emissiveFactor", l);
    },
    [s, t]
  ), z = n.useCallback(
    (l) => {
      t.updateMaterialProperty(s, "normalScale", l);
    },
    [s, t]
  ), q = n.useCallback(
    (l) => {
      t.updateMaterialProperty(s, "occlusionStrength", l);
    },
    [s, t]
  ), Y = n.useCallback(
    (l) => {
      t.updateMaterialProperty(s, "alphaMode", l);
    },
    [s, t]
  ), Z = n.useCallback(
    (l) => {
      t.updateMaterialProperty(s, "alphaCutoff", l);
    },
    [s, t]
  ), W = n.useCallback(
    (l) => {
      t.updateMaterialProperty(s, "doubleSided", l);
    },
    [s, t]
  ), J = n.useCallback(
    (l) => {
      const S = l.target.value;
      S && t.addMaterialExtension(s, S), l.target.value = "";
    },
    [s, t]
  );
  return /* @__PURE__ */ e.jsxs("div", { className: "material-editor", children: [
    r && /* @__PURE__ */ e.jsx(
      Ne,
      {
        texture: r,
        onClose: () => i(null)
      }
    ),
    /* @__PURE__ */ e.jsxs(N, { title: "Textures", defaultOpen: !0, children: [
      /* @__PURE__ */ e.jsx(R, { label: "Base Color", texture: m.get("baseColor"), onPreview: i }),
      /* @__PURE__ */ e.jsx(R, { label: "Normal", texture: m.get("normal"), onPreview: i }),
      /* @__PURE__ */ e.jsx(R, { label: "Metallic/Roughness", texture: m.get("metallicRoughness"), onPreview: i }),
      /* @__PURE__ */ e.jsx(R, { label: "Occlusion", texture: m.get("occlusion"), onPreview: i }),
      /* @__PURE__ */ e.jsx(R, { label: "Emissive", texture: m.get("emissive"), onPreview: i })
    ] }),
    /* @__PURE__ */ e.jsxs(N, { title: "Base Properties", defaultOpen: !0, children: [
      /* @__PURE__ */ e.jsx(
        F,
        {
          label: "Base Color",
          value: u,
          onChange: G,
          includeAlpha: !0
        }
      ),
      /* @__PURE__ */ e.jsx(
        f,
        {
          label: "Metallic",
          value: p,
          onChange: X,
          min: 0,
          max: 1
        }
      ),
      /* @__PURE__ */ e.jsx(
        f,
        {
          label: "Roughness",
          value: c,
          onChange: H,
          min: 0,
          max: 1
        }
      ),
      /* @__PURE__ */ e.jsx(
        F,
        {
          label: "Emissive",
          value: o,
          onChange: Q
        }
      ),
      /* @__PURE__ */ e.jsx(
        f,
        {
          label: "Normal Scale",
          value: d,
          onChange: z,
          min: 0,
          max: 2
        }
      ),
      /* @__PURE__ */ e.jsx(
        f,
        {
          label: "Occlusion",
          value: v,
          onChange: q,
          min: 0,
          max: 1
        }
      )
    ] }),
    /* @__PURE__ */ e.jsxs(N, { title: "Alpha", children: [
      /* @__PURE__ */ e.jsx(
        ie,
        {
          label: "Alpha Mode",
          value: j,
          options: Ce,
          onChange: Y
        }
      ),
      j === "MASK" && /* @__PURE__ */ e.jsx(
        f,
        {
          label: "Alpha Cutoff",
          value: b,
          onChange: Z,
          min: 0,
          max: 1
        }
      ),
      /* @__PURE__ */ e.jsx(
        xe,
        {
          label: "Double Sided",
          value: x,
          onChange: W
        }
      )
    ] }),
    h && /* @__PURE__ */ e.jsxs(N, { title: "Clear Coat", children: [
      /* @__PURE__ */ e.jsx(
        f,
        {
          label: "Factor",
          value: h.getClearcoatFactor(),
          onChange: (l) => t.updateMaterialProperty(s, "clearcoatFactor", l),
          min: 0,
          max: 1
        }
      ),
      /* @__PURE__ */ e.jsx(
        f,
        {
          label: "Roughness",
          value: h.getClearcoatRoughnessFactor(),
          onChange: (l) => t.updateMaterialProperty(s, "clearcoatRoughnessFactor", l),
          min: 0,
          max: 1
        }
      )
    ] }),
    M && /* @__PURE__ */ e.jsx(N, { title: "Transmission", children: /* @__PURE__ */ e.jsx(
      f,
      {
        label: "Factor",
        value: M.getTransmissionFactor(),
        onChange: (l) => t.updateMaterialProperty(s, "transmissionFactor", l),
        min: 0,
        max: 1
      }
    ) }),
    A && /* @__PURE__ */ e.jsx(N, { title: "Index of Refraction", children: /* @__PURE__ */ e.jsx(
      f,
      {
        label: "IOR",
        value: A.getIOR(),
        onChange: (l) => t.updateMaterialProperty(s, "ior", l),
        min: 1,
        max: 3,
        step: 0.01
      }
    ) }),
    T && /* @__PURE__ */ e.jsxs(N, { title: "Sheen", children: [
      /* @__PURE__ */ e.jsx(
        F,
        {
          label: "Color",
          value: T.getSheenColorFactor(),
          onChange: (l) => t.updateMaterialProperty(s, "sheenColorFactor", l)
        }
      ),
      /* @__PURE__ */ e.jsx(
        f,
        {
          label: "Roughness",
          value: T.getSheenRoughnessFactor(),
          onChange: (l) => t.updateMaterialProperty(s, "sheenRoughnessFactor", l),
          min: 0,
          max: 1
        }
      )
    ] }),
    E && /* @__PURE__ */ e.jsx(N, { title: "Volume", children: /* @__PURE__ */ e.jsx(
      f,
      {
        label: "Thickness",
        value: E.getThicknessFactor(),
        onChange: (l) => t.updateMaterialProperty(s, "thicknessFactor", l),
        min: 0,
        max: 100,
        step: 0.1
      }
    ) }),
    V.length > 0 && /* @__PURE__ */ e.jsx(N, { title: "Extensions", defaultOpen: !1, children: /* @__PURE__ */ e.jsxs(
      "select",
      {
        className: "ui-select-input-select",
        onChange: J,
        defaultValue: "",
        children: [
          /* @__PURE__ */ e.jsx("option", { value: "", disabled: !0, children: "Add extension..." }),
          V.map(({ extension: l, label: S }) => /* @__PURE__ */ e.jsx("option", { value: l, children: S }, l))
        ]
      }
    ) })
  ] });
}
function Se({ light: s, api: t }) {
  const a = s.getType(), r = s.getIntensity(), i = s.getColor(), u = s.getRange() ?? 0, p = C.radToDeg(s.getInnerConeAngle() ?? 0), c = C.radToDeg(s.getOuterConeAngle() ?? Math.PI / 4), o = n.useCallback(
    (x) => {
      t.updateLightProperty(s, "color", x.slice(0, 3));
    },
    [s, t]
  ), d = n.useCallback(
    (x) => {
      t.updateLightProperty(s, "intensity", x);
    },
    [s, t]
  ), v = n.useCallback(
    (x) => {
      t.updateLightProperty(s, "range", x || null);
    },
    [s, t]
  ), j = n.useCallback(
    (x) => {
      t.updateLightProperty(s, "innerConeAngle", C.degToRad(x));
    },
    [s, t]
  ), b = n.useCallback(
    (x) => {
      t.updateLightProperty(s, "outerConeAngle", C.degToRad(x));
    },
    [s, t]
  );
  return /* @__PURE__ */ e.jsxs("div", { className: "light-editor", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "editor-info", children: [
      /* @__PURE__ */ e.jsx("span", { className: "editor-info-label", children: "Type" }),
      /* @__PURE__ */ e.jsx("span", { className: "editor-info-value", children: a })
    ] }),
    /* @__PURE__ */ e.jsx(F, { label: "Color", value: i, onChange: o }),
    /* @__PURE__ */ e.jsx(
      f,
      {
        label: "Intensity",
        value: r,
        onChange: d,
        min: 0,
        max: 1e3,
        step: 1
      }
    ),
    (a === "point" || a === "spot") && /* @__PURE__ */ e.jsx(
      f,
      {
        label: "Range",
        value: u,
        onChange: v,
        min: 0,
        max: 1e3,
        step: 1
      }
    ),
    a === "spot" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      /* @__PURE__ */ e.jsx(
        f,
        {
          label: "Inner Cone",
          value: p,
          onChange: j,
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
const w = new _(), B = new $();
function Te(s) {
  return B.set(s[0], s[1], s[2], s[3]), w.setFromQuaternion(B, "XYZ"), [
    C.radToDeg(w.x),
    C.radToDeg(w.y),
    C.radToDeg(w.z)
  ];
}
function ke({ node: s, api: t }) {
  const a = s.getTranslation(), r = Te(s.getRotation()), i = s.getScale(), u = n.useCallback(
    (o) => {
      t.updateNodeTransform(s, "translation", o);
    },
    [s, t]
  ), p = n.useCallback(
    (o) => {
      t.updateNodeTransform(s, "rotation", o);
    },
    [s, t]
  ), c = n.useCallback(
    (o) => {
      t.updateNodeTransform(s, "scale", o);
    },
    [s, t]
  );
  return /* @__PURE__ */ e.jsxs("div", { className: "node-editor property-section-content", children: [
    /* @__PURE__ */ e.jsx(
      y,
      {
        label: "Translation",
        value: a,
        onChange: u,
        step: 0.1
      }
    ),
    /* @__PURE__ */ e.jsx(
      y,
      {
        label: "Rotation",
        value: r,
        onChange: p,
        step: 1
      }
    ),
    /* @__PURE__ */ e.jsx(
      y,
      {
        label: "Scale",
        value: i,
        onChange: c,
        step: 0.1
      }
    )
  ] });
}
const P = new _(), U = new $();
function Re({ node: s, api: t }) {
  const a = s.getTranslation(), r = s.getRotation(), i = s.getScale(), u = [0, 0, 0];
  r && (U.set(r[0], r[1], r[2], r[3]), P.setFromQuaternion(U, "XYZ"), u[0] = C.radToDeg(P.x), u[1] = C.radToDeg(P.y), u[2] = C.radToDeg(P.z));
  const p = n.useCallback(
    (d) => {
      t.updateNodeTransform(s, "translation", d);
    },
    [s, t]
  ), c = n.useCallback(
    (d) => {
      t.updateNodeTransform(s, "rotation", d);
    },
    [s, t]
  ), o = n.useCallback(
    (d) => {
      t.updateNodeTransform(s, "scale", d);
    },
    [s, t]
  );
  return /* @__PURE__ */ e.jsx("div", { className: "armature-editor", children: /* @__PURE__ */ e.jsx("div", { className: "property-section", children: /* @__PURE__ */ e.jsxs("div", { className: "property-section-content", children: [
    /* @__PURE__ */ e.jsx(
      y,
      {
        label: "Position",
        value: a,
        onChange: p,
        step: 0.01
      }
    ),
    /* @__PURE__ */ e.jsx(
      y,
      {
        label: "Rotation",
        value: u,
        onChange: c,
        step: 1
      }
    ),
    /* @__PURE__ */ e.jsx(
      y,
      {
        label: "Scale",
        value: i,
        onChange: o,
        step: 0.01
      }
    )
  ] }) }) });
}
const I = new _(), K = new $();
function Me({ node: s, api: t }) {
  const a = s.getTranslation(), r = s.getRotation(), i = s.getScale(), u = [0, 0, 0];
  r && (K.set(r[0], r[1], r[2], r[3]), I.setFromQuaternion(K, "XYZ"), u[0] = C.radToDeg(I.x), u[1] = C.radToDeg(I.y), u[2] = C.radToDeg(I.z));
  const p = n.useCallback(
    (d) => {
      t.updateNodeTransform(s, "translation", d);
    },
    [s, t]
  ), c = n.useCallback(
    (d) => {
      t.updateNodeTransform(s, "rotation", d);
    },
    [s, t]
  ), o = n.useCallback(
    (d) => {
      t.updateNodeTransform(s, "scale", d);
    },
    [s, t]
  );
  return /* @__PURE__ */ e.jsx("div", { className: "bone-editor", children: /* @__PURE__ */ e.jsx("div", { className: "property-section", children: /* @__PURE__ */ e.jsxs("div", { className: "property-section-content", children: [
    /* @__PURE__ */ e.jsx(
      y,
      {
        label: "Position",
        value: a,
        onChange: p,
        step: 0.01
      }
    ),
    /* @__PURE__ */ e.jsx(
      y,
      {
        label: "Rotation",
        value: u,
        onChange: c,
        step: 1
      }
    ),
    /* @__PURE__ */ e.jsx(
      y,
      {
        label: "Scale",
        value: i,
        onChange: o,
        step: 0.01
      }
    )
  ] }) }) });
}
function Ae({ mesh: s, metadata: t }) {
  const a = t?.triangleCount, r = s.listPrimitives().length;
  let i = 0;
  for (const u of s.listPrimitives()) {
    const p = u.getAttribute("POSITION");
    p && (i += p.getCount());
  }
  return /* @__PURE__ */ e.jsxs("div", { className: "mesh-editor property-section-content", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "editor-info", children: [
      /* @__PURE__ */ e.jsx("span", { className: "editor-info-label", children: "Triangles" }),
      /* @__PURE__ */ e.jsx("span", { className: "editor-info-value", children: a?.toLocaleString() ?? "N/A" })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "editor-info", children: [
      /* @__PURE__ */ e.jsx("span", { className: "editor-info-label", children: "Vertices" }),
      /* @__PURE__ */ e.jsx("span", { className: "editor-info-value", children: i.toLocaleString() })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "editor-info", children: [
      /* @__PURE__ */ e.jsx("span", { className: "editor-info-label", children: "Primitives" }),
      /* @__PURE__ */ e.jsx("span", { className: "editor-info-value", children: r })
    ] })
  ] });
}
function Ee({ selectedNode: s, api: t }) {
  if (!s)
    return /* @__PURE__ */ e.jsx("div", { className: "property-editor property-editor-empty", children: /* @__PURE__ */ e.jsx("div", { className: "empty-state", children: /* @__PURE__ */ e.jsx("span", { className: "empty-state-text", children: "Select an object in the scene graph to view its properties" }) }) });
  const a = () => {
    switch (s.type) {
      case "material":
        return /* @__PURE__ */ e.jsx(ye, { material: s.gltfRef, api: t, metadata: s.metadata });
      case "mesh":
        return /* @__PURE__ */ e.jsx(Ae, { mesh: s.gltfRef, metadata: s.metadata });
      case "light":
        return /* @__PURE__ */ e.jsx(Se, { light: s.gltfRef, api: t });
      case "node":
        return /* @__PURE__ */ e.jsx(ke, { node: s.gltfRef, api: t });
      case "armature":
        return /* @__PURE__ */ e.jsx(Re, { node: s.gltfRef, api: t });
      case "bone":
        return /* @__PURE__ */ e.jsx(Me, { node: s.gltfRef, api: t });
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
function Ie({ className: s = "", modelId: t, blob: a, onBlobChange: r, onReset: i, onStatsChange: u, onClose: p }) {
  const c = n.useMemo(() => new ee(), []), [o, d] = n.useState(c.getState()), v = n.useRef(null), j = n.useRef(null);
  n.useEffect(() => (c.setOnStateChange(d), () => c.setOnStateChange(null)), [c]), n.useEffect(() => {
    if (!a || !t) {
      c.clear(), j.current = null;
      return;
    }
    if (t === v.current && t === j.current) {
      v.current = null;
      return;
    }
    j.current = t, c.loadBlob(a);
  }, [a, t, c]), n.useEffect(() => {
    if (u)
      if (o.sceneGraph?.metadata?.stats) {
        const h = o.sceneGraph.metadata.stats;
        u({
          meshes: h.meshes,
          materials: h.materials,
          textures: h.textures,
          triangles: h.triangles,
          geometryVRAM: h.geometryVRAM,
          textureVRAM: h.textureVRAM
        });
      } else
        u(null);
  }, [o.sceneGraph, u]);
  const b = n.useCallback(async () => {
    try {
      const h = await c.applyChanges();
      r && (v.current = t, await r(h));
    } catch (h) {
      console.error("Failed to apply changes:", h);
    }
  }, [c, r, t]), x = n.useCallback(async () => {
    try {
      if (await c.reset(), i)
        await i();
      else {
        const h = c.getState().originalBlob;
        r && h && await r(h);
      }
    } catch (h) {
      console.error("Failed to reset:", h);
    }
  }, [c, r, i]), m = n.useCallback(
    (h) => {
      c.selectNode(h);
    },
    [c]
  );
  return /* @__PURE__ */ e.jsxs("div", { className: `inspector-panel ${s}`, children: [
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
          fe,
          {
            sceneGraph: o.sceneGraph,
            selectedNode: o.selectedNode,
            selectNode: m,
            isLoading: o.isLoading,
            error: o.error
          }
        )
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "inspector-panel-divider" }),
      /* @__PURE__ */ e.jsxs("div", { className: "inspector-panel-section property-editor-section", children: [
        /* @__PURE__ */ e.jsx("div", { className: "section-header", children: "Properties" }),
        /* @__PURE__ */ e.jsx(Ee, { selectedNode: o.selectedNode, api: c })
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
  O as AlphaMode,
  ee as InspectorAPI,
  Ie as InspectorPanel,
  g as MaterialExtension,
  Le as SceneGraphNodeType
};
