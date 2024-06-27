import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal';
import { COLORS } from '../constants';
export default function Loading(props) {

    return (
        <Modal
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            isVisible={props.loading}>
            <ActivityIndicator size={"large"} color={COLORS.primary} />
        </Modal>
    )
}

const styles = StyleSheet.create({})