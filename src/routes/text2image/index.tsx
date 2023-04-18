import {h} from 'preact';
import {Alert, Button, Col, Form, Input, Row, Select, Skeleton, Slider, Spin, Switch, Typography} from 'antd';
import {LeftOutlined, RightOutlined} from '@ant-design/icons';
import {useState} from 'preact/hooks';
import TextArea from "antd/es/input/TextArea";
import style from './style.css'
import axios from "axios/index";
import {useEffect} from "react";
import {POP_GS, POP_NEGATIVE, POP_PROMPT, POP_SEED} from "../../components/consts";
import {
    BACKEND_ADD_TASK,
    BACKEND_GET_TASK_RESULT,
    BACKEND_GET_TASK_STATUS,
    BACKEND_STATUS, checkTaskStatus, getData,
    refreshTasksStatus
} from "../../components/api";

const {Title} = Typography;
const Text2Image: React.FunctionComponent = () => {
    const [showColumn, setShowColumn] = useState(true);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [processId, setProcessId] = useState<string | null>(null);
    const [processTime, setProcessTime] = useState<string | null>(null);
    const [result, setResult] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [processStatus, setProcessStatus] = useState(null);
    const [timer, setTimer] = useState(0);
    const [image, setImage] = useState<string | null>(null);
    const [randomSeed, setRandomSeed] = useState(true);

    const [values, setValues] = useState({
        prompt: "ciri from the witcher, real photo",
        negative: null,
        mode: 'stable_tf',
        model: null,
        batch: 1,
        image_size: "896x896",
        steps: 20,
        guidance_scale: 7.5,
        temperature: 1,
        seed: null,
    })

    const [form] = Form.useForm()

    //---------------------------------------------------------------------
    // Hook
    //---------------------------------------------------------------------
    const handleToggleColumn = () => {
        setShowColumn(!showColumn);
    };

    const handleSwitchRandom = (value) => {
        setRandomSeed(value)
    };

    const handleGenerateImage = async (values: any) => {

        console.log('Received values of form: ', values);

        if (values.seed == null || values.seed == '' || randomSeed) {
            values.seed = Math.floor(Math.random() * 2147483640);
        }

        const size = values.image_size.split("x")
        const params = {
            prompt: values.prompt,
            negative: values.negative,
            mode: values.mode,
            model: values.model,
            batch: values.batch,
            width: size[0],
            height: size[1],
            steps: values.steps,
            guidance_scale: values.guidance_scale,
            temperature: values.temperature,
            seed: values.seed,
            type: "c1",
        };
        console.log("Add to queue - config: ", values, params)

        const startTime = Date.now();
        setProcessStatus("start")
        await addToQueue(params);
        const endTime = Date.now() - startTime;
        setProcessTime((endTime / 1000).toString());
    };

    //---------------------------------------------------------------------
    // useEffect
    //---------------------------------------------------------------------
    useEffect(() => {
        const sync = async () => {
            await refreshTasksStatus(setResult, setError)
        }
        sync();
    }, []);

    useEffect(() => {
        console.log("Update result: ", result)
        if (result != null && result.in_progress > 0) {
            setMessage(`Processing image: ${  result.tasks_in_progress[0].id}`)
            setIsLoading(true);
            setProcessStatus("start")
            setProcessId(result.tasks_in_progress[0].id)
            setTimer(0)
        } else if (result != null && result.tasks_done.length > 0) {
            console.log("Update image id: ", result.tasks_done[0].id)
            getData(result.tasks_done[0].id, values, setValues, setImage, setMessage, setError)
        }
    }, [result]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimer((timer) => timer + 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            if (processId && processStatus !== 'completed') {
                await checkTaskStatus(processId, values, setValues, setImage, setMessage, setProcessStatus, setError);
            }
        }, 2500);

        return () => clearInterval(intervalId);
    }, [processId, processStatus]);

    useEffect(() => {
        if (processStatus === 'completed') {
            setIsLoading(false);
        }
    }, [processStatus]);

    useEffect(() => {
        console.log("Update form values: ", values)
        form.setFieldsValue(values)
    }, [form, values])

    //---------------------------------------------------------------------
    // API
    //---------------------------------------------------------------------
    const addToQueue = async (params) => {
        setError(null);
        setIsLoading(true);

        try {
            const response = await axios.post(BACKEND_ADD_TASK,
                params,
                {
                    timeout: 60000,
                    responseType: "json",
                }
            );
            console.log("Add to queue: - response: ", response)
            const result = response.data;
            console.log("Add to queue: - result: ", result.id)
            setProcessId(result.id)
            setTimer(0)
        } catch (exception) {
            console.log("Add to queue: - exception: ", exception)
            setError(exception.message);
        }
    };

    return (
        <div className={style.text2Image}>
            <Form
                name="text2image"
                initialValues={values}
                onFinish={handleGenerateImage}
                layout="vertical"
                form={form}
            >
                <Row gutter={[16, 16]}>
                    <Col span={showColumn ? 15 : 23}>

                        {message && <Alert data-testid="alertMessage" type="info" message={message} banner />}
                        {error && <Alert data-testid="alertError" type="error" message={error} banner />}

                        <Row justify="space-between" align="middle" gutter={[16, 16]} className={style.imageContent}>
                            <Col span={24} style={{textAlign: "center"}}>

                                {image ? <img src={image} className={style.image} /> :
                                    <Skeleton className={style.imageSkeleton} />}
                                {isLoading && (
                                    <div style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)"
                                    }}>
                                        <Spin size="large" />
                                        <br />
                                        <Title level={4}>Processing image ({timer}s)</Title>
                                    </div>
                                )}
                            </Col>
                        </Row>

                        <Row gutter={[16, 16]} style={{marginTop: '16px', bottom: '0px'}} className={style.bottomForm}
                             align="bottom">
                            <Col span={20}>
                                <Form.Item
                                    
                                    label="Prompt"
                                    name="prompt"
                                    tooltip={POP_PROMPT}
                                    rules={[{required: true, message: 'Please input prompt!'}]}
                                >
                                    <TextArea data-testid="prompt" rows={3} disabled={isLoading} />
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item>
                                    <Button data-testid="createButton" type="default" htmlType="submit" disabled={isLoading}>
                                        Create
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={1}>
                        <Button className={style.toggleButton} onClick={handleToggleColumn}>
                            {showColumn ? <RightOutlined /> : <LeftOutlined />}
                        </Button>
                    </Col>
                    <Col span={showColumn ? 8 : 0} className={showColumn ? style.leftForm : style.leftFormHidden}>

                        <Form.Item label="Mode" name="mode">
                            <Select data-testid="mode" disabled={isLoading}
                                    options={[
                                        {value: 'stable_tf', label: 'Stable diffusion TF'},
                                        {value: 'stable', label: 'Stable diffusion 1.4'},
                                        {value: 'stable_2', label: 'Stable diffusion 2.0'},
                                    ]}
                             />
                        </Form.Item> <Form.Item label="Model" name="model">
                        <Select data-testid="model" disabled={isLoading}
                                options={[
                                    {value: '', label: ''},
                                ]}
                         />
                    </Form.Item>

                        <Form.Item
                            label="Negative"
                            name="negative"
                            tooltip={POP_NEGATIVE}
                            rules={[{required: false, message: 'Please input prompt!'}]}

                        >
                            <TextArea data-testid="negative" rows={2} disabled={isLoading} />
                        </Form.Item>

                        <Form.Item label="Image size" name="image_size">
                            <Select data-testid="imageSize"
                                    disabled={isLoading}
                                    options={[
                                        {value: '896x896', label: '896x896'},
                                        {value: '768x768', label: '768x768'},
                                        {value: '768x512', label: '768x512'},
                                        {value: '512x768', label: '512x768'},
                                        {value: '640x384', label: '640x384'},
                                        {value: '384x640', label: '384x640'},
                                        {value: '512x512', label: '512x512'},
                                        {value: '256x256', label: '256x256'},
                                        {value: '128x128', label: '128x128'},
                                        {value: '256x128', label: '256x128'},
                                        {value: '256x384', label: '256x384'},
                                        {value: '256x512', label: '256x512'},
                                        {value: '256x640', label: '256x640'},
                                        {value: '256x768', label: '256x768'},
                                        {value: '384x128', label: '384x128'},
                                        {value: '384x256', label: '384x256'},
                                        {value: '384x384', label: '384x384'},
                                        {value: '384x512', label: '384x512'},
                                        {value: '384x768', label: '384x768'},
                                        {value: '512x128', label: '512x128'},
                                        {value: '512x256', label: '512x256'},
                                        {value: '512x384', label: '512x384'},
                                    ]}
                             />
                        </Form.Item>

                        <Form.Item  data-testid="steps" name="steps" label="Steps">
                            <Slider disabled={isLoading}
                                    range={false}
                                    step={1}
                                    min={1}
                                    max={50}
                                    marks={{1: "1", 10: "10", 20: "20", 25: "25", 30: "30", 40: "40", 50: "50"}}
                            />
                        </Form.Item>

                        <Form.Item data-testid="guidanceScale" name="guidance_scale" label="Guidance scale" tooltip={POP_GS}>
                            <Slider disabled={isLoading}
                                    range={false}
                                    step={0.1}
                                    min={0}
                                    max={20}
                                    marks={{
                                        0: "0",
                                        2.5: "2.5",
                                        5: "5",
                                        7.5: "7.5",
                                        10: "10",
                                        12.5: "12.5",
                                        15: "15",
                                        17.5: "17.5",
                                        20: "20"
                                    }}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Seed">
                            <Input.Group compact>
                                <Form.Item
                                    name="seed"
                                    tooltip={POP_SEED}
                                    style={{display: 'inline-block', width: 'calc(80% - 8px)'}}
                                >
                                    <Input data-testid="seed" disabled={isLoading || randomSeed} />
                                </Form.Item>
                                <Form.Item
                                    name="randomSeed"
                                    style={{display: 'inline-block', width: 'calc(20% - 8px)', margin: '0 8px'}}
                                >
                                    <Switch data-testid="seedSwitch" disabled={isLoading} checked={randomSeed}
                                            onClick={handleSwitchRandom} />
                                </Form.Item>
                            </Input.Group>
                        </Form.Item>

                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default Text2Image;
