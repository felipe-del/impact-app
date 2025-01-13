import {isAxiosError} from "axios";

export default function handleAxiosError(error) {
    if (isAxiosError(error) && error.response) {
        throw new Error(error.response.responseWrapper.message)
    }
}