<template>
<view class="cu-dialog" style="height:400rpx">
    <view class="padding-xl" style="color:#333">{{selectedFood.food_name||'你还未点餐'}}</view>
</view>
</template>

<script>
export default {
    props: {
        selectedFood: {
            type: Object,
            default: {}
        }
    }
};
</script>

<style>
</style>
