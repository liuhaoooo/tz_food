<template>
  <scroll-view scroll-x class="bg-white nav">
    <view class="flex text-center" v-show="subInfo.length>1">
      <view
        class="cu-item flex-sub"
        :class="index==TabCur?'text-orange':''"
        v-for="(item,index) in subInfo"
        :key="index"
        @tap="tabSelect(item,index)"
        :data-id="index"
      >{{item.bus_name}}</view>
    </view>
    <view class="VerticalBox">
      <scroll-view
        class="VerticalMain"
        :class="subInfo.length>1?'VerticalMain-b':'VerticalMain-a'"
        scroll-y
        scroll-with-animation
        :scroll-into-view="'main-'+mainCur"
      >
        <view v-if="!loading">
          <view class="cu-list menu-avatar" v-show="foodList.length!=0">
            <radio-group @change="RadioChange" style="width: 100%">
              <radio
                class="my-flex my-margin"
                :checked="radio==index"
                :value="item.food_id"
                v-for="(item,index) in foodList"
                :key="index"
                :disabled="disabled"
              >
                <view style="height: 180rpx" class="my-flex">
                  <view
                    v-if="imgNameArr[index]!=undefined"
                    class="cu-avatar xl margin-left"
                    :style="'background-image:url(https://tzeat.cwmpd.com:8443/img/default_food_'+imgNameArr[index]+'.png)'"
                  ></view>
                  <view class="content margin-left">
                    <view class="text-grey">{{item.food_name}}</view>
                  </view>
                </view>
              </radio>
            </radio-group>
          </view>
          <xw-empty :isShow="foodList.length==0" text="暂无数据" textColor="#777777" />
        </view>
        <image
          src="../../../static/images/loading-white.gif"
          mode="aspectFit"
          class="gif-white response"
          style="height:340upx"
          v-else
        />
      </scroll-view>
    </view>
  </scroll-view>
</template>

<script>
import xwEmpty from "@/components/xw-empty/xw-empty";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  components: {
    xwEmpty
  },
  data() {
    return {
      TabCur: 0
    };
  },
  computed: {
    ...mapState(["loading"]),
    ...mapGetters(["subInfo"]),
    imgNameArr() {
      let newArr = [];
      for (let i in this.foodList) {
        this.foodList[i] && newArr.push(Math.floor(Math.random() * 7));
      }
      return newArr;
    }
  },
  props: {
    foodList: {
      type: Array,
      default: []
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapActions(["loading_show"]),
    tabSelect(item, index) {
      this.loading_show(true);
      this.TabCur = index;
      this.$emit("select", item.bus_id);
    },
    RadioChange(e) {
      this.$emit("selectfood", e.detail.value);
    }
  }
};
</script>

<style>
.my-flex {
  display: flex;
  align-items: center;
}

.my-margin {
  margin-bottom: 20rpx;
  margin-left: 16rpx;
  margin-right: 16rpx;
}
.VerticalMain-a {
  height: calc(100vh - 600upx) !important;
}
.VerticalMain-b {
  height: calc(100vh - 700upx) !important;
}
</style>
