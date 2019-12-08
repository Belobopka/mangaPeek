/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import {
  Text,
  Modal,
  View,
  TouchableHighlight,
} from 'react-native';


const ErrorModal = () => {
  const [modalVisible, setModal] = useState(false);
  return (
    <View />
  );
};

export default class Error extends React.Component {
  state = {
    modalVisible: true,
  };

  setModal(isVisible) {
    this.setState({ modalVisible: isVisible });
  }

  render() {
    const { children, err } = this.props;
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
