import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, SIZES } from '../constants'

export default function Categories(props) {

    const _renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.CategoryContainer}>
                <Image style={styles.img} source={item?.image} />
                <Text style={styles.txt}>
                    {item?.label}
                </Text>
            </TouchableOpacity>
        )
    }
    return (
        <View>
            <View style={styles.row}>
                <Text style={styles.heading}>
                    Categories
                </Text>
                <Text style={styles.seeAll}>
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
        color: COLORS.black,
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
        color: COLORS.black,
        fontSize: SIZES.fifteen,
        fontFamily: FONTFAMILY.Poppins
    }
})