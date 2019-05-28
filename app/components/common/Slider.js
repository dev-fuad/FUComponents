import React, { Component } from 'react';
import { StyleSheet, View, Animated } from 'react-native';

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
    height: 20,
    width: 20,
    backgroundColor: 'orange',
    borderColor: 'cyan',
    borderWidth: 5,
    borderRadius: 10,
  },
});

type P = {
  min: number,
  max: number,
  value: number,
};

class Slider extends Component<P> {
  constructor(props) {
    super(props);

    const { min, max, value } = this.props;
    const percentValue = ((value - min) * 100) / (max - min);

    this.state = {
      percentValue,
      positionValue: new Animated.Value(0),
    };
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props;
    if (prevProps.value !== value) {
      const { min, max } = this.props;
      const percentValue = ((value - min) * 100) / (max - min);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ percentValue }, () => {
        if (this.width) {
          this.setWidthValue(this.width, percentValue);
        }
      });
    }
  }

  setWidthValue = (width, value) => {
    if (!width || Number.isNaN(width)) return;
    const { positionValue } = this.state;
    const position = (value * width) / 100;
    positionValue.setValue(position);
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
        <Animated.View style={[styles.pointer, { transform: [{ translateX: positionValue }] }]} />
      </View>
    );
  }
}

export default Slider;
