<script>
import { mapActions } from "vuex";
export default {
  onLoad() {
	  this.get_device_info()
  },
  methods: {
	  ...mapActions(["get_device_info"])
  },
  onHide() {}
};
</script>

<style>
</style>
