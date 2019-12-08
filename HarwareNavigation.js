/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { BackHandler } from 'react-native';

class Navigation extends Component {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
  onBackPress = () => {
      const { dispatch, state } = this.props;
      if (state.index === 0) {
          return false;
      }
      dispatch(NavigationActions.back());
      return true;
  };
  render() {
    const { ReduxifiedNav } = this.props;
      return <ReduxifiedNav
          state={this.props.state}
          dispatch={this.props.dispatch}
      />;
  }
}

const mapStateToProps = state => ({
    state: state.nav,
});

export default connect(mapStateToProps)(Navigation);

