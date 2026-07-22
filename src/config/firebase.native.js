import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { firebaseConfig } from "./firebaseConfig";

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

let authInstance;
try {
	authInstance = initializeAuth(firebaseApp, {
		persistence: getReactNativePersistence(AsyncStorage)
	});
} catch {
	authInstance = getAuth(firebaseApp);
}

export const auth = authInstance;
export const db = getFirestore(firebaseApp);
