// Button variables
const loginBtn = document.querySelector('#login #btn-login');
const loginError = document.querySelector('#login .error');
const registerBtn = document.querySelector('#register #btn-register');
const registerError = document.querySelector('#register .error');
const goHome = document.querySelector('#goHome');
const recoverBtn = document.querySelector('#sendHelp');
const provider = new firebase.auth.GoogleAuthProvider();
const googleBtn = document.querySelector('#btn-google');

// Go Home function
toIndex = () => {
   window.location.replace('../index.html'); 
}

// Google Log In (no idea if it works)
googleLogIn = () => {
    firebase.auth().signInWithPopup(provider)
    .then((result) => {
        let token = result.credential.accessToken;
        let user = result.user;
        console.log(user);
    })
    .catch((error) => alert(error.message));
}

// Login and register functions
loginUser = () => {
    const email = document.querySelector('#login #login_email').value;
    const pass = document.querySelector('#login #login_pword').value;

    firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(() => {
        fireNotification(`Logged in!`, `You have successfully been logged in! Now go ahaead and post!`);
        toIndex();
    })
    .catch((error) => {
        loginError.innerHTML = `Error: ${error.message}`;
    });
    
}

// Recover password
recoverPass = () => {
    const email = document.querySelector('#forgotEmail').value;
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
        fireNotification(`Help is on the way`, `An email with instructions to recover your password has been sent.`);
        toIndex();
    })
    .catch(error => alert(error.message));
}

// Register User
registerUser = () => {
    const email = document.querySelector('#register #reg_email').value;
    const pass = document.querySelector('#register #reg_pword').value;
    const username = document.querySelector('#register #username').value;
    const auth = firebase.auth();

    auth.createUserWithEmailAndPassword(email, pass)
    .then(() => {
        auth.currentUser.updateProfile({
            displayName: username
        })
        auth.currentUser.sendEmailVerification()
        .then(() => {
            fireNotification(`Registered!`, `You still need to verify your email, but apart from that we successfully created your account!`);
            toIndex();
        })
        .catch(error => alert(error.message));
    })
    .catch(error => {
        registerError.innerHTML = `Error: ${error.message}`;
    })
}
// Event Listeners
goHome.addEventListener('click', toIndex);
loginBtn.addEventListener('click', loginUser);
registerBtn.addEventListener('click', registerUser);
recoverBtn.addEventListener('click', recoverPass);
googleBtn.addEventListener('click', googleLogIn);