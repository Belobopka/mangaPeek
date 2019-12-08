/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  Text,
  Modal,
  View,
  TouchableHighlight,
} from 'react-native';

export default class Error extends React.Component {

  state = {
    modalVisible: true,
  };

  setModal(isVisible) {
    this.setState({ modalVisible: isVisible });
  }

  onRequestClose = () => {

  }

  render() {
    const { children, err } = this.props;
    console.log('render Error', this.state.modalVisible && err);
    return (
      <View>
        {children}
      </View>
      // err ?
      // (
      // <View style={{marginTop: 22}}> 
      //   <Modal
      //     animationType="slide"
      //     transparent={false}
      //     visible={this.state.modalVisible}
      //     onRequestClose={this.onRequestClose}
      //   >
      //     <View style={{ marginTop: 22 }}>
      //       <View>
      //         <Text>{err && err.toString()}</Text>
      //         <TouchableHighlight
      //           onPress={() => {
      //             this.setModal(false);
      //           }}
      //         >
      //           <Text>Hide Modal</Text>
      //         </TouchableHighlight>
      //       </View>
      //     </View>
      //   </Modal>
      // </View>
      // )
      // :
      // children 
      );
  }
}
