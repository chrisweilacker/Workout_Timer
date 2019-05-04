import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { GoogleSigninButton } from 'react-native-google-signin';

export default class Login extends Component {

  constructor(props) {
      super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Please Login</Text>
        <GoogleSigninButton
    style={{ width: 192, height: 48 , alignItems: 'center'}}
    size={GoogleSigninButton.Size.Wide}
    color={GoogleSigninButton.Color.Dark}
    onPress={this.props.logIn}
    disabled={this.props.isSigninInProgress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 30,
      textAlign: 'center',
      margin: 20,
    }
  });
  