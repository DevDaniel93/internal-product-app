import { Alert, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IMAGES, SIZES, STYLES } from '../../constants'
import ProductCard from '../../components/ProductCard'
import HeaderWithArrow from '../../components/HeaderWithArrow'

import { useSelector } from 'react-redux'
import { getTheme } from '../../constants/theme'
import { useTranslation } from 'react-i18next'
import ProductCard1 from '../../components/ProductCard1'

export default function WishList() {
    const theme = useSelector(state => state.Theme.theme)
    const products = useSelector(state => state?.Product?.products)
    const currentTheme = getTheme(theme)
    const { t } = useTranslation();

    const favouriteProducts = (products) => {
        return products.favourite === true
    }
    const wishListedProducts = products.filter(favouriteProducts)

    return (
        <View style={[STYLES.container, { backgroundColor: currentTheme.Background }]}>
            <HeaderWithArrow
                label={t('Wishlist')}
            />

            <FlatList
                columnWrapperStyle={{
                    justifyContent: "space-between",
                    // paddingHorizontal: 10
                }}
                showsVerticalScrollIndicator={false}
                data={wishListedProducts || []}
                keyExtractor={item => item.id}
                numColumns={"2"}
                renderItem={({ item }) => {
                    return (
                        <ProductCard item={item} />
                        // <ProductCard1 item={item}/>
                    )
                }}
                ListFooterComponent={() => {
                    return (
                        <View style={{ height: SIZES.fifty * 1.5 }} />

                    )
                }}
            />

        </View>
    )
}

const styles = StyleSheet.create({})