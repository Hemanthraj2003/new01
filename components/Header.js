import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

const Header = () => {
  return (
    <View style={styles.basic}>
      <Text style={styles.color}>Video Player Name</Text>
      <Icon name="info-with-circle" size={22} color="#ffffff" />
    </View>
  );
};

const styles = StyleSheet.create({
  basic: {
    height: '8%',
    marginBottom: '3%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#3B3B3B',
    paddingHorizontal: '5%',
  },
  color: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Header;
