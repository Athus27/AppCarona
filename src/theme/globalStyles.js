import { StyleSheet } from "react-native";

import { colors } from "./colors";
import { radius } from "./radius";
import { shadows } from "./shadows";
import { spacing } from "./spacing";
import { typography } from "./typography";

export const globalStyles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: colors.background
	},

	centeredScreen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.background,
		padding: spacing.lg
	},

	title: {
		...typography.title,
		color: colors.text,
		marginBottom: spacing.sm
	},

	text: {
		...typography.body,
		color: colors.textSecondary
	},

	card: {
		width: "100%",
		backgroundColor: colors.surface,
		borderRadius: radius.xl,
		padding: spacing.lg,
		borderWidth: 1,
		borderColor: colors.border,
		...shadows.medium
	},

	input: {
		width: "100%",
		backgroundColor: colors.surface,
		borderWidth: 1,
		borderColor: colors.border,
		borderRadius: radius.md,
		padding: spacing.md,
		...typography.body,
		color: colors.text,
		marginBottom: spacing.md
	},

	primaryButton: {
		minHeight: 52,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: spacing.sm,
		backgroundColor: colors.primary,
		borderRadius: radius.md,
		paddingHorizontal: spacing.lg,
		...shadows.small
	},

	primaryButtonText: {
		...typography.label,
		fontSize: 16,
		color: colors.textOnPrimary
	},

	errorText: {
		color: colors.error,
		...typography.caption,
		marginBottom: spacing.sm
	}
});
