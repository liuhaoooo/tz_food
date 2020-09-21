<template>
<view class="bg-gradual-blue">
    <scroll-view scroll-y class="DrawerPage" :class="isShowModal?'show':''">
        <!-- 加载动画 -->
        <view class="cu-load load-modal" v-if="loadModal">
            <view class="gray-text">请求中...</view>
        </view>
        <!-- 侧边抽屉（商家选择）-->
        <view class="cu-modal bottom-modal" :class="showMySelect?'show':''" @tap="showMySelect=false">
            <my-select ref="mySelect" :selectedFood="selectedFood" />
        </view>
        <!-- 设置用户 -->
        <view class="cu-modal" :class="showEnterName?'show':''">
            <view class="cu-dialog" style="margin-bottom: 400rpx;" v-if="showEnterName">
                <view class="bg-img">
                    <view class="cu-form-group">
                        <input placeholder="请输入姓名" v-model="userName" />
                    </view>
                    <view class="cu-form-group">
                        <input placeholder="请输入部门" v-model="department" />
                    </view>
                </view>
                <view class="cu-bar bg-white">
                    <view class="action margin-0 flex-sub  solid-left" @tap="showEnterName=false">取消</view>
                    <view class="action margin-0 flex-sub  solid-left" @tap="setUser">提交</view>
                </view>
            </view>
        </view>
        <!--取消对话框-->
        <view class="cu-modal" :class="cancelModal?'show':''">
            <view class="cu-dialog">
                <view class="cu-bar bg-white justify-end">
                    <view class="content">确定取消吗</view>
                </view>
                <!-- <view class="padding-xl">
                    当前选择：{{selectedFood.food_name}}
                </view> -->
                <view class="cu-bar bg-white">
                    <view class="action margin-0 flex-sub text-green solid-left" @tap="cancelModal=false">取消</view>
                    <view class="action margin-0 flex-sub  solid-left" @tap="cancelSelect">确定</view>
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
            </swiper>-->
            <!--<view class="headerinfo" style="background-image: url('../../static/images/componentBg.png')"></view>-->
            <view class="headerinfo" style="background-image: url('http://liuhaooo.top/tz_food_header/componentBg.png')"></view>
            <!-- map -->
            <tzmap @getData="getData" />
            <!-- 展示 -->
            <tzfood :foodList="foodList" @select="getData" @selectfood="selectfood" />
        </view>
        <!--浮动按钮-->
        <drag-button :isDock="true" :existTabBar="true">
            <view class="button-content">
                <view @click="showMySelect=true">
                    <text class="cuIcon-cart"></text>
                </view>
                <view @click="showfriendModal">
                    <text class="cuIcon-friend"></text>
                </view>
                <view>
                    <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" :disabled="!food_id" class="float-button" v-if="selectedFood==null">点餐</button>
                    <button class="float-button" style="background: #f31d28b9;" @click="cancelModal=true" v-else>取消</button>
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
            cancelModal: false, //取消对话框

            foodList: [''],
            selectedFood: {},

            userName: "",
            department: "",
            food_id: "",
            avatarUrl: "",
        };
    },
    computed: {
        ...mapGetters(["openid", "location", "userData"]),
        ...mapState(['loadModal'])
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
            "cancel_select",
            "loadModal_show"
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
            this.showEnterName = false
            this.loadModal_show(true)
            let data = {
                username: this.userName,
                department: this.department,
                openid: this.openid,
                img: this.avatarUrl
            };
            this.set_user(data).then(res => {
                this.submit();
            });
        },
        //提交数据
        submit() {
            this.loadModal_show(true)
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
                    this.getSelectedFood();
                })
                .catch(() => {
                    this.get_openid();
                });
        },
        /**
         * 取消菜单
         */
        cancelSelect() {
            this.cancelModal = false
            this.loadModal_show(true)
            this.cancel_select({
                    id: this.selectedFood.id
                })
                .then(res => {
                    this.selectedFood = null;
                    uni.showToast({
                        title: "取消成功",
                        icon: "none",
                        duration: 1000
                    });
                })
                .catch(() => {});
        },
    },
}
</script>

<style>
@import "./css/index.css";

.button-content {
    display: flex;
    flex-direction: column;
    width: 120rpx;
    border-radius: 16rpx;
}

.button-content>view {
    width: 100%;
    height: 100rpx;
    font-size: 50rpx;
    line-height: 100rpx;
    background: #f57919b9;
    color: #ffffff;
    border: none;
    outline: none;
    text-align: center;
    margin-bottom: 5rpx;
    margin-top: 5rpx;
}

.float-button {
    width: 100%;
    height: 100rpx;
    line-height: 100rpx;
    font-size: 32rpx;
    background: #f57919b9;
    color: #ffffff;
    border: 0;
    outline: none;
    text-align: center
}

.float-button[disabled] {
    color: #ffffff !important;
    background: #fca665a1 !important;
    border: 0 !important;
    outline: none !important;
    text-align: center !important;
}

.headerinfo {
    background: #ffffff;
    height: 380rpx;
    width: 100%;
    background-size: cover;
}
</style>
