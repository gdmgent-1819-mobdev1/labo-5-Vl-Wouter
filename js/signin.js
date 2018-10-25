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
let signin = document.querySelector('#btn-signin');

loginUser = () => {
    const userMail = document.querySelector('#email').value;
    const pass = document.querySelector('#pword').value;
    const errorField = document.querySelector('.error');
    const auth = firebase.auth();

    auth.signInWithEmailAndPassword(userMail, pass)
    .catch(error => {
        errorField.innerHTML = error.message;
    });

    auth.onAuthStateChanged(user => {
        if(user) {
            window.location.replace('../index.html')
        }
    });


}

// Event Listener
signin.addEventListener('click', loginUser);