GL.exportModule({
    ACTION_TEST : function( context, data ){
        var _context = context;
        var _data = data;
        setTimeout(function(){
            _context.commit('SET_AAA', _data);
        }, 2000);
    }
});