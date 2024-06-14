import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { STYLES } from '../../constants'
import HeaderWithArrow from '../../components/HeaderWithArrow'
import { label } from '../../constants/lables'
import { useSelector } from 'react-redux'
import { getTheme } from '../../constants/theme'

export default function AboutUs() {
    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    return (
        <View style={[STYLES.container, { backgroundColor: currentTheme.Background }]}>
            <HeaderWithArrow label={label.AboutUs} />
        </View>
    )
}

const styles = StyleSheet.create({})