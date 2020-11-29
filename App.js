import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import DropDownPicker from 'react-native-dropdown-picker';

import CustomStatusBar from './components/CustomStatusBar';
import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';
import ForecastWeather from './components/ForecastWeather';

import { API_KEY } from './config/api_key';
import cities from './utils/cities';
import colors from './utils/colors';
import { capitalizeFirstLetter } from './utils/helpers';

const { height, width } = Dimensions.get('window');

const App = () => {
  const [isCurrentWeatherLoading, setIsCurrentWeatherLoading] = useState(true);
  const [isForecastWeatherLoading, setIsForecastWeatherLoading] = useState(true);
  const [currentWeather, setCurrentWeather] = useState([]);
  const [forecastWeather, setForecastWeather] = useState([]);

  const [city, setCity] = useState(null);
  const filtered = !city
    ? currentWeather
    : currentWeather.filter(item => city === item.id);

  const [fontLoaded] = useFonts({
    ArialRegular: require('./assets/fonts/ArialRegular.ttf'),
  });

  const defaultPicker = {
    label: 'All cities',
    value: null,
  };

  const items = [
    defaultPicker,
    ...Object.entries(cities).map(item => ({
      label: capitalizeFirstLetter(item[0]),
      value: item[1],
    })),
  ];

  useEffect(() => {
    fetchWeather(cities);
  }, []);

  const fetchWeather = async cities => {
    // current weather
    const id = Object.values(cities).join(',');
    const currentWeaterURL = `http://api.openweathermap.org/data/2.5/group?id=${id}&appid=${API_KEY}`;
    let response, data;

    try {
      response = await fetch(currentWeaterURL);
      data = await response.json();
    } catch (error) {
      console.log('error: ', error);
    } finally {
      setIsCurrentWeatherLoading(false);
    }

    setCurrentWeather(data.list);

    // forecast weather
    const forecastWeatherRequests = Object.entries(cities)
      .map(city => city[1])
      .map(cityId =>
        fetch(
          `http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${API_KEY}`
        )
      );

    const forecastList = await Promise.all(forecastWeatherRequests)
      .then(responses => Promise.all(responses.map(response => response.json())))
      .then(forecasts =>
        forecasts.map(forecast => ({
          id: forecast.city.id,
          data: forecast.list,
        }))
      )
      .catch(error => console.log(error))
      .then(setIsForecastWeatherLoading(false));

    setForecastWeather(forecastList);
  };

  if (!fontLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.screen}>
      <CustomStatusBar
        backgroundColor={colors.statusBarColor}
        barStyle="light-content"
      />
      <Header title="Weather Forecast" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <SafeAreaView style={styles.container}>
          {isCurrentWeatherLoading ? (
            <ActivityIndicator size="large" color={colors.statusBarColor} />
          ) : (
            <View>
              <DropDownPicker
                items={items}
                defaultValue={city}
                containerStyle={styles.dropdownContainer}
                style={styles.dropdownContent}
                itemStyle={styles.dropdownItem}
                dropDownStyle={styles.dropdown}
                onChangeItem={item => setCity(item.value)}
                labelStyle={styles.label}
                activeLabelStyle={styles.active}
                placeholder={defaultPicker.label}
              />
              {filtered ? (
                filtered.map((item, index) => {
                  return (
                    <View key={index}>
                      <CurrentWeather item={item} />
                      {isForecastWeatherLoading ? (
                        <ActivityIndicator
                          size="large"
                          color={colors.statusBarColor}
                        />
                      ) : (
                        <View>
                          {forecastWeather.length ? (
                            <ScrollView
                              horizontal={true}
                              showsHorizontalScrollIndicator={false}
                              scrollEventThrottle={16}
                              decelerationRate="fast"
                              pagingEnabled
                            >
                              {forecastWeather
                                .filter(forecast => forecast.id === item.id)[0]
                                .data.map((filteredForecast, index) => (
                                  <ForecastWeather
                                    elem={filteredForecast}
                                    key={index}
                                  />
                                ))}
                            </ScrollView>
                          ) : (
                            <View style={styles.loading}>
                              <Text>No forecast data, sorry...</Text>
                            </View>
                          )}
                        </View>
                      )}
                    </View>
                  );
                })
              ) : (
                <View style={styles.loading}>
                  <Text>No data, sorry...</Text>
                </View>
              )}
            </View>
          )}
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.backgroundPrimaryColor,
  },
  container: {
    marginHorizontal: width < 500 ? 15 : 30,
  },
  dropdownContainer: {
    marginTop: width < 500 ? 20 : 40,
    height: width < 500 ? 50 : 80,
  },
  dropdownContent: {
    backgroundColor: colors.backgroundSecondaryColor,
  },
  dropdownItem: {
    justifyContent: 'flex-start',
  },
  dropdown: {
    backgroundColor: colors.backgroundSecondaryColor,
  },
  label: {
    fontSize: width < 500 ? 18 : 26,
  },
  active: {
    color: colors.fontSecondaryColor,
  },
  scroll: {
    paddingBottom: height < 700 ? 100 : 140,
  },
  loading: {
    marginTop: 30,
  },
});

export default App;
