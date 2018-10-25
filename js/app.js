// Initialize firebase
const config = {
    apiKey: "AIzaSyBlGyQkZwwX_WBoifrJaOlLhMjt-In4P2E",
    authDomain: "mobdev-1-labo5.firebaseapp.com",
    databaseURL: "https://mobdev-1-labo5.firebaseio.com",
    projectId: "mobdev-1-labo5",
    storageBucket: "mobdev-1-labo5.appspot.com",
    messagingSenderId: "667824028304"
};
firebase.initializeApp(config);
const db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true
  });

// Firebase authentication
const auth = firebase.auth();
const loginbtns = document.querySelectorAll('.loggedout');
const logoutbtn = document.querySelectorAll('.loggedin');
const posts = document.querySelector('.posts');
const createbtn = document.querySelector('#toggleEditor');
const publishbtn = document.querySelector('#createPost');
let editor;

if(logoutbtn != null) {
    document.querySelector('#logoutbtn').addEventListener('click', () => {
        auth.signOut().catch(error => {
            console.log(error.message);
        })
    });
}

auth.onAuthStateChanged(user => {
    if(user) {
        console.log('logged in');
        if(user.displayName == null) {
            user.updateProfile({
                displayName: user.email.split('@')[0]
            })
            .catch(error => console.log(error.message));
        }
        if(loginbtns != null && logoutbtn != null) {
            loginbtns.forEach(btn => {
                btn.classList.add('hidden');
            });
            logoutbtn.forEach(btn => {
                btn.classList.remove('hidden');
            });
        }
        if(document.querySelector('.greeting') != null) {
            document.querySelector('.username').innerHTML = user.displayName;
            document.querySelector('#usermessage').innerHTML = 'Welcome back!'
        }
    } else {
        console.log('logged out');
        console.log(loginbtns);
        console.log(logoutbtn);
        if(loginbtns != null && logoutbtn != null) {
            loginbtns.forEach(btn => {
                btn.classList.remove('hidden');
            });
            logoutbtn.forEach(btn => {
                btn.classList.add('hidden');
            });
        }
        if(document.querySelector('.greeting') != null) {
            document.querySelector('.username').innerHTML = 'Guest';
            document.querySelector('#usermessage').innerHTML = 'Please log in to get the best possible experience'
        }
    }
});

ClassicEditor
.create(document.querySelector('#editor'))
.then( neweditor => editor = neweditor)
.catch( error => console.log(error));

db.collection('posts').get()
.then((querySnapshot) => {
    if(querySnapshot.empty) {
        posts.innerHTML = `<p class='text-gray'>There are no posts at the moment...</p>`
    } else {
        querySnapshot.forEach((doc) => {
            console.log(doc);
        })
    }
});

createbtn.addEventListener('click', () => {
    document.querySelector('.posteditor').classList.toggle('hidden');
});

publishbtn.addEventListener('click', () => {
    const title = document.querySelector('form #title').value;
    const user = firebase.auth().currentUser.displayName;
    const userID = firebase.auth().currentUser.uid;

    db.collection('posts').add({
        author: user,
        author_id: userID,
        title: title,
        content: editor.getData()
    })
    .then(docRef => console.log(`Created post: ${docRef.id}`))
    .catch(error => console.log(error.message));

});