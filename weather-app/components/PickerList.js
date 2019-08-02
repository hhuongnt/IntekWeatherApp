import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Picker,
  ImageBackground,
  TextInput,
} from 'react-native';

import SearchableDropdown from 'react-native-searchable-dropdown';

const citylist = require('../documents/citylist.json');

export default class PickerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerSelected: this.changeState(1559969),
    };
  }

  changeState(cityId) {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?id=' +
        cityId +
        '&units=metric' +
        '&APPID=' +
        '7baea0e9394bdecca1f208ba3be1cf5c'
    )
      .then(response => {
        return response.json();
      })
      .then(responseData => {
        return responseData;
      })
      .then(data => {
        this.setState({
          pickerSelected: cityId,
          city: data.name,
          icon: data.weather[0].icon,
          temp: data.main.temp,
          press: data.main.pressure,
          humid: data.main.humidity,
        });
      });
  }
  // Global.this.state.pickerSelected

  render() {
    var iconUrl = 'http://openweathermap.org/img/w/' + this.state.icon + '.png';

    return (
      <View>
        <TextInput
          style={styles.searchBtn}
          onChangeText={text => console.log(text)}
          value={this.state.pickerSelected}
          render={props => (
            <Picker
              selectedValue={this.state.pickerSelected}
              onValueChange={(itemValue, itemIndex) =>
                this.changeState(itemValue)
              }
            />
          )}
        />

        <Picker
          style={styles.picker}
          selectedValue={this.state.pickerSelected}
          onValueChange={(value, index) => this.changeState(value)}>
          {citylist.map(item => {
            return (
              <Picker.Item label={item.name} value={item.id} key={item.id} />
            );
          })}
        </Picker>
        <View style={styles.imageBlock}>
          <ImageBackground style={styles.logo} source={{ uri: iconUrl }}>
            <View style={{ marginLeft: 10, marginTop: 10 }}>
              <Text style={styles.paragraph}>City: {this.state.city}</Text>
            </View>
            <View style={styles.tempBlock}>
              <Text style={styles.paragraph}>
                Temperature: {this.state.temp} C
              </Text>
              <Text style={styles.paragraph}>
                Pressure: {this.state.press} hPa
              </Text>
              <Text style={styles.paragraph}>
                Humidity: {this.state.humid} %
              </Text>
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchBtn: {
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#0097D6',
  },

  picker: {
    height: 50,
    width: 250,
    marginBottom: 30,
    marginTop: -10,
  },

  logo: {
    backgroundColor: '#0D3C6A',
    height: 220,
    width: 270,
  },

  paragraph: {
    color: 'white',
    fontSize: 18,
  },

  imageBlock: {
    marginTop: 120,
  },

  tempBlock: {
    marginLeft: 10,
    marginTop: 100,
    marginBottom: 10,
  },
});
