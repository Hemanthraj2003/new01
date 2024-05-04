import React from 'react';
import Video from 'react-native-video';
import {View, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';

const VideoPlayer = () => {
  const route = useRoute();
  const {videoName} = route.params;
  console.log(videoName);
  const videoUri = 'file://' + videoName; // Constructing video URI
  return (
    <View style={styles.container}>
      <Video source={{uri: videoUri}} style={styles.video} controls={true} />
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
});

export default VideoPlayer;
