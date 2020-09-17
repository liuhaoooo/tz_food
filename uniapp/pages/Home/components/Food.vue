<template>
<scroll-view scroll-x class="bg-white nav">
    <view class="flex text-center">
        <view class="cu-item flex-sub" :class="index==TabCur?'text-orange':''" v-for="(item,index) in 3" :key="index" @tap="tabSelect" :data-id="index">
            商家{{index+1}}
        </view>
    </view>
    <view class="VerticalBox">
        <scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 710upx)" :scroll-into-view="'main-'+mainCur">
            <view v-if="!loading">
                <view class="cu-list menu-avatar" v-show="foodList.length!=0">
                    <view class="cu-item" style="height: 180rpx" v-for="(item,index) in foodList" :key="index">
                        <view class="cu-avatar xl" :style="[{backgroundImage:item.food_image||'url(../../../static/images/default_food.jpg)'}]"></view>
                        <view class="content margin-left">
                            <view class="text-grey">{{item.food_name}}</view>
                        </view>
                    </view>
                </view>
                <xw-empty :isShow="foodList.length==0" text="暂无数据" textColor="#777777" />
            </view>
            <image src="../../../static/images/loading-white.gif" mode="aspectFit" class="gif-white response" style="height:340upx" v-else></image>
        </scroll-view>
    </view>
</scroll-view>
</template>

<script>
import xwEmpty from '@/components/xw-empty/xw-empty';
import {
    mapActions,
    mapState,
    mapGetters
} from "vuex";
export default {
    components: {
        xwEmpty
    },
    data() {
        return {
            TabCur: 0,
            scrollLeft: 0
        }
    },
    computed: {
        ...mapState(['loading'])
    },
    props: {
        foodList: {
            type: Array,
            default: []
        }
    },
    methods: {
        tabSelect(e) {
            this.$store.commit('SET_LOADING', true)
            this.TabCur = e.currentTarget.dataset.id;
            // console.log(this.TabCur)
            this.$emit("select", this.TabCur + 1)
            this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
        },
    },
}
</script>
