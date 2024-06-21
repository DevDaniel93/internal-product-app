import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SIZES, STYLES, height, width } from '../../constants'
import HeaderWithArrow from '../../components/HeaderWithArrow'
import EditText from '../../components/EditText'
import CustomButton from '../../components/CustomButton'
import { label } from '../../constants/lables'
import { useSelector } from 'react-redux'
import { getTheme } from '../../constants/theme'
import { useTranslation } from 'react-i18next'

export default function ContactUs() {
    const theme = useSelector(state => state.Theme.theme)
    const { t } = useTranslation();
    const currentTheme = getTheme(theme)
    return (
        <View style={[STYLES.container, { backgroundColor: currentTheme.Background }]}>
            <HeaderWithArrow label={t('ContactUs')} />
            <EditText
                styleTxtArea={styles.textArea}
                placeholder={t('EnterYourName')}
            />
            <EditText
                styleTxtArea={styles.textArea}
                placeholder={t('EnterYourEmail')}
            />
            <EditText
                styleTxtArea={styles.textArea}
                placeholder={t('EnterYourSubject')}
            />
            <EditText
                styleTxtArea={styles.textArea}
                inputArea={styles.multiInput}
                multiline={true}
                style={styles.multiInputTxt}
                placeholder={t('EnterYourMessage')}
            />
            <CustomButton
                label={t('Submit')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    textArea: {
        marginTop: SIZES.twenty
    },
    multiInput: {
        height: height * .28,
        flex: 1
    },
    multiInputTxt: {
        height: height * .27,
        textAlignVertical: "top"
    }

})