import React from 'react';
import {View, FlatList, ActivityIndicator,Text,TouchableOpacity } from 'react-native';

import {connect} from 'react-redux';
import moment from "moment";
import {actions as home} from "../../index"
const { getCalendarItems } = home;
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from 'react-native-vector-icons/FontAwesome';

import {Actions} from 'react-native-router-flux';
import { List, ListItem,SearchBar } from 'react-native-elements';
import styles from "./styles"
import CalendarComp from "../../components/CalendarComp"

class Calendar extends React.Component {
    constructor() {
        super();
        this.state = {    
        }
 
        this.renderItem = this.renderItem.bind(this);
    }

    componentDidMount() {
        this.props.getCalendarItems((error) => alert(error.message))
    }

    renderItem({item, index}) {
        return <CalendarComp index={index}/>
    }


    static navigationOptions = ({navigation}) => ({
        headerStyle: {borderBottomWidth: 0,marginTop: 30,},
        headerTitleStyle: {
            fontSize: 20,
        },
        headerRight: (<TouchableOpacity onPress={()=> Actions.CalendarEdit()}><Icon name='edit' size={25} style={{ color: "#303E48",marginRight: 30 }} /></TouchableOpacity>),
        headerLeft: (<TouchableOpacity onPress={()=> Actions.Overview()}><Ionicons name='md-arrow-back' size={30} style={{ color: "#FF4B4B",marginLeft: 30 }}/></TouchableOpacity>),    
    })

    render() {
        if (this.props.CalendarItems.length === 0){
            return(
                <View style={styles.container}>
                    <View style={styles.activityIndicator}>
                        <Text style={styles.noCalendar}>Er zijn geen Afspraken</Text>
                    </View>
                </View>
            )
        }else{
            return (
                <View style={styles.container}>
                    <FlatList
                        ref='listRef'
                        data={this.props.CalendarItems}
                        renderItem={this.renderItem}
                        initialNumToRender={5}
                        keyExtractor={(item, index) => index.toString()}/>
                </View>
            );
        }
    }
}

function mapStateToProps(state, props) {
    return {
        isLoading: state.homeReducer.isLoading,
        CalendarItems: state.homeReducer.CalendarItems
    }
}

export default connect(mapStateToProps, { getCalendarItems })(Calendar);
