'use strict';

const Controller = require('egg').Controller;

class FoodController extends Controller {
  async getFoodList() {
    const { ctx, service } = this;
    let { busId } = ctx.request.body
    let data = await service.food.getFoodList(busId)
    ctx.status = 200;
    ctx.body = {
      success:true,
      data
    }
  }
}

module.exports = FoodController;
