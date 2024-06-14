import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EditText from '../../components/EditText';
import PhoneTextInput from '../../components/PhoneTextInput';
import { COLORS, SIZES } from '../../constants';
import CustomDropDownPicker from '../../components/CustomDropDownPicker';
import axios from 'axios';
import { label } from '../../constants/lables';

const Shipping = () => {
    const [name, setName] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [phone, setPhone] = useState('');
    const [countryCode, setCountryCode] = useState('US'); // Default country code to US

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const list = [{ label: 'One', value: 'one' },
    { label: 'Two', value: 'two' },
    { label: 'Three', value: 'three' }]


    useEffect(() => {
        fetchCountryData();
    }, []);
    const handleStateChange = (stateCode) => {
        setState(stateCode);
        const selectedState = states.find(s => s.state_code === stateCode);
        if (selectedState) {
            setCities(selectedState.cities);
        }
    };

    const fetchCountryData = async () => {
        try {
            const response = await axios.get('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries.json');
            setCountries(response.data.countries);
            const defaultCountry = response.data.countries.find(country => country.iso2 === countryCode);
            if (defaultCountry) {
                setStates(defaultCountry.states);
            }
        } catch (error) {
            console.error('Error fetching country data:', error);
        }
    };

    return (
        <View>
            <EditText
                label={label.FullName}
                value={name}
                required
                onChangeText={(e) => {
                    setName(e)
                }}
                placeholder={label.EnterFullName}
            />
            <Text style={styles.textLabel}> {label.PhoneNumber} <Text style={styles.required}> *</Text></Text>

            <PhoneTextInput phone={phone} setPhone={setPhone} setCountryCode={setCountryCode} />

            <CustomDropDownPicker
                label={label.State}
                list={states.map(state => ({ label: state.name, value: state.state_code }))}
                width={"100%"}
                placeholder={label.selectedState}
                zIndex={1000}
                onChangeValue={handleStateChange}
            />
            <CustomDropDownPicker
                label={label.City}
                list={cities.map(city => ({ label: city.name, value: city.name }))}
                width={"100%"}
                placeholder={label.SelectCity}
                zIndex={1}
                onChangeValue={(value) => setCity(value)}
            />

            <EditText
                label={label.StreetAddress}
                value={address}
                required
                onChangeText={(e) => {
                    setAddress(e)
                }}
                placeholder={label.EnterStreetAddress}
            />
            <EditText
                label={label.PostalCode}
                value={postalCode}
                required
                onChangeText={(e) => {
                    setPostalCode(e)
                }}
                placeholder={label.EnterPostalCode}
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
        color: COLORS.defaultTextColor,
        marginTop: SIZES.five,
        top: SIZES.ten
    },
    required: {
        color: COLORS.red,

    }
})