const appid = "wx555f1a207ea3e072"
const secret = "97a6c883303a59ffb45b8f28da571409"
const interfaces = {
    GET_OPENID:'getopenid',//获取用户openid
	SET_USER:'setUser',//设置用户
	GET_FOODLIST:'getFoodList',//获取菜单
	SELECT_FOOD:'selectFood',
	GET_SELECT_FOOD:'getSelectFood',
}
module.exports = {
	interfaces,
	appid,
	secret
}