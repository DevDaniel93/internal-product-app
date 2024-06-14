import { StyleSheet, View, } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../constants'
import ReactNativeModal from 'react-native-modal'
import { useSelector } from 'react-redux'
import { getTheme } from '../constants/theme'

export default function CustomModal(props) {
    const { isvisible } = props
    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    return (
        <ReactNativeModal
            isVisible={isvisible}
        >
            <View style={[styles.innerContainer, { backgroundColor: currentTheme.Background }]}>
                {props.children}
            </View>
        </ReactNativeModal>
    )
}

const styles = StyleSheet.create({
    innerContainer: {
        backgroundColor: COLORS.white,
        padding: SIZES.twenty,
        borderRadius: SIZES.five,
        borderColor: COLORS.primary,
        borderTopWidth: 4,
        borderBottomWidth: 4
    }
})