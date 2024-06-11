import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import HeaderWithArrow from '../../components/HeaderWithArrow'
import { STYLES } from '../../constants'
import EditText from '../../components/EditText'
import ProgressBar from '../../components/ProgressBar'
import Shipping from './Shipping'
import Payment from './Payment'
import Review from './Review'
import CustomButton from '../../components/CustomButton'


export default function CheckOut() {
    const [progress, setProgress] = useState(0)

    const moveToNext = () => {
        setProgress(progress + 1)
    }

    return (
        <ScrollView style={STYLES.container}>
            <HeaderWithArrow
                label="CheckOut" />

            <ProgressBar mode={progress} />

            {progress === 0 ?
                <Shipping />
                : progress === 1 ?
                    <Payment />
                    :
                    <Review />
            }

            <CustomButton
                label={progress === 0 ? "Payment" : progress === 1 ? "Review" : "Place Order"}
                onPress={moveToNext} />

        </ScrollView>
    )
}

const styles = StyleSheet.create({})