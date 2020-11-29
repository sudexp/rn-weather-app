import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import CustomText from './CustomText';
import Colors from '../utils/colors';

const { width } = Dimensions.get('window');

const Header = props => {
  return (
    <View style={styles.header}>
      <CustomText style={styles.title}>{props.title}</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: width < 500 ? 70 : 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundSecondaryColor,
    borderWidth: 2,
    borderTopWidth: 0,
    borderColor: Colors.borderColor,
  },
  title: {
    fontSize: width < 500 ? 23 : 35,
  },
});

export default Header;
