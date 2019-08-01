import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';

import PickerList from './PickerList';

export default class WeatherInform extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isloading: true,
      id: 1580578,
    };
  }

  componentDidMount() {
    return fetch(
      'https://api.openweathermap.org/data/2.5/weather?id=' +
        String(this.state.id) +
        '&appid=7baea0e9394bdecca1f208ba3be1cf5c',
      {
        method: 'POST',
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            city: responseJson.name,
            temp: responseJson.main.temp,
            press: responseJson.main.pressure,
            humid: responseJson.main.humidity,
            icon: responseJson.weather[0].icon,
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    var urlicon = "http://openweathermap.org/img/w/" + this.state.icon + ".png";
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.logo} source={{ uri: urlicon }}>
          <Text style={styles.name}>City: {this.state.city}</Text>
          <View style={styles.temp}>
            <Text style={styles.paragraph}>
              Temperature: {this.state.temp} C
            </Text>
            <Text style={styles.paragraph}>Pressure: {this.state.press} P</Text>
            <Text style={styles.paragraph}>Humidity: {this.state.humid}%</Text>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
  },

  name: {
    color: 'white',
    fontSize: 15,
    marginTop: 5,
    marginHorizontal: 5,
  },

  paragraph: {
    color: 'white',
    fontSize: 15,
  },

  logo: {
    backgroundColor: '#0D3C6A',
    height: 220,
    width: 270,
  },

  temp: {
    marginHorizontal: 5,
    marginTop: 125,
    marginBottom: 5,
  },
});
