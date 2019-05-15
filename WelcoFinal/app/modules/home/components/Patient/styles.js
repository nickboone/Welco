import { StyleSheet, Platform } from 'react-native';

import { theme } from "../../index"
const {padding, color, fontFamily, normalize,fontSize } = theme;

const styles = StyleSheet.create({
    
    container:{
        flex:1,
        backgroundColor: color.white
    },

    patientTitle:{
        marginLeft: 20,
        fontSize: fontSize.large,
        marginTop: 50,
    },
    PersonList:{
        marginHorizontal: 20,
        borderTopColor: 'transparent'
    },
    listItem:
    {
        marginVertical: 10,
        borderBottomColor: 'white',
        backgroundColor: "white", 
        shadowOffset:{  width: 4,  height: 6,  },
        shadowColor: '#8386A3',
        shadowOpacity: 0.12,
        borderRadius: 10,
        paddingTop: 20,
        paddingBottom: 20,
        marginHorizontal: 20,
        paddingRight: 20,
    },
    buttonContainer:{
        padding: 10
    },
    noPatient:{
        marginLeft: 20,
        marginTop: 20,
        fontSize: fontSize.medium,
        color: color.light_grey,
    }
});


export default styles;
