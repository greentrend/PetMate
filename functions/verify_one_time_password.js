const admin = require('firebase-admin');

module.exports = function(req, res) {
    if (!req.body.phone || !req.body.code) {
        return res.status(422).send({ error: 'Phone and code must both be provided!'})
    }

    const phone = String(req.body.phone).replace(/[^\d]/g, '');
    const code = parseInt(req.body.code);

    admin.auth().getUser(phone)
        .then(() => {
            const ref = admin.database().ref('users/' + phone);
            ref.on('value', snapshot => {
                ref.off();
                const user = snapshot.val();

                if(user.code !== code || !user.codeValid){
                    return res.status(422).send({ error: 'Code not valid' })
                }
                
                // if we get this far, the user has submitted the correct code.
                ref.update({ codeValid: false });
                // eslint-disable-next-line promise/no-nesting
                admin.auth().createCustomToken(phone)
                    .then(token => res.send({ token: token }))
                    .catch(error => res.send( error ))
            });
            return null;
        })
        .catch(err => res.status(422).send({ error: err }))

}