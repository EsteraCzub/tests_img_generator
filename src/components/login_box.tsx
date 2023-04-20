import {h} from "preact";
import {useState} from 'preact/hooks';
import {Button, Form, Input, Layout, Menu, Modal} from 'antd';
import {UserOutlined, MailOutlined, LockOutlined, LogoutOutlined, LoginOutlined} from '@ant-design/icons';

const {Header, Content} = Layout;

function LoginBox() {
    const [loginModalVisible, setLoginModalVisible] = useState(false);
    const [registerModalVisible, setRegisterModalVisible] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const showLoginModal = () => {
        setLoginModalVisible(true);
    };

    const hideLoginModal = () => {
        setLoginModalVisible(false);
    };


    const showRegisterModal = () => {
        setRegisterModalVisible(true);
    };

    const hideRegisterModal = () => {
        setRegisterModalVisible(false);
    };
    const handleLogin = (values) => {
        console.log('Login:', values);
        setUsername(values.username);
        setEmail(`${values.username}@example.com`);
        setLoggedIn(true);
        hideLoginModal();
    };

    const handleLogout = () => {
        setUsername('');
        setEmail('');
        setLoggedIn(false);
    };

    const handleRegister = (values) => {
        console.log('Register:', values);
        setUsername(values.username);
        setEmail(values.email);
        setLoggedIn(true);
        hideRegisterModal();
    };

    const layout = loggedIn ? (
        <Header className="header">
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="2" onClick={handleLogout} data-testid="logout">
                    <LogoutOutlined/> Logout
                </Menu.Item>
            </Menu>
        </Header>
    ) : (
        <Header className="header">
            <Menu theme="dark" mode="horizontal">
                <Menu.Item data-testid="login" key="1" onClick={showLoginModal}>
                    Login
                </Menu.Item>
                <Menu.Item data-testid="register" key="2" onClick={showRegisterModal}>
                    Register
                </Menu.Item>
            </Menu>
        </Header>
    );

    return (
        <Layout>
            {layout}
            <Content className="content">
                <Modal
                    title="Login"
                    open={loginModalVisible}
                    onCancel={hideLoginModal}
                    footer={null}
                >
                    <Form onFinish={handleLogin}>
                        <Form.Item
                            name="username"
                            rules={[{required: true, message: 'Please input your username!'}]}
                        >
                            <Input prefix={<UserOutlined/>} placeholder="Username"/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{required: true, message: 'Please input your password!'}]}
                        >
                            <Input.Password placeholder="Password"/>
                        </Form.Item>
                        <Form.Item>
                            <Button data-testid="loginButton" type="primary" htmlType="submit">
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    title="Register"
                    open={registerModalVisible}
                    onCancel={hideRegisterModal}
                    footer={null}
                >
                    <Form onFinish={handleRegister}>
                        <Form.Item
                            name="username"
                            rules={[{required: true, message: 'Please input your username!'}]}
                        >
                            <Input prefix={<UserOutlined/>} placeholder="Username"/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{required: true, message: 'Please input your password!'}]}
                        >
                            <Input.Password placeholder="Password"/>
                        </Form.Item>
                        <Form.Item>
                            <Button data-testid="registerButton" type="primary" htmlType="submit">
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>

            </Content>
        </Layout>
    );
}

export default LoginBox;