// Firebase-konfigurasjon for web-appen.
// Hentes fra Firebase-konsollen: ⚙ Project settings → General → Your apps → soundpin-web → Config.
// Disse verdiene er ikke hemmelige; tilgang styres av sikkerhetsreglene (firestore.rules, storage.rules).
export const firebaseConfig = {
  apiKey: "AIzaSyCdplHHuoeueYCdjoRVOf1v7skeCSuw5RQ",
  authDomain: "soundpin-50207.firebaseapp.com",
  databaseURL: "https://soundpin-50207-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "soundpin-50207",
  storageBucket: "soundpin-50207.appspot.com",
  messagingSenderId: "446143661228",
  appId: "1:446143661228:web:dc3e9da32ff02bd7d40b09",
  measurementId: "G-5SEC7THLPR"
};

// Administrator: kan gi roller, se rapporter og slette spor.
export const ADMIN_EMAIL = "geiringelerang@gmail.com";
