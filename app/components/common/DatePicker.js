import React, { Component } from 'react';
import {
  StyleSheet, TextInput, View, Image, TouchableOpacity, ImageSourcePropType, DatePickerAndroid,
} from 'react-native';

type P = {
  displayFormat: Function,
  onChangeDate: Function,
  containerStyle: StyleSheet.Style,
  style: StyleSheet.Style,
  icon: ImageSourcePropType,
  iconOnRight: boolean,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',

    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  icon: {
    margin: 5,
    maxHeight: 30,
    maxWidth: 30,
  },
  input: {
    flex: 1,
  },
});

class DatePicker extends Component<P> {
  state = {
    borderColor: this.props.borderColor || '#CCC', // eslint-disable-line
    value: new Date(),
  };

  _onFocus = () => {
    const { onChangeDate } = this.props;
    DatePickerAndroid.open({ mode: 'calendar' }).then((res) => {
      const value = new Date(res.year, res.month, res.day);
      this.setState({ value }, () => onChangeDate && onChangeDate(value));
    });
  };

  render() {
    const {
      containerStyle,
      style,
      icon,
      iconOnRight,
      ...other
    } = this.props;

    const { borderColor, value } = this.state;

    const computedStyles = StyleSheet.create({
      container: {
        flexDirection: iconOnRight ? 'row-reverse' : 'row',
        borderColor,
        ...containerStyle,
      },
    });

    return (
      <View style={[styles.container, computedStyles.container]}>
        {
          !!icon && (
            <Image
              style={styles.icon}
              source={icon}
              resizeMode="contain"
            />
          )
        }
        <TextInput
          style={styles.input}
          editable={false}
          {...other}
          value={value.toDateString()}
        />
        <TouchableOpacity style={StyleSheet.absoluteFill} onPress={this._onFocus} />
      </View>
    );
  }
}

export default DatePicker;
