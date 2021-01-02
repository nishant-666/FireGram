import React, { Component } from 'react'
import { TextInput, View, Button } from 'react-native';
import firebase from 'firebase'

export class Register extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            name: '',
            
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp(){
        const { email, name, password } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            firebase.firestore().collection("Users")
            .doc(firebase.auth().currentUser.uid)
            .set({
                name, email
            })
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })
    }
    render() {
        return (
            <View>
                <TextInput placeholder = "Enter your Name" onChangeText={(name) => this.setState({name})} />
                <TextInput placeholder = "Enter your Email" onChangeText={(email) => this.setState({email})} />
                <TextInput placeholder = "Enter your Password" secureTextEntry={true} onChangeText={(password) => this.setState({password})} />

                <Button title="Sign Up" onPress = {() => this.onSignUp()}>
                 Register
            </Button>
            </View>
        )
    }
}

export default Register
