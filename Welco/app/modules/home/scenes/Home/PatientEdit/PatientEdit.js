import React from 'react';
import { View, TextInput, ScrollView, TouchableHighlight,Button,TouchableOpacity } from 'react-native';
import { HelperText} from 'react-native-paper';
import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles"
import SaveButton from '../../../components/Patient/SaveButton';

class PatientEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: (props.edit) ? props.patient.id : "",
            name: (props.edit) ? props.patient.name : "",
            street: (props.edit) ? props.patient.street : "",
            city: (props.edit) ? props.patient.city : "",
            nummer: (props.edit) ? props.patient.nummer : "",
            age: (props.edit) ? props.patient.age : "",
            lengthPerson: (props.edit) ? props.patient.lengthPerson : "",
            weight: (props.edit) ? props.patient.weight : "",
            familyId: (props.edit) ? props.patient.familyId : "",
            avatar: (props.edit) ? props.patient.avatar : ""
        };
        this.onChange = this.onChange.bind(this);
    }m

    onChange(e, fieldName) {
        const {text} = e.nativeEvent;
        this.setState({ [fieldName] : text });
    }

    static navigationOptions = ({navigation,props}) => ({
        headerStyle: {borderBottomWidth: 0,marginTop: 30,},
        headerTitleStyle: {
            fontSize: 20,
        },
        headerLeft: (<TouchableOpacity onPress={()=> Actions.Home()}><Ionicons name='md-arrow-back' size={30} style={{ color: "#FF4B4B",marginLeft: 30 }}/></TouchableOpacity>),    
	})

    render() {
        return (
            <ScrollView style={{flex:1,backgroundColor: "white"}}>
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <TextInput
                        onChange={(e)=>this.onChange(e,'name')}
                        placeholder={"Naam"}
                        style={styles.textInput}
                        value={this.state.name}
                        label={'Naam'}
                    />
                    <TextInput
                        onChange={(e)=>this.onChange(e,'street')}
                        placeholder={"Straat"}
                        style={styles.textInput}
                        value={this.state.street}
                        label={'Straat'}
                    />
                    <TextInput
                        onChange={(e)=>this.onChange(e,'nummer')}
                        placeholder={"Huisnummer"}
                        style={styles.textInput}
                        value={this.state.nummer}
                        label={'Huisnummer'}
                    />
                    <TextInput
                        onChange={(e)=>this.onChange(e,'city')}
                        placeholder={"Gemeente"}
                        style={styles.textInput}
                        value={this.state.city}
                        label={'Gemeente'}
                    />
                    <TextInput
                        onChange={(e)=>this.onChange(e,'age')}
                        placeholder={"Leeftijd"}
                        style={styles.textInput}
                        value={this.state.age}
                        label={'age'}
                    />
                    <TextInput
                        onChange={(e)=>this.onChange(e,'lengthPerson')}
                        placeholder={"Lengte"}
                        style={styles.textInput}
                        value={this.state.lengthPerson}
                        label={'lengthPerson'}
                    />
                    <HelperText
                        type="error"
                        style={{marginLeft: 20,color: "#FF4B4B"}}
                        visible={!this.state.lengthPerson.includes('m')}>
                        Vergeet de m van meter niet!
                    </HelperText>
                    <TextInput
                        onChange={(e)=>this.onChange(e,'weight')}
                        placeholder={"Gewicht"}
                        style={styles.textInput}
                        value={this.state.weight}
                        label={'weight'}
                    />
                    <HelperText
                        type="error"
                        style={{marginLeft: 20,color: "#FF4B4B"}}
                        visible={!this.state.weight.includes('kg')}>
                        Vergeet de kg van kilo niet!
                    </HelperText>
                    {this.state.name && this.state.weight && this.state.lengthPerson && this.state.age && this.state.city && this.state.street && <SaveButton edit={true} data={this.state}/> }
                </View>
            </View>
            </ScrollView> 
        );
    }
}

export default connect(null)(PatientEdit);
