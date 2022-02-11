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
import {InterfaceQuoter, Quoter} from './src/components/Quoter';

const App = () => {
  // const InitialState = {
  //   PRICE: '',
  //   HIGHDAY: '',
  //   LOWDAY: '',
  //   CHANGEPCT24HOUR: '',
  //   LASTUPDATE: '',
  // };

  const [currency, setSelectedcurrency] = useState<string>('');
  const [cryptoCurrency, setCryptoCurrency] = useState<string>('');
  const [fetchApi, setFetchApi] = useState(false);
  const [quote, setQuote] = useState<InterfaceQuoter>(Object);
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
    <ActivityIndicator size="large" color="#E2B154" />
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
              uri: 'https://uc3a99ddda1c27e0dea6a2fde71a.previews.dropboxusercontent.com/p/thumb/ABcY5JiCWmWtej50ypKd5YH-FuU9MutkewALggbYw3GkibKe6cRi7DwOgD2yKg_kcMTMzpwmq87__zPNdItDGc4IGD1AXujea26BGoglol_4YTzD7yvA5hRmxwiiVMpmkHRwyXRFWNS61Hv1UUisHlUCs19UgUeMYPrkyeVk0Wwn871kIVyVt58IWdbxUL89TlwS5Dlcz3Y3a6Y2DMS4OCEB2wVgPYXlxxSNCiZ9myqCmxv2gZuOiUywyVbvvjeRmNAUz01389hukMq7DQnWNj0ENQYbHqkiSE-_4YutJvZ6CrBm9qO2GQyCL6Pv65Otqe8vq1jIUIUQZ2X1_fvwTrN6kvYC9B3rCnJ3GtSYQGBUtuWt83Gk_hpjA1ZeJevcyVv7wT9SvJ27cwcoXcyvkltP/p.png?size=2048x1536&size_mode=3',
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
    marginHorizontal: 16,
  },
  content: {
    marginHorizontal: 16,
  },
  result: {
    marginTop: 20,
  },
});
export default App;
