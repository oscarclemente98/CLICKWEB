//#region src/lib-auth.ts
var TOKEN_KEY = "clickweb_token";
var USER_KEY = "clickweb_user";
function getStoredToken() {
	if (typeof window === "undefined") return "";
	return localStorage.getItem(TOKEN_KEY) || "";
}
function setStoredAuth(token, user) {
	if (typeof window === "undefined") return;
	localStorage.setItem(TOKEN_KEY, token);
	localStorage.setItem(USER_KEY, JSON.stringify(user));
}
function clearStoredAuth() {
	if (typeof window === "undefined") return;
	localStorage.removeItem(TOKEN_KEY);
	localStorage.removeItem(USER_KEY);
}
function getStoredUser() {
	if (typeof window === "undefined") return null;
	const raw = localStorage.getItem(USER_KEY);
	if (!raw) return null;
	try {
		return JSON.parse(raw);
	} catch {
		return null;
	}
}
async function api(url, init = {}) {
	const token = getStoredToken();
	const headers = new Headers(init.headers || {});
	if (token) headers.set("Authorization", `Bearer ${token}`);
	if (!headers.has("Content-Type") && init.body) headers.set("Content-Type", "application/json");
	const res = await fetch(url, {
		...init,
		headers
	});
	const text = await res.text();
	const data = text ? (() => {
		try {
			return JSON.parse(text);
		} catch {
			return text;
		}
	})() : null;
	if (!res.ok) {
		const msg = typeof data === "object" && data && "error" in data ? data.error : "Error";
		throw new Error(msg);
	}
	return data;
}
//#endregion
export { setStoredAuth as a, getStoredUser as i, clearStoredAuth as n, getStoredToken as r, api as t };
