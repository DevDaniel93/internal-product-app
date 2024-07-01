import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS } from '../constants';
import { useSelector } from 'react-redux';
import { IMAGES, SIZES, getTheme } from '../constants/theme';

const CustomToast = ({ text1, text2 }) => {
    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    return (
        <View style={[styles.container, { backgroundColor: currentTheme.primary }]}>
            <Image
                source={IMAGES.icon}
                style={styles.img}
            />
            <View>
                <Text style={styles.text1}>{text1}</Text>
                {text2 ? <Text style={styles.text2}>{text2}</Text> : null}
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: SIZES.fifteen,
        borderRadius: SIZES.ten,
        // marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    text1: {
        color: '#FFFFFF', // Custom text color
        fontSize: 18,
        fontWeight: 'bold',

    },
    text2: {
        color: '#FFFFFF', // Custom text color
        fontSize: 16,

    },
    img: {
        width: SIZES.fifty - SIZES.twenty,
        height: SIZES.fifty - SIZES.twenty,
        resizeMode: "contain",
        marginRight: SIZES.fifteen,
    }
});

export default CustomToast;
