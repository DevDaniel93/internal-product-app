import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES, STYLES } from '../constants'

export default function ShadedBox(props) {
    return (
        <View style={[styles.container, STYLES.shadow, props.style]}>
            {props?.children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: SIZES.fifteen,
        borderRadius: SIZES.ten,
        borderTopColor: COLORS.primary,
        borderTopWidth: 4,
        backgroundColor: COLORS.white,
        marginVertical: SIZES.ten,

    }
})