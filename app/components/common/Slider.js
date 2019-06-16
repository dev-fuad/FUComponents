import React, { Component } from 'react';
import {
  StyleSheet, View, Animated, PanResponder,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
  },
  ground: {
    backgroundColor: 'lightgray',
    width: '100%',
    borderRadius: 2,
    height: 4,
  },
  tail: {
    backgroundColor: 'teal',
    borderRadius: 2,
    height: 4,
  },
  pointer: {
    position: 'absolute',
    left: -10,
    height: 25,
    width: 25,
    backgroundColor: 'cyan',
    borderRadius: 13,
    padding: 7,
  },
  pointerInnerCircle: {
    flex: 1,
    borderRadius: 9,
    backgroundColor: 'orange',
  },
});

type P = {
  min?: Number,
  max?: Number,
  value?: Number,
  clampRight?: Number,
  clampLeft?: Number,
  onValueChange?: Function,
};

class Slider extends Component<P> {
  constructor(props) {
    super(props);

    const { min, max, value } = this.props;
    const percentValue = ((value - min) * 100) / (max - min);

    this.state = {
      value,
      percentValue,
      positionValue: new Animated.Value(0),
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderStart: this.handlePanResponderStart,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderRelease,
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { value } = nextProps;
    if (prevState.value !== value) {
      const {
        min, max, clampLeft, clampRight,
      } = nextProps;

      if (value < Math.max(clampLeft || 0, min)
        || value > Math.min(clampRight || max, max)) {
        return null;
      }

      const percentValue = ((value - min) * 100) / (max - min);
      return {
        ...prevState,
        value,
        percentValue,
      };
    }
    return null;
  }

  componentDidUpdate() {
    const { percentValue } = this.state;
    if (this.width) {
      this.setWidthValue(this.width, percentValue);
    }
  }

  setWidthValue = (width, value) => {
    if (!width || Number.isNaN(width)) return;
    const { positionValue } = this.state;
    const position = (value * width) / 100;
    positionValue.setValue(position);
  }

  handlePanResponderStart = () => {
    const { percentValue } = this.state;
    this.currPosition = this.width * percentValue / 100;
  }

  handlePanResponderMove = (event, gesture) => {
    const {
      min, max, clampLeft, clampRight, onValueChange,
    } = this.props;
    const { positionValue } = this.state;

    // Get current position of slider
    const ratio = this.width / (max - min);

    // Calculate new position of slider
    const newPosition = this.currPosition + gesture.dx;

    const newValue = Math.round((newPosition / ratio) + min);

    if (newValue < Math.max(clampLeft || 0, min)
      || newValue > Math.min(clampRight || max, max)) {
      return;
    }

    // Get percent value for setting view state
    const percentValue = (newPosition * 100) / this.width;

    this.setState({ percentValue }, () => {
      positionValue.setValue(newPosition);
      if (onValueChange) onValueChange(newValue);
    });
  }

  render() {
    const { percentValue, positionValue } = this.state;
    return (
      <View style={styles.container}>
        <View
          style={styles.ground}
          onLayout={(e) => {
            this.width = e.nativeEvent.layout.width;
            this.setWidthValue(this.width, percentValue);
          }}
        >
          <View
            style={[styles.tail, { width: `${percentValue}%` }]}
          />
        </View>
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[styles.pointer, { transform: [{ translateX: positionValue }] }]}
        >
          <View style={styles.pointerInnerCircle} />
        </Animated.View>
      </View>
    );
  }
}

Slider.defaultProps = {
  min: 0,
  max: 100,
  value: 0,
  clampRight: null,
  clampLeft: null,
  onValueChange: null,
};

export default Slider;
