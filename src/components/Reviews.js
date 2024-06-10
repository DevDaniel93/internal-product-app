import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Stars from 'react-native-stars';
import { COLORS, FONTFAMILY, IMAGES, SIZES } from '../constants';
import Icon, { IconType } from './Icons';
import EditText from './EditText';
import CustomButton from './CustomButton';
export default function Reviews() {

    const CustomerReviews = () => {
        return (
            <View style={{ paddingVertical: SIZES.ten, borderBottomWidth: 1 }}>
                <View style={[styles.row, { justifyContent: "space-between" }]}>
                    <View style={styles.row}>
                        <Image
                            source={IMAGES.user}
                            style={styles.img}
                            resizeMode='contain'
                        />
                        <Text style={styles.UserName}>
                            Jane Done
                        </Text>
                    </View>
                    <Stars
                        display={3.67}
                        spacing={2}
                        count={5}
                        starSize={SIZES.ten}
                        disabled={true}
                        fullStar={<Icon name={'star'} type={IconType.MaterialCommunityIcons} color={COLORS.golden} />}
                        emptyStar={<Icon name={'star-outline'} type={IconType.MaterialCommunityIcons} color={COLORS.golden} />}
                        halfStar={<Icon name={'star-half'} type={IconType.MaterialCommunityIcons} color={COLORS.golden} />}
                    />
                </View>
                <Text style={styles.txt}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                </Text>

            </View>
        )
    }
    return (
        <View>
            <Text style={styles.heading}>
                Reviews
            </Text>
            <View style={{ alignItems: "flex-start", marginVertical: SIZES.five }}>
                <Stars
                    display={3.67}
                    spacing={8}
                    count={5}
                    starSize={SIZES.twentyFive}
                    disabled={true}
                    fullStar={<Icon name={'star'} type={IconType.MaterialCommunityIcons} color={COLORS.golden} />}
                    emptyStar={<Icon name={'star-outline'} type={IconType.MaterialCommunityIcons} color={COLORS.golden} />}
                    halfStar={<Icon name={'star-half'} type={IconType.MaterialCommunityIcons} color={COLORS.golden} />}
                />
            </View>
            <EditText
                placeholder={"Write your reviews"}
                inputArea={{ borderRadius: SIZES.fifty }}
            />
            <CustomButton
                label={"Add Review"}
            />
            <CustomerReviews />
            <CustomerReviews />
            <CustomerReviews />
            <CustomerReviews />

        </View>
    )
}

const styles = StyleSheet.create({
    heading: {
        color: COLORS.black,
        fontSize: SIZES.twenty - 2,
        fontFamily: FONTFAMILY.Poppins,
        fontWeight: "600"
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    img: {
        width: SIZES.fifty * .9,
        height: SIZES.fifty * .9,
        borderRadius: SIZES.fifty
    },
    UserName: {
        fontWeight: "bold",
        color: COLORS.black,
        marginLeft: SIZES.ten
    },
    txt: {
        color: COLORS.black,
        marginVertical: SIZES.ten
    }
})