import React from 'react';
import { Text, StyleSheet } from 'react-native';

const CustomText = props => (
  <Text style={{ ...styles.text, ...props.style }}>{props.children}</Text>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: 'ArialRegular',
  },
});

export default CustomText;
