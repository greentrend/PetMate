const twilio = require('twilio');

const accountSid = 'ACba14a85c9013a12f56dd24802ab47c46';
const authToken = '1665371a7f9e8ae9a471140915133608';

module.exports = new twilio.Twilio(accountSid, authToken);