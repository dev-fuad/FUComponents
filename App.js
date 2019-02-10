import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Navbar from './app/components/common/Navbar';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Navbar title="Custom Components" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
