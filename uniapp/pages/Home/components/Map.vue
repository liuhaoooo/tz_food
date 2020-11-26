<template>
<view>
    <view class="cu-modal" :class="showModal?'show':''">
        <view class="cu-dialog">
            <view class="cu-bar bg-white justify-end">
                <view class="content">需要地理位置权限</view>
            </view>
            <view class="cu-bar bg-white">
                <view class="action margin-0 flex-sub  solid-left" @tap="toGetAuth" style="color:#0081ff">前往授权</view>
            </view>
        </view>
    </view>
    <map style="width: 100%; height: 220rpx;" :latitude="latitude" :longitude="longitude" :markers="markers"></map>
</view>
</template>

<script>
import {
    mapActions,
    mapState,
    mapGetters
} from "vuex";
import {
    amapKey
} from "../../../config/config";
import amap from "../../../sdk/amap-wx.js";
import Dialog from "@vant/weapp/dist/dialog/dialog";
export default {
    data() {
        return {
            latitude: 22.794449,
            longitude: 113.546099,
            amapPlugin: null,
            getDataLoading: false,
            showModal: false
        }
    },
    computed: {
        ...mapGetters(["userData", "location"]),
        markers() {
            let marker = Object.assign({}, marker, {
                latitude: this.latitude,
                longitude: this.longitude,
                width: 40,
                height: 40,
                iconPath: this.userData.id != null ?
                    this.userData.avatar_url : "../../../static/images/pos_icon.png",
                callout: this.userData.id != null ? {
                    display: "ALWAYS",
                    content: `${this.userData.department}：${this.userData.user_name}`,
                    color: "#666",
                    fontSize: 16
                } : {}
            });
            return [marker];
        }
    },
    mounted() {
        this.getAuth();
    },
    methods: {
        ...mapActions(["get_buslist", "loading_show"]),
        getAuth() {
            this.loading_show(true)
            uni.authorize({
                scope: "scope.userLocation",
                success: () => {
                    this.refreshLocation();
                    this.showModal = false
                },
                fail: () => {
                    this.showModal = true
                }
            });
        },
        //跳转页面选择权限
        toGetAuth() {
            this.getAuth();
            uni.openSetting({
                success: res => {
                    if (res.authSetting["scope.userLocation"]) {
                        this.showModal = false
                        this.refreshLocation();
                    } else {}
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
                    if (addr) {
                        this.$store.commit('SET_LOCATION', addr)
                        this.get_buslist({
                            area: this.location
                        }).then(res => {
                            res[0].bus_id && this.$emit('getData', res[0].bus_id)
                        });
                    }
                }
            });
        },
    },
}
</script>

<style>
.map {
    position: fixed;
    top: 200rpx;
    z-index: 10
}
</style>
