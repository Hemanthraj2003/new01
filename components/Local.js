import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import RNFS from 'react-native-fs';
import Icons from 'react-native-vector-icons/MaterialIcons';

const Local = ({navigation}) => {
  const [allVideos, setAllVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const load = async () => {
      const localVideoString = await AsyncStorage.getItem('LocalVideos');

      if (localVideoString !== null) {
        const localVideos = JSON.parse(localVideoString);
        setAllVideos(localVideos);
      } else {
        console.log('data no found');
        scanForVideoFiles();
      }
    };
    load();
  }, []);

  useEffect(() => {
    console.log(allVideos);
  }, [allVideos]);

  //IS VIDEO FILE
  const isVideoFile = fileName => {
    if (
      fileName.endsWith('.mp4') ||
      fileName.endsWith('.mov') ||
      fileName.endsWith('.avi') ||
      fileName.endsWith('.mkv')
    ) {
      return true;
    }
  };

  //SCAN FOR SUB-DIRECTORY(Recursive Directory )
  const recursivelyScanForVideoFiles = async files => {
    // console.log(files);
    let videoFiles = [];
    for (const file of files) {
      if (file.isDirectory()) {
        console.log('scanning');
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
      setIsLoading(true);
      const allFiles = await RNFS.readDir(RNFS.ExternalStorageDirectoryPath);
      const videoFiles = await recursivelyScanForVideoFiles(allFiles);
      setAllVideos(videoFiles);

      await AsyncStorage.setItem('LocalVideos', JSON.stringify(videoFiles));
      setIsLoading(false);
    } catch (error) {
      console.error('Error scanning for video files:', error);
    }
  };
  const renderVideoItem = ({item}) => {
    const fileName = item.split('/').pop();
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('VideoPlayer', {videoName: item})}>
        <View style={styles.thumbNail}>
          <Icons name="play-circle-outline" size={30} color="#957500" />
        </View>
        <View
          style={{flex: 1, paddingHorizontal: 10, justifyContent: 'center'}}>
          <Text
            style={{color: '#9c9c9c'}}
            numberOfLines={2}
            ellipsizeMode="tail">
            {fileName}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.headerColor}>LOCAL VIDEOS</Text>

        <View>
          {isLoading ? (
            <ActivityIndicator size={25} color="#957500" />
          ) : (
            <TouchableOpacity onPress={scanForVideoFiles}>
              <Icons name="refresh" size={25} color="#957500" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View>
        {allVideos.length === 0 ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}>
            <Text>LOADING...</Text>
          </View>
        ) : (
          <FlatList
            data={allVideos}
            renderItem={renderVideoItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{paddingBottom: 80}}
            extraData={allVideos}
          />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#242424',
  },
  header: {
    justifyContent: 'space-between',
    // alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'black',
    paddingHorizontal: 28,
    paddingVertical: 20,
  },
  headerColor: {
    color: '#957500',
    fontSize: 20,
    fontWeight: '600',
  },
  flatList: {
    flexGrow: 1,
  },
  thumbNail: {
    backgroundColor: '#1f1f1f',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 15,
    marginEnd: '10',
  },
  button: {
    margin: 10,
    flexDirection: 'row',
    height: 80,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
});
export default Local;
