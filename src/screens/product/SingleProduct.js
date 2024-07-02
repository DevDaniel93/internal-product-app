import { Alert, FlatList, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, FONTFAMILY, SCREENS, SIZES, STYLES, height } from '../../constants'
import { Icon, IconType } from '../../components'
import Reviews from '../../components/Reviews'
import CustomButton from '../../components/CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import { addCart, emptyCart } from '../../redux/slices/Cart'
import CustomModal from '../../components/CustomModal'
import { getTheme, width } from '../../constants/theme'
import { useTranslation } from 'react-i18next'

export default function SingleProduct(props) {
    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    const { t } = useTranslation();

    const { navigation, route } = props
    const { productDetails } = route?.params
    console.log("productDetails", productDetails?.id)
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
                    style={[styles.IconContainer, STYLES.shadow]}>
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
    const toggleAttributeSelection = (key, value) => {
        setSelectedAttributes({
            ...selectedAttributes,
            [key]: value
        });
    };
    const isAttributeSelected = (key, value) => {
        return selectedAttributes[key] === value;
    };

    const addToCart = async () => {
        try {

            if (selectedAttributes.length != []) {
                const data = {
                    id: productDetails?.productId,
                    productName: productDetails?.title,
                    quantity: quantity,
                    price: productDetails?.price,
                    image: productDetails?.image,
                    attributes: selectedAttributes
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

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={[styles.container, { backgroundColor: currentTheme.Background }]}>
            <ImageBackground
                resizeMode='contain'
                style={styles?.imgContainer}
                source={{ uri: productDetails?.image }}>
                <Header />
            </ImageBackground>
            <View style={styles.innerContainer}>
                <View style={[styles.row, { marginTop: SIZES.twenty }]}>
                    <View>
                        <Text ellipsizeMode='tail' numberOfLines={1} style={[styles.productTitle, { color: currentTheme.defaultTextColor, }]}>
                            {productDetails?.name}
                        </Text>
                        <View style={{ flexDirection: "row", alignItems: "center", marginVertical: SIZES.five }}>
                            <Icon
                                name={'star'}
                                type={IconType.MaterialCommunityIcons}
                                color={COLORS.golden}
                            />
                            <Text style={[styles.ratText, { color: currentTheme.defaultTextColor, }]}>
                                {" "}{productDetails?.rating} {" "}
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

                                setQuantity(pre => pre + 1)

                            }}>
                            <Icon
                                name={"plus"}
                                type={IconType.Entypo}
                                color={currentTheme.defaultTextColor}
                            />
                        </TouchableOpacity>
                    </View>

                </View>
                <Text style={[styles.ProductDetails, { color: currentTheme.defaultTextColor, }]}>
                    {productDetails?.description}
                </Text>
                {productDetails?.attributes !== undefined &&
                    <ScrollView style={{ marginVertical: SIZES.ten }}>
                        {Object.keys(productDetails?.attributes).map((key, index) => (
                            <View key={index}>
                                <Text style={[styles.attributesTitle, { color: currentTheme.defaultTextColor, }]}>{t('Choose')} {key}</Text>
                                <ScrollView horizontal>
                                    {productDetails?.attributes[key].map((value, index) => (
                                        <TouchableOpacity
                                            onPress={() => toggleAttributeSelection(key, value)}
                                            style={[styles.Obj, { backgroundColor: isAttributeSelected(key, value) ? currentTheme.primary : currentTheme.Background, borderColor: currentTheme.defaultTextColor }]}>
                                            <Text key={index} style={{ color: isAttributeSelected(key, value) ? COLORS.white : currentTheme.defaultTextColor }}>{value}</Text>
                                        </TouchableOpacity>

                                    ))}
                                </ScrollView>
                            </View>
                        ))}
                    </ScrollView>
                }
                <CustomButton
                    onPress={() => {
                        addToCart()
                    }}
                    label={t('AddToCart') + " | $ " + Number(quantity * productDetails?.price).toFixed(2)}
                />
                <Reviews />
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
        marginHorizontal: SIZES.five
    },
    imgContainer: {
        height: height * .5,
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