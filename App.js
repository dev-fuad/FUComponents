import React from 'react';
import { StyleSheet, View } from 'react-native';

import Navbar from './app/components/common/Navbar';
import TextField from './app/components/common/TextField';
import Button from './app/components/common/Button';

import icon from './assets/icon.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default class App extends React.Component {
  state = {
    text: '',
  };

  render() {
    const { text: value } = this.state;
    return (
      <View style={styles.container}>
        <Navbar title="Custom Components" />
        <View style={{ flex: 1, alignItems: 'stretch', padding: 20 }}>
          <TextField
            icon={icon}
            placeholder="Enter Text Here..."
            value={value}
            onChangeText={text => this.setState({ text })}
            validator={() => value.length > 4}
          />
          <View style={{ height: 20 }} />
          <Button
            title="Submit!"
            icon={icon}
            style={{ alignSelf: 'center' }}
          />
        </View>
      </View>
    );
  }
}
