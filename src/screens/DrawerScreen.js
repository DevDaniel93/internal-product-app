import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function DrawerScreen({ navigation }) {
    return (
        <View>
            <TouchableOpacity
                onPress={() =>
                    navigation.openDrawer()
                }
            >
                <Text>
                    Open drawer
                </Text>
            </TouchableOpacity>
        </View >
    )
}

const styles = StyleSheet.create({})