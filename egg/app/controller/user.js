'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    /**
     * 获取openid
     * { appid, secret, code }
     */
    async getopenid() {
        const { ctx } = this;
        const { appid, secret, code } = ctx.request.body;
        if (!code) {
            ctx.status = 404
            ctx.body = { success: false }
            return
        }
        let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`
        let openid = await this.service.user.getopenid(url)
        let hasUser = await this.service.user.hasUser(openid)
        ctx.status = 200;
        ctx.body = {
            openid,
            hasUser,
            success: true
        }
    }
    /**
     * 设置用户
     * { userName, openid }
     */
    async setUser() {
        const { ctx, service } = this;
        let { userName, openid } = ctx.request.body
        let json = { userName, openid }
        let isok = await service.user.setUser(json)
        if (isok) {
            ctx.status = 200;
            ctx.body = { success: true }
        } else {
            ctx.body = { success: false }
        }
    }
}

module.exports = UserController;
