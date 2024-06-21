import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, IMAGES, SIZES } from '../constants'
import { useSelector } from 'react-redux'
import { getTheme } from '../constants/theme'
import { label } from '../constants/lables'
import { useTranslation } from 'react-i18next'

export default function CustomHeader() {
    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    const { t } = useTranslation();
    return (
        <View style={styles.container}>
            <Image
                style={[styles.img, { borderColor: currentTheme.primary, }]}
                source={IMAGES.user}
            />
            <View>
                <Text style={[styles.txt, { color: currentTheme.defaultTextColor, }]}>
                {t('HelloWelcomeBack')} 👋
                </Text>
                <Text style={[styles.txt, { fontWeight: "600", color: currentTheme.defaultTextColor, }]}>
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

        marginRight: SIZES.ten
    },
    txt: {

        fontFamily: FONTFAMILY.Poppins,
        fontSize: SIZES.fifteen
    }
})