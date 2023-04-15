import axios from "axios";

export const BACKEND_ADD_TASK = "http://localhost:5000/add_task";
export const BACKEND_GET_TASK_STATUS = "http://localhost:5000/get_task_status";
export const BACKEND_GET_TASK_RESULT = "http://localhost:5000/get_task_result";
export const BACKEND_STATUS = "http://localhost:5000/status";

export const refreshTasksStatus = async (setResult, setError) => {
    setError(null);
    try {
        console.log("Refresh task status: ")
        const response = await axios.get(BACKEND_STATUS,
            {
                timeout: 60000,
                responseType: "json",
            }
        );
        console.log("Refresh task status: - response: ", response)
        const result = response.data;
        console.log("Refresh task status: - result: ", result)

        const out = {
            done: result.done,
            in_progress: result.in_progress,
            tasks_done: result.tasks_done.reverse().map((it) => {
                return {id: it}
            }),
            tasks_in_progress: result.tasks_in_progress.reverse().map((it) => {
                return {id: it}
            }),
        }

        console.log("Refresh status: - out: ", out)

        setResult(out)
    } catch (exception) {
        console.log("Refresh status: - exception: ", exception)
        setError(exception.message);
    }
}
export const checkTaskStatus = async (id, values, setValues, setImage, setMessage, setProcessStatus, setError,) => {
    setError(null);
    try {
        const response = await axios.get(BACKEND_GET_TASK_STATUS + "/" + id,
            {
                timeout: 60000,
                responseType: "json",
            }
        );
        console.log("checkTaskStatus: - response: ", response)
        const {status} = response.data;
        console.log("checkTaskStatus: - status: ", status)

        if (status == "success") {
            await getData(id, values, setValues, setImage, setMessage, setError)
            setProcessStatus("completed")
        }
    } catch (exception) {
        console.log("checkTaskStatus: - exception: ", exception)
        setError(exception.message);
    }
};
export const getData = async (id, values, setValues, setImage, setMessage, setError) => {
    setError(null);
    setMessage("Load image: " + id)

    try {
        const response = await axios.get(BACKEND_GET_TASK_RESULT + "/" + id,
            {
                timeout: 60000,
                responseType: "json",
            }
        );
        console.log("getData: - response: ", response)
        const result = response.data;
        console.log("getData: - result: ", result.data.result)
        console.log("getData: - result: ", result.data.data)

        const imageSrc = `data:;base64,${result.data.result}`;
        setImage(imageSrc);

        const val = {
            ...values,
            prompt: result.data.data.prompt,
            image_size: result.data.data.width + "x" + result.data.data.height,
            steps: result.data.data.steps,
            guidance_scale: result.data.data.guidance_scale,
            temperature: result.data.data.temperature,
            seed: result.data.data.seed,
            negative: result.data.data.negative,
            mode: result.data.data.mode,
            model: result.data.data.model,
            batch: result.data.data.batch,
        }
        console.log("getData: - val: ", val)
        setValues(val);
        setMessage(null);
    } catch (exception) {
        console.log("getData: - exception: ", exception)
        setError(exception.message);
    }
};
