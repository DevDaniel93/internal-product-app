import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { COLORS, FONTFAMILY, IMAGES, SCREENS, SIZES, STYLES, height, width } from '../../constants'
import HeaderWithArrow from '../../components/HeaderWithArrow'
import { useDispatch, useSelector } from 'react-redux'
import { Icon, IconType } from '../../components'
import { removeCartItem, selectTotalAmount, updateCartItem } from '../../redux/slices/Cart'
import { useFocusEffect } from '@react-navigation/native'
import CustomButton from '../../components/CustomButton'
import CustomModal from '../../components/CustomModal'
import LottieView from 'lottie-react-native';
import { label } from '../../constants/lables'

export default function MyCart(props) {
    const { navigation } = props
    const cart = useSelector(state => state.Cart.cart)
    const dispatch = useDispatch()
    const [isvisible, setIsvisible] = useState(false)
    const [selectCartid, setSelectCardId] = useState()
    const [quantity, setQuantity] = useState(1)
    const [voucherCode, setVoucherCode] = useState("")
    const [shippingCost, setShippingCost] = useState(0)
    const totalAmount = useSelector(selectTotalAmount);

    // ================================Remove item Cart===============================
    const handleRemoveFromCart = (productId) => {
        dispatch(removeCartItem(productId));
    };

    useFocusEffect(
        useCallback(() => {


            return () => {
                // Cleanup function if needed
            };
        }, [])
    );
    // ================================Update Cart===============================
    const handleUpdateCartItem = (productId, newQuantity) => {
        const updatedItem = {
            id: productId,
            quantity: newQuantity,
            // Add any other updated fields here
        };

        // Dispatch the action to update the item in the cart
        dispatch(updateCartItem(updatedItem));

    };
    const VoucherApply = () => {
        return (
            <View style={styles.voucherContainer}>
                <TextInput
                    placeholderTextColor={COLORS.gray}
                    placeholder={label.EnterVoucherCode}
                />
                <CustomButton
                    btnStyle={{ backgroundColor: COLORS.primary, width: width * .3, justifyContent: "center", alignItems: "center", paddingVertical: SIZES.five + 2, borderRadius: SIZES.twentyFive, marginBottom: 10 }}
                    label={label.Apply}
                />
                {/* <TouchableOpacity style={{ backgroundColor: COLORS.primary, width: width * .3, justifyContent: "center", alignItems: "center", paddingVertical: SIZES.five + 2, borderRadius: SIZES.twentyFive }} >
                    <Text style={{ color: COLORS.white, }}>
                        Apply
                    </Text>
                </TouchableOpacity> */}
            </View>
        )
    }
    const CartItem = ({ item }) => {
        return (
            <View style={styles.CartItemRow}>
                <View style={{ flexDirection: "row" }}>
                    <Image source={{ uri: item?.image }} style={[styles.img, STYLES.shadow]} />
                    <View style={{ justifyContent: "space-around", margin: SIZES.twentyFive, }}>
                        <Text style={styles.productText}>
                            {item?.productName}
                        </Text>
                        <Text style={[styles.productText]}>
                            $ {item?.price}
                        </Text>
                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: SIZES.ten }}>
                            <TouchableOpacity style={styles.btn}
                                onPress={() => {
                                    if (item.quantity !== 1) {
                                        handleUpdateCartItem(item.id, item.quantity - 1)
                                    }
                                }}
                            >
                                <Icon
                                    name={"minus"}
                                    type={IconType.Entypo}
                                    color={COLORS.black}
                                />
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>
                                {item.quantity}
                            </Text>
                            <TouchableOpacity style={styles.btn}
                                onPress={() => handleUpdateCartItem(item.id, item.quantity + 1)}
                            >
                                <Icon
                                    name={"plus"}
                                    type={IconType.Entypo}
                                    color={COLORS.black}
                                />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        setIsvisible(!isvisible)
                        setSelectCardId(item?.id)
                    }}
                    style={{ backgroundColor: COLORS.primary, justifyContent: "center", paddingHorizontal: SIZES.ten, borderRadius: SIZES.ten }}>
                    <Icon
                        name="trash-outline"
                        type={IconType.Ionicons}
                        color={COLORS.white}
                    />
                </TouchableOpacity>
            </View>

        )
    }
    return (

        <View style={[STYLES.container,]}>
            <HeaderWithArrow
                label={label.MyCart} />
            <ScrollView showsVerticalScrollIndicator={false} style={{ flexGrow: 1 }}>


                <View>
                    <FlatList
                        data={cart}
                        keyExtractor={item => item.id}
                        renderItem={CartItem}
                    />
                </View>

                <View style={styles.estArea}>
                    <Text style={styles.estTime}>
                        {label.EstimatedTime7days}
                    </Text>
                </View>
                <Text style={styles.orderInfoText}>
                    {label.OrderInfo}
                </Text>
                <View style={styles.PricingRow}>
                    <Text style={styles.PricingTxt}>
                        {label.SubTotal}
                    </Text>
                    <Text style={styles.PricingTxt}>
                        $ {Number(totalAmount).toFixed(2)}
                    </Text>
                </View>
                <View style={styles.PricingRow}>
                    <Text style={styles.PricingTxt}>
                        {label.ShippingCost}
                    </Text>
                    <Text style={styles.PricingTxt}>
                        $ {shippingCost}
                    </Text>
                </View>
                <View style={styles.PricingRow}>
                    <Text style={styles.orderInfoText}>
                        {label.Total}
                    </Text>
                    <Text style={styles.orderInfoText}>
                        {Number(shippingCost + totalAmount).toFixed(2)}
                    </Text>
                </View>
                <VoucherApply />
                <CustomButton
                    btnStyle={styles.btnCheckOut}
                    onPress={() => {
                        navigation.navigate(SCREENS.checkOut)
                    }}
                    label={label.Checkout}
                />

                {/* =======================================delete Modal========================== */}
                <CustomModal isvisible={isvisible}>
                    <Text style={styles.modelText}>
                        {label.AreYourSureYouWantToRemoveTheProductFromCart}
                    </Text>
                    <LottieView
                        style={styles.lottie}
                        autoPlay={true}
                        loop={true}
                        source={{ uri: "https://lottie.host/cad44c0a-42df-41d3-b2a7-0315b6755a1d/4hxYp1Ue6b.json" }}
                    />
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>


                        <CustomButton btnStyle={styles.btnStyle}
                            txtstyle={{ color: COLORS.primary }}
                            onPress={() => {
                                handleRemoveFromCart(selectCartid)
                                setIsvisible(!isvisible)
                            }}
                            label={label.Yes} />
                        <CustomButton btnStyle={styles.btnStyle1}
                            label={label.No}
                            onPress={() => {
                                setIsvisible(!isvisible)
                            }}
                        />
                    </View>

                </CustomModal>

                <View style={{ height: SIZES.fifty * 1.5 }} />
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({

    CartItemRow: {
        flexDirection: "row",
        paddingVertical: SIZES.ten,
        borderBottomWidth: 1,
        justifyContent: "space-between"
    },
    img: {
        width: width * .22,
        height: height * .14,

        borderRadius: SIZES.five,
        resizeMode: "contain"
    },
    productText: {
        fontSize: SIZES.twenty - 3,
        color: COLORS.defaultTextColor,
        fontFamily: FONTFAMILY.Poppins,
        fontWeight: "600"
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
        fontWeight: "600"
    },
    btnCheckOut: {
        marginBottom: SIZES.twenty,
    },
    estTime: {
        color: COLORS.white
    },

    estArea: {
        backgroundColor: COLORS.primary,
        padding: SIZES.five,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: SIZES.ten,
        marginVertical: SIZES.ten
    },
    orderInfoText: {
        color: COLORS.defaultTextColor,
        fontSize: SIZES.twenty,
        fontWeight: "600"
    },
    PricingRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: SIZES.ten,
        color: COLORS.black
    },
    PricingTxt: {
        color: COLORS.defaultTextColor,
        fontSize: SIZES.fifteen,
        fontWeight: "500",
        fontFamily: FONTFAMILY.Poppins
    },
    voucherContainer: {
        marginTop: SIZES.ten,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: SIZES.twentyFive,
        paddingHorizontal: SIZES.ten
    },
    btnStyle: {
        width: "48%",
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.primary,
        padding: SIZES.ten

    },
    btnStyle1: {
        padding: SIZES.ten,
        width: "48%"
    },
    modelText: {
        color: COLORS.defaultTextColor,
        fontSize: SIZES.fifteen + 2,
        textAlign: "center",
        lineHeight: 30,
        fontWeight: "500",
        fontFamily: FONTFAMILY.Poppins
    },
    lottie: {
        width: SIZES.fifty * 3,
        height: SIZES.fifty * 3,
        alignSelf: "center"
    }
})