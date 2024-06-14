import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { label } from '../constants/lables'

export default function DrawerScreen({ navigation }) {
    return (
        <View>
            <TouchableOpacity
                onPress={() =>
                    navigation.openDrawer()
                }
            >
                <Text>
                    {label.OpenDrawer}
                </Text>
            </TouchableOpacity>
        </View >
    )
}

const styles = StyleSheet.create({})