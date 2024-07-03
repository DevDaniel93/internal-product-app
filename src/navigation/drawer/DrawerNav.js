// import { createDrawerNavigator } from '@react-navigation/drawer'
// import React from 'react'
// import { Platform, StyleSheet } from 'react-native'

// import CustomDrawer from './CustomDrawer';
// import { ScreensArray } from '../../constants/DrawerMenu';
// import BottamTab from '../bottamTab/BottamTab';

// const Drawer = createDrawerNavigator();

// const DrawerNav = () => {





//     return (
//         <Drawer.Navigator
//             initialRouteName='BottomTabs'
//             screenOptions={{

//                 drawerStyle: styles.drawerStyles,
//                 drawerType: 'front',
//                 swipeEdgeWidth: Platform.OS === 'android' && 180,
//             }}
//             drawerContent={(props) => <CustomDrawer {...props} />}
//         >
//             <Drawer.Screen
//                 name="BottomTabs"
//                 component={BottamTab}
//                 options={{
//                     headerShown: false,
//                     item: { route: 'BottomTabs' },
//                 }}
//             />
//             {ScreensArray.map((_, i) => (
//                 <Drawer.Screen key={i} name={_.route} component={_.component}
//                     options={{
//                         headerShown: false,
//                         item: _,
//                     }}
//                 />
//             ))}

//         </Drawer.Navigator>
//     )
// }

// export default DrawerNav

// const styles = StyleSheet.create({
//     drawerStyles: {
//         width: 260,
//         backgroundColor: 'transparent',
//     },
//     safeArea: {
//         flex: 1,
//         backgroundColor: 'white'
//     },
// })
// // App.js
import { View, Text } from 'react-native';
import React from 'react';

import CustomDrawer from './CustomDrawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SCREENS } from '../../constants';
import BottamTab from '../bottamTab/BottamTab';
import { Menu } from '../../constants/DrawerMenu';
import { Easing } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { getTheme } from '../../constants/theme';
const config = {
    animation: 'timing',
    config: {
        duration: 500,
        easing: Easing.linear,
    },
};

const closeConfig = {
    animation: 'timing',
    config: {
        duration: 500,
        easing: Easing.linear,
    },
};
const fadeInAnimation = ({ current }) => ({
    cardStyle: {
        opacity: current.progress,
    },
});

const Drawer = createDrawerNavigator();
export default function DrawerNavigator() {
    const theme = useSelector(state => state.Theme.theme)
    const currentTheme = getTheme(theme)
    return (
        <Drawer.Navigator
            screenOptions={{
                sceneContainerStyle: {
                    backgroundColor: currentTheme.Background,
                    flex: 1
                },
                transitionSpec: {
                    open: config,
                    close: closeConfig,
                },
                cardStyleInterpolator: fadeInAnimation,
            }}
            drawerContent={(props) => <CustomDrawer{...props} />}
        >

            <Drawer.Screen name={SCREENS.BottamTab} component={BottamTab} options={{ headerShown: false, headerTitle: '' }} />
            {
                Menu.map((item) => {

                    <Drawer.Screen name={item?.route} component={item?.component} options={{ headerShown: false, headerTitle: '' }} />
                })
            }
        </Drawer.Navigator>
    )
}