import { t as Route$7 } from "./crear-C7nJ9rid.js";
import { t as Route$8 } from "./preview._id-Byodhwqj.js";
import { t as Route$9 } from "./checkout.success-Zg3WpDLI.js";
import { HeadContent, Scripts, createFileRoute, createRootRoute, createRouter, lazyRouteComponent } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/__root.tsx
var Route$6 = createRootRoute({
	head: () => ({ meta: [
		{ charSet: "utf-8" },
		{
			name: "viewport",
			content: "width=device-width, initial-scale=1"
		},
		{ title: "ClickWeb — crea webs y tiendas profesionales con IA" },
		{
			name: "description",
			content: "Crea webs profesionales, tiendas online y páginas para captar clientes en minutos con IA, SEO y planes pensados para vender."
		}
	] }),
	shellComponent: RootDocument
});
function RootDocument({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "es",
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", { children: [children, /* @__PURE__ */ jsx(Scripts, {})] })]
	});
}
//#endregion
//#region src/routes/register.tsx
var $$splitComponentImporter$5 = () => import("./register-D7GxHa1H.js");
var Route$5 = createFileRoute("/register")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
//#endregion
//#region src/routes/login.tsx
var $$splitComponentImporter$4 = () => import("./login-CvXaJVt2.js");
var Route$4 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
//#endregion
//#region src/routes/faq.tsx
var $$splitComponentImporter$3 = () => import("./faq-BgUsYHxi.js");
var Route$3 = createFileRoute("/faq")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
//#endregion
//#region src/routes/dashboard.tsx
var $$splitComponentImporter$2 = () => import("./dashboard-CSeL2C3d.js");
var Route$2 = createFileRoute("/dashboard")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter$1 = () => import("./routes-CNq_Uuz7.js");
var Route$1 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
//#endregion
//#region src/routes/checkout.cancel.tsx
var $$splitComponentImporter = () => import("./checkout.cancel-CUdC9mp1.js");
var Route = createFileRoute("/checkout/cancel")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
//#endregion
//#region src/routeTree.gen.ts
var RegisterRoute = Route$5.update({
	id: "/register",
	path: "/register",
	getParentRoute: () => Route$6
});
var LoginRoute = Route$4.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$6
});
var FaqRoute = Route$3.update({
	id: "/faq",
	path: "/faq",
	getParentRoute: () => Route$6
});
var DashboardRoute = Route$2.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => Route$6
});
var CrearRoute = Route$7.update({
	id: "/crear",
	path: "/crear",
	getParentRoute: () => Route$6
});
var IndexRoute = Route$1.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$6
});
var PreviewIdRoute = Route$8.update({
	id: "/preview/$id",
	path: "/preview/$id",
	getParentRoute: () => Route$6
});
var CheckoutSuccessRoute = Route$9.update({
	id: "/checkout/success",
	path: "/checkout/success",
	getParentRoute: () => Route$6
});
var rootRouteChildren = {
	IndexRoute,
	CrearRoute,
	DashboardRoute,
	FaqRoute,
	LoginRoute,
	RegisterRoute,
	CheckoutCancelRoute: Route.update({
		id: "/checkout/cancel",
		path: "/checkout/cancel",
		getParentRoute: () => Route$6
	}),
	CheckoutSuccessRoute,
	PreviewIdRoute
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
var getRouter = () => {
	return createRouter({
		routeTree,
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
