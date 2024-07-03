import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback } from 'react'
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
    const products = useSelector(state => state?.Product?.products)
    const categories = useSelector(state => state?.categories?.categories)
    const dispatch = useDispatch()

    const currentTheme = getTheme(theme)
    const { t } = useTranslation();

    const images = [
        IMAGES.DummyBanner.banner1,
        IMAGES.DummyBanner.banner2,
        IMAGES.DummyBanner.banner3,
    ];


    const onCancel = () => {
        if (modal.current) {
            modal.current.close();
        }
    }
    const onApply = () => {

    }
    useFocusEffect(
        useCallback(async () => {
            await dispatch(setLoading(true))
            await dispatch(getProducts())
            await dispatch(setLoading(false))


            return () => {
                // Cleanup function if needed
            };
        }, [])
    );

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
                <BannerSlider images={images} />
                <Categories data={categories} onPress={(item) => {
                    navigation.navigate(SCREENS.AllProduct, { item: item?.id })
                }} />
                <FlatList
                    columnWrapperStyle={{
                        justifyContent: "space-between",

                    }}
                    showsVerticalScrollIndicator={false}
                    data={products}

                    numColumns={"2"}
                    renderItem={({ item }) => {

                        return (

                            <ProductCard item={item} />

                        )
                    }}
                />

                <View style={{ height: SIZES.fifty * 1.5 }} />
            </ScrollView>
            <FilterModal modalizeRef={modal} onApply={onApply} onCancel={onCancel} />
        </View>


    )
}

const styles = StyleSheet.create({

})
