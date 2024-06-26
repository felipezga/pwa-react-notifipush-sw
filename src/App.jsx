import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase/firebaseConfig";
import { toast, ToastContainer } from "react-toastify";
import Message from "./components/Message";
import "react-toastify/dist/ReactToastify.css";

import useSound from 'use-sound';
//import boopSfx from '../sounds/boop.mp3';
import boopSfx from '../src/assets/notificacion.mp3';


function App() {
  const [count, setCount] = useState(0);
  const [tokenf, setTokenf] = useState("Sin Token");
  const { VITE_APP_VAPID_KEY } = "BCqca8VdQFQNno84FMNe6Su_ZOflnmxA48egixE92FSWrUGdMFnpqst8kSf0Anw9g0-o2PAZAInGJUfDcdmFdpo";

  //const [play] = useSound('/meow.mp3');
  //const [play] = useSound(boopSfx);

  const [play] = useSound(boopSfx);

  const handleClick = () => {
    play();
  };


  console.log("requestPermission");
  async function requestPermission() {

    console.log("NOTIFICATION API");
    //requesting permission using Notification API
    const permission = await Notification.requestPermission();

    console.log("EMPEZAMOS PERMISO");
    if (permission === "granted") {
      
      /*const newSw = await navigator.serviceWorker.register(
        './firebase-messaging-sw'
      );*/
      /*if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .register( '/pwa-react-notifipush-sw/firebase-messaging-sw.js' )
          .then(function (registration) {
            console.log("Registration successful, scope is:", registration.scope);
          })
          .catch(function (err) {
            console.log("Service worker registration failed, error:", err);
          });
      }*/
      console.log("SWORKER");
      // /homepage/basename/firebase-messaging-sw.js'

      const token = await getToken(messaging, {
        vapidKey: VITE_APP_VAPID_KEY,
      });


      //We can send token to server
      console.log("Token generated : ", token);
      setTokenf(token);
    } else if (permission === "denied") {
      //notifications are blocked
      alert("You denied for the notification");
    }else{
      alert("No funcion");
      console.log("no funciona");
    }
  }

  useEffect(() => {
    requestPermission();
  }, []);

  onMessage(messaging, (payload) => {
    

    play();
    /*
    //getAudioContext().resume();
    var constraints = { audio: true }
    navigator.mediaDevices.getUserMedia(constraints)
.then((stream) => {
    var audioContext = new AudioContext();
    {play};
})*/
    
    console.log("incoming msg");
    toast(<Message notification={payload.notification} />);
  });

  // From your client pages:
const channel = new BroadcastChannel('sw-messages');
channel.addEventListener('message', event => {
    console.log('Received', event.data);
    play();
});

function isIOS() {
  const browserInfo = navigator.userAgent.toLowerCase();
  
  console.log(browserInfo)
  if (browserInfo.match('iphone') || browserInfo.match('ipad')) {
    console.log("true");
    return true;
  }
  if (['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform)) {
    console.log("true");
    return true;
  } 
  console.log("false");
  return false;
}


const iosClick = async() => {
  console.log('this is:', this);

  console.log("click permiso ios");

  if(isIOS()){

    const token = await getToken(messaging, {
      vapidKey: VITE_APP_VAPID_KEY,
    });
    /*let token = await messaging.getToken({
      vapidKey: VITE_APP_VAPID_KEY,
    });*/
    console.log("Token generated x button: ", token);
      setTokenf(token);

  } else{
    let permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted. Requesting for token.");
      
      const token = await getToken(messaging, {
        vapidKey: VITE_APP_VAPID_KEY,
      });
      /*let token = await messaging.getToken({
        vapidKey: VITE_APP_VAPID_KEY,
      });*/
      console.log("Token generated x button: ", token);
        setTokenf(token);
      // do something with the FCM token
    } else {
      console.log("Notification permission denied");
      // Handle denied permission
    }
    

  }
  
  
};


  return (
    <>
      <div>
      <button onClick={play}>Boop!</button>;
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React PWA Notificacion Push con firebase v.14</h1>
      <h3> { tokenf }</h3>
      <div className="card">
        <button onClick={ iosClick }>
          Solicitar permiso iOS
        </button>
        
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <ToastContainer />
    </>
  );
}

export default App;
