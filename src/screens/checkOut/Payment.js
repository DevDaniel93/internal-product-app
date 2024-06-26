import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import EditText from '../../components/EditText'
import { COLORS, SIZES, width } from '../../constants'
import CardSlider from '../../components/CardSlider'
import cardValidator from 'card-validator';
import { CreditCardInput } from '../../components/StripeCardComponent'
import { label } from '../../constants/lables'
import { useTranslation } from 'react-i18next'


const Payment = () => {
    const [cardHolderName, setCardHolderName] = useState('')
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [error, setError] = useState('');
    const { t } = useTranslation();

    const handleCardNumberChange = (text) => {
        const formattedText = text.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
        setCardNumber(formattedText);
        const validation = cardValidator.number(formattedText.replace(/\s/g, ''));
        if (!validation.isValid) {
            setError(t('InvalidCardNumber'));
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
                label={t('CardHolderName')}
                value={cardHolderName}
                required
                onChangeText={(e) => {
                    setCardHolderName(e)
                }}
                placeholder={t('EnterCardHolderName')}
            />

            <EditText
                label={t('CardNumber')}
                required
                placeholder={t('CardNumber')}
                keyboardType="numeric"
                value={cardNumber}
                onChangeText={handleCardNumberChange}
                maxLength={19}
            />
            {error === t('InvalidCardNumber') && <Text style={{ color: COLORS.red, fontSize: SIZES.fifteen }}>
                {error}
            </Text>}
            <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                <EditText
                    required

                    label={t('Expiration')}
                    placeholder={t('MMYY')}
                    keyboardType="numeric"
                    value={expiry}
                    onChangeText={handleExpiryChange}
                    maxLength={5}
                    styleTxtArea={{ width: SIZES.fiftyWidth * 3.3 }}
                />
                <EditText
                    required
                    label={t('CVV')}
                    placeholder={t('CVV')}
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