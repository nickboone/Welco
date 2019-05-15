import React from 'react';

import { Text, View, TouchableOpacity, ActionSheetIOS, ListView,Alert,AsyncStorage } from 'react-native';

import { Icon } from 'react-native-elements'
import moment from "moment";

import styles from "./styles"
import { connect } from "react-redux";

import { actions, theme } from "../../index"
import { Actions } from "react-native-router-flux";

const { deleteTaskItem,TaskComplete } = actions;
const { normalize } = theme;

class TaskComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            familyIdCurrentPatient: "",
            CurrentTaskType: ""
        }

        this.onOption = this.onOption.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onToggleItem = this.onToggleItem.bind(this);
        this.TaskComplete = this.TaskComplete.bind(this);
    }

    onOption(){

        ActionSheetIOS.showActionSheetWithOptions({
                options: ['Bewerken', 'Verwijderen', 'Annuleren'],
                destructiveButtonIndex: 1,
                cancelButtonIndex: 2,
            },
            (buttonIndex) => {
                if (buttonIndex === 0) Actions.TaskEdit({ edit:true, TaskItem: this.props.data })
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

    _retrieveType = async () => {
        try {
          const CurrentTask = await AsyncStorage.getItem('CurrentTaskType');
          const CurrentTaskType = JSON.parse(CurrentTask)
            this.setState({ 
                CurrentTaskType : CurrentTaskType.title,
            });
        } catch (error) {
          // Error retrieving data
        }
    };

    componentDidMount(){
        this._retrieveD()
        this._retrieveType()
    }

    TaskComplete(){
        const { user } = this.props;
        const data = { data: this.props.data, uid:user.uid };
        this.props.TaskComplete(data, (error) =>  alert(error.message))
    }

    onDelete(){
        this.props.deleteTaskItem(this.props.data, (error) =>  alert(error.message))
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


    renderCompleteTaskButton(){
        const { user } = this.props
        const TaskItem = this.props.data;
        const { CompleteTasks } = this.props.data;
        if(TaskItem.CompleteTask === true){
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
                    <TouchableOpacity onPress={this.TaskComplete}>
                        <View style={styles.buttonContainer}>
                            <Icon
                                name={
                                    (CompleteTasks && CompleteTasks[user.uid] && CompleteTasks[TaskItem.familyId]) ?
                                        'check-circle'
                                        :
                                        'check-circle'
                                }
                                type='font-awesome'
                                solid
                                color={ (CompleteTasks && CompleteTasks[user.uid] && CompleteTasks[TaskItem.familyId]) ?
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
        const { familyIdCurrentPatient,CurrentTaskType } = this.state;
        const { user, index } = this.props;
        const { task, userId,familyId,body,date,type,CompleteTask} = this.props.data;
        return (
            <View style={styles.container}>
            {(user.uid === userId && familyId === familyIdCurrentPatient && CurrentTaskType === type  || user.uid === familyId && familyId === familyIdCurrentPatient) &&  CurrentTaskType === type &&
                <View>
                    <View style={styles.TaskBox}>
                    <View style={styles.TaskContent}>
                            <View  style={styles.TaskComplete}>{this.renderCompleteTaskButton()}</View>
                            <Text  style={styles.Taskname}>{task}</Text>
                            <View style={styles.actionBox}>
                                <Text  style={styles.timeDate}><Text style={styles.dateColor}>{moment(date).format('DD MMMM')}</Text></Text> 
                                {(user.uid === userId && !CompleteTask) && this.renderOptionButton()}
                            </View>
                    </View>        
                            <View style={styles.TaskBody}>
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
    }
}

export default connect(mapStateToProps, { deleteTaskItem,TaskComplete })(TaskComp);