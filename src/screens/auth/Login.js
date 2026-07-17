import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View
} from "react-native";
import { StatusBar } from "expo-status-bar";

import {
	colors,
	globalStyles,
	radius,
	spacing,
	typography
} from "../../theme";

export default function LoginScreen({ goToHome }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : undefined}
			style={globalStyles.screen}
		>
			<StatusBar style="dark" />

			<View style={[styles.decorativeCircle, styles.circleTop]} />
			<View style={[styles.decorativeCircle, styles.circleBottom]} />

			<ScrollView
				contentContainerStyle={styles.scrollContent}
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.content}>
					<Pressable
						accessibilityLabel="Voltar para a tela inicial"
						hitSlop={12}
						onPress={goToHome}
						style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
					>
						<MaterialCommunityIcons
							name="arrow-left"
							size={22}
							color={colors.text}
						/>
					</Pressable>

					<View style={styles.brand}>
						<View style={styles.logo}>
							<MaterialCommunityIcons
								name="car-multiple"
								size={30}
								color={colors.textOnPrimary}
							/>
						</View>
						<Text style={styles.brandName}>Caronas ICEA</Text>
					</View>

					<View style={styles.heading}>
						<Text style={styles.title}>Bem-vindo de volta</Text>
						<Text style={globalStyles.text}>
							Entre para encontrar sua próxima carona.
						</Text>
					</View>

					<View style={globalStyles.card}>
						<View style={styles.fieldGroup}>
							<Text style={styles.label}>E-mail</Text>
							<View style={styles.inputContainer}>
								<MaterialCommunityIcons
									name="email-outline"
									size={21}
									color={colors.textSecondary}
								/>
								<TextInput
									autoCapitalize="none"
									autoComplete="email"
									keyboardType="email-address"
									onChangeText={setEmail}
									placeholder="nome@universidade.edu.br"
									placeholderTextColor={colors.textSecondary}
									style={styles.input}
									value={email}
								/>
							</View>
						</View>

						<View style={styles.fieldGroup}>
							<View style={styles.labelRow}>
								<Text style={styles.label}>Senha</Text>
								<Pressable hitSlop={8}>
									<Text style={styles.link}>Esqueci minha senha</Text>
								</Pressable>
							</View>
							<View style={styles.inputContainer}>
								<MaterialCommunityIcons
									name="lock-outline"
									size={21}
									color={colors.textSecondary}
								/>
								<TextInput
									autoComplete="password"
									onChangeText={setPassword}
									placeholder="Digite sua senha"
									placeholderTextColor={colors.textSecondary}
									secureTextEntry={!showPassword}
									style={styles.input}
									value={password}
								/>
								<Pressable
									accessibilityLabel={showPassword ? "Ocultar senha" : "Mostrar senha"}
									hitSlop={8}
									onPress={() => setShowPassword((current) => !current)}
								>
									<MaterialCommunityIcons
										name={showPassword ? "eye-off-outline" : "eye-outline"}
										size={21}
										color={colors.textSecondary}
									/>
								</Pressable>
							</View>
						</View>

						<Pressable
							style={({ pressed }) => [
								globalStyles.primaryButton,
								pressed && styles.primaryButtonPressed
							]}
						>
							<Text style={globalStyles.primaryButtonText}>Entrar</Text>
							<MaterialCommunityIcons
								name="arrow-right"
								size={20}
								color={colors.textOnPrimary}
							/>
						</Pressable>
					</View>

					<View style={styles.signUpRow}>
						<Text style={styles.signUpText}>Ainda não tem uma conta?</Text>
						<Pressable hitSlop={8}>
							<Text style={styles.signUpLink}>Criar conta</Text>
						</Pressable>
					</View>

					<View style={styles.safetyMessage}>
						<MaterialCommunityIcons
							name="shield-check-outline"
							size={18}
							color={colors.accentDark}
						/>
						<Text style={styles.safetyText}>Sua segurança vem primeiro.</Text>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	scrollContent: {
		flexGrow: 1,
		justifyContent: "center",
		paddingHorizontal: spacing.lg,
		paddingVertical: spacing.xl
	},
	content: {
		width: "100%",
		maxWidth: 460,
		alignSelf: "center"
	},
	decorativeCircle: {
		position: "absolute",
		borderRadius: radius.pill,
		backgroundColor: colors.primaryLight,
		opacity: 0.7
	},
	circleTop: {
		width: 220,
		height: 220,
		top: -110,
		right: -80
	},
	circleBottom: {
		width: 160,
		height: 160,
		bottom: -90,
		left: -70,
		backgroundColor: "#DCFCE7"
	},
	backButton: {
		width: 44,
		height: 44,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.surface,
		borderWidth: 1,
		borderColor: colors.border,
		borderRadius: radius.md,
		marginBottom: spacing.xl
	},
	pressed: {
		opacity: 0.65
	},
	brand: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.mdSmall,
		marginBottom: spacing.xl
	},
	logo: {
		width: 54,
		height: 54,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.primary,
		borderRadius: radius.lg
	},
	brandName: {
		...typography.subtitle,
		color: colors.text
	},
	heading: {
		marginBottom: spacing.lg
	},
	title: {
		...typography.title,
		color: colors.text,
		marginBottom: spacing.sm
	},
	fieldGroup: {
		marginBottom: spacing.md
	},
	labelRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	label: {
		...typography.label,
		color: colors.text,
		marginBottom: spacing.sm
	},
	link: {
		...typography.caption,
		fontWeight: "600",
		color: colors.primary,
		marginBottom: spacing.sm
	},
	inputContainer: {
		minHeight: 54,
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.mdSmall,
		backgroundColor: colors.surfaceMuted,
		borderWidth: 1,
		borderColor: colors.border,
		borderRadius: radius.md,
		paddingHorizontal: spacing.md
	},
	input: {
		flex: 1,
		...typography.body,
		color: colors.text,
		paddingVertical: spacing.mdSmall,
		...Platform.select({ web: { outlineStyle: "none" } })
	},
	primaryButtonPressed: {
		backgroundColor: colors.primaryDark,
		transform: [{ scale: 0.99 }]
	},
	signUpRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		gap: spacing.xs,
		marginTop: spacing.lg
	},
	signUpText: {
		...typography.body,
		color: colors.textSecondary
	},
	signUpLink: {
		...typography.body,
		fontWeight: "700",
		color: colors.primary
	},
	safetyMessage: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: spacing.sm,
		marginTop: spacing.xl
	},
	safetyText: {
		...typography.caption,
		color: colors.accentDark
	}
});
