<template>
<view class="numberJpan" :style="wc" v-if="flag">
    <view class="myshuru" :style="obj" @tap.stop="flag=true">
        <view class="shuruTitle">
            请输入验证码
        </view>
        <view class="center-x">
            <view class="srk" :style="'width:'+(100/6)+'%'" v-for="i in 6" :id="(i-1)==xz?'numberJpanActive':''" :key="i">
                {{arr[i.toString()]==undefined?'':arr[i.toString()]}}
            </view>
        </view>
    </view>
    <view class="jpan" :style="tsfY">
        <view class="main">
            <view v-for="i in 9" @tap="numshuzi(i+1)" :key="i">{{i+1}}</view>
            <view></view>
            <view @tap="numshuzi(0)">0</view>
            <view @tap="del">
                <text class="cuIcon-close"></text>
            </view>
        </view>
    </view>
</view>
</template>

<script>
export default {
    data() {
        return {
            wc: "background-color:rgba(0, 0, 0, .0)",
            obj: "opacity: 0;top: 50%",
            flag: false,
            clear1: "",
            clear2: "",
            arr: [],
            xz: 0,
            tsfY: 'transform: translateY(100%)',
            showNum: false
        };
    },
    methods: {
        del() {
            if (this.xz > 0) {
                let arr1 = this.arr
                arr1[this.xz - 1] = ""
                this.arr = arr1
                this.xz--;
            }
            uni.vibrateShort();
        },
        numshuzi(num) {
            if (this.arr.length <= 6) {
                let arr1 = this.arr
                arr1[this.xz] = num
                this.arr = arr1
                uni.vibrateShort();
                this.xz++
                if (this.xz == 6) {
                    let str = ""
                    for (let item of this.arr) {
                        str += item
                    }
                    this.$emit('closeChange', str)
                }
            }
        },
        open() {
            this.flag = true;
            this.arr = [];
            this.xz = 0;
            this.clear1 = setTimeout(() => {
                this.wc = "background-color:rgba(0, 0, 0, .5)";
                this.obj = "opacity: 1;top: 40%";
                this.tsfY = 'transform: translateY(0%)'
            }, 100)
        },
        close() {
            this.arr = []
            this.wc = "background-color:rgba(0, 0, 0, .5)"
            this.obj = "opacity: 0;top: 50%"
            this.clear2 = setTimeout(() => {
                this.flag = false
            }, 1000)
            this.tsfY = {
                'transform': 'translateY(100%)'
            }
        },
        xuanze(i) {
            this.xz = i
            uni.vibrateShort();
        }
    }
}
</script>

<style lang="scss">
#numberJpanActive {
    background-color: #2c9dfe;
    color: #FFFFFF;
}

.jpan {
    width: 100vw;
    height: 30vh;
    background-color: #FFFFFF;
    position: absolute;
    bottom: 0;
    transform: translateY(100%);
    transition: all .5s;

    .nav {
        text-align: center;
        line-height: 50upx;
        box-sizing: border-box;
        border-bottom: 1px solid #EEEEEE;
    }

    .main {
        width: 100%;
        height: calc(30vh - 50upx);

        view {
            box-sizing: border-box;
            float: left;
            width: 33.33%;
            height: 25%;
            font-size: 40upx;
            text-align: center;
            line-height: 7.5vh;
            border: 1px solid #f4f4f4;
        }

        view:active {
            background-color: #EEEEEE;
        }
    }
}

.numberJpan {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0);
    transition: all .5s;
    z-index: 999;

    .myshuru {
        transition: all .5s;
        position: absolute;
        width: 70vw;
        height: 350upx;
        top: 50%;
        opacity: 0;
        transform: translate(-50%, -50%);
        background-color: #FFFFFF;
        left: 50%;
        color: #000000;
        border-radius: 20upx;
        overflow: hidden;

        .shuruTitle {
            margin: 100upx auto;
            font-weight: 900;
            text-align: center;
            font-size: 30upx;
        }

        .center-x {
            width: 90%;
            height: 80upx;
            border: 1px solid #EEEEEE;
            border-radius: 20upx;
            position: absolute;
            overflow: hidden;
            left: 50%;
            transform: translateX(-50%);
            bottom: 50upx;

            .srk {
                height: 100%;
                line-height: 80upx;
                text-align: center;
                float: left;
                box-sizing: border-box;
                border-left: 1px solid #EEEEEE;
                transition: all .4s;
            }

            .srk:nth-child(1) {
                border-left: 0px;
                border-radius: 20upx 0 0 20upx;
            }
        }

    }
}

.gb {
    position: absolute;
    font-size: 50upx;
    top: 0;
    color: #AAAAAA;
    left: 30upx;
    transition: all .5s;
}
</style>
