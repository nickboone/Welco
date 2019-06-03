import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    
    container:{
      backgroundColor: color.white,
      flex: 1,
      marginBottom: 30,
    },
      InfoBox: {
        padding:10,
        marginTop:5,
        marginBottom:5,
        flexDirection: 'row',
        shadowOffset:{  width: 4,  height: 6,  },
        shadowColor: '#8386A3',
        shadowOpacity: 0.12,
        borderRadius: 10,
        marginHorizontal: 10,
      },
      InfoContent: {
        flex:1,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        padding:10,
        borderRadius:10
      },
      InfoTitle:{
        fontSize: fontSize.regular,
        marginTop: 5,
        fontFamily: fontFamily.medium,
        color: color.black
      },
      dataBox:{
        marginLeft: 20,
        marginTop: 5,
        marginRight: 20,
      },
      Info:{
        fontFamily: fontFamily.light,
        marginTop: 10,
        marginBottom: 10,
        color: color.light_grey
      },
      actionBox:{
        marginLeft: 20,
        marginTop: 5,
        position: 'absolute',
        right: 15,
        top: 5
      },
      buttonContainer:{
        padding: 10
      },
});

export default styles;