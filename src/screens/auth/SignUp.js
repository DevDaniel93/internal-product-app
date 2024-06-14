import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SCREENS, SIZES, STYLES } from '../../constants'
import EditText from '../../components/EditText'
import CustomButton from '../../components/CustomButton'
import { label } from '../../constants/lables'

export default function Signup(props) {
    const { navigation } = props
    return (
        <View style={STYLES.container}>
            <ScrollView style={{ flex: 1 }}>
                <Text style={styles.heading}>
                    {label.Sign_Up}
                </Text>
                <Text style={styles.subHeading}>
                    {label.AlreadyHaveAccount}
                    <Text
                        onPress={() => { navigation.navigate(SCREENS.Login) }}
                        style={{ color: COLORS.primary, fontWeight: "600" }}>
                        {" "}
                        {label.Login}
                    </Text>
                </Text>
                <EditText
                    label={label.Username}
                    placeholder={label.EnterYourUsername}
                />
                <EditText
                    label={label.FirstName}
                    placeholder={label.EnterYourFirstName}
                />
                <EditText
                    label={label.LastName}
                    placeholder={label.EnterYourLastName}
                />
                <EditText
                    label={label.EnterYourEmail}
                    placeholder={label.EnterYourEmail}
                />
                <EditText
                    label={label.EnterYourPassword}
                    placeholder={label.EnterYourPassword}
                    password
                />
                <EditText
                    label={label.ConfirmPassword}
                    placeholder={label.ConfirmYourPassword}
                    password
                />

                <CustomButton
                    onPress={() => {
                        navigation.navigate(SCREENS.ConfirmationMail, { title: "Forgot Password" })
                    }}
                    label={label.Sign_Up}
                />
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    heading: {
        color: COLORS.defaultTextColor,
        fontSize: SIZES.twentyFive + 3,
        fontWeight: "500",
        fontFamily: "Poppins",
        marginTop: SIZES.fifty * 1.5
    },
    subHeading: {
        marginTop: SIZES.ten,
        color: COLORS.defaultTextColor,
        fontSize: SIZES.twenty - 2,
        fontWeight: "500",
        fontFamily: "Poppins"
    },


})