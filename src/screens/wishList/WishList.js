import { Alert, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IMAGES, SIZES, STYLES } from '../../constants'
import ProductCard from '../../components/ProductCard'
import HeaderWithArrow from '../../components/HeaderWithArrow'

import { useDispatch, useSelector } from 'react-redux'
import { getTheme } from '../../constants/theme'
import { useTranslation } from 'react-i18next'
import { getFavProduct } from '../../redux/slices/products'
import { useFocusEffect } from '@react-navigation/native'


export default function WishList() {
    const theme = useSelector(state => state.Theme.theme)
    const dispatch = useDispatch()
    const user = useSelector(state => state.Auth.user)
    const [products, setProducts] = useState([])
    const currentTheme = getTheme(theme)
    const { t } = useTranslation();

    const getProducts = async () => {
        try {
            const response = await dispatch(getFavProduct(user?.user_id))
            setProducts(response?.products)
        } catch (error) {

        }
    }
    useFocusEffect(
        React.useCallback(() => {
            getProducts(); // Call your function to fetch products here
        }, [])
    );



    return (
        <View style={[STYLES.container, { backgroundColor: currentTheme.Background }]}>
            <HeaderWithArrow
                label={t('Wishlist')}
            />
            <FlatList
                columnWrapperStyle={{
                    marginTop: SIZES.ten,
                    justifyContent: "space-between",

                }}
                showsVerticalScrollIndicator={false}
                data={products || []}
                keyExtractor={item => item.id}
                numColumns={"2"}
                renderItem={({ item }) => {
                    return (
                        <ProductCard item={item} />
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