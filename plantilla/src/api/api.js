// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, updateDoc, doc } from "firebase/firestore";



import { collection, getDocs, query, where, addDoc } from "firebase/firestore"




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzoKpMhpukC5xfXrAIjmpOzJKrpJsBqZc",
  authDomain: "camisetas-b52aa.firebaseapp.com",
  projectId: "camisetas-b52aa",
  storageBucket: "camisetas-b52aa.appspot.com",
  messagingSenderId: "1081937678970",
  appId: "1:1081937678970:web:c26bb14b162ba7aa1521c3",
  measurementId: "G-52YFN2895Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



export const funcionEjemplo = async () => {
  let data = { nombre: 'Adan', apellido: 'Navarrete' }
  let dataRef = await addDoc(collection(db, "Ejemplo"), data);
  return dataRef.id
}



export const getNivelA = async (sexo) => {

  const collection_ref = collection(db, 'NivelA')
  const query_ref = query(collection_ref, where("Sexo", "==", sexo), where("Disponible", '==', true))
  let dataFinal = []
  const datos = await getDocs(query_ref)

  datos.forEach((doc) => {
    dataFinal.push(doc.data())
  })

  console.log(dataFinal)

  return dataFinal

}



export const getNivelB = async (idA) => {
  const collection_ref = collection(db, 'NivelB')
  const query_ref = query(collection_ref, where("NivelA", "==", idA))
  let dataFinal = []
  const datos = await getDocs(query_ref)

  datos.forEach((doc) => {
    dataFinal.push(doc.data())
  })

  console.log(dataFinal)

  return dataFinal
}

export const getCarouselHome = async () => {

  const collection_ref = collection(db, 'Carousel')
  const query_ref = query(collection_ref, where("Disponible", '==', true))
  let dataFinal = []
  const datos = await getDocs(query_ref)

  datos.forEach((doc) => {
    dataFinal.push(doc.data())
  })

  console.log(dataFinal)

  return dataFinal

}



export const getDetalleFotoA = async (id, color) => {
  const collection_ref = collection(db, 'FotosDetalleA')
  const query_ref = query(collection_ref, where("Id", "==", id), where("Color", "==", color))
  let dataFinal = []
  const datos = await getDocs(query_ref)

  datos.forEach((doc) => {
    dataFinal.push(doc.data())
  })

  console.log('hola: ', dataFinal, id)

  return dataFinal[0]
}
