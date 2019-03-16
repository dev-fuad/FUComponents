import React, { Component } from 'react';
import {
  StyleSheet, Animated, Modal, StyleProp, ViewStyle,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type Props = {
  children: React.ReactElement,
  style?: StyleProp<ViewStyle>,
  type?: 'Popup' | 'Sheet',
};

class Popup extends Component<Props> {
  static defaultProps = {
    style: null,
    type: 'Popup',
  };

  state = { isVisible: false };

  animatedValue = new Animated.Value(0);

  animateShow = (callback) => {
    Animated.timing(this.animatedValue, {
      toValue: 40,
      delay: 200,
      duration: 300,
    }).start(callback);
  }

  animateHide = (callback) => {
    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: 200,
    }).start(callback);
  }

  onShow = () => {};

  onHide = () => {};

  show = (callback = () => {}, { onHide = () => {} } = {}) => {
    if (typeof callback === 'function') {
      this.onShow = callback;
    }
    if (typeof onHide === 'function') {
      this.onHide = onHide;
    }
    this.setState({ isVisible: true });
  }

  hide = (callback = () => {}) => {
    if (typeof callback === 'function') {
      this.onHide = callback;
    }
    this.animateHide(() => this.setState({ isVisible: false }));
  }

  render() {
    const { isVisible } = this.state;
    const { children, style, type } = this.props;

    const interpolateColor = this.animatedValue.interpolate({
      inputRange: [0, 40],
      outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.4)'],
    });

    const sheetStyle = {
      backgroundColor: interpolateColor,
    };

    if (type === 'Sheet') {
      sheetStyle.justifyContent = 'flex-end';
    }

    return (
      <Modal
        visible={isVisible}
        animationType={type === 'Sheet' ? 'slide' : 'fade'}
        transparent
        onShow={() => this.animateShow(this.onShow)}
        onRequestClose={this.onHide}
        onDismiss={this.onHide}
      >
        <Animated.View style={[styles.container, sheetStyle, style]}>
          {children}
        </Animated.View>
      </Modal>
    );
  }
}

export default Popup;
