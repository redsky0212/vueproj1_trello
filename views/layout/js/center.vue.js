// center.vue.js 두번 호출되는 버그가 있음... 확인 해봐야함...

GL.regComponent({
  template : '',
  data : function(){
    return {
      test:'cccccc'
    };
  },
  computed : {
    test1 : function(){ return this.test; }
    ,test2 : function(){ return 'fafafafafa'; }
    ,mapState : ['storeTestData','aaa']
  },
  
  /*
  GL.extend({
      test1 : function(){ return this.test; }
      ,test2 : function(){ return 'fafafafafa'; }
    }
    ,GL.Vuex.mapState(['storeTestData','aaa'])
  ),
  */
  methods : {
    fa : function(){
      this.test = 'test값 변경';
    }
    ,mapMutations : {testFn:'SET_AAA'}
    ,mapActions : ['ACTION_TEST']
  }
  /*
  GL.extend( {
      fa : function(){
        this.test = 'test값 변경';
      }
    }
    ,GL.Vuex.mapMutations(['SET_AAA'])
  )
  */
  
});