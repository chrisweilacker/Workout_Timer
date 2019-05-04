/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import List from './components/List.js';
import Login from './components/Login.js';
import Timer from './components/Timer.js';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';




const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSigninInProgress: false,
      loggedIn: false,
      name: '',
      email: '',
      picUrl: '',
      view: 'login',
      selectedRoutine: -1,
      routines: [{
        name: "Default",
        rounds: 3,
        sets: [
          {
            type: "Push-Ups",
            time: 60
          },
          {
            type: "Rest",
            time: 15
          },
          {
            type: "Planks",
            time: 60
          },
          {
            type: "Rest",
            time: 15
          },
          {
            type: "Squats",
            time: 60
          },
          {
            type: "Rest",
            time: 15
          },
          {
            type: "Pull-ups",
            time: 60
          },
          {
            type: "Rest",
            time: 15
          }
        ]
      }]
    };
    GoogleSignin.configure();
  }

  logIn = async () => {
    //do some stuff
    this.setState(() => ({
      isSigninInProgress: true
    }));
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState(() => ({
        name: userInfo.user.name,
        email: userInfo.user.email,
        picUrl: userInfo.user.photo,
        view: 'list'
      }));
      //fetch('http://localhost:3000',  {

      //})
    } catch (error) {
      console.error(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }

  }

  selectWorkout = (index) => {
    this.setState(()=>({
      selectedRoutine: index,
      view: 'timer'
    }))
  }



  render() {
    if (this.state.view === 'login') {
      return(<Login logIn={this.logIn.bind(this)} isSigninInProgress={this.state.isSigninInProgress}></Login>);
    } else if (this.state.view === 'list') {
      return(<List name={this.state.name} picUrl={this.state.picUrl} routines={this.state.routines} select={this.selectWorkout.bind(this)}></List>);
    } else if (this.state.view === 'timer') {
      return(<Timer routine={this.state.routines[this.state.selectedRoutine]}></Timer>);
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>Welcome to React Native!</Text>
          <Text style={styles.instructions}>To get started, edit App.js</Text>
          <Text style={styles.instructions}>{instructions}</Text>
        </View>
      );
    }

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
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
