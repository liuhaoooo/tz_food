<template>
  <view>
    <uni-popup ref="popup" type="dialog" maskClick="false">
      <uni-popup-dialog mode="base" title="需要地理位置授权才能获取商家" @confirm="toGetAuth"></uni-popup-dialog>
    </uni-popup>
    <!--header-->
    <view class="headerinfo"></view>
    <!--map-->
    <view class="map">
      <view>
        <uni-icons type="loop" size="20" color="#f37b1d" @tap="refreshLocation"></uni-icons>
        <view style="flex:1;color:#999;margin-left:10rpx"  @tap="selectLocation">当前位置：{{addressName}}</view>
        <uni-icons type="forward" size="20" color="#f37b1d" @tap="selectLocation"></uni-icons>
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
      <list>
        <view @tap="clickStore" v-for="item in 10" :key="item">
          <subCard title="商家名称" text="商家描述" url="../../static/images/tmp_sub.jpg"></subCard>
        </view>
      </list>
    </view>
  </view>
</template>

<script>
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import uniPopupMessage from "@/components/uni-popup/uni-popup-message.vue";
import uniPopupDialog from "@/components/uni-popup/uni-popup-dialog.vue";
import { mapActions, mapState, mapGetters } from "vuex";
import uniCard from "@/components/uni-card/uni-card.vue";
import amap from "../../sdk/amap-wx.js";
import subCard from "./subCard";
import { amapKey } from "../../config/config";
export default {
  components: {
    uniCard,
    subCard,
    uniPopup,
    uniPopupMessage,
    uniPopupDialog
  },
  data() {
    return {
      latitude: 22.794449,
      longitude: 113.546099,
      amapPlugin: null,
      addressName: ""
    };
  },
  onShow(){
    this.get_openid()
  },
  mounted() {
    this.getAuth();
  },
  computed: {
    ...mapGetters(["device_info","hasUser"]),
    markers() {
      let marker = Object.assign({}, marker, {
        latitude: this.latitude,
        longitude: this.longitude,
        width: 30,
        height: 30,
        iconPath: this.hasUser?this.hasUser.avatar_url:"../../static/images/pos_icon.png",
        callout:this.hasUser?{display:"ALWAYS",content:this.hasUser.user_name,color:"#666",fontSize:16}:{}
      });
      let markers = [marker];
      return markers;
    }
  },
  methods: {
    ...mapActions(["get_openid"]),
    toGetAuth() {
      this.getAuth();
      uni.openSetting({
        success: res => {
          if (res.authSetting["scope.userLocation"]) {
            this.$refs.popup.close();
            this.refreshLocation();
          } else {
          }
        }
      });
    },
    getAuth() {
      uni.authorize({
        scope: "scope.userLocation",
        success: () => {
          this.refreshLocation();
        },
        fail: () => {
          this.$refs.popup.open();
        }
      });
    },
    refreshLocation() {
      uni.getLocation({
        type: "wgs84",
        success: res => {
          this.longitude = res.longitude;
          this.latitude = res.latitude;
        }
      });
      this.amapPlugin = new amap.AMapWX({
        key: amapKey
      });
      this.amapPlugin.getRegeo({
        success: data => {
          this.addressName = data[0].name;
          console.log(data[0].regeocodeData.addressComponent.city);
        }
      });
    },
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
  background: #ffffff;
  z-index: 2;
  height: 240rpx;
  position: fixed;
  width: 100%;
  top: 0;
  background-image: url("../../static/images/heardinfo.png");
  background-size: cover;
}
/**map */
.map {
  z-index: 2;
  background: #ffffff;
  position: fixed;
  top: 240rpx;
  width: 100%;
  height: 260rpx;
  padding-bottom: 10rpx;
  padding-top: 10rpx;
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
  z-index: 1;
  position: absolute;
  top: 510rpx;
  width: 100%;
}
/* .list-item {
  height: 140rpx;
  margin-bottom: 20rpx;
  margin-top: 20rpx;
  background: #dfdfdf7c;
}
.list-item img {
  height: 140rpx;
  width: 160rpx;
  border-radius: 10rpx;
} */
</style>
