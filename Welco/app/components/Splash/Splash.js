import React from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';

import styles from './styles'

export default class extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <Image style={styles.image} source={require('../../assets/logo.png')} />
                </View>
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator size="large" color="#303E48" animating={true}/>
                </View>
            </View>
        );
    }
}
