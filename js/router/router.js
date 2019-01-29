var Biz1 = GL.importComponent( 'views/biz1/biz1_main.html' );

GL.regRouter({
    mode: 'history',
    routes : [
      { path:'/biz1', component: Biz1 }
      //{ path: '/', component: 'center-comp'/*, beforeEnter: requireAuth*/ },
      //{ path: '/login', component: Login },
     // { path: '/b/:bid', component: Board/*, beforeEnter: requireAuth, children:[{ path: 'c/:cid', component: Card, beforeEnter: requireAuth }]*/ },
     // { path: '*', component: NotFound }
    ]
});
