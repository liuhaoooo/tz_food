<template>
  <view>
    <!--popup-->
    <uni-popup ref="dialogInput" type="dialog" maskClick="false">
      <uni-popup-dialog mode="input" title="输入姓名" placeholder="请输入姓名" @confirm="setUser"></uni-popup-dialog>
    </uni-popup>
    <uni-popup ref="popupBottom" type="bottom">
      <view class="popup_bottom_content"></view>
    </uni-popup>
    <!--content-->
    <view>
      <view style="display:flex;">
        <!-- 左边 -->
        <scroll-view
          class="content_left"
          scroll-y="true"
          :style="'height:'+(device_info.windowHeight-250)+'px'"
        >
          <view>
            <view
              class="leibie"
              v-for="(item,index) in categoryList"
              :key="index"
              @tap="tapLeftList(index)"
              :style="list_index==index?'background: #f1f1f1;':''"
            >{{item}}</view>
          </view>
        </scroll-view>

        <!-- 右边 -->
        <view class="content_right">
          <view
            v-if="foodList.length==0"
            style="text-align: center;margin-top:100rpx;color:#b1b1b1"
          >暂无数据</view>
          <scroll-view
            scroll-y="true"
            :style="'height:'+(device_info.windowHeight-250)+'px'"
            v-else
          >
            <radio-group @change="radioChange">
              <view class="right_content_list" v-for="(item,index) in foodList" :key="index">
                <img :src="item.food_image||'../../static/images/default_food.png'" alt />
                <view>{{item.food_name}}</view>
                <radio :value="item.food_id" :checked="index === current" />
              </view>
            </radio-group>
          </scroll-view>
        </view>
      </view>
      <!--footer-->
      <view class="footer">
        <view>
          <uni-icons type="shop" size="34" color="#f37b1d" @tap="toHome"></uni-icons>
          <uni-icons type="cart-filled" size="34" color="#f37b1d" @tap="openBottom"></uni-icons>
        </view>
        <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" class="submit_button">提交</button>
      </view>
    </view>
  </view>
</template>

<script>
import uniIcons from "@/components/uni-icons/uni-icons.vue";
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
    uniIcons,
    uniGoodsNav,
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
      list_index: 0,
      current: 0,
      categoryList: ["主菜", "配菜", "饮料"]
    };
  },
  computed: {
    ...mapGetters(["openid", "hasUser", "device_info"])
  },
  mounted() {
    this.getFoodlist();
    if (this.hasUser.is_select == 1) {
      
    }
  },
  methods: {
    ...mapActions(["set_user", "get_openid", "get_foodlist", "select_food"]),
    //回到首页
    toHome() {
      uni.navigateBack({
        delta: 1
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
        uni.showToast({
          title: "需要授权",
          icon: "none",
          duration: 1000
        });
      }
    },
    //获取菜单
    getFoodlist() {
      let data = {
        busId: "1"
      };
      this.get_foodlist(data).then(res => {
        console.log(res);
        this.foodList = res;
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
    tapLeftList(index) {
      this.list_index = index;
    },
    //打开底部弹窗
    openBottom() {
      this.$refs.popupBottom.open();
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
  width: 20.99999999%;
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
  height: 140rpx;
  margin-left: 20rpx;
  margin-right: 20rpx;
  margin-top: 10rpx;
  margin-bottom: 30rpx;
  border-radius: 12rpx;
  background: #ffffff;
}
.right_content_list > img {
  width: 140rpx;
  height: 140rpx;
}
.right_content_list > view {
  flex: 1;
  text-align: center;
  line-height: 140rpx;
}
.right_content_list > radio {
  margin-top: 46rpx;
}
/**底部弹窗 */
.popup_bottom_content {
  height: 400rpx;
  background: #ffffff;
}
/**footer */
.footer {
  position: fixed;
  bottom: 0rpx;
  display: flex;
  width: 100%;
  height: 110rpx;
  padding-top: 10rpx;
  padding-bottom: 30rpx;
  background: #ffffff;
}
.footer > view {
  width: 20%;
  height: 80rpx;
  line-height: 80rpx;
  margin-left: 8rpx;
  margin-right: 8rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.submit_button {
  flex: 1;
  height: 72rpx;
  line-height: 72rpx;
  border-radius: 50rpx;
  margin-left: 20rpx;
  margin-right: 20rpx;
  background: #f37b1d;
  color: #ffffff;
}
</style>

