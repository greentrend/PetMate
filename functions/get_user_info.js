const admin = require('firebase-admin');

module.exports = function(req, res) {

    console.log("Getting user info...")
    console.log("req.body: ")

    //{ phone: '7543025473', name: 'Dani', email: 'Dani@gmail.com', zipcode: '33333', description: 'Dog whisperer' }
    console.log(req.body);

    if (!req.body.phone) {
        return res.status(422).send({ error: 'Phone must be provided!'})
    }    

    const phone = String(req.body.phone).replace(/[^\d]/g, '');

    admin.auth().getUser(phone)
        .then(() => {
            const ref = admin.database().ref('users/' + phone);
            ref.on('value', snapshot => {
                
                const user = snapshot.val();

                console.log("User:")
                console.log(user)

                res.send({user});
            });
            return null;
        })
        .catch(err => res.status(422).send({ error: err }))

}