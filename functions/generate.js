export async function onRequestPost(context) {
  const { request } = context;
  const formData = await request.formData();

  const id = formData.get("id");
  const name = formData.get("name");
  const password = formData.get("password");

  if (!id || !name || !password) {
    return new Response("Missing required parameters: id, name, password", { status: 400 });
  }

  // Generate UUIDs
  const rootUUID = crypto.randomUUID();
  const mailUUID = crypto.randomUUID();
  const wifiUUID = crypto.randomUUID();
  const payloadIdentifier = `jp.ac.u-aizu.profile.${id}`;

  const plistContent = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>PayloadContent</key>
	<array>
		<dict>
			<key>EmailAccountDescription</key>
			<string>U-Aizu Mail (${id})</string>
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
			<string>${id}</string>
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
			<string>${id}</string>
			<key>OutgoingPassword</key>
			<string>${password}</string>
			<key>OutgoingPasswordSameAsIncomingPassword</key>
			<false/>
			<key>PayloadDescription</key>
			<string>Configures Email settings</string>
			<key>PayloadDisplayName</key>
			<string>U-Aizu Mail (${id})</string>
			<key>PayloadIdentifier</key>
			<string>jp.ac.u-aizu.mail</string>
			<key>PayloadType</key>
			<string>com.apple.mail.managed</string>
			<key>PayloadUUID</key>
			<string>${mailUUID}</string>
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
        <dict>
            <key>SSID_STR</key>
            <string>ains-wifi</string>
            <key>HIDDEN_NETWORK</key>
            <false/>
            <key>EncryptionType</key>
            <string>WPA2</string>
            <key>EAPClientConfiguration</key>
            <dict>
                <key>AcceptEAPTypes</key>
                <array><integer>25</integer></array> 
                <key>UserName</key>
                <string>${id}</string>
                <key>UserPassword</key>
                <string>${password}</string>
            </dict>
            <key>PayloadDescription</key>
			<string>Configures Wi-Fi settings</string>
            <key>PayloadDisplayName</key>
            <string>U-Aizu Wi-Fi (ains-wifi)</string>
            <key>PayloadIdentifier</key>
            <string>jp.ac.u-aizu.wifi</string>
            <key>PayloadType</key>
            <string>com.apple.wifi.managed</string>
            <key>PayloadUUID</key>
            <string>${wifiUUID}</string>
            <key>PayloadVersion</key>
            <integer>1</integer>
        </dict>
	</array>
	<key>PayloadDisplayName</key>
	<string>U-Aizu Setup (${id})</string>
	<key>PayloadIdentifier</key>
	<string>${payloadIdentifier}</string>
	<key>PayloadRemovalDisallowed</key>
	<false/>
	<key>PayloadType</key>
	<string>Configuration</string>
	<key>PayloadUUID</key>
	<string>${rootUUID}</string>
	<key>PayloadVersion</key>
	<integer>1</integer>
    <key>PayloadDescription</key>
    <string>Configures Email and Wi-Fi for University of Aizu</string>
    <key>PayloadOrganization</key>
    <string>University of Aizu</string>
</dict>
</plist>`;

  return new Response(plistContent, {
    headers: {
      "Content-Type": "application/x-apple-aspen-config",
      "Content-Disposition": 'inline; filename="u-aizu-setup.mobileconfig"',
    },
  });
}