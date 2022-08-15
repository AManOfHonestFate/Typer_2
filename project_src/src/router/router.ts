import {createRouter, createWebHistory} from "vue-router";
import SetWords from "@/components/SetWords.vue";
import SetTime from "@/components/SetTime.vue";

const routes = [
    {path: '/', redirect: '/words'},
    {path: '/words', component: SetWords},
    {path: '/hard_words', component: SetWords},
    {path: '/wiki', component: SetTime},
    {path: '/ru', component: SetTime}
]

export default createRouter({
    routes, history: createWebHistory()
});