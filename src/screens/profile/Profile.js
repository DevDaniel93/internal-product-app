import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, IMAGES, SIZES, STYLES, height } from '../../constants'
import HeaderWithArrow from '../../components/HeaderWithArrow'
import EditText from '../../components/EditText'
import CustomButton from '../../components/CustomButton'
import { Icon, IconType } from '../../components'
import UploadPhotoModal from '../../components/modal/UploadPhotoModal'
import CustomModal from '../../components/CustomModal'
import { useSelector } from 'react-redux'
import { getTheme } from '../../constants/theme'
import { useTranslation } from 'react-i18next'

export default function Profile(props) {
    const theme = useSelector(state => state.Theme.theme)
    const { t } = useTranslation();
    const currentTheme = getTheme(theme)
    const user = useSelector(state => state.Auth.user)
    console.log({user})

    const { navigation } = props
    const [isEdit, setIsEdit] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [changePasswordModal, setChangePasswordModal] = useState(false)
    const [image, setImage] = useState('')
    const [firstName, setFirstName] = useState(user?.first_name)
    const [lastName, setLastName] = useState(user?.last_name)
    const [email, setEmail] = useState(user?.email)


    const ProfilePic = () => {
        return (
            <View style={styles.imgConatiner}>
                <Image source={image !== "" ? { uri: image?.path } : user!==null?{uri:user?.user_avatar}:IMAGES.user} style={styles.img} resizeMode="contain" />
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
        <View style={[STYLES.container, { backgroundColor: currentTheme.Background }]}>
            <HeaderWithArrow label={isEdit ? t('EditProfile') : t('Profile')} />
            <ProfilePic />
            <EditText

                value={firstName}
                onChangeText={(e)=>{
                    setFirstName(e)
                }}
                editable={isEdit ? true : false}
                label={t('FirstName')}
            />
            <EditText
             value={lastName}
             onChangeText={(e)=>{
                 setLastName(e)
             }}
              
                editable={isEdit ? true : false}
                label={t('LastName')}

            />
            <EditText
            value={email}
            onChangeText={(e)=>{
                setEmail(e)
            }}
              
                editable={isEdit ? true : false}
                label={t('Email')}

            />
            <CustomButton
                onPress={handleChanges}
                btnStyle={{ marginTop: SIZES.twentyFive }}
                label={isEdit ? t('SaveChanges') : t('EditProfile')}
            />
            {isEdit === true &&
                <CustomButton
                    onPress={() => {
                        setChangePasswordModal(!changePasswordModal)
                    }}
                    txtstyle={styles.txtstyle}
                    btnStyle={[styles.btnStyle, { backgroundColor: currentTheme.Background, }]}
                    label={t('ChangePassword')}
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
                    {t('ChangePassword')}
                </Text>
                <EditText
                    required
                    label={t('EnterOldPassword')}

                />
                <EditText
                    required
                    label={t('EnterNewPassword')}

                />
                <EditText
                    required
                    label={t('ConfirmPassword')}
                />
                <CustomButton
                    btnStyle={{ marginVertical: SIZES.fifteen }}
                    onPress={() => {
                        setChangePasswordModal(!changePasswordModal)

                    }}
                    label={t('Update')}
                />

            </CustomModal>

        </View>
    )
}

const styles = StyleSheet.create({
    btnStyle: {

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
        color: COLORS.defaultTextColor,
        alignSelf: "center",
        marginVertical: SIZES.fifteen,
        fontSize: SIZES.twenty,
        fontWeight: "600"
    }

})