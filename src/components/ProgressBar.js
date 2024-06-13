import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon, { IconType } from './Icons'
import { COLORS } from '../constants'

const ProgressBar = (props) => {
    const { mode } = props
    return (
        <View style={styles.container}>
            <View style={styles.icon}>
                <Icon type={IconType.Feather} name={'package'} color={mode === 0 ? COLORS.black : COLORS.cyan} />
                <Text style={{ color: mode === 0 ? COLORS.defaultTextColor : COLORS.cyan }}>Shipping</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.icon}>
                <Icon type={IconType.MaterialCommunityIcons} name={'credit-card-check-outline'} color={mode === 0 ? null : mode === 1 ? COLORS.black : COLORS.cyan} />
                <Text style={{ color: mode === 0 ? null : mode === 1 ? COLORS.defaultTextColor : COLORS.cyan}}>Payment</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.icon}>
                <Icon type={IconType.Ionicons} name={'bag-check-outline'} color={mode === 0 || mode === 1 ? null : COLORS.black} />
                <Text style={{ color:mode === 0 || mode === 1 ? null : COLORS.defaultTextColor }}>Review</Text>
            </View>
        </View>
    )
}

export default ProgressBar

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        padding: 20
    },
    icon: {
        alignItems: "center"
    },
    line: {
        width: 60,
        height: 1,
        backgroundColor: COLORS.lightGray,
        alignSelf: "center"

    }
})