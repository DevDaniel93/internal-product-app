import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { COLORS, SIZES, height, width } from '../constants';


const CustomDropDownPicker = (props) => {
    const [focusColor, setFocusColor] = useState(COLORS.charcoalGrey);
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(props?.value ? props?.value : null)
    const [items, setItems] = useState(props?.list ? props?.list : [])


    return (
        <View style={[styles.textInputView, props.styleTxtArea, { marginTop: SIZES.ten }]}>
            {props?.label
                &&
                <Text style={[styles.textLabel, { color: focusColor !== COLORS.charcoalGrey ? focusColor : COLORS.black }]}>
                    {props.label}
                    {props?.required &&
                        <Text style={styles.required}> *</Text>}
                </Text>
            }
            <DropDownPicker
                onOpen={() => {
                    setFocusColor(COLORS.primary)
                }}
                onClose={() => {
                    setFocusColor(COLORS.gray)
                }}
                containerStyle={styles(props).dropDown}
                placeholder={props?.placeholder}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
            />

        </View>

    )
}

export default CustomDropDownPicker

const styles = (props) => StyleSheet.create({
    dropDown: {
        width: props?.width ? props?.width : "70%",
        paddingTop: SIZES.ten,
        zIndex: props.zIndex ? props.zIndex : 0,
        height: SIZES.twentyFive * 2.3,
    },
    textInputView: {

        // width: '100%',
        justifyContent: 'center',

        borderRadius: Math.sqrt(width + height),
    },
    textLabel: {
        fontFamily: "Poppins",
        fontSize: SIZES.fifteen,
        fontWeight: "500",
        marginBottom: SIZES.ten,
        color: COLORS.black
    },
})