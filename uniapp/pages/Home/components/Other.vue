<template>
<scroll-view class="VerticalMain" scroll-y scroll-with-animation :scroll-into-view="'main-'+mainCur">
    <xw-empty :isShow="true" text="暂无数据" textColor="#777777" v-if="select_foodlist.length==0" />
    <view class="cu-list menu-avatar" v-else>
        <view class="cu-item" v-for="(item,index) in select_foodlist" :key="index">
            <view class="cu-avatar round lg" :style="[{ backgroundImage:'url(' + item.avatar_url + ')' }]"></view>
            <view class="content" style="width:calc(100% - 200upx)">
                <view class="text-grey">{{item.user_name}}
                    <view class="cu-tag radius sm bg-green" v-if="item.openid==openid">我</view>
                </view>
                <view class="text-gray text-sm ">
                    <text class="cuIcon-cart text-green margin-right-xs"></text>{{item.food_name}}
                </view>
            </view>
        </view>
    </view>
</scroll-view>
</template>

<script>
import xwEmpty from '@/components/xw-empty/xw-empty';
import {
    mapActions,
    mapState,
    mapGetters
} from 'vuex';
export default {
    components: {
        xwEmpty
    },
    data() {
        return {
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
        ...mapActions(["get_select_food"]),
        getData() {
            this.get_select_food({
                id: "",
                area: this.location
            }).then(res => {
                this.select_foodlist = res
                this.loop && setTimeout(() => {
                    this.getData()
                }, 3000)
            })
        },

    },
}
</script>
