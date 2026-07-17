import { Button, StyleSheet, Text, View } from 'react-native';

export default function LoginScreen({ goToHome }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.text}>Por favor, faça login para continuar.</Text>

      <Button
        title="Voltar para Home"
        onPress={goToHome}
      />
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
