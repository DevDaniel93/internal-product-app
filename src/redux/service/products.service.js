import axios from "axios";
import { CONSTANTS } from "../../constants";

export const Getproducts = (params) => {

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
            category: params?.category,
            status: 'publish',
            per_page: 10,
            page: 1,
            max_price: params?.max_price,
            min_price: params?.min_price

        },
    }
    return axios.get(
        CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.ALL_PRODUCT,
        options
    ).then(onSuccess)
        .catch(onFailure);
};
