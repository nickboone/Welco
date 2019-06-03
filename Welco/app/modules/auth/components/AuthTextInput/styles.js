
import { StyleSheet } from 'react-native';

import { theme } from "../../index"
const { windowWidth, fontSize, fontFamily, normalize,color } = theme;

const styles = StyleSheet.create({
    container:{
        marginBottom: 10
    },

    inputContainer:{
        width: windowWidth - 40,
        height: normalize(55),
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.bold,
        borderColor: color.light_grey,
        borderWidth: 1,
        borderRadius: 4,
        paddingLeft: 20,
        marginTop: 7,
        marginBottom: 7,
    }
});

export default styles;
