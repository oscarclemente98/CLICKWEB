import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Loader2, CheckCircle2, Download, Globe, ArrowRight } from "lucide-react";
import { a as api, s as setStoredAuth, b as getStoredToken } from "./lib-auth-BIpyqgy3.js";
import { b as Route } from "./router-BZVrpedr.js";
function CheckoutSuccessPage() {
  const {
    plan,
    session_id
  } = Route.useSearch();
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  useEffect(() => {
    const run = async () => {
      if (!session_id) {
        setStatus("done");
        return;
      }
      try {
        const data = await api("/api/verify-checkout", {
          method: "POST",
          body: JSON.stringify({
            sessionId: session_id
          })
        });
        if (data.user) setStoredAuth(getStoredToken(), data.user);
        setStatus("done");
      } catch (err) {
        setError(err instanceof Error ? err.message : "No se pudo validar el pago");
        setStatus("error");
      }
    };
    run();
  }, [session_id]);
  const planNames = {
    "solo-web": "Solo la Web",
    basico: "Básico",
    pro: "Pro",
    business: "Business"
  };
  const isSolo = plan === "solo-web";
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-50 to-indigo-50 px-4", children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-xl rounded-[2rem] border border-slate-200 bg-white p-10 shadow-soft text-center", children: status === "loading" ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Loader2, { size: 44, className: "mx-auto animate-spin text-violet-600" }),
    /* @__PURE__ */ jsx("h1", { className: "mt-6 text-3xl font-black", children: "Validando tu pago" }),
    /* @__PURE__ */ jsx("p", { className: "mt-3 text-slate-500", children: "Estamos activando tu plan y preparando tu panel." })
  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100", children: /* @__PURE__ */ jsx(CheckCircle2, { size: 42, className: "text-emerald-600" }) }),
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-black", children: isSolo ? "¡Compra completada!" : "¡Plan activado!" }),
    /* @__PURE__ */ jsx("p", { className: "mt-3 text-lg text-slate-500", children: isSolo ? "Tu web está lista para descargar." : /* @__PURE__ */ jsxs(Fragment, { children: [
      "Tu plan ",
      /* @__PURE__ */ jsx("strong", { className: "text-violet-600", children: planNames[plan] || plan }),
      " ya está activo."
    ] }) }),
    status === "error" && /* @__PURE__ */ jsx("p", { className: "mt-3 rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-700", children: error }),
    /* @__PURE__ */ jsxs("div", { className: `mt-8 rounded-[1.6rem] p-6 text-left ${isSolo ? "bg-emerald-50" : "bg-violet-50"}`, children: [
      /* @__PURE__ */ jsxs("p", { className: "mb-3 flex items-center gap-2 font-black text-slate-900", children: [
        isSolo ? /* @__PURE__ */ jsx(Download, { size: 18 }) : /* @__PURE__ */ jsx(Globe, { size: 18 }),
        " Próximos pasos"
      ] }),
      /* @__PURE__ */ jsx("ul", { className: "space-y-2 text-sm text-slate-600", children: isSolo ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("li", { children: "• Ve a tu panel y descarga el HTML completo." }),
        /* @__PURE__ */ jsx("li", { children: "• Súbelo a tu hosting favorito o entréganoslo para publicarlo." }),
        /* @__PURE__ */ jsx("li", { children: "• Si luego quieres panel, SEO y publicación, puedes pasarte a un plan mensual." })
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("li", { children: "• Tu web ya puede guardarse, editarse y publicarse desde tu panel." }),
        /* @__PURE__ */ jsx("li", { children: "• Ahora puedes usar las funciones desbloqueadas de tu plan." }),
        /* @__PURE__ */ jsx("li", { children: "• Vuelve cuando quieras para tocar la web y republicarla." })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col gap-3 sm:flex-row", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/dashboard", className: "inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-4 font-bold text-white", children: [
        "Ir a mi panel ",
        /* @__PURE__ */ jsx(ArrowRight, { size: 18 })
      ] }),
      /* @__PURE__ */ jsx(Link, { to: "/crear", className: "inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 px-6 py-4 font-bold text-slate-700", children: "Crear otra web" })
    ] })
  ] }) }) });
}
export {
  CheckoutSuccessPage as component
};
