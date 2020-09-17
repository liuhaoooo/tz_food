<template>
<view class="bg-gradual-blue">
    <scroll-view scroll-y class="DrawerPage" :class="isShowModal?'show':''">
        <!-- 侧边抽屉（商家选择）-->
        <view class="cu-modal drawer-modal justify-start" :class="modalName?'show':''" @tap="modalName=false">
            <view class="cu-dialog basis-lg" @tap.stop="" :style="[{height:'calc(100vh)'}]">
                <subs />
            </view>
        </view>
        <!-- main -->
        <view class="main">
            <!-- 轮播 -->
            <!-- <swiper class="screen-swiper" :circular="true" :autoplay="true" interval="5000" duration="500">
                <swiper-item v-for="(item,index) in 4" :key="index">
                    <image :src="'https://ossweb-img.qq.com/images/lol/web201310/skin/big3900'+index+ '.jpg'" mode="aspectFill"></image>
                </swiper-item>
            </swiper> -->
            <view class="headerinfo"></view>
            <!-- map -->
            <tzmap @getData="getData" />
            <!-- 展示 -->
            <tzfood :foodList="foodList" />
        </view>
        <!--浮动按钮-->
        <drag-button :isDock="true" :existTabBar="true">
            <view class="button-content">
                <view>
                    <text class="cuIcon-cart"></text>
                    <view class='cu-tag badge'>已选</view>
                </view>
                <view @click="showfriendModal">
                    <text class="cuIcon-friend"></text>
                </view>
                <view @click="showModal1">
                    <text class="cuIcon-shop"></text>
                </view>
            </view>
        </drag-button>
    </scroll-view>
    <view class="DrawerClose" :class="isShowModal?'show':''" @tap="hideModal">
        <text class="cuIcon-pullright"></text>
    </view>
    <!-- 其他人 -->
    <scroll-view scroll-y class="DrawerWindow" :class="isShowModal?'show':''">
        <view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg">
            <other ref="other" />
        </view>
    </scroll-view>
</view>
</template>

<script>
import {
    mapActions,
    mapState,
    mapGetters
} from "vuex";
import other from "./components/Other"
import subs from "./components/Sub"
import tzmap from "./components/Map"
import tzfood from "./components/Food"
import dragButton from "./components/FloatButton"
export default {
    components: {
        other,
        subs,
        tzmap,
        tzfood,
        dragButton
    },
    data() {
        return {
            isShowModal: false, //其他人
            modalName: false, //选商家
            mainCur: 0,
            foodList: ['']
        };
    },
    onLoad() {

    },
    methods: {
        ...mapActions([
            "get_openid",
            "set_user",
            "get_foodlist",
        ]),
        showfriendModal() {
            this.isShowModal = true
            this.$refs.other.loop = true
            this.$refs.other.getData()
        },
        hideModal() {
            this.isShowModal = false
            this.$refs.other.loop = false
        },
        showModal1() {
            this.modalName = true
        },
        getData() {
            this.get_foodlist({
                busid: 2
            }).then(res => {
                this.foodList = res
            })
        }
    },
}
</script>

<style>
@import "./css/index.css";

.button-content {
    display: flex;
    flex-direction: column;
    width: 120rpx;
    background: rgba(88, 88, 88, 0.418);
    border-radius: 20rpx
}

.button-content>view {
    width: 100%;
    height: 100rpx;
    font-size: 50rpx;
    line-height: 100rpx;
    background: #ffffff00;
    color: #ffffff;
    border: none;
    outline: none;
    text-align: center;
}

.headerinfo {
    background: #ffffff;
    z-index: 2;
    height: 380rpx;
    width: 100%;
    background-image: url("../../static/images/heardinfo.png");
    background-size: cover;
}
</style>
