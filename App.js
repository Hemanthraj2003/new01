// import Local from './Local';
// import VideoPlayer from './videoPlayer';
import React, {useState} from 'react';

import Online from './components/Onine';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ButSec from './components/ButSec';
import Header from './components/Header';
import MidSec from './components/MidSec';
import VideoPlayer from './components/videoPlayer';

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
  return (
    <NavigationContainer>
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
