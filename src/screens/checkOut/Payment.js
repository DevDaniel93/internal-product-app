import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import EditText from '../../components/EditText'
import { SIZES, width } from '../../constants'

const Payment = () => {
    const [cardHolderName, setCardHolderName] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [expiration, setExpiration] = useState('')
    const [cvv, setCvv] = useState('')

    return (
        <View>
           
            <EditText
                label={"Card Holder Name"}
                value={cardHolderName}
                required
                onChangeText={(e) => {
                    setCardHolderName(e)
                }}
                placeholder={"Enter card holder name"}
            />

            <EditText
                label={"Card Number"}
                value={cardNumber}
                required
                onChangeText={(e) => {
                    setCardNumber(e)
                }}
                placeholder={"Enter card number"}
            />
            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                <EditText
                    label={"Expiration"}
                    value={expiration}
                    required
                    onChangeText={(e) => {
                        setExpiration(e)
                    }}
                    placeholder={"MM/YY"}
                    styleTxtArea={{ width: SIZES.fiftyWidth * 3.3 }}
                />
                <EditText
                    label={"CVV"}
                    value={cvv}
                    required
                    onChangeText={(e) => {
                        setCvv(e)
                    }}
                    placeholder={"123"}
                    styleTxtArea={{ width: SIZES.fiftyWidth * 3.3 }}
                />

            </View>
        </View>
    )
}

export default Payment

const styles = StyleSheet.create({

})