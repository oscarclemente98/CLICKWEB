import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { XCircle, ArrowLeft, MessageCircle } from "lucide-react";
function CheckoutCancelPage() {
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-lg w-full bg-white rounded-3xl shadow-xl p-10 text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "w-20 h-20 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(XCircle, { size: 44, className: "text-orange-500" }) }),
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-black text-gray-900 mb-3", children: "Pago cancelado" }),
    /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-500 mb-8", children: "No se ha realizado ningún cargo. Tu web sigue guardada y puedes volver a intentarlo cuando quieras." }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/dashboard", className: "flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-xl hover:opacity-90 transition-opacity", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { size: 18 }),
        "Volver al panel"
      ] }),
      /* @__PURE__ */ jsxs("a", { href: "https://wa.me/34600000000", target: "_blank", rel: "noopener noreferrer", className: "flex-1 inline-flex items-center justify-center gap-2 bg-green-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-green-400 transition-colors", children: [
        /* @__PURE__ */ jsx(MessageCircle, { size: 18 }),
        "Contactar soporte"
      ] })
    ] })
  ] }) });
}
export {
  CheckoutCancelPage as component
};
