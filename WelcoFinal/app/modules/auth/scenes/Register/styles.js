import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize,windowHeight } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: color.white
    },

    topContainer:{
        marginHorizontal: 20,
        flex: 1,
    },
    return:{
        marginTop: windowHeight / 13,
        marginHorizontal: 10,
        padding: 10,
        width: 40
    },
    bottomContainer:{
        paddingBottom: 20,
        paddingTop: -30,
        flex: 1 
    },
    SignUpTitle:{
        fontSize: fontSize.regular + 2,
        lineHeight: fontSize.large + 4,
        fontFamily: fontFamily.medium,
        color:color.black,
        letterSpacing: 1,
        marginTop: 10
    },
    SubTitle:{
        fontSize: fontSize.regular,
        lineHeight: fontSize.large + 4,
        fontFamily: fontFamily.light,
        color:color.light_grey,
        letterSpacing: 1,
        marginTop: 10,
    },
    card:{
        shadowColor: '#00000021',
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        marginVertical: 20,
        backgroundColor:"white",
        width: 100,
        height: 100,
        borderRadius: 10,
        marginTop: 40,
        alignSelf:'center',
        flexDirection: 'column',
        marginBottom: 40,

      },      
      cardImage:{
        width: 60,
        height: 60,
        alignSelf:'center',
        margin: 25,
      },
});

export default styles;
