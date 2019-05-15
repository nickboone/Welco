import React from 'react';
import {View, FlatList, ActivityIndicator,Text,ScrollView,AsyncStorage,Button } from 'react-native';

import {connect} from 'react-redux';

import {actions as home} from "../../index"
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from 'react-native-vector-icons/FontAwesome';

import {Actions} from 'react-native-router-flux';
import { List, ListItem,Avatar } from 'react-native-elements';
import styles from "./styles";

import {actions as auth, theme} from "../../../auth/index"
const {signOut} = auth;

class UserProfile extends React.Component {
    constructor() {
        super();
        this.state = { 
        }
    }

    onSignOut = () => {
        this.props.signOut()
            .then(() => Actions.reset("Auth"))
            .catch((error) => {
                Alert.alert('Oops!', error.message);
            })
    }

    static navigationOptions = ({navigation}) => ({
        title: '',
        headerStyle: {borderBottomWidth: 0,marginTop: 30,},
        headerTitleStyle: {
            fontSize: 20,
        },
        headerLeft: (<Ionicons name='md-arrow-back' size={30} style={{ color: "#FF4B4B",marginLeft: 30}} onPress={()=> Actions.Home()} />),    
    })

    render() {
            return (
            <View style={styles.container}>
                <View style={styles.UserProfileCard}>
                    <Avatar large rounded source={{uri: this.props.user.avatar}}
                    />
                    <Text style={styles.HeadTitle}>{this.props.user.username}</Text>
                    <Text style={styles.SubTitle}>{this.props.user.street} {this.props.user.nummer}, {this.props.user.city}</Text>
                </View>
                <Button
                raised
                borderRadius={4}
                title={'Uitloggen'}
                containerViewStyle={[styles.containerView]}
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
                onPress={this.onSignOut}/>
            </View>
            );
        }
    }

function mapStateToProps(state, props) {
    return {
        user: state.authReducer.user,
        isLoading: state.homeReducer.isLoading,
    }
}

export default connect(mapStateToProps,{signOut})(UserProfile);