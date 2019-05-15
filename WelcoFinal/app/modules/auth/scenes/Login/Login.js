import React from 'react';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {View, StyleSheet, Alert, Image, Text,ScrollView,TouchableOpacity} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import {actions as auth} from "../../index"
import Form from "../../components/Form"
import styles from "./styles"

    const {login} = auth;

    const fields = [
        {
            key: 'email',
            label: "Email Address",
            placeholder: "Emailadres",
            autoFocus: false,
            secureTextEntry: false,
            value: "",
            type: "email"
        },
        {
            key: 'password',
            label: "Password",
            placeholder: "Paswoord",
            autoFocus: false,
            secureTextEntry: true,
            value: "",
            type: "password"
        }
    ];

    const error = {
        general: "",
        email: "",
        password: ""
    }

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            error: error
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    }

    onForgotPassword() {
        Actions.ForgotPassword()
    }

    onSubmit(data) {
        this.setState({error: error}); //clear out error messages
        this.props.login(data, this.onSuccess, this.onError)
    }

    onSuccess({exists, user}) {
        if (exists) Actions.Main()
        else Actions.CompleteProfile({user})
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
        <ScrollView keyboardShouldPersistTaps='handled' style={styles.container}>
            <TouchableOpacity style={styles.return} onPress={()=> Actions.Welcome()}>
                <Ionicons name='md-arrow-back' size={30} style={{ color: "#FF4B4B"}} />
            </TouchableOpacity>
            <View style={styles.topContainer}>
                <Image style={styles.image}source={require('../../../../assets/logo.png')} />
                <Text style={styles.Subtitle}>Better and faster 
                communication with care.</Text>
            </View>    
            <Form fields={fields}
                  showLabel={false}
                  onSubmit={this.onSubmit}
                  buttonTitle={"Inloggen"}
                  buttonStyle={styles.button}
                  error={this.state.error}
                  onForgotPassword={this.onForgotPassword}/>
            <TouchableOpacity style={styles.bottomContainer} onPress={()=> Actions.Register()}>      
                  <Text style={styles.NoAccLink}>
                  Heb je nog geen account? <Text style={styles.boldText}>Klik hier</Text>
                  </Text>
            </TouchableOpacity>           
          </ScrollView> 
        );
    }
}
export default connect(null, {login})(Login);
