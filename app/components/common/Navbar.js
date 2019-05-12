import React from 'react';
import {
  StyleSheet, View, Text, Platform, TouchableOpacity, Image,
} from 'react-native';
import { withNavigation } from 'react-navigation';

import { statusBarHeight } from '../../utilities/Dimensions';

import backIcon from '../../../assets/back-icon.png';

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
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: statusBarHeight,
    marginHorizontal: NAVBAR_HEIGHT,
  },
  title: {
    fontSize: 20,
  },
  backButton: {
    width: NAVBAR_HEIGHT,
    height: NAVBAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 20,
    height: 20,
  },
});

type P = {
  title?: string,
  leftView?: React.ReactElement,
  rightView?: React.ReactElement,

  style?: StyleSheet.Style,
  textStyles?: StyleSheet.Style,

  navigation: {},
  removeBackButton?: Boolean,
};

const canGoBack = (navigation) => {
  const parent = navigation.dangerouslyGetParent();
  return parent && parent.state && parent.state.routes && parent.state.routes.length > 1;
};

const Navbar = ({
  title,
  rightView,
  leftView,
  style,
  textStyles,
  navigation,
  removeBackButton,
}: P) => (
  <View style={[styles.container, style]}>
    {!removeBackButton && canGoBack(navigation) && (
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image style={styles.backIcon} source={backIcon} />
      </TouchableOpacity>
    )}
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

  removeBackButton: false,
};

export default withNavigation(Navbar);
