import React from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { actions as auth } from "../../index"
const { createUser } = auth;

import Form from "../../components/Form"

import {View, StyleSheet, Alert, Image, Text,ScrollView,TouchableOpacity} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles"

const fields = [
    {
        key: 'username',
        label: "Gebruikersnaam",
        placeholder: "Gebruikersnaam",
        autoFocus: false,
        secureTextEntry: false,
        value: "",
        type: "text"
    },
    {
        key: 'avatar',
        label: "Avatar",
        placeholder: "Avatar",
        autoFocus: false,
        secureTextEntry: false,
        value: "",
        type: "text"
    }
];

const error = {
    general: "",
    username: "",
    avatar: ""
}

class CompleteProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            error: error
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    }

    onSubmit(data) {
        this.setState({error: error}); //clear out error messages

        //attach user id
        const { user } = this.props;
        data['uid'] = user.uid;

        this.props.createUser(data, this.onSuccess, this.onError)
    }

    onSuccess() {
        Actions.Main()
    }

    onError(error) {
        let errObj = this.state.error;

        if (error.hasOwnProperty("message")) {
            errObj['general'] = error.message;
        } else {
            let keys = Object.keys(error);
            keys.map((key, index) => {
                errObj[key] = error[key];
            })
        }

        this.setState({error: errObj});
    }

    render() {
        return (
            <View style={{flex: 1,backgroundColor:'white'}}>
                <View style={styles.topContainer}>
                    <Ionicons name='md-arrow-back' size={30} style={{ color: "#FF4B4B"}} onPress={()=> Actions.Login()} />
                    <Text style={styles.Title}>Profiel Aanvullen</Text>
                </View>
                <Form fields={fields}
                      showLabel={false}
                      onSubmit={this.onSubmit}
                      buttonTitle={"Bevestigen"}
                      error={this.state.error}/>
            </View>          
        );
    }
}

export default connect(null, { createUser })(CompleteProfile);
