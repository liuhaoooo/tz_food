<template>
<view>
    <van-dialog id="van-dialog" />
    <!--header-->
    <view class="headerinfo"></view>
    <!--map-->
    <view class="map">
        <view>
            <uni-icons type="loop" size="20" color="#f37b1d" @tap="refreshLocation"></uni-icons>
            <view style="flex:1;color:#999;margin-left:10rpx" @tap="selectLocation">当前位置：{{addressName}}</view>
            <uni-icons type="forward" size="20" color="#f37b1d" @tap="selectLocation"></uni-icons>
        </view>
        <map style="width: 100%; height: 240rpx;" :latitude="latitude" :longitude="longitude" :markers="markers"></map>
    </view>

    <!--商家-->
    <skeleton banner :row="0" animate :loading="false" style="margin-top:24rpx;">
        <view class="foodList-content">
            <view v-if="getDataLoading" class="loading-page">
                <van-loading color="#333" size="80rpx">加载中...</van-loading>
            </view>
            <view v-else>
                <list v-if="busData.length>0">
                    <view @tap="clickStore(item.bus_id,item.bus_image)" v-for="item in busData" :key="item.bus_id">
                        <subCard :title="item.bus_name" :text="item.bus_name" :url="item.bus_image||'../../static/images/tmp_sub.jpg'"></subCard>
                    </view>
                </list>
                <van-empty description="暂无数据" v-else><button type="default" size="mini">刷新试试</button></van-empty>
            </view>

        </view>
    </skeleton>

</view>
</template>

<script>
import Dialog from '@vant/weapp/dist/dialog/dialog';
import {
    mapActions,
    mapState,
    mapGetters
} from "vuex";
import amap from "../../sdk/amap-wx.js";
import subCard from "./subCard";
import {
    amapKey
} from "../../config/config";
export default {
    components: {
        subCard
    },
    data() {
        return {
            getDataLoading: false,
            latitude: 22.794449,
            longitude: 113.546099,
            amapPlugin: null,
            addressName: "",
            busData: {},
        };
    },
    onShow() {
        this.get_openid();
    },
    mounted() {
        this.getAuth();
    },
    computed: {
        ...mapGetters(["device_info", "userData", "location"]),
        markers() {
            let marker = Object.assign({}, marker, {
                latitude: this.latitude,
                longitude: this.longitude,
                width: 40,
                height: 40,
                iconPath: this.userData.id != null ?
                    this.userData.avatar_url : "../../static/images/pos_icon.png",
                callout: this.userData.id != null ? {
                    display: "ALWAYS",
                    content: this.userData.user_name,
                    color: "#666",
                    fontSize: 18
                } : {}
            });
            return [marker];
        }
    },
    methods: {
        ...mapActions(["get_openid", "get_buslist"]),
        //跳转页面选择权限
        toGetAuth() {
            this.getAuth();
            uni.openSetting({
                success: res => {
                    if (res.authSetting["scope.userLocation"]) {
                        Dialog.close()
                        this.refreshLocation();
                    } else {}
                }
            });
        },
        getAuth() {
            this.getDataLoading = true
            uni.authorize({
                scope: "scope.userLocation",
                success: () => {
                    this.refreshLocation();
                    Dialog.close()
                },
                fail: () => {
                    this.getDataLoading = false
                    Dialog.alert({
                        message: '需要地理位置授权才能获取商家'
                    }).then(() => {
                        this.toGetAuth()
                    })
                }
            });
        },
        //刷新位置
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
                    let addr = data[0].regeocodeData.addressComponent.city;
                    addr && this.$store.commit('SET_LOCATION', addr)
                    addr &&
                        this.get_buslist({
                            area: this.location
                        }).then(res => {
                            this.busData = res;
                            this.getDataLoading = false
                        });
                }
            });
        },
        //点击商家
        clickStore(id, image) {
            uni.navigateTo({
                url: `/pages/select/index?id=${id}&image=${image}`
            });
        },
        selectLocation() {
            uni.chooseLocation({
                success: res => {
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
    top: 280rpx;
    width: 100%;
    height: 300rpx;
    padding-bottom: 10rpx;
    padding-top: 10rpx;
}

.map>view {
    height: 50rpx;
    display: flex;
    background: #ffffff;
    padding-left: 20rpx;
    padding-right: 20rpx;
}

.map>view>view {
    padding-right: 40rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/**content */
.foodList-content {
    z-index: 1;
    position: absolute;
    top: 600rpx;
    width: 100%;
}

.loading-page {
    text-align: center;
    margin-top: 250rpx
}
</style>
