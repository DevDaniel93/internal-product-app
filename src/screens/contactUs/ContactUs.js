import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SIZES, STYLES, height, width } from '../../constants'
import HeaderWithArrow from '../../components/HeaderWithArrow'
import EditText from '../../components/EditText'
import CustomButton from '../../components/CustomButton'

export default function ContactUs() {
    return (
        <View style={STYLES.container}>
            <HeaderWithArrow label={"Contact us"} />
            <EditText
                styleTxtArea={styles.textArea}
                placeholder={"Enter Your Name"}
            />
            <EditText
                styleTxtArea={styles.textArea}
                placeholder={"Enter Your email"}
            />
            <EditText
                styleTxtArea={styles.textArea}
                placeholder={"Enter Your Subject"}
            />
            <EditText
                styleTxtArea={styles.textArea}
                inputArea={styles.multiInput}
                multiline={true}
                style={styles.multiInputTxt}
                placeholder={"Enter Your Message"}
            />
            <CustomButton
                label={"Submit"}
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