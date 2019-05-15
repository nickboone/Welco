import React from 'react';

import { Text, View, TouchableOpacity, ActionSheetIOS } from 'react-native';
import {AsyncStorage} from 'react-native';
import { Icon,ListItem } from 'react-native-elements'
import moment from "moment";
import styles from "./styles"
import { connect } from "react-redux";

import { actions, theme } from "../../index"
import { Actions } from "react-native-router-flux";

const { deletePatient} = actions;
const { normalize,color,fontFamily } = theme;


class Patient extends React.Component {
    constructor() {
        super();
        this.state = {
            CurrentPatient : ""
        }

        this.onOption = this.onOption.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onOption(){
        const { patients, index } = this.props;
        const patient = patients[index];

        ActionSheetIOS.showActionSheetWithOptions({
                options: ['Bewerken', 'Verwijderen', 'Annuleren'],
                destructiveButtonIndex: 1,
                cancelButtonIndex: 2,
            },
            (buttonIndex) => {
                if (buttonIndex === 0) Actions.PatientEdit({ edit:true, patient })
                else if (buttonIndex === 1) this.onDelete();
            });
    }

    onDelete(){
        const { patients, index } = this.props;
        const patient = patients[index];

        this.props.deletePatient(patient, (error) =>  alert(error.message))
    }

    renderOptionButton(){
        return(
            <View style={styles.right}>
                <TouchableOpacity onPress={this.onOption}>
                    <View style={styles.buttonContainer}>
                        <Icon
                            name={'md-more'}
                            type='ionicon'
                            color='#303E48'
                            size={normalize(20)}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    PatientSaver = async (patient) => {
            try {
              await AsyncStorage.setItem('CurrentPatient', JSON.stringify(patient));
              this.setState({ CurrentPatient : patient });
              Actions.Overview();
            } catch (error) {
              // Error saving data
            }
    };

    render() {
        const { user, patients, index } = this.props;
        const patient = patients[index];
        const { name, userId, familyId, street,avatar, city, nummer } = patient;

        return (
            <View style={styles.container}>
            {(user.uid === userId || user.uid === familyId ) && 
                <ListItem 
                        roundAvatar
                        avatar={avatar}
                        avatarStyle={{ width: 40,height: 40,borderRadius: 20}}
                        key={userId}
                        title={name}
                        titleStyle={{marginLeft: 20,fontFamily: fontFamily.medium,color:color.main,fontSize: 16,}}
                        subtitle={street +" "+nummer+", "+ city }
                        subtitleStyle={{marginLeft: 20,fontFamily: fontFamily.light,color:color.light_grey,fontSize: 14}}
                        containerStyle={styles.listItem}
                        onPress={() => this.PatientSaver(patient)}
                        rightIcon={this.renderOptionButton()}
                    />
            }    
            </View>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.authReducer.user,
        patients: state.homeReducer.patients
    }
}

export default connect(mapStateToProps, { deletePatient })(Patient);
