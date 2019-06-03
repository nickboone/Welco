import { Dimensions, Platform } from 'react-native';
import { moderateScale as normalize } from 'react-native-size-matters';

const color = {
    black: "#303E48",
    light_black: "#414141",
    white: "#ffffff",
    light_grey: 'rgba(48, 62, 72, 0.5)',
    grey: "#ccc",
    red: "#FF4B4B",
}

const fontSize = {
    small: normalize(12),
    regular: normalize(14),
    large: normalize(21)
}

const fontFamily = {
    medium: "MontserratMedium",
    regular: "MontserratRegular",
    light: "MontserratLight"
}

const padding = 8;
const navbarHeight = (Platform.OS === 'ios') ? 64 : 54;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const tabColor = (Platform.OS === "ios") ? "rgba(73,75,76, .5)" : "rgba(255,255,255,.8)";
const selectedTabColor = (Platform.OS === "ios") ? "rgb(73,75,76)" : "#fff";

const tabIconStyle = { size: 21, color: tabColor, selected: selectedTabColor }
const navTitleStyle = { fontSize: fontSize.regular , fontFamily: fontFamily.regular, color: color.black, }

export {
    color,
    fontSize,
    fontFamily,
    padding,
    navbarHeight,
    windowWidth,
    windowHeight,
    tabIconStyle,
    navTitleStyle,
    normalize
}