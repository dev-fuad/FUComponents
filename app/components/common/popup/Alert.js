import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Image,
  ImageSourcePropType, StyleProp, ViewStyle, TextStyle, ImageStyle,
} from 'react-native';

import Button from '../Button';
import Popup from './Popup';

const styles = StyleSheet.create({
  popup: {
    backgroundColor: '#FFF',
    padding: 20,
    alignItems: 'center',
    maxWidth: '90%',

    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#0008',
    borderRadius: 10,
  },
  sheet: {
    backgroundColor: '#FFF',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    minHeight: '30%',

    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#0008',
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

type Action = {
  title: string,
  onPress?: Function,
}

type Props = {
  type?: 'Popup' | 'Sheet',
  popupStyle?: StyleProp<ViewStyle>,
  titleStyle?: StyleProp<TextStyle>,
  messageStyle?: StyleProp<TextStyle>,
  imageStyle?: StyleProp<ImageStyle>,
  contentContainerStyle?: StyleProp<ViewStyle>,
  buttonContainerStyle?: StyleProp<ViewStyle>,
  buttonStyle?: StyleProp<ViewStyle>,
};

class FUAlert extends Component<Props> {
  static defaultProps = {
    type: 'Popup',
    popupStyle: null,
    titleStyle: null,
    messageStyle: null,
    imageStyle: null,
    contentContainerStyle: null,
    buttonContainerStyle: null,
    buttonStyle: null,
  };

  state = { };

  show = (
    title?: string,
    message?: string,
    image?: ImageSourcePropType,
    actions?: [Action] | Function,
  ) => {
    this.setState({
      title, message, image, actions,
    });
    this.popup.show();
  };

  hide = callback => () => {
    this.popup.hide(callback);
  };

  refPopup = (ref) => { this.popup = ref; }

  renderActions = (actions) => {
    const {
      buttonContainerStyle, buttonStyle,
    } = this.props;
    if (Array.isArray(actions || {})) {
      return (
        <View style={[styles.buttonContainerStyle, buttonContainerStyle]}>
          {actions.map(action => (
            <Button style={buttonStyle} title={action.title} onPress={this.hide(action.onPress)} />
          ))}
        </View>
      );
    }
    return (
      <Button style={buttonStyle} title="OK" onPress={this.hide(actions)} />
    );
  };

  render() {
    const {
      title, message, image, actions,
    } = this.state;
    const {
      type, popupStyle, contentContainerStyle, titleStyle, messageStyle, imageStyle,
    } = this.props;

    const contentCStyle = { alignItems: (type === 'Sheet' ? 'flex-start' : 'center') };

    return (
      <Popup type={type} ref={this.refPopup}>
        <View style={[(type === 'Sheet' ? styles.sheet : styles.popup), popupStyle]}>
          <View style={[contentCStyle, contentContainerStyle]}>
            {!!image && <Image style={imageStyle} source={image} />}
            {!!title && <Text style={titleStyle}>{title}</Text>}
            {!!message && <Text style={messageStyle}>{message}</Text>}
          </View>
          {this.renderActions(actions)}
        </View>
      </Popup>
    );
  }
}

export default FUAlert;
