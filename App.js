import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';
const store = createStore(rootReducer, applyMiddleware(thunk))


const firebaseConfig = {
  apiKey: "AIzaSyBvE6lrJfKp4ufBf4aLpyj6VeQotmTj90M",
  authDomain: "firegram-e4c96.firebaseapp.com",
  projectId: "firegram-e4c96",
  storageBucket: "firegram-e4c96.appspot.com",
  messagingSenderId: "1039021562599",
  appId: "1:1039021562599:web:77c4f8e7d3e0432ec12042",
  measurementId: "G-W86ZHBCVM9"
};

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}

import HomeScreen from './components/auth/Home';
import RegisterScreen from './components/auth/Register';
import MainScreen from './components/main';
import UploadScreen from './components/main/upload'
import SaveScreen from './components/main/save'
export class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      loaded: false
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState ({
          loggedIn: false,
          loaded: true
        })
      }

      else {
        this.setState ({
          loggedIn: true,
          loaded: true
        })
      }
    })
  }
  
  
  render() {

    const { loggedIn, loaded } = this.state;
    if(!loaded ){
      return(
        <View style = {{flex:1 , justifyContent: 'center', alignItems:'center'}}> 
          <ActivityIndicator size="large" color = "#f44336" />
        </View>
      )
    }

    if(!loggedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName = "Home">
            <Stack.Screen name = "Home" component = {HomeScreen} options={{headerShown: false}}/>
            <Stack.Screen name = "Register" component = {RegisterScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return(
      <Provider store={store}> 
       <NavigationContainer>
        <Stack.Navigator initialRouteName = "Main">
            <Stack.Screen name = "Main" component = {MainScreen} options={{headerShown: false}}/>
            <Stack.Screen name = "Upload" component = {UploadScreen} navigation = {this.props.navigation}/>
            <Stack.Screen name = "Save" component = {SaveScreen}/>
        </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App
