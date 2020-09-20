<template>
<view class="content">
    <view class="cu-load load-modal" v-if="loadModal">
        <!--<view class="cuIcon-loading2 text-orange"></view>-->
        <!--<image src="https://image.weilanwl.com/gif/loading-1.gif" mode="aspectFit"></image>-->
        <view class="gray-text">验证中...</view>
    </view>
    <!-- <button type="default" @tap="open">弹出</button>-->
    <keyboard @closeChange="closeChange($event)" ref="numberPad" />
</view>
</template>

<script>
import keyboard from "./components/Keyboard";
import {
    mapActions,
    mapState,
    mapGetters
} from "vuex";
export default {
    components: {
        keyboard
    },
    data() {
        return {
            loadProgress: 0,
            loadModal: false,
        };
    },
    onLoad() {
        setTimeout(() => {
            this.$refs.numberPad.open();
        }, 50);
    },
    methods: {
        ...mapActions(["check_code"]),
        open() {
            this.$refs.numberPad.open()
        },
        closeChange(code) {
            this.loadModal = true;
            this.check_code({
                code
            }).then(() => {
                this.loadModal = false;
                this.$refs.numberPad.close()
                uni.reLaunch({
                    url: "/pages/Home/Home"
                });
            }).catch(() => {
                this.loadModal = false;
                uni.showToast({
                    title: "验证码错误",
                    icon: "none",
                    duration: 1000
                });
            })
        },
    }
};
</script>
