import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

export default class Timer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>This is my Timer Component</Text>
        <Text>{JSON.stringify(this.props.routine)}</Text>
      </View>
    );
  }
}