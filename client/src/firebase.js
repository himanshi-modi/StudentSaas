import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCgGEJyA420sLDrfd9PbbHKLKp64nkql_Q",
  authDomain: "studentsaas.firebaseapp.com",
  projectId: "studentsaas",
  storageBucket: "studentsaas.firebasestorage.app",
  messagingSenderId: "625738226233",
  appId: "1:625738226233:web:de1598c71eadc7cfa7cbe8"
};

const app = initializeApp(firebaseConfig);

export default app;