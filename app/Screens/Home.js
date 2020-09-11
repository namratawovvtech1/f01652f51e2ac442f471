import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  TextInput,
  FlatList,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import {Button} from 'native-base';

//get screen dimensions
const viewportWidth = Dimensions.get('window').width;
const viewportHeight = Dimensions.get('window').height;


class Home extends Component{
  constructor(props){
    super(props);
      this.state={
         astroidId:[],
         AstroidInput:'',
         isLoading:false,
         dataError:false
      }
  }
  //get Input value
  ChangeText=(input)=>{
      if(input == ""){
        this.setState({
            dataError:false
        })
      }
     this.setState({AstroidInput:input})
  }

  //get Id info
  submitId=(input)=>{
    return fetch(`https://api.nasa.gov/neo/rest/v1/neo/${input}?api_key=Cj33EhsCABLa7s4jKMMAUwYUJCMEW7is0Sde4XfH`)
    .then((response) => response.json())
    .then((responseJson) => {
        if(responseJson.status == 404){
            this.setState({dataError:true})
        }else{
            this.props.navigation.navigate('List' , {astroidInfo:responseJson})
            //redirect info to next page
        }
    })
    .catch((error)=>{
        this.setState({dataError:true})
    })
  }

  //get list of Astroid IDs
  getAstroidIDList(){
    this.setState({
        isLoading : true,
        dataError:false
    })
    return fetch('https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=Cj33EhsCABLa7s4jKMMAUwYUJCMEW7is0Sde4XfH')
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({
            astroidId : responseJson.near_earth_objects,
            isLoading : false
        });
    })
    .catch((error)=>{
        this.setState({dataError:true})
    })
  }

  //render data to show
  renderItem(data){
    return(
        <TouchableOpacity style={styles.listId} onPress={() => this.submitId(data.item.id)}>
            <Text style={styles.listIDText}>{data.item.id}</Text>
        </TouchableOpacity>
    )
  }

  render(){
      return(
          <View style={styles.container}>
            <View style={styles.innerContent}>
                <TextInput 
                placeholder="Enter Asteroid ID"
                onChangeText={(input)=>this.ChangeText(input)}
                value={this.state.AstroidInput}
                style={styles.TextInput}
                />
                <Button style={styles.SubmitBtn} block 
                disabled={this.state.AstroidInput == "" ? true : false}
                onPress={() => this.submitId(this.state.AstroidInput)}>
                    <Text style={styles.SubmitBtnText}>Submit</Text>
                </Button>
                <View style={styles.listStyle}>
                 {  this.state.isLoading &&
                    <ActivityIndicator size="large" color="#444"/>
                 }
                 {
                      this.state.dataError &&
                      <View>
                          <Text>Data Not Found!!!! </Text>
                          <Text>(Press on "Random Asteroid" for Data)</Text>
                      </View>
                 }
                 {
                      !this.state.dataError &&
                    <FlatList 
                        data={this.state.astroidId}
                        keyExtractor={(item,index) => index.toString()}
                        renderItem={(item) => this.renderItem(item)}
                        style={styles.faltListStyle}
                    />
                 }
             </View>
            </View>
             <Button style={styles.randomBtn} full onPress={() => this.getAstroidIDList()}>
                 <Text style={styles.SubmitBtnText}>Random Asteroid</Text>
             </Button>
          </View>
      )
  }
}
export default Home;

//Styles 
const styles = StyleSheet.create({
    container:{
        position:'relative',
        height:'100%'
    },
    innerContent:{
       padding:viewportWidth* 0.05,
    },
    SubmitBtnText:{
        fontSize:16,
        color:"#fff",
        fontWeight:'bold'
    },
    space:{
        padding:viewportWidth* 0.02
    },
    TextInput:{
        fontSize:16
    },
    listStyle:{
        padding:viewportWidth* 0.03,
        height:viewportHeight - 250
    },
    listId:{
        padding:viewportWidth* 0.03,
        borderBottomColor:"#7B68EE",
        borderBottomWidth:1,
    },
    listIDText:{
        fontSize:18,
        textAlign:'center',
        color:'#444',
        fontWeight:'700'
    },
    randomBtn:{
        position:'absolute',
        bottom:0,
        width:'100%',
        left:0,
        right:0,
        height:50
    }
})