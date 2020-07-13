'use strict';

const Controller = require('egg').Controller;

class FoodController extends Controller {
  /**
   * 获取菜单
   * busId(商家id)
   */
  async getFoodList() {
    const { ctx, service } = this;
    let { busId } = ctx.request.body
    let data = await service.food.getFoodList(busId)
    ctx.status = 200;
    ctx.body = {
      success: true,
      data
    }
  }
  /**
   * 用户选择菜
   * { foodId, openid,text }
   */
  async selectFood() {
    const { ctx, service } = this;
    let { food_id, openid, text } = ctx.request.body
    let json = { openid, text, food_id }
    let isok = await service.food.selectFood(json)
    if (isok) {
      ctx.status = 200;
      ctx.body = { success: true }
    } else {
      ctx.body = { success: false }
    }
  }
  /**
   * 获取用户选择的菜单
   * { openid }
   */
  async getSelectFood() {
    const { ctx, service } = this;
    let { openid } = ctx.request.body
    let data = await service.food.getSelectFood(openid)
    ctx.status = 200;
    ctx.body = { success: true, data }
  }
}

module.exports = FoodController;
