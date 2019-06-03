import React from 'react';
import { View, TextInput, ScrollView, TouchableHighlight,Button,AsyncStorage,TouchableOpacity } from 'react-native';
import {Actions} from 'react-native-router-flux';
import { HelperText} from 'react-native-paper';
import {connect} from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Ionicons from "react-native-vector-icons/Ionicons";
import DatePicker from 'react-native-datepicker';
import styles from "./styles"
import { theme } from "../../../index"
const { padding, normalize, color, fontSize, fontFamily } = theme;
import SaveButton from '../../../components/CalendarComp/SaveButton';
const uuidv4 = require('uuid/v4');
class CalendarEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: (props.edit) ? props.CalendarItem.id : uuidv4() ,
            name: (props.edit) ? props.CalendarItem.name : "",
            street: (props.edit) ? props.CalendarItem.street : "",
            date: (props.edit) ? props.CalendarItem.date : "",
            time: (props.edit) ? props.CalendarItem.time : "",
            body: (props.edit) ? props.CalendarItem.body : "",
            nummer:"",
            city:"",
            familyId: (props.edit) ? props.CalendarItem.familyId : "",
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(e, fieldName) {
        const {text} = e.nativeEvent
        this.setState({ [fieldName] : text });
    }

    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('CurrentPatient');
          const CurrentPatient = JSON.parse(value)
            this.setState({ 
                familyId : CurrentPatient.familyId,
                name : CurrentPatient.name,
                street : CurrentPatient.street,
                nummer : CurrentPatient.nummer,
                city : CurrentPatient.city 
            });
        } catch (error) {
          // Error retrieving data
        }
    };

    componentDidMount(){
        this._retrieveData()
    }

    static navigationOptions = ({navigation,props}) => ({
        headerStyle: {borderBottomWidth: 0,marginTop: 30,},
        headerTitleStyle: {
            fontSize: 20,
        },
        headerLeft: (<TouchableOpacity onPress={()=> Actions.Calendar()}><Ionicons name='md-arrow-back' size={30} style={{ color: "#FF4B4B",marginLeft: 30 }}/></TouchableOpacity>),    
    })
    
    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.topContainer}>
                    <DatePicker
                    locale={'nl'}
                    style={{ 
                    width: "90%",
                    marginVertical: 10,
                    borderBottomColor: 'white',
                    backgroundColor: "white", 
                    shadowOffset:{  width: 4,  height: 6,  },
                    shadowColor: '#8386A3',
                    shadowOpacity: 0.12,
                    borderRadius: 10,
                    paddingVertical: 10,
                    marginHorizontal: 20,
                    paddingHorizontal: 20,
                    }}
                    date={this.state.date} //initial date from state
                    mode="date" //The enum of date, datetime and time
                    placeholder="Datum"
                    format="YYYY-MM-DD"
                    minDate=""
                    maxDate=""
                    confirmBtnText="Bevestigen"
                    cancelBtnText="Annuleren"
                    customStyles={{
                    dateIcon: {
                        height: 0,
                        width: 0,
                        
                    },
                    placeholderText: {
                        fontSize: fontSize.regular,
                        fontFamily: fontFamily.medium
                    },
                    dateInput: {
                        borderWidth: 0,
                        alignItems: 'flex-start',
                    },
                    btnTextConfirm: {
                        color: "#FF4B4B",
                        },
                    }}
                    onDateChange={date => {
                    this.setState({ date: date });
                    }}
                />
                <DatePicker
                locale={'nl'}
                style={{ 
                width: "90%",
                marginVertical: 10,
                borderBottomColor: 'white',
                backgroundColor: "white", 
                shadowOffset:{  width: 4,  height: 6,  },
                shadowColor: '#8386A3',
                shadowOpacity: 0.12,
                borderRadius: 10,
                paddingVertical: 10,
                marginHorizontal: 20,
                paddingHorizontal: 20,
                }}
                date={this.state.time} //initial date from state
                mode="time" //The enum of date, datetime and time
                placeholder="Tijdstip"
                format="HH:mm"
                confirmBtnText="Bevestigen"
                cancelBtnText="Annuleren"
                customStyles={{
                dateIcon: {
                    height: 0,
                    width: 0,
                    
                },
                placeholderText: {
                    fontSize: fontSize.regular,
                    fontFamily: fontFamily.medium
                },
                dateInput: {
                    borderWidth: 0,
                    alignItems: 'flex-start',
                },
                btnTextConfirm: {
                    color: "#FF4B4B",
                    },
                }}
                onDateChange={time => {
                this.setState({ time: time });
                }}
                />
                    <TextInput
                        onChange={(e)=>this.onChange(e,'body')}
                        placeholder={"Omschrijving"}
                        style={styles.textInput}
                        value={this.state.body}
                        label={'body'}
                    />
                <SaveButton edit={true} data={this.state}/> 
                </View>
                <KeyboardSpacer />
            </ScrollView>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.authReducer.user,
    }
}

export default connect(mapStateToProps)(CalendarEdit);