import axios from "axios";
import { CONSTANTS } from "../../constants";

export const Getproducts = (data) => {
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
            category: data?.category
        },
    }
    return axios.get(
        CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.ALL_PRODUCT,
        options
    ).then(onSuccess)
        .catch(onFailure);
};
