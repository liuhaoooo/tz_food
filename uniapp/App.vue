<template>
<view>

</view>
</template>

<script>
import {
    mapActions
} from "vuex";
export default {
    mounted() {
        this.get_openid()
        this.get_device_info()
    },
    methods: {
        ...mapActions(["get_device_info", "get_openid"])
    },
    onHide() {}
};
</script>

<style>
@import "/wxcomponents/vant/dist/common/index.wxss";
</style>
