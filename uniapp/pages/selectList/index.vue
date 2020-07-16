<template>
	<view>
		<view class="select-foodlist">
			<!-- <list ref="list">
				<cell v-for="num in lists" :key="item.id">
					<text>{{num}}</text>
				</cell>
			</list> -->
		</view>
	</view>
</template>
<script>
	import {
		mapActions,
		mapState,
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {
				select_foodlist: []
			}
		},
		onLoad() {
			uni.showLoading({
				title: ''
			})
			this.get_select_food().then(res => {
				this.select_foodlist = res
				uni.hideLoading()
				console.log(res)
			})
		},
		methods: {
			...mapActions(['get_select_food']),
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
