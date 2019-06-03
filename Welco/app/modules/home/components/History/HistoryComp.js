import React from 'react';

import { Text, View, TouchableOpacity, ActionSheetIOS, ListView,Alert,AsyncStorage } from 'react-native';

import { Icon } from 'react-native-elements'
import moment from "moment";

import styles from "./styles"
import { connect } from "react-redux";

import { actions, theme } from "../../index"
import { Actions } from "react-native-router-flux";

const { deleteSuccessionItem,SuccessionComplete } = actions;
const { normalize } = theme;

class HistoryComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            familyIdCurrentPatient: ""
        }
    }


    _retrieveD = async () => {
        try {
          const value = await AsyncStorage.getItem('CurrentPatient');
          const CurrentPatient = JSON.parse(value)
            this.setState({ 
                familyIdCurrentPatient : CurrentPatient.familyId,
            });
        } catch (error) {
          // Error retrieving data
        }
    };

    componentDidMount(){
        this._retrieveD()
    }


    render() {
        const { familyIdCurrentPatient } = this.state;
        const { user, HistoryItems, index } = this.props;
        const HistoryItem = HistoryItems[index];
        const { happen, userId,familyId, time, body,date} = HistoryItem;
        return (
            <View style={styles.container}>
            {(user.uid === userId && familyId === familyIdCurrentPatient || user.uid === familyId && familyId === familyIdCurrentPatient) &&
                    <View>
                        <Text style={styles.dateBox}>{date}</Text>
                        <View style={styles.historyBox}>
                        <View style={styles.historyContent}>
                                <Text  style={styles.historyName}>{happen}</Text>
                                <View style={styles.actionBox}>
                                    <Text  style={styles.timeDate}>{time}</Text> 
                                </View>
                        </View>        
                                <View style={styles.historyBody}>
                                    <Text  style={styles.body}>{body}</Text>  
                                </View>
                        </View>
                    </View>
            }    
            </View>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.authReducer.user,
        HistoryItems: state.homeReducer.HistoryItems,
    }
}

export default connect(mapStateToProps)(HistoryComp);