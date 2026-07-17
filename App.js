// App.js
import { useState } from "react";
import { Text, TextInput, View, Button, Alert, StyleSheet, Image } from "react-native";

import AboutScreen from "./AboutScreen";
import LoginScreen from "./src/screens/auth/Login";
import RegisterScreen from "./src/screens/auth/Register";

function HomeScreen({ goToAbout, goToRegister }) {
	function handlePress() {
		Alert.alert("Botão pressionado");
	}

	return (
		<View style={styles.container}>
			<View>
				<Image source={require("./assets/icons/car-icon.svg")} style={styles.imagemLocal} />
			</View>

			<Text style={styles.title}>CARONAS ICEA</Text>
			<Text style={styles.text}>Imagem representativa</Text>

			<TextInput placeholder="Digite seu nome..." />

			<View>
				<Button title="Enviar" color="#841584" onPress={handlePress} />
			</View>

			<View style={styles.buttonSpacing}>
				<Button title="Ir para About" onPress={goToAbout} />
				<Button title="Ir para Register" onPress={goToRegister} />
			</View>
		</View>
	);
}

export default function App() {
	const [screen, setScreen] = useState("home");

	if (screen === "about") {
		return <AboutScreen goToHome={() => setScreen("home")} goToLogin={() => setScreen("login")} />;
	}

	if (screen === "login") {
		return <LoginScreen goToHome={() => setScreen("home")} />;
	}
	if (screen === "register") {
		return <RegisterScreen goToRegister={() => setScreen("register")} />;
	}

	return <HomeScreen 
            goToAbout={() => setScreen('about')}
            goToRegister={()=>setScreen('register')}
            />;
}

const styles = StyleSheet.create({
	container: {
		padding: 0,
		margin: 0,
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f5fcff"
	},
	text: {
		fontSize: 20,
		color: "#333",
		marginBottom: 10
	},
	imagemLocal: {
		width: 300,
		maxHeight: "75%",
		maxWidth: "75%",
		height: 300
	},
	title: {
		fontSize: 40,
		color: "#ABC",
		marginBottom: 10
	},
	buttonSpacing: {
		marginTop: 10
	}
});
