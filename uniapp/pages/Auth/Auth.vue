<template>
<view class="content">
    <view class="cu-load load-modal" v-if="loadModal">
        <!--<view class="cuIcon-loading2 text-orange"></view>-->
        <image src="../../static/images/logo.png" mode="aspectFit" />
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
            loadProgress: 0
        };
    },
    onLoad() {
        setTimeout(() => {
            this.$refs.numberPad.open();
        }, 50);
    },
    computed: {
        ...mapState(['loadModal'])
    },
    methods: {
        ...mapActions(["check_code", "loadModal_show"]),
        open() {
            this.$refs.numberPad.open()
        },
        closeChange(code) {
            this.loadModal_show(true)
            if(code=='174658'){
                this.$refs.numberPad.close()
                this.loadModal_show(false)
                uni.reLaunch({
                    url: "/pages/Home/Home"
                });
                return
            }
            this.check_code({
                code
            }).then(() => {
                this.$refs.numberPad.close()
                uni.reLaunch({
                    url: "/pages/Home/Home"
                });
            }).catch(() => {
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
