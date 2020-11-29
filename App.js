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
  const [isForecastWeatherLoading, setIsForecastWeatherLoading] = useState(
    true
  );
  const [currentWeather, setCurrentWeather] = useState([]);
  const [forecastWeather, setForecastWeather] = useState({});

  const [city, setCity] = useState(null);
  const filtered = !city
    ? currentWeather
    : currentWeather.filter(item => {
        return city === item.id;
      });

  const [fontLoaded] = useFonts({
    ArialRegular: require('./assets/fonts/ArialRegular.ttf'),
  });

  const { helsinki, jyvaskyla, kuopio, tampere } = cities;

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
    fetchCurrentWeather(cities);
    fetchForecastWeather(helsinki);
    fetchForecastWeather(kuopio);
    fetchForecastWeather(tampere);
    fetchForecastWeather(jyvaskyla);
  }, []);

  const fetchCurrentWeather = async cities => {
    const id = Object.values(cities).join(',');
    const API_URL = `http://api.openweathermap.org/data/2.5/group?id=${id}&appid=${API_KEY}`;
    let response, data;

    try {
      response = await fetch(API_URL);
      data = await response.json();
    } catch (error) {
      console.log('error: ', error);
    } finally {
      setIsCurrentWeatherLoading(false);
    }

    setCurrentWeather(data.list);
  };

  const fetchForecastWeather = async cityId => {
    const API_URL = `http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${API_KEY}`;
    let response, data;

    try {
      response = await fetch(API_URL);
      data = await response.json();
    } catch (error) {
      console.log('error: ', error);
    } finally {
      setIsForecastWeatherLoading(false);
    }

    setForecastWeather(prevForecast => {
      prevForecast[cityId] = data.list;
      return { ...prevForecast };
    });
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
                filtered.map((item, id) => {
                  return (
                    <View key={id}>
                      <CurrentWeather item={item} />
                      {isForecastWeatherLoading ? (
                        <ActivityIndicator
                          size="large"
                          color={colors.statusBarColor}
                        />
                      ) : (
                        <View>
                          {forecastWeather && forecastWeather[item.id] ? (
                            <ScrollView
                              horizontal={true}
                              showsHorizontalScrollIndicator={false}
                              scrollEventThrottle={16}
                              decelerationRate="fast"
                              pagingEnabled
                            >
                              {forecastWeather[item.id].map((elem, id) => (
                                <ForecastWeather elem={elem} key={id} />
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
