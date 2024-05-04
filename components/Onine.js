import {View, Text} from 'react-native';
import RNFS from 'react-native-fs';

const Online = () => {
  const oldFilePath = '/storage/emulated/0/video.jpg';
  const newFilePath = '/storage/emulated/0/Movies/decrypted_video.mp4';
  RNFS.moveFile(oldFilePath, newFilePath)
    .then(() => {
      console.log(`File  renamed to  successfully.`);
    })
    .catch(error => {
      console.error('Error renaming file:', error);
    });

  return (
    <View>
      <Text>Online Video Here..</Text>
    </View>
  );
};

export default Online;
