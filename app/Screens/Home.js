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
  TouchableOpacity
} from 'react-native';

import {Button} from 'native-base';


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
  ChangeText=(input)=>{
   this.setState({AstroidInput:input})
  }
  submitId=(input)=>{
    return fetch(`https://api.nasa.gov/neo/rest/v1/neo/${input}?api_key=Cj33EhsCABLa7s4jKMMAUwYUJCMEW7is0Sde4XfH`)
    .then((response) => response.json())
    .then((responseJson) => {
        if(responseJson.status == 404){
            this.setState({dataError:true})
        }else{
            this.props.navigation.navigate('List' , {astroidInfo:responseJson})
        }
    })
    .catch((error)=>{
        this.setState({dataError:true})
    })
  }
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
        console.log(error)
    })
  }
  renderItem(data){
    return(
        <TouchableOpacity style={styles.listId} onPress={()=>this.submitId(this.state.AstroidInput)}>
            <Text style={styles.listIDText}>{data.item.id}</Text>
        </TouchableOpacity>
    )
  }
  render(){
      return(
          <View style={styles.container}>
             <TextInput 
             placeholder="Enter Asteroid ID"
             onChangeText={(input)=>this.ChangeText(input)}
             value={this.state.AstroidInput}
             style={styles.TextInput}
             />
             <Button style={styles.SubmitBtn} block 
              disabled={this.state.AstroidInput == "" ? true : false}
              onPress={()=>this.submitId(this.state.AstroidInput)}>
                 <Text style={styles.SubmitBtnText}>Submit</Text>
             </Button>
             <View style={styles.space}/>
             <Button style={styles.SubmitBtn} block onPress={()=> this.getAstroidIDList()}>
                 <Text style={styles.SubmitBtnText}>Random Asteroid</Text>
             </Button>
             <View style={styles.space}/>
             <View style={styles.listStyle}>
                 {  this.state.isLoading &&
                    <ActivityIndicator size="large" color="#444"/>
                 }
                 {
                      this.state.dataError &&
                      <Text>Data Not Found!!!! </Text>
                 }
                 {
                      !this.state.dataError &&
                      <FlatList 
                        data={this.state.astroidId}
                        keyExtractor={(item,index)=> index.toString()}
                        renderItem={(item)=> this.renderItem(item)}/>
                 }
                 
             </View>
          </View>
      )
  }
}
export default Home;

const styles = StyleSheet.create({
    container:{
        padding:20
    },
    SubmitBtnText:{
        fontSize:16,
        color:"#fff"
    },
    space:{
        padding:8
    },
    TextInput:{
        fontSize:16
    },
    listStyle:{
        padding:10,
        height:400
    },
    listId:{
        padding:10,
        borderBottomColor:"#ccc",
        borderBottomWidth:1,
    },
    listIDText:{
        fontSize:18,
        textAlign:'center'
    }
})