import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SCREENS, SIZES, STYLES } from '../../constants'
import EditText from '../../components/EditText'
import CustomButton from '../../components/CustomButton'

export default function Login(props) {
    const { navigation } = props
    return (
        <View style={STYLES.container}>
            <View style={{ flex: 1 }}>
                <Text style={styles.heading}>
                    Login
                </Text>
                <Text style={styles.subHeading}>
                    Don’t have an account?

                    <Text
                        onPress={() => { navigation.navigate(SCREENS.SignUp) }}
                        style={{ color: COLORS.primary, fontWeight: "600" }}>
                        {" "}
                        Signup
                    </Text>
                </Text>
                <EditText
                    label={"Email"}
                />
                <EditText
                    label={"Password"}
                    password
                />
                <Text style={styles.forget}>
                    Forgot password?
                </Text>
                <CustomButton
                    onPress={() => {
                        navigation.navigate(SCREENS.Drawer)
                    }}
                    label={"Login"}
                />
            </View>
            <Text style={styles.bottamText}>
                By login , you agree to our
                <Text style={{ color: COLORS.primary }}>{" "}Privacy Policy{" "}
                </Text>
                and
                <Text style={{ color: COLORS.primary }}>
                    {" "} Terms & Conditions.{" "}
                </Text>

            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    heading: {
        color: COLORS.black,
        fontSize: SIZES.twentyFive + 3,
        fontWeight: "500",
        fontFamily: "Poppins",
        marginTop: SIZES.fifty * 1.5
    },
    subHeading: {
        marginTop: SIZES.ten,
        color: COLORS.black,
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
        color: COLORS.black,
        fontWeight: "400",
        fontFamily: "Poppins",
        textAlign: "center",
        marginBottom: SIZES.twenty,
        fontSize: SIZES.fifteen + 1
    }
})