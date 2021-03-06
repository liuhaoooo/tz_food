'use strict';

const Service = require('egg').Service;

class FoodService extends Service {
  async getFoodList(busId) {
    const { app } = this;
    let data = await app.mysql.select('food_list', { where: { bus_id: busId } })
    return data;
  }
  //选择食物并修改用户点餐状态
  async selectFood(json) {
    const { app, service, ctx } = this;
    let data = {
      openid: json.openid,
      food_id: json.food_id,
      text: json.text,
      time: new Date()
    }
    const result = await app.mysql.beginTransactionScope(async conn => {
      await conn.insert('select_food_list', data);
      await conn.update('user', { is_select: 1 }, { where: { openid: json.openid } });
      return true;
    }, ctx);
    return result
  }
  async getSelectFood(offset = '', openid = '') {
    const { app } = this;
    let where = openid ? `WHERE S.openid =` + app.mysql.escape(openid) : '';
    let limit = offset ? ' LIMIT ' + app.mysql.escape(Number(offset)) + ',15' : '';
    let sql = `SELECT F.food_id,F.food_name,U.user_name,U.is_select,U.avatar_url,S.time,S.id,S.openid
              FROM select_food_list AS S 
              INNER JOIN food_list AS F ON (F.food_id = S.food_id) 
              INNER JOIN user AS U 
              ON (U.openid = S.openid)`+ where + limit;
    let result = await app.mysql.query(sql)
    return result
  }
  async getTotal() {
    const { app } = this;
    let sql = `SELECT food_list.food_name,count(select_food_list.food_id) num 
            FROM select_food_list 
            INNER JOIN food_list ON (select_food_list.food_id = food_list.food_id)
            GROUP BY select_food_list.food_id;`;
    let result = await app.mysql.query(sql)
    return result
  }
  async cancelSelect(openid) {
    const { app, ctx } = this;
    const result = await app.mysql.beginTransactionScope(async conn => {
      await conn.delete('select_food_list', { openid });
      await conn.update('user', { is_select: 0 }, { where: { openid } });
      return true;
    }, ctx);
    return result
  }
}

module.exports = FoodService;