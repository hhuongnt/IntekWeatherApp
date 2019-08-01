import * as React from 'react';
import { Text, View, StyleSheet, Picker, TextInput } from 'react-native';

const citylist = require('../documents/citylist.json');

export default class PickerList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pickerSelection: 1559969,
    };
  }

  render() {
    return (
      <View>
        <TextInput
          style={styles.searchBtn}
          onChangeText={text => this.setState({ text })}
          value={this.state.pickerSelection}
          render={props => (
            <Picker
              selectedValue={this.state.pickerSelection}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({ pickerSelection: itemValue });
              }}
            />
          )}
        />

        <Picker
          style={styles.picker}
          selectedValue={this.state.pickerSelection}
          onValueChange={(value, index) =>
            this.setState({ pickerSelection: value })
          }>
          {citylist.map(item => {
            return (
              <Picker.Item label={item.name} value={item.id} key={item.id} />
            );
          })}
        </Picker>
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
});
