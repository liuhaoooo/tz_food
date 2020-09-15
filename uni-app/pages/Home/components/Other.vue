<template>
<scroll-view class="VerticalMain" scroll-y scroll-with-animation :scroll-into-view="'main-'+mainCur">
    <view class="cu-list menu-avatar">
        <view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in 10" :key="index" @touchend="ListTouchEnd" @touchstart="ListTouchStart" @touchmove="ListTouchMove" :data-target="'move-box-' + index">
            <view class="cu-avatar round lg" :style="[{backgroundImage:'url(https://ossweb-img.qq.com/images/lol/web201310/skin/big2100'+ (index) +'.jpg)'}]"></view>
            <view class="content">
                <view class="text-grey">刘浩</view>
                <view class="text-gray text-sm">
                    <text class="cuIcon-infofill text-red  margin-right-xs"></text> 研发部
                </view>
            </view>
            <view class="action">
                <view class="text-grey text-xs">22:20</view>
                <view class="cu-tag round bg-grey sm">5</view>
            </view>
            <view class="move">
                <view class="bg-grey">置顶</view>
                <view class="bg-red">删除</view>
            </view>
        </view>
    </view>
</scroll-view>
</template>

<script>
import {
    mapActions,
    mapState,
    mapGetters
} from 'vuex';
export default {
    data() {
        return {
            listTouchDirection: false,
            listTouchStart: 0,
            modalName: null,
            mainCur: 0,
            select_foodlist: [],
            loop: false
        };
    },
    computed: {
        ...mapGetters(['openid', 'location'])
    },
    filters: {
        get_date(val) {
            let date = new Date(val)
            return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        }
    },
    mounted() {
        this.select_foodlist = []
    },
    methods: {
        getData() {
            this.get_select_food({
                id: "",
                area: this.location
            }).then(res => {
                console.log(res)
                this.select_foodlist = res
                this.loop && setTimeout(() => {
                    this.getData()
                }, 2000)
            })
        },
        // ListTouch计算方向
        ListTouchMove(e) {
            this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0
        },
        ListTouchStart(e) {
            this.listTouchStart = e.touches[0].pageX
        },
        // ListTouch计算滚动
        ListTouchEnd(e) {
            if (!this.listTouchDirection) {
                this.modalName = e.currentTarget.dataset.target
            } else {
                this.modalName = null
            }
            this.listTouchDirection = null
        },
    },
}
</script>
