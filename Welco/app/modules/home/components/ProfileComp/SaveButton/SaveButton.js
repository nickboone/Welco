import React from 'react';

import { View, TouchableOpacity,Text,Alert } from 'react-native';

import {Actions} from 'react-native-router-flux'
import {Icon} from 'react-native-elements'

import styles from "./styles"
import {connect} from "react-redux";

import {actions as home, theme} from "../../../index"
const { addProfileItem, updateProfileItem } = home;
const { normalize } = theme;

class SaveButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.onPress = this.onPress.bind(this)
    }

    onPress() {
        if(this.props.data.titleInfo && this.props.data.descriptionInfo)
            if (this.props.edit ) this.editProfileItem()
            else this.saveProfileItem()
        else Alert.alert('Gelieve alle velden in te vullen') 
    }

    editProfileItem(){
        this.props.data['userId'] = this.props.user.uid;
        this.props.updateProfileItem(this.props.data, this.onSuccess, this.onError)
    }

    saveProfileItem(){
        const { data, user } = this.props;
        const { name } = data;

        const ProfileItem = {
            name: name,
            time: Date.now(),
            userId: user.uid,
        };

        this.props.addProfileItem(ProfileItem, this.onSuccess, this.onError)
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
        user: state.authReducer.user,
    }
}

export default connect(mapStateToProps, { addProfileItem, updateProfileItem })(SaveButton);
