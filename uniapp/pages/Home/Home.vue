<template>
<view class="bg-gradual-blue">
    <scroll-view scroll-y class="DrawerPage" :class="isShowModal?'show':''">
        <!-- 侧边抽屉（商家选择）-->
        <view class="cu-modal bottom-modal" :class="showMySelect?'show':''" @tap="showMySelect=false">
            <my-select ref="mySelect" :selectedFood="selectedFood" />
        </view>
        <!-- 输入名字部门 -->
        <view class="cu-modal" :class="showEnterName?'show':''">
            <view class="cu-dialog">
                <view class="bg-img" style="height:200px;">
                    <view class="cu-form-group margin-top margin-buttom">
                        <view class="title">姓名</view>
                        <input placeholder="请输入姓名" v-model="userName" />
                    </view>
                    <view class="cu-form-group margin-top margin-buttom">
                        <view class="title">部门</view>
                        <input placeholder="请输入部门" v-model="department" />
                    </view>
                </view>
                <view class="cu-bar bg-white">
                    <view class="action margin-0 flex-sub  solid-left" @tap="showEnterName=false">我知道了</view>
                </view>
            </view>
        </view>
        <!-- main -->
        <view class="main">
            <!-- banner -->
            <!-- <swiper class="screen-swiper" :circular="true" :autoplay="true" interval="5000" duration="500">
                <swiper-item v-for="(item,index) in 4" :key="index">
                    <image :src="'https://ossweb-img.qq.com/images/lol/web201310/skin/big3900'+index+ '.jpg'" mode="aspectFill"></image>
                </swiper-item>
            </swiper> -->
            <view class="headerinfo" style="background-image: url('../../static/images/componentBg.png')"></view>
            <!-- map -->
            <tzmap @getData="getData" />

            <!-- 展示 -->
            <tzfood :foodList="foodList" @select="getData" @selectfood="selectfood" />
        </view>
        <!--浮动按钮-->
        <drag-button :isDock="true" :existTabBar="true">
            <view class="button-content">
                <view @click="showModal">
                    <text class="cuIcon-cart"></text>
                </view>
                <view @click="showfriendModal">
                    <text class="cuIcon-friend"></text>
                </view>
                <view>
                    <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" :disabled="!food_id" class="cu-btn">点餐</button>
                </view>
            </view>
        </drag-button>
    </scroll-view>
    <view class="DrawerClose" :class="isShowModal?'show':''" @tap="hideModal">
        <text class="cuIcon-pullright"></text>
    </view>
    <!-- 其他人 -->
    <scroll-view scroll-y class="DrawerWindow" :class="isShowModal?'show':''">
        <view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg">
            <other ref="other" />
        </view>
    </scroll-view>
</view>
</template>

<script>
import {
    mapActions,
    mapState,
    mapGetters
} from "vuex";
import other from "./components/Other"
import subs from "./components/Sub"
import tzmap from "./components/Map"
import tzfood from "./components/Food"
import dragButton from "./components/FloatButton"
import mySelect from "./components/MySelect"
export default {
    components: {
        other,
        subs,
        tzmap,
        tzfood,
        dragButton,
        mySelect
    },
    data() {
        return {
            isShowModal: false, //其他人
            showMySelect: false, //自己
            showEnterName: false, //输姓名
            mainCur: 0,
            foodList: [''],
            selectedFood: {},

            userName: "",
            department: "",
            food_id: "",
            avatarUrl: "",
        };
    },
    computed: {
        ...mapGetters(["openid", "location", "userData", "subInfo"])
    },
    onLoad() {
        this.getSelectedFood()
    },
    methods: {
        ...mapActions([
            "get_openid",
            "set_user",
            "get_foodlist",
            "get_select_food",
            "select_food",
            "cancel_select"
        ]),
        showfriendModal() {
            this.isShowModal = true
            this.$refs.other.loop = true
            this.$refs.other.getData()
        },
        hideModal() {
            this.isShowModal = false
            this.$refs.other.loop = false
        },
        showModal() {
            this.showMySelect = true
        },
        selectfood(id) {
            this.food_id = id
        },
        getData(busid = 1) {
            this.get_foodlist({
                busid
            }).then(res => {
                this.foodList = res
            })
        },
        getSelectedFood() {
            this.get_select_food({
                id: this.openid,
                area: this.location
            }).then(res => {
                this.selectedFood = res;
            });
        },
        /*
         *点餐部分
         */
        //获取权限
        bindGetUserInfo(e) {
            if (e.target.errMsg === "getUserInfo:ok") {
                const _this = this;
                uni.getUserInfo({
                    provider: "weixin",
                    success: res => {
                        _this.avatarUrl = res.userInfo.avatarUrl;
                        this.click_submit();
                    }
                });
            } else {
                uni.showToast({
                    title: "需要授权",
                    icon: "none",
                    duration: 1000
                });
            }
        },
        //点击提交按钮（做判断）
        click_submit() {
            this.showEnterName = true;
            return
            if (this.userData.id == null) { //如果未注册
                this.showEnterName = true;
                return;
            } else {
                this.submit();
            }
        },
        //设置姓名
        setUser() {
            if (!this.userName) {
                uni.showToast({
                    title: "姓名不能为空",
                    icon: "none",
                    duration: 1000
                });
                return;
            }
            if (!this.department) {
                uni.showToast({
                    title: "所在部门不能为空",
                    icon: "none",
                    duration: 1000
                });
                return;
            }
            let data = {
                username: this.userName,
                department: this.department,
                openid: this.openid,
                img: this.avatarUrl
            };
            this.set_user(data).then(res => {
                this.submit();
                Dialog.close();
            });
        },
        //提交数据
        submit() {
            this.Loading = true;
            let data = {
                foodid: this.food_id,
                openid: this.openid,
                text: ""
            };
            this.select_food(data)
                .then(res => {
                    uni.showToast({
                        title: "订餐成功",
                        icon: "none",
                        duration: 1000
                    });
                    this.get_openid();
                    this.getSelectFood();
                })
                .catch(() => {
                    this.get_openid();
                });
        }
    },
}
</script>

<style>
@import "./css/index.css";

.button-content {
    display: flex;
    flex-direction: column;
    width: 120rpx;
    /* background: rgba(88, 88, 88, 0.418); */
    border-radius: 20rpx
}

.button-content>view {
    width: 100%;
    height: 100rpx;
    font-size: 50rpx;
    line-height: 100rpx;
    background: rgb(243, 123, 29);
    color: #ffffff;
    border: none;
    outline: none;
    text-align: center;
    margin-bottom: 10rpx;
    margin-top: 10rpx;
}

.button-content>view>button {
    width: 100%;
    height: 100rpx;
    font-size: 32rpx;
    background: #ffffff00;
    color: #ffffff;
    border: 0;
    outline: none;
}

.headerinfo {
    background: #ffffff;
    height: 380rpx;
    width: 100%;
    background-size: cover;
}
</style>
