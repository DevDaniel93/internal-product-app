import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import Stars from 'react-native-stars';
import { COLORS, FONTFAMILY, IMAGES, SIZES } from '../constants';
import Icon, { IconType } from './Icons';
import EditText from './EditText';
import CustomButton from './CustomButton';
import { useSelector } from 'react-redux';
import { getTheme } from '../constants/theme';
import { useTranslation } from 'react-i18next';
export default function Reviews() {
    const [star, setStar] = useState(0)
    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    const { t } = useTranslation();


    const CustomerReviews = () => {
        return (
            <View style={{ paddingVertical: SIZES.ten, borderBottomWidth: 1, borderColor: currentTheme.defaultTextColor }}>
                <View style={[styles.row, { justifyContent: "space-between" }]}>
                    <View style={styles.row}>
                        <Image
                            source={IMAGES.user}
                            style={styles.img}
                            resizeMode='contain'
                        />
                        <Text style={[styles.UserName, { color: currentTheme.defaultTextColor }]}>
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
                <Text style={[styles.txt, { color: currentTheme.defaultTextColor }]}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                </Text>

            </View>
        )
    }
    return (
        <View>
            <Text style={[styles.heading, { color: currentTheme.defaultTextColor, }]}>
                {t('Reviews')}
            </Text>
            <View style={{ alignItems: "flex-start", marginVertical: SIZES.five }}>
                <Stars
                    display={star}
                    spacing={8}
                    count={5}
                    starSize={SIZES.twentyFive}
                    disabled={false}
                    fullStar={<Icon name={'star'} type={IconType.MaterialCommunityIcons} color={COLORS.golden} />}
                    emptyStar={<Icon name={'star-outline'} type={IconType.MaterialCommunityIcons} color={COLORS.golden} />}
                    halfStar={<Icon name={'star-half'} type={IconType.MaterialCommunityIcons} color={COLORS.golden} />}
                />
            </View>
            <EditText
                placeholder={t('WriteYourReviews')}
                inputArea={{ borderRadius: SIZES.fifty }}
            />
            <CustomButton
                label={t('AddReview')}
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

        marginLeft: SIZES.ten
    },
    txt: {
        marginVertical: SIZES.ten
    }
})