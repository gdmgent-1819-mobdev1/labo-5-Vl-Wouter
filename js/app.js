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
const db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true
  });

// Firebase authentication
const auth = firebase.auth();
const loginbtns = document.querySelectorAll('.loggedout');
const logoutbtn = document.querySelectorAll('.loggedin');
const posts = document.querySelector('.posts');
const createbtn = document.querySelector('#toggleEditor');
const publishbtn = document.querySelector('#createPost');
let editor;

posts.innerHTML = '';

if(logoutbtn != null) {
    document.querySelector('#logoutbtn').addEventListener('click', () => {
        auth.signOut().catch(error => {
            console.log(error.message);
        })
    });
}

auth.onAuthStateChanged(user => {
    getPosts();
    if(user) {
        console.log('logged in');
        if(user.displayName == null) {
            user.updateProfile({
                displayName: user.email.split('@')[0]
            })
            .catch(error => console.log(error.message));
        }
        document.querySelector('.postbuttons').innerHTML = `<button type='button' id='toggleEditor' class='btn btn-primary'>Create a post</button>`
        if(loginbtns != null && logoutbtn != null) {
            loginbtns.forEach(btn => {
                btn.classList.add('hidden');
            });
            logoutbtn.forEach(btn => {
                btn.classList.remove('hidden');
            });
        }
        if(document.querySelector('.greeting') != null) {
            document.querySelector('.username').innerHTML = user.displayName;
            document.querySelector('#usermessage').innerHTML = 'Welcome back!'
        }
    } else {
        console.log('logged out');
        if(loginbtns != null && logoutbtn != null) {
            loginbtns.forEach(btn => {
                btn.classList.remove('hidden');
            });
            logoutbtn.forEach(btn => {
                btn.classList.add('hidden');
            });
        }
        if(document.querySelector('.greeting') != null) {
            document.querySelector('.username').innerHTML = 'Guest';
            document.querySelector('#usermessage').innerHTML = 'Please log in to get the best possible experience'
        }
    }
});

ClassicEditor
.create(document.querySelector('#editor'))
.then( neweditor => editor = neweditor)
.catch( error => console.log(error));

function getPosts() {
    db.collection('posts').get()
    .then((querySnapshot) => {
        if(querySnapshot.empty) {
            console.log('This bitch empty');
        } else {
            querySnapshot.forEach((doc) => {
                let data = doc.data();
                let buttons;
                // TODO: Make actual post
                if(data.author == firebase.auth().currentUser.uid) {
                    buttons = `
                    <div class='post-actions'>
                        <button type='button' class='btn btn-flat btn-small' id='deletePost'>Edit</button>
                        <button type='button' class='btn btn-flat btn-small' id='deletePost'>Delete</button>
                    </div>
                    `
                } else {
                    buttons = ``
                }
                posts.innerHTML += `<div class='post'>
                    <div class='post-header'>
                        <h1>${data.title}</h1>
                        <p>By <span class='author'>${data.author}</span> &bull; <span class='date'>${data.time}</span></p>
                    </div>
                    ${buttons}
                    <div class='post-content'>
                        ${data.content}
                    </div>
                </div>`
            });
        }
    });
}

document.addEventListener('click', (e) => {
    (e.target && e.target.id == 'toggleEditor') ? document.querySelector('.posteditor').classList.toggle('hidden') : '';
})

// createbtn.addEventListener('click', () => {
//     document.querySelector('.posteditor').classList.toggle('hidden');
// });

publishbtn.addEventListener('click', () => {
    const title = document.querySelector('form #title').value;
    const user = firebase.auth().currentUser.displayName;
    const userID = firebase.auth().currentUser.uid;
    const content = editor.getData();
    const posts = db.collection('posts');
    let date = new Date;
    const posttime = date.getTime();

    posts.add({
        title: title,
        author: user,
        uid: userID,
        content: content,
        time: posttime
    })
    .then((doc_id) => console.log(doc_id.id + 'created!'))
    .catch(error => console.log(error.message));

});