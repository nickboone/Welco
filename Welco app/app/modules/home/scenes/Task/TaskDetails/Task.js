import React from 'react';
import {View, FlatList, ActivityIndicator,Text,ScrollView,TouchableOpacity } from 'react-native';

import {connect} from 'react-redux';
import moment from "moment";
import {actions as home} from "../../../index"
const { getTaskItems } = home;
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from 'react-native-vector-icons/FontAwesome';

import {Actions} from 'react-native-router-flux';
import { List, ListItem,SearchBar } from 'react-native-elements';
import styles from "./styles"
import TaskComp from "../../../components/TaskComp"

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
        }
        this.renderItem = this.renderItem.bind(this);
    }

    componentDidMount() {
        this.props.getTaskItems((error) => alert(error.message))
    }

    renderItem({item, index}) {
        return <TaskComp index={index} data={item} />
    }


    static navigationOptions = ({navigation}) => ({
        headerStyle: {borderBottomWidth: 0,marginTop: 30,},
        headerTitleStyle: {
            fontSize: 20,
        },
        headerRight: (<TouchableOpacity onPress={()=> Actions.TaskEdit()}><Icon name='edit' size={25} style={{ color: "#303E48",marginRight: 30 }}/></TouchableOpacity>),
        headerLeft: (<TouchableOpacity onPress={()=> Actions.TasksOverview()}><Ionicons name='md-arrow-back' size={30} style={{ color: "#FF4B4B",marginLeft: 30 }}/></TouchableOpacity>),    
    })

    render() {
        if (this.props.FixedTaskItems.length === 0 && this.props.TempTaskItems.length === 0){
            return(
                <View style={styles.container}>
                    <View style={styles.activityIndicator}>
                        <Text style={styles.noTask}>Er zijn geen taken</Text>
                    </View>
                </View>
            )
        }else{
            return (
                <ScrollView style={styles.container}>
                    <Text style={styles.taskTitle}>Vaste taken</Text>
                    {this.props.FixedTaskItems.length != 0 ?
                    <FlatList
                        ref='listRef'
                        data={this.props.FixedTaskItems.sort((a, b) => a.task.localeCompare(b.task))}
                        renderItem={this.renderItem}
                        initialNumToRender={5}
                        keyExtractor={(item, index) => index.toString()}/>
                    :
                    <View style={styles.activityIndicator}>
                        <Text style={styles.noTask}>Er zijn geen vaste taken</Text>
                    </View>
                    }        
                    <Text style={styles.taskTitleTop}>Tijdelijke taken</Text>
                    {this.props.TempTaskItems.length != 0 ?
                    <FlatList
                        ref='listRef'
                        data={this.props.TempTaskItems.sort((a, b) => a.task.localeCompare(b.task))}
                        renderItem={this.renderItem}
                        initialNumToRender={5}
                        keyExtractor={(item, index) => index.toString()}/>
                    :   
                    <View style={styles.activityIndicator}>
                        <Text style={styles.noTask}>Er zijn geen tijdelijke taken</Text>
                    </View>
                    }   
                </ScrollView>
            );
        }
    }
}

function mapStateToProps(state, props) {
    return {
        isLoading: state.homeReducer.isLoading,
        FixedTaskItems: state.homeReducer.TaskItems.filter((task) => { return task.typeTask === 0 && task.CompleteTask === false || moment(task.CompleteTaskDate).isSameOrAfter(moment().format('YYYY-MM-DD')) && moment(task.CompleteTaskDate).isSameOrBefore(moment(new Date(), "DD-MM-YYYY").add(3, 'days')) && task.CompleteTask === true && task.typeTask === 0  }),
        TempTaskItems: state.homeReducer.TaskItems.filter((task) => { return task.typeTask === 1 && task.CompleteTask === false || moment(task.CompleteTaskDate).isSameOrAfter(moment().format('YYYY-MM-DD')) && moment(task.CompleteTaskDate).isSameOrBefore(moment(new Date(), "DD-MM-YYYY").add(3, 'days')) && task.CompleteTask === true && task.typeTask === 1  }),
    }
}

export default connect(mapStateToProps, { getTaskItems })(Task);
