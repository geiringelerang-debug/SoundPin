// Firebase-konfigurasjon for web-appen.
// Hentes fra Firebase-konsollen: ⚙ Project settings → General → Your apps → soundpin-web → Config.
// Disse verdiene er ikke hemmelige; tilgang styres av sikkerhetsreglene (firestore.rules, storage.rules).
export const firebaseConfig = {
  apiKey: "",
  authDomain: "soundpin-50207.firebaseapp.com",
  projectId: "soundpin-50207",
  storageBucket: "soundpin-50207.appspot.com",
  messagingSenderId: "",
  appId: ""
};

// Administrator: kan gi roller, se rapporter og slette spor.
export const ADMIN_EMAIL = "geiringelerang@gmail.com";
