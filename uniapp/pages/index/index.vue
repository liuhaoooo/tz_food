<template>
  <view>
    <view class="headerinfo">
      <img src="../../static/images/heardinfo.png" alt />
    </view>

    <view class="map"></view>

    <view class="foodList-content">
      <scroll-view scroll-y="true" class="scroll-Y" :style="'height:'+(device_info.windowHeight-290)+'px'">
        <view @tap="clickStore" v-for="item in 10" :key="item">
          <uni-card
          title="商家名称"
          mode="style"
          :is-shadow="true"
          thumbnail="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg"
          extra="商家描述"
          note="点击进店"
        ></uni-card>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import uniCard from "@/components/uni-card/uni-card.vue";
export default {
  components: { uniCard },
  data() {
    return {};
  },
  onLoad() {
    this.get_device_info()
  },
  computed: {
    ...mapGetters(["device_info"])
  },
  methods: {
    ...mapActions(["get_device_info"]),
    clickStore() {
      uni.navigateTo({
        url: "/pages/select/index"
      });
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
/**map */
.map {
  position: fixed;
  top: 260rpx;
  width: 100%;
  height: 180rpx;
  margin-top: 10rpx;
  margin-bottom: 10rpx;
  background: #c2fceb7c;
}
/**content */
.foodList-content {
  position: absolute;
  top: 500rpx;
  width: 100%;
}
.list-item {
  height: 140rpx;
  margin-bottom: 20rpx;
  margin-top: 20rpx;
  background: #dfdfdf7c;
}
.list-item img {
  height: 140rpx;
  width: 160rpx;
  border-radius: 10rpx;
}
</style>
