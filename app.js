var applicationServerPublicKey ="BIEqN3JqtkzpI1NwBDulPj8asfeLMk1RTlJyyvRGV7ncNhXAx7M0SeT8m-9JrfgbJdjX-38ONgMCBgB2TqATrrQ";
var notifyBtn = document.getElementById('bell');
var isSubscribed = false;
var swRegistration = null;

function urlB64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('sw.js')
  .then(function(swReg) {
    console.log('Service Worker is registered', swReg);
	notifyBtn.classList.remove('hidden');
	if(Notification.permission !== 'denied'){
		notifyBtn.disabled = false;
	}
    swRegistration = swReg;
	initializeUI();
  })
  .catch(function(error) {
    console.error('Service Worker Error', error);
  });
} else {
  console.warn('Push messaging is not supported');
  notifyBtn.textContent = 'Push Not Supported';
}


function initializeUI() {
  // Set the initial subscription value
  notifyBtn.addEventListener('click', function() {    
    if (isSubscribed) {
      unsubscribeUser();
    } else {
		 swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);
    updateBtn();
  });
      subscribeUser();
	 
    }
  
});
}
function updateBtn() {
	if (Notification.permission === 'denied') {
    notifyBtn.textContent = 'Subscribe';
	updateSubscriptionOnServer(null);
    return;
  }
  if (isSubscribed) {
    notifyBtn.textContent = 'Unsubscribe';
  } else {
    notifyBtn.textContent = 'Subscribe';
  }

  notifyBtn.disabled = false;
}
function subscribeUser() {
  var applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
  .then(function(subscription) {
    console.log('User is subscribed.');

    updateSubscriptionOnServer(subscription);

    isSubscribed = true;

    updateBtn();
  })
  .catch(function(err) {
    console.log('Failed to subscribe the user: ', err);
    updateBtn();
  });
}
function updateSubscriptionOnServer(subscription) {
  // TODO: Send subscription to application server
 
}
function unsubscribeUser() {
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    if (subscription) {
      return subscription.unsubscribe();
    }
  })
  .catch(function(error) {
    console.log('Error unsubscribing', error);
  })
  .then(function() {
    updateSubscriptionOnServer(null);

    console.log('User is unsubscribed.');
    isSubscribed = false;

    updateBtn();
  });
}