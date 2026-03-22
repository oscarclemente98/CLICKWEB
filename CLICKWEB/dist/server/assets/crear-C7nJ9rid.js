import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
//#region src/routes/crear.tsx
var $$splitComponentImporter = () => import("./crear-B53gcf_6.js");
var Route = createFileRoute("/crear")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	validateSearch: (search) => ({
		desc: search.desc || "",
		id: search.id || ""
	})
});
//#endregion
export { Route as t };
