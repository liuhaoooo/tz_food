<template>
  <view>
    <!--header-->
    <view class="headerinfo"></view>
    <!--map-->
    <view class="map">
      <view>
        <uni-icons type="loop" size="20" color="#f37b1d"></uni-icons>
        <view style="flex:1;color:#999;margin-left:10rpx">当前位置：{{addressName}}</view>
        <uni-icons type="forward" size="20" color="#f37b1d" @click="selectLocation"></uni-icons>
      </view>
      <map
        style="width: 100%; height: 200rpx;"
        :latitude="latitude"
        :longitude="longitude"
        :markers="markers"
      ></map>
    </view>
    <!--商家-->
    <view class="foodList-content">
      <scroll-view
        scroll-y="true"
        class="scroll-Y"
        :style="'height:'+(device_info.windowHeight-280)+'px'"
      >
        <view @tap="clickStore" v-for="item in 10" :key="item">
          <subCard
            title="商家名称"
            text="商家描述"
            url="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg"
          ></subCard>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import uniCard from "@/components/uni-card/uni-card.vue";
import amap from "../../sdk/amap-wx.js";
import subCard from "./subCard";
export default {
  components: { uniCard, subCard },
  data() {
    return {
      latitude: 22.794449,
      longitude: 113.546099,
      amapPlugin: null,
      addressName: ""
    };
  },
  mounted() {
    this.amapPlugin = new amap.AMapWX({
      key: "061ee9bee2b44c57c2448216d1a99776"
    });
    this.amapPlugin.getRegeo({
      success: data => {
        this.addressName = data[0].name;
        console.log(this.addressName)
      }
    });
    // uni.getLocation({
    //   type: "gcj02",
    //   success: function(res) {
    //     const latitude = res.latitude;
    //     const longitude = res.longitude;
    //     uni.openLocation({
    //       latitude: latitude,
    //       longitude: longitude,
    //       success: function(res) {
    //         console.log(res);
    //       }
    //     });
    //   }
    // });
    uni.getLocation({
      type: "wgs84",
      success: res => {
        this.longitude = res.longitude;
        this.latitude = res.latitude;
      }
    });
  },
  computed: {
    ...mapGetters(["device_info"]),
    markers() {
      let marker = Object.assign({}, marker, {
        latitude: this.latitude.toFixed(8),
        longitude: this.longitude.toFixed(8),
        width: 30,
        height: 30,
        iconPath: "../../static/images/pos_icon.png"
      });
      let markers = [marker];
      return markers;
    }
  },
  methods: {
    clickStore() {
      uni.navigateTo({
        url: "/pages/select/index"
      });
    },
    selectLocation() {
      uni.chooseLocation({
        success: function(res) {
          console.log("位置名称：" + res.name);
          console.log("详细地址：" + res.address);
          console.log("纬度：" + res.latitude);
          console.log("经度：" + res.longitude);
        }
      });
    }
  }
};
</script>

<style>
/**header */
.headerinfo {
  height: 240rpx;
  position: fixed;
  width: 100%;
  top: 0;
  background-image: url("../../static/images/heardinfo.png");
  background-size: cover;
}
/**map */
.map {
  position: fixed;
  top: 240rpx;
  width: 100%;
  height: 240rpx;
  margin-top: 10rpx;
  margin-bottom: 10rpx;
}
.map > view {
  height: 50rpx;
  display: flex;
  background: #ffffff;
  padding-left: 20rpx;
  padding-right: 20rpx;
}
.map > view > view {
  padding-right: 40rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
/**content */
.foodList-content {
  position: absolute;
  top: 510rpx;
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
