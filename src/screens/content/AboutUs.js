import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { STYLES } from '../../constants'
import HeaderWithArrow from '../../components/HeaderWithArrow'
import { useSelector } from 'react-redux'
import { getTheme } from '../../constants/theme'
import { useTranslation } from 'react-i18next'

export default function AboutUs() {
    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    const { t } = useTranslation();
    return (
        <View style={[STYLES.container, { backgroundColor: currentTheme.Background }]}>
            <HeaderWithArrow
                label={t('AboutUs')} />
        </View>
    )
}

const styles = StyleSheet.create({})