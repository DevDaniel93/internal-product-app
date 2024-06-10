import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon, { IconType } from './Icons'
import { COLORS, FONTFAMILY, SIZES, STYLES } from '../constants'
import { useNavigation } from '@react-navigation/native'

export default function HeaderWithArrow(props) {
    const navigation = useNavigation()
    return (
        <View style={styles.row}>
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack()
                }}
                style={[styles.IconContainer, STYLES.shadow]}>
                <Icon
                    name={"chevron-back"}
                    size={SIZES.twentyFive}
                    type={IconType.Ionicons}
                    color={COLORS.black}
                />
            </TouchableOpacity>
            <Text style={styles.text}>
                {props.label}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: SIZES.twenty
    },
    IconContainer: {
        backgroundColor: COLORS.white,
        padding: SIZES.five,
        borderRadius: SIZES.fifty
    },
    text: {
        color: COLORS.black,
        fontSize: SIZES.twenty,
        marginLeft: SIZES.fifteen,
        fontWeight: "bold",
        fontFamily: FONTFAMILY.Poppins

    }
})