import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Navbar from './app/components/common/Navbar';
import TextField from './app/components/common/TextField';
import Button from './app/components/common/Button';
import FUAlert from './app/components/common/popup/Alert';
import Slider from './app/components/common/Slider';

import icon from './assets/icon.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const VerticalSpacer = () => <View style={{ height: 20 }} />;

export default class App extends React.Component {
  state = {
    text: '',
    value: 75,
  };

  render() {
    const { text: value, value: page } = this.state;
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
          <VerticalSpacer />
          <Button
            title="Submit!"
            icon={icon}
            style={{ alignSelf: 'center' }}
          />
          <VerticalSpacer />
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
          <VerticalSpacer />
          <Slider
            min={50}
            max={100}
            value={page}
          />
          <VerticalSpacer />
          <Button
            title=">>>  +  <<<"
            style={{ alignSelf: 'center' }}
            onPress={() => this.setState({ value: page + 10 })}
          />
          <VerticalSpacer />
          <Button
            title=">>>  -  <<<"
            style={{ alignSelf: 'center' }}
            onPress={() => this.setState({ value: page - 10 })}
          />
          <VerticalSpacer />
          <Text>Page #{page}</Text>
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
