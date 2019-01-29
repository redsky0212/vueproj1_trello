GL.regVuex({
    state : GL.importModule('store/state.js'),
    getters : GL.importModule('store/getters.js'),
    mutations : GL.importModule('store/mutations.js'),
    actions : GL.importModule('store/actions.js'),
    modules : {
        biz1 : GL.importModule('store/modules/biz1.js')
        ,biz2 : GL.importModule('store/modules/biz2.js')
    }
});