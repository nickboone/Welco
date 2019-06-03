import React from 'react';

import { Text, View, TouchableOpacity, ActionSheetIOS, ListView,Alert,AsyncStorage } from 'react-native';

import { Icon } from 'react-native-elements'
import moment from "moment";

import styles from "./styles"
import { connect } from "react-redux";

import { actions, theme } from "../../index"
import { Actions } from "react-native-router-flux";

const { deleteCalendarItem} = actions;
const { normalize } = theme;

class CalendarComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            familyIdCurrentPatient: ""
        }

        this.onOption = this.onOption.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onToggleItem = this.onToggleItem.bind(this);
    }

    onOption(){
        const { CalendarItems, index } = this.props;
        const CalendarItem = CalendarItems[index];

        ActionSheetIOS.showActionSheetWithOptions({
                options: ['Bewerken', 'Verwijderen', 'Annuleren'],
                destructiveButtonIndex: 1,
                cancelButtonIndex: 2,
            },
            (buttonIndex) => {
                if (buttonIndex === 0) Actions.CalendarEdit({ edit:true, CalendarItem })
                else if (buttonIndex === 1) this.onDelete();
            });
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

    onDelete(){
        const { CalendarItems, index } = this.props;
        const CalendarItem = CalendarItems[index];
        this.props.deleteCalendarItem(CalendarItem, (error) =>  alert(error.message))
    }

    onToggleItem(){
        const { user, CalendarItems, index } = this.props;
        const CalendarItem = CalendarItems[index];

        const data = { CalendarItem, uid:user.uid };

        this.props.toggleItem(data, (error) =>  alert(error.message))
    }

    renderOptionButton(){
        return(
            <View style={styles.right}>
                <TouchableOpacity onPress={this.onOption}>
                    <View style={styles.buttonContainer}>
                        <Icon
                            name={'md-more'}
                            type='ionicon'
                            color='#000'
                            size={normalize(20)}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const { familyIdCurrentPatient } = this.state;
        const { user, CalendarItems, index } = this.props;
        const CalendarItem = CalendarItems[index];
        const { name, userId,time,body,street,familyId, nummer,city,date } = CalendarItem;
        const dateCalendar = moment(date).format('YYYY-MM-DD');
        return (
            <View style={styles.container}>
            {(user.uid === userId && familyId === familyIdCurrentPatient || user.uid === familyId && familyId === familyIdCurrentPatient) &&
                    <View>
                        <View style={styles.eventBox}>
                        <View style={styles.eventContent}>
                            <View style={styles.eventDate}>
                                    <Text  style={styles.eventDay}>{moment(dateCalendar).format('D')}</Text>
                                    <Text  style={styles.eventMonth}>{moment(dateCalendar).format('MMMM')}</Text>
                                    <Text  style={styles.eventTime}>{time} u</Text>
                            </View>
                            <View style={styles.dataBox}>
                                <Text  style={styles.userName}>{name}</Text>
                                <Text  style={styles.street}>{street} {nummer}, {city}</Text>
                                <Text  style={styles.description}>{body}</Text>
                            </View>
                            <View style={styles.actionBox}>
                                {(user.uid === userId) && this.renderOptionButton()}
                            </View>
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
        CalendarItems: state.homeReducer.CalendarItems,
    }
}

export default connect(mapStateToProps, { deleteCalendarItem })(CalendarComp);