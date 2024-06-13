import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import Icon, { IconType, Icons } from './Icons'
import { COLORS, FONTFAMILY, FONTS, IMAGES, SCREENS, SIZES, STYLES, height, width } from '../constants'
import { useNavigation } from '@react-navigation/native'

const ProductCard = ({ item }) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate(SCREENS.singleProduct, { productDetails: item })
        }}
            style={[styles.container, STYLES.shadow]}>
            <Image
                style={styles.img}
                source={{ uri: item?.image }}
                resizeMode="contain"
            />
            <TouchableOpacity
                style={styles.starContainer}
            >
                <Icon
                    name={"heart"}
                    type={IconType.Entypo}
                    color={COLORS.red}
                    size={SIZES.twenty}
                />
            </TouchableOpacity>
            <View style={styles.detail}>
                <Text style={styles.txt}>
                    {item?.title}
                </Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 2 }}>
                    <Text style={styles.price}>
                        ${item?.price}
                    </Text>
                    <View style={styles.rating}>
                        <Icon type={IconType.FontAwesome} name={'star'} size={18} color={COLORS.star} />
                        <Text style={styles.txt}>{item?.rating}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ProductCard

const styles = StyleSheet.create({
    container: {
        marginTop: SIZES.twenty,
        width: width * .4,
        height: height * .25,

        borderColor: COLORS.gray,
        borderWidth: .5,
        backgroundColor: COLORS.white,
        marginBottom: SIZES.ten
    },
    img: {
        width: "100%",
        height: "100%"
    },
    starContainer: {
        position: "absolute",
        backgroundColor: COLORS.white,
        padding: SIZES.five,
        borderRadius: SIZES.twentyFive,
        right: SIZES.ten,
        top: SIZES.ten
    },
    detail: {
        backgroundColor: COLORS.white,
        padding: SIZES.ten,
        borderWidth: 1,
        position: "absolute",
        bottom: -10,
        alignSelf: "center",
        width: "98%",
        borderRadius: SIZES.five,
        borderColor: COLORS.primary
    },
    txt: {
        fontFamily: FONTFAMILY.Poppins,
        color: COLORS.defaultTextColor,
        fontSize: 14,
    },
    price: {
        fontFamily: FONTFAMILY.Poppins,
        color: COLORS.defaultTextColor,
        fontWeight: "500",
        fontSize: 14
    },
    rating: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }

})