import { StyleSheet } from 'react-native';
import { theme } from "../../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    
  container:{
      backgroundColor: color.white,
      flex: 1,
    },
  noTask:{
    textAlign: "center",
    marginTop: 30,
    marginBottom: 30,
    fontSize: fontSize.regular,
    fontFamily: fontFamily.light,
    color: color.light_grey
  },
  taskTitle:{
     marginLeft: 20,
     marginTop: 30,
     marginBottom: 20,
     fontSize: fontSize.regular - 2,
     fontFamily: fontFamily.medium,
     color: color.black
  },
  taskTitleTop:{
    marginLeft: 20,
    marginTop: 40,
    marginBottom: 20,
    fontSize: fontSize.regular - 2,
    fontFamily: fontFamily.medium,
    color: color.black
  }
});

export default styles;