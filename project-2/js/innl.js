const firebaseConfig = {
    apiKey: "AIzaSyB2G6me0hyP9lcRFuG-DtQOLpJVaTNDcjI",
    authDomain: "curency-trans.firebaseapp.com",
    databaseURL: "https://curency-trans.firebaseio.com",
    projectId: "curency-trans",
    storageBucket: "curency-trans.appspot.com",
    messagingSenderId: "992432079602",
    appId: "1:992432079602:web:917d56b2913b6a6770c66b",
    measurementId: "G-RLNJNBHNWM"
    };
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  firebase.analytics();