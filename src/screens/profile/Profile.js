import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, IMAGES, SIZES, STYLES, height } from '../../constants'
import HeaderWithArrow from '../../components/HeaderWithArrow'
import EditText from '../../components/EditText'
import CustomButton from '../../components/CustomButton'
import { Icon, IconType } from '../../components'

export default function Profile(props) {
    const { navigation } = props
    const [isEdit, setIsEdit] = useState(true)
    const [firstName, setFirstName] = useState(__DEV__ ? "Taimoor" : '')
    const [lastName, setLastName] = useState(__DEV__ ? "khan" : '')
    const [email, setEmail] = useState(__DEV__ ? "taimoor@yopmail.com" : '')

    const ProfilePic = () => {
        return (
            <View style={styles.imgConatiner}>
                <Image source={IMAGES.user} style={styles.img} resizeMode="contain" />
                {isEdit &&
                    <TouchableOpacity style={styles.iconContainer}>
                        <Icon
                            name={"camera"}
                            type={IconType.Entypo}
                            color={COLORS.white}
                            size={SIZES.twenty}
                        />
                    </TouchableOpacity>
                }

            </View>
        )
    }
    const handleChanges = () => {
        setIsEdit(pre => !pre)
    }
    return (
        <View style={STYLES.container}>
            <HeaderWithArrow label={isEdit ? "Edit Profile" : "Profile"} />
            <ProfilePic />
            <EditText
                value={firstName}
                editable={isEdit ? true : false}
                label={"First name"}
            />
            <EditText
                editable={isEdit ? true : false}
                value={lastName}
                label={"Last name"}
            />
            <EditText
                editable={isEdit ? true : false}
                value={email}
                label={"email"}
            />
            <CustomButton
                onPress={handleChanges}
                btnStyle={{ marginTop: SIZES.twentyFive }}
                label={isEdit ? "Save Change" : "Edit Profile"}
            />
            {isEdit === true &&
                <CustomButton
                    txtstyle={styles.txtstyle}
                    btnStyle={styles.btnStyle}
                    label={"Change password"}
                />
            }

        </View>
    )
}

const styles = StyleSheet.create({
    btnStyle: {
        backgroundColor: COLORS.white,
        borderColor: COLORS.primary,
        borderWidth: 1,

    },
    txtstyle: {
        color: COLORS.primary
    },
    img: {
        width: "100%",
        height: "100%",
        borderRadius: SIZES.fifty,
    },
    imgConatiner: {
        width: height * .15,
        height: height * .15,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: SIZES.twenty,
        alignSelf: "center",
        borderColor: COLORS.primary,
        borderWidth: 2,
        borderRadius: SIZES.fifty,
    },
    iconContainer: {
        backgroundColor: COLORS.primary,
        padding: SIZES.ten - 2,
        borderRadius: SIZES.fifty,
        position: "absolute",
        bottom: 0,
        right: 10
    }
})