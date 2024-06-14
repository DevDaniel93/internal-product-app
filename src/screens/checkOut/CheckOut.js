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


export default function CheckOut() {
    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    const [progress, setProgress] = useState(0)

    const moveToNext = () => {
        setProgress(progress + 1)
    }
    const moveToPrevios = () => {
        setProgress(progress - 1)
    }

    return (
        <ScrollView style={[STYLES.container, { backgroundColor: currentTheme.Background }]}>
            <HeaderWithArrow
                label={label.Checkout} />

            <ProgressBar mode={progress} />

            {progress === 0 ?
                <Shipping />
                : progress === 1 ?
                    <Payment />
                    :
                    <Review />
            }

            <View style={styles.btnRow}>
                {progress > 0 &&
                    <CustomButton
                        txtstyle={styles.txtstyle}
                        btnStyle={[styles.btnStyle1, { backgroundColor: currentTheme.Background }]}
                        label={label.Back}
                        onPress={moveToPrevios} />
                }
                {progress > 0 &&
                    <View style={{ width: SIZES.fifteen }} />
                }
                <CustomButton
                    btnStyle={styles.btnStyle}
                    label={progress === 0 ? label.Payment : progress === 1 ? label.Review : label.PlaceOrder}
                    onPress={moveToNext} />


            </View>

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