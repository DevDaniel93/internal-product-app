import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES, STYLES } from '../../constants'
import HeaderWithArrow from '../../components/HeaderWithArrow'
import { useSelector } from 'react-redux'
import { getTheme } from '../../constants/theme'
import { useTranslation } from 'react-i18next'

export default function PrivacyPolicy() {
    const theme = useSelector(state => state.Theme.theme)
    const { t } = useTranslation();
    const currentTheme = getTheme(theme)

    const content = [
        {
            id: 1,
            label: "What is Lorem Ipsum?",
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            id: 2,
            label: "Why do we use it",
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            id: 3,
            label: "Where does it come from?",
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
    ]
    const ListContent = ({ item }) => {
        return (
            <View style={styles.contentArea}>
                <Text style={[styles.labelText, { color: currentTheme.defaultTextColor, }]}>
                    {item?.label}
                </Text>
                <Text style={[styles.content, { color: currentTheme.defaultTextColor, }]}>
                    {item?.content}
                </Text>
            </View>)

    }
    return (
        <View style={[STYLES.container, { backgroundColor: currentTheme.Background }]}>
            <HeaderWithArrow
                label={t('PrivacyPolicy')}
            />
            <FlatList
                showsVerticalScrollIndicator={false}
                data={content}
                keyExtractor={item => item?.id}
                renderItem={ListContent}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    contentArea: {
        marginTop: SIZES.fifteen
    },
    labelText: {
        fontWeight: "bold",
        fontSize: SIZES.twenty - 2,

        marginBottom: SIZES.five

    }, content: {
        fontSize: SIZES.fifteen,
    }
})