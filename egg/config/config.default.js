/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1594192861258_715';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  //修改端口号
  config.cluster = {
    listen: {
      path: '',
      port: 8848,
      hostname: '127.0.0.1',
    }
  };
  //MySQL
  config.mysql = {
    client: {
      host: '101.37.25.179',
      port: '3306',
      user: 'tz_food',
      password: '123456',
      database: 'tz_food',
    },
    app: true,
    agent: false,
  };

  //关闭csrf
  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: [""]
  };
  return {
    ...config,
    ...userConfig,
  };
};
