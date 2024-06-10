import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { STYLES } from '../../constants'
import HeaderWithArrow from '../../components/HeaderWithArrow'

export default function AboutUs() {
    return (
        <View style={STYLES.container}>
            <HeaderWithArrow label={"About Us"} />
        </View>
    )
}

const styles = StyleSheet.create({})