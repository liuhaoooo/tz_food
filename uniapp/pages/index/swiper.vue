<template>
<swiper class="card-swiper" :circular="true" :autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3" indicator-active-color="#0081ff">
    <swiper-item v-for="(item,index) in 4" :key="index" :class="cardCur==index?'cur':''">
        <view class="swiper-item">
            <image :src="'https://ossweb-img.qq.com/images/lol/web201310/skin/big3900'+index+ '.jpg'" mode="aspectFill"></image>
            <video :src="'https://ossweb-img.qq.com/images/lol/web201310/skin/big3900'+index+ '.jpg'" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
        </view>
    </swiper-item>
</swiper>
</template>

<script>
export default {
    data() {
        return {
            cardCur: 0,
        }
    },
    methods: {
        cardSwiper(e) {
            this.cardCur = e.detail.current
        },
    },
}
</script>

<style>
</style>
