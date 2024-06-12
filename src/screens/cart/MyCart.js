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
                    placeholder='Enter Voucher Code'
                />
                <TouchableOpacity style={{ backgroundColor: COLORS.primary, width: width * .3, justifyContent: "center", alignItems: "center", paddingVertical: SIZES.five + 2, borderRadius: SIZES.twentyFive }} >
                    <Text style={{ color: COLORS.white, }}>
                        Apply
                    </Text>
                </TouchableOpacity>
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

        <View style={[STYLES.container, styles.container]}>
            <HeaderWithArrow
                label="My Cart" />
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
                        Estimated time: 7 working days
                    </Text>
                </View>
                <Text style={styles.orderInfoText}>
                    Order Info
                </Text>
                <View style={styles.PricingRow}>
                    <Text style={styles.PricingTxt}>
                        subTotal
                    </Text>
                    <Text style={styles.PricingTxt}>
                        $ {Number(totalAmount).toFixed(2)}
                    </Text>
                </View>
                <View style={styles.PricingRow}>
                    <Text style={styles.PricingTxt}>
                        Shipping cost
                    </Text>
                    <Text style={styles.PricingTxt}>
                        $ {shippingCost}
                    </Text>
                </View>
                <View style={styles.PricingRow}>
                    <Text style={styles.orderInfoText}>
                        Total
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
                    label={"Checkout"}
                />

                {/* =======================================delete Modal========================== */}
                <CustomModal isvisible={isvisible}>
                    <Text style={styles.modelText}>
                        Are you sure you want to remove product from the cart?
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
                            label={"Yes"} />
                        <CustomButton btnStyle={styles.btnStyle1}
                            label={"No"}
                            onPress={() => {
                                setIsvisible(!isvisible)
                            }}
                        />
                    </View>

                </CustomModal>


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
        color: COLORS.black,
        fontFamily: FONTFAMILY.Poppins,
        fontWeight: "600"
    },
    btn: {
        padding: SIZES.five,
        borderRadius: SIZES.fifty,
        borderWidth: .5
    },
    quantityText: {

        color: COLORS.black,
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
        color: COLORS.black,
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
        color: COLORS.black,
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
        color: COLORS.black,
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