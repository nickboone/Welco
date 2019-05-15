import React from 'react';
import {View, FlatList, ActivityIndicator,Text,TouchableOpacity } from 'react-native';

import {connect} from 'react-redux';
import moment from "moment";
import {actions as home} from "../../index"
const { getSuccessionItems } = home;
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from 'react-native-vector-icons/FontAwesome';

import {Actions} from 'react-native-router-flux';
import { List, ListItem,SearchBar } from 'react-native-elements';
import styles from "./styles"
import SuccessionComp from "../../components/Succession"

class Succession extends React.Component {
    constructor() {
        super();
        this.state = {    
        }
 
        this.renderItem = this.renderItem.bind(this);
    }

    componentDidMount() {
        this.props.getSuccessionItems((error) => alert(error.message))
    }

    renderItem({item, index}) {
        return <SuccessionComp index={index} data={item} />
    }


    static navigationOptions = ({navigation}) => ({
        headerStyle: {borderBottomWidth: 0,marginTop: 30,},
        headerTitleStyle: {
            fontSize: 20,
        },
        headerRight: (<TouchableOpacity onPress={()=> Actions.SuccessionEdit()}><Icon name='edit' size={25} style={{ color: "#303E48",marginRight: 30 }}/></TouchableOpacity>),
        headerLeft: (<TouchableOpacity onPress={()=> Actions.Overview()}><Ionicons name='md-arrow-back' size={30} style={{ color: "#FF4B4B",marginLeft: 30 }}/></TouchableOpacity>),    
    })

    render() {
        if (this.props.SuccessionItems.length === 0){
            return(
                <View style={styles.container}>
                    <View style={styles.activityIndicator}>
                        <Text style={styles.noSuccession}>Er is geen opvolging</Text>
                    </View>
                </View>
            )
        }else{
            return (
                <View style={styles.container}>
                    <FlatList
                        ref='listRef'
                        data={this.props.SuccessionItems.sort((a, b) => b.date.localeCompare(a.date))}
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
        SuccessionItems: state.homeReducer.SuccessionItems.filter((succession) => { return  succession.CompleteSuccession === false || moment(succession.CompleteSuccessionDate).isSameOrAfter(moment().format('YYYY-MM-DD')) && moment(succession.CompleteSuccessionDate).isSameOrBefore(moment(new Date(), "DD-MM-YYYY").add(3, 'days')) && succession.CompleteSuccession === true }),
    }
}

export default connect(mapStateToProps, { getSuccessionItems })(Succession);
