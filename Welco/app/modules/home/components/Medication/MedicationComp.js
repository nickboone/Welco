import React from 'react';

import { Text, View, TouchableOpacity, ActionSheetIOS, ListView,Alert,AsyncStorage } from 'react-native';

import { Icon } from 'react-native-elements'
import moment from "moment";

import styles from "./styles"
import { connect } from "react-redux";

import { actions, theme } from "../../index"
import { Actions } from "react-native-router-flux";

const { deleteMedicationItem,MedicationComplete } = actions;
const { normalize } = theme;

class MedicationComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            familyIdCurrentPatient: ""
        }

        this.onOption = this.onOption.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onToggleItem = this.onToggleItem.bind(this);
        this.MedicationComplete = this.MedicationComplete.bind(this);
    }

    onOption(){
        ActionSheetIOS.showActionSheetWithOptions({
                options: ['Bewerken', 'Verwijderen', 'Annuleren'],
                destructiveButtonIndex: 1,
                cancelButtonIndex: 2,
            },
            (buttonIndex) => {
                if (buttonIndex === 0) Actions.MedicationEdit({ edit:true, MedicationItem: this.props.data })
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

    MedicationComplete(){
        const { user } = this.props;
        const data = { data: this.props.data, uid:user.uid };
        this.props.MedicationComplete(data, (error) =>  alert(error.message))
    }

    onDelete(){
        this.props.deleteMedicationItem(this.props.data, (error) =>  alert(error.message))
    }

    onToggleItem(){
        const { user } = this.props;
        const data = { data: this.props.data, uid:user.uid };

        this.props.toggleItem(data, (error) =>  alert(error.message))
    }

    renderOptionButton(){
        return(
            <View style={styles.right}>
                <TouchableOpacity onPress={this.onOption}>
                    <View style={styles.more}>
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


    renderCompleteMedicationButton(){
        const { user } = this.props;
        const MedicationItem = this.props.data;
        const { CompleteMedications } = MedicationItem;
        if(MedicationItem.CompleteMedication === true){
        return(
            <TouchableOpacity>
                <View style={styles.buttonContainer}>
                    <Icon
                        name={'check-circle'}
                        type='font-awesome'
                        solid
                        color={ '#FF4B4B'}
                        iconStyle={{height:normalize(25)}}
                        size={normalize(25)}
                    />
                </View>
            </TouchableOpacity>
        )
        }else{
            return(
                <TouchableOpacity onPress={this.MedicationComplete}>
                    <View style={styles.buttonContainer}>
                        <Icon
                            name={
                                (CompleteMedications && CompleteMedications[user.uid] && CompleteMedications[MedicationItem.familyId]) ?
                                    'check-circle'
                                    :
                                    'check-circle'
                            }
                            type='font-awesome'
                            solid
                            color={ (CompleteMedications && CompleteMedications[user.uid] && CompleteMedications[MedicationItem.familyId]) ?
                                '#FF4B4B'
                                :
                                'rgba(48, 62, 72, 0.1)'
                            }
                            iconStyle={{height:normalize(25)}}
                            size={normalize(25)}
                        />
                    </View>
                </TouchableOpacity>
            )
        }
    }

    render() {
        const { familyIdCurrentPatient } = this.state;
        const { user, index } = this.props;
        const { name, userId,familyId, type, body, takeMedication, CompleteMedication,date} = this.props.data;
        return (
            <View style={styles.container}>
            {(user.uid === userId && familyId === familyIdCurrentPatient || user.uid === familyId && familyId === familyIdCurrentPatient) &&
                    <View>
                        <View style={styles.MedicationBox}>
                        <View style={styles.MedicationContent}>
                                <View  style={styles.MedicationComplete}>{this.renderCompleteMedicationButton()}</View>
                                <Text  style={styles.Medicationame}>{name}</Text>
                                <View style={styles.actionBox}>
                                    <Text  style={styles.timeDate}><Text style={styles.dateColor}>{moment(date).format('DD MMMM')},</Text> {takeMedication}</Text> 
                                    {(user.uid === userId && !CompleteMedication) && this.renderOptionButton()}
                                </View>
                        </View>        
                                <View style={styles.MedicationBody}>
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
    }
}

export default connect(mapStateToProps, { deleteMedicationItem,MedicationComplete })(MedicationComp);