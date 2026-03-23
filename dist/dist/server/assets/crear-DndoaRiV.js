import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { useState, useMemo, useEffect, useCallback } from "react";
import { ArrowLeft, Download, Lock, Sparkles, Loader2, Wand2, Check, Send, Search, X } from "lucide-react";
import { g as getStoredUser, a as api, s as setStoredAuth, b as getStoredToken } from "./lib-auth-BIpyqgy3.js";
import { t as templates, b as buildSeo, g as generateDemoHtml } from "./lib-site-CBH4OrJR.js";
import { R as Route } from "./router-B5faU98g.js";
const paidPlans = ["solo-web", "basico", "pro", "business"];
function CrearPage() {
  const {
    desc,
    id: existingId
  } = Route.useSearch();
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState("ecommerce-socks");
  const [description, setDescription] = useState(desc || "Quiero una tienda de calcetines premium con estilo moderno y lista para vender");
  const [generatedHtml, setGeneratedHtml] = useState("");
  const [websiteId, setWebsiteId] = useState(existingId || null);
  const [websitePlan, setWebsitePlan] = useState(getStoredUser()?.plan || "free");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState("");
  const [showPaywall, setShowPaywall] = useState(false);
  const [paywallReason, setPaywallReason] = useState("");
  const [refineInput, setRefineInput] = useState("");
  const [seo, setSeo] = useState(null);
  const selected = useMemo(() => templates.find((t) => t.key === selectedTemplate), [selectedTemplate]);
  useEffect(() => {
    (async () => {
      try {
        const me = await api("/api/me");
        if (me.user) {
          setStoredAuth(getStoredToken(), me.user);
          setWebsitePlan(me.user.plan);
        }
      } catch {
      }
    })();
  }, []);
  useEffect(() => {
    if (!existingId) return;
    (async () => {
      try {
        const data = await api(`/api/websites/${existingId}`);
        setDescription(data.description || desc);
        setGeneratedHtml(data.html || "");
        setWebsiteId(data.id);
        setWebsitePlan(data.plan || getStoredUser()?.plan || "free");
        setSeo(data.seo || buildSeo(data.description || desc || selected.name, selected.name, ["pro", "business"].includes(data.plan)));
      } catch (err) {
        setError(err instanceof Error ? err.message : "No se pudo cargar la web");
      }
    })();
  }, [existingId, desc, selected.name]);
  const openPaywall = (reason) => {
    setPaywallReason(reason);
    setShowPaywall(true);
  };
  const generateDemo = useCallback(async () => {
    if (!description.trim()) return;
    setError("");
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 700));
    const id = websiteId || crypto.randomUUID();
    const html = generateDemoHtml({
      description: description.trim(),
      templateName: selected.name,
      accent: selected.accent,
      isEcommerce: selected.commerce
    });
    const seoData = buildSeo(description.trim(), selected.name, ["pro", "business"].includes(websitePlan));
    setWebsiteId(id);
    setGeneratedHtml(html);
    setSeo(seoData);
    setIsGenerating(false);
    if (getStoredUser()) {
      try {
        setIsSaving(true);
        await api("/api/save-website", {
          method: "POST",
          body: JSON.stringify({
            id,
            description: description.trim(),
            html,
            template: selected.name,
            seo: seoData
          })
        });
      } catch {
      } finally {
        setIsSaving(false);
      }
    }
  }, [description, selected, websiteId, websitePlan]);
  const handleRefine = useCallback(async () => {
    if (!generatedHtml) return;
    if (!["pro", "business"].includes(websitePlan)) {
      openPaywall("Editar con IA, regenerar y aplicar mejoras avanzadas está disponible en Pro y Business.");
      return;
    }
    if (!refineInput.trim()) return;
    setIsRefining(true);
    setError("");
    try {
      const data = await api("/api/refine-website", {
        method: "POST",
        body: JSON.stringify({
          id: websiteId,
          instruction: refineInput.trim()
        })
      });
      if (data.html) setGeneratedHtml(data.html);
      setSeo(buildSeo(description.trim(), selected.name, true));
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo refinar la web");
    } finally {
      setIsRefining(false);
      setRefineInput("");
    }
  }, [generatedHtml, websitePlan, refineInput, websiteId, description, selected.name]);
  const handlePublish = useCallback(async () => {
    if (!websiteId) return;
    if (!["basico", "pro", "business"].includes(websitePlan)) {
      openPaywall("Publicar y guardar la web en tu panel es una función de los planes mensuales.");
      return;
    }
    setIsPublishing(true);
    try {
      await api("/api/publish", {
        method: "POST",
        body: JSON.stringify({
          id: websiteId
        })
      });
      navigate({
        to: "/dashboard"
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo publicar");
    } finally {
      setIsPublishing(false);
    }
  }, [websiteId, websitePlan, navigate]);
  const handleDownload = () => {
    if (!generatedHtml) return;
    if (!paidPlans.includes(websitePlan)) {
      openPaywall("Descargar el HTML completo se desbloquea con Solo la Web o cualquier plan mensual.");
      return;
    }
    const blob = new Blob([generatedHtml], {
      type: "text/html"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${description.slice(0, 32) || "clickweb"}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const handleCheckout = async (plan) => {
    try {
      const data = await api("/api/create-checkout", {
        method: "POST",
        body: JSON.stringify({
          plan,
          websiteId
        })
      });
      if (data.url) window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo iniciar el pago");
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-slate-50", children: [
    /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur-xl", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-4", children: [
      /* @__PURE__ */ jsxs("button", { onClick: () => navigate({
        to: "/"
      }), className: "flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { size: 18 }),
        " Volver"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-lg font-black gradient-text", children: "ClickWeb Studio" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("button", { onClick: handleDownload, className: "rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50", children: paidPlans.includes(websitePlan) ? /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Download, { size: 16 }),
          " Descargar"
        ] }) : /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Lock, { size: 16 }),
          " Descargar"
        ] }) }),
        /* @__PURE__ */ jsx("button", { onClick: handlePublish, className: "rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-soft", children: isPublishing ? "Publicando..." : "Publicar" })
      ] })
    ] }) }),
    !generatedHtml ? /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-7xl px-4 py-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl text-center fade-up", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700", children: [
          /* @__PURE__ */ jsx(Sparkles, { size: 16 }),
          " Demo gratis · bonita y rápida"
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-black tracking-tight text-slate-900 md:text-6xl", children: "Elige plantilla, escribe tu idea y mira tu web en un minuto" }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 text-lg leading-8 text-slate-600", children: "La demo no gasta IA cara. Cuando paguen, desbloquean edición con IA, panel, SEO y publicación." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mt-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-bold uppercase tracking-[0.2em] text-violet-600", children: "Plantillas" }),
            /* @__PURE__ */ jsx("h2", { className: "mt-2 text-2xl font-black", children: "24 plantillas sectoriales para empezar bien" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600", children: [
            "Plantilla activa: ",
            selected.name
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-5", children: templates.map((template) => /* @__PURE__ */ jsxs("button", { onClick: () => setSelectedTemplate(template.key), className: `card-hover rounded-[1.75rem] border p-5 text-left ${selectedTemplate === template.key ? "border-violet-300 bg-violet-50 shadow-soft" : "border-slate-200 bg-white"}`, children: [
          /* @__PURE__ */ jsx("div", { className: "text-3xl", children: template.emoji }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm font-bold uppercase tracking-[0.18em] text-slate-500", children: template.category }),
          /* @__PURE__ */ jsx("h3", { className: "mt-2 text-lg font-black text-slate-900", children: template.name }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm leading-6 text-slate-500", children: template.tagline })
        ] }, template.key)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mt-10 grid gap-8 lg:grid-cols-[1fr_.9fr]", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-bold uppercase tracking-[0.2em] text-violet-600", children: "Tu idea" }),
          /* @__PURE__ */ jsx("h2", { className: "mt-2 text-3xl font-black", children: "Describe la web que quieres" }),
          /* @__PURE__ */ jsx("textarea", { value: description, onChange: (e) => setDescription(e.target.value), rows: 5, className: "mt-5 w-full rounded-3xl border border-slate-200 px-5 py-4 text-base outline-none ring-violet-200 placeholder:text-slate-400 focus:border-violet-300 focus:ring", placeholder: "Ej: tienda de calcetines premium con look moderno, catálogo visual, reseñas y botón de WhatsApp" }),
          error && /* @__PURE__ */ jsx("div", { className: "mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700", children: error }),
          /* @__PURE__ */ jsx("button", { disabled: !description.trim() || isGenerating, onClick: generateDemo, className: "mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-4 font-bold text-white shadow-soft disabled:opacity-50", children: isGenerating ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Loader2, { size: 18, className: "animate-spin" }),
            " Creando tu demo..."
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Wand2, { size: 18 }),
            " Crear demo gratis"
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5 grid gap-3 text-sm text-slate-500 sm:grid-cols-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-slate-50 p-4", children: [
              /* @__PURE__ */ jsx("p", { className: "font-black text-slate-900", children: "Sin tarjeta" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1", children: "Pruebas la demo antes de pagar" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-slate-50 p-4", children: [
              /* @__PURE__ */ jsx("p", { className: "font-black text-slate-900", children: "UX sencilla" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1", children: "Todo se entiende en segundos" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-slate-50 p-4", children: [
              /* @__PURE__ */ jsx("p", { className: "font-black text-slate-900", children: "Preparada para vender" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1", children: "Servicios, negocio local o ecommerce" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-950 via-violet-900 to-indigo-900 p-6 text-white shadow-soft", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-bold uppercase tracking-[0.2em] text-white/70", children: "Qué verás en la demo" }),
          /* @__PURE__ */ jsx("h2", { className: "mt-2 text-3xl font-black", children: "Una demo bonita, rápida y pensada para convertir" }),
          /* @__PURE__ */ jsx("div", { className: "mt-6 grid gap-3", children: ["Hero potente con CTA", "Reseñas y bloques de confianza", "Servicios o catálogo según plantilla", "Base SEO visible desde el minuto uno"].map((item) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 rounded-2xl bg-white/10 p-4", children: [
            /* @__PURE__ */ jsx(Check, { size: 18, className: "text-emerald-300" }),
            /* @__PURE__ */ jsx("span", { children: item })
          ] }, item)) })
        ] })
      ] })
    ] }) : /* @__PURE__ */ jsxs("main", { className: "grid min-h-[calc(100vh-4rem)] gap-0 lg:grid-cols-[1fr_390px]", children: [
      /* @__PURE__ */ jsxs("section", { className: "relative bg-slate-200", children: [
        /* @__PURE__ */ jsx("iframe", { srcDoc: generatedHtml, className: "h-[55vh] w-full border-0 lg:h-[calc(100vh-4rem)]", sandbox: "allow-scripts allow-same-origin", title: "Vista previa" }),
        /* @__PURE__ */ jsxs("div", { className: "absolute left-4 top-4 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-slate-700 shadow-soft", children: [
          "Vista previa lista ",
          isSaving ? "· guardando..." : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxs("aside", { className: "border-l border-slate-200 bg-white p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-[1.6rem] border border-slate-200 bg-slate-50 p-5", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-[0.2em] text-violet-600", children: "Plan actual" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-2 flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black capitalize", children: websitePlan === "free" ? "Demo gratis" : websitePlan }),
            /* @__PURE__ */ jsx("span", { className: `rounded-full px-3 py-1 text-xs font-bold ${websitePlan === "free" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`, children: websitePlan === "free" ? "Bloqueado" : "Activo" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-6 text-slate-500", children: "Con los planes mensuales tus webs se guardan en el panel y puedes volver cuando quieras para tocarlas y republicarlas." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5 rounded-[1.6rem] border border-slate-200 p-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-[0.2em] text-violet-600", children: "Editor simple" }),
              /* @__PURE__ */ jsx("h3", { className: "mt-2 text-xl font-black", children: "Haz cambios con IA" })
            ] }),
            !["pro", "business"].includes(websitePlan) && /* @__PURE__ */ jsx("span", { className: "rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600", children: "🔒 Pro" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: ["Hazla más premium", "Añade precios", "Modo ecommerce", "Más testimonios", "Cambia colores"].map((label) => /* @__PURE__ */ jsx("button", { onClick: () => setRefineInput(label), className: "rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:border-violet-300 hover:text-violet-700", children: label }, label)) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex gap-2", children: [
            /* @__PURE__ */ jsx("input", { value: refineInput, onChange: (e) => setRefineInput(e.target.value), placeholder: ["pro", "business"].includes(websitePlan) ? "Ej: añade una sección de precios" : "Disponible en Pro y Business", className: "min-w-0 flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-violet-300" }),
            /* @__PURE__ */ jsx("button", { onClick: handleRefine, disabled: isRefining, className: "rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 font-bold text-white disabled:opacity-50", children: isRefining ? /* @__PURE__ */ jsx(Loader2, { size: 18, className: "animate-spin" }) : /* @__PURE__ */ jsx(Send, { size: 18 }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5 rounded-[1.6rem] border border-slate-200 p-5 shadow-soft", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-[0.2em] text-violet-600", children: "Panel SEO" }),
              /* @__PURE__ */ jsx("h3", { className: "mt-2 text-xl font-black", children: "SEO automático" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: `rounded-full px-3 py-1 text-xs font-bold ${(seo?.score || 70) > 85 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`, children: [
              seo?.score || 70,
              "/100"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 h-2 overflow-hidden rounded-full bg-slate-100", children: /* @__PURE__ */ jsx("div", { className: "h-full rounded-full bg-gradient-to-r from-emerald-500 to-violet-600", style: {
            width: `${seo?.score || 70}%`
          } }) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-2 text-sm text-slate-600", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2 rounded-2xl bg-slate-50 p-3", children: [
              /* @__PURE__ */ jsx(Search, { size: 16, className: "mt-0.5 text-violet-600" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "font-bold text-slate-900", children: "Meta title" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500", children: seo?.metaTitle })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2 rounded-2xl bg-slate-50 p-3", children: [
              /* @__PURE__ */ jsx(Check, { size: 16, className: "mt-0.5 text-emerald-600" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "font-bold text-slate-900", children: "Checklist" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500", children: "Title, description, keywords y FAQ listos." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-slate-50 p-3", children: [
              /* @__PURE__ */ jsx("p", { className: "font-bold text-slate-900", children: "Recomendaciones" }),
              /* @__PURE__ */ jsx("ul", { className: "mt-2 space-y-1 text-xs text-slate-500", children: seo?.recommendations.map((item) => /* @__PURE__ */ jsxs("li", { children: [
                "• ",
                item
              ] }, item)) })
            ] })
          ] }),
          !["pro", "business"].includes(websitePlan) && /* @__PURE__ */ jsxs("button", { onClick: () => openPaywall("El panel SEO premium, la FAQ avanzada y las mejoras comerciales se desbloquean en Pro y Business."), className: "mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 hover:border-violet-300 hover:text-violet-700", children: [
            /* @__PURE__ */ jsx(Lock, { size: 16 }),
            " Actualizar SEO"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1", children: [
          /* @__PURE__ */ jsxs("button", { onClick: handleDownload, className: "rounded-2xl border border-slate-200 px-4 py-4 text-left hover:border-violet-300", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-black text-slate-900", children: "Descargar HTML" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-slate-500", children: paidPlans.includes(websitePlan) ? "Listo para descargar" : "🔒 Solo Web o cualquier plan mensual" })
          ] }),
          /* @__PURE__ */ jsxs("button", { onClick: handlePublish, className: "rounded-2xl border border-slate-200 px-4 py-4 text-left hover:border-violet-300", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-black text-slate-900", children: "Guardar y publicar" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-slate-500", children: ["basico", "pro", "business"].includes(websitePlan) ? "Disponible ahora" : "🔒 Requiere plan mensual" })
          ] })
        ] })
      ] })
    ] }),
    showPaywall && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[70] flex items-center justify-center p-4", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-slate-950/70 backdrop-blur-sm", onClick: () => setShowPaywall(false) }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 w-full max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setShowPaywall(false), className: "absolute right-4 top-4 text-slate-400 hover:text-slate-600", children: /* @__PURE__ */ jsx(X, { size: 20 }) }),
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100", children: /* @__PURE__ */ jsx(Lock, { size: 30, className: "text-violet-600" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-3xl font-black", children: "Tu web está lista 🔥" }),
          /* @__PURE__ */ jsx("p", { className: "mx-auto mt-3 max-w-xl text-slate-500", children: paywallReason || "Activa un plan para editar, mejorar el SEO y publicar tu web." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4", children: [{
          key: "solo-web",
          title: "Solo la Web",
          price: "49,99€",
          note: "Pago único",
          bullets: ["Descarga HTML", "Sin suscripción"]
        }, {
          key: "basico",
          title: "Básico",
          price: "39€",
          note: "Luego 9€/mes",
          bullets: ["1 web", "Panel privado"]
        }, {
          key: "pro",
          title: "Pro",
          price: "55€",
          note: "Luego 25€/mes",
          bullets: ["3 webs", "IA + SEO premium"],
          featured: true
        }, {
          key: "business",
          title: "Business",
          price: "90€",
          note: "Luego 60€/mes",
          bullets: ["Ilimitadas", "Tienda preparada"]
        }].map((plan) => /* @__PURE__ */ jsxs("div", { className: `rounded-[1.6rem] border p-5 ${plan.featured ? "border-violet-300 bg-violet-50" : "border-slate-200 bg-white"}`, children: [
          /* @__PURE__ */ jsx("p", { className: "text-lg font-black", children: plan.title }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-3xl font-black", children: plan.price }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500", children: plan.note }),
          /* @__PURE__ */ jsx("ul", { className: "mt-4 space-y-2 text-sm text-slate-600", children: plan.bullets.map((b) => /* @__PURE__ */ jsxs("li", { children: [
            "• ",
            b
          ] }, b)) }),
          /* @__PURE__ */ jsx("button", { onClick: () => handleCheckout(plan.key), className: "mt-5 w-full rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 font-bold text-white", children: "Elegir" })
        ] }, plan.key)) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-500", children: [
          "¿Dudas? Escríbenos por WhatsApp al ",
          /* @__PURE__ */ jsx("strong", { children: "665 19 60 43" }),
          "."
        ] })
      ] })
    ] })
  ] });
}
export {
  CrearPage as component
};
