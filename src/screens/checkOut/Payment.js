// import { StyleSheet, Text, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import EditText from '../../components/EditText'
// import { COLORS, SIZES, width } from '../../constants'
// import CardSlider from '../../components/CardSlider'
// import cardValidator from 'card-validator';
// import { CreditCardInput } from '../../components/StripeCardComponent'
// import { label } from '../../constants/lables'
// import { useTranslation } from 'react-i18next'
// import { useSelector } from 'react-redux'
// import { StripeProvider } from '@stripe/stripe-react-native';
// import { CardField, useStripe } from '@stripe/stripe-react-native';
// import CustomButton from '../../components/CustomButton'

// const Payment = () => {
//     const [cardHolderName, setCardHolderName] = useState('')
//     const [cardNumber, setCardNumber] = useState('');
//     const [expiry, setExpiry] = useState('');
//     const payment = useSelector(state => state.Payment.payment)
//     const [isStripeEnabled, setIsStripeEnabled] = useState(false)
//     const [isPaypalEnabled, setIsPaypalEnabled] = useState(false)
//     const { createPaymentMethod } = useStripe();
//     const [cardDetails, setCardDetails] = useState(null);

//     const handlePayPress = async () => {
//         if (!cardDetails?.complete) {
//             Alert.alert('Please enter complete card details');
//             return;
//         }

//         const { paymentMethod, error } = await createPaymentMethod({
//             type: 'Card',
//             card: cardDetails,
//         });

//         if (error) {
//             Alert.alert(`Error: ${error.message}`);
//         } else {
//             // Send paymentMethod.id to your server for the payment
//             handlePayment(paymentMethod.id);
//         }
//     };

//     const handlePayment = async (paymentMethodId) => {
//         const response = await fetch('https://custom3.mystagingserver.site/digi-cart-app/?wc-api=wc_stripe', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ paymentMethodId }),
//         });

//         const { clientSecret } = await response.json();

//         const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret);

//         if (error) {
//             Alert.alert(`Payment Confirmation Error: ${error.message}`);
//         } else if (paymentIntent) {
//             Alert.alert('Success', 'Payment confirmed!');
//         }
//     };
//     console.log({ payment })
//     const [cvv, setCvv] = useState('');
//     const [error, setError] = useState('');
//     const { t } = useTranslation();

//     const handleCardNumberChange = (text) => {
//         const formattedText = text.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
//         setCardNumber(formattedText);
//         const validation = cardValidator.number(formattedText.replace(/\s/g, ''));
//         if (!validation.isValid) {
//             setError(t('InvalidCardNumber'));
//         } else {
//             setError('');
//         }
//     };
//     useEffect(() => {
//         setIsStripeEnabled(payment.some(item => item.id === "stripe"))
//     }, [])

//     const handleExpiryChange = (text) => {
//         const formattedText = text.replace(/^(\d{2})(\d{2})$/, '$1/$2');
//         setExpiry(formattedText);
//     };

//     const handleCvvChange = (text) => {
//         setCvv(text);
//     };
//     return (
//         <View style={styles.container}>

//             {
//                 isStripeEnabled &&

//                 <StripeProvider publishableKey="pk_test_51PYmNTIhyltse8okcxVNLSQhtBRFnqu275GkFnzt2oNga4uZmv3zKI4cp6wYOXuRB1mlUCr4B2V0Yusjo1aRERLp00wGBIv7pH">
//                     <CardSlider data={[1, 2, 3]} />
//                     <EditText
//                         label={t('CardHolderName')}
//                         value={cardHolderName}
//                         required
//                         onChangeText={(e) => {
//                             setCardHolderName(e)
//                         }}
//                         placeholder={t('EnterCardHolderName')}
//                     />

//                     <EditText
//                         label={t('CardNumber')}
//                         required
//                         placeholder={t('CardNumber')}
//                         keyboardType="numeric"
//                         value={cardNumber}
//                         onChangeText={handleCardNumberChange}
//                         maxLength={19}
//                     />
//                     {error === t('InvalidCardNumber') && <Text style={{ color: COLORS.red, fontSize: SIZES.fifteen }}>
//                         {error}
//                     </Text>}
//                     <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
//                         <EditText
//                             required

//                             label={t('Expiration')}
//                             placeholder={t('MMYY')}
//                             keyboardType="numeric"
//                             value={expiry}
//                             onChangeText={handleExpiryChange}
//                             maxLength={5}
//                             styleTxtArea={{ width: SIZES.fiftyWidth * 3.3 }}
//                         />
//                         <EditText
//                             required
//                             label={t('CVV')}
//                             placeholder={t('CVV')}
//                             keyboardType="numeric"
//                             value={cvv}
//                             onChangeText={handleCvvChange}
//                             maxLength={3}
//                             styleTxtArea={{ width: SIZES.fiftyWidth * 3.3 }}
//                         />

//                     </View>
//                     <CustomButton
//                         btnStyle={styles.btnStyle}
//                         label={t('Payment')}
//                         onPress={handlePayPress}

//                     />
//                 </StripeProvider>}
//         </View>
//     )
// }

// export default Payment

// const styles = StyleSheet.create({
//     container: {
//         flex: 1
//     }
// })
import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import EditText from '../../components/EditText';
import { COLORS, SIZES } from '../../constants';
import CardSlider from '../../components/CardSlider';
import cardValidator from 'card-validator';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { CardField, CardFieldInput, StripeProvider, useStripe } from '@stripe/stripe-react-native';
import CustomButton from '../../components/CustomButton';

const Payment = () => {
    const [cardDetails, setCardDetails] = useState(null);
    const [cardHolderName, setCardHolderName] = useState('Taimoor');
    const [cardNumber, setCardNumber] = useState('4242424242424242');
    const [expiry, setExpiry] = useState('04/27');
    const [cvv, setCvv] = useState('123');
    const [error, setError] = useState('');
    const payment = useSelector(state => state.Payment.payment);
    const [isStripeEnabled, setIsStripeEnabled] = useState(false);
    const { createPaymentMethod, confirmPayment } = useStripe();
    const { t } = useTranslation();

    useEffect(() => {
        setIsStripeEnabled(payment.some(item => item.id === "stripe"));
    }, [payment]);

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

    const handlePayPress = async () => {
        // const cardDetails = {
        //     number: cardNumber.replace(/\s/g, ''),
        //     exp_month: parseInt(expiry.split('/')[0], 10),
        //     exp_year: parseInt(`20${expiry.split('/')[1]}`, 10),
        //     cvc: cvv,
        // };

        // const isCardValid = cardValidator.number(cardDetails.number).isValid;
        // const isExpiryValid = cardValidator.expirationDate(`${cardDetails.exp_month}${cardDetails.exp_year}`).isValid;
        // const isCvcValid = cardValidator.cvv(cardDetails.cvc).isValid;

        // if (!isCardValid || !isExpiryValid || !isCvcValid) {
        //     Alert.alert('Error', 'Please enter complete and valid card details');
        //     return;
        // }
        try {

            const { paymentMethod, error } = await createPaymentMethod({
                paymentMethodType: 'Card',
                paymentMethodData: {
                    // card: cardDetails,
                    billing_details: { name: cardHolderName }
                },
                // card: cardDetails,
                billing_details: { name: cardHolderName }
            });

            if (error) {
                console.log({ error })
                Alert.alert(`Error: ${error.message}`);
            } else {
                console.log({ paymentMethod })
                handlePayment(paymentMethod.id);
            }
        } catch (error) {
            console.log('Create Payment Method Error:', error);
            Alert.alert('Payment Error', 'An error occurred while processing the payment method.');
        }
    };

    const handlePayment = async (paymentMethodId) => {
        const paymentAmount = 1000; // Example amount in cents (i.e., $10.00)
        try {
            const response = await fetch('https://custom3.mystagingserver.site/digi-cart-app/?wc-api=wc_stripe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ paymentMethodId, amount: paymentAmount }),
            });

            const textResponse = await response.text();
            console.log('Server response:', textResponse);

            if (!textResponse) {
                console.log('Empty response from server');
                Alert.alert('Server Error', 'Received empty response from server. Please try again later.');
                return;
            }

            let jsonResponse;
            try {
                jsonResponse = JSON.parse(textResponse);
            } catch (error) {
                console.log('JSON Parse Error:', error);
                Alert.alert('Server Error', 'Failed to parse server response. Please try again later.');
                return;
            }

            if (!jsonResponse.clientSecret) {
                console.log('Client Secret not found in response:', jsonResponse);
                Alert.alert('Server Error', 'Client secret not found in response. Please try again later.');
                return;
            }

            const { error, paymentIntent } = await confirmPayment(jsonResponse.clientSecret);

            if (error) {
                Alert.alert(`Payment Confirmation Error: ${error.message}`);
            } else if (paymentIntent) {
                Alert.alert('Success', 'Payment confirmed!');
                console.log('Payment token:', paymentIntent.id);
            }
        } catch (error) {
            console.log('Payment Error:', error);
            Alert.alert('Payment Error', 'An error occurred while processing the payment.');
        }
    };


    return (
        <View style={styles.container}>
            {isStripeEnabled &&
                <StripeProvider publishableKey="pk_test_51PYmNTIhyltse8okcxVNLSQhtBRFnqu275GkFnzt2oNga4uZmv3zKI4cp6wYOXuRB1mlUCr4B2V0Yusjo1aRERLp00wGBIv7pH">
                    <CardSlider data={[1, 2, 3]} />
                    <EditText
                        label={t('CardHolderName')}
                        value={cardHolderName}
                        required
                        onChangeText={setCardHolderName}
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
                    {error === t('InvalidCardNumber') && <Text style={{ color: COLORS.red, fontSize: SIZES.fifteen }}>{error}</Text>}
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
                    <CardField
                        postalCodeEnabled={false}
                        placeholder={{
                            number: '4242 4242 4242 4242',
                        }}
                        cardStyle={{
                            borderColor: '#000000',
                            borderWidth: 1,
                            borderRadius: 8,
                            backgroundColor: '#FFFFFF',
                        }}
                        style={{
                            height: 50,

                            marginVertical: 30,
                        }}
                        onCardChange={(cardDetails) => {
                            setCardDetails(cardDetails);
                        }}
                    />
                    <CustomButton
                        btnStyle={styles.btnStyle}
                        label={t('Payment')}
                        onPress={handlePayPress}
                    />
                </StripeProvider>
            }
        </View>
    );
};

export default Payment;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
