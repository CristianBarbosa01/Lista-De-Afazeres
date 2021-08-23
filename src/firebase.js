import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyANeVM-tDxTtsHjoLU7D9TssnXiNZfnZos",
  authDomain: "lista-de-tarefas-9ce49.firebaseapp.com",
  databaseURL: "https://lista-de-tarefas-9ce49-default-rtdb.firebaseio.com/",
  projectId: "lista-de-tarefas-9ce49",
  storageBucket: "lista-de-tarefas-9ce49.appspot.com",
  messagingSenderId: "G-ET94J7JV7T",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const database = firebaseApp.database();
export { auth, database };

export default firebase;
