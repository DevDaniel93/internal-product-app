import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, IMAGES, SIZES, STYLES, height, width } from '../../constants'
import ShadedBox from '../../components/ShadedBox'
import HeaderWithArrow from '../../components/HeaderWithArrow'
import { useSelector } from 'react-redux'
import { getTheme } from '../../constants/theme'
import { useTranslation } from 'react-i18next'

export default function OrderDetails() {
    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    const { t } = useTranslation();
    const data = [
        { key: t('FullName'), value: "John Doe" },
        { key: t('MobileNumber'), value: "+123-456-789" },
        { key: t('State'), value: "Dummy" },
        { key: t('City'), value: "Dummy" },
        { key: t('StreetAddress'), value: "XYZ Address" },
        { key: t('PostalCode'), value: "12345" },
    ]

    const renderItem = ({ item }) => (
        <View style={styles.rows}>
            <Text style={[styles.infoTxt, { color: currentTheme.gray, }]}>{item.key}</Text>
            <Text style={[styles.infoTxt, { color: currentTheme.gray, }]}>{item.value}</Text>
        </View>
    );

    const ProductList = () => {
        return (
            <View style={styles.ProductListRow}>
                <Image source={IMAGES.ProductImage} style={[styles.img, STYLES.shadow]} />
                <View style={{ justifyContent: "space-around", margin: SIZES.twentyFive, }}>
                    <Text style={[styles.productText, { color: currentTheme.defaultTextColor, }]}>
                        {t('IAmHim')}
                    </Text>
                    <Text style={[styles.productText, { color: currentTheme.defaultTextColor, }]}>
                        {t('Quantity')}: 1
                    </Text>
                    <Text style={[styles.productText, { fontWeight: "bold", color: currentTheme.primary }]}>
                        {t('UnitPrice')}: $20.00
                    </Text>

                </View>
            </View>
        )
    }
    return (
        <View style={[STYLES.container, { backgroundColor: currentTheme.Background }]}>
            <HeaderWithArrow
                label={t('OrderDetails')}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.row}>
                    <ShadedBox style={styles.box}>
                        <Text style={[styles.txt, { color: currentTheme.defaultTextColor, }]}>
                            {t('OrderNumber')}
                        </Text>
                        <Text style={[styles.txt, { color: currentTheme.defaultTextColor, }]}>
                            #45322
                        </Text>
                    </ShadedBox>
                    <ShadedBox style={styles.box}>
                        <Text style={[styles.txt, { color: currentTheme.defaultTextColor, }]}>
                            {t('OrderDate')}
                        </Text>
                        <Text style={[styles.txt, { color: currentTheme.defaultTextColor, }]}>
                            Jun 6, 2024
                        </Text>
                    </ShadedBox>
                </View>
                <ShadedBox style={styles.statusBox}>
                    <Text style={[styles.txt, { color: currentTheme.defaultTextColor, }]}>
                        {t('OrderStatus')}
                    </Text>
                    <Text style={[styles.txt, { color: currentTheme.defaultTextColor, }]}>
                        {t('Pending')}
                    </Text>
                </ShadedBox>
                <View style={styles.dotLine} />
                <Text style={[styles.heading, { color: currentTheme.defaultTextColor, }]}>
                    {t('ShippingDetails')}
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
                    <Text style={[styles.infoTxt, { color: currentTheme.gray }]}>

                        {t('Sub_Total')}

                    </Text>
                    <Text style={[styles.infoTxt, { color: currentTheme.gray }]}>
                        $25.27
                    </Text>
                </View>
                <View style={styles.totalRow}>
                    <Text style={[styles.infoTxt, { color: currentTheme.gray }]}>
                        {t('Sub_Total')}
                    </Text>
                    <Text style={[styles.infoTxt, { color: currentTheme.gray }]}>
                        $25.27
                    </Text>
                </View>
                <View style={[styles.totalRow, { marginBottom: SIZES.twenty }]}>
                    <Text style={[styles.infoTxt, { color: currentTheme.defaultTextColor, fontSize: SIZES.twenty, fontWeight: "bold" }]}>
                        {t('Total')}
                    </Text>
                    <Text style={[styles.infoTxt, { color: currentTheme.defaultTextColor, fontSize: SIZES.twenty, fontWeight: "bold" }]}>
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

        fontFamily: FONTFAMILY.Poppins,
        fontWeight: "500"
    },
    totalRow: {
        marginTop: SIZES.fifteen,
        flexDirection: "row",
        justifyContent: "space-between"
    }
})