import React from 'react';
import { View, TextInput, ScrollView, TouchableHighlight,Button,AsyncStorage,TouchableOpacity } from 'react-native';
import {Actions} from 'react-native-router-flux';
import { HelperText} from 'react-native-paper';
import {connect} from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles"
import SaveButton from '../../../components/ProfileComp/SaveButton';
const uuidv4 = require('uuid/v4');
class ProfileEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: (props.edit) ? props.ProfileItem.id : uuidv4() ,
            titleInfo: (props.edit) ? props.ProfileItem.titleInfo : "",
            familyId: (props.edit) ? props.ProfileItem.familyId : "",
            descriptionInfo: (props.edit) ? props.ProfileItem.descriptionInfo : "",
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
        headerLeft: (<TouchableOpacity onPress={()=> Actions.Profile()}><Ionicons name='md-arrow-back' size={30} style={{ color: "#FF4B4B",marginLeft: 30 }}/></TouchableOpacity>),    
    })
    
    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.topContainer}>
                    <TextInput
                        onChange={(e)=>this.onChange(e,'titleInfo')}
                        placeholder={"Titel"}
                        style={styles.textInput}
                        value={this.state.titleInfo}
                        label={'Titel'}
                    />
                    <TextInput
                        onChange={(e)=>this.onChange(e,'descriptionInfo')}
                        placeholder={"Omschrijving info"}
                        style={styles.textInput}
                        multiline={true}
                        numberOfLines={12}
                        value={this.state.descriptionInfo}
                        label={'descriptionInfo'}
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

export default connect(mapStateToProps)(ProfileEdit);