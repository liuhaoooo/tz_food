<template>
<view class="content">
    <button type="default" @tap="open">弹出</button>
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
            password: ""
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
            this.$refs.numberPad.open() //打开数字输入框
        },
        closeChange(code) {
            this.check_code({
                code
            }).then(() => {
                this.$refs.numberPad
                uni.reLaunch({
                    url: "/pages/Home/Home"
                });
            }).catch(() => {

            })
        },
    }
};
</script>
