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
const signup = document.querySelector('#btn-signup');
const auth = firebase.auth();

// signup function
register = () => {
    const userMail = document.querySelector('#email');
    const pass = document.querySelector('#pword');

    // Create new user with above credentials
    auth.createUserWithEmailAndPassword(userMail, pass)
    .catch(error => {
        document.querySelector('.error').innerHTML = error.message;
    });

    // if the user is logged in, go back to the index page
    auth.onAuthStateChanged(user => {
        if(user) {
            window.location.replace('../index.html')
        }
    });
}

// event listener
signup.addEventListener('click', register);