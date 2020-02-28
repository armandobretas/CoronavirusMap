import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Map from './screens/Map'

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Coronavirus COVID-19 Global Cases by Johns Hopkins CSSE </Text>
      <View style={styles.map}>
        <Map />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 80,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff'
  },
  map: {
    minWidth: '100%',
    minHeight: '100%',
    backgroundColor: '#e8e8e8'
  }
});
