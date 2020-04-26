import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Button,
  Animated,
} from 'react-native';


const styles = StyleSheet.create({
});


export default class ExpandPage extends Component {
  constructor(props) {
    super(props);
    this.yTranslate = new Animated.Value(0);
    this.state = {
      menuExpanded: false,
    };
  }

  onPress = () => {
    const { menuExpanded } = this.state;
    if (menuExpanded) {
      this.setState({
        menuExpanded: false,
      }, () => {
        this.yTranslate.setValue(1);
        Animated.spring(
          this.yTranslate,
          {
            toValue: 0,
            friction: 4,
          },
        ).start();
      });
      return;
    }
    this.setState({
      menuExpanded: true,
    }, () => {
      this.yTranslate.setValue(0);
      Animated.spring(
        this.yTranslate,
        {
          toValue: 1,
          // friction: 3,
        },
      ).start();
    });
  }

  render() {
    const { props: { style, children }, state: { menuExpanded } } = this;
    const menuMoveY = this.yTranslate.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -400],
    });

    return (
      <Animated.View
        style={[style,
          {
            transform: [
              {
                translateY: menuMoveY,
              },
            ],
          },
        ]}
      >
        <View style={styles.tip_menu}>
          <Button
            onPress={this.onPress}
            title={menuExpanded ? 'Свернуть' : 'Развернуть'}
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
        {children({ imageStyle: menuExpanded ? {} : {} })}
      </Animated.View>

    );
  }
}
