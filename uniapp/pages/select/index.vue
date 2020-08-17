<template>
  <view>
    <!--header-->
    <view class="headerinfo">
      <img src="../../static/images/tmp.png" alt />
    </view>
    <!--content-->
    <view class="foodList-content">
      <view>
        <wuc-tab
          :tab-list="tabList"
          :tabCur="TabCur"
          @change="tabChange"
          textFlex
          tab-class="text-center text-black bg-white"
          select-class="text-orange"
        ></wuc-tab>
        <swiper :current="TabCur" duration="300" @change="swiperChange"  :style="'height:'+(device_info.windowHeight-180)+'px'">
          <swiper-item>
            <foodMenu></foodMenu>
          </swiper-item>
          <swiper-item>
            <evaluate></evaluate>
          </swiper-item>
        </swiper>
      </view>
    </view>
  </view>
</template>

<script>
import WucTab from "@/components/wuc-tab/wuc-tab.vue";
import foodMenu from "./foodMenu"
import evaluate from "./evaluate"
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  components: {
    WucTab,
    foodMenu,
    evaluate
  },
  computed: {
    ...mapGetters(["device_info"])
  },
  data() {
    return {
      TabCur: 0,
      tabList: [{ name: "菜单" }, { name: "评价" }]
    };
  },
  methods: {
    tabChange(index) {
      this.TabCur = index;
    },
    swiperChange(e) {
      let { current } = e.target;
      this.TabCur = current;
    }
  }
};
</script>

<style>
/**header */
.headerinfo {
  height: 260rpx;
  position: fixed;
  width: 100%;
  top: 0;
}
.headerinfo img {
  width: 100%;
  height: 100%;
}
/**content */
.foodList-content {
  width: 100%;
  position: fixed;
  top: 270rpx;
  bottom: 60rpx;
}
</style>
