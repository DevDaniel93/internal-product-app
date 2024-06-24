import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { useSelector } from 'react-redux'
import { COLORS, FONTFAMILY, SIZES, STYLES, height, width } from '../constants'
import { IMAGES, SCREENS, getTheme } from '../constants/theme'
import Icon, { IconType } from './Icons'
import { useNavigation } from '@react-navigation/native'

const ProductCard1 = ({ item }) => {
    const navigation = useNavigation()
    const [wishList, setWishList] = useState(item.favourite)


    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate(SCREENS.ProductDetail, { productDetails: item })
        }}
            style={[styles.container, STYLES.shadow, {}]}>
            <Image
                style={styles.img}
                source={{ uri: item?.image }}
                resizeMode="contain"
            />
            <TouchableOpacity
                style={[styles.starContainer, {}]}
                onPress={() => setWishList(!wishList)}
            >
                <Icon
                    name={wishList ? "heart" : "heart-outlined"}
                    type={IconType.Entypo}
                    color={wishList ? COLORS.red : COLORS.black}
                    size={SIZES.twenty}
                />
            </TouchableOpacity>
            <View style={[styles.detail, {}]}>
                <Text style={[styles.txt, { color: COLORS.defaultTextColor, }]}>
                    {item?.title}
                </Text>
                <View style={{ flexDirection: "row", marginTop: 2, }}>
                    <Text style={[styles.category, { color: COLORS.gray, }]}>
                        {item?.category}{"   "}
                    </Text>
                    <Text style={[styles.price, { color: COLORS.yellowTxt, }]}>
                        ${item?.price}
                    </Text>
                    <TouchableOpacity
                        style={styles.addContainer}
                    >
                        <Icon
                            name={"plus"}
                            type={IconType.AntDesign}
                            color={COLORS.white}
                            size={SIZES.twenty}
                        />
                    </TouchableOpacity>
                </View>

            </View>
        </TouchableOpacity>
    )
}

export default ProductCard1

const styles = StyleSheet.create({
    container: {
        marginTop: SIZES.twenty,
        width: width * .4,
        height: height * .25,
        marginBottom: SIZES.ten,
        backgroundColor: "#f7f5f5",
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 5,
        borderRadius: 10,
        justifyContent: 'space-between'
    },
    img: {
        width: "100%",
        height: "70%",
        borderRadius: 10,
        backgroundColor: COLORS.white
    },
    starContainer: {
        position: "absolute",
        padding: SIZES.five,
        borderRadius: SIZES.twentyFive,
        right: SIZES.twentyFive,
        top: SIZES.twentyFive,
        backgroundColor: COLORS.white
    },
    addContainer: {
        position: "absolute",
        padding: SIZES.five,
        borderRadius: SIZES.twentyFive,
        alignItems: "center",
        justifyContent: "center",
        left: SIZES.fifty * 1.85,
        bottom: -SIZES.five,
        backgroundColor: COLORS.black
    },
    detail: {
        alignSelf: "center",
        width: "98%",
    },
    txt: {
        fontFamily: FONTFAMILY.Poppins,
        fontSize: 14,
        fontWeight: "800",
    },
    price: {
        fontFamily: FONTFAMILY.Poppins,
        fontWeight: "700",
        fontSize: 12
    },
    category: {
        fontFamily: FONTFAMILY.Poppins,
        fontWeight: "700",
        fontSize: 12
    },
    rating: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }

})