import { createRouter, createWebHistory } from "vue-router";

import dashboard from "../pages/master/dashboard.vue"

import home from "../pages/home.vue"
import overview from "../pages/overview.vue"

const routes = [
    {
        name: "dashboard",
        path: "/",
        component: dashboard,
        children: [
            {
                name: 'home',
                path: '/',
                component: home
            },
            {
                name: 'overview',
                path: 'overview',
                component: overview
            }
        ]
    },

];
const router = Router();
export default router;
function Router() {
    const router = new createRouter({
        history: createWebHistory(),
        routes,
    });
    return router;
}
