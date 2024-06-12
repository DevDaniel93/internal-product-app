import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, IMAGES, SIZES, STYLES, height } from '../../constants'
import HeaderWithArrow from '../../components/HeaderWithArrow'
import EditText from '../../components/EditText'
import CustomButton from '../../components/CustomButton'
import { Icon, IconType } from '../../components'
import UploadPhotoModal from '../../components/modal/UploadPhotoModal'
import CustomModal from '../../components/CustomModal'

export default function Profile(props) {
    const { navigation } = props
    const [isEdit, setIsEdit] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [changePasswordModal, setChangePasswordModal] = useState(false)
    const [image, setImage] = useState('')
    const [firstName, setFirstName] = useState(__DEV__ ? "Taimoor" : '')
    const [lastName, setLastName] = useState(__DEV__ ? "khan" : '')
    const [email, setEmail] = useState(__DEV__ ? "taimoor@yopmail.com" : '')


    const ProfilePic = () => {
        return (
            <View style={styles.imgConatiner}>
                <Image source={image !== "" ? { uri: image?.path } : IMAGES.user} style={styles.img} resizeMode="contain" />
                {isEdit &&
                    <TouchableOpacity
                        onPress={() => {
                            setIsVisible(!isVisible)
                        }}
                        style={styles.iconContainer}>
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
                    onPress={() => {
                        setChangePasswordModal(!changePasswordModal)
                    }}
                    txtstyle={styles.txtstyle}
                    btnStyle={styles.btnStyle}
                    label={"Change password"}
                />
            }
            <UploadPhotoModal
                visibility={isVisible}
                onImageSelected={setImage}
                setVisibility={setIsVisible}
            />
            <CustomModal
                isvisible={changePasswordModal}
            >
                <Text style={styles.heading}>
                    Change Password
                </Text>
                <EditText

                    required
                    label={"Enter old password"}

                />
                <EditText

                    required
                    label={"Enter New Password"}

                />
                <EditText

                    required
                    label={"Confirm password"}

                />
                <CustomButton
                    btnStyle={{ marginVertical: SIZES.fifteen }}
                    onPress={() => {
                        setChangePasswordModal(!changePasswordModal)

                    }}
                    label={"Update"} />

            </CustomModal>

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
    },



    heading: {
        color: COLORS.black,
        alignSelf: "center",
        marginVertical: SIZES.fifteen,
        fontSize: SIZES.twenty,
        fontWeight: "600"
    }

})