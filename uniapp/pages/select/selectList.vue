<template>
<view>
    <view class="select-foodlist">
        <van-empty description="暂无数据" v-if="select_foodlist.length==0" />
        <list v-else>
            <cell v-for="(item,index) in select_foodlist" :key="index">
                <view class="cell-container">
                    <van-image round :src="item.avatar_url" lazy-load />
                    <text style="width: 20%;">{{item.user_name}}</text>
                    <text style="width: 40%;">{{item.food_name}}</text>
                    <text>{{item.time | get_date}}</text>
                    <van-tag type="primary" v-if="item.openid==openid">我</van-tag>
                </view>
            </cell>
        </list>
    </view>

</view>
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
            select_foodlist: [],
        }
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
        this.getData()
    },
    methods: {
        ...mapActions(['get_select_food', 'cancel_select']),
        getData() {
            this.get_select_food({
                id: "",
                area: this.location
            }).then(res => {
                console.log(res)
                this.select_foodlist = res
            })
        },
    }
}
</script>

<style>
.select-foodlist {}

.cell-container {
    width: 100%;
    background: #FFFFFF;
    height: 3.5rem;
    display: flex;
    line-height: 3.5rem;
    border-bottom: #F1F1F1 solid .001rem;
    font-size: 26rpx
}

.cell-container text {
    margin-left: .4rem;
    margin-right: .4rem;
}

.cell-container image {
    width: 2.8rem;
    height: 2.8rem;
    background-color: #eeeeee;
    margin: .3rem .3rem .3rem 1rem;
}
</style>
