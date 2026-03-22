import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/checkout.success.tsx
var $$splitComponentImporter = () => import("./checkout.success-DP2YkshH.js");
var Route = createFileRoute("/checkout/success")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	validateSearch: (search) => ({
		plan: search.plan || "",
		session_id: search.session_id || ""
	})
});
//#endregion
export { Route as t };
