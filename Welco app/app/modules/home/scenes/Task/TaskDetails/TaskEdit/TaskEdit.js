import React from 'react';
import { View, TextInput, ScrollView, TouchableHighlight,Button,AsyncStorage,StyleSheet,TouchableOpacity } from 'react-native';
import {Actions} from 'react-native-router-flux';
import { HelperText,RadioButton} from 'react-native-paper';
import {connect} from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import RNPickerSelect from 'react-native-picker-select';
import Ionicons from "react-native-vector-icons/Ionicons";
import DatePicker from 'react-native-datepicker';
import styles from "./styles"
import { theme } from "../../../../index"
const { padding, normalize, color, fontSize, fontFamily } = theme;
import SaveButton from '../../../../components/TaskComp/SaveButton';
const uuidv4 = require('uuid/v4');
import moment from 'moment'; 
class TaskEdit extends React.Component {
    constructor(props) {
        super(props);
        this.inputRefs = {};
        this.state = {
            id: (props.edit) ? props.TaskItem.id : uuidv4() ,
            task: (props.edit) ? props.TaskItem.task : "",
            patientId: (props.edit) ? props.TaskItem.patientId : "",
            familyId: (props.edit) ? props.TaskItem.familyId : "",
            date: (props.edit) ? props.TaskItem.date : moment().format("YYYY-MM-DD"),
            body: (props.edit) ? props.TaskItem.body : "",
            CompleteTask: (props.edit) ? props.TaskItem.CompleteTask : false,
            type: (props.edit) ? props.TaskItem.type : '',
            typeTask: (props.edit) ? props.TaskItem.typeTask : '',
            CompleteTaskDate: (props.edit) ? props.TaskItem.CompleteTaskDate : '',
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
                patientId : CurrentPatient.id,
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
        headerLeft: (<TouchableOpacity onPress={()=> Actions.TasksOverview()}><Ionicons name='md-arrow-back' size={30} style={{ color: "#FF4B4B",marginLeft: 30 }}/></TouchableOpacity>),    
    })
    
    render() {
        const { checked } = this.state;
        return (
            <ScrollView style={styles.container}>
                <View style={styles.topContainer}>
                    <TextInput
                        onChange={(e)=>this.onChange(e,'task')}
                        placeholder={"Taak"}
                        style={styles.textInput}
                        value={this.state.task}
                        label={'Taak'}
                    />
                    <RNPickerSelect
                        placeholder={{
                            label: 'Type',
                            value: null,
                        }}
                        items={[
                            {
                                label: 'Huishouden',
                                value: 'Huishouden',
                            },
                            {
                                label: 'Mobiele taken',
                                value: 'Mobiele taken',
                            },
                            {
                                label: 'Klusjes',
                                value: 'Klusjes',
                            },
                            {
                                label: 'Verplegen',
                                value: 'Verplegen',
                            },
                        ]}
                        onValueChange={(value) => {
                            this.setState({
                                type: value,
                            });
                        }}
                        style={{ ...pickerSelectStyles}}
                        value={this.state.type}
                        ref={(el) => {
                            this.inputRefs.picker = el;
                        }}
                    />
                    <RNPickerSelect
                    placeholder={{
                        label: 'Type taak',
                        value: null,
                    }}
                    items={[
                        {
                            label: 'Vaste taak',
                            value: 0,
                        },
                        {
                            label: 'Tijdelijke taak',
                            value: 1,
                        }
                    ]}
                    onValueChange={(value) => {
                        this.setState({
                            typeTask: value,
                        });
                    }}
                    style={{ ...pickerSelectStyles}}
                    value={this.state.typeTask}
                    ref={(el) => {
                        this.inputRefs.picker = el;
                    }}
                    />
                    <TextInput
                        onChange={(e)=>this.onChange(e,'body')}
                        placeholder={"Omschrijving taak"}
                        multiline={true}
                        numberOfLines={12}
                        style={styles.textInput}
                        value={this.state.body}
                        label={'Omschrijving taak'}
                    />
                    <SaveButton edit={true} data={this.state}/>
                </View>
                <KeyboardSpacer />
            </ScrollView>
        );
    }
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        width: "90%",
        marginVertical: 10,
        borderBottomColor: 'white',
        backgroundColor: "white", 
        shadowOffset:{  width: 4,  height: 6,  },
        shadowColor: '#8386A3',
        shadowOpacity: 0.12,
        borderRadius: 10,
        paddingTop: 20,
        paddingBottom: 20,
        marginHorizontal: 20,
        paddingHorizontal: 20,
        fontSize: fontSize.regular,
        fontFamily: fontFamily.medium,
        color: color.black,
    },
});

function mapStateToProps(state, props) {
    return {
        user: state.authReducer.user,
    }
}

export default connect(mapStateToProps)(TaskEdit);