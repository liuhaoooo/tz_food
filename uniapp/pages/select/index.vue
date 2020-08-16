<template>
  <view>
    <!--popup-->
    <uni-popup ref="dialogInput" type="dialog" maskClick="false">
      <uni-popup-dialog mode="input" title="输入姓名" placeholder="请输入姓名" @confirm="setUser"></uni-popup-dialog>
    </uni-popup>
    <!--header-->
    <view class="headerinfo">
      <img src="../../static/images/tmp.png" alt />
    </view>
    <!--content-->
    <view class="foodList-content">
      <view>
        <wuc-tab
          :tab-list="tabList"
          :tabCur="TabCur"
          @change="tabChange"
          textFlex
          tab-class="text-center text-black bg-white"
          select-class="text-orange"
        ></wuc-tab>
        <swiper :current="TabCur" duration="300" @change="swiperChange" style="height:69vh">
          <swiper-item>
            <view>
              <view style="display:flex;height:50vh">
                <view class="content_left;width: 100%;"></view>
                <view class="content_right"></view>
              </view>
              <!--footer-->
              <view class="footer">
                <view>已选：</view>
                <button
                  open-type="getUserInfo"
                  type="primary"
                  @getuserinfo="bindGetUserInfo"
                  class="submit_button"
                >提交</button>
              </view>
            </view>
          </swiper-item>
          <swiper-item>
            <view>
              暂无评价
            </view>
          </swiper-item>
        </swiper>
      </view>
    </view>
  </view>
</template>

<script>
import uniGoodsNav from "@/components/uni-goods-nav/uni-goods-nav.vue";
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import uniPopupMessage from "@/components/uni-popup/uni-popup-message.vue";
import uniPopupDialog from "@/components/uni-popup/uni-popup-dialog.vue";
import uniGrid from "@/components/uni-grid/uni-grid.vue";
import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue";
import WucTab from "@/components/wuc-tab/wuc-tab.vue";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  components: {
    uniGoodsNav,
    uniPopup,
    uniPopupMessage,
    uniPopupDialog,
    uniGrid,
    uniGridItem,
    WucTab
  },
  data() {
    return {
      userName: "",
      foodList: [],
      current: 0,
      food_id: "1",
      avatarUrl: "",
      TabCur: 0,
      tabList: [{ name: "菜单" }, { name: "评价" }]
    };
  },
  computed: {
    ...mapGetters(["openid", "hasUser"])
  },
  onLoad() {
    this.getFoodlist();
    this.get_openid().then(() => {
      if (this.hasUser.is_select == 1) {
        //判断用户是否已选菜
        uni.reLaunch({
          url: "/pages/selectList/index"
        });
      }
    });
  },
  methods: {
    ...mapActions(["set_user", "get_openid", "get_foodlist", "select_food"]),
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
    //获取菜单
    getFoodlist() {
      uni.showLoading({
        title: ""
      });
      let data = {
        busId: "1"
      };
      this.get_foodlist(data).then(res => {
        this.foodList = res;
        uni.hideLoading();
      });
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
    setUser(done, val) {
      uni.showLoading({
        title: "设置中"
      });
      this.userName = val;
      if (!val) {
        uni.showToast({
          title: "姓名不能为空",
          icon: "none",
          duration: 1000
        });
        return;
      }
      let data = {
        userName: val,
        openid: this.openid,
        avatarUrl: this.avatarUrl
      };
      this.set_user(data).then(res => {
        uni.hideLoading();
        this.submit();
        done();
      });
    },
    //点击提交按钮（做判断）
    click_submit() {
      if (!this.hasUser) {
        this.$refs.dialogInput.open();
        return;
      } else {
        this.submit();
      }
    },
    //提交数据
    submit() {
      uni.showLoading({
        title: ""
      });
      let data = {
        food_id: this.food_id,
        openid: this.openid
      };
      this.select_food(data).then(res => {
        uni.hideLoading();
        uni.showToast({
          title: "选择成功",
          duration: 1000
        });
        uni.reLaunch({
          url: "/pages/selectList/index"
        });
      });
    },
    tabChange(index) {
      this.TabCur = index;
    },
    swiperChange(e) {
      let { current } = e.target;
      this.TabCur = current;
    }
  }
};
</script>

<style>
/**header */
.headerinfo {
  height: 260rpx;
  position: fixed;
  width: 100%;
  top: 0;
}
.headerinfo img {
  width: 100%;
  height: 100%;
}
/**content */
.foodList-content {
  width: 100%;
  position: absolute;
  top: 270rpx;
  bottom: 120rpx;
}
/**footer */
.footer {
  position: fixed;
  background: #f1f1f18f;
  bottom: 0;
  width: 100%;
  height: 100rpx;
  padding-top: 10rpx;
  padding-bottom: 16rpx;
}
.footer > view {
  width: 55%;
  height: 80rpx;
  line-height: 80rpx;
  position: absolute;
  left: 5%;
}
.submit_button {
  position: absolute;
  width: 30%;
  left: 60%;
  right: 0;
  margin: auto;
  border-radius: 40rpx;
}
/** */
.content_left{
  width: 140rpx;
  height: 100%;
  background: #ff98228f
}
.content_right{
  height: 100%;
  background: #3f4cff8f;
  flex: 1
}
</style>
