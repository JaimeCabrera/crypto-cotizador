import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import axios from 'axios';

import {Form} from './src/components/Form';
import {Header} from './src/components/Header';
import {Quoter} from './src/components/Quoter';

const initialState = {
  PRICE: '',
  HIGHDAY: '',
  LOWDAY: '',
  CHANGEPCT24HOUR: '',
  LASTUPDATE: '',
};

const App = () => {
  const [currency, setSelectedcurrency] = useState<string>('');
  const [cryptoCurrency, setCryptoCurrency] = useState<string>('');
  const [fetchApi, setFetchApi] = useState(false);
  const [quote, setQuote] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cotizarCrypto = async () => {
      if (fetchApi) {
        // fetch api para obtener la cotizacion
        setLoading(true);
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoCurrency}&tsyms=${currency}`;
        const res = await axios.get(url);
        setQuote(res.data.DISPLAY[cryptoCurrency][currency]);
        // console.log(res.data.DISPLAY[cryptoCurrency][currency]);
        setFetchApi(false);
        setLoading(false);
        // ocultar spinner y ,mostrar el resultado
      }
    };
    cotizarCrypto();
  }, [fetchApi, cryptoCurrency, currency]);

  // mostrar spinner
  const component = loading ? (
    <ActivityIndicator size="large" color="#06ECFA" />
  ) : (
    <Quoter price={quote} />
  );
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header />
        <View style={styles.imgContainer}>
          <Image
            style={styles.img}
            source={{
              uri: 'https://uc0bb0e0acee1d253be48bf8ecc6.previews.dropboxusercontent.com/p/thumb/ABf-C0o1g-fIiHkDU6IDxNqfJFduDp3y8-r1oSd3xdNo0qiqVvafLYep1YYYwVQTbiqq9SF3zW5frE4N8qxwEynd_f53a0iDlW4Ceagx-yHbJKn8elVqcL05BU6iKDpUM1lY_m9njNQMRTKVLrrLuuO5OukVrUK-rRC7QS8flzNee7k1S_gLa_Jn4FjLVHH0KjTHX66GIyNl9klDBGvuZzdhMUdxCQGiJy5kXsNLcZNKPwXDx0X6KZ7_gyP5qNt3VAQcTqNNmypsZQq67YNhn-ojfrppioixHc55RPWd2snX2rryXZ5id0n6BJTTui60CjQudoV4v80GglVx-R0eJzdpTGo-462OrqmfWdVsTPLJGMCiuiHQTxB3qX4zgy5uqgp-oY5eUSrumMchwt4F1q35/p.png?size=2048x1536&size_mode=3',
            }}
          />
        </View>
        <View style={styles.content}>
          <Form
            currency={currency}
            setSelectedcurrency={setSelectedcurrency}
            cryptoCurrency={cryptoCurrency}
            setCryptoCurrency={setCryptoCurrency}
            setFetchApi={setFetchApi}
          />
        </View>
        <View style={styles.result}>{component}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#eaeded',
  },
  imgContainer: {
    flexDirection: 'row',
    opacity: 0.9,
    justifyContent: 'center',
  },
  img: {
    height: 120,
    width: 120,
    // flex: 1,
    // marginHorizontal: 16,
  },
  content: {
    marginHorizontal: 16,
  },
  result: {
    marginTop: 20,
  },
});
export default App;
