import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    
    container:{
      backgroundColor: color.white,
      flex: 1,
    },
      eventList:{
        marginTop:20,
        marginHorizontal: 20,
      },
      eventBox: {
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
      eventDate:{
        flexDirection: 'column',
        alignItems: 'center',
      },
      eventDay:{
        fontSize:37,
        color: "#FF4B4B",
        fontWeight: "600",
      },
      eventMonth:{
        fontSize:16,
        color: "#FF4B4B",
        fontWeight: "600",
      },
      eventContent: {
        flex:1,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        padding:10,
        borderRadius:10
      },
      description:{
        fontSize:15,
        marginTop: 10,
        fontFamily: fontFamily.regular,
        color: color.black
      },
      eventTime:{
        fontSize: 15,
        color: color.black,
        fontFamily: fontFamily.medium,
        marginTop: 5,
      },
      userName:{
        fontSize:18,
        marginTop: 5,
        fontFamily: fontFamily.medium,
        color: color.black
      },
      dataBox:{
        marginLeft: 20,
        marginTop: 5,
        marginRight: 20,
      },
      street:{
        fontFamily: fontFamily.light,
        marginTop: 5,
        color: color.light_grey
      },
      actionBox:{
        marginLeft: 20,
        marginTop: 5,
        position: 'absolute',
        right: 15,
        top: 10
      },
    wrapper:{
        justifyContent:"center",
        alignItems: "center",
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
    },
    buttonContainer:{
        padding: 10
    }
});

export default styles;