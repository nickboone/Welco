import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    
    container:{
      backgroundColor: color.white,
      flex: 1,
    },
    buttons:{
      paddingBottom: 30,
      paddingHorizontal: 10,
    },
    successionBox: {
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
    successionContent: {
      flex: 1,
      flexDirection: 'row',
      width: "100%"
    },
    successionBody:{
      flex: 1,
      flexDirection: 'column',
      width: "100%",
      paddingLeft: 20,
      paddingTop: 15,
      paddingBottom: 10,
    },
    successioName:{
      marginLeft: 20,
      marginTop: 3,
      color: color.black,
      fontSize: fontSize.regular,
      fontFamily: fontFamily.medium
    },
    successionComplete:{
      marginLeft: 20,
    },
    actionBox:{
      position: "absolute",
      top: 0,
      right: 10,
      flexDirection: 'row',
      paddingHorizontal: 5,
    },
    timeDate:{
      marginRight: 20,
      marginTop: 3,
      color: color.red,
      fontSize: fontSize.small,
      fontFamily: fontFamily.medium
    },
    body:{
      color: color.light_grey,
      fontSize: fontSize.regular,
      fontFamily: fontFamily.medium,
      marginRight: 10,
    },
    dateBox:{
      color: "#000",
      fontSize: fontSize.medium,
      fontFamily: fontFamily.medium,
      marginHorizontal: 30,
      marginVertical: 20,
      paddingTop: 20,
    }
});

export default styles;