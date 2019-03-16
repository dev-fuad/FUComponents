import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Navbar from '../common/Navbar';

class SecondScreen extends Component {
  state = { };

  render() {
    return (
      <View>
        <Navbar title="Page 2" />
        <Text>Page 2</Text>
      </View>
    );
  }
}

export default SecondScreen;
