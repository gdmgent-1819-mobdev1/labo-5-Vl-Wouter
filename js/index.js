// Variables for buttons, messages, whatever
const navButtons = document.querySelector('.nav-links');
const username = document.querySelector('.username');
const welcomeMessage = document.querySelector('.logmessage');
const postCreator = document.querySelector('.postcreator');
const submitPost = document.querySelector('#submitPost');
const updatePostBtn = document.querySelector('#updatePost');
const cancelBtn = document.querySelector('#cancelPost');
const alertArea = document.querySelector('.alerts');
let editor;

// Log out the current user
logoutUser = () => {
    firebase.auth().signOut()
    .then(() => window.location.reload())
    .catch(error => console.log(error.message));
}

// Reset the post editor
resetForm = () => {
    submitPost.classList.toggle('hidden');
    updatePostBtn.classList.toggle('hidden');
    postCreator.classList.remove('postcreator--open');
    editor.setData('');
    document.querySelector('#postcreation #title').value = ``;
}

// Publish new post
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
    .then(() => resetForm())
    .catch(error => console.log(error.message));
}

// Prepare post editor for edit
editPost = (id) => {
    window.scrollTo(0, 0);
    submitPost.classList.toggle('hidden');
    updatePostBtn.classList.toggle('hidden');
    postCreator.classList.add('postcreator--open');
    let post = db.collection('posts').doc(id);
    post.get().then((doc) => {
        let data = doc.data();
        document.querySelector('#postcreation #title').value = data.title;
        editor.setData(data.content);
        document.querySelector('#postcreation #currentId').value = id;
    });
}

// Update the edited post
updatePost = () => {
    const title = document.querySelector('#postcreation #title').value;
    const content = editor.getData();
    const post_id = document.querySelector('#postcreation #currentId').value;
    const doc = db.collection('posts').doc(post_id);
    return doc.update({
        title: title,
        content: content
    })
    .then(() => {
        resetForm();
    })
    .catch(error => alert(error.message));
}

// Add missing 0 in time
checkZero = (value) => {
    return (value < 10) ? `0${value}` : value;
}

firebase.auth().onAuthStateChanged((user) => {
    if(user) {
        navButtons.innerHTML = `<button type='button' id='logout' class='btn primary'>Log out</button>`
        username.innerHTML = user.displayName;
        welcomeMessage.innerHTML = 'Glad to see you again! Time for another post?';
        postCreator.classList.remove('hidden');
        if(!user.emailVerified) {
            alertArea.innerHTML = `
            <div class='alerts_warning'><strong><i class="fas fa-exclamation-triangle"></i>Verification: </strong> Make sure to verify your email address. <a href='' id='verifyMe'>Re-send verification email</a></div>
            `
            setTimeout(() => {
                alertArea.innerHTML = ``;
            }, (2 * 60 * 1000));
        }
    } else {
        navButtons.innerHTML = `<a href='pages/login.html'><button type='button' class='btn primary'>Log in / Sign up</button></a>`
        username.innerHTML = 'Guest';
        welcomeMessage.innerHTML = 'To get to posting, please log in or register';
        postCreator.classList.add('hidden');
    }
});

// Create the rich text editor (CKEditor 5)
ClassicEditor
.create( document.querySelector( '#creator' ) )
.then((neweditor) => {
    editor = neweditor;
})
.catch( error => {
    console.error( error );
} );

const posts = db.collection('posts').orderBy('time', 'desc');
posts.onSnapshot((snapshot) => {
    // get the posts container and clear it
    let posts = document.querySelector('.posts');
    posts.innerHTML = '';
    // check if there are any posts in the snapshot
    if(snapshot.empty) {
        // if snapshot is empty show this string
        posts.innerHTML = `There aren't any posts at the moment...`;
    } else {
        // Build the post for every entry in the database
        snapshot.forEach(doc => {
            let data = doc.data();
            let posttime = new Date(data.time);
            console.log(posttime);
            let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            let time = `${months[posttime.getMonth()]} ${posttime.getDate()}, ${posttime.getFullYear()} &bull; ${checkZero(posttime.getHours())}:${checkZero(posttime.getMinutes())}`;
            let postactions = '';
            if(firebase.auth().currentUser != null && firebase.auth().currentUser.uid === data.uid) {
                postactions = `
                <button type='button' class='btn secondary editPost' id='edit_${doc.id}'>Edit Post</button>
                <button type='button' class='btn text-primary deletePost' id='del_${doc.id}'>Delete Post</button>
                `;
            }
            posts.innerHTML += `
            <div class='post'>
                    <div class='post-info'>
                        <h1>${data.title}</h1>
                        <p>By <span class='author text-primary'>${data.author}</span> &bull; <span class='timestamp'>${time}</span></p>
                    </div>
                    <div class='post-content'>
                        ${data.content}
                    </div>
                    <div class='post-actions'>
                    ${postactions}
                    </div>
                </div>
            `;
        });
    }
});


// Event Listeners
document.addEventListener('click', (event) => {
    if(event.target && event.target.id == 'logout') {
        logoutUser();
    }
    if(event.target && event.target.classList.contains('editPost')) {
        let post_id = event.target.id.split('_')[1];
        editPost(post_id);
    }
});

submitPost.addEventListener('click', newPost);
updatePostBtn.addEventListener('click', updatePost);
cancelPost.addEventListener('click', resetForm);