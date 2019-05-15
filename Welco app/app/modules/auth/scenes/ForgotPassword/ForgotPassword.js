import React from 'react';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {View, StyleSheet, Alert, Image, Text,ScrollView,TouchableOpacity} from 'react-native';
import { actions as auth } from "../../index"
const { resetPassword } = auth;

import Form from "../../components/Form"
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles"

const fields = [
    {
        key:'email',
        label: "Email Address",
        placeholder:"Emailadres",
        autoFocus:false,
        secureTextEntry:false,
        value: "",
        type: "email"
    }
];

const error = {
    general: "",
    email: ""
}

class ForgotPassword extends React.Component {
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

        this.props.resetPassword(data, this.onSuccess, this.onError)
    }

    onSuccess() {
        alert("De email werd verzonden!")
        Actions.pop();
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
                    <Text style={styles.Title}>Paswoord vergeten?</Text>
                </View>
                    <Form fields={fields}
                      onSubmit={this.onSubmit}
                      buttonTitle={"Verzenden"}
                      error={this.state.error}/>
                </View>      
        );
    }
}

export default connect(null, { resetPassword })(ForgotPassword);
