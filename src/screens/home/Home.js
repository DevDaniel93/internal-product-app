import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { IMAGES, SIZES, STYLES, height } from '../../constants'
import ProductCard from '../../components/ProductCard'
import CustomHeader from '../../components/CustomHeader'
import BannerSlider from '../../components/BannerSlider'
import Categories from '../../components/Categories'
import DrawerSceneWrapper from '../../components/DrawerSceneWrapper'
import SearchFilter from '../../components/SearchFilter'
import { useDispatch, useSelector } from 'react-redux'
import { SCREENS, getTheme } from '../../constants/theme'
import { useTranslation } from 'react-i18next'
import FilterModal from '../../components/FilterModal'
import { useFocusEffect } from '@react-navigation/native'
import { getProducts } from '../../redux/slices/products'
import { setLoading } from '../../redux/slices/utils'



export default function Home(props) {
    const { navigation } = props
    const modal = React.useRef(null)
    const theme = useSelector(state => state.Theme.theme)
    // const loading = useSelector(state => state.utils.loading)

    const filterProducts = useSelector(state => state?.Product?.filterProduct)
    const allProducts = useSelector(state => state?.Product?.products)
    // console.log("checking settings", useSelector(state => state?.Settings?.settings))
    // console.log("checking Loop" )
    const [products, setProducts] = useState(useSelector(state => state?.Product?.products))
    const categories = useSelector(state => state?.categories?.categories)
    const dispatch = useDispatch()
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const currentTheme = getTheme(theme)
    const { t } = useTranslation();



    const onCancel = () => {
        if (modal.current) {
            modal.current.close();
        }
    }
    const onApply = () => {
        console.log({filterProducts})
        setProducts(filterProducts)
    }
    const getProduct = async () => {
        try {
            setLoading(true)
            // await dispatch(setLoading(true))
            await dispatch(getProducts(page))
            setPage(pre => pre + 1)
            setLoading(false)

            // await dispatch(setLoading(false))
        } catch (error) {

        }
    }
    // useFocusEffect(
    //     useCallback(async () => {
    //         getProduct()
    //         return () => {
    //             // Cleanup function if needed
    //         };
    //     }, [])
    // );
    // useFocusEffect(
    //     useCallback(() => {
    //         const fetchProducts = async () => {
    //             try {
    //                 dispatch(setLoading(true));
    //                 await dispatch(getProducts());
    //                 dispatch(setLoading(false));
    //             } catch (error) {
    //                 console.error('Error fetching products:', error);
    //                 dispatch(setLoading(false));
    //             }
    //         };

    //         fetchProducts();

    //         return () => {
    //             // Cleanup function if needed
    //         };
    //     }, [dispatch, products]) // Only re-run effect if 'products' changes
    // );


    return (

        <View style={[STYLES.container, { backgroundColor: currentTheme.Background }]}>
            <CustomHeader />


            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <SearchFilter
                    onPress={() => {
                        if (modal.current) {
                            modal.current.open();
                        }
                    }}
                />
                <BannerSlider />
                <Categories data={categories} onPress={(item) => {
                    navigation.navigate(SCREENS.AllProduct, { item: item?.id })
                }} />
                <FlatList
                    columnWrapperStyle={{
                        justifyContent: "space-between",

                    }}
                    showsVerticalScrollIndicator={false}
                    data={allProducts}
                    numColumns={"2"}
                    renderItem={({ item }) => {
                        return (
                            <ProductCard item={item} />
                        )
                    }}
                    // onEndReachedThreshold={0.1}
                    // onEndReached={() => {
                    //     if (!loading) {
                    //         getProduct();
                    //     }
                    // }}
                    // ListFooterComponent={() => (
                    //     // Loading indicator at the bottom of the list
                    //     loading && <ActivityIndicator size="large" color={currentTheme.primary} style={{ marginVertical: 20 }} />
                    // )}
                />

                <View style={{ height: SIZES.fifty * 1.5 }} />
            </ScrollView>
            <FilterModal modalizeRef={modal} onApply={onApply} onCancel={onCancel} />
        </View>


    )
}

const styles = StyleSheet.create({

})
