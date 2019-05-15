import React from 'react';

import { Text, View, TouchableOpacity, ActionSheetIOS, ListView,Alert,AsyncStorage } from 'react-native';

import { Icon } from 'react-native-elements'
import moment from "moment";

import styles from "./styles"
import { connect } from "react-redux";

import { actions, theme } from "../../index"
import { Actions } from "react-native-router-flux";

const { deleteProfileItem} = actions;
const { normalize } = theme;

class ProfileComp extends React.Component {
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
        const { ProfileItems, index } = this.props;
        const ProfileItem = ProfileItems[index];

        ActionSheetIOS.showActionSheetWithOptions({
                options: ['Bewerken', 'Verwijderen', 'Annuleren'],
                destructiveButtonIndex: 1,
                cancelButtonIndex: 2,
            },
            (buttonIndex) => {
                if (buttonIndex === 0) Actions.ProfileEdit({ edit:true, ProfileItem })
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
        const { ProfileItems, index } = this.props;
        const ProfileItem = ProfileItems[index];
        this.props.deleteProfileItem(ProfileItem, (error) =>  alert(error.message))
    }

    onToggleItem(){
        const { user, ProfileItems, index } = this.props;
        const ProfileItem = ProfileItems[index];

        const data = { ProfileItem, uid:user.uid };

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
        const { user, ProfileItems, index } = this.props;
        const ProfileItem = ProfileItems[index];
        const { titleInfo,userId,id,familyId,descriptionInfo} = ProfileItem;
        return (
            <View style={styles.container}>
            {(user.uid === userId && familyId === familyIdCurrentPatient || user.uid === familyId && familyId === familyIdCurrentPatient) &&
                    <View>
                        <View style={styles.InfoBox}>
                        <View style={styles.InfoContent}>
                            <View style={styles.dataBox}>
                                <Text  style={styles.InfoTitle}>{titleInfo}</Text>
                                <Text  style={styles.Info}>{descriptionInfo}</Text>
                            </View>
                            <View style={styles.actionBox}>
                                {(user.uid === userId || user.uid === familyId ) && this.renderOptionButton()}
                            </View>
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
        ProfileItems: state.homeReducer.ProfileItems
    }
}

export default connect(mapStateToProps, { deleteProfileItem })(ProfileComp);