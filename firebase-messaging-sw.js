importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');
// Initialize Firebase
  var config = {   
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

