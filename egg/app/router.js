'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/api/getopenid', controller.user.getopenid);//??openid
  router.post('/api/setUser', controller.user.setUser);//????
  router.post('/api/getFoodList', controller.food.getFoodList);//获取菜单
};
