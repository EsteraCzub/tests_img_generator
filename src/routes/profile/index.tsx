import {FunctionalComponent, h} from 'preact';
import {useEffect, useState} from 'preact/hooks';
import {UserOutlined} from "@ant-design/icons";
import {Avatar, Card, Col, Divider, Row, Statistic} from "antd";
import Meta from "antd/es/card/Meta";

interface Props {
    user: string;
}

const Profile: FunctionalComponent<Props> = ({user}: Props): any => {
    const [time, setTime] = useState<number>(Date.now());
    const [count, setCount] = useState<number>(10);

    useEffect(() => {
        const timer = setInterval(() => setTime(Date.now()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div>

            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <Card>
                        <Meta
                            data-testid={'user'}
                            avatar={<Avatar icon={<UserOutlined />} />}
                            title={user}
                            description="Web Developer"
                        />
                    </Card>
                </Col>
                <Col span={8} data-testid={'followers'}>
                    <Statistic title="Followers" value={123} />
                </Col>
                <Col span={8} data-testid={'following'}>
                    <Statistic title="Following" value={456} />
                </Col>
            </Row>
            <Divider />
            <Card>
                <p data-testid={'email'}>Email: john.doe@example.com</p>
                <p data-testid={'phone'}>Phone: +1 555-1234</p>
                <p data-testid={'address'}>Address: 123 Main St, Anytown, USA</p>
            </Card>
            <Divider />
            <Card data-testid={'clickCount'}>
                <button data-testid={'clickButton'} onClick={() => setCount(count => count + 1)}>Click Me</button>
                {' '}Clicked {count} times.
            </Card>
            <Divider />
            <Card data-testid={'timer'}>
                Current time: {new Date(time).toLocaleString()}
            </Card>
        </div>
    );
};

export default Profile;
