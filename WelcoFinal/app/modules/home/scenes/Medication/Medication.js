import React from 'react';
import {View, FlatList, ActivityIndicator,Text,ScrollView,TouchableOpacity} from 'react-native';

import {connect} from 'react-redux';
import moment from "moment";
import {actions as home} from "../../index"
const { getMedicationItems } = home;
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from 'react-native-vector-icons/FontAwesome';

import {Actions} from 'react-native-router-flux';
import { List, ListItem } from 'react-native-elements';
import styles from "./styles"
import MedicationComp from "../../components/Medication"

class Medication extends React.Component {
    constructor() {
        super();
        this.state = {    
        }
 
        this.renderItem = this.renderItem.bind(this);
    }

    componentDidMount() {
        this.props.getMedicationItems((error) => alert(error.message))
    }

    renderItem({item, index}) {
        return <MedicationComp index={index} data={item} />
    }


    static navigationOptions = ({navigation}) => ({
        headerStyle: {borderBottomWidth: 0,marginTop: 30,},
        headerTitleStyle: {
            fontSize: 20,
        },
        headerRight: (<TouchableOpacity onPress={()=> Actions.MedicationEdit()}><Icon name='edit' size={25} style={{ color: "#303E48",marginRight: 30 }}/></TouchableOpacity>),
        headerLeft: (<TouchableOpacity onPress={()=> Actions.Overview()}><Ionicons name='md-arrow-back' size={30} style={{ color: "#FF4B4B",marginLeft: 30 }}/></TouchableOpacity>),    
    })

    render() {
        console.log(moment().format('YYYY-MM-DD'))
        if (this.props.FixedMedicationItems.length === 0 && this.props.TempMedicationItems.length === 0){
            return(
                <View style={styles.container}>
                    <View style={styles.activityIndicator}>
                        <Text style={styles.noMedication}>Er zijn geen medicijnen</Text>
                    </View>
                </View>
            )
        }else{
            return (
                <ScrollView style={styles.container}>
                    <Text style={styles.medicationTitle}>Vaste medicatie</Text>
                    {this.props.FixedMedicationItems.length != 0 ?
                        <FlatList
                            ref='listRef'
                            data={this.props.FixedMedicationItems.sort((a, b) => a.takeMedication.localeCompare(b.takeMedication))}
                            renderItem={this.renderItem}
                            initialNumToRender={5}
                            keyExtractor={(item, index) => index.toString()}/>
                    :    
                    <View style={styles.activityIndicator}>
                        <Text style={styles.noMedication}>Er is geen vaste medicatie</Text>
                    </View>
                    }    
                    <Text style={styles.medicationTitleTop}>Tijdelijke medicatie</Text>
                    {this.props.TempMedicationItems.length != 0 ?    
                    <FlatList
                        ref='listRef'
                        data={this.props.TempMedicationItems.sort((a, b) => a.takeMedication.localeCompare(b.takeMedication))}
                        renderItem={this.renderItem}
                        initialNumToRender={5}
                        keyExtractor={(item, index) => index.toString()}/>
                    :    
                        <View style={styles.activityIndicator}>
                        <Text style={styles.noMedication}>Er is geen tijdelijke medicatie</Text>
                    </View>
                    }        
                </ScrollView>
            );
        }
    }
}

function mapStateToProps(state, props) {
    return {
        isLoading: state.homeReducer.isLoading,
        FixedMedicationItems: state.homeReducer.MedicationItems.filter((medication) => { return medication.type === 0 && medication.CompleteMedication === false || moment(medication.CompleteMedicationDate).isSameOrAfter(moment().format('YYYY-MM-DD')) && moment(medication.CompleteMedicationDate).isSameOrBefore(moment(new Date(), "DD-MM-YYYY").add(3, 'days')) && medication.CompleteMedication === true && medication.type === 0  }),
        TempMedicationItems: state.homeReducer.MedicationItems.filter((medication) => { return medication.type === 1 && medication.CompleteMedication === false || moment(medication.CompleteMedicationDate).isSameOrAfter(moment().format('YYYY-MM-DD')) && moment(medication.CompleteMedicationDate).isSameOrBefore(moment(new Date(), "DD-MM-YYYY").add(3, 'days')) && medication.CompleteMedication === true && medication.type === 1  }),
    }
}

export default connect(mapStateToProps, { getMedicationItems })(Medication);
