import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { COLORS, FONTFAMILY, IMAGES, SCREENS, SIZES, STYLES, height, width } from '../../constants'
import HeaderWithArrow from '../../components/HeaderWithArrow'
import { useDispatch, useSelector } from 'react-redux'
import { Icon, IconType } from '../../components'
import { removeCartItem, selectTotalAmount, updateCartItem } from '../../redux/slices/Cart'
import { useFocusEffect } from '@react-navigation/native'
import CustomButton from '../../components/CustomButton'

export default function MyCart(props) {
    const { navigation } = props
    const cart = useSelector(state => state.Cart.cart)
    const dispatch = useDispatch()
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
                        handleRemoveFromCart(item?.id)
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
        <View style={STYLES.container}>
            <HeaderWithArrow
                label="My Cart" />
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
                <Text>
                    subTotal
                </Text>
                <Text>
                    $ {Number(totalAmount).toFixed(2)}
                </Text>
            </View>
            <View style={styles.PricingRow}>
                <Text>
                    Shipping cost
                </Text>
                <Text>
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
                onPress={() => {
                    navigation.navigate(SCREENS.checkOut)
                }}
                label={"Checkout"}
            />

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
        COLORS: COLORS.black,
        fontSize: SIZES.twenty,
        fontWeight: "600"
    },
    PricingRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: SIZES.ten
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
    }
})