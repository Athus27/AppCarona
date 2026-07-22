import {
	createUserWithEmailAndPassword,
	deleteUser,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut
} from "firebase/auth";
import { doc, getDoc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";

import { auth, db } from "../config/firebase";

export function observeAuth(callback) {
	return onAuthStateChanged(auth, callback);
}

export async function signIn(email, password) {
	return signInWithEmailAndPassword(auth, email, password);
}

export async function registerAccount(form) {
	const credential = await createUserWithEmailAndPassword(auth, form.email.trim().toLowerCase(), form.password);
	const roles = form.role === "both" ? ["passenger", "driver"] : [form.role];
	try {
		await setDoc(doc(db, "users", credential.user.uid), {
			name: form.name.trim(),
			email: credential.user.email,
			roles,
			isAdmin: false,
			isBlocked: false,
			rating: 0,
			trips: 0,
			createdAt: serverTimestamp()
		});
	} catch (error) {
		await deleteUser(credential.user).catch(() => {});
		throw error;
	}
	return credential;
}

export async function getUserProfile(uid) {
	const snapshot = await getDoc(doc(db, "users", uid));
	return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
}

export function observeUserProfile(uid, onData, onError) {
	return onSnapshot(doc(db, "users", uid), (snapshot) => {
		onData(snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null);
	}, onError);
}

export async function signOutAccount() {
	return signOut(auth);
}
