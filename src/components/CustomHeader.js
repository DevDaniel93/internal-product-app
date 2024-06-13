import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, IMAGES, SIZES } from '../constants'

export default function CustomHeader() {
    return (
        <View style={styles.container}>
            <Image
                style={styles.img}
                source={IMAGES.user}
            />
            <View>
                <Text style={styles.txt}>
                    Hello, Welcome Back 👋
                </Text>
                <Text style={[styles.txt, { fontWeight: "600" }]}>
                    John Doe
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: SIZES.twenty,
        flexDirection: "row",
        alignItems: "center"

    },
    img: {
        width: SIZES.fifty - 5,
        height: SIZES.fifty - 5,
        borderRadius: SIZES.fifty,
        borderWidth: 1,
        borderColor: COLORS.primary,
        marginRight: SIZES.ten
    },
    txt: {
        color: COLORS.defaultTextColor,
        fontFamily: FONTFAMILY.Poppins,
        fontSize: SIZES.fifteen
    }
})