import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/AntDesign';

const ButSec = () => {
  return (
    <View style={styles.size}>
      <View style={styles.buttons}>
        <TouchableOpacity style={{alignItems: 'center'}}>
          <Icon2 name="earth" size={50} color="#ffffff" />
          <Text>Online</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={{alignItems: 'center'}}>
          <Icon name="folder-video" size={50} color="#ffffff" />
          <Text>My Videos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  size: {
    maxHeight: '12%',
    minHeight: '12%',
    marginHorizontal: '10%',
    marginVertical: '5%',
    backgroundColor: '#3B3B3B',
    borderRadius: 20,
    // overflow: 'hidden',
    padding: '2%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  buttons: {
    marginHorizontal: '4%',
    height: '100%',
    width: '38%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  images: {
    flex: 1,
    height: '70%',
    width: '70%',
  },
});
export default ButSec;
