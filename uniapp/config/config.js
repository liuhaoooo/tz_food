const appid = "wx555f1a207ea3e072"
const amapKey = "061ee9bee2b44c57c2448216d1a99776"
const secret = "97a6c883303a59ffb45b8f28da571409"
const baseURL = 'http://liuhaooo.top:6003/api/'
// const baseURL = 'http://127.0.0.1:8848/api/'
const interfaces = {
    GET_OPENID:'getopenid',//获取用户openid
	SET_USER:'setUser',//设置用户
	GET_FOODLIST:'getFoodList',//获取菜单
	SELECT_FOOD:'selectFood',
	GET_SELECT_FOOD:'getSelectFood',
	CANCEL_SELECT:'cancelSelect'
}
module.exports = {
	interfaces,
	appid,
	secret,
	baseURL,
	amapKey
}