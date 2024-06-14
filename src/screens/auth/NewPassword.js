import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SCREENS, SIZES, STYLES } from '../../constants'
import EditText from '../../components/EditText'
import CustomButton from '../../components/CustomButton'
import { label } from '../../constants/lables'

export default function NewPassword(props) {
    const { navigation } = props
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    return (
        <View style={STYLES.container}>
            <View style={{ flex: 1 }}>
                <Text style={styles.heading}>
                    {label.NewPassword}
                </Text>
                <Text style={styles.subHeading}>
                    {label.EnterNewPasswordAndRemember}
                </Text>

                <EditText
                    label={label.EnterYourPassword}
                    placeholder={label.EnterYourPassword}
                    value={password}
                    onChangeText={(txt) => setPassword(txt)}
                    password
                    required
                />
                <EditText
                    label={label.ConfirmPassword}
                    placeholder={label.ConfirmYourPassword}
                    value={confirmPassword}
                    onChangeText={(txt) => setConfirmPassword(txt)}
                    password
                    required
                />
                {
                   confirmPassword !== '' && password !== confirmPassword &&
                    <Text style={styles.notMatchTxt}>
                        {label.PasswordDoNotMatch}
                    </Text>
                }
                <CustomButton
                    btnStyle={styles.btn}
                    label={label.UpdatePassword}
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