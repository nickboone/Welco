import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    
    container:{
      backgroundColor: color.white,
      flex: 1,
      paddingTop: 20,
    },
    UserProfileCard:{ 
      alignItems: 'center',
    },
    HeadTitle:
    {
      fontSize: fontSize.large + 3,
      marginVertical: 10,
      color: color.main,
      fontFamily: fontFamily.medium
    },
    SubTitle:{
      fontSize: fontSize.regular,
      marginBottom: 15,
      color: color.light_grey,
      fontFamily: fontFamily.light
    },
    //==================================
    
    containerView:{
      marginVertical: padding * 3,
      width: windowWidth - 40
  },

  button:{
      backgroundColor: "#FF4B4B",
      height: normalize(55),
      elevation: 0,
      borderRadius: 4
  },

  buttonText:{
      fontSize: fontSize.regular + 2,
      fontFamily: fontFamily.medium
  },

});

export default styles;