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
    AsyncStorage
  } from 'react-native';

import {Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import Ionicons from "react-native-vector-icons/Ionicons";

import styles from "./styles"

class TaskOverview extends React.Component {
    constructor() {
        super();
        this.state = {
            CurrentTaskType: "",
            data: [
              {id:0, title: "Huishouden", image: require('../../../../../assets/maid.png')},
              {id:1, title: "Verplegen", image: require('../../../../../assets/user.png')},
              {id:2, title: "Mobiele taken", image: require('../../../../../assets/helping.png')} ,
              {id:3, title: "Klusjes", image: require('../../../../../assets/agenda.png')} ,
            ]
          };
    }

    static navigationOptions = ({navigation}) => ({
        headerStyle: {borderBottomWidth: 0,marginTop: 30,},
        headerTitleStyle: {
            fontSize: 20,
        },
        headerLeft: (<TouchableOpacity onPress={()=> Actions.Overview()}><Ionicons name='md-arrow-back' size={30} style={{ color: "#FF4B4B",marginLeft: 30 }}/></TouchableOpacity>),    
    })


    TaskTypeSaver = async (taskType) => {
        try {
          await AsyncStorage.setItem('CurrentTaskType', JSON.stringify(taskType));
          this.setState({ CurrentTaskType : taskType });
          Actions.TaskDetails({title: taskType.title});
        } catch (error) {
          // Error saving data
        }
    };


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
                    <TouchableOpacity style={styles.card}  onPress={() => this.TaskTypeSaver(item)}>
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

export default connect(null)(TaskOverview);