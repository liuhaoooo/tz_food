'use strict';

const Service = require('egg').Service;

class UserService extends Service {
    async getopenid(url) {//获取openid
        const { ctx } = this;
        let result = await ctx.curl(url, { dataType: 'json' });
        if (result.status == 200) {
            return result.data;
        } else {
            ctx.status = 500;
            ctx.body = { msg: '获取openid出错' }
            return
        }
    }
    async setUser() {

    }
}

module.exports = UserService;
