<template>
	<view>
		<button @click="open">打开弹窗</button>
		<uni-popup ref="popup" type="dialog" mode="input" title="请输入姓名">
			{{openid}}
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
		uniPopup
	} from '@dcloudio/uni-ui'
	export default {
		components: {
			uniPopup
		},
		data() {
			return {

			}
		},
		computed: {
			...mapGetters(['openid'])
		},
		methods: {
			open() {
				this.$refs.popup.open()
			}
		}
	}
</script>

<style>
</style>
