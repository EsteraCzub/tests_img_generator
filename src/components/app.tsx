import {h} from 'preact';
import {useState} from 'preact/hooks';

import {ConfigProvider, Layout, Menu, theme, Typography, Row, Col, Button, Switch, Drawer} from "antd";

import {BrowserRouter, Link, Route, Router, Routes} from "react-router-dom";

import {UserOutlined, MenuOutlined, IdcardOutlined, FunctionOutlined} from '@ant-design/icons';
import Profile from "../routes/profile";
import Text2Image from "../routes/text2image";
import History from "../routes/history";
import LoginBox from "./login_box";

const {Header, Content, Footer, Sider} = Layout;
const {defaultAlgorithm, darkAlgorithm} = theme;

const {Title} = Typography;

const App = () => {

    const [layoutTheme, setLayoutTheme] = useState('dark');
    const [collapsed, setCollapsed] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState("1");
    const handleThemeChange = (checked) => {
        setLayoutTheme(checked ? 'dark' : 'light');
    };

    const handleMenuCollapse = (collapsed) => {
        setCollapsed(collapsed);
    };
    const handleDrawerClose = () => {
        setDrawerVisible(false);
    };

    const handleDrawerOpen = () => {
        setDrawerVisible(true);
    };

    const handleMenuItemClick = (e) => {
        setSelectedMenuItem(e.key);
        handleDrawerClose();
    };

    const menu = (
        <Menu mode="inline" selectedKeys={selectedMenuItem} onClick={handleMenuItemClick}>
            <Menu.Item data-testid="menu1" key="1">
                <Link to="/text2image">
                    Text 2 Image
                </Link>
            </Menu.Item>
            <Menu.Item data-testid="menu2" key="3">
                <Link to="/profile">
                    Profile
                </Link>
            </Menu.Item>
        </Menu>
    );

    const leftMenu = selectedMenuItem === "1" ? (
        <Menu mode="inline">
            <Menu.Item data-testid="leftmenu1" key="1" icon={<UserOutlined />}>
                <Link to="/text2image">
                    Text 2 Image
                </Link>
            </Menu.Item>
            <Menu.Item data-testid="leftmenu2" key="2" icon={<UserOutlined />}>
                <Link to="/history">
                    History
                </Link>
            </Menu.Item>
        </Menu>
    ) : selectedMenuItem === "2" ? (
        <Menu mode="inline">
            <Menu.Item key="1" icon={<UserOutlined />}>
                <Link to="/profile">
                    Profile
                </Link>
            </Menu.Item>
        </Menu>
    ) : (
        <Menu mode="inline">
            <Menu.Item key="1" icon={<UserOutlined />}>
                <Link to="/" />
            </Menu.Item>
        </Menu>
    );

    return (
        <div id="app" className={layoutTheme === 'dark' ? "theme-dark" : "theme-light"}>
            <ConfigProvider

                theme={{
                    algorithm: layoutTheme === 'dark' ? darkAlgorithm : defaultAlgorithm,
                }}>

                <BrowserRouter>

                    <Layout className="app-container">
                        <Header className="app-header">
                            <Row justify="space-between">
                                <Col span="4">
                                    <Button data-testid="selectmenu" onClick={handleDrawerOpen}>
                                        <MenuOutlined /> Select Module
                                    </Button>
                                </Col>
                                <Col className="logo">
                                    <FunctionOutlined />
                                </Col>
                                <Col span="6">
                                    <LoginBox />
                                </Col>
                            </Row>
                        </Header>
                        <Content>
                            <Layout>
                                <Sider
                                    breakpoint="sm"
                                    collapsedWidth={0}
                                    onCollapse={handleMenuCollapse}
                                    collapsible
                                    collapsed={collapsed}
                                    className="left-menu"
                                >
                                    {leftMenu}
                                </Sider>
                                <Layout>
                                    <Content>
                                        <div className="content">
                                            <Routes>
                                                <Route path="/text2image" element={<Text2Image />} />
                                                <Route path="/profile" element={<Profile user="me" />} />
                                                <Route path="/history" element={<History />} />
                                            </Routes>
                                        </div>
                                    </Content>
                                </Layout>
                            </Layout>
                        </Content>
                        <Footer>
                            <Row justify="end" align="middle">
                                <Col>
                                    <Switch data-testid="switch" checked={layoutTheme === 'dark'} onChange={handleThemeChange} />
                                </Col>
                            </Row>
                        </Footer>
                    </Layout>

                    <Drawer
                        title="Pixel playground"
                        placement="left"
                        closable={true}
                        onClose={handleDrawerClose}
                        visible={drawerVisible}
                    >
                        {menu}
                    </Drawer>
                </BrowserRouter>
            </ConfigProvider>
        </div>
    )
};

export default App;
