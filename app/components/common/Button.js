import React from 'react';
import {
  StyleSheet, TouchableOpacity, Text, Image, ImageSourcePropType,
} from 'react-native';

type P = {
  title: String,
  icon: ImageSourcePropType,
  style: StyleSheet.Style,
  titleStyle: StyleSheet.Style,
  iconStyle: StyleSheet.Style,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',

    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,

    padding: 10,
  },
  title: {
    paddingHorizontal: 10,
  },
  icon: {
    maxHeight: 20,
    maxWidth: 20,
  },
});

const Button = ({
  title, icon, style, titleStyle, iconStyle, ...other
}: P) => (
  <TouchableOpacity activeOpacity={0.5} style={[styles.container, style]} {...other}>
    {
      !!icon && (
        <Image source={icon} style={[styles.icon, iconStyle]} />
      )
    }
    {
      !!title && (
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      )
    }
  </TouchableOpacity>
);

export default Button;
