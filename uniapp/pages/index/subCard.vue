<template>
  <view class="card_main">
    <view class="card_top" :style="'background-image: url('+url+')'">
       <view>{{title}}</view> 
    </view>
    <view class="card_bottom">
        {{text}}
    </view>
  </view>
</template>

<script>
export default {
  props:{
      url:{
          type:String,
          default:'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg' 
      },
      title:{
          type:String,
          required: true
      },
      text:{
          type:String
      }
  }
};
</script>

<style>
    .card_main{
        position: relative;
        height:350rpx;
        border-radius: 18rpx;
        border: 1rpx solid #ccc;
        margin-top: 10rpx;
        margin-bottom: 30rpx;
        margin-left: 4rpx;
        margin-right: 4rpx;
        box-shadow: 0px 1px 2px #00000033;
    }
    .card_main>.card_top{
        height: 280rpx;
        background-size: cover;
        position: relative;
    }
    .card_main>.card_bottom{
        height: 70rpx;
        font-size: 30rpx;
        line-height: 70rpx;
        padding-left: 14rpx;
        color: #666
    }
    .card_top>view{
        padding-left: 14rpx;
        height: 60rpx;
        width: 100%;
        position: absolute;
        bottom: 0;
        background: #575757a6;
        color:#f3f3f3;
        font-size: 30rpx;
        line-height: 60rpx
    }
</style>

