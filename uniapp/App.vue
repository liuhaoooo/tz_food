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
