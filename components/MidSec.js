import {View, Text, StyleSheet} from 'react-native';

const MidSec = () => {
  return (
    <View style={styles.layout}>
      <View style={styles.head}>
        <Text style={styles.text}>Recent Videos</Text>
        <Text style={styles.text.red}>Clear</Text>
      </View>
      <View style={styles.nrc}>
        <Text style={styles.text.red}>NO RECENT VIDEOS</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    marginTop: '2%',
  },

  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '10%',
  },

  text: {
    color: 'white',
    red: {
      color: 'red',
    },
  },
  nrc: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
export default MidSec;
