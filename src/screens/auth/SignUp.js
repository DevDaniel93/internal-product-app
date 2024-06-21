import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SCREENS, SIZES, STYLES } from '../../constants'
import EditText from '../../components/EditText'
import CustomButton from '../../components/CustomButton'
import { useSelector } from 'react-redux'
import { getTheme } from '../../constants/theme'
import { useTranslation } from 'react-i18next'

export default function Signup(props) {
    const { navigation } = props
    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    const { t } = useTranslation();
    return (
        <View style={[STYLES.container, { backgroundColor: currentTheme.Background, }]}>
            <ScrollView style={{ flex: 1, }} showsVerticalScrollIndicator={false}>
                <Text style={[styles.heading, { color: currentTheme.defaultTextColor, }]}>
                    {t('Sign_Up')}
                </Text>
                <Text style={[styles.subHeading, { color: currentTheme.defaultTextColor, }]}>
                    {t('AlreadyHaveAccount')}
                    <Text
                        onPress={() => { navigation.navigate(SCREENS.Login) }}
                        style={{ color: currentTheme.primary, fontWeight: "600" }}>
                        {" "}
                        {t('Login')}
                    </Text>
                </Text>
                <EditText
                    label={t('Username')}
                    placeholder={t('EnterYourUsername')}

                />
                <EditText
                    label={t('FirstName')}

                    placeholder={t('EnterYourFirstName')}

                />
                <EditText
                    label={t('LastName')}

                    placeholder={t('EnterYourLastName')}

                />
                <EditText
                    label={t('EnterYourEmail')}
                    placeholder={t('EnterYourEmail')}
                />
                <EditText
                    label={t('EnterYourPassword')}
                    placeholder={t('EnterYourPassword')}
                    password
                />
                <EditText
                    label={t('ConfirmPassword')}
                    placeholder={t('ConfirmYourPassword')}
                    password
                />

                <CustomButton
                    onPress={() => {
                        navigation.navigate(SCREENS.ConfirmationMail, { title: t('ForgotPassword') })
                    }}
                    label={t('Sign_Up')}
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