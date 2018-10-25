let signin = document.querySelector('#btn-signin');

loginUser = () => {
    console.log('click!')
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
    })


}

// Event Listener
signin.addEventListener('click', loginUser);