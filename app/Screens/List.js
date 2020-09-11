import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import {Card} from 'native-base';

const viewportWidth = Dimensions.get('window').width;
const viewportHeight = Dimensions.get('window').height;

class List extends Component{
  constructor(props){
      super(props);
      this.state={

      }
  }
  render(){
      const astroidData = this.props.route.params.astroidInfo;//get data
      
      return(
          <View style={styles.container}>
             <Card style={styles.cardStyle}>
               <Text style={styles.infoText}>
                   <Text style={styles.infoTextTitle}>Name:{" "}</Text>
                   {astroidData.name}
                </Text>
                <View style={styles.dottedLine}/>
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

//styles
const styles = StyleSheet.create({
    container:{
        padding:viewportWidth* 0.04
    },
    cardStyle:{
        padding:viewportWidth* 0.03
    },
    infoText:{
        fontSize:16,
        padding:viewportWidth* 0.01,
        lineHeight:22
    },
    infoTextTitle:{
        fontWeight:'bold',
        color:'#444'
    },
    dottedLine:{
        height:1,
        width:"100%",
        borderRadius:100,
        borderWidth:1,
        borderColor:"#644df7",
        borderStyle:"dotted",
        marginBottom:viewportWidth* 0.01,
        marginTop:viewportWidth* 0.01
    }
})