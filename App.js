import Local from './components/Local';
import React, {useEffect, useState, useRef} from 'react';
import {PermissionsAndroid, Linking, Platform} from 'react-native';
import Online from './components/Onine';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RNFS from 'react-native-fs';
import {GlobalProvider} from './GlobalContext';

import ButSec from './components/ButSec';
import Header from './components/Header';
import MidSec from './components/MidSec';
import VideoPlayer from './components/videoPlayer';
import Downloads from './components/Downloads';
import DownloadManager from './components/DownloadManager';
function HomeScreen({navigation}) {
  const [isOnlineVisible, setIsOnlineVisible] = useState(false);
  const videosDirectory = `${RNFS.DocumentDirectoryPath}/videos`;

  RNFS.exists(videosDirectory)
    .then(exists => {
      if (!exists) {
        RNFS.mkdir(videosDirectory)
          .then(() => {
            console.log('Videos directory created');
          })
          .catch(err => {
            console.error('Error creating videos directory:', err);
          });
      } else {
        console.log('Videos directory already exists');
      }
    })
    .catch(err => {
      console.error('Error checking videos directory:', err);
    });
  const toggleOnlineVisibility = () => {
    setIsOnlineVisible(!isOnlineVisible);
  };

  return (
    <View style={styles.white}>
      {isOnlineVisible && (
        <Online
          navigation={navigation}
          isVisible={isOnlineVisible}
          setIsVisible={setIsOnlineVisible}
          toggleOnlineVisibility={toggleOnlineVisibility}
        />
      )}
      <Header />
      <ButSec
        navigation={navigation}
        toggleOnlineVisibility={toggleOnlineVisibility}
      />
      <MidSec navigation={navigation} />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  async function requestVideoWritePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Write External Storage permission granted');
      } else {
        console.log('Write External Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(() => {
    requestVideoWritePermission();
  }, []);
  // Call this function whenever you need to request the permission
  const navigationRef = useRef();

  useEffect(() => {
    const handleDeepLinking = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        console.log(initialUrl);
        const text = initialUrl.substring(8);
        navigationRef.current?.navigate('VideoPlayer', {videoUrl: text});
      }

      const handleUrl = event => {
        console.log(event.url);
        const text = event.url.substring(8);
        navigationRef.current?.navigate('VideoPlayer', {videoUrl: text});
      };

      Linking.addEventListener('url', handleUrl);

      return () => {
        Linking.removeEventListener('url', handleUrl);
      };
    };

    handleDeepLinking();
  }, []);

  return (
    <GlobalProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
          <Stack.Screen name="Local" component={Local} />
          <Stack.Screen name="Downloads" component={Downloads} />
          <Stack.Screen name="DownloadManager" component={DownloadManager} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  white: {
    backgroundColor: 'black',
    height: '100%',
  },
});

export default App;
