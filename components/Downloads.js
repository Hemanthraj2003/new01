import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  ProgressBarAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {useRoute} from '@react-navigation/native';
import RNFS from 'react-native-fs';

import {
  // url
  formatBytes,
  pauseFileDownload,
  saveDownloadProgress,
  loaddownloadProgressData,
} from './downloadFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Downloads = ({navigation, title, source, DownloadStatu}) => {
  console.log(DownloadStatu);
  const url = source;
  const filePath = `${RNFS.DocumentDirectoryPath}/videos/${title}.mp4`;
  const taskRef = useRef(null);
  const [downloaded, setDownloaded] = useState(10);
  const [fileSize, setFileSize] = useState(100);
  const [downloadFinished, setDownloadFinished] = useState(DownloadStatu);
  const [downloading, setDownloading] = useState(false);
  const [responsePath, setResponsePath] = useState('');

  useEffect(() => {
    const reset = async () => {
      await AsyncStorage.removeItem('downloadDetails');
      const testData = [
        {
          Title: route.params.title,
          Source: route.params.source,
          DownloadStatus: false,
          ResponseFilePath: '',
          Size: 0,
        },
      ];
      await AsyncStorage.setItem('downloadDetails', JSON.stringify(testData));
    };

    // reset();
  }, []);
  useEffect(() => {
    console.log(responsePath);
  }, [responsePath]);

  useEffect(() => {
    console.log(formatBytes(downloaded) + '/' + formatBytes(fileSize));
  }, [downloaded, fileSize]);

  const downloadSuccess = async () => {
    const downloadDetailsString = await AsyncStorage.getItem('downloadDetails');
    let downloadDetailsArray = JSON.parse(downloadDetailsString);

    let thisDownloadDetails = downloadDetailsArray.find(
      item => item.Source === url,
    );
    thisDownloadDetails.DownloadStatus = downloadFinished;
    thisDownloadDetails.Size = fileSize;
    thisDownloadDetails.ResponseFilePath = responsePath;

    await AsyncStorage.setItem(
      'downloadDetails',
      JSON.stringify(downloadDetailsArray),
    );
  };

  const downloadFile = async () => {
    const fileExists = await RNFetchBlob.fs.exists(filePath);
    if (fileExists) {
      try {
        // Delete the file
        await RNFetchBlob.fs.unlink(filePath);
        console.log('Deleted existing file:', filePath);
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    }
    taskRef.current = RNFetchBlob.config({
      path: filePath,
    }).fetch('GET', url);

    taskRef.current
      .progress((recived, total) => {
        const dataRecived = parseInt(recived, 10);
        const dataTotal = parseInt(total, 10);
        if (fileSize == 0) {
          setFileSize(dataTotal);
        }
        setDownloaded(dataRecived);
      })
      .then(Response => {
        console.log('Download completerd');
        setDownloadFinished(true);
        const update = async () => {
          await downloadSuccess();
        };
        update();
        setResponsePath(Response.path());
      })
      .catch(error => {
        console.log(error);
      });
  };
  const download = async () => {
    setDownloading(true);
  };
  return (
    <View style={styles.background}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical: 12,
        }}>
        <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
      </View>
      {!downloading ? (
        <View style={styles.downloadcancel}>
          {downloadFinished ? (
            <View style={styles.downloadFinished}>
              <TouchableOpacity
                style={styles.downloadButton}
                onPress={download}>
                <Text style={styles.buttonText}>PLAY</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.downloadButton, styles.buttonCancel]}
                onPress={download}>
                <Text style={[styles.buttonText, styles.textCancel]}>
                  DELETE
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.downloadFinished}>
              <TouchableOpacity
                style={styles.downloadButton}
                onPress={download}>
                <Text style={styles.buttonText}>DOWNLOAD</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.downloadButton, styles.buttonCancel]}
                onPress={download}>
                <Text style={[styles.buttonText, styles.textCancel]}>
                  CANCEL
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : (
        <View style={{marginTop: 0}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginEnd: 10,
            }}>
            <Text>
              {formatBytes(downloaded)} /{formatBytes(fileSize)}
            </Text>
          </View>
          <ProgressBarAndroid
            style={{marginHorizontal: 12}}
            styleAttr="Horizontal"
            indeterminate={false}
            progress={downloaded / fileSize}
            color="#957500" // Background color of the progress bar
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginEnd: 10,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#957500',
                padding: 8,
                paddingHorizontal: 30,
                borderRadius: 100,
              }}>
              <Text style={{fontSize: 12, color: 'black', fontWeight: '600'}}>
                CANCEL
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    height: 140,
    marginHorizontal: 8,
    marginVertical: 10,
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 10,
  },

  buttonCancel: {
    backgroundColor: '#A8A8A8',
  },
  textCancel: {
    color: 'white',
  },
  downloadcancel: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 15,
  },
  downloadFinished: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  titleText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
  },
  downloadButton: {
    margin: 10,
    width: 120,
    height: 40,
    backgroundColor: '#957500', // Background color of the button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black', // Text color
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Downloads;
