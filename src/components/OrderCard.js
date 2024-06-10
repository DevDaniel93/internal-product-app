import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ShadedBox from './ShadedBox'
import { COLORS, FONTFAMILY, SCREENS, SIZES, width } from '../constants'
import { useNavigation } from '@react-navigation/native'


export default function OrderCard(props) {
    const navigation = useNavigation()
    return (

        <ShadedBox>
            <View style={styles.row}>
                <Text style={styles.txt}>
                    Order Number{" "}
                    <Text style={{ fontWeight: "600" }}>
                        #{props?.data?.orderNumber}
                    </Text>
                </Text>
                <View style={{ width: width * .3, justifyContent: "center", alignItems: "center" }}>
                    <Text style={styles.txt}>
                        Status{"  "}
                        <Text style={{ fontWeight: "600" }}>
                            {props?.data?.status}
                        </Text>
                    </Text>
                </View>
            </View>
            <View style={styles.dotLine} />
            <View style={styles.row}>
                <Text style={styles.txt}>
                    Total Price{"   "}
                    <Text style={{ fontWeight: "600" }}>
                        ${props?.data?.amount}
                    </Text>
                    {" "}
                    ({props?.data?.quantity} Items)
                </Text>
                <TouchableOpacity style={styles.btn}
                    onPress={() => {
                        navigation.navigate(SCREENS.OrderDetails)
                    }}
                >
                    <Text style={{ color: COLORS.white }}>
                        View Order
                    </Text>
                </TouchableOpacity>
            </View>
        </ShadedBox>
    )
}

const styles = StyleSheet.create({
    row: {

        flexDirection: "row",
        justifyContent: "space-between",
        marginRight: SIZES.fifteen,

    },
    txt: {
        fontSize: SIZES.fifteen - 1,
        color: COLORS.black,
        fontFamily: FONTFAMILY.Poppins,
    },
    dotLine: {
        borderWidth: 1,
        borderStyle: "dashed",
        marginVertical: SIZES.fifteen,
        borderColor: COLORS.gray
    },
    btn: {
        backgroundColor: COLORS.primary,
        width: width * .3,
        paddingVertical: SIZES.five,
        borderRadius: SIZES.fifty,
        justifyContent: "center",
        alignItems: "center"
    }

})