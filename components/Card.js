import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import colors from '../utils/colors';

const { width } = Dimensions.get('window');

const Card = props => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: width < 500 ? 20 : 30,
    backgroundColor: colors.backgroundSecondaryColor,
    paddingVertical: width < 500 ? 10 : 15,
    paddingHorizontal: width < 500 ? 15 : 22,
    borderRadius: width < 500 ? 7 : 10,
    borderWidth: 2,
    borderColor: colors.borderColor,
  },
});

export default Card;
