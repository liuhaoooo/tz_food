'use strict';

const Service = require('egg').Service;

class FoodService extends Service {
  async getFoodList(busId) {
    const { app } = this;
    let data = await app.mysql.select('food_list', { where: { bus_id: busId } })
    return data;
  }
  async selectFood(json) {
    const { app, service } = this;
    let data = {
      openid: json.openid,
      food_id: json.food_id,
      text: json.text,
    }
    let result = await app.mysql.insert('select_food_list', data)
    let isok = result.affectedRows === 1 && await service.user.setUser_select(json.openid, 1)
    return isok
  }
  async getSelectFood(openid = '') {
    const { app } = this;
    let where = openid ? `WHERE S.openid =` + app.mysql.escape(openid) : '';
    let sql = `SELECT F.food_id,F.food_name,U.user_name,U.is_select
              FROM select_food_list AS S 
              INNER JOIN food_list AS F ON (F.food_id = S.food_id) 
              INNER JOIN user AS U 
              ON (U.openid = S.openid)`+ where;
    let res = await app.mysql.query(sql)
    return res
  }
}

module.exports = FoodService;