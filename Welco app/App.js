import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Font, AppLoading } from 'expo';

import Router from './app/config/routes'
import store from './app/modules/redux/store';

function cacheFonts(fonts) {
    return fonts.map(font => Font.loadAsync(font));
}

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
        }
    }


    async _loadAssetsAsync() {
        const fontAssets = cacheFonts([
            {MontserratMedium: require('./app/assets/fonts/Montserrat-Medium.ttf')},
            {MontserratRegular: require('./app/assets/fonts/Montserrat-Regular.ttf')},
            {MontserratLight: require('./app/assets/fonts/Montserrat-Light.ttf')}
        ]);
        await Promise.all([...fontAssets]);
    }

    render() {
        console.disableYellowBox = true; 
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._loadAssetsAsync}
                    onFinish={() => this.setState({isReady: true})}
                    onError={console.warn}
                />
            );
        }

        return (
            <Provider store={store}>
                <Router/>
            </Provider>
        );
    }
}