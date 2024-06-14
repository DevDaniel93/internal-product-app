import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SCREENS, SIZES, STYLES } from '../../constants'
import EditText from '../../components/EditText'
import CustomButton from '../../components/CustomButton'
import { label } from '../../constants/lables'

export default function ConfirmationMail(props) {
    const { navigation } = props
    return (
        <View style={STYLES.container}>
            <View style={{ flex: 1 }}>
                <Text style={styles.heading}>
                    {label.ConfirmationMail}
                </Text>
                <Text style={styles.subHeading}>
                    {label.EnterEmail}
                </Text>
                <EditText
                    label={label.Email}
                    required
                />

                <CustomButton
                    onPress={() => {
                        navigation.navigate(SCREENS.EmailVerification)
                    }}
                    label={label.Send}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    heading: {
        marginTop: SIZES.twenty,
        color: COLORS.defaultTextColor,
        fontSize: SIZES.twenty,
        fontWeight: "500",
        fontFamily: "Poppins",

    },
    subHeading: {
        marginTop: SIZES.five,
        color: COLORS.defaultTextColor,
        fontSize: SIZES.fifteen,
        fontWeight: "500",
        fontFamily: "Poppins"
    },

})