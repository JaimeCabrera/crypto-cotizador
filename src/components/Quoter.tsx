import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {
  price: InterfaceQuoter;
}
export interface InterfaceQuoter {
  PRICE: string;
  HIGHDAY: string;
  LOWDAY: string;
  CHANGEPCT24HOUR: string;
  LASTUPDATE: string;
}

export const Quoter = ({price}: Props) => {
  // comporbando si el objeto no tiene nada entonces no se renderiza nada
  if (Object.keys(price).length === 0) {
    return null;
  }
  return (
    <View style={styles.result}>
      <Text style={styles.price}>
        <Text style={styles.span}>{price.PRICE}</Text>
      </Text>
      <Text style={styles.text}>
        <Text>Precio mas alto del dia:</Text>
        <Text style={styles.span}> {price.HIGHDAY}</Text>
      </Text>
      <Text style={styles.text}>
        <Text>Precio mas bajo del día:</Text>
        <Text style={styles.span}> {price.LOWDAY}</Text>
      </Text>
      <Text style={styles.text}>
        <Text>Variación ultimas 24 horas:</Text>
        <Text style={styles.span}> {price.CHANGEPCT24HOUR}%</Text>
      </Text>
      <Text style={styles.text}>
        <Text>Ultima actulización:</Text>
        <Text style={styles.span}> {price.LASTUPDATE}</Text>
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  result: {
    padding: 20,
  },
  text: {
    color: '#5d6d7e',
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    marginBottom: 8,
    flex: 1,
    marginLeft: 10,
  },
  price: {
    color: '#2c3e50',
    fontFamily: 'Lato-Regular',
    marginLeft: 10,
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 18,
  },
  span: {
    fontFamily: 'Lato-Black',
  },
});
