importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyClcOIs8mgAtSSqdbZRkm6oSKk6KG4AJmc",
    authDomain: "push-project-177ed.firebaseapp.com",
    databaseURL: "https://push-project-177ed.firebaseio.com",
    projectId: "push-project-177ed",
    storageBucket: "push-project-177ed.appspot.com",
    messagingSenderId: "799979787181"
  };
  firebase.initializeApp(config);
  
  messaging.setBackgroundMessageHandler(function(){
  	const title = "Hello World";
  	const options = {
  		body:payload.data.status
  	}
  	return self.registration.showNotification(title,options);
  })

