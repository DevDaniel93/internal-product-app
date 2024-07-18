
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { STYLES } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { SIZES, getTheme } from '../../constants/theme'
import { useTranslation } from 'react-i18next'
import HeaderWithArrow from '../../components/HeaderWithArrow'
import SearchFilter from '../../components/SearchFilter'
import FilterModal from '../../components/FilterModal'
import ProductCard from '../../components/ProductCard'
import { getFilterProducts, getProducts } from '../../redux/slices/products'
import { setLoading } from '../../redux/slices/utils'
import { useFocusEffect } from '@react-navigation/native'

export default function AllProducts(props) {
    const { navigation, route } = props
    const modal = React.useRef(null)
    const dispatch = useDispatch()
    // const products = useSelector(state => state?.Product?.filterProduct)
    const { item } = route?.params
    
    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    const { t } = useTranslation();
    
    const [search, setSearch] = useState('')
    const [products, setProducts] = useState([])
    const [filterProducts, setFilterProducts] = useState(products)
    
    const onReset = () => {
        setHasMore(true)
        setProducts([])
        setPage(1)
        getProduct()
    }

    const onCancel = () => {
        if (modal.current) {
            modal.current.close();
        }
    }

    const onApply = (products) => {
        setProducts(products);
    }

    const getPro = async () => {
        try {
            dispatch(setLoading(true))
            const params = {
                ...(item !== null && { category: item }),

            }
            const page = 1
            const response = await dispatch(getFilterProducts(page, params))
            setProducts(response)
            dispatch(setLoading(false))

        } catch (error) {
            dispatch(setLoading(false))

            console.log("error when try to get product by category")
        }
    }

    const filterProductsBySearch = (searchText) => {
        if (searchText !== "") {
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilterProducts(filtered);
        } else {
            setFilterProducts(products);
        }
    }

    useEffect(() => {
        filterProductsBySearch(search);
    }, [search, products]);
    useEffect(() => {
        getPro()
    }, []);
    const renderEmptyComponent = () => {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: currentTheme?.defaultTextColor, fontSize: SIZES.twenty, marginTop: SIZES.twenty }}>
                    No Product found
                </Text>
            </View>
        )
    }
    return (
        <View style={[STYLES.container, { backgroundColor: currentTheme.Background }]}>
            <HeaderWithArrow label={t("Products")} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ marginTop: SIZES.fifteen }}>
                <SearchFilter
                    value={search}
                    onChangeText={(e) => {
                        setSearch(e);
                    }}
                    onPress={() => {
                        if (modal.current) {
                            modal.current.open();
                        }
                    }}
                />
                <FlatList
                    columnWrapperStyle={{
                        justifyContent: "space-between",
                    }}
                    showsVerticalScrollIndicator={false}
                    data={filterProducts}

                    keyExtractor={item => item.productId}
                    numColumns={"2"}
                    renderItem={({ item }) => {
                        return (
                            <ProductCard item={item} />
                        )
                    }}
                    ListEmptyComponent={renderEmptyComponent}
                />
            </ScrollView>

            <FilterModal modalizeRef={modal} onApply={onApply} onResetAll={onReset} onCancel={onCancel} />
        </View>
    )
}

const styles = StyleSheet.create({})
