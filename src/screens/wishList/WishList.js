import { Alert, FlatList, ScrollView, StyleSheet, Text, View, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { IMAGES, SIZES, STYLES } from '../../constants'
import ProductCard from '../../components/ProductCard'
import HeaderWithArrow from '../../components/HeaderWithArrow'

import { useDispatch, useSelector } from 'react-redux'
import { getTheme } from '../../constants/theme'
import { useTranslation } from 'react-i18next'
import { getFavProduct } from '../../redux/slices/products'
import { useFocusEffect } from '@react-navigation/native'
import { setLoading } from '../../redux/slices/utils'


export default function WishList() {
    const theme = useSelector(state => state.Theme.theme)
    const dispatch = useDispatch()
    const user = useSelector(state => state.Auth.user)
    const [products, setProducts] = useState([])
    const currentTheme = getTheme(theme)
    const { t } = useTranslation();

    const [refreshing, setRefreshing] = useState(false);
    const getProducts = async () => {
        try {
            if (user !== null) {

                dispatch(setLoading(true))
                const response = await dispatch(getFavProduct(user?.user_id))
                console.log(response?.products?.length)
                setProducts(response?.products)
                dispatch(setLoading(false))
            }

        } catch (error) {
            dispatch(setLoading(false))

        }
    }

    useFocusEffect(
        useCallback(() => {
            getProducts();
            return () => {
                // Cleanup function if needed
            };
        }, [])
    );

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        setTimeout(() => {

            getProducts();

            setRefreshing(false);
        }, 2000);
    }, []);

    const renderEmptyComponent = () => {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                {user === null ?
                    <Text style={{ color: currentTheme?.defaultTextColor, fontSize: SIZES.twenty, marginTop: SIZES.twenty }}>
                        {t("Please Login to see your WishList")}
                    </Text> : <Text style={{ color: currentTheme?.defaultTextColor, fontSize: SIZES.twenty, marginTop: SIZES.twenty }}>
                        {t('No Order found')}
                    </Text>
                }

            </View>
        )
    }
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
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                data={products || []}
                keyExtractor={item => item.id}
                numColumns={"2"}
                renderItem={({ item }) => {
                    return (
                        <ProductCard item={item} />
                    )
                }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                ListEmptyComponent={renderEmptyComponent}
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