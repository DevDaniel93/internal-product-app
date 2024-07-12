import axios from "axios";
import { CONSTANTS } from "../../constants";

export const GetOrders = (data) => {
    const onSuccess = ({ data }) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };

    const options = {
        params: {
            consumer_key: CONSTANTS.API_URLS.Consumer_key,
            consumer_secret: CONSTANTS.API_URLS.Consumer_secret,

        },
    }
    return axios.get(
        CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.ALL_ORDER,
        options
    ).then(onSuccess)
        .catch(onFailure);
};

export const GetSingleOrderDetail = (id) => {
    const onSuccess = ({ data }) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };

    const options = {
        params: {
            consumer_key: CONSTANTS.API_URLS.Consumer_key,
            consumer_secret: CONSTANTS.API_URLS.Consumer_secret,

        },
    }
    return axios.get(
        CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.ALL_ORDER + id,
        options
    ).then(onSuccess)
        .catch(onFailure);
};

export const PostOrder = (data) => {

    const onSuccess = ({ data }) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };

    const options = {
        params: {
            consumer_key: CONSTANTS.API_URLS.Consumer_key,
            consumer_secret: CONSTANTS.API_URLS.Consumer_secret,
            
        },
        headers: {
            Accept: "application/json"
        },
    }
    return axios.post(
        CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.ALL_ORDER,
        data,
        options
    ).then(onSuccess)
        .catch(onFailure);
};