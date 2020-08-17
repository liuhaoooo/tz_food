<template>
  <view>
    <!--popup-->
    <uni-popup ref="dialogInput" type="dialog" maskClick="false">
      <uni-popup-dialog mode="input" title="输入姓名" placeholder="请输入姓名" @confirm="setUser"></uni-popup-dialog>
    </uni-popup>
    <!--content-->
    <view>
      <view style="display:flex;">
        <!-- 左边 -->
        <scroll-view class="content_left" scroll-y="true" :style="'height:'+(device_info.windowHeight-250)+'px'">
          <div>
            <div class="leibie" v-for="(item,index) in 30" :key="index" @tap="tapLeftList(index)">{{item}}</div>
          </div>
        </scroll-view>

        <!-- 右边 -->
        <scroll-view class="content_right" scroll-y="true">
          <div>
            <span class="span">{{index}}</span>
          </div>
        </scroll-view>
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
  </view>
</template>

<script>
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import uniPopupMessage from "@/components/uni-popup/uni-popup-message.vue";
import uniPopupDialog from "@/components/uni-popup/uni-popup-dialog.vue";
import uniGrid from "@/components/uni-grid/uni-grid.vue";
import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue";
import WucTab from "@/components/wuc-tab/wuc-tab.vue";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  components: {
    uniPopup,
    uniPopupMessage,
    uniPopupDialog,
    uniGrid,
    uniGridItem
  },
  data() {
    return {
      userName: "",
      foodList: [],
      current: 0,
      food_id: "1",
      avatarUrl: "",
      index:0
    };
  },
  computed: {
    ...mapGetters(["openid", "hasUser","device_info"])
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
    tapLeftList(index){
      this.index = index
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
    }
  }
};
</script>

<style>
/**footer */
.footer {
  position: fixed;
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
/** 菜单*/
.content_right {
  height: 100vh;
  background: white;
  flex: 1;
}
.content_left {
  width: 20.99999999%;
  background: rgb(255, 255, 255);
}
.leibie {
  text-align: center;
  width: 100%;
  height: 90rpx;
  line-height: 90rpx;
  color: rgb(119, 119, 119);
  background: rgb(255, 255, 255);
  font-size: 30rpx;
}
.span {
  color: rgb(189, 189, 189);
  font-size: 14px;
  margin-left: 28rpx;
}
</style>

