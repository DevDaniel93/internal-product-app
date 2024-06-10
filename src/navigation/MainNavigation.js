import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREENS } from "../constants";
import { View } from "react-native";
import BottamTab from "./bottamTab/BottamTab";
import DrawerNav from "./drawer/DrawerNav";
import Login from "../screens/auth/Login";
import Signup from "../screens/auth/SignUp";
import ConfirmationMail from "../screens/auth/ConfirmationMail";
import EmailVerification from "../screens/auth/EmailVerification";
import NewPassword from "../screens/auth/NewPassword";
import Home from "../screens/home/Home";
import OrderDetails from "../screens/order/OrderDetails";
import ContactUs from "../screens/contactUs/ContactUs";
import SingleProduct from "../screens/product/SingleProduct";
import CheckOut from "../screens/checkOut/CheckOut";
import DrawerSceneWrapper from "../components/DrawerSceneWrapper";

import TermAndCondition from "../screens/content/TermsAndConditon";
import PrivacyPolicy from "../screens/content/PrivacyPolicy";
import AboutUs from "../screens/content/AboutUs";

const Stack = createNativeStackNavigator();
const screenOptions = {
    headerShown: false,
    animation: "slide_from_right",
};
const Demo = () => {
    return (
        <View>

        </View>
    )
}
export default function MainNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={screenOptions}
                initialRouteName={SCREENS.Login}
            >

                <Stack.Screen name={SCREENS.Login} component={Login} />
                <Stack.Screen name={SCREENS.SignUp} component={Signup} />
                <Stack.Screen name={SCREENS.ConfirmationMail} component={ConfirmationMail}
                    options={({ route }) => ({
                        headerShown: true,
                        headerShadowVisible: false,
                        headerTitle: route.params.title,
                    })}
                />
                <Stack.Screen name={SCREENS.EmailVerification} component={EmailVerification}
                    options={({ route }) => ({
                        headerShown: true,
                        headerShadowVisible: false,
                        headerTitle: "Forgot Password",
                    })} />

                <Stack.Screen name={SCREENS.NewPassword} component={NewPassword}
                    options={({ route }) => ({
                        headerShown: true,
                        headerShadowVisible: false,
                        headerTitle: "Create Password",
                    })}
                />
                <Stack.Screen name={SCREENS.Drawer} component={DrawerNav} />
                {/* <Stack.Screen name={SCREENS.Home} component={Home} /> */}
                <Stack.Screen name={SCREENS.OrderDetails} component={OrderDetails} />
                <Stack.Screen name={SCREENS.contactUs} component={ContactUs} />
                <Stack.Screen name={SCREENS.termAndCondition} component={TermAndCondition} />
                <Stack.Screen name={SCREENS.privacyPolicy} component={PrivacyPolicy} />
                <Stack.Screen name={SCREENS.singleProduct} component={SingleProduct} />
                <Stack.Screen name={SCREENS.checkOut} component={CheckOut} />
                <Stack.Screen name={SCREENS.About} component={AboutUs} />
            </Stack.Navigator>

        </NavigationContainer>
    );
}