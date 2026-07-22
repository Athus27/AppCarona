import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { AppButton, Brand, FormField } from "../components/ui";
import { colors, radius, shadows, spacing, typography } from "../theme";
import { validateLogin, validateRegistration } from "../utils/validators";

function AuthShell({ children }) {
	return (
		<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.screen}>
			<StatusBar style="dark" />
			<View style={[styles.circle, styles.circleOne]} /><View style={[styles.circle, styles.circleTwo]} />
			<ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
				<View style={styles.content}>{children}</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

export function WelcomeScreen({ onLogin, onRegister }) {
	return (
		<AuthShell>
			<View style={styles.welcomeBrand}><Brand /></View>
			<View style={styles.heroIcon}>
				<MaterialCommunityIcons name="map-marker-path" size={72} color={colors.primary} />
				<View style={styles.heroCar}><MaterialCommunityIcons name="car" size={29} color="#fff" /></View>
			</View>
			<Text style={styles.welcomeTitle}>Chegue junto. Volte em boa companhia.</Text>
			<Text style={styles.welcomeText}>Caronas seguras entre a comunidade do ICEA, com rotas e horários que combinam com você.</Text>
			<View style={styles.featureRow}>
				{[["shield-check", "Comunidade UFOP"], ["leaf", "Mais sustentável"], ["cash", "Mais econômico"]].map(([icon, text]) => <View key={text} style={styles.feature}><MaterialCommunityIcons name={icon} size={20} color={colors.accentDark} /><Text style={styles.featureText}>{text}</Text></View>)}
			</View>
			<AppButton title="Entrar" icon="login" onPress={onLogin} />
			<AppButton title="Criar minha conta" variant="secondary" onPress={onRegister} style={styles.secondButton} />
		</AuthShell>
	);
}

export function LoginScreen({ onBack, onRegister, onLogin }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [show, setShow] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	async function submit() {
		const validation = validateLogin(email, password);
		if (validation) return setError(validation);
		setLoading(true);
		const result = await onLogin(email.trim().toLowerCase(), password);
		if (result) setError(result);
		setLoading(false);
	}

	return (
		<AuthShell>
			<Pressable onPress={onBack} style={styles.back}><MaterialCommunityIcons name="arrow-left" size={22} color={colors.text} /></Pressable>
			<Brand compact />
			<View style={styles.heading}><Text style={styles.title}>Bem-vindo de volta</Text><Text style={styles.subtitle}>Entre para encontrar sua próxima carona.</Text></View>
			<View style={styles.card}>
				{error ? <View style={styles.alert}><MaterialCommunityIcons name="alert-circle-outline" size={20} color={colors.error} /><Text style={styles.alertText}>{error}</Text></View> : null}
				<FormField label="E-mail institucional" icon="email-outline" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={(v) => { setEmail(v); setError(""); }} />
				<View>
					<FormField label="Senha" icon="lock-outline" secureTextEntry={!show} value={password} onChangeText={(v) => { setPassword(v); setError(""); }} onSubmitEditing={submit} />
					<Pressable onPress={() => setShow(!show)} style={styles.eye}><MaterialCommunityIcons name={show ? "eye-off-outline" : "eye-outline"} size={21} color={colors.textSecondary} /></Pressable>
				</View>
				<AppButton title={loading ? "Entrando..." : "Entrar"} disabled={loading} icon="arrow-right" onPress={submit} />
			</View>
			<Pressable onPress={onRegister} style={styles.switch}><Text style={styles.switchText}>Ainda não tem conta? </Text><Text style={styles.switchLink}>Cadastre-se</Text></Pressable>
		</AuthShell>
	);
}

export function RegisterScreen({ onBack, onLogin, onRegister }) {
	const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "", role: "both" });
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const set = (key, value) => { setForm((old) => ({ ...old, [key]: value })); setError(""); };
	async function submit() { const validation = validateRegistration(form); if (validation) return setError(validation); setLoading(true); const result = await onRegister(form); if (result) setError(result); setLoading(false); }
	return (
		<AuthShell>
			<Pressable onPress={onBack} style={styles.back}><MaterialCommunityIcons name="arrow-left" size={22} color={colors.text} /></Pressable>
			<Brand compact />
			<View style={styles.heading}><Text style={styles.title}>Crie sua conta</Text><Text style={styles.subtitle}>Use seu e-mail institucional para fazer parte.</Text></View>
			<View style={styles.card}>
				{error ? <View style={styles.alert}><MaterialCommunityIcons name="alert-circle-outline" size={20} color={colors.error} /><Text style={styles.alertText}>{error}</Text></View> : null}
				<FormField label="Nome completo" icon="account-outline" value={form.name} onChangeText={(v) => set("name", v)} />
				<FormField label="E-mail institucional" icon="email-outline" autoCapitalize="none" keyboardType="email-address" placeholder="seunome@aluno.ufop.edu.br" value={form.email} onChangeText={(v) => set("email", v)} />
				<Text style={styles.label}>Quero usar o app como</Text>
				<View style={styles.roles}>{[["passenger", "Passageiro", "account-arrow-right"], ["driver", "Motorista", "steering"], ["both", "Ambos", "swap-horizontal"]].map(([value, label, icon]) => <Pressable key={value} onPress={() => set("role", value)} style={[styles.role, form.role === value && styles.roleActive]}><MaterialCommunityIcons name={icon} size={22} color={form.role === value ? colors.primary : colors.textSecondary} /><Text style={[styles.roleText, form.role === value && styles.roleTextActive]}>{label}</Text></Pressable>)}</View>
				<FormField label="Senha" icon="lock-outline" secureTextEntry value={form.password} onChangeText={(v) => set("password", v)} />
				<FormField label="Confirmar senha" icon="lock-check-outline" secureTextEntry value={form.confirmPassword} onChangeText={(v) => set("confirmPassword", v)} />
				<AppButton title={loading ? "Criando conta..." : "Criar conta"} disabled={loading} icon="account-plus-outline" onPress={submit} />
				<Text style={styles.terms}>Ao continuar, você concorda em usar o app com respeito e responsabilidade.</Text>
			</View>
			<Pressable onPress={onLogin} style={styles.switch}><Text style={styles.switchText}>Já tem conta? </Text><Text style={styles.switchLink}>Entrar</Text></Pressable>
		</AuthShell>
	);
}

const styles = StyleSheet.create({
	screen: { flex: 1, backgroundColor: colors.background }, scroll: { flexGrow: 1, justifyContent: "center", paddingHorizontal: spacing.lg, paddingVertical: 40 }, content: { width: "100%", maxWidth: 480, alignSelf: "center" }, circle: { position: "absolute", borderRadius: 999 }, circleOne: { width: 260, height: 260, right: -120, top: -100, backgroundColor: colors.primaryLight }, circleTwo: { width: 180, height: 180, left: -95, bottom: -75, backgroundColor: "#DCFCE7" },
	welcomeBrand: { alignItems: "center", marginBottom: 38 }, heroIcon: { height: 160, alignItems: "center", justifyContent: "center", marginBottom: 18 }, heroCar: { position: "absolute", bottom: 30, right: "29%", width: 52, height: 52, borderRadius: 18, alignItems: "center", justifyContent: "center", backgroundColor: colors.accentDark, ...shadows.medium }, welcomeTitle: { ...typography.display, fontSize: 34, textAlign: "center", color: colors.text }, welcomeText: { ...typography.body, textAlign: "center", color: colors.textSecondary, marginTop: 12 }, featureRow: { flexDirection: "row", justifyContent: "center", flexWrap: "wrap", gap: 9, marginVertical: 28 }, feature: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#F0FDF4", borderRadius: 999, paddingHorizontal: 10, paddingVertical: 7 }, featureText: { ...typography.caption, fontWeight: "600", color: colors.accentDark }, secondButton: { marginTop: 11 },
	back: { width: 43, height: 43, alignItems: "center", justifyContent: "center", borderRadius: radius.md, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.lg }, heading: { marginVertical: 28 }, title: { ...typography.title, color: colors.text }, subtitle: { ...typography.body, color: colors.textSecondary, marginTop: 6 }, card: { backgroundColor: colors.surface, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, ...shadows.medium }, eye: { position: "absolute", right: 14, top: 41, padding: 5 }, alert: { flexDirection: "row", alignItems: "center", gap: 8, borderRadius: radius.md, padding: 12, marginBottom: 16, backgroundColor: "#FFF1F2" }, alertText: { ...typography.caption, color: colors.error, flex: 1 }, demo: { ...typography.caption, color: colors.textSecondary, textAlign: "center", marginTop: 14 }, switch: { flexDirection: "row", justifyContent: "center", marginTop: 24 }, switchText: { ...typography.body, color: colors.textSecondary }, switchLink: { ...typography.body, color: colors.primary, fontWeight: "700" }, label: { ...typography.label, color: colors.text, marginBottom: 7 }, roles: { flexDirection: "row", gap: 7, marginBottom: 18 }, role: { flex: 1, minHeight: 72, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, alignItems: "center", justifyContent: "center", gap: 4, backgroundColor: colors.surfaceMuted }, roleActive: { borderColor: colors.primary, backgroundColor: colors.primaryLight }, roleText: { ...typography.caption, color: colors.textSecondary, fontWeight: "600" }, roleTextActive: { color: colors.primaryDark }, terms: { ...typography.caption, color: colors.textSecondary, textAlign: "center", marginTop: 14 }
});
