import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ScrollView, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import DropDownPicker from 'react-native-dropdown-picker';

import Loading from './components/Loading';
import CustomStatusBar from './components/CustomStatusBar';
import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';

import { API_KEY } from './config/api_key';
import cities from './utils/cities';
import colors from './utils/colors';

const App = () => {
  const [isCurrentWeatherLoading, setIsCurrentWeatherLoading] = useState(true);
  const [isForecastWeatherLoading, setIsForecastWeatherLoading] = useState(
    true
  );
  const [currentWeather, setCurrentWeather] = useState([]);
  // console.log('currentWeather: ', currentWeather);
  const [forecastWeather, setForecastWeather] = useState([]);
  // console.log('forecastWeather: ', forecastWeather);
  const [fontLoaded] = useFonts({
    ArialRegular: require('./assets/fonts/ArialRegular.ttf'),
  });

  const [value, setValue] = useState('kuopio');

  const { helsinki, jyvaskyla, kuopio, tampere } = cities;

  useEffect(() => {
    fetchCurrentWeather(cities);
    fetchForecastWeather(helsinki);
    // fetchForecastWeather(jyvaskyla);
    // fetchForecastWeather(kuopio);
    // fetchForecastWeather(tampere);
  }, []);

  const fetchCurrentWeather = async cities => {
    const id = Object.values(cities).join(',');
    const API_URL = `http://api.openweathermap.org/data/2.5/group?id=${id}&appid=${API_KEY}`;
    let response, data;

    try {
      response = await fetch(API_URL);
      data = await response.json();
    } catch (error) {
      console.log('errorTTT: ', error);
    } finally {
      setIsCurrentWeatherLoading(false);
    }

    // console.log(data.list);
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

    // console.log(data.list);
    setForecastWeather(prevForecast => [...prevForecast, data.list]);
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
      <Header title="Säätutka" />
      <ScrollView>
        <SafeAreaView style={styles.container}>
          {isCurrentWeatherLoading ? (
            <Loading />
          ) : (
            <View>
              <DropDownPicker
                items={[
                  {
                    label: 'Tampere',
                    value: 'tampere',
                    hidden: true,
                  },
                  {
                    label: 'Kuopio',
                    value: 'kuopio',
                  },
                  {
                    label: 'Helsinki',
                    value: 'helsinki',
                  },
                ]}
                defaultValue={value}
                containerStyle={styles.dropdownContainer}
                style={styles.dropdown}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                dropDownStyle={styles.dropdown}
                onChangeItem={item => setValue(item.value)}
              />
              {currentWeather ? (
                currentWeather.map((item, id) => {
                  return (
                    <View>
                      <CurrentWeather item={item} key={id} />
                      {isForecastWeatherLoading ? (
                        <Loading />
                      ) : (
                        <View>
                          {forecastWeather ? (
                            forecastWeather.map((item, id) =>
                              console.log('item: ', item)
                            )
                          ) : (
                            <Text>No data, sorry...</Text>
                          )}
                        </View>
                      )}
                    </View>
                  );
                })
              ) : (
                <Text>No data, sorry...</Text>
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
    marginHorizontal: 15,
  },
  dropdownContainer: {
    marginTop: 20,
    height: 50,
  },
  dropdownContent: {
    backgroundColor: colors.backgroundSecondaryColor,
  },
});

export default App;
