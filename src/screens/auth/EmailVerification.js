import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SCREENS, SIZES, STYLES } from '../../constants'
import EditText from '../../components/EditText'
import CustomButton from '../../components/CustomButton'
import OtpInput from '../../components/OtpInput'
import { label } from '../../constants/lables'
import { useSelector } from 'react-redux'
import { getTheme } from '../../constants/theme'
import { useTranslation } from 'react-i18next'

export default function EmailVerification(props) {
    const { navigation } = props
    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    const { t } = useTranslation();
    const handleCodeFilled = (code) => {
        Alert.alert('OTP Code Entered', code);
    };
    return (
        <View style={[STYLES.container, { backgroundColor: currentTheme.Background }]}>
            <View style={{ flex: 1 }}>
                <Text style={[styles.heading, { color: currentTheme.defaultTextColor, }]}>
                    {t('EmailVerification')}
                </Text>
                <Text style={[styles.subHeading, { color: currentTheme.defaultTextColor, }]}>
                    {t('EnterCode')}
                </Text>
                <OtpInput codeLength={6}
                    onCodeFilled={handleCodeFilled}
                />
                {/* <OtpInput /> */}
                {/* <EditText
                    label={"Email"}
                /> */}

                <CustomButton
                    onPress={() => {
                        navigation.navigate(SCREENS.NewPassword)
                    }}
                    label={t('Proceed')}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    heading: {

        fontSize: SIZES.twentyFive,
        fontWeight: "500",
        fontFamily: "Poppins",
        marginTop: SIZES.twentyFive + 10
    },
    subHeading: {
        marginTop: SIZES.ten,

        fontSize: SIZES.fifteen,
        fontWeight: "500",
        fontFamily: "Poppins"
    },

})