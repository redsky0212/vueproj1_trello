function require( s ){
    if( s == 'vue' || s == 'Vue' ){
        return Vue;
    }else if( s == 'vuex' || s == 'Vuex' ){
        return Vuex;
    }else if( s == 'vue-router' ){
        return VueRouter;
    }else{
        s = GL.CONFIG.rootUrl + s.replace(/^[\/|.]+/g, '');
        var extension = s.substring(s.lastIndexOf('.'), s.length).replace('.','');

        var xhrObj = new XMLHttpRequest();
        xhrObj.open('GET', s, false);
        xhrObj.send(null);

        if( extension == 'vue' ){
            var result = GL.__internal__._extractVueCode( xhrObj.responseText );
            var _temp = result.template;
            var _o = eval( GL.__internal__._babelTransform( result.js ) );
            _o.template = _temp;
            return _o;
        }else{
            return eval( GL.__internal__._babelTransform(xhrObj.responseText ) );
        }

        
        // $.getScript('/filename.js',callbackFunction); // sync ?
    }
}