import React, { Component } from 'react'
import { Text, View, ActivityIndicator } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../redux/actions/index'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

import FeedScreen from './main/feed'
import ProfileScreen from './main/profile';
import { Feather } from '@expo/vector-icons';

const EmptyScreen = () => {
    return(null)
}
export class main extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    render() {
        return (
            <Tab.Navigator initialRouteName="Feed" barStyle={{ backgroundColor: 'white' }} labeled={false} activeColor="red">
                <Tab.Screen name="Feed" component={FeedScreen} 
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Feather name="home" size={24} color={color}/>
                    )
                }} />

                <Tab.Screen name="AddContainer" component={EmptyScreen} 
                listeners={({ navigation }) => ({
                    tabPress: event => {
                        event.preventDefault();
                        navigation.navigate("Upload")
                    }
                })}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Feather name="upload" size={24} color={color} />
                    )
                }} />

                <Tab.Screen name="Profile" component={ProfileScreen} 
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Feather name="user" size={24} color={color}/>
                    )
                }} />
            </Tab.Navigator>
        )
    }                           
}
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser }, dispatch);


export default connect(mapStateToProps, mapDispatchProps)(main);
