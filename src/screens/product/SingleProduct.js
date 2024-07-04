import { Alert, FlatList, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, FONTFAMILY, SCREENS, SIZES, STYLES, height } from '../../constants'
import { Icon, IconType } from '../../components'
import Reviews from '../../components/Reviews'

import Stars from 'react-native-stars';
import CustomButton from '../../components/CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import { addCart, emptyCart } from '../../redux/slices/Cart'
import CustomModal from '../../components/CustomModal'
import { getTheme, width } from '../../constants/theme'
import { useTranslation } from 'react-i18next'
import RenderHtml from 'react-native-render-html';

export default function SingleProduct(props) {
    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    const { t } = useTranslation();
    const { navigation, route } = props
    const { productDetails } = route?.params
    const [quantity, setQuantity] = useState(1)
    const [isvisible, setIsvisible] = useState(false)

    const dispatch = useDispatch()
    const [selectedAttributes, setSelectedAttributes] = useState([]);
    const cart = useSelector(state => state.Cart.cart)


    const Header = () => {
        return (
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                    style={[styles.IconContainer, STYLES.shadow]}>
                    <Icon
                        name={"chevron-back"}
                        size={SIZES.twenty}
                        type={IconType.Ionicons}
                        color={COLORS.black}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                    style={[styles.IconContainer, STYLES.shadow, { left: 290 }]}>
                    <Icon
                        name={"heart"}
                        size={SIZES.twenty}
                        type={IconType.Ionicons}
                        color={COLORS.red}
                    />
                </TouchableOpacity>
            </View>
        )
    }
    const toggleAttributeSelection = (val, item) => {
        setSelectedAttributes([{
            ...val,
            options: [item]
        }]);
    };

    const isAttributeSelected = (attributeName, optionToCheck) => {
        const attribute = selectedAttributes.find(attr => attr.name === attributeName);
        return attribute ? attribute.options.includes(optionToCheck) : false;
    }

    const addToCart = async () => {
        try {
            if (productDetails.type === 'simple') {
                const data = {
                    id: productDetails?.id,
                    productName: productDetails?.name,
                    quantity: quantity,
                    price: productDetails?.price,
                    image: productDetails?.images[0]?.src,
                }
                navigation.navigate(SCREENS.MyCart)
                dispatch(addCart(data))
            }
            else if (productDetails.type === 'variable' && selectedAttributes.length != []) {
                const data = {
                    id: productDetails?.id,
                    productName: productDetails?.name,
                    quantity: quantity,
                    price: productDetails?.price,
                    image: productDetails?.images[0]?.src,
                    attributes: selectedAttributes,
                }
                navigation.navigate(SCREENS.MyCart)
                dispatch(addCart(data))
            }
            else {
                setIsvisible(!isvisible)
            }
        } catch (error) {
            console.log("error", error)
        }
    }
    const HandleQuantity = () => {
        if (productDetails?.manage_stock && productDetails?.stock_quantity > 0) {
            if (quantity !== productDetails?.stock_quantity) {
                setQuantity(pre => pre + 1)
            }
        }
        else {
            setQuantity(pre => pre + 1)
        }
    }
    const imagesSlider = ({ item }) => {
        return (
            <ImageBackground
                resizeMode='contain'
                style={styles?.imgContainer}
                source={{ uri: item.src }}>
            </ImageBackground>
        )
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={[styles.container, { backgroundColor: currentTheme.Background }]}>
            <View>
                <Header />
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    pagingEnabled
                    data={productDetails?.images}
                    renderItem={imagesSlider}
                />

            </View>
            <View style={styles.innerContainer}>
                <View style={[styles.row, { marginTop: SIZES.twenty }]}>
                    <View>
                        <Text style={[styles.productTitle, { color: currentTheme.defaultTextColor, }]}>
                            {productDetails?.name}
                        </Text>
                        <View style={{ flexDirection: "row", alignItems: "center", marginVertical: SIZES.five }}>

                            <Stars
                                display={productDetails?.average_rating}
                                spacing={1}
                                count={5}
                                starSize={SIZES.ten}
                                disabled={true}
                                fullStar={<Icon name={'star'} type={IconType.MaterialCommunityIcons} color={COLORS.golden} />}
                                emptyStar={<Icon name={'star-outline'} type={IconType.MaterialCommunityIcons} color={COLORS.golden} />}
                                halfStar={<Icon name={'star-half'} type={IconType.MaterialCommunityIcons} color={COLORS.golden} />}
                            />
                            <Text style={[styles.ratText, { color: currentTheme.defaultTextColor, }]}>
                                {" "}{productDetails?.rating}{" "}
                                <Text style={{ color: COLORS.primary }}>
                                    ({productDetails?.average_rating} {t('reviews')})
                                </Text>
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity style={[styles.btn, { borderColor: currentTheme.defaultTextColor }]}
                            onPress={() => {
                                if (quantity !== 0) {

                                    setQuantity(pre => pre - 1)
                                }
                            }}
                        >
                            <Icon
                                name={"minus"}
                                type={IconType.Entypo}
                                color={currentTheme.defaultTextColor}
                            />
                        </TouchableOpacity>
                        <Text style={[styles.quantityText, { color: currentTheme.defaultTextColor }]}>
                            {quantity}
                        </Text>
                        <TouchableOpacity style={[styles.btn, { borderColor: currentTheme.defaultTextColor }]}
                            onPress={() => {


                                HandleQuantity()


                            }}>
                            <Icon
                                name={"plus"}
                                type={IconType.Entypo}
                                color={currentTheme.defaultTextColor}
                            />
                        </TouchableOpacity>
                    </View>

                </View>
                <RenderHtml
                    contentWidth={width * 0.5}
                    source={{
                        html: `
                        <div class="text-black">
                          ${productDetails?.description}
                        </div>
                      `
                    }}
                    tagsStyles={{
                        div: {
                            color: 'black'
                        },
                        p: {
                            color: 'black'
                        },
                        span: {
                            color: 'black'
                        }
                    }}
                    classesStyles={{
                        'text-black': {
                            color: 'black'
                        }
                    }}
                    renderersProps={{
                        div: {
                            style: { color: 'black' }
                        },
                        p: {
                            style: { color: 'black' }
                        },
                        span: {
                            style: { color: 'black' }
                        }
                    }}
                />
                {/* <Text style={[styles.ProductDetails, { color: currentTheme.defaultTextColor, }]}>
                    {productDetails?.description.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()}

                </Text> */}

                {productDetails?.attributes?.length &&
                    <ScrollView style={{ marginVertical: SIZES.ten }}>
                        {productDetails?.attributes.map((val) => (
                            <View>
                                <Text style={[styles.attributesTitle, { color: currentTheme.defaultTextColor, }]}>{t('Choose')} {val?.name}</Text>
                                <ScrollView horizontal>
                                    {(val?.options || []).map((item) => (
                                        <TouchableOpacity
                                            onPress={() => {
                                                toggleAttributeSelection(val, item)
                                            }}
                                            style={[styles.Obj,
                                            { backgroundColor: isAttributeSelected(val?.name, item) ? currentTheme.primary : currentTheme.Background, borderColor: currentTheme.defaultTextColor }
                                            ]}>
                                            <Text
                                                style={{ color: isAttributeSelected(val?.name, item) ? COLORS.white : currentTheme.defaultTextColor }}
                                            >{item}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>

                            </View>
                        ))}
                    </ScrollView>
                }
                <CustomButton
                    disabled={productDetails?.manage_stock === true && productDetails?.stock_quantity ? true : false}
                    onPress={() => {
                        addToCart()
                    }}
                    label={
                        (productDetails?.manage_stock === true && productDetails?.stock_quantity < 0) ?
                            t('OutOfStock') + " | $ " + Number(quantity * productDetails?.price).toFixed(2)
                            :
                            t('AddToCart') + " | $ " + Number(quantity * productDetails?.price).toFixed(2)}
                />
                <Reviews id={productDetails?.id} />
            </View>
            <CustomModal
                isvisible={isvisible}
            >
                <TouchableOpacity
                    onPress={() => setIsvisible(!isvisible)}
                    style={{ padding: SIZES.five, backgroundColor: COLORS.primary, borderRadius: SIZES.fifty, alignSelf: "flex-end" }}>
                    <Icon
                        name={"cross"}
                        type={IconType.Entypo}
                        color={COLORS.white}
                    />
                </TouchableOpacity>
                <Text style={styles.modalText}>
                    {t('SelectProductSize')}
                </Text>
            </CustomModal>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: SIZES.twentyFive
    },
    IconContainer: {
        backgroundColor: COLORS.white,
        padding: SIZES.five,
        borderRadius: SIZES.fifty,
        marginHorizontal: SIZES.ten
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: SIZES.ten,
        alignItems: "center",
        marginHorizontal: SIZES.five,
        position: 'absolute',
        zIndex: 1000
    },
    imgContainer: {
        height: height * .5,
        width: width,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        backgroundColor: COLORS.white,
        borderColor: COLORS.black,
        borderBottomLeftRadius: SIZES.twenty,
        borderBottomRightRadius: SIZES.twenty,
    },
    innerContainer: {
        paddingHorizontal: SIZES.fifteen,
    },
    productTitle: {
        width: width * .6,
        fontSize: SIZES.fifteen
    },
    row: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center"
    },
    ratText: {
        fontSize: SIZES.fifteen
    },
    btn: {
        padding: SIZES.five,
        borderRadius: SIZES.fifty,
        borderWidth: .5
    },
    quantityText: {
        color: COLORS.defaultTextColor,
        fontSize: SIZES.twenty,
        marginHorizontal: SIZES.ten,
        fontWeight: "bold"
    },
    ProductDetails: {

        fontSize: SIZES.fifteen,
        paddingBottom: SIZES.fifteen,
        fontFamily: FONTFAMILY.Poppins,
        borderBottomWidth: 1
    },
    attributesTitle: {

        fontSize: SIZES.fifteen + 3,
        fontWeight: "600"
    },
    Obj: {
        marginVertical: SIZES.ten,
        paddingVertical: SIZES.ten,
        paddingHorizontal: SIZES.fifteen,
        marginRight: SIZES.ten,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: SIZES.fifty,
        borderWidth: 1
    },
    modalText: {
        color: COLORS.defaultTextColor,
        alignSelf: "center",
        marginVertical: SIZES.twentyFive,
        fontSize: SIZES.fifteen + 2,
        fontWeight: "600"
    }
})