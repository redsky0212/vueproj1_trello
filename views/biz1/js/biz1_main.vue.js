GL.regComponent({
    data : function (){
        return {
            testData : '뷰js 테스트데이터'
        };
    },
    computed : {
        mapState : ['storeTestData','aaa', 'biz1', 'biz2']
    }
    ,methods : {
        alertTest : function(){
            alert(this.testData);
        }
        ,mapActions : ['ACTION_TEST', 'biz1/getBiz1', 'biz2/getBiz1']
        ,change : function(){
            var a = this['biz1/getBiz1']();
        }
        ,change2 : function(){
            var a = this['biz2/getBiz1']();
        }
    }
});