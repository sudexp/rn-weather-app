import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

import Card from './Card';
import CustomText from './CustomText';

import colors from '../utils/colors';
import { kelvinTtoCelsius, formatDate } from '../utils/helpers';

const { width } = Dimensions.get('window');

const ForecastWeather = ({ elem }) => {
  console.log(elem);
  return (
    <Card style={styles.container}>
      <View style={styles.whiteBlock}>
        {elem.dt && (
          <CustomText style={styles.time}>
            {formatDate(elem.dt).time}
          </CustomText>
        )}
        {elem.weather && elem.weather[0] && elem.weather[0].icon && (
          <Image
            source={{
              uri: `http://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`,
            }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        <View style={styles.cloudTemp}>
          {elem.main && elem.main.temp && (
            <CustomText style={styles.temperature}>
              {kelvinTtoCelsius(elem.main.temp)} &deg;C
            </CustomText>
          )}
        </View>
      </View>
      <View style={styles.blueBlock}>
        <CustomText style={styles.weatherProps}>
          {elem.wind && elem.wind.speed ? elem.wind.speed : '--'} m/s
        </CustomText>
        <CustomText style={styles.weatherProps}>
          {elem.main && elem.main.humidity ? elem.main.humidity : '--'} %
        </CustomText>
        <CustomText style={styles.weatherProps}>
          {elem.rain && elem.rain['3h'] ? elem.rain['3h'] : '--'} mm
        </CustomText>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    width: (width - 60) / 4, // width - marginHorizontal: 15 (container style) - marginRight: 10 * 3
    backgroundColor: colors.backgroundSecondaryColor,
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  whiteBlock: {
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 2,
    borderColor: colors.borderColor,
  },
  blueBlock: {
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: colors.backgroundTertiaryColor,
  },
  time: {
    fontSize: 13,
    paddingBottom: 10,
    color: colors.fontSecondaryColor,
  },
  image: {
    height: 50,
    width: '100%',
  },
  temperature: {
    fontSize: 15,
    color: colors.fontPrimaryColor,
    paddingVertical: 10,
  },
  weatherProps: {
    paddingBottom: 10,
    fontSize: 10,
  },
});

export default ForecastWeather;
