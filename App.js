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
import RoutineDeveloper from './components/RoutineDeveloper.js';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';


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
            type: "Click to Start",
            time: 5
          },
          {
            type: "Push-Ups",
            time: 8
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

  closeToList() {
    this.setState(()=>({
      view: 'list'
    }));
  }

  addWorkout() {
    this.setState((prevState)=>{
      let newRoutines = prevState.routines;
      newRoutines.push(
        {
          name: 'Workout-' + Date(),
          rounds: 1,
          sets: [
            {
              type: "Click to Start",
              time: 5
            },
            {
              type: "<Please Set Type of Work or Rest Interval>",
              time: 30
            }
          ]
        }
      )
      return {
      view: 'addroutine',
      routines: newRoutines
    }});
  }

  

  deleteWorkout(index) {
    fetch(`http://10.0.2.2:5000/workout/${this.state.routines[index]._id}`, {
      method: 'DELETE',
      mode: 'cors'
    }).then(response => response.json())
    .then(data =>{
      if (data === 'Deleted') {
        this.setState((prevState)=>{
          newRoutines = prevState.routines.slice();
          newRoutines.splice(index, 1);
          return ({
            routines: newRoutines
          })
        });
      }
    })
  }

  logIn = async () => {
    //do some stuff
    this.setState(() => ({
      isSigninInProgress: true
    }));
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      
      fetch('http://10.0.2.2:5000/workouts?email=' + userInfo.user.email)
      .then((resp) => resp.json())
      .then((data) => {
        let workouts = JSON.parse(data); 
        if (Array.isArray(workouts)) {
          this.setState((prevState) => {
            newRoutines = prevState.routines.concat(workouts);
          return {
            name: userInfo.user.name,
            email: userInfo.user.email,
            picUrl: userInfo.user.photo,
            view: 'list',
            routines: newRoutines
            };
          });
        } else {
          this.setState(() => ({
            name: userInfo.user.name,
            email: userInfo.user.email,
            picUrl: userInfo.user.photo,
            view: 'list'
          }));
        }      
      }).catch((error) => {
        console.error(error);
        this.setState(() => ({
          name: userInfo.user.name,
          email: userInfo.user.email,
          picUrl: userInfo.user.photo,
          view: 'list'
        }));
      });
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
      return(<List name={this.state.name} picUrl={this.state.picUrl} routines={this.state.routines} 
                  select={this.selectWorkout.bind(this)} add={this.addWorkout.bind(this)}
                  delete={this.deleteWorkout.bind(this)}></List>);
    } else if (this.state.view === 'timer') {
      return(<Timer routine={this.state.routines[this.state.selectedRoutine]} closeToList={this.closeToList.bind(this)}></Timer>);
    } else if (this.state.view === 'addroutine') {
      return(<RoutineDeveloper name={this.state.name} picUrl={this.state.picUrl} routine={this.state.routines[this.state.routines.length-1]} edit={false} closeToList={this.closeToList.bind(this)}></RoutineDeveloper>);
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
