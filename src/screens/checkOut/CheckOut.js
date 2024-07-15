import { ScrollView, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import HeaderWithArrow from '../../components/HeaderWithArrow'
import { COLORS, SIZES, STYLES } from '../../constants'
import EditText from '../../components/EditText'
import ProgressBar from '../../components/ProgressBar'
import Shipping from './Shipping'
// import Payment from './Payment'
import Review from './Review'
import CustomButton from '../../components/CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import { CONSTANTS, getTheme } from '../../constants/theme'
import { useTranslation } from 'react-i18next'
import { StripeProvider, useStripe, CardField } from '@stripe/stripe-react-native'
import { setLoading } from '../../redux/slices/utils'
import axios from 'axios'
import cardValidator from 'card-validator'
import { postOrder } from '../../redux/slices/orders'
import { SuccessAlert } from '../../utils/utils'



export default function CheckOut(props) {
    const dispatch = useDispatch()
    const { confirmPayment } = useStripe();
    const theme = useSelector(state => state.Theme.theme)
    const { t } = useTranslation();
    const currentTheme = getTheme(theme)
    const [flag, setFlag] = useState("")

    const [enablePaymentButton, setEnablePaymentButton] = useState(false)
    const [progress, setProgress] = useState(0)
    const voucherCode = useSelector(state => state.Voucher.vouchers)[0]?.code
    const cart = useSelector(state => state.Cart.cart)
    const shippingMethods = useSelector(state => state.Shipping.shippingType)
    const [shippingDetails, setShippingDetails] = useState(null)
    const [paidStatus, setPaidStatus] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState(null)
    const [orderDetails, setOrderDetails] = useState(null)
    const [cardDetails, setCardDetails] = useState(null);
    const allGeneralCountries = useSelector(state => state.Settings.settings)
    const [cardNoAuth, setCardNoAuth] = useState('');
    const [Error, setError] = useState('');
    const [expiryAuth, setExpiryAuth] = useState('');
    const [cvcAuth, setCvcAuth] = useState('');


    const payment = useSelector(state => state.Payment.payment);

    const allowedGeneralCountries = allGeneralCountries.find(obj => obj.id === 'woocommerce_specific_allowed_countries')

    const moveToNext = async () => {
        if (progress === 2) {

            if (paymentMethod.id === "stripe") {
                StripePaymentMethod()
            }
            else if (paymentMethod.id === "authorize_net_cim_credit_card") {
                try {
                    const response = await dispatch(postOrder(orderDetails))
                    await handleTransactionAuthorize(response?.id)
                    SuccessAlert("Order Posted Successfully");
                } catch (error) {
                    console.log(error)
                }


            }
        }
        else {
            setProgress(progress + 1)
        }

    }
    const moveToPrevios = () => {
        setProgress(progress - 1)
    }
    const changeFlag = (item) => {
        setFlag(item)
    }
    const enablePayment = (item) => {

        if (
            item?.shipping?.first_name !== '' &&
            item?.shipping?.last_name !== '' &&
            item?.shipping?.address_1 !== '' &&
            item?.shipping?.city !== '' &&
            item?.shipping?.state !== '' &&
            item?.shipping?.postcode !== ''
        ) {
            setEnablePaymentButton(false)
        }
        else {
            setEnablePaymentButton(true)
        }
        setShippingDetails(item)
    }
    // ================================handle Card number============================
    const handleCardNumberChange = (text) => {
        const formattedText = text.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
        setCardNoAuth(text);
        const validation = cardValidator.number(formattedText.replace(/\s/g, ''));
        if (!validation.isValid) {
            setError(t('InvalidCardNumber'));
        } else {
            setError('');
        }
    };
    const handleExpiryChange = (text) => {
        const formattedText = text.replace(/^(\d{2})(\d{2})$/, '$1/$2');
        setExpiryAuth(formattedText);
    };

    const handleCvvChange = (text) => {
        setCvcAuth(text);
    };
    const calculateShippingCost = (products, shippingAddress) => {

        let totalProductCost = products.reduce((acc, product) => acc + (parseFloat(product.price) * product.quantity), 0);
        let totalQuantity = products.reduce((acc, product) => acc + product.quantity, 0);
        let selectedShippingMethod = null;
        shippingMethods.forEach(method => {
            if (method.enabled) {
                if (method.method_id === 'free_shipping') {
                    if (method.settings.requires.value === 'min_amount' && totalProductCost >= method.settings.min_amount.value) {
                        selectedShippingMethod = {
                            method_id: method.method_id,
                            method_title: method.method_title,
                            total: '0.00'
                        };
                    }
                } else if (method.method_id === 'flat_rate') {
                    let cost = method.settings.cost.value;
                    cost = cost.replace('[qty]', totalQuantity);
                    cost = eval(cost); // Caution: Use safer evaluation methods in production
                    if (!selectedShippingMethod || parseFloat(selectedShippingMethod.total) > cost) {
                        selectedShippingMethod = {
                            method_id: method.method_id,
                            method_title: method.method_title,
                            total: cost.toFixed(2)
                        };
                    }
                } else if (method.method_id === 'local_pickup') {
                    selectedShippingMethod = {
                        method_id: method.method_id,
                        method_title: method.method_title,
                        total: method.settings.cost.value
                    };
                }
            }
        });

        return selectedShippingMethod;
    };

    const Place_order = () => {
        const shippingCost = calculateShippingCost(cart, shippingDetails);
        const order = {
            payment_method: paymentMethod?.id,
            payment_method_title: paymentMethod?.title,
            set_paid: paidStatus,
            billing: shippingDetails?.billing,
            shipping: shippingDetails?.shipping,
            line_items: [

            ],
            coupon_lines: voucherCode !== undefined ?
                [
                    {
                        code: voucherCode
                    }
                ] : [],
            shipping_lines: shippingCost ? [shippingCost] : []

        }
        cart.forEach(product => {
            order.line_items.push({
                product_id: product.id,
                quantity: product.quantity,
                // variation_id: null // Add variation_id if available
            });
        });

        setOrderDetails(order)

    }

    useEffect(() => {
        Place_order()
    }, [progress])


    const checkShipment = () => {
        if (enablePaymentButton === false)
            return true
        else {
            if (!allowedGeneralCountries || allowedGeneralCountries.value.length === 0) {
                return false;
            } else {
                return allowedGeneralCountries.value.some(item => item !== flag);
            }
        }
    }

    const showRadioButtons = ({ item }) => (
        <>
            <TouchableOpacity
                style={[styles.radioButton, { borderColor: paymentMethod?.id === item.id ? currentTheme.primary : '#CCCCCC' }]}
                onPress={() => setPaymentMethod(item)}
            >
                <View style={[styles.radioButtonCircle, { backgroundColor: paymentMethod?.id === item.id ? currentTheme.primary + 30 : currentTheme.Background, borderColor: paymentMethod?.id === item.id ? currentTheme.primary : currentTheme.defaultTextColor }]}>
                    {paymentMethod?.id === item.id && <View style={[styles.radioButtonCheckedCircle, { backgroundColor: currentTheme.primary }]} />}
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ color: paymentMethod?.id === item.id ? currentTheme.primary : currentTheme.defaultTextColor }}>{item.title}</Text>
                </View>
            </TouchableOpacity>
            <Text style={{ textAlign: 'left', color: currentTheme?.defaultTextColor, paddingBottom: SIZES.twenty, fontSize: SIZES.body10, paddingHorizontal: SIZES.ten }}>{item.description !== '' ? item.description : item.method_description}</Text>
        </>
    );
    // ==================================== Stripe Payment Method==============================
    const StripePaymentMethod = async () => {
        try {
            await dispatch(setLoading(true))
            await fetch('https://custom3.mystagingserver.site/digi-cart-app/wp-json/stripe-payment/v1/create-payment-intent', {
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
                    // setClientSecret(res?.client_secret);
                    await handlePayment(res?.client_secret)

                }).catch((err) => {
                    console.log({ err })
                    dispatch(setLoading(false))

                })
        } catch (error) {
            console.log({ error })
        }


    };
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

    // ==================================== Authorize.net Payment Method==============================
    const handleTransactionAuthorize = async (id) => {

        const requestBody = {

            "createTransactionRequest": {
                "merchantAuthentication": {
                    "name": CONSTANTS.login_id,
                    "transactionKey": CONSTANTS.transactionKey
                },
                "refId": Date.now(),
                "transactionRequest": {
                    "transactionType": "authCaptureTransaction",
                    "amount": props?.route?.params?.amount,
                    "payment": {
                        "creditCard": {
                            "cardNumber": cardNoAuth, //"5424000000000015"
                            "expirationDate": expiryAuth, //"2025-12"
                            "cardCode": cvcAuth, //"999"
                        }
                    },

                    "poNumber": id, //"456654"
                    "billTo": {
                        "firstName": shippingDetails?.shipping?.first_Name,
                        "lastName": shippingDetails?.shipping?.last_name,
                        "company": "Souveniropolis",
                        "address": shippingDetails?.shipping?.address_1,
                        "city": shippingDetails?.shipping?.city,
                        "state": shippingDetails?.shipping?.state,
                        "zip": shippingDetails?.shipping?.postcode,
                        "country": shippingDetails?.shipping?.country
                    },
                    "shipTo": {
                        "firstName": shippingDetails?.shipping?.first_Name,
                        "lastName": shippingDetails?.shipping?.last_name,
                        "company": "Thyme for Tea",
                        "address": shippingDetails?.shipping?.address_1,
                        "city": shippingDetails?.shipping?.city,
                        "state": shippingDetails?.shipping?.state,
                        "zip": shippingDetails?.shipping?.postcode,
                        "country": shippingDetails?.shipping?.country
                    }
                }
            }
        }
        try {
            const SandboxOrProduction = payment[payment.findIndex(item => item.id === paymentMethod?.id)].settings.environment.value
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

            const transId = response?.data?.transactionResponse?.transId;
            console.log({ transId })
            console.log('Transaction request response:', response.data.messages);
        }
        catch (err) {
            console.log(err)
        }
    }


    return (
        <ScrollView style={[STYLES.container, { backgroundColor: currentTheme.Background }]}>
            <StripeProvider publishableKey="pk_test_51PYmNTIhyltse8okcxVNLSQhtBRFnqu275GkFnzt2oNga4uZmv3zKI4cp6wYOXuRB1mlUCr4B2V0Yusjo1aRERLp00wGBIv7pH">

                <HeaderWithArrow
                    label={t('Checkout')} />
                <ProgressBar mode={progress} />

                {progress === 0 ?
                    <Shipping onFlagChange={changeFlag} place_order={enablePayment} />
                    : progress === 1 ?
                        <View style={styles.container}>
                            <FlatList
                                data={payment}
                                renderItem={showRadioButtons}
                                keyExtractor={item => item.id}
                                extraData={paymentMethod}
                            />
                            {paymentMethod?.id === 'stripe' ?
                                <>
                                    <CardField
                                        postalCodeEnabled={false}
                                        placeholder={{ number: '4242 4242 4242 4242' }}
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
                                        onPress={StripePaymentMethod}
                                    />

                                </>
                                :
                                paymentMethod?.id === "authorize_net_cim_credit_card" ?
                                    <View>
                                        <EditText
                                            label={t('CardNumber')}
                                            required
                                            placeholder={t('CardNumber')}
                                            value={cardNoAuth}
                                            onChangeText={handleCardNumberChange}

                                            keyboardType="numeric"
                                            maxLength={19}
                                        />
                                        <EditText

                                            label={t('Expiration')}
                                            placeholder={t('MMYY')}
                                            keyboardType="numeric"
                                            value={expiryAuth}
                                            onChangeText={handleExpiryChange}
                                            maxLength={5}

                                        />
                                        <EditText
                                            required
                                            label={t('CVV')}
                                            placeholder={t('CVV')}
                                            keyboardType="numeric"
                                            value={cvcAuth}
                                            onChangeText={handleCvvChange}
                                            maxLength={3}
                                        />

                                    </View>
                                    : null
                            }
                        </View>
                        :
                        <Review data={orderDetails} />
                }

                <View style={styles.btnRow}>
                    {progress > 0 &&
                        <CustomButton
                            txtstyle={styles.txtstyle}
                            btnStyle={[styles.btnStyle1, { backgroundColor: currentTheme.Background }]}
                            label={t('Back')}
                            onPress={moveToPrevios} />
                    }
                    {progress > 0 &&
                        <View style={{ width: SIZES.fifteen }} />
                    }
                    <CustomButton
                        btnStyle={styles.btnStyle}
                        label={progress === 0 ? t('Payment') : progress === 1 ? t('Review') : t('PlaceOrder')}
                        onPress={moveToNext}

                        disabled={enablePaymentButton}
                    />

                </View>
                {
                    checkShipment() === true && enablePaymentButton !== false &&
                    <Text style={{ textAlign: "center", paddingTop: SIZES.ten, color: COLORS.primary }}>Shipment is not available in your country</Text>
                }

                <View style={{ height: SIZES.fifty * 2 }} />
            </StripeProvider>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    btnRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    btnStyle: {
        flex: 1
    },
    btnStyle1: {
        flex: 1,

        borderWidth: 1,
        borderColor: COLORS.primary
    },
    txtstyle: {
        color: COLORS.primary
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
})