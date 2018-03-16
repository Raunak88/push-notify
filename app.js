var notifyBtn = document.getElementById('bell')

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
    pushButton.disabled = true;
    if (isSubscribed) {
      // TODO: Unsubscribe user
    } else {
      subscribeUser();
    }
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);

    if (isSubscribed) {
      console.log('User IS subscribed.');
    } else {
      console.log('User is NOT subscribed.');
    }

    updateBtn();
  });
}
}
function updateBtn() {
  if (isSubscribed) {
    notifyBtn.textContent = 'Disable Push Messaging';
  } else {
    notifyBtn.textContent = 'Disable Push Messaging';
  }

  notifyBtn.disabled = false;
}