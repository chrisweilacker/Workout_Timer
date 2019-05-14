import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
                    key={item.name}>
                    <View style={styles.workoutView} >
                    <View style={{alignItems: "center"}} >
                      <Text style={styles.workout} onPress={()=>{this.props.select(index)}}>{item.name}</Text>
                    </View>
                    
                      {item.name==='Default' ? null : (
                        <View style={styles.editView}>
                          <Icon style={{flexDirection: 'row', marginRight: 10}} name="edit" size={30} color="#CCCC00"></Icon>
                          <Icon style={{flexDirection: 'row'}} name="trash" size={30} color="#000000" onPress={()=>{this.props.delete(index)}}></Icon>
                        </View>
                      ) }                    
                    
                    </View>

                  </TouchableHighlight>);
        })}
        <Icon style={styles.addbutton} name="plus-circle" size={70} color="#0000FF" onPress={this.props.add}></Icon>
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
    },
    addbutton: {
      position: 'absolute',
      bottom: 50,
      right: 50
    }
  })