const admin = require('firebase-admin');
const twilio = require('./twilio');

module.exports = function(req, res) {
    console.log("Requesting One time password...")
    if(!req.body.phone) {
        return res.status(422).send({ error: 'You must provide a phone number' });
    }

    const phone = String(req.body.phone).replace(/[^\d]/g, '');

    console.log("Fetching user...")
    admin.auth().getUser(phone)
        .then( () => {
            const code = Math.floor((Math.random() * 8999 + 1000));

            twilio.messages.create({
                body: 'Your code is ' + code,
                to: phone, 
                from: '+19542801131'
            }, (err) => {
                if(err) { return res.status(422).send(err); }
                
                admin.database().ref('users/' + phone)
                    .update({ code: code, codeValid: true }, () => {
                        res.send({ success: true });
                    });

            })
            return null; //enfored by ESLint...
        })
        .catch(error => {
            res.status(422).send({ error });
        })

}