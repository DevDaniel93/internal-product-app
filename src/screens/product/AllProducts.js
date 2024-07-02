
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { STYLES } from '../../constants'
import { useSelector } from 'react-redux'
import { SIZES, getTheme } from '../../constants/theme'
import { useTranslation } from 'react-i18next'
import HeaderWithArrow from '../../components/HeaderWithArrow'
import SearchFilter from '../../components/SearchFilter'
import FilterModal from '../../components/FilterModal'
import ProductCard from '../../components/ProductCard'

export default function AllProducts(props) {
    const { navigation, route } = props
    const modal = React.useRef(null)
    const products = useSelector(state => state?.Product?.products)
    // const { item } = route?.params
    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    const { t } = useTranslation();

    const [search, setSearch] = useState('')
    const [filterProducts, setFilterProducts] = useState(products)


    const onCancel = () => {
        if (modal.current) {
            modal.current.close();
        }
    }

    const onApply = () => {

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
    }, [search]);

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
                />
            </ScrollView>

            <FilterModal modalizeRef={modal} onApply={onApply} onCancel={onCancel} />
        </View>
    )
}

const styles = StyleSheet.create({})
