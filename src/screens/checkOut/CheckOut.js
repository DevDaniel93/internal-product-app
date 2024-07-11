import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import HeaderWithArrow from '../../components/HeaderWithArrow'
import { COLORS, SIZES, STYLES } from '../../constants'
import EditText from '../../components/EditText'
import ProgressBar from '../../components/ProgressBar'
import Shipping from './Shipping'
import Payment from './Payment'
import Review from './Review'
import CustomButton from '../../components/CustomButton'
import { label } from '../../constants/lables'
import { useSelector } from 'react-redux'
import { getTheme } from '../../constants/theme'
import { useTranslation } from 'react-i18next'


export default function CheckOut(props) {
    console.log(props.route.params)
    const theme = useSelector(state => state.Theme.theme)
    const { t } = useTranslation();
    const currentTheme = getTheme(theme)
    const [flag, setFlag] = useState("")
    const [enablePaymentButton, setEnablePaymentButton] = useState(false)
    const [progress, setProgress] = useState(0)
    const voucher = useSelector(state => state.Voucher.vouchers)[0]?.code
    const [place_order, setPlace_order] = useState({voucher})
    const allGeneralCountries = useSelector(state => state.Settings.settings)
    const allowedGeneralCountries = allGeneralCountries.find(obj => obj.id === 'woocommerce_specific_allowed_countries')

    const moveToNext = () => {
        setProgress(progress + 1)
    }
    const moveToPrevios = () => {
        setProgress(progress - 1)
    }
    const changeFlag = (item) => {
        setFlag(item)
    }
    const enablePayment = (item) => {
        console.log({item})
        setPlace_order(item)
        if (
            item.first_name !== '' &&
            item.last_name !== '' &&
            item.address_1 !== '' &&
            item.city !== '' &&
            item.state !== '' &&
            item.postcode !== '' &&
            item.country !== ''
        ) {
            setEnablePaymentButton(false)
        }
        else {
            setEnablePaymentButton(true)
        }
    }


    const updatedPlaceOrder = (item) => {
        setPlace_order(item)
    }
    console.log({ place_order })
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

    return (
        <ScrollView style={[STYLES.container, { backgroundColor: currentTheme.Background }]}>
            <HeaderWithArrow
                label={t('Checkout')} />

            <ProgressBar mode={progress} />

            {progress === 0 ?
                <Shipping onFlagChange={changeFlag} place_order={enablePayment} />
                : progress === 1 ?
                    <Payment place_order={place_order} updatedPlace_order={updatedPlaceOrder} />
                    :
                    <Review />
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
    }
})