import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../constants'

export default function CustomButton(props) {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={[styles.btn, props.btnStyle]}>
            <Text style={[styles.txt, props.txtstyle]}>{props.label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        width: "100%",
        backgroundColor: COLORS.primary,
        padding: SIZES.fifteen,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: SIZES.twentyFive,
        marginTop: SIZES.ten
    },
    txt: {
        color: COLORS.white,
        fontWeight: "600",
        fontSize: SIZES.fifteen
    }
})