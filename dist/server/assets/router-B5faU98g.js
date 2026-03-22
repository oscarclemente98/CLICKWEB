import { createRootRoute, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsxs, jsx } from "react/jsx-runtime";
const Route$9 = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        title: "ClickWeb — crea webs y tiendas profesionales con IA"
      },
      {
        name: "description",
        content: "Crea webs profesionales, tiendas online y páginas para captar clientes en minutos con IA, SEO y planes pensados para vender."
      }
    ]
  }),
  shellComponent: RootDocument
});
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "es", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$8 = () => import("./register-8EJHd6I0.js");
const Route$8 = createFileRoute("/register")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./login-y4gS9sJl.js");
const Route$7 = createFileRoute("/login")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./faq-CmJ5oIDD.js");
const Route$6 = createFileRoute("/faq")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./dashboard-CnHvlxut.js");
const Route$5 = createFileRoute("/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./crear-DndoaRiV.js");
const Route$4 = createFileRoute("/crear")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component"),
  validateSearch: (search) => ({
    desc: search.desc || "",
    id: search.id || ""
  })
});
const $$splitComponentImporter$3 = () => import("./index-D6FGycjq.js");
const Route$3 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./preview._id-BLBOzdm5.js");
const Route$2 = createFileRoute("/preview/$id")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./checkout.success-Dcfa7ELY.js");
const Route$1 = createFileRoute("/checkout/success")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component"),
  validateSearch: (search) => ({
    plan: search.plan || "",
    session_id: search.session_id || ""
  })
});
const $$splitComponentImporter = () => import("./checkout.cancel-kal5l5Ij.js");
const Route = createFileRoute("/checkout/cancel")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const RegisterRoute = Route$8.update({
  id: "/register",
  path: "/register",
  getParentRoute: () => Route$9
});
const LoginRoute = Route$7.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$9
});
const FaqRoute = Route$6.update({
  id: "/faq",
  path: "/faq",
  getParentRoute: () => Route$9
});
const DashboardRoute = Route$5.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$9
});
const CrearRoute = Route$4.update({
  id: "/crear",
  path: "/crear",
  getParentRoute: () => Route$9
});
const IndexRoute = Route$3.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$9
});
const PreviewIdRoute = Route$2.update({
  id: "/preview/$id",
  path: "/preview/$id",
  getParentRoute: () => Route$9
});
const CheckoutSuccessRoute = Route$1.update({
  id: "/checkout/success",
  path: "/checkout/success",
  getParentRoute: () => Route$9
});
const CheckoutCancelRoute = Route.update({
  id: "/checkout/cancel",
  path: "/checkout/cancel",
  getParentRoute: () => Route$9
});
const rootRouteChildren = {
  IndexRoute,
  CrearRoute,
  DashboardRoute,
  FaqRoute,
  LoginRoute,
  RegisterRoute,
  CheckoutCancelRoute,
  CheckoutSuccessRoute,
  PreviewIdRoute
};
const routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$4 as R,
  Route$2 as a,
  Route$1 as b,
  router as r
};
