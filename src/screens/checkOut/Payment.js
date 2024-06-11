import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import EditText from '../../components/EditText'
import { COLORS, SIZES, width } from '../../constants'
import CardSlider from '../../components/CardSlider'
import cardValidator from 'card-validator';
import { CreditCardInput } from '../../components/StripeCardComponent'


const Payment = () => {
    const [cardHolderName, setCardHolderName] = useState('')
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [error, setError] = useState('');

    const handleCardNumberChange = (text) => {
        const formattedText = text.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
        setCardNumber(formattedText);
        const validation = cardValidator.number(formattedText.replace(/\s/g, ''));
        if (!validation.isValid) {
            setError('Invalid card number');
        } else {
            setError('');
        }
    };

    const handleExpiryChange = (text) => {
        const formattedText = text.replace(/^(\d{2})(\d{2})$/, '$1/$2');
        setExpiry(formattedText);
    };

    const handleCvvChange = (text) => {
        setCvv(text);
    };
    return (
        <View style={styles.container}>

            <CardSlider data={[1, 2, 3]} />
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
                required
                placeholder="Card Number"
                keyboardType="numeric"
                value={cardNumber}
                onChangeText={handleCardNumberChange}
                maxLength={19}
            />
            {error === "Invalid card number" && <Text style={{ color: COLORS.red, fontSize: SIZES.fifteen }}>
                {error}
            </Text>}
            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                <EditText
                    required

                    label={"Expiration"}
                    placeholder="MM/YY"
                    keyboardType="numeric"
                    value={expiry}
                    onChangeText={handleExpiryChange}
                    maxLength={5}
                    styleTxtArea={{ width: SIZES.fiftyWidth * 3.3 }}
                />
                <EditText
                    required
                    label={"CVV"}
                    placeholder="CVV"
                    keyboardType="numeric"
                    value={cvv}
                    onChangeText={handleCvvChange}
                    maxLength={3}
                    styleTxtArea={{ width: SIZES.fiftyWidth * 3.3 }}
                />

            </View>
        </View>
    )
}

export default Payment

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})