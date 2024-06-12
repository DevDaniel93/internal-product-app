import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import CustomButton from '../../components/CustomButton'
import { COLORS, IMAGES, SIZES, STYLES, height, width } from '../../constants'

const PasswordSuccessful = () => {
    return (
        <View style={STYLES.container}>
            <ImageBackground
                source={IMAGES.lockBg}
                style={styles.imgView}>
                <Image
                    source={IMAGES.lock}
                    style={styles.img}
                    resizeMode='contain' />
            </ImageBackground>
            <Text style={styles.heading}>New password set successfully</Text>
            <Text style={styles.text}>Congratulations! Your password has been set successfully. Please proceed to the login screen to verify your account.</Text>
            <CustomButton label={"Login"} />
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
        color: COLORS.black,
        fontWeight: "500"
    },
    text: {
        textAlign: 'center'
    }
})
