import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/FontAwesome';
import AutoComplete from 'react-native-autocomplete-select';
import NumericInput from 'react-native-numeric-input';



export default class RoutineDeveloper extends Component {

  constructor(props) {
    super(props)
    this.state = {
      edit: this.props.editadd,
      routine: this.props.routine
    }
    
  }

  

  addSet() {
    this.setState((prevState)=> {
      let newRoutine = prevState.routine;
      newRoutine.sets.push({
        type: '<Please Set Type of Work or Rest Interval>',
        seconds: 30
      })
      return ({
        routine: newRoutine
      })
    })
  }

  removeSet(index) {
    this.setState((prevState)=> {
      let newRoutine = prevState.routine;
      newRoutine.sets.splice(index, 1);
      return ({
        routine: newRoutine
      })
    })
  }

  submitRoutine() {
    if (this.state.edit) {
      //Call to put /workouts/{this.state.routine._id}.
      
    } else {
      //Call to post /workout with this.state.routine
    }
  }

  render() {
    let suggestions = [
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
    ];

    return (
    <KeyboardAwareScrollView
      style={{backgroundColor: '#fff'}}
      resetScrollToCoords={{ x: 0, y: 0 }} enableOnAndroid={true}
      contentContainerStyle={styles.container}
      scrollEnabled={true}
      extraHeight={80}
    >
        <Text style={styles.header}>Name this Workout:</Text>
        <TextInput style={{fontSize: 16}} value={this.state.routine.name} 
        onChangeText={value => {this.setState( (prevState)=>{ 
          let newRoutine = prevState.routine;
          newRoutine.name = value;
          return {
            routine: newRoutine
          }
         })}}></TextInput>
        <Text style={{fontSize : 20, flexDirection: "row"}}>Number of Rounds:</Text>
        <NumericInput style={{flexDirection: "row"}} iconSize={15} minValue={1} maxValue={10} step={1} value={this.state.routine.rounds} 
        onChange={value => {this.setState( (prevState)=>{ 
          let newRoutine = prevState.routine;
          newRoutine.rounds = value;
          return {
            routine: newRoutine
          }
         })}} />

        {this.state.routine.sets.map((item, index, collection) =>{
          if (index !==0) {
          return (
            
                    <View key={index} style={styles.workoutView} >
                         <View style={{alignItems: "center"}}>
                           <Text style={{fontSize: 20, flexDirection: 'row'}}> Interval # {index}      <Icon style={{flexDirection: 'row'}} name="trash" size={30} color="#000000"></Icon> </Text>
                         
                        </View>
                        <View style={{alignItems: "center"}} >
                        <Text style={styles.workout}>Interval Type(Rest/Work/Pushups etc..):</Text>
                        <AutoComplete style={styles.workout}
                          onSelect={(suggestion)=>{collection[index].type = suggestion.text}}
                          suggestions={suggestions}
                          suggestionObjectTextProperty='text'
                          value={item.type}
                          minimumSimilarityScore={0}
                          onChangeText={value => {this.setState( (prevState)=>{ 
                            let newRoutine = prevState.routine;
                            newRoutine.sets[index].type= value;
                            return {
                              routine: newRoutine
                            }})}}
                        />
                      </View>
                   
                      <View style={{alignItems: "center"}} >
                        <Text style={styles.workout}>Number Of Seconds:</Text>
                        <NumericInput iconSize={15} style={styles.workout} minValue={5} maxValue={180} step={5} value={collection[index].seconds} 
                        onChange={value => {this.setState((prevState)=>{
                          let newRoutine = prevState.routine;
                          newRoutine.sets[index].seconds = value;
                          return {
                            routine: newRoutine
                          }
                        })}} />
                      </View>
                    </View>);
          }
        })}
        
        <Icon style={styles.addbutton} name="plus-circle" size={70} color="#0000FF" onPress={this.addSet.bind(this)}></Icon>
        <Button style={{marginTop: 30, fontSize: 30}} onPress={this.submitRoutine} color="#0000FF" title="Submit" accessibilityLabel="Submit the new Workout"/>
        </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexGrow: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "flex-start"
    },
    header: {
      fontSize: 22,
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
      width: 500,
      backgroundColor: 'rgba(135, 206, 235, 0.2)'
    },
    editView: {
      position: 'absolute',
      right: 5,
      top: 5,
      flexDirection: 'row'
    },
    workout: {
      fontSize: 16,
      flexDirection: 'row'
    },
    addbutton: {
      position: 'absolute',
      bottom: 50,
      right: 50
    }
  })