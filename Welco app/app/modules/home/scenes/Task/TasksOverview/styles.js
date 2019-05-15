import { StyleSheet } from 'react-native';
import { theme } from "../../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    
    container:{
        flex:1,
        backgroundColor:"#FFF",
      },
      list: {
        paddingHorizontal: 5,
        backgroundColor:"#FFF",
        marginTop: 50,
      },
      listContainer:{
        alignItems:'center'
      },
      /******** card **************/
      card:{
        shadowColor: '#00000021',
    
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        marginVertical: 15,
        backgroundColor:"white",
        flexBasis: '40%',
        marginHorizontal: 15,
        borderRadius: 10,
      },
      cardHeader: {
        paddingVertical: 17,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        alignItems:"center", 
        justifyContent:"center"
      },
      cardContent: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
      },
      cardFooter:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12.5,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
      },
      cardImage:{
        height: 70,
        width: 70,
        alignSelf:'center'
      },
      title:{
        fontSize:14,
        fontFamily: fontFamily.light,
        flex:1,
        alignSelf:'center',
        color:color.main
      },
});

export default styles;