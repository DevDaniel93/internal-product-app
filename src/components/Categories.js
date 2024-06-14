import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, SIZES } from '../constants'
import { useSelector } from 'react-redux'
import { getTheme } from '../constants/theme'

export default function Categories(props) {
    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    const _renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.CategoryContainer}>
                <Image style={styles.img} source={item?.image} />
                <Text style={[styles.txt, { color: currentTheme.defaultTextColor, }]}>
                    {item?.label}
                </Text>
            </TouchableOpacity>
        )
    }
    return (
        <View>
            <View style={styles.row}>
                <Text style={[styles.heading, { color: currentTheme.defaultTextColor, }]}>
                    Categories
                </Text>
                <Text style={[styles.seeAll, { color: currentTheme.primary, }]}>
                    see all
                </Text>
            </View>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={props?.data || [1, 2, 3]}
                keyExtractor={(item) => item.id}
                renderItem={_renderItem}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: SIZES.fifteen
    },
    heading: {

        fontSize: SIZES.twenty,
        fontWeight: "500",
        fontFamily: FONTFAMILY.Poppins
    },
    CategoryContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginRight: SIZES.twenty,
        marginVertical: SIZES.fifteen
    },
    seeAll: {
        color: COLORS.primary,
        fontSize: SIZES.fifteen + 2,
        fontFamily: FONTFAMILY.Poppins,
        textDecorationLine: "underline",
        fontWeight: "500"
    },
    img: {
        width: SIZES.fifty * .9,
        height: SIZES.fifty * .9,
        borderRadius: SIZES.fifty,
        borderWidth: 1,
        borderColor: COLORS.primary,
        resizeMode: "contain"
    },
    txt: {
        marginTop: SIZES.five,

        fontSize: SIZES.fifteen,
        fontFamily: FONTFAMILY.Poppins
    }
})