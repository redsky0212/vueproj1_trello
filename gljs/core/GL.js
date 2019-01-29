/*!
 * SKTD JavaScript common v0.01
 * SKT DT추진단
 *
 * Must include jQuery
 * http://jquery.com/
 *
 * Copyright SKT DT추진단
 *
 * Date: 2019-01-14
 */
(function( $, window ){
	
	var document 	= window.document
		,navigator 	= window.navigator
		,location 	= window.location;

	var GL = (function($, undefined){
		
		var _GL = function(){	
		};
        
        // ====================================================================
        // common variable (START)=============================================
        _GL.CONFIG = {};                        // GL configuration
        _GL.IS_SPA = true;                      // SPA(single page application)인지 아닌지.
        _GL._ROOTVM = null;                     // Vue 생성자
        _GL.ROUTER = null;                      // Vue router 인스턴스
        _GL.VUEX = null;                        // Vue vuex 인스턴스

        // common variable (END)===============================================
        // ====================================================================
        

        // ====================================================================
		// common function(START)==============================================
		/**
 		 * Start application
 		 * parameter '' : ''
		 */
		_GL.app = function( arg ){
            // IE9+
			document.addEventListener("DOMContentLoaded", function(){
                /**
                 * todo -- 넘어온 argument 나 그 외 추가 로직 구현 필요.....
                 */

                // set vue plugin.
                if( GL.CONFIG.isVue ){
					GL.__internal__._regVuePluginJS( GL.CONFIG.vuePlugin.js, function(){
						GL.__internal__._beginApp();
					});
				}else{
                    GL.__internal__._beginApp();
                }

                
            });
        };

        /**
         *  GL.CONFIG셋팅
		 * parameter 'obj' : 다양한 config 값 (template, isSPA, SPALayout, ... )
		 */
        _GL.regConfig = function( obj ){
			if( obj ){
                GL.CONFIG = obj;
                // spa 설정값 셋팅
                GL.IS_SPA = GL.CONFIG.isSPA == undefined ? true : GL.CONFIG.isSPA;
            }
        };

        /**
         * GL.ROUTER 셋팅
         * parameter 'object' : 'Vue Router Construction Options'(https://router.vuejs.org/api/#router-construction-options)
         */
        _GL.regRouter = function( obj ){
            if( GL.CONFIG.isVue ){
                GL.__internal__._routerConstructionOptions = obj || null;
            }
        };
        /**
         * GL.VUEX 셋팅
         * parameter 'object' : 'Vue Vuex Construction Options'(https://vuex.vuejs.org/api/#vuex-store-constructor-options)
         */
        _GL.regVuex = function( obj ){
            if( GL.CONFIG.isVue ){
                GL.__internal__._vuexConstructionOptions = obj || null;
            }
        };
        /**
         * 각 화면의 html, js를 가져와 화면 컴포넌트 객체를 return 한다.
         * parameter 'tempUrl' : '각각의 화면 template이 있는 url'
         ******* 현재는 동기 처리를 위해 $.ajax()를 사용하여 처리 하였으나 추 후 개선의 여지가 있음.
         */
        _GL.importComponent = function( tempUrl ){
            var _tempUrl = GL.CONFIG.rootUrl+tempUrl.replace(/^[\/|.]+/g, '');
            // 동기호출방식
            var sHtml = $.ajax({ type: "GET", url: _tempUrl, async: false }).responseText;

            var fileName = _tempUrl.split(/(\\|\/)/g).pop().split('.')[0];
            var _jsUrl =  _tempUrl.slice(0, _tempUrl.lastIndexOf('/')) + '/js/' + fileName + '.vue.js';
            eval($.ajax({ type: "GET", url: _jsUrl, async: false }).responseText);
            GL.__internal__._routerCompObject.template = sHtml;
            GL.__internal__._routerCompObject = GL.__internal__._recombinationCompObject(GL.__internal__._routerCompObject);
            return GL.__internal__._routerCompObject;
        };
        _GL.importModule = function( url ){
            var _url = GL.CONFIG.rootUrl + url.replace(/^[\/|.]+/g, '');
            return eval($.ajax({ type: "GET", url: _url, async: false }).responseText);
        };
        _GL.exportModule = function( obj ){
            return obj;
        };
        /**
         * 각 화면의 vue.js 파일에서 컴포넌트 객체 코드를 작성할때 호출하는 함수
         * parameter 'obj' : '각 화면의 vue 컴포넌트 option 객체'
         */
        _GL.regComponent = function( obj ){
            GL.__internal__._routerCompObject = GL.__internal__._recombinationCompObject(obj);
        };

        /**
 		 * ajax 모듈
 		 * parameter 'obj' : ajax호출에 필요한 arguments.
		 * parameter 'sFn' : ajax 성공 callback.
		 * parameter 'eFn' : ajax 실패 callback.
		 */
		_GL.ajax = function(obj, sFn, eFn){
			
			var _url		= obj.url || '';
			var _type		= obj.type || 'GET';
			var _dataType	= obj.dataType || 'text';
			var _data		= obj.data || {};
			var _async		= obj.async || true;
			var _contentType= obj.contentType || 'text/plain; charset=UTF-8';
			
			// 로딩바 띄우기
			
			var request = $.ajax({
				headers: { 
					Accept : "*/*"
					//,"Content-Type": "text/plain"
					,"Content-Type": "application/json"
					//,"Cache-Control": "max-age=31536000"
				}
				,url:		_url
				,type:		_type
				,data:		_data
				,dataType:	_dataType
				,async:		_async
				,contentType: _contentType
				,crossOrigin: true
			});
			request.done(function( msg ) {
				sFn(msg);
			});
			request.fail(function( jqXHR, textStatus ) {
				eFn(textStatus);
			});
			
			return request;
        };
        /**
 		 * GL.extend() (두개의 object를 병합.)
 		 * parameter 'object' : target이 되는 object
		 * parameter 'object1' : 병합할 object
         * parameter 'objectN' : 병합할 object의 N개
		 */
        _GL.extend = function(){
            
            // Variables
            var extended = {};
            var deep = false;
            var i = 0;

            // Check if a deep merge
            if(typeof (arguments[0]) === 'boolean]') {
                deep = arguments[0];
                i++;
            }

            // Merge the object into the extended object
            var merge = function (obj){
                for( var prop in obj ){
                    if (obj.hasOwnProperty(prop)) {
                        if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                            // If we're doing a deep merge and the property is an object
                            extended[prop] = GL.extend(true, extended[prop], obj[prop]);
                        } else {
                            // Otherwise, do a regular merge
                            extended[prop] = obj[prop];
                        }
                    }
                }
            };

            // Loop through each object and conduct a merge
            for (var k=i; k < arguments.length; k++) {
                merge(arguments[k]);
            }

            return extended;
        };
        /**
 		 * Vuex 플러그인 wrapping
		 */
        _GL.Vuex = {
            /**
             * Vuex.mapState() 'Vuex 저장소의 하위 트리를 반환하는 컴포넌트 계산 옵션을 만듭니다'
             * parameter namespace? : string
             * parameter map : Array<string> | Object<string | function>
             */
            mapState : function(){

                var _result = null;

                if( arguments.length == 1 ){
                    _result = Vuex.mapState(arguments[0]);
                }else if( arguments.length == 2 ){
                    _result = Vuex.mapState(arguments[0], arguments[1]);
                }

                var _returnObj = {};
                for( var prop in _result ){
                    _returnObj[prop] = _result[prop];
                }
                return _returnObj;
            }
            /**
             * Vuex.mapMutations() '변이를 커밋하는 컴포넌트 메소드 옵션을 만듭니다.'
             * parameter namespace? : string
             * parameter map : Array<string> | Object<string | function>
             */
            ,mapMutations : function(){

                var _result = null;

                if( arguments.length == 1 ){
                    _result = Vuex.mapMutations(arguments[0]);
                }else if( arguments.length == 2 ){
                    _result = Vuex.mapMutations(arguments[0], arguments[1]);
                }

                var _returnObj = {};
                for( var prop in _result ){
                    _returnObj[prop] = _result[prop];
                }
                return _returnObj;
            }
            /**
             * Vuex.mapActions() '액션을 전달하는 컴포넌트 메소드 옵션을 만듭니다.'
             * parameter namespace? : string
             * parameter map : Array<string> | Object<string | function>
             */
            ,mapActions : function(){

                var _result = null;

                if( arguments.length == 1 ){
                    _result = Vuex.mapActions(arguments[0]);
                }else if( arguments.length == 2 ){
                    _result = Vuex.mapActions(arguments[0], arguments[1]);
                }

                var _returnObj = {};
                for( var prop in _result ){
                    _returnObj[prop] = _result[prop];
                }
                return _returnObj;
            }
        };
        
		// common function(END)================================================
        // ====================================================================

        // =====================================================================
		// internal variable, function(START)===================================
		_GL.__internal__ = {
            _isAppShell : true                      // SPA에서 layout(application shell)을 동적생성할지여부.
            ,_isLayoutHeader : true					// SPA 구조의 header부분 layout을 사용할지여부.
			,_isLayoutFooter : false				// SPA 구조의 footer부분 layout을 사용할지여부.
			,_isLayoutLeft : true				    // SPA 구조의 left menu부분 layout을 사용할지여부.
            ,_isLayoutRight : true				    // SPA 구조의 right menu부분 layout을 사용할지여부.
            
            ,_routerConstructionOptions : null      // GL.regRouter() 함수의 argument object를 저장. vue 인스턴스 생성 직전에 VueRouter() 생성하기 위함.
            ,_vuexConstructionOptions : null        // GL.regVuex() 함수의 argument object를 저장. vue 인스턴스 생성 직전에 Vuex.Store() 생성하기 위함.

            ,_routerCompObject : {}                 // 라우터에서 component를 GL.importComponent() 했을때 각각의 컴포넌트 object가 저장되는 곳.
            ,_layoutCompObject : {}                 // center는 router-view로 생성되고 나머지 header, leftSide, rightSide, footer 의 component 객체를 저장한다.

            ,_beginApp : function(){
                if( this._isAppShell ){
                    GL.__internal__._setupAppShell(function(){

                        // 작업중.......
                        // 각 컴포넌트에 데이터를 넘겨주는 방식을 어떻게 할지 구현필요.
                        // 라우터를 이용한 화면전환 방법 구현 필요. vue-router 가이드내용보기.
                        // ES5환경에서 싱글파일컴포넌트를 사용못할경우 router사용법 정의 필요.
                        // 각 컴포넌트간 데이터 관리 Vuex사용 고려중....

                        

                        var vueOptions = {
                            el : '#'+GL.CONFIG.frame.vueContainerId,
                            data : {
                                msg:'aaa'
                            }
                        };
                        // vue router 생성.------------------------------------------------
                        if( GL.__internal__._routerConstructionOptions ){
                            //GL.ROUTER = new VueRouter( GL.__internal__._routerConstructionOptions );
                            GL.ROUTER = GL.__internal__._routerConstructionOptions;
                            vueOptions.router = GL.ROUTER;
                            // 최초로 만들어진 center-comp 컴포넌트를 router에 '/'(root)로 반영한다.
                            var _o = GL.__internal__._layoutCompObject['center-comp'];
                            _o.template = '#center-comp';
                            GL.ROUTER.addRoutes([{path:'/', component:_o}]);
                        }
                        // vuex store 생성.------------------------------------------------
                        if( GL.__internal__._vuexConstructionOptions ){
                            GL.VUEX = new Vuex.Store( GL.__internal__._vuexConstructionOptions );
                            vueOptions.store = GL.VUEX;
                        }

                        // frame layout 컴포넌트 생성.--------------------------------------
                        vueOptions.components = GL.__internal__._layoutCompObject;
                        // vue 인스턴스 생성
                        GL._ROOTVM = new Vue( vueOptions );

                    });
                }else{
                    // todo - 화면 layout 동적생성 사용하지 않을경우.
                }
            }
            ,_setupAppShell : function( callback ){

                var _self = this;
                var _callback = callback;
                var _id = document.getElementsByTagName('body')[0].id.trim();

                if( !!_id ){
                    // set layout option
                    _self._setFrameOption();
                    // get frame layout template
                    _self._getHTMLTemplate( GL.CONFIG.frame.template, function( sHtml ){
                        // insert frame template to body
                        document.getElementById(_id).insertAdjacentHTML('afterbegin', sHtml);
                        // set frame layout vue component (header, leftSide, rightSide, footer, center) 
                        _self._setLayoutComponent(function(){

                            // router 파일 셋팅
                            _self._setRouterFile(function(){

                                // vuex 파일 셋팅
                                _self._setVuexFile(function(){
                                    _callback();
                                });

                                
                            });
                            
                        });
                    });
                }else{
                    console.error('[GL warn]: Set the id attribute at body element');
                }

            }
            ,_getHTMLTemplate: function(url, callback){
                
                var _url = GL.CONFIG.rootUrl + url.replace(/^[\/|.]+/g, '');
                var _callback = callback;
                
                if( GL.CONFIG.isVue ){
                    axios.get(_url)
                    .then(function(response) {
                        _callback(response.data);
                    })
                    .catch(function(error) {
                        console.error('[GL warn]: ' + error);
                    });
                }else{
                    GL.ajax(
                        {url: _url}
                        ,function( data ){
                            _callback(data);
                        }
                        ,function( error ){
                            console.error('[GL warn]: ' + error);
                        }
                    );
                }
            }
            ,_getVueComponent: function(url, callback){
                var _self = this;
                var _url = GL.CONFIG.rootUrl + url.replace(/^[\/|.]+/g, '');
                var _callback = callback;

                if( GL.CONFIG.isVue ){
                    axios.get(_url)
                    .then(function(response) {
                        var result = _self._extractVueCode( response.data );
                        _callback( result.template, result.js );
                    })
                    .catch(function(error) {
                        console.error('[GL warn]: ' + error);
                    });
                }else{
                    GL.ajax(
                        {url: _url}
                        ,function( response ){
                            var result = _self._extractVueCode( response.data );
                            _callback( result.template, result.js );
                        }
                        ,function( error ){
                            console.error('[GL warn]: ' + error);
                        }
                    );
                }
            }
            ,_extractVueCode: function( str ){
                var _str = str.replace(/<style[^>]*?>[\s\S]*?<\/style>/gi, '');
                var sHtml = _str.replace(/<script[^>]*?>[\s\S]*?<\/script>/gi, '').replace(/<\/?template[^>]*?>/gi,'');
                var sJs = _str.replace(/<template[^>]*?>[\s\S]*?<\/template>/gi, '').replace(/(<|<\/)script([\s.'"=a-zA-Z]*)>/gi,'');
                return { template: sHtml, js: sJs };
            }
            ,_regVuePluginJS: function( arr, callback ){

                var _readCnt = 0,
                    _uri = arr,
                    _cb = callback,
                    _cnt = _uri.length || 0;
                
                var _then = function( arg ){
                    var _arg = GL.CONFIG.rootUrl + arg.replace(/^[\/|.]+/g, '');
                    if( _arg ){
                        var _tagScript = document.createElement('script');
                            _tagScript.type = 'text/javascript';
                            _tagScript.charset = 'UTF-8';
                            _tagScript.async = true;
                            _tagScript.src = _arg;
                        // IE 6 & 7(지원X)----------------
                        if (_tagScript.readyState){
                            _tagScript.onreadystatechange = function() {
                                if (this.readyState == 'loaded' || this.readyState == 'complete') {
                                    this.onreadystatechange = null;
                                    _readCnt++;
                                    if(_readCnt == _cnt){
                                        _cb(this);
                                    }else{
                                        _then( _uri[_readCnt] );
                                    }
                                }
                            };
                            
                        // most browsers-----------------
                        }else{
                            _tagScript.onload  = function(){ 
                                _readCnt++;
                                if(_readCnt == _cnt){
                                    _cb(this);
                                }else{
                                    _then( _uri[_readCnt] );
                                }
                            };
                            _tagScript.onerror = function(){
                                console.error('[GL warn]: Load vue plugin js :' + _arg);
                                _readCnt++;	
                                if(_readCnt == _cnt){
                                    _cb(this);
                                }else{
                                    _then( _uri[_readCnt] );
                                }
                            };
                        }
                        document.getElementsByTagName('head')[0].appendChild(_tagScript);
                    }
                };
                _then( _uri[_readCnt] );
            }
            ,_setFrameOption : function(){

                // set layout config
				GL.__internal__._isLayoutHeader = GL.CONFIG.frame.layout.header.on || false;
				GL.__internal__._isLayoutFooter = GL.CONFIG.frame.layout.footer.on || false;
				GL.__internal__._isLayoutLeft = GL.CONFIG.frame.layout.leftSide.on || false;
				GL.__internal__._isLayoutRight = GL.CONFIG.frame.layout.rightSide.on || false;

            }
            ,_setLayoutComponent : function( callback ){

                var _self = this;
                var _callback = callback;
                var _callCnt = 0;

                var _fn = function( _compNm, _url, _id ){
                    _self._getVueComponent(_url, function( sTemplate, sJs ){
                        _callCnt--;
                        // insert layout template to frame
                        if(_compNm == 'center'){
                           // 'text/x-template' 방식으로 template를 붙이는 코드(center는 router-view를 사용하기 위해)------------------
                            var aHtml = [];
                            aHtml.push('<script type="text/x-template" id="'+_compNm+'-comp">');
                            aHtml.push(sTemplate);
                            aHtml.push('</script>');
                            document.getElementById('GL-component-template-container').insertAdjacentHTML( 'afterbegin', aHtml.join('') );
                            GL.__internal__._layoutCompObject[_compNm + '-comp'] = eval( GL.__internal__._babelTransform( sJs ) );
                        }else{
                            document.getElementById(_id).insertAdjacentHTML(
                                'afterbegin'
                                ,'<'+_compNm+'-comp v-bind:c-msg="msg" inline-template>'+sTemplate+'</'+_compNm+'-comp>'
                            );
                            GL.__internal__._layoutCompObject[_compNm + '-comp'] = eval( GL.__internal__._babelTransform( sJs ) );
                        }
                        if( _callCnt == 0 ){
                            _callback();
                        }
                    });
                };

                for( var prop in GL.CONFIG.frame.layout ){
                    var _layoutItem = GL.CONFIG.frame.layout[prop];
					if( _layoutItem.on || prop == 'center' ){
                        if( _layoutItem.component.trim() && _layoutItem.bindContainerId.trim() ){
                            _callCnt++;
                            _fn( prop, _layoutItem.component, _layoutItem.bindContainerId.trim() );
						}
                    }

                    // frame layout config 값 셋팅.
                    _self._setFrameLayoutOption(prop);
				}
            }
            ,_setRouterFile : function( callback ){
                
                var _readCnt = 0,
                    _uri = GL.CONFIG.vueRouter,
                    _cb = callback,
                    _cnt = _uri.length || 0;
                
                for( var i=0; i<_cnt; i++ ){
                    GL.__internal__._routerConstructionOptions = GL.__internal__._require(_uri[i]);
                }
                _cb(this);
            }
            ,_setRouterFile_old : function( callback ){
                
                var _readCnt = 0,
                    _uri = GL.CONFIG.vueRouter,
                    _cb = callback,
                    _cnt = _uri.length || 0;
                
                var _then = function( arg ){
                    if( arg ){
                        var _tagScript = document.createElement('script');
                            _tagScript.type = 'text/javascript';
                            _tagScript.charset = 'UTF-8';
                            _tagScript.async = true;
                            _tagScript.src = arg;
                        // IE 6 & 7(지원X)----------------
                        if (_tagScript.readyState){
                            _tagScript.onreadystatechange = function() {
                                if (this.readyState == 'loaded' || this.readyState == 'complete') {
                                    this.onreadystatechange = null;
                                    _readCnt++;
                                    if(_readCnt == _cnt){
                                        _cb(this);
                                    }else{
                                        _then( _uri[_readCnt] );
                                    }
                                }
                            };
                            
                        // most browsers-----------------
                        }else{
                            _tagScript.onload  = function(){ 
                                _readCnt++;
                                if(_readCnt == _cnt){
                                    _cb(this);
                                }else{
                                    _then( _uri[_readCnt] );
                                }
                            };
                            _tagScript.onerror = function(){
                                console.error('[GL warn]: Load vue plugin js' + arg);
                                _readCnt++;	
                                if(_readCnt == _cnt){
                                    _cb(this);
                                }else{
                                    _then( _uri[_readCnt] );
                                }
                            };
                        }
                        document.getElementsByTagName('head')[0].appendChild(_tagScript);
                    }
                };
                _then( _uri[_readCnt] );
                
            }
            ,_setVuexFile : function( callback ){
                
                var _readCnt = 0,
                    _uri = GL.CONFIG.vuex,
                    _cb = callback,
                    _cnt = _uri.length || 0;
                
                var _then = function( arg ){
                    arg = GL.CONFIG.rootUrl + arg.replace(/^[\/|.]+/g, '');
                    if( arg ){
                        var _tagScript = document.createElement('script');
                            _tagScript.type = 'text/javascript';
                            _tagScript.charset = 'UTF-8';
                            _tagScript.async = true;
                            _tagScript.src = arg;
                        // IE 6 & 7(지원X)----------------
                        if (_tagScript.readyState){
                            _tagScript.onreadystatechange = function() {
                                if (this.readyState == 'loaded' || this.readyState == 'complete') {
                                    this.onreadystatechange = null;
                                    _readCnt++;
                                    if(_readCnt == _cnt){
                                        _cb(this);
                                    }else{
                                        _then( _uri[_readCnt] );
                                    }
                                }
                            };
                            
                        // most browsers-----------------
                        }else{
                            _tagScript.onload  = function(){ 
                                _readCnt++;
                                if(_readCnt == _cnt){
                                    _cb(this);
                                }else{
                                    _then( _uri[_readCnt] );
                                }
                            };
                            _tagScript.onerror = function(){
                                console.error('[GL warn]: Load vue plugin js' + arg);
                                _readCnt++;	
                                if(_readCnt == _cnt){
                                    _cb(this);
                                }else{
                                    _then( _uri[_readCnt] );
                                }
                            };
                        }
                        document.getElementsByTagName('head')[0].appendChild(_tagScript);
                    }
                };
                _then( _uri[_readCnt] );
                
            }
            ,_setFrameLayoutOption : function( name ){
                if( name == 'header' ){
                    if( parseInt(GL.CONFIG.frame.layout[name].height,10) ){
                        document.querySelector('.GL-pageLayout-header-wrapper').style.height = GL.CONFIG.frame.layout[name].height + 'px';
                        document.querySelector('.GL-pageLayout-content-wrapper').style.top = GL.CONFIG.frame.layout[name].height + 'px';
                    }
                }
            }
            ,_recombinationCompObject : function( obj ){
                
                var _obj = obj;
                var _tempVal = null;

                for( var prop in _obj ){
                    if( prop == 'computed' ){
                        for( var prop2 in _obj[prop] ){
                            if( prop2 == 'mapState' ){
                                _tempVal = GL.Vuex.mapState(_obj[prop][prop2]);
                                delete _obj[prop][prop2]; 
                                _obj[prop] = GL.extend(true, _obj[prop], _tempVal );
                            }
                        }
                    }else if( prop == 'methods' ){
                        for( var prop2 in _obj[prop] ){
                            if( prop2 == 'mapMutations' ){
                                _tempVal = GL.Vuex.mapMutations(_obj[prop][prop2]);
                                delete _obj[prop][prop2]; 
                                _obj[prop] = GL.extend(true, _obj[prop], _tempVal );
                            }else if( prop2 == 'mapActions' ){
                                _tempVal = GL.Vuex.mapActions(_obj[prop][prop2]);
                                delete _obj[prop][prop2]; 
                                _obj[prop] = GL.extend(true, _obj[prop], _tempVal );
                            }
                        }
                    }
                }

                return _obj;
            }
            ,_babelTransform : function( sJs ){

                var _o = Babel.transform( sJs, {presets : ["es2015"], plugins: [
                    "transform-object-rest-spread"
                ]});

                window.exports = {};    // exports error로 인한 객체 추가.

                return _o.code;
            }
            ,_require : function( s ){
                s = GL.CONFIG.rootUrl + s.replace(/^[\/|.]+/g, '');
                var extension = s.substring(s.lastIndexOf('.'), s.length).replace('.','');
                var xhrObj = new XMLHttpRequest();
                xhrObj.open('GET', s, false);
                xhrObj.send(null);
                return eval( GL.__internal__._babelTransform(xhrObj.responseText ) );
            }

        };
        // internal variable, function(END)=====================================
        // =====================================================================

        return _GL;
    })( !!jQuery?jQuery:false );
    
    window.GL = GL;

})( jQuery, window );




 





