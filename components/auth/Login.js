import React, { Component } from 'react'
import { TextInput, View, Button } from 'react-native';
import firebase from 'firebase'

export class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
            
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp(){
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })
    }
    render() {
        return (
            <View>
                <TextInput placeholder = "Enter your Email" onChangeText={(email) => this.setState({email})} />
                <TextInput placeholder = "Enter your Password" secureTextEntry={true} onChangeText={(password) => this.setState({password})} />

                <Button title="Sign Up" onPress = {() => this.onSignUp()}>
                 Log in
            </Button>
            </View>
        )
    }
}

export default Login
