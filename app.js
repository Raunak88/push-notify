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
  firebase.initializeApp(config);
  
  const messaging = firebase.messaging();

 self.addEventListener('install', function(event) {  
          console.log("Install Step, let's cache some 
          files =D");  
        });

      // [*] SW Activate State Event.
      self.addEventListener('activate', function(event) {          
      console.log('Activated!', event);});

  messaging.requestPermission()
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