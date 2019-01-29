GL.exportModule({
    namespaced: true
    ,state : {
        biz1 : ['1', '2']
    }
    ,getters : {}
    ,actions : {
        getBiz1 : function( context ){
            debugger;
            var _context = context;
            setTimeout(function(){
                _context.commit('setBiz1');
            }, 2000);
        }
    }
    ,mutations : {
        setBiz1 : function( state, val ){
            debugger;
            state.biz1 = ['3', '4'];
        }
    }
});