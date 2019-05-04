import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, TouchableHighlight} from 'react-native';

export default class List extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
    <View style={styles.container}>
        
        <Image style={styles.image} source={{ uri: this.props.picUrl }}/>
        <Text style={styles.header}>{this.props.name}'s Workouts:</Text>
        {this.props.routines.map((item, index, collection) =>{
          return(<TouchableHighlight underlayColor='rgb(0,0,255)' 
                    key={item.name} onPress={()=>{this.props.select(index)}}>
                    <View style={styles.workoutView}>
                      <Text style={styles.workout}>{item.name}</Text>
                    </View>
                  </TouchableHighlight>);
        })}
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
      alignItems: "center",
      width: 310,
      backgroundColor: 'rgba(135, 206, 235, 0.2)'
    },
    workout: {
      fontSize: 20,
    }
  })