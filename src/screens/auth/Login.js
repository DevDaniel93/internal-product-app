import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SCREENS, SIZES, STYLES } from '../../constants'
import EditText from '../../components/EditText'
import CustomButton from '../../components/CustomButton'
import { label } from '../../constants/lables'
import { useSelector } from 'react-redux'
import { getTheme } from '../../constants/theme'


export default function Login(props) {
    const { navigation } = props
    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)

    console.log("theme", theme)
    return (
        <View style={[STYLES.container, { backgroundColor: currentTheme.Background }]}>
            <View style={{ flex: 1 }}>
                <Text style={[styles.heading, { color: currentTheme.defaultTextColor }]}>
                    {label.Login}
                </Text>
                <Text style={[styles.subHeading, { color: currentTheme.defaultTextColor, }]}>
                    {label.NoAccount}

                    <Text
                        onPress={() => { navigation.navigate(SCREENS.SignUp) }}
                        style={{ color: currentTheme.primary, fontWeight: "600" }}>
                        {" "}
                        {label.Signup}
                    </Text>
                </Text>
                <EditText
                    label={label.Email}
                    required
                />
                <EditText
                    label={label.Password}
                    password
                    required
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate(SCREENS.ConfirmationMail, { title: "Forgot Password" })}
                >
                    <Text style={[styles.forget, { color: currentTheme.primary, }]}>
                        {label.ForgotPassword}
                    </Text>
                </TouchableOpacity>
                <CustomButton
                    onPress={() => {
                        navigation.navigate(SCREENS.Drawer)
                    }}
                    label={label.Login}
                />
            </View>
            <Text style={[styles.bottamText, { color: currentTheme.defaultTextColor, }]}>
                {label.YouAgreeToOur}
                <Text style={{ color: currentTheme.primary }}>{" "}{label.PrivacyPolicy}{" "}
                </Text>
                {label.And}
                <Text style={{ color: currentTheme.primary }}>
                    {" "}{label.TermsAndConditions}{" "}
                </Text>

            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    heading: {

        fontSize: SIZES.twentyFive + 3,
        fontWeight: "500",
        fontFamily: "Poppins",
        marginTop: SIZES.fifty * 1.5
    },
    subHeading: {
        marginTop: SIZES.ten,

        fontSize: SIZES.twenty - 2,
        fontWeight: "500",
        fontFamily: "Poppins"
    },
    forget: {

        fontFamily: "Poppins",
        fontSize: SIZES.fifteen + 1,
        fontWeight: "600",
        alignSelf: "flex-end",
        marginTop: SIZES.twenty,
        marginBottom: SIZES.fifteen
    },
    bottamText: {

        fontWeight: "400",
        fontFamily: "Poppins",
        textAlign: "center",
        marginBottom: SIZES.twenty,
        fontSize: SIZES.fifteen + 1
    }
})