import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SIZES, STYLES, height, width } from '../../constants'
import HeaderWithArrow from '../../components/HeaderWithArrow'
import EditText from '../../components/EditText'
import CustomButton from '../../components/CustomButton'
import { label } from '../../constants/lables'
import { useSelector } from 'react-redux'
import { getTheme } from '../../constants/theme'

export default function ContactUs() {
    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    return (
        <View style={[STYLES.container, { backgroundColor: currentTheme.Background }]}>
            <HeaderWithArrow label={label.ContactUs} />
            <EditText
                styleTxtArea={styles.textArea}
                placeholder={label.EnterYourName}
            />
            <EditText
                styleTxtArea={styles.textArea}
                placeholder={label.EnterYourEmail}
            />
            <EditText
                styleTxtArea={styles.textArea}
                placeholder={label.EnterYourSubject}
            />
            <EditText
                styleTxtArea={styles.textArea}
                inputArea={styles.multiInput}
                multiline={true}
                style={styles.multiInputTxt}
                placeholder={label.EnterYourMessage}
            />
            <CustomButton
                label={label.Submit}
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