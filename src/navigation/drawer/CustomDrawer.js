import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Image, ScrollView } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';


import { Pressable } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';


import { useDispatch, useSelector } from 'react-redux';
import { removeAccessToken, removeProfile } from '../redux/slice/auth';
import { RemoveAuthorNotes, removeAuthorDetail } from '../redux/slice/author';
import { COLORS, FONTFAMILY, SCREENS, SIZES } from '../../constants';
import { Menu } from '../../constants/DrawerMenu';
import { Icon, IconType } from '../../components';
import CustomHeader from '../../components/CustomHeader';
import CustomModal from '../../components/CustomModal';
import LottieView from 'lottie-react-native';
import CustomButton from '../../components/CustomButton';


export default CustomDrawer = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const [isvisible, setIsvisible] = useState(false)

    async function handleLogout() {
        try {
            setIsvisible(!isvisible)
            navigation.navigate(SCREENS.Login)
        } catch (e) {

        }
    };
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
            <CustomHeader />
            <View
                style={styles.line}
            />
            <ScrollView>
                {
                    Menu.map((item) => {
                        return (
                            <TouchableOpacity style={styles.drawerItem}
                                onPress={() => {
                                    if (item?.route === "logout") {
                                        setIsvisible(!isvisible)
                                    }
                                    else {

                                        navigation.navigate(item?.route)
                                    }
                                }}
                            >
                                <Icon name={item?.icon}
                                    type={item?.type}

                                    style={styles.Icon} />
                                <Text style={{ color: COLORS.defaultTextColor, fontSize: SIZES.fifteen + 2, fontWeight: '600', fontFamily: 'Poppins-Regular', }}>{item?.label}</Text>
                            </TouchableOpacity>
                        )
                    })
                }

            </ScrollView>
            <CustomModal isvisible={isvisible}>
                <Text style={styles.modelText}>
                    Are you sure you want to {" "}
                    <Text style={{ color: COLORS.primary }}>
                        log out?
                    </Text>
                </Text>
                <LottieView
                    style={styles.lottie}
                    autoPlay={true}
                    loop={true}
                    source={{ uri: "https://lottie.host/a8f4bc1d-03fa-470e-a682-8b4b459891c0/eJWI4xDtOG.json" }}
                />
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>


                    <CustomButton btnStyle={styles.btnStyle}
                        txtstyle={{ color: COLORS.primary }}
                        onPress={() => {
                            handleLogout()

                        }}
                        label={"Yes"} />
                    <CustomButton btnStyle={styles.btnStyle1}
                        label={"No"}
                        onPress={() => {
                            setIsvisible(!isvisible)
                        }}
                    />
                </View>
            </CustomModal>

        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        marginHorizontal: SIZES.fifteen,
        backgroundColor: COLORS.white
    },

    line: {
        borderWidth: 1,
        borderColor: COLORS.black,
    },




    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        fontFamily: 'Poppins',
        marginTop: SIZES.twentyFive,
    }
    ,
    Icon: {
        color: COLORS.primary,
        fontSize: SIZES.twentyFive,
        fontWeight: "700",
        paddingRight: SIZES.fifteen,
    },
    btnStyle: {
        width: "48%",
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.primary,
        padding: SIZES.ten

    },
    btnStyle1: {
        padding: SIZES.ten,
        width: "48%"
    },
    modelText: {
        color: COLORS.defaultTextColor,
        fontSize: SIZES.fifteen + 2,
        textAlign: "center",
        lineHeight: 30,
        fontWeight: "500",
        fontFamily: FONTFAMILY.Poppins
    },
    lottie: {
        width: SIZES.fifty * 3,
        height: SIZES.fifty * 3,
        alignSelf: "center"
    }

});