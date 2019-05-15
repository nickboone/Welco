import React from 'react';

import { View, TouchableOpacity,Text } from 'react-native';

import {Actions} from 'react-native-router-flux'
import {Icon} from 'react-native-elements'

import styles from "./styles"
import {connect} from "react-redux";

import {actions as home, theme} from "../../../index"
const { addPatient, updatePatient } = home;
const { normalize } = theme;

class SaveButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.onPress = this.onPress.bind(this)
    }

    onPress() {
        if (this.props.edit) this.editPatient()
        else this.savePatient()
    }

    editPatient(){
        this.props.data['userId'] = this.props.user.uid;
        this.props.updatePatient(this.props.data, this.onSuccess, this.onError)
    }

    savePatient(){
        const { data, user } = this.props;
        const { name,street,avatar } = data;

        const Patient = {
            name: name,
            time: Date.now(),
            familyId: user.familyId,
            street: street,
            userId: user.uid,
            avatar: avatar
        };

        this.props.addPatient(Patient, this.onSuccess, this.onError)
    }

    onSuccess(){
        Actions.pop();
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
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps, { addPatient, updatePatient })(SaveButton);
