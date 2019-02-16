import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Navbar from './app/components/common/Navbar';
import TextField from './app/components/common/TextField';

import icon from './assets/icon.png';

export default class App extends React.Component {
  state = {
    text: '',
  };
  
  render() {
    const { text } = this.state;
    return (
      <View style={styles.container}>
        <Navbar title="Custom Components" />
        <View style={{ flex: 1, alignItems: 'stretch', padding: 20 }}>
          <TextField
            icon={icon}
            placeholder="Enter Text Here..."
            value={text}
            onChangeText={text => this.setState({ text })}
            validator={() => text.length > 4}
          />
        </View>
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
