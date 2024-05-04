// import {StatusBar} from 'expo-status-bar';
// import {Button, StyleSheet, Text, View} from 'react-native';
// import Local from './Local';
// import Online from './Onine';
// import VideoPlayer from './videoPlayer';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ButSec from './components/ButSec';
import Header from './components/Header';
import MidSec from './components/MidSec';

function HomeScreen({navigation}) {
  return (
    <View style={styles.white}>
      <Header />
      <ButSec />
      <MidSec />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  white: {
    // color: '#E1DEDD',
    // backgroundColor: '#252525',
    backgroundColor: 'black',
    height: '100%',
  },
  // padding: {
  //   paddingTop: '20px',
  //   padding: '10px',
  // },
});

export default App;
