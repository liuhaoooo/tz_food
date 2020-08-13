import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'antd/lib/style/themes/default.less';
import 'antd/dist/antd.less'; // 引入官方提供的 less 样式入口文件
import './assets/theme/theme.less'; // 用于覆盖上面定义的变量

ReactDOM.render(<App />,document.getElementById('root'));
