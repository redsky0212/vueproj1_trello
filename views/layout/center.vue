<template>
    <div class="map_wrap">
				
        <div class="location_wrap">
            <a href="#none" class="btn_location">위치설정</a>
            <span class="btn_loc">
                <a href="#none" class="btn_loc01">
                    <span>서울특별시</span>
                </a>
                <a href="#none" class="btn_loc02"><!-- disabled 클래스 추가 시 클릭안됨 -->
                    <span>선택</span>
                </a>
                <a href="#none" class="btn_loc03"><!-- disabled 클래스 추가 시 클릭안됨 -->
                    <span>선택</span>
                </a>
            </span>
            <a href="#none" class="btn_bm">북마크</a>
            <a href="#none" class="btn_scrap">책갈피</a><span style="display:inline-block;"><h2>storeTestData : {{storeTestData}}</h2></span>
            <button style="display:inline-block;" v-on:click="ACTION_TEST('잘돼나?')">mutation test</button>
            <button style="display:inline-block;" v-on:click="testFn('이거는....')"> test</button><label>{{test}}</label>
            <!-- 180906 : 5. 지도영역 추가버튼 이동
                <a href="#none" class="btn_quad">우편번호 경계 표시</a> -->

            <!--180906 : 3.검색위치 이동 및 수정
            <div class="search_area_wrap">
                <input type="text" placeholder="지역명/매장명으로 검색">
                <a href="#none" class="btn_search">검색</a>
            </div>
                -->
<Navbar />
            <div class="layer_location">

                <div class="sel_location sel01">
                    <ul>
                        <li><a href="#none">서울특별시</a></li>
                        <li><a href="#none">강원도</a></li>
                        <li><a href="#none">경상남도</a></li>
                        <li><a href="#none">경상북도</a></li>
                        <li><a href="#none">전라남도</a></li>
                        <li><a href="#none">전라북도</a></li>
                        <li><a href="#none">충청남도</a></li>
                        <li><a href="#none">충청북도</a></li>
                        <li><a href="#none">서울특별시</a></li>
                        <li><a href="#none">서울특별시</a></li>
                        <li><a href="#none">서울특별시</a></li>
                    </ul>
                </div>
                <div class="sel_location sel02">
                    <ul>
                        <li><a href="#none">강남구</a></li>
                        <li><a href="#none">강북구</a></li>
                        <li><a href="#none">서초구</a></li>
                        <li><a href="#none">성동구</a></li>
                        <li><a href="#none">광진구</a></li>
                        <li><a href="#none">동대문구</a></li>
                        <li><a href="#none">은평구</a></li>
                        <li><a href="#none">노원구</a></li>
                        <li><a href="#none">구로구</a></li>
                        <li><a href="#none">중구</a></li>
                        <li><a href="#none">강남구</a></li>
                        <li><a href="#none">강남구</a></li>
                        <li><a href="#none">강남구</a></li>
                        <li><a href="#none">강남구</a></li>
                    </ul>
                </div>
                <div class="sel_location sel03">
                    <ul>
                        <li><a href="#none">소곡동</a></li>
                        <li><a href="#none">자양동</a></li>
                        <li><a href="#none">마장동</a></li>
                        <li><a href="#none">황학동</a></li>
                        <li><a href="#none">미아동</a></li>
                        <li><a href="#none">정릉동</a></li>
                        <li><a href="#none">가산동</a></li>
                        <li><a href="#none">청담동</a></li>
                        <li><a href="#none">압구정동</a></li>
                        <li><a href="#none">신당동</a></li>
                        <li><a href="#none">소곡동</a></li>
                        <li><a href="#none">소곡동</a></li>
                        <li><a href="#none">소곡동</a></li>
                        <li><a href="#none">소곡동</a></li>
                    </ul>
                </div>

            </div>




            <div class="layer_bookmark">
                <ul>
                    <li><a href="#none">서울특별시 강남구 강일동</a></li>
                    <li><a href="#none">서울특별시 강남구 강일동</a></li>
                    <li><a href="#none">서울특별시 강남구 강일동</a></li>
                    <li><a href="#none">서울특별시 강남구 강일동</a></li>
                    <li><a href="#none">서울특별시 강남구 강일동</a></li>
                    <li><a href="#none">서울특별시 강남구 강일동</a></li>
                    <li><a href="#none">서울특별시 강남구 강일동</a></li>
                    <li><a href="#none">서울특별시 강남구 강일동</a></li>
                    <li><a href="#none">서울특별시 강남구 강일동</a></li>
                    <li><a href="#none">서울특별시 강남구 강일동</a></li>
                    <li><a href="#none">서울특별시 강남구 강일동</a></li>
                    <li><a href="#none">서울특별시 강남구 강일동</a></li>
                    <li><a href="#none">서울특별시 강남구 강일동</a></li>
                    <li><a href="#none">서울특별시 강남구 강일동</a></li>
                </ul>
            </div>


        </div>
        <!-- 180906 : 5.지도영역버튼 추가 및 구조변경 -->
        <div class="map_btn_area">
            <div class="map_zoom_control">
                <a href="#none" class="btn_map_zoomin"><span>+</span></a>
                <a href="#none" class="btn_map_zoomout"><span>-</span></a>
            </div>

            <div class="map_cate">
                <a href="#none" class="btn_map_cate on"><span></span>대리점</a>
                <a href="#none" class="btn_map_cate"><span></span>판매점</a>
                <a href="#none" class="btn_map_cate"><span></span>타사</a>
            </div>
            
            <div class="map_tools">
                <a href="#none" class="btn_map_tools"></a>
                <a href="#none" class="btn_map_tools"></a>
                <a href="#none" class="btn_map_tools"></a>
                <a href="#none" class="btn_map_tools"></a>
                <a href="#none" class="btn_map_tools"></a>
            </div>
            <!-- //180906 : 5.지도영역버튼 추가 -->
        </div>


    </div>
</template>

<script>
import Vue from 'vue';
import {mapState, mapMutations, mapActions} from 'vuex';
import Navbar from 'views/biz1/Navbar.vue';


export default {
  data : function(){
    return {
      test:'cccccc'
    };
  },
  components: { Navbar },
  computed : {
    test1(){ return this.test; }
    ,test2(){ return 'fafafafafa'; }
    ,...mapState(['storeTestData','aaa'])
  },
  methods : {
    fa : function(){
      this.test = 'test값 변경';
    }
    ,...mapMutations({testFn:'SET_AAA'})
    ,...mapActions(['ACTION_TEST'])
  }

}
</script>

<style>

</style>
