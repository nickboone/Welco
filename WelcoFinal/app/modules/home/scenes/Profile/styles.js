import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    
    container:{
      backgroundColor: color.white,
      flex: 1,
    },
    ProfileCard:{ 
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
    
    patientInfo: {
      width: '90%', 
      alignSelf: 'center',
      flexDirection: 'row', 
      flexWrap: 'wrap',
      backgroundColor: "white",
      borderRadius: 10,
      shadowColor: '#00000021',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 12,
      marginTop: 30,
    },
    InfoItem: {
        width: '20%', 
        margin: '6%', 
        alignItems: 'center',
    },
    ageInfo:
    {
      fontSize: fontSize.regular,
      color: color.main,
      fontFamily: fontFamily.medium
    },
    subInfoTitle:
    {
      fontSize: fontSize.small,
      color: color.light_grey,
      fontFamily: fontFamily.light,
      paddingTop: 5,
    },

    //+++++++++++++++++++++++++++++

    AlgInfo:
    {
      marginHorizontal: 20,
      marginTop: 50,
    },
    algTitle:
    {
      fontSize: fontSize.regular,
      color: color.main,
      fontFamily: fontFamily.medium
    },
    patientInfoCard:
    {
      padding: 10,
      backgroundColor: "white"
    },
    InfoBox:
    {
      flexDirection: 'row',
    },
    InfoBoxTitle:{
      marginVertical: 10,
      color: color.main,
      fontFamily: fontFamily.medium,
      width: "100%",
      fontSize: fontSize.regular,
    }
    ,InfoBoxText:
    {
      fontSize: fontSize.small,
      marginVertical: 10,
      color: color.main,
      fontFamily: fontFamily.light,
      lineHeight: 20,
      width: "100%"
    },
});

export default styles;