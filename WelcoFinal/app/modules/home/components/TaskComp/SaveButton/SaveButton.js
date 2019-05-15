import React from 'react';

import { View, TouchableOpacity,Text,Alert } from 'react-native';

import {Actions} from 'react-native-router-flux'
import {Icon} from 'react-native-elements'

import styles from "./styles"
import {connect} from "react-redux";

import {actions as home, theme} from "../../../index"
const { addTaskItem, updateTaskItem } = home;
const { normalize } = theme;

class SaveButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.onPress = this.onPress.bind(this)
    }

    onPress() {
    if(this.props.data.task && this.props.data.type !== "" && this.props.data.body && this.props.data.typeTask !== "")
        if (this.props.edit ) this.editTaskItem()
        else this.saveTaskItem()
    else Alert.alert('Gelieve alle velden in te vullen')   
    } 

    editTaskItem(){
        this.props.data['userId'] = this.props.user.uid;
        this.props.updateTaskItem(this.props.data, this.onSuccess, this.onError)
    }

    saveTaskItem(){
        const { data, user } = this.props;
        const { name } = data;

        const TaskItem = {
            name: name,
            time: Date.now(),
            userId: user.uid,
        };

        this.props.addTaskItem(TaskItem, this.onSuccess, this.onError)
    }

    onSuccess(){
        Actions.pop();
    }

    onSuccessHistory(){
        Actions.TaskDetails();
    }

    onError(error){
        alert(error.message)
    }

    render() {
        return (
            <TouchableOpacity style={styles.wrapper} onPress={this.onPress}>
                <View style={styles.btnBox}>
                   <Text style={styles.SendBtn}>Bevestigen</Text>
                </View>
            </TouchableOpacity>
        )
    }
}


function mapStateToProps(state, props) {
    return {
        user: state.authReducer.user,
    }
}

export default connect(mapStateToProps, {addTaskItem, updateTaskItem })(SaveButton);
