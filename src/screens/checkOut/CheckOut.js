import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import HeaderWithArrow from '../../components/HeaderWithArrow'
import { STYLES } from '../../constants'
import EditText from '../../components/EditText'


export default function CheckOut() {
    const [progress, setProgress] = useState(0)
    const [name, setName] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [postalCode, setPostalCode] = useState('')

    return (
        <ScrollView style={STYLES.container}>
            <HeaderWithArrow
                label="CheckOut" />

            <EditText
                label={"Full Name"}
                value={name}
                onChangeText={(e) => {
                    setName(e)
                }}
            />

            <EditText
                label={"Street Address"}
                value={address}
                onChangeText={(e) => {
                    setAddress(e)
                }}
            />
            <EditText
                label={"Postal Code"}
                value={postalCode}
                onChangeText={(e) => {
                    setPostalCode(e)
                }}
            />

        </ScrollView>
    )
}

const styles = StyleSheet.create({})