import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EditText from '../../components/EditText';
import PhoneTextInput from '../../components/PhoneTextInput';
import { COLORS, SIZES } from '../../constants';
import CustomDropDownPicker from '../../components/CustomDropDownPicker';

const Shipping = () => {
    const [name, setName] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [phone, setPhone] = useState('')
    const [countryCode, setCountryCode] = useState('')

    const list = [{ label: 'One', value: 'one' },
    { label: 'Two', value: 'two' },
    { label: 'Three', value: 'three' }]



    return (
        <View>
            <EditText
                label={"Full Name"}
                value={name}
                required
                onChangeText={(e) => {
                    setName(e)
                }}
                placeholder={"Enter full name"}
            />
            <Text style={styles.textLabel}> Phone Number <Text style={styles.required}> *</Text></Text>

            <PhoneTextInput phone={phone} setPhone={setPhone} setCountryCode={setCountryCode} />
            <CustomDropDownPicker list={list} width={"100%"} placeholder={"Select State"}/>
            <CustomDropDownPicker list={list} width={"100%"} placeholder={"Select City"}/>

            <EditText
                label={"Street Address"}
                value={address}
                required
                onChangeText={(e) => {
                    setAddress(e)
                }}
                placeholder={"Enter street address"}
            />
            <EditText
                label={"Postal Code"}
                value={postalCode}
                required
                onChangeText={(e) => {
                    setPostalCode(e)
                }}
                placeholder={"Enter postal code"}
            />
        </View>
    )
}

export default Shipping

const styles = StyleSheet.create({
    textInputStyle: {
        padding: 0,
    },
    countryPickerButtonStyle: {
        backgroundColor: COLORS.transparent,
    },
    textContainerStyle: {
        backgroundColor: COLORS.transparent,
    },
    containerStyle: {
        height: 65,
        width: '100%',
        borderWidth: 1,
        borderRadius: SIZES.fifteen,
        marginTop: SIZES.fifteen * 1.3,
    },
    textLabel: {
        fontFamily: "Poppins",
        fontSize: SIZES.fifteen,
        fontWeight: "500",
        color: COLORS.black,
        marginTop: SIZES.five,
        top: SIZES.ten
    },
    required: {
        color: COLORS.red,

    }
})