<template>
<view>
    <van-notify id="van-notify" />
    <van-dialog id="van-dialog" />
    <!--header-->
    <!-- <view class="headerinfo" :style="'background-image: url('+bus_img+')'"></view> -->
    <!--content-->
    <view class="bg-gradual-blue">
        <scroll-view scroll-y class="DrawerPage" :class="isShowModal?'show':''">
            <view class='text-center'>
                <swiper class="screen-swiper" :circular="true" :autoplay="true" interval="5000" duration="500">
                    <swiper-item v-for="(item,index) in 4" :key="index">
                        <image :src="'https://ossweb-img.qq.com/images/lol/web201310/skin/big3900'+index+ '.jpg'" mode="aspectFill"></image>
                    </swiper-item>
                </swiper>
                <foodMenu @clickOther="showModal"></foodMenu>
            </view>
        </scroll-view>
        <view class="DrawerClose" :class="isShowModal?'show':''" @tap="hideModal">
            <text class="cuIcon-pullright"></text>
        </view>
        <scroll-view scroll-y class="DrawerWindow" :class="isShowModal?'show':''">
            <view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg">
                <selectList ref="selectList" />
            </view>
        </scroll-view>
    </view>
</view>
</template>

<script>
import navBar from "@/components/zhouWei-navBar";
import Notify from '@vant/weapp/dist/notify/notify';
import foodMenu from "./foodMenu";
import evaluate from "./evaluate";
import mixin from "./mixin"
import selectList from "./selectList";
import {
    mapActions,
    mapState,
    mapGetters
} from "vuex";
export default {
    mixins: [mixin],
    components: {
        foodMenu,
        evaluate,
        navBar,
        selectList
    },
    computed: {
        ...mapGetters(["device_info"])
    },
    data() {
        return {
            busid: 0,
            bus_img: "",
            TabCur: 0,
            isShowModal: null,
        };
    },
    onLoad: function (option) {
        this.busid = option.id
        this.bus_img = option.image
    },
    methods: {
        ...mapActions(["set_user", "get_foodlist", "select_food"]),
        swiperChange(e) {
            let {
                current
            } = e.target;
            this.TabCur = current;
        },
        showModal() {
            this.$refs.selectList.getData();
            this.$refs.selectList.loop = true;
            this.isShowModal = true
        },
        hideModal() {
            this.$refs.selectList.loop = false;
            this.isShowModal = false
        },
    }
};
</script>

<style>
@import "./css/index.css";

/**header */
.headerinfo {
    height: 380rpx;
    position: fixed;
    width: 100%;
    top: 0;
    background-size: cover;
}

/**content */
.foodList-content {
    width: 100%;
    position: fixed;
    top: 380rpx;
}
</style>
