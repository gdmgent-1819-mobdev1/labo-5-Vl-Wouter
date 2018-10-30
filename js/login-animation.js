// Animating elements
const loginCont = document.querySelector('.login-container');
const registerForm = document.querySelector('.register-form');
const registerContent = document.querySelector('.form-content');
const registerLabel = document.querySelector('.register-label');
const forgotPw = document.querySelector('#login #forgotPw');
const forgotCont = document.querySelector('.forgotten-container');
const cancelRegister = document.querySelector('#cancelReg');
const backtoLogBtn = document.querySelector('#backToLogIn');

// Function to toggle classes
classToggle = (element, classname, event) => {
    if(event === 'toggle') {
        element.classList.toggle(classname);
    } else if(event === 'add') {
        element.classList.add(classname);
    } else {
        element.classList.remove(classname);
    }
}

// Animation function
toggleRegister = () => {

    if(!registerForm.classList.contains('register-form--open')) {
        classToggle(registerContent, 'hidden', 'toggle');
        classToggle(registerLabel, 'hidden', 'toggle');
        classToggle(registerForm, 'register-form--open', 'add');
        registerForm.removeEventListener('click', toggleRegister);
        cancelRegister.addEventListener('click', toggleRegister);
    } else {
        classToggle(registerForm, 'register-form--open', 'remove');
        setTimeout(() => {
            classToggle(registerContent, 'hidden', 'toggle');
            classToggle(registerLabel, 'hidden', 'toggle');
            registerForm.addEventListener('click', toggleRegister);
        }, 300);
    }

}

// Animate coming in of forget screen
toggleForgot = () => {
    if(!loginCont.classList.contains('login-container--left')) {
        classToggle(loginCont, 'login-container--left', 'add');
        classToggle(forgotCont, 'forgotten-container--right', 'remove');
    } else {
        classToggle(loginCont, 'login-container--left', 'remove');
        classToggle(forgotCont, 'forgotten-container--right', 'add');
    }
}


// Event Listeners
registerForm.addEventListener('click', toggleRegister);
forgotPw.addEventListener('click', toggleForgot);
backtoLogBtn.addEventListener('click', toggleForgot);