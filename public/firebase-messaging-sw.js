importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);



console.log("CARGANDO");
//import useSound from 'use-sound';
//import boopSfx from '../../sounds/boop.mp3';

// "Default" Firebase configuration (prevents errors)
/*const defaultConfig = {
  apiKey: true,
  projectId: true,
  messagingSenderId: true,
  appId: true,
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

// Initialize Firebase app
//firebase.initializeApp(defaultConfig);
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

//const [play] = useSound(boopSfx);
//const [play] = useSound('/meow.mp3');

//Listens for background notifications


messaging.onBackgroundMessage((payload) => {
  console.log("Received background message: ", payload);

  //{play}
  //let sound: HTMLAudioElement;
  /*let sound = new Audio();
  sound.src = '../src/assets/notificacion.mp3';
  console.log(sound.src )
  sound.load();
  sound.play();*/

  console.log("vamossss");

  //customise notification
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || "/icon.png",
    sound: 'http://localhost:5173/src/assets/notificacion.mp3'
  };
  console.log(notificationOptions)
  const channel = new BroadcastChannel('sw-messages');
channel.postMessage({title: 'Hello from SW'});

  self.registration.showNotification(notificationTitle, notificationOptions);
});

