import React from 'react';

import { Text, View, TouchableOpacity, ActionSheetIOS, ListView,Alert,AsyncStorage } from 'react-native';

import { Icon } from 'react-native-elements'

import styles from "./styles"
import { connect } from "react-redux";

import moment from 'moment'
import 'moment/locale/nl'

import { actions, theme } from "../../index"
import { Actions } from "react-native-router-flux";

const { deleteSuccessionItem,SuccessionComplete } = actions;
const { normalize } = theme;

class SuccessionComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            familyIdCurrentPatient: ""
        }

        this.onOption = this.onOption.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onToggleItem = this.onToggleItem.bind(this);
        this.SuccessionComplete = this.SuccessionComplete.bind(this);
    }

    onOption(){
        const { SuccessionItems, index } = this.props;
        const SuccessionItem = SuccessionItems[index];

        ActionSheetIOS.showActionSheetWithOptions({
                options: ['Bewerken', 'Verwijderen', 'Annuleren'],
                destructiveButtonIndex: 1,
                cancelButtonIndex: 2,
            },
            (buttonIndex) => {
                if (buttonIndex === 0) Actions.SuccessionEdit({ edit:true, SuccessionItem })
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

    SuccessionComplete(){
        const { user, SuccessionItems, index } = this.props;
        const SuccessionItem = SuccessionItems[index];

        const data = { SuccessionItem, uid:user.uid };
        this.props.SuccessionComplete(data, (error) =>  alert(error.message))
    }

    onDelete(){
        const { SuccessionItems, index } = this.props;
        const SuccessionItem = SuccessionItems[index];
        this.props.deleteSuccessionItem(SuccessionItem, (error) =>  alert(error.message))
    }

    onToggleItem(){
        const { user, SuccessionItems, index } = this.props;
        const SuccessionItem = SuccessionItems[index];

        const data = { SuccessionItem, uid:user.uid };

        this.props.toggleItem(data, (error) =>  alert(error.message))
    }

    renderOptionButton(){
        return(
            <View style={styles.right}>
                <TouchableOpacity style={styles.buttons} onPress={this.onOption}>
                    <View>
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


    renderCompleteSuccessionButton(){
        const { user, SuccessionItems, index } = this.props;
        const SuccessionItem = SuccessionItems[index];
        const { CompleteSuccessions } = SuccessionItem;
        if(SuccessionItem.CompleteSuccession === true){
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
                    <TouchableOpacity onPress={this.SuccessionComplete}>
                        <View style={styles.buttonContainer}>
                            <Icon
                                name={
                                    (CompleteSuccessions && CompleteSuccessions[user.uid] && CompleteSuccessions[SuccessionItem.familyId]) ?
                                        'check-circle'
                                        :
                                        'check-circle'
                                }
                                type='font-awesome'
                                solid
                                color={ (CompleteSuccessions && CompleteSuccessions[user.uid] && CompleteSuccessions[SuccessionItem.familyId]) ?
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
        const { user, SuccessionItems, index } = this.props;
        const SuccessionItem = SuccessionItems[index];
        const { happen, userId,familyId, body,date,time, SuccessionComplete} = SuccessionItem;
        return (
            <View style={styles.container}>
            {(user.uid === userId && familyId === familyIdCurrentPatient || user.uid === familyId && familyId === familyIdCurrentPatient) &&
                    <View>
                        <Text style={styles.dateBox}>{date}</Text>
                        <View style={styles.successionBox}>
                        <View style={styles.successionContent}>
                                <View  style={styles.successionComplete}>{this.renderCompleteSuccessionButton()}</View>
                                <Text  style={styles.successioName}>{happen}</Text>
                                <View style={styles.actionBox}>
                                    <Text  style={styles.timeDate}>{time}</Text> 
                                    {(user.uid === userId) && SuccessionComplete != true && this.renderOptionButton()}
                                </View>
                        </View>        
                                <View style={styles.successionBody}>
                                    <Text  style={styles.body}>{body}</Text>  
                                </View>
                        </View>
                    </View>
                }}/>
            }    
            </View>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.authReducer.user,
        SuccessionItems: state.homeReducer.SuccessionItems,
    }
}

export default connect(mapStateToProps, { deleteSuccessionItem,SuccessionComplete })(SuccessionComp);