export function isInstitutionalEmail(email) {
	return /^[^\s@]+@(aluno\.)?ufop\.edu\.br$/i.test(email.trim());
}

export function validateLogin(email, password) {
	if (!email.trim() || !password) return "Preencha o e-mail e a senha.";
	if (!isInstitutionalEmail(email)) return "Use um e-mail institucional da UFOP.";
	if (password.length < 6) return "A senha deve ter pelo menos 6 caracteres.";
	return "";
}

export function validateRegistration(form) {
	if (!form.name.trim()) return "Informe seu nome completo.";
	if (!isInstitutionalEmail(form.email)) return "Use um e-mail @ufop.edu.br ou @aluno.ufop.edu.br.";
	if (form.password.length < 6) return "A senha deve ter pelo menos 6 caracteres.";
	if (form.password !== form.confirmPassword) return "As senhas não coincidem.";
	if (!form.role) return "Escolha como deseja usar o aplicativo.";
	return "";
}
