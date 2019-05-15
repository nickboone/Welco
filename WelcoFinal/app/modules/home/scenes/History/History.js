import React from 'react';
import {View, FlatList, ActivityIndicator,Text,TouchableOpacity} from 'react-native';

import {connect} from 'react-redux';

import {actions as home} from "../../index"
const { getHistoryItems } = home;
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from 'react-native-vector-icons/FontAwesome';

import {Actions} from 'react-native-router-flux';
import { List, ListItem,SearchBar } from 'react-native-elements';
import styles from "./styles"
import HistoryComp from "../../components/History"

class History extends React.Component {
    constructor() {
        super();
        this.state = {    
        }
 
        this.renderItem = this.renderItem.bind(this);
    }

    componentDidMount() {
        this.props.getHistoryItems((error) => alert(error.message))
    }

    renderItem({item, index}) {
        return <HistoryComp index={index}/>
    }


    static navigationOptions = ({navigation}) => ({
        headerStyle: {borderBottomWidth: 0,marginTop: 30,},
        headerTitleStyle: {
            fontSize: 20,
        },
        headerLeft: (<TouchableOpacity onPress={()=> Actions.Overview()}><Ionicons name='md-arrow-back' size={30} style={{ color: "#FF4B4B",marginLeft: 30 }}/></TouchableOpacity>),    
    })

    render() {
        if (this.props.HistoryItems.length === 0){
            return(
                <View style={styles.container}>
                    <View style={styles.activityIndicator}>
                        <Text style={styles.noHistory}>Er is geen historiek</Text>
                    </View>
                </View>
            )
        }else{
            return (
                <View style={styles.container}>
                    <FlatList
                        ref='listRef'
                        data={this.props.HistoryItems.sort((a, b) => a.date.localeCompare(b.date))}
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
        HistoryItems: state.homeReducer.HistoryItems
    }
}

export default connect(mapStateToProps, { getHistoryItems })(History);
