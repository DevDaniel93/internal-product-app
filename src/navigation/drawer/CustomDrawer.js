
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { COLORS, FONTFAMILY, SCREENS, SIZES } from '../../constants';
import { Menu } from '../../constants/DrawerMenu';
import { Icon, IconType } from '../../components';
import CustomHeader from '../../components/CustomHeader';
import CustomModal from '../../components/CustomModal';
import LottieView from 'lottie-react-native';
import CustomButton from '../../components/CustomButton';
import { getTheme } from '../../constants/theme';
import { toggleTheme } from '../../redux/slices/theme';
import { useTranslation } from 'react-i18next';

const CustomDrawer = (props) => {
    const navigation = useNavigation();
    const { t, i18n } = useTranslation();
    const theme = useSelector(state => state.Theme.theme);
    const user = useSelector(state => state.Auth.user)
    const currentTheme = getTheme(theme);
    const dispatch = useDispatch();
    const [isvisible, setIsvisible] = useState(false);
    const [isvisibleLanguageModal, setIsvisibleLanguageModal] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => {

        if (theme === 'Light') {

            dispatch(toggleTheme("Dark"));
        } else {
            dispatch(toggleTheme("Light"));
        }
        setIsEnabled(previousState => !previousState);
    }

    useEffect(() => {
        if (theme === "Dark") {
            setIsEnabled(true)
        }
    }, [])

    async function handleLogout() {
        try {
            setIsvisible(!isvisible);
            navigation.navigate(SCREENS.Login);
        } catch (e) {
            console.error(e);
        }
    };

    const getTranslatedMenu = () => {
        return Menu.map((item) => ({
            ...item,
            label: t(item.labelKey)
        }));
    };

    const translatedMenu = getTranslatedMenu();

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={[styles.container, { backgroundColor: currentTheme.Background }]}>
            <View style={{ marginHorizontal: SIZES.fifteen }}>
                <CustomHeader />
                <View style={[styles.line, { borderColor: currentTheme.defaultTextColor }]} />

                <ScrollView>
                    {translatedMenu.map((item) => (
                        <TouchableOpacity
                            key={item.route}
                            style={styles.drawerItem}
                            onPress={() => {
                                if (item.route === "logout") {
                                    setIsvisible(!isvisible);
                                } else if (item.route === SCREENS.profile) {
                                    navigation.navigate(user !== null ? item.route : SCREENS.Login);
                                }
                                else if (item.route === "language") {
                                    setIsvisibleLanguageModal(!isvisibleLanguageModal);
                                } else {
                                    navigation.navigate(item.route);
                                }
                            }}
                        >
                            <Icon name={item.icon} type={item.type} style={styles.Icon} />
                            <Text style={{ color: currentTheme.defaultTextColor, fontSize: SIZES.fifteen + 2, fontWeight: '600', fontFamily: 'Poppins-Regular' }}>
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Language Selection Modal */}
                <CustomModal isvisible={isvisibleLanguageModal}>
                    <Text style={[styles.modelText, { color: currentTheme.defaultTextColor }]}>
                        Select <Text style={{ color: COLORS.primary }}>Language</Text>
                    </Text>
                    <TouchableOpacity
                        style={[styles.languageContainer, { borderColor: currentTheme.primary }]}
                        onPress={() => {
                            i18n.changeLanguage("en");
                            setIsvisibleLanguageModal(!isvisibleLanguageModal);
                        }}
                    >
                        <Text style={{ color: currentTheme.defaultTextColor, fontSize: SIZES.fifteen }}>English</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.languageContainer, { borderColor: currentTheme.primary }]}
                        onPress={() => {
                            i18n.changeLanguage("fr");
                            setIsvisibleLanguageModal(!isvisibleLanguageModal);
                        }}
                    >
                        <Text style={{ color: currentTheme.defaultTextColor, fontSize: SIZES.fifteen }}>French</Text>
                    </TouchableOpacity>
                </CustomModal>

                {/* Logout Confirmation Modal */}
                <CustomModal isvisible={isvisible}>
                    <Text style={[styles.modelText, { color: currentTheme.defaultTextColor }]}>

                        {t('Are you sure you want to')} <Text style={{ color: COLORS.primary }}>{t('logout')}?</Text>
                    </Text>
                    <LottieView
                        style={styles.lottie}
                        autoPlay={true}
                        loop={true}
                        source={{ uri: "https://lottie.host/a8f4bc1d-03fa-470e-a682-8b4b459891c0/eJWI4xDtOG.json" }}
                    />
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <CustomButton
                            btnStyle={[styles.btnStyle, { backgroundColor: currentTheme.Background }]}
                            txtstyle={{ color: COLORS.primary }}
                            onPress={handleLogout}
                            label={t('Yes')}
                        />
                        <CustomButton
                            btnStyle={styles.btnStyle1}
                            label={t('No')}
                            onPress={() => setIsvisible(!isvisible)}
                        />
                    </View>
                </CustomModal>

                <View style={{ flexDirection: "row", marginTop: SIZES.twentyFive, alignItems: "center" }}>
                    <Text style={[styles.toggleText, { color: currentTheme.defaultTextColor }]}>
                        {theme} mode
                    </Text>
                    <Switch
                        trackColor={{ false: '#767577', true: currentTheme.gray }}
                        thumbColor={isEnabled ? currentTheme.primary : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
            </View>
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
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
    },
    Icon: {
        color: COLORS.primary,
        fontSize: SIZES.twentyFive,
        fontWeight: "700",
        paddingRight: SIZES.fifteen,
    },
    btnStyle: {
        width: "48%",
        borderWidth: 1,
        borderColor: COLORS.primary,
        padding: SIZES.ten,
    },
    btnStyle1: {
        padding: SIZES.ten,
        width: "48%",
    },
    modelText: {
        color: COLORS.defaultTextColor,
        fontSize: SIZES.fifteen + 2,
        textAlign: "center",
        lineHeight: 30,
        fontWeight: "500",
        fontFamily: FONTFAMILY.Poppins,
    },
    lottie: {
        width: SIZES.fifty * 3,
        height: SIZES.fifty * 3,
        alignSelf: "center",
    },
    toggleText: {
        fontSize: SIZES.twenty - 2,
        marginRight: SIZES.ten,
        fontWeight: "600",
        fontFamily: FONTFAMILY.Poppins,
    },
    languageContainer: {
        borderWidth: 1,
        padding: SIZES.ten,
        borderRadius: SIZES.ten,
        marginTop: SIZES.ten,
    },
});

export default CustomDrawer;
