import React from 'react';
import {Scene, Router, ActionConst, Stack, Modal, Tabs, Actions} from 'react-native-router-flux';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList,
  } from 'react-native';

//Splash Component
import Splash from '../components/Splash/Splash';
import Icon from 'react-native-vector-icons/FontAwesome';
//Authentication Scenes
import Welcome from '../modules/auth/scenes/Welcome';
import Register from '../modules/auth/scenes/Register';
import CompleteProfile from '../modules/auth/scenes/CompleteProfile';
import Login from '../modules/auth/scenes/Login';
import ForgotPassword from '../modules/auth/scenes/ForgotPassword';

import Home from '../modules/home/scenes/Home';
import Calendar from '../modules/home/scenes/Calendar';
import CalendarEdit from '../modules/home/scenes/Calendar/CalendarEdit';
import PatientEdit from '../modules/home/scenes/Home/PatientEdit';
import Profile from '../modules/home/scenes/Profile';
import UserProfile from '../modules/home/scenes/UserProfile';
import ProfileEdit from '../modules/home/scenes/Profile/ProfileEdit';
import History from '../modules/home/scenes/History/';
import Overview from '../modules/home/scenes/Overview';

import Succession from '../modules/home/scenes/Succession/';
import SuccessionEdit from '../modules/home/scenes/Succession/SuccessionEdit/';

import Medication from '../modules/home/scenes/Medication/';
import MedicationEdit from '../modules/home/scenes/Medication/MedicationEdit/';

import TasksOverview from '../modules/home/scenes/Task/TasksOverview';
import TaskDetails from '../modules/home/scenes/Task/TaskDetails';
import TaskEdit from '../modules/home/scenes/Task/TaskDetails/TaskEdit';
import { ifIphoneX } from 'react-native-iphone-x-helper'
import NavButton from '../components/NavButton';
//Import Store, actions
import store from '../modules/redux/store'
import {checkLoginStatus} from "../modules/auth/actions";

import {color, navTitleStyle} from "../modules/styles/theme";

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
            isLoggedIn: false
        }
    }

    componentDidMount() {
        let _this = this;
        store.dispatch(checkLoginStatus((isLoggedIn) => {
            _this.setState({isReady: true, isLoggedIn});
        }));
    }

    renderAddButton(props) {
        return (
            <NavButton onPress={Actions.Patient}
                       name={"plus"} type={"entypo"}
                       color={color.black}/>
        )
    }

    renderCloseButton(props) {
        return (
            <NavButton onPress={Actions.pop}
                       name={"md-close"}
                       type={"ionicon"}
                       color={color.black}/>
        )
    }

    render() {
        if (!this.state.isReady)
            return <Splash/>

        return (
            <Router>
                    <Scene key="root" hideNavBar
                           navigationBarStyle={{backgroundColor: "#fff"}}
                           titleStyle={navTitleStyle}
                           backButtonTintColor={color.black}>
                        <Stack key="Auth" initial={!this.state.isLoggedIn}>
                            <Scene key="Welcome" component={Welcome} title="" initial={true} hideNavBar/>
                            <Scene key="Register" component={Register} hideNavBar title="Register"/>
                            <Scene key="CompleteProfile" component={CompleteProfile} hideNavBar title="Gebruikersnaam" back={false}/>
                            <Scene key="Login" component={Login} title="Login" hideNavBar/>
                            <Scene key="ForgotPassword" component={ForgotPassword} title="Forgot Password" hideNavBar/>
                        </Stack>
                        <Stack key="Main" initial={this.state.isLoggedIn}>
                                    <Scene key="UserProfile" component={UserProfile} title="Profiel" initial={true} type={ActionConst.REPLACE}/>
                                    <Scene key="Home" hideNavBar component={Home} title="Home" initial={true} type={ActionConst.REPLACE}/>
                                    <Scene key="PatientEdit"  navigationBarStyle={{backgroundColor: "#fff"}} component={PatientEdit} title="Patiënt"/>
                            <Scene tabs tabBarStyle={{
                                ...ifIphoneX({
                                height: 50,
                                paddingTop: 20, 
                                }, {
                                height: 60,paddingTop: 3,}),backgroundColor: "white",borderTopColor: "white",shadowOffset:{  width: 2,  height: -3,padding: 10,},shadowColor: '#8386A3',shadowOpacity: 0.12,}}  showLabel={false} hideNavBar>
                                <Scene icon={({ focused }) => (<Icon style={{ width: 30 }} name={focused ? 'user' : 'user'} size={25} color={focused ? '#FF4B4B' : '#303E48'}/>)} title="Overview"> 
                                    <Scene key="TasksOverview" component={TasksOverview} title="Taken" initial={true} type={ActionConst.REPLACE}/>
                                    <Scene key="TaskDetails" component={TaskDetails} title="Taak" initial={true} type={ActionConst.REPLACE}/> 
                                    <Scene key="TaskEdit" navigationBarStyle={{backgroundColor: "#fff"}} component={TaskEdit} title="Taak"/>

                                    <Scene key="Succession" component={Succession} title="Opvolging" initial={true} type={ActionConst.REPLACE}/>
                                    <Scene key="SuccessionEdit" navigationBarStyle={{backgroundColor: "#fff"}} component={SuccessionEdit} title="Opvolging"/>

                                    <Scene key="History" component={History} title="Historiek" initial={true} type={ActionConst.REPLACE}/> 
                                    <Scene key="Overview" component={Overview} title="Overzicht" initial={true} type={ActionConst.REPLACE}/>

                                    <Scene key="Profile" component={Profile} title="Profiel" initial={true} type={ActionConst.REPLACE}/>
                                    <Scene key="ProfileEdit" navigationBarStyle={{backgroundColor: "#fff"}} component={ProfileEdit} title="Algemene info"/>
                                </Scene> 
                                <Scene icon={({ focused }) => (<Icon style={{ width: 30}} name={focused ? 'calendar' : 'calendar'} size={25} color={focused ? '#FF4B4B' : '#303E48'}/>)} title="Calendar">  
                                    <Scene key="Calendar" component={Calendar} title="Kalender" initial={true} type={ActionConst.REPLACE}/>
                                    <Scene key="CalendarEdit" navigationBarStyle={{backgroundColor: "#fff"}} component={CalendarEdit} title="Kalender"/>
                                </Scene>  
                                <Scene icon={({ focused }) => (<Icon style={{ width: 30}} name={focused ? 'heartbeat' : 'heartbeat'} size={25} color={focused ? '#FF4B4B' : '#303E48'}/>)} title="History"> 
                                    <Scene key="History" component={History} title="Historiek" initial={true} type={ActionConst.REPLACE}/>
                                </Scene> 
                                
                                <Scene icon={({ focused }) => (<Icon style={{ width: 35}} name={focused ? 'medkit' : 'medkit'} size={25} color={focused ? '#FF4B4B' : '#303E48'}/>)} title="Profile"> 
                                <Scene key="Medication" component={Medication} title="Medicatie" initial={true} type={ActionConst.REPLACE}/>
                                <Scene key="MedicationEdit" navigationBarStyle={{backgroundColor: "#fff"}} component={MedicationEdit} title="Medicatie"/>
                                </Scene> 
                            </Scene>
                        </Stack> 
                    </Scene>
            </Router>
        )
    }
}
