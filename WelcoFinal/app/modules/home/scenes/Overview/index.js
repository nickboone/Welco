import React from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList,
  } from 'react-native';

import {Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import Ionicons from "react-native-vector-icons/Ionicons";

import styles from "./styles"
import {actions as auth, theme} from "../../../auth/index"

const {color,fontFamily} = theme;

class Overview extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [
              {id:1, title: "Profiel",url:"Profile", image: require('../../../../assets/user.png')},
              {id:2, title: "Taken",  url:"TasksOverview", image: require('../../../../assets/agenda.png')},
              {id:3, title: "Historiek", url:"History", image: require('../../../../assets/historiek.png')} ,
              {id:4, title: "Opvolging",url:"Succession", image: require('../../../../assets/diagram.png')} ,
              {id:5, title: "Medicatie",url:"Medication", image: require('../../../../assets/medicine.png')} ,
              {id:6, title: "Kalender",url:"Calendar", image: require('../../../../assets/calendar.png')} ,
            ]
          };
    }

    static navigationOptions = ({navigation}) => ({
        headerStyle: {borderBottomWidth: 0,marginTop: 30,},
        headerTitleStyle: {
            fontSize: 20,
        },
        headerLeft: (<TouchableOpacity onPress={()=> Actions.Home()}><Ionicons name='md-arrow-back' size={30} style={{ color: "#FF4B4B",marginLeft: 30 }} /></TouchableOpacity>),    
    })

    _onPressButton() {
        Actions.Profile()
    }
    

    render() {
        return (
            <View style={styles.container}>
              <FlatList style={styles.list}
                contentContainerStyle={styles.listContainer}
                data={this.state.data}
                horizontal={false}
                numColumns={2}
                keyExtractor= {(item) => {
                    return item.id;
                }}
                renderItem={({item}) => {
                    return (
                    <TouchableOpacity style={styles.card} onPress={Actions[item.url]}>
                        <View style={styles.cardFooter}></View>
                        <Image style={styles.cardImage} source={item.image}/>
                        <View style={styles.cardHeader}>
                        <View style={{alignItems:"center", justifyContent:"center"}}>
                            <Text style={styles.title}>{item.title}</Text>
                        </View>
                        </View>
                    </TouchableOpacity>
                    )
                }}/>
            </View>
        );
    }
}

export default connect(null)(Overview);