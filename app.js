// Initialize Firebase
  var config = {
    apiKey: "AIzaSyClcOIs8mgAtSSqdbZRkm6oSKk6KG4AJmc",
    authDomain: "push-project-177ed.firebaseapp.com",
    databaseURL: "https://push-project-177ed.firebaseio.com",
    projectId: "push-project-177ed",
    storageBucket: "push-project-177ed.appspot.com",
    messagingSenderId: "799979787181"
  };
  window.firebase = firebase;
  firebase.initializeApp(config);messaging.requestPermission()
.then(function() {
  console.log('Notification permission granted.');
  messaging.getToken()
  .then(function(currentToken) {
    if (currentToken) {
      sendTokenToServer(currentToken);
      updateUIForPushEnabled(currentToken);
    } else {
      // Show permission request.
      console.log('No Instance ID token available. Request permission to generate one.');
      // Show permission UI.
      updateUIForPushPermissionRequired();
      setTokenSentToServer(false);
    }
  })
  .catch(function(err) {
    console.log('An error occurred while retrieving token. ', err);
    showToken('Error retrieving Instance ID token. ', err);
    setTokenSentToServer(false);
  });
}
})
.catch(function(err) {
  console.log('Unable to get permission to notify.', err);
});





  
  
  messaging.requestPermission()
.then(function() {
  console.log('Notification permission granted.');
  // TODO(developer): Retrieve an Instance ID token for use with FCM.
  // ...
})
.catch(function(err) {
  console.log('Unable to get permission to notify.', err);
});
  .then(function(){
    console.log('I am in here');
    
    return messaging.getToken()
  .then(function(currentToken) {
    console.log(currentToken);
  })
  .catch(function(err) {
    console.log('An error occurred while retrieving token. ', err);
    showToken('Error retrieving Instance ID token. ', err);
    setTokenSentToServer(false);
  });

  }).catch(function(err){
    console.log('Error');
  });