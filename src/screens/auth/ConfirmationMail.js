import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SCREENS, SIZES, STYLES } from '../../constants'
import EditText from '../../components/EditText'
import CustomButton from '../../components/CustomButton'

export default function ConfirmationMail(props) {
    const { navigation } = props
    return (
        <View style={STYLES.container}>
            <View style={{ flex: 1 }}>
                <Text style={styles.heading}>
                    Confirmation Mail
                </Text>
                <Text style={styles.subHeading}>
                    Enter your email address for verification.
                </Text>
                <EditText
                    label={"Email"}
                />

                <CustomButton
                    onPress={() => {
                        navigation.navigate(SCREENS.EmailVerification)
                    }}
                    label={"Send"}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    heading: {
        marginTop: SIZES.twenty,
        color: COLORS.black,
        fontSize: SIZES.twenty,
        fontWeight: "500",
        fontFamily: "Poppins",

    },
    subHeading: {
        marginTop: SIZES.five,
        color: COLORS.black,
        fontSize: SIZES.fifteen,
        fontWeight: "500",
        fontFamily: "Poppins"
    },

})