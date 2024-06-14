import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import EditText from '../../components/EditText'
import { COLORS, SIZES, width } from '../../constants'
import CardSlider from '../../components/CardSlider'
import cardValidator from 'card-validator';
import { CreditCardInput } from '../../components/StripeCardComponent'
import { label } from '../../constants/lables'


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
            setError(label.InvalidCardNumber);
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
                label={label.CardHolderName}
                value={cardHolderName}
                required
                onChangeText={(e) => {
                    setCardHolderName(e)
                }}
                placeholder={label.EnterCardHolderName}
            />

            <EditText
                label={label.CardNumber}
                required
                placeholder={label.CardNumber}
                keyboardType="numeric"
                value={cardNumber}
                onChangeText={handleCardNumberChange}
                maxLength={19}
            />
            {error === label.InvalidCardNumber && <Text style={{ color: COLORS.red, fontSize: SIZES.fifteen }}>
                {error}
            </Text>}
            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                <EditText
                    required

                    label={label.Expiration}
                    placeholder={label.MMYY}
                    keyboardType="numeric"
                    value={expiry}
                    onChangeText={handleExpiryChange}
                    maxLength={5}
                    styleTxtArea={{ width: SIZES.fiftyWidth * 3.3 }}
                />
                <EditText
                    required
                    label={label.CVV}
                    placeholder={label.CVV}
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