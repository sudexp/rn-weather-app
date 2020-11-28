import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import Card from './Card';
import CustomText from './CustomText';

import colors from '../utils/colors';
import {
  kelvinTtoCelsius,
  formatDate,
  capitalizeFirstLetter,
} from '../utils/helpers';

const CurrentWeather = ({ item }) => {
  return (
    <Card style={styles.currentWeather}>
      <View style={styles.currentWeatherBlock}>
        <View>
          {item.name && (
            <CustomText style={styles.city}>{item.name}</CustomText>
          )}
          {item.weather && item.weather[0] && item.weather[0].description && (
            <CustomText style={styles.weatherProps}>
              {capitalizeFirstLetter(item.weather[0].description)}
            </CustomText>
          )}
        </View>
        <View style={styles.cloudTemp}>
          {item.weather && item.weather[0] && item.weather[0].icon && (
            <Image
              source={{
                uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
              }}
              style={styles.image}
              resizeMode="cover"
            />
          )}
          {item.main && item.main.temp && (
            <CustomText style={styles.temperature}>
              {kelvinTtoCelsius(item.main.temp)} &deg;C
            </CustomText>
          )}
        </View>
      </View>
      <View style={styles.currentWeatherBlock}>
        <View style={styles.datePropsBlock}>
          {item.dt && (
            <CustomText style={styles.date}>
              {formatDate(item.dt).date}
            </CustomText>
          )}
          {item.dt && (
            <CustomText style={styles.time}>
              {formatDate(item.dt).time}
            </CustomText>
          )}
        </View>
        <View style={styles.weatherPropsBlock}>
          <CustomText style={styles.weatherProps}>
            Wind: {item.wind && item.wind.speed ? item.wind.speed : '--'} m/s
          </CustomText>
          <CustomText style={styles.weatherProps}>
            Humidity:{' '}
            {item.main && item.main.humidity ? item.main.humidity : '--'} mm
          </CustomText>
          <CustomText style={styles.weatherProps}>
            Precipitation (3h):{' '}
            {item.rain && item.rain['3h'] ? item.rain['3h'] : '--'} mm
          </CustomText>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  currentWeather: {
    width: '100%',
    backgroundColor: colors.backgroundSecondaryColor,
  },
  datePropsBlock: {
    justifyContent: 'flex-end',
  },
  weatherPropsBlock: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  currentWeatherBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  city: {
    fontSize: 19,
    paddingBottom: 5,
    color: colors.fontPrimaryColor,
  },
  cloudTemp: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  temperature: {
    fontSize: 26,
    marginLeft: 5,
    color: colors.fontPrimaryColor,
  },
  weatherProps: {
    fontSize: 13,
    paddingTop: 5,
    color: colors.fontSecondaryColor,
  },
  date: {
    fontSize: 15,
    color: colors.fontPrimaryColor,
  },
  time: {
    fontSize: 15,
    paddingTop: 5,
    color: colors.fontSecondaryColor,
  },
  image: {
    width: 75,
    height: '100%',
  },
});

export default CurrentWeather;
