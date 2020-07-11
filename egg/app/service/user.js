'use strict';

const Service = require('egg').Service;

class UserService extends Service {
    //获取openid
    async getopenid(url) {
        const { ctx } = this;
        let result = await ctx.curl(url, { dataType: 'json' });
        if (result.status == 200) {
            return result.data.openid;
        } else {
            ctx.status = 500;
            ctx.body = { msg: '获取openid出错' }
            return
        }
    }
    //判断是否已存在
    async hasUser(openid){
        const { app } = this;
        let user = await app.mysql.get('user', { openid })
        return user != null
    }
    //设置用户
    async setUser(json) {
        const { app } = this;
        const result = await app.mysql.insert('user', json);
        return result.affectedRows === 1
    }
}

module.exports = UserService;
