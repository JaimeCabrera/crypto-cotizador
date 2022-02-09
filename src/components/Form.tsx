import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableHighlight, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

interface InterfaceApi {
  CoinInfo: CoinInfo;
}
interface CoinInfo {
  Id: string;
  FullName: string;
  Name: string;
}
interface Props {
  currency: string;
  setSelectedcurrency: (value: string) => any;
  cryptoCurrency: string;
  setCryptoCurrency: (value: string) => void;
  setFetchApi: (value: boolean) => void;
}

export const Form = ({
  currency,
  setSelectedcurrency,
  cryptoCurrency,
  setCryptoCurrency,
  setFetchApi,
}: Props) => {
  const [cryptoCurrencis, setCryptoCurrencis] = useState<InterfaceApi[]>([]);

  useEffect(() => {
    const getApidata = async () => {
      const URl =
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=6&tsym=USD';
      const res = await axios.get(URl);
      setCryptoCurrencis(res.data.Data);
    };
    getApidata();
  }, []);

  const showAlert = () => {
    Alert.alert('Error', 'Ambos campos son oblogatorios', [{text: 'ok'}]);
  };
  const quotePrice = () => {
    if (currency.trim() === '' || cryptoCurrency.trim() === '') {
      showAlert();
      return;
    }
    // cambiar state de consulktar api
    setFetchApi(true);
  };

  return (
    <View>
      <Text style={styles.label}>Moneda:</Text>
      <Picker
        dropdownIconColor="#F0B66D"
        selectedValue={currency}
        style={styles.picker}
        onValueChange={value => setSelectedcurrency(value)}>
        <Picker.Item label="-- Selecione la moneda --" value="" />
        <Picker.Item label="Dolar Estadounidense" value="USD" />
        <Picker.Item label="Peso Mexicano" value="MXN" />
        <Picker.Item label="Euro" value="EUR" />
        <Picker.Item label="Libra Esterlina" value="GBP" />
      </Picker>
      <Text style={styles.label}>Crypto Moneda:</Text>
      <Picker
        dropdownIconColor="#F0B66D"
        style={styles.picker}
        selectedValue={cryptoCurrency}
        onValueChange={crypto => setCryptoCurrency(crypto)}>
        <Picker.Item label="-- Selecione la crypto moneda --" value="" />
        {cryptoCurrencis.map(el => {
          return (
            <Picker.Item
              key={el.CoinInfo.Id}
              label={el.CoinInfo.FullName}
              value={el.CoinInfo.Name}
            />
          );
        })}
      </Picker>
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#7B6C55"
        onPress={() => quotePrice()}
        style={styles.btnQuoter}>
        <Text style={styles.textQuoter}>Cotizar</Text>
      </TouchableHighlight>
    </View>
  );
};
// dorado F0B66D
const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    fontSize: 14,
    marginVertical: 16,
    textTransform: 'uppercase',
    color: '#5d6d7e', //17384F
  },
  picker: {
    color: '#85929e',
    backgroundColor: '#eaeded',
  },
  btnQuoter: {
    backgroundColor: '#E2B154',
    padding: 12,
    borderRadius: 6,
    fontSize: 18,
    fontFamily: 'Lato-Black',
    marginTop: 24,
  },
  textQuoter: {
    textAlign: 'center',
    color: '#233340',
    textTransform: 'uppercase',
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
  },
});
