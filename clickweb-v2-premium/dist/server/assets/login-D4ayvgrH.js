import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { a as api, s as setStoredAuth } from "./lib-auth-BIpyqgy3.js";
function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await api("/api/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password
        })
      });
      setStoredAuth(data.token, data.user);
      navigate({
        to: "/dashboard"
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-slate-50 px-4 py-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft", children: [
    /* @__PURE__ */ jsx("p", { className: "text-center text-sm font-bold uppercase tracking-[0.2em] text-violet-600", children: "ClickWeb" }),
    /* @__PURE__ */ jsx("h1", { className: "mt-3 text-center text-4xl font-black", children: "Entra a tu panel" }),
    /* @__PURE__ */ jsx("p", { className: "mt-3 text-center text-slate-500", children: "Gestiona tus webs, tus planes y tus cambios desde una sola cuenta." }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "mt-8 space-y-4", children: [
      /* @__PURE__ */ jsx("input", { value: email, onChange: (e) => setEmail(e.target.value), placeholder: "Email", className: "w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-violet-400" }),
      /* @__PURE__ */ jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Contraseña", className: "w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-violet-400" }),
      error && /* @__PURE__ */ jsx("div", { className: "rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700", children: error }),
      /* @__PURE__ */ jsx("button", { disabled: loading, className: "w-full rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 font-bold text-white disabled:opacity-50", children: loading ? "Entrando..." : "Entrar" })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "mt-6 text-center text-sm text-slate-500", children: [
      "¿No tienes cuenta? ",
      /* @__PURE__ */ jsx(Link, { to: "/register", className: "font-bold text-violet-600", children: "Crear cuenta" })
    ] })
  ] }) });
}
export {
  LoginPage as component
};
