import {h} from 'preact';
import {useState, useEffect} from 'preact/hooks';

import {Alert, Descriptions, List} from 'antd';
import style from './style.css'
import {BACKEND_GET_TASK_RESULT, refreshTasksStatus} from "../../components/api";
import axios from "axios";

const History: React.FunctionComponent = () => {
    const [imageList, setImageList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [enlargedImageUrl, setEnlargedImageUrl] = useState(null);

    const [result, setResult] = useState<any | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const sync = async () => {
            await refreshTasksStatus(setResult, setError)
        }
        setLoading(true);
        sync();
    }, []);

    useEffect(() => {
        setLoading(true);
        fetchImages();
    }, [result]);


    const fetchImages = async () => {
        try {
            const data: any = await fetchResultImages(page);
            const newImageList = [...imageList, ...data];
            setImageList(newImageList);
            setPage(page + 1);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchResultImages = async (page) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const readImages = async (data: any) => {
                    const ret: any = []
                    if (data !== null && data.length > 0) {
                        for (const value of data) {
                            try {

                                console.log("Fetch data:: ", value.id);

                                const response = await axios.get(`${BACKEND_GET_TASK_RESULT  }/${  value.id}`,
                                    {
                                        timeout: 60000,
                                        responseType: "json",
                                    }
                                );
                                const result = response.data;
                                const imageSrc = `data:;base64,${result.data.result}`;
                                const val = {
                                    prompt: result.data.data.prompt,
                                    image_size: `${result.data.data.width  }x${  result.data.data.height}`,
                                    steps: result.data.data.steps,
                                    guidance_scale: result.data.data.guidance_scale,
                                    temperature: result.data.data.temperature,
                                    seed: result.data.data.seed,
                                    negative: result.data.data.negative,
                                    mode: result.data.data.mode,
                                    model: result.data.data.model,
                                    batch: result.data.data.batch,
                                    imageSrc
                                }
                                ret.push(val);
                            } catch (exception) {
                                console.log("getData: - exception: ", exception)
                            }
                        }
                    }
                    return ret;
                };
                if (result !== null && result.tasks_done.length > 0) {
                    const startIndex = (page - 1) * 12;
                    const endIndex = page * 12;
                    const data = result.tasks_done.slice(startIndex, endIndex);
                    const images = readImages(data)
                    resolve(images);
                } else {
                    resolve([])
                }
            }, 0);
        });
    };

    const handleScroll = (event) => {
        const element = event.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            setLoading(true);
            fetchImages();
        }
    };

    const handleWheel = (event) => {
        const element = event.target;
        if (event.deltaY > 0 && element.scrollHeight - element.scrollTop === element.clientHeight) {
            setLoading(true);
            fetchImages();
        }
    };

    const handleImageClick = (imageUrl) => {
        setEnlargedImageUrl(imageUrl);
    };

    const handleEnlargedImageClick = () => {
        setEnlargedImageUrl(null);
    };

    const renderImage = (item) => (
        <div className={style.imageContainer} onClick={() => handleImageClick(item)}>
            <img src={item.imageSrc} alt={item.prompt} />
        </div>
    );

    return (
        <div>
            {message && <Alert type="info" message={message} banner />}
            {error && <Alert type="error" message={error} banner />}
            <div onScroll={handleScroll} onWheel={handleWheel}
                 style={{height: '85vh', overflowY: 'scroll', overflowX: 'hidden'}}>
                <List
                    grid={{gutter: 16, column: 4}}
                    dataSource={imageList}
                    loading={loading}
                    renderItem={(item) => (
                        renderImage(item)
                    )}
                />

                {enlargedImageUrl && (
                    <div className={style.enlargedImageContainer} data-testid={'imgdiv'} onClick={handleEnlargedImageClick}>
                        <img src={enlargedImageUrl.imageSrc} data-testid={'openimg'}/>
                        <Descriptions className={style.imageDescription} size="default" layout="vertical" bordered
                                      column={{xxl: 8, xl: 8, lg: 6, md: 6, sm: 2, xs: 2}}
                        >
                            <Descriptions.Item label="Prompt" span={8}>{enlargedImageUrl.prompt}</Descriptions.Item>
                            <Descriptions.Item label="Image size">{enlargedImageUrl.image_size}</Descriptions.Item>
                            <Descriptions.Item label="Steps">{enlargedImageUrl.steps}</Descriptions.Item>
                            <Descriptions.Item
                                label="Guidance scale">{enlargedImageUrl.guidance_scale}</Descriptions.Item>
                            <Descriptions.Item label="Seed">{enlargedImageUrl.seed}</Descriptions.Item>
                            <Descriptions.Item label="Mode">{enlargedImageUrl.mode}</Descriptions.Item>
                        </Descriptions>
                    </div>
                )}
            </div>
        </div>
    );
}

export default History;