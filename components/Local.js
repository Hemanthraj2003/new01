import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  PermissionsAndroid,
  StyleSheet,
} from 'react-native';
import RNFS from 'react-native-fs';
import VideoPlayer from './videoPlayer';

const Local = ({navigation}) => {
  const [allVideos, setAllVideos] = useState([]);
  useEffect(() => {
    // requestStoragePermission();
    scanForVideoFiles();
  }, []);

  //REQUEST PERMISSION
  // const requestStoragePermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  //       {
  //         title: 'Allow to Store data',
  //         message: 'App needs access to your storage so you can watch videos',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('Got permission');
  //       getAllFolders();
  //     } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
  //       console.log('Permission denied with "Never ask again" option');
  //       openAppSettings();
  //     } else {
  //       console.log('Permission denied');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  //IS VIDEO FILE
  const isVideoFile = fileName => {
    console.log('Checking video file');
    if (
      fileName.endsWith('.mp4') ||
      fileName.endsWith('.mov') ||
      fileName.endsWith('.avi') ||
      fileName.endsWith('.mkv')
    ) {
      console.log('IS VIDEO FILE');
      return true;
    }
  };

  //SCAN FOR SUB-DIRECTORY(Recursive Directory )
  const recursivelyScanForVideoFiles = async files => {
    // console.log(files);
    let videoFiles = [];
    for (const file of files) {
      console.log(
        'File:',
        file.name,
        ', isDirectory:',
        file.isDirectory(),
        ', isFile:',
        file.isFile(),
      );

      if (file.isDirectory()) {
        console.log(file.path);
        try {
          const subFiles = await RNFS.readDir(file.path);
          videoFiles = videoFiles.concat(
            await recursivelyScanForVideoFiles(subFiles),
          );

          await recursivelyScanForVideoFiles(subFiles);
        } catch (error) {
          console.error('Error reading subfiles:', error);
          // Continue to the next iteration
          continue;
        }
      } else if (isVideoFile(file.name)) {
        videoFiles.push(file.path);
      }
    }
    return videoFiles;
  };

  //SCAN AT ROOT OF THE DEVICE
  const scanForVideoFiles = async () => {
    try {
      const allFiles = await RNFS.readDir(RNFS.ExternalStorageDirectoryPath);
      console.log(allFiles.map(file => file.name));
      const videoFiles = await recursivelyScanForVideoFiles(allFiles);
      console.log('Video files:', videoFiles);
      setAllVideos(videoFiles);
    } catch (error) {
      console.error('Error scanning for video files:', error);
    }
  };
  const renderVideoItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('VideoPlayer', {videoName: item})}>
        <Text style={{color: 'black'}}>{item}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <Text style={{color: 'black'}}>Local Video Here..</Text>
      <View>
        <FlatList
          data={allVideos}
          renderItem={renderVideoItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#d4d4d4',
    padding: 10,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#d4d4d4',
    justifyContent: 'center',
    // alignItems: 'center',
  },
});
export default Local;
