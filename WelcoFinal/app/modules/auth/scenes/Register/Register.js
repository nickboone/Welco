import React from 'react';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {View, StyleSheet, Alert, Image, Text,ScrollView,TouchableOpacity} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";

import { actions as auth } from "../../index"
const { register } = auth;

import Form from "../../components/Form"
import styles from "./styles"

const fields = [
    {
        key: 'email',
        label: "Emailadres",
        placeholder: "Emailadres",
        autoFocus: false,
        secureTextEntry: false,
        value: "",
        type: "email"
    },
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
        key: 'password',
        label: "Paswoord",
        placeholder: "Paswoord",
        autoFocus: false,
        secureTextEntry: true,
        value: "",
        type: "password"
    },
    {
        key: 'confirm_password',
        label: "Bevestig paswoord",
        placeholder: "Bevestig paswoord",
        autoFocus: false,
        secureTextEntry: true,
        value: "",
        type: "confirm_password"
    }
];

const error = {
    general: "",
    email: "",
    password: "",
    confirm_password: ""
}

class Register extends React.Component {
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

        this.props.register(data, this.onSuccess, this.onError)
    }

    onSuccess(user) {
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
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.return} onPress={()=> Actions.Welcome()}>
                <Ionicons name='md-arrow-back' size={30} style={{ color: "#FF4B4B"}} />
            </TouchableOpacity>
            <View style={styles.topContainer}>
                <Text style={styles.SignUpTitle}>Registreren</Text>
                <Text style={styles.SubTitle}>Registreer je als mantelzorger</Text>
                <View style={styles.card}>
                        <Image style={styles.cardImage} source={require('../../../../assets/respect.png')}/>
                </View>
            </View> 
            <View style={styles.bottomContainer}>   
            <Form fields={fields}
                  showLabel={false}
                  containerStyle={styles.SignUpForm}
                  onSubmit={this.onSubmit}
                  buttonTitle={"Registreren"}
                  error={this.state.error}/>          
            </View> 
        </ScrollView>  
        );
    }
}

export default connect(null, { register })(Register);
