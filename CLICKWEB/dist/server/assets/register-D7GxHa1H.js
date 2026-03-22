import { a as setStoredAuth, t as api } from "./lib-auth-BKomnPik.js";
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/register.tsx?tsr-split=component
function RegisterPage() {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const submit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			const data = await api("/api/register", {
				method: "POST",
				body: JSON.stringify({
					name,
					email,
					password
				})
			});
			setStoredAuth(data.token, data.user);
			navigate({ to: "/dashboard" });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Error");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ jsx("div", {
		className: "min-h-screen bg-slate-50 px-4 py-16",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "text-center text-sm font-bold uppercase tracking-[0.2em] text-violet-600",
					children: "ClickWeb"
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "mt-3 text-center text-4xl font-black",
					children: "Crear cuenta"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-3 text-center text-slate-500",
					children: "Guarda tus webs, vuelve cuando quieras y desbloquea tus planes."
				}),
				/* @__PURE__ */ jsxs("form", {
					onSubmit: submit,
					className: "mt-8 space-y-4",
					children: [
						/* @__PURE__ */ jsx("input", {
							value: name,
							onChange: (e) => setName(e.target.value),
							placeholder: "Nombre",
							className: "w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-violet-400"
						}),
						/* @__PURE__ */ jsx("input", {
							value: email,
							onChange: (e) => setEmail(e.target.value),
							placeholder: "Email",
							className: "w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-violet-400"
						}),
						/* @__PURE__ */ jsx("input", {
							type: "password",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							placeholder: "Contraseña",
							className: "w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-violet-400"
						}),
						error && /* @__PURE__ */ jsx("div", {
							className: "rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700",
							children: error
						}),
						/* @__PURE__ */ jsx("button", {
							disabled: loading,
							className: "w-full rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 font-bold text-white disabled:opacity-50",
							children: loading ? "Creando cuenta..." : "Crear cuenta"
						})
					]
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "mt-6 text-center text-sm text-slate-500",
					children: ["¿Ya tienes cuenta? ", /* @__PURE__ */ jsx(Link, {
						to: "/login",
						className: "font-bold text-violet-600",
						children: "Iniciar sesión"
					})]
				})
			]
		})
	});
}
//#endregion
export { RegisterPage as component };
