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
                            avatar={<Avatar icon={<UserOutlined />} />}
                            title={user}
                            description="Web Developer"
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Statistic title="Followers" value={123} />
                </Col>
                <Col span={8}>
                    <Statistic title="Following" value={456} />
                </Col>
            </Row>
            <Divider />
            <Card>
                <p>Email: john.doe@example.com</p>
                <p>Phone: +1 555-1234</p>
                <p>Address: 123 Main St, Anytown, USA</p>
            </Card>
            <Divider />
            <Card>
                <button onClick={() => setCount(count => count + 1)}>Click Me</button>
                {' '}Clicked {count} times.
            </Card>
            <Divider />
            <Card>
                Current time: {new Date(time).toLocaleString()}
            </Card>
        </div>
    );
};

export default Profile;
