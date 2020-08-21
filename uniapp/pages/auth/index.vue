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
    //打开键盘
    KeyboarOpen(e) {
      this.$refs.KeyboarHid.open();
    },
    //输入的值
    clickInput(val) {
      this.password = val;
      if (val.length == 6) {
        if (val == "000000") {
          uni.reLaunch({
            url: "/pages/index/index"
          });
        } else {
          uni.showToast({
            title: "验证码错误",
            icon: "none",
            duration: 1000
          });
          this.$refs.KeyboarHid.reset();
        }
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