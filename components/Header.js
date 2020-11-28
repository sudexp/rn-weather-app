import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import CustomText from './CustomText';
import Colors from '../utils/colors';

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
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundSecondaryColor,
    borderWidth: 2,
    borderTopWidth: 0,
    borderColor: Colors.borderColor,
  },
  title: {
    fontSize: 23,
  },
});

export default Header;
