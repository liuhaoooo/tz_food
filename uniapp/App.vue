<script>
	import {
		mapActions
	} from 'vuex';
	export default {
		methods: {
			...mapActions(['get_openid']),
		},
		onLaunch() {
			console.log('Launch')
		},
		onShow() {
			this.get_openid()
			console.log('Show')
		},
		onHide() {
			console.log('Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
