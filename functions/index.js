const admin = require('firebase-admin');
const functions = require('firebase-functions');
const createUser = require('./create_user');
const serviceAccount = require('./service_account.json');
const requestOneTimePassword = require('./request_one_time_password');
const verifyOneTimePassword = require('./verify_one_time_password');

const updateUserInfo = require('./update_user_info');
const getUserInfo = require('./get_user_info');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://petmatedb.firebaseio.com"
  });

exports.createUser = functions.https.onRequest(createUser);
exports.requestOneTimePassword = functions.https.onRequest(requestOneTimePassword);
exports.verifyOneTimePassword = functions.https.onRequest(verifyOneTimePassword);
exports.updateUserInfo = functions.https.onRequest(updateUserInfo);
exports.getUserInfo = functions.https.onRequest(getUserInfo);