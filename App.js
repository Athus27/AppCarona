import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Platform, Pressable, SafeAreaView, StatusBar as NativeStatusBar, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { collection, getDocs } from "firebase/firestore";

import { db } from "./FirebaseConfig";

import { LoginScreen, RegisterScreen, WelcomeScreen } from "./src/screens/AuthScreens";
import {
	AboutScreen, AdminScreen, HomeScreen, ProfileScreen, PublishScreen,
	RatingScreen, ReportScreen, RideDetailsScreen, SearchScreen, TripsScreen
} from "./src/screens/MainScreens";
import { observeAuth, observeUserProfile, registerAccount, signIn, signOutAccount } from "./src/services/authService";
import {
	cancelRide, changeBookingStatus, completeRide, createBooking, createReport,
	createReview, createRide, observeBookings, observeReports, observeRides,
	observeUsers, resolveReport, toggleUserBlock
} from "./src/services/firestoreService";
import { firebaseErrorMessage } from "./src/services/firebaseErrors";
import { colors, shadows, typography } from "./src/theme";

const tabs = [
	{ key: "home", label: "Início", icon: "home-variant-outline", activeIcon: "home-variant" },
	{ key: "search", label: "Buscar", icon: "magnify", activeIcon: "magnify" },
	{ key: "publish", label: "Oferecer", icon: "plus-circle-outline", activeIcon: "plus-circle" },
	{ key: "trips", label: "Viagens", icon: "calendar-outline", activeIcon: "calendar" },
	{ key: "profile", label: "Perfil", icon: "account-outline", activeIcon: "account" }
];

export default function App() {
	const [usuarios, setUsuarios] = useState([]);
	const [erroUsuarios, setErroUsuarios] = useState("");
	const [authScreen, setAuthScreen] = useState("welcome");
	const [authReady, setAuthReady] = useState(false);
	const [firebaseUserId, setFirebaseUserId] = useState(null);
	const [currentUser, setCurrentUser] = useState(null);
	const [tab, setTab] = useState("home");
	const [overlay, setOverlay] = useState(null);
	const [selectedRideId, setSelectedRideId] = useState(null);
	const [rides, setRides] = useState([]);
	const [bookings, setBookings] = useState([]);
	const [reports, setReports] = useState([]);
	const [users, setUsers] = useState([]);
	const [dataError, setDataError] = useState("");
	const profileStop = useRef(null);

	useEffect(() => {
		async function buscarUsuarios() {
			try {
				const resposta = await getDocs(collection(db, "Usuarios"));
				const documentos = resposta.docs.map((documento) => ({
					id: documento.id,
					...documento.data()
				}));
				setUsuarios(documentos);
			} catch (error) {
				setErroUsuarios(firebaseErrorMessage(error));
			}
		}

		buscarUsuarios();
	}, []);

	useEffect(() => {
		const stopAuth = observeAuth((firebaseUser) => {
			profileStop.current?.();
			profileStop.current = null;
			setFirebaseUserId(firebaseUser?.uid || null);
			if (!firebaseUser) {
				setCurrentUser(null);
				setAuthReady(true);
				return;
			}
			profileStop.current = observeUserProfile(firebaseUser.uid, (profile) => {
				setCurrentUser(profile);
				setAuthReady(true);
			}, (error) => {
				setDataError(firebaseErrorMessage(error));
				setAuthReady(true);
			});
		});
		return () => { stopAuth(); profileStop.current?.(); };
	}, []);

	useEffect(() => {
		if (!currentUser?.id) return undefined;
		setDataError("");
		const onError = (error) => setDataError(firebaseErrorMessage(error));
		const stops = [
			observeRides(setRides, onError),
			observeBookings(currentUser.id, setBookings, onError),
			observeReports(currentUser.isAdmin, currentUser.id, setReports, onError)
		];
		if (currentUser.isAdmin) stops.push(observeUsers(setUsers, onError));
		else setUsers([currentUser]);
		return () => stops.forEach((stop) => stop?.());
	}, [currentUser?.id, currentUser?.isAdmin]);

	useEffect(() => {
		if (currentUser?.isBlocked) {
			Alert.alert("Conta bloqueada", "Procure a administração do aplicativo.");
			signOutAccount();
		}
	}, [currentUser?.isBlocked]);

	const selectedRide = rides.find((ride) => ride.id === selectedRideId);
	const selectedBooking = bookings.find((booking) => booking.rideId === selectedRideId && booking.passengerId === currentUser?.id && !["rejected", "cancelled"].includes(booking.status));

	async function login(email, password) {
		try {
			await signIn(email, password);
			setTab("home"); setOverlay(null); return "";
		} catch (error) { return firebaseErrorMessage(error); }
	}

	async function register(form) {
		try {
			await registerAccount(form);
			setTab("home"); setOverlay(null); return "";
		} catch (error) { return firebaseErrorMessage(error); }
	}

	async function logout() {
		try { await signOutAccount(); setOverlay(null); setAuthScreen("welcome"); }
		catch (error) { Alert.alert("Não foi possível sair", firebaseErrorMessage(error)); }
	}

	function navigate(nextTab) { setOverlay(null); setTab(nextTab); }
	function openRide(ride) { setSelectedRideId(ride.id); setOverlay("ride"); }

	async function publishRide(form) {
		try { await createRide(currentUser, form); return ""; }
		catch (error) { return firebaseErrorMessage(error); }
	}

	async function reserveRide() {
		try {
			await createBooking(currentUser, selectedRide);
			Alert.alert("Solicitação enviada", "O motorista poderá aceitar ou recusar sua reserva.");
		} catch (error) { Alert.alert("Não foi possível reservar", firebaseErrorMessage(error)); }
	}

	async function updateBookingStatus(id, status) {
		try {
			const booking = bookings.find((item) => item.id === id);
			if (booking) await changeBookingStatus(booking, status);
		} catch (error) { Alert.alert("Não foi possível atualizar", firebaseErrorMessage(error)); }
	}

	function cancelSelectedRide() {
		Alert.alert("Cancelar carona?", "As solicitações vinculadas também serão canceladas.", [
			{ text: "Voltar", style: "cancel" },
			{ text: "Cancelar carona", style: "destructive", onPress: async () => {
				try {
					await cancelRide(selectedRideId, bookings.filter((booking) => booking.rideId === selectedRideId));
					setOverlay(null); setTab("trips");
				} catch (error) { Alert.alert("Não foi possível cancelar", firebaseErrorMessage(error)); }
			} }
		]);
	}

	async function finishRide(id) {
		try {
			await completeRide(id, currentUser);
			Alert.alert("Viagem concluída", "Agora motorista e passageiros podem se avaliar.");
		} catch (error) { Alert.alert("Não foi possível concluir", firebaseErrorMessage(error)); }
	}

	async function submitReport(data) {
		try {
			await createReport(currentUser, selectedRide, data);
			Alert.alert("Denúncia enviada", "A administração analisará as informações.", [{ text: "OK", onPress: () => setOverlay("ride") }]);
		} catch (error) { Alert.alert("Não foi possível enviar", firebaseErrorMessage(error)); }
	}

	async function submitRating(data) {
		try {
			await createReview(currentUser, selectedRide, data);
			Alert.alert("Avaliação enviada", "Obrigado por ajudar a comunidade!", [{ text: "OK", onPress: () => setOverlay("ride") }]);
		} catch (error) { Alert.alert("Não foi possível avaliar", firebaseErrorMessage(error)); }
	}

	async function handleResolveReport(id) {
		try { await resolveReport(id); }
		catch (error) { Alert.alert("Não foi possível resolver", firebaseErrorMessage(error)); }
	}

	async function handleToggleBlock(id) {
		try { const user = users.find((item) => item.id === id); if (user) await toggleUserBlock(user); }
		catch (error) { Alert.alert("Não foi possível alterar o usuário", firebaseErrorMessage(error)); }
	}

	function renderContent() {
		if (overlay === "ride" && selectedRide) return <RideDetailsScreen ride={selectedRide} currentUser={currentUser} booking={selectedBooking} onBack={() => setOverlay(null)} onReserve={reserveRide} onReport={() => setOverlay("report")} onCancel={cancelSelectedRide} onRate={() => setOverlay("rating")} />;
		if (overlay === "report" && selectedRide) return <ReportScreen targetName={selectedRide.driverName} onBack={() => setOverlay("ride")} onSubmit={submitReport} />;
		if (overlay === "rating" && selectedRide) return <RatingScreen targetName={selectedRide.driverName} onBack={() => setOverlay("ride")} onSubmit={submitRating} />;
		if (overlay === "about") return <AboutScreen onBack={() => setOverlay(null)} />;
		if (overlay === "admin") return <AdminScreen reports={reports} users={users} onBack={() => setOverlay(null)} onResolve={handleResolveReport} onToggleBlock={handleToggleBlock} />;
		const props = { user: currentUser, rides, bookings, onOpenRide: openRide, onNavigate: navigate };
		if (tab === "search") return <SearchScreen rides={rides} onOpenRide={openRide} />;
		if (tab === "publish") return <PublishScreen onPublish={publishRide} />;
		if (tab === "trips") return <TripsScreen {...props} onBookingStatus={updateBookingStatus} onComplete={finishRide} />;
		if (tab === "profile") return <ProfileScreen user={currentUser} onAbout={() => setOverlay("about")} onAdmin={() => setOverlay("admin")} onLogout={logout} />;
		return <HomeScreen {...props} />;
	}

	if (!authReady || (firebaseUserId && !currentUser)) return <LoadingScreen message={dataError || "Carregando seus dados..."} />;

	if (!currentUser) {
		if (authScreen === "login") return <LoginScreen onBack={() => setAuthScreen("welcome")} onRegister={() => setAuthScreen("register")} onLogin={login} />;
		if (authScreen === "register") return <RegisterScreen onBack={() => setAuthScreen("welcome")} onLogin={() => setAuthScreen("login")} onRegister={register} />;
		return <View style={styles.welcomeContainer}>
			<WelcomeScreen onLogin={() => setAuthScreen("login")} onRegister={() => setAuthScreen("register")} />
			<View style={styles.firestorePanel}>
				<Text style={styles.firestoreTitle}>Usuários do Firestore</Text>
				{erroUsuarios ? <Text style={styles.firestoreError}>{erroUsuarios}</Text> : null}
				<FlatList
					data={usuarios}
					ListEmptyComponent={<Text style={styles.firestoreEmpty}>Nenhum documento na coleção Usuarios.</Text>}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<View style={styles.firestoreItem}>
							<Text style={styles.firestoreId}>ID: {item.id}</Text>
							<Text style={styles.firestoreEmail}>Email: {item.Email || "Não informado"}</Text>
						</View>
					)}
				/>
			</View>
		</View>;
	}

	return <SafeAreaView style={styles.app}>
		<StatusBar style="dark" />
		{dataError ? <Pressable onPress={() => setDataError("")} style={styles.errorBanner}><MaterialCommunityIcons name="cloud-alert" size={19} color="#fff" /><Text style={styles.errorBannerText}>{dataError}</Text><MaterialCommunityIcons name="close" size={18} color="#fff" /></Pressable> : null}
		<View style={styles.content}>{renderContent()}</View>
		{!overlay && <BottomNavigation active={tab} bookings={bookings} userId={currentUser.id} onChange={navigate} />}
	</SafeAreaView>;
}

function LoadingScreen({ message }) {
	return <View style={styles.loading}><StatusBar style="dark" /><ActivityIndicator size="large" color={colors.primary} /><Text style={styles.loadingText}>{message}</Text></View>;
}

function BottomNavigation({ active, bookings, userId, onChange }) {
	const pending = useMemo(() => bookings.filter((booking) => booking.driverId === userId && booking.status === "pending").length, [bookings, userId]);
	return <View style={styles.nav}>{tabs.map((item) => <Pressable key={item.key} accessibilityRole="button" accessibilityLabel={item.label} onPress={() => onChange(item.key)} style={styles.navItem}><View>{item.key === "publish" ? <View style={styles.publishIcon}><MaterialCommunityIcons name="plus" size={28} color="#fff" /></View> : <MaterialCommunityIcons name={active === item.key ? item.activeIcon : item.icon} size={24} color={active === item.key ? colors.primary : colors.textSecondary} />}{item.key === "trips" && pending > 0 && <View style={styles.navBadge}><Text style={styles.navBadgeText}>{pending}</Text></View>}</View><Text style={[styles.navText, active === item.key && styles.navTextActive]}>{item.label}</Text></Pressable>)}</View>;
}

const styles = StyleSheet.create({
	app: { flex: 1, backgroundColor: colors.background, paddingTop: Platform.OS === "android" ? NativeStatusBar.currentHeight || 0 : 0 }, content: { flex: 1 },
	welcomeContainer: { flex: 1, backgroundColor: colors.background },
	firestorePanel: { maxHeight: 210, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 18, backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border },
	firestoreTitle: { ...typography.label, fontSize: 16, color: colors.text, marginBottom: 8 },
	firestoreItem: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: colors.border },
	firestoreId: { ...typography.caption, fontWeight: "700", color: colors.text },
	firestoreEmail: { ...typography.body, color: colors.textSecondary },
	firestoreEmpty: { ...typography.caption, color: colors.textSecondary, paddingVertical: 8 },
	firestoreError: { ...typography.caption, color: colors.error, marginBottom: 8 },
	loading: { flex: 1, alignItems: "center", justifyContent: "center", gap: 15, padding: 28, backgroundColor: colors.background }, loadingText: { ...typography.body, color: colors.textSecondary, textAlign: "center" },
	errorBanner: { minHeight: 48, paddingHorizontal: 14, paddingVertical: 9, flexDirection: "row", alignItems: "center", gap: 9, backgroundColor: colors.error }, errorBannerText: { ...typography.caption, color: "#fff", flex: 1 },
	nav: { minHeight: 72, paddingBottom: Platform.OS === "android" ? 7 : 0, flexDirection: "row", alignItems: "center", backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border, ...shadows.medium }, navItem: { flex: 1, alignItems: "center", justifyContent: "center", gap: 3 }, navText: { ...typography.caption, fontSize: 11, color: colors.textSecondary, fontWeight: "600" }, navTextActive: { color: colors.primary },
	publishIcon: { width: 48, height: 48, borderRadius: 18, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary, marginTop: -24, borderWidth: 4, borderColor: colors.surface }, navBadge: { position: "absolute", right: -8, top: -5, minWidth: 18, height: 18, borderRadius: 9, alignItems: "center", justifyContent: "center", backgroundColor: colors.error }, navBadgeText: { color: "#fff", fontSize: 10, fontWeight: "800" }
});
