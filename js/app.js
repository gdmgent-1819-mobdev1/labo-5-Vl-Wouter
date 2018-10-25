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

// Firebase authentication
const auth = firebase.auth();
const loginbtns = document.querySelector('.loggedout');
const logoutbtn = document.querySelector('.loggedin');

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
        if(loginbtns != null && logoutbtn != null) {
            loginbtns.classList.add('hidden');
            logoutbtn.classList.remove('hidden');
        }
        if(document.querySelector('.greeting') != null) {
            document.querySelector('.username').innerHTML = user.email.split('.')[0];
            document.querySelector('#usermessage').innerHTML = 'Welcome back!'
        }
    } else {
        console.log('logged out');
        if(loginbtns != null && logoutbtn != null) {
            loginbtns.classList.remove('hidden');
            logoutbtn.classList.add('hidden');
        }
        if(document.querySelector('.greeting') != null) {
            document.querySelector('.username').innerHTML = 'Guest';
            document.querySelector('#usermessage').innerHTML = 'Please log in to get the best possible experience'
        }
    }
});
