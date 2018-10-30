// Check if notifications are supported
isSupported = () => {
   return ('Notification' in window) ? true : false; 
}

// Request permission
reqPerms = () => {
    if(Notification && Notification.permission == 'default') {
       Notification.requestPermission((permission) => {
           if(!('permission' in Notification)) {
               Notification.permission = permission;
           }
       }) 
    }
}

// Fire a notification
fireNotification = (title, text) => {
    if(Notification.permission === 'granted') {
        let notification = new Notification(title, {
            icon: 'https://octodex.github.com/images/codercat.jpg',
            body: text
        });

        setTimeout(() => {
            notification.close.bind(notification)
        }, 3000);
    }
}

// if supported call notifications
if(isSupported) {
    reqPerms();
    // fireNotification(`Thank you!`, `Notifications help us notifying you of your actions around our app!`);
}