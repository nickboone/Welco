import { StyleSheet } from 'react-native';
import { theme } from "../../../index"
const { padding, normalize, color, fontSize, fontFamily } = theme;

const styles = StyleSheet.create({
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
    }
});

export default styles;
