import {
	addDoc,
	collection,
	doc,
	onSnapshot,
	orderBy,
	query,
	runTransaction,
	serverTimestamp,
	updateDoc,
	where,
	writeBatch
} from "firebase/firestore";

import { db } from "../config/firebase";

function mapSnapshot(snapshot) {
	return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
}

export function observeRides(onData, onError) {
	return onSnapshot(query(collection(db, "rides"), orderBy("createdAt", "desc")), (snapshot) => onData(mapSnapshot(snapshot)), onError);
}

export function observeBookings(uid, onData, onError) {
	let passenger = [];
	let driver = [];
	const emit = () => onData(Array.from(new Map([...passenger, ...driver].map((item) => [item.id, item])).values()));
	const stopPassenger = onSnapshot(query(collection(db, "bookings"), where("passengerId", "==", uid)), (snapshot) => { passenger = mapSnapshot(snapshot); emit(); }, onError);
	const stopDriver = onSnapshot(query(collection(db, "bookings"), where("driverId", "==", uid)), (snapshot) => { driver = mapSnapshot(snapshot); emit(); }, onError);
	return () => { stopPassenger(); stopDriver(); };
}

export function observeReports(isAdmin, uid, onData, onError) {
	const reportsQuery = isAdmin ? query(collection(db, "reports"), orderBy("createdAt", "desc")) : query(collection(db, "reports"), where("reporterId", "==", uid));
	return onSnapshot(reportsQuery, (snapshot) => onData(mapSnapshot(snapshot)), onError);
}

export function observeUsers(onData, onError) {
	return onSnapshot(query(collection(db, "users"), orderBy("name")), (snapshot) => onData(mapSnapshot(snapshot)), onError);
}

export async function createRide(user, form) {
	const seats = Number(form.seats);
	return addDoc(collection(db, "rides"), {
		driverId: user.id,
		driverName: user.name,
		driverRating: user.rating || 0,
		origin: form.origin.trim(),
		destination: form.destination.trim(),
		date: form.date,
		time: form.time,
		seatsTotal: seats,
		seatsAvailable: seats,
		price: Number(form.price.replace(",", ".")) || 0,
		rules: form.rules.trim(),
		vehicle: form.vehicle.trim(),
		status: "open",
		createdAt: serverTimestamp(),
		updatedAt: serverTimestamp()
	});
}

export async function createBooking(user, ride) {
	return addDoc(collection(db, "bookings"), {
		rideId: ride.id,
		driverId: ride.driverId,
		passengerId: user.id,
		passengerName: user.name,
		status: "pending",
		createdAt: serverTimestamp(),
		updatedAt: serverTimestamp()
	});
}

export async function changeBookingStatus(booking, status) {
	if (status !== "accepted") {
		return updateDoc(doc(db, "bookings", booking.id), { status, updatedAt: serverTimestamp() });
	}
	return runTransaction(db, async (transaction) => {
		const rideRef = doc(db, "rides", booking.rideId);
		const bookingRef = doc(db, "bookings", booking.id);
		const rideSnapshot = await transaction.get(rideRef);
		if (!rideSnapshot.exists()) throw new Error("Carona não encontrada.");
		const ride = rideSnapshot.data();
		if (ride.status !== "open" || ride.seatsAvailable < 1) throw new Error("Não há vagas disponíveis.");
		transaction.update(rideRef, { seatsAvailable: ride.seatsAvailable - 1, updatedAt: serverTimestamp() });
		transaction.update(bookingRef, { status: "accepted", updatedAt: serverTimestamp() });
	});
}

export async function cancelRide(rideId, relatedBookings) {
	const batch = writeBatch(db);
	batch.update(doc(db, "rides", rideId), { status: "cancelled", updatedAt: serverTimestamp() });
	relatedBookings.forEach((booking) => batch.update(doc(db, "bookings", booking.id), { status: "cancelled", updatedAt: serverTimestamp() }));
	return batch.commit();
}

export async function completeRide(rideId, user) {
	const batch = writeBatch(db);
	batch.update(doc(db, "rides", rideId), { status: "completed", updatedAt: serverTimestamp() });
	batch.update(doc(db, "users", user.id), { trips: (user.trips || 0) + 1 });
	return batch.commit();
}

export async function createReport(user, ride, data) {
	return addDoc(collection(db, "reports"), {
		reporterId: user.id,
		reporterName: user.name,
		targetId: ride.driverId,
		targetName: ride.driverName,
		reason: data.reason,
		details: data.details.trim(),
		status: "pending",
		createdAt: serverTimestamp()
	});
}

export async function createReview(user, ride, data) {
	return addDoc(collection(db, "reviews"), {
		reviewerId: user.id,
		targetId: ride.driverId,
		rideId: ride.id,
		rating: data.rating,
		comment: data.comment.trim(),
		createdAt: serverTimestamp()
	});
}

export async function resolveReport(id) {
	return updateDoc(doc(db, "reports", id), { status: "resolved", resolvedAt: serverTimestamp() });
}

export async function toggleUserBlock(user) {
	return updateDoc(doc(db, "users", user.id), { isBlocked: !user.isBlocked });
}
