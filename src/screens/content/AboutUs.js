import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { STYLES } from '../../constants'
import HeaderWithArrow from '../../components/HeaderWithArrow'
import { label } from '../../constants/lables'

export default function AboutUs() {
    return (
        <View style={STYLES.container}>
            <HeaderWithArrow label={label.AboutUs} />
        </View>
    )
}

const styles = StyleSheet.create({})