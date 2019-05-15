import { StyleSheet } from 'react-native';
import { theme } from "../../../index"
const { padding, normalize, color, fontSize, fontFamily } = theme;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FFF',
        paddingTop: 20,
    },

    textInput: {
        width: "90%",
        marginVertical: 10,
        borderBottomColor: 'white',
        backgroundColor: "white", 
        shadowOffset:{  width: 4,  height: 6,  },
        shadowColor: '#8386A3',
        shadowOpacity: 0.12,
        borderRadius: 10,
        paddingTop: 20,
        paddingBottom: 20,
        marginHorizontal: 20,
        paddingHorizontal: 20,
        fontSize: fontSize.regular,
        fontFamily: fontFamily.medium,
        color: color.black,

    },

    button:{
        backgroundColor: "#FF4B4B",
        height: normalize(55),

    },

    buttonText:{
        color:color.black,
        fontWeight:"700",
        fontSize: fontSize.regular + 2,
    },


    bottomContainer:{
        height: normalize(49)
    },

    color:{
        height: normalize(25),
        width: normalize(25),
        borderRadius: normalize(25/2),
        marginHorizontal: padding
    }
});

export default styles;
