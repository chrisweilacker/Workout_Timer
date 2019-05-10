import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, TextInput, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AutoComplete from 'react-native-autocomplete-select'
import NumericInput from 'react-native-numeric-input'

const suggestions = [
  {text: 'Rest'},
  {text: 'Work'},
  {text: 'Push-Ups'},
  {text: 'Pull-Ups'},
  {text: 'Planks'},
  {text: 'Sit-Ups'},
  {text: 'Squats'},
  {text: 'Bicep Curls'},
  {text: 'Eliptical'},
  {text: 'Walk'}
]

export default class RoutineDeveloper extends Component {

  constructor(props) {
    super(props)
    this.state = {
      editadd: this.props.editadd,
      routine: this.props.routine
    }
  }

  addSet() {
    this.setState((prevState)=> {
      let newRoutine = prevState.routine;
      newRoutine.sets.push({
        type: '<Please Set Type of Work or Rest>',
        seconds: 30
      })
      return ({
        routine: newRoutine
      })
    })
  }

  render() {
    return (
    <View style={styles.container}>
        
        <Image style={styles.image} source={{ uri: this.props.picUrl }}/>
        <Text style={styles.header}>Name this Workout:</Text>
        <TextInput value={this.state.routine.name} onChangeText={(text)=>{this.state.routine.name = text}}></TextInput>
        <Text style={{fontSize : 20, flexDirection: "row"}}>Number of Sets:</Text>
        <NumericInput style={{flexDirection: "row"}} minValue={1} maxValue={10} value={this.state.routine.rounds} onChange={value => {this.state.routine.rounds = value}} />

        {this.state.routine.sets.map((item, index, collection) =>{
          if (index !==0) {
          return (
            
                    <View style={styles.workoutView} >
                      <View style={{alignItems: "center"}} >
                        <Text style={styles.workout}>Set Type:</Text>
                        <AutoComplete style={styles.workout}
                          onChangeText={(text)=>{this.state.routine.set[index].type = text}}
                          suggestions={suggestions}
                          suggestionObjectTextProperty='text'
                          value={item.type}
                        />
                      </View>
                      <View style={{alignItems: "center"}} >
                        <Text style={styles.workout}>Number Of Seconds:</Text>
                        <NumericInput style={styles.workout} minValue={5} maxValue={180} step={5} value={this.state.routine.sets[index].seconds} onChange={value => {this.state.routine.sets[index].seconds = value}} />
                      </View>
                    </View>);
          }
        })}
        <Icon style={styles.addbutton} name="plus-circle" size={70} color="#0000FF"></Icon>
    </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "flex-start"
    },
    header: {
      fontSize: 25,
      borderBottomWidth: 5,
      borderColor: "rgb(0,0,255)"
    },
    image: {
      marginTop: 15,
      width: 150,
      height: 150,
      borderColor: "rgba(0,0,0,0.2)",
      borderWidth: 3,
      borderRadius: 150
    },
    workoutView: {
      marginTop: 5,
      width: 310,
      backgroundColor: 'rgba(135, 206, 235, 0.2)'
    },
    editView: {
      position: 'absolute',
      right: 0,
      top: 0,
      flexDirection: 'row'
    },
    workout: {
      fontSize: 20,
      flexDirection: 'row'
    },
    addbutton: {
      position: 'absolute',
      bottom: 50,
      right: 50
    }
  })