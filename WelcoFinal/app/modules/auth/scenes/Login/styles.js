import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize,windowHeight } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: color.white
    },

    topContainer:{
        flex: 1,
        marginHorizontal: 20,
        marginBottom: 30,
    },

    return:{
        marginTop: windowHeight / 13,
        marginHorizontal: 10,
        padding: 10,
        width: 40
    },

    image:{
        width: 250,
        resizeMode,
        marginTop: -20,
    },

    Subtitle:{
        fontSize: fontSize.regular + 2,
        lineHeight: fontSize.large + 4,
        fontFamily: fontFamily.light,
        color:color.black,
        letterSpacing: 1,
        width: '80%',
        marginTop: -50,
        marginBottom: windowHeight / 25,
    },

    subText:{
        color: "#414141",
        fontSize: fontSize.large,
        lineHeight: fontSize.large + 10,
        marginVertical:padding * 2
    },

    //===============================

    bottomContainer:{
        backgroundColor:"white",
        paddingVertical: padding * 3,
        alignItems: 'center',
        marginBottom: 30,
    },

    buttonContainer:{
        justifyContent:"center",
        alignItems:"center"
    },

    socialButton:{
        height: normalize(55),
        borderRadius:4,
        marginTop:0,
        marginBottom:0
    },

    button:{
        backgroundColor: "#FF4B4B",
        height: normalize(55),
        borderRadius: 4
    },

    buttonText:{
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.medium
    },

    bottom:{
        flexDirection: "row",
        justifyContent:"center",
        alignItems:"center",
        marginTop: padding * 2
    },

    bottomText:{
        fontSize: fontSize.regular,
        fontFamily: fontFamily.medium,
        marginRight: 5,
        color: "#414141"
    },
    NoAccLink:{
        fontSize: fontSize.regular,
        fontFamily: fontFamily.light,
        color: color.light_grey,
        marginRight: 5,
    },
    boldText:{
        fontSize: fontSize.medium,
        fontFamily: fontFamily.medium,
        color: color.red
    }
});

export default styles;
