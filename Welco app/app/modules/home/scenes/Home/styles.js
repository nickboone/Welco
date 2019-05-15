import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;
import { ifIphoneX } from 'react-native-iphone-x-helper'
const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: color.white,
    },
    
    bottomContainer:{
        backgroundColor:"white",
        paddingVertical: padding * 3,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },

    buttonContainer:{
        marginTop: 40,
    },
    patientTitle:{
        marginLeft: 20,
        fontSize: fontSize.large,
        marginTop: 60,
    },
    searchcontainer: {
        backgroundColor: 'white',
        borderWidth: 0, //no effect
        shadowColor: 'white', //no effect
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        flexDirection: 'row-reverse',
        marginHorizontal: 20,
        shadowOffset:{  width: 4,  height: 6,  },
        shadowColor: '#8386A3',
        shadowOpacity: 0.12,
        borderRadius: 10,
        marginTop: 20,
    },
    PersonList:{
        marginHorizontal: 20,
        borderTopColor: 'transparent'
    },
    listItem:
    {
        marginVertical: 10,
        borderBottomColor: 'white',
        backgroundColor: "white", 
        shadowOffset:{  width: 4,  height: 6,  },
        shadowColor: '#8386A3',
        shadowOpacity: 0.12,
        borderRadius: 10,
        paddingTop: 20,
        paddingBottom: 20,
        
    },
    noPatient:{
        paddingLeft: 20,
        marginTop: 20,
        color: color.light_grey,
        fontSize: fontSize.regular,
    },
    wrapper:{
        justifyContent:"center",
        alignItems: "center",
        flex: 1,
        justifyContent: 'flex-end',
        ...ifIphoneX({
            marginBottom: '10%',
            }, {
            marginBottom: '15%',
            }) 
    },
    btnBox:{
        alignItems: "center",
        width: '70%',
        backgroundColor: "#FF4B4B",
        padding: 15,
        marginTop: 30,
        borderRadius: 4,
    },
    SendBtn:{
        textAlign: 'center',
        alignItems: "center",
        fontSize: 16,
        color: "white",
        fontFamily: fontFamily.medium
    }
});

export default styles;