import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SCREENS, SIZES, STYLES } from '../../constants'
import EditText from '../../components/EditText'
import CustomButton from '../../components/CustomButton'

export default function Signup(props) {
    const { navigation } = props
    return (
        <View style={STYLES.container}>
            <ScrollView style={{ flex: 1 }}>
                <Text style={styles.heading}>
                    Sign Up
                </Text>
                <Text style={styles.subHeading}>
                    Already have an account?
                    <Text
                        onPress={() => { navigation.navigate(SCREENS.Login) }}
                        style={{ color: COLORS.primary, fontWeight: "600" }}>
                        {" "}
                        Login
                    </Text>
                </Text>
                <EditText
                    label={"Username"}
                    placeholder={"Enter Your Username"}
                />
                <EditText
                    label={"First Name "}
                    placeholder={"Enter Your First Name"}

                />
                <EditText
                    label={"Last Name "}
                    placeholder={"Enter Your Last Name"}


                />
                <EditText
                    label={"Enter Your Email "}
                    placeholder={"Enter Your Email"}

                />
                <EditText
                    label={"Enter Your Password "}
                    placeholder={"Enter Your Password"}

                    password
                />
                <EditText
                    label={"Confirm Password"}
                    placeholder={"Confirm Your Password"}

                    password
                />

                <CustomButton
                    onPress={() => {
                        navigation.navigate(SCREENS.ConfirmationMail, { title: "Forgot Password" })
                    }}
                    label={"Sign Up"}
                />
            </ScrollView>

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


})