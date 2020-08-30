<template>
<view>
    <van-notify id="van-notify" />
    <van-dialog id="van-dialog" />
    <!--header-->
    <view class="headerinfo" :style="'background-image: url('+bus_img+')'"></view>
    <!--content-->
    <view class="foodList-content">
        <view>
            <van-tabs swipeable color="#f37b1d">
                <van-tab title="菜单">
                    <foodMenu :busid="busid"></foodMenu>
                </van-tab>
                <van-tab title="评价">
                    <evaluate></evaluate>
                </van-tab>
            </van-tabs>
        </view>
    </view>
</view>
</template>

<script>
import Notify from '@vant/weapp/dist/notify/notify';
import foodMenu from "./foodMenu";
import evaluate from "./evaluate";
import {
    mapActions,
    mapState,
    mapGetters
} from "vuex";
export default {
    components: {
        foodMenu,
        evaluate
    },
    computed: {
        ...mapGetters(["device_info"])
    },
    data() {
        return {
            busid: 0,
            bus_img: "",
            TabCur: 0,
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
    background-size: cover;
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
}
</style>
