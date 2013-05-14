function saveSettings() {
	var ThinkUpSettings = {}
	ThinkUpSettings.appAddress = ($('#inputAppAddress').val().slice(-1) == '/') ?
	$('#inputAppAddress').val() : $('#inputAppAddress').val()+'/';
	ThinkUpSettings.appUsername = $('#inputUsername').val();
	ThinkUpSettings.appAPIKey = $('#inputAPIKey').val();
	
	chrome.storage.sync.set(
		ThinkUpSettings,
		function() {
			console.log('Settings saved');
		}
	);

	$('#settingsEdit').hide();
	$('#settingsSaved').show();
}

function editSettings() {
	chrome.storage.sync.get(
		null,
		function(ThinkUpSettings) {
			$('#inputAppAddress').val(ThinkUpSettings.appAddress);
			$('#inputUsername').val(ThinkUpSettings.appUsername);
			$('#inputAPIKey').val(ThinkUpSettings.appAPIKey);
		}
	);

	$('#settingsSaved').hide();
	$('#settingsEdit').show();
}

$('#saveSettings').click(function(e) {
	e.preventDefault();
	saveSettings();
});

$('#editSettings').click(function(e) {
	e.preventDefault();
	editSettings();
});

$(window).load(function() {
	chrome.storage.sync.get(
		null,
		function(ThinkUpSettings) {
			var appAddress = ThinkUpSettings.appAddress;
			var appUsername = ThinkUpSettings.appUsername;
			var appAPIKey = ThinkUpSettings.appAPIKey;

			if ((typeof appAddress==='undefined' || appAddress=="")
			|| (typeof appUsername==='undefined' || appUsername=="")
			|| (typeof appAPIKey==='undefined' || appAPIKey=="")) {
				editSettings();
			} else {
				$('#settingsEdit').hide();
				$('#settingsSaved').show();
			}
		}
	);
});