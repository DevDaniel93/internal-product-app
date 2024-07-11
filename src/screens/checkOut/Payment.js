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
import { StyleSheet, Text, View, Alert, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import EditText from '../../components/EditText';
import { COLORS, SIZES } from '../../constants';
import CardSlider from '../../components/CardSlider';
import cardValidator from 'card-validator';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { CardField, CardFieldInput, StripeProvider, useStripe } from '@stripe/stripe-react-native';
import CustomButton from '../../components/CustomButton';
import { CONSTANTS, getTheme, width } from '../../constants/theme';
import { setLoading } from '../../redux/slices/utils';
import axios from "axios";


const Payment = (props) => {
    const place_order = props?.place_order
    const [cardDetails, setCardDetails] = useState(null);
    const [cardNoAuth, setCardNoAuth] = useState('')
    const [expiryAuth, setExpiryAuth] = useState('')
    const [cvcAuth, setCvcAuth] = useState('')
    const dispatch = useDispatch()
    const payment = useSelector(state => state.Payment.payment);
    const { confirmPayment } = useStripe();
    const [selectedItem, setSelectedItem] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('')
    const { t } = useTranslation();
    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        props?.updatedPlace_order(updatedPlace_order)
    }, [selectedItem]);


    const fetchPaymentIntent = async () => {
        await dispatch(setLoading(true))
        const response = await fetch('https://custom3.mystagingserver.site/digi-cart-app/wp-json/stripe-payment/v1/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: 1000, // Amount in cents
                currency: 'usd',
            }),
        }).then((res) => res.json()).
            then(async (res) => {
                console.log("res", res?.client_secret)
                setClientSecret(res?.client_secret);
                await handlePayment(res?.client_secret)

            }).catch((err) => {
                console.log({ err })
            })

    };
    const updatedPlace_order = {
        payment_method: selectedItem,
        payment_method_title: paymentMethod,
        set_paid: false,
        ...place_order
    }

    const handleTransactionAuthorize = async () => {
        const requestBody = {

            "createTransactionRequest": {
                "merchantAuthentication": {
                    "name": CONSTANTS.login_id,
                    "transactionKey": CONSTANTS.transactionKey
                },
                "refId": Date.now(),
                "transactionRequest": {
                    "transactionType": "authCaptureTransaction",
                    "amount": "5",
                    "payment": {
                        "creditCard": {
                            "cardNumber": cardNoAuth, //"5424000000000015"
                            "expirationDate": expiryAuth, //"2025-12"
                            "cardCode": cvcAuth, //"999"
                        }
                    },
                    // "lineItems": {
                    //     "lineItem": {
                    //         "itemId": "1",
                    //         "name": "vase",
                    //         "description": "Cannes logo",
                    //         "quantity": "18",
                    //         "unitPrice": "45.00"
                    //     }
                    // },
                    "poNumber": "456654",
                    "billTo": {
                        "firstName": shipping.first_Name,
                        "lastName": shipping.last_name,
                        "company": "Souveniropolis",
                        "address": shipping.address_1,
                        "city": shipping.city,
                        "state": shipping.state,
                        "zip": shipping.postcode,
                        "country": shipping.country
                    },
                    "shipTo": {
                        "firstName": shipping.first_Name,
                        "lastName": shipping.last_name,
                        "company": "Thyme for Tea",
                        "address": shipping.address_1,
                        "city": shipping.city,
                        "state": shipping.state,
                        "zip": shipping.postcode,
                        "country": shipping.country
                    }

                }

            }
        }
        try {
            const SandboxOrProduction = payment[payment.findIndex(item => item.id === selectedItem)].settings.environment.value
            var url = ''
            if (SandboxOrProduction === 'test') {
                url = 'https://apitest.authorize.net/xml/v1/request.api'
            }
            else {
                url = 'https://api.authorize.net/xml/v1/request.api'
            }
            const response = await axios.post(url, requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const transId = response.data.transactionResponse.transId;
            console.log({ transId })
            console.log('Transaction request response:', response.data.messages);
        }
        catch (err) {
            console.log(err)
        }
    }

    const handlePayment = async (clientSecret) => {
        const { error, paymentIntent } = await confirmPayment(clientSecret, {
            paymentMethodType: 'Card',
        });

        if (error) {
            dispatch(setLoading(false))

            console.log('Payment failed:', error.message);
        } else if (paymentIntent) {
            dispatch(setLoading(false))

            console.log('Payment successful:', paymentIntent);
        }
    };


    const handleSelect = (item) => {
        setSelectedItem(item.id);
        setPaymentMethod(item.title)
    };

    const showRadioButtons = ({ item }) => {
        return (<>
            <TouchableOpacity
                style={[styles.radioButton, { borderColor: selectedItem === item.id ? currentTheme.primary : '#CCCCCC' }]}
                onPress={() => handleSelect(item)}
            >
                <View style={[styles.radioButtonCircle, { backgroundColor: selectedItem === item.id ? currentTheme.primary + 30 : currentTheme.Background, borderColor: selectedItem === item.id ? currentTheme.primary : currentTheme.defaultTextColor }]}>
                    {selectedItem === item.id && <View style={[styles.radioButtonCheckedCircle, { backgroundColor: currentTheme.primary }]} />}
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ color: selectedItem === item.id ? currentTheme.primary : currentTheme.defaultTextColor }}>{item.title}</Text>
                </View>
            </TouchableOpacity>
            <Text style={{ textAlign: 'left', color: currentTheme?.defaultTextColor, paddingBottom: SIZES.twenty, fontSize: SIZES.body10, paddingHorizontal: SIZES.ten }}>{item.description !== '' ? item.description : item.method_description}</Text>
        </>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={payment}
                renderItem={showRadioButtons}
                keyExtractor={item => item.id}
                extraData={selectedItem}
            />
            {selectedItem === 'stripe' ?
                <StripeProvider publishableKey="pk_test_51PYmNTIhyltse8okcxVNLSQhtBRFnqu275GkFnzt2oNga4uZmv3zKI4cp6wYOXuRB1mlUCr4B2V0Yusjo1aRERLp00wGBIv7pH">

                    <CardField

                        postalCodeEnabled={false}
                        placeholder={{
                            number: '4242 4242 4242 4242',
                        }}
                        cardStyle={{
                            borderColor: currentTheme?.defaultTextColor,
                            borderWidth: 1,
                            borderRadius: 8,
                            backgroundColor: currentTheme?.Background,
                        }}
                        style={{
                            height: SIZES.fifty,
                            marginVertical: SIZES.twentyFive,
                        }}
                        onCardChange={(cardDetails) => {
                            setCardDetails(cardDetails);
                        }}
                    />
                    <CustomButton
                        btnStyle={styles.btnStyle}
                        label={t('Payment')}
                        onPress={fetchPaymentIntent}
                    />
                </StripeProvider>
                :
                selectedItem === "authorize_net_cim_credit_card" ?
                    <View>
                        {/* <CardField

                            postalCodeEnabled={false}
                            placeholder={{
                                number: '4242 4242 4242 4242',
                            }}
                            cardStyle={{
                                borderColor: currentTheme?.defaultTextColor,
                                borderWidth: 1,
                                borderRadius: 8,
                                backgroundColor: currentTheme?.Background,
                            }}
                            style={{
                                height: SIZES.fifty,
                                marginVertical: SIZES.twentyFive,
                            }}
                            onCardChange={(cardDetailsAuthorize) => {
                                setCardDetailsAuthorize(cardDetailsAuthorize);
                            }}
                        /> */}
                        <EditText
                            label="Card Number"
                            value={cardNoAuth}
                            onChangeText={(txt) => setCardNoAuth(txt)}
                            placeholder="4242 4242 4242 4242"
                        />
                        <EditText
                            label="Expiry"
                            value={expiryAuth}
                            onChangeText={(txt) => setExpiryAuth(txt)}
                            placeholder="2025-09"
                        />
                        <EditText
                            label="CVC"
                            value={cvcAuth}
                            onChangeText={(txt) => setCvcAuth(txt)}
                            placeholder="256"
                        />
                        <CustomButton
                            btnStyle={styles.btnStyle}
                            label={t('Payment')}
                            onPress={handleTransactionAuthorize}
                        />
                    </View>
                    : null
            }
        </View>
    );
};

export default Payment;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10
    },
    radioButtonCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    radioButtonCheckedCircle: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#000',
    },
});
