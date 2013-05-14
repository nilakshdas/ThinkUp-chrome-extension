var timecheck = Math.round(+new Date()/1000);
(function poll() {
	chrome.storage.sync.get(
		null,
		function(ThinkUpSettings) {
			var appAddress = ThinkUpSettings.appAddress;
			var appUsername = ThinkUpSettings.appUsername;
			var appAPIKey = ThinkUpSettings.appAPIKey;

			if ((typeof appAddress==='undefined' || appAddress=="")
			|| (typeof appUsername==='undefined' || appUsername=="")
			|| (typeof appAPIKey==='undefined' || appAPIKey=="")) {
				chrome.storage.onChanged.addListener(poll);
			} else {
				$.ajax({
					url: appAddress + "api/v1/insight.php"
					+ "?un=" + appUsername
					+ "&as=" + appAPIKey
					+ "&since=" + timecheck,
					dataType: "json",
					success: function(data) {
						if (typeof data.error === 'undefined') {
							for (var i = 0 ; i < data.length; i++) {
								var insight = data[i];
								var icon = "img/favicon.png",
								title = insight.prefix,
								message = $(document.createElement('div')).hide().append(insight.text).text().replace(':', '...');
								notification = webkitNotifications.createNotification(icon, title, message);
								notification.onclick = function(x) { 
									window.open(appAddress);
									this.cancel(); 
								};
								notification.show();
							}
							timecheck = Math.round(+new Date()/1000);
						}
					},
					timeout: 2*60*1000
				});
				setTimeout(poll,(2*60*1000)); // Wait 5 minutes before polling again
			}
		}
	);
})();