import React from 'react';
import {View, FlatList, ActivityIndicator,Text,ScrollView,AsyncStorage,TouchableOpacity } from 'react-native';

import {connect} from 'react-redux';

import {actions as home} from "../../index"
const { getProfileItems } = home;
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from 'react-native-vector-icons/FontAwesome';

import {Actions} from 'react-native-router-flux';
import { List, ListItem,Avatar } from 'react-native-elements';
import styles from "./styles"
import ProfileComp from "../../components/ProfileComp"

class Profile extends React.Component {
    constructor() {
        super();
        this.state = { 
            CurrentPatient: ""   
        }
 
        this.renderItem = this.renderItem.bind(this);
    }

    componentDidMount() {
        this.props.getProfileItems((error) => alert(error.message))
        this._retrieveD()
    }


    renderItem({item, index}) {
        return <ProfileComp index={index}/>
    }

    static navigationOptions = ({navigation}) => ({
        title: '',
        headerStyle: {borderBottomWidth: 0,marginTop: 30,},
        headerTitleStyle: {
            fontSize: 20,
        },
        headerRight: (<TouchableOpacity onPress={()=> Actions.ProfileEdit()}><Icon name='edit' size={25} style={{ color: "#303E48",marginRight: 30 }}/></TouchableOpacity>),
        headerLeft: (<TouchableOpacity onPress={()=> Actions.Overview()}><Ionicons name='md-arrow-back' size={30} style={{ color: "#FF4B4B",marginLeft: 30 }}  /></TouchableOpacity>),    
    })



    _retrieveD = async () => {
        try {
          const value = await AsyncStorage.getItem('CurrentPatient');
          const CurrentPatient = JSON.parse(value)
            this.setState({ 
                CurrentPatient : CurrentPatient,
            });
        } catch (error) {
          // Error retrieving data
        }
    };

    render() {
        const { CurrentPatient } = this.state;
            return (
            <ScrollView style={styles.container}>
                <View style={styles.ProfileCard}>
                    <Avatar large rounded source={{uri: CurrentPatient.avatar}}
                    />
                    <Text style={styles.HeadTitle}>{CurrentPatient.name}</Text>
                    <Text style={styles.SubTitle}>{CurrentPatient.street} {CurrentPatient.nummer}, {CurrentPatient.city}</Text>
                </View>
                <View style={styles.patientInfo}>
                    <View style={styles.InfoItem}>
                        <Text style={styles.ageInfo}>{CurrentPatient.age}</Text>
                        <Text style={styles.subInfoTitle}>Leeftijd</Text>
                    </View>
                    <View style={styles.InfoItem}>
                        <Text style={styles.ageInfo}>{CurrentPatient.lengthPerson}</Text>
                        <Text style={styles.subInfoTitle}>Lengte</Text>
                    </View>
                    <View style={styles.InfoItem}>
                        <Text style={styles.ageInfo}>{CurrentPatient.weight}</Text>
                        <Text style={styles.subInfoTitle}>Gewicht</Text>
                    </View>
                </View>
                <View style={styles.AlgInfo}>
                    <Text style={styles.algTitle}>Algemene info</Text>
                </View>
                    <ScrollView>
                        <FlatList
                            ref='listRef'
                            data={this.props.ProfileItems}
                            renderItem={this.renderItem}
                            initialNumToRender={5}
                            keyExtractor={(item, index) => index.toString()}/>
                    </ScrollView>
            </ScrollView>
            );
        }
    }

function mapStateToProps(state, props) {
    return {
        isLoading: state.homeReducer.isLoading,
        ProfileItems: state.homeReducer.ProfileItems
    }
}

export default connect(mapStateToProps, { getProfileItems })(Profile);
