GL.regConfig({
    rootUrl : '/'
    ,frame : {
        template:'gljs/core/layout/frame.html'
        ,vueContainerId : 'GL-v-app'
        ,layout : {
            header:     { component:'views/layout/header.vue',         bindContainerId:'GL_appLayoutTopPageArea',   on:true, height:60 }
            ,footer:    { component:'views/layout/footer.vue',         bindContainerId:'',                          on:false, height:0 }
            ,leftSide:  { component:'views/layout/leftSide.vue',       bindContainerId:'GL_appLayoutLeftPageArea',  on:false, width:90 }
            ,rightSide: { component:'views/layout/rightSide.vue',      bindContainerId:'',                          on:false, width:0 }
            ,center:    { component:'views/layout/center.vue',         bindContainerId:'GL_appLayoutCenterPageArea' }
        }
    }
    ,isSPA : true
    ,isVue : true
    ,vuePlugin : {
        js : [
            'gljs/lib/vue/plugin/es6-sham.js'
            ,'gljs/lib/vue/vue.js'
            ,'gljs/lib/vue/plugin/axios-0.18.0.min.js'       // vue http 사용 js.
            ,'gljs/lib/vue/plugin/polyfill-7.2.5.min.js'    // ie에서 axios를 사용하기 위한 추가.
            ,'gljs/lib/vue/plugin/babel-standalone.min.js'
            
            ,'gljs/lib/vue/plugin/vue.router-3.0.2.min.js'  // vue router plugin library
            ,'gljs/lib/vue/plugin/vuex-3.1.0.min.js'        // vuex library
            
        ]
    }
    ,vueRouter : [
        //'js/router/router.js'
        'router/index.js'
    ]
    ,vuex : [
        'store/index.js'
    ]
});





