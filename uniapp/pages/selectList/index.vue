<template>
	<view>
		123
	</view>
</template>
<script>
	import {
		mapActions,
		mapState,
		mapGetters
	} from 'vuex';
	export default {
		onLoad() {
			this.get_select_food().then(res=>{
				console.log(res)
			})
		},
		methods:{
			...mapActions(['get_select_food']),
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
