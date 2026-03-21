import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowLeft, Plus, Loader2, Globe, Wand2, Eye, Pencil, Search, Trash2 } from "lucide-react";
import { g as getStoredUser, a as api, c as clearStoredAuth } from "./lib-auth-BIpyqgy3.js";
function DashboardPage() {
  const navigate = useNavigate();
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState("");
  const user = getStoredUser();
  useEffect(() => {
    if (!user) {
      navigate({
        to: "/login"
      });
      return;
    }
    (async () => {
      try {
        const data = await api("/api/websites");
        setWebsites(data.websites || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "No se pudieron cargar tus webs");
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate, user]);
  const deleteWebsite = async (id) => {
    if (!confirm("¿Eliminar esta web?")) return;
    setDeleting(id);
    try {
      await api(`/api/websites/${id}`, {
        method: "DELETE"
      });
      setWebsites((prev) => prev.filter((w) => w.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo eliminar");
    } finally {
      setDeleting("");
    }
  };
  if (!user) return null;
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-slate-50", children: [
    /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur-xl", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900", children: [
          /* @__PURE__ */ jsx(ArrowLeft, { size: 18 }),
          " Inicio"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-6 w-px bg-slate-200" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-[0.2em] text-violet-600", children: "ClickWeb" }),
          /* @__PURE__ */ jsx("h1", { className: "text-lg font-black", children: "Tu panel" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => {
          clearStoredAuth();
          navigate({
            to: "/"
          });
        }, className: "rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50", children: "Salir" }),
        /* @__PURE__ */ jsxs(Link, { to: "/crear", className: "inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-soft", children: [
          /* @__PURE__ */ jsx(Plus, { size: 18 }),
          " Nueva web"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-7xl px-4 py-10", children: [
      /* @__PURE__ */ jsxs("section", { className: "grid gap-5 lg:grid-cols-[1.2fr_.8fr]", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-[2rem] border border-slate-200 bg-white p-7 shadow-soft", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-sm font-bold uppercase tracking-[0.2em] text-violet-600", children: [
            "Hola",
            user.name ? `, ${user.name}` : ""
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "mt-2 text-4xl font-black", children: "Tus webs viven aquí" }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-2xl text-slate-500", children: "Este es el valor de tus planes mensuales: tus webs quedan guardadas, vuelves cuando quieras, las modificas y las vuelves a publicar." }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap gap-3 text-sm text-slate-600", children: [
            /* @__PURE__ */ jsxs("span", { className: "rounded-full bg-slate-100 px-4 py-2", children: [
              "Plan actual: ",
              /* @__PURE__ */ jsx("strong", { className: "capitalize", children: user.plan })
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "rounded-full bg-slate-100 px-4 py-2", children: [
              websites.length,
              " webs guardadas"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "rounded-full bg-slate-100 px-4 py-2", children: "Edición, SEO y publicación" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-950 via-violet-900 to-indigo-900 p-7 text-white shadow-soft", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-bold uppercase tracking-[0.2em] text-white/70", children: "Resumen rápido" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-white/10 p-4", children: [
              /* @__PURE__ */ jsx("p", { className: "text-3xl font-black", children: websites.length }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-white/70", children: "Proyectos" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-white/10 p-4", children: [
              /* @__PURE__ */ jsx("p", { className: "text-3xl font-black", children: websites.filter((w) => w.status === "published").length }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-white/70", children: "Publicadas" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-white/10 p-4", children: [
              /* @__PURE__ */ jsx("p", { className: "text-3xl font-black capitalize", children: user.plan }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-white/70", children: "Plan" })
            ] })
          ] })
        ] })
      ] }),
      loading ? /* @__PURE__ */ jsxs("div", { className: "py-20 text-center", children: [
        /* @__PURE__ */ jsx(Loader2, { size: 40, className: "mx-auto animate-spin text-violet-600" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-slate-500", children: "Cargando tus webs..." })
      ] }) : error ? /* @__PURE__ */ jsx("div", { className: "mt-8 rounded-[2rem] border border-red-200 bg-red-50 p-6 text-red-700", children: error }) : websites.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "mt-8 rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-soft", children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-violet-100", children: /* @__PURE__ */ jsx(Globe, { size: 36, className: "text-violet-600" }) }),
        /* @__PURE__ */ jsx("h3", { className: "mt-5 text-3xl font-black", children: "Aún no tienes ninguna web" }),
        /* @__PURE__ */ jsx("p", { className: "mx-auto mt-3 max-w-xl text-slate-500", children: "Empieza con una demo gratis, desbloquea el plan que quieras y gestiona todo desde aquí." }),
        /* @__PURE__ */ jsxs(Link, { to: "/crear", className: "mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-4 font-bold text-white shadow-soft", children: [
          /* @__PURE__ */ jsx(Wand2, { size: 18 }),
          " Crear mi primera web"
        ] })
      ] }) : /* @__PURE__ */ jsxs("section", { className: "mt-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-5 flex items-end justify-between gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-bold uppercase tracking-[0.2em] text-violet-600", children: "Tus proyectos" }),
            /* @__PURE__ */ jsx("h3", { className: "mt-2 text-3xl font-black", children: "Webs guardadas y listas para tocar" })
          ] }),
          /* @__PURE__ */ jsx(Link, { to: "/crear", className: "rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-soft", children: "Nueva web" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-5 md:grid-cols-2 xl:grid-cols-3", children: websites.map((website) => /* @__PURE__ */ jsxs("div", { className: "card-hover overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft", children: [
          /* @__PURE__ */ jsx("div", { className: "flex h-48 items-center justify-center bg-gradient-to-br from-violet-100 via-indigo-100 to-slate-100", children: /* @__PURE__ */ jsx("div", { className: "rounded-3xl bg-white p-5 shadow-sm", children: /* @__PURE__ */ jsx(Globe, { size: 42, className: "text-violet-500" }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: `rounded-full px-3 py-1 text-xs font-bold ${website.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`, children: website.status === "published" ? "Publicada" : "Borrador" }),
              /* @__PURE__ */ jsxs("span", { className: "rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600", children: [
                "SEO ",
                website.seo?.score || 76
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 line-clamp-2 text-lg font-black text-slate-900", children: website.description }),
            /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-slate-500", children: [
              "Actualizada ",
              new Date(website.updatedAt || website.createdAt).toLocaleDateString("es-ES")
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-5 grid grid-cols-2 gap-2", children: [
              /* @__PURE__ */ jsxs(Link, { to: "/preview/$id", params: {
                id: website.id
              }, className: "inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white", children: [
                /* @__PURE__ */ jsx(Eye, { size: 16 }),
                " Ver"
              ] }),
              /* @__PURE__ */ jsxs(Link, { to: "/crear", search: {
                desc: website.description,
                id: website.id
              }, className: "inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700", children: [
                /* @__PURE__ */ jsx(Pencil, { size: 16 }),
                " Editar"
              ] }),
              /* @__PURE__ */ jsxs("button", { className: "inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700", children: [
                /* @__PURE__ */ jsx(Search, { size: 16 }),
                " SEO"
              ] }),
              /* @__PURE__ */ jsxs("button", { onClick: () => deleteWebsite(website.id), disabled: deleting === website.id, className: "inline-flex items-center justify-center gap-2 rounded-2xl border border-red-100 px-4 py-3 text-sm font-bold text-red-600", children: [
                deleting === website.id ? /* @__PURE__ */ jsx(Loader2, { size: 16, className: "animate-spin" }) : /* @__PURE__ */ jsx(Trash2, { size: 16 }),
                " Borrar"
              ] })
            ] })
          ] })
        ] }, website.id)) })
      ] })
    ] })
  ] });
}
export {
  DashboardPage as component
};
