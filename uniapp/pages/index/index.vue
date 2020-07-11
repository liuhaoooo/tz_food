<template>
	<view>
		<button class="button" type="primary" @click="confirmDialog"><text class="button-text">输入对话框</text></button>
		<uni-popup ref="dialogInput" type="dialog" @change="change">
			<uni-popup-dialog mode="input" title="输入内容" value="对话框预置提示内容!" placeholder="请输入内容" @confirm="dialogInputConfirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState,
		mapGetters
	} from 'vuex';
	import {
		uniPopup,
		uniPopupDialog
	} from '@dcloudio/uni-ui'
	export default {
		components: {
			uniPopup,
			// uniPopupDialog
		},
		data() {
			return {
				input:""
			}
		},
		computed: {
			...mapGetters(['openid', 'hasUser'])
		},
		methods: {
			change(e) {
				console.log('popup ' + e.type + ' 状态', e.show)
			},
			dialogInputConfirm(done, val) {
				uni.showLoading({
					title: '3秒后会关闭'
				})
				console.log(val);
				this.value = val
				setTimeout(() => {
					uni.hideLoading()
					// 关闭窗口后，恢复默认内容
					done()
				}, 3000)
			},
			confirmDialog() {
				this.$refs.dialogInput.open()
			},
		}
	}
</script>

<style>
</style>
