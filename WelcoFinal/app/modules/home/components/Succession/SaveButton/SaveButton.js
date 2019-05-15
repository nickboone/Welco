import React from 'react';

import { View, TouchableOpacity,Text,Alert } from 'react-native';

import {Actions} from 'react-native-router-flux'
import {Icon} from 'react-native-elements'

import styles from "./styles"
import {connect} from "react-redux";

import {actions as home, theme} from "../../../index"
const { addSuccessionItem, updateSuccessionItem,updateHistoryItem } = home;
const { normalize } = theme;

class SaveButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.onPress = this.onPress.bind(this)
    }

    onPress() {
        if(this.props.data.happen && this.props.data.body && this.props.data.time && this.props.data.date)
            if (this.props.edit ) this.editSuccessionItem()
            else this.saveSuccessionItem()
        else Alert.alert('Gelieve alle velden in te vullen') 
    }

    editSuccessionItem(){
        this.props.data['userId'] = this.props.user.uid;
        this.props.updateSuccessionItem(this.props.data, this.onSuccess, this.onError)
        this.props.updateHistoryItem(this.props.data, this.onSuccessHistory, this.onError)
    }

    saveSuccessionItem(){
        const { data, user } = this.props;
        const { name } = data;

        const SuccessionItem = {
            name: name,
            time: Date.now(),
            userId: user.uid,
        };

        this.props.addSuccessionItem(SuccessionItem, this.onSuccess, this.onError)
    }

    onSuccess(){
        Actions.pop();
    }

    onSuccessHistory(){
        Actions.Succession();
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

export default connect(mapStateToProps, { updateHistoryItem,addSuccessionItem, updateSuccessionItem })(SaveButton);
