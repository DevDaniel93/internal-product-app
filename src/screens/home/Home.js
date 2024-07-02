import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { IMAGES, SIZES, STYLES, height } from '../../constants'
import ProductCard from '../../components/ProductCard'
import CustomHeader from '../../components/CustomHeader'
import BannerSlider from '../../components/BannerSlider'
import Categories from '../../components/Categories'
import DrawerSceneWrapper from '../../components/DrawerSceneWrapper'
import SearchFilter from '../../components/SearchFilter'
import { useSelector } from 'react-redux'
import { SCREENS, getTheme } from '../../constants/theme'
import { useTranslation } from 'react-i18next'
import ProductCard1 from '../../components/ProductCard1'
import FilterModal from '../../components/FilterModal'
import { ErrorAlert, SuccessAlert } from '../../utils/utils'


export default function Home(props) {
    const { navigation } = props
    const modal = React.useRef(null)
    const theme = useSelector(state => state.Theme.theme)
    const products = useSelector(state => state?.Product?.products)
    const categories = useSelector(state => state?.categories?.categories)

    const currentTheme = getTheme(theme)
    const { t } = useTranslation();

    const images = [
        IMAGES.DummyBanner.banner1,
        IMAGES.DummyBanner.banner2,
        IMAGES.DummyBanner.banner3,
    ];
    const categoriesData = [
        {
            id: 1,
            image: IMAGES.DummyCategories.cat1,
            name: "Grocery"
        },
        {
            id: 2,
            image: IMAGES.DummyCategories.cat2,
            name: "Fashion"
        },
        {
            id: 3,
            image: IMAGES.DummyCategories.cat3,
            name: "Cosmetics"
        },
        {
            id: 4,
            image: IMAGES.DummyCategories.cat4,
            name: "Electronics"
        },
        {
            id: 5,
            image: IMAGES.DummyCategories.cat1,
            name: "Grocery"
        },
        {
            id: 6,
            image: IMAGES.DummyCategories.cat2,
            name: "Fashion"
        },
    ]

    const onCancel = () => {
        if (modal.current) {
            modal.current.close();
        }
    }
    const onApply = () => {

    }

    return (

        <View style={[STYLES.container, { backgroundColor: currentTheme.Background }]}>
            <CustomHeader />


            <ScrollView
                // style={STYLES.container}
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
                    navigation.navigate(SCREENS.AllProduct, { item: item })
                }} />
                <FlatList

                    columnWrapperStyle={{
                        justifyContent: "space-between",
                        // paddingHorizontal: 10
                    }}
                    showsVerticalScrollIndicator={false}
                    data={products}
                    keyExtractor={item => item.id}
                    numColumns={"2"}
                    renderItem={({ item }) => {
                        return (
                            <ProductCard item={item} />
                            // <ProductCard1 item={item} />
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