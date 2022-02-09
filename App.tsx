import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {Form} from './src/components/Form';
import {Header} from './src/components/Header';
import axios from 'axios';
import {Quoter} from './src/components/Quoter';
const App = () => {
  const [currency, setSelectedcurrency] = useState<string>('');
  const [cryptoCurrency, setCryptoCurrency] = useState<string>('');
  const [fetchApi, setFetchApi] = useState(false);
  const [quote, setQuote] = useState({});
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
              uri: 'https://uca0a8235991e0c8bc841e5747cf.previews.dropboxusercontent.com/p/thumb/ABd6v4XfsbH7ziGnMTFYTDlXCFdXodTl4D1qtf-wfeMn9pzQX0A0TrmipFnstxM8cA3eK-i061r0oKOQhNWCmSRKb4N8Z6Pst3lOobasu_ht7AgANkxQzr-JtAlR9MxpsUhkmoLH6gqMtEJcy2G40hoN4IWDBponRYQoSiUGoQwvz7eN33pBwj9AC5JfeXuRu-lpbxbL9GBxN6dphKdpAusLMoSHL9XHP-bSG_YVxUROkPQZHaJk670MOXdbJ0lLfM44QlQcT98PR6tNs9XQdsQjAGB3Sa50NjJc2Qsw-tRCJ1OeeVtStOHSKGq-Yue4Rk9Bz0tl457nlGRZylm32Bc3BlkV_6n7-8OJJLa2nH2R-DtlktXmqqoe2GHtcxSo9G5D0hyOsS5xC1B_2KvnHBhj/p.jpeg?size=2048x1536&size_mode=3',
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
    backgroundColor: '#1A162E',
  },
  imgContainer: {
    flexDirection: 'row',
    opacity: 0.4,
    justifyContent: 'center',
  },
  img: {
    height: 120,
    flex: 1,
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
