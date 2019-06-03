import React from 'react';
import {View, FlatList, ActivityIndicator,Text, ScrollView,TouchableOpacity } from 'react-native';
import {Button} from 'react-native-elements'
import {connect} from 'react-redux';

import {actions as home} from "../../index"
const { getPatients } = home;
import Ionicons from "react-native-vector-icons/Ionicons";
import {Actions} from 'react-native-router-flux';
import { List, ListItem,SearchBar } from 'react-native-elements';
import styles from "./styles"
import Patient from "../../components/Patient"

import { actions as auth } from "../../../auth/index";
const { signOut } = auth;

class Home extends React.Component {
    constructor() {
        super();
        this.state = {    
        }
 
        this.renderItem = this.renderItem.bind(this);
        this.onSignOut = this.onSignOut.bind(this);
    }

    componentDidMount() {
        this.props.getPatients((error) => alert(error.message))
    }

    renderItem({item, index}) {
        return <Patient index={index}/>
    }

    onSuccess() {
        Actions.replace("Auth");
    }

    onError(error) {
        Alert.alert('Oops!', error.message);
    }

    onSignOut() {
        this.props.signOut(this.onSuccess.bind(this), this.onError.bind(this))
    }
    
    render() {
            return (
                <View style={styles.container}>
                <Text style={styles.patientTitle}>Patiënten</Text>
                    <ScrollView style={{flex:1}}>
                        <FlatList
                            ref='listRef'
                            data={this.props.patients.sort((a, b) => a.name.localeCompare(b.name))}
                            renderItem={this.renderItem}
                            initialNumToRender={5}
                            keyExtractor={(item, index) => index.toString()}/> 
                    </ScrollView>
                    <TouchableOpacity style={styles.wrapper} onPress={this.onSignOut}>
                            <View style={styles.btnBox}>
                               <Text style={styles.SendBtn}>Uitloggen</Text>
                            </View>
                    </TouchableOpacity>  
                </View>
            );
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.authReducer.user,
        isLoading: state.homeReducer.isLoading,
        patients: state.homeReducer.patients
    }
}

export default connect(mapStateToProps, { getPatients,signOut })(Home);
