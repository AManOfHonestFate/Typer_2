import {createRouter, createWebHistory} from "vue-router";
import TextArea from "@/components/TextArea.vue";

const routes = [
    {path: '/', redirect: '/words'},
    {path: '/words', component: TextArea},
    {path: '/hard_words', component: TextArea},
    {path: '/wiki', component: TextArea},
    {path: '/ru', component: TextArea}
]

export default createRouter({
    routes, history: createWebHistory()
});