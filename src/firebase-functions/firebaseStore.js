import * as firebase from 'firebase';

export const db = firebase.firestore();

export const userSave = user => db.collection('users').doc(user.id).set(user);

export const createUserProfile = async () => {
  const userLocalStorage = localStorage.getItem('userSession');
  const convertObjJson = JSON.parse(userLocalStorage);
  const userId = convertObjJson.user.uid;

  return db.collection('users').where('id', '==', userId).get();
};

export const updateUserInfo = async user => db.collection('users').doc(user.id).update(user);

// Creamos el post en firebase con su colecciones y el objeto del doc
export const savePost = ( uid, name, userPhoto, title, description, typeOfFood, price, quality, location, foodPhoto, date) => db.collection('review').doc().set({
  uid,
  name,
  userPhoto,
  title,
  description,
  typeOfFood,
  price,
  quality,
  location,
  foodPhoto,
  date: firebase.firestore.Timestamp.now()
});


// De mi colección de reviews traeme todo
export const getPosts = () => db.collection('review').get();


/* Cada vez que mis posts se actualicen, agreguen o borren, actualizar en tiempo real
el timeline con el método onSnapshot() */
export const onGetPosts = callback => db.collection('review').orderBy('date', 'desc').onSnapshot(callback);

// Para eliminar un post necesito su id
export const deletePost = id => db.collection('review').doc(id).delete();

// Editar el post con su respectivo id
export const getEditPost = id => db.collection('review').doc(id).get();

// Actualizar la tarea, con los datos del id que me esta pasando la const
export const updatePost = (id, updatePost) => db.collection('review').doc(id).update(updatePost);


export const uploadImgFood = (file, uid) => {
  const refStorage = firebase.storage().ref(`imgsPosts/${uid}/${file.name}`)
  const task = refStorage.put(file)

  task.on(
    'state_changed',
    snapshot => {
      const porcentaje = snapshot.bytesTransferred / snapshot.totalBytes * 100
      console.log(porcentaje)
    },
    err => {
      console.log(err)
    },
    () => {
      task.snapshot.ref
        .getDownloadURL()
        .then(url => {
          localStorage.setItem('imgNewPost', url)
        })
        .catch(err => {
          console.log('err')
        })
    }
  )
}


// db.collection("users").get().then((querySnapshot) => {
//   querySnapshot.(doc) => {
//       console.log(`${doc.id}`);
//   // });
// });

// db.collection("users").get().then((querySnapshot) => {
//   querySnapshot.forEach((doc) => {
//       console.log(`${doc.data().id}`);
//   });
// });

// var docRef = db.collection("users").doc().id;

// docRef.get().then(function(doc) {
//     if (doc.exists) {
//         console.log("Document data:", doc.data());
//     } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//     }
// }).catch(function(error) {
//     console.log("Error getting document:", error);
// });

// db.collection("stories").where("author", "==", user.uid).get()

// var user = firebase.auth().currentUser;

// db.collectionGroup("posts").where("author", "==", user.uid).get()