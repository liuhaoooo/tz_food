'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    async getopenid() {//获取openid
        const { ctx } = this;
        const { appid, secret, code } = ctx.request.body;
        if (!code) {
            ctx.status = 404
            ctx.body = { msg: 'code为空' }
            return
        }
        let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`
        let result = await this.service.user.getopenid(url)
        ctx.status = 200;
        ctx.body = result
    }
    async setUser() {

    }
}

module.exports = UserController;
