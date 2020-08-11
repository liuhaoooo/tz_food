import React from 'react';
import { HashRouter as Router, Link, Route } from 'react-router-dom';
import Foodlist from './Foodlist';
import Administration from './Administration';
import { Layout, Menu } from 'antd';
import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
function Home() {
    return (
        <Router>
            <Layout style={{height:'100vh'}}>
                <Sider breakpoint="lg" collapsedWidth="0" style={{background:'#ffffff'}}>
                    <img src={require("../assets/images/logo.png")} style={{width:200,height:100}}/>
                    <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<UserOutlined/>}><Link to="/">统计</Link></Menu.Item>
                        <Menu.Item key="2" icon={<VideoCameraOutlined/>}><Link to="/administration">管睆</Link></Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Content style={{ margin: '24px 16px 0' }}>
                        <Header style={{ padding: 0,background:'#62bfff'}}/>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            <Route path="/" exact component={Foodlist}></Route>
                            <Route path="/administration" component={Administration}></Route>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    );
}

export default Home