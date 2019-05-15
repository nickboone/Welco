import React from 'react';
import { View, TextInput, ScrollView, TouchableHighlight,Button,AsyncStorage,StyleSheet,TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { HelperText,RadioButton} from 'react-native-paper';
import {connect} from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import RNPickerSelect from 'react-native-picker-select';
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles"
import { theme } from "../../../index"
const { padding, normalize, color, fontSize, fontFamily } = theme;
import SaveButton from '../../../components/Medication/SaveButton';
const uuidv4 = require('uuid/v4');
import moment from 'moment'; 
class MedicationEdit extends React.Component {
    constructor(props) {
        super(props);
        this.inputRefs = {};
        this.state = {
            id: (props.edit) ? props.MedicationItem.id : uuidv4() ,
            name: (props.edit) ? props.MedicationItem.name : "",
            patientId: (props.edit) ? props.MedicationItem.patientId : "",
            type: (props.edit) ? props.MedicationItem.type : "",
            date: (props.edit) ? props.MedicationItem.date : moment().format("YYYY-MM-DD"),
            takeMedication: (props.edit) ? props.MedicationItem.takeMedication : "",
            familyId: (props.edit) ? props.MedicationItem.familyId : "",
            body: (props.edit) ? props.MedicationItem.body : "",
            CompleteMedication: (props.edit) ? props.MedicationItem.CompleteMedication : false,
            CompleteMedicationDate: (props.edit) ? props.MedicationItem.CompleteMedicationDate : '',
            
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
        headerLeft: (<TouchableOpacity onPress={()=> Actions.Medication()}><Ionicons name='md-arrow-back' size={30} style={{ color: "#FF4B4B",marginLeft: 30 }}/></TouchableOpacity>),    
    })
    
    render() {
        const { checked } = this.state;
        return (
            <ScrollView style={styles.container}>
                <View style={styles.topContainer}>
                    <TextInput
                        onChange={(e)=>this.onChange(e,'name')}
                        placeholder={"Medicatie"}
                        style={styles.textInput}
                        value={this.state.name}
                        label={'Medicatie'}
                    />
                    <RNPickerSelect
                        placeholder={{
                            label: 'Type medicatie',
                            value: null,
                        }}
                        items={[
                            {
                                label: 'Vaste medicatie',
                                value: 0,
                            },
                            {
                                label: 'Tijdelijke medicatie',
                                value: 1,
                            }
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
                            label: 'Tijdstip',
                            value: null,
                        }}
                        items={[
                            {
                                label: 'Ochtend',
                                value: 'Ochtend',
                            },
                            {
                                label: 'Middag',
                                value: 'Middag',
                            },{
                                label: 'Avond',
                                value: 'Avond',
                            }
                        ]}
                        onValueChange={(value) => {
                            this.setState({
                                takeMedication: value,
                            });
                        }}
                        style={{ ...pickerSelectStyles}}
                        value={this.state.takeMedication}
                        ref={(el) => {
                            this.inputRefs.picker = el;
                        }}
                    />
                    <TextInput
                        onChange={(e)=>this.onChange(e,'body')}
                        placeholder={"Opmerking"}
                        multiline={true}
                        numberOfLines={12}
                        style={styles.textInput}
                        value={this.state.body}
                        label={'Opmerking'}
                    />
                    <SaveButton edit={this.props.edit} data={this.state} />
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

export default connect(mapStateToProps)(MedicationEdit);