// Animating elements
const registerForm = document.querySelector('.register-form');
const registerContent = document.querySelector('.form-content');
const registerLabel = document.querySelector('.register-label');
const cancelRegister = document.querySelector('#cancelReg');

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


// Event Listeners
registerForm.addEventListener('click', toggleRegister);