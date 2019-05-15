import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: color.white
    },

    topContainer:{
        marginTop: 65,
        marginLeft: 20,
        marginBottom: 40,
    },
    Title:{
        fontSize: fontSize.large + 2,
        lineHeight: fontSize.large + 4,
        fontFamily: fontFamily.medium,
        color:color.black,
        letterSpacing: 1,
        marginTop: 20
    }
});

export default styles;
