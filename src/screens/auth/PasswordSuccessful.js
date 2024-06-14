import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import CustomButton from '../../components/CustomButton'
import { COLORS, IMAGES, SCREENS, SIZES, STYLES, height, width } from '../../constants'
import { label } from '../../constants/lables'
import { useSelector } from 'react-redux'
import { getTheme } from '../../constants/theme'

const PasswordSuccessful = (props) => {
    const { navigation } = props
    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    return (
        <View style={[STYLES.container, { backgroundColor: currentTheme.Background }]}>
            <ImageBackground
                source={IMAGES.lockBg}
                style={styles.imgView}>
                <Image
                    source={IMAGES.lock}
                    style={styles.img}
                    resizeMode='contain' />
            </ImageBackground>
            <Text style={[styles.heading, { color: currentTheme.defaultTextColor, }]}>{label.NewPasswordSetSuccessfully}</Text>
            <Text style={[styles.text, { color: currentTheme.defaultTextColor, }]}>{label.CongratulationsPasswordSetSuccessfully}</Text>
            <CustomButton
                onPress={() => {
                    navigation.navigate(SCREENS.Login)
                }}
                label={label.Login} />
        </View>
    )
}

export default PasswordSuccessful

const styles = StyleSheet.create({
    imgView: {
        backgroundColor: COLORS.primary,
        marginVertical: 50,
        alignSelf: 'center',
        borderRadius: 10,
        width: width * .8,
        height: height * .45,
        justifyContent: "center",
        alignItems: "center"
    },
    img: {
        width: SIZES.fiftyWidth * 5,
        height: SIZES.fifty * 4
    },
    heading: {
        textAlign: 'center',
        fontSize: SIZES.body12 * 2,

        fontWeight: "500"
    },
    text: {
        textAlign: 'center',
        fontSize: SIZES.fifteen + 2,
        margin: SIZES.twenty,

        lineHeight: 22
    }
})
