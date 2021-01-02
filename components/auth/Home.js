import React from 'react'
import { Text, View, Button } from 'react-native';

export default function Home({ navigation }) {
    return (
        <View style = {{flex:1 , justifyContent: 'center'}}>
            <Button title="Register" onPress = {() => navigation.navigate("Register")}>
                 Register
            </Button>

            <Button title="Login" onPress = {() => navigation.navigate("Login")}>
                 Login
            </Button>
        </View>
    )
}
