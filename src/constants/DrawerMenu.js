
import { IconType } from "../components";
import DrawerScreen from "../screens/DrawerScreen";
import ContactUs from "../screens/contactUs/ContactUs";
import AboutUs from "../screens/content/AboutUs";
import PrivacyPolicy from "../screens/content/PrivacyPolicy";
import termAndCondition from "../screens/content/TermsAndConditon";
import Home from "../screens/home/Home";
import MyOrder from "../screens/order/MyOrder";
import Profile from "../screens/profile/Profile";
import WishList from "../screens/wishList/WishList";
import { COLORS, SCREENS } from "./theme";

export const Menu = [
    { route: SCREENS.Home, label: 'Home', type: IconType.FontAwesome, icon: 'home', component: Home, notification: 0, },
    { route: SCREENS.About, label: 'About us', type: IconType.AntDesign, icon: 'questioncircle', component: AboutUs, notification: 0, },
    { route: SCREENS.wishList, label: 'WishList', type: IconType.FontAwesome, icon: 'heart', component: WishList, notification: 0, },
    { route: SCREENS.profile, label: 'My Profile', type: IconType.FontAwesome5, icon: 'user-alt', component: Profile, notification: 0, },
    { route: SCREENS.order, label: 'My Order', type: IconType.Feather, icon: 'pie-chart', component: MyOrder, notification: 0, },
    { route: SCREENS.products, label: 'Products', type: IconType.MaterialIcons, icon: 'view-list', component: DrawerScreen, notification: 0, },
    { route: SCREENS.contactUs, label: 'Contact Us', type: IconType.MaterialIcons, icon: 'contact-page', component: ContactUs, notification: 0, },
    { route: SCREENS.termAndCondition, label: 'Terms and Conditon', type: IconType.Foundation, icon: 'clipboard-notes', component: termAndCondition, notification: 0, },
    { route: SCREENS.privacyPolicy, label: 'Privacy Policy', type: IconType.MaterialCommunityIcons, icon: 'credit-card-scan', component: PrivacyPolicy, notification: 0, },
    { route: "language", label: 'Select Language', type: IconType.FontAwesome, icon: 'language', component: PrivacyPolicy, notification: 0, },
    { route: 'logout', label: 'logout', type: IconType.Ionicons, icon: 'log-out-sharp', component: DrawerScreen, notification: 0, },
];



