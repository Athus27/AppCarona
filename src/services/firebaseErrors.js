const messages = {
	"auth/email-already-in-use": "Este e-mail já está cadastrado.",
	"auth/invalid-credential": "E-mail ou senha incorretos.",
	"auth/invalid-email": "O e-mail informado é inválido.",
	"auth/network-request-failed": "Não foi possível conectar ao Firebase. Verifique sua internet.",
	"auth/operation-not-allowed": "Ative o provedor E-mail/senha no Firebase Authentication.",
	"auth/too-many-requests": "Muitas tentativas. Aguarde alguns minutos e tente novamente.",
	"auth/user-disabled": "Esta conta foi desativada no Firebase Authentication.",
	"auth/weak-password": "A senha não atende à política configurada no Firebase.",
	"firestore/permission-denied": "Operação bloqueada pelas regras do Firestore.",
	"permission-denied": "Operação bloqueada pelas regras do Firestore.",
	"failed-precondition": "Crie o banco Cloud Firestore no Console do Firebase antes de continuar.",
	"unavailable": "O Firebase está temporariamente indisponível. Tente novamente."
};

export function firebaseErrorMessage(error) {
	return messages[error?.code] || error?.message || "Não foi possível concluir a operação.";
}
