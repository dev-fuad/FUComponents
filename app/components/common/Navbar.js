import React from 'react';
import {
  StyleSheet, View, Text, Platform,
} from 'react-native';

import { statusBarHeight } from '../../utilities/Dimensions';

const NAVBAR_HEIGHT = Platform.select({
  ios: 44,
  android: 56,
});

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: statusBarHeight,
    height: NAVBAR_HEIGHT + statusBarHeight,

    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#0008',
  },
  titleView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
  },
});

type P = {
  title?: string,
  leftView?: React.ReactElement,
  rightView?: React.ReactElement,

  style?: StyleSheet.Style,
  textStyles?: StyleSheet.Style,
};

const Navbar = ({
  title, rightView, leftView, style, textStyles,
}: P) => (
  <View style={[styles.container, style]}>
    {!!leftView && leftView()}
    <View style={styles.titleView}>
      <Text style={[styles.title, textStyles]}>{title}</Text>
    </View>
    {!!rightView && rightView()}
  </View>
);

Navbar.defaultProps = {
  title: '',
  leftView: null,
  rightView: null,

  style: {},
  textStyles: {},
};

export default Navbar;
