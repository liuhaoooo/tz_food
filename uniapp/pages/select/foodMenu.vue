<template>
<view>
    <!--popup-->
    <van-dialog use-slot title="首次点餐设置姓名" :show="showDialogInput" show-cancel-button @confirm="setUser" @close="showDialogInput=false">
        <view class="dialogInput">
            <input class="uni-input" maxlength="10" placeholder="请输入用姓名" v-model="userName" />
            <input class="uni-input" maxlength="10" placeholder="请输入所在部门" v-model="department" />
        </view>
    </van-dialog>

    <van-popup :show="showBottomPopup" position="bottom" custom-style="height: 20%;" @close="showBottomPopup=false">
        <van-empty description="你还未选择" v-if="selectedFood==null" />
        <view class="popup_bottom_content" v-else>
            <span>{{selectedFood.food_name}}</span>
        </view>
    </van-popup>

    <van-popup :show="showLeftPopup" position="left" custom-style="width: 90%;height:100%" @close="showLeftPopup=false">
        <selectList />
    </van-popup>
    <!--content-->
    <view>
        <view style="display:flex;">
            <!-- 左边 -->
            <scroll-view class="content_left" scroll-y="true" :style="'height:'+(device_info.windowHeight-180)+'px'">
                <view>
                    <view class="leibie" v-for="(item,index) in categoryList" :key="index" @tap="tapLeftList(index)" :style="list_index==index?'background: #f1f1f1;':''">{{item}}</view>
                </view>
            </scroll-view>

            <!-- 右边 -->
            <view class="content_right">
                <view v-if="getDataLoading" style="text-align: center;margin-top: 300rpx">
                    <van-loading color="#ffffff" size="32rpx"><span style="color:#ffffff">加载中...</span></van-loading>
                </view>
                <view v-else>
                    <van-empty description="暂无数据" v-if="foodList.length==0"><button type="default" size="mini">刷新试试</button></van-empty>
                    <scroll-view scroll-y="true" :style="'height:'+(device_info.windowHeight-180)+'px'" v-else>
                        <radio-group @change="radioChange">
                            <view class="right_content_list" v-for="(item,index) in foodList" :key="index">
                                <img :src="item.food_image||'../../static/images/default_food.png'" alt />
                                <view>
                                    <view class="food_name">{{item.food_name}}</view>
                                </view>
                                <radio :value="item.food_id" :checked="index === current" />
                            </view>
                        </radio-group>
                    </scroll-view>
                </view>
            </view>
        </view>
    </view>
    <!--footer-->
    <van-goods-action :safe-area-inset-bottom="false">
        <van-goods-action-icon icon="shop-o" text="商家" @tap="toHome" />
        <van-goods-action-icon icon="friends-o" text="其他人" @tap="showLeftPopup=true" />
        <van-goods-action-icon icon="cart-o" text="自己" :info="selectedFood==null?'':'已选'" @tap="showBottomPopup=true" />
        <van-goods-action-button text="提交" type="warning" open-type="getUserInfo" @getuserinfo="bindGetUserInfo" v-if="selectedFood==null" :disabled="!food_id" :loading="Loading" />
        <van-goods-action-button text="取消选择" v-else @tap="cancelSelect" />
    </van-goods-action>
</view>
</template>

<script>
import Notify from '@vant/weapp/dist/notify/notify';
import Dialog from '@vant/weapp/dist/dialog/dialog';
import selectList from './selectList'
import {
    mapActions,
    mapState,
    mapGetters
} from "vuex";
export default {
    components: {
        selectList
    },
    data() {
        return {
            showDialogInput: false,
            Loading: false,
            getDataLoading: false,
            showBottomPopup: false,
            showLeftPopup: false,

            userName: "",
            department: "",
            current: 0,
            food_id: "",
            avatarUrl: "",
            list_index: 0,
            current: 0,
            foodList: [],
            selectedFood: {},
            categoryList: ["主菜", "配菜", "饮料"]
        };
    },
    computed: {
        ...mapGetters(["openid", "userData", "device_info", "location"])
    },
    props: {
        busid: {
            type: Number
        }
    },
    mounted() {
        this.getFoodlist();
        this.getSelectFood();
    },
    methods: {
        ...mapActions([
            "get_openid",
            "set_user",
            "select_food",
            "get_foodlist",
            "get_select_food",
            "cancel_select"
        ]),
        //回到首页
        toHome() {
            uni.navigateBack({
                delta: 1
            });
        },
        //取消菜单
        cancelSelect() {
            Dialog.confirm({
                message: '是否要取消点餐',
                asyncClose: true,
                showCancelButton: true
            }).then(() => {
                this.Loading = true
                this.cancel_select({
                    id: this.selectedFood.id
                }).then(res => {
                    this.selectedFood = null;
                    Notify({
                        type: 'warning',
                        message: '取消成功'
                    });
                    Dialog.close();
                    this.Loading = false
                })
            }).catch(() => {
                Dialog.close();
                this.Loading = false
            });;
        },
        //获取菜单
        getFoodlist() {
            this.getDataLoading = true
            this.get_foodlist({
                busid: this.busid
            }).then(res => {
                this.foodList = res;
                if (this.foodList.length > 0) {
                    this.food_id = this.foodList[0].food_id;
                }
                this.getDataLoading = false
            }).catch(() => {
                this.getDataLoading = false
            });
        },
        //获取点餐详情
        getSelectFood() {
            this.get_select_food({
                id: this.openid,
                area: this.location
            }).then(res => {
                this.selectedFood = res;
            });
        },
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
                Notify({
                    type: 'warning',
                    message: '需要授权'
                });
            }
        },
        //选择菜单触发
        radioChange(evt) {
            this.food_id = evt.target.value;
            for (let i in this.foodList) {
                if (this.foodList[i].value === evt.target.value) {
                    this.current = i;
                    break;
                }
            }
        },
        //设置姓名
        setUser() {
            if (!this.userName) {
                Notify({
                    type: 'warning',
                    message: '姓名不能为空'
                });
                return;
            }
            if (!this.department) {
                Notify({
                    type: 'warning',
                    message: '所在部门不能为空'
                });
                return;
            }
            let data = {
                username: this.userName,
                department: this.department,
                openid: this.openid,
                img: this.avatarUrl,
            };
            this.set_user(data).then(res => {
                this.submit();
                Dialog.close()
            });
        },
        //点击提交按钮（做判断）
        click_submit() {
            if (this.userData.id == null) {
                this.showDialogInput = true
                return;
            } else {
                this.submit();
            }
        },
        tapLeftList(index) {
            this.list_index = index;
        },
        //提交数据
        submit() {
            this.Loading = true
            let data = {
                foodid: this.food_id,
                openid: this.openid,
                text: ""
            };
            this.select_food(data).then(res => {
                uni.hideLoading();
                Notify({
                    type: 'success',
                    message: '订餐成功'
                });
                this.Loading = false
                this.get_openid();
                this.getSelectFood();
            }).catch(() => {
                this.Loading = false
                this.get_openid();
            });
        }
    },
    watch: {
        list_index() {
            switch (this.list_index) {
                case 0:
                    this.getFoodlist();
                    break;
                case 1:
                case 2:
                    this.foodList = [];
                    break;
            }
        }
    }
};
</script>

<style>
/** 菜单*/
.content_right {
    background: #f1f1f1;
    flex: 1;
}

.content_left {
    width: 15%;
    background: #ffffff;
}

.leibie {
    text-align: center;
    width: 100%;
    height: 90rpx;
    line-height: 90rpx;
    color: rgb(119, 119, 119);
    background: #ffffff;
    font-size: 30rpx;
}

.span {
    color: rgb(189, 189, 189);
    font-size: 14px;
    margin-left: 28rpx;
}

.right_content_list {
    display: flex;
    height: 170rpx;
    margin-left: 20rpx;
    margin-right: 20rpx;
    margin-top: 10rpx;
    margin-bottom: 30rpx;
    border-radius: 12rpx;
    background: #ffffff;
}

.right_content_list>img {
    width: 170rpx;
    height: 170rpx;
}

.right_content_list>view {
    flex: 1;
}

.food_name {
    margin-top: 30rpx;
    width: 90%;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    text-align: center;

}

.right_content_list>radio {
    margin-top: 46rpx;
}

/**底部弹窗 */
.popup_bottom_content {
    background: #ffffff;
}

/**dialog */
.dialogInput {
    padding-left: 80rpx;
    padding-right: 80rpx;
}

.dialogInput input {
    margin-top: 20rpx;
    margin-bottom: 20rpx
}
</style>
