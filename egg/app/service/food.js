'use strict';

const Service = require('egg').Service;

class FoodService extends Service {
  async getFoodList(busId) {
    const { app } = this;
    let data = await app.mysql.select('food_list', { bus_id: busId })
    return data;
  }
}

module.exports = FoodService;