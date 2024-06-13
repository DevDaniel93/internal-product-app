import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, IMAGES, SIZES, STYLES, height, width } from '../../constants'
import ShadedBox from '../../components/ShadedBox'
import HeaderWithArrow from '../../components/HeaderWithArrow'

export default function OrderDetails() {
    const data = [
        { key: "Full Name", value: "John Doe" },
        { key: "Mobile Number", value: "+123-456-789" },
        { key: "State", value: "Dummy" },
        { key: "City", value: "Dummy" },
        { key: "Street Address", value: "XYZ Address" },
        { key: "Postal Code", value: "12345" },
    ]

    const renderItem = ({ item }) => (
        <View style={styles.rows}>
            <Text style={styles.infoTxt}>{item.key}</Text>
            <Text style={styles.infoTxt}>{item.value}</Text>
        </View>
    );

    const ProductList = () => {
        return (
            <View style={styles.ProductListRow}>
                <Image source={IMAGES.ProductImage} style={[styles.img, STYLES.shadow]} />
                <View style={{ justifyContent: "space-around", margin: SIZES.twentyFive, }}>
                    <Text style={styles.productText}>
                        I’m Him
                    </Text>
                    <Text style={styles.productText}>
                        Quantity: 1
                    </Text>
                    <Text style={[styles.productText, { fontWeight: "bold", color: COLORS.primary }]}>
                        Unit Price: $20.00
                    </Text>

                </View>
            </View>
        )
    }
    return (
        <View style={STYLES.container}>
            <HeaderWithArrow label={"Order Details"} />
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.row}>
                    <ShadedBox style={styles.box}>
                        <Text style={styles.txt}>
                            Order Number
                        </Text>
                        <Text style={styles.txt}>
                            #45322
                        </Text>
                    </ShadedBox>
                    <ShadedBox style={styles.box}>
                        <Text style={styles.txt}>
                            Order Date
                        </Text>
                        <Text style={styles.txt}>
                            Jun 6, 2024
                        </Text>
                    </ShadedBox>
                </View>
                <ShadedBox style={styles.statusBox}>
                    <Text style={styles.txt}>
                        Order Status
                    </Text>
                    <Text style={styles.txt}>
                        Pending
                    </Text>
                </ShadedBox>
                <View style={styles.dotLine} />
                <Text style={styles.heading}>
                    Shipping Details
                </Text>
                <View>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.key}
                        contentContainerStyle={styles.container}
                    />
                </View>

                <View style={styles.dotLine} />
                <View>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={[1, 2]}
                        renderItem={ProductList}
                        keyExtractor={(item) => item.key}
                        contentContainerStyle={styles.container}
                    />
                </View>
                <View style={styles.totalRow}>
                    <Text style={styles.infoTxt}>
                        Sub Total
                    </Text>
                    <Text style={styles.infoTxt}>
                        $25.27
                    </Text>
                </View>
                <View style={styles.totalRow}>
                    <Text style={styles.infoTxt}>
                        Sub Total
                    </Text>
                    <Text style={styles.infoTxt}>
                        $25.27
                    </Text>
                </View>
                <View style={[styles.totalRow, { marginBottom: SIZES.twenty }]}>
                    <Text style={[styles.infoTxt, { color: COLORS.defaultTextColor, fontSize: SIZES.twenty, fontWeight: "bold" }]}>
                        Total
                    </Text>
                    <Text style={[styles.infoTxt, { color: COLORS.defaultTextColor, fontSize: SIZES.twenty, fontWeight: "bold" }]}>
                        $6236
                    </Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        width: width * .43,
        justifyContent: "center",
        alignItems: "center"
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    txt: {
        color: COLORS.defaultTextColor,
        fontSize: SIZES.fifteen,
        fontWeight: "500",
        marginTop: 3
    },
    statusBox: {
        justifyContent: "center",
        alignItems: "center"
    },
    dotLine: {
        borderWidth: 1,
        borderStyle: "dashed",
        marginVertical: SIZES.fifteen,
        borderColor: COLORS.gray
    },
    heading: {
        color: COLORS.defaultTextColor,
        fontWeight: "600",
        fontSize: SIZES.twenty,
        fontFamily: FONTFAMILY.Poppins
    },
    rows: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: SIZES.fifteen
    },
    infoTxt: {
        color: COLORS.gray,
        fontSize: SIZES.fifteen,
    },
    ProductListRow: {
        flexDirection: "row",
        paddingVertical: SIZES.ten,
        borderBottomWidth: 1
    },
    img: {
        width: width * .22,
        height: height * .14,

        borderRadius: SIZES.five,
        resizeMode: "contain"
    },
    productText: {
        fontSize: SIZES.twenty - 3,
        color: COLORS.defaultTextColor,
        fontFamily: FONTFAMILY.Poppins,
        fontWeight: "500"
    },
    totalRow: {
        marginTop: SIZES.fifteen,
        flexDirection: "row",
        justifyContent: "space-between"
    }
})