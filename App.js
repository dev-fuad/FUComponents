import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import Navbar from './app/components/common/Navbar';
import TextField from './app/components/common/TextField';
import Button from './app/components/common/Button';
import DatePicker from './app/components/common/DatePicker';

import icon from './assets/icon.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default class App extends React.Component {
  state = {
    text: '',
    date: '',
  };

  render() {
    const { text: value, date } = this.state;
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
          <View style={styles.buttonContainer}>
            <Button
              title="Submit!"
              icon={icon}
              onPress={() => Alert.alert('Button 1 Pressed!')}
            />
            <Button
              icon={icon}
              onPress={() => Alert.alert('Button 2 Pressed!')}
            />
            <Button
              title="Submit!"
              onPress={() => Alert.alert('Button 3 Pressed!')}
            />
          </View>
          <View style={{ height: 20 }} />
          <DatePicker
            icon={icon}
            placeholder="Enter Date Here..."
            value={date}
            onChangeText={text => this.setState({ date: text })}
            iconOnRight
          />
        </View>
      </View>
    );
  }
}
