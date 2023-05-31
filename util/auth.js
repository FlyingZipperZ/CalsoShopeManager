import axios from "axios";

// API key for firebase
const API_KEY = "AIzaSyBwY1VXe0nr9xEfWMvDlUippTsIfSSvuoA";

// function that authenticates a user or lets them sign in
export async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;

  return token;
}

// creates a user using the mode signUp (found on the firebase website)
export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

// logs a user in using the mode signInWithPassword (found on the firebase website)
export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}
