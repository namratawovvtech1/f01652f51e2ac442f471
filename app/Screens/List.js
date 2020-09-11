import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import {Card} from 'native-base';
class List extends Component{
  constructor(props){
      super(props);
      this.state={

      }
  }
  render(){
      const astroidData = this.props.route.params.astroidInfo;
      console.log(astroidData);
      return(
          <View style={styles.container}>
             <Card style={styles.cardStyle}>
               <Text style={styles.infoText}>
                   <Text style={styles.infoTextTitle}>Name:{" "}</Text>
                   {astroidData.name}
                </Text>
                <Text style={styles.infoText}>
                   <Text style={styles.infoTextTitle}>Nasa_jpl_url:{" "}</Text>
                   {astroidData.nasa_jpl_url}
                </Text>
                <Text style={styles.infoText}>
                   <Text style={styles.infoTextTitle}>Is_potentially_hazardous_asteroid:{" "}</Text>
                   {astroidData.is_potentially_hazardous_asteroid.toString()}
                </Text>
             </Card>
          </View>
      )
  }
}
export default List;
const styles = StyleSheet.create({
    container:{
        padding:20
    },
    cardStyle:{
        padding:15
    },
    infoText:{
        fontSize:16,
        padding:5,
        lineHeight:20
    },
    infoTextTitle:{
        fontWeight:'bold',
        color:'#444'
    }
})