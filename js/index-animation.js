const editorBtn = document.querySelector('#toggleCreator');
const editArea = document.querySelector('.postcreator');
const editorForm = document.querySelector('.centerform');

toggleEditor = () => {
    if(editArea.classList.contains('postcreator--open')) {
        editArea.classList.remove('postcreator--open');
        editorForm.classList.remove('centerform--open');
        editorBtn.innerHTML = 'Open Post Editor';
    } else {
        editArea.classList.add('postcreator--open');
        editorForm.classList.add('centerform--open');
        editorBtn.innerHTML = 'Close Post Editor';
    }
}

editorBtn.addEventListener('click', toggleEditor);