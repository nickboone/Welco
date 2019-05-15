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
        flex:1,
        paddingHorizontal:5,
        paddingBottom: padding * 2,
        justifyContent:"center",
        marginLeft: 20,
    },
    image:{
        width: 300,
        resizeMode,
    },
    Subtitle:{
        fontSize: fontSize.regular + 2,
        lineHeight: fontSize.large + 4,
        fontFamily: fontFamily.light,
        color:color.black,
        letterSpacing: 1,
        width: '80%',
        marginTop: -50,
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
        marginBottom: 30,
    },
    buttonContainer:{
        justifyContent:"center",
        alignItems:"center",
    },
    containerView:{
        width: windowWidth - 40
    },
    socialButton:{
        height: normalize(55),
        borderRadius:4,
        marginTop:0,
        marginBottom:0
    },
    button:{
        backgroundColor: color.red,
        height: normalize(55),
    },
    buttonText:{
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.medium
    },
    bottom:{
        flexDirection: "row",
        justifyContent:"center",
        alignItems:"center",
        marginTop: 30
    },
    bottomText:{
        fontSize: fontSize.regular,
        fontFamily: fontFamily.light,
        marginRight: 5,
        color: color.light_grey
    },
    signInText:{
        fontSize: fontSize.red,
        color: "#FF4B4B",
        fontFamily: fontFamily.medium
    },
    orContainer:{
        justifyContent:"center",
        alignItems:"center",
        height: 20,
        width: windowWidth
    },
    divider:{
        backgroundColor: '#D0D5DA',
        position:"absolute",
        top:19,
        left: 20,
        right: 20
    },
    orText:{
        backgroundColor: color.white,
        fontSize: fontSize.light,
        fontFamily: fontFamily.regular,
        color: color.black,
        paddingHorizontal: padding
    }
});

export default styles;
