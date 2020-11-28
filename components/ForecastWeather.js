import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

import Card from './Card';
import CustomText from './CustomText';

import colors from '../utils/colors';
import { kelvinTtoCelsius } from '../utils/helpers';

const ForecastWeather = ({ elem }) => {
  console.log('elem: ', elem);
  return (
    <Card>
      <View style={{ backgroundColor: 'red', height: 200, width: 100 }}>
        <Text style={{}}>Forecast Weather</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({});

export default ForecastWeather;
