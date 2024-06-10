import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Image, ScrollView } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';


import { Pressable } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';


import { useDispatch, useSelector } from 'react-redux';
import { removeAccessToken, removeProfile } from '../redux/slice/auth';
import { RemoveAuthorNotes, removeAuthorDetail } from '../redux/slice/author';
import { COLORS, SIZES } from '../../constants';
import { Menu } from '../../constants/DrawerMenu';
import { Icon, IconType } from '../../components';
import CustomHeader from '../../components/CustomHeader';


export default CustomDrawer = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch()




    async function logoutMyToken() {
        try {

        } catch (e) {

        }
    };
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
            <CustomHeader />
            <ScrollView>
                {
                    Menu.map((item) => {
                        return (
                            <TouchableOpacity style={styles.drawerItem}
                                onPress={() => {
                                    navigation.navigate(item?.route)
                                }}
                            >
                                <Icon name={item?.icon}
                                    type={item?.type}

                                    style={styles.Icon} />
                                <Text style={{ color: COLORS.black, fontSize: SIZES.fifteen + 2, fontWeight: '600', fontFamily: 'Poppins-Regular', }}>{item?.label}</Text>
                            </TouchableOpacity>
                        )
                    })
                }

            </ScrollView>


        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        marginLeft: SIZES.fifteen,
        backgroundColor: COLORS.white
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

});