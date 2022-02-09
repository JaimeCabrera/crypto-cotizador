import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const Header = () => {
  return (
    <View>
      <Text style={styles.headerTitle}>CryptoCotizador</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    paddingTop: 18,
    fontFamily: 'Lato-Black',
    backgroundColor: '#1A162E',
    paddingBottom: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 18,
    color: '#0F9CAA',
    marginBottom: 14,
  },
});
