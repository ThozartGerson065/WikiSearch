import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

export default function App() {
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(false);

  const getQuote = async () => {
    try {
      setLoading(true);

      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();

      setQuote(data.content);
    } catch (error) {
      setQuote('Erro ao carregar frase.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.card}>
        <Text style={styles.title}>FocusFlow</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#22c55e" />
        ) : (
          <Text style={styles.quote}>{quote}</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={getQuote}>
          <Text style={styles.buttonText}>Nova Frase</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#1f2937',
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    color: '#22c55e',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  quote: {
    color: '#f3f4f6',
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#22c55e',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 14,
  },
  buttonText: {
    color: '#111827',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
