// Button variables
const loginBtn = document.querySelector('#login #btn-login');
const loginError = document.querySelector('#login .error');
const registerBtn = document.querySelector('#register #btn-register');
const registerError = document.querySelector('#register .error');
const goHome = document.querySelector('#goHome');

// Go Home function
toIndex = () => {
   window.location.replace('../index.html'); 
}
// Login and register functions
loginUser = () => {
    const email = document.querySelector('#login #email').value;
    const pass = document.querySelector('#login #pword').value;

    firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(() => toIndex())
    .catch((error) => {
        loginError.innerHTML = `Error: ${error.message}`;
    });
    
}

registerUser = () => {
    const email = document.querySelector('#register #email').value;
    const pass = document.querySelector('#register #pword').value;
    const username = document.querySelector('#register #username');

    firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then(() => {
        firebase.auth().currentUser.updateProfile({
            displayname: username
        }).then(() => {
            window.location.replace('../index.html');
        })
        .catch(error => console.log(error.message));
    })
    .catch(error => {
        registerError.innerHTML = `Error: ${error.message}`;
    })
}
// Event Listeners
goHome.addEventListener('click', toIndex);
loginBtn.addEventListener('click', loginUser);
registerBtn.addEventListener('click', registerUser);