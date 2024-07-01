import { StyleSheet, Text, View, } from 'react-native'
import React from 'react'
import { COLORS, SCREENS, SIZES, STYLES } from '../../constants'
import EditText from '../../components/EditText'
import CustomButton from '../../components/CustomButton'
import { useSelector } from 'react-redux'
import { getTheme } from '../../constants/theme'
import { useTranslation } from 'react-i18next'

export default function ConfirmationMail(props) {
    const { navigation } = props
    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    const { t } = useTranslation();
    return (
        <View style={[STYLES.container, { backgroundColor: currentTheme.Background }]}>
            <View style={{ flex: 1 }}>
                <Text style={[styles.heading, { color: currentTheme.defaultTextColor, }]}>
                    {t('ConfirmationMail')}
                </Text>
                <Text style={[styles.subHeading, { color: currentTheme.defaultTextColor, }]}>
                    {t('EnterEmail')}
                </Text>
                <EditText
                    label={t('Email')}
                    required
                />

                <CustomButton
                    onPress={() => {
                        navigation.navigate(SCREENS.EmailVerification, { title: t('ForgotPassword') })

                    }}
                    label={t('Send')}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    heading: {
        marginTop: SIZES.twenty,
        fontSize: SIZES.twenty,
        fontWeight: "500",
        fontFamily: "Poppins",

    },
    subHeading: {
        marginTop: SIZES.five,
        fontSize: SIZES.fifteen,
        fontWeight: "500",
        fontFamily: "Poppins"
    },

})