import Vue from 'vue';
import VueRouter from 'vue-router';
import Biz1 from 'views/biz1/biz1_main.vue';
import Board from 'views/biz1/Board.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    mode : 'history',
    routes: [
        { path:'/biz1', component: Biz1 }
        ,{ path:'/b/:bid', component: Board }
    ]
});

export default router;