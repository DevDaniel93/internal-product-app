import axios from "axios";
import { CONSTANTS } from "../../constants";

export const GetCountries = (params) => {

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
        },
    }
    return axios.get(
        CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.GET_COUNTRIES,
        options
    ).then(onSuccess)
        .catch(onFailure);
};
