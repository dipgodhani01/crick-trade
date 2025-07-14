const { google } = require("googleapis");
const { google_client_id, google_client_secret } = require("../config");
exports.oauth2client = new google.auth.OAuth2(google_client_id,google_client_secret,'postmessage')