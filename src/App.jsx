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
  const { VITE_APP_VAPID_KEY } = "BCqca8VdQFQNno84FMNe6Su_ZOflnmxA48egixE92FSWrUGdMFnpqst8kSf0Anw9g0-o2PAZAInGJUfDcdmFdpo";

  //const [play] = useSound('/meow.mp3');
  //const [play] = useSound(boopSfx);

  const [play] = useSound(boopSfx);

  const handleClick = () => {
    play();
  };


  async function requestPermission() {
    //requesting permission using Notification API
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      
      /*const newSw = await navigator.serviceWorker.register(
        './firebase-messaging-sw'
      );*/
      // /homepage/basename/firebase-messaging-sw.js'

      const token = await getToken(messaging, {
        vapidKey: VITE_APP_VAPID_KEY,
      });


      //We can send token to server
      console.log("Token generated : ", token);
    } else if (permission === "denied") {
      //notifications are blocked
      alert("You denied for the notification");
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
      <h1>Vite + React</h1>
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
