import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SCREENS, SIZES, STYLES } from '../../constants'
import EditText from '../../components/EditText'
import CustomButton from '../../components/CustomButton'
import { label } from '../../constants/lables'

export default function Login(props) {
    const { navigation } = props
    return (
        <View style={STYLES.container}>
            <View style={{ flex: 1 }}>
                <Text style={styles.heading}>
                    {label.Login}
                </Text>
                <Text style={styles.subHeading}>
                    {label.NoAccount}

                    <Text
                        onPress={() => { navigation.navigate(SCREENS.SignUp) }}
                        style={{ color: COLORS.primary, fontWeight: "600" }}>
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
                    <Text style={styles.forget}>
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
            <Text style={styles.bottamText}>
                {label.YouAgreeToOur}
                <Text style={{ color: COLORS.primary }}>{" "}{label.PrivacyPolicy}{" "}
                </Text>
                {label.And}
                <Text style={{ color: COLORS.primary }}>
                    {" "}{label.TermsAndConditions}{" "}
                </Text>

            </Text>
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
    forget: {
        color: COLORS.primary,
        fontFamily: "Poppins",
        fontSize: SIZES.fifteen + 1,
        fontWeight: "600",
        alignSelf: "flex-end",
        marginTop: SIZES.twenty,
        marginBottom: SIZES.fifteen
    },
    bottamText: {
        color: COLORS.defaultTextColor,
        fontWeight: "400",
        fontFamily: "Poppins",
        textAlign: "center",
        marginBottom: SIZES.twenty,
        fontSize: SIZES.fifteen + 1
    }
})