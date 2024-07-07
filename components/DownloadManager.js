import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Downloads from './Downloads';

const DownloadManager = () => {
  const [downloadDetailsList, setDownloadDetailsList] = useState(null);
  useEffect(() => {
    const reset = async () => {
      await AsyncStorage.removeItem('downloadDetails');
      const testData = [
        {
          Title: 'Karataka Damanaka',
          Source: '01',
          DownloadStatus: false,
          ResponseFilePath: '',
          Size: 0,
        },
        {
          Title: 'Chow Chow Bath Chow Chow Bath Chow Chow Bath Chow Chow Bath',
          Source: '03',
          DownloadStatus: true,
          ResponseFilePath: '',
          Size: 0,
        },
        {
          Title: 'Powder',
          Source: '04',
          DownloadStatus: false,
          ResponseFilePath: '',
          Size: 0,
        },
        {
          Title: 'Avatara Purusha 2 ',
          Source: '05',
          DownloadStatus: false,
          ResponseFilePath: '',
          Size: 0,
        },
      ];
      await AsyncStorage.setItem('downloadDetails', JSON.stringify(testData));

      const test = await AsyncStorage.getItem('downloadDetails');
      setDownloadDetailsList(JSON.parse(test));
    };

    reset();
  }, []);

  const renderItem = ({item}) => {
    const status = item.DownloadStatus;
    return (
      <View>
        <Downloads
          title={item.Title}
          source={item.Source}
          DownloadStatu={status}
        />
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.headerColor}>DOWNLOAD MANAGER</Text>
      </View>
      <View>
        <FlatList
          data={downloadDetailsList}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatList}
        />
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
  },
  headerColor: {
    color: '#FFD600',
    fontSize: 18,
  },
  flatList: {
    flexGrow: 1,
  },
});

export default DownloadManager;
