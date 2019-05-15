import React from 'react';

import { View, TouchableOpacity,Text,Alert } from 'react-native';

import {Actions} from 'react-native-router-flux'
import {Icon} from 'react-native-elements'

import styles from "./styles"
import {connect} from "react-redux";

import {actions as home, theme} from "../../../index"
const { addMedicationItem, updateMedicationItem } = home;
const { normalize } = theme;

class SaveButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.onPress = this.onPress.bind(this)
    }

    onPress() {
        if(this.props.data.name && this.props.data.type !== "" && this.props.data.body)
            if (this.props.edit ) this.editMedicationItem()
            else this.saveMedicationItem()
        else Alert.alert('Gelieve alle velden in te vullen')    
    }

    editMedicationItem(){
        this.props.data['userId'] = this.props.user.uid;
        this.props.updateMedicationItem(this.props.data, this.onSuccess, this.onError)
        //this.props.updateHistoryItem(this.props.data, this.onSuccessHistory, this.onError)
    }

    saveMedicationItem(){
        this.props.data['userId'] = this.props.user.uid;
        this.props.addMedicationItem(this.props.data, this.onSuccess, this.onError)
    }

    onSuccess(){
        Actions.pop();
    }

    onSuccessHistory(){
        Actions.Medication();
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

export default connect(mapStateToProps, {addMedicationItem, updateMedicationItem })(SaveButton);
