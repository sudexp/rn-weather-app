import React from 'react';
import { View, StyleSheet } from 'react-native';

import colors from '../utils/colors';

const Card = props => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    backgroundColor: colors.backgroundSecondaryColor,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: colors.borderColor,
  },
});

export default Card;
