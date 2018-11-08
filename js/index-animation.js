const editorBtn = document.querySelector('#toggleCreator');
const editArea = document.querySelector('.postcreator');

toggleEditor = () => {
    if(editArea.classList.contains('postcreator--open')) {
        editArea.classList.remove('postcreator--open');
        editorBtn.innerHTML = 'Open Post Editor';
    } else {
        editArea.classList.add('postcreator--open');
        editorBtn.innerHTML = 'Close Post Editor';
    }
}

editorBtn.addEventListener('click', toggleEditor);