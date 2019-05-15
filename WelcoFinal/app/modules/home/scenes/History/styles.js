import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    
    container:{
      backgroundColor: color.white,
      flex: 1,
    },
    noHistory:{
      textAlign: "center",
      marginTop: 60,
      fontSize: fontSize.regular,
      fontFamily: fontFamily.light,
      color: color.light_grey
      }
});

export default styles;