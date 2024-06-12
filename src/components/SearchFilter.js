import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import Icon, { IconType } from './Icons'
import { COLORS, SIZES } from '../constants'

export default function SearchFilter(props) {

    return (
        <View style={styles.conatiner}>
            <View style={styles.InnerConatiner}>

                <Icon
                    name={"search"}
                    type={IconType.Feather}
                    style={styles.icon}
                />

                <TextInput
                    style={styles.TextInput}
                    {...props}
                    placeholderTextColor={COLORS.gray}
                    placeholder='Search Items Here...'
                />
            </View>

            <TouchableOpacity style={styles.iconContiner}>
                <Icon
                    name={"sliders"}
                    color={COLORS.white}
                    type={IconType.FontAwesome}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        flexDirection: "row",
        marginTop: SIZES.fifteen
    },
    InnerConatiner: {
        borderWidth: 1,
        flexDirection: "row",
        borderRadius: SIZES.five,
        flex: 1,
        alignItems: "center",
        marginRight: SIZES.fifteen,
        borderColor: COLORS.lightGray
    },
    iconContiner: {
        backgroundColor: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: SIZES.ten,
        paddingHorizontal: SIZES.fifteen,
        borderRadius: SIZES.five
    },
    icon: {
        color: COLORS.lightGray,
        marginHorizontal: SIZES.ten
    },
    TextInput: {
        color: COLORS.black,
        flex: 1
    }
})