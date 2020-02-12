/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  Platform, StatusBar, StyleSheet, View,
} from 'react-native';
import { AppLoading } from 'expo';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';


import HarwareNavigation from './HarwareNavigation';
import routes from './navigation/AppNavigator';
import reducer from './reducers/reducers';
import vars from './screens/styles/vars';

const reactNavigationMiddleware = createReactNavigationReduxMiddleware('root', state => state.nav);

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk, reactNavigationMiddleware)),
);

export const ReduxifiedNav = reduxifyNavigator(routes, 'root');

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  _handleLoadingError = (error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <Provider store={store}>
          <AppLoading
            startAsync={this._loadResourcesAsync}
            onError={this._handleLoadingError}
            onFinish={this._handleFinishLoading}
          />
        </Provider>
      );
    }
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <HarwareNavigation ReduxifiedNav={ReduxifiedNav} />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: vars.white,
  },
});
