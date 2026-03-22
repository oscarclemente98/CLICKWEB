import { i as getStoredUser } from "./lib-auth-BKomnPik.js";
import { r as templates } from "./lib-site-DE5iDwJu.js";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight, CheckCircle2, ChevronRight, MessageCircle, Search, ShieldCheck, Sparkles, Star, Store, Wand2 } from "lucide-react";
//#region src/routes/index.tsx?tsr-split=component
var reviews = [
	{
		name: "Marta Ruiz",
		role: "Centro de estética",
		quote: "En una tarde tenía la web lista y al día siguiente ya me entraban mensajes por WhatsApp."
	},
	{
		name: "Carlos Vega",
		role: "Tienda de calcetines",
		quote: "La demo me convenció al instante y Business me dejó una tienda preciosa y fácil de conectar después con Shopify."
	},
	{
		name: "Laura Martín",
		role: "Freelance creativa",
		quote: "Lo mejor es poder volver al panel y modificar la web cuando quiero sin depender de nadie."
	},
	{
		name: "Javier Gómez",
		role: "Abogado",
		quote: "El panel SEO y la estructura me ayudaron a tener una web seria sin perder semanas."
	}
];
var plans = [
	{
		name: "Solo la Web",
		price: "49,99€",
		note: "Pago único",
		desc: "Tu web lista en minutos, sin suscripción.",
		bullets: [
			"Descarga HTML",
			"Responsive",
			"SEO base"
		]
	},
	{
		name: "Básico",
		price: "39€",
		note: "Luego 9€/mes",
		desc: "Empieza tu web y mantenla online fácilmente.",
		bullets: [
			"1 web guardada",
			"Panel privado",
			"SEO básico"
		]
	},
	{
		name: "Pro",
		price: "55€",
		note: "Luego 25€/mes",
		desc: "Para negocios que quieren crecer online.",
		bullets: [
			"Hasta 3 webs",
			"Edición con IA",
			"SEO premium"
		],
		featured: true
	},
	{
		name: "Business",
		price: "90€",
		note: "Luego 60€/mes",
		desc: "Tienda online preparada para vender en serio.",
		bullets: [
			"Webs ilimitadas",
			"Modo ecommerce",
			"Preparada para Shopify"
		]
	}
];
function HomePage() {
	const navigate = useNavigate();
	const [idea, setIdea] = useState("Quiero una tienda de calcetines premium con estilo moderno y lista para vender");
	const user = useMemo(() => getStoredUser(), []);
	const featuredTemplates = templates.slice(0, 8);
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-white text-slate-900",
		children: [
			/* @__PURE__ */ jsx("header", {
				className: "sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-xl",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-4",
					children: [
						/* @__PURE__ */ jsx(Link, {
							to: "/",
							className: "text-xl font-black tracking-tight gradient-text",
							children: "ClickWeb"
						}),
						/* @__PURE__ */ jsxs("nav", {
							className: "hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex",
							children: [
								/* @__PURE__ */ jsx("a", {
									href: "#como-funciona",
									className: "hover:text-violet-600",
									children: "Cómo funciona"
								}),
								/* @__PURE__ */ jsx("a", {
									href: "#plantillas",
									className: "hover:text-violet-600",
									children: "Plantillas"
								}),
								/* @__PURE__ */ jsx("a", {
									href: "#opiniones",
									className: "hover:text-violet-600",
									children: "Reseñas"
								}),
								/* @__PURE__ */ jsx("a", {
									href: "#precios",
									className: "hover:text-violet-600",
									children: "Precios"
								}),
								/* @__PURE__ */ jsx(Link, {
									to: user ? "/dashboard" : "/login",
									className: "hover:text-violet-600",
									children: user ? "Mi panel" : "Iniciar sesión"
								})
							]
						}),
						/* @__PURE__ */ jsxs(Link, {
							to: "/crear",
							className: "inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-brand",
							children: ["Crear mi web", /* @__PURE__ */ jsx(ArrowRight, { size: 16 })]
						})
					]
				})
			}),
			/* @__PURE__ */ jsxs("main", { children: [
				/* @__PURE__ */ jsxs("section", {
					className: "relative overflow-hidden border-b border-slate-100 bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.12),_transparent_38%),radial-gradient(circle_at_top_right,_rgba(37,99,235,0.10),_transparent_32%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]",
					children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-0 grid-dots opacity-50" }), /* @__PURE__ */ jsxs("div", {
						className: "relative mx-auto grid max-w-7xl gap-12 px-4 py-16 lg:grid-cols-[1.02fr_.98fr] lg:py-24",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "fade-up",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700",
									children: [/* @__PURE__ */ jsx(Sparkles, { size: 16 }), "Demo gratis · IA real solo cuando pagan"]
								}),
								/* @__PURE__ */ jsx("h1", {
									className: "mt-6 max-w-4xl text-5xl font-black tracking-tight text-slate-900 md:text-7xl md:leading-[1.05]",
									children: "Crea una web profesional lista para conseguir clientes en minutos"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-6 max-w-2xl text-lg leading-8 text-slate-600",
									children: "Diseñada con IA, optimizada para SEO y preparada para vender desde el primer día. Sin programar, sin complicaciones y con panel para volver cuando quieras."
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-8 max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-3 shadow-soft",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-3 sm:flex-row",
										children: [/* @__PURE__ */ jsx("input", {
											value: idea,
											onChange: (e) => setIdea(e.target.value),
											className: "min-w-0 flex-1 rounded-2xl border border-slate-200 px-5 py-4 text-sm outline-none focus:border-violet-300",
											placeholder: "Describe tu web en una frase"
										}), /* @__PURE__ */ jsxs("button", {
											onClick: () => navigate({
												to: "/crear",
												search: { desc: idea }
											}),
											className: "inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-4 font-bold text-white shadow-brand",
											children: ["Crear mi web ahora", /* @__PURE__ */ jsx(Wand2, { size: 18 })]
										})]
									}), /* @__PURE__ */ jsx("div", {
										className: "mt-3 flex flex-wrap gap-2 text-xs text-slate-500",
										children: [
											"Tienda online",
											"Negocio local",
											"Portfolio",
											"SEO listo",
											"Shopify-ready"
										].map((item) => /* @__PURE__ */ jsx("span", {
											className: "rounded-full bg-slate-50 px-3 py-1.5",
											children: item
										}, item))
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-8 flex flex-wrap gap-6 text-sm text-slate-600",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(CheckCircle2, {
												size: 18,
												className: "text-emerald-500"
											}), " Demo sin tarjeta"]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(CheckCircle2, {
												size: 18,
												className: "text-emerald-500"
											}), " IA premium solo al pagar"]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx(CheckCircle2, {
												size: 18,
												className: "text-emerald-500"
											}), " Panel para editar y publicar"]
										})
									]
								})
							]
						}), /* @__PURE__ */ jsx("div", {
							className: "fade-up",
							children: /* @__PURE__ */ jsxs("div", {
								className: "rounded-[2.2rem] border border-slate-200 bg-white p-5 shadow-soft",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "rounded-[1.9rem] bg-slate-950 p-6 text-white",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
												className: "text-xs font-bold uppercase tracking-[0.2em] text-white/60",
												children: "Vista premium"
											}), /* @__PURE__ */ jsx("h2", {
												className: "mt-2 text-3xl font-black",
												children: "Tu web en 1 pantalla"
											})] }), /* @__PURE__ */ jsx("div", {
												className: "rounded-full bg-white/10 px-3 py-1 text-xs font-bold",
												children: "ClickWeb"
											})]
										}),
										/* @__PURE__ */ jsx("div", {
											className: "mt-5 grid gap-3 sm:grid-cols-2",
											children: [
												["Diseño profesional", "Hero potente, bloques claros y secciones que convierten."],
												["SEO visible", "Meta title, descripción, FAQ y recomendaciones."],
												["Panel mensual", "Tus webs guardadas para volver y modificarlas."],
												["Modo ecommerce", "Business listo para catálogo y Shopify después."]
											].map(([title, text]) => /* @__PURE__ */ jsxs("div", {
												className: "rounded-[1.4rem] border border-white/10 bg-white/5 p-4",
												children: [/* @__PURE__ */ jsx("p", {
													className: "font-black",
													children: title
												}), /* @__PURE__ */ jsx("p", {
													className: "mt-2 text-sm leading-6 text-white/65",
													children: text
												})]
											}, title))
										}),
										/* @__PURE__ */ jsx("div", {
											className: "mt-5 rounded-[1.5rem] bg-white px-5 py-4 text-slate-900",
											children: /* @__PURE__ */ jsxs("div", {
												className: "flex items-center justify-between gap-3",
												children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
													className: "text-sm font-bold text-slate-500",
													children: "Plan que más se vende"
												}), /* @__PURE__ */ jsx("p", {
													className: "text-xl font-black",
													children: "Pro · 55€ el primer pago"
												})] }), /* @__PURE__ */ jsx("span", {
													className: "rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700",
													children: "Después 25€/mes"
												})]
											})
										})
									]
								}), /* @__PURE__ */ jsxs("div", {
									className: "mt-4 grid gap-3 sm:grid-cols-3",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "rounded-[1.6rem] bg-slate-50 p-4 text-center",
											children: [/* @__PURE__ */ jsx("p", {
												className: "text-3xl font-black",
												children: "+1.000"
											}), /* @__PURE__ */ jsx("p", {
												className: "text-sm text-slate-500",
												children: "demos creadas"
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "rounded-[1.6rem] bg-slate-50 p-4 text-center",
											children: [/* @__PURE__ */ jsx("p", {
												className: "text-3xl font-black",
												children: "24"
											}), /* @__PURE__ */ jsx("p", {
												className: "text-sm text-slate-500",
												children: "plantillas sectoriales"
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "rounded-[1.6rem] bg-slate-50 p-4 text-center",
											children: [/* @__PURE__ */ jsx("p", {
												className: "text-3xl font-black",
												children: "5★"
											}), /* @__PURE__ */ jsx("p", {
												className: "text-sm text-slate-500",
												children: "experiencia simple"
											})]
										})
									]
								})]
							})
						})]
					})]
				}),
				/* @__PURE__ */ jsx("section", {
					className: "mx-auto max-w-7xl px-4 py-16",
					children: /* @__PURE__ */ jsx("div", {
						className: "grid gap-4 md:grid-cols-4 stagger",
						children: [
							{
								icon: /* @__PURE__ */ jsx(Sparkles, {
									size: 20,
									className: "text-violet-600"
								}),
								title: "Diseño profesional",
								text: "Web moderna, rápida y adaptada a móvil desde el primer momento."
							},
							{
								icon: /* @__PURE__ */ jsx(Search, {
									size: 20,
									className: "text-violet-600"
								}),
								title: "SEO automático",
								text: "Tu web sale optimizada para aparecer en Google sin esfuerzo."
							},
							{
								icon: /* @__PURE__ */ jsx(Store, {
									size: 20,
									className: "text-violet-600"
								}),
								title: "Lista para vender",
								text: "Perfecta para servicios, captación o tiendas online."
							},
							{
								icon: /* @__PURE__ */ jsx(ShieldCheck, {
									size: 20,
									className: "text-violet-600"
								}),
								title: "Súper fácil",
								text: "Crea, edita y publica sin conocimientos técnicos."
							}
						].map((item) => /* @__PURE__ */ jsxs("div", {
							className: "card-hover rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-soft",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50",
									children: item.icon
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "text-lg font-black",
									children: item.title
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-3 leading-7 text-slate-500",
									children: item.text
								})
							]
						}, item.title))
					})
				}),
				/* @__PURE__ */ jsx("section", {
					id: "opiniones",
					className: "border-y border-slate-100 bg-slate-50",
					children: /* @__PURE__ */ jsxs("div", {
						className: "mx-auto max-w-7xl px-4 py-16",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "text-sm font-bold uppercase tracking-[0.2em] text-violet-600",
								children: "Prueba social"
							}), /* @__PURE__ */ jsx("h2", {
								className: "mt-2 text-4xl font-black",
								children: "Reseñas que dan confianza de verdad"
							})] }), /* @__PURE__ */ jsx("p", {
								className: "max-w-2xl text-slate-500",
								children: "La gente no compra una herramienta. Compra la sensación de que por fin puede lanzar una web buena sin perder tiempo ni depender de nadie."
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: "mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4 stagger",
							children: reviews.map((review) => /* @__PURE__ */ jsxs("div", {
								className: "card-hover rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-soft",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "flex gap-1 text-amber-400",
										children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsx(Star, {
											size: 16,
											fill: "currentColor"
										}, i))
									}),
									/* @__PURE__ */ jsxs("p", {
										className: "mt-4 text-[15px] leading-7 text-slate-600",
										children: [
											"“",
											review.quote,
											"”"
										]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "mt-5",
										children: [/* @__PURE__ */ jsx("p", {
											className: "font-black text-slate-900",
											children: review.name
										}), /* @__PURE__ */ jsx("p", {
											className: "text-sm text-slate-500",
											children: review.role
										})]
									})
								]
							}, review.name))
						})]
					})
				}),
				/* @__PURE__ */ jsxs("section", {
					id: "como-funciona",
					className: "mx-auto max-w-7xl px-4 py-16",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "text-center",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "text-sm font-bold uppercase tracking-[0.2em] text-violet-600",
								children: "Cómo funciona"
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "mt-2 text-4xl font-black",
								children: "Tu web en 3 pasos"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mx-auto mt-4 max-w-2xl text-slate-500",
								children: "El objetivo es que cualquiera entienda el proceso en segundos: pruebas, ves valor y solo pagas cuando merece la pena."
							})
						]
					}), /* @__PURE__ */ jsx("div", {
						className: "mt-10 grid gap-5 md:grid-cols-3 stagger",
						children: [
							[
								"1",
								"Elige plantilla",
								"Tienda, negocio local, portfolio o la categoría que mejor encaje contigo."
							],
							[
								"2",
								"Describe tu idea",
								"Ejemplo: “tienda de calcetines premium con catálogo visual y WhatsApp”."
							],
							[
								"3",
								"Activa tu plan",
								"Desbloquea edición, SEO y publicación cuando la demo ya te ha convencido."
							]
						].map(([num, title, text]) => /* @__PURE__ */ jsxs("div", {
							className: "card-hover rounded-[1.8rem] border border-slate-200 bg-white p-7 shadow-soft",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-lg font-black text-white",
									children: num
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "mt-5 text-2xl font-black",
									children: title
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-3 leading-7 text-slate-500",
									children: text
								})
							]
						}, title))
					})]
				}),
				/* @__PURE__ */ jsx("section", {
					id: "plantillas",
					className: "border-y border-slate-100 bg-slate-50",
					children: /* @__PURE__ */ jsxs("div", {
						className: "mx-auto max-w-7xl px-4 py-16",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "text-sm font-bold uppercase tracking-[0.2em] text-violet-600",
								children: "Plantillas"
							}), /* @__PURE__ */ jsx("h2", {
								className: "mt-2 text-4xl font-black",
								children: "Muchísimas plantillas para empezar ya bien"
							})] }), /* @__PURE__ */ jsxs(Link, {
								to: "/crear",
								className: "inline-flex items-center gap-2 text-sm font-bold text-violet-700",
								children: ["Ver todas", /* @__PURE__ */ jsx(ChevronRight, { size: 16 })]
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 stagger",
							children: featuredTemplates.map((template) => /* @__PURE__ */ jsxs("div", {
								className: "card-hover rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-soft",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "text-3xl",
										children: template.emoji
									}),
									/* @__PURE__ */ jsx("p", {
										className: "mt-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-500",
										children: template.category
									}),
									/* @__PURE__ */ jsx("h3", {
										className: "mt-2 text-xl font-black",
										children: template.name
									}),
									/* @__PURE__ */ jsx("p", {
										className: "mt-3 text-sm leading-6 text-slate-500",
										children: template.tagline
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "mt-5 inline-flex items-center gap-2 text-sm font-bold text-violet-700",
										children: ["Usar plantilla ", /* @__PURE__ */ jsx(ChevronRight, { size: 16 })]
									})
								]
							}, template.key))
						})]
					})
				}),
				/* @__PURE__ */ jsxs("section", {
					id: "precios",
					className: "mx-auto max-w-7xl px-4 py-16",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "text-center",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "text-sm font-bold uppercase tracking-[0.2em] text-violet-600",
								children: "Precios"
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "mt-2 text-4xl font-black",
								children: "Elige cómo quieres trabajar tu web"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mx-auto mt-4 max-w-2xl text-slate-500",
								children: "Pago único si solo quieres descargarla. Suscripción si quieres guardarla, editarla, mejorar SEO y volver cuando te haga falta."
							})
						]
					}), /* @__PURE__ */ jsx("div", {
						className: "mt-10 grid gap-5 xl:grid-cols-4 stagger",
						children: plans.map((plan) => /* @__PURE__ */ jsxs("div", {
							className: `card-hover rounded-[2rem] border p-6 shadow-soft ${plan.featured ? "border-violet-300 bg-violet-50" : "border-slate-200 bg-white"}`,
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-start justify-between gap-3",
									children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
										className: "text-xl font-black",
										children: plan.name
									}), /* @__PURE__ */ jsx("p", {
										className: "mt-2 text-sm text-slate-500",
										children: plan.desc
									})] }), plan.featured && /* @__PURE__ */ jsx("span", {
										className: "rounded-full bg-violet-600 px-3 py-1 text-xs font-bold text-white",
										children: "Más elegido"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-6",
									children: [/* @__PURE__ */ jsx("p", {
										className: "text-5xl font-black tracking-tight",
										children: plan.price
									}), /* @__PURE__ */ jsx("p", {
										className: "mt-2 text-sm text-slate-500",
										children: plan.note
									})]
								}),
								/* @__PURE__ */ jsx("ul", {
									className: "mt-6 space-y-3 text-sm text-slate-600",
									children: plan.bullets.map((bullet) => /* @__PURE__ */ jsxs("li", {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ jsx(CheckCircle2, {
												size: 16,
												className: "text-emerald-500"
											}),
											" ",
											bullet
										]
									}, bullet))
								}),
								/* @__PURE__ */ jsx(Link, {
									to: "/crear",
									className: `mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 font-bold ${plan.featured ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-brand" : "border border-slate-200 text-slate-800"}`,
									children: plan.name === "Solo la Web" ? "Quiero mi web" : `Elegir ${plan.name}`
								})
							]
						}, plan.name))
					})]
				}),
				/* @__PURE__ */ jsx("section", {
					className: "border-y border-slate-100 bg-slate-50",
					children: /* @__PURE__ */ jsxs("div", {
						className: "mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1.05fr_.95fr] lg:items-center",
						children: [/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("p", {
								className: "text-sm font-bold uppercase tracking-[0.2em] text-violet-600",
								children: "Modo Business"
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "mt-2 text-4xl font-black",
								children: "Tu tienda online, lista para vender"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-4 max-w-2xl text-lg leading-8 text-slate-600",
								children: "Si tu cliente pide una web de calcetines, moda o joyería, ClickWeb genera una estructura ecommerce real: home, catálogo, fichas, reseñas, beneficios, CTA y diseño preparado para conectar Shopify después."
							}),
							/* @__PURE__ */ jsx("div", {
								className: "mt-6 grid gap-3 sm:grid-cols-2",
								children: [
									"Catálogo visual",
									"Fichas de producto",
									"Bloques de confianza",
									"Estructura Shopify-ready"
								].map((item) => /* @__PURE__ */ jsx("div", {
									className: "rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-700 shadow-sm",
									children: item
								}, item))
							})
						] }), /* @__PURE__ */ jsx("div", {
							className: "rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft",
							children: /* @__PURE__ */ jsx("div", {
								className: "rounded-[1.8rem] bg-gradient-to-br from-slate-950 via-violet-900 to-indigo-900 p-6 text-white",
								children: /* @__PURE__ */ jsxs("div", {
									className: "grid gap-4 md:grid-cols-2",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "rounded-[1.5rem] bg-white/10 p-4",
											children: [
												/* @__PURE__ */ jsx("p", {
													className: "text-sm text-white/60",
													children: "Hero ecommerce"
												}),
												/* @__PURE__ */ jsx("p", {
													className: "mt-2 text-xl font-black",
													children: "Marca de calcetines premium"
												}),
												/* @__PURE__ */ jsx("p", {
													className: "mt-2 text-sm text-white/70",
													children: "Diseño atractivo, CTA fuertes y beneficios claros."
												})
											]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "rounded-[1.5rem] bg-white/10 p-4",
											children: [
												/* @__PURE__ */ jsx("p", {
													className: "text-sm text-white/60",
													children: "Productos"
												}),
												/* @__PURE__ */ jsx("p", {
													className: "mt-2 text-xl font-black",
													children: "Colección destacada"
												}),
												/* @__PURE__ */ jsx("p", {
													className: "mt-2 text-sm text-white/70",
													children: "Cards listas para conectar producto o botón Shopify."
												})
											]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "rounded-[1.5rem] bg-white/10 p-4",
											children: [
												/* @__PURE__ */ jsx("p", {
													className: "text-sm text-white/60",
													children: "Conversión"
												}),
												/* @__PURE__ */ jsx("p", {
													className: "mt-2 text-xl font-black",
													children: "Reseñas y garantías"
												}),
												/* @__PURE__ */ jsx("p", {
													className: "mt-2 text-sm text-white/70",
													children: "Más confianza para vender desde el primer día."
												})
											]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "rounded-[1.5rem] bg-white/10 p-4",
											children: [
												/* @__PURE__ */ jsx("p", {
													className: "text-sm text-white/60",
													children: "Escalado"
												}),
												/* @__PURE__ */ jsx("p", {
													className: "mt-2 text-xl font-black",
													children: "SEO + blog + categorías"
												}),
												/* @__PURE__ */ jsx("p", {
													className: "mt-2 text-sm text-white/70",
													children: "Preparada para crecer y posicionarse mejor."
												})
											]
										})
									]
								})
							})
						})]
					})
				}),
				/* @__PURE__ */ jsx("section", {
					className: "mx-auto max-w-7xl px-4 py-16",
					children: /* @__PURE__ */ jsx("div", {
						className: "rounded-[2.2rem] bg-slate-950 px-8 py-12 text-white shadow-soft",
						children: /* @__PURE__ */ jsxs("div", {
							className: "grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center",
							children: [/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("p", {
									className: "text-sm font-bold uppercase tracking-[0.2em] text-white/60",
									children: "Empieza hoy"
								}),
								/* @__PURE__ */ jsx("h2", {
									className: "mt-2 text-4xl font-black",
									children: "Tu web profesional puede estar lista hoy"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-4 max-w-2xl text-lg leading-8 text-white/70",
									children: "Crea una demo, mira el resultado y desbloquea la versión completa cuando de verdad te convenza."
								})
							] }), /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row",
								children: [/* @__PURE__ */ jsxs(Link, {
									to: "/crear",
									className: "inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 font-bold text-slate-900",
									children: ["Crear mi web ", /* @__PURE__ */ jsx(ArrowRight, { size: 18 })]
								}), /* @__PURE__ */ jsxs("a", {
									href: "https://wa.me/34665196043?text=Hola%20%F0%9F%91%8B%20estoy%20viendo%20ClickWeb%20y%20quiero%20crear%20mi%20web%2C%20%C2%BFme%20puedes%20ayudar%3F",
									target: "_blank",
									rel: "noreferrer",
									className: "inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-4 font-bold text-white",
									children: [/* @__PURE__ */ jsx(MessageCircle, { size: 18 }), " WhatsApp"]
								})]
							})]
						})
					})
				})
			] }),
			/* @__PURE__ */ jsxs("a", {
				href: "https://wa.me/34665196043?text=Hola%20%F0%9F%91%8B%20estoy%20viendo%20ClickWeb%20y%20quiero%20crear%20mi%20web%2C%20%C2%BFme%20puedes%20ayudar%3F",
				target: "_blank",
				rel: "noreferrer",
				className: "fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-bold text-white shadow-2xl transition-transform hover:scale-[1.02]",
				children: [/* @__PURE__ */ jsx(MessageCircle, { size: 18 }), " ¿Dudas? WhatsApp"]
			})
		]
	});
}
//#endregion
export { HomePage as component };
