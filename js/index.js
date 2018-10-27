const navButtons = document.querySelector('.nav-links');
const username = document.querySelector('.username');
const welcomeMessage = document.querySelector('.logmessage');
const postCreator = document.querySelector('.postcreator');
const submitPost = document.querySelector('#submitPost');
let editor;

logoutUser = () => {
    firebase.auth().signOut()
    .catch(error => console.log(error.message));
}

newPost = () => {
    const title = document.querySelector('#postcreation #title').value;
    const content = editor.getData();
    const author = firebase.auth().currentUser.displayName;
    const uid = firebase.auth().currentUser.uid;
    let date = new Date;
    const time = date.getTime();

    db.collection('posts').add({
        author: author,
        content: content,
        title: title,
        time: time,
        uid: uid
    })
    .catch(error => console.log(error.message));
}

firebase.auth().onAuthStateChanged((user) => {
    if(user) {
        navButtons.innerHTML = `<button type='button' id='logout' class='btn primary'>Log out</button>`
        username.innerHTML = user.displayName;
        welcomeMessage.innerHTML = 'Glad to see you again! Time for another post?';
        postCreator.classList.remove('hidden');
    } else {
        navButtons.innerHTML = `<a href='pages/login.html'><button type='button' class='btn primary'>Log in / Sign up</button></a>`
        username.innerHTML = 'Guest';
        welcomeMessage.innerHTML = 'To get to posting, please log in or register';
        postCreator.classList.add('hidden');
    }
});

ClassicEditor
.create( document.querySelector( '#creator' ) )
.then((neweditor) => {
    editor = neweditor;
})
.catch( error => {
    console.error( error );
} );

const posts = db.collection('posts');
posts.onSnapshot((snapshot) => {
    console.log(snapshot);
    let posts = document.querySelector('.posts');
    posts.innerHTML = '';
    snapshot.forEach(doc => {
        let data = doc.data();
        let posttime = new Date(data.time);
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let time = `${months[posttime.getMonth()]} ${posttime.getDay()}, ${posttime.getFullYear()} ${posttime.getHours()}:${posttime.getMinutes()}`;
        posts.innerHTML += `
        <div class='post'>
                <div class='post-info'>
                    <h1>${data.title}</h1>
                    <p>By <span class='author text-primary'>${data.author}</span> &bull; <span class='timestamp'>${time}</span></p>
                </div>
                <div class='post-content'>
                    ${data.content}
                </div>
            </div>
        `;
    })
});

document.addEventListener('click', (event) => {
    if(event.target && event.target.id == 'logout') {
        logoutUser();
    }
});

submitPost.addEventListener('click', newPost);