import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { SIZES } from '../constants';


const CustomDropDownPicker = ( props ) => {

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(props?.value ? props?.value : null)
    const [items, setItems] = useState(props?.list ? props?.list : [])

    
    return (
        <DropDownPicker
            containerStyle={styles(props).dropDown}
            placeholder={props?.placeholder}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
        />
    )
}

export default CustomDropDownPicker

const styles = (props) => StyleSheet.create({
    dropDown: {
        width: props?.width ? props?.width : "70%",
        paddingTop: SIZES.fifteen,
    }
})