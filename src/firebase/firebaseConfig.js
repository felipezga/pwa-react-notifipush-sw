import { initializeApp } from "firebase/app";

import { getMessaging } from "firebase/messaging";

//Firebase Config values imported from .env file
/*const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_APP_ID,
  measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID,
};*/

const firebaseConfig = {
  apiKey: "AIzaSyD6DPQoBp_idPcsyHFaW8iUK40gcMw2vNg",
  authDomain: "pwa-react-5ec1f.firebaseapp.com",
  projectId: "pwa-react-5ec1f",
  storageBucket: "pwa-react-5ec1f.appspot.com",
  messagingSenderId: "513286048550",
  appId: "1:513286048550:web:a0e4ade319e56e5458cfe7",
  measurementId: "G-RG94JGDHQG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Messaging service
export const messaging = getMessaging(app);
