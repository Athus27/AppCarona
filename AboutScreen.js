import { Button, StyleSheet, Text, View } from 'react-native';

export default function AboutScreen({ goToHome, goToLogin }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About</Text>
      <Text style={styles.text}>Essa é a tela About.</Text>

      <Button
        title="Voltar para Home"
        onPress={goToHome}
      />
      <Button title="Ir para Login" onPress={goToLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    margin: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  text: {
    fontSize: 20,
    color: '#333',
    marginBottom: 10,
  },
  title: {
    fontSize: 40,
    color: '#ABC',
    marginBottom: 10,
  },
});
