const admin = require('firebase-admin');

module.exports = function(req, res) {

    console.log("updating user info...")
    console.log("req.body: ")

    //{ phone: '7543025473', name: 'Dani', email: 'Dani@gmail.com', zipcode: '33333', description: 'Dog whisperer' }
    console.log(req.body);

    if (!req.body.phone) {
        return res.status(422).send({ error: 'Phone must be provided!'})
    }

    if (!req.body.name) {
        return res.status(422).send({ error: 'Name must be provided!'})
    }

    if (!req.body.email) {
        return res.status(422).send({ error: 'email must be provided!'})
    }

    if (!req.body.zipcode) {
        return res.status(422).send({ error: 'zipcode must be provided!'})
    }


    const phone = String(req.body.phone).replace(/[^\d]/g, '');

    const ref = admin.database().ref('users/' + phone);

    // A user with this phone number exists in DB?
    admin.auth().getUser(phone)
        // eslint-disable-next-line promise/always-return
        .then( () => {
            ref.update({ phone: req.body.phone, name: req.body.name, email: req.body.email, zipcode: req.body.zipcode, description: req.body.description }, () => {
                res.send({ success: true });
            });
        })
        .catch((err) => {
            res.status(422).send({ err })
        })

    
 
}