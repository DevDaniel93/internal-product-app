import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SCREENS, SIZES, STYLES } from '../../constants'
import EditText from '../../components/EditText'
import CustomButton from '../../components/CustomButton'

export default function NewPassword(props) {
    const { navigation } = props
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

                    password
                />
                <EditText
                    label={"Confirm Password"}
                    placeholder={"Confirm Your Password"}

                    password
                />
                <CustomButton
                    btnStyle={styles.btn}
                    label={"Update Password"}
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
        marginTop: SIZES.five,
        color: COLORS.black,
        fontSize: SIZES.fifteen,
        fontWeight: "500",
        fontFamily: "Poppins",
        marginBottom: SIZES.twenty
    },
    btn: {
        marginTop: SIZES.twenty
    }

})