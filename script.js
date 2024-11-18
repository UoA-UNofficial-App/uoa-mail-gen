document
  .getElementById("downloadButton")
  .addEventListener("click", function () {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;

    if (id && name && password) {
      const plistContent = generatePlistContent(id, name, password);
      downloadFile(plistContent, "mail.mobileconfig");
    } else {
      alert("Please fill out all fields.");
    }
  });

function generatePlistContent(id, name, password) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>PayloadContent</key>
	<array>
		<dict>
			<key>EmailAccountDescription</key>
			<string>U-Aizu Internal Mail Profile</string>
			<key>EmailAccountName</key>
			<string>${name}</string>
			<key>EmailAccountType</key>
			<string>EmailTypeIMAP</string>
			<key>EmailAddress</key>
			<string>${id}@u-aizu.ac.jp</string>
			<key>IncomingMailServerAuthentication</key>
			<string>EmailAuthPassword</string>
			<key>IncomingMailServerHostName</key>
			<string>stdmsv1.u-aizu.ac.jp</string>
			<key>IncomingMailServerPortNumber</key>
			<integer>993</integer>
			<key>IncomingMailServerUseSSL</key>
			<true/>
			<key>IncomingMailServerUsername</key>
			<string>${name}</string>
			<key>IncomingPassword</key>
			<string>${password}</string>
			<key>OutgoingMailServerAuthentication</key>
			<string>EmailAuthPassword</string>
			<key>OutgoingMailServerHostName</key>
			<string>stdmsv1.u-aizu.ac.jp</string>
			<key>OutgoingMailServerPortNumber</key>
			<integer>587</integer>
			<key>OutgoingMailServerUseSSL</key>
			<true/>
			<key>OutgoingMailServerUsername</key>
			<string>${name}</string>
			<key>OutgoingPassword</key>
			<string>${password}</string>
			<key>OutgoingPasswordSameAsIncomingPassword</key>
			<false/>
			<key>PayloadDescription</key>
			<string>Configures Email settings</string>
			<key>PayloadDisplayName</key>
			<string>U-Aizu Internal Mail Profile</string>
			<key>PayloadIdentifier</key>
			<string>com.apple.mail.managed.53C3DDE8-7963-46A4-89C1-08D52EAFBE61</string>
			<key>PayloadType</key>
			<string>com.apple.mail.managed</string>
			<key>PayloadUUID</key>
			<string>53C3DDE8-7963-46A4-89C1-08D52EAFBE61</string>
			<key>PayloadVersion</key>
			<integer>1</integer>
			<key>PreventMove</key>
			<false/>
			<key>SMIMEEnablePerMessageSwitch</key>
			<false/>
			<key>SMIMEEnabled</key>
			<false/>
			<key>SMIMEEncryptionEnabled</key>
			<false/>
			<key>SMIMESigningEnabled</key>
			<false/>
			<key>allowMailDrop</key>
			<false/>
			<key>disableMailRecentsSyncing</key>
			<false/>
		</dict>
	</array>
	<key>PayloadDisplayName</key>
	<string>U-AIZU MAIL PROFILE</string>
	<key>PayloadIdentifier</key>
	<string>Shake-MacBookAir.0F1397EE-F6F7-4D84-A123-BB833B6CDB01</string>
	<key>PayloadRemovalDisallowed</key>
	<false/>
	<key>PayloadType</key>
	<string>Configuration</string>
	<key>PayloadUUID</key>
	<string>0D05F17C-EA05-49B8-A2FF-7A6CC2A5DA3E</string>
	<key>PayloadVersion</key>
	<integer>1</integer>
</dict>
</plist>`;
}

function downloadFile(content, filename) {
  const blob = new Blob([content], { type: "application/xml" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
