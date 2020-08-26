const appid = "wx555f1a207ea3e072"
const amapKey = "061ee9bee2b44c57c2448216d1a99776"
const secret = "97a6c883303a59ffb45b8f28da571409"
// const baseURL = 'http://liuhaooo.top:6003/api/'
// const baseURL = 'http://test.wifi.gztozed.com:8081/api'
const baseURL = 'https://tzeat.cwmpd.com:8443/api/'
// const baseURL = 'http://127.0.0.1:8848/api/'
const interfaces = {
    // GET_OPENID:'getopenid',//获取用户openid
	// SET_USER:'setUser',//设置用户
	// GET_FOODLIST:'getFoodList',//获取菜单
	// SELECT_FOOD:'selectFood',
	// GET_SELECT_FOOD:'getSelectFood',
	// CANCEL_SELECT:'cancelSelect',
	GET_OPENID:'getopenid',//获取用户openid
	SET_USER:'saveuser',//设置用户
	GET_BUS:'getbuslist',//商家列表查询
	GET_FOODLIST:'getfoodlist',//获取菜单
	SELECT_FOOD:'order',//点餐
	GET_SELECT_FOOD:'getorderlist',//获取已选菜单
	CANCEL_SELECT:'cancel',//取消点餐
}
module.exports = {
	interfaces,
	appid,
	secret,
	baseURL,
	amapKey
}