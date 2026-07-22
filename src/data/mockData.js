export const demoUsers = [
	{
		id: "user-demo",
		name: "Marina Souza",
		email: "aluno@ufop.edu.br",
		password: "123456",
		roles: ["passenger", "driver"],
		course: "Engenharia de Computação",
		rating: 4.9,
		rips: 18,
		isAdmin: false,
		isBlocked: false
	},
	{
		id: "admin-demo",
		name: "Administrador ICEA",
		email: "admin@ufop.edu.br",
		password: "123456",
		roles: ["passenger", "driver"],
		course: "Administração",
		rating: 5,
		trips: 0,
		isAdmin: true,
		isBlocked: false
	}
];

export const initialRides = [
	{
		id: "ride-1",
		driverId: "driver-ana",
		driverName: "Ana Clara",
		driverRating: 4.9,
		origin: "Centro, João Monlevade",
		destination: "ICEA / UFOP",
		date: "18/07/2026",
		time: "07:10",
		seatsTotal: 3,
		seatsAvailable: 2,
		price: 6,
		rules: "Sem fumar. Mochilas são bem-vindas.",
		vehicle: "Fiat Argo • Prata",
		status: "open"
	},
	{
		id: "ride-2",
		driverId: "driver-lucas",
		driverName: "Lucas Mendes",
		driverRating: 4.7,
		origin: "Carneirinhos",
		destination: "ICEA / UFOP",
		date: "18/07/2026",
		time: "12:40",
		seatsTotal: 4,
		seatsAvailable: 1,
		price: 5.5,
		rules: "Saída pontual.",
		vehicle: "Chevrolet Onix • Branco",
		status: "open"
	},
	{
		id: "ride-3",
		driverId: "driver-beatriz",
		driverName: "Beatriz Lima",
		driverRating: 5,
		origin: "ICEA / UFOP",
		destination: "Centro, João Monlevade",
		date: "19/07/2026",
		time: "17:50",
		seatsTotal: 3,
		seatsAvailable: 3,
		price: 6,
		rules: "Posso aguardar até 5 minutos.",
		vehicle: "Renault Kwid • Azul",
		status: "open"
	},
	{
		id: "ride-completed-demo",
		driverId: "driver-carlos",
		driverName: "Carlos Rocha",
		driverRating: 4.8,
		origin: "ICEA / UFOP",
		destination: "Centro, João Monlevade",
		date: "15/07/2026",
		time: "18:00",
		seatsTotal: 3,
		seatsAvailable: 0,
		price: 6,
		rules: "Viagem concluída.",
		vehicle: "Volkswagen Polo • Preto",
		status: "completed"
	}
];

export const initialBookings = [
	{
		id: "booking-1",
		rideId: "ride-owned-demo",
		driverId: "user-demo",
		passengerId: "passenger-1",
		passengerName: "Pedro Alves",
		status: "pending"
	},
	{
		id: "booking-completed-demo",
		rideId: "ride-completed-demo",
		driverId: "driver-carlos",
		passengerId: "user-demo",
		passengerName: "Marina Souza",
		status: "accepted"
	}
];

export const initialReports = [
	{
		id: "report-1",
		reporterName: "Aluno ICEA",
		targetName: "Usuário de demonstração",
		reason: "Comportamento inadequado",
		details: "O motorista cancelou a viagem sem aviso.",
		status: "pending"
	}
];

export const ownedDemoRide = {
	id: "ride-owned-demo",
	driverId: "user-demo",
	driverName: "Marina Souza",
	driverRating: 4.9,
	origin: "Loanda",
	destination: "ICEA / UFOP",
	date: "20/07/2026",
	time: "07:00",
	seatsTotal: 3,
	seatsAvailable: 2,
	price: 5,
	rules: "Sem fumar no veículo.",
	vehicle: "Honda Fit • Cinza",
	status: "open"
};
