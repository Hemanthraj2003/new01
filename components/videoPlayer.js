import React, {useEffect, useState} from 'react';
import Video from 'react-native-video';
import {View, StyleSheet, Text} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {handleFetch} from './handleFetch';

const VideoPlayer = () => {
  const route = useRoute();
  const [videoUri, setVideoUri] = useState('');
  // const {videoName, videoUrl} = route.params;
  useEffect(() => {
    const fetchData = async () => {
      if (route.params.videoName) {
        setVideoUri('file://' + route.params.videoName);
      } else if (route.params.videoUrl) {
        const uri = await handleFetch(route.params.videoUrl); // Wait for handleFetch to complete
        setVideoUri(uri);
        console.log(uri);
      }
    };

    fetchData();
  }, [route.params]);
  return (
    <View style={styles.container}>
      {videoUri ? (
        <Video source={{uri: videoUri}} style={styles.video} controls={true} />
      ) : (
        <Text style={styles.text}>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: 300,
  },
  text: {
    color: 'black',
  },
});

export default VideoPlayer;
