import axios from "axios";
import { CONSTANTS } from "../../constants";


const login = (data) => {
    const onSuccess = (data) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };
    return axios.post(
        CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.LOGIN,
        data
    ).then(onSuccess)
        .catch(onFailure);


};
const Register = (data) => {
    const onSuccess = (data) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };

    return axios.post(
        CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.REGISTER,
        data
    ).then(onSuccess)
        .catch(onFailure);
};
const VerifyEmail = (data) => {
    const onSuccess = (data) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };

    return axios.post(
        CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.VERIFY_EMAIL,
        data
    ).then(onSuccess)
        .catch(onFailure);
};

const getProfile = (token) => {
    console.log("token", token);
    const onSuccess = (data) => {
        return data;
    };

    const onFailure = error => {
        throw error;
    };


    return axios.post(
        CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.PROFILE,
        data, {
        headers: { Authorization: `Bearer ${token}` }
    }
    ).then(onSuccess)
        .catch(onFailure);
};

const authService = {
    login,
    Register,
    VerifyEmail,
    getProfile
};

export default authService;