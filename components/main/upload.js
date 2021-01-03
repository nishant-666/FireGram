import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

export default function upload({navigation}) {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const camera = await Camera.requestPermissionsAsync();
      setHasCameraPermission(camera.status === 'granted');

      const gallery = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(gallery.status === 'granted');
    })();
  }, []);

  if (hasCameraPermission === null || hasGalleryPermission === false) {
    return <View />;
  }
  if (hasGalleryPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if(camera){
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
      <View style={{flex:1}}>
        <View style={styles.cameraContainer}>
        <Camera ref = {ref => setCamera(ref)} style={styles.fixedRatio} type={type} ratio={'1:1'}>
            <View style={{flex:1, backgroundColor: 'transparent', flexDirection:'row'}}>
            {image && <Image source = {{uri: image}} style = {{flex:1}} />}
            </View>
        </Camera>
        </View>

        <Button
        icon="repeat"
        compact
        style={{marginBottom:10}}
        onPress={() => {
        setType(
            type === Camera.Constants.Type.back
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back
        );
        }}>
            Flip Image
        </Button>
        <Button icon="camera" onPress={() => takePicture()} style={{marginBottom:10}}>Take Picture</Button>
        <Button icon="image" onPress={() => pickImage()} style={{marginBottom:10}}>Select Image from Gallery</Button>
        <Button icon="send" onPress={() => navigation.navigate('Save', {image})} style={{marginBottom:20}}>Save</Button>
    </View>
  );
}

const styles = StyleSheet.create({
    cameraContainer:{
        flex:1,
        flexDirection:'row'
    },
    fixedRatio: {
        flex:1,
        aspectRatio: 1
    }
})