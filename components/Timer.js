import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Tts from 'react-native-tts';

export default class Timer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      round: 0,
      set: 0,
      paused: true,
      completed: false,
      timerId: null
    }
  }

  playpaused() {
    console.log('something');
    let timerId = null;
    if (this.state.paused) {
      timerId = setInterval(this.timer.bind(this), 1000);
    } else {
      clearInterval(this.state.timerId);
    }
    this.setState((prevState)=>({
      paused: !(prevState.paused),
      currentTime: prevState.currentTime + 1,
      timerId: timerId
    }));
  }

  timer() {
    if (this.state.paused === false) {
      let currentTime = this.state.currentTime;
      let round = this.state.round;
      let set = this.state.set;
      let completed = this.state.completed;      
      let timeLeft = this.props.routine.sets[this.state.set].time - currentTime - 1;

      if (currentTime===1 && this.state.set != 0) {
        Tts.speak(this.props.routine.sets[this.state.set].type);
      } else if (timeLeft<5 && timeLeft>0) {
        Tts.speak(timeLeft.toString());
      }

      if (currentTime >= this.props.routine.sets[this.state.set].time) {
        currentTime = 0;
        set++;
        if (this.state.set === this.props.routine.sets.length - 1) {
          set = 0;
          round++;
          if (this.state.round === this.props.routine.rounds) {
            completed = true;
          }
        }
      } else {
        currentTime++;
      }

      


      this.setState(()=> ({
        currentTime: currentTime,
        round: round,
        set: set,
        completed: completed
      }));
    }
  }

  close() {
    if (!this.paused) {
      this.playpaused();
    }
    this.props.closeToList();
  }

  render() {
    return (
      <View style={(this.props.routine.sets[this.state.set].type.includes('Start') || 
      this.props.routine.sets[this.state.set].type.includes('Rest') )? styles.containerRest : styles.containerWork}>
      <Icon name="times" size={50} style={{position: 'absolute', top: 0, right: 0}} onPress={this.close.bind(this)} color="#fff"/>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>"{this.props.routine.name}"</Text>
          <Text style={styles.header}>Workout</Text>
          <Text style={styles.header2}>Round {this.state.round + 1}  Interval {this.state.set + 1}</Text>
          <Text style={styles.header}>{this.props.routine.sets[this.state.set].type}</Text>
        </View>
        <View style={styles.center}>
          <Text style={styles.timer}>{(this.state.completed) ? 'Workout Finished' : Math.abs(this.props.routine.sets[this.state.set].time - this.state.currentTime)}</Text>
          {(this.state.paused) ? <Icon name="play-circle" size={80} color="#fff" onPress={this.playpaused.bind(this)}/> : <Icon name="pause-circle" size={80} color="#fff" onPress={this.playpaused.bind(this)}/>}
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  containerWork: {
    flex: 1,
    backgroundColor: "rgb(0,0,255)",
    alignItems: "center",
    
  }, containerRest: {
    flex: 1,
    backgroundColor: "rgb(60,179,113)",
    alignItems: "center",
    
  },
  headerContainer: {
    justifyContent: "flex-start",
    alignItems: "center"
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff'
  },
  header2: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff'
  },
  center: {
    justifyContent: "center",
    flex: 1,
    alignItems: 'center'
  },
  timer: {
    fontSize: 120,
    color: '#fff'
  }
})