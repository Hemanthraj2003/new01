// import Local from './Local';
// import VideoPlayer from './videoPlayer';
import React, {useState} from 'react';

import Online from './components/Onine';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ButSec from './components/ButSec';
import Header from './components/Header';
import MidSec from './components/MidSec';
import VideoPlayer from './components/videoPlayer';
import {Linking} from 'react-native';
function HomeScreen({navigation}) {
  const [isOnlineVisible, setIsOnlineVisible] = useState(false);

  const toggleOnlineVisibility = () => {
    setIsOnlineVisible(!isOnlineVisible);
  };

  return (
    <View style={styles.white}>
      {isOnlineVisible && (
        <Online
          navigation={navigation}
          isVisible={isOnlineVisible}
          toggleOnlineVisibility={toggleOnlineVisibility}
        />
      )}
      <Header />
      <ButSec toggleOnlineVisibility={toggleOnlineVisibility} />
      <MidSec />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  React.useEffect(() => {
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

      // Cleanup function to remove the event listener when the component unmounts
      return () => {
        Linking.removeEventListener('url', handleUrl);
      };
    };

    handleDeepLinking();
  }, []);

  const navigationRef = React.useRef();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  white: {
    backgroundColor: 'black',
    height: '100%',
  },
});

export default App;
