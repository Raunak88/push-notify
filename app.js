
var pubkey ="BCLnl2BFwGStqopEUJhhyK92o8QQUbdgUBMNIMbDw5hOYAS16zMN6X19a41IpsrpcbIvpyBqev6QeKenDy7-Ito";

//Private Key 9E-sLIM5TH38ZprRpSOPIOpVsBDQS62jBremexnZC_g

var notifyBtn = document.getElementById('bell')

if('serviceWorker' in navigator && 'PushManager' in window){
	notifyBtn.classList.remove('hidden');
	
	if(Notification.permission !== 'denied'){
		notifyBtn.disabled = false;
	}
	
	navigator.serviceWorker.ready.then(sw =>{
		var sp = sw;
		
		sp.pushManager.getSubscription().then(s => {
			var isSubscribed = s !==null;
			notifyBtn.disabled = isSubscribed?true:false;
		})
	})
}