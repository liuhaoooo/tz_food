'use strict';

const Service = require('egg').Service;

class UserService extends Service {
    //获取openid
    async getopenid(url) {
        const { ctx } = this;
        let result = await ctx.curl(url, { dataType: 'json' });
        console.log(result)
        if (result.status == 200) {
            return result.data.openid;
        } else {
            ctx.status = 500;
            ctx.body = { msg: '获取openid出错' }
            return
        }
    }
    //判断是否已存在
    async hasUser(openid) {
        const { app } = this;
        let user = await app.mysql.get('user', { openid })
        return user != null ? user : false
    }
    //设置用户
    async setUser(json) {
        const { app } = this;
        let data = {
            openid: json.openid,
            user_name: json.userName,
            avatar_url:json.avatarUrl,
            is_select: 0
        }
        const result = await app.mysql.insert('user', data);
        return result.affectedRows === 1
    }
    //设置用户状态(废弃)
    async setUser_select(openid, key) {
        const { app } = this;
        const row = {
            is_select: key
        };
        const options = {
            where: { openid }
        };
        const result = await app.mysql.update('user', row, options);
        return result.affectedRows === 1
    }
}

module.exports = UserService;
