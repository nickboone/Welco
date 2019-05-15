import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    
    container:{
      backgroundColor: color.white,
      flex: 1,
    },
    TaskBox: {
      padding:10,
      marginTop:5,
      marginBottom:5,
      flexDirection: 'column',
      shadowOffset:{  width: 4,  height: 6,  },
      shadowColor: '#8386A3',
      shadowOpacity: 0.12,
      borderRadius: 10,
      marginHorizontal: 10,
      backgroundColor: "#FFF",
      marginHorizontal: 20
    },
    TaskContent: {
      flex: 1,
      flexDirection: 'row',
      width: "100%"
    },
    TaskBody:{
      flexDirection: 'column',
      paddingLeft: 20,
      paddingTop: 15,
      paddingBottom: 10
    },
    Taskname:{
      marginLeft: 20,
      marginTop: 5,
      color: color.black,
      fontSize: fontSize.regular,
      fontFamily: fontFamily.medium
    },
    TaskComplete:{
      marginLeft: 20,
      marginTop: 2,
    },
    actionBox:{
      position: "absolute",
      top: 5,
      right: 10,
      flexDirection: 'row',
      paddingHorizontal: 5,
    },
    timeDate:{
      marginRight: 5,
      marginTop: 3,
      color: color.red,
      fontSize: fontSize.small,
      fontFamily: fontFamily.medium,
    },
    dateColor:{color:color.red,paddingRight: 20,},
    body:{
      color: color.light_grey,
      fontSize: fontSize.regular,
      fontFamily: fontFamily.medium,
      marginRight: 10,
      flex: 1
    },
    
    dateBox:{
      flex: 1,
      color: color.light_grey,
      fontSize: fontSize.regular,
      fontFamily: fontFamily.medium,
      backgroundColor: 'blue',
      textAlign: 'right',
    },
    more:{
      paddingBottom: 30,
      paddingLeft: 10,
    }
});

export default styles;