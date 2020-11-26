<script>
import {
    mapActions
} from "vuex";
export default {
    mounted() {
        this.get_openid()
        this.get_device_info()
    },
    methods: {
        ...mapActions(["get_device_info", "get_openid"])
    },
    onLaunch() {
        if (uni.canIUse('getUpdateManager')) {
            const updateManager = uni.getUpdateManager()
            updateManager.onCheckForUpdate((res) => {
                if (res.hasUpdate) {
                    updateManager.onUpdateReady(() => {
                        uni.showModal({
                            title: '更新提示',
                            content: '新版本已经准备好，是否重启应用？',
                            success: (res) => {
                                if (res.confirm) {
                                    updateManager.applyUpdate()
                                }
                            }
                        })
                    })
                    updateManager.onUpdateFailed(() => {
                        uni.showModal({
                            title: '已经有新版本了~',
                            content: '新版本已经上线~，请您删除当前小程序，重新搜索打开'
                        })
                    })
                }
            })
        }
    },
};
</script>

<style>
@import "colorui/main.css";
@import "colorui/icon.css";

::-webkit-scrollbar {
    width: 0;
    height: 0;
    background-color: transparent;
}
</style>
