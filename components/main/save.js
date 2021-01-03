import React from 'react'
import { Text, View, Image , Button} from 'react-native';
import { TextInput } from 'react-native-paper';
import firebase from 'firebase';
require ("firebase/firestore")
require ("firebase/firebase-storage")
export default function save(props) {
    const [caption, setCaption] = React.useState("");

    const uploadImage = async () => {
        const uri = props.route.params.image;
        const path = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`
        const response = await fetch(uri);
        const blob = await response.blob();

        const task = firebase.storage().ref().child(path).put(blob);

        const taskProgress = snapshot => {
            console.log('Image has been Uploaded')
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                console.log(snapshot)
            })
        }

        const taskError = snapshot => {
            console.log(snapshot)
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted)
    }
    console.log(props.route.params.image)
    return (
        <View style={{flex:1}}>
            <Image source={{uri: props.route.params.image}}/>
            <TextInput
            placeholder="Write a caption.."
            onChangeText={(caption) => setCaption(caption)}
            />
            <Button title = "Save" onPress={() => uploadImage()} />
        </View>
    )
}
