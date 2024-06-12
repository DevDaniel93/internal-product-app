import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SCREENS, SIZES, STYLES } from '../../constants'
import EditText from '../../components/EditText'
import CustomButton from '../../components/CustomButton'
import OtpInput from '../../components/OtpInput'

export default function EmailVerification(props) {
    const { navigation } = props
    const handleCodeFilled = (code) => {
        Alert.alert('OTP Code Entered', code);
    };
    return (
        <View style={STYLES.container}>
            <View style={{ flex: 1 }}>
                <Text style={styles.heading}>
                    Email Verification
                </Text>
                <Text style={styles.subHeading}>
                    Enter the 6-digit verification code send to your email address.
                </Text>
                <OtpInput codeLength={6}
                    onCodeFilled={handleCodeFilled}
                />
                {/* <OtpInput /> */}
                {/* <EditText
                    label={"Email"}
                /> */}

                <CustomButton
                    onPress={() => {
                        navigation.navigate(SCREENS.NewPassword)
                    }}
                    label={"Proceed"}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    heading: {
        color: COLORS.black,
        fontSize: SIZES.twentyFive,
        fontWeight: "500",
        fontFamily: "Poppins",
        marginTop: SIZES.twentyFive + 10
    },
    subHeading: {
        marginTop: SIZES.ten,
        color: COLORS.black,
        fontSize: SIZES.fifteen,
        fontWeight: "500",
        fontFamily: "Poppins"
    },

})