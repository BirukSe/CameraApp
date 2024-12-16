import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState , useRef} from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View , Pressable, Image, Alert, Animated} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
export default function App() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [permissionResponse, requesterPermission] = MediaLibrary.usePermissions();
  const someRef = useRef(null);
  const [isClicked, setIsClicked]=useState(false);
  const [sup, whatsUp]=useState("");
  const [isLoading, setIsLoading] = useState(false);
  

  if (!permission) {

    return <View />;
  }

  if (!permission.granted) {
  
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  function Loader(){
    return (
      <View style={styles.container}>
      <Animated.Image
        source={require('../assets/images/loader.png')} 
        style={[styles.image, { transform: [{ rotate: spin }] }]} 
      />
    </View>
    )
  }
  if(!permissionResponse?.granted){
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requesterPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
    
  }
  async function savePicture(){
    try{
      const asset = await MediaLibrary.createAssetAsync(sup);
      console.log(asset);
      Alert.alert(
        "Success!", 
        "Your Picture is Saved to gallery, thanks for using BuraChat", 
        [
          { text: "OK", onPress: () => setIsClicked(!isClicked) }
        ]
      );
      

    }
    catch(error){
      console.log(error);
    }

    
  }
  function handlePicture(){
    setIsLoading(true);
    try{
      someRef.current.takePictureAsync().then(data => {
        console.log(data);
        setIsClicked(!isClicked);
        whatsUp(data.uri);
      });
      
    }catch(error){
      console.log(error);
    }finally{
      setIsLoading(false);
    }

   

  }

  return (
    <>
    {isLoading && <Loader/>}
    <View style={styles.container}>
     {isClicked ? 
     <>
     <Image source={{uri:sup}} style={styles.camera} /> 
     <View style={styles.total}>
      <Pressable style={styles.retake} onPress={() => setIsClicked(!isClicked)}><Text>Retake</Text></Pressable>
      <Pressable style={styles.save} onPress={savePicture}><Text>Save</Text></Pressable>

     </View>
     </>
     
     : 
      <CameraView ref={someRef} style={styles.camera} facing={facing} enableTorch={false}>
        <View style={styles.buttonContainer}>
       
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        <TouchableOpacity  style={styles.camerarer} onPress={handlePicture}>
        <Image source={require('../assets/images/lens.png') } style={styles.camerarerer}  />

        </TouchableOpacity>
            
         
        
          
        </View>
      </CameraView>
}
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  camerarer: {
    height: 50,
    width: 50,
    backgroundColor: 'white',
   marginTop: 520,
  
   marginLeft: 50

  },
  camerarerer: {
    height: 50,
    width: 50,
  },
  total: {
    height: 80,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'gray',
  },
  retake: {
    height: 50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'brown'
  },
  save: {
    height: 50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green'
    
  }

  
  
  
});




























// import { Camera, CameraType } from 'expo-camera';
// import { useState, useRef } from 'react';
// import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

// export default function App() {
//   const [facing, setFacing] = useState(CameraType.back); // Use CameraType
//   const [permission, requestPermission] = Camera.useCameraPermissions();
//   const [photo, setPhoto] = useState(null); // Store the captured photo
//   const cameraRef = useRef(null); // Reference to the Camera

//   if (!permission) {
//     return <View />;
//   }

//   if (!permission.granted) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.message}>We need your permission to show the camera</Text>
//         <Button onPress={requestPermission} title="Grant Permission" />
//       </View>
//     );
//   }

//   function toggleCameraFacing() {
//     setFacing((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
//   }

//   async function takePicture() {
//     if (cameraRef.current) {
//       const photoData = await cameraRef.current.takePictureAsync();
//       setPhoto(photoData.uri); // Store the photo URI
//     }
//   }

//   return (
//     <View style={styles.container}>
//       {photo ? (
//         <View style={styles.container}>
//           <Image source={{ uri: photo }} style={styles.camera} />
//           <Button title="Retake" onPress={() => setPhoto(null)} />
//         </View>
//       ) : (
//         <Camera
//           style={styles.camera}
//           type={facing}
//           ref={cameraRef}
//         >
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
//               <Text style={styles.text}>Flip Camera</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.button} onPress={takePicture}>
//               <Text style={styles.text}>Capture</Text>
//             </TouchableOpacity>
//           </View>
//         </Camera>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   message: {
//     textAlign: 'center',
//     paddingBottom: 10,
//   },
//   camera: {
//     flex: 1,
//   },
//   buttonContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     backgroundColor: 'transparent',
//     margin: 20,
//   },
//   button: {
//     alignSelf: 'flex-end',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     padding: 10,
//     borderRadius: 5,
//   },
//   text: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'white',
//   },
// });
