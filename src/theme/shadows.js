import { Platform } from "react-native";

export const shadows = {
	small: Platform.select({
		ios: {
			shadowColor: "#0F172A",
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.06,
			shadowRadius: 6
		},
		android: { elevation: 2 },
		web: { boxShadow: "0 2px 12px rgba(15, 23, 42, 0.06)" }
	}),
	medium: Platform.select({
		ios: {
			shadowColor: "#0F172A",
			shadowOffset: { width: 0, height: 8 },
			shadowOpacity: 0.1,
			shadowRadius: 20
		},
		android: { elevation: 6 },
		web: { boxShadow: "0 12px 36px rgba(15, 23, 42, 0.10)" }
	})
};
