<template>
<view class="auth_main">
    <view class="auth_input" @tap="KeyboarOpen">
        <password-input :numLng="password" :plaintext="false"></password-input>
    </view>
    <number-keyboard tabBar ref="KeyboarHid" @input="clickInput" psdLength="6"></number-keyboard>
</view>
</template>

<script>
import numberKeyboard from "@/components/number-keyboard/number-keyboard.vue";
import passwordInput from "@/components/password-input/password-input.vue";
import {
    mapActions,
    mapState,
    mapGetters
} from "vuex";
export default {
    components: {
        numberKeyboard,
        passwordInput
    },
    data() {
        return {
            password: ""
        };
    },
    onLoad() {
        setTimeout(() => {
            this.$refs.KeyboarHid.open();
        }, 50);
    },
    methods: {
        ...mapActions(["check_code"]),
        //打开键盘
        KeyboarOpen(e) {
            this.$refs.KeyboarHid.open();
        },
        //输入的值
        clickInput(code) {
            this.password = code;
            if (code.length == 6) {
                this.check_code({
                    code
                }).then(() => {
                    uni.reLaunch({
                        url: "/pages/index/index"
                    });
                }).catch(() => {
                    this.$refs.KeyboarHid.reset();
                })
            }
        }
    }
};
</script>

<style scoped>
.auth_main {
    padding: 0rpx 40rpx;
}

.auth_input {
    padding: 10rpx 0rpx;
    margin-top: 200rpx;
}
</style>
