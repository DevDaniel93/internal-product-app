
import Toast from "react-native-toast-message";

export const SuccessAlert = (text1, text2) => {
    Toast.show({
        type: 'custom_toast',
        text1: text1,
        text2: text2,
    })
}