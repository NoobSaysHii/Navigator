import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import MyTabs from './src/navigation/navigator';


const App = () => {
  return (
    <View style={styles.container}>
      <MyTabs />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  }
});

export default App;