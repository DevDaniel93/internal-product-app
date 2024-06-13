import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SCREENS, SIZES, STYLES } from '../../constants'
import EditText from '../../components/EditText'
import CustomButton from '../../components/CustomButton'

export default function NewPassword(props) {
    const { navigation } = props
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    return (
        <View style={STYLES.container}>
            <View style={{ flex: 1 }}>
                <Text style={styles.heading}>
                    New Password
                </Text>
                <Text style={styles.subHeading}>
                    Enter your new password and remember it.
                </Text>

                <EditText
                    label={"Enter Your Password "}
                    placeholder={"Enter Your Password"}
                    value={password}
                    onChangeText={(txt) => setPassword(txt)}
                    password
                    required
                />
                <EditText
                    label={"Confirm Password"}
                    placeholder={"Confirm Your Password"}
                    value={confirmPassword}
                    onChangeText={(txt) => setConfirmPassword(txt)}
                    password
                    required
                />
                {
                   confirmPassword !== '' && password !== confirmPassword &&
                    <Text style={styles.notMatchTxt}>
                        passwords do not match
                    </Text>
                }
                <CustomButton
                    btnStyle={styles.btn}
                    label={"Update Password"}
                    onPress={() => {navigation.navigate(SCREENS.PasswordSuccessful)} }
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    heading: {
        color: COLORS.defaultTextColor,
        fontSize: SIZES.twentyFive,
        fontWeight: "500",
        fontFamily: "Poppins",
        marginTop: SIZES.twentyFive + 10
    },
    subHeading: {
        marginTop: SIZES.five,
        color: COLORS.defaultTextColor,
        fontSize: SIZES.fifteen,
        fontWeight: "500",
        fontFamily: "Poppins",
        marginBottom: SIZES.twenty
    },
    btn: {
        marginTop: SIZES.twenty
    },
    notMatchTxt:{
        color: COLORS.primary,
        padding:5
    }

})