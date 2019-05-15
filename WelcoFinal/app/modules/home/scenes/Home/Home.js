import React from 'react';
import {View, FlatList, ActivityIndicator,Text, ScrollView } from 'react-native';

import {connect} from 'react-redux';

import {actions as home} from "../../index"
const { getPatients } = home;
import Ionicons from "react-native-vector-icons/Ionicons";
import {Actions} from 'react-native-router-flux';
import { List, ListItem,SearchBar } from 'react-native-elements';
import styles from "./styles"
import Patient from "../../components/Patient"

class Home extends React.Component {
    constructor() {
        super();
        this.state = {    
        }
 
        this.renderItem = this.renderItem.bind(this);
    }

    componentDidMount() {
        this.props.getPatients((error) => alert(error.message))
    }

    renderItem({item, index}) {
        return <Patient index={index}/>
    }
    
    render() {
            return (
                <View style={styles.container}>
                <Text style={styles.patientTitle}>Patiënten</Text>
                    <ScrollView>
                        <FlatList
                            ref='listRef'
                            data={this.props.patients.sort((a, b) => a.name.localeCompare(b.name))}
                            renderItem={this.renderItem}
                            initialNumToRender={5}
                            keyExtractor={(item, index) => index.toString()}/>
                    </ScrollView>
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

export default connect(mapStateToProps, { getPatients })(Home);
