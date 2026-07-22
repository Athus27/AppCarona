import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { colors, radius, shadows, spacing, typography } from "../theme";

export function Brand({ compact = false }) {
	return (
		<View style={styles.brand}>
			<View style={[styles.brandIcon, compact && styles.brandIconCompact]}>
				<MaterialCommunityIcons name="car-multiple" size={compact ? 22 : 30} color="#fff" />
			</View>
			<View>
				<Text style={[styles.brandName, compact && styles.brandNameCompact]}>Caronas ICEA</Text>
				{!compact && <Text style={styles.brandTagline}>Sua rota. Nossa comunidade.</Text>}
			</View>
		</View>
	);
}

export function AppButton({ title, icon, onPress, variant = "primary", disabled = false, style }) {
	return (
		<Pressable
			disabled={disabled}
			onPress={onPress}
			style={({ pressed }) => [
				styles.button,
				variant === "secondary" && styles.buttonSecondary,
				variant === "danger" && styles.buttonDanger,
				variant === "ghost" && styles.buttonGhost,
				disabled && styles.disabled,
				pressed && styles.pressed,
				style
			]}
		>
			{icon && <MaterialCommunityIcons name={icon} size={20} color={variant === "primary" || variant === "danger" ? "#fff" : colors.primary} />}
			<Text style={[styles.buttonText, (variant === "secondary" || variant === "ghost") && styles.buttonTextSecondary]}>{title}</Text>
		</Pressable>
	);
}

export function FormField({ label, icon, error, style, ...props }) {
	return (
		<View style={[styles.field, style]}>
			{label && <Text style={styles.label}>{label}</Text>}
			<View style={[styles.inputWrap, error && styles.inputError]}>
				{icon && <MaterialCommunityIcons name={icon} size={20} color={colors.textSecondary} />}
				<TextInput placeholderTextColor={colors.textSecondary} style={styles.input} {...props} />
			</View>
			{error && <Text style={styles.error}>{error}</Text>}
		</View>
	);
}

export function ScreenHeader({ title, subtitle, onBack, action }) {
	return (
		<View style={styles.header}>
			<View style={styles.headerRow}>
				{onBack && (
					<Pressable accessibilityLabel="Voltar" hitSlop={10} onPress={onBack} style={styles.iconButton}>
						<MaterialCommunityIcons name="arrow-left" size={23} color={colors.text} />
					</Pressable>
				)}
				<View style={styles.headerText}>
					<Text style={styles.headerTitle}>{title}</Text>
					{subtitle && <Text style={styles.headerSubtitle}>{subtitle}</Text>}
				</View>
				{action}
			</View>
		</View>
	);
}

export function EmptyState({ icon = "car-off", title, text, action }) {
	return (
		<View style={styles.empty}>
			<View style={styles.emptyIcon}><MaterialCommunityIcons name={icon} size={34} color={colors.primary} /></View>
			<Text style={styles.emptyTitle}>{title}</Text>
			<Text style={styles.emptyText}>{text}</Text>
			{action}
		</View>
	);
}

export function Badge({ text, tone = "info" }) {
	return <View style={[styles.badge, styles[`badge_${tone}`]]}><Text style={[styles.badgeText, styles[`badgeText_${tone}`]]}>{text}</Text></View>;
}

export function RideCard({ ride, onPress }) {
	return (
		<Pressable onPress={() => onPress(ride)} style={({ pressed }) => [styles.rideCard, pressed && styles.pressed]}>
			<View style={styles.rideTop}>
				<View style={styles.avatar}><Text style={styles.avatarText}>{ride.driverName?.charAt(0) || "M"}</Text></View>
				<View style={styles.grow}>
					<Text style={styles.driverName}>{ride.driverName}</Text>
					<View style={styles.inline}><MaterialCommunityIcons name="star" size={15} color={colors.warning} /><Text style={styles.meta}>{ride.driverRating || "Novo"}</Text></View>
				</View>
				<Text style={styles.price}>R$ {Number(ride.price).toFixed(2).replace(".", ",")}</Text>
			</View>
			<View style={styles.route}>
				<View style={styles.routeLine}><View style={styles.dot} /><View style={styles.line} /><MaterialCommunityIcons name="map-marker" size={18} color={colors.accentDark} /></View>
				<View style={styles.grow}><Text style={styles.place}>{ride.origin}</Text><Text style={[styles.place, styles.destination]}>{ride.destination}</Text></View>
			</View>
			<View style={styles.rideFooter}>
				<View style={styles.inline}><MaterialCommunityIcons name="calendar-outline" size={17} color={colors.textSecondary} /><Text style={styles.meta}>{ride.date}</Text></View>
				<View style={styles.inline}><MaterialCommunityIcons name="clock-outline" size={17} color={colors.textSecondary} /><Text style={styles.meta}>{ride.time}</Text></View>
				<View style={styles.inline}><MaterialCommunityIcons name="seat-passenger" size={17} color={colors.textSecondary} /><Text style={styles.meta}>{ride.seatsAvailable} vaga{ride.seatsAvailable !== 1 ? "s" : ""}</Text></View>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	brand: { flexDirection: "row", alignItems: "center", gap: 12 },
	brandIcon: { width: 56, height: 56, borderRadius: 18, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary, ...shadows.small },
	brandIconCompact: { width: 42, height: 42, borderRadius: 13 },
	brandName: { ...typography.subtitle, fontWeight: "800", color: colors.text },
	brandNameCompact: { fontSize: 18 },
	brandTagline: { ...typography.caption, color: colors.textSecondary },
	button: { minHeight: 52, paddingHorizontal: 20, borderRadius: radius.md, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: colors.primary },
	buttonSecondary: { backgroundColor: colors.primaryLight, borderWidth: 1, borderColor: "#BFDBFE" },
	buttonDanger: { backgroundColor: colors.error },
	buttonGhost: { backgroundColor: "transparent" },
	buttonText: { ...typography.label, fontSize: 16, color: "#fff" },
	buttonTextSecondary: { color: colors.primary },
	disabled: { opacity: 0.45 }, pressed: { opacity: 0.72 },
	field: { marginBottom: spacing.md }, label: { ...typography.label, color: colors.text, marginBottom: 7 },
	inputWrap: { minHeight: 52, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surfaceMuted, flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 14 },
	inputError: { borderColor: colors.error }, input: { ...typography.body, color: colors.text, flex: 1, paddingVertical: 12, ...Platform.select({ web: { outlineStyle: "none" } }) },
	error: { ...typography.caption, color: colors.error, marginTop: 5 },
	header: { paddingHorizontal: spacing.lg, paddingTop: spacing.mdSmall, paddingBottom: spacing.md },
	headerRow: { minHeight: 52, flexDirection: "row", alignItems: "center", gap: 12 }, iconButton: { width: 42, height: 42, borderRadius: 13, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
	headerText: { flex: 1 }, headerTitle: { ...typography.title, fontSize: 25, color: colors.text }, headerSubtitle: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },
	empty: { alignItems: "center", padding: 32 }, emptyIcon: { width: 70, height: 70, borderRadius: 24, backgroundColor: colors.primaryLight, alignItems: "center", justifyContent: "center", marginBottom: 16 }, emptyTitle: { ...typography.subtitle, color: colors.text, textAlign: "center" }, emptyText: { ...typography.body, color: colors.textSecondary, textAlign: "center", marginTop: 6, marginBottom: 20 },
	badge: { borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 5, alignSelf: "flex-start" }, badge_info: { backgroundColor: colors.primaryLight }, badge_success: { backgroundColor: "#DCFCE7" }, badge_warning: { backgroundColor: "#FEF3C7" }, badge_error: { backgroundColor: "#FFE4E6" }, badgeText: { ...typography.caption, fontWeight: "700" }, badgeText_info: { color: colors.primaryDark }, badgeText_success: { color: colors.accentDark }, badgeText_warning: { color: "#A16207" }, badgeText_error: { color: colors.error },
	rideCard: { padding: 18, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, marginBottom: 14, ...shadows.small }, rideTop: { flexDirection: "row", alignItems: "center", gap: 11 }, avatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.primaryLight, alignItems: "center", justifyContent: "center" }, avatarText: { ...typography.subtitle, color: colors.primaryDark }, grow: { flex: 1 }, driverName: { ...typography.label, color: colors.text }, inline: { flexDirection: "row", alignItems: "center", gap: 5 }, meta: { ...typography.caption, color: colors.textSecondary }, price: { ...typography.subtitle, color: colors.primary },
	route: { flexDirection: "row", gap: 12, marginVertical: 17 }, routeLine: { width: 18, alignItems: "center" }, dot: { width: 9, height: 9, borderRadius: 5, borderWidth: 2, borderColor: colors.primary, marginTop: 5 }, line: { width: 1, flex: 1, minHeight: 18, backgroundColor: colors.border, marginVertical: 2 }, place: { ...typography.body, fontWeight: "600", color: colors.text }, destination: { marginTop: 11 }, rideFooter: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 13, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", gap: 9 }
});
