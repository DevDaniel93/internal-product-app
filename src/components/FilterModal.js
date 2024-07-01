import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Slider from 'react-native-slider';
import { useDispatch, useSelector } from 'react-redux';
import { Modalize } from 'react-native-modalize';
import { COLORS, FONTS, height, SIZES } from '../constants';
import Icon, { IconType } from './Icons';
import CustomButton from './CustomButton';
import { getTheme, IMAGES } from '../constants/theme';
import { useTranslation } from 'react-i18next';
import Categories from './Categories';
import { getProducts } from '../redux/slices/products';
import { setLoading } from '../redux/slices/utils';
import { Getproducts } from '../redux/service/products.service';


export default function FilterModal(props) {
    const { modalizeRef, onApply, onCancel } = props;
    const dispatch = useDispatch()
    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    const { t } = useTranslation();
    const categories = useSelector(state => state?.categories?.categories)



    const Brands = [{ title: 'Puma' }, { title: 'Adidas' }];
    const sizes = [{ title: 'S' }, { title: 'M' }, { title: 'L' }, { title: 'XL' }];
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
    const [minprice, setMinPrice] = useState(1);
    const [maxprice, setMaxPrice] = useState(1);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);

    const onReset = () => {
        setMaxPrice(1);
        setMinPrice(1);
        setSelectedSize(null);
        setSelectedCategory(null);
        setSelectedBrand(null);
    };

    const checkDisabled = () => {
        if ((minprice < maxprice) || selectedCategory !== null || selectedBrand !== null) {
            return false;
        } else {
            return true;
        }
    };

    const RenderHeader = () => (
        <View style={styles.headerStyle}>
            <View style={{ flex: 0.2 }}>
                <Icon
                    name="x"
                    type={IconType.Octicons}
                    onPress={onCancel}
                    style={{
                        color: currentTheme.defaultTextColor,
                        fontSize: SIZES.twentyFive * 1.1,
                    }}
                />
            </View>

            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={[FONTS.boldFont22, { color: currentTheme.defaultTextColor }]}>Filter</Text>
            </View>

            <TouchableOpacity
                onPress={onReset}
                style={{ flex: 0.2, alignItems: 'flex-end' }}>
                <Text style={[FONTS.mediumFont14, { color: currentTheme.defaultTextColor }]}>Reset</Text>
            </TouchableOpacity>
        </View>
    );

    const RenderItem = ({ title, onPress, selected }) => (
        <TouchableOpacity
            style={selected?.title === title ? styles.itemStyle1 : styles.itemStyle2}
            onPress={onPress}>
            <Text
                style={[
                    FONTS.mediumFont16,
                    { color: selected?.title === title ? COLORS.white : COLORS.gray },
                ]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
    const getPro = async (id) => {
        try {
            dispatch(setLoading(true))
            const params = {
                category: selectedCategory,
                min_price: minprice !== 1 && minprice,
                max_price: maxprice !== 1 & maxprice
            }
            await dispatch(Getproducts(params))
            dispatch(setLoading(false))

        } catch (error) {
            dispatch(setLoading(false))

            console.log("error when try to get product by category")
        }
    }

    return (
        <Modalize
            ref={modalizeRef}
            withHandle={false}
            modalHeight={height * 0.7}
            modalStyle={[styles.modalStyle, { backgroundColor: currentTheme.Background }]}
            HeaderComponent={<RenderHeader />}
            scrollViewProps={{ showsVerticalScrollIndicator: false }}>

            <View style={{ marginTop: SIZES.twentyFive }}>
                <Text style={[FONTS.mediumFont18, { color: currentTheme.defaultTextColor }]}>{t("Minimum Price")}</Text>
                <Slider
                    step={1}
                    value={minprice}
                    minimumValue={1}
                    maximumValue={10000}
                    trackStyle={{ height: 2.5 }}
                    thumbTintColor={COLORS.primary}
                    maximumTrackTintColor={currentTheme.defaultTextColor}
                    minimumTrackTintColor={COLORS.primary}
                    onValueChange={val => setMinPrice(val)}
                    style={styles.sliderStyle}
                />
                <View style={styles.flexRow}>
                    <Text style={[FONTS.mediumFont12, { color: currentTheme.defaultTextColor }]}>
                        ${minprice}
                    </Text>
                    <Text style={[FONTS.mediumFont12, { color: currentTheme.defaultTextColor }]}>
                        $10,000
                    </Text>
                </View>
            </View>
            <View style={{ marginTop: SIZES.twentyFive }}>
                <Text style={[FONTS.mediumFont18, { color: currentTheme.defaultTextColor }]}>{t("Maximum Price")}</Text>
                <Slider
                    step={1}
                    value={maxprice}
                    minimumValue={1}
                    maximumValue={10000}
                    trackStyle={{ height: 2.5 }}
                    thumbTintColor={COLORS.primary}
                    maximumTrackTintColor={currentTheme.defaultTextColor}
                    minimumTrackTintColor={COLORS.primary}
                    onValueChange={val => setMaxPrice(val)}
                    style={styles.sliderStyle}
                />
                <View style={styles.flexRow}>
                    <Text style={[FONTS.mediumFont12, { color: currentTheme.defaultTextColor }]}>
                        ${maxprice}
                    </Text>
                    <Text style={[FONTS.mediumFont12, { color: currentTheme.defaultTextColor }]}>
                        $10,000
                    </Text>
                </View>
            </View>
            <Categories hide={true} data={categoriesData} onPress={(item) => {
                setSelectedCategory(item?.id)
            }} />

            <View style={{}}>
                <Text style={[FONTS.mediumFont18, { color: currentTheme.defaultTextColor }]}>Brand</Text>
                <View style={styles.itemsContainer}>
                    {Brands?.map((item, index) => (
                        <View key={index}>
                            <RenderItem
                                title={item.title}
                                selected={selectedBrand}
                                onPress={() => setSelectedBrand(item)}
                            />
                        </View>
                    ))}
                </View>
            </View>

            <CustomButton
                label="Apply"
                onPress={() => {
                    onCancel();
                    getPro()
                    onReset();
                }}
                btnStyle={styles.btnStyle}
                disabled={checkDisabled()}
            />
            <View style={{ height: height * .13 }} />

        </Modalize>
    );
}

const styles = StyleSheet.create({
    modalStyle: {
        paddingVertical: SIZES.twenty,
        paddingHorizontal: SIZES.twenty,
        borderTopLeftRadius: SIZES.twentyFive,
        borderTopRightRadius: SIZES.twentyFive,

    },
    headerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    sliderStyle: {
        width: '100%',
        marginTop: SIZES.ten,
    },
    itemsContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SIZES.twenty,
    },
    itemStyle1: {
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: COLORS.primary,
        borderRadius: SIZES.fifteen,
        paddingVertical: SIZES.fifteen,
        paddingHorizontal: SIZES.twenty,
        backgroundColor: COLORS.primary,
        marginRight: SIZES.twentyFive,
        marginBottom: SIZES.twentyFive,
    },
    itemStyle2: {
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: COLORS.gray,
        borderRadius: SIZES.fifteen,
        paddingVertical: SIZES.fifteen,
        paddingHorizontal: SIZES.twenty,
        backgroundColor: COLORS.white,
        marginRight: SIZES.twentyFive,
        marginBottom: SIZES.twentyFive,
    },

});

