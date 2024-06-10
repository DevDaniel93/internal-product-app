import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ShadedBox from '../../components/ShadedBox'
import { COLORS, FONTFAMILY, SIZES, STYLES, width } from '../../constants'
import CustomButton from '../../components/CustomButton'
import OrderCard from '../../components/OrderCard'
import HeaderWithArrow from '../../components/HeaderWithArrow'

export default function MyOrder() {
    const data = {
        orderNumber: "15454",
        status: "pending",
        amount: "5120",
        quantity: "6"
    }
    return (
        <View style={STYLES.container}>
            <HeaderWithArrow label={"My Orders"} />
            <OrderCard data={data} />
            <OrderCard data={data} />
            <OrderCard data={data} />
            <OrderCard data={data} />

        </View>
    )
}

const styles = StyleSheet.create({


})