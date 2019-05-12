import React from 'react';
import { StyleSheet, View } from 'react-native';

import Navbar from '../common/Navbar';
import TextField from '../common/TextField';
import Button from '../common/Button';
import FUAlert from '../common/popup/Alert';

import { Screens } from '../../constants/NavConstants';

import icon from '../../../assets/icon.png';

type P = {
  navigation: {
    push: Function,
  },
};

type S = {
  text: string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default class HomeScreen extends React.Component<P, S> {
  state = {
    text: '',
  };

  render() {
    const { navigation } = this.props;
    const { text: value } = this.state;
    const loremText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
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
            onPress={() => navigation.push(Screens.Page2)}
          />
          <View style={{ height: 20 }} />
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <Button
              title="Show Popup!"
              style={{ alignSelf: 'center' }}
              onPress={() => this.popUp.show('Title', loremText, icon)}
            />
            <Button
              title="Show Bottom Sheet!"
              style={{ alignSelf: 'center' }}
              onPress={() => this.sheet.show('Title', loremText, icon)}
            />
          </View>
          <FUAlert
            ref={(ref) => { this.popUp = ref; }}
            imageStyle={{ height: 20, width: 20 }}
            titleStyle={{ fontSize: 18, fontWeight: 'bold', marginVertical: 5 }}
            messageStyle={{ fontSize: 14, marginBottom: 5 }}
          />
          <FUAlert
            ref={(ref) => { this.sheet = ref; }}
            type="Sheet"
            imageStyle={{ height: 20, width: 20 }}
            titleStyle={{ fontSize: 18, fontWeight: 'bold', marginVertical: 5 }}
            messageStyle={{ fontSize: 14, marginBottom: 5 }}
          />
        </View>
      </View>
    );
  }
}
