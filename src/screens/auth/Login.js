import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SCREENS, SIZES, STYLES } from '../../constants'
import EditText from '../../components/EditText'
import CustomButton from '../../components/CustomButton'
import { useSelector } from 'react-redux'
import { COLORS, getTheme } from '../../constants/theme'
import { useTranslation } from 'react-i18next'


export default function Login(props) {
    const { navigation } = props
    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    const { t } = useTranslation();

    return (
        <View style={[STYLES.container, { backgroundColor: currentTheme.Background }]}>
            <View style={{ flex: 1 }}>
                <Text style={[styles.heading, { color: currentTheme.defaultTextColor }]}>
                    {t('Login')}
                </Text>
                <Text style={[styles.subHeading, { color: currentTheme.defaultTextColor, }]}>
                    {t('NoAccount')}

                    <Text
                        onPress={() => { navigation.navigate(SCREENS.SignUp) }}
                        style={{ color: currentTheme.primary, fontWeight: "600" }}>
                        {" "}
                        {t('Signup')}

                    </Text>
                </Text>
                <EditText
                    label={t('Email')}

                    required
                />
                <EditText
                    label={t('Password')}
                    password
                    required
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate(SCREENS.ConfirmationMail, { title: t('ForgotPassword') })}
                >
                    <Text style={[styles.forget, { color: currentTheme.primary, }]}>

                        {t('ForgotPassword')}

                    </Text>
                </TouchableOpacity>

                <CustomButton
                    onPress={() => {
                        navigation.navigate(SCREENS.Drawer)
                    }}

                    label={t('Login')}
                />
            </View>

            <Text style={[styles.bottamText, { color: currentTheme.defaultTextColor, }]}>

                {t('YouAgreeToOur')}
                <Text style={{ color: currentTheme.primary }}>{" "}{t('PrivacyPolicy')}{" "}
                </Text>

                {t('And')}
                <Text style={{ color: currentTheme.primary }}>

                    {" "}   {t('TermsAndConditions')}{" "}
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